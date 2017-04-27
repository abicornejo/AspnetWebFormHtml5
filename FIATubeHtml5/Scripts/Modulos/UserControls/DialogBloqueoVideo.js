
var initParams;

function initialize() {

    initParams = getUrlVars();
    /*Se obtienen los tipos de bloqueo*/
    executeRequest(wsMtdGetTipoBloqueoVideo, "{ }", successGetTipoBloqueoVideo, Error);
}

var successGetTipoBloqueoVideo = function (data, status) {
    try {
        $("#divOpcBloqueo").empty();
        if (data.d.length > 0) {
            $.each(data.d, function (index, option) {
                $("#divOpcBloqueo").append("<input type='checkbox' id='' checked='checked' />");

                $("#divOpcBloqueo").append("<label for=''></label>");
            });
        }
    }
    catch (ex) {
        alertModal('Ocurrio un problema al obtener la informacion de tipos de bloqueo: ' + ex.Message);
    }
}