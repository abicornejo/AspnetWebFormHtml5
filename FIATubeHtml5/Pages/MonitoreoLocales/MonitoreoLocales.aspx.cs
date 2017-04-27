using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using FIATubeHtml5.recuperaVideo;
using FIATubeHtml5.ServicesAsmx;
using System.Text;
using System.Data;
using System.Collections;
using System.Windows.Controls;
using System.Web.Services;
using System.Web.UI.HtmlControls;


namespace FIATubeHtml5.Pages.MonitoreoLocales
{
    public partial class MonitoreoLocales : BasePage
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
            /*carga las listas de matsol y matloc y se pasan a js*/
            //this.CargaListas();
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
          
        }

        /*solo se crean los encabezados, regresa codigo html como string*/
        //public StringBuilder Encabezado()
        //{
        //    StringBuilder tablaHtml = new StringBuilder();

        //    #region encabezados
        //    tablaHtml.Append("<table id='divTblResultado' border='1' width='700'>");
        //    tablaHtml.Append("<tr>");
        //    tablaHtml.Append("<td align='center' >MOVIMIENTO</td>");
        //    tablaHtml.Append("<td align='center' >NOMBRE ARCHIVO</td>");
        //    tablaHtml.Append("<td align='center' >FECHA INICIO</td>");
        //    tablaHtml.Append("<td align='center' >FECHA TERMINO</td>");
        //    tablaHtml.Append("<td align='center' >VISUALIZACION</td>");
        //    tablaHtml.Append("<td align='center' >ORIGEN</td>");
        //    tablaHtml.Append("<td align='center' >DESTINO</td>");
        //    tablaHtml.Append("<td align='center' >ESTATUS</td>");
        //    //tablaHtml.Append("<td align='center' >VER UBICACION</td> ya estaba comentada");
        //    tablaHtml.Append("</tr>");
        //    #endregion

        //    return tablaHtml;
        //}

        /*con la informacion de locales Pinta la tabla*/
        private void TodasLocal(int local, int estId, string FechaInicio, string FechaFin, string matsol, string matloc)
        {
            //wsFiatube.WebService_FIATubeSoapClient objeto = new WebService_FIATubeSoapClient();
            //FIATubeHtml5.wsFiatube.THE_SolMatLocal[] listaMatSolOrig = objeto.ObtenerSolMatLocalParametroMapa(local, -1, estId, FechaInicio, FechaFin);
            //FIATubeHtml5.wsFiatube.THE_SolMatLocal[] listaMatSolDest = objeto.ObtenerSolMatLocalParametroMapa(-1, local, estId, FechaInicio, FechaFin);

            //try
            //{
            //    loadTableData(DivInformacionMatlsol, listaMatSolOrig);
            //    loadTableData(DivInformacionMatlsolDest, listaMatSolDest);
            //}
            //catch (Exception ex)
            //{
            //    this.logError(ex);
            //    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "alertModal('Ocurrio un problema al realizar la consulta'); updateMapa();", true);
            //}

            //if (matsol != null && matloc != null)
            //    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "arrglMatSol=" + matsol + ";arrgMatLoc=" + matloc + "; updateMapa();", true);
            //else
            //    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "updateMapa();", true);
            
        }

        private void loadTableData(HtmlGenericControl control, FIATubeHtml5.wsFiatube.THE_SolMatLocal[] listaMatSol) 
        { 
            StringBuilder EnviadosHtml = new StringBuilder();

            if (listaMatSol.Count() != 0)
            {
                for (int i = 0; i < listaMatSol.Count(); i++)
                {
                    StringBuilder datosEnTabla = new StringBuilder();

                    if (listaMatSol[i].CveEstatus.CveStatusMatLocal == 4)//SI SE ENCUENTRA EN EL PROCESO UN ERROR O FUE CANCELADO
                        datosEnTabla.Append("<div style='background=#B40404;' BGCOLOR='#B40404'>");
                    else if (listaMatSol[i].CveEstatus.CveStatusMatLocal == 5)//SI ES EN ESTADO "TRANSFIRIENDOSE"
                        datosEnTabla.Append("<div BGCOLOR=\"#01DF01\">");
                    else
                        datosEnTabla.Append("<div>");


                    #region datosEnTabla

                    if (listaMatSol[i].CveEstatus.Nombre == "SPAUSADO" || listaMatSol[i].CveEstatus.Nombre == "PAUSADO")
                    {
                        if (listaMatSol[i].CveEstatus.Nombre == "SPAUSADO")
                            listaMatSol[i].CveEstatus.Nombre = "PAUSADO MANUAL";

                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + (i + 1) + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + listaMatSol[i].Nombre + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + listaMatSol[i].FechaSolicitud + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + listaMatSol[i].FechaSolicitudTerminada + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'> <progress value='" + listaMatSol[i].PorcentajeEnvio + "' max=\"100\"></progress><label style='width=60'><center>" + listaMatSol[i].PorcentajeEnvio + "</center></label></div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + listaMatSol[i].CveOrigen.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + listaMatSol[i].CveDestino.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'>" + listaMatSol[i].CveEstatus.Nombre + "</div>");
                        //datosEnTabla.Append("<div class='divTblResultadosHeaderPausa'><button class='varMarginTop5' type=\"button\" onclick=\"PintaLinea(" + listaMatSol[i].CveSolMatLocal + "," + listaMatSol[i].CveOrigen.LocalLlave + "," + listaMatSol[i].CveDestino.LocalLlave + ")\" >VER</button></div>");

                    }
                    else if (listaMatSol[i].CveEstatus.Nombre == "TRANSFIRIENDO")
                    {
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + (i + 1) + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + listaMatSol[i].Nombre + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + listaMatSol[i].FechaSolicitud + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + listaMatSol[i].FechaSolicitudTerminada + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'> <progress value='" + listaMatSol[i].PorcentajeEnvio + "' max=\"100\"></progress><label style='width=60'><center>" + listaMatSol[i].PorcentajeEnvio + "</center></label></div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + listaMatSol[i].CveOrigen.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + listaMatSol[i].CveDestino.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderT'>" + listaMatSol[i].CveEstatus.Nombre + "</div>");
                        //datosEnTabla.Append("<div class='divTblResultadosHeaderT'><button class='varMarginTop5' type=\"button\" onclick=\"PintaLinea(" + listaMatSol[i].CveSolMatLocal + "," + listaMatSol[i].CveOrigen.LocalLlave + "," + listaMatSol[i].CveDestino.LocalLlave + ")\" >VER</button></div>");
                    }
                    else if (listaMatSol[i].CveEstatus.Nombre == "CANCELADO" || listaMatSol[i].CveEstatus.Nombre == "ERROR")
                    {
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + (i + 1) + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + listaMatSol[i].Nombre + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + listaMatSol[i].FechaSolicitud + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + listaMatSol[i].FechaSolicitudTerminada + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'> <progress value='" + listaMatSol[i].PorcentajeEnvio + "' max=\"100\"></progress><label style='width=60'><center>" + listaMatSol[i].PorcentajeEnvio + "</center></label></div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + listaMatSol[i].CveOrigen.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + listaMatSol[i].CveDestino.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeaderError'>" + listaMatSol[i].CveEstatus.Nombre + "</div>");
                        //datosEnTabla.Append("<div class='divTblResultadosHeaderError'><button class='varMarginTop5'  type=\"button\" onclick=\"PintaLinea(" + listaMatSol[i].CveSolMatLocal + "," + listaMatSol[i].CveOrigen.LocalLlave + "," + listaMatSol[i].CveDestino.LocalLlave + ")\" >VER</button></div>");
                    }
                    else
                    {
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + (i + 1) + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + listaMatSol[i].Nombre + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + listaMatSol[i].FechaSolicitud + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + listaMatSol[i].FechaSolicitudTerminada + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'> <progress value='" + listaMatSol[i].PorcentajeEnvio + "' max=\"100\"></progress><label style='width=60'><center>" + listaMatSol[i].PorcentajeEnvio + "</center></label></div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + listaMatSol[i].CveOrigen.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + listaMatSol[i].CveDestino.LocalDescripcion + "</div>");
                        datosEnTabla.Append("<div class='divTblResultadosHeader9'>" + listaMatSol[i].CveEstatus.Nombre + "</div>");
                        //datosEnTabla.Append("<div class='divTblResultadosHeader9'><button class='varMarginTop5' type=\"button\" onclick=\"PintaLinea(" + listaMatSol[i].CveSolMatLocal + "," + listaMatSol[i].CveOrigen.LocalLlave + "," + listaMatSol[i].CveDestino.LocalLlave + ")\" >VER</button></div>");
                    }
                    datosEnTabla.Append("</div>");
                    #endregion


                    EnviadosHtml.Append(datosEnTabla);
                }

                control.InnerHtml = EnviadosHtml.ToString();
            }
            else
            {
                EnviadosHtml.Append("<div>");
                EnviadosHtml.Append("<div style='width:900px;'>NO SE ENCONTRARON REGISTROS...</div>");
                EnviadosHtml.Append("</div>");
                control.InnerHtml = EnviadosHtml.ToString();
            }       
        }

        /*evento del boton buscar*/
        protected void Buscar_Click(object sender, EventArgs e)
        {
            searchData(null, null);
        }

        private void searchData(string matsol, string matloc) 
        {
            string DateIni, DateFin;
            int loclOrig, estId;

            //estId = int.Parse(hdfEst.Value);
            //loclOrig = int.Parse(hdfOrig.Value);
            //DateIni = (hdfFecIni.Value).Equals(string.Empty) ? string.Empty : hdfFecIni.Value;
            //DateFin = (hdfFecFin.Value).Equals(string.Empty) ? string.Empty : hdfFecFin.Value;

            //if (!DateIni.Equals(string.Empty) && !DateFin.Equals(string.Empty))
            //    TodasLocal(loclOrig, estId, DateIni, DateFin, matsol, matloc);
            //else if ((DateIni.Equals(string.Empty) && !DateFin.Equals(string.Empty)) || (!DateIni.Equals(string.Empty) && DateFin.Equals(string.Empty)))
            //    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "alertModal('No es posible solo buscar por una de las fechas. Ambas o Ninguna');CerrarInformacion();", true);
            //else
            //    TodasLocal(loclOrig, estId, DateIni, DateFin, matsol, matloc);
        }

        //private void CargaListas()
        //{
        //    wsFiatube.WebService_FIATubeSoapClient objetoMetodo = new WebService_FIATubeSoapClient();
        //    THE_SolMatLocal objeto = new THE_SolMatLocal();
        //    THE_SolMatLocal[] lstSolMatLocal =objetoMetodo.ObtieneSolMatLocal(objeto);
            

        //    THE_MaterialLocal objeto2 = new THE_MaterialLocal ();
        //    THE_MaterialLocal[] lstMaterialLocal= objetoMetodo.ObtieneMaterialLocal(objeto2);

        //    string matsol = SerializeObjectIntoJson(lstSolMatLocal);
        //    string matloc = SerializeObjectIntoJson(lstMaterialLocal);


        //    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "arrglMatSol=" + matsol + ";arrgMatLoc=" + matloc + ";", true);
            
        //}

        protected void updateTable_Click(object sender, EventArgs e)
        {
            wsFiatube.WebService_FIATubeSoapClient objetoMetodo = new WebService_FIATubeSoapClient();
            THE_SolMatLocal objeto = new THE_SolMatLocal();
            THE_SolMatLocal[] lstSolMatLocal = objetoMetodo.ObtieneSolMatLocal(objeto);

            
            THE_MaterialLocal objeto2 = new THE_MaterialLocal();
            THE_MaterialLocal[] lstMaterialLocal = objetoMetodo.ObtieneMaterialLocal(objeto2);

            string matsol = SerializeObjectIntoJson(lstSolMatLocal);
            string matloc = SerializeObjectIntoJson(lstMaterialLocal);
            searchData(matsol, matloc);
        }
    }
}
