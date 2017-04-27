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
    public partial class OT : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                this.getScreenData();
        }
        public static string ClientInformation(HttpListenerContext context)
        {
            return "a";
        }

        /// <summary>
        /// Obtiene la informacion para llenar los diferentes controles que son utilizados en la pantalla.
        /// </summary>
        private void getScreenData()
        {
            string[] puestos;
            PantallaOT data = null;
            TDI_SeccionFormato[] formatos;
            WebService_FIATubeSoapClient client;
            StringBuilder initJS = new StringBuilder();
            StringBuilder initJSDatosPantalla = new StringBuilder();
            client = new WebService_FIATubeSoapClient();
            Datos_PantallaOTIpad dataPantalla = null;
            

            try
            {
                bool bActualiza;
                
                client = new WebService_FIATubeSoapClient();
                
                data = client.ObtieneDatosPantallaOT(Convert.ToInt32(Session["numUsuario"]), true, true);

                /*Se llena el combo de secciones y se asigna el valor seleccionado por default*/
                cmbSeccion.Items.Clear();

                foreach (TDI_Seccion seccion in data.listaSecciones)
                    cmbSeccion.Items.Add(new ListItem(seccion.NombreSeccion, seccion.CveSeccion.ToString()));

                if (data.SeccionUsuario == null)
                {
                    TDI_Seccion TdS = new TDI_Seccion();
                    TdS = client.ObtieneSeccionUsuario(Convert.ToInt32(Session["numUsuario"]));
                    if (TdS != null)
                    {
                        cmbSeccion.Value = TdS.CveSeccion.ToString();
                    }
                }else
                {
                    cmbSeccion.Value = data.SeccionUsuario.CveSeccion.ToString();
                }

                /*Se validan las multiples secciones*/
                puestos = Session["userPuestos"].ToString().Split(',');
                if (puestos.Contains("63") == true || puestos.Contains("9") == true)
                {
                    cmbSeccion.Disabled = false;
                }
                else
                {
                    cmbSeccion.Disabled = true;
                }

                /*Se obtienen los formatos*/
                formatos = client.ObtenerSeccionFormatoXIDEmpleado(Convert.ToInt32(Session["numUsuario"]));
                if (formatos != null)
                {
                    cmbFormato.Items.Clear();
                    foreach (TDI_SeccionFormato forma in formatos)
                        cmbFormato.Items.Add(new ListItem(forma.CveFormato.Descripcion, forma.CveFormato.CveFormato.ToString()));
                }
                if (Request.QueryString["numOT"].ToString().Trim() != string.Empty)
                {
                    bActualiza = true;
                }
                else
                {
                    bActualiza = false;
                }

                cmbProduccion.Items.Clear();
                cmbProduccion.Items.Add(new ListItem("== SELECCIONE ==", "0"));
                foreach (TDI_ProgramaEmpleado prog in data.listaProgramaEmpleado)
                    cmbProduccion.Items.Add(new ListItem(prog.CvePrograma.NombrePrograma, prog.CvePrograma.CvePrograma.ToString()));

                /*Se valida si se trata de una actualizacion o creacion de una nueva OT*/
                if (!bActualiza)
                {
                 
                }
                else
                {
                    
                        //divOcultar.Visible = true;
                    
                    dataPantalla = client.ObtenerDatosPantallaOrdenTrabajo(Request.QueryString["numOT"].ToString());
                    if (dataPantalla != null)
                        {

                            initJS.Append(getJSArrayDatosPantalla("arrOTAgenda", dataPantalla.OTAgenda));
                            initJS.Append(getJSArrayDatosPantalla("arrOTEquipo", dataPantalla.OTEquipo));
                            initJS.Append(getJSArrayDatosPantalla("arrOTLogistica", dataPantalla.OTLogistica));
                            initJS.Append(getJSArrayDatosPantalla("arrOTOrdenTrab", dataPantalla.OTOrdenTrab));
                            string strEliminada = "arrEstaEliminada=" + dataPantalla.EstaEliminada.ToString().ToLower() + ";";
                            initJS.Append(strEliminada);
                           
                        }
                }

                PantallaOT PantallaOTLocal = null;
                try
                {
                    PantallaOTLocal = client.ObtieneDatosEquiporlocal(dataPantalla.OTOrdenTrab[0].Local.LocalLlave);
                }
                catch { }

                if (dataPantalla != null && PantallaOTLocal != null && dataPantalla.OTOrdenTrab[0].Local.LocalLlave > 0 && dataPantalla.OTOrdenTrab[0].Local.LocalLlave != 36)
                {
                    initJS.Append(this.getJSArrayDeclaration("arrReporteros", PantallaOTLocal.listaReporteros));
                    initJS.Append(this.getJSArrayDeclaration("arrReporterosFIA", data.listaReporteros));
                    initJS.Append(this.getJSArrayDeclaration("arrCamarografos", PantallaOTLocal.listaCamarografos));
                    initJS.Append(this.getJSArrayDeclaration("arrCamarografosFIA", data.listaCamarografos));
                    initJS.Append(this.getJSArrayDeclaration("arrEditores", PantallaOTLocal.listaEditores));
                    initJS.Append(this.getJSArrayDeclaration("arrEditoresFIA", data.listaEditores));
                }
                else {
                    initJS.Append(this.getJSArrayDeclaration("arrReporteros", data.listaReporteros));
                    initJS.Append(this.getJSArrayDeclaration("arrReporterosFIA", data.listaReporteros));
                    initJS.Append(this.getJSArrayDeclaration("arrCamarografos", data.listaCamarografos));
                    initJS.Append(this.getJSArrayDeclaration("arrCamarografosFIA", data.listaCamarografos));
                    initJS.Append(this.getJSArrayDeclaration("arrEditores", data.listaEditores));
                    initJS.Append(this.getJSArrayDeclaration("arrEditoresFIA", data.listaEditores));
                }

                /*Se obtiene la informacion del autocomplete de reporteros, camarografos y editores*/
                initJS.Append(this.getJSArrayDeclarationSeccion("arrSecciones", data.listaSecciones));
                initJS.Append(this.getJArrayDeclarationEstatus("arrEstatus", data.listaEstatus));

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", initJS.ToString(), true);
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
        }

        private string getJArrayDeclarationEstatus(string arrayName, TDI_Estatus[] arrayData)
        {
            StringBuilder resultado = new StringBuilder().Append(arrayName).Append("=[");
            try
            {
                if (arrayData != null && arrayData.Length > 0)
                {
                    foreach (TDI_Estatus Est in arrayData)
                    {
                        resultado.Append("{NombreEstatus:\"").Append(Est.NombreEstatus.ToString()).Append("\", CveEstatus:").Append(Est.CveEstatus).Append("},");

                    }
                    resultado.Remove(resultado.Length - 1, 1);
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
            return resultado.Append("]; ").ToString();
        }
        private string getJSArrayDeclarationSeccion(string arrayName, TDI_Seccion[] arrayData)
        {
            StringBuilder resultado = new StringBuilder().Append(arrayName).Append("=[");
            try
            {
                if (arrayData != null && arrayData.Length > 0)
                {
                    foreach (TDI_Seccion secc in arrayData)
                    {
                        resultado.Append("{Clave:\"").Append(secc.CveSeccion.ToString()).Append("\", Empleado:").Append(secc.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria).Append("},");

                    }
                    resultado.Remove(resultado.Length - 1, 1);
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
            return resultado.Append("]; ").ToString();
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
        /// Gets the JS array declaration
        /// </summary>
        /// <param name="arrayName">Name of the array.</param>
        /// <param name="arrayData">The array data.</param>
        /// 
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
        public void btnReplicar_click(Object sender, EventArgs e)
        {

        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}
