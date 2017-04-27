
var initParams;

window.onload = function () { initialize(); };

function initialize() {
    /*Se guarda el log de entrada a la pagina*/

    /*Se obtienen los parametros de entrada a la pagina*/
    initParams = getUrlVars();
}

function btnCancelar_click() {
    parent.closeWindow(initParams['windowId']);
}

function ValidaCamposCable() { 
    var msg = '';
    var valido = true;

    if ($.trim($("#MainContent_txtTitulo").val()) == "") {
        msg += "\nEl cable debe de tener Título.";
        valido = false;
    }

    if ($.trim($("#MainContent_txtDescripcion").val()) == "") {
        msg += "\nEl cable debe de tener descripción.";
        valido = false;
    }

    if (valido == false)
        alertModal(msg);

    return valido;
}

function btnGuardar_click() {
    if (ValidaCamposCable() == true) {
        if (initParams["CveCable"] != undefined && $.trim(initParams["CveCable"]) != '' && new Number(initParams["CveCable"]) > 0)
            ActualizarCable();
        else
            GuardarNuevoCable();
    }
}

function ActualizarCable() {
    var datosCable = new THE_Cable();
    datosCable.CveAgencia = new TDI_Agencia();

    datosCable.CveCable = initParams["CveCable"];
    datosCable.Titulo = $("#MainContent_txtTitulo").val();
    datosCable.Descripcion = $("#MainContent_txtDescripcion").val();
    datosCable.Avance = $("#MainContent_txtAvance").val();
    datosCable.Fecha = new Date();

    if ($("#MainContent_cmbReporteros").val() > 0)
        datosCable.CveEmpl = $("#MainContent_cmbReporteros").val();
    else
        datosCable.CveEmpl = '';

    datosCable.CveSecc = new TDI_Seccion();
    datosCable.CveSecc.CveSeccion = $("#MainContent_hidSecc").val();
    datosCable.CveAgencia.CveAgencia = 39;

    executeSyncRequest(wsMtdActualizarCable, "{ 'Source': " + JSON.stringify(datosCable, null, 2) + "}", successGuardaCable, Error);
}

function GuardarNuevoCable() {
    var newCable = new THE_Cable();
    newCable.CveAgencia = new TDI_Agencia();

    newCable.Titulo = $("#MainContent_txtTitulo").val();
    newCable.Descripcion = $("#MainContent_txtDescripcion").val();
    newCable.Fecha = new Date();
    newCable.Avance = $("#MainContent_txtAvance").val();
    newCable.CveAgencia.CveAgencia = 39;

    if ($("#MainContent_cmbReporteros").val() > 0)
        newCable.CveEmpl = $("#MainContent_cmbReporteros").val();
    else
        newCable.CveEmpl = '';

    newCable.CveSecc = new TDI_Seccion();
    newCable.CveSecc.CveSeccion = $("#MainContent_hidSecc").val();

    executeSyncRequest(wsMtdGuardaCable, "{ 'Source': " + JSON.stringify(newCable, null, 2) + "}", successGuardaCable, Error);
}

var successGuardaCable = function (data, status) {
    if (data.d == true) {
        parent.closeWindow(initParams['windowId']);
    }
    else
        alertModal("No se guardo el cable");
}

function cmbSeccion_changed() {
    $("#MainContent_hidSecc").val($("#MainContent_cmbSecciones").val());
}