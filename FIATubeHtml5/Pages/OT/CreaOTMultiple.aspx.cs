using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using System.Net;

namespace FIATubeHtml5.Pages.OT
{
    public partial class CreaOTMultiple : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            { 
            
            }
        }
        protected override string getPath()
        {
            return this.GetType().FullName;
        }
        public void btnBuscar_Click(Object sender, EventArgs e)
        {
            try{

               
                WebService_FIATubeSoapClient client;
                StringBuilder initJS = new StringBuilder();
                StringBuilder initJSDatosPantalla = new StringBuilder();
                client = new WebService_FIATubeSoapClient();
                BusquedaMultipleOTIpad[] data;

                data = client.ObtenerOdenTrabajoMultiple(Int32.Parse(hiddSecc.Value), DateTime.Parse(dpFechaBusq.Value), Convert.ToInt32(Session["numUsuario"]));
                if (data != null)
                {

                    initJS.Append(getJSArrayDatosPantalla("arrOTS", data));
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", initJS.ToString() + " btnBuscarClient_Click();", true);
                    
                }
             }
            catch (Exception ex)
            {
                this.logError(ex);
            }
        }
        private string getJSArrayDatosPantalla(string arrayName, object Objeto)
        {
            StringBuilder resultado = new StringBuilder();
            try
            {
                resultado.Append(arrayName).Append("=").Append(SerializeObjectIntoJson(Objeto)).Append("; ");

            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
            return resultado.ToString();
        }

        /// <summary>
        /// Handles the Click event of the btnUpdateEquipo control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnUpdateEquipo_Click(Object sender, EventArgs e) 
        {
            StringBuilder initJS = new StringBuilder();
            wsFiatube.PantallaOT resultado = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            try
            {
                /*Se obtiene la informacion del equipo de trabajo*/
                client = new WebService_FIATubeSoapClient();

                /*Si la local es diferente a ajusco se obtien los empleados de la local correspondiente*/
                if (int.Parse(HiddcboLocales.Value) != 36)
                    resultado = client.ObtieneDatosEquiporlocal(int.Parse(HiddcboLocales.Value));
                else
                    resultado = client.ObtieneDatosPantallaOT(Convert.ToInt32(Session["numUsuario"]), true, true);

                /*se generan los arrays con la informacion de reporteros, camarografos y editores*/
                if (resultado != null) { 
                    if(resultado.listaReporteros != null)
                        initJS.Append(getJSArrayDeclaration("arrReporteros", resultado.listaReporteros));
                    if (resultado.listaCamarografos != null) 
                        initJS.Append(getJSArrayDeclaration("arrCamarografos", resultado.listaCamarografos));
                    if(resultado.listaEditores != null)
                        initJS.Append(getJSArrayDeclaration("arrEditores", resultado.listaEditores));
                }

                initJS.Append(" updateEquiposLocal(); ");
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", initJS.ToString(), true);
            }
            catch (Exception ex) {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " alertModal('Ocurrio un problema al obtener el equipo de trabajo de la local: " + ex.Message + "');", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Gets the JS array declaration.
        /// </summary>
        /// <param name="arrayName">Name of the array.</param>
        /// <param name="arrayData">The array data.</param>
        /// <returns></returns>
        private string getJSArrayDeclaration(string arrayName, TDI_EMPL[] arrayData)
        {
            StringBuilder resultado = new StringBuilder().Append(arrayName).Append(" = [");
            try
            {
                if (arrayData != null && arrayData.Length > 0)
                {
                    foreach (TDI_EMPL empl in arrayData)
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
    }
}