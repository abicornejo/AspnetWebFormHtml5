
var fabr = '4';
var initParams;

window.onload = function () { initialize(); };


function initialize() {

    /*Se obtienen los parametros de entrada a la pagina*/
    initParams = getUrlVars();

    /*Se carga funcionalidad de datepicker*/
    $("#dtFecha").datepicker();
    $("#dtFecha").datepicker('setDate', new Date());

    /*Se actualiza informacion con data inicial*/
    updateData();
}

function updateData() {
    $("#MainContent_btnActualizar").click();
}

function setFilters() {
    $("#MainContent_hiddFabr").val(fabr);
    $("#MainContent_hiddDate").val($("#dtFecha").val());
}

function openAdvanceWindow(control) {
    $("#MainContent_hiddCurV").val($(control).attr('data-val'));
    $("#MainContent_btnOpenAdvanc").click();
}

function createNewOT() {
    PageMethods.createNewOT($("#MainContent_hiddVal").val(), GenerateTransac(), onCreateNewOTComplete, Error);
}

function onCreateNewOTComplete(result, userContext, methodName) {
    if (result != "") {
        alertModal(result);
    }
    else
        alertModal('No fue posible crear la Orden de Trabajo.');
}