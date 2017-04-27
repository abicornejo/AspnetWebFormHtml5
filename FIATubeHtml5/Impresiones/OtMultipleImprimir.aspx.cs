using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace FIATubeHtml5.Impresiones
{
    public partial class OtMultipleImprimir : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                object numeroEmpl = Request.QueryString["cveEmpl"];
                object Fecha = Request.QueryString["Fecha"];
                object IdSecc = Request.QueryString["IdSecc"];

                string cveEmpl = string.Empty;
                DateTime fechaBusq = DateTime.MinValue;
                int cveSecc = 0;

                
                if (Fecha != null)
                {
                    string[] fechaArray = Fecha.ToString().Split('/');
                    fechaBusq = new DateTime(int.Parse(fechaArray[2]), int.Parse(fechaArray[1]), int.Parse(fechaArray[0]));
                }

                if (IdSecc != null)
                    cveSecc = Convert.ToInt32(IdSecc);

                TraeOtMultiple(cveEmpl, fechaBusq, cveSecc);

                ClientScript.RegisterStartupScript(this.GetType(), "PrintClose", " <script> Imprimir(); </script>");
            }
            else
                ClientScript.RegisterStartupScript(this.GetType(), "Close", " <script> window.Close(); </script>");
        }

        private void TraeOtMultiple(string cveEmpl, DateTime fechaBusq, int cveSecc)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();
            DataSet dsProgramas = OT.ObtenerOtMultiplesImprimir(fechaBusq,cveEmpl,cveSecc);

            try
            {
                if (dsProgramas != null)
                {
                    grdvOts.DataSource = dsProgramas;
                    grdvOts.DataBind();
                }
                else
                {
                    grdvOts.DataSource = "";
                    grdvOts.DataBind();
                }
            }
            catch (Exception ex)
            { ex.Message.ToString(); }
            finally
            {
                dsProgramas.Dispose();
                dsProgramas = null;
                OT = null;
            }
        }

        public string CambiaFormatoFecha(object Fecha)
        {
            if (Fecha != null)
            {
                try
                {
                    DateTime fecha = Convert.ToDateTime(Fecha);

                    return fecha.ToString("HH:mm");
                }
                catch
                {
                    return "00:00"; 
                }
            }
            else
                return "00:00";
        }
    }
}
