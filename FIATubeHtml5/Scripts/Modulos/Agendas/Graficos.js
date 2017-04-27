var toDelete;
var initParams;

window.onload = function () { initialize(); };

function initialize() {
    initParams = getUrlVars();
    $("#txtObservacion").attr('data-grap', -1);
    executeSyncRequest(wsMtdGetGraphics, "{ 'idEVDT':" + initParams["idEvent"] + "}", successGetGraphics, Error);
}

var successGetGraphics = function (data, status) {
    loadData(data.d);
}

function loadData(info) {
    var content = "";
    $("#divGraficos").empty();

    $.each(info, function (index, graphic) {
        content += "<div style='width:100%; background-color:white;' data-grap='" + graphic.IdGraficos + "' data-dte='" + graphic.dtFechaGR + "'>";
        content += "<button type='button' title='Eliminar comentario' style='float:left;' onclick='deleteGrap_click(this); return false;'>E</button>";
        content += "<textarea ondblclick='loadGrapData(this);' readonly='readonly' style='float:left;'>" + graphic.sObservacion + "</textarea>";
        content += "</div>";
    });
    $("#divGraficos").append(content);
    btnNuevoGrap_click();
}

function loadGrapData(control) {
    $("#txtObservacion").attr('data-grap', $(control).parent().attr('data-grap'));
    $("#txtObservacion").attr('data-dte', $(control).parent().attr('data-dte'));
    $("#txtObservacion").val($(control).val());
    $("#btnGuardar").attr('title', 'Modificar');
}

function btnNuevoGrap_click() {
    $("#txtObservacion").attr('data-grap', -1);
    $("#txtObservacion").val('');
    $("#btnGuardar").attr('title', 'Guardar');
}

function deleteGrap_click(control) {
    toDelete = $(control).parent().attr('data-grap')
    alertModalFunctionOKCancel("¿Realmente desea eliminar el gr&aacute;fico?", deleteGrap);
}

function deleteGrap() {
    var theGrap = new THE_Graficos();
    theGrap.IdGraficos = toDelete;
    theGrap.EventoDeportivo = new THE_EventoDeportivo(initParams["idEvent"]);
    executeSyncRequest(wsMtdDeleteGraphics, "{ 'GREV':" + JSON.stringify(theGrap) + " }", successMoveGrap, Error);
}

var successMoveGrap = function (data, status) {
    loadData(data.d);
}

function btnSave_click() {
    if ($.trim($("#txtObservacion").val()) == '') {
        alertModal("No se puede guardar el gr&aacute;fico porque el campo destinado para ello se encuentra vac&iacute;o, es necesario que lo verifique.");
        return false;
    }
    
    var theGrap = new THE_Graficos();
    theGrap.sObservacion = $.trim($("#txtObservacion").val());
    theGrap.EventoDeportivo = new THE_EventoDeportivo(initParams["idEvent"]);

    if ($("#txtObservacion").attr('data-grap') <= -1) {
        theGrap.dtFechaGR = new Date();
        executeSyncRequest(wsMtdSaveGraphics, "{ 'GREV':" + JSON.stringify(theGrap) + " }", successMoveGrap, Error);
    }
    else {
        alert($("#txtObservacion").attr('data-grap'));
        theGrap.IdGraficos = $("#txtObservacion").attr('data-grap');
        theGrap.dtFechaGR = parseJSONToDate($("#txtObservacion").attr('data-dte'));
        executeSyncRequest(wsMtdUpdGraphics, "{ 'GREV':" + JSON.stringify(theGrap) + " }", successMoveGrap, Error);
    }
}