
var cableData;
var initParams;

window.onload = function () { initialize(); };

$(function () {
    $('#dtFechaCab').datepicker({ minDate: 0 });
});

function initialize() {
    initParams = getUrlVars();

    /*Se carga informacion de pantalla*/
    consultaCable();
    $('#dtFechaCab').datepicker('setDate', new Date());
    llenaProducciones();
    ObtenerSeccionFormatoXIDEmpleado();
}

function btnCancelarCab_click() {
    parent.closeWindow(initParams['windowId']);
}

function llenaProducciones() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdconsultaPrgEmpl, data, successLlenaProd, Error);
}

var successLlenaProd = function (data, status) {
    programas = data.d;
    $("#cmbProgramasCab").empty();
    $.each(programas, function (index, programa) {
        $("#cmbProgramasCab").append("<option data-val='" + JSON.stringify(programa) + "' value='" + programa.CvePrograma.CvePrograma + "'>" + programa.CvePrograma.NombrePrograma + "</option>");
    });
}

function ObtenerSeccionFormatoXIDEmpleado() {
    data = "{ 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdoObtenerSeccionFormatoXIDEmpleado, data, successObtenerSeccionFormatoXIDEmpleado, Error);
}

var successObtenerSeccionFormatoXIDEmpleado = function (data, status) {
    $("#cmbFormatoCab").empty();
    $("#cmbFormatoCab").append('<option value="">== SELECCIONE ==</option>');
    $.each(data.d, function (index, SecCarrito) {
        $("#cmbFormatoCab").append("<option data-val='" + JSON.stringify(SecCarrito) + "' value='" + SecCarrito.CveFormato["CveFormato"] + "'>" + SecCarrito.CveFormato["Descripcion"] + "</option>");
    });
}

function consultaCable() {
    data = "{ 'cveCable': " + initParams['cbl'] + " }";
    executeSyncRequest(wsMtdConsultaCable, data, successconsultaCable, Error);
}

var successconsultaCable = function (data, status) {
    if (data.d.length <= 0) {
        alertModal("Ocurrio un problema al obtener la informacion del Cable.");
        return false;
    }

    cableData = data.d[0];
    cableData.Fecha = cableData.Fecha.toString().replace('/Date(', '').replace(')/', '');
    cableData.Fecha = cableData.Fecha.toString().substr(0, cableData.Fecha.indexOf('-'));
    cableData.Fecha = new Date(new Number(cableData.Fecha));
}

function ValidaCampos(){
    if ($("#cmbFormatoCab").val() <= 0){
        alertModal("Seleccione un formato asociado");
        return false;
    }
    if (compareDates($("#dtFechaCab").datepicker('getDate'), new Date()) > 0) {
        alertModal("La fecha de compra no puede ser menor a la fecha actual.");
        return false;
    }
    return true;
}

function btnGuardarCab_click() {
    if (ValidaCampos() == true) {
        var oOrdenTrabajo = new THE_OrdenTrabajo();
        var oSeccion = new TDI_Seccion();
        var oCliente = new TDI_Cliente();
        var oTipoNota = new TDI_TipoNota();
        var oCveOrigen = new TDI_Origen();
        var oAgendaSemanal = new THE_AgendaSemanal();
        var oEquipoTrabajo = new THE_EquipoTrabajo();
        var oPuestosRpt = new TDI_Puestos();
        var lstEquipo = new Array();
        var fooPrograma = new TDI_Programa();
        var oEmpleado = new TDI_EMPL();
        var cveEmpl;

        cveEmpl = cableData.CveSecc.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
        oSeccion = cableData.CveSecc;
        oEmpleado.EmpleadoLlavePrimaria = cableData.CveSecc.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
        oTipoNota.CveTipoNota = 1;
        oCveOrigen.CveOrigen = 1;

        oAgendaSemanal.FechaInicio = $.datepicker.formatDate('dd/mm/yy', cableData.Fecha);
        oAgendaSemanal.Origen = "O";
        oAgendaSemanal.Estatus = "A";
        oAgendaSemanal.CveSeccion = oSeccion;
        oAgendaSemanal.CveTipoNota = oTipoNota;
        oAgendaSemanal.Titulo = cableData.Titulo;
        oAgendaSemanal.FechaCreacion = new Date();

        /*Puestos para Reporteros 1*/
        //PROGRAMA 0
        fooPrograma.CvePrograma = 0;
        oPuestosRpt.PuestoLlavePrimaria = 1;
        if (cableData.CveEmpl != undefined && cableData.CveEmpl != '') {
            if (cableData.CveEmpl > 0) {
                oEquipoTrabajo = new THE_EquipoTrabajo();
                oEquipoTrabajo.EmpleadoLlavePrimaria = new TDI_EMPL();
                oEquipoTrabajo.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria = cableData.CveEmpl;
                oEquipoTrabajo.CveEquipoTrabajo = 0;
                oEquipoTrabajo.PuestoLlavePrimaria = oPuestosRpt;
                oEquipoTrabajo.CvePrograma = fooPrograma;
                lstEquipo.push(oEquipoTrabajo);
            }
        }

        oOrdenTrabajo.Titulo = cableData.Titulo;
        oOrdenTrabajo.Objetivo = cableData.Descripcion;
        oOrdenTrabajo.HistoryLine = cableData.Descripcion;
        oOrdenTrabajo.Usuario = sessionStorage.userDomain;
        oOrdenTrabajo.CveOrigen = oCveOrigen;
        oOrdenTrabajo.CveTipoNota = oTipoNota;
        oOrdenTrabajo.FechaEvento = cableData.Fecha;
        oOrdenTrabajo.CveSeccion = oSeccion;
        oOrdenTrabajo.CveEmpleado = oEmpleado;
        oOrdenTrabajo.CveCable = cableData.CveCable;

        if (lstEquipo.length > 0)
            oOrdenTrabajo.Estatus = "2";
        else
            oOrdenTrabajo.Estatus = "1";

        var data = "{ 'cveEmpleadoSeccion':" + cveEmpl + ", 'CveUsuario':'" + sessionStorage.userDomain + "', 'lstCompraOTIpad':" + JSON.stringify(llenaComprasOT(oOrdenTrabajo), null, 2) + ", 'Logistica':" + null + ", 'oOrdenTrabajo':" + JSON.stringify(oOrdenTrabajo, null, 2) + ", 'oAgendaSemanal':" + JSON.stringify(oAgendaSemanal) + ", 'lstEquipoTrabajoIpad':" + JSON.stringify(lstEquipo, null, 2) + ", 'esNueva':true, 'Tran':" + JSON.stringify(GenerateTransac(), null, 2) + " }";
        executeSyncRequest(wsMtdAlmacenaDatosOrdenTrabajoCompra, data, successAlmacenaDatosOrdenTrabajoCompra, myError);
    }
}

var successAlmacenaDatosOrdenTrabajoCompra = function (data, status) {
    parent.closeWindow(initParams['windowId']);
}

function myError(request, status, error) {
    alertModal('No se logro generar la OT y/o comprar la OT');
}

function llenaComprasOT(Source) {
    var oc = new Array();
    var oCompraOT = new CompraOT();

    oCompraOT.CveOrdenTrabajo = Source;
    oCompraOT.CveSeccionFormato = eval( "(" + $("#cmbFormatoCab option:selected").attr('data-val') + ")" );
    oCompraOT.CveProgramaEmpleado = eval( "(" + $("#cmbProgramasCab option:selected").attr('data-val') + ")" );
    oCompraOT.FechaCompra = $("#dtFechaCab").datepicker('getDate');
    oCompraOT.SeEnviaINEWS = true;

    oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio = oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio.toString().replace('/Date(', '').replace(')/', '');
    oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio = oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio.toString().substr(0, oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio.indexOf('-'));
    oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio = new Date(new Number(oCompraOT.CveProgramaEmpleado.CvePrograma.FechaInicio));

    oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin = oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin.toString().replace('/Date(', '').replace(')/', '');
    oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin = oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin.toString().substr(0, oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin.indexOf('-'));
    oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin = new Date(new Number(oCompraOT.CveProgramaEmpleado.CvePrograma.FechaFin));

    oc.push(oCompraOT);

    return oc;
}
