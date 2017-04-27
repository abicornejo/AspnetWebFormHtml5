using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using Newtonsoft.Json;
using FIATubeHtml5.recuperaVideo;
using System.Web.Services;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class AgendaSemanal : BasePage
    {

        #region "Variables"
        //private bool existeLoading;
       
        
        WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
        WebService_RecuperaVideoSoapClient prioridad = new WebService_RecuperaVideoSoapClient();

        private bool isUserGrant;
        private bool isUserGrantAdquisi;
        private BusquedaAvanzada  oBusquedaAvan ;
        private Play_Out_Shares playOutShare;
        private AgendaOT oAgendaOT;
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                hiddLocalCv.Value = Session["UserIdLocal"].ToString();
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#divGridAgenda').css('height', screen.height - 262);" + updateEquipo(), true);
            }
        }

        #region "Funcionalidad de agenda Semanal"
        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e)
        {
            updateScreenData();
        }

        /// <summary>
        /// Updates the screen data.
        /// </summary>
        private void updateScreenData() 
        {
            DateTime fechaInicio;
            AgendaOT[] resultado = null;
            String[] puestos;
            bool isRatingCalified = false;
            List<String> fechas = new List<string>();
            StringBuilder myDiv = new StringBuilder();
            List<StringBuilder> dias = new List<StringBuilder>();
            List<RatingVideo> ratings;

            try
            {
                /*Se valida si el usuario tiene puesto de Calificador Rating*/
                puestos = Session["userPuestos"].ToString().Split(',');
                isRatingCalified = (puestos.Contains("9") || puestos.Contains("158"));

                /*Se genera el arreglo de dias para el programa*/
                fechaInicio = Convert.ToDateTime(hiddFecIni.Value);
                for (int i = 0; i <= 6; i++)
                {
                    fechas.Add(fechaInicio.AddDays(i).ToString("dd/MM/yyyy"));
                    dias.Add(new StringBuilder(@"<div><label class=""openMdlAgDiaria"" data-fecha='").Append(fechaInicio.AddDays(i).ToString("dd/MM/yyyy")).Append("' ")
                        .Append("data-texto='").Append(txtTexto.Value).Append("' ")
                        .Append("data-OT='").Append(/*txtOT.Value*/String.Empty).Append("' ")
                        .Append("data-secc='").Append(hiddSecc.Value).Append("' ")
                        .Append("data-locl='").Append(hiddLocalCv.Value).Append("' ")
                        .Append(">").Append(fechaInicio.AddDays(i).ToString("dddd, dd").ToUpper()).Append("</label></div>"));
                }

                if (hiddSecc.Value == "114" && hiddLocalCv.Value == "36")
                    hiddSecc.Value = string.Empty;

                /*Se obtiene la lista de ratings*/
                ratings = client.getListaRating(false).ToList();

                resultado = client.getAgendaOTs_LOCALESRep(hiddSecc.Value, hiddFecIni.Value, hiddFecFin.Value, txtTexto.Value, hiddTN.Value, hiddFac.Value, /*txtOT.Value*/txtTexto.Value, hiddProd.Value, hiddLocalCv.Value, hiddRepo.Value);
                int index = 0;
                /*Se limpia la informacion del div de resultados*/
                if (resultado != null)
                    foreach (AgendaOT agenda in resultado.Where(n => n.OtraRepl.Equals(string.Empty)))
                    {
                        string btSolicitudMaterial=string.Empty;
                        if (agenda.MuestraSolicitud)
                        {
                            btSolicitudMaterial = @"<input id=""btnSolicitar"" type=""button"" class=""SolicitaMat"" data-agenda='" + JsonConvert.SerializeObject(agenda, Formatting.Indented) + "' />";
                        }

                        myDiv.Append("<div style='background:").Append(agenda.SeccColor).Append(";margin:5px 5px 0 0;padding: 1px 0;border-radius: 5px;'>")
                            .Append(@"<div id='divItemAgenda' class=""divWeekItems"">")
                            .Append("<div clasS='agseTitu'><label style='color:").Append(agenda.SeccColor).Append(";'>").Append(agenda.AgendaRotulo).Append("</label><label style='color:").Append(agenda.SeccColor).Append(";'>").Append(agenda.OtraCvec.Replace("<", "&lt;").Replace(">", "&gt;")).Append("</label></div>")
                            .Append(@"<div><label class='overFlow agseTitu' data-rot='").Append(agenda.AgendaRotulo).Append("' data-value='").Append(agenda.AgseNume).Append(@"' data-oCve='").Append(agenda.OtraCvec).Append(@"' onclick='showData_click(this);' onMouseOver=""this.style.cursor='pointer'"">").Append(agenda.AgseTitu.Replace("<", "&lt;").Replace(">", "&gt;")).Append("</label></div>")
                            .Append(@"<div><img onerror='errorImg(this);' alt=""Sin Imagen"" width=""95"" height=""70"" src=""")
                            .Append((agenda.VideoImg == string.Empty || agenda.VideoImg.Equals("noImage")) ? "../../Images/noimage.png" : ((agenda.VideoImg.ToUpper().Contains("DISPONIBLE")) ? "../../Images/materialDisponible.png" : agenda.VideoImg))
                            .Append(@"""").Append(agenda.VideoReferencia.Equals(String.Empty) ? " " : @" onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;' ")
                            .Append(" data-numOT='").Append(agenda.AgseNume).Append("' ")
                            .Append(" data-file='").Append(agenda.VideoReferencia).Append("' ")
                            .Append(" data-img='").Append(agenda.VideoImg).Append("' ")
                            .Append(" data-pro='").Append(agenda.CvePrograma).Append("' ")
                            .Append("/></div>")
                            .Append("<label>").Append(agenda.TnoDesc.Replace("<", "&lt;").Replace(">", "&gt;")).Append("</label>")
                            .Append("<input id='chkCarrito' type='checkbox' onchange='chkCarrito_changed(this);' onclick='chkCarrito_changed(this);' data-AgseOrig='" + agenda.AgseOrig + "' data-AgseNume='" + agenda.AgseNume + "' data-AgseTitu='" + agenda.AgseTitu + "' data-OtraCvec='" + agenda.OtraCvec + "' data-AgseFini='" + agenda.AgseFini + "' data-CveLocal='" + agenda.CveLocal + "' data-SeccLlPr='" + agenda.SeccLlPr + "' data-TinoLlPr='" + agenda.TinoLlPr + "'/><img src='../../images/icoCARRITOCOMPRAS.png' />")
                            .Append(@"<div><label>"+ agenda.LocalDesc + "</label></div>")
                            .Append(@"<div><label class='lblAvanceAgse' data-type='").Append(agenda.AgseOrig).Append("' data-numDat='").Append(agenda.AgseNume)
                            .Append("' data-oCve='").Append(agenda.OtraCvec).Append("' data-titu='").Append(agenda.AgseTitu)                            
                            .Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='abrirAvance(this); return false;' style='color:").Append(agenda.TieneAvance == 0 ? "Red" : "#00FA9A").Append(";'>Avances</label>")
                            .Append(btSolicitudMaterial);
                        if (agenda.AgseOrig.ToUpper().Equals("O") && isRatingCalified)
                        {
                            myDiv.Append(@" <div class='varFloatCenter varWidth103' data-val='").Append(agenda.AgseNume).Append(@"' data-rat='").Append(agenda.Rating).Append(@"'> ");
                            foreach (RatingVideo rat in ratings) 
                                myDiv.Append(" <input name='star").Append(index).Append(@"' type='radio' class='star' value='").Append(rat.CveRating).Append("' title='").Append(rat.Descripcion).Append("' ").Append((agenda.Rating == rat.CveRating) ? "checked='checked'" : string.Empty).Append("/> ");
                            myDiv.Append(" </div> ");                                        
                        }
                        myDiv.Append("</div>")
                            .Append("</div>")
                            .Append("</div>");

                        index++;
                        for (int i = 0; i < fechas.Count; i++)
                            if (agenda.AgseFini == fechas[i])
                                dias[i].Append(myDiv.ToString());
                        myDiv.Clear();
                    }

                divLunes.InnerHtml = dias[0].ToString();
                divMartes.InnerHtml = dias[1].ToString();
                divMiercoles.InnerHtml = dias[2].ToString();
                divJueves.InnerHtml = dias[3].ToString();
                divViernes.InnerHtml = dias[4].ToString();
                divSabado.InnerHtml = dias[5].ToString();
                divDomingo.InnerHtml = dias[6].ToString();

                try
                {
                    if (hiddUpEq.Value.Equals("1"))
                    {
                        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", updateEquipo(), true);
                        hiddUpEq.Value = "0";
                    }
                    else
                        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#divGridAgenda').css('height', screen.height - 262); setRating();", true);
                }
                catch (Exception) {
                    throw new Exception("No fue posible cargar la informaci&oacute;n de los reporteros.");
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "alertModal('Ocurrio un problema al cargar la informaci&oacute;n: " + ex.Message + "'); ", true);
            }
        }

        /// <summary>
        /// Handles the Click event of the btnUpdateEquipo control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        private string updateEquipo()
        {
            StringBuilder result = new StringBuilder();
            StringBuilder initJS = new StringBuilder();
            wsFiatube.PantallaOT resultado = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            try
            {
                /*Se obtiene la informacion del equipo de trabajo*/
                client = new WebService_FIATubeSoapClient();

                /*Si la local es diferente a ajusco se obtien los empleados de la local correspondiente*/
                if (int.Parse(hiddLocalCv.Value) != 36)
                    resultado = client.ObtieneDatosEquiporlocal(int.Parse(hiddLocalCv.Value));
                else
                    resultado = client.ObtieneDatosPantallaOT(Convert.ToInt32(Session["numUsuario"]), true, true);

                initJS.Append("<option value='0'>== SELECCIONE ==</option>");
                /*se generan los arrays con la informacion de reporteros, camarografos y editores*/
                if (resultado != null)
                {
                    if (resultado.listaReporteros != null)
                        foreach (wsFiatube.TDI_EMPL item in resultado.listaReporteros)
                            initJS.Append("<option value='").Append(item.EmpleadoLlavePrimaria).Append("'>").Append(item.EmpleadoNombre).Append("</option>");
                }

                result.Append(" $('#divGridAgenda').css('height', screen.height - 262); $('#cmbReportero').empty(); $('#cmbReportero').append(\"").Append(initJS.ToString()).Append("\"); setRating(); ");
            }
            catch (Exception ex)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " alertModal('Ocurrio un problema al obtener el equipo de trabajo de la local: " + ex.Message + "');", true);
                this.logError(ex);
            }

            return result.ToString();
        }

        #endregion

        protected void BntDetonador_Click(object sender, EventArgs e)
        {
            oAgendaOT = JsonConvert.DeserializeObject<AgendaOT>(this.HDAgenda.Value);
            Session["AgendaOT"] = oAgendaOT;
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " AbrirObtenerMateriales(); ", true);
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }

        [WebMethod]
        public static bool updateRating(int cveOT, int rating) {
            try
            {
                WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
                return client.updateRatingOT(cveOT, rating);
            }
            catch (Exception) {
                return false;
            }
        }
    }


}
