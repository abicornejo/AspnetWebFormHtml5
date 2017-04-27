
var initParams;

window.onload = function () { initialize(); };

function initialize() {
    initParams = getUrlVars();

    /*Se obtienen las locales*/
    getLocales(successLocales, Error);

    /*Se obtienen las secciones*/
    getSecciones();
}

$(function () {
    $("#dtFechaAgenda").datepicker({ minDate: 0 });
    $("#dtFechaAgenda").datepicker('setDate', new Date());
});

function btnNuevo_Click() {
    /*Se limpian todos los controles*/
    $("#txtTitulo").val('');
    $("#txtObjetivo").val('');
    $("#cmbSecciones").prop('selectedIndex', sessionStorage.UserSeccion);
    cmbSecciones_changed();
    $("#cmbPrograma").prop('selectedIndex', 0);
    cmbPrograma_changed();
    $("#cmbLocales").prop('selectedIndex', 0);
    $("#dtFechaAgenda").datepicker('setDate', new Date());
}

function btnGuardar_Click() {
    almacenaDatos();
}

function getSecciones() {
    if ($("#cmbLocales").val() == 36) {
        var data = "{ 'FABR_LLAV_PR':'" + 4 + "', 'SECC_LLAV_PR':''}";
        executeSyncRequest(wsMtdgetSecciones, data, successSecciones, Error);
    }
    else {
        $("#cmbSecciones").empty();
        $("#cmbSecciones").append('<option value="114">NOTICIAS LOCALES</option>');
        cmbSecciones_changed();
        getProgEmpl();
    }
}

function cmbLocales_changed() {
    getSecciones();
}

var successSecciones = function (data, status) {
    var secciones = data.d;
    $("#cmbSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {
            if (index == 0)
                $("#cmbSecciones").append('<option value="0">== SELECCIONE ==</option>');
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
        $("#cmbSecciones").prop('selectedIndex', sessionStorage.UserSeccion);
    }
    else
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');

    if($("#cmbLocales").val() == 36)
        $("#cmbSecciones").val(0);
    /*Se cargan los formatos correspondientes*/
    cmbSecciones_changed();
    /*Se manda a obtener la informacion del programa por empleado*/
    getProgEmpl();
}

function getProgEmpl() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdconsultaPrgEmpl, data, successGetProgEmpl, Error);
}

var successGetProgEmpl = function (data, status) {
    var programas = data.d;
    $("#cmbPrograma").empty();
    $.each(programas, function (index, programa) {
        $("#cmbPrograma").append("<option data-value='" + JSON.stringify(programa, null, 2) + "' value='" + programa.CvePrograma.CvePrograma + "'>" + programa.CvePrograma.NombrePrograma + '</option>');
    });

    cmbPrograma_changed();
}

var successLocales = function (data, status) {
    var locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });
    $("#cmbLocales").val(getLocalSeleccionar());
}

function cmbPrograma_changed() {
    /*Se consultan los clientes asociados al programa*/
    if ($("#cmbPrograma").val() != '' && $("#cmbPrograma").val() != undefined) {
        var data = "{ 'cvePrograma': " + $("#cmbPrograma").val() + " }";
        executeSyncRequest(wsMtdGetCusPrg, data, successGetCusPrg, Error);
    }
}

var successGetCusPrg = function (data, status) {
    $("#cmbCliente").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, cliente) {
            if (index == 0)
                $("#cmbCliente").append('<option value="0">== SELECCIONE ==</option>');
            $("#cmbCliente").append('<option value="' + cliente.CveCliente.CveCliente + '">' + cliente.CveCliente.NombreDescripcion + '</option>');
        });
    }
    else
        $("#cmbCliente").append('<option value="0">No tiene clientes</option>');
}

function cmbSecciones_changed() {
    if ($("#cmbSecciones").val() > 0) {
        var data = "{ 'cveSeccion': " + $("#cmbSecciones").val() + ", 'cveFormato':0 }";
        executeSyncRequest(wsMtdGetSeccFmto, data, successGetSeccFmto, Error);
    }
    else {
        $("#cmbFormato").empty();
        $("#cmbFormato").append('<option value="0">== SELECCIONE ==</option>');
    }
}

var successGetSeccFmto = function (data, status) {
    $("#cmbFormato").empty();

    $.each(data.d, function (index, formato) {
        if (index == 0)
            $("#cmbFormato").append('<option value="0">== SELECCIONE ==</option>');
        $("#cmbFormato").append("<option data-value='" + JSON.stringify(formato, null, 2) + "' value='" + formato.CveFormato.CveFormato + "'>" + formato.CveFormato.Descripcion + '</option>');
    });
}

function almacenaDatos() {
    if (validaCampos()) 
    {
        var oTDISeccion = new TDI_Seccion();
        var oTipoNota = new TDI_TipoNota();
        var oProgEmpl = eval( '(' + $("#cmbPrograma option:selected").attr('data-value') + ')' );

        oProgEmpl.CvePrograma.FechaInicio = oProgEmpl.CvePrograma.FechaInicio.toString().replace('/Date(', '').replace(')/', '');
        oProgEmpl.CvePrograma.FechaInicio = oProgEmpl.CvePrograma.FechaInicio.toString().substr(0, oProgEmpl.CvePrograma.FechaInicio.indexOf('-'));
        oProgEmpl.CvePrograma.FechaInicio = new Date(new Number(oProgEmpl.CvePrograma.FechaInicio));

        oProgEmpl.CvePrograma.FechaFin = oProgEmpl.CvePrograma.FechaFin.toString().replace('/Date(', '').replace(')/', '');
        oProgEmpl.CvePrograma.FechaFin = oProgEmpl.CvePrograma.FechaFin.toString().substr(0, oProgEmpl.CvePrograma.FechaFin.indexOf('-'));
        oProgEmpl.CvePrograma.FechaFin = new Date(new Number(oProgEmpl.CvePrograma.FechaFin));

        var oCliente = new TDI_Cliente();
        oCliente.CveCliente = $("#cmbCliente").val();
        oCliente.NombreDescripcion = $("#cmbCliente option:selected").text();

        var oSolicitud = new THE_Solicitud();
        oSolicitud.CveCliente = oCliente;
        oSolicitud.CveEmpleado = oProgEmpl.CveEmpleado;
        oTDISeccion.CveSeccion = $("#cmbSecciones").val();
        oTDISeccion.NombreSeccion = $("#cmbSecciones option:selected").text();
        oSolicitud.CveSeccion = oTDISeccion;
        oSolicitud.CveTipoNota = oTipoNota;
        oSolicitud.Estatus = "1";
        oSolicitud.FechaCreacion = new Date();
        oSolicitud.FechaSolicitud = new Date();
        oSolicitud.HistoryLine = $("#txtObjetivo").val();
        oSolicitud.Objetivo = $("#txtObjetivo").val();
        oSolicitud.Tage = "N";
        oSolicitud.Tema = $("#txtTitulo").val();
        oSolicitud.Titulo = $("#txtTitulo").val();
        oSolicitud.Usuario = sessionStorage.numUsuario;

        if (initParams["idEvent"] != null && initParams["idEvent"] != undefined)
            oSolicitud.Eventodeportivo = new THE_EventoDeportivo(initParams["idEvent"]);
        else
            oSolicitud.Eventodeportivo = null;  //new THE_EventoDeportivo();


        var oSolicitudFormato = new THE_SolicitudFormato();
        var oFormato = eval( '(' + $("#cmbFormato option:selected").attr('data-value') + ')' );
        var oLocal = new TDI_Local();
        //oLocal.LocalDescripcion = 'AJUSCO'; //Las solicitudes siempre son hacia ajusco
        oLocal.LocalLlave = $("#cmbLocales").val();
        oSolicitud.Empresa = new TDI_Empresa();
        oSolicitud.Fabrica = new TDI_Fabrica();
        if ($("#cmbLocales").val() == 36) {
            oSolicitud.Empresa.CveEmpresa = 1;
            oSolicitud.Fabrica.FabricaLlavePrimaria = 4;
        }
        else {
            oSolicitud.Empresa.CveEmpresa = 5;
            oSolicitud.Fabrica.FabricaLlavePrimaria = 4;
        }
        oSolicitudFormato.CveFormato = oFormato.CveFormato;
        oSolicitudFormato.CvePrograma = oProgEmpl.CvePrograma;
        oSolicitudFormato.CveSolicitud = oSolicitud;
        oSolicitudFormato.Duracion = oFormato.CveFormato.Duracion;
        oSolicitudFormato.FechaCompra = $("#dtFechaAgenda").datepicker("getDate");
        //Se asigna la local
        oSolicitud.Local = oLocal;

        var data = "{ 'oSolicitud':" + JSON.stringify(oSolicitud, null, 2) + ", 'oSolicitudFormato':" + JSON.stringify(oSolicitudFormato, null, 2) + " }";
        executeSyncRequest(wsMtdAlmacenaDatSol, data, successAlmacenaDatSol, Error);
    }
}

var successAlmacenaDatSol = function (data, status) {
    if (data.d.Mensaje.indexOf(' id:') > 0) {
        var msgTemp = data.d.Mensaje;
        msgTemp = msgTemp.toString().replace('La solicitud con id:', '');
        msgTemp = msgTemp.toString().replace('se creo satisfactoriamente.', '');
        $("#lblNoSolicitud").empty();
        $("#lblNoSolicitud").append(msgTemp);
    }

    alertModal(data.d.Mensaje);
}

function validaCampos() {
    var mensaje = '';
    var retorno = true;

    if($.trim($("#txtTitulo").val()) == '')
    {
        mensaje += '\nDebe especificar un título.'
        retorno = false;
    }

    if($.trim($("#txtObjetivo").val()) == '')
    {
        mensaje += '<BR />Debe especificar un objetivo.'
        retorno = false;
    }

    if ($("#cmbLocales").val() == 0 || $("#cmbLocales").val() == undefined || $("#cmbLocales").val() == '') {
        mensaje += '<BR />Debes elegir una Local.';
        retorno = false;
    }

    if($("#cmbSecciones").val() == 0 || $("#cmbSecciones").val() == undefined || $("#cmbSecciones").val() == '')
    {
        mensaje += '<BR />Debes elegir una sección.';
        retorno = false;
    }

    if($("#cmbPrograma").val() == 0 || $("#cmbPrograma").val() == undefined || $("#cmbPrograma").val() == '')
    {
        mensaje += '<BR />Debes elegir un programa.';
        retorno = false;
    }

    if($("#cmbFormato").val() == 0 || $("#cmbFormato").val() == undefined || $("#cmbFormato").val() == '')
    {
        mensaje += '<BR />Debes elegir un formato.';
        retorno = false;
    }

    if($("#cmbCliente").val() == 0 || $("#cmbCliente").val() == undefined || $("#cmbCliente").val() == '')
    {
        mensaje += '<BR />Debes elegir un cliente.';
        retorno = false;
    }

    if ($.trim($("#dtFechaAgenda").val()) == '')
    {
        mensaje += '<BR />Debe especificar una fecha de Agenda.'
        retorno = false;
    }

    if (compareDates(new Date(), $("#dtFechaAgenda").datepicker('getDate')) < 0) {
        mensaje += '<BR />La fecha de Agenda no puede ser menor a la fecha actual.'
        retorno = false;
    }

    if(retorno == false)
        alertModal(mensaje);

    return retorno;
}