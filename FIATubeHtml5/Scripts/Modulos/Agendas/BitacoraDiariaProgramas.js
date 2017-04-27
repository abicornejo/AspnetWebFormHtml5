
var initParams;
window.onload = function () { initialize(); }

function initialize() {
    initParams = getUrlVars();
    $("#dtFecha").datepicker("setDate", new Date());
    /*Se obtienen las secciones*/
    getSecciones();

    if (initParams['isFromMenu'] == 0) {
        $("#cmbSecciones").val(initParams['idSeccion']);
        $("#cmbProgramas").val(initParams['idProg']);
        $("#dtFecha").val(initParams['dtFecha']);
    }

    bindList();
}

function getSecciones() {
    var data = "{ 'FABR_LLAV_PR':'4', 'SECC_LLAV_PR':'' }";
    executeSyncRequest(wsMtdgetSecciones, data, successSecciones, Error);
}

var successSecciones = function (data, status) {
    $("#cmbSecciones").empty();
    if (data.d.length > 0) {
        $("#cmbSecciones").append('<option value="0">== TODOS ==</option>');
        $.each(data.d, function (index, seccion) {
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
    }
    else
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');
        
    getProgEmplFiltro();
}

function getProgEmplFiltro() {
    var data = "{ 'ESIN_LLAV_PR':'0', 'EMPL_LLAV_PR':'" + sessionStorage.numUsuario + "' }";
    executeSyncRequest(wsMtdGetProgEmplFiltro, data, successProgEmplFiltro, Error);
}

var successProgEmplFiltro = function (data, status) {
    $("#cmbProgramas").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, programa) {
            $("#cmbProgramas").append('<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>');
        });
    }
}

function cargaLocales() {
    getLocalesAgendas(successLocales, myError);
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });
    $("#cmbLocales").val(getLocalSeleccionar());
}

function updateData() {
    setFiltersData();
}

function bindList() {
    $("#MainContent_btnActualizar").click();
}

function setFiltersData() {
    var idProd = 0;
    var idsSeccion = 0;
    var localDescription = '';

    localDescription = '';
    if (new Number($("#cmbProgramas").val()) > 0)
        idProd = $("#cmbProgramas").val();
    if ($("#cmbSecciones").val() > 0)
        idsSeccion = $("#cmbSecciones").val();

    $("#MainContent_hiddSecc").val(idsSeccion);
    $("#MainContent_hiddFech").val($("#dtFecha").datepicker('getDate').esMXFormat());
    $("#MainContent_hiddLocl").val(localDescription);
    $("#MainContent_hiddProd").val(idProd);
}

function selectedValue_change() {
    bindList();
}

function imgVideo_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=-1&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function btnshowOT_click(control) {
    parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-val'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
}

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}