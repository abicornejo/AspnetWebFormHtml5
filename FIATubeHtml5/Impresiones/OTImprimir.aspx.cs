using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ComImpresion;
using System.Data;

namespace FIATubeHtml5.Impresiones
{
    public partial class OTImprimir : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                object numeroOT = Request.QueryString["NumOT"];

                if (numeroOT != null)
                {
                    int NumOT = Convert.ToInt32(numeroOT);

                    LlenarOTData(NumOT);
                    TraeIngestion(NumOT);
                    TraeEquipoTrabajo(NumOT);
                    TraeaLogistica(NumOT);
                    TraeProgramas(NumOT);

                    ClientScript.RegisterStartupScript(this.GetType(), "PrintClose", " <script> Imprimir(); </script>");
                }
                else
                    ClientScript.RegisterStartupScript(this.GetType(), "Close", " <script> window.Close(); </script>");
            }


        }

        private void LlenarOTData(int NumOT)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();

            DataSet dsOT = OT.ObtenerOTImprimir(NumOT);

            try
            {
                if (dsOT.Tables.Count > 0)
                {
                    lblIdOT.Text = dsOT.Tables[0].Rows[0]["OTRA_CVEC"].ToString();
                    LitStatus.Text = dsOT.Tables[0].Rows[0]["STAT_DESC"].ToString();
                    LitTit.Text = dsOT.Tables[0].Rows[0]["OTRA_TITU"].ToString();
                    LitTema.Text = dsOT.Tables[0].Rows[0]["OTRA_TEMA"].ToString();
                    litFechaAgse.Text = Convert.ToDateTime(dsOT.Tables[0].Rows[0]["AGSE_FINI"].ToString()).ToString("dd/MM/yyyy");

                    LitCuento.Text = dsOT.Tables[0].Rows[0]["OTRA_STLI"].ToString();
                    litSeccion.Text = dsOT.Tables[0].Rows[0]["SECC_DESC"].ToString();
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
            }
            finally
            {
                OT = null;
                dsOT.Dispose();
                dsOT = null;
            }

        }

        private void TraeIngestion(int NumOT)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();

            DataSet dsIngestion = OT.ObtenerIngestionOTImprimir(NumOT);
            try
            {
                if (dsIngestion.Tables.Count>0)
                {
                    dgIngestion.DataSource = dsIngestion.Tables[0];
                    dgIngestion.DataBind();
                }
                else
                {
                    dgIngestion.DataSource = null;
                    dgIngestion.DataBind();
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
            }
            finally
            {
                dsIngestion.Dispose();
                dsIngestion = null;
                OT = null;
            }	
		
        }

        private void TraeEquipoTrabajo(int NumOT)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();
            DataSet dsEquipo = OT.ObtenerEquipoOTImprimir(NumOT,"");
            
            try
            {
                if (dsEquipo != null)
                {
                    dgEquipoPlaneado.DataSource = dsEquipo;
                    dgEquipoPlaneado.DataBind();
                }
                else
                {
                    dgEquipoPlaneado.DataSource = "";
                    dgEquipoPlaneado.DataBind();
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
            }
            finally
            {
                dsEquipo.Dispose();
                dsEquipo = null;
                OT = null;
            }
		
        }

        private void TraeaLogistica(int NumOT)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();
            DataSet dsLogistica = OT.ObtenerLogisticaOTImprimir(NumOT);
            try
            {
                if (dsLogistica != null)
                {
                    dgLogistica.DataSource = dsLogistica;
                    dgLogistica.DataBind();
                }
                else
                {
                    dgLogistica.DataSource = "";
                    dgLogistica.DataBind();
                }
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
            }
            finally
            {
                OT = null;
                dsLogistica.Dispose();
                dsLogistica = null;
            }
		
        }

        private void TraeProgramas(int NumOT)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();
            DataSet dsProgramas = OT.ObtenerProgramasCompraOTImprimir(NumOT);

            try
            {
                if (dsProgramas != null)
                {
                    dgProgramas.DataSource = dsProgramas;
                    dgProgramas.DataBind();
                }
                else
                {
                    dgProgramas.DataSource = "";
                    dgProgramas.DataBind();
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
    }
}
