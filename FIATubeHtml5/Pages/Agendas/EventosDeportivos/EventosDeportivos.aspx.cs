using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

namespace FIATubeHtml5.Pages.Agendas.EventosDeportivos
{
    public partial class EventosDeportivos : BasePage
    {
        /// <summary>
        /// Handles the Load event of the Page control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) { 
                /*Se carga de forma inicial la informacion de la pantalla*/
                hiddDate.Value = DateTime.Now.ToString("dd/MM/yyyy");
                btnActualizar_Click(null, null);
            }
        }

        /// <summary>
        /// Handles the Click event of the btnActualizar control.
        /// </summary>
        /// <param name="sender">The source of the event.</param>
        /// <param name="e">The <see cref="System.EventArgs"/> instance containing the event data.</param>
        protected void btnActualizar_Click(object sender, EventArgs e) 
        {
            DateTime temp;
            wsFiatube.THE_EventoDeportivoIpad[] result = null;
            wsFiatube.WebService_FIATubeSoapClient client = null;

            try 
            {
                temp = Convert.ToDateTime(hiddDate.Value);
                client = new wsFiatube.WebService_FIATubeSoapClient();

                /*Se obtienen los datos a cargar en pantalla*/
                result = client.ObtenerDatosMes(temp.Month.ToString(), temp.Year.ToString());

                /*Se genera el codigo html a mostrar en pantalla*/
                updateScreenData(result, temp);
                lblMesActual.InnerText = temp.ToString("MMMM DE yyyy").ToUpper();
            }
            catch(Exception ex){
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Ocurrio un problema al actualizar la informaci&oacute;n.');", true);
                this.logError(ex);
            }
        }

        private void updateScreenData(wsFiatube.THE_EventoDeportivoIpad[] data, DateTime theMonth) 
        {
            int theKey;
            int iniPos = 0, endPos = 0;
            string[] clases = new string[7];
            StringBuilder title = new StringBuilder();
            DateTime temp = new DateTime(theMonth.Year, theMonth.Month, 1);
            IDictionary<int, StringBuilder> content = new Dictionary<int, StringBuilder>();

            divGridAgenda.InnerHtml = string.Empty;

            clases[0] = "divDomingo";
            clases[1] = "divLunes";
            clases[2] = "divMartes";
            clases[3] = "divMiercoles";
            clases[4] = "divJueves";
            clases[5] = "divViernes";
            clases[6] = "divSabado";

            /*Se calcula la posicion inicial y la posicion final de los dias*/
            iniPos = (int)temp.DayOfWeek;
            endPos = (int)temp.AddMonths(1).AddDays(-1).DayOfWeek;

            /*Se calcula el contenido de cada uno de los dias*/
            while (temp.Month == theMonth.Month)
            {
                theKey = (int)temp.DayOfWeek;
                if(!content.Keys.Contains(theKey))
                    content.Add(new KeyValuePair<int, StringBuilder>(theKey, new StringBuilder()));
                /*Se generan los contenedores por dia*/
                content[theKey].Append("<div class='dayContainerEvtDptvo'>"); //Contenedor de Dia
                content[theKey].Append("<div><button type='button' onclick='openNewEvDptvo(this);' data-dte='").Append(temp.ToString("dd/MM/yyyy")).Append("'>").Append(temp.Day).Append("</button></div>"); // Boton de dia para creacion de nuevos eventos
                content[theKey].Append("<div>"); //Div de contenido de eventos existentes

                foreach (wsFiatube.THE_EventoDeportivoIpad item in data.Where<wsFiatube.THE_EventoDeportivoIpad>(n => temp >= n.dtFechaInicio && temp <= n.dtFechaFin))
                {
                    title.Remove(0, title.Length);
                    title.Append("T&iacute;tulo: ").Append(item.sTitulo).Append("\n");
                    title.Append("Hora inicio: ").Append(item.sHoraIni).Append("\n");
                    title.Append("Hora fin: ").Append(item.sHoraFin);
                    content[theKey].Append("<div><button type='button' onclick='openEvDptvo(this);' data-val='").Append(item.IdEvento).Append("' data-dte='").Append(temp.ToString("dd/MM/yyyy")).Append("' title='").Append(title.ToString()).Append("'>").Append(item.sTitulo).Append("</button></div>"); // Boton de evento en dia
                }

                content[theKey].Append("</div>");//Fin div de contenido de eventos existentes
                content[theKey].Append("</div>"); //Fin de contenedor de Dia

                temp = temp.AddDays(1);
            }

            StringBuilder aux = new StringBuilder();
            foreach (int day in content.Keys.OrderBy(n => n))
            {
                aux.Append("<div class='").Append(clases[day]).Append("'>");
                if (day < iniPos)
                    aux.Append("<div class='dayContainerEvtDptvo'></div>");
                aux.Append(content[day].ToString()).Append("</div>");
            }
            /*Se carga la informacion dentro del grid de contenido*/
            divGridAgenda.InnerHtml = aux.ToString();
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