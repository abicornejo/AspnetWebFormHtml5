using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using Azteca.Utility.Security;
using System.Web.Services;
using Newtonsoft.Json;
using FIATubeHtml5.wsFiatube;

namespace FIATubeHtml5.Pages.AvancesMonitoreo
{
    public partial class CapturaMonitoreo : BasePage
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
        /// Handles the Click event of the btnUpdateData control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnUpdateData_Click(Object sender, EventArgs e)
        {
            DateTime currDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            DateTime theDate = default(DateTime);
            wsFiatube.THE_Monitoreo[] result = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;

            try
            {
                try {
                    theDate = Convert.ToDateTime(dtFEve.Value);

                    if (currDate.CompareTo(theDate) > 0)
                    {
                        ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('La fecha no puede ser menor a la fecha actual.') ", true);
                        return;
                    }
                }
                catch(Exception){
                    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('Debe especificar un valor de fecha v&aacute;lido.') ", true);
                    return;
                }

                client = new wsFiatube.WebService_FIATubeSoapClient();
                result = client.ObtenerMonitoreosPorDia(theDate);

                /*Se genera el grid con la informacion correspondiente*/
                createGrid(result);
            }
            catch (Exception ex) {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('" + "Ocurrio un problema al actualizar la informaci&oacute;n: " + ex.Message + "') ", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Handles the Click event of the btnSendEdit control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnSendEdit_Click(Object sender, EventArgs e) {
            wsFiatube.THE_Monitoreo monitor;
            try
            {
                monitor = JsonConvert.DeserializeObject<wsFiatube.THE_Monitoreo>(new Azteca.Utility.Security.Rijndael().Transmute(hiddVal.Value, enmTransformType.intDecrypt));
                Session["DataMonitor"] = monitor;
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " parent.openModalUpdatable('AvancesMonitoreo/EditarMonitoreo.aspx', widhDivEditMonitor, heigthDivEditMonitor, 'Editar Monitoreo', this) ", true);
            }
            catch (Exception ex) {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alertModal ('" + "Ocurrio un problema al obtener la informaci&oacute;n a editar: " + ex.Message + "') ", true);
                this.logError(ex);
            }
        }

        /// <summary>
        /// Creates the grid.
        /// </summary>
        /// <param name="data">The data.</param>
        private void createGrid(wsFiatube.THE_Monitoreo[] data) 
        {
            Rijndael crypto = new Rijndael();
            StringBuilder contenido = new StringBuilder();

            /*Se limpia el contenido del div*/
            divMonitorContent.InnerHtml = String.Empty;

            if (data != null) {
                foreach (wsFiatube.THE_Monitoreo item in data) {
                    contenido.Append("<div data-pin='").Append( crypto.Transmute(this.SerializeObjectIntoJson(item), enmTransformType.intEncrypt)).Append("'>"); //div de fila

                    contenido.Append("<div>").Append(item.HoraEvento).Append("</div>"); // Columna Hora
                    contenido.Append("<div>").Append(item.TipoMonitoreoLlavPr.Descripcion).Append("</div>"); //Columna Tipo de Monitoreo
                    contenido.Append("<div>").Append(item.FuenteAgencia).Append("</div>"); // Columna Fuente/Agencia
                    contenido.Append("<div>").Append(item.Tema).Append("</div>"); //Columna Tema
                    contenido.Append("<div>").Append(item.Titulo).Append("</div>"); // Columna Titulo
                    contenido.Append("<div>").Append(item.Observacion).Append("</div>"); // Columna Observaciones
                    contenido.Append("<div><input type='checkbox' ").Append(item.Importancia ? "checked='checked'" : string.Empty).Append(" readonly='readonly' /></div>"); //Columna relevancia
                    contenido.Append("<div><button type='button' title='Editar' onclick='updateMonitoreo(this); return false;' /></div>"); // Columna Editar
                    contenido.Append("<div><button type='button' title='Eliminar' onclick='deleteMonitoreo(this);return false;'/></div>"); // Columna Eliminar

                    contenido.Append("</div>"); //Fin div de fila
                }

                divMonitorContent.InnerHtml = contenido.ToString();
            }
        }

        /// <summary>
        /// Deletes the monitor.
        /// </summary>
        /// <param name="data">The data.</param>
        /// <returns></returns>
        [WebMethod]
        public static bool deleteMonitor(String data) {
            bool result = false;
            wsFiatube.THE_Monitoreo monitor;
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();

            monitor = JsonConvert.DeserializeObject<wsFiatube.THE_Monitoreo>(new Azteca.Utility.Security.Rijndael().Transmute(data, enmTransformType.intDecrypt));
            result = client.EliminarMonitoreo(monitor);

            return result;
        }

        /// <summary>
        /// Saves the monitor.
        /// </summary>
        /// <param name="lista">The lista.</param>
        /// <returns></returns>
        [WebMethod]
        public static int saveMonitor(List<THE_Monitoreo> lista)
        {
            //wsFiatube.THE_Monitoreo valores = JsonConvert.DeserializeObject<wsFiatube.THE_Monitoreo[]>(lista);
            int result = -1;
            wsFiatube.WebService_FIATubeSoapClient client = new wsFiatube.WebService_FIATubeSoapClient();
            result = client.GuardaMonitoreo(lista.ToArray());

            return result;
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