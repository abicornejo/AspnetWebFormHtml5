
var initParams;
var toDelete;

window.onload = function () { initialize(); };

function initialize() {
    SaveLog("/Agendas/EventosDeportivos/Observaciones_EVDT.aspx");
    initParams = getUrlVars();

    getObs();
    btnNuevaObs_click();
}

function getObs() {
    executeSyncRequest(wsMtdGetObs, "{ 'idEVDT': " + initParams["evtId"] + " }", successGetObs, Error);
}

var successGetObs = function (data, status) {
    /*Se genera la tabla de observaciones*/
    loadTableObs(data.d);
}

function loadTableObs(theData) {
    var content = "";
    $("#divObservaciones").empty();

    $.each(theData, function (index, obs) {
        content += "<div style='width:100%; background-color:white;' data-obs='" + obs.IdObservacion + "' data-dte='" + obs.dtFechaOB + "'>";
        content += "<button type='button' title='Eliminar observaci&oacute;n' style='float:left;' onclick='deleteObs_click(this); return false;'>E</button>";
        content += "<textarea ondblclick='loadObsData(this);' readonly='readonly' style='float:left;'>" + obs.sObservacion + "</textarea>";
        content += "</div>";
    });

    $("#divObservaciones").append(content);
}

function loadObsData(control) {
    $("#txtObservacion").attr('data-obs', $(control).parent().attr('data-obs'));
    $("#txtObservacion").attr('data-dte', $(control).parent().attr('data-dte'));
    $("#txtObservacion").val($(control).val());
    $("#btnGuardar").attr('title', 'Modificar');
}

function btnNuevaObs_click() {
    $("#txtObservacion").attr('data-obs', -1);
    $("#txtObservacion").val('');
    $("#btnGuardar").attr('title', 'Guardar');
}

function deleteObs_click(control) {
    toDelete = $(control).parent().attr('data-obs')
    alertModalFunctionOKCancel("¿Realmente desea eliminar la observaci&oacute;n?", deleteObs);
}

function deleteObs() {
    var theObs = new THE_Observaciones_EVDTIpad();
    theObs.IdObservacion = toDelete;
    theObs.EventoDeportivo = new THE_EventoDeportivo(initParams["evtId"]);
    executeSyncRequest(wsMtdDeleteObs, "{ 'OBEV':" + JSON.stringify(theObs) + " }", successMoveObs, Error);
}

var successMoveObs = function (data, status) {
    loadTableObs(data.d);
}

function btnSave_click() {
    if ($.trim($("#txtObservacion").val()) == '') {
        alertModal("No se puede guardar la observaci&oacute;n porque el campo destinado para ello se encuentra vac&iacute;o, es necesario que lo verifique.");
        return false;
    }

    var theObs = new THE_Observaciones_EVDTIpad();
    theObs.sObservacion = $.trim($("#txtObservacion").val());
    theObs.EventoDeportivo = new THE_EventoDeportivo();
    theObs.EventoDeportivo.IdEvento = initParams["evtId"];

    if ($("#txtObservacion").attr('data-obs') <= -1) {
        theObs.dtFechaOB = new Date();
        executeSyncRequest(wsMtdSaveObs, "{ 'OBEV':" + JSON.stringify(theObs) + " }", successMoveObs, Error);
    }
    else {
        theObs.IdObservacion = $("#txtObservacion").attr('data-obs');
        theObs.dtFechaOB = parseJSONToDate($("#txtObservacion").attr('data-dte'));
        executeSyncRequest(wsMtdUpdateObs, "{ 'OBEV':" + JSON.stringify(theObs) + " }", successMoveObs, Error);
        btnNuevaObs_click();
    }
}
