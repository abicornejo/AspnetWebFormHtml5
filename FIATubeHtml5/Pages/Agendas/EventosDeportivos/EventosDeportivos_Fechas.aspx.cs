using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Web.Services;

namespace FIATubeHtml5.Pages.Agendas.EventosDeportivos
{
    public partial class EventosDeportivos_Fechas : BasePage
    {
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// Gets the solicitudes.
        /// </summary>
        /// <param name="eventId">The event id.</param>
        /// <returns></returns>
        [WebMethod]
        public static string getSolicitudes(int eventId) {
            StringBuilder content = new StringBuilder();
            wsFiatube.THE_SolicitudFormatoIpad[] result = null;
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();
            result = client.ObtenerSolicitud_EVDT(eventId);

            if(result != null)
                foreach (wsFiatube.THE_SolicitudFormatoIpad sol in result) {
                    content.Append("<div>");
                    content.Append(@"<div onMouseOver=""this.style.cursor='pointer'"" onclick='openAutSol(").Append(sol.CveSolicitud.CveSolicitud).Append(")'>").Append(sol.CveSolicitud.CveSolicitud).Append("</div>");
                    content.Append("<div><label>").Append(sol.CveSolicitud.Titulo).Append("</label></div>");
                    content.Append("<div><label>").Append(sol.CvePrograma.NombrePrograma).Append("<label/></div>");
                    content.Append("<div><label>").Append(sol.CveSolicitud.FechaSolicitud.ToString("dd/MM/yyyy")).Append("</label></div>");
                    content.Append("</div>");
                }

            return content.ToString();
        }

        /// <summary>
        /// Gets the eq trabajo.
        /// </summary>
        /// <param name="eventId">The event id.</param>
        /// <returns></returns>
        [WebMethod]
        public static string getEqTrabajo(int eventId) {
            StringBuilder content = new StringBuilder();
            wsFiatube.THE_EquipoTrabajo_EVDTIPad[] result = null;
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();

            result = client.ObtenerEquipoTrabajo_EVDT(eventId);
            if (result != null)
                foreach (wsFiatube.THE_EquipoTrabajo_EVDTIPad equipo in result)
                {
                    content.Append("<div>");
                    content.Append("<div><label>").Append(equipo.IdEmpleado).Append("</label></div>");
                    content.Append("<div><label>").Append(equipo.snombreEmpleado).Append("<label/></div>");
                    content.Append("</div>");
                }

            return content.ToString();
        }

        [WebMethod]
        public static string getSeniales(int eventId, int cveProg, string date) {
            wsFiatube.THE_OrdenTrabajoIpad[] result = null;
            StringBuilder content = new StringBuilder();
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();

            result = client.ObtenerOTs_EVDT(eventId, cveProg, date);

            if (result != null)
                foreach (wsFiatube.THE_OrdenTrabajoIpad ot in result)
                {
                    //content.Append("<div>");
                    //content.Append("<div><label>").Append(ot.).Append("</label></div>");
                    //content.Append("<div><label>").Append(ot.IdEmpleado).Append("</label></div>");
                    //content.Append("<div><label>").Append(ot.snombreEmpleado).Append("<label/></div>");
                    //content.Append("</div>");
                }

            return content.ToString();
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