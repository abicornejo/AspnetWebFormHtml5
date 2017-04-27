using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.Agendas.EventosDeportivos
{
    public partial class EquipoTrabajo_EVDT : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
                loadEmployeeData();
        }

        private void loadEmployeeData()
        {
            String array = string.Empty;
            wsFiatube.ArrayOfString[] resultado = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            
            try
            {
                client = new wsFiatube.WebService_FIATubeSoapClient();
                resultado = client.ObtenerEmpleados();

                if (resultado != null && resultado.Length > 0) {
                    array = getJSArrayDeclaration("arrEmpl", resultado);
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", array, true);
                }
            }
            catch (Exception ex) {
                this.showErrorMessage("Ocurri&oacute; un problema al obtener la informaci&oacute;n de los empleados: " + ex.Message);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Gets the JS array declaration
        /// </summary>
        /// <param name="arrayName">Name of the array.</param>
        /// <param name="arrayData">The array data.</param>
        /// 
        private string getJSArrayDeclaration(string arrayName, wsFiatube.ArrayOfString[] arrayData)
        {
            StringBuilder resultado = new StringBuilder().Append(arrayName).Append(" = [");
            try
            {
                if (arrayData != null && arrayData.Length > 0)
                {
                    foreach (wsFiatube.ArrayOfString empl in arrayData)
                        resultado.Append("{label:\"").Append(empl[1].Trim().ToUpper()).Append("\", value:").Append(empl[0]).Append("},");
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

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}