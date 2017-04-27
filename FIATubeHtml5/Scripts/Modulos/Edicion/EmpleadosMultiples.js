
var soed;
var initParams;

window.onload = function () { initfunction(); };

function initfunction() {
    initParams = getUrlVars();
    $('div.modal').show();
    executeRequest(wsMtdGetRealizadores, "{ }", successGetRealizadores, myError);
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al cargar la informacion de pantalla: ' + request.statusText);
    $('div.modal').hide();
}

var successGetRealizadores = function (data, status) {
    try {
        var cadena = "";

        $.each(data.d, function (index, value) {
            if (index % 2 == 0)
                cadena += "<tr><td padding='10'><input type='checkbox' id='" + value.EmpleadoLlavePrimaria + "' /></td><td padding='10'><label for='" + value.EmpleadoLlavePrimaria + "' title='" + value.EmpleadoNombre + "'>" + value.EmpleadoNombre.substring(0, 27) + "</label></td>";
            else
                cadena += "<td padding='10'><input type='checkbox' id='" + value.EmpleadoLlavePrimaria + "' /></td><td padding='10'><label for='" + value.EmpleadoLlavePrimaria + "' title='" + value.EmpleadoNombre + "'>" + value.EmpleadoNombre.substring(0, 27) + "</label></td></tr>";
        });

        if (data.d.length % 2 != 0)
            cadena += "<td padding='10'></td><td padding='10'></td></tr>";

        $("#divRealizadores").empty();
        $("#divRealizadores").append("<table><tbody>" + cadena + "</tbody></table>");

        executeRequest(wsMtdGetDataWorkGroup, "{ 'CvePrograma': " + initParams["cPrg"] + ", 'CveOT':" + initParams["cvOT"] + " }", successGetDataGroup, myError);
    }
    catch(exception) {
        $('div.modal').hide();
    }
}

var successGetDataGroup = function (data, status) {
    try {
        $.each(data.d, function (index, value) {
            $("#" + value.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria).attr('checked', 'checked');
        });
    }
    finally {
        $('div.modal').hide();
    }
}

function btnGuardar_click() {
    try {
        $('div.modal').show();
        if (validaDatos()) {
            executeRequest(wsMtdDelWorkGroupSOED, "{ 'CveOT': " + initParams["cvOT"] + ", 'CveProg': " + initParams["cPrg"] + ", 'CvePuesto':3 }", successDelWGSOED, myError);
        }
        else {
            $('div.modal').hide();
            alertModal("Necesita tener por lo menos un empleado seleccionado");
        }
    }
    catch (exception) {
        $('div.modal').hide();
    }
}

var successDelWGSOED = function (data, status) {
    var equipo;
    var lstEquipo = new Array();
    try {
        var isDelete = true;
        $.each($("#divRealizadores input:checked"), function (index, value) {
            if (initParams["cEmpl"] == $(value).attr('id'))
                isDelete = false;

            equipo = new THE_EquipoTrabajo();
            equipo.CveOrdenTrabajo = new THE_OrdenTrabajo();
            equipo.CvePrograma = new TDI_Programa();
            equipo.PuestoLlavePrimaria = new TDI_Puestos();
            equipo.EmpleadoLlavePrimaria = new TDI_EMPL();

            equipo.CvePrograma.CvePrograma = initParams["cPrg"];
            equipo.ClavePrograma = initParams["cPrg"];
            equipo.CveOrdenTrabajo.CveOrdenTrabajo = initParams["cvOT"];
            equipo.PuestoLlavePrimaria.PuestoLlavePrimaria = 3;
            equipo.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria = $(value).attr('id');

            lstEquipo.push(equipo);
        });

        if (initParams["cEmpl"] != undefined && initParams["cEmpl"] > 0 && isDelete)
            eliminarEmpleadoSOED();

        executeRequest(wsMtdInsertWorkGroup, "{ 'EquipoTrabajoIpad': " + JSON.stringify(lstEquipo) + " }", successInsertWGroup, myError);
    }
    catch (exception) {
        $('div.modal').hide();
    }
}

var successInsertWGroup = function (data, status) {
    alertModal("Se guardaron correctamente los realizadores.");
    $('div.modal').hide();
}

function eliminarEmpleadoSOED() {
    executeSyncRequest(wsMtdUpdateSolEditor, "{ 'cveSolicitud':" + initParams["cSol"] + ", 'cvePrograma': " + initParams["cPrg"] + ", 'cveOT': " + initParams["cvOT"] + " }", successUpdateSolEditor, Error);
}

var successUpdateSolEditor = function (data, status) { }

function validaDatos() {
    var resp = false;

    if ($("#divRealizadores input:checked").length > 0)
        resp = true;

    return resp;
}