
var theReai;
var formatos;
window.onload = function () { initialize(); };


function initialize() {
    cargaLocales();
    cargaFormatos();
    $("#dtFecha").datepicker({});
    $("#dtFecha").datepicker("setDate", new Date());
    $("#divComment").dialog({ width: 'auto', heigth: 'auto', resizable: false, autoOpen: false, modal:true });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divComment').parent()).remove();
    $("#divComment").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
}

function cargaLocales() {
    getLocales(successLocales, Error);
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

    $('#cmbLocales').val(getLocalSeleccionar());
    changeLocal();

    if (data.d.length == 2)
        $('#cmbLocales').attr("disabled", "disabled");
}

function changeLocal() {
    executeSyncRequest(wsMtdGetPrgsByLocal, "{ 'loclId':" + $("#cmbLocales").val() + " }", successgetPrgByLocl, Error);
    return false;
}

var successgetPrgByLocl = function (data, status) {
    var content = "";

    $("#cmbProgramas").empty();

    if (data.d.length <= 0)
        content += '<option value="-1">No hay registros...</option>';

    $.each(data.d, function (index, program) {
        content += '<option value="' + program.CvePrograma + '">' + program.NombrePrograma + '</option>';
    });

    $("#cmbProgramas").append(content);
}

function search() {
    $("#MainContent_btnBuscarHdd").click();
}

function setFilters() {
    var msg = "";

    if ($("#cmbLocales").val() <= 0)
        msg += "* Es necesario seleccionar una Local.<BR />";
    if ($("#cmbProgramas").val() <= 0)
        msg += "* Es necesario seleccionar un Programa.<BR />";
    if ($("#dtFecha").val().length != 10)
        msg += "* Debe seleccionar una fecha v&aacute;lida.<BR />";

    if (msg.length > 0) {
        alertModal(msg);
        return false;
    }
    $("#MainContent_hdfLocl").val($("#cmbLocales").val());
    $("#MainContent_hdfPrgm").val($("#cmbProgramas").val());
    $("#MainContent_hdfDate").val($("#dtFecha").val());

    return true;
}

function cargaFormatos() {
    executeSyncRequest(wsGetFmtoEvaluacion, "{ 'empr':5, 'fabr':4 }", successCargaFmto, Error);
}

var successCargaFmto = function (data, status) {
    formatos = "";
    $.each(data.d, function (index, fmto) {
        formatos += '<option value="' + fmto.CveFormato + '">' + fmto.Descripcion + '</option>';
    });
}

function cargaCombos() {
    $.each($("#MainContent_divContentPorEval .cmbFmtoEval"), function (index, item) {
        $(item).empty();
        $(item).append(formatos);
        $(item).val($(item).attr('data-fmto'));
    });

    $.each($("#MainContent_divContentEvaluadas .cmbFmtoEval"), function (index, item) {
        $(item).empty();
        $(item).append(formatos);
        $(item).val($(item).attr('data-fmto'));
    });
}

function updateRowEvaluadas(control, type) {
    var row = $(control).parent().parent().attr('data-row');

    rbuttons_changed(control, type);
    $("#btnComm" + type + row).removeAttr("disabled");
    $("#lblPrelim" + type + row).empty();
    $("#lblPrelim" + type + row).append($(control).attr('data-cal'));
}

function cmbFmtoChanged(control) {
    var reai = new THE_Reai();
    reai.Esin_llav_pr = new TDI_Programa();
    reai.Esin_llav_pr.CvePrograma = $(control).parent().parent().attr('data-prg');
    reai.Otra_llav_pr = new THE_OrdenTrabajo();
    reai.Otra_llav_pr.CveOrdenTrabajo = $(control).parent().parent().attr('data-cveO');
    reai.Reai_fhtr = parseJSONToDate(eval($(control).parent().parent().attr('data-dte')));
    reai.Fmto_llav_pr = new TDI_Formato();
    reai.Fmto_llav_pr.CveFormato = $(control).val();

    executeSyncRequest(wsMtdUpdateFmto, "{ 'reai':" + JSON.stringify(reai) + " }", function (data, status) { }, Error);
}

function deleteRow(control) {
    theReai = new THE_Reai();
    theReai.Esin_llav_pr = new TDI_Programa();
    theReai.Esin_llav_pr.CvePrograma = $(control).parent().parent().attr('data-prg');
    theReai.Otra_llav_pr = new THE_OrdenTrabajo();
    theReai.Otra_llav_pr.CveOrdenTrabajo = $(control).parent().parent().attr('data-cveO');
    theReai.Reai_fhtr = parseJSONToDate(eval($(control).parent().parent().attr('data-dte')));
    theReai.Stat_llav_pr = new TDI_Estatus();
    theReai.Stat_llav_pr.CveEstatus = 16;

    alertModalFunctionOKCancel('Esta seguro de querer eliminar este registro?', deleteItem);
}

function deleteItem() {
    PageMethods.deleteEvaluation(theReai, onDeleteComplete, Error);
    //executeSyncRequest(wsMtdUpdateDelEval, "{ 'Status':" + JSON.stringify(theReai) + " }", successDelEval, Error);
}

function onDeleteComplete(result, userContext, methodName) {
    search();
}

var successDelEval = function (data, status) {
    $("#btnBuscar").click();
}

function openCommentModal(control) {
    $("#txtComment").empty();
    theReai = new THE_Reai();
    theReai.Esin_llav_pr = new TDI_Programa();
    theReai.Esin_llav_pr.CvePrograma = $(control).parent().parent().attr('data-prg');
    theReai.Otra_llav_pr = new THE_OrdenTrabajo();
    theReai.Otra_llav_pr.CveOrdenTrabajo = $(control).parent().parent().attr('data-cveO');
    theReai.Reai_fhtr = parseJSONToDate(eval($(control).parent().parent().attr('data-dte')));
    executeSyncRequest(wsMtdGetEvalCOmment, "{ 'otra_llav_pr':'" + $(control).parent().parent().attr('data-cveO') + "', 'esin_llav_pr': '" + $(control).parent().parent().attr('data-prg') + "', 'reai_fhtr':'" + parseJSONToDate(eval($(control).parent().parent().attr('data-dte'))).esMXFormat() + "' }", function (data, status) { if (data.d == '') $("#divComment").attr('data-sav', 1); else $("#divComment").attr('data-sav', 0); $("#txtComment").val(data.d); $("#divComment").dialog('open'); }, Error);
}

function commentClose() {
    if ($("#divComment").attr('data-oblg') == 1 && $.trim($("#txtComment").val()) == '') { }
    else {
        if ($.trim($("#txtComment").val()) == '' || $.trim($("#txtComment").val()).length < 10) {
            alertModal('Por favor ingrese un comentario mayor a 10 caract&eacute;res.');
            return;
        }

        /*Se guarda el comentario*/
        if($("#divComment").attr('data-sav') == 1)
            executeSyncRequest(wsMtdSaveComment, "{ 'otra_llav_pr': '" + theReai.Otra_llav_pr.CveOrdenTrabajo + "', 'esin_llav_pr':'" + theReai.Esin_llav_pr.CvePrograma + "', 'reai_fhtr':'" + theReai.Reai_fhtr.esMXFormat() + "', 'comentario':'" + $.trim($("#txtComment").val()) + "', 'usr':'" + sessionStorage.numUsuario + "' }", function (data, status) { alertModal('Se ha guardado con éxito el comentario de la evaluaci&oacute;n'); }, Error);
        else
            executeSyncRequest(wsMtdUpdateComment, "{ 'otra_llav_pr': '" + theReai.Otra_llav_pr.CveOrdenTrabajo + "', 'esin_llav_pr':'" + theReai.Esin_llav_pr.CvePrograma + "', 'reai_fhtr':'" + theReai.Reai_fhtr.esMXFormat() + "', 'comentario':'" + $.trim($("#txtComment").val()) + "', 'usr':'" + sessionStorage.numUsuario + "' }", function (data, status) { alertModal('Se ha guardado con éxito el comentario de la evaluaci&oacute;n'); }, Error);

        $("#divComment").dialog('close');
    }
}

function rbuttons_changed(control, type) {
    var lstEval = new Array();
    var puestos = [1, 2, 3, 5, 94, 135];

    var ev;
    var i = 0;
    for (i = 0; i < puestos.length; i++)
    {
        ev = new THE_Eval();

        ev.Esin_llav_pr = new TDI_Programa();
        ev.Esin_llav_pr.CvePrograma = $(control).parent().parent().attr('data-prg');

        ev.Otra_llav_pr = new THE_OrdenTrabajo();
        ev.Otra_llav_pr.CveOrdenTrabajo = $(control).parent().parent().attr('data-cveO');

        ev.Poev_llav_pr = new TDI_Poev();
        ev.Poev_llav_pr.Poev_llav_pr = $(control).attr('value');

        ev.Reai_fhtr = parseJSONToDate(eval($(control).parent().parent().attr('data-dte')));

        ev.Ptos_llav_pr = new TDI_Puestos();
        ev.Ptos_llav_pr.PuestoLlavePrimaria = puestos[i];

        lstEval.push(ev);
    }//fin for

    theReai = new THE_Reai();
    theReai.Esin_llav_pr = new TDI_Programa();
    theReai.Esin_llav_pr.CvePrograma = $(control).parent().parent().attr('data-prg');
    theReai.Otra_llav_pr = new THE_OrdenTrabajo();
    theReai.Otra_llav_pr.CveOrdenTrabajo = $(control).parent().parent().attr('data-cveO');
    theReai.Reai_fhtr = parseJSONToDate(eval($(control).parent().parent().attr('data-dte')));
    
    //Se agrego que se ponga el empleado que califico la nota en la tabla de REAI
    theReai.Usuario = sessionStorage.numUsuario;

    if ($(control).attr('value') == 3) {
        $("#divComment").attr('data-oblg', 1);
        $("#divComment").attr('data-open', 1);
    }
    else {
        $("#divComment").attr('data-oblg', 0);
        $("#divComment").attr('data-open', 0);
    }

    if (type == 'E')
        executeSyncRequest(wsMtdUpdateEval, "{ 'evalIpad':" + JSON.stringify(lstEval) + ", 'poev_llav_pr': " + $(control).attr('value') + ", 'LogTransacciones': " + JSON.stringify(GenerateTransac()) + " }", successEvalua, Error);
    else
        executeSyncRequest(wsMtdEvalNote, "{ 'evalipad':" + JSON.stringify(lstEval) + ", 'reai':" + JSON.stringify(theReai) + ", 'poev_llav_pr':" + $(control).attr('value') + ", 'LogTransacciones': " + JSON.stringify(GenerateTransac()) + " }", successEvalua, Error);
}

var successEvalua = function (data, status) {
    if ($("#divComment").attr('data-open') == 1) {
        $("#divComment").dialog('open');
    }
} 