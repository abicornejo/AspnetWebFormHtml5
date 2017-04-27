using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.AvancesMonitoreo
{
    public partial class ReporteAvancesMonitoreo : BasePage
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
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e) 
        {
            DateTime theDate;
            wsFiatube.AvanceMonitoreo[] result = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            
            try
            {
                /*Se valida que la fecha recibida sea una fecha valida*/
                if (hiddDate.Value != null && !hiddDate.Value.Trim().Equals(String.Empty))
                {
                    try { 
                        theDate = Convert.ToDateTime(hiddDate.Value);
                    }
                    catch(Exception){
                        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('Debe seleccionar una fecha v&aacute;lida.') ", true);
                        return;
                    }
                }
                else {
                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('Debe seleccionar una fecha v&aacute;lida.') ", true);
                    return;
                }

                /*Se realiza la consulta de informacion*/
                client = new wsFiatube.WebService_FIATubeSoapClient();
                result = client.GetAvancesMonitoreo(int.Parse(hiddFabr.Value), theDate);

                /*Se manda a cargar la informacion en pantalla*/
                createHtmlData(result);
            }
            catch (Exception ex) {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('" + "Ocurrio un problema al realizar la consulta: " + ex.Message + "') ", true);
                this.logError(ex);
            }
        }

        private void createHtmlData(wsFiatube.AvanceMonitoreo[] data) 
        {
            StringBuilder contenido = new StringBuilder();

            try 
            {
                /*Se limpia el grid antes de actualizar*/
                divContentResult.InnerHtml = String.Empty;
                if (data != null)
                {
                    foreach (wsFiatube.AvanceMonitoreo item in data)
                    {
                        contenido.Append("<div>"); //Div de Fila
                        contenido.Append("<div>").Append(item.Hora).Append("</div>"); // Columna de Hora
                        contenido.Append("<div data-orig='").Append(item.Origen).Append("' data-val='").Append(new Azteca.Utility.Security.Rijndael().Transmute(this.SerializeObjectIntoJson(item), Azteca.Utility.Security.enmTransformType.intEncrypt)).Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='openAdvanceWindow(this); return false;'>").Append(item.Titulo).Append("</div>"); // Columna de titulo
                        contenido.Append("<div>").Append(item.TituloOrigen).Append("</div>"); // Columna tipo monitoreo
                        contenido.Append("</div>"); // Fin div de fila
                    }

                    divContentResult.InnerHtml = contenido.ToString();
                }
            }
            catch (Exception ex)
            {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('" + "Ocurrio un problema al generar el Grid: " + ex.Message + "') ", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Handles the Click event of the btnOpenAdvance control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnOpenAdvance_Click(Object sender, EventArgs e) 
        {
            wsFiatube.AvanceMonitoreo value = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;

            try
            {
                value = JsonConvert.DeserializeObject<wsFiatube.AvanceMonitoreo>(new Azteca.Utility.Security.Rijndael().Transmute(hiddCurV.Value, Azteca.Utility.Security.enmTransformType.intDecrypt));
                Session["dataAdvRepMon"] = value;

                if (value.Origen.Equals("M"))
                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " parent.openModal('AvancesMonitoreo/AvancesMoniSoloLectura.aspx', widhDivAvaMonSLec, heigthDivAvaMonSLec, 'Avances por Monitoreo'); ", true);
                else if (value.Origen.Equals("O"))
                {
                    wsFiatube.Datos_PantallaOTIpad data = null;
                    client = new wsFiatube.WebService_FIATubeSoapClient();
                    data = client.ObtenerDatosPantallaOrdenTrabajo(value.LlaveFr);
                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " parent.openModal('OT/AvancesOT.aspx?advanceType=O&numOT=" + data.OTOrdenTrab[0].CveOrdenTrabajo + "&title=" + data.OTOrdenTrab[0].Titulo + "&oCve=" + data.OTOrdenTrab[0].ClaveOrdenTrabajo + "', widthAvancesOT, heigthAvancesOT, 'Avances OT: " + data.OTOrdenTrab[0].ClaveOrdenTrabajo + "'); ", true);
                }
                else if (value.Origen.Equals("P")) { 
                    wsFiatube.AgendaOT[] data = null;
                    client = new wsFiatube.WebService_FIATubeSoapClient();

                    data = client.getAgendaOTs(string.Empty, string.Empty, string.Empty, string.Empty, string.Empty, value.LlaveFr, string.Empty, string.Empty);
                    if (data != null && data.Length > 0) { 
                        /*Se quitan las que son replicas*/
                        var ListaAgendaSinReplica = from OT in data where OT.OtraRepl == "" select OT;

                        if(ListaAgendaSinReplica.Count() > 0)
                            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " parent.openModal('OT/AvancesOT.aspx?advanceType=P&numOT=" + ListaAgendaSinReplica.ElementAt(0).AgseNume + "&title=" + ListaAgendaSinReplica.ElementAt(0).AgseTitu + "&oCve=" + ListaAgendaSinReplica.ElementAt(0).AgseNume + "', widthAvancesOT, heigthAvancesOT, 'Avances de Propuesta: " + ListaAgendaSinReplica.ElementAt(0).AgseNume + "'); ", true);
                    }
                    else
                        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('No se encontro información para mostrar el avance.') ", true);
                }
                this.btnActualizar_Click(null, null);
            }
            catch(Exception ex){
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('" + "Ocurrio un problema al cargar la p&aacute;gina: " + ex.Message + "') ", true);
                this.logError(ex);
            }
        } 

        /// <summary>
        /// Gets the path.
        /// </summary>
        /// <returns></returns>
        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}