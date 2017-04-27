using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class BitacoraDiaria : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack)
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divContentResult').css('height', screen.height - 223);", true);
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e) 
        {
            int cont = 0;
            int repo = 0;
            string currSecc;
            BitacoraIpad[] result = null;
            string[] splitResult;
            string[] separador = { "--" };
            WebService_FIATubeSoapClient client;
            StringBuilder cadAvances = null;
            IDictionary<String, StringBuilder> consolidado = new Dictionary<String, StringBuilder>();

            try
            {
                try { repo = int.Parse(hiddRepo.Value); }
                catch (Exception) { repo = 0; }

                client = new WebService_FIATubeSoapClient();
                result = client.getBitacoraDiaria_LOCALESByReportero(hiddFabr.Value, hiddSecc.Value, hiddFech.Value, txtTexto.Value/*txtOT.Value*/, txtTexto.Value, hiddProd.Value, hiddLocl.Value, repo);
                
                /*Se limpia el div de resultados*/
                divContentResult.InnerHtml = string.Empty;

                if (result != null) {
                    foreach (BitacoraIpad item in result.Where(n=> n.OtraRepl.Equals(string.Empty))) {
                        currSecc = item.SeccDesc.ToUpper();
                        /*Se verifica si la seccion ya existe en el diccionario, si no, se agrega la clave correspondiente*/
                        if (!consolidado.ContainsKey(currSecc))
                        {
                            consolidado.Add(new KeyValuePair<string, StringBuilder>(currSecc, new StringBuilder()));
                            consolidado[currSecc].Append("<div class='tablegPlaylistAgendaDiariatTITLE'>").Append(currSecc).Append("</div>");
                        }

                        consolidado[currSecc].Append("<div class='divRegContent2'")//Contenedor del registro
                        .Append(" data-OT='").Append(item.OtraCvec).Append("'")
                        .Append(" data-Title='").Append(item.AgseTitu).Append("'");
                        if (item.Reporteros != null && item.Reporteros.Count() >= 1)
                            consolidado[currSecc].Append(" data-Rep='").Append(item.Reporteros[0].EmplNomb).Append("'");
                        consolidado[currSecc].Append(" data-Ava='").Append(item.AvancesCad).Append("'")
                        .Append(" data-Obj='").Append(item.Cuento).Append("'")
                        .Append("</div>");

                        consolidado[currSecc].Append("<div class='tablegPlaylistAgendaDiariatTITLE2'>");//Barra de titulo del registro
                        consolidado[currSecc].Append("<div class='itemMenuBitDi' data-orig='").Append(item.AgseOrig).Append("' data-val='").Append(item.AgseNume).Append("'  data-oCve='").Append(item.OtraCvec).Append("' onclick='btnshowOT_click(this);' >[ ").Append(item.AgseOrig == "O" ? "OT" : "PROP").Append(":&nbsp;<label>").Append(item.OtraCvec).Append("</label> ]</div>"); //OT asociada
                        consolidado[currSecc].Append("<div class='itemMenuBitDi'>").Append(item.AgseTitu).Append("</div>"); //Titulo
                        if (item.Reporteros != null && item.Reporteros.Count() >= 1)
                            consolidado[currSecc].Append("<div class='itemMenuBitDi'>").Append(item.Reporteros[0].EmplNomb).Append("</div>"); //Nombre de reportero asignado
                        consolidado[currSecc].Append("</div>"); //Fin Barra titulo registro

                            //consolidado[currSecc].Append("<div>");// Cuerpo de registro
                        consolidado[currSecc].Append("<div class='classBitacoraDiaria1'><img onerror='errorImg(this);' class='ImgSizeAgendaDiariaPrograma'  alt='Imagen Video' src='").Append(item.VideoImg).Append("'").Append(item.VideoReferencia.Trim().Equals(String.Empty) ? string.Empty : @" onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;'")
                                                     .Append(" data-numOT='").Append(item.AgseNume).Append("' ")
                                                     .Append(" data-file='").Append(item.VideoReferencia).Append("' ")
                                                     .Append(" data-img='").Append(item.VideoImg).Append("' /></div>");
                                consolidado[currSecc].Append("<label class='title varMarginTop'>AVANCES</label>");
                                consolidado[currSecc].Append("<Button type='button' class='btnOTADiaria' title='OT' data-val='").Append(item.AgseNume).Append("' data-oCve='").Append(item.OtraCvec).Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='btnshowOT_click(this);'></button>");                                
                                consolidado[currSecc].Append("<input type='checkBox' class='checkBoxAgendas' title='comprar' onchange='chkCarrito_changed(this);' onclick='chkCarrito_changed(this);' data-AgseOrig='" + item.AgseOrig + "' data-AgseNume='" + item.AgseNume + "' data-AgseTitu='" + item.AgseTitu + "' data-OtraCvec='" + item.OtraCvec + "' data-AgseFini='" + item.AgseFini.ToShortDateString() + "' data-SeccLlPr='" + item.SeccLlPr + "'  data-TinoLlPr='" + item.TinoLlPr + "'/>");
                                consolidado[currSecc].Append("<div class='txtCuentoBitDi'>").Append(item.Cuento).Append("</div>");
                                consolidado[currSecc].Append("<br />");
                                cadAvances = new StringBuilder();
                                if (item.AvancesCad != null)
                                {
                                    cont = 0;
                                    splitResult = item.AvancesCad.Trim().Split(separador, StringSplitOptions.RemoveEmptyEntries);
                                    foreach (string avanc in splitResult)
                                        if(!avanc.Trim().Equals(String.Empty))
                                            cadAvances.Append("-- ").Append(++cont).Append(" -- \n").Append(avanc).Append(" \n");
                                }
                                consolidado[currSecc].Append("<textArea class='txtAreaBitacoraDiaria' readonly='readonly'>").Append(cadAvances.ToString()).Append("</textArea>");
                            //consolidado[currSecc].Append("</div>");//Fin Cuerpo de registro

                        consolidado[currSecc].Append("</div>");//Fin Contenedor del registro
                    }

                    /*Se vacia la informacion recaudada dentro del div por orden alfabetico*/
                    foreach(String seccion in consolidado.Keys.OrderBy(n => n))
                        divContentResult.InnerHtml += consolidado[seccion].ToString();
                }

                if (hiddUpEq.Value.Equals("1")) {
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", updateEquipo() + " $('#MainContent_divContentResult').css('height', screen.height - 223);", true);
                    hiddUpEq.Value = "0";
                }
                else
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divContentResult').css('height', screen.height - 223);", true);
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
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
                if (int.Parse(hiddLocl.Value) != 36)
                    resultado = client.ObtieneDatosEquiporlocal(int.Parse(hiddLocl.Value));
                else
                    resultado = client.ObtieneDatosPantallaOT(Convert.ToInt32(Session["numUsuario"]), true, true);

                initJS.Append("<option value='0'>== SELECCIONE ==</option>");
                /*se generan los arrays con la informacion de reporteros, camarografos y editores*/
                if (resultado != null)
                {
                    if (resultado.listaReporteros != null)
                        foreach(wsFiatube.TDI_EMPL item in resultado.listaReporteros)
                            initJS.Append("<option value='").Append(item.EmpleadoLlavePrimaria).Append("'>").Append(item.EmpleadoNombre).Append("</option>");
                }

                result.Append(" $('#MainContent_divContentResult').css('height', screen.height - 223); $('#cmbReportero').empty(); $('#cmbReportero').append(\"").Append(initJS.ToString()).Append("\"); ");
            }
            catch (Exception ex)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " alertModal('Ocurrio un problema al obtener el equipo de trabajo de la local: " + ex.Message + "');", true);
                this.logError(ex);
            }

            return result.ToString();
        }
    }
}
