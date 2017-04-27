
var currIndex;
var _Empresa = 1;
var oSeccionAsignada;
var defaultNumProp = 10;
var tiposDeNota = "";
var arrReporteros;
window.onload = function () { initialize(); }

function initialize() {

    getSecciones();
    getLocales(successLocales, Error);

    $("#txtNumProp").val(defaultNumProp);
    reloadPropGrid();
}

function reloadPropGrid() {
    var totRegistros;
    var contenido = "";

    if ($.trim($("#txtNumProp").val()) == "")
        $("#txtNumProp").val(defaultNumProp);

    totRegistros = new Number($("#txtNumProp").val());

    if (totRegistros < 1 || totRegistros > 99) {
        alertModal("El n&uacute;mero de propuestas a crear no puede ser menor a 1 o mayor a 99");
        return false;
    }

    getNoteType();
    $("#divPropContent").empty();
    for (i = 0; i < totRegistros; i++) {
        contenido += "<div class='DataPropRow'>"; // div Fila

        contenido += "<div class='divNumberMultPropuestasSecc varPaddingTop10'>" + (i + 1) + "</div>"; // columna num registro
        contenido += "<div class='divMultPropuestasSecc varPaddingTop10'><input type='text' class='cmb90 ' id='txtTitu_" + i + "'/></div>"; // columna titulo 
        contenido += "<div class='divMultPropuestasSecc varHeight50'><textarea class='cmb90' id='txtObjetivo_" + i + "'></textarea></div>"; // Columna Objetivo
        contenido += "<div class='divMultPropuestasSecc varPaddingTop10'><input type='text' id='dtFechaAg_" + i + "' class='txtFechas2 dtFechaProp varMarginLeft20p' readonly='readonly'/></div>"; // Columna fecha agenda
        contenido += "<div class='divMultPropuestasSecc varPaddingTop10'><input type='text' class='txtAutoComRpt cmb90 ' id='txtRep_" + i + "'/></div>"; // Columna Reportero
        contenido += "<div class='divMultPropuestasSecc varPaddingTop10'><select class='cmb90  cmbNoteTypeProp' id='cmbTipoNota_" + i + "'>" + tiposDeNota + "</select></div>"; // Columna tipo de nota
        contenido += "<div class='divMultPropuestasSecc varPaddingTop10'><label  id='lblNumProp_" + i + "' onmouseOver='lblNumPropMoseOver(this);' onclick='lblNumPropClick(this);' data-upd='0' data-idx='" + i + "'>PROP</label></div>"; // label que genera la Propuesta

        contenido += "</div>"; // Fin div Fila
    }

    $("#divPropContent").append(contenido);
    $(".dtFechaProp").datepicker({ minDate: 0 });
    $(".dtFechaProp").datepicker('setDate', new Date());
    $(".cmbNoteTypeProp").val(1);

    $(".txtAutoComRpt").autocomplete({ source: arrReporteros });

    $(".txtAutoComRpt").each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        /* change name of orig input */
        $(this).attr('id', formElementName + '_label');
        /* create new hidden input with name of orig input */
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrReporteros,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value.toString().split("|")[0]);
                return false;
            }
        });
    });

}

function lblNumPropMoseOver(control) {
    $(control).css('cursor', 'pointer');
}

function getSecciones() {
    executeSyncRequest(wsMtdObtenerSecc, "{ }", successGetSecciones, Error);
}

var successGetSecciones = function (data, status) {
    var contenido = "";

    $("#cmbSeccion").empty();
    contenido += "<option value='-1'>== SELECCIONE ==</option>";
    $.each(data.d, function (index, seccion) {
        contenido += "<option data-empl='" + seccion.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria + "' value='" + seccion.CveSeccion + "'>" + seccion.NombreSeccion + "</option>";
    });
    $("#cmbSeccion").append(contenido);
    executeSyncRequest(wsMtdoObtieneSeccionByIdEmpleado, "{ 'idEmpleado':" + sessionStorage.numUsuario + " }", function (data, status) { $("#cmbSeccion").val(data.d.CveSeccion); oSeccionAsignada = data.d; }, Error);
    if ($.inArray('63', sessionStorage.userPuestos.split(',')) == 0 || $.inArray('9', sessionStorage.userPuestos.split(',')) == 0)
        $("#cmbSeccion").attr('disabled', false);
    else
        $("#cmbSeccion").attr('disabled', true);
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    $("#cmbLocales").val(getLocalSeleccionar());
}

function getNoteType() {
    executeSyncRequest(wsMtdObtTiposNotaBySecc, "{ 'idSeccion':" + $("#cmbSeccion").val() + " }", successgetNoteType, Error);
}

var successgetNoteType = function (data, status) {
    tiposDeNota = "";
    $.each(data.d, function (index, tipoNota) {
        tiposDeNota += "<option value='" + tipoNota.TinoLlPr + "'>" + tipoNota.TnoDesc + "</option>";
    });
}

function lblNumPropClick(control) {
    if (isValidRow($(control).attr('data-idx'), true) == true) 
        saveProp($(control).attr('data-idx'), $(control).attr('data-upd'));
}

function btnSave_click() {
    /*por cada item se valida y guarda la informacion de la propuesta*/
    $.each($("#divPropContent .DataPropRow"), function (index, item) {
        if (isValidRow(index, false) == true)
            saveProp(index, $("#lblNumProp_" + index).attr('data-upd'));
    });

    alertModal("Se procesaron los datos correctamente.");

}

function saveProp(index, isUpdate) {
    var oSeccion = new TDI_Seccion();
    var oTipoNota = new TDI_TipoNota();
    var oReportero = new TDI_EMPL();
    var oPuestos = new TDI_Puestos();
    var oPropuesta = new TDI_Propuesta();
    var oAgendaSemanal = new THE_AgendaSemanal();

    if ($("#cmbSeccion").attr('disabled') == false || $("#cmbSeccion").attr('disabled') == undefined) {
        oSeccion.CveSeccion = $("#cmbSeccion").val();
        oSeccion.NombreSeccion = $("#cmbSeccion option:selected").text();
    }
    else {
        oSeccion.CveSeccion = oSeccionAsignada.CveSeccion;
        oSeccion.NombreSeccion = oSeccionAsignada.NombreSeccion;
    }

    oTipoNota.CveTipoNota = $("#cmbTipoNota_" + index).val();
    oTipoNota.DescripcionTipoNota = $("#cmbTipoNota_" + index + " option:selected").text();

    oReportero.EmpleadoLlavePrimaria = $.trim($("#txtRep_" + index + "_hidden").val());
    oReportero.EmpleadoNombre = $.trim($("#txtRep_" + index).val());

    oPuestos.PuestoLlavePrimaria = 1;
    oPropuesta.cveEmpleado = oReportero;
    oPropuesta.cvePuesto = oPuestos;

    if (isUpdate == 1)
        oPropuesta.CvePropuesta = $("#lblNumProp_" + index).text();

    oPropuesta.Titulo = $.trim($("#txtTitu_" + index).val());
    oPropuesta.Objetivo = $.trim($("#txtObjetivo_" + index).val());
    oPropuesta.Tema = $.trim($("#txtObjetivo_" + index).val());
    oPropuesta.Descripcion = $.trim($("#txtObjetivo_" + index).val());
    oPropuesta.CveSeccion = oSeccion;
    oPropuesta.CveTipoNota = oTipoNota;
    oPropuesta.Fecha = $("#dtFechaAg_" + index).datepicker('getDate');

    if (isUpdate == 0)
        oPropuesta.FechaCreacion = new Date(); 

    oPropuesta.Usuario = sessionStorage.userName;

    oAgendaSemanal.CveAgendaSemanal = 0;
    oAgendaSemanal.FechaInicio = $("#dtFechaAg_" + index).datepicker('getDate').esMXFormat();
    oAgendaSemanal.Origen = "P";
    oAgendaSemanal.FechaCreacion = new Date();
    oAgendaSemanal.CveSeccion = oSeccion;
    oAgendaSemanal.CveTipoNota = oTipoNota;
    oAgendaSemanal.Estatus = "A";

    //Se asigna la local
    oPropuesta.Local = new TDI_Local();
    oPropuesta.Local.LocalLlave = $("#cmbLocales").val();

    if ($("#cmbLocales").val() != 36) {
        oPropuesta.CveSeccion.CveSeccion = 114;
        oPropuesta.CveSeccion.NombreSeccion = 'NOTICIAS LOCALES';

        oPropuesta.CveTipoNota.CveTipoNota = 1;
        oPropuesta.CveTipoNota.DescripcionTipoNota = 'PRINCIPAL';
    }
    //Se asigna la empresa
    oPropuesta.Empresa = new TDI_Empresa();
    oPropuesta.Empresa.cveEmpresa = _Empresa;

    currIndex = index;

    var datos = "{ 'cveEmpleadoCliente': " + $("#cmbSeccion option:selected").attr('data-empl') + ", 'oPropuesta': " + JSON.stringify(oPropuesta) + ", 'oAgendaSemanal':" + JSON.stringify(oAgendaSemanal) + ", 'esNueva': '" + (isUpdate==0) + "' }";
    executeSyncRequest(wsMtdAlmacenaDatProp, datos, successGuardaProp, Error);
}

var successGuardaProp = function (data, status) {
    var resultado = data.d;
    if (resultado.MensajeError == "") {
        $("#lblNumProp_" + currIndex).empty();
        $("#lblNumProp_" + currIndex).append(resultado.oPropuesta.CvePropuesta);
        $("#lblNumProp_" + currIndex).attr('data-upd', 1);
    }
    else
        alertModal('Ocurrio un problema al generar la propuesta: ' + resultado.MensajeError);
}

function isValidRow(index, isAlertMessage) {
    var msg = "";

    if ($("#cmbSeccion").val() <= 0) 
        msg += "Debe seleccionar una secci&oacute;n.<BR/>";

    if ($("#cmbLocales").val() <= 0)
        msg += "Debe seleccionar una Local.<BR/>";

    if ($.trim(msg) != "") {
        alertModal(msg);
        return false;
    }

    if ($.trim($("#txtTitu_" + index).val()) == "")
        msg += "El t&iacute;tulo de la propuesta no puede ser nulo.<BR/>";

    if ($.trim($("#txtObjetivo_" + index).val()) == "")
        msg += "La descripci&oacute;n de la propuesta no puede ser nula.<BR/>";

    if ($.trim($("#txtRep_" + index + "_hidden").val()) == "")
        msg += "Debe seleccionar un reportero.<BR/>";

    if ($("#cmbTipoNota_" + index).val() <= 0 || $("#cmbTipoNota_" + index).val() == undefined)
        msg += "Debe seleccionar un tipo de nota.<BR/>";

    if ($.trim(msg) != "") {
        if(isAlertMessage == true)
            alertModal(msg);
        return false;
    }
    else
        return true;
}