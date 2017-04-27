using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using Newtonsoft.Json;
using FIATubeHtml5.recuperaVideo;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class ObtenerMaterialesOT : BasePage
    {
        #region "Variables"
            private bool existeLoading;
            WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
            WebService_RecuperaVideoSoapClient prioridad = new WebService_RecuperaVideoSoapClient();
            private bool isUserGrant;
            private bool isUserGrantAdquisi;
            private wsFiatube.THE_MaterialLocal oML;
            private Play_Out_Shares playOutShare;
            private AgendaOT oAgendaOT;
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                oAgendaOT = (AgendaOT)Session["AgendaOT"];
                Session["AgendaOT"] = null;
                LlenaCombos();
                ObtenerMaterialesOTM();
            }
        }

        private void LlenaCombos()
        {
            try
            {
                #region "Llena Combos"
                TDI_LocalEmpleado[] LocalesEmpreado = client.ObtenerLocalesEmpleado(Convert.ToInt32(Session["numUsuario"]));
                TDI_ProgramaEmpleado[] ProgramaEmple = client.ConsultaProgramaEmpleado(0, Convert.ToInt32(Session["numUsuario"])); //

                if (LocalesEmpreado.Length > 0)
                {
                    cmbLocalDestino.Items.Clear();
                    foreach (TDI_LocalEmpleado r in LocalesEmpreado)
                    {
                        ListItem row = new ListItem(r.Local.LocalDescripcion, r.Local.LocalLlave.ToString());
                        cmbLocalDestino.Items.Add(row);
                    }
                }
                else
                {
                    throw new Exception("No se logro obtener las locales asosiadas a tu usuario");
                }

                

                if (ProgramaEmple.Length > 0)
                {
                    cmbPrograma.Items.Clear();
                    foreach (TDI_ProgramaEmpleado r in ProgramaEmple)
                    {
                        string Abre="";
                        if ( r.CvePrograma.Abreviatura2 !=null)Abre=r.CvePrograma.Abreviatura2.ToString(); 

                        string Values = r.CvePrograma.CvePrograma.ToString() + "|" + Abre;
                        ListItem row = new ListItem(r.CvePrograma.NombrePrograma.ToString(), Values);
                        cmbPrograma.Items.Add(row);

                    }
                }
                else
                {
                    throw new Exception("No se logro obtener los programas asociados a tu usuario.");
                }

                #endregion
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        private void ObtenerMaterialesOTM()
        {
            try
            {
            THE_MaterialLocal[] Resultados = client.ObtenerMaterialesOT(0, oAgendaOT.OtraCvec);
            //THE_MaterialLocal[] ResultadosArchivados = (from oArchiv in Resultados where oArchiv.EsArchivado == true select oArchiv).ToArray<THE_MaterialLocal>();
            //THE_MaterialLocal[] ResultadosDisponibles = (from oArchiv in Resultados where oArchiv.EsArchivado == false select oArchiv).ToArray<THE_MaterialLocal>();
            //List<THE_MaterialLocal> MaterialLocal = new List<THE_MaterialLocal>();
            //foreach (THE_MaterialLocal matlloc in ResultadosDisponibles) 
            //{
                
            //    List<THE_MaterialLocal> matTemp = (from objArchiv in ResultadosArchivados where objArchiv.NombreArchivo == "A" + matlloc.NombreArchivo.Replace(".mp4","").Replace(".MP4","") select objArchiv).ToList<THE_MaterialLocal>();
            //    matlloc.EsArchivado = (matTemp.Count > 0);
            //    if (matTemp.Count > 0)
            //    {
            //        matlloc.UrlImagen = matTemp[0].UrlImagen;
            //        matlloc.VdoIdFilename = matTemp[0].VdoIdFilename;
                    
            //    }
            //    MaterialLocal.Add(matlloc);
            //}


            StringBuilder myDiv = new StringBuilder();
            StringBuilder DivResultado = new StringBuilder();
            if (Resultados.Length > 0)
            {
                foreach (wsFiatube.THE_MaterialLocal Video in Resultados)
                {
                    if (Video.ClaveMaterialLocal == null) Video.ClaveMaterialLocal = 0;
                    if (Video.FechaActualizacion == null) Video.FechaActualizacion = DateTime.Now.ToString("dd/MM/yyyy");

                    string imagenMaterial = ((Video.UrlImagen.ToUpper().ToString()) == "NO IMAGE") ? "../../Images/materialDisponible.png" : Video.UrlImagen.ToString();

                    myDiv.Append("<div class='divSolicMatCont'>");
                    myDiv.Append(@"<div class='divSolicMat01' onclick=""imgVideoSolMat_click(this);""  ")
                          .Append(" data-OT='").Append(Video.ClaveOrdenTrabajo.ToString()).Append("'")
                          .Append(" data-Video='").Append(Video.UrlVideo.ToString()).Append("'")
                          .Append(" data-Imagen='").Append(imagenMaterial).Append("'>")
                          .Append(@" <img  class=""divResultadoSolicMat""   alt=""Sin Imagen"" src='")
                          .Append(imagenMaterial).Append("''");
                    myDiv.Append("<text class='titleObtMat'>").Append(Video.ClaveOrdenTrabajo).Append("</text>");
                    myDiv.Append("<text class='titleObtMat2'>").Append(Video.NombreArchivo).Append("</text>");
                    myDiv.Append("</div>");

                    myDiv.Append("<div class='divSolicMat02'>");

                    myDiv.Append("<text class='titleObtMat'>").Append(Video.CveLocal.LocalDescripcion).Append("</text>");
                    if(Video.EsArchivado)
                        myDiv.Append("<text class='titleObtMat'>").Append(NumberToTimeFormat(Video.Duracion)).Append("</text>");
                    else
                        myDiv.Append("<text class='titleObtMat'>").Append(NumberToTimeFormat(Video.Duracion /1000)).Append("</text>");
                    ((Video.EsArchivado == true && Video.ExisteLocal == 1) ? myDiv.Append(@"<input id=""Button1"" type=""button"" class=""SolicitaMatA""  runat=""server""  onclick=""alertModalFunctionOKCancelWithAttrib('Esta material aún se encuentra en la local, si desea transferirlo presione OK. Si desea crear marcas y restaurarlo de la videoteca Digital presione cancelar.', successFunctionSolicita, cancelFunctionSolicita, this)""  data-Agenda='").Append(JsonConvert.SerializeObject(oAgendaOT, Formatting.Indented)).Append("' data-ML='").Append(JsonConvert.SerializeObject(Video, Formatting.Indented)) : myDiv.Append(@"<input id=""Button1"" type=""button"" class=""SolicitaMatA""  runat=""server""  onclick=""EventoclickBoton(this)""  data-Agenda='").Append(JsonConvert.SerializeObject(oAgendaOT, Formatting.Indented)).Append("' data-ML='").Append(JsonConvert.SerializeObject(Video, Formatting.Indented)))
                    .Append("' data-Local='").Append(Video.CveLocal.LocalDescripcion).Append("' data-exist='"+ Video.ExisteLocal+"'" )
                    .Append("   />");
                    

                    myDiv.Append("</div>");
                    myDiv.Append("</div>");
                    DivResultado.Append(myDiv);
                    myDiv.Clear();
                }

                this.PreviaSolicitudMaterial.InnerHtml = DivResultado.ToString();
            }
            else
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "SinResultado();", true);
            }

            }
            catch (Exception ex)
            {
                logError(ex);
            }

        }

        protected void BtnDetonador_Click(object sender, EventArgs e)
        {
            try
            {
                string ruta = Request.ApplicationPath;
                oAgendaOT = JsonConvert.DeserializeObject<AgendaOT>(this.HDAgenda.Value);
                oML = JsonConvert.DeserializeObject<wsFiatube.THE_MaterialLocal>(this.HDML.Value);

                ValidaEnvioSolicitud();
                //Validaciones
                ConsultaPrivilegionRecuperacion();
                ObtienePlayOutLocal();
                ///Guardar
                Guardar();
                  
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        #region "Funciones"

        private void AbreVideoConsulta()
        {
            try
            {
                List<BusquedaAvanzada> oListabusqueda = new List<BusquedaAvanzada>();
                BusquedaAvanzada[] Resultado;
                  Resultado = client.ObtenerBusquedaAvanzadaBiz("", "", 0, 0, 0, 0, 0, 0, Convert.ToDateTime(DateTime.Now), Convert.ToDateTime(DateTime.Now), false, false, true, true, "", 0, oAgendaOT.AgseNume.ToString());
                // 
                foreach (BusquedaAvanzada item in Resultado)
                {
                    oListabusqueda.Add(item);
                }
                Session["lstToSeleccion"] = oListabusqueda;
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " AbreVideoConsulta();", true);
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        private void ConsultaPrivilegionRecuperacion()
        {
            if (client.ConsultaPrivilegioRecuperacion(Session["numUsuario"].ToString()))
            {
                isUserGrant = true;                                                 //Si el Usuario tiene privilegios se muestra un boton adicional en la botonera.
                isUserGrantAdquisi = Session["UserSeccion"].ToString() == "112";     //Si la seccion es igual a 112 se muestra el boton adicional en la botonera. 
            }
            else
            {
               // throw new Exception("Ocurrio un Error al consultar los privilegios del Usuario.");
                isUserGrant = false;
                isUserGrantAdquisi = Session["UserSeccion"].ToString() == "112";
            }
        } 
        
        private void ObtienePlayOutLocal()
        {
            playOutShare = client.ObtienePlayOutLocal();
            if (playOutShare == null)
            {
                throw new Exception("No se logro obtener el destino de la transcodificacion");
            }
        }

        //Guardar
        private void Guardar()
        {
            try
            {
                if (Session["userPuestos"].ToString().Split(',').Where(n => n.Trim().Equals("76") || n.Trim().Equals("9")).Count() > 0)
                {
                    ValidaEnvioSolicitud();
                    int inicio = cmbPrograma.Value.IndexOf("|");
                    string abrev2 = cmbPrograma.Value.Substring(inicio + 1);

                    if (oML.EsArchivado)
                    {
                        PrioridadRecuperacion[] PrioridadRec;
                        PrioridadRec = prioridad.ConsultaPrioridadVideoRecu(0, abrev2.ToString(), DateTime.Now);
                        GeneraSolicitudTranscodificado(oML, AsignaPrioridad(PrioridadRec));
                    }
                    else
                        GeneraSolicitudSinTranscodificado(oML);
                }
                else
                {
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " alertModal('No cuenta con permisos para realizar la operaci&oacute;n.'); ", true);
                    return;
                }
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        private void ValidaEnvioSolicitud()
        {
            if (oAgendaOT.CveLocal == this.cmbLocalDestino.Value) throw new Exception("El origen y el destino no pueden ser el mismo");
        }

        private void GeneraSolicitudSinTranscodificado(THE_MaterialLocal valores)
        {
            THE_SolMatLocal oTHE_SolMatLocal = CreaObjetoMaterialSolicitud(valores);

            if (client.GuardarSolMatLocal(oTHE_SolMatLocal))
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " AbreMonitorTransferencias(); ", true);
            }
            else
            {
                throw new Exception("Ocurrio Un Problema al Guardad la Solicitud.");
             }
        }

        private void GeneraSolicitudTranscodificado(THE_MaterialLocal valores, int Prioridad)
        {
            wsFiatube.THE_SolMatLocal oTHE_SolMatLocal = CreaObjetoMaterialSolicitud(valores);
            wsFiatube.TipoRecuperacion oTipoRecuperacion = new wsFiatube.TipoRecuperacion();
            wsFiatube.VideoRecuperacion oVideoRecuperacion = new wsFiatube.VideoRecuperacion();
            wsFiatube.VideoRecuperacionArchivo oVideoRecuperacionArchivo = new wsFiatube.VideoRecuperacionArchivo();
            wsFiatube.VideoRecuperacionArchivo[] lstVideoRecuperacionArchivo = new wsFiatube.VideoRecuperacionArchivo[1] ;
            wsFiatube.TDI_EMPL oEmpl = new wsFiatube.TDI_EMPL();

            Guid miGuid = Guid.NewGuid();

            ////Valores para la Local de Ajusco
            oTHE_SolMatLocal.CveEstatus.CveStatusMatLocal = 16;
            oTHE_SolMatLocal.CveOrigen.LocalLlave = 36;
            oTHE_SolMatLocal.Ruta = playOutShare.MapPath;
            
            oVideoRecuperacionArchivo.IdNombreArchivo = valores.VdoIdFilename;
            oVideoRecuperacionArchivo.TipoMaterial =Convert.ToInt32 (valores.TipoMatAjusco);
            oVideoRecuperacionArchivo.TiempoInicial = "-1:-1:-1";
            oVideoRecuperacionArchivo.TiempoFinal = "-1:-1:-1";

            int fin = cmbPrograma.Value.IndexOf("|");
            string cvePrograma = cmbPrograma.Value.Substring(0, fin);
            
            lstVideoRecuperacionArchivo[0]= oVideoRecuperacionArchivo;
            oEmpl.EmpleadoUsr = Session["nomUsuario"].ToString();
            oEmpl.EmpleadoLlavePrimaria = int.Parse(Session["numUsuario"].ToString());
            oVideoRecuperacion.CveEmpleado = oEmpl;
            oVideoRecuperacion.FechaVideoRecuperacion = DateTime.Now;
            oVideoRecuperacion.NombreVideoRecuperacion = valores.NombreArchivo;
            oVideoRecuperacion.oTipoRecuperacion = oTipoRecuperacion;
            oVideoRecuperacion.ProgramaSolicita = Convert.ToInt32(cvePrograma);
            oVideoRecuperacion.Prioridad = Prioridad;
            oVideoRecuperacion.GuidSystem = miGuid.ToString();
            oVideoRecuperacion.TiempoTotal = oVideoRecuperacionArchivo.TiempoFinal;
            oVideoRecuperacion.MensajeSistema = "";
            oVideoRecuperacion.EsParaPlayOUT = playOutShare.CvePlayOutShares;
            oVideoRecuperacion.TiempoTotal = "-1:-1:-1";

            if (!client.GuardarSolMatLocalTrancode((THE_SolMatLocal)oTHE_SolMatLocal, (wsFiatube.VideoRecuperacion)oVideoRecuperacion, lstVideoRecuperacionArchivo, GenerateTransacA(), isUserGrant, isUserGrantAdquisi))
            {
                throw new Exception("Ocurrio Un Problema al Guardad la Solicitud.");
            }
            
        }

        private THE_SolMatLocal CreaObjetoMaterialSolicitud(THE_MaterialLocal valores)
        {
            THE_SolMatLocal oTHE_SolMatLocal = new THE_SolMatLocal();
            oTHE_SolMatLocal.CvePrioridad = new TDI_PriorMatLocal { CvePriorMatLocal = 2 };
            oTHE_SolMatLocal.CveEmpleado = new wsFiatube.TDI_EMPL { EmpleadoLlavePrimaria = Convert.ToInt32(Session["NumUsuario"]) };
            oTHE_SolMatLocal.CveEstatus = new TDI_StatusMatLocal { CveStatusMatLocal = 6 };
            oTHE_SolMatLocal.CheckDestino = "0";
            oTHE_SolMatLocal.CheckOrigen = "0";
            oTHE_SolMatLocal.CveMaterialDestinoRecepcionLocal = "0";
            oTHE_SolMatLocal.CveMaterialOrigenEnvioLocal = "0";
            oTHE_SolMatLocal.CveVideoRecuperacion = null;
            int localLlave = Convert.ToInt32(this.cmbLocalDestino.Value.ToString());
            oTHE_SolMatLocal.CveDestino = new wsFiatube.TDI_Local();
            oTHE_SolMatLocal.CveDestino.LocalLlave = localLlave;
            oTHE_SolMatLocal.CveMaterialenLocal = valores.ClaveMaterialLocal.ToString();
            oTHE_SolMatLocal.CveOrigen = valores.CveLocal;
            oTHE_SolMatLocal.Duracion = valores.Duracion;
            oTHE_SolMatLocal.FechaSolicitud = DateTime.Now.ToString("dd/MM/yyyy");
            oTHE_SolMatLocal.FechaSolicitudTerminada = null;
            oTHE_SolMatLocal.Nombre = valores.NombreArchivo;
            oTHE_SolMatLocal.PorcentajeEnvio = 0;
            oTHE_SolMatLocal.Ruta = valores.Direccion;
            oTHE_SolMatLocal.Tamano = valores.Tamano;
            oTHE_SolMatLocal.TipoMaterialenLocal = valores.TipoMaterialLocal;
            return oTHE_SolMatLocal;
        }

        /// <summary>
        /// Metodo que genera un objeto de tipo THE_LogTransacciones
        /// </summary>
        /// <returns>Objeto Transaccion</returns>
        protected wsFiatube.THE_LogTransacciones GenerateTransacA()
        {
            wsFiatube.THE_LogTransacciones trans = new wsFiatube.THE_LogTransacciones();

            try
            {
                trans.DirIP = Session["userIP"].ToString();
                trans.Dominio = Session["userDomain"].ToString();
                trans.MachineName = Session["userMachineName"].ToString();
                trans.Usuario = Session["numUsuario"].ToString();
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
            return trans;
        }

         //<summary>
         //Asigna la prioridad de la restauracion dependiendo del programa y el horario en el que se esta
         //pidiendo la recuperacion
         //</summary>
         //<param name="e">Resultado de la busqueda de Prioridad</param>
         //<returns>Prioridad</returns>
        private static int AsignaPrioridad(PrioridadRecuperacion[] Prio )
        {
            int prioridad = 60;

            if ( Prio.Length > 0)
            {
                if (Prio[0].Prioridad)
                    prioridad = 75;
                else
                    prioridad = 65;
            }
            return prioridad;
        }
 #endregion

        protected override string getPath()
        {
            return this.GetType().FullName;
        }

        protected void BtnVideoConsulta_Click(object sender, EventArgs e)
        {
            try
            {
                string ruta = Request.ApplicationPath;
                oAgendaOT = JsonConvert.DeserializeObject<AgendaOT>(this.HDAgenda2.Value);
                oML = JsonConvert.DeserializeObject<wsFiatube.THE_MaterialLocal>(this.HDML2.Value);
                AbreVideoConsulta();

            }
            catch (Exception ex)
            {
                logError(ex);
            }

        }
    }
}
