
var monitor;
var initParams;

window.onload = function () { initialize(); }

function initialize() {

    initParams = getUrlVars();
    $("#txtHora").timepicker({ });

    /*Se carga la informacion sobre la pantalla*/
    loadScreenData();
}

function loadScreenData() {
    monitor = eval('(' + JSON.stringify(monitor) + ')');
    $("#txtHora").val(monitor.HoraEvento);
    $("#txtFuenteAg").val(monitor.FuenteAgencia);
    $("#txtTema").val(monitor.Tema);
    $("#txtTitulo").val(monitor.Titulo);
    $("#txtObservaciones").val(monitor.Observacion);
    if(monitor.Relevancia == true)
        $("#chkRelevancia").attr('checked', 'checked');
}

function isValidData() {
    var msg = "";
    var resp = false;

    if ($.trim($("#txtHora").val()) == "")
        msg += "El campo Hora es obligatorio.<BR/>";
    if ($.trim($("#txtFuenteAg").val()) == "")
        msg += "El campo de Agencia es obligatorio. <BR/>";
    if ($.trim($("#txtTitulo").val()) == "")
        msg += "El campo de T&iacute;tulo es obligatorio. <BR/>";
    if ($.trim($("#txtObservaciones").val()) == "")
        msg += "El campo de Observaciones es obligatorio. <BR/>";

    if ($.trim(msg) == "")
        resp = true;
    else {
        alertModal(msg);
    }
    return resp;
}

function updateData() {
    if (isValidData() == true) {
        monitor.HoraEvento = $.trim($("#txtHora").val());
        monitor.FuenteAgencia = $("#txtFuenteAg").val();
        monitor.Tema = $("#txtTema").val();
        monitor.Titulo = $("#txtTitulo").val();
        monitor.Observacion = $("#txtObservaciones").val();
        if ($("#chkRelevancia").attr('checked') == 'checked')
            monitor.Relevancia = 1;
        else
            monitor.Relevancia = 0;

        PageMethods.updateMonitor(JSON.stringify(monitor), successUpdateMonitor, Error);
    }
}

function successUpdateMonitor(result, userContext, methodName) {
    if (result == true)
        alertModalFunction("La informaci&oacute;n del Monitoreo ha sido actualizada.", successUpdateMon);
    else
        alertModalFunction("Ocurri&oacute; un error al actualziar la informaci&oacute;n del Monitoreo", successUpdateMon);
}

function successUpdateMon(result, userContext, methodName) {
    parent.closeWindow(initParams['windowId']);
}