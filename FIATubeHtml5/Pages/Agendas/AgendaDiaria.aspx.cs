using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class AgendaDiaria : BasePage
    {
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divGridAgenda').css('height', screen.height - 271);", true);
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e)
        {
            int localId;
            DateTime fecha;
            string texto, seccion, local;
            wsFiatube.AgendaOT[] resultado = null;
            wsFiatube.TDI_LocalEmpleado[] locAsignadas = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            
            try
            {
                try { localId = int.Parse(hiddLocv.Value); }
                catch (Exception) { ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar una local v&aacute;lida.');", true); return; }
                try { seccion = localId == 36 ? int.Parse(hiddSecc.Value).ToString() : string.Empty; } catch (Exception) { ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar una secci&oacute;n v&aacute;lida.');", true); return; }
                try { fecha = Convert.ToDateTime( hiddFecA.Value); } catch (Exception) { ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar una fecha v&aacute;lida.');", true); return; }
                texto = hiddText.Value;
                local =  hiddLocv.Value;

                if (seccion.Equals("0"))
                    seccion = string.Empty;

                if (localId <= 0)
                    local = string.Empty;

                client = new wsFiatube.WebService_FIATubeSoapClient();

                /*Se obtienen las locales a las que tiene acceso el usuario*/
                //locAsignadas = client.ObtenerLocalesEmpleado(int.Parse(Session["numUsuario"].ToString()));

                resultado = client.getAgendaOTs_LOCALES(seccion, fecha.ToString("dd/MM/yyyy"), fecha.ToString("dd/MM/yyyy"), texto, string.Empty, string.Empty, texto, String.Empty, local);

                IEnumerable<wsFiatube.AgendaOT> valores = resultado.Where(n => n.OtraRepl == string.Empty);
                if (valores == null)
                    resultado = null;
                else
                    resultado = valores.ToArray();

                updateScreenData(resultado/*, locAsignadas.ToList()*/);
                ScriptManager.RegisterStartupScript(this, this.GetType(), "code", " applyEvents(); ", true);
            }
            catch (Exception ex) {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Ocurrio un problema al obtener la informacion de agenda: " + ex.Message + "');", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Updates the screen data.
        /// </summary>
        /// <param name="data">The data.</param>
        private void updateScreenData(wsFiatube.AgendaOT[] data/*, List<wsFiatube.TDI_LocalEmpleado> locales*/) 
        {
            int cont = 0;
            divGridAgenda.InnerHtml = string.Empty;
            StringBuilder contenido = new StringBuilder();

            //bool isAllLocals = Session["userPuestos"].ToString().Split(',').Contains("153");
            
            if (data != null) {
                foreach(wsFiatube.AgendaOT item in data){
                    contenido.Append("<div id='divParent").Append(cont).Append("' class=dgPlaylistAgendaDiaria' data-cveOT='").Append(item.OtraCvec).Append("' data-OT='").Append(item.AgseNume).Append("' data-type='").Append(item.AgseOrig).Append("' data-secc='").Append(item.SeccLlPr).Append("'>");
                    contenido.Append("<table class='tablegPlaylistAgendaDiaria'>");
                    contenido.Append("<tr><td class='tablegPlaylistAgendaDiariatTITLE elemVerOT'  data-index='").Append(cont).Append("' data-OT='").Append(item.AgseNume).Append("' >");
                    contenido.Append(item.AgseTitu.Replace("<", "&lt;").Replace(">", "&gt;"));
                    contenido.Append("</td></tr>");
                    contenido.Append("<tr><td class='tablegPlaylistAgendaDiariaTD'>");
                    contenido.Append("<div>");
                    contenido.Append("<div class='itemsAgdiPlaylistImg'><img onerror='errorImg(this);' alt='Sin Imagen' src='").Append(((item.VideoImg == "noImage") ? "../../images/noimage.png" : item.VideoImg.ToUpper().IndexOf("MATERIALDISPONIBLE") > -1 ? "../../Images/materialDisponible.png" : item.VideoImg)).Append("' id = 'btnImgeVideo' class ='ImgSizeAgendaDiaria' data-videoref='").Append(item.VideoReferencia).Append("' data-OT='").Append(item.AgseNume).Append("' data-Image='").Append(item.VideoImg).Append("'/></div>");
                    contenido.Append("<div class='itemsAgdiPlaylistOtProp'><label><b>").Append(item.AgseOrig == "O" ? "OT:" : item.AgseOrig == "P" ? "Prop:" : String.Empty).Append("</b></label></div>");
                    contenido.Append("<div class='itemsAgdiPlaylist'> <label class='elemVerOT'  data-index='").Append(cont).Append("' data-OT='").Append(item.AgseNume).Append("'>").Append(item.OtraCvec).Append("</label></div>");
                    contenido.Append("<div class='itemsAgdiPlaylist'><input type='button' class='btnOTADiaria' title = 'Detalle' data-OT='").Append(item.AgseNume).Append("' data-index='").Append(cont).Append("'/></div>");
                    contenido.Append("<div class='itemsAgdiPlaylist'><input type='text' readonly='readonly' value = '").Append(item.AgseFini).Append("' class='toDatePicker txtFechas2' data-CveSeccion='").Append(item.SeccLlPr).Append("' data-AgseNume='").Append(item.AgseNume).Append("' data-AgseOrig='").Append(item.AgseOrig).Append("' data-Fecha ='").Append(item.AgseFini).Append("'/></div>");
                    contenido.Append("<div class='itemsAgdiPlaylist'><select class='selectChange' data-index='").Append(cont).Append("' data-tino='").Append(item.TinoLlPr).Append("'>" /*+ myOptions +*/ + "</select></div>");
                    //contenido.Append("<div class='itemsAgdiPlaylist'><select").Append((!isAllLocals && locales.Where(n=> n.Local.LocalLlave == int.Parse(item.CveLocal)).Count() == 0) ? " disabled='disabled' " : string.Empty).Append(" class='selectChange' data-index='").Append(cont).Append("' data-tino='").Append(item.TinoLlPr).Append("'>" /*+ myOptions +*/ + "</select></div>");
                    contenido.Append("<div class='itemsAgdiPlaylist'><label id = 'txbAvance' ").Append(item.TieneAvance != 0 ? "style='color:Green;'" : "style='color:Red;'").Append(" class='linkAvance' data-type= '").Append(item.AgseOrig).Append("' data-numDat=").Append(item.AgseNume).Append(" data-numAvance=").Append(item.TieneAvance).Append(" data-titu='").Append(item.AgseTitu).Append("' data-oCve='").Append(item.OtraCvec).Append("'>Avance</label></div>");
                    contenido.Append("<div class='itemsAgdiPlaylist'><label id = 'txbLocal'>").Append(item.LocalDesc).Append("</label></div>");
                    contenido.Append("<div class='itemsAgdiPlaylistSecc'><label id = 'txbSeccion'><b>").Append(item.SeccDesc).Append("</b></label></div>");
                    contenido.Append("<div class='itemsAgdiPlaylistRight'><input type='button' class = 'btnEliminarAloneCarrito' data-index='").Append(cont).Append("' title = 'Eliminar'/></div>");
                    contenido.Append("<div class='itemsAgdiPlaylistRight'><input  type='checkbox' class='onchange' value = '").Append(item.AgseOrig).Append(",").Append(item.NumotCom).Append(",").Append(item.OtraCvec).Append(",").Append(item.AgseTitu).Append(",").Append(item.AgseFini).Append(",").Append(item.SeccLlPr).Append(",").Append(item.TinoLlPr).Append("'/></div>");
                    contenido.Append("</div>");
                    contenido.Append("</td></tr>");
                    contenido.Append("</table> ");
                    contenido.Append("</div>");

                    cont++;
                }
            }

            divGridAgenda.InnerHtml += contenido.ToString();
        }

        /// <summary>
        /// Gets the path.
        /// </summary>
        /// <returns></returns>
        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}