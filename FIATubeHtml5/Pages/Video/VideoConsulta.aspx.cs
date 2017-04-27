using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.recuperaVideo;
using System.Text;
using System.Web.Services;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.Video
{
    public partial class VideoConsulta : BasePage
    {
        /// <summary>
        /// Maneja el control del evento de carga de la pagina.
        /// </summary>
        /// <param name="sender">La fuente del evento.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> Instancia que contiene la informacion del evento.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            /*Se realiza carga de acoplados*/
            if (!IsPostBack) 
            {
                //this.cargaAcoplados();
                this.cargaVideosSeleccionados();
            }
        }

        /// <summary>
        /// Carga los videos seleccionados en la busqueda avanzada.
        /// </summary>
        private void cargaVideosSeleccionados() 
        {
            try
            {
                int contador = 0;
                string matType = null;
                StringBuilder contenido = new StringBuilder();
                List<FIATubeHtml5.wsFiatube.BusquedaAvanzada> vidSeleccionados = null;

                /*Se obtiene la informacion de los videos seleccionados en caso de existir*/
                if (Session["lstToSeleccion"] != null)
                {
                    vidSeleccionados = (List<FIATubeHtml5.wsFiatube.BusquedaAvanzada>)Session["lstToSeleccion"];                        

                    
                    contenido.Append(@"<div class=""DivTitulosFecha""> <div class='DivVacio'></div><div class='VCTitlesA'>Información Relevante</div><div div class='VCTitlesB'>Palabras Clave</div><div div class='VCTitlesB'>Personajes</div> </div>");
                    contenido.Append(@"<div class=""divFechaAct"">");
                    foreach(FIATubeHtml5.wsFiatube.BusquedaAvanzada seleccion in vidSeleccionados){

                        if (seleccion.IdFileName.Trim() != string.Empty && seleccion.CveAgencia != 473)
                            matType = "MB";
                        else if (seleccion.IdFileName.Trim() != string.Empty && seleccion.CveAgencia == 473)
                            matType = "NT";
                        else
                            matType = "SV";
                        contenido.Append("<div class='divVidContainer' data-file='").Append(seleccion.Video.Replace("\\","/"))
                            .Append("' data-matType='").Append(seleccion.TipoMaterial)
                            .Append("' data-matOrig='").Append(seleccion.OrigenMaterial)
                            .Append("' data-fileId='").Append(seleccion.vdoId)
                            .Append("' data-detFile='").Append(seleccion.DetIdFilename)
                            .Append("' data-FileN='").Append(seleccion.IdFileName)
                            .Append("' data-img='").Append(seleccion.Imagen).Append("'>");//Contenedor general de la informacion de video
                        contenido.Append(@"<div class='divPreviewsDate'>").Append("<div>").Append(++contador).Append("</div>");//Contenedor imagen
                        contenido.Append(@"<div>");
                        if (!seleccion.ConcatenadoFotos.Trim().Equals(String.Empty))
                            for (int i = 0; i < ((seleccion.ConcatenadoFotos.Split('|').Length >= 4) ? 4 : seleccion.ConcatenadoFotos.Split('|').Length); i++)
                                contenido.Append(@"<div class=""tooltips""><img onerror='ErrorImage(this);' onmouseout='imgPreview_mouseOut(this);' onmouseover='imgPreview_mouseOver(this);' class=""imgPreview"" alt="""" src=""").Append(seleccion.ConcatenadoFotos.Split('|')[i]).Append(@""" />").Append(@"</div>");
                        for (int i = 0; i < 4 - ((seleccion.ConcatenadoFotos.Trim().Equals(String.Empty)) ? 0 : seleccion.ConcatenadoFotos.Split('|').Length); i++)
                            contenido.Append(@"<div class=""tooltips""><img onerror='ErrorImage(this);' onmouseout='imgPreview_mouseOut(this);' onmouseover='imgPreview_mouseOver(this);' class=""imgPreview"" alt="""" src=""").Append("../../Images/noimage.png").Append(@""" />").Append(@"</div>");
                            contenido.Append("</div>");
                        contenido.Append("</div>");
                        contenido.Append(@"<div class='divInfoRelevanteVC'>");
                        contenido.Append("<div>OT: ").Append(seleccion.CveOrdenTrabajo)
                                 .Append("<br/>Título: ").Append(seleccion.Titulo)
                                 .Append("<br/>Programa: ").Append(seleccion.NombrePrograma)
                                 .Append("<br/>Agencia: ").Append(seleccion.NombreAgencia)
                                 .Append("<br/>Pais: ").Append(seleccion.NombrePais)
                                 .Append("<br/>Estado: ").Append(seleccion.NombreEstado)
                                 .Append("</div>");//Contenedor Información Relevante
                        
                        contenido.Append("</div>");//Fin Contenedor general de la informacion de video
                        contenido.Append(@"<div class='divPalabrasClaveVC'>").Append(seleccion.PalabrasClave).Append("</div>"); //contenedor palabras claves
                        contenido.Append(@"<div class='divPersonajesVC'>").Append(seleccion.Personajes).Append("</div>");//Contenedor Personales
                        contenido.Append("</div>");
                                 
                    }
                    contenido.Append("</div>");
                    divFechaAct.InnerHtml = contenido.ToString();
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "selectTab(1); $('#lnkDivFecha').attr('data-detail', '" + new Azteca.Utility.Security.Rijndael().Transmute(GetNumsOTs(vidSeleccionados), Azteca.Utility.Security.enmTransformType.intEncrypt) + "');", true);
                }
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        /// <summary>
        /// Carga la informacion de los videos acoplados
        /// </summary>
        private void cargaAcoplados() 
        {
            AcopladoIpad[] acoplados = null;
            WebService_RecuperaVideoSoapClient client;
            StringBuilder contenidoDiv = new StringBuilder();

            try
            {
                client = new WebService_RecuperaVideoSoapClient();
                acoplados = client.GetListaAcopladosImg();
                contenidoDiv.Append(@"<div class=""DivResAcoplado"">");
                foreach (AcopladoIpad acoplado in acoplados) {
                    contenidoDiv.Append(@"<div class='divAcoplados'>");
                    contenidoDiv.Append(@"<div class='divPreviews'>");
                    contenidoDiv.Append(@"<div onclick='buscaAcopladoList(this);' data-acop='").Append(SerializeObjectIntoJson(acoplado)).Append("'>");

                    for (int i = 0; i < ((acoplado.LstImagenes.Count >= 4) ? 4 : acoplado.LstImagenes.Count); i++)
                    {
                        contenidoDiv.Append(@"<div class=""tooltips""><img onerror='ErrorImage(this);' onmouseout='imgPreview_mouseOut(this);' onmouseover='imgPreview_mouseOver(this);' class=""imgPreview"" src=""").Append(acoplado.LstImagenes[i]).Append(@""" alt=""..."" />");
                            contenidoDiv.Append(@"</div>");   
                    }
                    for (int i = 0; i < 4 - acoplado.LstImagenes.Count; i++)
                    {
                        contenidoDiv.Append(@"<div class=""tooltips""><img onerror='ErrorImage(this);' onmouseout='imgPreview_mouseOut(this);' onmouseover='imgPreview_mouseOver(this);' class=""imgPreview"" src=""").Append("../../Images/noimage.png").Append(@""" alt=""..."" />");
                        contenidoDiv.Append(@"</div>");
                    }
                    contenidoDiv.Append("</div>");
                    contenidoDiv.Append("</div>");//Imagenes
                    contenidoDiv.Append(@"<div class='divNombreVC'>").Append(acoplado.Nombre).Append("</div>");//Nombre
                    contenidoDiv.Append(@"<div class='divDescripcionVC'>").Append(acoplado.Descripcion).Append("</div>");//Descripcion
                    contenidoDiv.Append(@"<div class='divPalabrasClaveVC2'>").Append(acoplado.PalabraClave).Append("</div>");//Palabras Clave
                    contenidoDiv.Append("</div>");
                }
                contenidoDiv.Append(@"</div>");
                divTabAcoplados.InnerHtml += contenidoDiv.ToString();
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        /// <summary>
        /// Obtiene las recuperaciones.
        /// </summary>
        /// <param name="numUsuario">The num usuario.</param>
        /// <param name="fechaIni">The fecha ini.</param>
        /// <param name="fechaFin">The fecha fin.</param>
        /// <param name="filtro">The filtro.</param>
        /// <returns></returns>
        [WebMethod]
        public static VideoRecuperacion[] getRecuperaciones(string numUsuario, DateTime fechaIni, DateTime fechaFin, string filtro) 
        {
            VideoRecuperacion[] resultado = null;
            WebService_RecuperaVideoSoapClient client = null;
            client = new WebService_RecuperaVideoSoapClient();
            resultado = client.ObtenerRecuperacionesXNumEmpleado(numUsuario, fechaIni, fechaFin, filtro);
            
            return resultado;
        }

        /// <summary>
        /// Obtiene los archivos de video recuperacion.
        /// </summary>
        /// <param name="cveVideoRec">La clave de VideoRecuperacion.</param>
        /// <returns></returns>
        [WebMethod]
        public static List<Object> getVideoRecuperacionArchivos(int cveVideoRec)
        {
            wsFiatube.ArrayOfString idVideos;
            List<VideoRecuperacionArchivo> resultado = new List<VideoRecuperacionArchivo>();
            List<wsFiatube.VideoRecuperacion> resultado2 = new List<wsFiatube.VideoRecuperacion>();
            List<object> resultadoFinal = new List<object>();
            VideoRecuperacion value = new VideoRecuperacion();
            WebService_RecuperaVideoSoapClient client = new WebService_RecuperaVideoSoapClient();
            wsFiatube.WebService_FIATubeSoapClient clientFiatube = new wsFiatube.WebService_FIATubeSoapClient();

            value.CveVideoRecuperacion = cveVideoRec;
            resultado = client.ConsultaVideoRecuperacionArchivos(value).ToList();
            resultadoFinal.Add(resultado);

            if (resultado.Count > 0) {
                idVideos = new wsFiatube.ArrayOfString();
                foreach (VideoRecuperacionArchivo item in resultado)
                    idVideos.Add(item.IdNombreArchivo);
                resultado2 = clientFiatube.ObtenerValidacionRecuperaciones(idVideos).ToList();
            }
            resultadoFinal.Add(resultado2);

            return resultadoFinal;
        }

        /// <summary>
        /// Saves the marks.
        /// </summary>
        /// <param name="oVideoRecuperacion">The o video recuperacion.</param>
        /// <param name="lstVideoRecuperacionArchivo">The LST video recuperacion archivo.</param>
        /// <param name="transaccion">The transaccion.</param>
        [WebMethod]
        public static VideoRecuperacion saveMarks(VideoRecuperacion oVideoRecuperacion, List<VideoRecuperacionArchivo> lstVideoRecuperacionArchivo, THE_LogTransacciones transaccion)
        {
            Guid myGuid = Guid.NewGuid();
            recuperaVideo.WebService_RecuperaVideoSoapClient client = new WebService_RecuperaVideoSoapClient();
            oVideoRecuperacion.GuidSystem = myGuid.ToString();
            oVideoRecuperacion.FechaVideoRecuperacion = DateTime.Now;
            oVideoRecuperacion.MensajeSistema = "";
            oVideoRecuperacion.ProgramaSolicita = 0;
            oVideoRecuperacion.Prioridad = 0;
            oVideoRecuperacion.PorcentajeRecuperacion = 100;
            oVideoRecuperacion.oTipoRecuperacion = new TipoRecuperacion();

            return client.InsertarMarcasVideoRecuperacionyArchivos(oVideoRecuperacion, lstVideoRecuperacionArchivo.ToArray(), false, transaccion);
        }

        /// <summary>
        /// Gets the recovery of searches.
        /// </summary>
        /// <param name="userName">Name of the user.</param>
        /// <param name="initDate">The init date.</param>
        /// <param name="endDate">The end date.</param>
        /// <param name="filter">The filter.</param>
        /// <returns></returns>
        [WebMethod]
        public static List<TDI_BUSQUEDAS> getRecuperacionesBusqueda(string userName, DateTime initDate, DateTime endDate, string filter)
        {
            TDI_BUSQUEDAS[] resultado = null;
            recuperaVideo.WebService_RecuperaVideoSoapClient client = new WebService_RecuperaVideoSoapClient();

            resultado = client.getBusquedasByUsuarioFilters(userName, initDate, endDate, filter);

            if (resultado == null)
                return new List<TDI_BUSQUEDAS>();

            return resultado.ToList<TDI_BUSQUEDAS>();
        }

        [WebMethod]
        public static string saveRequestDiva(string nameOfJob, ArrayOfString files, ArrayOfString timecodes, bool value, int prioridad, string usnu, string usnam, VideoRecuperacion objPetVidRec, List<VideoRecuperacionArchivo> lstPetVidRecAr, bool isNot, THE_LogTransacciones trans, bool isUsrGnt, bool isUsrGntAd, bool isComplete, int idLocalDest, string mapPath)
        {
            String result = null;
            VideoRecuperacion otroRes = null;
            try{
                objPetVidRec.GuidSystem = Guid.NewGuid().ToString();
                objPetVidRec.FechaVideoRecuperacion = DateTime.Now;
                objPetVidRec.CveLocal = new TDI_Local { LocalLlave = idLocalDest };
                recuperaVideo.WebService_RecuperaVideoSoapClient client = new WebService_RecuperaVideoSoapClient();

                otroRes = client.InsertarVideoRecuperacionyArchivos(objPetVidRec, lstPetVidRecAr.ToArray(), isNot, trans, isUsrGnt, isUsrGntAd);


                if (objPetVidRec.CveLocal.LocalLlave != 36) 
                {


                    wsFiatube.WebService_FIATubeSoapClient clientFiatube = new wsFiatube.WebService_FIATubeSoapClient();

                    FIATubeHtml5.wsFiatube.THE_SolMatLocal material = new FIATubeHtml5.wsFiatube.THE_SolMatLocal();
                    FIATubeHtml5.wsFiatube.TDI_EMPL oempl = new FIATubeHtml5.wsFiatube.TDI_EMPL();
                    oempl.EmpleadoUsr = objPetVidRec.CveEmpleado.EmpleadoUsr;
                    oempl.EmpleadoLlavePrimaria = objPetVidRec.CveEmpleado.EmpleadoLlavePrimaria;

                    FIATubeHtml5.wsFiatube.TDI_StatusMatLocal status = new FIATubeHtml5.wsFiatube.TDI_StatusMatLocal();
                    status.CveStatusMatLocal = 17;
                    status.Nombre = "restaurando";
                    status.NombreAbrev = "rtd";
                    status.Obs = "17";
                    FIATubeHtml5.wsFiatube.TDI_Local localdestino = new FIATubeHtml5.wsFiatube.TDI_Local();
                    FIATubeHtml5.wsFiatube.TDI_LocalEmpleado empllocal = new wsFiatube.TDI_LocalEmpleado { Local = new FIATubeHtml5.wsFiatube.TDI_Local { LocalLlave = objPetVidRec.CveLocal.LocalLlave } };
                    localdestino = empllocal.Local; 
                    FIATubeHtml5.wsFiatube.TDI_PriorMatLocal prioridadRestauracion = new FIATubeHtml5.wsFiatube.TDI_PriorMatLocal();
                    prioridadRestauracion.CvePriorMatLocal = 2;
                    prioridadRestauracion.Descripcion = "normal";
                    prioridadRestauracion.Abreviatura = "nm";

                    material.CheckDestino = "0";
                    material.CheckOrigen = "0";
                    material.CveDestino = localdestino;
                    material.CveEmpleado = oempl;
                    material.CveEstatus = status;
                    material.PorcentajeEnvio = 0;
                    material.Nombre = otroRes.NombreVideoRecuperacion;
                    material.CveOrigen = new FIATubeHtml5.wsFiatube.TDI_Local { LocalLlave = 36 };
                    material.CvePrioridad = prioridadRestauracion;
                    material.CveVideoRecuperacion = new wsFiatube.VideoRecuperacion { CveVideoRecuperacion = otroRes.CveVideoRecuperacion };
                    material.Ruta = @"\\10.71.244.14\AztecaTube-Locales\Restore\";


                    material.TipoMaterialenLocal = new FIATubeHtml5.wsFiatube.TDI_TipoMatLocal() { TatlLlave = 1 };
                    material.FechaSolicitud = DateTime.Now.ToString("dd/MM/yyyy");
                    material.PorcentajeEnvio = 0;

                    clientFiatube.GuardarSolMatLocal(material);
                }
                
                if (otroRes != null && otroRes.CveVideoRecuperacion > 0)
                {
                    if (isComplete)
                        result = "Se guardo correctamente la solicitud de recuperación. No hay Recuperaciones Previas a su Solicitud";
                    else 
                        result = "Se guardo correctamente la solicitud de recuperación."; //No hay Recuperaciones Previas a su Solicitud";
                }
                else
                    result = "No se pudo guardar correctamente la solicitud de recuperación";
            }
            catch(Exception ex){
                result = "No se pudo guardar correctamente la solicitud de recuperación";
            }

            return result;
        }

        /// <summary>
        /// Gets the path.
        /// </summary>
        /// <returns></returns>
        protected override string getPath()
        {
            return this.GetType().FullName;
        }

        /// <summary>
        /// Handles the Click event of the btnCargaInfoAcoplado control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnCargaInfoAcoplado_Click(Object sender, EventArgs e) 
        {
            string listadeVdoIdFilename = string.Empty;
            wsFiatube.FastResultset arrInfAcoplados = null;
            recuperaVideo.AcopladoIpad infoAcoplado = null;
            recuperaVideo.ImagenXAcopladoIpad[] resultado = null;
            wsFiatube.WebService_FIATubeSoapClient clientFiatube = null;
            recuperaVideo.WebService_RecuperaVideoSoapClient client = null;

            try
            {
                client = new WebService_RecuperaVideoSoapClient();
                clientFiatube = new wsFiatube.WebService_FIATubeSoapClient();
                infoAcoplado = (recuperaVideo.AcopladoIpad)Newtonsoft.Json.JsonConvert.DeserializeObject(hiddAcopS.Value, typeof(AcopladoIpad));

                /*Se obtienen los registros relacionados con el acoplado*/
                resultado = client.getListaImagenesXAcoplado(infoAcoplado);

                /*Se genera el nuevo Tab con la informacion correspondiente*/
                if (resultado != null && resultado.Length > 0)
                {
                    foreach (recuperaVideo.ImagenXAcopladoIpad itemConcat in resultado)
                        listadeVdoIdFilename += itemConcat.VdoIdFilename + "|";
                    listadeVdoIdFilename = listadeVdoIdFilename.Substring(0, listadeVdoIdFilename.Length - 1);

                    /*Se obtiene el resultado de la busqueda para los acoplados y se manda a crear el tab*/
                    arrInfAcoplados = clientFiatube.ObtenerBusquedaAvanzadaConSinOTFast("", infoAcoplado.Nombre, "", "0", "0", "0", "0", "0", DateTime.Now.ToString("yyyy-MM-dd"), DateTime.Now.ToString("yyyy-MM-dd"), "false", "true", "true", "true", "", "474", "", "", "0", "0", ValidaBusquedaVideosBaneados().ToString(), "100000000", "0", string.Empty, "string", Session["UserName"].ToString(), "false", /*Session["FinalCut"].ToString()*/"", "true", "true", "true", "false", string.Empty);
                    creaNuevoTabInfoAcoplado(arrInfAcoplados, infoAcoplado.Nombre);
                }
                else
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('El Acoplado no tiene videos relacionados.');", true);
            }
            catch (Exception ex) {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('" + ex.Message + "');", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Creas the nuevo tab info acoplado.
        /// </summary>
        private void creaNuevoTabInfoAcoplado(wsFiatube.FastResultset data, string tabName) 
        {
            int contador = 0;
            StringBuilder contenido;
            String matType = string.Empty;

            if (data != null && data.ListaBusquedaAvanzada != null && data.ListaBusquedaAvanzada.Count() > 0)
            {
                contenido = new StringBuilder();
                contenido.Append(@"<div class='DivTitulosFecha'> <div class='DivVacio'></div><div class='VCTitlesA'>Información Relevante</div><div div class='VCTitlesB'>Palabras Clave</div><div div class='VCTitlesB'>Personajes</div> </div>");
                contenido.Append(@"<div class='divFechaAct'>");
                
                foreach (wsFiatube.BusquedaAvanzada seleccion in data.ListaBusquedaAvanzada) 
                {
                    if (seleccion.IdFileName.Trim() != string.Empty && seleccion.CveAgencia != 473)
                        matType = "MB";
                    else if (seleccion.IdFileName.Trim() != string.Empty && seleccion.CveAgencia == 473)
                        matType = "NT";
                    else
                        matType = "SV";
                    contenido.Append("<div class='divVidContainer' data-file='").Append(seleccion.Video.Replace("\\","/"))
                        .Append("' data-matType='").Append(seleccion.TipoMaterial)
                        .Append("' data-matOrig='").Append(seleccion.OrigenMaterial)
                        .Append("' data-fileId='").Append(seleccion.vdoId)
                        .Append("' data-img='").Append(seleccion.Imagen).Append("'>");//Contenedor general de la informacion de video
                    contenido.Append(@"<div class='divPreviewsDate'>").Append("<div>").Append(++contador).Append("</div>");//Contenedor imagen
                    contenido.Append(@"<div>");
                    if (!seleccion.ConcatenadoFotos.Trim().Equals(String.Empty))
                        for (int i = 0; i < ((seleccion.ConcatenadoFotos.Split('|').Length >= 4) ? 4 : seleccion.ConcatenadoFotos.Split('|').Length); i++)
                            contenido.Append(@"<div class='tooltips'><img onerror='ErrorImage(this);' onmouseout='imgPreview_mouseOut(this);' onmouseover='imgPreview_mouseOver(this);' class='imgPreview' alt='' src='").Append(seleccion.ConcatenadoFotos.Split('|')[i]).Append(@"' />").Append(@"</div>");
                    for (int i = 0; i < 4 - ((seleccion.ConcatenadoFotos.Trim().Equals(String.Empty)) ? 0 : seleccion.ConcatenadoFotos.Split('|').Length); i++)
                        contenido.Append(@"<div class='tooltips'><img onerror='ErrorImage(this);' onmouseout='imgPreview_mouseOut(this);' onmouseover='imgPreview_mouseOver(this);' class='imgPreview' alt='' src='").Append("../../Images/noimage.png").Append(@"' />").Append(@"</div>");
                    contenido.Append("</div>");
                    contenido.Append("</div>");
                    contenido.Append(@"<div class='divInfoRelevanteVC'>");
                    contenido.Append("<div>OT: ").Append(seleccion.CveOrdenTrabajo)
                                .Append("<br/>Título: ").Append(seleccion.Titulo)
                                .Append("<br/>Programa: ").Append(seleccion.NombrePrograma)
                                .Append("<br/>Agencia: ").Append(seleccion.NombreAgencia)
                                .Append("<br/>Pais: ").Append(seleccion.NombrePais)
                                .Append("<br/>Estado: ").Append(seleccion.NombreEstado)
                                .Append("</div>");//Contenedor Información Relevante

                    contenido.Append("</div>");//Fin Contenedor general de la informacion de video
                    contenido.Append(@"<div class='divPalabrasClaveVC'>").Append(seleccion.PalabrasClave).Append("</div>"); //contenedor palabras claves
                    contenido.Append(@"<div class='divPersonajesVC'>").Append(seleccion.Personajes).Append("</div>");//Contenedor Personales
                    contenido.Append("</div>");

                }
                contenido.Append("</div>");
                hiddTabCon.Value = contenido.ToString();
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "addNewTab('" + tabName + "', '" + new Azteca.Utility.Security.Rijndael().Transmute(data.ListaBusquedaAvanzada[0].QueryBusqueda, Azteca.Utility.Security.enmTransformType.intEncrypt) + "');", true);
            }
            else 
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('No se encontraron resultados.');", true);
            
        }

        /// <summary>
        /// Handles the Click event of the btnCargaTabBusqueda control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnCargaTabBusqueda_Click(Object sender, EventArgs e) 
        {
            bool isQuery = false;
            TDI_BUSQUEDAS info = null;
            wsFiatube.FastResultset resultado = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            
            try
            {
                info = (TDI_BUSQUEDAS)JsonConvert.DeserializeObject(hiddTabI.Value, typeof(TDI_BUSQUEDAS));
                client = new wsFiatube.WebService_FIATubeSoapClient();
                
                //Siempre se carga la posicion cero, porque cuando termine de cargarla es la posicion que se elimina y con esto se recorre la lista.
                if (isDate(info.TabNombre.Trim(), Convert.ToInt32(Session["numUsuario"])))
                    isQuery = false;
                else
                    isQuery = true;

                resultado = client.ConsultaRecuperacionBusquedas(isQuery, info.DetalleBusqueda, int.MaxValue);

                /*Se carga el nuevo tab*/
                this.creaNuevoTabInfoAcoplado(resultado, info.TabNombre);
            }
            catch (Exception ex) 
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('" + ex.Message + "');", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Funcion que Valida si la Expresion enviada es una Fecha
        /// </summary>
        /// <param name="expression">Expresion a Evaluar</param>
        /// <param name="usuario">Usuario Loggeado</param>
        /// <returns></returns>
        private bool isDate(string expression, int usuario)
        {
            if (expression == null) { return false; }

            try
            {
                DateTime dateTime = DateTime.Parse(expression);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                //Aqui no debe de llevar Manejador de Erroes porque sólo es un convertidor que verifica
                // que si la cadena enviada es una Fecha.
                return false;
            }
            return true;
        }

        private string GetNumsOTs(List<wsFiatube.BusquedaAvanzada> listaToSave) {
            StringBuilder strGuardaBusq = new StringBuilder("@");
            foreach (wsFiatube.BusquedaAvanzada item in listaToSave)
                strGuardaBusq.Append("''").Append(item.IdFileName).Append("''|");

            return strGuardaBusq.ToString().Substring(0, strGuardaBusq.Length - 1);
        }

        /// <summary>
        /// Saves the search.
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public static bool saveSearch(TDI_BUSQUEDAS search)
        {
            bool resultado = false;
            recuperaVideo.WebService_RecuperaVideoSoapClient client = new WebService_RecuperaVideoSoapClient();

            search.DetalleBusqueda = new Azteca.Utility.Security.Rijndael().Transmute(search.DetalleBusqueda, Azteca.Utility.Security.enmTransformType.intDecrypt);

            resultado = client.GuardaBusquedas(search);
            return resultado;
        }
    }
}
