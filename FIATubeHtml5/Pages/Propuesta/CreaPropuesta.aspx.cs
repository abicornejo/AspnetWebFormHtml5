using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using FIATubeHtml5.wsFiatube;
using System.Web.Services;

namespace FIATubeHtml5.Pages.Propuesta
{
    public partial class CreaPropuesta : BasePage 
    {

        WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
        
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        /// <summary>
        /// Handles the Click event of the btnUpdateEquipo control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnUpdateEquipo_Click(Object sender, EventArgs e)
        {
            /*Se carga la informacion del autocomplete de reporteros*/
            int local = 0;
            try { local = int.Parse(hiddLocl.Value); }
            catch (Exception) {
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "alertModal('Debe especificar una local v&aacute;lida.');", true);
            }

            getInfoReporteros(local);
        }

        /// <summary>
        /// Gets the info reporteros.
        /// </summary>
        private void getInfoReporteros(int loclId)
        {
            try
            {
                PantallaOT result;
                IList<TDI_EMPL> reporteros = null;
                StringBuilder script = new StringBuilder(@" availableReps = [ ");

                /*Se realiza la solicitud de reporteros al WS de FIATUBE*/
                WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
                result = client.ObtieneDatosEquiporlocal(loclId);

                if (result != null)
                    reporteros = result.listaReporteros;
                
                /*Se recorre la lista y se genera el codigo JavaScript a ejecutar para asignar el valor a el autocomplete de reporteros*/
                if (reporteros != null)
                {
                    
                    foreach (TDI_EMPL reportero in reporteros)
                        script.Append("{label:\"").Append(reportero.EmpleadoNombre.Trim().ToUpper()).Append("\", value:'").Append(reportero.EmpleadoLlavePrimaria.ToString()).Append("', icon:'").Append(reportero.EmpleadoNumero.ToString()).Append("'},");
                    //script.Append("{label:\"").Append(reportero.EmpleadoNombre.Trim().ToUpper()).Append("\", value:").Append(reportero.EmpleadoLlavePrimaria).Append("},");
                    script.Remove(script.Length - 1, 1);
                }
                script.Append("]; ");

                /*Se registra el Script para que sea ejecutado por el cliente*/
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", script.ToString() + " applyEvents(); ", true);
                myHidden.Value = script.ToString();
            }
            catch (Exception ex)
            {
                logError(ex);
                
            }
        }
               

        [WebMethod]
        public static string compraPropuesta(int idProg, int idFmto, int idRep, int idProp, string fechaCarr, THE_LogTransacciones Tran)
        {
            WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();

            try
            {
                CompraPropuestaIpad[] CompraPropuesta = new CompraPropuestaIpad[1];
                TDI_ProgramaEmpleado Empleado = new TDI_ProgramaEmpleado();
                TDI_EMPL oEmpleado = new TDI_EMPL();
                TDI_ProgramaEmpleado Programa = new TDI_ProgramaEmpleado();
                TDI_Programa oPrograma = new TDI_Programa();
                TDI_PropuestaIpad oPropuesta = new TDI_PropuestaIpad();
                TDI_Formato oFormato = new TDI_Formato();
                TDI_SeccionFormato Formato = new TDI_SeccionFormato();


                if (idProg != 0)
                    oPrograma.CvePrograma = idProg;
                else
                    throw new Exception("Seleccione un programa para poder comprar.");

                if (idFmto != 0)
                    oFormato.CveFormato = idFmto;
                else
                    throw new Exception("Seleccione un Formato para poder comprar.");


                oEmpleado.EmpleadoLlavePrimaria = idRep;
                oPropuesta.CvePropuesta = idProp;

                Empleado.CveEmpleado = oEmpleado;
                Programa.CvePrograma = oPrograma;
                Formato.CveFormato = oFormato;

                CompraPropuesta[0] = new CompraPropuestaIpad();
                CompraPropuesta[0].CveProgramaEmpleado = Empleado;
                CompraPropuesta[0].CvePropuesta = oPropuesta;
                CompraPropuesta[0].CveSeccionFormato = Formato;
                CompraPropuesta[0].CveProgramaEmpleado = Programa;
                CompraPropuesta[0].FechaCompra = Convert.ToDateTime(fechaCarr);



                string OT = client.CompraPropuestaRegresaOT(CompraPropuesta, idRep.ToString(), Tran);
                if (OT != "0")
                {
                    return OT.ToString();

                }
                else
                {
                    
                    throw new Exception("Ocurrio un problema al realizar la compra de la propuesta.");
                }
            }
            catch ( Exception ex)
            {
                return ex.Message;
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}