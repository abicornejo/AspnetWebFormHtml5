var bCanSave = true;

var oOT;
var empresa;
var WaitCout;
var solicitud;
var oCompraOT;
var initParams;
var oAgendaSemanal;
var oEquipoTrabajo;

window.onload = function () { initialize(); };

$(document).ready(function (e) {
    try {
        $("#lsbReporteros").msDropDown({ showIcon: true });
        $("#lsbCamaro").msDropDown({ showIcon: true });
        $("#lsbEditor").msDropDown({ showIcon: true });
    } catch (e) {
        alertModal(e.message);
    }
});

$(function () {
    $("#dtFechaAgenda").datepicker({ minDate: 0 });
});

function initialize() {
    initParams = getUrlVars();

    /*Se obtienen los parametros de entrada a la pagina*/
    solicitud = eval('(' + sessionStorage.SolOT + ')');
    sessionStorage.SolOT = undefined;

    /*Se obtienen los programas*/
    //bindProgramas();

    /*Se obtienen los formatos*/
    getSeccionFormato();

    /*Se cargan los datos contenidos dentro de la solicitud sobre la pantalla*/
    cargaInfoPantalla();
}

function cargaInfoPantalla() { 
    $("#cmbPrograma").val(solicitud.CvePrograma.CvePrograma);
    $("#txtTitulo").val(solicitud.CveSolicitud.Titulo);
    $("#txtObjetivo").val(solicitud.CveSolicitud.Objetivo);

    solicitud.FechaCompra = solicitud.FechaCompra.toString().replace('/Date(', '').replace(')/', '');
    solicitud.FechaCompra = solicitud.FechaCompra.toString().substr(0, solicitud.FechaCompra.indexOf('-'));
    solicitud.FechaCompra = new Date(new Number(solicitud.FechaCompra));
    $("#dtFechaAgenda").datepicker('setDate', solicitud.FechaCompra);
    $("#cmbFormato").val(solicitud.CveFormato.CveFormato);
    $("#lblLocal").append(solicitud.CveSolicitud.Local.LocalDescripcion.toString().toUpperCase());
    if (solicitud.CveSolicitud.Local.LocalLlave == 36)
        empresa = 1; //La empresa es Deportes o Noticias
    else
        empresa = 5; //La empresa es locales
}

function getSeccionFormato() {
    var data = "{ 'cveSeccion': " + solicitud.CveSolicitud.CveSeccion.CveSeccion + ", 'cveFormato':0 }";
    executeSyncRequest(wsMtdGetSeccFmto, data, successGetSeccFmto, Error);
}

var successGetSeccFmto = function (data, status) {
    $("#cmbFormato").empty();

    $.each(data.d, function (index, formato) {
        if (index == 0)
            $("#cmbFormato").append('<option value="0">== SELECCIONE ==</option>');
        $("#cmbFormato").append("<option data-value='" + JSON.stringify(formato, null, 2) + "' value='" + formato.CveFormato.CveFormato + "'>" + formato.CveFormato.Descripcion + '</option>');
    });
}

function bindProgramas() {
    executeSyncRequest(wsMtdConsPrgFIA, "{ }", successConsProgFIA, Error);
}

var successConsProgFIA = function (data, status) {
    $("#cmbPrograma").empty();
    if (data.d.length > 0) {
        $("#cmbPrograma").append('<option value="0">== SELECCIONE ==</option>');
        $.each(data.d, function (index, program) {
            $("#cmbPrograma").append("<option data-value='" + JSON.stringify(program, null, 2) + "' value='" + program.CvePrograma + "'>" + program.NombrePrograma + "</option>");
        });
    }
}

/*Se agrega la funcionalidad de autocomplete para el textbox de reporteros*/
$(function () {

    $("#txtReportero").autocomplete({ source: arrReporteros });

    $("#txtReportero").each(function () {
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
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
});

/*Se agrega la funcionalidad de autocomplete para el textbox de camarografos*/
$(function () {
    $("#txtCamaro").autocomplete({ source: arrCamarografos });

    $("#txtCamaro").each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        /* change name of orig input */
        $(this).attr('id', formElementName + '_label');
        /* create new hidden input with name of orig input */
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrCamarografos,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
});

/*Se agrega la funcionalidad de autocomplete para el textbox de editores*/
$(function () {
    $("#txtEditor").autocomplete({ source: arrEditores });

    $("#txtEditor").each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        /* change name of orig input */
        $(this).attr('id', formElementName + '_label');
        /* create new hidden input with name of orig input */
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrEditores,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
});

function SizeImageEditor() {
    if (lsbEditor_child.children.length > 0) {
        for (var i = 0; i < lsbEditor_child.children.length; i++) {
            if (lsbEditor_child.children[i].children.length > 0) {
                lsbEditor_child.children[i].children[0].width = 40;
                lsbEditor_child.children[i].children[0].Height = 45;
            }
        }
    }
}

function btnAddEditor_click() {
    if (jQuery.trim($("#txtEditor_hidden").val()) != '' && $("#txtEditor_hidden").val() != undefined) {
        var bfound = false;

        if (validaArrayEditor() == true) {
            $("#lsbEditor option").each(function () {
                if ($("#txtEditor_hidden").val() == this.value && $("#txtEditor_label").val() == this.text) {
                    bfound = true;
                }
            });

            if (bfound == false) {
                $("#lsbEditor").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                var oDD = $('#lsbEditor').msDropDown().data("dd");
                oDD.add({ text: $("#txtEditor_label").val(), value: $("#txtEditor_hidden").val(), title: imgDataUrl + $("#txtEditor_hidden").attr("data-numEmpl") + '.jpg' }); //will add icon too. 
                SizeImageEditor();
                $("#lsbEditor").val($("#txtEditor_hidden").val());
            }
        }
    }
    $("#txtEditor_label").val('');
}

function validaArrayEditor() {
    var value = $("#txtEditor_label").val().toUpperCase();
    for (var i = 0; i < arrEditores.length; i++) 
        if (value == arrEditores[i].label.toUpperCase()) 
            return true;
    return false;
}

function btnDelEditor_click() {
    if ($('#lsbEditor option').size() > 0) {
        var selectedindex = $('option:selected', '#lsbEditor').index();
        if (selectedindex >= 0) {
            var oHandler = $('#lsbEditor').msDropDown().data("dd");
            oHandler.remove(selectedindex);
            SizeImageEditor();
        }
    }
}

function btnAddCamaro_click() {
    if (jQuery.trim($("#txtCamaro_hidden").val()) != '' && $("#txtCamaro_hidden").val() != undefined) {
        var bfound = false;
        if (validaArrayCamaro() == true) {
            $("#lsbCamaro option").each(function () {
                if ($("#txtCamaro_hidden").val() == this.value && $("#txtCamaro_label").val() == this.text) 
                    bfound = true;
            });

            if (bfound == false) {
                $("#lsbCamaro").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                var oDD = $('#lsbCamaro').msDropDown().data("dd");
                oDD.add({ text: $("#txtCamaro_label").val(), value: $("#txtCamaro_hidden").val(), title: imgDataUrl + $("#txtCamaro_hidden").attr("data-numEmpl") + '.jpg' }); //will add icon too. 
                SizeImageCamaro();
                $("#lsbCamaro").val($("#txtCamaro_hidden").val());
            }
        }
    }
    $("#txtCamaro_label").val('');
}

function SizeImageCamaro() {
    if (lsbCamaro_child.children.length > 0) {
        for (var i = 0; i < lsbCamaro_child.children.length; i++) {
            if (lsbCamaro_child.children[i].children.length > 0) {
                lsbCamaro_child.children[i].children[0].width = 40;
                lsbCamaro_child.children[i].children[0].Height = 45;
            }
        }
    }
}

function btnDelCamaro_click() {
    if ($('#lsbCamaro option').size() > 0) {
        var selectedindex = $('option:selected', '#lsbCamaro').index();
        if (selectedindex >= 0) {
            var oHandler = $('#lsbCamaro').msDropDown().data("dd");
            oHandler.remove(selectedindex);
            SizeImageCamaro();
        }
    }
}

function validaArrayCamaro() {
    var value = $("#txtCamaro_label").val().toUpperCase();
    for (var i = 0; i < arrCamarografos.length; i++) 
        if (value == arrCamarografos[i].label.toUpperCase()) 
            return true;
    return false;
}

function btnAddReportero_click() {
    if (jQuery.trim($("#txtReportero_hidden").val()) != '' && $("#txtReportero_hidden").val() != undefined) {
        var bfound = false;

        if (validaArrayReportero() == true) {
            $("#lsbReporteros option").each(function () {
                if ($("#txtReportero_hidden").val() == this.value && $("#txtReportero_label").val() == this.text) 
                    bfound = true;
            });

            if (bfound == false) {
                $("#lsbReporteros").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                var oDD = $('#lsbReporteros').msDropDown().data("dd");
                oDD.add({ text: $("#txtReportero_label").val(), value: $("#txtReportero_hidden").val(), title: imgDataUrl + $("#txtReportero_hidden").attr("data-numEmpl") + '.jpg' }); //will add icon too. 
                SizeImageReportero();
                $("#lsbReporteros").val($("#txtReportero_hidden").val());
            }
        }
    }
    $("#txtReportero_label").val('');
}

function SizeImageReportero() {
    if (lsbReporteros_child.children.length > 0) {
        for (var i = 0; i < lsbReporteros_child.children.length; i++) {
            if (lsbReporteros_child.children[i].children.length > 0) {
                lsbReporteros_child.children[i].children[0].width = 40;
                lsbReporteros_child.children[i].children[0].Height = 45;
            }
        }
    }
}

function btnDelReportero_click() {
    if ($('#lsbReporteros option').size() > 0) {
        var selectedindex = $('option:selected', '#lsbReporteros').index();
        if (selectedindex >= 0) {
            var oHandler = $('#lsbReporteros').msDropDown().data("dd");
            oHandler.remove(selectedindex);
            SizeImageReportero();
        }
    }
}

function validaArrayReportero() {
    var value = $("#txtReportero_label").val().toUpperCase();
    for (var i = 0; i < arrReporteros.length; i++) 
        if (value == arrReporteros[i].label.toUpperCase()) 
            return true;
    return false;
}

function ValidaCamposGuardar() {
    var result = true;
    var msg = '';
    if ($.trim($("#txtTitulo").val()) == '') {
        msg += "\nFalta el titulo de la OT";
        result = false;
    }

    if ($.trim($("#txtObjetivo").val()) == '') {
        msg += "\nFalta el objetivo de la OT";
        result = false;
     }

    if ($("#lsbReporteros option").length <= 0) {
        msg += "\nEl reportero es un campo obligatorio";
        result = false;
    }

    if ($("#dtFechaAgenda").datepicker('getDate') == undefined) {
        msg += "\nEs necesario especificar una fecha de agenda válida";
        result = false;
    }

    if (compareDates(new Date(), $("#dtFechaAgenda").datepicker('getDate')) < 0) {
        msg += "\nLa fecha de agenda no puede ser menor a la fecha actual.";
        result = false;
    }

    if ($.trim(msg) != '')
        alertModal(msg);

    return result;
}

function btnGuardar_Click() {
    try {
        if (bCanSave == true) {
            if (ValidaCamposGuardar()) {
                bCanSave = false;
                /*Se guarda la Orden de trabajo*/
                oOT = new THE_OrdenTrabajo();

                oOT.Titulo = $.trim($("#txtTitulo").val());
                oOT.Objetivo = $.trim($("#txtObjetivo").val());
                oOT.HistoryLine = $.trim($("#txtObjetivo").val());

                if ($("#lsbReporteros option").length > 0)
                    oOT.Estatus = "2";
                else
                    oOT.Estatus = "1";

                oOT.Usuario = sessionStorage.numUsuario;
                oOT.CveSeccion = solicitud.CveSolicitud.CveSeccion;
                oOT.CveEmpleado = solicitud.CveSolicitud.CveEmpleado;
                oOT.CveCliente = solicitud.CveSolicitud.CveCliente;
                oOT.CveTipoNota = solicitud.CveSolicitud.CveTipoNota;
                oOT.FechaEvento = $("#dtFechaAgenda").datepicker('getDate');

                var oEmpl = new TDI_EMPL();
                var oEmpresa = new TDI_Empresa();
                var oCveOrigen = new TDI_Origen();
                var oPrograma = new TDI_Programa(); //eval('(' + $("#cmbPrograma option:selected").attr('data-value') + ')');
                oPrograma.CvePrograma = $("#cmbPrograma").val();

                oPrograma.FechaInicio = $("#cmbPrograma option:selected").attr('data-fi').toString().replace('/Date(', '').replace(')/', '');
                oPrograma.FechaInicio = oPrograma.FechaInicio.toString().substr(0, oPrograma.FechaInicio.indexOf('-'));
                oPrograma.FechaInicio = new Date(new Number(oPrograma.FechaInicio));

                oPrograma.FechaFin = $("#cmbPrograma option:selected").attr('data-ff').toString().replace('/Date(', '').replace(')/', '');
                oPrograma.FechaFin = oPrograma.FechaFin.toString().substr(0, oPrograma.FechaFin.indexOf('-'));
                oPrograma.FechaFin = new Date(new Number(oPrograma.FechaFin));

                oCveOrigen.CveOrigen = 1;
                oOT.CveOrigen = oCveOrigen;

                //Se asigma la empresa
                oEmpresa.CveEmpresa = empresa;
                oOT.Empresa = oEmpresa;

                oOT.FabrLlave = new TDI_Fabrica();
                oOT.FabrLlave.FabricaLlavePrimaria = 4;

                //Se asigna la local
                oOT.Local = solicitud.CveSolicitud.Local;

                //Se asigna el programa 
                oOT.Programa = oPrograma;

                //Se asigna el empleado de creación
                oEmpl.EmpleadoLlavePrimaria = sessionStorage.numUsuario;
                oOT.EmplCrea = oEmpl;

                var oTrans = GenerateTransac();
                /*Se guarda la informacion de la OT*/
                var data = "{ 'oOrdenTrabajo': " + JSON.stringify(oOT, null, 2) + ", 'oLogTran': " + JSON.stringify(oTrans, null, 2) + " }";
                executeSyncRequest(wsMtdSaveOT2, data, successSaveOT2, Error);
                bCanSave = true;
            }
        }
    }
    catch(exception){
        bCanSave = true;
    }
}

var successSaveOT2 = function (data, status) {    
    if (data.d != undefined && data.d != null) {
        oAgendaSemanal = new THE_AgendaSemanal();

        oAgendaSemanal.FechaInicio = $("#dtFechaAgenda").datepicker('getDate').esMXFormat();
        oAgendaSemanal.Origen = "O";
        oAgendaSemanal.Estatus = "A";
        oAgendaSemanal.CveSeccion = oOT.CveSeccion;
        oAgendaSemanal.CveTipoNota = oOT.CveTipoNota;
        oAgendaSemanal.Titulo = oOT.Titulo;
        oAgendaSemanal.NumeroOTPropuesta = data.d.CveOrdenTrabajo;
        oAgendaSemanal.FechaCreacion = new Date();

        oOT.CveOrdenTrabajo = data.d.CveOrdenTrabajo;
        oOT.ClaveOrdenTrabajo = data.d.ClaveOrdenTrabajo;

        var data = "{ 'oAgendaSemana':" + JSON.stringify(oAgendaSemanal, null, 2) + " }";
        executeSyncRequest(wsMtdSaveAgenSem, data, successSaveAgenSem, Error);
    }
    else
        alertModal("Error al guardar la OT.");
}

var successSaveAgenSem = function (data, status) {
    if (data.d > 0) {
        var data;
        WaitCout = 0;
        oAgendaSemanal.CveAgendaSemanal = data.d;
        oEquipoTrabajo = new THE_EquipoTrabajo();

        /*Puestos para Reporteros 1*/
        var oPuestosRpt = new TDI_Puestos();
        var oPuestosCam = new TDI_Puestos();
        var oPuestosEdi = new TDI_Puestos();

        oPuestosRpt.PuestoLlavePrimaria = 1;
        var oProgramaEmpleado = oOT.Programa;

        if ($("#lsbReporteros option").length > 0) {
            $.each($("#lsbReporteros option"), function (index, reportero) {
                WaitCout += 1;
                oEquipoTrabajo = new THE_EquipoTrabajo();
                oEquipoTrabajo.EmpleadoLlavePrimaria = new TDI_EMPL($(reportero).attr('value'));
                oEquipoTrabajo.CveOrdenTrabajo = oOT;
                oEquipoTrabajo.CvePrograma = oProgramaEmpleado;
                oEquipoTrabajo.CveEquipoTrabajo = 0;
                oEquipoTrabajo.PuestoLlavePrimaria = oPuestosRpt;
                data = "{'oEquipoTrabajo': " + JSON.stringify(oEquipoTrabajo, null, 2) + "}";
                executeSyncRequest(wsMtdGuardarEquipoTrabajo, data, successSaveEquTrab, Error);
            });
        }

        /*Puestos para Camarografos 2*/
        oPuestosCam.PuestoLlavePrimaria = 2;
        if ($("#lsbCamaro option").length > 0) {
            $.each($("#lsbCamaro option"), function (index, camarografo) {
                WaitCout += 1;
                oEquipoTrabajo = new THE_EquipoTrabajo();
                oEquipoTrabajo.EmpleadoLlavePrimaria = new TDI_EMPL($(camarografo).attr('value'));
                oEquipoTrabajo.CveOrdenTrabajo = oOT;
                oEquipoTrabajo.CvePrograma = oProgramaEmpleado;
                oEquipoTrabajo.CveEquipoTrabajo = 0;
                oEquipoTrabajo.PuestoLlavePrimaria = oPuestosCam;
                data = "{'oEquipoTrabajo': " + JSON.stringify(oEquipoTrabajo, null, 2) + "}";
                executeSyncRequest(wsMtdGuardarEquipoTrabajo, data, successSaveEquTrab, Error);
            });
        }

        /*Puestos para Editores 94*/
        oPuestosEdi.PuestoLlavePrimaria = 94;
        if ($("#lsbEditor option").length > 0) {
            $.each($("#lsbEditor option"), function (index, editor) {

                WaitCout += 1;
                oEquipoTrabajo = new THE_EquipoTrabajo();
                oEquipoTrabajo.EmpleadoLlavePrimaria = new TDI_EMPL($(editor).attr('value'));
                oEquipoTrabajo.CveOrdenTrabajo = oOT;
                oEquipoTrabajo.CvePrograma = oProgramaEmpleado;
                oEquipoTrabajo.CveEquipoTrabajo = 0;
                oEquipoTrabajo.PuestoLlavePrimaria = oPuestosEdi;
                data = "{'oEquipoTrabajo': " + JSON.stringify(oEquipoTrabajo, null, 2) + "}";
                executeSyncRequest(wsMtdGuardarEquipoTrabajo, data, successSaveEquTrab, Error);
            });
        }

        /*Se actualiza la OT*/
        executeSyncRequest(wsMtdActualizaOT, "{ 'oOrdenTrabajo':" + JSON.stringify(oOT, null, 2) + " }", successActualizaOT, Error);
    }
    else
        alertModal("Error al guardar la agenda de la orden de trabajo.");
}

var successSaveEquTrab = function (data, status) {
    if (WaitCout == 1) {
        WaitCout = 0;
        if (data.d > 0) {
            
        }
        else
            alertModal("Error al guardar el equipo de trabajo.");
    }
    else
        WaitCout -= 1;
}

var successActualizaOT = function (data, status) {
    var ListaCompraOT = new Array();
    if (data.d > 0) {
        oCompraOT = new CompraOT();
        var oSeccionFormato = eval('(' + $("#cmbFormato option:selected").attr('data-value') + ')');
        //var oProgramaEmpleado = eval('(' + $("#cmbPrograma option:selected").attr('data-value') + ')');

        oCompraOT.CveProgramaEmpleado = new TDI_ProgramaEmpleado();
        oCompraOT.CveProgramaEmpleado.CvePrograma = new TDI_Programa();
        oCompraOT.CveProgramaEmpleado.CvePrograma.CvePrograma = $("#cmbPrograma").val();
        oCompraOT.CveOrdenTrabajo = oOT;
        oCompraOT.CveSeccionFormato = new TDI_SeccionFormato();
        oCompraOT.CveSeccionFormato = oSeccionFormato;
        oCompraOT.fechaCompra = $("#dtFechaAgenda").datepicker('getDate');

        //No se envian al iNEWs las Secciones de Programas (8) ni las Internacioanales(6)
        if (oOT.CveSeccion.CveSeccion != 6 && oOT.CveSeccion.CveSeccion != 8)
            oCompraOT.SeEnviaINEWS = true;
        else
            oCompraOT.SeEnviaINEWS = false;

        /*Se arreglan las fechas*/
        oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio = $("#cmbPrograma option:selected").attr('data-fi').toString().replace('/Date(', '').replace(')/', '');
        oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio = oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio.toString().substr(0, oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio.indexOf('-'));
        oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio = new Date(new Number(oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio));

        oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin = $("#cmbPrograma option:selected").attr('data-ff').toString().replace('/Date(', '').replace(')/', '');
        oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin = oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin.toString().substr(0, oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin.indexOf('-'));
        oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin = new Date(new Number(oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin));

        ListaCompraOT.push(oCompraOT);
        var data = "{ 'listCompra': " + JSON.stringify(ListaCompraOT, null, 2) + ", 'nombreUsuario':'" + sessionStorage.userName + "', 'Tran':" + JSON.stringify(GenerateTransac(), null, 2) + " }";
        executeSyncRequest(wsMtdCompraOT, data, successCompraOT, Error);

    }
}

var successCompraOT = function (data, status) {
    if (data.d == true) {
        solicitud.CveSolicitud.Estatus = "2";
        solicitud.CveSolicitud.CveOrdenTrabajo = oOT.CveOrdenTrabajo;

        /*Se corrigen fechas*/
        solicitud.CvePrograma.FechaFin = solicitud.CvePrograma.FechaFin.toString().replace('/Date(', '').replace(')/', '');
        solicitud.CvePrograma.FechaFin = solicitud.CvePrograma.FechaFin.toString().substr(0, solicitud.CvePrograma.FechaFin.indexOf('-'));
        solicitud.CvePrograma.FechaFin = new Date(new Number(solicitud.CvePrograma.FechaFin));

        solicitud.CvePrograma.FechaInicio = solicitud.CvePrograma.FechaInicio.toString().replace('/Date(', '').replace(')/', '');
        solicitud.CvePrograma.FechaInicio = solicitud.CvePrograma.FechaInicio.toString().substr(0, solicitud.CvePrograma.FechaInicio.indexOf('-'));
        solicitud.CvePrograma.FechaInicio = new Date(new Number(solicitud.CvePrograma.FechaInicio));

        solicitud.CveSolicitud.FechaCreacion = solicitud.CveSolicitud.FechaCreacion.toString().replace('/Date(', '').replace(')/', '');
        solicitud.CveSolicitud.FechaCreacion = solicitud.CveSolicitud.FechaCreacion.toString().substr(0, solicitud.CveSolicitud.FechaCreacion.indexOf('-'));
        solicitud.CveSolicitud.FechaCreacion = new Date(new Number(solicitud.CveSolicitud.FechaCreacion));

        solicitud.CveSolicitud.FechaSolicitud = solicitud.CveSolicitud.FechaSolicitud.toString().replace('/Date(', '').replace(')/', '');
        solicitud.CveSolicitud.FechaSolicitud = solicitud.CveSolicitud.FechaSolicitud.toString().substr(0, solicitud.CveSolicitud.FechaSolicitud.indexOf('-'));
        solicitud.CveSolicitud.FechaSolicitud = new Date(new Number(solicitud.CveSolicitud.FechaSolicitud));

        if (solicitud.CveSolicitud.EventoDeportivo != null && solicitud.CveSolicitud.EventoDeportivo != undefined) {
            solicitud.CveSolicitud.EventoDeportivo.dtFechaFin = solicitud.CveSolicitud.EventoDeportivo.dtFechaFin.toString().replace('/Date(', '').replace(')/', '');
            solicitud.CveSolicitud.EventoDeportivo.dtFechaFin = solicitud.CveSolicitud.EventoDeportivo.dtFechaFin.toString().substr(0, solicitud.CveSolicitud.EventoDeportivo.dtFechaFin.indexOf('-'));
            solicitud.CveSolicitud.EventoDeportivo.dtFechaFin = new Date(new Number(solicitud.CveSolicitud.EventoDeportivo.dtFechaFin));

            solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio = solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio.toString().replace('/Date(', '').replace(')/', '');
            solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio = solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio.toString().substr(0, solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio.indexOf('-'));
            solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio = new Date(new Number(solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio));
        }
        executeSyncRequest(wsMtdActualizaSol, "{ 'oSolicitudFormato':" + JSON.stringify(solicitud) + " }", successActualizaSol, Error);
    }
    else
        alertModal('Error al actualizar el estatus de la solicitud.');
}

var successActualizaSol = function (data, status) {
    if (data.d != undefined && data.d != null) {
        if (oCompraOT.SeEnviaINEWS == true)
            alertModal("Se almaceno correctamente la OT: " + oCompraOT.CveOrdenTrabajo.ClaveOrdenTrabajo + " y se ha enviado al iNEWs");
        else
            alertModal("Se almaceno correctamente la OT: " + oCompraOT.CveOrdenTrabajo.ClaveOrdenTrabajo);
    }
    parent.closeWindow(initParams['windowId']);
}

function setProgData(data) {
    $("#cmbPrograma").empty();
    $("#cmbPrograma").append(data);
}