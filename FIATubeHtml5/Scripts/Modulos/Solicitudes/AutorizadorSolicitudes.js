
var idSeccEmpl = '0';
var screenHgt = 0;

window.onload = function () { initialize(); };

$(function () {
    var dates = $("#dtFechaIni, #dtFechaFin").datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            var option = this.id == "dtFechaIni" ? "minDate" : "maxDate",
    					instance = $(this).data("datepicker"),
    					date = $.datepicker.parseDate(
    						instance.settings.dateFormat ||
    						$.datepicker._defaults.dateFormat,
    						selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
            value_change();
        }
    });

    $("#dtFechaIni").datepicker('setDate', new Date());
    $("#dtFechaFin").datepicker('setDate', new Date());
});

function initialize() {
    screenHgt = getMaxFloatableHeigth() - 100;

    getLocales(successLocales, Error);

    /*Se carga combo de secciones*/
    getSeccionByEmpleado();

    /*Se realiza la carga inicial de informacion */
    this.value_change();
}

function value_change() {
    $("#MainContent_btnActualizar").click();
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            if (local.Local.LocalLlave > 0)
                $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
            else if (local.LocalLlave > 0)
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    $("#cmbLocales").val(getLocalSeleccionar());
}

function getSeccionByEmpleado() {
    var data = "{ 'idEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdgetSeccionEmpl, data, successSeccEmpl, Error);
}

var successSeccEmpl = function (data, status) {
    if (data.d != undefined) {
        idSeccEmpl = data.d.CveSeccion;
        bindSecciones();
    }
}

function bindSecciones(factory) {
    if ($("#cmbLocales").val() == 36) {
        var data = "{ 'FABR_LLAV_PR':'4', 'SECC_LLAV_PR':''}";
        executeSyncRequest(wsMtdgetSecciones, data, successSecciones, myError);
    }
    else {
        $("#cmbSecciones").empty();
        $("#cmbSecciones").append('<option value="114">NOTICIAS LOCALES</option>');
    }
}

var successSecciones = function (data, status) {
    var cont = 0;
    var indexSeccEmpl = 0;
    var secciones = data.d;
    $("#cmbSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {
            if (index == 0)
                $("#cmbSecciones").append('<option value="0">Todas...</option>');
            if (seccion.SeccLlPr == idSeccEmpl && cont == 0) {
                cont = index;
                indexSeccEmpl = cont + 1;
                idSeccion = seccion.SeccLlPr;
                $("#MainContent_hiddSecc").val(idSeccion);
            }
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
        $("#cmbSecciones").prop('selectedIndex', (indexSeccEmpl));
        //$("#chkVerSeccion").attr('checked', true);
    }
    else
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');

    //bindProgramas();
}

function bindProgramas() {
    executeSyncRequest(wsMtdConsPrgFIA, "{ }", successConsProgFIA, Error);
}

var successConsProgFIA = function (data, status) {
    $("#cmbPrograma").empty();
    if (data.d.length > 0) {
        $("#cmbPrograma").append('<option value="0">== TODOS ==</option>');
        $.each(data.d, function (index, program) {
            $("#cmbPrograma").append("<option value='" + program.CvePrograma + "'>" + program.NombrePrograma + "</option>");    
        });
    }
}

function actualizaDatos() {
    if ($("#cmbLocales").val() == undefined || $("#cmbLocales").val() == '' || $("#cmbLocales").val() < 0) {
        alertModal('Debe especificar una Local');
        return false;
    }

    /*Se establecen los valores de los filtros*/
    $("#MainContent_hiddSecc").val($("#cmbSecciones").val());
    $("#MainContent_hiddProg").val($("#cmbPrograma").val());
    $("#MainContent_hiddFecI").val($("#dtFechaIni").val());
    $("#MainContent_hiddFecF").val($("#dtFechaFin").val());
    $("#MainContent_hiddLocl").val($("#cmbLocales").val());
}

function btnAutoriza_Click(control) {
    var oSolicitudFormato = eval('(' + $(control).attr('data-value') + ')');

    if (!validaPermisosBotonesAceptaRechaza(oSolicitudFormato.CveSolicitud.CveSeccion.CveSeccion)) {
        alertModal("No cuenta con los permisos necesarios para autorizar la solicitud.");
        return false;
    }
    else {
        oSolicitudFormato.CveSolicitud.Estatus = "2";
        actualizaSolicitud(oSolicitudFormato);
    }
}

function actualizaSolicitud(solicitud) {
    if (solicitud.CveSolicitud.Estatus == "3") {
        solicitud = arreglaFechas(solicitud);
        executeSyncRequest(wsMtdActualizaSol, "{ 'oSolicitudFormato':" + JSON.stringify(solicitud, null, 2) + " }", successactualizaSol, Error);
    }
    else {
        sessionStorage.SolOT = JSON.stringify(solicitud, null, 2);
        parent.openModalUpdatable('Solicitud/ConvierteSolicitudOT.aspx?locl=' + solicitud.CveSolicitud.Local.LocalLlave, widthConvierteSolOT, heigthConvierteSolOT, 'Crear OT', this);
    }
}

function arreglaFechas(solicitud) {
    solicitud.FechaCompra = solicitud.FechaCompra.toString().replace('/Date(', '').replace(')/', '');
    solicitud.FechaCompra = solicitud.FechaCompra.toString().substr(0, solicitud.FechaCompra.indexOf('-'));
    solicitud.FechaCompra = new Date(new Number(solicitud.FechaCompra));

    solicitud.CvePrograma.FechaInicio = solicitud.CvePrograma.FechaInicio.toString().replace('/Date(', '').replace(')/', '');
    solicitud.CvePrograma.FechaInicio = solicitud.CvePrograma.FechaInicio.toString().substr(0, solicitud.CvePrograma.FechaInicio.indexOf('-'));
    solicitud.CvePrograma.FechaInicio = new Date(new Number(solicitud.CvePrograma.FechaInicio));

    solicitud.CvePrograma.FechaFin = solicitud.CvePrograma.FechaFin.toString().replace('/Date(', '').replace(')/', '');
    solicitud.CvePrograma.FechaFin = solicitud.CvePrograma.FechaFin.toString().substr(0, solicitud.CvePrograma.FechaFin.indexOf('-'));
    solicitud.CvePrograma.FechaFin = new Date(new Number(solicitud.CvePrograma.FechaFin));

    solicitud.CveSolicitud.FechaCreacion = solicitud.CveSolicitud.FechaCreacion.toString().replace('/Date(', '').replace(')/', '');
    solicitud.CveSolicitud.FechaCreacion = solicitud.CveSolicitud.FechaCreacion.toString().substr(0, solicitud.CveSolicitud.FechaCreacion.indexOf('-'));
    solicitud.CveSolicitud.FechaCreacion = new Date(new Number(solicitud.CveSolicitud.FechaCreacion));

    solicitud.CveSolicitud.FechaSolicitud = solicitud.CveSolicitud.FechaSolicitud.toString().replace('/Date(', '').replace(')/', '');
    solicitud.CveSolicitud.FechaSolicitud = solicitud.CveSolicitud.FechaSolicitud.toString().substr(0, solicitud.CveSolicitud.FechaSolicitud.indexOf('-'));
    solicitud.CveSolicitud.FechaSolicitud = new Date(new Number(solicitud.CveSolicitud.FechaSolicitud));

    if (solicitud.CveSolicitud.EventoDeportivo != null) {
        solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio = solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio.toString().replace('/Date(', '').replace(')/', '');
        solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio = solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio.toString().substr(0, solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio.indexOf('-'));
        solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio = new Date(new Number(solicitud.CveSolicitud.EventoDeportivo.dtFechaInicio));

        solicitud.CveSolicitud.EventoDeportivo.dtFechaFin = solicitud.CveSolicitud.EventoDeportivo.dtFechaFin.toString().replace('/Date(', '').replace(')/', '');
        solicitud.CveSolicitud.EventoDeportivo.dtFechaFin = solicitud.CveSolicitud.EventoDeportivo.dtFechaFin.toString().substr(0, solicitud.CveSolicitud.EventoDeportivo.dtFechaFin.indexOf('-'));
        solicitud.CveSolicitud.EventoDeportivo.dtFechaFin = new Date(new Number(solicitud.CveSolicitud.EventoDeportivo.dtFechaFin));
    }

    return solicitud;
}

var successactualizaSol = function (data, status) {
    value_change();
}

function btnRechaza_Click(control) {
    var oSolicitudFormato = eval('(' + $(control).attr('data-value') + ')');
    
    if (!validaPermisosBotonesAceptaRechaza(oSolicitudFormato.CveSolicitud.CveSeccion.CveSeccion)) {
        alertModal("No cuenta con los permisos necesarios para rechazar la solicitud.");
        return false;
    }
    else {
        oSolicitudFormato.CveSolicitud.Estatus = "3";
        actualizaSolicitud(oSolicitudFormato);
    }
}

function showData_click(control) {
    parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
}

function validaPermisosBotonesAceptaRechaza(seccionId) 
{
    //Variables para saber si existe el puesto de administrador y el de autorizador de solicitudes
    var existePuestoAdministrador = false;
    var existePuestoAutorizador = false;

    //Busca los puestos q tiene el empleado
    //Indica q existe el administrador
    if ($.inArray('9', sessionStorage.userPuestos.split(',')) >= 0)
       existePuestoAdministrador = true;

    //Indica q existe el calificador
    if ($.inArray('14', sessionStorage.userPuestos.split(',')) >= 0)
            existePuestoAutorizador = true;

    //Si existe administrador no necesita calidar la seccion ya q por definicion tiene permisos
    if (existePuestoAdministrador == true)
        return true;
    else
    {
        //Si no es administrador debe revisar si existe el puesto de 
        //autorizador dwe solicitudes
        if (existePuestoAutorizador == true)
        {
            //Consulta la sección a la q pertenece, solo puede autorizar solicitudes de su sección
            if (sessionStorage.UserSeccion.toString() != seccionId.toString())
                return false;
            else
                return true;
        }
        else
            return false;
    }
}

function updateForm() {
    this.value_change();
}

function setProgData(data) {
    $("#cmbPrograma").empty();
    $("#cmbPrograma").append(data);
}

function cmbLocales_change() {
    if ($("#cmbLocales").val() == undefined || $("#cmbLocales").val() == '' || $("#cmbLocales").val() < 0) {
        alertModal('Debe especificar una Local');
        return false;
    }
    bindSecciones();

    value_change();
}