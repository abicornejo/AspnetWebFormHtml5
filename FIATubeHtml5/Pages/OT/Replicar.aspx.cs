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
    public partial class Replicar : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                this.getScreenData();
        }
        private void getScreenData()
        {
            Datos_PantallaOTIpad dataPantalla = null;
            WebService_FIATubeSoapClient client;
            StringBuilder initJS = new StringBuilder();
            TransmisionProgramaIpad[] tdProg; 
            try{
                client = new WebService_FIATubeSoapClient();
                if (Request.QueryString["CveOrdenTrabajo"].ToString() != "")
                {

                    tdProg = client.GetProgramasTransmitir(Int32.Parse(Request.QueryString["CveOrdenTrabajo"].ToString()), Int32.Parse(Session["numUsuario"].ToString()), Int32.Parse(Request.QueryString["IdSeccion"].ToString()));
                    if (tdProg != null)
                    {
                        initJS.Append(getJSArrayDatosPantalla("arrProgramasTransmitir", tdProg));
                    }
                    client = new WebService_FIATubeSoapClient();
                    dataPantalla = client.ObtenerDatosPantallaOrdenTrabajo(Request.QueryString["CveOrdenTrabajo"].ToString());
                    if (dataPantalla != null)
                    {
                        initJS.Append(getJSArrayDatosPantalla("arrOTAgenda", dataPantalla.OTAgenda));
                        initJS.Append(getJSArrayDatosPantalla("arrOTEquipo", dataPantalla.OTEquipo));
                        initJS.Append(getJSArrayDatosPantalla("arrOTLogistica", dataPantalla.OTLogistica));
                        initJS.Append(getJSArrayDatosPantalla("arrOTOrdenTrab", dataPantalla.OTOrdenTrab));
                        string strEliminada = "arrEstaEliminada=" + dataPantalla.EstaEliminada.ToString().ToLower() + ";";
                        initJS.Append(strEliminada);
                        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", initJS.ToString(), true);
                    }
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

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}
