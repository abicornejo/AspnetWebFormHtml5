using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.Transferencias
{
    public partial class Transferencias : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public void btnActualizar_Click(Object sender, EventArgs e) 
        {
            wsFiatube.THE_SolMatLocal[] result = null;
            wsFiatube.WebService_FIATubeSoapClient client;

            try
            {
                client = new wsFiatube.WebService_FIATubeSoapClient();

                /*Se obtiene la informacion a pintar*/
                result = client.TransferInterlocales();
                this.updateScxreenData(result);
            }
            catch (Exception ex) {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('" + ex.Message + "');", true);
                this.logError(ex);
            }
        }

        private void updateScxreenData(wsFiatube.THE_SolMatLocal[] data) {
            StringBuilder contenido = new StringBuilder();
            divContenido.InnerHtml = string.Empty;
            if(data != null)
                foreach (wsFiatube.THE_SolMatLocal item in data) {
                    contenido.Append("<div >"); //Contenedor del registro

                    contenido.Append("<div class='divCabecerasItemTransferenciasContent'><label class='varMarginTop3'>").Append(item.Nombre).Append("</label></div>");//Nombre
                    contenido.Append("<div class='divCabecerasItemTransferenciasContent'><label class='varMarginTop3'>").Append(item.NombreEstatus).Append("</label></div>");
                    contenido.Append("<div class='divCabecerasItemTransferenciasContent'><div class='theProgressBar' data-val='").Append(item.PorcentajeEnvio).Append("'></div>" + item.PorcentajeEnvio + "%</div>");
                    contenido.Append("<div class='divCabecerasItemTransferenciasContent'><label class='varMarginTop3'>").Append(item.NombreDestino).Append("</label></div>");
                    contenido.Append("<div class='divCabecerasItemTransferenciasContent'><label class='varMarginTop3'>").Append(item.NombreOrigen).Append("</label></div>");
                    contenido.Append("<div class='divCabecerasItemTransferenciasContent'><label class='varMarginTop3'>").Append(item.FechaSolicitud.ToString()).Append("</label></div>");
                
                    contenido.Append("</div>");
                }

            divContenido.InnerHtml = contenido.ToString();
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}