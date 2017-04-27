
/*Objeto utilizado para los metodos: AlmacenaDatosPropuesta*/
function AlmacenaDatosPropuesta(cveEmpleadoCliente, TDI_Propuesta, THE_AgendaSemanal, esNueva) {
    this.cveEmpleadoCliente = cveEmpleadoCliente;
    this.oPropuesta = TDI_Propuesta;
    this.oAgendaSemanal = oAgendaSemanal;
    this.esNueva = esNueva;
    this.oAgendaSemanal = THE_AgendaSemanal;
}

function THE_AgendaSemanal(CveAgendaSemanal, FechaInicio, Origen, Estatus, Orden, TDI_Seccion, Titulo, TDI_TipoNota, NumeroOTPropuesta, AnteriorOTPropuesta, FechaCreacion) {
    this.CveAgendaSemanal = CveAgendaSemanal;
    this.FechaInicio = FechaInicio;
    this.Origen = Origen;
    this.Estatus = Estatus;
    this.Orden = Orden;
    this.CveSeccion = TDI_Seccion;
    this.Titulo = Titulo;
    this.CveTipoNota = TDI_TipoNota;
    this.NumeroOTPropuesta = NumeroOTPropuesta;
    this.AnteriorOTPropuesta = AnteriorOTPropuesta;
    this.FechaCreacion = FechaCreacion;
}


function TDI_StatusMatLocal(_CveStatusMatLocal, _NombreAbrev, _Nombre, _FechaCreacion, _FechaActualizacion, _Obs) {

    this.CveStatusMatLocal = _CveStatusMatLocal;
    this.NombreAbrev = _NombreAbrev;
    this.Nombre = _Nombre;
    this.FechaCreacion = _FechaCreacion;
    this.FechaActualizacion = _FechaActualizacion;
    this.Obs = _Obs;
}

function TDI_PriorMatLocal(_CvePriorMatLocal, _Descripcion, _Abreviatura, _FechaCreacion, _FechaActualizacion, _Obs) {

    this.CvePriorMatLocal = _CvePriorMatLocal;
    this.Descripcion = _Descripcion; 
    this.Abreviatura = _Abreviatura;
    this.FechaCreacion = _FechaCreacion;
    this.FechaActualizacion = _FechaActualizacion;
    this.Obs = _Obs;
}

function TDI_TipoMatLocal(_TatlLlave, _TatlNombreCorto, _TatlNombre, _TatlFechaCreacion, _TatlFechaActualizacion, _TatlObs) {

    this.TatlLlave = _TatlLlave;
    this.TatlNombreCorto = _TatlNombreCorto;
    this.TatlNombre = _TatlNombre;
    this.TatlFechaCreacion = _TatlFechaCreacion;
    this.TatlFechaActualizacion = _TatlFechaActualizacion;
    this.TatlObs = _TatlObs;
}

function TDI_Propuesta(cvePropuesta, TDI_TipoNota, TDI_Formato, titulo, TDI_Seccion, Descripcion, FechaCreacion, Usuario, Fecha, TDI_Puestos, TDI_EMPL, Tema, TDI_Cliente, Objetivo,
                       THE_Cable, FechaAgenda, IndiceCompra, Local, Empresa) {
    this.CvePropuesta = cvePropuesta;
    this.CveTipoNota = TDI_TipoNota;
    this.CveFormato = TDI_Formato;
    this.Titulo = titulo;
    this.CveSeccion = TDI_Seccion;
    this.Descripcion = Descripcion;
    this.FechaCreacion = FechaCreacion;
    this.Usuario = Usuario;
    this.Fecha = Fecha;
    this.CvePuesto = TDI_Puestos;
    this.CveEmpleado = TDI_EMPL;
    this.Tema = Tema;
    this.CveCliente = TDI_Cliente;
    this.Objetivo = Objetivo;
    this.CveCable = THE_Cable;
    this.FechaAgenda = FechaAgenda;
    this.IndiceCompra = IndiceCompra;
    this.Local = TDI_Local;
    this.Empresa =TDI_Empresa;
}

function THE_Cable(CveCable, TDI_Agencia, Id, Titulo, Fecha, Estado, Tiempo, Descripcion, TDI_Seccion, THE_OrdenTrabajo, CveEmpl, Avance) {
    this.CveCable = CveCable;
    this.CveAgencia = TDI_Agencia;
    this.Id = Id;
    this.Titulo = Titulo;
    this.Fecha = Fecha;
    this.Estado = Estado;
    this.Tiempo = Tiempo;
    this.Descripcion = Descripcion;
    this.CveSecc = TDI_Seccion;
    this.OrdenTrab = THE_OrdenTrabajo;
    this.CveEmpl = CveEmpl;
    this.Avance = Avance;
}

function THE_OrdenTrabajo(IndiceValidacionInsercion, Usuario, CveOrdenTrabajo, Version, CveSeccion, CveCliente, FechaEvento, Titulo, Objetivo, HistoryLine, CveEmpleado,
                          Estatus, Origen, Orini, CveTipoNota, UsuarioProductor, Replica, SolicitudPremisia, CveOrigen, ClaveOrdenTrabajo, CveEventoDeportivo, IndiceCompra,
                          FechaAgenda, CveCable, TDI_EMPL,TDI_Most, TDI_Fabrica, oAS_Local, fechaEntregaEspectaculos,
                          TDI_Empresa, TDI_Local, TDI_Programa) {
    this.IndiceValidacionInsercion = IndiceValidacionInsercion;
    this.Usuario = Usuario;
    this.CveOrdenTrabajo = CveOrdenTrabajo;
    this.Version = Version;
    this.CveSeccion = CveSeccion;
    this.CveCliente = CveCliente;
    this.FechaEvento = FechaEvento;
    this.Titulo = Titulo;
    this.Objetivo = Objetivo;
    this.HistoryLine = HistoryLine;
    this.CveEmpleado = CveEmpleado;
    this.Estatus = Estatus;
    this.Origen = Origen;
    this.Orini = Orini;
    this.CveTipoNota = CveTipoNota;
    this.UsuarioProductor = UsuarioProductor;
    this.Replica = Replica;
    this.SolicitudPremisia = SolicitudPremisia;
    this.CveOrigen = CveOrigen;
    this.ClaveOrdenTrabajo = ClaveOrdenTrabajo;
    this.CveEventoDeportivo = CveEventoDeportivo;
    this.IndiceCompra = IndiceCompra;
    this.FechaAgenda = FechaAgenda;
    this.CveCable = CveCable;
    this.EmplCrea = TDI_EMPL;
    this.MostLlave = TDI_Most;
    this.FabrLlave = TDI_Fabrica;
    this.OAS_Local = oAS_Local;
    this.FechaEntregaEspectaculos = fechaEntregaEspectaculos;
    this.Empresa = TDI_Empresa;
    this.Local = TDI_Local;
    this.Programa = TDI_Programa;
 }

 function TDI_Agencia(cveAgencia, nombreAgencia) {
     this.CveAgencia = cveAgencia;
     this.NombreAgencia = nombreAgencia;
 }

function TDI_Cliente(CveCliente, NombreDescripcion, EstatusCliente, TDI_EMPL) {
    this.CveCliente = CveCliente;
    this.NombreDescripcion = NombreDescripcion;
    this.EstatusCliente = EstatusCliente;
    this.EmpleadoLlavePrimaria = TDI_EMPL;
 }

 function TDI_Puestos(PuestoLlavePrimaria, PuestoDescripcion, PuestoStatus) {
    this.PuestoLlavePrimaria = PuestoLlavePrimaria;
    this.PuestoDescripcion = PuestoDescripcion;
    this.PuestoStatus = PuestoStatus;
}

function TDI_TipoNota(cveTipoNota, DescripcionTipoNota, abreviatura, estatus) {
    this.CveTipoNota = cveTipoNota;
    this.DescripcionTipoNota = DescripcionTipoNota;
    this.AbreviaturaTipoNota = abreviatura;
    this.EstatusTipoNota = estatus;
}

function TDI_Formato(CveFormato, Descripcion, Abreviatura, Aplica, Duracion, INews) {
    this.CveFormato = CveFormato;
    this.Descripcion = Descripcion;
    this.Abreviatura = Abreviatura;
    this.Aplica = Aplica;
    this.Duracion = Duracion;
    this.INews = INews;
}

function TDI_Seccion(cveSeccion, TDI_EMPL, nombreSeccion, estatusSeccion, colorSeccion, Cade, ResponsableSeccion, ExtensionResponsable, SeccionFIA, MediaGridActual, MediaGridRuta, MediaGridTotal) {
    this.CveSeccion = cveSeccion;
    this.EmpleadoLlavePrimaria = TDI_EMPL;
    this.NombreSeccion = nombreSeccion;
    this.EstatusSeccion = estatusSeccion;
    this.ColorSeccion = colorSeccion;
    this.Cade = Cade;
    this.ResponsableSeccion = ResponsableSeccion;
    this.ExtensionResponsable = ExtensionResponsable;
    this.SeccionFIA = SeccionFIA;
    this.MediaGridActual = MediaGridActual;
    this.MediaGridRuta = MediaGridRuta;
    this.MediaGridTotal = MediaGridTotal;
 }

 function TDI_EMPL(empleadoLlavePrimaria, TDI_TipoEmpleado, empleadoNombre, empleadoUsr, empleadoStatus, empleadoChk, empleadoChkVisible)
 {
     this.EmpleadoLlavePrimaria = empleadoLlavePrimaria;
     this.EmpleadoTipo = TDI_TipoEmpleado;
     this.EmpleadoNombre = empleadoNombre;
     this.EmpleadoUsr = empleadoUsr;
     this.EmpleadoStatus = empleadoStatus;
     this.EmpleadoChk = empleadoChk;
     this.EmpleadoChkVisible = empleadoChkVisible;
 }

 function TDI_TipoEmpleado(EmpleadoTipo, DescripcionTipoEmpleado) {
     this.EmpleadoTipo = EmpleadoTipo;
     this.DescripcionTipoEmpleado = DescripcionTipoEmpleado;
  }

  function THE_LogAccesos(cveLogAccesos, fechaCreacion, cveEmpleado, pantalla, dominio, machineName, dirIp) {
      this.CveLogAccesos = cveLogAccesos;
      this.FechaCreacion = fechaCreacion;
      this.CveEmpleado = cveEmpleado;
      this.Modulo = pantalla;
      this.Dominio = dominio;
      this.MachineName = machineName;
      this.DirIP = dirIp;
  }

  function GuardarLogAccesos(THE_LogAccesos) {
      this.LogAccesos = THE_LogAccesos;
  }

  function AgendaOT(agseNume,numotCom,agseFecr,agseFini,seccLlPr,agseTitu,agseOrig,tinoLlPr,
  agseStat,otraGuio,seccColor, tieneAvance,seccDesc,tipoProg,tnoDesc,tinoAbre,otraOrig,otraRepl,otraCvec,
  evdtLlPr,videoImg,agendaRotulo,videoReferencia,videoTimeIni,videoTimeFin,concatenadoFotos,
  estaComprada,estaSeleccionada) {
      this.AgseFecr = agseNume;
      this.NumotCom = numotCom;
      this.AgseFecr = agseFecr;
      this.AgseFini = agseFini;
      this.SeccLlPr = seccLlPr;
      this.AgseTitu = agseTitu;
      this.AgseOrig = agseOrig;
      this.TinoLlPr = tinoLlPr;
      this.AgseStat = agseStat;
      this.OtraGuio = otraGuio;
      this.SeccColor = seccColor;
      this.TieneAvance =tieneAvance;
      this.SeccDesc = seccDesc;
      this.TipoProg =tipoProg;
      this.TnoDesc = tnoDesc;
      this.TinoAbre = tinoAbre;
      this.OtraOrig =otraOrig;
      this.OtraRepl =otraRepl;
      this.OtraCvec =otraCvec;
      this.EvdtLlPr =evdtLlPr;
      this.VideoImg =videoImg;
      this.AgendaRotulo =agendaRotulo;
      this.VideoReferencia =videoReferencia;
      this.VideoTimeIni =videoTimeIni;
      this.VideoTimeFin =videoTimeFin;
      this.ConcatenadoFotos = concatenadoFotos;
      this.EstaComprada = estaComprada;
      this.EstaSeleccionada = estaSeleccionada;
  }
  function TipoNota(tinoLlPr, tnoDesc, seccLlPr, seccDesc, tinoAbre) {

      this.TinoLlPr = tinoLlPr;
      this.TnoDesc = tnoDesc;
      this.SeccLlPr = seccLlPr;
      this.SeccDesc = seccDesc;
      this.TinoAbre = tinoAbre;
  }
  function Secciones(seccLlPr, seccDesc, emplLlPr, emplNomb, seccColr) { 
  
    this.SeccLlPr = seccLlPr;
    this.SeccDesc = seccDesc;
    this.EmplLlPr = emplLlPr;
    this.EmplNomb = emplNomb;
    this.SeccColr = seccColr;

}
function THE_LogTransacciones(cveLogTransaccion, fecha, cveTran, usuario, descripcion, dominio,  machineName, dirIP ) {
    this.CveLogTransaccion = cveLogTransaccion;
    this.Fecha = fecha;
    this.CveTran = cveTran;
    this.Usuario = usuario;
    this.Descripcion = descripcion;
    this.Dominio = dominio;
    this.MachineName = machineName;
    this.DirIP = dirIP;

}
function CambiaTipoNotaOT(numOT, TDI_TipoNota, THE_LogTransacciones) {
    this.NumOT = numOT;
    this.Nota = TDI_TipoNota;
    this.Tran = THE_LogTransacciones;
}
function CambiaTinoProp(numProp, TDI_TipoNota) { 
this.NumProp = numProp;
this.Nota = TDI_TipoNota;
}

function TDI_Empresa(CveEmpresa, NombreEmpresa, Estatus, Abreviatura, BanderaIngestionAzteca) {
    this.CveEmpresa = CveEmpresa;
    this.NombreEmpresa = NombreEmpresa;
    this.Estatus = Estatus;
    this.Abreviatura = Abreviatura;
    this.BanderaIngestionAzteca = BanderaIngestionAzteca;
}

function TDI_Local(localDescripcion,    localLlave,    empleadoLlave,    localFTP,    loclUsuario,    localContrasenia,    localAbrebiatura,    loclEstatus)
 {
     this.LocalDescripcion = localDescripcion;
     this.LocalLlave = localLlave;
     this.EmpleadoLlave = empleadoLlave;
     this.LocalFTP = localFTP;
     this.LoclUsuario = loclUsuario;
     this.LocalContrasenia = localContrasenia;
     this.LocalAbrebiatura = localAbrebiatura;
     this.LoclEstatus = loclEstatus;
 }

 function THE_SolMatLocal(_CveSolMatLocal, _CveEmpleado, _CveDestino, _CveEstatus, _CveOrigen, _CvePrioridad, _CveVideoRecuperacion, _CveMaterialenLocal, _Nombre, _Tamano, _Ruta, _PorcentajeEnvio, _Duracion, _FechaSolicitud, _TipoMaterialenLocal, _FechaSolicitudTerminada, _CveMaterialOrigenEnvioLocal, _CveMaterialDestinoRecepcionLocal, _CheckOrigen, _CheckDestino) {
     this.CveSolMatLocal = _CveSolMatLocal;
     this.CveEmpleado = _CveEmpleado;
     this.CveDestino = _CveDestino;
     this.CveEstatus = _CveEstatus;
     this.CveOrigen = _CveOrigen;
     this.CvePrioridad = _CvePrioridad;
     this.CveVideoRecuperacion = _CveVideoRecuperacion;
     this.CveMaterialenLocal = _CveMaterialenLocal;
     this.Nombre = _Nombre;
     this.Tamano = _Tamano;
     this.Ruta = _Ruta;
     this.PorcentajeEnvio = _PorcentajeEnvio;
     this.Duracion = _Duracion;
     this.FechaSolicitud = _FechaSolicitud;
     this.TipoMaterialenLocal = _TipoMaterialenLocal;
     this.FechaSolicitudTerminada = _FechaSolicitudTerminada;
     this.CveMaterialOrigenEnvioLocal = _CveMaterialOrigenEnvioLocal;
     this.CveMaterialDestinoRecepcionLocal = _CveMaterialDestinoRecepcionLocal;
     this.CheckOrigen = _CheckOrigen;
     this.CheckDestino = _CheckDestino;
 }

 function THE_SolMatLocalPROGRAMADASyACTUALES(TareaTurno, Nombre, Hinicial, HFinal, TipoMaterial, Status, StatusId, PorcentajeEnviado, PesoEnBytes, Archivos, IndicadorTransferencia, PrioridadId, MatsolId) {
     this.TareaTurno = TareaTurno
     this.Nombre = Nombre
     this.Hinicial = Hinicial
     this.HFinal = HFinal
     this.TipoMaterial = TipoMaterial
     this.Status = Status
     this.StatusId = StatusId
     this.PorcentajeEnviado = PorcentajeEnviado
     this.PesoEnBytes = PesoEnBytes
     this.Archivos = Archivos
     this.IndicadorTransferencia = IndicadorTransferencia
     this.PrioridadId = PrioridadId
     this.MatsolId = MatsolId
 }


 function THE_MaterialLocal(CveMaterialLocal, CvePrograma, CveArchivado, CveLocal, CveOrdenTrabajo, ClaveOrdenTrabajo, ClaveMaterialLocal, Descripcion, Extension, Tamano, TipoMaterialLocal, Duracion, ExisteLocal, FechaCreacion, FechaActualizacion, NombreArchivo, Direccion, urlVideo, urlImagenCveMaterialLocal) {
     this.CveMaterialLocal;
     this.CvePrograma;
     this.CveArchivado;
     this.CveLocal;
     this.CveOrdenTrabajo;
     this.ClaveOrdenTrabajo;
     this.ClaveMaterialLocal;
     this.Descripcion;
     this.Extension;
     this.Tamano;
     this.TipoMaterialLocal;
     this.Duracion;
     this.ExisteLocal;
     this.FechaCreacion;
     this.FechaActualizacion;
     this.NombreArchivo;
     this.Direccion;
     this.urlVideo;
     this.urlImagen;
 }


 function THE_StorageLocal(CveStgLocal, CveLocal, StgLclTotal, StgLclUsado, StgLclPath) {
     this.CveStgLocal = CveStgLocal;
     this.CveLocal = CveLocal;
     this.StgLclTotal = StgLclTotal;
     this.StgLclUsado = StgLclUsado;
     this.StgLclPath = StgLclPath;
 }

 function THE_StatusRed(CveStrRed, CveLocal, StrRedTotal, StrRedUsada, StrRedFecha) {

     this.CveStrRed = CveStrRed;
     this.CveLocal = CveLocal;
     this.StrRedTotal = StrRedTotal;
     this.StrRedUsada = StrRedUsada;
     this.StrRedFecha = StrRedFecha;
 }

function CambiaEstatusOT(numOT, vStrEstatus, THE_LogTransacciones) {
    this.NumOT = numOT;
    this.strEstatus = vStrEstatus;
    this.Tran = THE_LogTransacciones;
}
function THE_EventoDeportivo(idEvento, Titulo, Descripcion, Lugar, FechaInicio, FechaFin, Estatus,
 UsuMov, ordenTrabajo, HoraIni, HoraFin, eventoPadre, cvePrograma, THE_EventoDeportivo, THE_SolicitudFormato,
 THE_OrdenTrabajo, THE_Logistica_EVDT, THE_EquipoTrabajo_EVDT, THE_ParametrosEVDT_Valores, OTProg) {
    this.IdEvento = idEvento;
    this.sTitulo = Titulo;
    this.sDescripcion = Descripcion;
    this.sLugar = Lugar;
    this.dtFechaInicio = FechaInicio;
    this.dtFechaFin = FechaFin;
    this.sEstatus = Estatus;
    this.sUsuMov = UsuMov;
    this.OrdenTrabajo = ordenTrabajo;
    this.sHoraIni = HoraIni;
    this.sHoraFin = HoraFin;
    this.ieventoPadre = eventoPadre;
    this.CvePrograma = cvePrograma;
    this.subEventos = THE_EventoDeportivo;
    this.solicitudes = THE_SolicitudFormato;
    this.senales = THE_OrdenTrabajo;
    this.logistica = THE_Logistica_EVDT;
    this.eqTrabajo = THE_EquipoTrabajo_EVDT;
    this.Parametros = THE_ParametrosEVDT_Valores;
    this.agendaPrograma = OTProg;

}
function THE_SolicitudFormato(cveSolicitudFormato, THE_Solicitud, TDI_Programa, TDI_Formato, fechaCompra,
                                duracion, visibilidadBotonAutoriza, visibilidadBotonRechaza, habilitaBoton, estatusTexto) {
    this.CveSolicitudFormato = cveSolicitudFormato;
    this.CveSolicitud=THE_Solicitud; 
    this.CvePrograma =TDI_Programa;
    this.CveFormato =TDI_Formato;
    this.FechaCompra = fechaCompra;
    this.Duracion = duracion;
    this.VisibilidadBotonAutoriza = visibilidadBotonAutoriza;
    this.VisibilidadBotonRechaza = visibilidadBotonRechaza;
    this.HabilitaBoton = habilitaBoton;
    this.EstatusTexto = estatusTexto;
}
function THE_Logistica_EVDT(idLogistica, THE_EventoDeportivo, Lugar, Fecha, Hora, Observacion,
fechacreacion, UsuMov, THE_ARCHIVO_LOGISTICA) {
    this.IdLogistica = idLogistica;
    this.EventoDeportivo = THE_EventoDeportivo;
    this.sLugar = Lugar;
    this.dtFecha = Fecha;
    this.sHora = Hora;
    this.sObservacion = Observacion;
    this.dtfechacreacion = fechacreacion;
    this.sUsuMov = UsuMov;
    this.ArchivosLogistica = THE_ARCHIVO_LOGISTICA;

}
function THE_EquipoTrabajo_EVDT(idEquipoTrabajo, THE_EventoDeportivo, idEmpleado, sNombreEmpleado, FechaEQ) {
    this.IdEquipoTrabajo = idEquipoTrabajo;
    this.EventoDeportivo = THE_EventoDeportivo;
    this.IdEmpleado = idEmpleado;
    this.snombreEmpleado = sNombreEmpleado;
    this.dtFechaEQ = FechaEQ;

}
function THE_ParametrosEVDT_Valores(IdParametroValor, IdEvento, TDI_ParametrosEVDT, ParametroValor,
    ParametroValores, THE_ParametrosEVDT_Vals, IValorSeleccionado) {
    this.idParametroValor = IdParametroValor;
    this.idEvento = IdEvento;
    this.idParametro = TDI_ParametrosEVDT;
    this.sParametroValor = ParametroValor;
    this.sParametroValores = ParametroValores;
    this.PARAMETROS = THE_ParametrosEVDT_Vals;
    this.iValorSeleccionado = IValorSeleccionado;
}
function OTProg(otraLlPr, esinLlPr, fmtoLlPr, foepFecr, foepUscr,foepFiap,seccColr,otraTitu,seccLlPr,
fabrDesc,seccDesc,esinDesc,tieneAvance,fmtoDesc,otraOrig,otraRepl,tnoDesc,esinAbre,fmtoDura,otraStli,
otraCvec, fabrColr, emprLlPr, numotCom) {
    this.OtraLlPr = otraLlPr;
    this.EsinLlPr = esinLlPr;
    this.FmtoLlPr = fmtoLlPr; 
    this.FoepFecr = foepFecr;
    this.FoepUscr = foepUscr; 
    this.FoepFiap = foepFiap;
    this.SeccColr = seccColr;
    this.OtraTitu = otraTitu;
    this.SeccLlPr = seccLlPr;
    this.FabrDesc = fabrDesc;
    this.SeccDesc = seccDesc;
    this.EsinDesc = esinDesc;
    this.TieneAvance = tieneAvance;
    this.FmtoDesc = fmtoDesc;
    this.OtraOrig = otraOrig;
    this.OtraRepl = otraRepl;
    this.TnoDesc = tnoDesc;
    this.EsinAbre = esinAbre;
    this.FmtoDura = fmtoDura;
    this.OtraStli = otraStli;
    this.OtraCvec = otraCvec;
    this.FabrColr = fabrColr;
    this.EmprLlPr = emprLlPr;
    this.NumotCom = numotCom;
}
function THE_Solicitud(cveSolicitud, usuario, TDI_Seccion, TDI_Cliente, tage, titulo, objetivo, historyLine,
TDI_EMPL, estatus, fechaCreacion, cveOrdenTrabajo, claveOT, fechaSolicitud, tema, TDI_TipoNota,
THE_EventoDeportivo, TDI_Local, TDI_Empresa, TDI_Fabrica) {
    this.CveSolicitud = cveSolicitud;
    this.Usuario = usuario;
    this.CveSeccion = TDI_Seccion;
    this.CveCliente = TDI_Cliente
    this.Tage = tage;
    this.Titulo = titulo;
    this.Objetivo = objetivo;
    this.HistoryLine = historyLine;
    this.CveEmpleado = TDI_EMPL;
    this.Estatus = estatus;
    this.FechaCreacion = fechaCreacion;
    this.CveOrdenTrabajo = cveOrdenTrabajo;
    this.ClaveOT = claveOT;
    this.FechaSolicitud = fechaSolicitud;
    this.Tema = tema;
    this.CveTipoNota = TDI_TipoNota;
    this.EventoDeportivo = THE_EventoDeportivo;
    this.Local = TDI_Local;
    this.Empresa = TDI_Empresa;
    this.Fabrica = TDI_Fabrica;
}
function TDI_Programa(esFiaNoticias, idIBOP, esFia, nombreIBOP, diasTransmision, fechaFin, fechaInicio,
canal, abreviatura2, abreviatura, horaTransmision, idCC, estatusPrograma, nombrePrograma, cvePrograma,
esAztecaAmerica, esDeporteContacto, mediaGridTotal, mediaGridActual, mediaGridRuta, cveFabrica,
carpetaiNews, TDI_Empresa, tipoPrograma, diaGrabacion, diaEdicion) {
    this.EsFiaNoticias = esFiaNoticias;
    this.IdIBOP = idIBOP;
    this.EsFia = esFia;
    this.NombreIBOP = nombreIBOP;
    this.DiasTransmision = diasTransmision;
    this.FechaFin = fechaFin;
    this.FechaInicio = fechaInicio;
    this.Canal = canal;
    this.Abreviatura2 = abreviatura2;
    this.Abreviatura = abreviatura;
    this.HoraTransmision = horaTransmision;
    this.IdCC = idCC;
    this.EstatusPrograma = estatusPrograma;
    this.NombrePrograma = nombrePrograma;
    this.CvePrograma = cvePrograma;
    this.EsAztecaAmerica = esAztecaAmerica;
    this.EsDeporteContacto = esDeporteContacto;
    this.MediaGridTotal = mediaGridTotal;
    this.MediaGridActual = mediaGridActual;
    this.MediaGridRuta = mediaGridRuta;
    this.CveFabrica = cveFabrica;
    this.CarpetaiNews = carpetaiNews;
    this.oEmpresa = TDI_Empresa;
    this.TipoPrograma = tipoPrograma;
    this.DiaGrabacion = diaGrabacion;
    this.DiaEdicion = diaEdicion;

}
function THE_ARCHIVO_LOGISTICA(idArchivo, THE_Logistica_EVDT, NombreArchivo, ITamano, idLogistica) {
    this.IdArchivo = idArchivo;
    this.Logistica = THE_Logistica_EVDT;
    this.sNombreArchivo = NombreArchivo;
    this.iTamano = ITamano;
    this.IdLogistica = idLogistica;
}
function TDI_ParametrosEVDT(IdParametro, descripcionParametro, estatusParametro, tipoParametro) {
    this.idParametro = IdParametro; 
    this.sdescripcionParametro = descripcionParametro;
    this.sestatusParametro = estatusParametro;
    this.stipoParametro = tipoParametro;
}

function THE_ParametrosEVDT_Vals(IContador, Valor, Seleccionado) {
    this.iContador = IContador;
    this.sValor = Valor;
    this.bSeleccionado = Seleccionado;
}
function THE_EquipoTrabajo(cveEquipoTrabajo, THE_OrdenTrabajo, TDI_Puestos, TDI_EMPL, versionOT, 
TDI_Programa,clavePrograma)
{
    this.CveEquipoTrabajo = cveEquipoTrabajo;
    this.CveOrdenTrabajo = THE_OrdenTrabajo;
    this.PuestoLlavePrimaria = TDI_Puestos;
    this.EmpleadoLlavePrimaria = TDI_EMPL;
    this.VersionOT = versionOT;
    this.CvePrograma = TDI_Programa;
    this.ClavePrograma = clavePrograma;

}

function THE_Logistica(cveLogistica, cveOrdenTrabajo, fechaEvento, lugar, objetivo, fechafin, llamado) {
    this.CveLogistica = cveLogistica;
    this.CveOrdenTrabajo = cveOrdenTrabajo;
    this.FechaEvento = fechaEvento;
    this.Lugar = lugar;
    this.Objetivo = objetivo;
    this.FechaFin = fechafin;
    this.Llamado = llamado;
}
function TDI_Most(mostLlave, mostDescripcion) {

    this.MostLlave = mostLlave;
    this.MostDescripcion = mostDescripcion;
}
function TDI_Fabrica(fabricaLlavePrimaria, fabricaDescripcion, fabricaAbreviacion, lstTDI_Programa) {
    this.FabricaLlavePrimaria = fabricaLlavePrimaria;
    this.FabricaDescripcion = fabricaDescripcion;
    this.FabricaAbreviacion = fabricaAbreviacion;
    this.Programa = lstTDI_Programa;
}
function CompraOT(THE_OrdenTrabajo, TDI_SeccionFormato, TDI_ProgramaEmpleado, fechaCompra, numRedactor,
    nombreRedactor, seEnviaINEWS) {
    this.CveOrdenTrabajo = THE_OrdenTrabajo;
    this.CveSeccionFormato = TDI_SeccionFormato;
    this.CveProgramaEmpleado = TDI_ProgramaEmpleado;
    this.FechaCompra = fechaCompra;
    this.NumRedactor = numRedactor;
    this.NombreRedactor = nombreRedactor;
    this.SeEnviaINEWS = seEnviaINEWS;
}
function TDI_SeccionFormato(TDI_Seccion, TDI_Formato) {
    this.CveSeccion = TDI_Seccion;
    this.CveFormato = TDI_Formato;
}
function TDI_ProgramaEmpleado(TDI_EMPL, TDI_Programa) {
    this.CveEmpleado = TDI_EMPL;
    this.CvePrograma = TDI_Programa;
}
function AlmacenaDatosOrdenTrabajo(CveEmpleadoSeccion, logistica, OrdenTrabajo, AgendaSemanal, EquipoTrabajoIpad,  EsNueva,  tran) {
  this.cveEmpleadoSeccion = CveEmpleadoSeccion;
  this.Logistica = logistica;
  this.oOrdenTrabajo = OrdenTrabajo;
  this.oAgendaSemanal = AgendaSemanal;
  this.lstEquipoTrabajoIpad = EquipoTrabajoIpad;
  this.esNueva = EsNueva;
  this.Tran = tran;
}
function AlmacenaDatosOrdenTrabajoCompra(CveEmpleadoSeccion,  cveUsuario, CompraOTIpad,  logistica, OrdenTrabajo, AgendaSemanal, EquipoTrabajoIpad, EsNueva,  tran) {
    this.cveEmpleadoSeccion = CveEmpleadoSeccion;
    this.CveUsuario = cveUsuario;
    this.lstCompraOTIpad = CompraOTIpad;
    this.Logistica = logistica;
    this.oOrdenTrabajo = OrdenTrabajo;
    this.oAgendaSemanal = AgendaSemanal;
    this.lstEquipoTrabajoIpad = EquipoTrabajoIpad;
    this.esNueva = EsNueva,
    this.Tran = tran;
}
function TDI_Origen(cveOrigen, nombreOrigen) {
    this.CveOrigen = cveOrigen;
    this.NombreOrigen = nombreOrigen;
}
function GuardarLogError(vLogError) {
    this.LogError = vLogError;
}
var tipoErroresOT = { "noError": 0, "ordenTrabajo": 1, "agenda": 2, "cliente": 3, "clave": 4, "equipoTrabajo": 5, "logistica": 6 };

function THE_LogErrores(cveLogErrores, fechaCreacion, TDI_EMPL, error, pantalla, dominio,
machineName, dirIp) {
    this.CveLogErrores = cveLogErrores;
    this.FechaCreacion = fechaCreacion;
    this.CveEmpleado = TDI_EMPL;
    this.Error = error;
    this.Pantalla = pantalla;
    this.Dominio = dominio;
    this.MachineName = machineName;
    this.DirIp = dirIp;
}
function BorraLogistica(OLogistica) {
    this.oLogistica = OLogistica;
}
function ActualizaLogistica(vLogistica) {
    this.oLogistica = vLogistica;
}
function Datos_PantallaOT(THE_AgendaSemanal, THE_EquipoTrabajo, THE_OrdenTrabajo, THE_Logistica, estaEliminada)
{
    this.OTAgenda = THE_AgendaSemanal;
    this.OTEquipo = THE_EquipoTrabajo;
    this.OTOrdenTrab = THE_OrdenTrabajo;
    this.OTLogistica = THE_Logistica;
    this.EstaEliminada = estaEliminada;
}

function TransmisionPrograma(idPrograma, programa, idFormato, formato, fechaProgramada,
lstTDI_SeccionFormato, TDI_SeccionFormato, ot, lstTDI_EMPL, TDI_EMPL) {
    this.IdPrograma = idPrograma;
    this.Programa = programa;
    this.IdFormato = idFormato;
    this.Formato = formato;
    this.FechaProgramada = fechaProgramada;
    this.CboFormatos = lstTDI_SeccionFormato;
    this.FormatoSelected = TDI_SeccionFormato;
    this.OT = ot;
    this.CboRedactor = lstTDI_EMPL;
    this.RedactorSelected = TDI_EMPL;
}
function ActualizaReplicaFormatoCompra(THE_FormatoCompra) {
    this.oFormatoCompra = THE_FormatoCompra;
}
function GuardarEquipoTrabajoRedactor(THE_EquipoTrabajoIpad) {
    this.oEquipoTrabajo = THE_EquipoTrabajoIpad;
}
function EnviaINEWS(lstCompraOTIpad, THE_LogTransacciones) {
    this.ListaCompraOT = lstCompraOTIpad;
    this.Tran = THE_LogTransacciones;
}
function THE_FormatoCompra(THE_OrdenTrabajo, TDI_Programa, version, TDI_Formato, fechaCompra, duracion,
fechacreacion, usuarioCreacion, ordenAgenda, local) {
    this.CveOT = THE_OrdenTrabajo;
    this.CvePrograma = TDI_Programa;
    this.Version = version;
    this.CveFormato = TDI_Formato;
    this.FechaCompra = fechaCompra;
    this.Duracion = duracion;
    this.FechaCreacion = fechacreacion;
    this.UsuarioCreacion = usuarioCreacion;
    this.OrdenAgenda = ordenAgenda;
    this.Local = local;

}

function VideoRecuperacion(idAutorizacion, autorizacionAdquisi, estatusAutorizacion, cveVideoRecuperacion, nombreVideoRecuperacion, tipoRecuperacion, fechaVideoRecuperacion,
                           tiempoTotal, porcentajeRecuperacion, cveEmpleado, guidSystem, mensajeSistema, programaSolicita, prioridad, esParaPlayOUT, flagSystem, tipoMaterial,
                           countErrores, estatusBorrado) {
    this.IDAutorizacion = idAutorizacion;
    this.AutorizacionAdquisi = autorizacionAdquisi;
    this.EstatusAutorizacion = estatusAutorizacion;
    this.CveVideoRecuperacion = cveVideoRecuperacion;
    this.NombreVideoRecuperacion = nombreVideoRecuperacion;
    this.oTipoRecuperacionx = tipoRecuperacion;
    this.FechaVideoRecuperacion = fechaVideoRecuperacion;
    this.TiempoTotal = tiempoTotal;
    this.PorcentajeRecuperacion = porcentajeRecuperacion;
    this.CveEmpleado = cveEmpleado;
    this.GuidSystem = guidSystem;
    this.MensajeSistema = mensajeSistema;
    this.ProgramaSolicita = programaSolicita;
    this.Prioridad = prioridad;
    this.EsParaPlayOUT = esParaPlayOUT;
    this.FlagSystem = flagSystem;
    this.TipoMaterial = tipoMaterial;
    this.CountErrores = countErrores;
    this.EstatusBorrado = estatusBorrado;
}

function VideoRecuperacionArchivo(cveVideoRecuperacionArchivo, idNombreArchivo, tiempoInicial, tiempoFinal, ovideoRecuperacion, rutaVideo, tipoMaterial) {
    this.CveVideoRecuperacionArchivo = cveVideoRecuperacionArchivo;
    this.IdNombreArchivo = idNombreArchivo;
    this.TiempoInicial = tiempoInicial;
    this.TiempoFinal = tiempoFinal;
    this.oVideoRecuperacion = ovideoRecuperacion;
    this.RutaVideo = rutaVideo;
    this.TipoMaterial = tipoMaterial;
}

function TipoRecuperacion(cveTipoRecuperacion, nombreTiporecuperacion, estatus) {
    this.CveTipoRecuperacion = cveTipoRecuperacion;
    this.NombreTiporecuperacion = nombreTiporecuperacion;
    this.Estatus = estatus;
}

function VideoDetalle(_idNombreArchivo, _idNombreArchivoDetalle, _keyword, _personajes) {
    this.IdNombreArchivo = _idNombreArchivo;
    this.IdNombreArchivoDetalle = _idNombreArchivoDetalle;
    this.Keyword = _keyword;
    this.Personajes = _personajes;
}

function TDI_Transaccion(cveTransaccion, descripcion, status) {
    this.CveTransaccion = cveTransaccion;
    this.Descripcion = descripcion;
    this.Status = status;
}

function PlayListOT(ot, oTCvec, idVideo, foto, nombreVideo, seccion, titulo,
fotosConcatenadas, nombrePrograma, notaTransmitida, fechaVid, palClaves) {
    this.OT = ot;
    this.OTCvec = oTCvec;
    this.IdVideo = idVideo;
    this.Foto = foto;
    this.NombreVideo = nombreVideo;
    this.Seccion = seccion;
    this.Titulo = titulo;
    this.FotosConcatenadas = fotosConcatenadas;
    this.NombrePrograma = nombrePrograma;
    this.NotaTransmitida = notaTransmitida;
    this.FechaVid = fechaVid;
    this.PalClaves = palClaves;
}

function THE_Observaciones(obseCons, obseDesc, obseFecr, obseHora, obseLlPr, obsePers, obseTipo, obseTitu, otraLlPr, usuaLlPr) {
    this.ObseCons = obseCons;
    this.ObseDesc = obseDesc;
    this.ObseFecr = obseFecr;
    this.ObseHora = obseHora;
    this.ObseLlPr = obseLlPr;
    this.ObsePers = obsePers;
    this.ObseTipo = obseTipo;
    this.ObseTitu = obseTitu;
    this.Otra_LlPr = otraLlPr;
    this.UsuaLlPr = usuaLlPr;
}

function THE_PropuestaObservacionesIpad(pobsDesc, pobsFecr, pobsLlPr, pobsUscr, propLlPr) {
    this.PobsDesc = pobsDesc;
    this.PobsFecr = pobsFecr;
    this.PobsLlPr = pobsLlPr;
    this.PobsUscr = pobsUscr;
    this.Prop_LlPr = propLlPr;
}

function GuardarLogistica(vLogistica) {
    this.oLogistica = vLogistica;
}
function ActualizaOT(voOrdenTrabajo) {
    this.oOrdenTrabajo = voOrdenTrabajo;
}
function ValidaElementosCarritoParaAdd(vListaOT, vListaProp) {
    this.ListaOT = vListaOT;
    this.ListaProp = vListaProp;
}

function ConsultaFormatoCompraOT(cveOT, cveProg, fecha) {
    this.CveOT = cveOT;
    this.CveProg = cveProg;
    this.Fecha = fecha;
}

function TDI_ClientePrograma(cveCliente, cvePrograma) {
    this.CveCliente = cveCliente;
    this.CvePrograma = cvePrograma;
}

function CompraOTS(CompraOTIpad, vNombreUsuario, THE_LogTransacciones) {
    this.listCompra =CompraOTIpad;
    this.nombreUsuario = vNombreUsuario;
    this.Tran = THE_LogTransacciones;
}
function CompraPropuesta(CompraPropuestaIpad, vNombreUsuario, THE_LogTransacciones) {
    this.listCompra = CompraPropuestaIpad;
    this.nombreUsuario = vNombreUsuario;
    this.Tran = THE_LogTransacciones;
}
function GuardarOT(THE_OrdenTrabajo, THE_LogTransacciones) {
    this.oOrdenTrabajo = THE_OrdenTrabajo;
    this.oLogTran = THE_LogTransacciones;
}
function GuardarAgendaSemanal(THE_AgendaSemanal) {
    this.oAgendaSemana = THE_AgendaSemanal;

}
function GuardarEquipoTrabajo(THE_EquipoTrabajoIpad) {
    this.oEquipoTrabajo = THE_EquipoTrabajoIpad;
}
function CambiaFechaOT(vNumOT, vFecha, THE_LogTransacciones) {
    this.NumOT = vNumOT;
    this.Fecha = vFecha;
    this.Tran = THE_LogTransacciones;
}
function CambiaFechaProp(vNumProp, vFecha) {
    this.NumProp = vNumProp;
    this.Fecha = vFecha;
}
function AlmacenaDatosOrdenTrabajoRegreso(CveEmpleadoSeccion, OrdenTrabajo, AgendaSemanal, EquipoTrabajoIpad, EsNueva, tran) {
    this.cveEmpleadoSeccion = CveEmpleadoSeccion;
    this.oOrdenTrabajo = OrdenTrabajo;
    this.oAgendaSemanal = AgendaSemanal;
    this.lstEquipoTrabajoIpad = EquipoTrabajoIpad;
    this.esNueva = EsNueva;
    this.Tran = tran;
}
function ObtenerOdenTrabajoMultiple(cveSecc, fechaBusq, cveEmpl) { 
    this.CveSecc = cveSecc;
    this.FechaBusq = fechaBusq;
    this.CveEmpl = cveEmpl;
}

function TDI_BUSQUEDAS(idBusqueda, nombre, fecha, usuario, tabNombre, detalleBusqueda) {
    this.IdBusqueda = idBusqueda;
    this.Nombre = nombre;
    this.Fecha = fecha;
    this.Usuario = usuario;
    this.TabNombre = tabNombre;
    this.DetalleBusqueda = detalleBusqueda;
}

function THE_Monitoreo(fabricaLLavPr, fechaEvento, fuenteAgencia, gene, horaEvento, importancia, monitoreoLlavPr, observacion, programa, relevancia, tema, tipoMonitoreoLlavPr, titulo) {
    this.FabricaLLavPr = fabricaLLavPr;
    this.FechaEvento = fechaEvento;
    this.FuenteAgencia = fuenteAgencia;
    this.Gene = gene;
    this.HoraEvento = horaEvento;
    this.Importancia = importancia;
    this.MonitoreoLlavPr = monitoreoLlavPr;
    this.Observacion = observacion;
    this.Programa = programa;
    this.Relevancia = relevancia;
    this.Tema = tema;
    this.TipoMonitoreoLlavPr = tipoMonitoreoLlavPr;
    this.Titulo = titulo;
}

function TDI_TipoMonitoreo(tipoMonitoreoLlavPr, descripcion) {
    this.TipoMonitoreoLlavPr = tipoMonitoreoLlavPr;
    this.Descripcion = descripcion;
}
function TDI_TipoIngestion(cveTipoIngestion, nombreTipoIngestion) {
    this.CveTipoIngestion = cveTipoIngestion;
    this.NombreTipoIngestion = nombreTipoIngestion;
}

function THE_Observaciones_EVDTIpad(idObservacion, THE_EventoDeportivo, observacion, fechaOB) {
    this.IdObservacion = idObservacion;
    this.EventoDeportivo = THE_EventoDeportivo;
    this.sObservacion = observacion;
    this.dtFechaOB = fechaOB;

}

function THE_Graficos(idGraficos, THE_EventoDeportivo, observacion, fechaGR) {
    this.IdGraficos = idGraficos;
    this.EventoDeportivo = THE_EventoDeportivo;
    this.sObservacion = observacion;
    this.dtFechaGR = fechaGR;
}

function THE_Reai(THE_OrdenTrabajo, TDI_Programa, reai_fhtr, reai_hrtr, reai_durr, fmto_llav_pr, reai_comen, stat_llav_pr, otra_Titu, sub, otra_cvec, usuario, evaluacion, esig_orig) {
    this.Otra_llav_pr = THE_OrdenTrabajo;
    this.Esin_llav_pr = TDI_Programa;
    this.Reai_fhtr = reai_fhtr;
    this.Reai_hrtr = reai_hrtr;
    this.Reai_durr = reai_durr;
    this.Fmto_llav_pr = fmto_llav_pr;
    this.Reai_comen = reai_comen;
    this.Stat_llav_pr = stat_llav_pr;
    this.Otra_Titu = otra_Titu;
    this.Sub = sub;
    this.Otra_cvec = otra_cvec;
    this.Usuario = usuario;
    this.Evaluacion = evaluacion;
    this.Esig_orig = esig_orig;
}

function TDI_Estatus(cveEstatus, nombreEstatus) {
    this.CveEstatus = cveEstatus;
    this.NombreEstatus = nombreEstatus;
}

function THE_Eval(otra_llav_pr, esin_llav_pr, reai_fhtr, poev_llav_pr, ptos_llav_pr) {
    this.Otra_llav_pr = otra_llav_pr;
    this.Esin_llav_pr = esin_llav_pr;
    this.Reai_fhtr = reai_fhtr;
    this.Poev_llav_pr = poev_llav_pr;
    this.Ptos_llav_pr = ptos_llav_pr;

}

function TDI_Poev(poev_llav_pr, poev_pond, poev_desc) {
    this.Poev_llav_pr = poev_llav_pr;
    this.Poev_pond = poev_pond;
    this.Poev_desc = poev_desc;
}

function THE_MontosEmpleados(_CveMontosEmpleados, _CveEmpleado, _CveSeccion, _CvePuestos,  _Fecha, _Coberturas, _Notas, _Excelentes, _Buenas, _Malas, _SinEvaluar, _Compensacion,_NuevaCompensacion,_MontAnio, _MontMes) {
    
    this.CveMontosEmpleados = _CveMontosEmpleados;
    this.CveEmpleado=_CveEmpleado; //TDI_EMPL existe
    this.CveSeccion=_CveSeccion; //TDI_Seccion existe
    this.CvePuestos=_CvePuestos; //TDI_Puestos
    this.Fecha=_Fecha;
    this.Coberturas=_Coberturas;
    this.Notas=_Notas;
    this.Excelentes=_Excelentes;
    this.Buenas=_Buenas;
    this.Malas=_Malas;
    this.SinEvaluar=_SinEvaluar;
    this.Compensacion =_Compensacion;
    this.NuevaCompensacion=_NuevaCompensacion;
    this.MontAnio=_MontAnio;
    this.MontMes=_MontMes;
    
}

function RequestConsultaIngestiones(CveSeccion, CveTipoIngestion, FechaInicial, FechaFinal, ClaveOT, LoclId) { 
    this.cveSeccion = CveSeccion;
    this.cveTipoIngestion = CveTipoIngestion;
    this.fechaInicial = FechaInicial;
    this.fechaFinal = FechaFinal;
    this.claveOT = ClaveOT;
    this.loclId = LoclId;
}

function THE_SolicitudesIngestion(cveSolicitudesIngestionOT, THE_OrdenTrabajo, TDI_TipoIngestion, cveEmpleado, cveTiposFormatos, cveAgencia, TDI_StatusSolicitudIngestion, numeroCinta, horaInicio,
                                  fechaEnvio, duracion, nombreAgencia, origenSenal, descripcion, singArchivado) {
    this.CveSolicitudesIngestionOT = cveSolicitudesIngestionOT;
    this.CveOrdenTrabajo = THE_OrdenTrabajo;
    this.CveTipoIngestion = TDI_TipoIngestion;
    this.CveEmpleado = cveEmpleado;
    this.CveTiposFormatos = cveTiposFormatos;
    this.CveAgencia = cveAgencia;
    this.CveSSIN = TDI_StatusSolicitudIngestion;
    this.NumeroCinta = numeroCinta;
    this.HoraInicio = horaInicio;
    this.FechaEnvio = fechaEnvio;
    this.Duracion = duracion;
    this.NombreAgencia = nombreAgencia;
    this.OrigenSenal = origenSenal;
    this.Descripcion = descripcion;
    this.SingArchivado = singArchivado;
}

function TDI_StatusSolicitudIngestion(cveStatusSolicitudIngestion, descripcion, tipoIngestion, color) {
    this.CveStatusSolicitudIngestion = cveStatusSolicitudIngestion;
    this.Descripcion = descripcion;
    this.TipoIngestion = tipoIngestion;
    this.Color = color;
}

function THE_EQAI(_Ptos_llav_pr, _Empl_llav_pr, _Otra_llav_pr, _Esin_llav_pr, _Reai_fhtr, _Secc_llav_pr, _Fmto_llav_pr,  _Indexrealizadores, _Reai_plus) {
    this.Ptos_llav_pr = _Ptos_llav_pr; //TDI_Puestos
    this.Empl_llav_pr = _Empl_llav_pr; //TDI_EMPL
    this.Otra_llav_pr = _Otra_llav_pr; //THE_OrdenTrabajo
    this.Esin_llav_pr = _Esin_llav_pr; //TDI_Programa
    this.Reai_fhtr = _Reai_fhtr; //DateTime
    this.Secc_llav_pr = _Secc_llav_pr; //TDI_Seccion
    this.Fmto_llav_pr = _Fmto_llav_pr; //TDI_Formato
   // this.Lista_Realizadores=_Lista_Realizadores;
    this.Indexrealizadores = _Indexrealizadores;
    this.Reai_plus=_Reai_plus;
}

function THE_EQAIIpad() {

}

function THE_SolicitudEditor(cveSolicitudEditor, cveOrdenTrabajo, cvePrograma, cveEmpleado, cveCentroEdicion, cveEstatusEditor, fechaInicio, fechaFin, duracion, usuario, fechaCreacion, theiNews,
                             comentario, duracionReal, formato, fechaAire, lstRealizadores, lstEstatusEditor, indexrealizadores, indexEstatus, enableEstatus, lstEquipotrab, durMuestra, durRealMuestra) {
    this.CveSolicitudEditor = cveSolicitudEditor;
    this.CveOrdenTrabajo = cveOrdenTrabajo;
    this.CvePrograma = cvePrograma;
    this.CveEmpleado = cveEmpleado;
    this.CveCentroEdicion = cveCentroEdicion;
    this.CveEstatusEditor = cveEstatusEditor;
    this.FechaInicio = fechaInicio;
    this.FechaFin = fechaFin;
    this.Duracion = duracion;
    this.Usuario = usuario;
    this.FechaCreacion = fechaCreacion;
    this.iNews = theiNews;
    this.Comentario = comentario;
    this.DuracionReal = duracionReal;
    this.Formato = formato;
    this.FechaAire = fechaAire;
    this.LstRealizadores = lstRealizadores;
    this.LstEstatusEditor = lstEstatusEditor;
    this.Indexrealizadores = indexrealizadores;
    this.IndexEstatus = indexEstatus;
    this.EnableEstatus = enableEstatus;
    this.LstEquipotrab = lstEquipotrab;
    this.DurMuestra = durMuestra;
    this.DurRealMuestra = durRealMuestra;
}

function TDI_CentroEdicion(cveCentroEdicion, descripcion, iNew) {
    this.CveCentroEdicion = cveCentroEdicion;
    this.Descripcion = descripcion;
    this.INew = iNew;
}

function TDI_EstatusEditor(cveEstatusEd, descripcion, color) {
    this.CveEstatusEd = cveEstatusEd;
    this.Descripcion = descripcion;
    this.Color = color;
}

function THE_SalaRealizador(TDI_CentroEdicion, TDI_EMPL, cveFechaInicio, cvePrograma, fechaCreacion, fechaFin, usuario) {
    this.CveCentroEdicion = TDI_CentroEdicion;
    this.CveEmpleado = TDI_EMPL;
    this.CveFechaInicio = cveFechaInicio;
    this.CvePrograma = cvePrograma;
    this.FechaCreacion = fechaCreacion;
    this.FechaFin = fechaFin;
    this.Usuario = usuario;
}