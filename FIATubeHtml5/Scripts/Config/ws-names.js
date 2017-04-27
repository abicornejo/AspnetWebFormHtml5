
//URL's de WS a consumir

//server
//var siteUrl = "http://tvadessisapro/fiatubehtml5/";
//var redirect = "http://tvadessisapro/fiatubehtml5/";

//local
var siteUrl = "/FiatubeHtml5/";
var redirect = "/fiatubehtml5/";



var wsFiatubeUrl = siteUrl + "ServicesAsmx/WebService_FIATube.asmx";
var wsManejadorLogsUrl = siteUrl + "ServicesAsmx/WebService_ManejadorLogs.asmx";
var wsManejadorErrores = siteUrl + "ServicesAsmx/WebService_ManejadorErrores.asmx";
var wsRecuperaVideo = siteUrl + "ServicesAsmx/WebService_RecuperaVideo.asmx";
var isSessionActive = true;

var noVideoPath = siteUrl + 'AztecaTube.mp4';
var noVideoImagePath = '../../Images/FondoAztecaTube.png';

//URL portal imagenes
var imgDataUrl = 'http://tvawebap1/fotos/';

//Ruta de player
var playerPath = siteUrl + "Scripts/Config/player.swf";

//'rtmp://10.64.12.50/aztecatube/_definst_';   //Balanceador
var streamerPath2 = 'rtmp://10.64.12.51/aztecatube/_definst_';
var streamerPath = 'rtmp://10.64.12.52/aztecatube/_definst_';


/************************************** Nombres Metodos wsFIATube ***********************************/
/****************************************************************************************************/
var wsMtdGuardarSinrealizador = wsFiatubeUrl + '/GuardarSinrealizador';
var wsMtdObtenerSinRealizador = wsFiatubeUrl + '/ObtenerSinRealizador';
var wsMtdConsultaProgramasEsFiaNoticias = wsFiatubeUrl + '/ConsultaProgramasEsFiaNoticias';
var wsMtdObtenerRptImplementacion = wsFiatubeUrl + '/ObtenerRptImplementacion';
var wsMtdObtenerArchivadoSudafricaFiltroTipoVidHtml5 = wsFiatubeUrl + '/ObtenerArchivadoSudafricaFiltroTipoVidHtml5';
var wsMtdObtenerTipoMaterialHtml5 = wsFiatubeUrl + '/ObtenerTipoMaterialHtml5';
var wsMtdgetTransferInterlocalesHtml5 = wsFiatubeUrl + '/TransferInterlocalesHtml5';
var wsMtdgetgetConsultaFlexiblehtml5 = wsFiatubeUrl +'/ConsultaFlexiblehtml5';
var wsMtdObtenerSolMatLocalProgramadasyActuales = wsFiatubeUrl + '/ObtenerSolMatLocalProgramadasyActuales';
var wsMtdgetSeccionEmpl = wsFiatubeUrl + '/ObtieneSeccionByIdEmpleado';
var wsMtdconsultaPrgEmpl = wsFiatubeUrl + '/ConsultaProgramaEmpleado';
var wsMtdgetSecciones = wsFiatubeUrl + '/getSecciones';
var wsMtdGetSeccionLocl = wsFiatubeUrl + '/getSeccionLocal';
var wsMtGetSolMatLocalParametroMapa = wsFiatubeUrl + '/ObtenerSolMatLocalParametroMapa';
var wsMtGetSolMatLocalParametroMapa2 = wsFiatubeUrl + '/ObtenerSolMatLocalParametroMapa2';
var wsMtMonitoreoObtieneMaterialDisponible = wsFiatubeUrl + '/MonitoreoMaterialDisponible';
var wsMtdObtenerSecc = wsFiatubeUrl + '/ObtenerSecciones';
var wsMtdGetPuestosReportes = wsFiatubeUrl + '/GetPuestosReportes';
var wsMtdGetEvalXEmpleado = wsFiatubeUrl + '/GetEvalXEmpleadoHtml5';
var wsMtdGetEvalXEmpleadoNumEmpl = wsFiatubeUrl + '/GetEvalXEmpleadoNumEmpl';
var wsMtdGetEvalXEmpleadoMesXMesAnual = wsFiatubeUrl + '/GetEvalXEmpleadoMesXMesAnual';
var wsMtdGetCoberturas = wsFiatubeUrl + '/GetCoberturas';
var wsMtdGetNotasGral = wsFiatubeUrl + '/GetNotasGral';
var wsMtdGetApelacionesByEmpleado = wsFiatubeUrl + '/GetApelacionesByEmpleado';

var wsMtdLstGuardarMontosEmpleados = wsFiatubeUrl + '/LstGuardarMontosEmpleados';

var wsMtdObtTiposNotaBySecc = wsFiatubeUrl + '/ObtenerTipoNotasBySeccion';
var wsMtdAlmacenaDatProp = wsFiatubeUrl + '/AlmacenaDatosPropuesta';
var wsMtdACtualizaDatProp = wsFiatubeUrl + '/ActualizaPropuesta';
var wsMtdObtieneDatProp = wsFiatubeUrl + '/ObtenerDatosPantallaPropuesta';
var wsMtdgetAgendaOTs = wsFiatubeUrl + '/getAgendaOTs';
var wsMtdgetTipoNota = wsFiatubeUrl + '/getTipoNota';
var wsMtdgetDatosPantOT = wsFiatubeUrl + '/ObtieneDatosPantallaOT';
var wsMtdValidaElementosCarritoParaAdd = wsFiatubeUrl + '/ValidaElementosCarritoParaAdd';
var wsMtdGetLocales = wsFiatubeUrl + '/ObtenerLocales';
var wsMtdGetMatSol = wsFiatubeUrl + '/ObtieneSolMatLocal';
var wsMtdGetMapData = wsFiatubeUrl + "/getMapData";
var wsMtdGetTransferStates = wsFiatubeUrl + "/getStatesOnTransfer";

var wsMtdGuardarSolMatLocal = wsFiatubeUrl + "/GuardarSolMatLocal";
var wsMtdGetStatusCat = wsFiatubeUrl + "/obtenerEstatusTransferencia";
var wsMtdGetStorageLocal = wsFiatubeUrl + '/ObtenerStorageLocales';
var wsMtdUpdateMatSolPausado = wsFiatubeUrl + '/ActualizaSolMatPausado';
var wsMtdUpdateMatSolReanudar = wsFiatubeUrl + '/ActualizaSolMatReanudar';
var wsMtdUpdateMatSolPrioridad = wsFiatubeUrl + '/ActualizaSolMatPrioridad';
var wsMtdUpdateMatSolCancelado=wsFiatubeUrl + '/ActualizaSolMatCancelado';
var wsMtdUpdateMatSolReenviado=wsFiatubeUrl + '/ActualizaSolMatReenviado';
var wsMtdGetMaterialLocal = wsFiatubeUrl + '/ObtieneMaterialLocal';
var wsMtdGetStatusRed = wsFiatubeUrl + '/ObtenerStatusRed';
var wsMtdGetLocalesEmpl = wsFiatubeUrl + '/ObtenerLocalesEmpleado';
var wsMtdAlmacenaDatosOrdenTrabajo = wsFiatubeUrl + '/AlmacenaDatosOrdenTrabajo';
var wsMtdAlmacenaDatosOrdenTrabajoCompra = wsFiatubeUrl + '/AlmacenaDatosOrdenTrabajoCompra';
var wsMtdoObtenerDatosBusquedaAvanzada = wsFiatubeUrl + '/ObtenerDatosBusquedaAvanzada';
var wsMtdoObtenerObtenerEstadoByPais = wsFiatubeUrl + '/ObtenerEstadosPais';
var wsMtdoObtenerObtenerCiudadbyEstado = wsFiatubeUrl + '/ObtenerCiudadEstado';
var wsMtdGetProgramasTransmitir = wsFiatubeUrl + '/GetProgramasTransmitir';
var wsMtdBorraLogistica = wsFiatubeUrl + '/BorraLogistica';
var wsMtdoConsultaProgramaEmpleado = wsFiatubeUrl + '/obtenProgramaEmpleado';
var wsMtdoObtenerSeccionFormatoXIDEmpleado = wsFiatubeUrl + '/ObtenerSeccionFormatoXIDEmpleado';
var wsMtdoObtenerSeccionFormatoCompra = wsFiatubeUrl + '/ObtenerSeccionFormatoCompra';
var wsMtdoObtieneSeccionByIdEmpleado = wsFiatubeUrl + '/ObtieneSeccionByIdEmpleado';
var wsMtdActualizaLogistica = wsFiatubeUrl + '/ActualizaLogistica';
var wsMtdObtenerDatosPantallaOrdenTrabajo = wsFiatubeUrl + '/ObtenerDatosPantallaOrdenTrabajo';
var wsMtdActualizaReplicaFormatoCompra = wsFiatubeUrl + '/ActualizaReplicaFormatoCompra';
var wsMtdGuardarEquipoTrabajoRedactor = wsFiatubeUrl + '/GuardarEquipoTrabajoRedactor';
var wsMtdEnviaINEWS = wsFiatubeUrl + '/EnviaINEWS';
var wsMtdGetBusquedaAvzConSinOT = wsFiatubeUrl + '/ObtenerBusquedaAvanzadaConSinOT';
var wsMtdgetBloqueoVidByVdoFileName = wsFiatubeUrl + '/ObtenerBloqueoVideoByVdoIdFileName';
var wsMtdgetIdProgramaByidFileName = wsFiatubeUrl + '/getIdProgramaByidFileName';
var wsMtdActInfMetadata = wsFiatubeUrl + '/ActualizaInformacionMetadata';
var wsMtdGetTipoBloqueoVideo = wsFiatubeUrl + '/ObtieneTipoBloqueoVideo';
var wsMtdGetProgEmplFiltro = wsFiatubeUrl + '/obtenProgramaEmpleadoFiltro';
var wsMtdGetProgFormatoXProg = wsFiatubeUrl + '/obtenProgramaFormatoXProgLocal';
var wsMtdGetGuionNotaTrans = wsFiatubeUrl + '/GetGuionNotaTransmitida';
var wsMtdConsultaPlayListOT = wsFiatubeUrl + '/ConsultaPlayListOT';
var wsMtdConsultaPlayListOTFXP = wsFiatubeUrl + '/ConsultaPlayListOTFXP';
var wsMtdGetAdvanceOT = wsFiatubeUrl + '/getAvanceOT';
var wsMtdDeleteAdvanceOT = wsFiatubeUrl + '/BorraAvanceOT';
var wsMtdDeleteAdvanceProp = wsFiatubeUrl + '/BorraAvanceProp';
var wsMtdActualizaAvanceOT = wsFiatubeUrl + '/ActualizaAvanceOT';
var wsMtdActualizaAvanceProp = wsFiatubeUrl + '/ActualizaAvanceProp';
var wsMtdCreaAvanceOT = wsFiatubeUrl + '/CreaAvanceOT';
var wsMtdCreaAvancePro = wsFiatubeUrl + '/CreaAvanceProp';
var wsMtdGetPropAdvances = wsFiatubeUrl + '/getPropAvances';
var wsMtdGuardarLogistica = wsFiatubeUrl + '/GuardarLogistica';
var wsMtdActualizaOT = wsFiatubeUrl + '/ActualizaOT';
var wsMtdGetBitDiariaLocl = wsFiatubeUrl + '/ConsultaBitacoraDiaria_LOCALES';
var wsMtdConsFmtoComOT = wsFiatubeUrl + '/ConsultarFormatoCompraOT';
var wsMtdEnvioINewsPref = wsFiatubeUrl + '/EnvioINewsPreformato';
var wsMtdEnvioINewsDiaProgOrdn = wsFiatubeUrl + '/EnvioINewsDiariaProgOrdn';
var wsMtdSaveOrdenFmtoCompra = wsFiatubeUrl + '/GuardaOrdenFormatoCompra';
var wsMtdConsPrgFIA = wsFiatubeUrl + '/ConsultaProgramasFIA';

var wsMtdActualizaSol = wsFiatubeUrl + '/ActualizaSolicitud';
var wsMtdGetProgramasTransmitirBiz = wsFiatubeUrl + '/GetProgramasTransmitirBiz';

var wsMtdGetCusPrg = wsFiatubeUrl + '/ConsultaClientePrograma';
var wsMtdGetSeccFmto = wsFiatubeUrl + '/ConsultaSeccionFormato';
var wsMtdAlmacenaDatSol = wsFiatubeUrl + '/AlmacenaDatosSolicitud';

var wsMtdSaveOT2 = wsFiatubeUrl + '/GuardarOT2';
var wsMtdSaveAgenSem = wsFiatubeUrl + '/GuardarAgendaSemanal';
var wsMtdGuardarEquipoTrabajo = wsFiatubeUrl + '/GuardarEquipoTrabajo';
var wsMtdCompraOT = wsFiatubeUrl + '/CompraOT';
var wsMtdCompraPropuesta = wsFiatubeUrl + "/CompraPropuesta";
var wsMtdGuardarOT = wsFiatubeUrl + '/GuardarOT';

var wsMtdGuardaCable = wsFiatubeUrl + '/GuardaCable';
var wsMtdActualizarCable = wsFiatubeUrl + '/ActualizarCable';

var wsMtdConsultaTipoRecVideo = wsFiatubeUrl + '/ConsultaTipoRecuperacionVideos';
var wsMtdGetPlayOutSharesRec = wsFiatubeUrl + '/ObtenerPlayOutSharesRecuperaciones';
var wsMtdGetPrefixArchivo = wsFiatubeUrl + '/GetPrefixArchivo';
var wsMtdCambiaEstatusOT = wsFiatubeUrl + '/CambiaEstatusOT';
var wsMtdgetAgendaOTsLocales = wsFiatubeUrl + '/getAgendaOTs_LOCALES';

var wsMtdConsultaCable = wsFiatubeUrl + '/ConsultaCable';
var wsMtdCambiaFechaOT = wsFiatubeUrl + '/CambiaFechaOT';
var wsMtdCambiaFechaProp = wsFiatubeUrl + '/CambiaFechaProp';
var wsMtdEliminarPropuesta = wsFiatubeUrl + '/EliminarPropuesta';

var wsMtgGetViodeoGaleria = wsFiatubeUrl + '/ConsultaImagenesOTByVideoReferenciaExtraDetalle';
var wsMtdCambiaTipoNotaOT = wsFiatubeUrl + '/CambiaTipoNotaOT';

var wsMtdExisteEnRbt = wsFiatubeUrl + '/ValidaExisteEnRobot';

var wsMtdGetReporterosList = wsFiatubeUrl + '/GetReporterosList';
var wsMtdGetCamarografosList = wsFiatubeUrl + '/GetCamarografosList';
var wsMtdGetEditoresList = wsFiatubeUrl + "/GetEditoresList";
var wsMtdAlmacenaDatosOrdenTrabajoRegreso = wsFiatubeUrl + "/AlmacenaDatosOrdenTrabajoRegreso";
var wsMtdObtenerOdenTrabajoMultiple = wsFiatubeUrl + "/ObtenerOdenTrabajoMultiple";

var wsMtdConsultaTipoIngestion = wsFiatubeUrl + "/ConsultaTipoIngestion";
var wsMtdGetIngestiones = wsFiatubeUrl + "/ConsultaIngestiones";
var wsMtdGetAgencias = wsFiatubeUrl + "/ConsultaAgencias";
var wsGetCorresponsal = wsFiatubeUrl + "/ConsultaCorresponsal";
var wsGetMedioSenal = wsFiatubeUrl + "/ConsultaTiposFormatosSenal";
var wsGuardaOTCompraIng = wsFiatubeUrl + "/AlmacenaDatosOrdenTrabajoCompraIngestion";
var wsGetOrdenTrabajo = wsFiatubeUrl + "/ObtenerOrdenTrabajo"
var wsGetClientByCveEmpl = wsFiatubeUrl + "/ObtieneClienteByCveEmpleado";
var wsGuardaAgSemanalProp = wsFiatubeUrl + "/GuardaAgendaSemanalPropuesta";
var wsMtdSaveRequestIng = wsFiatubeUrl + "/GuardarSolicitudIngestion";
var wsMtdUpdateRequestIng = wsFiatubeUrl + "/ActualizaSolicitudIngestion";
var wsMtdGetRequestIngs = wsFiatubeUrl + "/ConsultaSolicitudesIngestiones";

var wsMtdGetEvnDptvo = wsFiatubeUrl + "/ObtenerEventoxID_Fecha";
var wsMtdDeleteEvent = wsFiatubeUrl + "/EliminarEVDT";
var wsMtdGetObs = wsFiatubeUrl + "/ObtenerObservaciones";
var wsMtdDeleteObs = wsFiatubeUrl + "/EliminarObservacion";
var wsMtdSaveObs = wsFiatubeUrl + "/CrearObservacion";
var wsMtdUpdateObs = wsFiatubeUrl + "/ModificarObservacion";

var wsMtdGetEmplEvdt = wsFiatubeUrl + "/ObtenerEmpleados_EVDT";
var wsMtdDeleteEmplEVDT = wsFiatubeUrl + "/EliminarEmpleado_EVDT";
var wsMtdSaveEmplEVDT = wsFiatubeUrl + "/AgregarEmpleado_EVDT";

var wsMtdGetGraphics = wsFiatubeUrl + "/ObtenerGraficos";
var wsMtdDeleteGraphics = wsFiatubeUrl + "/EliminarGraficos";
var wsMtdUpdGraphics = wsFiatubeUrl + "/ModificarGraficos";
var wsMtdSaveGraphics = wsFiatubeUrl + "/CrearGraficos";

var wsMtdGetPrgsByLocal = wsFiatubeUrl + "/ObtieneProgramasPorLocal";
var wsGetFmtoEvaluacion = wsFiatubeUrl + "/ObtieneFormatosEvaluacion";
var wsMtdUpdateFmto = wsFiatubeUrl + "/ActualizarFormato";
var wsMtdUpdateDelEval = wsFiatubeUrl + "/ActualizarStatusReaiEliminar";
var wsMtdGetEvalCOmment = wsFiatubeUrl + "/ObtenerComentario";
var wsMtdEvalNote = wsFiatubeUrl + "/Evaluar";
var wsMtdSaveComment = wsFiatubeUrl + "/GuardarComentario";
var wsMtdUpdateComment = wsFiatubeUrl + "/ActualizarComentario";
var wsMtdUpdateEval = wsFiatubeUrl + "/ActualizarEvaluacion";
var wsMtdEnvINewsRecGuion = wsFiatubeUrl + "/InicializaEnvioINewsRecuperarGuion";
var wsMtdGetRecupGuion = wsFiatubeUrl + "/ObtenerGuionRecuperacionGuion";

var wsMtdGetMonitorListType = wsFiatubeUrl + "/ObtenerListaTipoMonitoreo";
var wsMtdDeleteMonitor = wsFiatubeUrl + "/EliminarMonitoreo";
var wsMtdUpdateMonitor = wsFiatubeUrl + "/ActualizaMonitoreo";
var wsMtdSaveMonitor = wsFiatubeUrl + "/GuardaMonitoreo";
var wsMtdGetFmtosGuion = wsFiatubeUrl + "/ConsultaFormatosGuionLocal";

var wsMtdGetStatusEditor = wsFiatubeUrl + "/ConsultaEstatusEditor";
var wsMtdGetRequestEditorDur = wsFiatubeUrl + "/ConsultaSolicitudEditorDuracion";
var wsMtdGetDataWorkGroup = wsFiatubeUrl + "/ConsultarDatosEquipoTrabajo";
var wsMtdGetRealizadores = wsFiatubeUrl + "/ConsultaRealizadores";
var wsMtdDelWorkGroupSOED = wsFiatubeUrl + "/EliminaEquipoTrabajoSOED";
var wsMtdInsertWorkGroup = wsFiatubeUrl + "/InsertaListaEquipoTrabajo";
var wsMtdUpdateSolEditor = wsFiatubeUrl + "/ActualizaSolicitudEditor";
var wsMtdUpdateSolEditorObj = wsFiatubeUrl + "/ActualizaSolicitudEditorObj";
var wsMtdUpdateLstRequestEdit = wsFiatubeUrl + "/ActualizaListaSolicitudEditor";
var wsGetCentroEdicion = wsFiatubeUrl + "/ConsultarCentroEdicion";
var wsMtdGetDatosRealizadores = wsFiatubeUrl + "/ConsultaDatosRealizadores";
var wsMtdDelRegistroRealizador = wsFiatubeUrl + "/EliminarRegistroRealizador";
var wsMtdGetRealPart2 = wsFiatubeUrl + "/ConsultaRealizadoresPart2";
var wsMtdGetDataSolEditor = wsFiatubeUrl + "/ConsultaDatosSolicitudEditor";
var wsMtdDelSolEd = wsFiatubeUrl + "/BorrarSolicitudEditor";
var wsMtdUpdEqTrab = wsFiatubeUrl + "/ActualizaEquipoTrabajo";
var wsMtdSaveRegistroReal = wsFiatubeUrl + "/GuardarRegistroRealizador";
var wsMtdUpdateRating = wsFiatubeUrl + "/updateRatingOT";
var wsMtdGetRatings = wsFiatubeUrl + "/getListaRating";

var wsMtdGetFmtoCompraEd = wsFiatubeUrl + "/ConsultarFormatoCompraEdicion";
var wsMtdGetOTCvec = wsFiatubeUrl + "/ObtenerOrdenTrabajoCvecHtml5";
var wsMtdInsLstSolEd = wsFiatubeUrl + "/InsertaListaSolicitudEditor";
var wsMtdGetRptAsignacionNotas = wsFiatubeUrl + "/obtenerRptAsignacionNotas";

/*************** Equipo de trabajo por Local ********/
var wsMtdObtieneDatosEquiporlocal = wsFiatubeUrl + '/ObtieneDatosEquiporlocal';

/************************************** Nombres Metodos wsManejadorLogs *****************************/
/****************************************************************************************************/
var wsMtdSaveLog = wsManejadorLogsUrl + '/GuardarLogAccesos';

/************************************** Nombres Metodos wsManejadorErrores *****************************/
/****************************************************************************************************/
var wsMtdGuardarLogError = wsManejadorErrores + '/GuardarLogError';

/************************************** Nombres Metodos wsRecuperaVideo *****************************/
/****************************************************************************************************/
var wsMtdElimVidRec = wsRecuperaVideo + '/EliminaVideoRecuperacion';
var wsMtdGetPrivRec = wsRecuperaVideo + '/ConsultaPrivilegioRecuperacion';
var wsMtdConsultaPrioridadVideoRec = wsRecuperaVideo + '/ConsultaPrioridadVideoRecu';
var wsMtdDeleteSearch = wsRecuperaVideo + '/BorraBusquedaByNombre';

var navegador = navigator.appName
if (navegador == "Microsoft Internet Explorer") {
    direccion = siteUrl;
    alert('El navegador que esta utilizando no esta soportado por la aplicacion, favor de utilizar otro.');
    window.location = direccion;
}
