
var numCel;
var nameOfJob;
var initParams;
var tipodeRecuperacion;

window.onload = function () { initialize(); };

$(function () {
    $("#divCapCel").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", modal:true });
});

function initialize() {

    /*Se obtiene parametros de URL*/
    initParams = getUrlVars();

    tipodeRecuperacion = new Number(initParams["tipoRec"]);
    if (tipodeRecuperacion == 0)
        $("#txtLeyenda").show();
    else
        $("#txtLeyenda").hide();

    cargaTiposRec();
    getProgEmplFiltro();
    getComboEdicion();
}

function cargaTiposRec() {
    executeRequest(wsMtdConsultaTipoRecVideo, "{ }", successTipoRec, myError);
}

var successTipoRec = function (data, status) {
    if (data.d.length > 0) {
        $.each(data.d, function (index, tipo) {
            $("#cmbTipoRec").append("<option value='" + tipo.CveTipoRecuperacion + "'>" + tipo.NombreTiporecuperacion + "</option>");
        });
    }
    else
        alertModal("No se encontraron los tipos de restauraciones");
}

function getProgEmplFiltro() {
    var data = "{ 'ESIN_LLAV_PR':'', 'EMPL_LLAV_PR':'" + sessionStorage.numUsuario + "' }";
    executeRequest(wsMtdGetProgEmplFiltro, data, successProgEmplFiltro, Error);
}

var successProgEmplFiltro = function (data, status) {
    $("#cmbProgramas").empty();
    if (data.d.length > 0) {
        $("#cmbProgramas").append('<option value="0">== SELECCIONE ==</option>');
        $.each(data.d, function (index, programa) {
            $("#cmbProgramas").append('<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>');
        });
    }
    else
        alertModal("No se encontraron producciones para el usuario");
}

function getComboEdicion() {
    executeRequest(wsMtdGetPlayOutSharesRec, "{ }", successComboEdiciones, Error);
}

var successComboEdiciones = function (data, status) {
    $("#cmbEdicion").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, edicion) {
            $("#cmbEdicion").append('<option value="' + edicion.CvePlayOutShares + '">' + edicion.Descripcion + '</option>');
        });
    }
    else
        alertModal("No se encontraron destinos para las recuperaciones");
}

function btnCancelar_click() {
    parent.closeWindow(initParams["windowId"]);
}

function btnGuardar_click() {
    if ($.trim($("#txtNombreArch").val()) == '') {
        alertModal("El nombre del archivo no puede ser vacio"); 
        return false;
    }

    if ($("#cmbProgramas").val() > 0) {
        executeRequest(wsMtdGetPrefixArchivo, "{ 'esin_llav_pr':" + $("#cmbProgramas").val() + " }", successGetPrefix, Error);
    }
    else
        alertModal("Debe seleccionar una producción");
}

var successGetPrefix = function (data, status) {
    if ($.trim(data.d) != '')
        nameOfJob = $.trim(data.d) + $.trim($("#txtNombreArch").val());
    else
        nameOfJob = $.trim($("#txtNombreArch").val());

    alertModal(nameOfJob);
    parent.closeWindow(initParams["windowId"]);
}

function txtNumCel_keyup() {
    if (window.event.keyCode == 13)
        $("#btnAcceptCel").click();
}

function btnAcceptCel_click() {
    if ($.trim($("#txtNumCel").val()) == '') {
        alertModal("El Número de Celular no puede ser nulo");
        return false;
    }

    numCel = $.trim($("#txtNumCel").val());
    $("#divCapCel").dialog('close');
}

function btnCancelCel_click() {
    $("#divCapCel").dialog('close');
}

function chkNotificar_click() {
    if ($("#chkNotificar").attr('checked') == 'checked') {
        $("#divCapCel").dialog('open');
    }
}