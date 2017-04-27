using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.Solicitud
{
    public partial class AutorizadorSolicitudes : BasePage
    {
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                this.cargaProgramas();
        }

        private void cargaProgramas() {
            try
            {
                StringBuilder cadena = new StringBuilder("<option value='0'>== TODOS ==</option>");
                wsFiatube.TDI_Programa[] programas = null;

                wsFiatube.WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
                programas = client.ConsultaProgramasFIA();

                if (programas != null) 
                    foreach (wsFiatube.TDI_Programa prog in programas)
                        cadena.Append("<option value='").Append(prog.CvePrograma).Append("'>").Append(prog.NombrePrograma).Append("</option>");

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " setProgData(\"" + cadena.ToString() + "\"); ", true);
            }
            catch(Exception ex){
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Ocurrio un problema al cargar los programas: " + ex.Message + "')", true);
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
            WebService_FIATubeSoapClient client;
            THE_SolicitudFormatoIpad[] result = null;

            try
            {
                client = new WebService_FIATubeSoapClient();

                //Validacion Agregada Por Alex Picon para filtrar las solicitudes en caso de ser de un EVDT
                if (hiddCveS.Value == String.Empty)
                    result = client.ConsultaSolicitudFormato(Convert.ToInt32(hiddProg.Value), Convert.ToInt32(hiddSecc.Value), Convert.ToDateTime(hiddFecI.Value), Convert.ToDateTime(hiddFecF.Value), int.Parse(hiddLocl.Value));
                else
                    result = client.ConsultaSolicitudFormato(0, 0, Convert.ToDateTime(hiddFecI.Value), Convert.ToDateTime(hiddFecF.Value), int.Parse(hiddLocl.Value));

                /*Se carga el grid de resultados*/
                this.llenarSolicitudes(result);
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        /// <summary>
        /// LLena el grid de solicitudes con la informacion obtenida.
        /// </summary>
        private void llenarSolicitudes(THE_SolicitudFormatoIpad[] solicitudes) 
        {
            StringBuilder contenido = new StringBuilder();

            try
            {
                divContentResult.InnerHtml = string.Empty;
                if (solicitudes != null)
                {
                    /*Se crea cada uno de los contenedores de los registros*/
                    foreach (THE_SolicitudFormatoIpad item in solicitudes) 
                    {
                        contenido.Append("<div class='divContainerAutorizador'>"); //contenedor principal de registro

                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveSolicitud.CveSolicitud).Append("</label>"); // Solicitud
                        contenido.Append(@"<label class='divContentAutorizador' data-value='").Append(item.CveSolicitud.CveOrdenTrabajo).Append(@"' data-oCve='").Append(item.CveSolicitud.ClaveOT).Append(@"' onMouseOver=""this.style.cursor='pointer'"" onclick='showData_click(this);'>").Append(item.CveSolicitud.ClaveOT).Append("</label>"); // OT
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveSolicitud.Titulo).Append("</label>"); // Titulo
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveSolicitud.Objetivo).Append("</label>"); // Descripcion
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CvePrograma.NombrePrograma).Append("</label>"); // Programa
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveFormato.Descripcion).Append("</label>"); // Formato
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveSolicitud.CveCliente.NombreDescripcion).Append("</label>"); // Cliente
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveSolicitud.Local.LocalDescripcion).Append("</label>"); // Local
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.CveSolicitud.FechaSolicitud.ToString("dd/MM/yyyy")).Append("<BR />").Append(item.CveSolicitud.FechaSolicitud.ToLongTimeString()).Append("</label>"); // Fecha de solicitud
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.FechaCompra.ToString("dd/MM/yyyy")).Append("</label>"); // Fecha de Agenda
                        contenido.Append("<label class='divContentAutorizador'>").Append(item.EstatusTexto).Append("</label>"); // Estatus
                        
                        if (item.VisibilidadBotonAutoriza) // Autorizar
                            contenido.Append("<button class='btnAutorizar' type='button' data-value='").Append(JsonConvert.SerializeObject(item, Formatting.Indented)).Append("' onclick='btnAutoriza_Click(this);' title='Autorizar'></button>");
                        else
                            contenido.Append("<text class='divContentAutorizador'>").Append("</text>");

                        if (item.VisibilidadBotonRechaza) // Rechazar
                            contenido.Append("<button class='btnRechazar' type='button' data-value='").Append(JsonConvert.SerializeObject(item, Formatting.Indented)).Append("' onclick='btnRechaza_Click(this);' title='Rechazar'></button>");
                        else
                            contenido.Append("<text class='divContentAutorizador'></text>"); 

                        contenido.Append("</div>"); // fin contenedor principal de registro
                    }

                    divContentResult.InnerHtml += contenido.ToString();
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#MainContent_divContentResult').css('height', screenHgt.toString() + 'px');", true);
                }
            }
            catch (Exception ex) {
                this.logError(ex);
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}