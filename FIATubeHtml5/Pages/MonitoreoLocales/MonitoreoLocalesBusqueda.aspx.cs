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
using TvAzteca.FiaTube.Entidades;
//using System.Windows.Forms;


namespace FIATubeHtml5.Pages.MonitoreoLocalesBusqueda
{
    public partial class MonitoreoLocalesBusqueda : BasePage
    {
        wsFiatube.WebService_FIATubeSoapClient objeto = new wsFiatube.WebService_FIATubeSoapClient();
        protected void Page_Load(object sender, EventArgs e)
        {
             //this.CargaListas();
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
          
        }

        protected void Filtrar_Click(object sender, EventArgs e)
        {
            //int loclOrig, loclDest, statusId, indicador;

            //loclOrig = int.Parse(hdfOrig.Value);
            //loclDest = int.Parse(hdfDest.Value);
            //statusId = int.Parse(hdfEst.Value);
            //indicador = int.Parse(hdfTran.Value);

            //string NombreMaterial = txtNomMaterial.Value;
            //string dteInicio = hdfFecIni.Value;
            //string dteFin = hdfFecFin.Value;

            //wsFiatube.WebService_FIATubeSoapClient objeto = new wsFiatube.WebService_FIATubeSoapClient();
            //List<FIATubeHtml5.wsFiatube.THE_SolMatLocalPROGRAMADASyACTUALES> dato = new List<FIATubeHtml5.wsFiatube.THE_SolMatLocalPROGRAMADASyACTUALES>(objeto.ObtenerSolMatLocalProgramadasyActuales(loclOrig, loclDest, indicador, statusId, NombreMaterial, dteInicio, dteFin));

            //StringBuilder codigoHTML = new StringBuilder();
            //codigoHTML = Encabezado(indicador);
            //if (dato.Count != 0)
            //{
            //    if ((!dteInicio.Trim().Equals(string.Empty) && dteFin.Trim().Equals(string.Empty)) || (dteInicio.Trim().Equals(string.Empty) && !dteFin.Trim().Equals(string.Empty)))
            //        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('Deben contener ambas fechas o ninguna');", true);
            //    else
            //        PintaProgramadas(indicador, dato, codigoHTML);
            //}
            //else
            //{
            //    divTableResultados.InnerHtml = string.Empty;
            //    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('No se encuentra registro con dichos parametros');", true);
            //}
        }

        //protected void Limpiar_Click(object sender, EventArgs e)
        //{
        //    LimpiaObjetos();
        //}

        //#region obtieneListasDeLocalesYStatus
        //private wsFiatube.TDI_Local[] ObtieneLocales()
        //{
        //    wsFiatube.TDI_Local[] lstLocales = objeto.ObtenerLocales();
        //    return lstLocales;
        //}

        //private wsFiatube.TDI_StatusMatLocal[] ObtieneStatus()
        //{
        //    FIATubeHtml5.wsFiatube.TDI_StatusMatLocal objetoStatus = new FIATubeHtml5.wsFiatube.TDI_StatusMatLocal();
        //    wsFiatube.TDI_StatusMatLocal[] lstStatus = objeto.ObtenerStatusMatLocal(objetoStatus);

        //    return lstStatus;
        //}

        //#endregion

        //#region LlenaDropDownList's
        //private void LlenaFiltroLocales()
        //{
        //    wsFiatube.TDI_Local[] lstObtiene = ObtieneLocales();
        //    ddlLlenadoLocales.DataSource = lstObtiene;
        //    ddlLlenadoLocales.DataValueField = "LocalLlave";
        //    ddlLlenadoLocales.DataTextField = "LocalDescripcion";
        //    ddlLlenadoLocales.DataBind();

        //}

        //private void LlenaFiltroStatus()
        //{
        //    wsFiatube.TDI_StatusMatLocal[] lstStatus = ObtieneStatus();
        //    ddlStatus.DataSource = lstStatus;
        //    ddlStatus.DataValueField = "CveStatusMatLocal"; 
        //    ddlStatus.DataTextField = "Nombre";
        //    ddlStatus.DataBind();
        //    ddlStatus.Items.Insert(0,new ListItem ("Seleccionar", "0"));
        //    ddlStatus.SelectedValue = "0";

        //}
        //#endregion

        public StringBuilder Encabezado(int indicador)
        {
            StringBuilder encabezado = new StringBuilder();
            string cssClass = "divTblResultadosHeaderTitle8";
            string[] puestos = Session["userPuestos"].ToString().Split(',');

            if (!puestos.Contains("9") && !puestos.Contains("139"))
                cssClass = "divTblResultadosHeaderTitle7";

            #region encabezados
            encabezado.Append("<div id='tblResultados'>");
            if (indicador == 2)
            {
                encabezado.Append("<div class='divTblResultadosHeader100'>PROGRAMADAS</div>");
                /*encabezado.Append("<div id='tdprueba'><label>Tarea</label></div>");*/
                encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>NombreArchivo</label></div>");
            }
            else
            {
                encabezado.Append("<div class='divTblResultadosHeader100'>ACTUALES</div>");
                encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>NombreArchivo</label></div>");
            }
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>Origen</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>Destino</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>F.Inicial</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>F.Final</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>H.Inicial</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>H.Final</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>Tipo Material</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>% de Envio</label></div>");
            /*encabezado.Append("<div id='tdprueba' class='divTblResultadosHeaderTitle8'><label> Bytes en Transferencia </label></div>");*/
            /*encabezado.Append("<div id='tdprueba' class='divTblResultadosHeaderTitle8'><label> Numero de archivos </label></div>");*/
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>Estatus</label></div>");
            encabezado.Append("<div id='tdprueba' class='").Append(cssClass).Append("'><label>Progreso</label></div>");
            if (puestos.Contains("9") || puestos.Contains("139"))
                encabezado.Append("<div id='tdprueba' class='divTblResultadosHeaderTitle8'><label>Opciones</label></div>");
            encabezado.Append("</div>");

            #endregion
            return encabezado;
        }

        //private void LimpiaObjetos()
        //{
        //    ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", "LimpiaCamposFechas();", true);

        //    ddlLlenadoLocales.SelectedIndex = 0;
        //    //ddlStatus.SelectedValue = "0";
        //    txtNomMaterial.Text = "";
        //    hdfFechaFin.Value = "";
        //    hdfFechaIni.Value = "";
        //}

        //private void PintaProgramadas(int ind, List<FIATubeHtml5.wsFiatube.THE_SolMatLocalPROGRAMADASyACTUALES> listaProgramdas, StringBuilder codigoHTML)
        //{
        //    string cssClass = "divTblResultadosHeader8";
        //    string cssClassRed = "divTblResultadosHeader8Red";
        //    string[] puestos = Session["userPuestos"].ToString().Split(',');

        //    if (!puestos.Contains("9") && !puestos.Contains("139"))
        //    {
        //        cssClass = "divTblResultadosHeader7";
        //        cssClassRed = "divTblResultadosHeader7Red";
        //    }

        //    for (int i = 0; i < listaProgramdas.Count; i++)
        //    {
        //        StringBuilder datos = new StringBuilder();

        //        if (!listaProgramdas[i].StatusId.Equals("4"))
        //        {
        //            string status = listaProgramdas[i].Status;
        //            if (status == "SPAUSADO")
        //                status = "PAUSA MANUAL";

        //            //datos.Append("<div onmouseup='return doSomething(this);' id='divSol" + listaProgramdas[i].MatsolId + "' data-rowMatsolId='" + listaProgramdas[i].MatsolId + "' data-status='" + status + "' data-SolName='" + listaProgramdas[i].Nombre + "' >");
        //            datos.Append("<div id='divSol" + listaProgramdas[i].MatsolId + "' data-rowMatsolId='" + listaProgramdas[i].MatsolId + "' data-status='" + status + "' data-SolName='" + listaProgramdas[i].Nombre + "' >");
        //            /*if (ind ==2)
        //                datos.Append("<div>"+listaProgramdas[i].TareaTurno+"</div>");
        //            else*/
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].Nombre + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].Origen + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].Destino + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].FInicial + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].FFinal + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].Hinicial + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].HFinal + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].TipoMaterial + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + listaProgramdas[i].PorcentajeEnviado + "</div>");
        //            /*datos.Append("<div class='divTblResultadosHeader8'>" + listaProgramdas[i].PesoEnBytes + "</div>");*/
        //            datos.Append("<div class='").Append(cssClass).Append("'>" + status + "</div>");
        //            datos.Append("<div class='").Append(cssClass).Append("'> <progress class='divTblResultadosProgress' value=\"" + listaProgramdas[i].PorcentajeEnviado + "\" max=\"100\"></progress> </div>");
        //            if(puestos.Contains("9") || puestos.Contains("139"))
        //                datos.Append("<div class='divTblResultadosHeader8'> <input id='btnOpciones' onclick='doSomethingFromButton(this);' type='button' class='btnOpcionesBA' title='Recuperar' onclick='ObtenerDatos();' id='divSol" + listaProgramdas[i].MatsolId + "' data-rowMatsolId='" + listaProgramdas[i].MatsolId + "' data-status='" + status + "' data-SolName='" + listaProgramdas[i].Nombre + "' /></progress> </div>");                    
        //            datos.Append("</div>");

        //            codigoHTML.Append(datos);
        //        }
        //        else
        //        {
        //            string status = listaProgramdas[i].Status;
        //            if (status == "SPAUSADO")
        //                status = "PAUSA MANUAL";

        //            datos.Append("<div onmouseup='return doSomething(this);' data-rowMatsolId='" + listaProgramdas[i].MatsolId + "' data-SolName='" + listaProgramdas[i].Nombre + "'>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].Nombre + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].Origen + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].Destino + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].FInicial + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].FFinal + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].Hinicial + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].HFinal + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].TipoMaterial + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].PorcentajeEnviado + "</div>");
        //            /*datos.Append("<div class='divTblResultadosHeader8Red'>" + listaProgramdas[i].PesoEnBytes + "</div>");*/
        //            datos.Append("<div class='").Append(cssClassRed).Append("'>" + listaProgramdas[i].Status + "</div>");
        //            datos.Append("<div class='").Append(cssClassRed).Append("'> <progress class='divTblResultadosProgress' value=\"" + listaProgramdas[i].PorcentajeEnviado + "\" max=\"100\"></progress> </div>");
        //            if (puestos.Contains("9") || puestos.Contains("139"))
        //                datos.Append("<div class='divTblResultadosHeader8Red'> <input id='btnOpciones' onclick='doSomethingFromButton(this);' type='button' class='btnOpcionesBA' title='Recuperar' onclick='ObtenerDatos();' id='divSol" + listaProgramdas[i].MatsolId + "' data-rowMatsolId='" + listaProgramdas[i].MatsolId + "' data-status='" + status + "' data-SolName='" + listaProgramdas[i].Nombre + "' /></progress> </div>");                    
        //            datos.Append("</div>");

        //            codigoHTML.Append(datos);
        //        }
        //    }
        //        codigoHTML.Append("</div>");

        //        divTableResultados.InnerHtml = codigoHTML.ToString();
        //        ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "edicion();", true);
            

        //}//fin de metodo que pinta  

        //private void CargaListas()
        //{
        //    WebService_FIATubeSoapClient objetoMetodo = new WebService_FIATubeSoapClient();
        //    FIATubeHtml5.wsFiatube.THE_SolMatLocal objeto = new FIATubeHtml5.wsFiatube.THE_SolMatLocal();
        //    FIATubeHtml5.wsFiatube.THE_SolMatLocal[] lstSolMatLocal = objetoMetodo.ObtieneSolMatLocal(objeto);


        //    string matsol = SerializeObjectIntoJson(lstSolMatLocal);



        //    ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "arrglMatSol=" + matsol + ";", true);

        //}

    }//fin de class
}//fin de namespace
