using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Web.Services;

namespace FIATubeHtml5.Pages.Evaluacion
{
    public partial class NotasPorEvaluar : BasePage
    {
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {

        }


        /// <summary>
        /// Buscars the evaluacion.
        /// </summary>
        /// <param name="sender">The sender.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void buscarEvaluacion_click(object sender, EventArgs e) 
        {
            int local = 0, programa = 0;
            DateTime fecha = default(DateTime);
            wsFiatube.THE_Evaluacion[] evaluadas = null;
            wsFiatube.THE_Evaluacion[] transmitidas = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;

            try
            {
                /*Se valida la informacion de entrada*/
                try { local = int.Parse(hdfLocl.Value); }
                catch(Exception){ ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('* Es necesario seleccionar una Local.<BR />')", true); }
                try { programa = int.Parse(hdfPrgm.Value); }
                catch(Exception){ ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('* Es necesario seleccionar un Programa.<BR />')", true); }
                try { fecha = Convert.ToDateTime(hdfDate.Value); }
                catch (Exception) { ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('* Debe seleccionar una fecha v&aacute;lida.<BR />')", true); }

                /*Se obtienen los datos correspondientes*/
                client = new wsFiatube.WebService_FIATubeSoapClient();

                transmitidas = client.getNotasPorEvaluar(programa, fecha);
                //transmitidas = client.ObtenerOtsTransmitidas(programa.ToString(), fecha.ToString("dd/MM/yyyy"));
                evaluadas = client.obtenerNotasEvaluadas(programa, fecha);
                //evaluadas = client.ObtenerOtsEvaluadas(programa.ToString(), fecha.ToString("dd/MM/yyyy"));

                /*Se pinta actualiza la pantalla con los nuevos datos*/
                creaTablaTransmitidas(transmitidas);
                creaTablaEvaluadas(evaluadas);
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " cargaCombos(); ", true);
            }
            catch (Exception ex) {
                this.logError(ex);
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Ocurrio un problema al actualizar la pantalla: '" + ex.Message + ")", true);
            }
        }

        /// <summary>
        /// Crea la tabla de evaluaciones
        /// </summary>
        /// <param name="evaluadas">Las evaluadas.</param>
        private void creaTablaEvaluadas(wsFiatube.THE_Evaluacion[] evaluadas)
        {
            int cont = 1;
            StringBuilder contenido = new StringBuilder();

            try
            {
                divContentEvaluadas.InnerHtml = string.Empty;

                if (evaluadas != null)
                {
                    foreach (wsFiatube.THE_Evaluacion item in evaluadas)
                    {
                        contenido.Append("<div data-prg='").Append(item.CvePrograma).Append("' data-dte='").Append(SerializeObjectIntoJson(Convert.ToDateTime(item.Fecha))).Append("' data-cveO='").Append(item.OtraLLav).Append("' data-row='").Append(cont).Append("'>");  // Contenedor de fila

                        contenido.Append("<div class='divTblEvaluacionContent2 varEvaluacionCons'>").Append(cont).Append("</div>"); //Consecutivo de fila
                        contenido.Append("<div class='divTblEvaluacionContent2 varEvaluacionDel'>").Append("<button type='button' class='btnEliminarEvaluacion' onclick='deleteRow(this);'></button>").Append("</div>"); // Boton eliminar
                        contenido.Append("<div class='divTblEvaluacionContent2Lg'>").Append("<b>").Append(item.OtraCve).Append("</b> - ").Append(item.OtraTitu).Append("</div>"); // OT
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'>").Append(item.Empleado == null || item.Empleado == "" ? "&nbsp;" : item.Empleado).Append("</div>"); // Reportero
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'><select onchange='cmbFmtoChanged(this);' data-fmto='").Append(item.CveFormato).Append("' class='cmbFmtoEval'></select></div>"); // Formato
                        contenido.Append("<div class='divTblEvaluacionContent2Lg'>")
                            .Append("<input id='rbtnEExc").Append(cont).Append(@"' type='radio' onclick='updateRowEvaluadas(this, ""E"");' ").Append(item.Evaluacion == 1 ? "checked='checked'" : String.Empty).Append(" name='eval").Append(cont).Append("' value='1' data-cal='Muy bien'><label for='rbtnEExc").Append(cont).Append("'>Excelente</label>")
                            .Append("<input id='rbtnEBie").Append(cont).Append(@"' type='radio' onclick='updateRowEvaluadas(this, ""E"");' ").Append(item.Evaluacion == 2 ? "checked='checked'" : String.Empty).Append(" name='eval").Append(cont).Append("' value='2' data-cal='Suficiente'><label for='rbtnEBie").Append(cont).Append("'>Bien</label>")
                            .Append("<input id='rbtnEMal").Append(cont).Append(@"' type='radio' onclick='updateRowEvaluadas(this, ""E"");' ").Append(item.Evaluacion == 3 ? "checked='checked'" : String.Empty).Append(" name='eval").Append(cont).Append("' value='3' data-cal='Mal'><label for='rbtnEMal").Append(cont).Append("'>Mal</label>");
                        contenido.Append("</div>"); // Evaluacion
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'><button class='btnComentarioEvaluacion' onclick='openCommentModal(this);' id='btnCommE").Append(cont).Append("' type='button'></button></div>"); // Comentario
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'><label id='lblPrelimE").Append(cont).Append("'>").Append(item.Evaluacion == 1 ? "Muy Bien" : item.Evaluacion == 2 ? "suficiente" : item.Evaluacion == 3 ? "Mal" : "&nbsp;").Append("</label></div>"); // calif. preliminar
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'>").Append(item.Hora == string.Empty ? "&nbsp;" : item.Hora).Append("</div>"); // H. Trans.
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'>").Append("&nbsp;").Append("</div>"); // Califico
                        contenido.Append("<div class='divTblEvaluacionContent2Sm'>").Append("&nbsp;").Append("</div>"); // apelacion

                        contenido.Append("</div>");
                        cont++;
                    }

                    divContentEvaluadas.InnerHtml = contenido.ToString();
                }
            }
            catch (Exception ex) {
                this.logError(ex);
                throw ex;
            }
        }

        private void creaTablaTransmitidas(wsFiatube.THE_Evaluacion[] transmitidas)
        {
            int cont = 1;
            StringBuilder contenido = new StringBuilder();

            try
            {
                divContentPorEval.InnerHtml = string.Empty;

                if (transmitidas != null)
                {
                    foreach (wsFiatube.THE_Evaluacion item in transmitidas)
                    {
                        contenido.Append("<div data-prg='").Append(item.CvePrograma).Append("' data-dte='").Append(SerializeObjectIntoJson(Convert.ToDateTime(item.Fecha))).Append("' data-cveO='").Append(item.OtraLLav).Append("' data-row='").Append(cont).Append("'>");  // Contenedor de fila

                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacionCons'>").Append(cont).Append("</div>"); //Consecutivo de fila
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacionDel'>").Append("<button type='button' class='btnEliminarEvaluacion' onclick='deleteRow(this);'></button>").Append("</div>"); // Boton eliminar
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacionRep'>").Append("<b>").Append(item.OtraCve).Append("</b> - ").Append(item.OtraTitu).Append("</div>"); // OT
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacionRep'>").Append(item.Empleado == null || item.Empleado == "" ? "&nbsp;" : item.Empleado).Append("</div>"); // Reportero
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacion'><select onchange='cmbFmtoChanged(this);' data-fmto='").Append(item.CveFormato).Append("' class='cmbFmtoEval'></select></div>"); // Formato
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacionRep'>")
                            .Append("<input id='rbtnExc").Append(cont).Append(@"' type='radio' onclick='updateRowEvaluadas(this, ""PE"");' name='eval").Append(cont).Append("' value='1' data-cal='Muy bien'><label for='rbtnExc").Append(cont).Append("'>Excelente</label>")
                            .Append("<input id='rbtnBie").Append(cont).Append(@"' type='radio' onclick='updateRowEvaluadas(this, ""PE"");' name='eval").Append(cont).Append("' value='2' data-cal='Suficiente'><label for='rbtnBie").Append(cont).Append("'>Bien</label>")
                            .Append("<input id='rbtnMal").Append(cont).Append(@"' type='radio' onclick='updateRowEvaluadas(this, ""PE"");' name='eval").Append(cont).Append("' value='3' data-cal='Mal'><label for='rbtnMal").Append(cont).Append("'>Mal</label>");
                        contenido.Append("</div>"); // Evaluacion
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacion'><button class='btnComentarioEvaluacion' onclick='openCommentModal(this);' disabled='disabled' id='btnCommPE").Append(cont).Append("' type='button'></button></div>"); // Comentario
                        contenido.Append("<div class='divTblEvaluacionContent varEvaluacion'><label id='lblPrelimPE").Append(cont).Append("'></label></div>"); // Calif. preliminar

                        contenido.Append("</div>");
                        cont++;
                    }

                    divContentPorEval.InnerHtml = contenido.ToString();
                }
            }
            catch (Exception ex)
            {
                this.logError(ex);
                throw ex;
            }
        }

        [WebMethod]
        public static void deleteEvaluation(wsFiatube.THE_ReaiIpad toUpd) {
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();
            client.ActualizarStatusReaiEliminar(toUpd);
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}