using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;

namespace FIATubeHtml5.Pages.OT
{
    public partial class NuevoCable : BasePage
    {
        private bool isEdit = false;

        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
                LoadScreenControls();
        }

        /// <summary>
        /// Loads the screen controls.
        /// </summary>
        private void LoadScreenControls() 
        {
            ListItem lstItem;
            TDI_Seccion seccion;
            TDI_EMPL[] reporteros;
            Secciones[] secciones;
            THE_CableIpad[] cable = null;
            WebService_FIATubeSoapClient client;

            try
            {
                client = new WebService_FIATubeSoapClient();

                if (Request.QueryString["CveCable"] != null && Request.QueryString["CveCable"] != string.Empty && Convert.ToInt32(Request.QueryString["CveCable"]) > 0)
                {
                    isEdit = true;
                    /*Se obtiene la informacion del cable*/
                    cable = client.ConsultaCable(Convert.ToInt32(Request.QueryString["CveCable"]));
                }
                
                /*Se obtiene la informacion de los reporteros*/
                reporteros = client.GetReporterosList();
                cmbReporteros.Items.Add(new ListItem("== SELECCIONE ==", "-1"));
                if(reporteros != null)
                    foreach (TDI_EMPL item in reporteros)
                    {
                        lstItem = new ListItem(item.EmpleadoNombre, item.EmpleadoLlavePrimaria.ToString());
                        if (isEdit && cable != null && item.EmpleadoLlavePrimaria == Convert.ToInt32(cable[0].CveEmpl))
                            lstItem.Selected = true;
                        cmbReporteros.Items.Add(lstItem);
                    }

                /*Se obtiene la informacion de las secciones*/
                if (this.ValidaMultiSeccion())
                {
                    int idseccion = !isEdit ? Convert.ToInt32(Session["UserSeccion"]) : (cable != null && cable.Count() > 0) ? cable[0].CveSecc.CveSeccion : 0;

                    cmbSecciones.Visible = true;
                    txtSeccion.Visible = false;
                    secciones = client.getSecciones(string.Empty, string.Empty);
                    if(secciones != null)
                        foreach (Secciones item in secciones) {
                            lstItem = new ListItem(item.SeccDesc, item.SeccLlPr.ToString());
                            if (idseccion == item.SeccLlPr)
                            {
                                lstItem.Selected = true;
                                hidSecc.Value = item.SeccLlPr.ToString();
                            }
                            cmbSecciones.Items.Add(lstItem);
                        }
                }
                else 
                {
                    cmbSecciones.Visible = false;
                    txtSeccion.Visible = true;

                    seccion = client.ObtieneSeccionByIdEmpleado(Convert.ToInt32(Session["numUsuario"]));
                    if (seccion != null)
                    {
                        txtSeccion.InnerText = seccion.NombreSeccion.ToUpper();
                        hidSecc.Value = seccion.CveSeccion.ToString();
                    }
                }

                /*Si es edicion se asignan los valores de los demas controles*/
                if (isEdit && cable != null && cable.Count() > 0)
                {
                    txtTitulo.Value = cable[0].Titulo;
                    txtDescripcion.Value = cable[0].Descripcion;
                    txtAvance.Value = cable[0].Avance;
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