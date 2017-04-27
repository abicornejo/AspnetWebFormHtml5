using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
using System.Web.Services;
using System.Text;

namespace FIATubeHtml5.Pages.AvancesMonitoreo
{
    public partial class AvancesMoniSoloLectura : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack && Session["dataAdvRepMon"] != null) {
                this.loadData();
            }
        }

        /// <summary>
        /// Loads the data.
        /// </summary>
        private void loadData() 
        {
            wsFiatube.AvanceMonitoreo obj = (wsFiatube.AvanceMonitoreo)Session["dataAdvRepMon"];
            lblMonitoreo.InnerHtml = obj.LlaveFr;
            lblTitulo.InnerHtml = obj.Titulo;
            lblFecha.InnerHtml = obj.Fecha;
            txtAvance.InnerHtml = obj.Observacion;
            hiddVal.Value = new Azteca.Utility.Security.Rijndael().Transmute(this.SerializeObjectIntoJson(obj), Azteca.Utility.Security.enmTransformType.intEncrypt);
            Session.Remove("dataAdvRepMon");
        }

        /// <summary>
        /// Creates the new OT.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <param name="trans">The trans.</param>
        /// <returns></returns>
        [WebMethod]
        public static string createNewOT(String data, wsFiatube.THE_LogTransacciones trans)
        {
            wsFiatube.AvanceMonitoreo obj;
            StringBuilder result = new StringBuilder();
            wsFiatube.RegresoOrdenTrabajoIpad resp = null;

            obj = JsonConvert.DeserializeObject<wsFiatube.AvanceMonitoreo>(new Azteca.Utility.Security.Rijndael().Transmute(data, Azteca.Utility.Security.enmTransformType.intDecrypt));
            
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();
            resp = client.CreaOTFromMonitoreo(obj, trans);

            if (resp != null && resp.oOrdenTrabajo.ClaveOrdenTrabajo != null && !resp.oOrdenTrabajo.ClaveOrdenTrabajo.Trim().Equals(string.Empty))
                result.Append("La OT ").Append(resp.oOrdenTrabajo.ClaveOrdenTrabajo).Append(" fue creada correctamente.");

            return result.ToString();
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