using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.AvancesMonitoreo
{
    public partial class EditarMonitoreo : BasePage
    {
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) { 
                wsFiatube.THE_Monitoreo monitor = null;
                monitor = (wsFiatube.THE_Monitoreo)(Session["DataMonitor"]);
                Session.Remove("DataMonitor");
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " monitor = " + this.SerializeObjectIntoJson(monitor), true);
            }
        }

        /// <summary>
        /// Updates the monitor.
        /// </summary>
        /// <param name="oMonitor">The o monitor.</param>
        /// <returns></returns>
        [WebMethod]
        public static bool updateMonitor(String oMonitor) {
            bool resp = false;
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();

            resp = client.ActualizaMonitoreo(JsonConvert.DeserializeObject<wsFiatube.THE_Monitoreo>(oMonitor));
            return resp;
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