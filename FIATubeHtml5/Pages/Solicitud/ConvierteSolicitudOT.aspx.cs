using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using FIATubeHtml5.wsFiatube;

namespace FIATubeHtml5.Pages.Solicitud
{
    public partial class ConvierteSolicitudOT : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                /*Carga la informacion del equipo de trabajo*/
                cargaInfoEquipoTrabajo();
            }
        }

        private void cargaInfoEquipoTrabajo()
        {
            TDI_EMPL[] aux = null;
            StringBuilder initJS = new StringBuilder();
            wsFiatube.TDI_Programa[] programas = null;
            StringBuilder cadena = new StringBuilder("<option value='0'>== TODOS ==</option>");

            WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();

            try
            {
                if (int.Parse(Request.QueryString["locl"].ToString()) == 36)
                {
                    /*Se obtiene la informacion del autocomplete de reporteros, camarografos y editores*/
                    aux = client.GetReporterosList();
                    initJS.Append(this.getJSArrayDeclaration("arrReporteros", aux));

                    aux = client.GetCamarografosList();
                    initJS.Append(this.getJSArrayDeclaration("arrCamarografos", aux));

                    aux = client.GetEditoresList();
                    initJS.Append(this.getJSArrayDeclaration("arrEditores", aux));
                }
                else
                {
                    wsFiatube.PantallaOT data = client.ObtieneDatosEquiporlocal(int.Parse(Request.QueryString["locl"].ToString()));

                    /*Se obtiene la informacion del autocomplete de reporteros, camarografos y editores*/
                    initJS.Append(this.getJSArrayDeclaration("arrReporteros", data.listaReporteros));
                    initJS.Append(this.getJSArrayDeclaration("arrCamarografos", data.listaCamarografos));
                    initJS.Append(this.getJSArrayDeclaration("arrEditores", data.listaEditores));
                }

                programas = client.ConsultaProgramasFIA();
                if (programas != null)
                    foreach (wsFiatube.TDI_Programa prog in programas)
                        cadena.Append("<option data-ff='").Append(this.SerializeObjectIntoJson(prog.FechaFin).Replace("\"", "")).Append("' data-fi='").Append(this.SerializeObjectIntoJson(prog.FechaInicio).Replace("\"", "")).Append("' value='").Append(prog.CvePrograma).Append("'>").Append(prog.NombrePrograma).Append("</option>");

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", initJS.ToString() + " setProgData(\"" + cadena.ToString() + "\"); ", true);
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        /// <summary>
        /// Gets the JS array declaration.
        /// </summary>
        /// <param name="arrayName">Name of the array.</param>
        /// <param name="arrayData">The array data.</param>
        private string getJSArrayDeclaration(string arrayName, TDI_EMPL[] arrayData)
        {
            StringBuilder resultado = new StringBuilder().Append(arrayName).Append(" = [");
            try{
                if (arrayData != null && arrayData.Length > 0){
                    foreach (TDI_EMPL empl in arrayData)
                        resultado.Append("{label:\"").Append(empl.EmpleadoNombre.Trim().ToUpper()).Append("\", value:").Append(empl.EmpleadoLlavePrimaria).Append(", NumEmpl:").Append(empl.EmpleadoNumero).Append("},");
                    resultado.Remove(resultado.Length - 1, 1);
                }
            }
            catch (Exception ex){
                this.logError(ex);
            }

            resultado.Append("]; ");
            return resultado.ToString();
        }

        protected override string  getPath()
        {
 	        return this.GetType().FullName;
        }
    }
}