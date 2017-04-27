
/************************************************************************************************************************************/
/************************************************** Solicitar Material***************************************************************/
window.onload = function () { initialize(); };
var initParams;

function initialize() {
    /*Se obtienen los parametros de entrada a la pagina*/
    initParams = getUrlVars();
}

/*Funcion que define la forma como se abren los dialogs de la pagina de agenda semanal*/
$(function () {
    $("#SolicitudMaterial").dialog({
        autoOpen: false,
        height: 250,
        width: 650,
        open: function (type, data) {
            $(this).parent().appendTo("form");
        }
    });
});

function AbreSolicitud() {
    $("#SolicitudMaterial").dialog("open");
}

function ActualizaDialogo() {

    $("#SolicitudMaterial").dialog({
        autoOpen: false,
        height: 250,
        width: 650,
        open: function (type, data) {
            $(this).parent().appendTo("form");
        }
    });
}

function imgVideoSolMat_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-OT') + '&numProg=-1&uriVideo=' + $(contenedor).attr('data-video') + '&uriImg=' + $(contenedor).attr('data-imagen') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function EventoclickBoton(contenedor, restaura) {

    var oML = eval('(' + $(contenedor).attr('data-ML') + ')');
    $("#MainContent_lblLocal").append($(contenedor).attr('data-Local'));
    $("#MainContent_HDAgenda").val($(contenedor).attr('data-Agenda'));
    $("#MainContent_HDML").val($(contenedor).attr('data-ML'));

    $("#MainContent_HDAgenda2").val($(contenedor).attr('data-Agenda'));
    $("#MainContent_HDML2").val($(contenedor).attr('data-ML'));

    ActualizaDialogo();

    if (restaura) {
        AbreVideoConsultaDetonador();        
    }

    if (oML.VdoIdFilename != "" && $(contenedor).attr('data-Local') == "Ajusco" && $(contenedor).attr('data-exist') == "0") 
    {
             
             AbreVideoConsultaDetonador();
    }
    else {
        AbreSolicitud();
    }
}

function ClickGuardar() {
    $("#MainContent_BtnDetonador").click();
}
function AbreVideoConsultaDetonador() {
    $("#MainContent_BtnVideoConsulta").click();
}

function SinResultado() {
    initParams = getUrlVars();
    alertModal("No se encontraron registros para ser Transportados.");
    parent.closeWindow(initParams['windowId']);
}

function AbreVideoConsulta() {
    parent.openModal('Video/VideoConsulta.aspx', widthVisorVideoConsulta, heigthVidorVideoConsulta, 'Recuperacion');
}

function AbreMonitorTransferencias() 
{
    var myId = parent.openModal("Transferencias/Transferencias.aspx", -1, -1, "Monitor de Transferencias");
    maximizeWindow(myId);
}
var successFunctionSolicita = function (inParam) 
{
    EventoclickBoton(inParam);
}
var cancelFunctionSolicita = function (inParam) {
    EventoclickBoton(inParam, true);
}
