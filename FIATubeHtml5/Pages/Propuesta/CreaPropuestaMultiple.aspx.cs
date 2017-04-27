using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.Propuesta
{
    public partial class CreaPropuestaMultiple : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) 
                loadDataRep();
        }

        /// <summary>
        /// Loads the data rep.
        /// </summary>
        private void loadDataRep() 
        {
            wsFiatube.TDI_EMPL[] reporteros = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            try
            {
                client = new wsFiatube.WebService_FIATubeSoapClient();
                reporteros = client.GetReporterosList();

                if (reporteros != null)
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", this.getJSArrayDeclaration("arrReporteros", reporteros), true);
            }
            catch (Exception ex) {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "Ocurri&oacute; un problema al obtener la informaci&oacute;n de los reporteros.", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Gets the JS array declaration.
        /// </summary>
        /// <param name="arrayName">Name of the array.</param>
        /// <param name="arrayData">The array data.</param>
        /// <returns></returns>
        private string getJSArrayDeclaration(string arrayName, wsFiatube.TDI_EMPL[] arrayData)
        {
            StringBuilder resultado = new StringBuilder().Append(arrayName).Append(" = [");
            try
            {
                if (arrayData != null && arrayData.Length > 0)
                {
                    foreach (wsFiatube.TDI_EMPL empl in arrayData)
                        resultado.Append("{label:\"").Append(empl.EmpleadoNombre.Trim().ToUpper()).Append("\", value:").Append(empl.EmpleadoLlavePrimaria).Append(", NumEmpl:").Append(empl.EmpleadoNumero).Append("},");
                    resultado.Remove(resultado.Length - 1, 1);
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }

            resultado.Append("]; ");
            return resultado.ToString();
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