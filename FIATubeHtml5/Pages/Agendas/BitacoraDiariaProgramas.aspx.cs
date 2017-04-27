using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class BitacoraDiariaProgramas : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divContentResult').css('height', screen.height - 223);", true);
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e)
        {
            int cont = 0;
            string[] splitResult;
            StringBuilder cadAvances;
            THE_FormatoCompraIpad[] result = null;
            WebService_FIATubeSoapClient client;
            StringBuilder consolidado = new StringBuilder();

            try
            {
                client = new WebService_FIATubeSoapClient();
                result = client.ConsultaBitacoraDiaria_LOCALES(Convert.ToInt32(hiddSecc.Value), Convert.ToInt32(hiddProd.Value), Convert.ToDateTime(hiddFech.Value), hiddLocl.Value);
                
                /*Se limpia el div de resultados*/
                divContentResult.InnerHtml = string.Empty;

                if (result != null)
                {
                    foreach (THE_FormatoCompraIpad item in result)
                    {
                        consolidado.Append("<div class='divRegContent2'>");//Contenedor del registro

                        consolidado.Append("<div class='tablegPlaylistAgendaDiariatTITLE'>");//Barra de titulo del registro
                        consolidado.Append("<label data-val='").Append(item.CveOT.CveOrdenTrabajo).Append("' data-oCve='").Append(item.CveOT.ClaveOrdenTrabajo).Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='btnshowOT_click(this);'>( OT: ").Append(item.Concatenado).Append(" ").Append(item.CveOT.ClaveOrdenTrabajo).Append(" ) </label>"); //OT asociada
                        consolidado.Append("<label>").Append(item.Reporteros).Append("</label>");
                        consolidado.Append("</div>"); //Fin Barra titulo registro

                        consolidado.Append("<div>");// Cuerpo de registro
                        consolidado.Append("<div class='classBitacoraDiaria1'><img onerror='errorImg(this);' class='ImgSizeAgendaDiariaPrograma' alt='Imagen Video' src='").Append(item.VideoImg == null ? "../../Images/noimage.png" : item.VideoImg).Append("'").Append(item.VideoReferencia == null || item.VideoReferencia.Trim().Equals(String.Empty) ? string.Empty : @" onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;'")
                                                     .Append(" data-numOT='").Append(item.CveOT.CveOrdenTrabajo).Append("' ")
                                                     .Append(" data-file='").Append(item.VideoReferencia == null ? string.Empty : item.VideoReferencia).Append("' ")
                                                     .Append(" data-img='").Append(item.VideoImg == null ? string.Empty : item.VideoImg).Append("' /></div>"); //Fin imagen video

                        consolidado.Append("<div class='classBitacoraDiaria2'>"); // Informacion de OT
                        consolidado.Append("<label>").Append(item.CveFormato.Descripcion).Append(", DURACION: ").Append(item.Duracion).Append(" SEGUNDOS.</label><BR/>");
                        consolidado.Append("<label>SECCIÓN: ").Append(item.CveOT.CveSeccion.NombreSeccion).Append("</label><BR/>");
                        consolidado.Append("<label>TIPO DE NOTA: ").Append(item.CveOT.CveTipoNota.DescripcionTipoNota).Append("</label><BR/>");
                        consolidado.Append("<label>").Append(item.CveOT.HistoryLine).Append("</label>");
                        consolidado.Append("</div>");// Fin Informacion de OT
                        consolidado.Append("<div class='classBitacoraDiaria3'>"); // 
                        consolidado.Append("<label class='title'>AVANCES</label>");
                        cadAvances = new StringBuilder();
                        if (item.Avances != null)
                        {
                            cont = 0;
                            splitResult = item.Avances.Trim().Split('|');
                            foreach (string avanc in splitResult)
                                if (!avanc.Trim().Equals(String.Empty))
                                    cadAvances.Append("-- ").Append(++cont).Append(" -- \n").Append(avanc).Append(" \n");
                        }
                        consolidado.Append("<textArea class='txtAreaBitacoraDiariaPrograma' readonly='readonly'>").Append(cadAvances.ToString()).Append("</textArea>");
                        consolidado.Append("</div>");
                        consolidado.Append("</div>");// Fin Cuerpo de registro
                        consolidado.Append("</div>");//Fin Contenedor del registro

                        
                    }

                    /*Se vacia la informacion recaudada dentro del div por orden alfabetico*/
                    divContentResult.InnerHtml += consolidado.ToString();
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}
