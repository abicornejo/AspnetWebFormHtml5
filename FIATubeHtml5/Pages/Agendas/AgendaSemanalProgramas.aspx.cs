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
    public partial class AgendaSemanalProgramas : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "$('#divGridAgenda').css('height', screen.height - 262);", true);
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        public void btnActualizar_Click(Object sender, EventArgs e)
        {
            updateScreenData();
        }

        /// <summary>
        /// Updates the screen data.
        /// </summary>
        private void updateScreenData() 
        { 
            DateTime fechaInicio;
            AgendaOTPrograma[] resultado = null;
            List<String> fechas = new List<string>();
            StringBuilder myDiv = new StringBuilder();
            List<StringBuilder> dias = new List<StringBuilder>();

            try
            {
                /*Se genera el arreglo de dias para el programa*/
                fechaInicio = Convert.ToDateTime(hiddFecIni.Value);
                for (int i = 0; i <= 6; i++)
                {
                    fechas.Add(fechaInicio.AddDays(i).ToString("dd/MM/yyyy"));
                    dias.Add(new StringBuilder(@"<div><label class=""openMdlAgDiaria"" data-fecha='").Append(fechaInicio.AddDays(i).ToString("dd/MM/yyyy")).Append("' ")
                        .Append("data-secc='").Append(hiddSecc.Value).Append("' ")
                        .Append("data-prog='").Append(hiddProg.Value).Append("' ")
                        .Append(">").Append(fechaInicio.AddDays(i).ToString("dddd, dd").ToUpper()).Append("</label></div>"));
                }

                WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
                resultado = client.ObtenAgendaPrograma(hiddProg.Value, hiddSecc.Value, string.Empty, string.Empty, hiddFecIni.Value, hiddFecFin.Value, 0);

                resultado = resultado.OrderBy(n => n.ClaveOT).ToArray<AgendaOTPrograma>();
                /*Se limpia la informacion del div de resultados*/
                if (resultado != null)
                    foreach (AgendaOTPrograma agenda in resultado)
                    {
                        myDiv.Append("<div style='background:").Append(agenda.ColorSeccion).Append(";margin:5px 5px 0 0; padding: 1px 0;border-radius: 5px;'>")
                            .Append(@"<div id='divItemAgenda' class=""divWeekItems"">")
                            .Append("<div><label style='color:").Append(agenda.ColorSeccion).Append(";'>").Append(agenda.ClaveOT == null ? string.Empty : agenda.ClaveOT.Replace("<", "&lt;").Replace(">", "&gt;")).Append("</label></div>")
                            .Append(@"<div><label data-numOT='").Append(agenda.CveOrdenTrabajo).Append(@"' data-oCve='").Append(agenda.ClaveOT).Append(@"' onclick='showData_click(this);' onMouseOver=""this.style.cursor='pointer'"">").Append(agenda.TituloOT == null ? string.Empty : agenda.TituloOT.Replace("<", "&lt;").Replace(">", "&gt;")).Append("</label></div>")
                            .Append(@"<div><img onerror='errorImg(this);' alt=""Sin Imagen"" width=""95"" height=""70"" src=""")
                            .Append((agenda.VideoImg == string.Empty || agenda.VideoImg.Equals("noImage")) ? "../../Images/noimage.png" : agenda.VideoImg)
                            .Append(@"""").Append(agenda.VideoReferencia.Equals(String.Empty) ? " " : @" onMouseOver=""this.style.cursor='pointer'"" onclick='imgVideo_click(this); return false;' ")
                            .Append(" data-numOT='").Append(agenda.CveOrdenTrabajo).Append("' ")
                            .Append(" data-cProg='").Append(agenda.CvePrograma).Append("' ")
                            .Append(" data-file='").Append(agenda.VideoReferencia).Append("' ")
                            .Append(" data-img='").Append(agenda.VideoImg).Append("' ")
                            .Append("/></div>")
                            .Append("<label>").Append(agenda.TipoNota == null ? string.Empty : agenda.TipoNota.ToUpper().Replace("<", "&lt;").Replace(">", "&gt;")).Append("</label>")
                            .Append("</div>")
                            .Append("</div>");

                        for (int i = 0; i < fechas.Count; i++)
                            if (agenda.FechaCompra.ToString("dd/MM/yyyy") == fechas[i])
                                dias[i].Append(myDiv.ToString());
                        myDiv.Clear();
                    }

                divLunes.InnerHtml = dias[0].ToString();
                divMartes.InnerHtml = dias[1].ToString();
                divMiercoles.InnerHtml = dias[2].ToString();
                divJueves.InnerHtml = dias[3].ToString();
                divViernes.InnerHtml = dias[4].ToString();
                divSabado.InnerHtml = dias[5].ToString();
                divDomingo.InnerHtml = dias[6].ToString();
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
