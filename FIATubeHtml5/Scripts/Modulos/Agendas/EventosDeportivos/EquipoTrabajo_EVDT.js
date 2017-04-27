
var arrEmpl;
var initParams;

window.onload = function () { initialize(); };

function initialize() {
    initParams = getUrlVars();
    executeSyncRequest(wsMtdGetEmplEvdt, "{ 'idEVDT':" + initParams["idEvent"] + "}", successGetEmplEvdt, Error);
}

var successGetEmplEvdt = function (data, status) {
    cargarEquipo(data.d);
}

function cargarEquipo(info) {
    var content = "";
    $("#lsbPers").empty();
    $.each(info, function (index, empl) {
        content += "<option value='" + empl.IdEmpleado + "' data-eqTra='" + empl.IdEquipoTrabajo + "'>" + empl.snombreEmpleado + "</option>";
    });
    $("#lsbPers").append(content);
}

$(function () {
    $("#txtPers").autocomplete({ source: arrEmpl });

    $("#txtPers").each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        /* change name of orig input */
        $(this).attr('id', formElementName + '_label');
        /* create new hidden input with name of orig input */
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrEmpl,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value.toString().split("|")[0]);
                return false;
            }            
        });
    });
});

function addPersonal() {
    var add = false;
    var name = $.trim($("#txtPers_label").val());
    $.each(arrEmpl, function (index, empl) {
        if (empl.label == name) {
            if ($("#lsbPers option[value=" + empl.value + "]").length <= 0) {
                var equipo = new THE_EquipoTrabajo_EVDT();
                var evntDeptvo = new THE_EventoDeportivo(initParams["idEvent"]);
                equipo.IdEmpleado = empl.value;
                equipo.EventoDeportivo = evntDeptvo;
                executeSyncRequest(wsMtdSaveEmplEVDT, "{ 'EQEV':" + JSON.stringify(equipo) + "}", successGetEmplEvdt, Error);
            }
            add = true;
            $("#txtPers_label").val("");
            return true;
        }
    });

    if(add == false)
        alertModal("Debe seleccionar un empleado v&aacute;lido.");
    return false;
}

function deletePersonal() {
    if ($("#lsbPers").val() != null && $("#lsbPers").val() != undefined) {
        var equipo;
        var lstEmpl = new Array();
        var evntDeptvo = new THE_EventoDeportivo();

        evntDeptvo.IdEvento = initParams["idEvent"];

        $.each($("#lsbPers").val().toString().split(","), function (index, value) {
            equipo = new THE_EquipoTrabajo_EVDT();
            equipo.EventoDeportivo = evntDeptvo;
            equipo.IdEquipoTrabajo = $("#lsbPers option[value=" + value + "]").attr('data-eqTra');
            lstEmpl.push(equipo);
            $("#lsbPers option[value=" + value + "]").remove();
        });

        executeSyncRequest(wsMtdDeleteEmplEVDT, "{ 'listEQEV':" + JSON.stringify(lstEmpl) + "}", successGetEmplEvdt, Error);
    }
}

$(function () {
    $("#txtPers_label").keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            addPersonal();
            event.preventDefault();
            event.stopPropagation();

        }
    });
});