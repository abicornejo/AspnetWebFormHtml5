using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.OT
{
    public partial class TeasersyBumpers : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public void btnActualizar_Click(Object sender, EventArgs e) 
        {
            Int32 cvePrograma;
            DateTime fechaCreacion;
            wsFiatube.WebService_FIATubeSoapClient client = null;
            wsFiatube.THE_OrdenTrabajoIpad[] resultado = null;
            wsFiatube.ArrayOfString ListaTipoDato = new wsFiatube.ArrayOfString();
            Dictionary<string, string> NumTotalDatos = new Dictionary<string, string>();

            try
            {
                /*Se guarda la informacion*/
                try { 
                    fechaCreacion = Convert.ToDateTime(hiddFec.Value); 
                }
                catch (Exception) { 
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar una fecha v&aacute;lida.');", true); 
                    return; 
                }

                if (fechaCreacion.CompareTo(DateTime.Now.Date) < 0){
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('La fecha de transmisi&oacute;n no puede ser menor a la fecha actual.');", true);
                    return; 
                }

                try { 
                    cvePrograma = Convert.ToInt32(hiddPrg.Value); 
                } 
                catch (Exception) {
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar un programa v&aacute;lido.');", true);
                    return;
                }

                if (txtTeasers.Text.Trim() != "" && txtTeasers.Text.Trim() != "0"){
                    NumTotalDatos.Add("TEASER ", txtTeasers.Text.Trim());
                    ListaTipoDato.Add("TEASER ");
                }
                if (txtBumpers.Text.Trim() != "0" && txtBumpers.Text.Trim() != ""){
                    NumTotalDatos.Add("BUMPER ", txtBumpers.Text.Trim());
                    ListaTipoDato.Add("BUMPER ");
                }
                if (txtPistas.Text.Trim() != "0" && txtPistas.Text.Trim() != ""){
                    NumTotalDatos.Add("PISTA ", txtPistas.Text.Trim());
                    ListaTipoDato.Add("PISTA ");
                }
                if (txtEnlaceH.Text.Trim() != "0" && txtEnlaceH.Text.Trim() != ""){
                    NumTotalDatos.Add("ENLACE HELICOPTERO  ", txtEnlaceH.Text.Trim());
                    ListaTipoDato.Add("ENLACE HELICOPTERO  ");
                }
                if (txtPromos.Text.Trim() != "0" && txtPromos.Text.Trim() != ""){
                    NumTotalDatos.Add("PROMO ", txtPromos.Text.Trim());
                    ListaTipoDato.Add("PROMO ");
                }
                if (txtCortinillas.Text.Trim() != "0" && txtCortinillas.Text.Trim() != ""){
                    NumTotalDatos.Add("CORTINILLA ", txtCortinillas.Text.Trim());
                    ListaTipoDato.Add("CORTINILLA ");
                }
                if (txtRompecortes.Text.Trim() != "0" && txtRompecortes.Text.Trim() != ""){
                    NumTotalDatos.Add("ROMPECORTE ", txtRompecortes.Text.Trim());
                    ListaTipoDato.Add("ROMPECORTE ");
                }
                if (txtFotoportada.Text.Trim() != "0" && txtFotoportada.Text.Trim() != ""){
                    NumTotalDatos.Add("FOTOPORTADA ", txtFotoportada.Text.Trim());
                    ListaTipoDato.Add("FOTOPORTADA ");
                }
                if (txtEnlaceMoto.Text.Trim() != "0" && txtEnlaceMoto.Text.Trim() != ""){
                    NumTotalDatos.Add("ENLACE MOTO ", txtEnlaceMoto.Text.Trim());
                    ListaTipoDato.Add("ENLACE MOTO ");
                }
                if (txtEnlaceHT.Text.Trim() != "0" && txtEnlaceHT.Text.Trim() != ""){
                    NumTotalDatos.Add("ENLACE HELICOPTERO-TRUCO ", txtEnlaceHT.Text.Trim());
                    ListaTipoDato.Add("ENLACE HELICOPTERO-TRUCO ");
                }
                if (txtEnlaceMotoT.Text.Trim() != "0" && txtEnlaceMotoT.Text.Trim() != ""){
                    NumTotalDatos.Add("ENLACE MOTO-TRUCO ", txtEnlaceMotoT.Text.Trim());
                    ListaTipoDato.Add("ENLACE MOTO-TRUCO ");
                }

                if (NumTotalDatos.Count == 0) {
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar al menos un tipo de OT a generar.');", true);
                    return;
                }

                wsFiatube.ArrayOfString[] numTotDatos = new wsFiatube.ArrayOfString[NumTotalDatos.Count];
                int contador = 0;
                wsFiatube.ArrayOfString aux;
                foreach (string clave in NumTotalDatos.Keys)
                {
                    aux = new wsFiatube.ArrayOfString();
                    aux.Add(clave);
                    aux.Add(NumTotalDatos[clave]);
                    numTotDatos[contador] = aux;
                    contador++;
                }
                
                /*Se crea la coleccion de parametros a enviar*/
                wsFiatube.ArrayOfString[] initParams = new wsFiatube.ArrayOfString[5];
                for (int i = 0; i < 5; i++)
                    initParams[i] = new wsFiatube.ArrayOfString();

                initParams[0].Add("NumUsuario");
                initParams[0].Add(Session["numUsuario"].ToString());
                initParams[1].Add("UserName");
                initParams[1].Add(Session["UserName"].ToString());
                initParams[2].Add("UserIP");
                initParams[2].Add(Session["userIP"].ToString());
                initParams[3].Add("UserDomain");
                initParams[3].Add(Session["userDomain"].ToString());
                initParams[4].Add("UserMachineName");
                initParams[4].Add(Session["userMachineName"].ToString());


                client = new wsFiatube.WebService_FIATubeSoapClient();
                resultado = client.GuardaOTTeaserYBumper(initParams, numTotDatos, ListaTipoDato, cvePrograma.ToString(), fechaCreacion);

                /*Se actualiza la tabla de resultados*/
                updateScreenData(resultado);

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "resetForm();", true);
            }
            catch (Exception ex) {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('" + ex.Message + "');", true);
                this.logError(ex);
            }
        }

        private void updateScreenData(wsFiatube.THE_OrdenTrabajoIpad[] data) {
            StringBuilder contenido = new StringBuilder();

            divResultados.InnerHtml = string.Empty;
            foreach (wsFiatube.THE_OrdenTrabajoIpad item in data) {
                contenido.Append("<div>"); // contenedor de Fila

                contenido.Append("<div class='divOTTYBContent'><label>").Append(item.ClaveOrdenTrabajo).Append("</label></div>");
                contenido.Append("<div class='divTITULOTYBContent'><label>").Append(item.Titulo).Append("</label></div>");

                contenido.Append("</div>");
            }
            divResultados.InnerHtml = contenido.ToString();
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}