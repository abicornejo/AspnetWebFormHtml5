using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;

namespace FIATubeHtml5.Pages.OT
{
    public partial class Cables : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e) 
        {
            int tiempoMuestra = Convert.ToInt32(hiddHrs.Value); //Validar en donde se cambia ese valor
            RptCables[] result = null;
            WebService_FIATubeSoapClient client;
            try 
            {
                /*Se actualiza grid de reporte de cables*/
                client = new WebService_FIATubeSoapClient();
                result = client.ObtenerReporteCablesSecc(DateTime.Now, tiempoMuestra, Convert.ToInt32(hiddSec.Value));
                this.llenaGridCables(result);
            }
            catch(Exception ex){
                this.logError(ex);
            }
        }

        /// <summary>
        /// LLena el grid de cables con la informacion especificada
        /// </summary>
        /// <param name="cables">Los registros de cables.</param>
        private void llenaGridCables(RptCables[] cables) 
        {
            StringBuilder contenido = new StringBuilder();

            try
            {
                divGridCables.InnerHtml = String.Empty;

                foreach (RptCables item in cables) 
                {
                    contenido.Append("<div class='divRenglonCable'>"); //Contenedor general del registro

                    contenido.Append(@"<div class='colTituloCable'><label onclick='showData_click(this);' onMouseOver=""this.style.cursor='pointer'"" data-rot='")
                            .Append(item.TIPO)
                            .Append("' data-value='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OT)
                            .Append(@"' data-oCve='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OTCVEC)
                            .Append("' >").Append(item.TITULO.Trim().Equals(String.Empty) ? "&nbsp;" : item.TITULO).Append("</label></div>"); //Titulo
                    contenido.Append("<div class='colDispCable'>");                                      //Disponible
                    contenido.Append("<div class='colDispAvance'>");//Avance
                        if (Convert.ToInt32(item.AVANCE) > 0)
                            contenido.Append("<img title='Mostrar detalle Avance' src='../../Images/iconos/editar.png' data-type='")
                                .Append(item.TIPO).Append("' data-numDat='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OT)
                                .Append("' data-oCve='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OTCVEC).Append("' data-titu='").Append(item.TITULO)
                                .Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='abrirAvance(this);' ").Append("/>");
                        else
                            contenido.Append("<label>&nbsp;</label>");
                        contenido.Append("</div>");
                        contenido.Append("<div class='colDispAvanceB'>");//MB
                        if (!item.VIDEO_MB.Trim().Equals(String.Empty))
                            contenido.Append(@"<img title='Mostrar detalle MB' src='../../Images/iconos/video.png' onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;' ")
                                .Append(" data-numOT='").Append(item.OT).Append("' ")
                                .Append(" data-file='").Append(item.VIDEO_MB).Append("' ")
                                .Append(" data-img='' ")
                                .Append("/>");
                        else
                            contenido.Append("<label>&nbsp;</label>");
                        contenido.Append("</div>");
                        contenido.Append("<div  class='colDispAvanceB'>");//VO
                        if (!item.VO.Trim().Equals(String.Empty))
                            contenido.Append(@"<img title='Mostrar detalle VO' src='../../Images/iconos/video.png' onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;' ")
                                .Append(" data-numOT='").Append(item.OT).Append("' ")
                                .Append(" data-file='").Append(item.VO).Append("' ")
                                .Append(" data-img='' ")
                                .Append("/>");
                        else
                            contenido.Append("<label>&nbsp;</label>");
                        contenido.Append("</div>"); //VO
                        contenido.Append("<div class='colDispAvanceB'>");//SOT
                        if (!item.TXT.Trim().Equals(String.Empty))
                            contenido.Append(@"<img title='Mostrar detalle SOT' src='../../Images/iconos/video.png' onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;' ")
                                .Append(" data-numOT='").Append(item.OT).Append("' ")
                                .Append(" data-file='").Append(item.TXT).Append("' ")
                                .Append(" data-img='' ")
                                .Append("/>");
                        else
                            contenido.Append("<label>&nbsp;</label>");
                        contenido.Append("</div>");
                        contenido.Append("<div class='colDispAvanceB'>"); //FT
                        if (!item.FT.Trim().Equals(String.Empty))
                            contenido.Append(@"<img title='Mostrar detalle FT' src='../../Images/iconos/video.png' onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;' ")
                                .Append(" data-numOT='").Append(item.OT).Append("' ")
                                .Append(" data-file='").Append(item.FT).Append("' ")
                                .Append(" data-img='' ")
                                .Append("/>");
                        else
                            contenido.Append("<label>&nbsp;</label>");
                        contenido.Append("</div>"); //FT
                    contenido.Append("</div>"); // Fin Disponible
                    contenido.Append("<div class='colAlertaCable'>"); //Alerta
                    if (Convert.ToInt32(item.LASTMINUTE) > 0)
                        contenido.Append(@"<img src='../../Images/nuevo1.png' onclick='showData_click(this);' onMouseOver=""this.style.cursor='pointer'"" data-rot='")
                            .Append(item.TIPO)
                            .Append("' data-value='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OT)
                            .Append(@"' data-oCve='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OTCVEC)
                            .Append("' />");
                    else
                        contenido.Append("<label>&nbsp;</label>");
                    contenido.Append("</div>");
                    contenido.Append("<div class='colDescripCable'>").Append(@"<Label onclick='showData_click(this);' onMouseOver=""this.style.cursor='pointer'"" data-rot='")
                            .Append(item.TIPO)
                            .Append("' data-value='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OT)
                            .Append("' data-oCve='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OTCVEC).Append("'>")
                            .Append(item.DESCRIPCION).Append("</label></div>");//Descripcion
                    contenido.Append(@"<div class='colOTCable'><label onclick='showData_click(this);' onMouseOver=""this.style.cursor='pointer'"" data-rot='")
                            .Append(item.TIPO)
                            .Append("' data-value='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OT)
                            .Append("' data-oCve='").Append(item.TIPO == "C" ? item.ID_TABLA : item.OTCVEC)
                            .Append("' >").Append(item.IDMUESTRA);
                    contenido.Append("</label>");
                    if (item.TIPO == "C")
                        contenido.Append(@"<img data-cbl='").Append(item.ID_TABLA).Append(@"' onMouseOver=""this.style.cursor='pointer'"" alt='Comprar Cable' title='Comprar Cable' src='../../Images/iconos/carrito de compras.png' onclick='abrirCompra(this);' />");
                    contenido.Append("</div>"); //# OT
                    //contenido.Append("<div>").Append("</div>"); //Copiar

                    contenido.Append("</div>"); //Cierre de contenedor general del registro
                }

                divGridCables.InnerHtml = contenido.ToString();
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divGridCables').css('height', screenHgt.toString() + 'px');", true);
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}
