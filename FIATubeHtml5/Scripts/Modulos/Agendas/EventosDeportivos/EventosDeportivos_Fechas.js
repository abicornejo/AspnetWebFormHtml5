
var initParams;
var infoEvent;
var selectedEvent;

window.onload = function () { initialize(); };

function initialize() {
    initParams = getUrlVars();
    configControls();

    $("#lblFecha").empty();
    $("#lblFecha").append(initParams['date']);
}

function configControls() {
    showButtons(initParams['isEdtar']);

    if (initParams['isEdtar'] != 'true')
        $("#dtFechaInicio").datepicker('disable');

    $("#txtHoraInicio").timepicker({});
    $("#txtHoraFin").timepicker({});
}

function showButtons(isEdit) {
    consultaProgramas();
    $("#dtFechaInicio").datepicker({});
    $("#dtFechaFin").datepicker({});
    $("#btnAgregarSubEvento").show();
    $("#btnGuardar").show();
    if (isEdit == 'true') {
        $("#btnSolicitud").show();
        $("#btnGraficos").show();
        $("#btnLogistica").show();
        $("#btnObservaciones").show();
        $("#btnEquipo").show();
        $("#btnIngestion").show();
        $("#btnMultiplesOT").show();
        $("#btnNuevaOT").show();
        $("#btnEliminar").show();
        $("#acdAcordion").accordion({ disabled: false });
        getEventoDptvo();
    }
    else {
        $("#dtFechaInicio").val(initParams['date']);
        $("#dtFechaFin").val(initParams['date']);
        $("#txtTitulo").val('Nuevo Evento');
        $("#acdAcordion").accordion({ disabled: true });
    }
}

function consultaProgramas() {
    executeSyncRequest(wsMtdoConsultaProgramaEmpleado, "{ 'EMPL_LLAV_PR': '" + sessionStorage.numUsuario + "' }", successConsultaProgramaEmpleado, Error);
}

var successConsultaProgramaEmpleado = function (data, status) {
    $("#cmbProgramas").empty();
    $("#cmbProgramas").append("<option value='-1'>== SELECCIONE ==</option>");
    $.each(data.d, function (index, programa) {
        $("#cmbProgramas").append('<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>');
    });
}

function getEventoDptvo() {
    var fecha = initParams['date'].split('/');
    executeRequest(wsMtdGetEvnDptvo, "{ 'idEvento':" + initParams['event'] + ", 'Dia':'" + fecha[0] + "', 'Mes':'" + fecha[1] + "', 'Anio':'" + fecha[2] + "' }", successGetEvnDptvo, Error);
}

var successGetEvnDptvo = function (data, status) {
    infoEvent = data.d;

    $("#txtTitulo").val(infoEvent.sTitulo);
    $("#txtDescripcion").val(infoEvent.sDescripcion);
    $("#txtLugar").val(infoEvent.sLugar);
    $("#dtFechaInicio").val(parseJSONToDate(infoEvent.dtFechaInicio).esMXFormat());
    $("#dtFechaFin").val(parseJSONToDate(infoEvent.dtFechaFin).esMXFormat());
    $("#txtHoraInicio").val(infoEvent.sHoraIni);
    $("#txtHoraFin").val(infoEvent.sHoraFin);
    $("#cmbProgramas").val(infoEvent.CvePrograma);

    if (infoEvent.subEventos.length > 0) {
        /*Se muestra el arbol de eventos del lado izquierdo de la pantalla*/
        parent.resizeWindow(initParams['windowId'], widthDivEvnDptvoTree, heigthDivEvnDptvo);
        makeEventTree(infoEvent);
    }

    infoEvent.dtFechaInicio = parseJSONToDate(infoEvent.dtFechaInicio);
    infoEvent.dtFechaFin = parseJSONToDate(infoEvent.dtFechaFin);

    selectedEvent = infoEvent.IdEvento;
}

function loadScreenInfo(infoEvent) {

    infoEvent = eval("(" + infoEvent + ")");

    infoEvent.dtFechaInicio = parseJSONToDate(infoEvent.dtFechaInicio);
    infoEvent.dtFechaFin = parseJSONToDate(infoEvent.dtFechaFin);

    $("#txtTitulo").val(infoEvent.sTitulo);
    $("#txtDescripcion").val(infoEvent.sDescripcion);
    $("#txtLugar").val(infoEvent.sLugar);
    $("#dtFechaInicio").datepicker('setDate', infoEvent.dtFechaInicio);
    $("#dtFechaFin").datepicker('setDate', infoEvent.dtFechaFin);
    $("#txtHoraInicio").val(infoEvent.sHoraIni);
    $("#txtHoraFin").val(infoEvent.sHoraFin);
    $("#cmbProgramas").val(infoEvent.CvePrograma);
}

function makeEventTree(eventData) {
    var contenido = '';
    $("#divEventTree").show();
    $("#divEventTree").empty();
    contenido += "<div><label class='eventTreeItem' data-evt='" + eventData.IdEvento + "' data-val='" + JSON.stringify(eventData) + "'>" + eventData.sTitulo + "</label><br/></div>";
    $.each(eventData.subEventos, function (index, evento) {
        contenido += "<div><label style='margin-left: 2em' class='eventTreeItem' data-evt='" + evento.IdEvento + "' data-val='" + JSON.stringify(evento) + "'>" + evento.sTitulo + "</label><br/></div>";
    });
    $("#divEventTree").append(contenido);
}

$(function () {
    $("#divEventTree").delegate(".eventTreeItem", "mouseover", function () {
        this.style.cursor = 'pointer';
        this.style.background = 'lightslategrey';
    });
    $("#divEventTree").delegate(".eventTreeItem", "mouseout", function () {
        this.style.cursor = 'pointer';
        this.style.background = 'none';
    });
    $("#divEventTree").delegate(".eventTreeItem", "click", function () {
        selectedEvent = $(this).attr('data-evt');
        loadScreenInfo($(this).attr('data-val'));
    });
});

function btnAgregarSubEvento_click() {
    if (validarSubEvtoExistente() == true) {
        clearScreenData();

        /*Se crea el registro sobre el arbol de eventos*/
        var newEvnt = new THE_EventoDeportivo();
        newEvnt.IdEvento = -1;
        newEvnt.sTitulo = 'Nuevo Evento';
        newEvnt.sHoraIni = infoEvent.sHoraIni;
        newEvnt.sHoraFin = infoEvent.sHoraFin;
        newEvnt.dtFechaInicio = $("#dtFechaInicio").datepicker('getDate');
        newEvnt.dtFechaFin = $("#dtFechaFin").datepicker('getDate');
        $("#divEventTree").append("<div><label style='margin-left: 2em' class='eventTreeItem' data-evt='-1' data-val='" + JSON.stringify(newEvnt) + "'>Nuevo Evento</label><br/></div>");
    }
    else
        alertModal('Debe guardar el evento actual antes de agregar un subevento.');
}

function clearScreenData() {
    $("#txtTitulo").val('Nuevo Evento');
    $("#txtDescripcion").val('');
    $("#txtLugar").val('');
    $("#dtFechaFin").val(initParams['date']);
    $("#dtFechaInicio").val(initParams['date']);
    $("#txtHoraInicio").val(infoEvent.sHoraIni);
    $("#txtHoraFin").val(infoEvent.sHoraFin);
    $("#cmbProgramas").val(-1);
    $("#cmbProgramas").attr('disabled', 'disabled');
    $("#acdAcordion").accordion({ disabled: true });
}

function validarSubEvtoExistente() {
    var isValid = true;
    if ($("#divEventTree .eventTreeItem[data-evt=-1]").length > 0 || infoEvent == undefined)
        isValid = false;
    return isValid;
}

function btnDelete_click() {
    alertModalFunctionOKCancel('¿Desea borrar el evento: ' + $("#divEventTree .eventTreeItem[data-evt=" + selectedEvent + "]").text() + "?", deleteEvent);
}

function btnObs_click() {
    parent.openModal("Agendas/EventosDeportivos/Observaciones_EVDT.aspx?evtId=" + selectedEvent, widthEventDptvoObs, heightEventDptvoObs, "Observaciones");
}

function deleteEvent() {
    var evento = new THE_EventoDeportivo();
    evento.IdEvento = selectedEvent;
    executeSyncRequest(wsMtdDeleteEvent, "{ 'EVDT':" + JSON.stringify(evento) + " }", successDeleteEvent, Error);
}

var successDeleteEvent = function (data, status) {
    if (data.d == true) {
        $("#divEventTree .eventTreeItem[data-evt=" + selectedEvent + "]").parent().remove();
        if (selectedEvent == infoEvent.IdEvento)
            parent.closeWindow(initParams['windowId']);
        else
            $($("#divEventTree .eventTreeItem")[0]).click();
    }
}

function openOption(option) {
    var thePage = "";
    var title = "";
    var width = -1;
    var height = -1;

    if (option == 'S') {
        thePage = "Solicitud/CreaSolicitud.aspx?idEvent=" + selectedEvent;
        title = "Nueva Solicitud";
        width = widthPropuesta;
        height = heigthPropuesta;
    }
    else if (option == 'G') {
        thePage = "Agendas/EventosDeportivos/Graficos.aspx?idEvent=" + selectedEvent;
        title = "Solicitudes de Gr&aacute;ficos";
        width = widthGraficos;
        height = heightGraficos;
    }
    else if (option == 'L') {
        thePage = "Agendas/EventosDeportivos/Logistica.aspx?idEvent=" + selectedEvent;
        title = "Log&iacute;stica";
        width = widthLogistica;
        height = heightLogistica;
    }
    else if (option == 'E') {
        thePage = "Agendas/EventosDeportivos/EquipoTrabajo_EVDT.aspx?idEvent=" + selectedEvent;
        title = "Equipo de Trabajo";
        width = widthEqTrabajo;
        height = heightEqTrabajo;
    }
    else if (option == 'I') {
        thePage = "Ingestion/NuevaIngestion.aspx?idEvent=" + selectedEvent;
        title = "Crear Ingesti&oacute;n OT";
        width = widthIngestionOT;
        height = heightIngestionOT;
    }
    else if (option == 'MO') {
        thePage = "OT/CreaOTMultiple.aspx?idEvent=" + selectedEvent;
        title = "Crear M&uacute;ltiples OT's";
        width = widthMOTs;
        height = heightMOTs;
    }
    else if (option == 'O') {
        thePage = "OT/OT.aspx?idEvent=" + selectedEvent;
        title = "Crear Orden de Trabajo";
        width = widthOT;
        height = heightOT;
    }

    parent.openModalUpdatable(thePage, width, height, title, this, option);
}

function updateForm(option) {
    if (option == 'S') 
        PageMethods.getSolicitudes(selectedEvent, onGetSolicitudesComplete, Error);
    else if (option == 'G') {
        
    }
    else if (option == 'L') {
        
    }
    else if (option == 'E')
        PageMethods.getEqTrabajo(selectedEvent, onGetEqTrabajoComplete, Error);
    else if (option == 'I') {
        
    }
    else if (option == 'MO') {
        
    }
    else if (option == 'O') {
        
    }
}

function onGetSolicitudesComplete(result, userContext, methodName) {
    $("#divSolContent").empty();
    $("#divSolContent").append(result);
}

function onGetEqTrabajoComplete(result, userContext, methodName) {
    $("#divEqTrabContent").empty();
    $("#divEqTrabContent").append(result);
}

function openAutSol(theSol) {
    alert('la voy a abrir');
}