using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using Newtonsoft.Json;

namespace FIATubeHtml5.Pages
{
    public partial class Busqueda : BasePage
    {
        WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
        int resultados = 0;
        /// <summary>
        /// Declaracion de Variable de parametros
        /// </summary>
        #region  Parametros
        string cveOT;
        string textoFiltro;
        string cveEmpleado;
        string cvePrograma;
        string cveSeccion;
        string cvePais;
        string cveEstado;
        string cveCiudad;
        string FechaIni;
        string FechaFin;
        string EsbusquedaAvanzada;
        string soloconvideo;
        string solonotaterminda;
        string solomaterialbruto;
        string NoCinta;
        string cveAgencia;
        string NumOT;
        string vdoIdFileName;
        string posini;
        string posfin;
        string baneados;

        string PerPage;
        string Offset;
        string Palabraclave;
        string OptBusqueda;
        string Usuario;
        string GuardaBusqueda;
        string FinalCut;
        string OpcVideoteca;
        string OpcPlaneacion;
        string OpcGuion;
        string CCaption;

        string TituloBusqueda;
        string TituloCapituloOrig;
        string TituloCapituloTrad;
        string NumeroCapitulo;
        string CveGenero;
        string NombGenero;
        string PalCve;
        string Sinopsis;
        string Elenco;

        string HDSD;

        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString["perPage"] != null)
                resultados = int.Parse(Request.QueryString["perPage"].ToString());
            else
                resultados = 0;

            if (!Page.IsPostBack)   
            {
                #region PRUEBA
                //cveOT = string.Empty;
                //textoFiltro = "Playas";
                //cveEmpleado = string.Empty;
                //cvePrograma = string.Empty;
                //cveSeccion = string.Empty;
                //cvePais = string.Empty;
                //cveEstado = string.Empty;
                //cveCiudad = string.Empty;

                //FechaIni = "2012-01-01";
                //FechaFin = "2012-02-01";

                //EsbusquedaAvanzada = "0";
                //soloconvideo = "1";
                //solonotaterminda = string.Empty;
                //solomaterialbruto = "1";
                //NoCinta = string.Empty;
                //cveAgencia = string.Empty;
                //NumOT = string.Empty;

                //vdoIdFileName = string.Empty;
                //posini = string.Empty;
                //posfin = string.Empty;
                //baneados = string.Empty;

                //PerPage = "30";
                //Offset = string.Empty;
                //Palabraclave = string.Empty;
                //OptBusqueda = "string";
                //Usuario = string.Empty;
                //GuardaBusqueda = "1";
                //FinalCut = string.Empty;
                //OpcVideoteca = "1";
                //OpcPlaneacion = string.Empty;
                //OpcGuion = string.Empty;
                //CCaption = string.Empty;
                #endregion

                CargaParametros();
                this.HiddenTipo.Value = Request.QueryString["Tipo"];
                if (HiddenTipo.Value == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else if (HiddenTipo.Value == "Avanzado") RealizarBusquedaConSinOTFast(); else if (HiddenTipo.Value == "Navegadores") RealizarBusquedaConSinOTFastNav();



            }
        }

        /// <summary>
        /// Funcion que recupera los parametros del querystring y los asigna a variables dentro de la pagina
        /// </summary>
        private void CargaParametros()
        {
            try
            {
                #region Parametros BusquedaAvanzadaConSinOTFast

                textoFiltro = Request.QueryString["textofiltro"];

                if (Request.QueryString["cveOT"] == "" || Request.QueryString["cveOT"] == "null") cveOT = string.Empty; else cveOT = Request.QueryString["cveOT"];
                if (Request.QueryString["cveEmpleado"] == "" || Request.QueryString["cveEmpleado"] == "null") cveEmpleado = "0"; else cveEmpleado = Request.QueryString["cveEmpleado"];
                if (Request.QueryString["cvePrograma"] == "" || Request.QueryString["cvePrograma"] == "null") cvePrograma = "0"; else cvePrograma = Request.QueryString["cvePrograma"];
                if (Request.QueryString["cveSeccion"] == "") cveSeccion = "0"; else cveSeccion = Request.QueryString["cveSeccion"];
                if (Request.QueryString["cvePais"] == "") cvePais = "0"; else cvePais = Request.QueryString["cvePais"];
                if (Request.QueryString["cveEstado"] == "" || Request.QueryString["cveEstado"] == "null") cveEstado = "0"; else cveEstado = Request.QueryString["cveEstado"];
                if (Request.QueryString["cveCiudad"] == "" || Request.QueryString["cveCiudad"] == "null") cveCiudad = "0"; else cveCiudad = Request.QueryString["cveCiudad"];

                FechaIni = Request.QueryString["FechaIni"];
                FechaFin = Request.QueryString["FechaFin"];

                if (Request.QueryString["esbusquedaAvanzada"] == "") EsbusquedaAvanzada = "0"; else EsbusquedaAvanzada = Request.QueryString["esbusquedaAvanzada"];
                soloconvideo = "1";
                if (Request.QueryString["solonotaterminada"] == "" || Request.QueryString["solonotaterminada"] == "false") solonotaterminda = string.Empty; else solonotaterminda = Request.QueryString["solonotaterminada"];
                if (Request.QueryString["solomaterialbruto"] == "") solomaterialbruto = "1"; else solomaterialbruto = Request.QueryString["solomaterialbruto"];
                if (Request.QueryString["nocinta"] == "" || Request.QueryString["nocinta"] == "null") NoCinta = string.Empty; else NoCinta = Request.QueryString["nocinta"];
                if (Request.QueryString["cveAgencia"] == "" || Request.QueryString["cveAgencia"] == "0") cveAgencia = "0"; else cveAgencia = Request.QueryString["cveAgencia"];
                if (Request.QueryString["NumOT"] == "" || Request.QueryString["NumOT"] == "null") NumOT = string.Empty; else NumOT = Request.QueryString["NumOT"];
                if (Request.QueryString["vdoIdFilename"] == "" || Request.QueryString["vdoIdFilename"] == "null") vdoIdFileName = string.Empty; else vdoIdFileName = Request.QueryString["vdoIdFilename"];
                
                if (Request.QueryString["Baneado"] == "" || Request.QueryString["Baneado"].ToString() == "null") baneados = string.Empty; else baneados = Request.QueryString["Baneado"];
                baneados = ValidaBusquedaVideosBaneados();
                PerPage = resultados.ToString();

                if (Request.QueryString["Offset"] == "" || Request.QueryString["Offset"] == "null") Offset = "0"; else Offset = Request.QueryString["Offset"];
                if (Request.QueryString["Palabraclave"] == "null") Palabraclave = string.Empty; else Palabraclave = Request.QueryString["Palabraclave"];
                OptBusqueda = "string";

                if (Request.QueryString["OptBusqueda"] != null && !Request.QueryString["OptBusqueda"].Equals(String.Empty))
                    OptBusqueda = Request.QueryString["OptBusqueda"];

                if (Request.QueryString["Usuario"] == "" || Request.QueryString["Usuario"] == "null") Usuario = string.Empty; else Usuario = Request.QueryString["Usuario"];
                if (Request.QueryString["GuardaBusqueda"] == "" || Request.QueryString["GuardaBusqueda"] == "null") GuardaBusqueda = "1"; else GuardaBusqueda = Request.QueryString["GuardaBusqueda"];
                if (Request.QueryString["FinalCut"] == "" || Request.QueryString["FinalCut"] == " null") FinalCut = string.Empty; else FinalCut = Request.QueryString["FinalCut"];
                if (Request.QueryString["OpcVideoteca"] == "" || Request.QueryString["OpcVideoteca"] == "false") OpcVideoteca = "1"; OpcVideoteca = Request.QueryString["OpcVideoteca"];
                OpcVideoteca = "1";
                if (Request.QueryString["OpcPlaneacion"] == "" || Request.QueryString["OpcPlaneacion"] == "false") OpcPlaneacion = "0"; else OpcPlaneacion = Request.QueryString["OpcPlaneacion"];
                if (Request.QueryString["OpcGuion"] == "" || Request.QueryString["OpcGuion"] == "false") OpcGuion = "0"; else OpcGuion = Request.QueryString["OpcGuion"];
                if (Request.QueryString["CCaption"] == "" || Request.QueryString["CCaption"] == "false") CCaption = string.Empty; else CCaption = Request.QueryString["CCaption"];
                if (Request.QueryString["HDSD"] == "" || Request.QueryString["HDSD"] == "false") HDSD = string.Empty; else HDSD = Request.QueryString["HDSD"];


                #endregion

                #region "Adquisiciones"

                if (Request.QueryString["TituloBusqueda"] == "" || Request.QueryString["TituloBusqueda"] == "false") TituloBusqueda = string.Empty; else TituloBusqueda = Request.QueryString["TituloBusqueda"];
                if (Request.QueryString["TituloCapituloOrig"] == "" || Request.QueryString["TituloCapituloOrig"] == "false") TituloCapituloOrig = string.Empty; else TituloCapituloOrig = Request.QueryString["TituloCapituloOrig"];
                if (Request.QueryString["TituloCapituloTrad"] == "" || Request.QueryString["TituloCapituloTrad"] == "false") TituloCapituloTrad = string.Empty; else TituloCapituloTrad = Request.QueryString["TituloCapituloTrad"];
                TituloCapituloOrig = TituloCapituloTrad;
                if (Request.QueryString["NumeroCapitulo"] == "" || Request.QueryString["NumeroCapitulo"] == "false") NumeroCapitulo = "0"; else NumeroCapitulo = Request.QueryString["NumeroCapitulo"];
                if (Request.QueryString["CveGenero"] == "" || Request.QueryString["CveGenero"] == "null") CveGenero = "0"; else CveGenero = Request.QueryString["CveGenero"];

                if (Request.QueryString["NombGenero"] == "" || Request.QueryString["NombGenero"] == "false") NombGenero = string.Empty; else NombGenero = Request.QueryString["NombGenero"];
                if (Request.QueryString["PalCve"] == "" || Request.QueryString["PalCve"] == "false") PalCve = string.Empty; else PalCve = Request.QueryString["PalCve"];
                if (Request.QueryString["Sinopsis"] == "" || Request.QueryString["Sinopsis"] == "false") Sinopsis = string.Empty; else Sinopsis = Request.QueryString["Sinopsis"];
                if (Request.QueryString["Elenco"] == "" || Request.QueryString["Elenco"] == "false") Elenco = string.Empty; else Elenco = Request.QueryString["Elenco"];

                #endregion
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }
        
        /// <summary>
        /// Realiza la consulta de la busqueda  y determina en base a la etiqueta vista si se muestra en forma de grid  o carusel
        /// </summary>
        private void RealizarBusquedaConSinOTFast()
        {
            try
            {
                FastResultset Res = new FastResultset();
                Res = client.ObtenerBusquedaAvanzadaConSinOTFast(cveOT, textoFiltro, cveEmpleado, cvePrograma, cveSeccion,cvePais,cveEstado, cveCiudad, FechaIni, FechaFin, EsbusquedaAvanzada, soloconvideo, solonotaterminda, solomaterialbruto, NoCinta, cveAgencia, NumOT, vdoIdFileName, posini, posfin, baneados, PerPage, Offset, Palabraclave, OptBusqueda, Usuario, GuardaBusqueda, FinalCut, OpcVideoteca, OpcPlaneacion, OpcGuion, CCaption,HDSD);
                LlenaNavegador(Res.lstNavegdores);
 
              if (this.lblVista.Value == "Grid") LlenaGrid(Res); else if (this.lblVista.Value == "Carrusel") BusquedaCarrusel(Res); else if (this.lblVista.Value == "Teaser") BusquedaTeaser(Res);
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        /// <summary>
        /// Realiza la consulta de la busqueda en base a la navegacion  y determina en base a la etiqueta vista si se muestra en forma de grid  o carusel
        /// </summary>
        private void RealizarBusquedaConSinOTFastNav()
        {
            try
            {
                NavegadorElemento[] FiltroNav;

                List<NavegadorElemento> Lista = new List<NavegadorElemento>();

                foreach (TreeNode nodos in TreeViewFiltro.Nodes)
                {
                    NavegadorElemento elemento = new NavegadorElemento();


                    string[] valores = nodos.Value.Split('|');

                    int p = 1;
                    foreach (string v in valores)
                    {
                        switch (p)
                        {
                            case 1:
                                elemento.Modifier = v;
                                break;
                            case 2:
                                elemento.NavUNeg = v;

                                break;
                            case 3:
                                elemento.TotUNeg = v;

                                break;
                            case 4:
                                elemento.UNegSN = v;

                                break;

                        }
                        p += 1;
                    }


//                    elemento.UNegSN = nodos.Text;
                    Lista.Add(elemento);
                }

                FiltroNav = Lista.ToArray();

                if (solonotaterminda == string.Empty) solonotaterminda = "0";
                if (baneados == string.Empty) baneados = "0";
                if (CCaption == string.Empty) CCaption = "0";
                if (solomaterialbruto == "false") solomaterialbruto = "0"; else solomaterialbruto = "1";

                FastResultset Res = new FastResultset();
                Res = client.ObtenerBusquedaAvanzadaConSinOTFastNav (cveOT, textoFiltro, cveEmpleado, Convert.ToInt32( cvePrograma), Convert.ToInt32(cveSeccion),Convert.ToInt32( cvePais), Convert.ToInt32(cveEstado),Convert.ToInt32(cveCiudad), Convert.ToDateTime (FechaIni), Convert.ToDateTime (FechaFin), Convert.ToBoolean( Convert.ToInt32(EsbusquedaAvanzada)), Convert.ToBoolean(Convert.ToInt32(soloconvideo)), Convert.ToBoolean(Convert.ToInt32(solonotaterminda)),Convert.ToBoolean(Convert.ToInt32(solomaterialbruto)),NoCinta,  Convert.ToInt32(cveAgencia), NumOT, vdoIdFileName, Convert.ToInt32(posini), Convert.ToInt32(posfin), Convert.ToBoolean (Convert.ToInt32( baneados)), Convert.ToInt32 (PerPage),  Convert.ToInt32 (Offset), Palabraclave, OptBusqueda,Usuario,  Convert.ToBoolean (Convert.ToInt32( GuardaBusqueda)), FinalCut, Convert.ToBoolean (Convert.ToInt32(OpcVideoteca)),Convert.ToBoolean (Convert.ToInt32( OpcPlaneacion)), Convert.ToBoolean (Convert.ToInt32(OpcGuion)), FiltroNav  ,Convert.ToBoolean (Convert.ToInt32(CCaption)), HDSD);
                LlenaNavegador(Res.lstNavegdores);

                if (this.lblVista.Value == "Grid") LlenaGrid(Res); else if (this.lblVista.Value == "Carrusel") BusquedaCarrusel(Res); else if (this.lblVista.Value == "Teaser") BusquedaTeaser(Res);
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        /// <summary>
        /// Funcion que Crea el grid con su  tool tip y drap and drop
        /// </summary>
        /// <param name="Res">Resultado de la busqueda</param>
        private void LlenaGrid(FastResultset Res)
        {
            try
            {
                List<BusquedaAvanzada> ListBusquedaAvanzada = new List<BusquedaAvanzada>();
                StringBuilder myDiv = new StringBuilder();
                StringBuilder divresultado = new StringBuilder();
                string matType = "";
                int contador = ((resultados * Convert.ToInt32( HddPaginas.Value)) - resultados) + 1;
                string color = "";
        
                foreach (BusquedaAvanzada Busqueda in Res.ListaBusquedaAvanzada)
                {
                    string HD = "";
                    if (Busqueda.IdFileName.Trim() != string.Empty && Busqueda.CveAgencia != 743)
                        matType = "MB";
                    else if (Busqueda.IdFileName.Trim() != string.Empty && Busqueda.CveAgencia == 743)
                        matType = "NT";
                    else
                        matType = "SV";
                    

                    if (Busqueda.Definicion =="HD") HD = Busqueda.Definicion;

                    if (Busqueda.Banned == 1)
                        color = "divContadorBanned";
                    else
                        color = "divContador";

                    Busqueda.Objetivo = Busqueda.Objetivo.Replace("'", "");
                    Busqueda.PalabrasClave = Busqueda.PalabrasClave.Replace("'", "");
                    Busqueda.Sinopsis = Busqueda.Sinopsis.Replace("'", "");
                    Busqueda.Teaser = Busqueda.Teaser.Replace("'", "");

                    //Busqueda.IdFileName
                    myDiv.Append(@"<div class=""divc ui-widget-content"" runat=""server"" id=""divc"">")
                     
                     .Append(@"<div class='").Append(color).Append(@"' onclick=""imgVideo_click(this);""  ")
                     .Append(" data-Busqueda='").Append(JsonConvert.SerializeObject(Busqueda, Formatting.Indented)).Append("' > ")
                     .Append(contador.ToString()).Append(@"</div>")

                     .Append(@"<div class='divHD' onclick=""imgVideo_click(this);"" ")
                     .Append(" data-Busqueda='").Append(JsonConvert.SerializeObject(Busqueda, Formatting.Indented)).Append("' > ")
                     .Append(HD).Append(@"  </div>")
                     
                    .Append(@" <img  onerror=""ImageError(this);"" class=""divResultado"" alt=""Sin Imagen"" src=' ")
                    .Append((Busqueda.Imagen == string.Empty)? "../../Images/noimage.png" : Busqueda.Imagen)
                    .Append("' ")
                    .Append(" data-Busqueda='").Append(JsonConvert.SerializeObject(Busqueda, Formatting.Indented)).Append("' ")

                    .Append(@" onclick=""imgVideo_click(this);"" /> ")
                    .Append(@"<div class=""divMatType"" ")
                    .Append(" data-Busqueda='").Append(JsonConvert.SerializeObject(Busqueda, Formatting.Indented)).Append("' > ")
                    .Append(matType).Append("</div>")
                    
                    .Append("</div>");
                    divresultado.Append(myDiv.ToString());
                    myDiv.Clear();
                    contador += 1;
                }
                this.divResultadoBusqueda.InnerHtml = divresultado.ToString();
                this.divGridCarrusel.InnerHtml = "";
                this.divCarrusel.InnerHtml = "";
                int tRegistros = Res.Hits;
                int tPaginas = Res.TotalPages;
                this.HDDTotalPaginas.Value = tPaginas.ToString();

                string Did = LlenaDidYouMean(Res.lstDidYouMean);

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " initialize(); ReAsignar  (" + tRegistros.ToString() + ",'" + Did + "', '" + OptBusqueda + "'); ", true);
                
                this.LblResultado.Text = "Total de Registros: " + tRegistros.ToString();
                this.LblPaginado.Text = "Pagina " + this.HddPaginas.Value.ToString() + " de " + tPaginas.ToString(); ;
                
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        private void LlenaNavegador(Navegadores [] ListaNavegadores )
        {
            this.TreeViewNavegador.Nodes.Clear();

            StringBuilder sDivAcordeon = new StringBuilder();
            int x = 0;
            foreach (Navegadores Nav in ListaNavegadores)
            {
                if(Nav.DisplayName.ToUpper().StartsWith("NAVEGADOR"))
                    continue;

                TreeNode Nodo = new TreeNode (Nav.DisplayName.ToUpper());                

                this.TreeViewNavegador.Nodes.Add(Nodo);
                

                StringBuilder sElementos = new StringBuilder();
                foreach (NavegadorElemento Elementos in Nav.lstElementos)
                {
                    string VALOR = Elementos.Modifier + "|" + Elementos.NavUNeg + "|" + Elementos.TotUNeg + "|" + Elementos.UNeg + "|" + Elementos.UNegSN;
                    
                    TreeNode NodoH = new TreeNode(Elementos.UNegSN,VALOR);
                    TreeViewNavegador.Nodes[x].ChildNodes.Add(NodoH);
                
                }
                x += 1;
            }
            TreeViewNavegador.CollapseAll();
        }

        private string LlenaDidYouMean(DidYouMean[] ListaDidYouMean)
        {
            string sDid="";
            foreach (DidYouMean Did in ListaDidYouMean)
            {
                sDid=Did.Suggestion;
                      
            }
            return sDid;
        }

        /// <summary>
        /// Realiza la consulta  de la busqueda con parametros de Adquisiciones y determina en base  a la etiqueta de vista como mostrar el resultado 
        /// </summary>
        private void ReliazaBusquedaConSinOTFastAdquisiciones()
        {
            try
            {
                FastResultset Res = new FastResultset();
                Res = client.ObtenerBusquedaAvanzadaConSinOTFastAdquisisiones(vdoIdFileName, Convert.ToInt32(cvePrograma), Convert.ToBoolean(1), Convert.ToBoolean(1), textoFiltro, Convert.ToBoolean(Convert.ToInt32(OpcVideoteca)), Convert.ToBoolean(Convert.ToInt32(OpcPlaneacion)), Convert.ToBoolean(Convert.ToInt32(OpcGuion)), OptBusqueda, TituloBusqueda, TituloCapituloOrig, TituloCapituloTrad, Convert.ToInt32(NumeroCapitulo), Convert.ToInt32(CveGenero), NombGenero, Convert.ToBoolean(Convert.ToInt32(GuardaBusqueda)), Usuario, Convert.ToInt32(Offset), Convert.ToInt32(PerPage), FinalCut, PalCve, Sinopsis, Elenco );
                if (this.lblVista.Value == "Grid") LlenaGrid(Res); else if (this.lblVista.Value == "Carrusel") BusquedaCarrusel(Res); else if (this.lblVista.Value == "Teaser") BusquedaTeaser(Res);
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        /// <summary>
        /// Obtiene los item seleccionados  para llenar una listado de busqueda avanzada y enviarlo como variable de sesion a la pagina de videoconsulta
        /// </summary>
        private void recuperar()
        {
            string[] separador = new string[1];
            string strRecuparar = this.lblRecuperar.Value;
            try
            {
                separador[0] = "%sFtb_sRic";
                List<BusquedaAvanzada> oListabusqueda = new List<BusquedaAvanzada>();
                BusquedaAvanzada oResultado = new BusquedaAvanzada();

                string[] Foto = strRecuparar.Split(separador, StringSplitOptions.RemoveEmptyEntries);

                foreach (string ofoto in Foto)
                {
                    if (ofoto != "")
                    {
                        oResultado = JsonConvert.DeserializeObject<BusquedaAvanzada>(ofoto);
                        oListabusqueda.Add(oResultado);
                    }
                }
                Session["lstToSeleccion"] = oListabusqueda;
                Response.Redirect("Video/VideoConsulta.aspx");
            }
            catch (Exception ex)
            {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " alert ('Ocurrio un Problema al abrir la Video Consulta.');", true);

                logError(ex);
            }
        }

        /// <summary>
        /// Vincula jQuery con C#
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Button1_Click1(object sender, EventArgs e)
        {
            if (PermisosGridZoomRecuperacion())
            recuperar();
            else
                ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alert ('Imposible ejecutar esta acción debido a que no cuenta con los permisos suficientes.') ", true);
        }

        /// <summary>
        /// Muestra el Resultado de la busqueda en forma de Carrusel
        /// </summary>
        /// <param name="Res">Resultado de busqueda</param>
        private void BusquedaCarrusel(FastResultset Res)
        {
            try
            {
                StringBuilder myDiv = new StringBuilder();
                StringBuilder myDivGrid = new StringBuilder();
                StringBuilder divresultado = new StringBuilder();
                StringBuilder divresultadoGrid = new StringBuilder();
                StringBuilder lista = new StringBuilder();
                
                divresultado.Append(@"<ul id=""gallery""> ");

                divresultadoGrid.Append("<div class='divVacioCarrusel'></div>");
                divresultadoGrid.Append("<div class='carruselTitlesA'><p>Información Relevante</p></div>");
                divresultadoGrid.Append("<div class='carruselTitlesB'><p>Palabra Clave</p></div>");
                divresultadoGrid.Append("<div class='carruselTitlesB'><p>Personajes</p></div>");
                divresultadoGrid.Append("<div class='divResultCarr'>");
                string matType = "";
                int contador = ((resultados * Convert.ToInt32(HddPaginas.Value)) - resultados) + 1;

                foreach (BusquedaAvanzada Busqueda in Res.ListaBusquedaAvanzada)
                {
                    string HD = "";

                    if (Busqueda.IdFileName.Trim() != string.Empty && Busqueda.CveAgencia != 743)
                        matType = "MB";
                    else if (Busqueda.IdFileName.Trim() != string.Empty && Busqueda.CveAgencia == 743)
                        matType = "NT";
                    else
                        matType = "SV";

                    if (Busqueda.HDSD == "HD") HD = Busqueda.HDSD;

                    myDiv.Append(@"<li id=""#A").Append(contador.ToString()).Append(@""" class=""divc ui-widget-content"">")
                    .Append(@" <img  onerror=""ImageError(this);"" class=""divResultadoCarrusel""   alt=""Sin Imagen"" src='")
                    .Append((Busqueda.Imagen == string.Empty) ? "../../Images/noimage.png" : Busqueda.Imagen)
                    .Append("' data-Busqueda='").Append(JsonConvert.SerializeObject(Busqueda, Formatting.Indented)).Append("' ")
                    .Append(@" onclick=""imgVideo_click(this);"" ").Append("id='id").Append(contador.ToString()).Append("' /></a>")
                    .Append("</li>");

                    divresultado.Append(myDiv.ToString());
                    myDiv.Clear();

                    //Crea el Grid del Carrusel//

                    myDivGrid.Append(@"<div class=""ContenedorItem"">");
                    myDivGrid.Append(@"<a name=""A").Append(contador.ToString()).Append(@""">");
                    myDivGrid.Append(@"<div class=""DragGrid"" data-busq='" + JsonConvert.SerializeObject(Busqueda) + @"'  onclick=""imgVideoGridCarrusel_click(this);""  ")
                    .Append(" data-OT='").Append(Busqueda.OrdenTrabajo.ToString()).Append("'")
                    .Append(" data-Video='").Append(Busqueda.Video.ToString()).Append("'")
                    .Append(" data-Imagen='").Append(Busqueda.Imagen.ToString()).Append("'>");

                    myDivGrid.Append(@"<div class=""divContadorCar"">").Append(contador.ToString()).Append("</div>");
                    myDivGrid.Append(@"<div class=""divFechaCar"">").Append(Busqueda.FechaVideo.ToString("dd/MM/yyyy")).Append("</div>");
                    
                    myDivGrid.Append(@"<div class=""divContResultados"" data-busq='" + JsonConvert.SerializeObject(Busqueda) + "'>");
                    string[] Fotos = Busqueda.ConcatenadoFotos.Split('|');
                    int con = 1;
                    foreach(string Foto  in Fotos )
                    {
                        
                        if (Foto != "" && con <=4)
                        {
                            myDivGrid.Append(@"<img class=""divResultadoCarruselGrid"" onerror=""ImageError(this);""  alt=""Sin Imagen"" src='");
                            myDivGrid.Append(Foto)
                            .Append("' />");
                            con += 1;
                        }
                    }
                    myDivGrid.Append("</div>");
                    myDivGrid.Append(@"<p class=""divMatTypeVistaCarrusel"">");
                    myDivGrid.Append(matType);
                    myDivGrid.Append("</p>");
                    myDivGrid.Append("</div> </a>");

                    myDivGrid.Append("<div class='divInfoRelevante'>");

                    myDivGrid.Append("<p> OT: ");
                    if (Busqueda.OrdenTrabajo!= null)myDivGrid.Append(Busqueda.OrdenTrabajo.ToString());
                    myDivGrid.Append("</p>");

                    myDivGrid.Append("<p> Titulo: ");
                    if (Busqueda.Titulo!= null )myDivGrid.Append(Busqueda.Titulo.ToString());
                    myDivGrid.Append("</p>");

                    myDivGrid.Append("<p> Programa: ");
                    if (Busqueda.Programas !=null)myDivGrid.Append(Busqueda.Programas.ToString());
                    myDivGrid.Append("</p>");

                    myDivGrid.Append("<p> Agencia: ");
                    if (Busqueda.NombreAgencia!=null)myDivGrid.Append(Busqueda.NombreAgencia.ToString());
                    myDivGrid.Append("</p>");

                    myDivGrid.Append("<p> Pais: ");
                    if(Busqueda.NombrePais!=null) myDivGrid.Append(Busqueda.NombrePais.ToString());
                    myDivGrid.Append("</p>");

                    myDivGrid.Append("<p> Estado: ");
                    if (Busqueda.NombreEstado != null) myDivGrid.Append(Busqueda.NombreEstado.ToString());
                    myDivGrid.Append("</p>");

                    myDivGrid.Append("</div>");

                    myDivGrid.Append("<div class='divPalabrasClave'>");
                    if (Busqueda.PalabrasClave != null) myDivGrid.Append("<P>").Append(Busqueda.PalabrasClave.ToString()).Append("</P>");
                    myDivGrid.Append("</div>");

                    myDivGrid.Append("<div class='divPersonajes'>");
                    if (Busqueda.Personajes != null) myDivGrid.Append("<p>").Append(Busqueda.Personajes.ToString()).Append("</p>");
                    myDivGrid.Append("</div></div>");

                    divresultadoGrid.Append(myDivGrid.ToString());
                    myDivGrid.Clear();

                    contador += 1;
                }
                divresultadoGrid.Append("</div>");
                divresultado.Append(@"</ul> <div class=""clearfix""></div> ");
                divresultado.Append(@"<a id=""prev2"" class=""prev"" href=""#""></a>")
                    .Append(@"<a id=""next2"" class=""next"" href=""#""></a>")
                    .Append(@" <div id=""pager2"" class=""pager""></div>");

                this.divCarrusel.InnerHtml = divresultado.ToString();
                this.divGridCarrusel.InnerHtml = divresultadoGrid.ToString();
                this.divResultadoBusqueda.InnerHtml = "";
                
                ScriptManager.RegisterStartupScript (this, this.GetType(), "js", " ReAsignarCarrusel(); ", true);
                
                int tRegistros = Res.Hits;
                int tPaginas = Res.TotalPages;
                this.HDDTotalPaginas.Value = tPaginas.ToString();

                this.LblResultado.Text = "Total de Registros: " + tRegistros.ToString();
                this.LblPaginado.Text = "Pagina " + this.HddPaginas.Value.ToString() + " de " + tPaginas.ToString(); ;
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }
        
        /// <summary>
        /// Cambia de Vista a Carrusel
        /// Se modifica la bandera Inicion  con el valor de 1 que corresponde a carrusel
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btnCarrusel_Click(object sender, EventArgs e)
        {
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " banderaInicio=1; ", true);
            CargaParametros();
            this.lblVista.Value = "Carrusel";
            if (Request.QueryString["Tipo"] == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else RealizarBusquedaConSinOTFast();
        }

        /// <summary>
        /// Cambia de vista a Wall o Grid
        /// Se modifica la bandera Inicion  con el valor de 0 que corresponde a grid
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btnWall_Click(object sender, EventArgs e)
        {
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " banderaInicio=0; ", true);
            CargaParametros();
            this.lblVista.Value = "Grid";
            if (Request.QueryString["Tipo"] == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else RealizarBusquedaConSinOTFast();
        }

        /// <summary>
        /// Boton de paginado  atras 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void BotonAtras_Click(object sender, EventArgs e)
        {
            CargaParametros();
            this.HddPaginas.Value = (Convert.ToInt32(this.HddPaginas.Value) - 1).ToString();

            Offset = ((Convert.ToInt32(this.HddPaginas.Value.ToString()) * resultados)-resultados).ToString();
            if (Convert.ToInt32(Offset) < 0) Offset = "0";
            this.HddPaginado.Value = Offset;
            if (Convert.ToInt32(this.HddPaginas.Value) < 1) this.HddPaginas.Value = "1";
            if (HiddenTipo.Value == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else if (HiddenTipo.Value == "Avanzado") RealizarBusquedaConSinOTFast(); else if (HiddenTipo.Value == "Navegadores") RealizarBusquedaConSinOTFastNav();

        }

        /// <summary>
        /// Boton de Paginado siguiente
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void BtnSiguiente_Click(object sender, EventArgs e)
        {
            CargaParametros();
            Offset = (Convert.ToInt32(HddPaginas.Value) * resultados).ToString();
            this.HddPaginado.Value = Offset;
            this.HddPaginas.Value = (Convert.ToInt32(this.HddPaginas.Value) + 1).ToString();

            if (HiddenTipo.Value == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else if (HiddenTipo.Value == "Avanzado") RealizarBusquedaConSinOTFast(); else if (HiddenTipo.Value == "Navegadores") RealizarBusquedaConSinOTFastNav();
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }

        /// <summary>
        /// Cambia de vista a Wall o Grid
        /// Se modifica la bandera Inicion  con el valor de 2 que corresponde a grid
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void btnTeaser_Click(object sender, EventArgs e)
        {
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " banderaInicio=2; ", true);
            CargaParametros();
            this.lblVista.Value = "Teaser";
            if (Request.QueryString["Tipo"] == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else RealizarBusquedaConSinOTFast();
        }

        /// <summary>
        /// Muestra el Resultado de la busqueda en forma de Grid con el campo Teaser
        /// </summary>
        /// <param name="Res">Resultado de busqueda</param>
        private void BusquedaTeaser(FastResultset Res)
        {
            try
            {
                StringBuilder myDiv = new StringBuilder();
                StringBuilder myDivGrid = new StringBuilder();
                StringBuilder divresultado = new StringBuilder();
                StringBuilder divresultadoGrid = new StringBuilder();
                StringBuilder lista = new StringBuilder();
                
                divresultadoGrid.Append("<div class='carruselTitlesAb'><label>Imagen</label></div>");
                divresultadoGrid.Append("<div class='carruselTitlesBb'><label>OT</label></div>");
                divresultadoGrid.Append("<div class='carruselTitlesBb'><label>Resumen</label></div>");

                divresultadoGrid.Append(@"<div id=""DivPrincipal"" ");
                myDiv.Append(@"<div class=""divPrincipal"" >");
                string matType = "";
                int contador = ((resultados * Convert.ToInt32(HddPaginas.Value)) - resultados) + 1;

                foreach (BusquedaAvanzada Busqueda in Res.ListaBusquedaAvanzada)
                {
                    string HD = "";

                    if (Busqueda.IdFileName.Trim() != string.Empty && Busqueda.CveAgencia != 743)
                        matType = "MB";
                    else if (Busqueda.IdFileName.Trim() != string.Empty && Busqueda.CveAgencia == 743)
                        matType = "NT";
                    else
                        matType = "SV";

                    if (Busqueda.HDSD == "HD") HD = Busqueda.HDSD;

                    myDiv.Append(@"<div id=""DivContenedor"" class=""divContenedorTeaser"" >");

                    myDiv.Append(@"<div id=""DivImagen"" class=""divImagenTeaser"">")
                    .Append("<div>")
                    .Append("<div class=''><label>").Append(contador.ToString()).Append("</label> </div>")
                    .Append(@" <img onerror=""ImageError(this);"" alt=""Sin Imagen"" src='")
                    .Append((Busqueda.Imagen == string.Empty) ? "../../Images/noimage.png" : Busqueda.Imagen)
                    .Append("' data-Busqueda='").Append(JsonConvert.SerializeObject(Busqueda, Formatting.Indented)).Append("' ")
                    .Append(@" onclick=""imgVideo_click(this);"" class='divResultadoTeaser' />")
                    
                    .Append("<div> <label>").Append (matType).Append ("</label> </div>")
                    .Append("</div></div>");
                    myDiv.Append("<div id='Texto' class='divTextoTeaser' > ");
                    myDiv.Append("<div class='lblTeaser'> OT: ");
                    if (Busqueda.OrdenTrabajo != null) myDiv.Append(Busqueda.OrdenTrabajo.ToString());
                    myDiv.Append("</div>");

                    myDiv.Append("<div class='lblTeaser'> Titulo: ");
                    if (Busqueda.Titulo != null) myDiv.Append(Busqueda.Titulo.ToString());
                    myDiv.Append("</div>");

                    myDiv.Append("<div class='lblTeaser'> Programa: ");
                    if (Busqueda.Programas != null) myDiv.Append(Busqueda.Programas.ToString());
                    myDiv.Append("</div>");

                    myDiv.Append("<div class='lblTeaser'> Agencia: ");
                    if (Busqueda.NombreAgencia != null) myDiv.Append(Busqueda.NombreAgencia.ToString());
                    myDiv.Append("</div>");

                    myDiv.Append("<div class='lblTeaser'> Pais: ");
                    if (Busqueda.NombrePais != null) myDiv.Append(Busqueda.NombrePais.ToString());
                    myDiv.Append("</div>");

                    myDiv.Append("<div class='lblTeaser'> Estado: ");
                    if (Busqueda.NombreEstado != null) myDiv.Append(Busqueda.NombreEstado.ToString());
                    myDiv.Append("</div></div>")

                    .Append("<div class='divTextoTeaser2'>").Append(Busqueda.Teaser).Append("</div>");
                   
                    myDiv.Append("</div>");
                    divresultadoGrid.Append(myDiv.ToString());
                    myDiv.Clear();

                    contador += 1;
                    myDiv.Append("</label>");
                }
                divresultadoGrid.Append("</div>");
                this.divGridCarrusel.InnerHtml = divresultadoGrid.ToString();
                this.divResultadoBusqueda.InnerHtml = "";
                this.divCarrusel.InnerHtml = "";

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", " AsignarDragAndDropTeaser(); ", true);

                int tRegistros = Res.Hits;
                int tPaginas = Res.TotalPages;
                this.HDDTotalPaginas.Value = tPaginas.ToString();
                this.LblResultado.Text = "Total de Registros: " + tRegistros.ToString();
                this.LblPaginado.Text = "Pagina " + this.HddPaginas.Value.ToString() + " de " + tPaginas.ToString(); ;
            }
            catch (Exception ex)
            {
                logError(ex);
            }
        }

        protected void TreeView1_SelectedNodeChanged(object sender, EventArgs e)
        {


            TreeView Obj = (TreeView)sender;
            HiddenTipo.Value = "Navegadores";

            if (Obj.SelectedNode.Parent !=null)
            {
                string Padre = Obj.SelectedNode.Parent.Value;
                string Nodo = Obj.SelectedNode.Text;
                string Path = Obj.SelectedNode.ValuePath;

                int p = 0;
                int h = 0;
                foreach (TreeNode NPadre in this.TreeViewNavegador.Nodes)
                {
                    if (NPadre.Text == Padre)
                    {
                        h = 0;
                        foreach (TreeNode Hijo in NPadre.ChildNodes)
                        {
                            if (Hijo.Text == Nodo)
                            {
                                break;
                            }
                            h += 1;
                        }
                        break;
                    }
                    p += 1;
                }

                this.TreeViewNavegador.Nodes[p].ChildNodes.RemoveAt(h);
                TreeNode NuevoNodo = new TreeNode(Nodo, Path);
                TreeViewFiltro.Nodes.Add(NuevoNodo);
                CargaParametros();
                RealizarBusquedaConSinOTFastNav();
            }
        }

        protected void TreeViewFiltro_SelectedNodeChanged(object sender, EventArgs e)
        {
            TreeView Obj = (TreeView)sender;
            string Nodo = Obj.SelectedNode.Value;
            string Path = Obj.SelectedNode.ValuePath;

            int p = 0;
            foreach (TreeNode NPadre in this.TreeViewFiltro.Nodes)
            {
                if (NPadre.Value ==Nodo)
                {                    
                    break;
                }
                p += 1;
            }

            this.TreeViewFiltro.Nodes.RemoveAt(p);
            
            TreeNode NuevoNodo = new TreeNode(Nodo,Path);
            TreeViewNavegador.Nodes.Add(NuevoNodo);
            CargaParametros();
            RealizarBusquedaConSinOTFastNav();
        }

        protected void BntGoTo_Click(object sender, EventArgs e)
        {
            CargaParametros();
            Offset = ((Convert.ToInt32(txtPaginaDestino.Text) * resultados) - resultados).ToString();
            this.HddPaginado.Value = Offset;
            this.HddPaginas.Value = (Convert.ToInt32(this.txtPaginaDestino.Text)).ToString();

            if (HiddenTipo.Value == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else if (HiddenTipo.Value == "Avanzado") RealizarBusquedaConSinOTFast(); else if (HiddenTipo.Value == "Navegadores") RealizarBusquedaConSinOTFastNav();
        }

        protected void BntFin_Click(object sender, EventArgs e)
        {
            CargaParametros();
            Offset = ((Convert.ToInt32(this.HDDTotalPaginas.Value) * resultados)-resultados) .ToString();
            this.HddPaginado.Value = Offset;
            this.HddPaginas.Value = (Convert.ToInt32(this.HDDTotalPaginas.Value)).ToString();
            if (HiddenTipo.Value == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else if (HiddenTipo.Value == "Avanzado") RealizarBusquedaConSinOTFast(); else if (HiddenTipo.Value == "Navegadores") RealizarBusquedaConSinOTFastNav();
        }

        protected void BntInicio_Click(object sender, EventArgs e)
        {
            CargaParametros();
            Offset = (resultados).ToString();
            this.HddPaginado.Value = Offset;
            this.HddPaginas.Value = "1";
            if (HiddenTipo.Value == "Adquisiciones") ReliazaBusquedaConSinOTFastAdquisiciones(); else if (HiddenTipo.Value == "Avanzado") RealizarBusquedaConSinOTFast(); else if (HiddenTipo.Value == "Navegadores") RealizarBusquedaConSinOTFastNav();
        }
        private string ValidaBusquedaVideosBaneados()
        {
            try
            {
                string[] puestos = Session["userPuestos"].ToString().Split(',');
                string salida = "0";
                if (puestos.Length > 0)
                {
                    foreach (string p in puestos)
                    {
                        if (p == "9" || p == "59")
                        {
                            salida = "1";
                            break;
                        }
                    }
                }
                return salida;
            }
            catch 
            {
                return "0";            
            }
        }
    }
}
