using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.Video
{
    public partial class EstatusRecuperacionVideos : BasePage
    {
        WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
        DateTime fechaInicio;
        DateTime fechaFin ;
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!Page.IsPostBack)
                {
                    fechaInicio = Convert.ToDateTime(DateTime.Now.ToString("dd/MM/yyyy"));
                    fechaFin = Convert.ToDateTime(DateTime.Now.ToString("dd/MM/yyyy"));
                    ConsultadeRecuperacionPorEmpleado();
                }
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        private void ConsultadeRecuperacionPorEmpleado()
        {
            try
            {
                string Estado = this.cmbEstatus.Value;
                //string ruta = Request.ApplicationPath;
                string ruta = "../../images/cargando"; 
                VideoRecuperacion[] Resultado = client.ConsultaVideoRecuperacionPorEmpleadoOtroFormato(Convert.ToInt32(Session["numUsuario"]), fechaInicio, fechaFin);
                StringBuilder myDiv = new StringBuilder();
                StringBuilder DivResultado = new StringBuilder();

                DivResultado.Append("<div class='divTitulosRecVideos'>");
                DivResultado.Append("<div class='divRecuperacionVideos'>Titulo</div>");
                DivResultado.Append("<div class='divRecuperacionVideos'>Porcentaje de Avance</div>");
                DivResultado.Append("<div class='divRecuperacionVideos'>Fecha de Creación</div>");
                DivResultado.Append("<div class='divRecuperacionVideos'>Destino</div>");
                DivResultado.Append("<div class='divRecuperacionVideos'>Errores</div>");
                DivResultado.Append("<div class='divRecuperacionVideos'>Autorización</div>");
                DivResultado.Append("</div>");

                foreach (VideoRecuperacion Video in Resultado)
                {
                    int barra;
                    if (Video.PorcentajeRecuperacion <0 )
                        barra=-1;
                    else if (Video.PorcentajeRecuperacion==0)
                        barra = 0; 
                    else   barra = Convert.ToInt32(Video.PorcentajeRecuperacion / 10);

                    string destino ="";
                       
                        if (Video.EsParaPlayOUT == 2)
                            destino = "Media Grid Deportes";
                        else if (Video.EsParaPlayOUT == 1)
                            destino = "PlayOut";
                        else if (Video.EsParaPlayOUT == 3)
                            destino = "Media Grid Noticias";
                        else if (Video.EsParaPlayOUT == 7)
                            destino = "Aztecatube Locales";
                        else
                            destino = "Inbox";     


                    switch (Estado)
                    {
                        
                        case "0":

                            myDiv.Append("<div class='divRecVidContainer'>")
                                .Append("<div class='divRecVidContent'>").Append(Video.NombreVideoRecuperacion).Append("</div>")
                                .Append(@"<div class='divRecVidContent'>")
                                .Append(@"<img class='divRecVidImg' alt=""Sin Imagen"" src='").Append(ruta).Append(barra.ToString()).Append(".jpg' />")
                                .Append("<text class='varSmallText'>")
                                .Append(Video.PorcentajeRecuperacion.ToString()).Append(" % </text> </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.FechaVideoRecuperacion.ToString()).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(destino).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.CountErrores.ToString()).Append(" Errores </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.AutorizacionAdquisi).Append("</div>");
                            myDiv.Append("</div>");    
                            
                            break;
                        case "1":
                            if (Video.PorcentajeRecuperacion == 100)
                            {
                                myDiv.Append("<div class='divRecVidContainer'>")
                                .Append("<div class='divRecVidContent'>").Append(Video.NombreVideoRecuperacion).Append("</div>")
                                .Append(@"<div class='divRecVidContent'>")
                                .Append(@"<img class='divRecVidImg' alt=""Sin Imagen"" src='").Append(ruta).Append(barra.ToString()).Append(".jpg' />")
                                .Append("<text class='varSmallText'>").Append(Video.PorcentajeRecuperacion.ToString()).Append(" % </text> </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.FechaVideoRecuperacion.ToString()).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(destino).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.CountErrores.ToString()).Append(" Errores </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.AutorizacionAdquisi).Append("</div>");
                                myDiv.Append("</div>");
                            }
                            
                            break;

                        case "2":
                            if (Video.PorcentajeRecuperacion >= 0 & Video.PorcentajeRecuperacion < 100)
                            {
                                myDiv.Append("<div class='divRecVidContainer'>")
                                .Append("<div class='divRecVidContent'>").Append(Video.NombreVideoRecuperacion).Append("</div>")
                                .Append(@"<div class='divRecVidContent'>")
                                .Append(@"<img class='divRecVidImg' alt=""Sin Imagen"" src='").Append(ruta).Append(barra.ToString()).Append(".jpg' />")
                                .Append("<text class='varSmallText'>").Append(Video.PorcentajeRecuperacion.ToString()).Append(" % </text> </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.FechaVideoRecuperacion.ToString()).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(destino).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.CountErrores.ToString()).Append(" Errores </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.AutorizacionAdquisi).Append("</div>");
                                myDiv.Append("</div>");
                            }
                            break;
                        case "3":
                            if (Video.PorcentajeRecuperacion == -1)
                            {
                                myDiv.Append("<div class='divRecVidContainer'>")
                                .Append("<div class='divRecVidContent'>").Append(Video.NombreVideoRecuperacion).Append("</div>")
                                .Append(@"<div class='divRecVidContent'>")
                                .Append(@"<img class='divRecVidImg' alt=""Sin Imagen"" src='").Append(ruta).Append(barra.ToString()).Append(".jpg' />")
                                .Append("<text class='varSmallText'>")
                                .Append(Video.PorcentajeRecuperacion.ToString()).Append(" % </text> </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.FechaVideoRecuperacion.ToString()).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(destino).Append("</div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.CountErrores.ToString()).Append(" Errores </div>")
                                .Append("<div class='divRecVidContent'>").Append(Video.AutorizacionAdquisi).Append("</div>");
                                myDiv.Append("</div>");
                            }
                            break;
                    }


                    DivResultado.Append(myDiv);
                    myDiv.Clear();

                }
                this.Resultado.InnerHtml = DivResultado.ToString();
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "ActualizaDataPicker(); ", true);

                
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }
        
        protected void BntActualizar_Click(object sender, EventArgs e)
        {
            try
            {
                fechaInicio = Convert.ToDateTime(this.txtFechaIni.Value);
                fechaFin = Convert.ToDateTime(this.txtFechaFin.Value);

                TimeSpan dif = fechaFin - fechaInicio;

                if (dif.Days<0)
                    throw new Exception("La Fecha Fin no puede ser mayor que la Fecha de Inicio.");

                ConsultadeRecuperacionPorEmpleado();
                this.HDSeg.Value = "60";
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}
