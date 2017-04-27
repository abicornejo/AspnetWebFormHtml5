
window.onload = function () { initialize(); };

function initialize() {

    /*Se cargan las fechas de la agenda*/
    diaIniAgenda = getFisrtDateOfWeek(new Date());
    $("#dtFecha").datepicker({});
    $("#dtFecha").datepicker('setDate', new Date());
    this.setValueLabelWeek();
    /*Se obtienen las secciones*/
    bindSecciones('4');
}

function setValueLabelWeek() {
    $("#lblWeekOfYear").empty();
    $("#lblWeekOfYear").append(getLabelOfWeek(diaIniAgenda));
}

function btnAtras_click() {
    diaIniAgenda.setDate(diaIniAgenda.getDate() - 7);
    $("#dtFecha").datepicker('setDate', diaIniAgenda);
    this.setValueLabelWeek();
    this.updateContent();
}

function btnAdelante_click() {
    diaIniAgenda.setDate(diaIniAgenda.getDate() + 7);
    $("#dtFecha").datepicker('setDate', diaIniAgenda);
    this.setValueLabelWeek();
    this.updateContent();
}

function bindSecciones(factory) {
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeRequest(wsMtdgetSecciones, data, successSecciones, Error);
}

var successSecciones = function (data, status) {
    var cont = 0;
    secciones = data.d;
    $("#cmbSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {
            if (index == 0)
                $("#cmbSecciones").append('<option value="0">== TODOS ==</option>');
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
        $("#cmbSecciones").prop('selectedIndex', 0);
    }
    else
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');

    /*Se manda a obtener la informacion del programa por empleado*/
    getProgEmplFiltro();
}

/*Obtiene los programas asociados al usuario*/
function getProgEmplFiltro() {
    var data = "{ 'ESIN_LLAV_PR':'0', 'EMPL_LLAV_PR':'" + sessionStorage.numUsuario +  "' }";
    executeRequest(wsMtdGetProgEmplFiltro, data, successProgEmpl, Error);
}

var successProgEmpl = function (data, status) {
    $("#cmbProduccion").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, programa) {
            $("#cmbProduccion").append('<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>');
        });
        $("#cmbProduccion").prop('selectedIndex', 0);
    }

    /*Se ejecuta la solicitud para llenar la pantalla*/
    updateContent();
}

function setFiltersData() {
    var endDateAgenda = new Date(diaIniAgenda);
    endDateAgenda.setDate(endDateAgenda.getDate() + 6);

    $("#MainContent_hiddFecIni").val(diaIniAgenda.esMXFormat());
    $("#MainContent_hiddFecFin").val(endDateAgenda.esMXFormat());
    $("#MainContent_hiddSecc").val($("#cmbSecciones").val());
    $("#MainContent_hiddProg").val($("#cmbProduccion").val());
}

function value_change() {
    this.updateContent();
}

function updateContent() {
    setFiltersData();
    $("#MainContent_btnActualizar").click();
}

function btnActualizar_click() {
    setFiltersData();
}

function showData_click(control) {
    parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-numOT'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
}

function imgVideo_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=' + $(contenedor).attr('data-cProg') + '&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

$(function () {
    $("#MainContent_updPanel1").delegate(".openMdlAgDiaria", "click", function () {
        parent.openModal("Agendas/AgendaDiariaProgramas.aspx?isFromMenu=0&idSeccion=" + $(this).attr('data-secc') + "&dtFecha=" + $(this).attr('data-fecha') + "&idProg=" + $(this).attr('data-prog'), -1, -1, 'Agenda Diaria por Programa');
        return false;
    });
    $("#MainContent_updPanel1").delegate(".openMdlAgDiaria", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
        return false;
    });
});

function dtFecha_change() {
    diaIniAgenda = getFisrtDateOfWeek($("#dtFecha").datepicker('getDate'));
    this.setValueLabelWeek();
    updateContent();
}

function errorImg(control){
    control.src = '../../Images/noimage.png';
}