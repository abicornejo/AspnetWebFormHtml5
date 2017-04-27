using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.UserControls
{
    public partial class VideoPlayerCodePlex : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                cargaReporterosRecuperacionGuion();
        }

        /// <summary>
        /// Gets the path.
        /// </summary>
        /// <returns></returns>
        protected override string getPath()
        {
            return this.GetType().FullName;
        }

        private void cargaReporterosRecuperacionGuion() 
        {
            StringBuilder contenido = new StringBuilder();
            wsFiatube.TDI_EMPL[] resultado = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;

            try 
            {
                client = new wsFiatube.WebService_FIATubeSoapClient();
                resultado = client.GetReporterosListRecuperacionGuion();

                if (resultado != null && resultado.Count() > 0) {
                    contenido.Append("<option data-val='0' val='0'>== SELECCIONE ==</option>");
                    foreach (wsFiatube.TDI_EMPL item in resultado)
                        contenido.Append("<option data-val='").Append(item.EmpleadoLlavePrimaria).Append("' val='").Append(item.EmpleadoLlavePrimaria).Append("'>").Append(item.EmpleadoNombre).Append("</option>");
                }
                else
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('No se encontraron reporteros para recuperacion de gui&oacute;n');", true);

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " $('#cmbReporterosRecG').empty(); $('#cmbReporterosRecG').append(\"" + contenido + "\"); ", true);
            }
            catch(Exception ex){
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Ocurrio un problema al obtener los reporteros para recuperacion de gui&oacute;n: " + ex.Message + "');", true);
                this.logError(ex);
            }
        }
    }
}