using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using System.Web.Services;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class AgendaDiariaProgramas : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            /*Se consulta la informacion de los formatos y se guarda dentro del ViewState*/
            this.getFormats();
            ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divContentResult').css('height', screen.height - 271);", true);
        }

        /// <summary>
        /// Raises the <see cref="E:System.Web.UI.Control.Init"/> event to initialize the page.
        /// </summary>
        /// <param name="e">An <see cref="T:System.EventArgs"/> that contains the event data.</param>
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            ViewState["formats"] = ViewState["formats"];
        }

        /// <summary>
        /// Actualiza la replica del formato de compra.
        /// </summary>
        /// <param name="cveOT">La clave de la OT.</param>
        /// <param name="cveProg">La clave de programa.</param>
        /// <param name="fecha">La fecha.</param>
        /// <param name="cveNvoFmto">La clave del nuevo formato.</param>
        /// <returns></returns>
        [WebMethod]
        public static string actualizaReplicaFormatoCompra(int cveOT, int cveProg, DateTime fecha, int cveNvoFmto)
        {
            bool isUpdated = false;
            THE_FormatoCompraIpad[] result;
            WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();

            try
            {
                /*Se obtiene el tipo de Formato asignado*/
                result = client.ConsultarFormatoCompraOT(cveOT, cveProg, fecha);
            }
            catch(Exception){
                return "No se encontrarón Formatos";
            }

            if (result != null && result.Count() > 0)
            {
                try
                {
                    result[0].CveFormato.CveFormato = cveNvoFmto;
                    isUpdated = client.ActualizaReplicaFormatoCompra(result[0]);
                }
                catch (Exception) {
                    return "Ocurrio un problema al Cambiar Formato";
                }
            }
            else
                return "No se encontrarón Formatos";

            return isUpdated.ToString();
        }

        /// <summary>
        /// Gets the formats.
        /// </summary>
        private void getFormats() {
            TDI_Formato[] formatos = null;
            StringBuilder formatOptions = new StringBuilder();
            try
            {
                WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
                formatos = client.ConsultaFormatos();

                if (formatos != null)
                    foreach (TDI_Formato formato in formatos)
                        formatOptions.Append("<option value='").Append(formato.CveFormato).Append("'>").Append(formato.Descripcion).Append("</option>");

                ViewState["formats"] = formatOptions;
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e)
        {
            AgendaOTPrograma[] result = null;
            WebService_FIATubeSoapClient client;
            string listFormats;
            StringBuilder consolidado = new StringBuilder();

            /*Se verifica si se encuentran cargados ya los formatos si no se cargan*/
            if (ViewState["formats"] == null || ViewState["formats"].ToString() == string.Empty)
                this.getFormats();

            try
            {
                client = new WebService_FIATubeSoapClient();
                result = client.ObtenAgendaPrograma_LOCALES(hiddProd.Value, hiddSecc.Value, hiddTitl.Value, string.Empty, hiddFech.Value, hiddFech.Value, 0, hiddLocl.Value);

                /*Se limpia el div de resultados*/
                divContentResult.InnerHtml = string.Empty;

                divContentResult.InnerHtml += new StringBuilder(@"<div class='divttlAgenda'><label class=""openMdlAgDiaria"" data-fecha='").Append(Convert.ToDateTime(hiddFech.Value).ToString("dd/MM/yyyy")).Append("' ")
                        .Append("data-secc='").Append(hiddSecc.Value).Append("' ")
                        .Append("data-prog='").Append(hiddProd.Value).Append("' ")
                        .Append(">").Append(Convert.ToDateTime(hiddFech.Value).ToString("dddd, dd").ToUpper()).Append("</label></div>");
                divContentResult.InnerHtml += "<ul class='mySortable'>";

                if (result != null)
                {
                    foreach (AgendaOTPrograma item in result)
                    {
                        listFormats = ((StringBuilder)ViewState["formats"]).ToString();
                        consolidado.Append("<li class='divSeccAgendaDiariaProg ui-state-default'><span class='ui-icon ui-icon-arrowthick-2-n-s'></span>");
                        consolidado.Append("<div class='divRegContent' data-item='").Append(JsonConvert.SerializeObject(item, Formatting.Indented))
                            .Append("'>");//Contenedor del registro

                        consolidado.Append("<img onerror='errorImg(this);' class='ImgSizeAgendaDiariaPrograma'alt='Imagen Video' src='").Append(item.VideoImg == null ? "../../Images/noimage.png" : item.VideoImg).Append("'").Append(item.VideoReferencia == null || item.VideoReferencia.Trim().Equals(String.Empty) ? string.Empty : @" onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;'")
                                                     .Append(" data-numOT='").Append(item.CveOrdenTrabajo).Append("' ")
                                                     .Append(" data-file='").Append(item.VideoReferencia == null ? string.Empty : item.VideoReferencia).Append("' ")
                                                     .Append(" data-img='").Append(item.VideoImg == null ? string.Empty : item.VideoImg).Append("' />"); //Fin imagen video
                   
                        consolidado.Append("<label class='divSeccAgendaDiariaProgramaLG'>").Append(item.NombreSeccion).Append(" </label>");
                        consolidado.Append(@"<label class='divSeccAgendaDiariaPrograma' data-value='").Append(item.CveOrdenTrabajo).Append(@"' data-oCve='").Append(item.ClaveOT).Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='showData_click(this);'> ").Append(item.ClaveOT).Append(" </label>");
                        consolidado.Append(@"<label class='divSeccAgendaDiariaProgramaLG' data-value='").Append(item.CveOrdenTrabajo).Append(@"' data-oCve='").Append(item.ClaveOT).Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='showData_click(this);'> ").Append(item.TituloOT).Append(" </label>");
                        consolidado.Append("<select class='cmbSecciones varFloatLeft varMarginTop2' onchange='tipoNota_changed(this);'")
                            .Append(" data-cveOT='").Append(item.CveOrdenTrabajo).Append("' ")
                            .Append(" data-cvePr='").Append(item.CvePrograma).Append("' ")
                            .Append(">").Append(listFormats.Insert(listFormats.IndexOf("value='" + item.CveFormato + "'") - 1, " selected='selected' ")).Append("</select>");
                        consolidado.Append(@"<label class='divSeccAgendaDiariaPrograma' onMouseOver=""this.style.cursor='pointer'"" onclick='abrirAvance(this); return false;' style='color:").Append(item.TieneAvance > 0 ? "#00FA9A" : "Red").Append(";' ")
                            .Append(" data-type='O' data-numDat='").Append(item.CveOrdenTrabajo)
                            .Append("' data-oCve='").Append(item.ClaveOT).Append("' data-titu='").Append(item.TituloOT).Append("'>Avances</label>");
                        consolidado.Append("<button type='button'class='btnReplicarAgendaDiariaPrograma' title='Replicar' onclick = 'btnReplicar_click(this);' data-seccion ='" + item.CveSeccion + "' data-id ='" + item.CveOrdenTrabajo +"'></button>");
                        consolidado.Append("<label >").Append((item.OrigenCalculadoQry != string.Empty) ? item.OrigenCalculadoQry : "&nbsp;").Append("</label>");
                        consolidado.Append("<label class='divSeccAgendaDiariaPrograma' style='color:").Append(item.Guion ? "#00FA9A" : "Red").Append(";'>").Append(item.Guion ? "Guion" : "Sin Guion").Append("</label>");
                        consolidado.Append("<button type='button'class='btniNewsAgendaDiariaPrograma2' onclick='sendiNewsRep(this);' title='Enviar a iNEWs carpeta reportero'")
                            .Append(" data-clvOt='").Append(item.ClaveOT).Append("' ")
                            .Append(" data-cveOt='").Append(item.CveOrdenTrabajo).Append("' ")
                            .Append(" data-cvePrg='").Append(item.CvePrograma).Append("' ")
                            .Append(" data-nomPrg='").Append(item.NombrePrograma).Append("' ")
                            .Append(" data-dur='").Append(item.DuracionFormato).Append("' ")
                            .Append(" data-fecha='").Append(item.FechaCompra.ToString("dd/MM/yyyy")).Append("' ")
                            .Append(">").Append("</button>");
                        consolidado.Append("<button type='button'class='btniNewsAgendaDiariaPrograma2' title='Enviar a iNEWs preformato' onclick='INEWSPreform_Click(this);' ")
                            .Append(" data-Obj='").Append(JsonConvert.SerializeObject(item, Formatting.Indented)).Append("' ")
                            .Append(">").Append("</button>");

                        consolidado.Append("</div>");//Fin Contenedor del registro
                        consolidado.Append("</li>");
                    }

                    /*Se vacia la informacion recaudada dentro del div por orden alfabetico*/
                    divContentResult.InnerHtml += consolidado.ToString();
                    divContentResult.InnerHtml += "</ul>";
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}
