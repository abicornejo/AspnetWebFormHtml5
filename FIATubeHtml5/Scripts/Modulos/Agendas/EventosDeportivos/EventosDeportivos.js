
window.onload = function () {  };

function btnGetNewDate(value) {
    var newDate = $.datepicker.parseDate("dd/mm/yy", $("#MainContent_hiddDate").val());
    newDate.setMonth(newDate.getMonth() + value);
    $("#MainContent_hiddDate").val(newDate.esMXFormat());
    $("#MainContent_btnActualizar").click();
}

function openNewEvDptvo(control) {
    parent.openModalUpdatable('Agendas/EventosDeportivos/EventosDeportivos_Fechas.aspx?date=' + $(control).attr('data-dte') + '&isEdtar=false', widthDivEvnDptvo, heigthDivEvnDptvo, 'Evento Deportivo', this);
}

function openEvDptvo(control) {
    parent.openModalUpdatable('Agendas/EventosDeportivos/EventosDeportivos_Fechas.aspx?event=' + $(control).attr('data-val') + '&date=' + $(control).attr('data-dte') + '&isEdtar=true', widthDivEvnDptvo, heigthDivEvnDptvo, 'Evento Deportivo', this);
}

function updateForm() {
    $("#MainContent_btnActualizar").click();
}
