
window.onload = initialize;

function initialize() {
    try {
        resetForm();
        /*Se carga combo de programas*/
        llenaProducciones();
    }
    catch (ex) {
        alertModal('Ocurrio un problema al inicializar la pantalla: ' + ex.Message);
    }
}

$(document).ready(function () {
    /*Se inizializa la fecha al dia actual*/
    $('#dtFecha').datepicker({ minDate: 0 });
    $('#dtFecha').datepicker('setDate', new Date());

    $("#MainContent_txtTeasers,#MainContent_txtBumpers,#MainContent_txtPistas,#MainContent_txtEnlaceH,#MainContent_txtEnlaceHT,#MainContent_txtEnlaceMoto,#MainContent_txtEnlaceMotoT,#MainContent_txtCortinillas,#MainContent_txtPromos,#MainContent_txtRompecortes,#MainContent_txtFotoportada").keydown(function (event) {
        // Allow: backspace, delete, tab and escape
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
        // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }
    });
});

function llenaProducciones() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdconsultaPrgEmpl, data, successLlenaProd, Error);
}

var successLlenaProd = function (data, status) {
    programas = data.d;
    $("#cmbProgramas").empty();
    $.each(programas, function (index, programa) {
        $("#cmbProgramas").append('<option value="' + programa.CvePrograma.CvePrograma + '">' + programa.CvePrograma.NombrePrograma + '</option>');
    });
}

function btnActualizar_click() {
    setFilters();
    $("#MainContent_btnActualizar").click();
}

function resetForm() {
    $("#MainContent_txtTeasers,#MainContent_txtBumpers,#MainContent_txtPistas,#MainContent_txtEnlaceH,#MainContent_txtEnlaceHT,#MainContent_txtEnlaceMoto,#MainContent_txtEnlaceMotoT,#MainContent_txtCortinillas,#MainContent_txtPromos,#MainContent_txtRompecortes,#MainContent_txtFotoportada").val(0);
}

function setFilters() {
    $("#MainContent_divResultados").empty();
    $("#MainContent_hiddPrg").val($("#cmbProgramas option:selected").val());
    $("#MainContent_hiddFec").val($("#dtFecha").datepicker('getDate').esMXFormat());
}