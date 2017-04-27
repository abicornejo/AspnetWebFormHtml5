
$(function () {
    $('#dtFecha').datepicker();
    $('#dtAgenda').datepicker();
});

/*Obtiene la informacion a mostrar dentro de las agendas*/
function getAgendaOTs(idSeccion, initDate, endDate, titulo, tipoNota, fabrica, txtOT, Produccion, success, error) {
    data = "{'SECC_LLAV_PR': '" + idSeccion + "', 'FECHA_INI':'" + initDate + "', 'FECHA_FIN':'" + endDate + "', 'AGSE_TITU':'" + titulo + "', 'AGSE_ORIG':'" + tipoNota +
           "', 'OTRA_LLAV_PR':'" + fabrica + "', 'OTRA_CVEC':'" + txtOT + "', 'ESIN_LLAV_PR':'" + Produccion + "'}";
    executeRequest(wsMtdgetAgendaOTs, data, success, error);
}
function getAgendaOTs_Locales(idSeccion, initDate, endDate, titulo, tipoNota, fabrica, txtOT, Produccion, idLocales, success, error) {
    data = "{'SECC_LLAV_PR': '" + idSeccion + "', 'FECHA_INI':'" + initDate + "', 'FECHA_FIN':'" + endDate + "', 'AGSE_TITU':'" + titulo + "', 'AGSE_ORIG':'" + tipoNota +
           "', 'OTRA_LLAV_PR':'" + fabrica + "', 'OTRA_CVEC':'" + titulo + "', 'ESIN_LLAV_PR':'" + Produccion + "', 'LOCL_DESC':'" + idLocales + "'}";
    executeRequest(wsMtdgetAgendaOTsLocales, data, success, error);
}





