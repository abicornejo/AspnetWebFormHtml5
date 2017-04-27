
var porEliminar = "";
var totRegToCreate = 4;

window.onload = function() { initialize(); };

function initialize() {

    $("#MainContent_dtFEve").datepicker({ minDate: 0 });
    $("#MainContent_dtFEve").datepicker('setDate', new Date());

    /*Se carga combo de tipos de monitoreo*/
    getListMonitorType();

    creaGridCaptura();

    /*Se actualiza el grid de monitoreos por dia*/
    loadMonitorsPerDay();
}

function getListMonitorType() {
    executeRequest(wsMtdGetMonitorListType, "{ }", successGetMonitorListType, Error);
}

var successGetMonitorListType = function (data, status) {
    $("#cmbTipoMon").empty();
    $("#cmbTipoMon").append("<option value='-1'>== SELECCIONE ==</option>");
    var contenido = "";

    if (data.d != undefined) {
        $.each(data.d, function (index, monitorType) {
            contenido += "<option value='" + monitorType.TipoMonitoreoLlavPr + "'>" + monitorType.Descripcion + "</option>";
        });
        $("#cmbTipoMon").append(contenido);
    }
}

function loadMonitorsPerDay() {
    $("#MainContent_divMonitorContent").empty();
    $("#MainContent_btnUpdateData").click();
}

function deleteMonitoreo(control) {
    porEliminar = $($($(control).parent()).parent()).attr('data-pin');
    alertModalFunctionOK("¿Realmente desea borrar el monitoreo?", deleteOK);
}

var deleteOK = function (data, status) {
    PageMethods.deleteMonitor(porEliminar, successDeleteMonitor, Error);
    porEliminar = "";
}

function successDeleteMonitor(result, userContext, methodName) {
    if (result == true) {
        alertModal("El monitoreo ha sido eliminado.");
        loadMonitorsPerDay();
    }
    else
        alertModal("No se pudo eliminar el registro.");
}

function updateMonitoreo(control) {
    $("#MainContent_hiddVal").val($($($(control).parent()).parent()).attr('data-pin'));
    $("#MainContent_btnSendEdit").click();
}

function updateForm() {
    loadMonitorsPerDay();
}

function creaGridCaptura() {
    var content = "";
    $("#divRegCapContent").empty();
    for (i = 0; i < totRegToCreate; i++) {
        content += "<div class='divFilaMonitor'>";
        content += "<div><input id='dtTime_" + i + "' type='text' class='txtHourPicker' value='00:00' placeholder='HH:MM' maxlength='5' readonly='readonly'/></div>";
        content += "<div><input id='txtFuente_" + i + "' type='text'/></div>";
        content += "<div><input id='txtTema_" + i + "' type='text'/></div>";
        content += "<div><input id='txtTitulo_" + i + "' type='text'/></div>";
        content += "<div><textarea id='txtObs_" + i + "'></textarea></div>";
        content += "<div><input id='check_" + i + "' type='checkbox'/></div>";
        content += "</div>";
    }
    $("#divRegCapContent").append(content);
    $(".txtHourPicker").timepicker({});
}

function isValidSaveData() {
    var msg = "";
    if ($.trim($("#MainContent_dtFEve").val()) == "" || $("#MainContent_dtFEve").datepicker('getDate') == undefined) 
        msg += "El campo de fecha no puede esta vacio."

    if ($("#cmbTipoMon").val() <= 0)
        msg += "Es necesario seleccionar un tipo de monitoreo.";

    if ($.trim(msg) != "") {
        alertModal(msg);
        return false;
    }

    return true;
}

function saveMonitor() {
    var ListaMonitoreo = new Array();
    if (isValidSaveData() == true) {
        for (i = 0; i < totRegToCreate; i++) {
            if ($.trim($("#txtObs_" + i).val()) != "" && $.trim($("#txtTitulo_" + i).val()) != "" && $.trim($("#txtFuente_" + i).val()) != "") {
                var Monitoreo = new THE_Monitoreo();

                Monitoreo.Observacion = $.trim($("#txtObs_" + i).val());
                Monitoreo.FabricaLLavPr = 4;//(Noticias),19(para pruebas con Locales).
                Monitoreo.FechaEvento = $("#MainContent_dtFEve").datepicker('getDate').defaultView();
                Monitoreo.FuenteAgencia = $.trim($("#txtFuente_" + i).val());
                Monitoreo.Gene = "";
                Monitoreo.HoraEvento = $.trim($("#dtTime_" + i).val());
                Monitoreo.MonitoreoLlavPr = 0;
                Monitoreo.Programa = "";
                if($("#check_" + i).attr('checked') == 'checked')
                    Monitoreo.Relevancia = 1;
                else
                    Monitoreo.Relevancia = 0;
                Monitoreo.Tema = $.trim($("#txtTema_" + i).val());
                Monitoreo.TipoMonitoreoLlavPr = new TDI_TipoMonitoreo();
                Monitoreo.TipoMonitoreoLlavPr.TipoMonitoreoLlavPr = new Number($("#cmbTipoMon").val());
                Monitoreo.Titulo = $.trim($("#txtTitulo_" + i).val());

                ListaMonitoreo.push(Monitoreo);
            }
        }

        if (ListaMonitoreo.length > 0) 
            PageMethods.saveMonitor(ListaMonitoreo, successSaveMonitor, Error);
        else {
            alertModal("La información de Observaciones, Título y Agencia es obligatoria.");
            return false;
        }
    }
}

//var successSaveMonitor = function (data, status) {
//    if (data.d > 0) {
//        this.creaGridCaptura();
//        this.loadMonitorsPerDay();
//    }
//    else
//        alertModal("Ocurrio un problema al guardar los registros");
//}

function successSaveMonitor(result, userContext, methodName) {
    if (result > 0) {
        this.creaGridCaptura();
        this.loadMonitorsPerDay();
    }
    else
        alertModal("Ocurrio un problema al guardar los registros");
}