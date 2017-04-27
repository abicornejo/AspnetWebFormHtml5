using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using TvAzteca.FiaTube.Bll_FIATube;

namespace FIATubeHtml5.Impresiones
{
    public partial class BitacoraDiariaImprimir : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string idFabrica = "";
            string idSeccion = "";
            DateTime fecha;
            string idEmpresa = "";
            string CveOrdenTrabajo = "";
            string Titulo = "";
            string local = "";
            string idRepo = "";
            idFabrica = Request["idFabrica"];
            idSeccion = Request["IdSecc"];
            CveOrdenTrabajo = Request["CveOrdenTrabajo"];
            Titulo = Request["Titulo"];
            fecha = Convert.ToDateTime(Request["Fecha"]);
            local = Request["local"];
            idRepo = Request["idRepo"];

            if (!Page.IsPostBack)
            {
                this.litPermisos.Text = false.ToString();
                this.lblIdSeccion.Text = idSeccion;
                BindList(idEmpresa, idFabrica, idSeccion, fecha, CveOrdenTrabajo, Titulo, idRepo, local);
                ClientScript.RegisterStartupScript(this.GetType(), "PrintClose", " <script> Imprimir(); </script>");
            }
            else
                ClientScript.RegisterStartupScript(this.GetType(), "Close", " <script> window.Close(); </script>");
        }

        public void BindList(string idEmpresa, string idFabrica, string idSeccion, DateTime fechaInicial, string CveOrdenTrabajo, string Titulo, string idRepo, string local)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();
            DataTable dt = new DataTable();
            DataView dv = new DataView();
            string cuerpoReporte = "";
            string fabrAct = "";
            string seccAct = "";

            try
            {
                dt = OT.ConsultaOTBitacoraDiaria(idFabrica, idSeccion, fechaInicial.ToShortDateString(), CveOrdenTrabajo, Titulo, idRepo, local);
                dv = dt.DefaultView;
                dv.Sort = "OTRA_LLAV_PR DESC";
                cuerpoReporte = "<TABLE id='Table3' cellPadding='3' width='100%' border='0'>";
                long cont = 0;

                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow r in dt.Rows)
                    {
                        if (cont == 0)
                        {
                            // fabrAct = r["FABR_LLAV_PR"].ToString();
                            seccAct = r["SECC_LLAV_PR"].ToString();

                            cuerpoReporte += "<TR><TD colspan='2'>&nbsp;</TD></TR><TR>";
                            cuerpoReporte += "<td colspan='2'>";
                            cuerpoReporte += "<table id='Table_01' width='100%' height='21' border='0' cellpadding='0' cellspacing='0'>";
                            cuerpoReporte += "<tr>";
                            cuerpoReporte += "<td width='15' height='21'>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "<td width='100%' class='txtNegIzq' height='21'>";
                            cuerpoReporte += "<font color='#FFFFFF'>" + r["SECC_DESC"].ToString() + "</font>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "<td width='19' height='21' class='txtNegIzq'>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "</tr>";
                            cuerpoReporte += "</table>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "</TR>";
                        }

                        if (seccAct != r["SECC_LLAV_PR"].ToString())
                        {
                            seccAct = r["SECC_LLAV_PR"].ToString();
                            cuerpoReporte += "<TR><TD colspan='2'>&nbsp;</TD></TR><TR>";
                            cuerpoReporte += "<td colspan='2'>";
                            cuerpoReporte += "<table id='Table_01' width='100%' height='21' border='0' cellpadding='0' cellspacing='0'>";
                            cuerpoReporte += "<tr>";
                            cuerpoReporte += "<td width='15' height='21'>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "<td width='100%' class='txtNegIzq' height='21'>";
                            cuerpoReporte += "<font color='#FFFFFF'>" + r["SECC_DESC"].ToString() + "</font>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "<td width='19' height='21' class='txtNegIzq'>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "</tr>";
                            cuerpoReporte += "</table>";
                            cuerpoReporte += "</td>";
                            cuerpoReporte += "</TR>";
                        }


                        cuerpoReporte += "<TR><TD>&nbsp;</TD></TR><TR>";
                        cuerpoReporte += "<TD colspan='2' bgColor='#f3f1f2' style='cursor:hand'";

                        if (r["AGSE_ORIG"].ToString() == "O")
                            cuerpoReporte += "onclick=\"abreOT('../OT/CreaOTDatosGen.aspx?numOT=" + r["OTRA_LLAV_PR"].ToString() + "')\">";
                        else
                            cuerpoReporte += "onclick=\"abreOT('../Propuesta/CreaPropuesta.aspx?idProp=" + r["OTRA_LLAV_PR"].ToString() + "')\">";

                        cuerpoReporte += "<font color=\"Black\" face=\"Arial\" size=\"3\">";

                        if (r["AGSE_ORIG"].ToString() == "O")
                            cuerpoReporte += "<strong><font color=\"RED\">(OT: " + r["OTRA_CVEC"].ToString() + ") </font>";
                        else
                            cuerpoReporte += "<strong><font color=\"RED\">(Prop: " + r["OTRA_LLAV_PR"].ToString() + ") </font>";


                        cuerpoReporte += r["OTRA_TITU"].ToString() + " </strong><em>" + r["REPORTEROS"].ToString() + "</em>";
                        cuerpoReporte += "</font>";
                        cuerpoReporte += "</TD>";
                        cuerpoReporte += "</td>";
                        cuerpoReporte += "</TR>";
                        cuerpoReporte += "<TR>";
                        cuerpoReporte += "<TD colspan='2' class='txtNormJust' style='cursor:hand' ";

                        if (r["AGSE_ORIG"].ToString() == "O")
                            cuerpoReporte += " onclick=\"abreOT('../OT/CreaOTDatosGen.aspx?numOT=" + r["OTRA_LLAV_PR"].ToString() + "')\">";
                        else
                            cuerpoReporte += " onclick=\"abreOT('../Propuesta/CreaPropuesta.aspx?idProp=" + r["OTRA_LLAV_PR"].ToString() + "')\">";

                        cuerpoReporte += "<font color=\"Black\" face=\"Arial\" size=\"3\">";
                        cuerpoReporte += r["OTRA_OBJE"].ToString() + "</font></TD>";
                        cuerpoReporte += "</TR>";

                        if (r["AVANCES"].ToString() != "")
                        {
                            cuerpoReporte += "<TR><TD colspan='2' class='txtNegIzq' style='cursor:hand' ";

                            if (r["AGSE_ORIG"].ToString() == "O")
                                cuerpoReporte += " onclick=\"abreOT('../OT/CreaOTDatosGen.aspx?numOT=" + r["OTRA_LLAV_PR"].ToString() + "')\">";
                            else
                                cuerpoReporte += " onclick=\"abreOT('../Propuesta/CreaPropuesta.aspx?idProp=" + r["OTRA_LLAV_PR"].ToString() + "')\">";

                            cuerpoReporte += " <em>&nbsp;AVANCES&nbsp;</em></TD></TR><TR>";
                            cuerpoReporte += "<TR>";

                            cuerpoReporte += "<TD colspan='2' class='txtNormJust' style='cursor:hand' ";

                            if (r["AGSE_ORIG"].ToString() == "O")
                                cuerpoReporte += " onclick=\"abreOT('../OT/CreaOTDatosGen.aspx?numOT=" + r["OTRA_LLAV_PR"].ToString() + "')\">";
                            else
                                cuerpoReporte += " onclick=\"abreOT('../Propuesta/CreaPropuesta.aspx?idProp=" + r["OTRA_LLAV_PR"].ToString() + "')\">";

                            cuerpoReporte += "<font size='2'>" + r["AVANCES"].ToString() + "</font></TD>";
                            cuerpoReporte += "</TR>";
                        }
                        cont++;

                    }
                    cuerpoReporte += "</TABLE>";
                    this.litReporte.Text = cuerpoReporte;
                }
                else
                { this.litReporte.Text = ""; this.litMensaje.Text = "No se encontraron resultados."; }
            }
            catch (Exception ex)
            { this.litMensaje.Text = ex.Message.ToString(); }
            finally
            {
                OT = null;
                if (dt != null)
                    dt.Dispose();
                dt = null;
            }
        }
    }
}