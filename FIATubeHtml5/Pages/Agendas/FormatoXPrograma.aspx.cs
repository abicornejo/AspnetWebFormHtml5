using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Xml;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages.Agendas
{
    public partial class FormatoXPrograma : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        /// <summary>
        /// Gets the path.
        /// </summary>
        /// <returns></returns>
        protected override string getPath()
        {
            return this.GetType().FullName;
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        //public void btnActualizar_Click(Object sender, EventArgs e) 
        //{
        //    int programa = 0;
        //    DateTime fecha = default(DateTime);
        //    wsFiatube.THE_FormatosGuion[] resultado = null;
        //    wsFiatube.WebService_FIATubeSoapClient client = null;

        //    try
        //    {
        //        client = new wsFiatube.WebService_FIATubeSoapClient();

        //        try { programa = int.Parse(hiddPrg.Value); }
        //        catch (Exception) { ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar un programa v&aacute;lido.');", true); return; }

        //        try { fecha = Convert.ToDateTime(hiddFec.Value); }
        //        catch (Exception) { ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Debe especificar una fecha v&aacute;lida.');", true); return; }

        //        /*Se obtiene la informacion correspondiente al dia y programa seleccionados*/
        //        resultado = client.ConsultaFormatosGuion(programa, fecha, this.GenerateTransacWsFiatube());

        //        createTableGuiones(resultado);

        //        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " resizeContent(); ", true);
        //    }
        //    catch (Exception ex) {
        //        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Ocurrio un problema al obtener la informacion del  d&iacute;a: " + ex.Message + "');", true);
        //        this.logError(ex);
        //    }
        //}

        /// <summary>
        /// Crea la tabla de guiones.
        /// </summary>
        //private void createTableGuiones(wsFiatube.THE_FormatosGuion[] data) 
        //{
        //    int cont = 0;
        //    StringBuilder contenido = new StringBuilder();
        //    StringBuilder contenido2 = null;
        //    divGridContent.InnerHtml = string.Empty;
        //    StringBuilder btSolicitudMaterial;

        //    if (data != null) {
        //        foreach (wsFiatube.THE_FormatosGuion item in data) {
        //            try
        //            {
        //                contenido2 = new StringBuilder();
        //                if (item.VideoID != null && !item.VideoID.Trim().Equals(String.Empty) && item.NumOT != 0)
        //                {
        //                    btSolicitudMaterial = new StringBuilder();
        //                    if (item.MuestraSolicitud)
        //                    {
        //                        FIATubeHtml5.wsFiatube.AgendaOT agenda = new FIATubeHtml5.wsFiatube.AgendaOT();
        //                        agenda.CveLocal = item.CveLocal.ToString();
        //                        agenda.AgseNume = item.NumOT;
        //                        agenda.OtraCvec = item.CveOT;

        //                        btSolicitudMaterial.Append(@"<input id=""btnSolicitar"" type=""button"" class=""SolicitaMat"" onclick='solMat_click(this);' data-agenda='").Append(JsonConvert.SerializeObject(agenda)).Append("' />");
        //                    }

        //                    /*Se genera contenido para las N columnas de la tabla*/
        //                    contenido2.Append("<div>");

        //                    contenido2.Append("<div class='").Append(item.MuestraSolicitud ? "divContentFormatoXProg2" : "divContentFormatoXProg").Append("'>").Append("<img class='imgFormatoXProg' data-idx='").Append(cont).Append("' data-vid='").Append(item.VideoData.IdFileName).Append("' data-nOT='").Append(item.NumOT).Append("' src='").Append(item.VideoData.Imagen.Trim().Equals(String.Empty) ? "../../Images/noimage.png" : item.VideoData.Imagen.ToUpper().Contains("DISPONIBLE") ? "../../Images/materialDisponible.png" : item.VideoData.Imagen.Trim()).Append("' onclick='videoImage_click(this);' onError='errorImg(this);' title='Ver video' />").Append(btSolicitudMaterial.ToString()).Append("</div>"); //Video
        //                    contenido2.Append("<div class='").Append(item.MuestraSolicitud ? "divContentFormatoXProg2" : "divContentFormatoXProg").Append("'><label>").Append(item.Titulo).Append("</label></div>"); //Titulo
        //                    contenido2.Append("<div class='").Append(item.MuestraSolicitud ? "divContentFormatoXProg2" : "divContentFormatoXProg").Append("'><label>").Append(item.VideoID).Append("</label></div>"); //VideoId
        //                    contenido2.Append("<div class='").Append(item.MuestraSolicitud ? "divContentFormatoXProg2" : "divContentFormatoXProg").Append("'><label>").Append(item.TiempoAudio).Append(" secs.</label></div>"); //Tiempo Audio
        //                    contenido2.Append("<div class='").Append(item.MuestraSolicitud ? "divContentFormatoXProg2" : "divContentFormatoXProg").Append("'><label>").Append(item.Formato).Append("</label></div>"); //Formato
        //                    contenido2.Append("<div class='").Append(item.MuestraSolicitud ? "divContentFormatoXProg2" : "divContentFormatoXProg").Append("'><label>").Append(item.HoraTrans).Append("</label></div>"); //Hora trans.

        //                    /*Este div no se muestra, solo me sirve como contenedor para el contenido de los guiones*/
        //                    contenido2.Append("<div id='divHiddGuion_").Append(cont).Append("' style='display:none;'>").Append(parseGuion(item.Guion)).Append("</div>");

        //                    contenido2.Append("</div>");
        //                    cont++;
        //                }
        //                else
        //                {
        //                    /*Se genera una sola columna para el titulo*/
        //                    contenido2.Append("<div class='divContentFormatoXProgUna'><label>").Append(item.Titulo).Append("</label></div>"); // Titulo
        //                }

        //                contenido.Append(contenido2);
        //            }
        //            catch (Exception) { }
        //        }

        //        divGridContent.InnerHtml = contenido.ToString();   
        //    }
        //}

        private string parseGuion(string data) {
            string body = "";
            string aese = "";
            string aux;
            XmlDocument xmlDoc  = new XmlDocument();
            XmlDocument xmlDocBody = new XmlDocument();

            /*Se eliminan los id's mal formados que no permiten leer correctamente el xml*/
            body = data.Substring(0, data.IndexOf("</body>") + 7);
            while (body.IndexOf("<a idref=") > 0) {
                aux = body.Substring(body.IndexOf("<a idref="));
                aux = aux.Substring(0, aux.IndexOf('>') + 1);
                body = body.Replace(aux, "");
            }
            aese = data.Substring(data.IndexOf("</body>") + 7);
            while (aese.IndexOf("id=") > 0) {
                aux = aese.Substring(aese.IndexOf("id="));
                aux = aux.Substring(0, aux.IndexOf(">"));
                aese = aese.Replace(aux, "");
            }

            xmlDocBody.LoadXml(body);
            xmlDoc.LoadXml(aese);

            /*Se generan los divs a insertar dentro del div de guiones*/
            /*Parte derecha*/
            StringBuilder guionContent = new StringBuilder("<div class='divGuionGralDerecho'>");
            for (int i=0; i < xmlDoc.GetElementsByTagName("ae").Count; i++) {
                if (xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("mc").Count == 0)
                {
                    guionContent.Append("<div class='divGuionDerecho'>");
                    for (int j = 0; j < xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("ap").Count; j++)
                        if (j > 0)
                            try { guionContent.Append(xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("ap")[j].ChildNodes[0].InnerText).Append("<BR />"); }
                            catch (Exception) { };
                }
                else
                {
                    guionContent.Append("<div class='divGuionDerechoColor'>");
                    for (int j = 0; j < xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("ap").Count; j++)
                        if (j > 0)
                            try { guionContent.Append(xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("ap")[j].ChildNodes[0].InnerText).Append("<BR />"); }
                            catch (Exception) { };

                    for (int j = 0; j < xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("mc").Count; j++)
                        for (int z = 0; z < xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("mc")[j].SelectNodes("ap").Count; z++)
                                try { guionContent.Append(xmlDoc.GetElementsByTagName("ae")[i].SelectNodes("mc")[j].SelectNodes("ap")[z].ChildNodes[0].InnerText).Append("<BR />"); }
                                catch (Exception) { };
                }

                guionContent.Append("</div>");
            }
            guionContent.Append("</div>");

            /*Parte izquierda*/
            guionContent.Append("<div class='divGuionGralIzquierdo'>");
            for (int i=0; i < xmlDocBody.GetElementsByTagName("p").Count; i++) {
                if (xmlDocBody.GetElementsByTagName("p")[i].ChildNodes[0] != null && xmlDocBody.GetElementsByTagName("p")[i].ChildNodes[0].InnerText.Trim() != "")
                    guionContent.Append(xmlDocBody.GetElementsByTagName("p")[i].ChildNodes[0].InnerText.Trim()).Append("<BR />");
            }
            for (int i=0; i < xmlDocBody.GetElementsByTagName("cc").Count; i++) {
                if (xmlDocBody.GetElementsByTagName("cc")[i].ChildNodes[0] != null && xmlDocBody.GetElementsByTagName("cc")[i].ChildNodes[0].InnerText.Trim() != "")
                    guionContent.Append(xmlDocBody.GetElementsByTagName("cc")[i].ChildNodes[0].InnerText.Trim()).Append("<BR />");
            }

            guionContent.Append("</div>");

            return guionContent.ToString();
        }

        protected void BntDetonador_Click(object sender, EventArgs e)
        {
            char[] val1= {','};
            char[] val2 = { ':' };
            string[] values = this.HDAgenda.Value.Trim('{').Trim('}').Split(val1);
            wsFiatube.AgendaOT oAgendaOT = new wsFiatube.AgendaOT();
            oAgendaOT.OtraCvec = values[0].Split(val2)[1].Trim('\"');
            oAgendaOT.CveLocal = values[1].Split(val2)[1].Trim('\"');
            oAgendaOT.AgseNume = Convert.ToInt32(values[2].Split(val2)[1].Trim('\"'));
            //wsFiatube.AgendaOT oAgendaOT = JsonConvert.DeserializeObject<wsFiatube.AgendaOT>(this.HDAgenda.Value);
            Session["AgendaOT"] = oAgendaOT;
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " AbrirObtenerMateriales(); ", true);
        }
    }
}