/*
* tipo:  1-Nueva, 2-Ingestion, 3-OT, ...
*/

var initParams;
var esProgramas = false;
var esDeportes = false;
var actualizaIngestion = false;
var gblpathPage;
var saveOT;
var saveAge;
var numOT;
var numReplica = 0;
var llavesOTGuardadas = "";
var archiveIngestion;

var ingestion;
var tipoSenal;
var tipoIngestion = 0;
var NumTipoIng = 0;
var NumIngestion = 0;

window.onload = function () { initialize(); }

function initialize() {
    gblpathPage = '/FiatubeHTML5/Ingestion/NuevaIngestion.aspx';
    initParams = getUrlVars();
    validaUsuarioProgramas();
    validaUsuarioDeportes();
    //bindLocales();
    bindAgencias();
    bindCorresponsal();
    bindMedioSenal();

    $("#dtFechaFeed").datepicker({ 'minDate': 0 });
    $("#dtFechaFeed").datepicker('setDate', new Date());
    $("#dtFechaSenal").datepicker({ 'minDate': 0 });
    $("#dtFechaSenal").datepicker('setDate', new Date());
    
    $("#hrHoraFeed").timepicker({});
    $("#hrHoraFeed").val('00:00');
    $("#hrDuracionFeed").timepicker({});
    $("#hrDuracionFeed").val('00:00');

    $("#hrHoraSenal").timepicker({});
    $("#hrHoraSenal").val('00:00');
    $("#hrDurSenal").timepicker({});
    $("#hrDurSenal").val('00:00');

    $("#txbSeccion").val();

    (esDeportes) ? $("#divDescFeed").show() : $("#divDescFeed").hide();

    tipoIngestion = initParams["tipo"];
    initScreenData(initParams["tipo"]);
}

function initScreenData(tipoIngestion) {
    switch (tipoIngestion) {
        case '1':
            $("#lblTitOT").append('OT(s):');
            $("#txbNumOT").append('Sin OT');
            $("#lblSeccion").append('Sin Secci&oacute;n');
            $("#txbSeccion").hide();
            actualizaIngestion = false;
            bindTipoIngestion();
            tipoIng_changed();
            break;

        case '2':
            ingestion = eval('(' + sessionStorage.IngestData + ')');
            sessionStorage.IngestData = "";
            actualizaIngestion = true;
            $("#lblTitOT").append('OT(s):');
            $("#txbNumOT").append(ingestion.ClaveOT);
            $("#txtTitu").val(ingestion.TituloAgenda);
            $("#txtTitu").attr("disabled", "disabled");
            numOT = ingestion.CveOT;
            archiveIngestion = (ingestion.SingArchivado == 1);
            NumIngestion = ingestion.ClaveIngestion;
            NumTipoIng = ingestion.CveTipoIngestion;
            $("#txbSeccion").attr("disabled", "disabled");
            $("#txbSeccion").val(ingestion.NombreSeccion);

            if (ingestion.NombreEstatusIngesion.toUpperCase().indexOf("SOLICITADO") != -1 || ingestion.NombreEstatusIngesion.toUpperCase().indexOf("MATERIAL ENTREGADO") != -1)
                $("#cmbTipoIngestion").attr("disabled", "disabled");

            tipoSenal = ingestion.CveTipoIngestion;
            bindTipoIngestion();
            $("#cmbTipoIngestion").val();
            tipoIng_changed();
            break;
    }
}

function validaUsuarioProgramas() {
    if ($.inArray('8', sessionStorage.UserSeccion.split(',')) >= 0)
        esProgramas = true;
    else {
        esProgramas = false;
        $("#divPrg").hide();
    }
}

function validaUsuarioDeportes() {
    if ($.inArray('9', sessionStorage.UserSeccion.split(',')) >= 0)
        esDeportes = true;
    else
        esDeportes = false;
}

function bindTipoIngestion() {
    executeSyncRequest(wsMtdConsultaTipoIngestion, "{ }", successTipoIngestion, Error);
}

var successTipoIngestion = function (data, status) {
    $("#cmbTipoIngestion").empty();
    $.each(data.d, function (index, ingestion) {
        if (actualizaIngestion == true && (ingestion.CveTipoIngestion == tipoSenal)) 
            $("#cmbTipoIngestion").append('<option selected="selected" value="' + ingestion.CveTipoIngestion + '">' + ingestion.NombreTipoIngestion + '</option>');
        else 
            $("#cmbTipoIngestion").append('<option value="' + ingestion.CveTipoIngestion + '">' + ingestion.NombreTipoIngestion + '</option>');
    });
}

function bindAgencias() {
    executeSyncRequest(wsMtdGetAgencias, "{ }", successAgencias, Error);
}

var successAgencias = function (data, status) {
    $("#cmbAgenciaFeed").empty();
    $("#cmbAgenciaFeed").append('<option value="0">== SELECCIONE ==</option>');
    $.each(data.d, function (index, agencia) {
        $("#cmbAgenciaFeed").append('<option value="' + agencia.CveAgencia + '">' + agencia.NombreAgencia + '</option>');
    });
}

var successRequestIngs = function (data, status) {
    switch ($("#cmbTipoIngestion").val()) {
        case '1': //Señal
            $("#cmbMedioSenal").val(data.d.CveTiposFormatos);
            $("#cmbCorresponsalSenal").val(data.d.CveEmpleado);
            $("#").val(data.d.FechaEnvio);
            $("#hrHoraSenal").val(data.d.HoraInicio);
            $("#hrDurSenal").val(data.d.Duracion);
            $("#txtOrigSenal").val(data.d.OrigenSenal);
            $("#dtFechaSenal").datepicker('setDate', parseJSONToDate(data.d.FechaEnvio));
            if (esDeportes == true)
                $("#txtDescSenal").val(data.d.Descripcion);
            break;
        case '2': //Feed
            alert(JSON.stringify(parseJSONToDate(data.d.FechaEnvio)));
            $("#cmbAgenciaFeed").val(data.d.CveAgencia);
            $("#txtNombreFeed").val(data.d.CveOrdenTrabajo.Titulo);
            $("#hrHoraFeed").val(data.d.HoraInicio);
            $("#hrDuracionFeed").val(data.d.Duracion);
            $("#dtFechaFeed").datepicker('setDate', parseJSONToDate(data.d.FechaEnvio));
            $("#").val(data.d);
            if (esDeportes == true)
                $("#txtDescFeed").val(data.d.Descripcion);
            break;
        case '3': //Cinta
            $("#txtNoCinta").val(data.d.NumeroCinta);
            break;
    }
}

function tipoIng_changed() {
    switch ($("#cmbTipoIngestion").val()) {
        case '1': //Señal
            $("#divCinta").hide();
            $("#divFeed").hide();
            $("#divSenal").show();
            $("#divDescSenal").hide();
            $("#divArchivar").hide();
            if (esDeportes) {
                $("#divDescSenal").show();
                $("#divArchivar").show();
            }
            break;

        case '2': //Feed
            $("#divCinta").hide();
            $("#divSenal").hide();
            $("#divFeed").show();
            $("#divArchivar").hide();
            if (esDeportes)
                $("#divArchivar").show();
            break;

        case '3': //Cinta
            $("#divFeed").hide();
            $("#divSenal").hide();
            $("#divCinta").show();
            $("#divArchivar").hide();
            break;
    }

    if (actualizaIngestion == true && NumIngestion > 0) 
        executeSyncRequest(wsMtdGetRequestIngs, "{ 'NumOt':" + numOT + ", 'NumSolIng': " + NumIngestion + " }", successRequestIngs, Error);
}

function bindLocales() {
    getLocales(successLocales, Error);
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.Local.LocalLlave <= 0 || local.LocalLlave <= 0);
        else if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    $("#cmbLocales").val(getLocalSeleccionar());
}

function bindCorresponsal() {
    executeSyncRequest(wsGetCorresponsal, "{ }", successCorresponsal, Error);
}

var successCorresponsal = function (data, status) {
    $("#cmbCorresponsalSenal").empty();
    $("#cmbCorresponsalSenal").append('<option value="0">== SELECCIONE ==</option>');
    $.each(data.d, function (index, corresponsal) {
        $("#cmbCorresponsalSenal").append('<option value="' + corresponsal.EmpleadoLlavePrimaria + '">' + corresponsal.EmpleadoNombre + '</option>');
    });
}

function bindMedioSenal() {
    executeSyncRequest(wsGetMedioSenal, "{ }", successMedioSenal, Error);
}

var successMedioSenal = function (data, status) {
    $("#cmbMedioSenal").empty();
    $("#cmbMedioSenal").append('<option value="0">== SELECCIONE ==</option>');
    $.each(data.d, function (index, tipos) {
        $("#cmbMedioSenal").append('<option value="' + tipos.CveTiposFormatos + '">' + tipos.DescripcionTiposFormatos + '</option>');
    });
}

function btnGuardar_Click(flag) {
    var fechaTemp; 
    if(flag == false)
        fechaTemp = saveOT.FechaEvento;

    saveOT = new THE_OrdenTrabajo();

    saveOT.CveOrigen = new TDI_Origen();
    saveOT.CveEmpleado = new TDI_EMPL();
    saveOT.CveTipoNota = new TDI_TipoNota();
    saveOT.CveEmpleado.EmpleadoLlavePrimaria = sessionStorage.numUsuario;
    saveOT.CveTipoNota.CveTipoNota = 1;
    saveOT.Usuario = sessionStorage.userName;
    if (flag == true) {
        numReplica = 0;
        saveOT.FechaEvento = ($("#cmbTipoIngestion").val() == 3) ? new Date() : ($("#cmbTipoIngestion").val() == 2) ? $("#dtFechaFeed").datepicker('getDate') : $("#dtFechaSenal").datepicker('getDate');
    }
    else
        saveOT.FechaEvento = fechaTemp;
    saveOT.CveOrigen.CveOrigen = 3;
    saveOT.Estatus = 1;
    saveOT.Objetivo = "*";
    saveOT.HistoryLine = "*";
    saveOT.EmplCrea = new TDI_EMPL();
    saveOT.EmplCrea.EmpleadoLlavePrimaria = sessionStorage.numUsuario;
    saveOT.Empresa = new TDI_Empresa();
    saveOT.Empresa.CveEmpresa = 1; //($("#cmbLocales").val() == 36) ? 1 : 5;
    saveOT.FabrLlave = new TDI_Fabrica();
    saveOT.FabrLlave.FabricaLlavePrimaria = 4;
    saveOT.Local = new TDI_Local();
    saveOT.Local.LocalLlave = 36; //$("#cmbLocales").val();

    if (validateData()) {
        switch ($("#cmbTipoIngestion").val()) {
            case '1': //Señal
                saveOT.Titulo = $.trim($("#txtTitu").val()) + "  " + $.trim($("#txtOrigSenal").val()) + " " + $("#dtFechaSenal").datepicker('getDate').esMXFormat() + " " + $("#hrHoraSenal").val();
                break;
            case '2': //Feed
                saveOT.Titulo = $.trim($("#txtNombreFeed").val()) + " " + $("#cmbAgenciaFeed :selected").text() + " " + $("#dtFechaFeed").datepicker('getDate').esMXFormat() + " " + $("#hrHoraFeed").val();
                break;
            case '3': //Cinta
                saveOT.Titulo = $.trim($("#txtTitu").val()) + " " + $("#txtNoCinta").val();
                break;
        }

        if (esProgramas)
            guardaCompraOTIngestion();
        else
            guardarIngestion();
    }
}

function validateData() {
    var mensaje = "";

    if ($.trim($("#txtTitu").val()) == "")
        mensaje += "* Especificar un T&iacute;tulo. <BR/>";
//    if ($("#cmbLocales").val() == undefined || $("#cmbLocales").val() <= 0)
//        mensaje += "* Especificar una Local.<BR/>";

    switch ($("#cmbTipoIngestion").val()) {
        case '1'://Señal
            if ($.trim($("#txtOrigSenal").val()) == "")
                mensaje += "* Especificar un Origen. <BR/>";
            if ($.trim($("#dtFechaSenal").val()) == "")
                mensaje += "* Especificar una Fecha. <BR/>";
            if ($("#cmbMedioSenal").val() == undefined || $("#cmbMedioSenal").val() <= 0)
                mensaje += "* Especificar un Medio.<BR/>";
            break;
        case '2': //Feed
            if ($.trim($("#dtFechaFeed").val()) == "")
                mensaje += "* Especificar una Fecha. <BR/>";
            if ($("#cmbAgenciaFeed").val() == undefined || $("#cmbAgenciaFeed").val() <= 0)
                mensaje += "* Especificar una Agencia.<BR/>";
            break;
        case '3': //Cinta
            if ($.trim($("#txtNoCinta").val()) == "")
                mensaje += "* Especificar un No. de Cinta. <BR/>";
            break;
    }

    if ($.trim(mensaje) != "") {
        alertModal(mensaje);
        return false;
    }
    else
        return true;
}

function guardaCompraOTIngestion() {
    executeSyncRequest(wsGuardaOTCompraIng, "{ 'cveEmpleado': " + sessionStorage.numUsuario + ", 'CveUsuario': '" + sessionStorage.userName + "', 'ComprasIpad': " + JSON.stringify(llenaComprasOT()) + ", 'Logistica': " + JSON.stringify(new THE_Logistica()) + ", 'oOrdenTrabajo': " + JSON.stringify(saveOT) + ", 'oAgendaSemanal': " + JSON.stringify(generaAgendaSem()) + ", 'lstEquipoTrabajoIpad':" + JSON.stringify(generaEquipoTrabajo()) + ", 'esNueva':true, 'Tran':" + JSON.stringify(GenerateTransac()) + " }", successGuardaOTCompraIng, Error);
}

var successGuardaOTCompraIng = function (data, status) {
    if (data.d.oOrdenTrabajo.CveOrdenTrabajo > 0) {
        saveOT = data.d.oOrdenTrabajo;
        guardarSoloIngestion();
    }
    else
        alertModal('No se logro generar la Orden de Trabajo');
}

function guardarIngestion() {
    if (actualizaIngestion == true)
        executeSyncRequest(wsGetOrdenTrabajo, "{ 'NumOT': " + numOT + " }", successGetOrdenTrabajo, Error);
    else
        executeSyncRequest(wsMtdgetSeccionEmpl, "{ 'idEmpleado': " + sessionStorage.numUsuario + " }", successGetSeccionEmpl, Error);
}

var successGetOrdenTrabajo = function (data, status) {
    if (data.d.length < 0) {
        alertModal('No se pudo guardar el m&oacute;dulo de ingesti&oacute;n, intente m&aacute;s tarde.');
        return;
    }

    $.each(data.d, function (index, value) {
        saveOT = value;
    });

    if ($("#cmbTipoIngestion").val() == 1)
        guardarEquipoTrab();

    guardarSoloIngestion();
}

var successGetSeccionEmpl = function (data, status) {
    saveOT.CveSeccion = data.d;
    executeSyncRequest(wsGetClientByCveEmpl, "{ 'CveEmpleado': " + saveOT.CveSeccion.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria + " }", successGetClientByCveEmpl, Error);
}

var successGetClientByCveEmpl = function (data, status) {
    saveOT.CveCliente = data.d;
    executeSyncRequest(wsMtdSaveOT2, "{ 'oOrdenTrabajo': " + JSON.stringify(saveOT) + ", 'oLogTran': " + JSON.stringify(GenerateTransac()) + " }", successMtdSaveOT2, Error);
}

var successMtdSaveOT2 = function (data, status) {
    if (data.d == null || data.d.CveOrdenTrabajo <= 0) {
        alertModal('No se pudo guardar el m&oacute;dulo de Orden de Trabajo.<BR/>Intente mas tarde.');
        return;
    }

    saveOT = data.d;
    saveOT.FechaEvento = parseJSONToDate(saveOT.FechaEvento);

    if ($("#cmbTipoIngestion").val() == 1)
        guardarEquipoTrab();

    saveAge = new THE_AgendaSemanal();
    saveAge.CveSeccion = saveOT.CveSeccion;
    saveAge.CveTipoNota = saveOT.CveTipoNota;
    saveAge.FechaCreacion = new Date();
    saveAge.FechaInicio = saveOT.FechaEvento.esMXFormat();
    saveAge.Titulo = saveOT.Titulo;
    saveAge.Origen = "O";
    saveAge.numeroOTPropuesta = data.d.CveOrdenTrabajo;
    saveAge.Estatus = "A";

    llavesOTGuardadas += (llavesOTGuardadas.length > 0) ? "," + saveOT.ClaveOrdenTrabajo : saveOT.ClaveOrdenTrabajo;
    executeSyncRequest(wsGuardaAgSemanalProp, "{ 'oAgendaSemanal': " + JSON.stringify(saveAge) + " }", successGuardaAgSemanalProp, Error);
}

var successGuardaAgSemanalProp = function (data, status) {
    if (data.d <= 0) {
        alertModal("No se puede guardar el m&oacute;dulo de Agenda Semanal.<BR/>Intente m&aacute;s tarde.");
        return;
    }
    guardarSoloIngestion();
}

function llenaComprasOT() {
    var oc = new Array();
    var oCompraOT = new CompraOT();

    oCompraOT.CveOrdenTrabajo = saveOT;
    oCompraOT.CveSeccionFormato = new TDI_SeccionFormato();
    oCompraOT.CveSeccionFormato.CveFormato = new TDI_Formato();
    oCompraOT.CveSeccionFormato.CveSeccion = new TDI_Seccion();
    oCompraOT.CveSeccionFormato.CveFormato.CveFormato = 12;
    oCompraOT.CveSeccionFormato.CveSeccion.CveSeccion = 8//($("#cmbLocales").val() == 36) ? 8 : 114;
    oCompraOT.CveProgramaEmpleado = eval( $("#cboProg :selected").attr('data-val') );
    oCompraOT.FechaCompra = saveOT.FechaEvento;

    if (oCompraOT.CveProgramaEmpleado.CvePrograma.EsAztecaAmerica == 1 || oCompraOT.CveProgramaEmpleado.CvePrograma.esDeporteContacto == 1)
        oCompraOT.SeEnviaINEWS = true;
    else
        oCompraOT.SeEnviaINEWS = false;

    oc.push(oCompraOT);
    return oc;
}

function generaAgendaSem() {
    var saveAgenda = new THE_AgendaSemanal();
    saveAgenda.CveTipoNota = saveOT.CveTipoNota;
    saveAgenda.FechaCreacion = new Date();
    saveAgenda.FechaInicio = saveOT.FechaEvento.esMXFormat();
    saveAgenda.Titulo = saveOT.Titulo;
    saveAgenda.Origen = "O";
    saveAgenda.Estatus = "A";

    return saveAgenda;
}

function generaEquipoTrabajo() {
    var lstEqui = new Array();
    if ($("#cmbTipoIngestion").val() == 1) {
        var saveEqui = new THE_EquipoTrabajo();
        saveEqui.CveOrdenTrabajo = saveOT;
        saveEqui.PuestoLlavePrimaria = new TDI_Puestos();
        saveEqui.PuestoLlavePrimaria.PuestoLlavePrimaria = 1;
        saveEqui.CvePrograma = eval( $("#cboProg :selected").attr('data-val') ).CvePrograma;
        saveEqui.EmpleadoLlavePrimaria = new TDI_EMPL();
        saveEqui.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria = $("#cmbCorresponsalSenal").val();

        lstEqui.push(saveEqui);
    }

    return lstEqui;
}

function guardarSoloIngestion() {
    var saveSolIng = new THE_SolicitudesIngestion();

    saveSolIng.CveAgencia = 0;
    saveSolIng.CveOrdenTrabajo = saveOT;
    saveSolIng.CveTipoIngestion = new TDI_TipoIngestion();
    saveSolIng.CveTiposFormatos = 0;
    saveSolIng.CveSSIN = new TDI_StatusSolicitudIngestion();
    saveSolIng.CveSSIN.CveStatusSolicitudIngestion = 1;


    saveSolIng.CveTipoIngestion.CveTipoIngestion = $("#cmbTipoIngestion").val();
    saveSolIng.FechaEnvio = saveOT.FechaEvento;

    switch ($("#cmbTipoIngestion").val()) {
        case '1': //Señal
            saveSolIng.CveTiposFormatos = $("#cmbMedioSenal").val();
            saveSolIng.CveEmpleado = $("#cmbCorresponsalSenal").val();
            saveSolIng.HoraInicio = $("#hrHoraSenal").val();
            saveSolIng.Duracion = $("#hrDurSenal").val();
            saveSolIng.OrigenSenal = $("#txtOrigSenal").val();
            saveSolIng.Descripcion = (esDeportes == true) ? $("#txtDescSenal").val() : "";
            if (esDeportes == true)
                saveSolIng.SingArchivado = $("#ckbArchivar").attr('checked') == undefined ? 0 : 1;
            break;
        case '2': //Feed
            saveSolIng.CveTiposFormatos = 14;
            saveSolIng.CveAgencia = $("#cmbAgenciaFeed").val();
            saveSolIng.NombreAgencia = $("#cmbAgenciaFeed :selected").text();
            saveSolIng.HoraInicio = $("#hrHoraFeed").val();
            saveSolIng.Duracion = $("#hrDuracionFeed").val();
            saveSolIng.CveEmpleado = sessionStorage.numUsuario;
            saveSolIng.Descripcion = (esDeportes == true) ? $("#txtDescFeed").val() : "";
            if (esDeportes == true)
                saveSolIng.SingArchivado = $("#ckbArchivar").attr('checked') == undefined ? 0 : 1;
            break;
        case '3': //Cinta
            saveSolIng.CveTiposFormatos = 1;
            saveSolIng.NumeroCinta = $("#txtNoCinta").val();
            saveSolIng.CveEmpleado = sessionStorage.numUsuario;
            break;
    }

    if(actualizaIngestion == true && numReplica == 0 && numIngestion > 0)
        executeSyncRequest(wsMtdUpdateRequestIng, "{ 'solicitudIngestion': " + JSON.stringify(saveSolIng) + " }", successUpdateRequestIng, Error);
    else
        executeSyncRequest(wsMtdSaveRequestIng, "{ 'oSolicitudesIngestion': " + JSON.stringify(saveSolIng) + " }", successSaveRequestIng, Error);

}

var successUpdateRequestIng = function (data, status) {
    var tmpDate = saveOT.FechaEvento;
    try {
        if (data.d == true) {
            if ($("#cmbTipoIngestion").val() != 3) {
                if (($("#cmbTipoIngestion").val() == 1 && numReplica < $("#cmbReplicaSenal").val()) || ($("#cmbTipoIngestion").val() == 2 && numReplica < $("#cmbReplicaFeed").val())) {
                    numReplica++;
                    saveOT.FechaEvento.setDate(saveOT.FechaEvento.getDate() + 1);

                    if (actualizaIngestion == true)
                        guardarSoloIngestion();
                    else {
                        saveOT.CveOrdenTrabajo = 0;
                        saveOT.ClaveOrdenTrabajo = "";

                        executeSyncRequest(wsMtdGuardarOT, "{ 'oOrdenTrabajo': " + JSON.stringify(saveOT) + ", 'oLogTran': " + JSON.stringify(GenerateTransac()) + " }", successGuardarOT, Error);
                    }
                }
                else
                    guardadoCorrecto();
            }
            else
                guardadoCorrecto();
        }
        else
            alertModal('Ocurrio un problema al actualizar la ingesti&oacute;n.');
    }
    catch (ex) { }
    finally {
        //saveOT.FechaEvento = tmpDate;
    }
}

var successGuardarOT = function (data, status) {
    if (data.d <= 0) {
        alertModal('Ocurrio un problema al guardar la Orden de Trabajo.');
        return;
    }

    saveOT.CveOrdenTrabajo = data.d;

    if ($("#cmbTipoIngestion").val() == 1)
        guardarEquipoTrab();

    saveAge.CveSeccion = saveOT.CveSeccion;
    saveAge.CveTipoNota = saveOT.CveTipoNota;
    saveAge.FechaCreacion = new Date();

    saveAge.FechaInicio = saveOT.FechaEvento.esMXFormat();
    saveAge.Titulo = saveOT.Titulo;
    saveAge.Origen = "O";
    saveAge.NumeroOTPropuesta = data.d;
    saveAge.Estatus = "A";

    llavesOTGuardadas += (llavesOTGuardadas.legth > 0) ? "," + saveOT.ClaveOrdenTrabajo : saveOT.ClaveOrdenTrabajo;
    executeSyncRequest(wsGuardaAgSemanalProp, "{ 'oAgendaSemanal': " + JSON.stringify(saveAge) + " }", successGuardaAgSemanalProp, Error);
}

var successSaveRequestIng = function (data, status) {
    var tmpDate = saveOT.FechaEvento;
    try {
        if (data.d > 0) {
            if ($("#cmbTipoIngestion").val() != 3) {
                if (($("#cmbTipoIngestion").val() == 1 && numReplica < $("#cmbReplicaSenal").val()) || ($("#cmbTipoIngestion").val() == 2 && numReplica < $("#cmbReplicaFeed").val())) {
                    numReplica++;
                    saveOT.FechaEvento.setDate(saveOT.FechaEvento.getDate() + 1);
                    if (actualizaIngestion == true)
                        guardarSoloIngestion();
                    else
                        btnGuardar_Click(false);
                }
                else
                    guardadoCorrecto();
            }
            else
                guardadoCorrecto();
        }
        else
            alertModal("Ocurrio un problema al guardar la Solicitud de Ingesti&oacute;n.");
    }
    catch (ex) {

    }
    finally {
//        saveOT.FechaEvento = tmpDate;
    }
}

function guardadoCorrecto(){
    var msg = "";
    if (llavesOTGuardadas.length > 0)
        msg += (!actualizaIngestion) ? "<BR/> Se generaron la(s) OT(s): " + llavesOTGuardadas : "";

    llavesOTGuardadas = "";
    alertModalFunction('Se ha guardado correctamente los datos.' + msg, closeWindow);
}

function closeWindow() {
    parent.closeWindow(initParams['windowId']);
}

function guardarEquipoTrab() {
    var saveEqui = new THE_EquipoTrabajo();

    saveEqui.PuestoLlavePrimaria = new TDI_Puestos();
    saveEqui.PuestoLlavePrimaria.PuestoLlavePrimaria = 1;
    saveEqui.ClavePrograma = 0;
    saveEqui.CveOrdenTrabajo = saveOT;
    saveEqui.EmpleadoLlavePrimaria = new TDI_EMPL();
    saveEqui.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria = $("#cmbCorresponsalSenal").val();

    executeSyncRequest(wsMtdGuardarEquipoTrabajo, "{ 'oEquipoTrabajo': " + JSON.stringify(saveEqui) + " }", successGuardarEquipoTrabajo, Error);
}

var successGuardarEquipoTrabajo = function (data, status) { 
    
}