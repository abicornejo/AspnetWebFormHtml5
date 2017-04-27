
var t;
var initParams;
var screenHgt = 0;
window.onload = function () { initialize(); };

function initialize() {
    /*Se guarda el log de acceso a la pagina*/
    initParams = getUrlVars();
    screenHgt = getMaxFloatableHeigth() - 130;

    /*Se inicializa en 6 el valor de TIempo mostrado*/
    $("#lblTiempo").empty();
    $("#lblTiempo").append(6);
    obtenerSecciones();
    /*Se carga combo de secciones*/
    updateForm();
}

function setTimer() {
    if(t != undefined)
        clearTimeout(t);

    try {
        if (parent.isWindowClosed() != undefined) {
            var time = 60000 * new Number($("#cmbTiempoAct").val());
            //t = setTimeout("alert('nuevo')", time);
        }
    }
    catch (ex) { }
}

function updateData() {
    /*Setear filtros para consulta*/
    $("#MainContent_hiddHrs").val($("#lblTiempo").text());
    $("#MainContent_hiddSec").val($("#cmbSecciones").val());

    /*Se limpia el contenido del grid*/
    $("#MainContent_divGridCables").empty();

    /*Se actualiza el intervalo de actualizacion*/
    setTimer();
}

function updateForm() {
    $("#MainContent_btnActualizar").click();
}

function abrirAvance(control) {
    var title = 'Avances ';
    var theUri = "OT/AvancesOT.aspx?advanceType=" + $(control).attr('data-type') + "&numOT=" + $(control).attr('data-numDat');
    theUri += "&title=" + $(control).attr('data-titu') + "&oCve=" + $(control).attr('data-oCve');

    if ($(control).attr('data-type') == 'C')
        parent.openModal('OT/NuevoCable.aspx?CveCable=' + $(control).attr('data-numDat'), widthNuevoCable, heigthNuevoCable, 'Editar Cable: ' + $(control).attr('data-oCve'));
    else {
        if ($(control).attr('data-type') == 'O')
            title += 'OT: ' + $(control).attr('data-oCve');
        else if ($(control).attr('data-type') == 'P')
            title += 'Prop: ' + $(control).attr('data-oCve');
        parent.openModalUpdatable(theUri, widthAvancesOT, heigthAvancesOT, title, this);
    }
}

function imgVideo_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=-1&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function showData_click(control) {
    if ($(control).attr('data-rot').toString() == 'O') 
        parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
    else if ($(control).attr('data-rot').toString() == 'P') 
        parent.openModal('Propuesta/CreaPropuesta.aspx?numProp=' + $(control).attr('data-value'), widthPropuesta, heigthPropuesta, 'Actualizaci&oacute;n de Propuesta: ' + $(control).attr('data-oCve'));
    else if ($(control).attr('data-rot').toString() == 'C')
        parent.openModalUpdatable('OT/NuevoCable.aspx?CveCable=' + $(control).attr('data-value'), widthNuevoCable, heigthNuevoCable, 'Editar Cable: ' + $(control).attr('data-oCve'), this);
}

function btnNuevaOT_click() {
    parent.openModalUpdatable('OT/OT.aspx?numOT=', -1, -1, 'Agregar Cable', this);
}

function btnNuevaProp_click() {
    parent.openModalUpdatable('Propuesta/CreaPropuesta.aspx', widthPropuesta, heigthPropuesta, 'Agregar Cable', this);
}

function btnNuevoCable_click() {
    parent.openModalUpdatable('OT/NuevoCable.aspx', widthNuevoCable, heigthNuevoCable, 'Agregar Cable', this);
}

function btnResTiempo_click() {
    var value = new Number($("#lblTiempo").text());
    if (value > 6) {
        value -= 6;
        $("#lblTiempo").empty();
        $("#lblTiempo").append(value);
        updateForm();
    }
}

function btnSumTiempo_click() {
    var value = new Number($("#lblTiempo").text());
    if (value < 48) {
        value += 6;
        $("#lblTiempo").empty();
        $("#lblTiempo").append(value);
        updateForm();
    }
}

function cmbTiempoAct_changed() {
    updateForm();
}

function abrirCompra(control) {
    parent.openModalUpdatable('Shopping Car/CableShoppingCar.aspx?cbl=' + $(control).attr('data-cbl'), widthCableShoppingCar, heigthCableShoppingCar, 'Compra Cable', this);
}

function obtenerSecciones() {
    executeSyncRequest(wsMtdObtenerSecc, "{}", successSecciones, Error);
}

var successSecciones = function (data, status) {
    secciones = data.d;
    $("#cmbSecciones").empty();
    $.each(secciones, function (index, seccion) {
        if (index == 0)
            $("#cmbSecciones").append('<option value="-1">== TODAS ==</option>');    
        $("#cmbSecciones").append('<option value="' + seccion.CveSeccion + '">' + seccion.NombreSeccion + '</option>');
    });
}

function cmbSecciones_change() {
    updateForm();
}