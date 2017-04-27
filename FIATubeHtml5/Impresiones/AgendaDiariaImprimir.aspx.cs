using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

namespace FIATubeHtml5.Impresiones
{
    public partial class AgendaDiariaImprimir : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            object titulo = Request.QueryString["Titulo"];
            object idSeccion = Request.QueryString["IdSecc"];
            object diaIniAgenda = Request.QueryString["Fecha"];
            object numOT = Request.QueryString["Cvec"];
            string[] fechas;

            DateTime FechaAgenda = DateTime.MinValue;
            string secc = "";
            string titu = "";
            string numeroOT = "";

            if (!IsPostBack)
            {
                this.litMensaje.Text = "";

                if (diaIniAgenda != null)
                {
                    fechas = diaIniAgenda.ToString().Split('/');
                    FechaAgenda = new DateTime(int.Parse(fechas[2]), int.Parse(fechas[1]), int.Parse(fechas[0]));
                }

                if (titulo != null)
                    titu = titulo.ToString();

                if (idSeccion != null)
                    secc = idSeccion.ToString();

                if (numOT != null)
                    numeroOT = numOT.ToString();

                if (secc == "8")
                    secc = "1,2,3,4,7,9";
                
                LlenaTituloAgendaDias(FechaAgenda);
                BindList("0", secc, FechaAgenda, FechaAgenda, titu, "", numeroOT);
                ClientScript.RegisterStartupScript(this.GetType(), "PrintClose", " <script> Imprimir(); </script>");
            }
            else
                ClientScript.RegisterStartupScript(this.GetType(), "Close", " <script> window.Close(); </script>");
        }

        protected string getFormatoFecha(object Fecha, object AGSE_NUME, object AGSE_ORIG, object NUMOT_COM, object Seccion)
        {
            string Link = "";
            //Link += " <Font class=\"letraPeq\">";
            //Link += Convert.ToDateTime(Fecha).ToString("dd/MM/yyyy");
            //Link += " <img src=\"../images/calendario/ic_calendario.gif\" border=\"0\">";
            //Link += " </font></TD><TD align=\"center\" width=\"8%\" ";
            //Link += " bgcolor='#FFFFFF' >";

            return Link;

        }

        protected string getSeccionDesc(object SECC_DESC)
        {
            string Desc = "";

            if (SECC_DESC.ToString().Length > 10)
                Desc = SECC_DESC.ToString().Substring(0, 10);
            else
                Desc = SECC_DESC.ToString();

            return Desc;
        }

        protected string getTipoNota(object TINO_DESC, object TINO_ABRE, object TINO_LLAV_PR, object AGSE_NUME, object AGSE_ORIG, object SECC_LLAV_PR)
        {
            string Link = "";


            Link += "<font size=\"1\" color=\"black\" face=\"Arial\"><nobr>";
            Link += TINO_DESC.ToString();
            Link += "</nobr></font>";

            return Link;
        }

        protected string getLinkEliminar(object Origen, object OT, object Seccion, object OTRA_CVEC)
        {
            string Link = "";

            //Link += "<TD align='center' width='2%'";
            //Link += " bgcolor='#FFFFFF' >";
            //Link += "<Font size='1' color='blue' face='Arial' Title='Eliminar de la agenda'>";
            //Link += "<a href=\"javascript:Cancelar(" + OT.ToString() + ",'" + Origen.ToString() + "','" + OTRA_CVEC.ToString() + "')\"><font color=\"blue\">E</font></a>";
            //Link += "</Font>";
            //Link += "</TD>";

            return Link;
        }

        protected string getTitulo(object numOT, object tipoOT, object Evento)
        {
            string titulo = "";
            if (tipoOT.ToString() == "O")
            {
                titulo = "OT(" + numOT.ToString().Trim() + ")";
            }
            else if (tipoOT.ToString() == "E")
            {
                titulo = GetBotonEventos(Evento);
            }
            else
            {
                titulo = "PROP(" + numOT.ToString().Trim() + ")";
            }
            return titulo;
        }

        protected string GetBotonEventos(object EVEN_LLAV_PR)
        {
            string boton = "";

            boton = "<img src='../images/Iconos/bttn_newOT1.gif' alt='Agregar OT' Width='49px' style='cursor=hand' Height='15px' OnClick=AbreOTConIngestion('../Eventos/GeneraOTEventoDeportivo.aspx?id=" + EVEN_LLAV_PR.ToString() + "&idExiste=false;');>";

            return boton;
        }

        protected string getLinkOT(string empresa, object tipoOT, object numOTProp)
        {
            string link = "#";

            if (tipoOT.ToString() == "O")
            { link = "abreOT('../OT/CreaOTDatosGen.aspx?numOT=" + numOTProp + "')"; }
            if (tipoOT.ToString() == "P")
            { link = "abreOT('../Propuesta/CreaPropuesta.aspx?idProp=" + numOTProp + "')"; }
            if (tipoOT.ToString() == "E")
            { link = "javascript:AbreOTConIngestion('../Eventos/GeneraOTEventoDeportivo.aspx?id=" + numOTProp + "&idExiste=true')"; }

            return link;
        }

        protected string obtenEditaEventoDeportivo(object tipoOT, object numOT)
        {
            string link = "";
            if (tipoOT.ToString() == "E")
            {
                link += "<img src='../images/Iconos/icon_edit.jpg' border='0' style='CURSOR: hand' onclick=\"abreEvento('../Eventos/AgregaEventosDeportivos.aspx?idEvento=" + numOT.ToString() + "');\">";
            }
            return link;
        }

        protected string getNombreTipoIngestion(object Tipo, object numOT)
        {
            string tipoIngestion = "";

            //if (Tipo.ToString() == "O")
            //    tipoIngestion += "<img src=\"../imagenes/Ingestion/AddIngestion.gif\" title=\"Consulta Ingestiones de la OT\" style=\"cursor:hand\" onclick=\"ConsultaIngestiones(" + numOT.ToString() + ")\">";

            return tipoIngestion;
        }

        protected string getLinkAvanceOT(object Origen, object numOTProp, object Avance)
        {
            string link = "";
            string color = "#bf0e1e";

            if (Avance.ToString() != "0")
            {
                color = "#87bf0e";
            }

            if (Origen.ToString() == "O")
            {
                link += "<a href=\"javascript:abreAvancesAct('../OT/AvancesOTSoloLectura.aspx?idOT=" + numOTProp + "')\">";
                link += "<font color=\"" + color + "\">Avances</font>";
                link += "</a>";
            }
            else if (Origen.ToString() == "E")
            {
                link += "";
            }
            else
            {
                link += "<a href=\"javascript:abreAvancesAct('../OT/AvancesPropSoloLectura.aspx?idProp=" + numOTProp + "')\">";
                link += "<font color=\"" + color + "\">Avances</font>";
                link += "</a>";
            }

            return link;
        }

        protected string getFondo()
        {
            string Link = "";
            //    Link += " bgcolor='#FFFFFF' ";
            return Link;
        }

        public void LlenaTituloAgendaDias(DateTime fechaInicial)
        {
            DateTime fechaTmp = fechaInicial.AddDays(0);
            string Dia = "";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "MONDAY")
                Dia = "LUNES";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "TUESDAY")
                Dia = "MARTES";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "WEDNESDAY")
                Dia = "MIERCOLES";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "THURSDAY")
                Dia = "JUEVES";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "FRIDAY")
                Dia = "VIERNES";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "SATURDAY")
                Dia = "SABADO";
            if (fechaInicial.DayOfWeek.ToString().ToUpper() == "SUNDAY")
                Dia = "DOMINGO";

            this.hypLunes.Text = Dia + " " + fechaTmp.Day.ToString();

        }

        public void BindList(string idFabrica, string idSeccion, DateTime fechaInicial, DateTime fechaFinal, string titulo, string tipoOT, string numOT)
        {
            ComImpresion.Impresiones OT = new ComImpresion.Impresiones();

            DataSet ds = new DataSet();
            DataView dv = new DataView();
            long numBase = 0;

            try
            {
                ds = OT.ObtenerAgendasImprimir(fechaInicial, fechaFinal, idSeccion, int.Parse(idFabrica), titulo, 0, tipoOT, Convert.ToInt32(numBase),numOT);

                dv = ds.Tables[0].DefaultView;
                dv.Sort = "SECC_DESC";
                dv.RowFilter = "OTRA_ORIG = 0 AND (OTRA_REPL IS NULL OR OTRA_REPL = '1')";

                dltLunes.DataSource = dv;
                dltLunes.DataBind();

                if (ds.Tables[0].Rows.Count > 0)
                {
                  
                    this.hdnLunes.Value = ds.Tables[0].Rows.Count.ToString();
                    numBase += ds.Tables[0].Rows.Count;
                }
                else
                    this.hdnLunes.Value = "0";
            }
            catch (Exception ex)
            { this.litMensaje.Text = ex.Message.ToString(); }
            finally
            {
                OT = null;
                if (ds != null)
                    ds.Dispose();
                ds = null;
            }
        }

    }
}
