using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Collections;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.NetworkInformation;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;
using CommunicationLib;
using TvAzteca.FiaTube.Bll_FIATube;
using TvAzteca.FiaTube.Bll_FIATube.Acoplados;
using TvAzteca.FiaTube.Bll_FIATube.Catalogos;
using TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioTrainee;
using TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi;
using TvAzteca.FiaTube.Bll_FIATube.DictionaryWebService;
using TvAzteca.FiaTube.Bll_FIATube.iNews;
using TvAzteca.FiaTube.Bll_FIATube.Pantallas;
using TvAzteca.FiaTube.Bll_FIATube.Relacionales;
using TvAzteca.FiaTube.Bll_FIATube.Reportes;
using TvAzteca.FiaTube.Entidades;
using TvAzteca.FiaTube.Entidades.Acoplados;
using TvAzteca.FiaTube.Entidades.iNews;
using TvAzteca.FiaTube.Entidades.Pantallas;
using TvAzteca.FiaTube.Entidades.Pivote;
using TvAzteca.FiaTube.Entidades.Reportes;
using TvAzteca.FiaTube.Entidades.Trainee;
using TvAzteca.FiaTube.Entidades.Vidi;
using System.Web.Script.Services;
using System;
using Azteca.Utility.Security;
using TvAzteca.FiaTube.Entidades.Monitoreo;
using System.Web.Script.Serialization;
using System.Threading;


namespace FIATubeHtml5.ServicesAsmx
{
    /// <summary>
    /// Summary description for WebService_FIATube
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_FIATube : System.Web.Services.WebService
    {
        #region ValidateUser

        private void ValidateUser()
        {
            bool IsAuthenticated = false;
            try
            {
                if (!validateRequest())
                    throw new System.Exception("Solicitud no valida.");
             
                IsAuthenticated = true; 
                if (!IsAuthenticated)
                    throw new System.Exception("Usuario no valido");
            }
            catch (Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }
        private void ValidateBannedVideos()
        {
            string strAuth = HttpContext.Current.Session["UserPuestos"].ToString();

        }

        #endregion ValidateUser

        private static bool serviceRestoreLoaded = false;
        private object padlockSrvRestore = new object();

        private List<String> acceptedUrls = new List<string>();

        private bool validateRequest()
        {
            string temp = string.Empty;
            string requestUrl = String.Empty;
            Rijndael encript = new Rijndael();

            try
            {
                if (acceptedUrls == null || acceptedUrls.Count() == 0)
                {
                    acceptedUrls = new List<string>();
                    temp = encript.Transmute(System.Configuration.ConfigurationManager.AppSettings["aceptedUrls"], enmTransformType.intDecrypt);
                    if (temp == null || temp.Trim().Equals(String.Empty))
                        return false;
                    foreach (string url in temp.Split(','))
                        acceptedUrls.Add(url);
                }

                requestUrl = HttpContext.Current.Request.Url.AbsoluteUri.ToUpper();
                foreach (String path in acceptedUrls)
                {
                    if (requestUrl.StartsWith(path.ToUpper()))
                        return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        #region Metodos DeepZoom
        /// <summary>
        /// Obtiene los registros del resultado de una comsulta por varios parametros
        /// asigandos
        /// </summary>
        /// <param name="textoFiltro">Texto a filtrar</param>
        /// /// <param name="cveEmpleado">Identificador unico del empleado</param>
        /// <param name="cvePrograma">Identificador unico del programa</param>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <param name="cvePais">Identificador unico del pais</param>
        /// <param name="cveEstado">Identificador unico del estado</param>
        /// <param name="cveCiudad">Identificador unico de la ciudad</param>
        /// <param name="fechaIni">Fecha de inicio</param>
        /// <param name="fechaFin">Fecha de fin</param>
        /// <param name="esBusquedaAvanzada">Bandera q indica q es busqueda avanzada</param>
        /// <returns>IList con objetos de tipo BusquedaAvanzada</returns>

        [WebMethod]
        public List<BusquedaAvanzada> ObtenerBusquedaAvanzada(string textoFiltro, int cveEmpleado, int cvePrograma, int cveSeccion, int cvePais, int cveEstado, int cveCiudad, DateTime fechaIni, DateTime fechaFin, bool esBusquedaAvanzada)
        {
            ValidateUser();
            return (List<BusquedaAvanzada>)MngNegocioConsulta.ObtenerBusquedaAvanzada(textoFiltro, cveEmpleado, cvePrograma, cveSeccion, cvePais, cveEstado, cveCiudad, fechaIni, fechaFin, esBusquedaAvanzada);
        }

        /// <summary>
        /// Obtiene los registros del resultado de una comsulta por varios parametros
        /// asigandos
        /// </summary>
        /// <param name="cveOT">clave de la ot</param>
        /// <param name="textoFiltro">Texto a filtrar</param>
        /// <param name="cveEmpleado">Identificador unico del empleado</param>
        /// <param name="cvePrograma">Identificador unico del programa</param>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <param name="cvePais">Identificador unico del pais</param>
        /// <param name="cveEstado">Identificador unico del estado</param>
        /// <param name="cveCiudad">Identificador unico de la ciudad</param>
        /// <param name="fechaIni">Fecha de inicio</param>
        /// <param name="fechaFin">Fecha de fin</param>
        /// <param name="esBusquedaAvanzada">Bandera q indica q es busqueda avanzada</param>
        /// <param name="soloConVideo">Bandera q indica si la busqueda solo incluye los q tengan video</param>
        /// <param name="soloNotaTerminada">Filtra solamente las notas terminadas</param>
        /// <param name="soloMaterialBruto">Filtra solamente el material bruto</param>
        /// <returns>IList con objetos de tipo BusquedaAvanzada</returns>
        [WebMethod]
        public List<BusquedaAvanzada> ObtenerBusquedaAvanzadaConSinOT(string cveOT, string textoFiltro, int cveEmpleado, int cvePrograma, int cveSeccion, int cvePais, int cveEstado, int cveCiudad, DateTime fechaIni, DateTime fechaFin, bool esBusquedaAvanzada, bool soloConVideo, bool soloNotaTerminada, bool soloMaterialBruto, string noCinta, int cveAgencia, string NumOT, string VdoIdFileName, int PosIni, int PosFin, bool Baneados)
        {
            ValidateUser();
            return (List<BusquedaAvanzada>)MngNegocioConsulta.ObtenerBusquedaAvanzadaConySinOT(cveOT, textoFiltro, cveEmpleado, cvePrograma, cveSeccion, cvePais, cveEstado, cveCiudad, fechaIni, fechaFin, esBusquedaAvanzada, soloConVideo, soloNotaTerminada, soloMaterialBruto, noCinta, cveAgencia, NumOT, VdoIdFileName, PosIni, PosFin, Baneados);
        }

        [WebMethod]
        public List<ContadorRows> GetNumTotalRegistros(
        string cveOT, string textoFiltro, int cveEmpleado, int cvePrograma, int cveSeccion, int cvePais, int cveEstado,
        int cveCiudad, DateTime fechaIni, DateTime fechaFin, bool esBusquedaAvanzada, bool soloConVideo, bool soloNotaTerminada,
        bool soloMaterialBruto, string noCinta, int cveAgencia, string numOT, string VdoIdFileName, bool Baneados)
        {
            ValidateUser();
            return MngNegocioConsulta.GetNumTotalRegistros(cveOT, textoFiltro, cveEmpleado, cvePrograma, cveSeccion, cvePais, cveEstado, cveCiudad, fechaIni, fechaFin, esBusquedaAvanzada, soloConVideo, soloNotaTerminada, soloMaterialBruto, noCinta, cveAgencia, numOT, VdoIdFileName, Baneados);
        }

        [WebMethod]
        public List<BusquedaAvanzada> ObtenerBusquedaAvanzadaBiz(string cveOT, string textoFiltro, int cveEmpleado, int cvePrograma, int cveSeccion, int cvePais, int cveEstado, int cveCiudad, DateTime fechaIni, DateTime fechaFin, bool esBusquedaAvanzada, bool soloConVideo, bool soloNotaTerminada, bool soloMaterialBruto, string noCinta, int cveAgencia, string NumOT)
        {
            ValidateUser();
            return (List<BusquedaAvanzada>)MngNegocioConsulta.ObtenerBusquedaAvanzadaConySinOT(cveOT, textoFiltro, cveEmpleado, cvePrograma, cveSeccion, cvePais, cveEstado, cveCiudad, fechaIni, fechaFin, esBusquedaAvanzada, soloConVideo, soloNotaTerminada, soloMaterialBruto, noCinta, cveAgencia, NumOT, "", 0, 0, true);
        }

        [WebMethod]
        public List<Consulta> CrearNuevaCollection(string numEmpleado, string busqueda)
        {
            ValidateUser();
            return GetListaImagenesExistentes((List<Consulta>)MngNegocioConsulta.GetListSearchByKeyWord(busqueda));
        }

        public List<Consulta> GetListaFromXML(string strXML)
        {
            ValidateUser();
            List<Consulta> oListaConsulta = new List<Consulta>();


            if (strXML != "")
            {

                TextReader oreader = new StringReader(strXML);
                XmlReader reader = XmlReader.Create(oreader);
                Consulta oConsulta = new Consulta();

                while (reader.Read())
                {

                    if (reader.NodeType == XmlNodeType.Element && reader.Name == "Image")
                        oConsulta = new Consulta();
                    else if (reader.NodeType == XmlNodeType.Element && reader.Name == "FileName")
                        oConsulta.VideoFileName = reader.ReadElementContentAsString();
                    else if (reader.NodeType == XmlNodeType.Element && reader.Name == "Titulo")
                        oConsulta.Titulo = reader.ReadElementContentAsString();
                    else if (reader.NodeType == XmlNodeType.Element && reader.Name == "Suceso")
                        oConsulta.Suceso = reader.ReadElementContentAsString();
                    else if (reader.NodeType == XmlNodeType.EndElement && reader.Name == "Image")
                        oListaConsulta.Add(oConsulta);
                }
            }

            return oListaConsulta;
        }

        public object[] GetInfoImages(List<Consulta> lstImages)
        {

            List<string> oListaImagenes = new List<string>();
            string[,] infoImagen;
            infoImagen = new string[lstImages.Count, 2];
            object[] oArray = new object[2];
            int index = 0;
            foreach (Consulta oConsulta in lstImages)
            {
                oListaImagenes.Add(oConsulta.VideoFileName + ".xml");

                infoImagen[index, 0] = oConsulta.Titulo.ToString();
                infoImagen[index, 1] = oConsulta.Suceso.ToString() == null ? "" : oConsulta.Suceso.ToString();
                index += 1;
            }

            oArray[0] = oListaImagenes;
            oArray[1] = infoImagen;
            return oArray;
        }

        public static List<Consulta> GetListaImagenesExistentes(List<Consulta> lstConsulta)
        {
            string dest = HttpContext.Current.Server.MapPath(HttpContext.Current.Request.ApplicationPath);
            dest += @"ClientBin\GeneratedImages";
            List<Consulta> ImagenesExistentes = new List<Consulta>();
            Consulta tmp;
            foreach (Consulta image in lstConsulta)
            {
                string target = dest + "\\output_images\\" + image.VideoFileName;
                if (File.Exists(target + ".xml"))
                {
                    tmp = new Consulta();
                    tmp.FotoFin = image.FotoFin;
                    tmp.FotoIni = image.FotoIni;
                    tmp.idFileName = image.idFileName;
                    tmp.LLaveOT = image.LLaveOT;
                    tmp.PalabrasClaves = image.PalabrasClaves;
                    tmp.Suceso = image.Suceso;
                    tmp.Titulo = image.Titulo;
                    tmp.VideoFileName = image.VideoFileName;
                    ImagenesExistentes.Add(tmp);
                }
            }
            return ImagenesExistentes;
        }

        [WebMethod]
        public List<Consulta> GetListaImagenesUniverse()
        {
            ValidateUser();
            string dest = HttpContext.Current.Server.MapPath(HttpContext.Current.Request.ApplicationPath);
            dest += @"ClientBin\GeneratedImages";

            List<Consulta> ImagenesExistentes = new List<Consulta>();
            Consulta tmp;
            DirectoryInfo oDirInfo = new DirectoryInfo(dest + "\\output_images\\");
            foreach (FileInfo image in oDirInfo.GetFiles("*.xml"))
            {
                tmp = new Consulta();
                tmp.FotoFin = "";
                tmp.FotoIni = "";
                tmp.idFileName = "";
                tmp.LLaveOT = 0;
                tmp.PalabrasClaves = "";
                tmp.Suceso = "";
                tmp.Titulo = "";
                tmp.VideoFileName = image.Name;
                ImagenesExistentes.Add(tmp);
            }
            return ImagenesExistentes;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="cveOT"></param>
        /// <param name="textoFiltro"></param>
        /// <param name="cveEmpleado"></param>
        /// <param name="cvePrograma"></param>
        /// <param name="cveSeccion"></param>
        /// <param name="cvePais"></param>
        /// <param name="cveEstado"></param>
        /// <param name="cveCiudad"></param>
        /// <param name="fechaIni"></param>
        /// <param name="fechaFin"></param>
        /// <param name="esBusquedaAvanzada"></param>
        /// <param name="soloConVideo"></param>
        /// <param name="soloNotaTerminada"></param>
        /// <param name="soloMaterialBruto"></param>
        /// <param name="noCinta"></param>
        /// <param name="cveAgencia"></param>
        /// <param name="NumOT"></param>
        /// <param name="VdoIdFileName"></param>
        /// <param name="PosIni"></param>
        /// <param name="PosFin"></param>
        /// <param name="Baneados"></param>
        /// <param name="perpage"></param>
        /// <param name="offset"></param>
        /// <param name="palabrasClave"></param>
        /// <param name="OptBusqueda">and: todas las palabras, or:cualquiera de las palabras, string: frase completa</param>
        /// <returns></returns>
        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaConSinOTFast(string cveOT, string textoFiltro, string Reportero, string cvePrograma, string cveSeccion, string cvePais, string cveEstado, string cveCiudad, string fechaInicial, string fechaFinal, string esBusquedaAvanzada, string soloConVideo, string soloNotaTerminada, string soloMaterialBruto, string noCinta, string cveAgencia, string NumOT, string VdoIdFileName, string PosInicial, string PosFinal, string baneados, string perpage, string offset, string palabrasClave, string OptBusqueda, string Usuario, string GuardaBusqueda, string FinalCut, string opcVideoteca, string opcPlaneacion, string opcGuion, string CCaption, string HDSD)
        {
            DateTime fechaIni = DateTime.ParseExact((fechaInicial == "") ? DateTime.Now.ToString("yyyy-MM-dd") : fechaInicial, "yyyy-MM-dd", null);
            DateTime fechaFin = DateTime.ParseExact((fechaFinal == "") ? DateTime.Now.ToString("yyyy-MM-dd") : fechaFinal, "yyyy-MM-dd", null);
            int CvePrograma = 0;
            int.TryParse(((cvePrograma == string.Empty) ? "0" : cvePrograma), out CvePrograma);
            int CveSeccion = 0;
            int.TryParse(((cveSeccion == string.Empty) ? "0" : cveSeccion), out CveSeccion);
            int CvePais = 0;
            int.TryParse(((cvePais == string.Empty) ? "0" : cvePais), out CvePais);
            int CveEstado = 0;
            int.TryParse(((cveEstado == string.Empty) ? "0" : cveEstado), out CveEstado);
            int CveCiudad = 0;
            int.TryParse(((cveCiudad == string.Empty) ? "0" : cveCiudad), out CveCiudad);
            int CveAgencia = 0;
            int.TryParse(((cveAgencia == string.Empty) ? "0" : cveAgencia), out CveAgencia);
            int Baneados = 0;
            int.TryParse(((baneados == string.Empty) ? "0" : baneados), out Baneados);
            int PosIni = 0;
            int.TryParse(((PosInicial == string.Empty) ? "0" : PosInicial), out PosIni);
            int PosFin = 0;
            int.TryParse(((PosFinal == string.Empty) ? "0" : PosFinal), out PosFin);
            int Perpage = 0;
            int.TryParse(((perpage == string.Empty) ? "0" : perpage), out Perpage);
            int Offset = 0;
            int.TryParse(((offset == string.Empty) ? "0" : offset), out Offset);
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzada(cveOT, textoFiltro, Reportero, CvePrograma, CveSeccion, CvePais, CveEstado, CveCiudad, fechaIni, fechaFin, ((esBusquedaAvanzada == "1") ? true : false), ((soloConVideo == "1") ? true : false), ((soloNotaTerminada == "true") ? true : false), ((soloMaterialBruto == "true") ? true : false), noCinta, CveAgencia, NumOT, VdoIdFileName, ((Baneados == 1) ? true : false), Perpage, Offset, palabrasClave, OptBusqueda, Usuario, ((GuardaBusqueda == "1") ? true : false), FinalCut, ((opcVideoteca == "1") ? true : false), ((opcPlaneacion == "1") ? true : false), ((opcGuion == "1") ? true : false), null, ((CCaption == "1") ? true : false), HDSD, "");
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="cveOT"></param>
        /// <param name="textoFiltro"></param>
        /// <param name="cveEmpleado"></param>
        /// <param name="cvePrograma"></param>
        /// <param name="cveSeccion"></param>
        /// <param name="cvePais"></param>
        /// <param name="cveEstado"></param>
        /// <param name="cveCiudad"></param>
        /// <param name="fechaIni"></param>
        /// <param name="fechaFin"></param>
        /// <param name="esBusquedaAvanzada"></param>
        /// <param name="soloConVideo"></param>
        /// <param name="soloNotaTerminada"></param>
        /// <param name="soloMaterialBruto"></param>
        /// <param name="noCinta"></param>
        /// <param name="cveAgencia"></param>
        /// <param name="NumOT"></param>
        /// <param name="VdoIdFileName"></param>
        /// <param name="PosIni"></param>
        /// <param name="PosFin"></param>
        /// <param name="Baneados"></param>
        /// <param name="perpage"></param>
        /// <param name="offset"></param>
        /// <param name="palabrasClave"></param>
        /// <param name="OptBusqueda">and: todas las palabras, or:cualquiera de las palabras, string: frase completa</param>
        /// <returns></returns>
        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaConSinOTFastAdquisisiones(string VdoIdFileName, int CvePrograma, bool Baneados, bool SoloConVideo, string TextoFiltro, bool OpcVideoteca, bool OpcPlaneacion, bool OpcGuion, string OptBusqueda, string TituloBusqueda, string TituloCapituloOrig, string TituloCapituloTrad, int NumeroCapitulo, int CveGenero, string NombGenero, bool GuardaBusqueda, string Usuario, int Offset, int Perpage, string FinalCut, string PalCve, string Sinopsis, string Elenco)
        {
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzadaAdquisisiones(VdoIdFileName, CvePrograma, Baneados, SoloConVideo, TextoFiltro, OpcVideoteca, OpcPlaneacion, OpcGuion, OptBusqueda, TituloBusqueda, TituloCapituloOrig, TituloCapituloTrad, NumeroCapitulo, CveGenero, NombGenero, GuardaBusqueda, Usuario, Offset, Perpage, FinalCut, PalCve, Sinopsis, Elenco);
        }

        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaConSinOTFastNavAdq(string VdoIdFileName, int CvePrograma, bool Baneados, bool SoloConVideo, string TextoFiltro, bool OpcVideoteca, bool OpcPlaneacion, bool OpcGuion, string OptBusqueda, string TituloBusqueda, string TituloCapituloOrig, string TituloCapituloTrad, int NumeroCapitulo, int CveGenero, string NombGenero, bool GuardaBusqueda, string Usuario, int Offset, int Perpage, string FinalCut, string PalCve, string Sinopsis, string Elenco)
        {
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzadaAdquisisiones(VdoIdFileName, CvePrograma, Baneados, SoloConVideo, TextoFiltro, OpcVideoteca, OpcPlaneacion, OpcGuion, OptBusqueda, TituloBusqueda, TituloCapituloOrig, TituloCapituloTrad, NumeroCapitulo, CveGenero, NombGenero, GuardaBusqueda, Usuario, Offset, Perpage, FinalCut, PalCve, Sinopsis, Elenco);
        }

        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaConSinOTFastNav(string cveOT, string textoFiltro, string Reportero, int cvePrograma, int cveSeccion, int cvePais,
            int cveEstado, int cveCiudad, DateTime fechaIni, DateTime fechaFin, bool esBusquedaAvanzada, bool soloConVideo, bool soloNotaTerminada,
            bool soloMaterialBruto, string noCinta, int cveAgencia, string NumOT, string VdoIdFileName, int PosIni, int PosFin, bool Baneados, int perpage,
            int offset, string palabrasClave, string OptBusqueda, string Usuario, bool GuardaBusqueda, string FinalCut, bool opcVideoteca, bool opcPlaneacion,
            bool opcGuion, List<NavegadorElemento> lstNavSeleccionados, bool CCaption, string HDSD)
        {
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzada(cveOT, textoFiltro, Reportero, cvePrograma, cveSeccion, cvePais, cveEstado, cveCiudad, fechaIni, fechaFin, esBusquedaAvanzada, soloConVideo, soloNotaTerminada, soloMaterialBruto, noCinta, cveAgencia, NumOT, VdoIdFileName, Baneados, perpage, offset, palabrasClave, OptBusqueda, Usuario, GuardaBusqueda, FinalCut, opcVideoteca, opcPlaneacion, opcGuion, lstNavSeleccionados, CCaption, HDSD, "");
        }



        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaFastFromFQL(string query, int perpage, int offset)
        {
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzada(query, perpage, offset, null);
        }
        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaFastFromFQLNav(string query, int perpage, int offset, List<NavegadorElemento> lstNavSeleccionados)
        {
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzada(query, perpage, offset, lstNavSeleccionados);
        }
        [WebMethod]
        public FastResultset ObtenerBusquedaAvanzadaFastBDFromFQL(string query, int paginado, int posini)
        {
            ValidateUser();
            return MngNegocioFast.BusquedaAvanzadaBD(query, paginado, posini);
        }

        [WebMethod]
        public int GetNumTotalRegistrosFast(
        string cveOT, string textoFiltro, string Reportero, int cvePrograma, int cveSeccion, int cvePais, int cveEstado,
        int cveCiudad, DateTime fechaIni, DateTime fechaFin, bool esBusquedaAvanzada, bool soloConVideo, bool soloNotaTerminada,
        bool soloMaterialBruto, string noCinta, int cveAgencia, string numOT, string VdoIdFileName, bool Baneados, string palabrasClave, string OptBusqueda,
        bool opcVideoteca, bool opcPlaneacion, bool opcGuion, bool CCaption, string HDSD)
        {
            ValidateUser();
            return MngNegocioFast.GetTotalRegistros(cveOT, textoFiltro, Reportero, cvePrograma, cveSeccion, cvePais, cveEstado, cveCiudad, fechaIni, fechaFin, esBusquedaAvanzada, soloConVideo, soloNotaTerminada, soloMaterialBruto, noCinta, cveAgencia, numOT, VdoIdFileName, Baneados, palabrasClave, OptBusqueda, opcVideoteca, opcPlaneacion, opcGuion, CCaption, HDSD, "");
        }

        #endregion

        #region Menus
        [WebMethod]
        public List<TDI_Menus> GetNodosPadre()
        {
            ValidateUser();
            return (List<TDI_Menus>)MgnTDI_Menus.ObtenerNodosPadre();
        }

        [WebMethod]
        public List<TDI_Menus> GetDatosGrid(int idMenuDepe)
        {
            ValidateUser();
            return (List<TDI_Menus>)MgnTDI_Menus.ObtieneDatosMenu(idMenuDepe);
        }

        [WebMethod]
        public bool SaveMenu(TDI_Menus oMenu)
        {
            ValidateUser();
            return MgnTDI_Menus.GuardaMenu(oMenu);
        }

        [WebMethod]
        public List<MenuEmpleado> GetMenuPuesto(int cvePuesto)
        {
            ValidateUser();
            return (List<MenuEmpleado>)MgnTDI_Menus.ObtenerMenuPuesto(cvePuesto);
        }

        [WebMethod]
        public List<MenuEmpleado> GetMenuEmpleado(string Empl_llav_pr)
        {
            ValidateUser();
            return (List<MenuEmpleado>)MgnTDI_Menus.ObtenerTodoMenu(Empl_llav_pr);
        }

        [WebMethod]
        public bool ActualizaMenu(TDI_Menus oMenu)
        {
            ValidateUser();
            return MgnTDI_Menus.ActualizaMenu(oMenu);
        }

        [WebMethod]
        public string GetDescNodoPadre(string idNodoPadre)
        {
            ValidateUser();
            return MgnTDI_Menus.GetDescNodoPadre(idNodoPadre);
        }

        [WebMethod]
        public string GetKeyForDecrypt()
        {
            ValidateUser();
            return HttpContext.Current.Session["CurrentGuid"].ToString();
        }
        #endregion

        #region Metodos OT
        [WebMethod]
        public int GuardarOT(THE_OrdenTrabajoIpad oOrdenTrabajo, THE_LogTransacciones oLogTran)
        {
            ValidateUser();
            THE_OrdenTrabajo aux = oOrdenTrabajo.get();
            if (MngNegocioOrdenTrabajo.GuardarOrdenTrabajo(aux))
            {
                oLogTran.CveTran = new TDI_Transaccion();
                oLogTran.Descripcion = "Se genero una nueva OT: " + aux.CveOrdenTrabajo.ToString();
                oLogTran.CveTran.CveTransaccion = 1;
                oLogTran.Fecha = DateTime.Now;
                MngNegocioLogTransacciones.GuardarLogTransacciones(oLogTran);
                return aux.CveOrdenTrabajo;
            }
            else
            { return -1; }
        }

        [WebMethod]
        public THE_OrdenTrabajoIpad GuardarOT2(THE_OrdenTrabajoIpad oOrdenTrabajo, THE_LogTransacciones oLogTran)
        {
            ValidateUser();
            THE_OrdenTrabajo aux = oOrdenTrabajo.get();
            if (MngNegocioOrdenTrabajo.GuardarOrdenTrabajo(aux))
            {
                THE_OrdenTrabajo ot = MngNegocioOrdenTrabajo.ObtenerOrdenTrabajo(aux.CveOrdenTrabajo)[0];
                oLogTran.CveTran = new TDI_Transaccion();
                oLogTran.Descripcion = "Se genero una nueva OT: " + aux.CveOrdenTrabajo.ToString();
                oLogTran.CveTran.CveTransaccion = 1;
                oLogTran.Fecha = DateTime.Now;
                MngNegocioLogTransacciones.GuardarLogTransacciones(oLogTran);
                ot.FabrLlave.Programa = new List<TDI_Programa>();
                return new THE_OrdenTrabajoIpad(ot);
            }
            else
            { return null; }
        }

        [WebMethod]
        public int ActualizaOT(THE_OrdenTrabajoIpad oOrdenTrabajo)
        {
            ValidateUser();
            THE_OrdenTrabajo aux = oOrdenTrabajo.get();
            if (MngNegocioOrdenTrabajo.ActualizarOrdenTrabajo(aux))
            { return aux.CveOrdenTrabajo; }
            else
            { return -1; }
        }

        [WebMethod]
        public int GuardarAgendaSemanal(THE_AgendaSemanal oAgendaSemana)
        {
            ValidateUser();
            if (MngNegocioAgendaSemanal.GuardarAgendaSemanal(oAgendaSemana))
                return oAgendaSemana.CveAgendaSemanal;
            else
                return -1;
        }

        [WebMethod]
        public bool ActualizaAgendaSemanal(THE_AgendaSemanal oAgendaSemana)
        {
            ValidateUser();
            return MngNegocioAgendaSemanal.ActualizarAgendaSemanal(oAgendaSemana);
        }

        [WebMethod]
        public int GuardarEquipoTrabajo(THE_EquipoTrabajoIpad oEquipoTrabajo)
        {
            THE_EquipoTrabajo aux;
            ValidateUser();

            aux = oEquipoTrabajo.get();
            if (MngNegocioEquipoTrabajo.GuardarEquipoTrabajo(aux))
                return aux.CveEquipoTrabajo;
            else
                return -1;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public string GuardarEquipoTrabajoRedactor(THE_EquipoTrabajoIpad oEquipoTrabajo)
        {
            ValidateUser();
            if (MngNegocioEquipoTrabajo.GuardaEquipoTrabajoRedactor(oEquipoTrabajo.get()))
                return oEquipoTrabajo.CveEquipoTrabajo.ToString() + "_" + oEquipoTrabajo.EmpleadoLlavePrimaria.EmpleadoNombre;
            else
                return "-1_" + oEquipoTrabajo.EmpleadoLlavePrimaria.EmpleadoNombre; ;
        }

        [WebMethod]
        public int ActualizaEquipoTrabajo(THE_EquipoTrabajoIpad oEquipoTrabajo)
        {
            THE_EquipoTrabajo tmp = oEquipoTrabajo.get();
            ValidateUser();
            if (MngNegocioEquipoTrabajo.ActualizarEquipoTrabajo(tmp))
                return tmp.CveEquipoTrabajo;
            else
                return -1;
        }

        [WebMethod]
        public int GuardarLogistica(THE_LogisticaIpad oLogistica)
        {/*Falta Implementar que regrese la llave primaria*/
            ValidateUser();
            THE_Logistica myLogistica = oLogistica.get();
            if (MngNegocioLogistica.GuardarLogistica(myLogistica))
                return myLogistica.CveLogistica;
            else
                return -1;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public int ActualizaLogistica(THE_LogisticaIpad oLogistica)
        {
            ValidateUser();
            if (MngNegocioLogistica.ActualizarLogistica(oLogistica.get()))
                return oLogistica.CveLogistica;
            else
                return -1;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public bool BorraLogistica(THE_LogisticaIpad oLogistica)
        {
            ValidateUser();
            return MngNegocioLogistica.BorrarLogistica(oLogistica.get());
        }

        [WebMethod]
        public TDI_Cliente ObtieneClienteByCveEmpleado(int CveEmpleado)
        {
            ValidateUser();
            List<TDI_Cliente> Cliente = (List<TDI_Cliente>)MngNegocioCliente.ObtieneClienteByCveEmpleado(CveEmpleado);
            TDI_Cliente oCliente = new TDI_Cliente();
            foreach (TDI_Cliente oClienteTemp in Cliente)
            {
                oCliente = oClienteTemp;
            }
            return oCliente;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public RegresoOrdenTrabajoIpad AlmacenaDatosOrdenTrabajo(int cveEmpleadoSeccion, THE_LogisticaIpad Logistica, THE_OrdenTrabajoIpad oOrdenTrabajo, THE_AgendaSemanal oAgendaSemanal, List<THE_EquipoTrabajoIpad> lstEquipoTrabajoIpad, bool esNueva, THE_LogTransacciones Tran)
        {
            ValidateUser();

            List<THE_EquipoTrabajo> lstEquipoTrabajo = new List<THE_EquipoTrabajo>();

            foreach (THE_EquipoTrabajoIpad EquipoTrabajoIpad in lstEquipoTrabajoIpad)
            {
                lstEquipoTrabajo.Add(EquipoTrabajoIpad.get());
            }
            RegresoOrdenTrabajo myot = MngNegocioOrdenTrabajo.AlmacenaDatosOrdenTrabajo2(cveEmpleadoSeccion, oOrdenTrabajo.get(), oAgendaSemanal, lstEquipoTrabajo, esNueva, ((Logistica != null) ? Logistica.get() : null), Tran);
            RegresoOrdenTrabajoIpad otIPAD = new RegresoOrdenTrabajoIpad(myot);
            if (otIPAD.oOrdenTrabajo.FabrLlave != null)
                otIPAD.oOrdenTrabajo.FabrLlave.Programa = new List<TDI_Programa>();
            if (otIPAD.Logistica != null && otIPAD.Logistica.CveOrdenTrabajo != null && otIPAD.Logistica.CveOrdenTrabajo.FabrLlave != null)
                otIPAD.Logistica.CveOrdenTrabajo.FabrLlave.Programa = new List<TDI_Programa>();
            return otIPAD;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public RegresoOrdenTrabajoIpad AlmacenaDatosOrdenTrabajoCompra(int cveEmpleadoSeccion, string CveUsuario, List<CompraOTIpad> lstCompraOTIpad, THE_LogisticaIpad Logistica, THE_OrdenTrabajoIpad oOrdenTrabajo, THE_AgendaSemanal oAgendaSemanal, List<THE_EquipoTrabajoIpad> lstEquipoTrabajoIpad, bool esNueva, THE_LogTransacciones Tran)
        {
            RegresoOrdenTrabajoIpad ipad = null;
            try
            {
                ValidateUser();
                List<CompraOT> lstCompraOT = new List<CompraOT>();
                foreach (CompraOTIpad CompraOTIpad in lstCompraOTIpad)
                {
                    lstCompraOT.Add(CompraOTIpad.get());
                }

                List<THE_EquipoTrabajo> lstEquipoTrabajo = new List<THE_EquipoTrabajo>();
                foreach (THE_EquipoTrabajoIpad EquipoTrabajo in lstEquipoTrabajoIpad)
                {
                    lstEquipoTrabajo.Add(EquipoTrabajo.get());
                }
                RegresoOrdenTrabajo myot = MngNegocioOrdenTrabajo.AlmacenaDatosOrdenTrabajoCompra2(cveEmpleadoSeccion, CveUsuario, lstCompraOT, Logistica == null ? null : Logistica.get(), oOrdenTrabajo.get(), oAgendaSemanal, lstEquipoTrabajo, esNueva, Tran);
                if (myot.oOrdenTrabajo.FabrLlave != null)
                    myot.oOrdenTrabajo.FabrLlave.Programa = new List<TDI_Programa>();
                if (myot.Logistica != null && myot.Logistica.CveOrdenTrabajo != null && myot.Logistica.CveOrdenTrabajo.FabrLlave != null)
                    myot.Logistica.CveOrdenTrabajo.FabrLlave.Programa = new List<TDI_Programa>();                
                ipad = new RegresoOrdenTrabajoIpad(myot);
            }
            catch (Exception ex)
            {

            }
            return ipad;
        }

        [WebMethod]
        public RegresoOrdenTrabajoIpad AlmacenaDatosOrdenTrabajoRegreso(int cveEmpleadoSeccion, THE_OrdenTrabajoIpad oOrdenTrabajo, THE_AgendaSemanal oAgendaSemanal, List<THE_EquipoTrabajoIpad> lstEquipoTrabajoIpad, bool esNueva, THE_LogTransacciones Tran)
        {
            List<THE_EquipoTrabajo> lstEquipoTrabajo = new List<THE_EquipoTrabajo>();

            foreach (THE_EquipoTrabajoIpad EquipoTrabajo in lstEquipoTrabajoIpad)
            {
                lstEquipoTrabajo.Add(EquipoTrabajo.get());
            }
            ValidateUser();
            return new RegresoOrdenTrabajoIpad(MngNegocioOrdenTrabajo.AlmacenaDatosOrdenTrabajoRegreso(cveEmpleadoSeccion, oOrdenTrabajo.get(), oAgendaSemanal, lstEquipoTrabajo, esNueva, Tran));
        }

        [WebMethod]
        public RegresoOrdenTrabajoIpad AlmacenaDatosOrdenTrabajoCompraIngestion(int cveEmpleado, string CveUsuario, List<CompraOTIpad> ComprasIpad, THE_LogisticaIpad Logistica, THE_OrdenTrabajoIpad oOrdenTrabajo, THE_AgendaSemanal oAgendaSemanal, List<THE_EquipoTrabajoIpad> lstEquipoTrabajoIpad, bool esNueva, THE_LogTransacciones Tran)
        {
            ValidateUser();

            List<CompraOT> Compras = new List<CompraOT>();
            foreach (CompraOTIpad CompraIpad in ComprasIpad)
            {
                Compras.Add(CompraIpad.get());
            }

            List<THE_EquipoTrabajo> lstEquipoTrabajo = new List<THE_EquipoTrabajo>();
            foreach (THE_EquipoTrabajoIpad EquipoTrabajo in lstEquipoTrabajoIpad)
            {
                lstEquipoTrabajo.Add(EquipoTrabajo.get());
            }


            oOrdenTrabajo.CveSeccion = ObtieneSeccionByIdEmpleado(cveEmpleado);            
            oOrdenTrabajo.CveCliente = ObtieneClienteByCveEmpleado(oOrdenTrabajo.CveSeccion.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria);
            return new RegresoOrdenTrabajoIpad(MngNegocioOrdenTrabajo.AlmacenaDatosOrdenTrabajoCompra(oOrdenTrabajo.CveSeccion.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria, CveUsuario, Compras, Logistica.get(), oOrdenTrabajo.get(), oAgendaSemanal, lstEquipoTrabajo, esNueva, Tran));
        }

        [WebMethod]
        public List<TDI_EMPL> GetReporterosList()
        {
            ValidateUser();
            return (List<TDI_EMPL>)MngNegocioOrdenTrabajo.GetReporterosList();
        }

        [WebMethod]
        public List<TDI_EMPL> GetReporterosListRecuperacionGuion()
        {
            ValidateUser();
            return (List<TDI_EMPL>)MngNegocioOrdenTrabajo.GetReporterosListRecuperacionGuion();
        }

        [WebMethod]
        public List<TDI_EMPL> GetCamarografosList()
        {
            ValidateUser();
            return (List<TDI_EMPL>)MngNegocioOrdenTrabajo.GetCamarografosList();
        }

        [WebMethod]
        public List<TDI_EMPL> GetEditoresList()
        {
            ValidateUser();
            return (List<TDI_EMPL>)MngNegocioOrdenTrabajo.GetEditoresList();
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TDI_Seccion> ObtenerSecciones()
        {
            ValidateUser();
            return (List<TDI_Seccion>)MngNegocioSeccion.ObtenerSecciones();
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TipoNota> ObtenerTipoNotasBySeccion(int idSeccion)
        {
            ValidateUser();
            return (List<TipoNota>)ConsultaTipoNota.TipoNotaXSeccion(idSeccion.ToString(), "");
        }

        [WebMethod]
        public bool EliminaEquipoTrabajoByNumOT(int idOT)
        {
            ValidateUser();
            return MngNegocioEquipoTrabajo.EliminaEquipoTrabajoByNumOT(idOT);
        }

        [WebMethod]

        public Datos_PantallaOTIpad ObtenerDatosPantallaOrdenTrabajo(string NumeroOT)
        {
            ValidateUser();
            return new Datos_PantallaOTIpad(MngNegocioOrdenTrabajo.ObtenerDatosPantallaOrdenTrabajo(NumeroOT));
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public TDI_Seccion ObtieneSeccionByIdEmpleado(int idEmpleado)
        {
            ValidateUser();
            return MngNegocioPropuesta.ObtieneSeccionByIdEmpleado(idEmpleado);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TransmisionProgramaIpad> GetProgramasTransmitir(int NumOT, int numEmpleado, int NumSeccOT)
        {
            ValidateUser();
            List<TransmisionProgramaIpad> LstTransmisionProgramaIpad = new List<TransmisionProgramaIpad>();

            foreach (TransmisionPrograma TransmisionPrograma in MngNegocioOrdenTrabajo.GetProgramasTransmitir(NumOT, numEmpleado, NumSeccOT))
            {
                LstTransmisionProgramaIpad.Add(new TransmisionProgramaIpad(TransmisionPrograma));
            }

            return LstTransmisionProgramaIpad;
        }

        [WebMethod]
        public List<TransmisionProgramaIpad> GetProgramasTransmitirBiz(string NumOT, int numEmpleado)
        {
            ValidateUser();

            List<TransmisionProgramaIpad> LstTransmisionProgramaIpad = new List<TransmisionProgramaIpad>();

            foreach (TransmisionPrograma TransmisionPrograma in MngNegocioOrdenTrabajo.GetProgramasTransmitirLista(NumOT, numEmpleado))
            {
                LstTransmisionProgramaIpad.Add(new TransmisionProgramaIpad(TransmisionPrograma));
            }

            return LstTransmisionProgramaIpad;
        }

        [WebMethod]
        public List<TDI_Estatus> GetEstatus()
        {
            ValidateUser();
            return (List<TDI_Estatus>)MngNegocioEstatus.ObtenerEstatus();
        }

        [WebMethod]
        public List<TDI_SeccionFormato> ObtenerSeccionFormatoXIDEmpleado(int cveEmpleado)
        {
            ValidateUser();
            return MngNegocioSeccionFormato.ObtenerSeccionFormatoPorIDEmpleado(cveEmpleado);
        }

        [WebMethod]
        public List<TDI_SeccionFormato> ObtenerSeccionFormatoCompra(int cveEmpleado)
        {
            ValidateUser();
            return MngNegocioSeccionFormato.ObtenerSeccionFormatoPorSeccion(8, 0);
        }


        [WebMethod]
        public List<VersionesOT> GetVersionesOT(int NumOT)
        {
            ValidateUser();
            return (List<VersionesOT>)MngNegocioOrdenTrabajo.GetVersionesOT(NumOT);
        }

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> ObtenerOrdenTrabajo(int NumOT)
        {
            ValidateUser();

            List<THE_OrdenTrabajoIpad> LstOTIpad = new List<THE_OrdenTrabajoIpad>();
            foreach (THE_OrdenTrabajo OT in MngNegocioOrdenTrabajo.ObtenerOrdenTrabajo(NumOT))
            {
                LstOTIpad.Add(new THE_OrdenTrabajoIpad(OT));
            }

            return LstOTIpad;
        }

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> ObtenerOrdenTrabajoCvec(string CvecOts)
        {
            ValidateUser();

            List<THE_OrdenTrabajoIpad> LstOTIpad = new List<THE_OrdenTrabajoIpad>();
            foreach (THE_OrdenTrabajo OT in MngNegocioOrdenTrabajo.ObtenerOrdenTrabajoCvec(CvecOts))
            {
                LstOTIpad.Add(new THE_OrdenTrabajoIpad(OT));
            }

            return LstOTIpad;
        }

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> ObtenerOrdenTrabajoCvecHtml5(string CvecOts)
        {
            StringBuilder cadena = new StringBuilder();
            ValidateUser();

            foreach (string value in CvecOts.Split(','))
                if(!value.Trim().Equals(string.Empty))
                    cadena.Append("'").Append(value).Append("',");

            List<THE_OrdenTrabajoIpad> LstOTIpad = new List<THE_OrdenTrabajoIpad>();
            foreach (THE_OrdenTrabajo OT in MngNegocioOrdenTrabajo.ObtenerOrdenTrabajoCvec(cadena.ToString().Trim(',')))
            {
                LstOTIpad.Add(new THE_OrdenTrabajoIpad(OT));
            }

            return LstOTIpad;
        }

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> ObtenerOrdenTrabajoByCvec(string OtraCvec)
        {
            ValidateUser();
            List<THE_OrdenTrabajoIpad> LstOTIpad = new List<THE_OrdenTrabajoIpad>();

            foreach (THE_OrdenTrabajo OT in MngNegocioOrdenTrabajo.ObtenerOrdenTrabajoCVEC(OtraCvec))
            {
                LstOTIpad.Add(new THE_OrdenTrabajoIpad(OT));
            }

            return LstOTIpad;
        }

        [WebMethod]
        public List<BusquedaMultipleOTIpad> ObtenerOdenTrabajoMultiple(int CveSecc, DateTime FechaBusq, int CveEmpl)
        {
            ValidateUser();

            List<BusquedaMultipleOTIpad> LstBusquedaMOTIpad = new List<BusquedaMultipleOTIpad>();

            foreach (BusquedaMultipleOT Busqueda in MngNegocioOrdenTrabajo.ObtenerOdenTrabajoMultiple(CveSecc, FechaBusq, CveEmpl))
            {
                LstBusquedaMOTIpad.Add(new BusquedaMultipleOTIpad(Busqueda));
            }

            return LstBusquedaMOTIpad;
        }

        [WebMethod]
        public Datos_PantallaMultiplesOTsIpad ObtenerDatosPantallaMultiplesOTs(int EMPL_LLAV_PR)
        {
            ValidateUser();
            return new Datos_PantallaMultiplesOTsIpad(MngNegocioMultiplesOtsPantalla.ObtenerDatosPantallaMultiplesOTs(EMPL_LLAV_PR));
        }

        [WebMethod]
        public bool GuardaOrdenFormatoCompra(List<THE_FormatoCompraIpad> LstFormatoCompraIpad)
        {
            ValidateUser();

            List<THE_FormatoCompra> LstFormatoCompra = new List<THE_FormatoCompra>();

            foreach (THE_FormatoCompraIpad FormatoCompraIpad in LstFormatoCompraIpad)
            {
                LstFormatoCompra.Add(FormatoCompraIpad.get());
            }

            return MngNegocioFormatoCompra.GuardaOrdenFormatoCompra(LstFormatoCompra);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public PantallaOT ObtieneDatosPantallaOT(int idEmpleado, bool SeccionSeleccione, bool TipoNotaSeleccione)
        {
            ValidateUser();
            return MngNegocioPantallaOT.ObtieneDatosPantallaOT(idEmpleado, SeccionSeleccione, TipoNotaSeleccione);
        }


        #region Replicar
        [WebMethod]
        public bool GuardarReplicaFormatoCompra(THE_FormatoCompraIpad oFormatoCompra)
        {
            ValidateUser();
            return MngNegocioFormatoCompra.GuardarFormatoCompra(oFormatoCompra.get());
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public bool ActualizaReplicaFormatoCompra(THE_FormatoCompraIpad oFormatoCompra)
        {
            ValidateUser();
            return MngNegocioFormatoCompra.ActualizarFormatoCompra(oFormatoCompra.get());
        }

        [WebMethod]
        public List<THE_FormatoCompraIpad> ConsultarFormatoCompraOT(int CveOT, int CveProg, DateTime Fecha)
        {
            ValidateUser();

            List<THE_FormatoCompraIpad> lstIpad = new List<THE_FormatoCompraIpad>();
            foreach (THE_FormatoCompra item in MngNegocioFormatoCompra.ObtenerFormatoCompraOT(CveOT, CveProg, Fecha))
            {
                lstIpad.Add(new THE_FormatoCompraIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public List<THE_FormatoCompraIpad> ConsultarFormatoCompraEdicion(string CveOt, int CveProg, DateTime Fecha)
        {
            ValidateUser();

            List<THE_FormatoCompraIpad> lstIpad = new List<THE_FormatoCompraIpad>();
            foreach (THE_FormatoCompra item in MngNegocioFormatoCompra.ObtenerFormatoCompraEdicion(CveOt, CveProg, Fecha))
            {
                lstIpad.Add(new THE_FormatoCompraIpad(item));
            }

            return lstIpad;
        }

        #endregion

        #endregion


        #region Equipo de Trabajo por Local

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public PantallaOT ObtieneDatosEquiporlocal(int idlocal)
        {
            ValidateUser();
            return MngNegocioPantallaOT.ObtieneDatosEquiporlocal(idlocal);
        }
        #endregion



        #region Metodos Propuestas

        [WebMethod]
        public List<TDI_TipoNota> ObtenerTipoNotas()
        {
            ValidateUser();
            return (List<TDI_TipoNota>)MngNegocioTipoNota.ObtenerTipoNotas();
        }

        [WebMethod]
        public int GuardaPropuesta(TDI_PropuestaIpad oPropuesta)
        {
            ValidateUser();
            if (MngNegocioPropuesta.GuardarPropuesta(oPropuesta.get()))
            {
                return oPropuesta.CvePropuesta;
            }
            else
            {
                return -1;
            }
        }

        [WebMethod]
        public int ActualizaPropuesta(TDI_PropuestaIpad oPropuesta)
        {
            ValidateUser();
            if (MngNegocioPropuesta.ActualizarPropuesta(oPropuesta.get()))
            {
                return oPropuesta.CvePropuesta;
            }
            else
            {
                return -1;
            }
        }

        [WebMethod]
        public int GuardaAgendaSemanalPropuesta(THE_AgendaSemanal oAgendaSemanal)
        {
            ValidateUser();
            if (MngNegocioAgendaSemanal.GuardarAgendaSemanal(oAgendaSemanal))
            {
                return oAgendaSemanal.CveAgendaSemanal;
            }
            else
            {
                return -1;
            }
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public RegresoPropuestaIpad AlmacenaDatosPropuesta(int cveEmpleadoCliente, TDI_PropuestaIpad oPropuesta, THE_AgendaSemanal oAgendaSemanal, bool esNueva)
        {
            ValidateUser();
            oPropuesta.FechaCreacion = Convert.ToDateTime(DateTime.Now.ToString());
            oAgendaSemanal.FechaCreacion = Convert.ToDateTime(DateTime.Now.ToString());
            oAgendaSemanal.FechaInicio = oPropuesta.Fecha.ToShortDateString();
            RegresoPropuesta rProp = MngNegocioPropuesta.AlmacenaDatosPropuesta(cveEmpleadoCliente, oPropuesta.get(), oAgendaSemanal, esNueva);
            RegresoPropuestaIpad result = new RegresoPropuestaIpad(rProp);
            return result;
        }

        [WebMethod]
        public int ActualizaAgendaSemanalPropuesta(THE_AgendaSemanal oAgendaSemanal)
        {
            ValidateUser();
            if (MngNegocioAgendaSemanal.ActualizarAgendaSemanal(oAgendaSemanal))
            {
                return oAgendaSemanal.CveAgendaSemanal;
            }
            else
            {
                return -1;
            }
        }

        [WebMethod]
        public int GuardaLogisticaPropuesta(THE_LogisticaPropuestaIpad oLogisticaPropuesta)
        {
            ValidateUser();
            if (MngNegocioLogisticaPropuesta.GuardarLogisticaPropuesta(oLogisticaPropuesta.get()))
            {
                return oLogisticaPropuesta.CvePropuestaLLavePrimaria;
            }
            else
            {
                return -1;
            }
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public int ActualizaLogisticaPropuesta(THE_LogisticaPropuestaIpad oLogisticaPropuesta)
        {
            ValidateUser();
            if (MngNegocioLogisticaPropuesta.ActualizarLogisticaPropuesta(oLogisticaPropuesta.get()))
            {
                return oLogisticaPropuesta.CvePropuestaLLavePrimaria;
            }
            else
            {
                return -1;
            }
        }

        [WebMethod]
        public Datos_PantallaPropuestaIpad ObtenerDatosPantallaPropuesta(string NumeroOT)
        {
            ValidateUser();
            return new Datos_PantallaPropuestaIpad(MngNegocioPropuesta.ObtenerDatosPantallaPropuesta(NumeroOT));
        }

        [WebMethod]
        public List<TDI_PropuestaIpad> ObtenerPropuestaByCve(string CvePropuesta)
        {
            ValidateUser();
            List<TDI_PropuestaIpad> LstPropuestaIpad = new List<TDI_PropuestaIpad>();

            foreach (TDI_Propuesta Propuesta in MngNegocioPropuesta.ObtenerPropuestaByCve(CvePropuesta))
            {
                LstPropuestaIpad.Add(new TDI_PropuestaIpad(Propuesta));
            }

            return LstPropuestaIpad;
        }

        #endregion

        #region Agenda OT

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<AgendaOT> getAgendaOTs(string SECC_LLAV_PR, string FECHA_INI, string FECHA_FIN, string AGSE_TITU, string AGSE_ORIG, string OTRA_LLAV_PR, string OTRA_CVEC, string ESIN_LLAV_PR)
        {
            ValidateUser();
            return (List<AgendaOT>)ConsultaAgendaOrdenesTrabajo.ObtenerAgendaOTs(SECC_LLAV_PR, FECHA_INI, FECHA_FIN, AGSE_TITU, AGSE_ORIG, OTRA_LLAV_PR, OTRA_CVEC, ESIN_LLAV_PR);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<AgendaOT> getAgendaOTs_LOCALES(string SECC_LLAV_PR, string FECHA_INI, string FECHA_FIN, string AGSE_TITU, string AGSE_ORIG, string OTRA_LLAV_PR, string OTRA_CVEC, string ESIN_LLAV_PR, string LOCL_DESC)
        {
            ValidateUser();
            return (List<AgendaOT>)ConsultaAgendaOrdenesTrabajo.ObtenerAgendaOTs(SECC_LLAV_PR, FECHA_INI, FECHA_FIN, AGSE_TITU, AGSE_ORIG, OTRA_LLAV_PR, OTRA_CVEC, ESIN_LLAV_PR, LOCL_DESC);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<AgendaOT> getAgendaOTs_LOCALESRep(string SECC_LLAV_PR, string FECHA_INI, string FECHA_FIN, string AGSE_TITU, string AGSE_ORIG, string OTRA_LLAV_PR, string OTRA_CVEC, string ESIN_LLAV_PR, string LOCL_DESC, string cveRep)
        {
            ValidateUser();
            return (List<AgendaOT>)ConsultaAgendaOrdenesTrabajo.ObtenerAgendaOTsReportero(SECC_LLAV_PR, FECHA_INI, FECHA_FIN, AGSE_TITU, AGSE_ORIG, OTRA_LLAV_PR, OTRA_CVEC, ESIN_LLAV_PR, LOCL_DESC, cveRep);
        }

        [WebMethod]
        public List<AgendaOT> getAgenda(string SECC_LLAV_PR, string FECHA_INI, string FECHA_FIN, string AGSE_TITU, string AGSE_ORIG, string OTRA_LLAV_PR)
        {
            ValidateUser();
            return (List<AgendaOT>)ConsultaAgendaOrdenesTrabajo.ObtenerAgenda(SECC_LLAV_PR, FECHA_INI, FECHA_FIN, AGSE_TITU, AGSE_ORIG, OTRA_LLAV_PR);
        }

        [WebMethod]
        public List<OTProg> getOTporPrograma(string OTRA_LLAV_PR, string FECHA_INI, string FECHA_FIN, string SECC_LLAV_PR, string ESIN_LLAV_PR, string OTRA_TITU, string ORIG)
        {
            ValidateUser();
            return (List<OTProg>)ConsultaOTporPrograma.ObtenerOTporPrograma(OTRA_LLAV_PR, FECHA_INI, FECHA_FIN, SECC_LLAV_PR, ESIN_LLAV_PR, OTRA_TITU, ORIG);
        }

        [WebMethod]
        public List<RatingVideo> getListaRating(bool isIncludeDefault) {
            ValidateUser();
            return MngNegocioStatusMatLocal.obtenerRatings(isIncludeDefault);
        }

        [WebMethod]
        public bool updateRatingOT(Int32 cveOT, Int32 ratingValue)
        {
            ValidateUser();
            return MngNegocioStatusMatLocal.updateRatingOT(cveOT, ratingValue);
        }

        [WebMethod]
        public List<BitacoraIpad> getBitacoraDiaria(string FABR_LLAV_PR, string SECC_LLAV_PR, string FECHA_INI, string cveOrdenTrabajo, string titulo, string ESIN_LLAV_PR)
        {
            ValidateUser();

            List<BitacoraIpad> LstBitacoraIpad = new List<BitacoraIpad>();

            foreach (Bitacora item in OTBitacoraDiaria.ObtenerOTBitacoraDiaria(FABR_LLAV_PR, SECC_LLAV_PR, FECHA_INI, cveOrdenTrabajo, titulo, ESIN_LLAV_PR))
            {
                LstBitacoraIpad.Add(new BitacoraIpad(item));
            }

            return LstBitacoraIpad;
        }

        [WebMethod]
        public List<BitacoraIpad> getBitacoraDiaria_LOCALES(string FABR_LLAV_PR, string SECC_LLAV_PR, string FECHA_INI, string cveOrdenTrabajo, string titulo, string ESIN_LLAV_PR, string LOCL_DESC)
        {
            IList<Bitacora> temp = null;
            List<BitacoraIpad> resultado = new List<BitacoraIpad>();

            ValidateUser();
            temp = OTBitacoraDiaria.ObtenerOTBitacoraDiaria(FABR_LLAV_PR, SECC_LLAV_PR, FECHA_INI, cveOrdenTrabajo, titulo, ESIN_LLAV_PR, LOCL_DESC);
            if (temp != null)
                foreach (Bitacora bit in temp)
                    resultado.Add(new BitacoraIpad(bit));

            return resultado;
        }

        [WebMethod]
        public List<BitacoraIpad> getBitacoraDiaria_LOCALESByReportero(string FABR_LLAV_PR, string SECC_LLAV_PR, string FECHA_INI, string cveOrdenTrabajo, string titulo, string ESIN_LLAV_PR, string LOCL_DESC, int cveReportero)
        {
            IList<Bitacora> temp = null;
            List<BitacoraIpad> resultado = new List<BitacoraIpad>();

            ValidateUser();
            temp = OTBitacoraDiaria.ObtenerOTBitacoraDiariaByReportero(FABR_LLAV_PR, SECC_LLAV_PR, FECHA_INI, cveOrdenTrabajo, titulo, ESIN_LLAV_PR, LOCL_DESC, cveReportero);
            if (temp != null)
                foreach (Bitacora bit in temp)
                    resultado.Add(new BitacoraIpad(bit));

            return resultado;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<Secciones> getSecciones(string FABR_LLAV_PR, string SECC_LLAV_PR)
        {
            ValidateUser();
            return (List<Secciones>)ConsultaSecciones.ConsultaSeccionesFIA(FABR_LLAV_PR, SECC_LLAV_PR);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<Secciones> getSeccionLocal()
        {
            ValidateUser();
            return (List<Secciones>)ConsultaSecciones.ConsultaSeccionFIALocales();
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TipoNota> getTipoNota(string SECC_LLAV_PR, string TINO_LLAV_PR)
        {
            ValidateUser();
            return (List<TipoNota>)ConsultaTipoNota.TipoNotaXSeccion(SECC_LLAV_PR, TINO_LLAV_PR);
        }

        [WebMethod]
        public List<ProgramaEmpleado> obtenProgramaEmpleadoFiltro(string ESIN_LLAV_PR, string EMPL_LLAV_PR)
        {
            ValidateUser();
            return cB_Agenda.ConsultaProgramaEmpleado(EMPL_LLAV_PR);
        }

        [WebMethod]
        public List<ProgramaEmpleado> obtenProgramaEmpleado(string EMPL_LLAV_PR)
        {
            ValidateUser();
            return cB_Agenda.ConsultaProgramaEmpleado(EMPL_LLAV_PR);
        }

        [WebMethod]
        public List<ProgramaEmpleado> obtenProgramaFormatoXProg()
        {
            ValidateUser();
            return cB_Agenda.ConsultaProgramaFormatoXProg();
        }

        [WebMethod]
        public List<ProgramaEmpleado> obtenProgramaFormatoXProgLocal(int local)
        {
            ValidateUser();
            return cB_Agenda.ConsultaProgramaFormatoXProgLocal(local);
        }

        [WebMethod]
        public List<AgendaOTPrograma> ObtenAgendaPrograma(string ESIN_LLAV_PR, string SECC_LLAV_PR, string OTRA_TITU, string OTRA_LLAV_PR, string fechaIni, string fechaFin, int numBase)
        {
            ValidateUser();
            return cB_Agenda.ObtenerAgendaProgramaSeccionEmpleado(ESIN_LLAV_PR, SECC_LLAV_PR, OTRA_TITU, OTRA_LLAV_PR, fechaIni, fechaFin, numBase);
        }

        [WebMethod]
        public List<AgendaOTPrograma> ObtenAgendaPrograma_LOCALES(string ESIN_LLAV_PR, string SECC_LLAV_PR, string OTRA_TITU, string OTRA_LLAV_PR, string fechaIni, string fechaFin, int numBase, string LOCL_DESC)
        {
            ValidateUser();
            return cB_Agenda.ObtenerAgendaProgramaSeccionEmpleado(ESIN_LLAV_PR, SECC_LLAV_PR, OTRA_TITU, OTRA_LLAV_PR, fechaIni, fechaFin, numBase, LOCL_DESC);
        }

        [WebMethod]
        public List<OTAvance> getAvanceOT(string OTRA_LLAV_PR)
        {
            ValidateUser();
            return (List<OTAvance>)ConsultaOTAvances.ObtenerOTAvances(OTRA_LLAV_PR);
        }

        [WebMethod]
        public List<AvProp> getPropAvances(string PROP_LLAV_PR, string POBS_LLAV_PR)
        {
            ValidateUser();
            return (List<AvProp>)ConsultaOTAvances.ObtenerPropAvances(PROP_LLAV_PR, POBS_LLAV_PR);
        }
        [WebMethod]
        public List<MisAsignaciones> getMisAsignaciones(int NumEmpleado, string Fecha)
        {
            ValidateUser();
            return (List<MisAsignaciones>)ConsultaAgendaOrdenesTrabajo.ConsultaAgendaPorPersona(NumEmpleado, Fecha);
        }

        #region Métodos Avances

        #region OTs

        [WebMethod]
        public Boolean ActualizaAvanceOT(int numeroOT, int numeroAvance, string textoAvance, string txbQuePaso, string txbCuandoPaso, string txbQuienInvol)
        {
            ValidateUser();
            return MngNegocioOrdenTrabajo.ActualizaAvanceOT(numeroOT, numeroAvance, textoAvance, txbQuePaso, txbCuandoPaso, txbQuienInvol);
        }

        [WebMethod]
        public Boolean BorraAvanceOT(int numeroOT, int numeroAvance)
        {
            ValidateUser();
            return MngNegocioOrdenTrabajo.BorraAvanceOT(numeroOT, numeroAvance);

        }

        [WebMethod]
        public Boolean CreaAvanceOT(THE_ObservacionesIpad Obse)
        {
            ValidateUser();
            return MngNegocioOrdenTrabajo.CreaAvanceOT(Obse.get());

        }


        #endregion

        #region Propuestas

        [WebMethod]
        public Boolean ActualizaAvanceProp(int numeroProp, int numeroAvance, string textoAvance)
        {
            ValidateUser();
            return MngNegocioPropuesta.ActualizaAvanceProp(numeroProp, numeroAvance, textoAvance);

        }

        [WebMethod]
        public Boolean BorraAvanceProp(int numeroProp, int numeroAvance)
        {
            ValidateUser();
            return MngNegocioPropuesta.BorraAvanceProp(numeroProp, numeroAvance);
        }

        [WebMethod]
        public Boolean CreaAvanceProp(THE_PropuestaObservacionesIpad Obse)
        {
            ValidateUser();
            return MngNegocioPropuesta.CreaAvanceProp(Obse.getTHE_PropuestaObservaciones());
        }


        #endregion

        #endregion

        [WebMethod]
        public List<TDI_Formato> ConsultaFormatos()
        {
            ValidateUser();
            return (List<TDI_Formato>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioFormato.ObtenerFormato();
        }

        [WebMethod]
        public String ConsultaFormatosGuion(int CvePrograma, DateTime FechaCreacion, THE_LogTransacciones Tran)
        {
            string resultjson = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;

            ValidateUser();
            resultjson = serializer.Serialize((List<THE_FormatosGuion>)MngNegocioFormatosGuion.ObtenerFormatosGuion(CvePrograma, FechaCreacion, Tran));
            return resultjson;
        }

        [WebMethod]
        public String ConsultaFormatosGuionLocal(int local, int CvePrograma, DateTime FechaCreacion, THE_LogTransacciones Tran)
        {
            string resultjson = "";
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;

            ValidateUser();
            resultjson = serializer.Serialize((List<THE_FormatosGuion>)MngNegocioFormatosGuion.ObtenerFormatosGuionLocal(local, CvePrograma, FechaCreacion, Tran));
            return resultjson;
        }

        [WebMethod]
        public List<THE_PrevisionesPrograma> ConsultaPrevisionesProgramaMes(DateTime FechaConsulta, int CvePrograma)
        { ValidateUser(); return (List<THE_PrevisionesPrograma>)MngNegocioPrevisionesPrograma.ObtenerPrevisionesProgramaMes(FechaConsulta, CvePrograma); }

        [WebMethod]
        public THE_PrevisionesPrograma GuardaPrevisionPrograma(THE_PrevisionesPrograma objGuardar)
        { ValidateUser(); return MngNegocioPrevisionesPrograma.GuardarPrevisionesProgramaReturn(objGuardar); }

        #endregion

        #region Trainee
        /// <summary>
        /// Obtener talento uno o muchos dependiendo si la clave del talento 
        /// lleva un valor o va vacio
        /// </summary>
        /// <param name="cveTalento">Identificador unico del talento</param>
        /// <returns></returns>
        [WebMethod]
        public List<Talento> ObtenerTalento(string cveTalento)
        {
            ValidateUser();
            return (List<Talento>)MngNegocioTalento.ObtenerTalento(cveTalento);
        }

        /// <summary>
        /// Obtiene las diferentes evaluaciones de un talento produccion, edicion, informacion
        /// </summary>
        /// <param name="cveTalento">Identificador unico del talento</param>
        /// <returns></returns>
        [WebMethod]
        public List<TalentoTipoEvaluacion> ObtenerTalentoTipoEvaluacion(int cveTalento)
        {
            ValidateUser();
            return (List<TalentoTipoEvaluacion>)MngNegocioTalentoTipoEvaluacion.ObtenerTalentoTipoEvaluacion(cveTalento);
        }

        /// <summary>
        /// Obtiene las areas de interes del talento
        /// </summary>
        /// <param name="cveTalento">Identificador unico del talento</param>
        /// <returns></returns>
        [WebMethod]
        public List<TalentoAreaInteres> ObtenerTalentoAreaInteres(int cveTalento)
        {
            ValidateUser();
            return (List<TalentoAreaInteres>)MngNegocioTalentoAreaInteres.ObtenerTalentoAreaInteres(cveTalento);
        }

        /// <summary>
        /// Consulta las fechas de inicio de cada nivel de acuerdo a una de las generaciones
        /// </summary>
        /// <param name="cveGeneracion">Identificador unico de la generacion</param>
        /// <returns></returns>
        [WebMethod]
        public List<NivelGeneracion> ObtenerNivelesEmpleadoGeneracion(int cveGeneracion)
        {
            ValidateUser();
            return (List<NivelGeneracion>)MngNegocioNivelGeneracion.ObtenerNivelGeneracionPorGeneracion(cveGeneracion);
        }
        #endregion

        #region Hechos TV
        #region Select
        /// <summary>
        /// Consulta los avances de las ot que se muestran en la pantalla del autorizador
        /// </summary>
        /// <param name="filtro">cadena q contiene los nombres de las agencias</param>
        /// <param name="Seccion">Indicador de pertenencia a deportes o no</param>
        /// <param name="horas">Numero de horas a buscar</param>
        /// <returns></returns>
        [WebMethod]
        public List<AvanceOTAutorizador> ConsultaAvancesOTAutorizador(string filtro, string Seccion, string horas)
        {
            ValidateUser();
            return cB_AvanceOT.ConsultaAvancesOTAutorizador(filtro, Seccion, horas);
        }

        /// <summary>
        /// Consulta los avances de las OT que se muestran en la pantalla de consulta de Avances
        /// </summary>
        /// <param name="agencias">Filtro de Agencias</param>
        /// <param name="Seccion">Indicador de pertenencia a deportes o no</param>
        /// <param name="fecha">Fecha a Buscar</param>
        /// <param name="Texto">Filtro de Texto</param>
        /// <returns></returns>
        [WebMethod]
        public List<AvanceOTAutorizador> ConsultaAvancesOTAutorizadorHistorico(string agencias, string Seccion, string fecha, string Texto)
        {
            ValidateUser();
            return cB_AvanceOT.ConsultaAvancesOTAutorizador(agencias, Seccion, fecha, Texto);
        }

        /// <summary>
        /// Consulta avance unico 
        /// </summary>
        /// <param name="OTRA_LLAV_PR">Identificador de la orden de trabajo</param>
        /// <param name="OBSE_LLAV_PR">Identificador de la observación</param>
        /// <returns></returns>
        [WebMethod]
        public List<AvanceOTAutorizadorUnico> ConsultaAvancesOTAutorizadorUnico(string OTRA_LLAV_PR, string OBSE_LLAV_PR)
        {
            ValidateUser();
            return cB_AvanceOT.ConsultaAvancesOTAutorizadorUnico(OTRA_LLAV_PR, OBSE_LLAV_PR);
        }

        /// <summary>
        /// Consulta las secciones de acuerdo a una consulta del web service de hechos tv
        /// </summary>
        /// <returns>Listado de tipo SeccionesFIAHechosTV</returns>
        [WebMethod]
        public List<SeccionesFIAHechosTV> ConsultaSeccionesHechosTV()
        {
            ValidateUser();
            HechosTV oHechos = new HechosTV();
            return oHechos.ConsultaSeccionesFIA();
        }

        /// <summary>
        /// Consulta las secciones de acuerdo a una consulta del web service de Deportes
        /// </summary>
        /// <returns>Listado de tipo SeccionesDeportes</returns>
        [WebMethod]
        public List<SeccionesDeportes> ConsultaSeccionesDeportes()
        {
            ValidateUser();
            Deportes oDeportes = new Deportes();
            return oDeportes.ConsultaSeccionesDeportes();

        }

        /// <summary>
        /// Consulta los cables de iNews
        /// </summary>
        /// <param name="cveCable">Identificador del cable</param>
        /// <returns></returns>
        [WebMethod]
        public List<THE_CableIpad> ConsultaCable(int cveCable)
        {

            IList<THE_Cable> aux;
            List<THE_CableIpad> resultado = null;
            ValidateUser();

            aux = MngNegocioCable.ObtenerCable(cveCable);
            if (aux != null)
            {
                resultado = new List<THE_CableIpad>();
                foreach (THE_Cable cable in aux)
                    resultado.Add(new THE_CableIpad(cable));
            }
            return resultado;
        }

        [WebMethod]
        public List<THE_CableIpad> ConsultaCableLastMin()
        {
            IList<THE_Cable> aux;
            List<THE_CableIpad> resultado = null;
            ValidateUser();
            THE_Cable oTHE_Cable = MngNegocioCable.ObtenerUltimoRegistro();

            aux = MngNegocioCable.ObtenerCableLastMin(oTHE_Cable.Fecha);
            if (aux != null)
            {
                resultado = new List<THE_CableIpad>();
                foreach (THE_Cable cable in aux)
                    resultado.Add(new THE_CableIpad(cable));
            }

            return resultado;
        }

        [WebMethod]
        public bool GuardaCable(THE_CableIpad Source)
        {
            ValidateUser();

            return MngNegocioCable.GuardarCable(Source.get());
        }

        [WebMethod]
        public bool ActualizarCable(THE_CableIpad Source)
        {
            ValidateUser();

            return MngNegocioCable.ActualizarCable(Source.get());
        }
        #endregion

        #region Delete
        /// <summary>
        /// Elimina un avance de la base de hechos tv dependiendo del idNota de la misma
        /// </summary>
        /// <param name="idNota">Identificador para la BD de hechostv</param>
        /// <returns>Mensaje de completo en caso de ejecucion.
        /// En caso de error regresa la razon q lo ocasiono</returns>
        [WebMethod]
        public bool EliminaAvance(AvanceOTAutorizador oAvance)
        {
            ValidateUser();
            return cB_AvanceOT.EliminaAvanceSinOT(oAvance);
        }

        #endregion

        #region Update
        /// <summary>
        /// Actualiza un cable
        /// </summary>
        /// <param name="usuario">Usuario</param>
        /// <param name="quien">Persona q realiza el cambio</param>
        /// <param name="cveObservacion">Identificador de la observacion</param>
        /// <param name="cveOT">Identificador de la ot</param>
        /// <param name="quePaso">Titulo</param>
        /// <param name="avance">Avances</param>
        /// <param name="cveSeccion">Identificador de la seccion</param>
        /// <param name="fuente">Agencia</param>
        /// <param name="cuando">Cuando paso</param>
        /// <param name="fechaCreacion">Fecha de creacion</param>
        /// <param name="hora">hora</param>
        /// <param name="esFIA">Identificador q indica si es de FIA o deportes</param>
        /// <returns></returns>
        [WebMethod]
        public string GuardaEdicionAvance(string usuario, string quien, int cveObservacion, int cveOT, string quePaso, string avance, int cveSeccion, string fuente, string cuando, DateTime fechaCreacion, string hora, int esFIA)
        {
            ValidateUser();
            return cB_AvanceOT.GuardaEdicionAvance(usuario, quien, cveObservacion, cveOT, quePaso, avance, cveSeccion, fuente, cuando, fechaCreacion, hora, esFIA);
            //return "Completo";
        }

        /// <summary>
        /// Guarda un avance de un cable
        /// </summary>
        /// <param name="usuario"></param>
        /// <param name="cuando">Cuando paso</param>
        /// <param name="quien">Persona q realiza el cambio</param>
        /// <param name="esFIA">Identificador q indica si es de FIA o deportes</param>
        /// <param name="quePaso">Titulo</param>
        /// <param name="avance">Avances</param>
        /// <param name="cveSeccion">Identificador de la seccion</param>
        /// <param name="fuente">Agencia</param>
        /// <param name="fecha">Fecha</param>
        /// <param name="cveCable">Identificador del cable</param>
        /// <returns></returns>
        [WebMethod]
        public string GuardaAvanceCable(string usuario, string cuando, string quien, int esFIA, string quePaso, string avance, int cveSeccion, string fuente, int cveCable)
        {
            ValidateUser();
            return cB_AvanceOT.GuardaAvanceCable(usuario, cuando, quien, esFIA, quePaso, avance, cveSeccion, fuente, cveCable);
            //return "Completo";
        }

        #endregion

        #region Insert

        /// <summary>
        /// Crean nuevo avance sin numero de Orden de trabajo
        /// </summary>
        /// <param name="usuario">Nombre de usuario</param>
        /// <param name="cveOT">Identificador de la orden de trabajo</param>
        /// <param name="titulo">Titulo</param>
        /// <param name="avance">Avance</param>
        /// <param name="cveSeccion">Identificador de la seccion</param>
        /// <param name="quien">Quien realizo</param>
        /// <param name="fecha">Fecha en q sucedio</param>
        /// <param name="fuente">Agencia</param>
        /// <param name="esFIA">Indicador de si pertenece a fia</param>
        /// <param name="idNota">Id de la nota</param>
        /// <returns></returns>
        [WebMethod]
        public string CreaNuevoAvanceSinOT(string usuario, string cveOT, string titulo, string avance, int cveSeccion, string quien, string fecha, string fuente, int esFIA)
        {
            ValidateUser();
            return cB_AvanceOT.CreaNuevoAvanceSinOT(usuario, cveOT, titulo, avance, cveSeccion, quien, fecha, fuente, esFIA);
            //return "Completo";
        }

        #endregion

        #endregion

        #region Metodos AgendaSemanal
        //Ver Agenda OT porque ahi se concentra todo
        #endregion

        #region Metodos Agenda Diaria

        #region Para OTs
        [WebMethod]
        public string CambiaEstatusOT(int NumOT, string strEstatus, THE_LogTransacciones Tran)
        {
            ValidateUser();
            String OtraCvec = "";
            if (MngNegocioOrdenTrabajo.CambiaEstatusOT(NumOT, strEstatus, Tran, out OtraCvec))
            {
                if (OtraCvec != "")
                    return OtraCvec;
                else
                    return NumOT.ToString();
            }
            else
                return "";
        }

        [WebMethod]
        public string CambiaFechaOT(int NumOT, DateTime Fecha, THE_LogTransacciones Tran)
        {
            ValidateUser();
            if (MngNegocioOrdenTrabajo.CambiaFechaOT(NumOT, Fecha, Tran))
                return NumOT.ToString();
            else
                return "";
        }

        [WebMethod]
        public string CambiaTipoNotaOT(int NumOT, TDI_TipoNota Nota, THE_LogTransacciones Tran)
        {
            ValidateUser();
            if (MngNegocioOrdenTrabajo.CambiaTipoNotaOT(NumOT, Nota, Tran))
                return NumOT.ToString();
            else
                return "";
        }
        #endregion

        #region Para Propuestas
        [WebMethod]
        public string EliminarPropuesta(string PropLlavPr)
        {
            ValidateUser();
            if (MngNegocioAgendaSemanal.BorraPropuesta(PropLlavPr))
                return PropLlavPr;
            else
                return "";
        }

        [WebMethod]
        public string CambiaFechaProp(int NumProp, DateTime Fecha)
        {
            ValidateUser();
            if (MngNegocioPropuesta.CambiaFechaProp(NumProp, Fecha))
                return Fecha.ToString();
            else
                return "";
        }

        [WebMethod]
        public string CambiaTinoProp(int NumProp, TDI_TipoNota Nota)
        {
            ValidateUser();
            if (MngNegocioPropuesta.CambiaTinoProp(NumProp, Nota))
                return Nota.DescripcionTipoNota;
            else
                return "";
        }
        #endregion

        #endregion

        #region Solicitudes
        #region Select
        /// <summary>
        /// Consulta los clientes dependiendo un programa dado
        /// </summary>
        /// <param name="cvePrograma">Indetificador del programa</param>
        /// <returns></returns>
        [WebMethod]
        public List<TDI_ClientePrograma> ConsultaClientePrograma(int cvePrograma)
        {
            ValidateUser();
            return (List<TDI_ClientePrograma>)MngNegocioClientePrograma.ObtenerClienteProgramaPorPrograma(cvePrograma);
        }

        /// <summary>
        /// Consulta los formatos relacionados con una seccion dada
        /// </summary>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <returns></returns>
        [WebMethod]
        public List<TDI_SeccionFormato> ConsultaSeccionFormato(int cveSeccion, int cveFormato)
        {
            ValidateUser();
            return MngNegocioSeccionFormato.ObtenerSeccionFormatoPorSeccion(cveSeccion, cveFormato);
        }

        /// <summary>
        /// Consulta los programas relacionados con un empleado
        /// </summary>
        /// <param name="cvePrograma">Identificador unico del programa</param>
        /// <param name="cveEmpleado">Identificador unico del empleado</param>
        /// <returns></returns>
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TDI_ProgramaEmpleado> ConsultaProgramaEmpleado(int cvePrograma, int cveEmpleado)
        {
            ValidateUser();
            return MngNegocioProgramaEmpleado.ObtenerProgramaEmpleadoWS(cvePrograma, cveEmpleado);
        }

        [WebMethod]
        public List<TDI_Programa> ConsultaProgramasFIA()
        {
            ValidateUser();
            return (List<TDI_Programa>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.ObtenerProgramasFIA();

        }

        /// <summary>
        /// Consulta un tipo de nota por su clave
        /// </summary>
        /// <param name="cveTipoNota">Identificador unico del tipo de nota</param>
        /// <returns></returns>
        [WebMethod]
        public List<TDI_TipoNota> ConsultaTipoNotaPorID(int cveTipoNota)
        {
            ValidateUser();
            return MngNegocioTipoNota.ObtenerTipoNotaPorID(cveTipoNota);
        }

        /// <summary>
        /// Consulta las solicitudes y su formato por filtro de programa y seccion
        /// </summary>
        /// <param name="cvePrograma">Identificador unico del programa</param>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <param name="fechaInicial">Fecha de inicio</param>
        /// <param name="fechaFinal">Fecha de fin</param>
        /// <returns></returns>
        [WebMethod]
        public List<THE_SolicitudFormatoIpad> ConsultaSolicitudFormato(int cvePrograma, int cveSeccion, DateTime fechaInicial, DateTime fechaFinal, int cveLocal)
        {
            ValidateUser();

            List<THE_SolicitudFormatoIpad> lstIpad = new List<THE_SolicitudFormatoIpad>();
            foreach (THE_SolicitudFormato item in MngNegocioSolicitudFormato.ObtenerSolicitudFormatoXProgramaSeccion(cvePrograma, cveSeccion, fechaInicial, fechaFinal, cveLocal))
            {
                lstIpad.Add(new THE_SolicitudFormatoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_SolicitudFormatoIpad> ConsultaSolicitudFormatoxID(string CveSolicitud)
        {
            ValidateUser();

            List<THE_SolicitudFormatoIpad> lstIpad = new List<THE_SolicitudFormatoIpad>();
            foreach (THE_SolicitudFormato item in MngNegocioSolicitudFormato.ConsultaSolicitudFormatoxID(CveSolicitud))
            {
                lstIpad.Add(new THE_SolicitudFormatoIpad(item));
            }
            return lstIpad;
        }

        #endregion

        #region Insert
        /// <summary>
        /// Inserta una solicitud
        /// </summary>
        /// <param name="oSolicitud">Objeto q contiene la solitud a insertar</param>
        /// <returns></returns>
        [WebMethod]
        public THE_SolicitudIpad InsertaSolicitud(THE_SolicitudIpad oSolicitud)
        {
            ValidateUser();
            return new THE_SolicitudIpad(MngNegocioSolicitud.GuardarSolicitud(oSolicitud.getTHE_Solicitud()));
        }

        [WebMethod]
        public RegresoSolicitud AlmacenaDatosSolicitud(THE_SolicitudIpad oSolicitud, THE_SolicitudFormatoIpad oSolicitudFormato)
        {
            ValidateUser();
            return MngNegocioSolicitud.AlmacenaDatosSolicitud(oSolicitud.getTHE_Solicitud(), oSolicitudFormato.getTHE_SolicitudFormato());
        }

        /// <summary>
        /// Inserta una solicitud y su formato en la tabla de formato_solicitud
        /// </summary>
        /// <param name="oSolicitudFormato">Objeto con el formato_solicitud</param>
        /// <returns></returns>
        [WebMethod]
        public bool InsertaSolicitudFormato(THE_SolicitudFormatoIpad oSolicitudFormato)
        {
            ValidateUser();
            return MngNegocioSolicitudFormato.GuardarSolicitudFormato(oSolicitudFormato.getTHE_SolicitudFormato());
        }

        #endregion

        #region Update
        /// <summary>
        /// Actualiza una solicitud
        /// </summary>
        /// <param name="oSolicitud">Objeto q contiene la solicitud a actualizar</param>
        /// <returns></returns>
        [WebMethod]
        public THE_SolicitudFormatoIpad ActualizaSolicitud(THE_SolicitudFormatoIpad oSolicitudFormato)
        {
            ValidateUser();
            return new THE_SolicitudFormatoIpad(MngNegocioSolicitud.ActualizarSolicitud(oSolicitudFormato.getTHE_SolicitudFormato()));
        }
        #endregion
        #endregion

        #region Ingestion
        /// <summary>
        /// Consulta los tipos de ingestion
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public List<TDI_TipoIngestion> ConsultaTipoIngestion()
        {
            ValidateUser();
            return MngNegocioTipoIngestion.ObtenerTipoIngestion();
        }

        /// <summary>
        /// Consulta de ingestiones por filtros
        /// </summary>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <param name="cveTipoIngestion">Identificador unico del tipo de ingestion</param>
        /// <param name="fechaInicial">Fecha inicial</param>
        /// <param name="fechaFinal">Fecha final</param>
        /// <param name="claveOT">Clave de la OT Alfanumerica no es la llave primaria</param>
        /// <returns></returns>
        [WebMethod]
        public string ConsultaIngestiones(int cveSeccion, int cveTipoIngestion, DateTime fechaInicial, DateTime fechaFinal, string claveOT, int loclId)
        {
            string resultjson = "";
            ValidateUser();
            List<IngestionOT> dato = cB_IngestionOT.ConsultaIngestiones(cveSeccion, cveTipoIngestion, fechaInicial, fechaFinal, claveOT, loclId);

            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }

        /// <summary>
        /// Consulta de ingestiones de EVDT por filtros
        /// </summary>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <param name="cveTipoIngestion">Identificador unico del tipo de ingestion</param>
        /// <param name="fechaInicial">Fecha inicial</param>
        /// <param name="fechaFinal">Fecha final</param>
        /// <param name="claveOT">Clave de la OT Alfanumerica no es la llave primaria</param>
        /// <returns></returns>
        [WebMethod]
        public List<IngestionOT> ConsultaIngestionesEVDT(int cveSeccion, int cveTipoIngestion, DateTime fechaInicial, DateTime fechaFinal, string claveOT, int idEvento)
        {
            ValidateUser();
            return cB_IngestionOT.ConsultaIngestionesEVDT(cveSeccion, cveTipoIngestion, fechaInicial, fechaFinal, claveOT, idEvento);
        }

        /// <summary>
        /// Consulta ordenes de ingestiones por filtros
        /// </summary>
        /// <param name="cveSeccion">Identificador unico de la seccion</param>
        /// <param name="cveTipoIngestion">Identificador unico del tipo de ingestion</param>
        /// <param name="fechaInicial">Fecha inicial</param>
        /// <param name="fechaFinal">Fecha final</param>
        /// <param name="claveOT">Clave de la OT Alfanumerica no es la llave primaria</param>
        /// <param name="tituloOT">Titulo de la OT</param>
        /// <returns></returns>
        [WebMethod]
        public List<IngestionOT> ConsultaOrdenesDeIngestiones(int cveSeccion, int cveTipoIngestion, DateTime fechaInicial, DateTime fechaFinal, string claveOT, string tituloOT, TDI_EMPL Reportero)
        {
            ValidateUser();
            return cB_IngestionOT.ConsultaOrdenesIngestion(cveSeccion, cveTipoIngestion, fechaInicial, fechaFinal, claveOT, tituloOT, Reportero);
        }

        [WebMethod]
        public THE_SolicitudesIngestionIpad ConsultaSolicitudesIngestiones(int NumOt, int NumSolIng)
        {
            ValidateUser();
            return new THE_SolicitudesIngestionIpad(MngNegocioSolicitudesIngestion.ObtenerSolicitudesIngestion(NumOt, NumSolIng));
        }

        [WebMethod]
        public List<TDI_Agencia> ConsultaAgencias()
        {
            List<TDI_Agencia> aux;
            List<TDI_Agencia> resultado = null;
            ValidateUser();

            aux = (List<TDI_Agencia>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioAgencia.ObtenerAgencia();
            if (aux != null)
            {
                resultado = new List<TDI_Agencia>();
                foreach (TDI_Agencia agencia in aux)
                    resultado.Add(agencia);
            }

            return resultado;
        }

        [WebMethod]
        public List<TDI_EMPL> ConsultaCorresponsal()
        {
            List<TDI_EMPL> aux;
            List<TDI_EMPL> resultado = null;
            ValidateUser();

            aux = (List<TDI_EMPL>)cB_IngestionOT.ConsultaCorresponsal();
            if (aux != null)
            {
                resultado = new List<TDI_EMPL>();
                foreach (TDI_EMPL emp in aux)
                    resultado.Add(emp);
            }

            return resultado;
        }

        [WebMethod]
        public bool ActualizaSolicitudIngestion(THE_SolicitudesIngestionIpad solicitudIngestion)
        {
            ValidateUser();
            return MngNegocioSolicitudesIngestion.ActualizarSolicitudesIngestion(solicitudIngestion.getTHE_SolicitudesIngestion());
        }

        [WebMethod]
        public List<TDI_MedioTransmision> ConsultaMediosTransmision()
        {
            List<TDI_MedioTransmision> aux;
            List<TDI_MedioTransmision> resultado = null;
            ValidateUser();

            aux = (List<TDI_MedioTransmision>)MngNegocioMedioTransmision.ObtenerMedioTransmision();
            if (aux != null)
            {
                resultado = new List<TDI_MedioTransmision>();
                foreach (TDI_MedioTransmision medio in aux)
                    resultado.Add(medio);
            }

            return resultado;
        }

        [WebMethod]
        public List<TDI_TiposFormatos> ConsultaTiposFormatosSenal()
        {
            List<TDI_TiposFormatos> aux;
            List<TDI_TiposFormatos> resultado = null;
            ValidateUser();

            aux = (List<TDI_TiposFormatos>)MngNegocioTiposFormatos.ObtenerTiposFormatosSenal();
            if (aux != null)
            {
                resultado = new List<TDI_TiposFormatos>();
                foreach (TDI_TiposFormatos tForm in aux)
                    resultado.Add(tForm);
            }

            return resultado;
        }

        [WebMethod]
        public int GuardarSolicitudIngestion(THE_SolicitudesIngestionIpad oSolicitudesIngestion)
        {
            ValidateUser();

            THE_SolicitudesIngestion aux = oSolicitudesIngestion.getTHE_SolicitudesIngestion();
            if (MngNegocioSolicitudesIngestion.GuardarSolicitudesIngestion(aux))
            { 
                return aux.CveSolicitudesIngestionOT; 
            }
            else
            { return -1; }
        }

        [WebMethod]
        public List<THE_EquipoTrabajoIpad> ConsultarEquipoTrabajo(int Cvepuesto, int NumOT)
        {
            List<THE_EquipoTrabajo> aux;
            List<THE_EquipoTrabajoIpad> resultado = null;
            ValidateUser();

            aux = (List<THE_EquipoTrabajo>)MngNegocioEquipoTrabajo.ObtenerEquipoTrabajo(Cvepuesto, NumOT);
            if (aux != null)
            {
                resultado = new List<THE_EquipoTrabajoIpad>();
                foreach (THE_EquipoTrabajo equipo in aux)
                    resultado.Add(new THE_EquipoTrabajoIpad(equipo));
            }

            return resultado;
        }


        #endregion

        #region Carrito de compras

        /// <summary>
        /// Compra de propuesta
        /// </summary>
        /// <param name="listCompra">Listado de propuestas a comprar</param>
        /// <param name="nombreUsuario">Usuario q solicita</param>
        /// <returns></returns>
        [WebMethod]
        public bool CompraPropuesta(List<CompraPropuestaIpad> listCompra, string nombreUsuario, THE_LogTransacciones Tran)
        {
            List<CompraPropuesta> aux = null;
            ValidateUser();
            if (listCompra != null)
            {
                aux = new List<CompraPropuesta>();
                foreach (CompraPropuestaIpad ipad in listCompra)
                    aux.Add(ipad.get());
            }

            return MngNegocioCompraOT.CompraPropuesta(aux, nombreUsuario, Tran);
        }


        /// <summary>
        /// Compra de propuesta
        /// </summary>
        /// <param name="listCompra">Listado de propuestas a comprar</param>
        /// <param name="nombreUsuario">Usuario q solicita</param>
        /// <returns></returns>
        [WebMethod]
        public string CompraPropuestaRegresaOT(List<CompraPropuestaIpad> listCompra, string nombreUsuario, THE_LogTransacciones Tran)
        {
            List<CompraPropuesta> aux = null;
            ValidateUser();
            if (listCompra != null)
            {
                aux = new List<CompraPropuesta>();
                foreach (CompraPropuestaIpad ipad in listCompra)
                    aux.Add(ipad.get());
            }

            return MngNegocioCompraOT.CompraPropuestaRegresaOT(aux, nombreUsuario, Tran);
        }

        /// <summary>
        /// Compra de ordenes de trabajo
        /// </summary>
        /// <param name="listCompra">Listado de ordenes de trabajo a comprar</param>
        /// <param name="nombreUsuario">Usuario q solicita</param>
        /// <returns></returns>
        [WebMethod]
        public Boolean CompraOT(List<CompraOTIpad> listCompra, string nombreUsuario, THE_LogTransacciones Tran)
        {
            List<CompraOT> aux = null;
            ValidateUser();
            if (listCompra != null)
            {
                aux = new List<CompraOT>();
                foreach (CompraOTIpad compra in listCompra)
                    aux.Add(compra.get());
            }

            return MngNegocioCompraOT.CompraOT(aux, nombreUsuario, Tran);
        }

        [WebMethod]
        public bool CompraOTGral(List<CompraOTIpad> listCompra, string nombreUsuario, THE_LogTransacciones Tran)
        {
            ValidateUser();
            return true;
        }

        /// <summary>
        /// Valida los elementos a Agregar al Carrito de Compras (para ver que no hayan sido eliminados ó Comprados)
        /// </summary>
        /// <param name="ListaOT">Lista de OTs</param>
        /// <param name="ListaProp">Lista de Propuestas</param>
        /// <returns>Datos Validadados</returns>
        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public ShoppingCarResultSetIpad ValidaElementosCarritoParaAdd(List<THE_OrdenTrabajoIpad> ListaOT, List<TDI_PropuestaIpad> ListaProp)
        {
            ShoppingCarResultSet aux;
            List<THE_OrdenTrabajo> aux1 = null;
            List<TDI_Propuesta> aux2 = null;
            ValidateUser();
            if (ListaOT != null)
            {
                aux1 = new List<THE_OrdenTrabajo>();
                foreach (THE_OrdenTrabajoIpad ipad in ListaOT)
                    aux1.Add(ipad.get());
            }

            if (ListaProp != null)
            {
                aux2 = new List<TDI_Propuesta>();
                foreach (TDI_PropuestaIpad ipad in ListaProp)
                    aux2.Add(ipad.get());
            }

            aux = MngNegocioShoppingCar.ValidaElementosParaCarrito(aux1, aux2);
            return aux == null ? null : new ShoppingCarResultSetIpad(aux);
        }

        #endregion

        #region VideotecaDigital
        #region ConsultaImagenes
        [WebMethod]
        public List<ImagenesOT> ConsultaImagenes(string OTRA_CVEC)
        {
            ValidateUser();
            return (List<ImagenesOT>)TvAzteca.FiaTube.Bll_FIATube.cB_VideotecaDigital.ConsultaImagenesOT(OTRA_CVEC);
        }

        private bool ValidaDivisionTimecode(string VdoIdfilename)
        {
            string fecha = VdoIdfilename.Substring(6, 2) + VdoIdfilename.Substring(4, 2);
            int ifecha = int.Parse(fecha);
            if (ifecha < 1008)
                return false;
            else
                return true;
        }

        [WebMethod]
        public List<ImagenesVideoReferencia> ConsultaImagenesOTByVideoReferenciaExtraDetalle(string OTRA_CVEC, string VideoReferencia, string DetIdFilename, string vdo_id)
        {
            TimeSpan goTime;
            List<ImagenesVideoReferencia> result = new List<ImagenesVideoReferencia>();
            ValidateUser();
            result = cB_VideotecaDigital.ConsultaImagenesOTByVideoReferencia(OTRA_CVEC, VideoReferencia, DetIdFilename, vdo_id);

            if (result != null)
            {
                foreach (ImagenesVideoReferencia imagen in result)
                {
                    if (this.ValidaDivisionTimecode(VideoReferencia))
                        goTime = new TimeSpan(0, 0, (int)((imagen.Tiempo / 29.97) / 30));
                    else
                        goTime = new TimeSpan(0, 0, (int)((imagen.Tiempo / 29.97)));
                    imagen.Tiempo = Convert.ToInt32(Math.Floor(goTime.TotalSeconds));
                }
            }

            return result;
        }

        [WebMethod]
        public List<ImagenesVideoReferencia> ConsultaImagenesOTByVideoReferencia(string OTRA_CVEC, string VideoReferencia, string vdo_id)
        {
            ValidateUser();
            return cB_VideotecaDigital.ConsultaImagenesOTByVideoReferencia(OTRA_CVEC, VideoReferencia, "", vdo_id);
        }

        [WebMethod]
        public List<PlayListOT> ConsultaPlayListOT(string numOT, string VdoIdFilename)
        {
            ValidateUser();
            return cB_VideotecaDigital.ConsultaPlayListOT(numOT, VdoIdFilename);
        }

        [WebMethod]
        public List<PlayListOT> ConsultaPlayListOTFXP(string numOT, string VdoIdFilename)
        {
            ValidateUser();
            return cB_VideotecaDigital.ConsultaPlayListOTFXP(numOT, VdoIdFilename);
        }
        #endregion

        #region Validacion de Existencia de Video en Robot
        [WebMethod]
        public bool ValidaExisteEnRobot(string VdoIdFilename)
        {
            ValidateUser();
            return cB_VideotecaDigital.ValidaExisteEnRobot(VdoIdFilename);
        }

        [WebMethod]
        public bool GuardarVideoRobot(THE_VideoRobot oVideoRobot)
        {
            ValidateUser();
            return MngNegocioVideosRobot.GuardarVideoRobot(oVideoRobot);
        }
        #endregion
        #endregion

        #region Bitacora Diaria Por Programa

        [WebMethod]
        public List<THE_FormatoCompraIpad> ConsultaBitacoraDiaria(int cveSeccion, int cvePrograma, DateTime fecha)
        {
            ValidateUser();
            List<THE_FormatoCompraIpad> lstIpad = new List<THE_FormatoCompraIpad>();
            foreach (THE_FormatoCompra item in cB_Bitacora.ObtieneBitacoraDiariaXPrograma(cveSeccion, cvePrograma, fecha))
            {
                lstIpad.Add(new THE_FormatoCompraIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public List<THE_FormatoCompraIpad> ConsultaBitacoraDiaria_LOCALES(int cveSeccion, int cvePrograma, DateTime fecha, string LOCL_DESC)
        {
            ValidateUser();
            List<THE_FormatoCompraIpad> lstIpad = new List<THE_FormatoCompraIpad>();
            foreach (THE_FormatoCompra item in cB_Bitacora.ObtieneBitacoraDiariaXPrograma(cveSeccion, cvePrograma, fecha, LOCL_DESC))
            {
                lstIpad.Add(new THE_FormatoCompraIpad(item));
            }
            return lstIpad;
        }

        #endregion

        #region Evaluacion

        [WebMethod]
        public List<THE_ReaiIpad> ObtenerOtsTransmitidas(string ESIN_LLAV_PR, string reai_fhtr)
        {
            ValidateUser();
            List<THE_ReaiIpad> lstIpad = new List<THE_ReaiIpad>();
            foreach (THE_Reai item in cB_Evaluacion.ConsultaOTsTransmitidas(ESIN_LLAV_PR, reai_fhtr))
            {
                lstIpad.Add(new THE_ReaiIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public List<THE_ReaiIpad> ObtenerOtsEvaluadas(string ESIN_LLAV_PR, string reai_fhtr)
        {
            ValidateUser();
            List<THE_ReaiIpad> lstIpad = new List<THE_ReaiIpad>();
            foreach (THE_Reai item in cB_Evaluacion.ConsultaOTsEvaluadas(ESIN_LLAV_PR, reai_fhtr))
            {
                lstIpad.Add(new THE_ReaiIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public bool ActualizarStatusReai(THE_ReaiIpad status)
        {
            ValidateUser();
            return cB_Evaluacion.ActualizarStatusReai(status.getTHE_Reai());
        }

        [WebMethod]
        public bool ActualizarStatusReaiEliminar(THE_ReaiIpad Status)
        { ValidateUser(); return cB_Evaluacion.ActualizarStatusReaiEliminar(Status.getTHE_Reai()); }

        [WebMethod]
        public List<TDI_Poev> ObtenerPoev()
        {
            ValidateUser();
            return (List<TDI_Poev>)MngNegocioPoev.ObtenerPoev();
        }

        [WebMethod]
        public string Evaluar(List<THE_EvalIpad> evalipad, THE_ReaiIpad reai, int poev_llav_pr, THE_LogTransacciones LogTransacciones)
        {
            ValidateUser();
            List<THE_Eval> eval = new List<THE_Eval>();
            foreach (THE_EvalIpad itemEval in evalipad)
            {
                eval.Add(itemEval.get());
            }

            return cB_Evaluacion.Evaluar(eval, reai.getTHE_Reai(), LogTransacciones).ToString() + "_" + poev_llav_pr.ToString();
        }

        [WebMethod]
        public string ActualizarEvaluacion(List<THE_EvalIpad> evalIpad, int poev_llav_pr, THE_LogTransacciones LogTransacciones)
        {
            ValidateUser();

            List<THE_Eval> eval = new List<THE_Eval>();
            foreach (THE_EvalIpad itemEval in evalIpad)
            {
                eval.Add(itemEval.get());
            }


            return cB_Evaluacion.ActualizarEvaluacion(eval, LogTransacciones).ToString() + "_" + poev_llav_pr.ToString();
        }

        [WebMethod]
        public bool GuardarComentario(string otra_llav_pr, string esin_llav_pr, string reai_fhtr, string comentario, string usr)
        {
            ValidateUser();
            return cB_Evaluacion.GuardarComentario(otra_llav_pr, esin_llav_pr, reai_fhtr, comentario, usr);
        }

        [WebMethod]
        public string ObtenerComentario(string otra_llav_pr, string esin_llav_pr, string reai_fhtr)
        {
            ValidateUser();
            return cB_Evaluacion.ObtenerComentario(otra_llav_pr, esin_llav_pr, reai_fhtr);
        }

        [WebMethod]
        public bool ActualizarComentario(string otra_llav_pr, string esin_llav_pr, string reai_fhtr, string comentario, string usr)
        {
            ValidateUser();
            return cB_Evaluacion.ActualizarComentario(otra_llav_pr, esin_llav_pr, reai_fhtr, comentario, usr);
        }

        [WebMethod]
        public bool ActualizarFormato(THE_ReaiIpad reai)
        {
            ValidateUser();
            return cB_Evaluacion.ActualizarFormato(reai.getTHE_Reai());
        }

        [WebMethod]
        public List<THE_ApelacionComentarioIpad> ConsultarEvaluacionApelacion(int EsinLLavePr, DateTime FechaSelec)
        {
            ValidateUser();

            List<THE_ApelacionComentarioIpad> lstIpad = new List<THE_ApelacionComentarioIpad>();

            foreach (THE_ApelacionComentario item in MngNegocioApelacionComentario.GetEvaluacionApelacion(EsinLLavePr, FechaSelec))
            {
                lstIpad.Add(new THE_ApelacionComentarioIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public List<THE_ApelacionComentarioIpad> ConsultarApelacionesDatos(int CveEmpleado, int CveSecc, int CveProg, DateTime SelFecha)
        {
            ValidateUser();

            List<THE_ApelacionComentarioIpad> lstIpad = new List<THE_ApelacionComentarioIpad>();
            foreach (THE_ApelacionComentario item in MngNegocioApelacionComentario.GetApelacionesDatos(CveEmpleado, CveSecc, CveProg, SelFecha))
            {
                lstIpad.Add(new THE_ApelacionComentarioIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public bool ActualizarApelacionComentarioList(List<THE_ApelacionComentarioIpad> lstIPad, THE_LogTransacciones Trans)
        {
            ValidateUser();
            List<THE_ApelacionComentario> lst = new List<THE_ApelacionComentario>();
            foreach (THE_ApelacionComentarioIpad item in lstIPad)
            {
                lst.Add(item.get());
            }

            return MngNegocioApelacionComentario.ActualizarApelacionComentarioLst(lst, Trans);
        }

        [WebMethod]
        public bool ActualizarEvaluacionLst(List<THE_EvalIpad> lstIpad)
        {
            ValidateUser();

            List<THE_Eval> lst = new List<THE_Eval>();
            foreach (THE_EvalIpad item in lstIpad)
            {
                lst.Add(item.get());
            }

            return MngNegocioEval.ActualizarEvaluacionLst(lst);
        }

        [WebMethod]
        public List<THE_EvalIpad> ConsultarEvaluacion(List<int> CveOT, int CveProg, DateTime CveReai, int CvePtos)
        {
            ValidateUser();

            List<THE_EvalIpad> lstIpad = new List<THE_EvalIpad>();
            foreach (THE_Eval item in MngNegocioEval.ObtenerEval(CveOT, CveProg, CveReai, CvePtos))
            {
                lstIpad.Add(new THE_EvalIpad(item));
            }

            return lstIpad;
        }

        #endregion Evaluacion

        #region Reportes
        [WebMethod]
        public List<TDI_Puestos> GetPuestosReportes()
        {
            ValidateUser();
            return (List<TDI_Puestos>)MngNegocioPuestos.GetPuestosReportes();
        }

        [WebMethod]
        public List<TDI_Puestos> GetPuestosActivos()
        {
            ValidateUser();
            return (List<TDI_Puestos>)MngNegocioPuestos.GetPuestosActivos();
        }

        [WebMethod]
        public string GetEvalXEmpleadoNumEmpl(string NumPuestos, string NumSecc, string FecIni, string FecFin, string sort, int NumEmpleado)
        {
            ValidateUser();
            string resultjson = "";
            IList<RptAcumuladoMen> dato = MngNegocioReportes.GetEvalXEmpleado(NumPuestos, NumSecc, FecIni, FecFin, sort, NumEmpleado);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }

        [WebMethod]
        public string GetEvalXEmpleado(string NumPuestos, string NumSecc, string FecIni, string FecFin, string sort)
        {
            ValidateUser();
            string resultjson = "";
            IList<RptAcumuladoMen> dato=MngNegocioReportes.GetEvalXEmpleado(NumPuestos, NumSecc, FecIni, FecFin, sort, 0);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;

        }
        [WebMethod]
        public string GetEvalXEmpleadoHtml5(int Local, string NumPuestos, string NumSecc, string FecIni, string FecFin, string sort)
        {
            ValidateUser();
            string resultjson = "";
            IList<RptAcumuladoMen> dato = MngNegocioReportes.GetEvalXEmpleadoHtml5(Local, NumPuestos, NumSecc, FecIni, FecFin, sort, 0);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;

        }

        [WebMethod]
        public string GetEvalXEmpleadoMesXMesAnual(string NumEmpleado, string NumPuesto, string FecIni, string FecFin)
        {
            ValidateUser();
            string resultjson = "";
            IList<RptAcumuladoMen> dato=MngNegocioReportes.GetEvalXEmpleadoMesXMesAnual(NumEmpleado, NumPuesto, FecIni, FecFin);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }

        [WebMethod]
        public string GetCoberturas(string NumEmpleado, string NumPuesto, string FecIni, string FecFin)
        {
            ValidateUser();
            string resultjson = "";
            IList<GridsRptAcumuladoMen> dato=MngNegocioReportes.GetCoberturas(NumEmpleado, NumPuesto, FecIni, FecFin);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }

        [WebMethod]
        public string GetNotasGral(string NumEmpleado, string NumPuesto, string FecIni, string FecFin)
        {
            ValidateUser();
            string resultjson = "";
            IList<GridsRptAcumuladoMen> dato=MngNegocioReportes.GetNotasGralHtml5(NumEmpleado, NumPuesto, FecIni, FecFin);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }

        [WebMethod]
        public List<GridsRptAcumuladoMen> GetApelaciones(string IdEvaluacion, string IdPrograma, string FecIni, string FecFin)
        {
            ValidateUser();
            return (List<GridsRptAcumuladoMen>)MngNegocioReportes.GetApelaciones(IdEvaluacion, IdPrograma, FecIni, FecFin);
        }

        [WebMethod]
        public string GetApelacionesByEmpleado(string idEmpleado, string FecIni, string FecFin)
        {
            ValidateUser();
            string resultjson = "";
            IList<GridsRptAcumuladoMen> dato=MngNegocioReportes.GetApelacionesByEmpleadoHtml5(idEmpleado, FecIni, FecFin);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }

        [WebMethod]
        public List<RptEvalProg> GetNotasPrograma(string FecIni, string FecFin, string ESIN_LLAV_PR)
        {
            ValidateUser();
            return (List<RptEvalProg>)MngNegocioReportes.ConsultaNotasPrograma(FecIni, FecFin, ESIN_LLAV_PR);
        }

        [WebMethod]
        public List<TDI_Programa> GetProgramasReporteEvaluacion(string ESIN_LLAV_PR)
        {
            ValidateUser();
            return (List<TDI_Programa>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.GetProgramasReporteEvaluacion(ESIN_LLAV_PR);
        }

        [WebMethod]
        public List<THE_ApelacionComentarioIpad> GetComentarioApelacion(string OtraLLavePr, string EsinLLavePr, string ReaiFecha)
        {
            ValidateUser();
            List<THE_ApelacionComentarioIpad> lstIpad = new List<THE_ApelacionComentarioIpad>();
            foreach (THE_ApelacionComentario item in MngNegocioApelacionComentario.GetComentarioApelacion(OtraLLavePr, EsinLLavePr, ReaiFecha))
            {
                lstIpad.Add(new THE_ApelacionComentarioIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public bool GuardaApelacionComentario(THE_ApelacionComentarioIpad oApelacionComentario, THE_LogTransacciones LogTransacciones)
        {
            ValidateUser();
            return MngNegocioApelacionComentario.GuardaApelacionComentario(oApelacionComentario.get(), LogTransacciones);
        }

        [WebMethod]
        public List<TDI_Programa> ConsultaProgramasEsFiaNoticias(int EsFiaNoticias)
        { ValidateUser(); return (List<TDI_Programa>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.GetProgramasEsFiaNoticias(EsFiaNoticias); }

        [WebMethod]
        public List<THE_ApelacionComentarioIpad> ConsultaReporteApelacionMensual(DateTime Fecha, int CvePoev, int CveProg)
        {
            ValidateUser();
            List<THE_ApelacionComentarioIpad> lstIpad = new List<THE_ApelacionComentarioIpad>();
            foreach (THE_ApelacionComentario item in MngNegocioApelacionComentario.GetReporteApelacionesMensuales(Fecha, CvePoev, CveProg))
            {
                lstIpad.Add(new THE_ApelacionComentarioIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public int ConsultaTotalNotas(int CveProg, DateTime Fecha)
        { ValidateUser(); return MngNegocioApelacionComentario.GetTotalNotas(CveProg, Fecha); }

        [WebMethod]
        public List<RptTendenciaAnualEmpl> ConsultarReporteTendenciaAnualEmpl(int CveSecc, int CvePuest, DateTime Fecha)
        { ValidateUser(); return (List<RptTendenciaAnualEmpl>)MngNegocioRptTendenciaAnualEmpl.ObtenerTendenciaAnualEmpl(CveSecc, CvePuest, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionSeccionMensual(int CveSecc, int cveProg, DateTime Fecha)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtenerEvaluacionSeccion(CveSecc, cveProg, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionSeccionProg(int CveSecc, int cveProg, DateTime Fecha)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtenerEvaluacionSeccionProg(CveSecc, cveProg, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionSeccionAnual(int cveSecc, DateTime Fecha)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtenerEvaluacionSeccionAnual(cveSecc, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionSeccionFecha(DateTime FechaIni, DateTime FechaFin)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtenerEvaluacionSeccionFecha(FechaIni, FechaFin); }

        [WebMethod]
        public List<RptApelacionesSeccion> ConsultaReporteApelacionSeccionMensual(int CveSecc, DateTime Fecha)
        { ValidateUser(); return (List<RptApelacionesSeccion>)MngNegocioRptApelacionesSeccion.ObtenerApelacionSeccionMensual(CveSecc, Fecha); }

        [WebMethod]
        public List<RptApelacionesSeccion> ConsultaReporteApelacionesSeccionAnual(int CveSeccion, DateTime Fecha)
        { ValidateUser(); return (List<RptApelacionesSeccion>)MngNegocioRptApelacionesSeccion.ObtenerApelacionesSeccionAnual(CveSeccion, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionSeccionProgramaMensual(int CveSecc, DateTime FechaIni, DateTime FechaFin)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtenerEvaluacionSeccionProgramaMensual(CveSecc, FechaIni, FechaFin); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionProgramaMensual(int CveProg, DateTime Fecha)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtieneEvaluacionProgramaMensual(CveProg, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionProgShareRating(DateTime FechaIni, DateTime FechaFin)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtieneEvaluacionProgShareRating(FechaIni, FechaFin); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaEvaluacionProgShareAcumulado(int CveProg, DateTime Fecha)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtieneEvaluacionProgShareAcumulado(CveProg, Fecha); }

        [WebMethod]
        public List<RptApelacionesSeccion> ConsultaReporteApelacionProgMensual(int CveProg, DateTime Fecha)
        { ValidateUser(); return (List<RptApelacionesSeccion>)MngNegocioRptApelacionesSeccion.ObtenerApelacionesProgramaMensual(CveProg, Fecha); }

        [WebMethod]
        public List<RptApelacionesSeccion> ConsultaReporteApelacionProgAnual(int CveProg, DateTime Fecha)
        { ValidateUser(); return (List<RptApelacionesSeccion>)MngNegocioRptApelacionesSeccion.ObtenerApelacionesProgramaAnual(CveProg, Fecha); }

        [WebMethod]
        public List<RptEvaluacionSeccion> ConsultaReporteEvaluacionSeccProgFechAnual(int CveProg, DateTime FechaIni, DateTime FechaFin)
        { ValidateUser(); return (List<RptEvaluacionSeccion>)MngNegocioRptEvaluacionSeccion.ObtieneEvaluacionSeccionProgFechAnual(CveProg, FechaIni, FechaFin); }

        [WebMethod]
        public RptCompensacionesIpad ObtenerCompensaciones(int CveEmpl, DateTime FechaConsulta)
        {
            ValidateUser();
            return new RptCompensacionesIpad(MngNegocioRptCompensaciones.ObtenerCompensaciones(CveEmpl, FechaConsulta));
        }

        [WebMethod]
        public List<RptCables> ObtenerReporteCables(DateTime FechaConsulta, int Hrs)
        { ValidateUser(); return (List<RptCables>)MngNegocioRptCalbes.ObtenerReporteCables(FechaConsulta, Hrs); }

        [WebMethod]
        public List<RptCables> ObtenerReporteCablesASP(int CveTipoMat, DateTime FechaConsulta, int Hrs)
        {
            ValidateUser();
            return (List<RptCables>)MngNegocioRptCalbes.ObtenerReporteCablesASP(CveTipoMat, FechaConsulta, Hrs);
        }

        [WebMethod]
        public List<RptCables> ObtenerReporteCablesSecc(DateTime FechaConsulta, int Hrs, int CveSecc)
        {
            IList<RptCables> result = null;
            ValidateUser();
            result = MngNegocioRptCalbes.ObtenerReporteCables(FechaConsulta, Hrs, CveSecc);


            if (result == null)
                return new List<RptCables>();
            else
                return result.ToList<RptCables>();
        }

        #endregion

        #region Image

        public int ExecuteCommand(string Command, int Timeout)
        {
            int ExitCode = -1;

            try
            {
                ProcessStartInfo ProcessInfo;
                Process Process;
                ProcessInfo = new ProcessStartInfo("cmd.exe", "/C  \"" + Command + "\"");
                ProcessInfo.CreateNoWindow = true;
                ProcessInfo.UseShellExecute = false;
                Process = Process.Start(ProcessInfo);
                Process.WaitForExit(Timeout);
                ExitCode = Process.ExitCode;
                Process.Close();

                return ExitCode;
            }
            catch (Exception ex)
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";

                CommunicationLib.MamException.SaveException("Error Proceso FOTO  :: " + ExitCode.ToString() + ":: " + ex.Message, ex);
                return -1;
            }
        }

        #endregion

        #region Page

        [WebMethod]
        public List<TDI_Programa> ObtenerPrograma()
        {
            ValidateUser();
            return (List<TDI_Programa>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.ObtenerPrograma();
        }

        [WebMethod]
        public List<TDI_Programa> ObtenerProgramaNombre(string NombreProg)
        { ValidateUser(); return (List<TDI_Programa>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.ObtenerProgramaAbreviatura(NombreProg); }

        [WebMethod]
        public List<Pais> ObtenerPaises()
        {
            ValidateUser();
            return (List<Pais>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioPais.ObtenerPais();
        }

        [WebMethod]
        public List<Agencia> ObtenerAgenciasVidi()
        {
            ValidateUser();
            return (List<Agencia>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioAgencia.ObtenerAgencia();
        }

        [WebMethod]
        public List<Estado> ObtenerEstadosPais(int PaisLlave)
        {
            ValidateUser();
            return (List<Estado>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioEstado.ObtenerEstadoPais(PaisLlave);
        }

        [WebMethod]
        public List<Ciudad> ObtenerCiudadEstado(int cveEstado)
        {
            ValidateUser();
            return (List<Ciudad>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioCiudad.ObtenerCiudadEstado(cveEstado);
        }

        [WebMethod]
        public RptBusquedaAvanzadaMainIpad ObtenerDatosBusquedaAvanzada(string CveFabrica, string CveProg)
        {
            ValidateUser();
            return new RptBusquedaAvanzadaMainIpad(MngNegocioRptBusqAvanMain.DatosBusuquedaAvanzada(CveFabrica, CveProg));
        }

        #endregion

        #region INews

        [WebMethod]
        public List<THE_NotaTransmitida> GetGuionNotaTransmitida(int otraLlavePr, int esinLlavePr, DateTime realFechaTrans)
        {
            ValidateUser();
            return (List<THE_NotaTransmitida>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioNotaTransmitida.ObtenerGuionNotaTransmitida(otraLlavePr, esinLlavePr, realFechaTrans);
        }

        [WebMethod]
        public THE_NotaTransmitida ObtenerGuionRecuperacionGuion(int otraLlavePr, int esinLlavePr, DateTime realFechaTrans)
        { ValidateUser(); return TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioNotaTransmitida.ObtenerGuionRecuperacionGuion(otraLlavePr, esinLlavePr, realFechaTrans); }

        [WebMethod]
        public bool InicializaEnvioINewsRecuperarGuion(CompraOTIpad ListaOTCompradas, TDI_EMPL Reportero, string Guion, THE_LogTransacciones LogTransacciones)
        {
            ValidateUser();
            return MngNegocioINews.InicializaEnvioINewsRecuperarGuion(ListaOTCompradas.get(), Reportero, Guion, LogTransacciones);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public bool EnviaINEWS(List<CompraOTIpad> ListaCompraOT, THE_LogTransacciones Tran)
        {
            ValidateUser();
            bool bResult = false;
            foreach (CompraOTIpad ItemToINEWS in ListaCompraOT)
            {
                bResult = MngNegocioINews.EnvioINEWS(ItemToINEWS.get(), Tran);
            }

            return bResult;
        }

        [WebMethod]
        public bool EnvioINewsEscaleta(List<THE_Escaleta> ListaEscaleta, ProgramaEmpleado Programa)
        {
            ValidateUser();
            return MngNegocioINews.EnvioINewsEscaleta(ListaEscaleta, Programa);
        }

        [WebMethod]
        public bool EnvioINewsDiariaProgOrdn(List<AgendaOTPrograma> LstAgendaOTPrograma)
        {
            ValidateUser();

            List<THE_FormatoCompraIpad> lstFormatoCompraIpad = new List<THE_FormatoCompraIpad>();
            List<THE_FormatoCompra> lstFormatoCompra = new List<THE_FormatoCompra>();

            foreach (THE_FormatoCompraIpad item in lstFormatoCompraIpad)
            {
                lstFormatoCompra.Add(item.get());
            }


            THE_FormatoCompraIpad temp;
            int indice = 0;

            foreach (AgendaOTPrograma item in LstAgendaOTPrograma)
            {
                temp = new THE_FormatoCompraIpad();
                temp.CveOT = new THE_OrdenTrabajoIpad();
                temp.CvePrograma = new TDI_Programa();

                temp.CveOT.CveOrdenTrabajo = item.CveOrdenTrabajo;
                temp.CvePrograma.CvePrograma = item.CvePrograma;
                temp.FechaCompra = item.FechaCompra;
                temp.OrdenAgenda = indice++;

                lstFormatoCompraIpad.Add(temp);
            }

            foreach (THE_FormatoCompraIpad item in lstFormatoCompraIpad)
            {
                lstFormatoCompra.Add(item.get());
            }

            GuardaOrdenFormatoCompra(lstFormatoCompraIpad);

            return MngNegocioINews.EnvioINewsDiariaProgOrdn(LstAgendaOTPrograma);
        }

        [WebMethod]
        public bool EnvioINewsPreformato(AgendaOTPrograma Source)
        {
            ValidateUser();
            return MngNegocioINews.EnvioINewsDiariaProgOrdn(Source);
        }

        #endregion

        #region Servicios para diva
        [WebMethod]
        public Guid GetRestoreFromDiva(string guid, string[] filenames, string[] timecodes, bool stickFiles)
        {
            ValidateUser();
            lock (padlockSrvRestore)
            {


                Guid g = new Guid(guid);

                Location media = new Location();
                OptionsTask taskOpc = new OptionsTask();

                media.OT = guid;
                taskOpc.OT = guid;
                taskOpc.StickFiles = stickFiles;
                media.ServerPath = "";

                List<string> filesDv = new List<string>();
                foreach (string file in filenames)
                {
                    filesDv.Add(file.Substring(file.LastIndexOf("/") + 1).Replace(".mov", ".dv"));

                }



                media.OTSets = filesDv.ToArray();
                media.TimeCodes = timecodes;

                taskOpc.Priority = PriorityOptions.Media;

                try
                {

                    CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                    string srv = CommunicationLib.BasicClient.GetUrlFromServiceName("diva_restore_daemon");
                    IArchive arch = (IArchive)Activator.GetObject(typeof(IArchive), srv);
                    arch.RestoreFile(guid, media, taskOpc);
                    return g;
                }
                catch (Exception ex)
                {
                    CommunicationLib.MamException.SaveException(ex.Message, ex);
                }

                return g;

            }
        }

        [WebMethod]
        public void SaveRequestDiva(string jobName, string[] files, string[] timecodes, string guid, string usrId, string usrName, bool stickFiles)
        {
            ValidateUser();

            cB_DivaUtilities.SaveRequestDiva(jobName, files, timecodes, guid, usrId, @"\\10.71.40.22\fs0\Inbox\", usrName);
            GetRestoreFromDiva(guid, files, timecodes, stickFiles);
        }

        #endregion

        #region Teasers y Bumpers

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> GuardaOTTeaserYBumper(List<List<string>> initParamsOriginalIpad, List<List<string>> NumTotalDatos, List<string> ListaTipoDato, string Programa, DateTime FechaTransmision)
        {
            ValidateUser();
            IDictionary<string, string> initParamsOriginal = new Dictionary<string, string>();
            if (initParamsOriginalIpad != null)
            {
                for (int i = 0; i < initParamsOriginalIpad.Count; i++)
                {
                    initParamsOriginal.Add(new KeyValuePair<string, string>(initParamsOriginalIpad[i][0], initParamsOriginalIpad[i][1]));
                }
            }
            IDictionary<string, string> itemNumTotal = new Dictionary<string, string>();
            if (NumTotalDatos != null)
            {
                for (int i = 0; i < NumTotalDatos.Count; i++)
                {
                    itemNumTotal.Add(new KeyValuePair<string, string>(NumTotalDatos[i][0], NumTotalDatos[i][1]));
                }
            }
            List<THE_OrdenTrabajoIpad> lstIpad = new List<THE_OrdenTrabajoIpad>();
            foreach (THE_OrdenTrabajo item in ConsultaTeasersyBumpers.GuardaOTTeaserYBumper(initParamsOriginal, itemNumTotal, ListaTipoDato, Programa, FechaTransmision))
            {
                lstIpad.Add(new THE_OrdenTrabajoIpad(item));
            }
            return lstIpad;
        }

        private THE_LogTransacciones GenerateTransac(string[][] initParamsOriginalIpad)
        {

            THE_LogTransacciones tran = new THE_LogTransacciones();

            IDictionary<string, string> initParamsOriginal = new Dictionary<string, string>();
            if (initParamsOriginalIpad != null)
            {
                for (int i = 0; i <= initParamsOriginalIpad.Length; i++)
                {
                    initParamsOriginal.Add(initParamsOriginalIpad[i][0], initParamsOriginalIpad[i][1]);
                }
            }

            tran.DirIP = initParamsOriginal["UserIP"].ToString();
            tran.Dominio = initParamsOriginal["UserDomain"].ToString();
            tran.MachineName = initParamsOriginal["UserMachineName"].ToString();
            tran.Usuario = initParamsOriginal["NumUsuario"].ToString();

            return tran;
        }

        #endregion Teasers y Bumpers

        #region notificador status de servicios

        [WebMethod]
        public bool GetStatusDiva()
        {
            ValidateUser();
            try
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                string srv = CommunicationLib.BasicClient.GetUrlFromServiceName("diva_archive_actor1");
                IArchive enc = (IArchive)Activator.GetObject(typeof(IArchive), srv);
                enc.OT = BasicClient.Ping;
                INotificationStatusJob jobs = enc.GetNotificationObject();
                return jobs.IsAlive;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [WebMethod]
        public bool GetStatusRhozet()
        {
            ValidateUser();
            try
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                string srv = CommunicationLib.BasicClient.GetUrlFromServiceName("rhozet_to_diva");
                IEncoderTask enc = (IEncoderTask)Activator.GetObject(typeof(IEncoderTask), srv);
                enc.OT = BasicClient.Ping;
                INotificationStatusJob jobs = enc.GetNotificationObject();
                return jobs.IsAlive;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [WebMethod]
        public bool GetStatusActor()
        {
            ValidateUser();
            try
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                string srv = CommunicationLib.BasicClient.GetUrlFromServiceName("diva_archive_actor1");
                IArchive enc = (IArchive)Activator.GetObject(typeof(IArchive), srv);
                enc.OT = BasicClient.Ping;
                INotificationStatusJob jobs = enc.GetNotificationObject();
                return jobs.IsAlive;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [WebMethod]
        public bool[] GetStatusShares(string shareName, string shareName2)
        {
            ValidateUser();
            bool[] res = new bool[2];
            res[0] = Directory.Exists(shareName);
            res[1] = Directory.Exists(shareName2);
            return res;
        }

        [WebMethod]
        public bool GetStatusDB()
        {
            ValidateUser();

            string str = "";
            try
            {
                str = BasicClient.GetUrlFromServiceName("diva_archive_actor1");
                if (str != "" && str != null)
                    return true;
                return false;

            }
            catch (Exception)
            {
                return false;
            }
        }

        [WebMethod]
        public bool SystemIsPaused()
        {
            ValidateUser();
            return true;
        }

        [WebMethod]
        public JobsListActive[] GetJobListActiveRhozet()
        {
            ValidateUser();
            try
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                string srv = CommunicationLib.BasicClient.GetUrlFromServiceName("rhozet_to_diva");

                INotificationStatusJob enc = (INotificationStatusJob)Activator.GetObject(typeof(INotificationStatusJob), srv);
                return enc.GetActiveJobs();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [WebMethod]
        public JobsListActive[] GetJobListActiveDiva()
        {
            ValidateUser();
            try
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                string srv = CommunicationLib.BasicClient.GetUrlFromServiceName("diva_archive_actor1");

                INotificationStatusJob enc = (INotificationStatusJob)Activator.GetObject(typeof(INotificationStatusJob), srv);
                return enc.GetActiveJobs();
            }
            catch (Exception)
            {
                return null;
            }
        }

        #endregion

        #region Metodos Edicion

        [WebMethod]
        public List<TDI_EMPL> ConsultaRealizadores()
        { ValidateUser(); return (List<TDI_EMPL>)MngNegocioSalaRealizador.ObtenerRealizadores(); }

        [WebMethod]
        public List<TDI_EMPL> ConsultaRealizadoresPart2(int CvePrograma, int CveCentroEd, DateTime FechaIni)
        { ValidateUser(); return (List<TDI_EMPL>)MngNegocioSalaRealizador.ObtenerRealizadoresPart2(CvePrograma, CveCentroEd, FechaIni); }

        [WebMethod]
        public List<TDI_CentroEdicion> ConsultarCentroEdicion()
        { ValidateUser(); return (List<TDI_CentroEdicion>)MngNegocioCentroEdicion.ObtenerCentroEdicion(); }

        [WebMethod]
        public List<THE_SalaRealizador> ConsultaDatosRealizadores(int CveRealizador, int CveCentroEdicion, int CvePrograma, DateTime FechaIni)
        { ValidateUser(); return (List<THE_SalaRealizador>)MngNegocioSalaRealizador.ObtenerDatosRealizadores(CveRealizador, CveCentroEdicion, CvePrograma, FechaIni); }

        [WebMethod]
        public bool EliminarRegistroRealizador(THE_SalaRealizador SalaRealizador)
        { ValidateUser(); return MngNegocioSalaRealizador.BorrarSalaRealizador(SalaRealizador); }

        [WebMethod]
        public bool GuardarRegistroRealizador(THE_SalaRealizador oSalaRealizador)
        {
            ValidateUser();
            return MngNegocioSalaRealizador.GuardarSalaRealizador(oSalaRealizador);
        }

        [WebMethod]
        public List<TDI_EstatusEditor> ConsultaEstatusEditor()
        { ValidateUser(); return (List<TDI_EstatusEditor>)MngNegocioEstatusEditor.ObtenerEstatusEditor(); }

        [WebMethod]
        public bool InsertaListaSolicitudEditor(List<THE_SolicitudEditorIpad> LstSolicitudEditor)
        {
            ValidateUser();

            List<THE_SolicitudEditor> lstOriginal = new List<THE_SolicitudEditor>();

            foreach (THE_SolicitudEditorIpad item in LstSolicitudEditor)
            {
                lstOriginal.Add(item.getTHE_SolicitudEditor());
            }

            return MngNegocioSolicitudEditor.GuardarListaSolicitudEditor(lstOriginal);
        }

        [WebMethod]
        public bool ActualizaListaSolicitudEditor(List<THE_SolicitudEditorIpad> LstSolicitudEditor)
        {
            ValidateUser();

            List<THE_SolicitudEditor> lstOriginal = new List<THE_SolicitudEditor>();

            foreach (THE_SolicitudEditorIpad item in LstSolicitudEditor)
            {
                lstOriginal.Add(item.getTHE_SolicitudEditor());
            }

            return MngNegocioSolicitudEditor.ActualizaListaSolicitudEditor(lstOriginal);
        }

        [WebMethod]
        public bool ActualizaSolicitudEditor(int cveSolicitud, int cvePrograma, int cveOT)
        {
            THE_SolicitudEditor editor = null;
            ValidateUser();
            editor = MngNegocioSolicitudEditor.ObtenerSolicitudEditor(cveSolicitud, cvePrograma, cveOT);

            editor.CveEmpleado = null;
            editor.CveCentroEdicion = null;
            editor.CveEstatusEditor.CveEstatusEd = 1;
            editor.Indexrealizadores = 0;
            editor.IndexEstatus = 0;

            return MngNegocioSolicitudEditor.ActualizarSolicitudEditor(editor); 
        }

        [WebMethod]
        public bool ActualizaSolicitudEditorObj(THE_SolicitudEditorIpad SolicitudEditor)
        {
            ValidateUser();
            return MngNegocioSolicitudEditor.ActualizarSolicitudEditor(SolicitudEditor.getTHE_SolicitudEditor());
        }

        [WebMethod]
        public bool BorrarSolicitudEditor(THE_SolicitudEditorIpad SolicitudEditor)
        { ValidateUser(); return MngNegocioSolicitudEditor.BorrarSolicitudEditor(SolicitudEditor.getTHE_SolicitudEditor()); }

        [WebMethod]
        public List<THE_EquipoTrabajoIpad> ConsultarDatosEquipoTrabajo(int CvePrograma, int CveOT)
        {
            ValidateUser();

            List<THE_EquipoTrabajoIpad> lstIpad = new List<THE_EquipoTrabajoIpad>();

            foreach (THE_EquipoTrabajo item in MngNegocioSolicitudEditor.ObtenerDatosEquipoTrabajo(CvePrograma, CveOT))
            {
                lstIpad.Add(new THE_EquipoTrabajoIpad(item));
            }

            return lstIpad;
        }

        [WebMethod]
        public bool InsertaListaEquipoTrabajo(List<THE_EquipoTrabajoIpad> EquipoTrabajoIpad)
        {
            ValidateUser();

            List<THE_EquipoTrabajo> lstEquip = new List<THE_EquipoTrabajo>();

            foreach (THE_EquipoTrabajoIpad item in EquipoTrabajoIpad)
            {
                lstEquip.Add(item.get());
            }

            return MngNegocioEquipoTrabajo.GuardarEquipoTrabajo(lstEquip);
        }

        [WebMethod]
        public bool EliminaEquipoTrabajoSOED(int CveOT, int CveProg, int CvePuesto)
        { ValidateUser(); return MngNegocioEquipoTrabajo.BorrarEquipoTrabajo(CveOT, CveProg, CvePuesto); }

        [WebMethod]
        public List<THE_SolicitudEditorIpad> ConsultaSolicitudEditorDuracion(string CveOT, int CveProg, int CveEstatusEd, DateTime FechaIni, DateTime FechaFin)
        {
            ValidateUser();
            List<THE_SolicitudEditorIpad> lstIpad = new List<THE_SolicitudEditorIpad>();
            foreach (THE_SolicitudEditor item in MngNegocioSolicitudEditor.ObtenerSOEDDuracion(CveOT, CveProg, CveEstatusEd, FechaIni, FechaFin))
            {
                lstIpad.Add(new THE_SolicitudEditorIpad(item));
            }
            return lstIpad;
        }

        //
        [WebMethod]
        public Boolean GuardarSinrealizador(List<THE_EQAIIpad> oSinRealizador)
        {
            ValidateUser();
            List<THE_EQAI> lstIpad = new List<THE_EQAI>();
            foreach (THE_EQAIIpad item in oSinRealizador)
            {
                lstIpad.Add(item.get());
            }
            return MngNegocioSinRealizador.GuardarSinrealizador(lstIpad);
        }
        //
        #endregion

        #region Recuperacion de videos

        [WebMethod]
        public List<VideoRecuperacionArchivo> ConsultaVideoRecuperacionArchivos(VideoRecuperacion oVideoRecuperacion)
        {
            ValidateUser();
            return (List<VideoRecuperacionArchivo>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacionArchivo.ObtenerVideoRecuperacionArchivo(oVideoRecuperacion);
        }

        [WebMethod]
        public bool ConsultaPrivilegioRecuperacion(string empl_llav_pr)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacionArchivo.ConsultaPrivilegioRecuperacion(empl_llav_pr);
        }

        [WebMethod]
        public List<TipoRecuperacion> ConsultaTipoRecuperacionVideos()
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioTipoRecuperacion.ObtenerTipoRecuperacion();
        }

        [WebMethod]
        public List<VideoRecuperacion> ConsultaVideoRecuperacionPorEmpleado(int cveEmpleado, DateTime fechaIni, DateTime fechaFin)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ObtenerVideoRecuperacion(cveEmpleado, fechaIni, fechaFin);
        }

        [WebMethod]
        public List<VideoRecuperacion> ConsultaVideoRecuperacionPorEmpleadoOtroFormato(int cveEmpleado, DateTime fechaIni, DateTime fechaFin)
        {
            ValidateUser();
            return (List<VideoRecuperacion>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ObtenerVideoRecuperacionOtroFormato(cveEmpleado, fechaIni, fechaFin);
        }

        [WebMethod]
        public VideoRecuperacion InsertarVideoRecuperacionyArchivos(VideoRecuperacion oVideoRecuperacion, List<VideoRecuperacionArchivo> lstVideoRecuperacionArchivo, bool esNotificame, THE_LogTransacciones LogTransacciones, bool HasAdquisiciones)
        {
            ValidateUser();
            //Se cambiaron los parametros del metodo para la bandera de autorizacion
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.InsertaVideoRecuperacionyArchivos(oVideoRecuperacion, lstVideoRecuperacionArchivo, esNotificame, LogTransacciones, false, false);
            //return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.InsertaVideoRecuperacionyArchivos(oVideoRecuperacion, lstVideoRecuperacionArchivo, esNotificame, LogTransacciones, HasAdquisiciones);
        }

        [WebMethod]
        public string GetPrefixArchivo(string esin_llav_pr)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.cB_DivaUtilities.GetPrefixArchivo(esin_llav_pr);
        }

        [WebMethod]
        public bool GuardaNumeroCelularCOEM(string NumCel, int NumEmpleado)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.GuardaNumeroCelularCOEM(NumCel, NumEmpleado);
        }

        [WebMethod]
        public List<THE_SolicitudEditorIpad> ConsultaDatosSolicitudEditor(int CveEmpleado, int CveCentroEdicion, int CveEstatusEditor, int CvePrograma, int CveSeccion, DateTime FechaIni)
        {
            ValidateUser();

            List<THE_SolicitudEditorIpad> lstIpad = new List<THE_SolicitudEditorIpad>();
            foreach (THE_SolicitudEditor item in MngNegocioSolicitudEditor.ObtenerDatosSolicitudEditor(CveEmpleado, CveCentroEdicion, CveEstatusEditor, CvePrograma, CveSeccion, FechaIni))
            {
                lstIpad.Add(new THE_SolicitudEditorIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<Play_Out_Shares> ObtenerPlayOutSharesRecuperaciones()
        {
            ValidateUser(); return (List<Play_Out_Shares>)MngNegocioPlayOutShares.ObtenerPlay_Out_Sharesrecuperaciones();
        }

        #region Recuperación Marcas
        [WebMethod]
        public List<VideoRecuperacion> ObtenerRecuperacionesXNumEmpleado(string NumEmpleado)
        {
            ValidateUser();
            return (List<VideoRecuperacion>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ObtenerVideoRecuperacion(NumEmpleado, "XEmpleado");
        }

        [WebMethod]
        public List<VideoRecuperacion> ObtenerValidacionRecuperaciones(List<string> Source)
        {
            ValidateUser();
            return (List<VideoRecuperacion>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ObtenerValidacionRecuperaciones(Source);
        }

        [WebMethod]
        public List<BusquedaAvanzada> getInfoMetadaByIdFilename(string idFilename)
        {
            ValidateUser();
            int NumOT = TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.getNumOTByIdFilename(idFilename);

            return (List<BusquedaAvanzada>)MngNegocioConsulta.ObtenerBusquedaAvanzadaConySinOT("", "", 0, 0, 0, 0, 0, 0, DateTime.Now, DateTime.Now, false, false, true, true, "", 0, NumOT.ToString(), "", 0, 0, true);
        }
        #endregion

        #region Búsqueda Metodos
        [WebMethod]
        public List<TDI_BUSQUEDAS> getBusquedasByUsuario(string Username)
        {
            ValidateUser();
            return MngNegocioBusquedas.getBusquedasByUsuario(Username);
        }

        [WebMethod]
        public FastResultset ConsultaRecuperacionBusquedas(bool isQuery, string strParams, int PerPage)
        {
            ValidateUser();
            return MngNegocioBusquedas.ConsultaRecuperacionBusquedas(isQuery, strParams, PerPage);
        }

        [WebMethod]
        public bool GuardaBusquedas(TDI_BUSQUEDAS oBusquedas)
        {
            ValidateUser();
            return MngNegocioBusquedas.GuardaBusquedas(oBusquedas);
        }

        [WebMethod]
        public bool BorraBusquedaByNombre(TDI_BUSQUEDAS oBusquedaToDelete)
        {
            ValidateUser();
            return MngNegocioBusquedas.BorraBusquedaByNombre(oBusquedaToDelete);
        }
        #endregion

        #endregion

        #region UserControl Video
        [WebMethod]
        public bool ActualizaInformacionMetadata(VideoDetalle oInformacion, THE_LogTransacciones oLogTr)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoDetalle.ActualizarVideoDetalle(oInformacion, oLogTr);
        }

        [WebMethod]
        public int getIdProgramaByidFileName(string idFilename)
        {
            ValidateUser();
            return MngNegocioConsulta.getIdProgramaByidFileName(idFilename);
        }
        #endregion

        #region Acoplados
        [WebMethod]
        public List<BusquedaAvanzada> ObtenerBusquedaAvanzadaAcoplados(string textoBusqueda, string FechaIni, string FechaFin)
        {
            ValidateUser();
            List<BusquedaAvanzada> lstItem = new List<BusquedaAvanzada>();
            foreach (BusquedaAvanzada item in MngNegocioConsulta.ObtenerBusquedaAvanzadaAcoplados(textoBusqueda, FechaIni, FechaFin))
            {
                lstItem.Add(item);
            }
            return lstItem;
        }

        [WebMethod]
        public int GuardaAcoplados(AcopladoIpad oAcoplado)
        {
            ValidateUser();
            if (MngNegocioAcoplados.GuardaAcoplados(oAcoplado.get()))
                return oAcoplado.IdAcoplado;
            else
                return -1;
        }

        [WebMethod]
        public bool GuardaImgXAcoplado(ImagenXAcopladoIpad oImgXAcoplado)
        {
            ValidateUser();
            return MngNegocioAcoplados.GuardaImagenAcoplado(oImgXAcoplado.get());
        }

        [WebMethod]
        public List<AcopladoIpad> getListaAcoplados()
        {
            ValidateUser();
            List<AcopladoIpad> lstIpad = new List<AcopladoIpad>();
            foreach (Acoplado item in MngNegocioAcoplados.getListaAcoplados())
            {
                lstIpad.Add(new AcopladoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<ImagenXAcopladoIpad> getListaImagenesXAcoplado(AcopladoIpad oAcoplado)
        {
            ValidateUser();
            List<ImagenXAcopladoIpad> lstIpad = new List<ImagenXAcopladoIpad>();
            foreach (ImagenXAcoplado item in MngNegocioAcoplados.getListaImagenesXAcoplado(oAcoplado.get()))
            {
                lstIpad.Add(new ImagenXAcopladoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public bool EliminaTodoAcoplado(AcopladoIpad oAcoplado)
        {
            ValidateUser();
            return MngNegocioAcoplados.EliminaTodoAcoplado(oAcoplado.get());
        }

        [WebMethod]
        public bool EliminaImagenesXAcoplado(ImagenXAcopladoIpad oImgXAcoplado)
        {
            ValidateUser();
            return MngNegocioAcoplados.EliminaImagenesXAcoplado(oImgXAcoplado.get());
        }

        [WebMethod]
        public bool ActualizaAcoplado(AcopladoIpad oAcoplado)
        {
            ValidateUser();
            return MngNegocioAcoplados.ActualizaAcoplado(oAcoplado.get());
        }
        #endregion

        #region Reconocimientos

        [WebMethod]
        public THE_RECOIpad GuardaReconocimiento(THE_RECOIpad oReconocimiento)
        {
            ValidateUser();
            THE_RECOIpad rec = new THE_RECOIpad(MngNegocioReconocimiento.GuardaReconocimiento(oReconocimiento.getTHE_RECO()));
            if (rec.LlavePrimaria > 0)
            {
                if (oReconocimiento.ListaReem.Count > 0)
                {
                    List<THE_REEM> list = new List<THE_REEM>();
                    foreach (THE_REEMIpad foo in oReconocimiento.ListaReem)
                    {
                        foo.RecoLLavPr = rec.LlavePrimaria;
                        list.Add(foo.get());
                    }
                    MngNegocioReconocimiento.GuardaReconocimientoEmpleados(list);
                }
                if (oReconocimiento.ListaRevi.Count > 0)
                {
                    List<THE_ReconocimientoVideo> list = new List<THE_ReconocimientoVideo>();
                    foreach (THE_ReconocimientoVideoIpad oReVi in oReconocimiento.ListaRevi)
                    {
                        oReVi.Reconocimiento = rec.LlavePrimaria;
                        list.Add(oReVi.getTHE_ReconocimientoVideo());
                    }
                    MngNegocioReconocimiento.GuardaReconocimientoVideo(list);
                }
                rec.ListaReem = null;
                rec.ListaRevi = null;
                return rec;
            }
            else
            {
                return oReconocimiento;
            }
        }

        [WebMethod]
        public List<TDI_EMPL> ObtenerListaEmpleados()
        {
            ValidateUser();
            return (List<TDI_EMPL>)MngNegocioReconocimiento.getListaEmpleados();
        }

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> ObtenerOTPorClave(int OTid)
        {
            ValidateUser();
            List<THE_OrdenTrabajoIpad> lstIpad = new List<THE_OrdenTrabajoIpad>();
            foreach (THE_OrdenTrabajo item in MngNegocioReconocimiento.getOtById(OTid))
            {
                lstIpad.Add(new THE_OrdenTrabajoIpad(item));
            }
            return lstIpad;

        }
        [WebMethod]
        public int GuardaReconocimientoEmpleado(List<THE_REEMIpad> listaReemIpad)
        {
            ValidateUser();
            List<THE_REEM> listaReem = new List<THE_REEM>();
            foreach (THE_REEMIpad oReem in listaReemIpad)
            {
                listaReem.Add(oReem.get());
            }
            return MngNegocioReconocimiento.GuardaReconocimientoEmpleados(listaReem);
        }

        [WebMethod]
        public int BorraReconocimientoEmpleado(List<THE_REEMIpad> listaReemIpad)
        {
            ValidateUser();
            List<THE_REEM> listaReem = new List<THE_REEM>();
            foreach (THE_REEMIpad oReem in listaReemIpad)
            {
                listaReem.Add(oReem.get());
            }
            return MngNegocioReconocimiento.BorraReconocimientoEmpleados(listaReem);
        }
        [WebMethod]
        public List<THE_RECOIpad> ObtenerReconocimientos(string where, bool todos)
        {
            ValidateUser();
            List<THE_RECOIpad> lstIpad = new List<THE_RECOIpad>();
            foreach (THE_RECO item in MngNegocioReconocimiento.getReconocimientos(where, todos))
            {
                lstIpad.Add(new THE_RECOIpad(item));
            }
            return lstIpad;
        }
        [WebMethod]
        public List<THE_REEMIpad> ObtenerReconocimientoEmpleado(int RecoLlavPr)
        {
            ValidateUser();
            List<THE_REEMIpad> lstIpad = new List<THE_REEMIpad>();
            foreach (THE_REEM item in MngNegocioReconocimiento.ObtenerReconocimientoEmpleados(RecoLlavPr))
            {
                lstIpad.Add(new THE_REEMIpad(item));
            }
            return lstIpad;
        }
        [WebMethod]
        public bool BorrarReconocimiento(THE_RECOIpad reconocimiento)
        {
            ValidateUser();
            return MngNegocioReconocimiento.BorrarReconocimiento(reconocimiento.getTHE_RECO());
        }
        [WebMethod]
        public THE_RECOIpad ObtenerReconocimientoById(int RecoLlavPr)
        {
            ValidateUser();
            THE_RECOIpad reco = new THE_RECOIpad(MngNegocioReconocimiento.getReconocimientoByLLavPr(RecoLlavPr));
            return reco;
        }
        [WebMethod]
        public List<VideoOTIpad> ObtieneVideoOTByIdFilename(string IdFilename)
        {
            ValidateUser();
            List<VideoOTIpad> lstIpad = new List<VideoOTIpad>();
            foreach (VideoOT item in MngNegocioReconocimiento.ObtieneVideoOTByIdFilename(IdFilename))
            {
                lstIpad.Add(new VideoOTIpad(item));
            }
            return lstIpad;
        }
        [WebMethod]
        public List<VideoOTIpad> ObtieneVideosOTByIdFilename(string[] IdFilename)
        {
            ValidateUser();
            List<VideoOTIpad> lstIpad = new List<VideoOTIpad>();
            foreach (VideoOT item in MngNegocioReconocimiento.ObtieneVideoOTByIdFilename(IdFilename))
            {
                lstIpad.Add(new VideoOTIpad(item));
            }
            return lstIpad;
        }
        [WebMethod]
        public List<VideoOTIpad> ObtieneVideoOT(string VideoId)
        {
            ValidateUser();
            List<VideoOTIpad> lstIpad = new List<VideoOTIpad>();
            foreach (VideoOT item in MngNegocioReconocimiento.ObtieneVideoOT(VideoId))
            {
                lstIpad.Add(new VideoOTIpad(item));
            }
            return lstIpad;
        }
        [WebMethod]
        public int GuardaReconocimientoVideo(List<THE_ReconocimientoVideoIpad> RecoVideosIpad)
        {
            ValidateUser();
            List<THE_ReconocimientoVideo> RecoVideos = new List<THE_ReconocimientoVideo>();
            foreach (THE_ReconocimientoVideoIpad oReco in RecoVideosIpad)
            {
                RecoVideos.Add(oReco.getTHE_ReconocimientoVideo());
            }
            return MngNegocioReconocimiento.GuardaReconocimientoVideo(RecoVideos);
        }
        [WebMethod]
        public List<THE_ReconocimientoVideoIpad> ObtieneReconocimientoVideo(int RecoLLavPr)
        {
            ValidateUser();
            List<THE_ReconocimientoVideoIpad> lstIpad = new List<THE_ReconocimientoVideoIpad>();
            foreach (THE_ReconocimientoVideo item in MngNegocioReconocimiento.ObtieneReconocimientoVideo(RecoLLavPr))
            {
                lstIpad.Add(new THE_ReconocimientoVideoIpad(item));
            }
            return lstIpad;
        }
        [WebMethod]
        public List<BusquedaAvanzada> ObtieneVideosPorReconocimiento(THE_RECOIpad oReconocimiento)
        {
            ValidateUser();
            string[] videoIds = new string[oReconocimiento.ListaRevi.Count];
            for (int i = 0; i < oReconocimiento.ListaRevi.Count; i++)
            {
                videoIds[i] = oReconocimiento.ListaRevi[i].VideoId.IdFilename;
            }
            return (List<BusquedaAvanzada>)MngNegocioConsulta.ObtenerBusquedaAvanzadaConySinOT(videoIds);
        }
        [WebMethod]
        public bool BorraReconocimientoVideo(THE_ReconocimientoVideoIpad revi)
        {
            ValidateUser();
            return MngNegocioReconocimiento.BorraReconocimientoVideo(revi.getTHE_ReconocimientoVideo());
        }

        [WebMethod]
        public List<BusquedaAvanzada> ObtieneVideosPorOT(string OtraLLavPr, string OtraCvec)
        {
            ValidateUser();
            return (List<BusquedaAvanzada>)MngNegocioReconocimiento.ObtieneVideosPorOT(OtraLLavPr, OtraCvec);
        }

        #endregion Reconocimientos

        #region Escaleta
        [WebMethod]
        public List<THE_Escaleta> GuardaEscaleta(List<THE_Escaleta> oEscaleta, string[][] initParamsOriginalIpad)
        {
            ValidateUser();

            IDictionary<string, string> initParamsOriginal = new Dictionary<string, string>();
            if (initParamsOriginalIpad != null)
            {
                for (int i = 0; i <= initParamsOriginalIpad.Length; i++)
                {
                    initParamsOriginal.Add(new KeyValuePair<string, string>(initParamsOriginalIpad[i][0], initParamsOriginalIpad[i][1]));
                }

            }
            //IDictionary<string, string> initParams = initParamsOriginal;
            return MngNegocioEscaleta.GuardaEscaleta(oEscaleta, initParamsOriginal);
        }

        [WebMethod]
        public List<TDI_TipoEnvio> ObtenerTiposEnvio()
        {
            ValidateUser();
            return (List<TDI_TipoEnvio>)MngNegocioEscaleta.ObtenerTiposEnvio();
        }

        #endregion

        #region Cintas Dañadas

        [WebMethod]
        public CintasDanadas GuardaCintasDanadas(CintasDanadas Cinta)
        {
            ValidateUser();
            return MngNegocioCintasDanadas.GuardaCintasDanadas(Cinta);
        }
        [WebMethod]
        public int GuardaCintasDanadasList(List<CintasDanadas> listCintas)
        {
            ValidateUser();
            return MngNegocioCintasDanadas.GuardaCintasDanadasList(listCintas);
        }
        [WebMethod]
        public int BorraCintasDanadas(List<CintasDanadas> listCintas)
        {
            ValidateUser();
            return MngNegocioCintasDanadas.BorraCintasDanadas(listCintas);
        }
        [WebMethod]
        public List<CintasDanadas> ObtenerCintasDanadas()
        {
            ValidateUser();
            return (List<CintasDanadas>)MngNegocioCintasDanadas.ObtenerCintasDanadas();
        }
        [WebMethod]
        public List<CintasDanadas> ObtenerCintasDanadasBy(string Condicion)
        {
            ValidateUser();
            return (List<CintasDanadas>)MngNegocioCintasDanadas.ObtenerCintasDanadasBy(Condicion);
        }

        #endregion Cintas Dañadas

        #region Avances Monitoreo

        [WebMethod]
        public List<AvanceMonitoreo> GetAvancesMonitoreo(int Fabrica, DateTime Fecha)
        {
            ValidateUser();
            return (List<AvanceMonitoreo>)MngNegocioAvanceMonitoreo.getAvancesMonitoreo(Fabrica, Fecha);
        }

        [WebMethod]
        public List<AvanceMonitoreo> ConsultaMonitoreo(int Fabrica, DateTime Fecha, string MonitoreoLlavPr)
        {
            ValidateUser();
            return (List<AvanceMonitoreo>)MngNegocioAvanceMonitoreo.getAvancesMonitoreo(Fabrica, Fecha);
        }
        [WebMethod]
        public RegresoOrdenTrabajoIpad CreaOTFromMonitoreo(AvanceMonitoreo oAvMon, THE_LogTransacciones oLogTr)
        {
            ValidateUser();
            return new RegresoOrdenTrabajoIpad(MngNegocioAvanceMonitoreo.CreaOTFromMonitoreo(oAvMon, oLogTr));
        }
        [WebMethod]
        public int GuardaMonitoreo(List<THE_Monitoreo> ListaMonitoreo)
        {
            ValidateUser();
            return MngNegocioAvanceMonitoreo.GuardaMonitoreo(ListaMonitoreo);
        }
        [WebMethod]
        public List<TDI_TipoMonitoreo> ObtenerListaTipoMonitoreo()
        {
            ValidateUser();
            return (List<TDI_TipoMonitoreo>)MngNegocioAvanceMonitoreo.ObtenerListaTipoMonitoreo();
        }
        [WebMethod]
        public List<THE_Monitoreo> ObtenerMonitoreosPorDia(DateTime Dia)
        {
            ValidateUser();
            return (List<THE_Monitoreo>)MngNegocioAvanceMonitoreo.ObtenerMonitoreosPorDia(Dia);
        }
        [WebMethod]
        public bool ActualizaMonitoreo(THE_Monitoreo oMonitoreo)
        {
            ValidateUser(); return MngNegocioAvanceMonitoreo.ActualizaMonitoreo(oMonitoreo);
        }
        [WebMethod]
        public bool EliminarMonitoreo(THE_Monitoreo oMonitoreo)
        {
            ValidateUser(); return MngNegocioAvanceMonitoreo.EliminarMonitoreo(oMonitoreo);
        }

        [WebMethod]
        public List<DataMap> getMapData()
        {
            ValidateUser(); return MngNegocioSolMatLocal.getDataMap().ToList();
        }

        [WebMethod]
        public List<string> getStatesOnTransfer(int local)
        {
            ValidateUser(); return MngNegocioSolMatLocal.getStatesOnTransfer(local).ToList();
        }

        #endregion Avances Monitoreo

        #region Trafico

        [WebMethod]
        public List<TDI_TipoMatTrafico> ObtenerTipoMatTrafico()
        {
            ValidateUser(); return (List<TDI_TipoMatTrafico>)MngNegocioTipoMatTrafico.ObtenerTipoMatTrafico();
        }

        [WebMethod]
        public string GuardarSolicitudTrafico(THE_SolicitudesTraficoIpad Solicitud)
        {
            ValidateUser();
            return MngNegocioSolicitudesTrafico.GuardarSolicitudesTrafico(Solicitud.getTHE_SolicitudesTrafico());
        }

        [WebMethod]
        public string GuardarListaSolicitudTrafico(List<THE_SolicitudesTraficoIpad> solicitudIpad)
        {
            ValidateUser();
            List<THE_SolicitudesTrafico> Solicitud = new List<THE_SolicitudesTrafico>();
            foreach (THE_SolicitudesTraficoIpad oIpad in solicitudIpad)
            {
                Solicitud.Add(oIpad.getTHE_SolicitudesTrafico());
            }
            return MngNegocioSolicitudesTrafico.GuardarListaSolicitudesTrafico(Solicitud);
        }

        [WebMethod]
        public List<THE_SolicitudesTraficoIpad> ObtenerSolicitudesTrafico(int NumeroEmpleado, DateTime Fecha, string Seccion, int EstatusTrafico, string CvecOT, bool EsProgramas)
        {
            ValidateUser();
            List<THE_SolicitudesTraficoIpad> lstIpad = new List<THE_SolicitudesTraficoIpad>();
            foreach (THE_SolicitudesTrafico item in MngNegocioSolicitudesTrafico.ObtenerSolicitudesTrafico(NumeroEmpleado, Fecha, Seccion, EstatusTrafico, CvecOT, EsProgramas))
            {
                lstIpad.Add(new THE_SolicitudesTraficoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<TDI_EstatusTrafico> ObtenerEstatusTrafico()
        {
            ValidateUser(); return (List<TDI_EstatusTrafico>)MngNegocioEstatusTrafico.ObtenerEstatusTrafico();
        }

        [WebMethod]
        public List<THE_SolicitudesTraficoIpad> ConsultaMaterialNoBorrar(DateTime FechaInicio, DateTime FechaFinal, int CveProg, string CveOT, string NombreBIN, string EstatusSol, int CveSecc)
        {
            ValidateUser();
            List<THE_SolicitudesTraficoIpad> lstIpad = new List<THE_SolicitudesTraficoIpad>();
            foreach (THE_SolicitudesTrafico item in MngNegocioSolicitudesTrafico.ConsultaMaterialNoBorrar(FechaInicio, FechaFinal, CveProg, CveOT, NombreBIN, EstatusSol, CveSecc))
            {
                lstIpad.Add(new THE_SolicitudesTraficoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public bool ActualizarSolicitudTrafico(THE_SolicitudesTraficoIpad Actualizar)
        { ValidateUser(); return MngNegocioSolicitudesTrafico.ActualizarSolicitudesTrafico(Actualizar.getTHE_SolicitudesTrafico()); }

        [WebMethod]
        public bool ActualizaSolicitudTraficoCant(THE_SolicitudesTraficoIpad Actualizar, int Usuario, string DirIP)
        { ValidateUser(); return MngNegocioSolicitudesTrafico.ActualizarSolicitudesTraficoCant(Actualizar.getTHE_SolicitudesTrafico(), Usuario, DirIP); }

        [WebMethod]
        public List<THE_SolicitudesExpiradasIpad> SolicitudesExpiradas(DateTime FechaInicio, DateTime FechaFinal, string tipo, string seccion, string consulta, string prodTipo)
        {
            ValidateUser();
            List<THE_SolicitudesExpiradasIpad> lstIpad = new List<THE_SolicitudesExpiradasIpad>();
            foreach (THE_SolicitudesExpiradas item in MngNegocioSolicitudesExpiradas.SolicitudesExpiradas(FechaInicio, FechaFinal, tipo, seccion, consulta, prodTipo))
            {
                lstIpad.Add(new THE_SolicitudesExpiradasIpad(item));
            }
            return lstIpad;
        }

        #endregion

        #region VideoPlayOut

        [WebMethod]
        public List<TDI_VideoPlayOutIpad> GetVideosPlayout()
        {
            ValidateUser();
            List<TDI_VideoPlayOutIpad> lstIpad = new List<TDI_VideoPlayOutIpad>();
            foreach (TDI_VideoPlayOut item in MngNegocioVideoPlayOut.GetVideosPlayout())
            {
                lstIpad.Add(new TDI_VideoPlayOutIpad(item));
            }
            return lstIpad;
        }

        #endregion  VideoPlayOut

        #region KeepAliveSession

        [WebMethod]
        public int KeepAliveSession(int RandomInt)
        {
            ValidateUser();
            Random rand = new Random();
            return rand.Next(-999999999, 999999999);
        }

        #endregion

        #region Foros

        [WebMethod]
        public List<THE_ForoEdicion> ConsultaForoXPrograma(int CveProg)
        {
            ValidateUser();
            return (List<THE_ForoEdicion>)MngNegocioForoEdicion.ConsultaForoXPrograma(CveProg);
        }

        [WebMethod]
        public List<THE_ForoEdicion> ConsultaForo(int TemaPadre)
        {
            ValidateUser();
            return (List<THE_ForoEdicion>)MngNegocioForoEdicion.ConsultaForo(TemaPadre);
        }

        [WebMethod]
        public bool GuardarForoEdicion(THE_ForoEdicion Guardar)
        { ValidateUser(); return MngNegocioForoEdicion.GuardarForoEdicion(Guardar); }

        #endregion

        #region Candados

        [WebMethod]
        public List<TDI_Candados> ObtenerCandadosAnual(DateTime FechaCierre)
        { ValidateUser(); return (List<TDI_Candados>)MngNegocioCandados.ObtenerCandadosAnual(FechaCierre); }

        [WebMethod]
        public List<TDI_Candados> ObtenerCandadosMensual(DateTime FechaCandado)
        { ValidateUser(); return (List<TDI_Candados>)MngNegocioCandados.ObtenerCandadosMensual(FechaCandado); }

        [WebMethod]
        public bool GuardarCandado(TDI_Candados Candado)
        { ValidateUser(); return MngNegocioCandados.GuardarCandados(Candado); }

        [WebMethod]
        public bool EliminarCandado(TDI_Candados Candado)
        { ValidateUser(); return MngNegocioCandados.BorrarCandados(Candado); }

        [WebMethod]
        public List<TDI_Candados> ObtenerCandadoMaximo()
        { ValidateUser(); return (List<TDI_Candados>)MngNegocioCandados.ObtenerMaximoCandado(); }

        #endregion

        #region Bloqueo de Video
        [WebMethod]
        public bool GuardarBloqueoVideo(THE_BloqueoVideo oBloqueoVideo)
        {
            ValidateUser();
            return MngNegocioBloqueoVideo.GuardarBloqueoVideo(oBloqueoVideo);
        }

        [WebMethod]
        public THE_BloqueoVideo ObtenerBloqueoVideoByVdoIdFileName(string VdoIdFileName, int NumUsuario, string Producciones, int Seccion)
        {
            ValidateUser();
            return MngNegocioBloqueoVideo.ObtenerBloqueoVideoByVdoIdFileName(VdoIdFileName, NumUsuario, Producciones, Seccion);
        }

        [WebMethod]
        public List<DatosVideoBloqueado> ObtenerDatosVideosBloqueados(string condicion)
        {
            ValidateUser();
            return MngNegocioBloqueoVideo.ObtieneVideosBloqueados(condicion);
        }

        [WebMethod]
        public List<DatosVideoBloqueado> ObtenerDatosVideosBloqueadoUsuario(string Condicion, string UsuarioID)
        {
            ValidateUser();
            return MngNegocioBloqueoVideo.ObtenerVideosBloqueadosUsuario(Condicion, UsuarioID);
        }

        [WebMethod]
        public bool BorraBloqueoVideoByVdoIdFilename(string VdoIdFileName)
        {
            ValidateUser();
            return MngNegocioBloqueoVideo.BorraBloqueoVideoByIdFileName(VdoIdFileName);
        }

        [WebMethod]
        public bool BorraBloqueoVideosById(List<string> lstVideosId)
        {
            ValidateUser();
            return MngNegocioBloqueoVideo.BorraBloqueoVideosById(lstVideosId);
        }

        [WebMethod]
        public List<TDI_TipoBloqueoVideo> ObtieneTipoBloqueoVideo()
        {
            ValidateUser();
            return (List<TDI_TipoBloqueoVideo>)MngNegocioBloqueoVideo.ObtieneTipoBloqueoVideo();
        }
        [WebMethod]
        public List<THE_BloqueoVideo> ObtenerBloqueoVideo(String Condicion)
        {
            ValidateUser();
            return (List<THE_BloqueoVideo>)MngNegocioBloqueoVideo.ObtenerBloqueoVideo(Condicion);
        }
        #endregion

        #region Consulta Flexible
        [WebMethod]
        public List<ConsultaFlex> ConsultaFlexible(string OTRA_LLAV_PR, string SECC_LLAV_PR, string OTRA_TITU, string OTRA_FECINI, string OTRA_FECFIN)
        {
            return null;//MngNegocioConsulta.ConsultaFlexible(OTRA_LLAV_PR, SECC_LLAV_PR, OTRA_TITU, OTRA_FECINI, OTRA_FECFIN);
        }

        [WebMethod]
        public string ConsultaFlexiblehtml5(string OTRA_LLAV_PR, string SECC_LLAV_PR, string OTRA_TITU, string OTRA_FECINI, string OTRA_FECFIN, string LOCL_LLAV_PR)
        {
              
               string resultjson = "";
               ValidateUser();
               List<ConsultaFlex> dato = MngNegocioConsulta.ConsultaFlexiblehtml5(OTRA_LLAV_PR, SECC_LLAV_PR, OTRA_TITU, OTRA_FECINI, OTRA_FECFIN, LOCL_LLAV_PR);

               JavaScriptSerializer serializer = new JavaScriptSerializer();

               serializer.MaxJsonLength = 2147483647;
               resultjson = serializer.Serialize(dato);
               return resultjson;


        }

        #endregion

        #region Consultas Sudafrica

        [WebMethod]
        public List<THE_OTClipIpad> ObtieneOTClipKeyw(int CveOT, string IdFileName)
        {
            IList<THE_OTClip> aux;
            List<THE_OTClipIpad> resultado = new List<THE_OTClipIpad>();

            ValidateUser();
            aux = MngNegocioOTClip.ObtenerOTClipKeyw(CveOT, IdFileName);
            if (aux != null)
                foreach (THE_OTClip otClip in aux)
                    resultado.Add(new THE_OTClipIpad(otClip));
            return resultado;
        }

        [WebMethod]
        public List<RptArchivSudafrica> ObtenerArchivadoSudafrica(DateTime FechaInicial, DateTime FechaFinal, string ClipName, string TipoMat)
        {
            ValidateUser();
            return MngNegocioArchivSudafrica.ObtenerArchivadoSudafrica(FechaInicial, FechaFinal, ClipName, TipoMat).ToList<RptArchivSudafrica>();
        }

        [WebMethod]
        public List<RptArchivSudafrica> ObtenerArchivadoSudafricaFiltroTipoVid(DateTime FechaInicial, DateTime FechaFinal, string ClipName, string TipoMat, string TipoVideo, bool esClosedCaption)
        {
            ValidateUser();
            return MngNegocioArchivSudafrica.ObtenerArchivadoSudafrica(FechaInicial, FechaFinal, ClipName, TipoMat, TipoVideo, esClosedCaption).ToList<RptArchivSudafrica>();
        }

        [WebMethod]
        public string ObtenerArchivadoSudafricaFiltroTipoVidHtml5(DateTime FechaInicial, DateTime FechaFinal, string ClipName, string TipoMat, string TipoVideo, bool esClosedCaption)
        {
            string resultjson = "";
            ValidateUser();
            List<RptArchivSudafrica> dato = MngNegocioArchivSudafrica.ObtenerArchivadoSudafricaHtml5(FechaInicial, FechaFinal, ClipName, TipoMat, TipoVideo, esClosedCaption).ToList<RptArchivSudafrica>();

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }
        [WebMethod]
        public string ObtenerRptImplementacion(int local_LLav_pr, string queryString, string ini_fin, string semana)
        {
            string resultjson = "";
            ValidateUser();
            IList<RptImplementacion> dato = MngNegocioRptImplementacion.ObtenerRptImplementacion(local_LLav_pr, queryString, ini_fin, semana);
            JavaScriptSerializer serializer = new JavaScriptSerializer();

            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
    
        }

        [WebMethod]
        public List<RptAsignacionEqNotas> obtenerRptAsignacionNotas(int local, DateTime fechaInicio, DateTime fechaFin)
        {
           // string resultjson = "";
            ValidateUser();
            IList<RptAsignacionEqNotas> dato = MngNegocioRptImplementacion.obtenerRptAsignacionNotas(local, fechaInicio, fechaFin);
            return dato.ToList();
           // JavaScriptSerializer serializer = new JavaScriptSerializer();

            //serializer.MaxJsonLength = 2147483647;
            //resultjson = serializer.Serialize(dato);
            //return resultjson;

        }
        #endregion

        #region Datos para reporte Acumulado

        [WebMethod]
        public bool DatosReporteAcumuladoExport(string Titulo, string Datos)
        {
            ValidateUser();
            HttpContext.Current.Session["TITULORPT"] = Titulo;
            HttpContext.Current.Session["DATOSRPT"] = Datos;

            return true;
        }

        #endregion

        #region Administracion de Producciones

        [WebMethod]
        public List<TDI_EMPL> ObtenerEmpleadosActivos()
        {
            IList<TDI_EMPL> resultado;
            ValidateUser();
            resultado = MngNegocioAdmonProd.ObtenerEmpleadosActivos();

            return resultado == null ? null : resultado.ToList<TDI_EMPL>();
        }

        [WebMethod]
        public List<TDI_ProgramaEmpleado> ObtenerEmpleadosProgramaObj(TDI_EMPL Empleado)
        {
            IList<TDI_ProgramaEmpleado> resultado;
            ValidateUser();
            resultado = MngNegocioAdmonProd.ObtenerEmpleadoPrograma(Empleado);

            return resultado == null ? null : resultado.ToList<TDI_ProgramaEmpleado>();
        }

        [WebMethod]
        public List<TDI_ProgramaEmpleado> ObtenerEmpleadosProgramaCond(string NombreEmpl, string UsuaRED, string NumEmpl)
        {
            IList<TDI_ProgramaEmpleado> resultado;
            ValidateUser();
            resultado = MngNegocioAdmonProd.ObtenerEmpleadoPrograma(NombreEmpl, UsuaRED, NumEmpl);
            return resultado == null ? null : resultado.ToList<TDI_ProgramaEmpleado>();
        }

        [WebMethod]
        public bool AgregarProduccionEmpleado(TDI_ProgramaEmpleado Agregar)
        {
            ValidateUser();
            return MngNegocioAdmonProd.AgregarProduccionEmpleado(Agregar);
        }

        [WebMethod]
        public bool EliminarProduccionEmpleado(TDI_ProgramaEmpleado Eliminar)
        {
            ValidateUser();
            return MngNegocioAdmonProd.EliminarProduccionEmpleado(Eliminar);
        }



        #endregion

        #region video recientes

        [WebMethod]
        public List<THE_VideosRecientesIpad> ObtenerVideosRecientes(int Hora, string query)
        {
            IList<THE_VideosRecientes> aux;
            List<THE_VideosRecientesIpad> resultado = new List<THE_VideosRecientesIpad>();
            ValidateUser();
            aux = MngNegocioVideosRecientes.GetVideosRecientes(Hora, query);
            if (aux != null)
                foreach (THE_VideosRecientes video in aux)
                    resultado.Add(new THE_VideosRecientesIpad(video));

            return resultado;
        }

        #endregion

        #region Funciones Carrusel

        [WebMethod]
        public bool GuardaCarruselEmpleado(int NumEmpleado, string Carrusel)
        {
            ValidateUser();
            return MngNegocioCoem.GuardaCarruselEmpleado(NumEmpleado, Carrusel);
        }

        [WebMethod]
        public bool GuardaCarruselShowEmpleado(int NumEmpleado, string CarruselShow)
        {
            ValidateUser();
            return MngNegocioCoem.GuardaCarruselShowEmpleado(NumEmpleado, CarruselShow);
        }

        #endregion

        #region Monitoreo Rhozet

        [WebMethod]
        public List<THE_MonitoreoRhozet> ConsultaMonitoreoRhozet()
        {
            ValidateUser();
            IList<THE_MonitoreoRhozet> resultado;
            resultado = MngNegocioMonitoreoRhozet.GetMonitoreoRhozet();
            return resultado == null ? null : resultado.ToList<THE_MonitoreoRhozet>();
        }

        #endregion Monitoreo Rhozet

        #region Autorizador Notas

        [WebMethod]
        public bool ActualizarStatusMonitoreoRhozet(THE_InternetNotasIpad InternetNotas, bool ReprLastStat)
        {
            ValidateUser();
            IList<THE_VideosRecientes> videosRec = null;
            IList<THE_VideosRecientesIpad> lstVidRec = this.ObtenerVideosRecientes(48, InternetNotas.OTRA_LLAVE_PR.ToString());
            if (lstVidRec != null)
            {
                videosRec = new List<THE_VideosRecientes>();
                foreach (THE_VideosRecientesIpad video in lstVidRec)
                    videosRec.Add(video.getTHE_VideosRecientes());
            }

            IList<TDI_Fmtovideo> lstFmto = this.ObtenerFmtovideo();
            TDI_EMPL Empl = this.ObtenerEmpleadoFiltros(string.Empty, string.Empty, InternetNotas.EMPL_LLAV_PR.ToString());
            IList<TDI_Internetkeywords> lstIntKeyWrd = this.ObtenerInternetkeywordPorNota(InternetNotas.NOTAS_LLAV_PR.ToString());

            return MngNegocioInternetNotas.ActualizarStatusMonitoreoRhozet(InternetNotas.get(), lstIntKeyWrd, videosRec, lstFmto, Empl, ReprLastStat);
        }

        [WebMethod]
        public int GuardaInternetNotas(THE_InternetNotasIpad InternetNotas, List<TDI_Internetkeywords> lstInternetkeywords, List<THE_InternetRedxNota> lstredesxnota)
        {
            ValidateUser();
            return MngNegocioInternetNotas.GuardarInternetNotas(InternetNotas.get(), lstInternetkeywords, lstredesxnota);
        }

        [WebMethod]
        public List<THE_InternetNotasIpad> ObtenerInternetNotas(string where)
        {
            IList<THE_InternetNotas> aux;
            List<THE_InternetNotasIpad> resultado = new List<THE_InternetNotasIpad>();
            ValidateUser();
            aux = MngNegocioInternetNotas.ObtenerInternetNotas(where);
            if (aux != null)
                foreach (THE_InternetNotas intNotas in aux)
                    resultado.Add(new THE_InternetNotasIpad(intNotas));

            return resultado;
        }

        [WebMethod]
        public List<TDI_Internetkeywords> ObtenerInternetkeywords()
        {
            IList<TDI_Internetkeywords> resultado;
            ValidateUser();
            resultado = MngNegocioInternetkeywords.ObtenerInternetkeywords();
            return resultado == null ? null : resultado.ToList<TDI_Internetkeywords>();
        }

        protected TDI_EMPL ObtenerEmpleadoFiltros(string Nombre, string UsuaRed, string NumEmpl)
        { return MngNegocioAdmonProd.ObtenerEmpleadoFiltros(Nombre, UsuaRed, NumEmpl); }

        [WebMethod]
        public List<TDI_Internetkeywords> ObtenerInternetkeywordsporpalabra(string keyword, string seccion)
        {
            IList<TDI_Internetkeywords> resultado;
            ValidateUser();
            resultado = MngNegocioInternetkeywords.ObtenerInternetkeywords(keyword, seccion);
            return resultado == null ? null : resultado.ToList<TDI_Internetkeywords>();
        }

        [WebMethod]
        public int GuardaInternetkeywords(TDI_Internetkeywords Internetkeywords)
        {
            ValidateUser();
            return MngNegocioInternetkeywords.GuardarInternetkeywords(Internetkeywords);
        }

        [WebMethod]
        public List<THE_InternetkeywordnotaIpad> ObtenerInternetkeywordsnota(string notas_llav_pr)
        {
            IList<THE_Internetkeywordnota> aux;
            List<THE_InternetkeywordnotaIpad> resultado = new List<THE_InternetkeywordnotaIpad>();
            ValidateUser();
            aux = MngNegocioInternetkeywordnota.ObtenerInternetkeywordnota(notas_llav_pr);
            if (aux != null)
                foreach (THE_Internetkeywordnota intKey in aux)
                    resultado.Add(new THE_InternetkeywordnotaIpad(intKey));

            return resultado;
        }

        [WebMethod]
        public List<TDI_Internetkeywords> ObtenerInternetkeywordPorNota(string notas_llav_pr)
        {
            IList<TDI_Internetkeywords> resultado;
            ValidateUser();
            resultado = MngNegocioInternetkeywordnota.ObtenerKeyWordsPorNota(notas_llav_pr);
            return resultado == null ? null : resultado.ToList<TDI_Internetkeywords>();
        }

        [WebMethod]
        public int GuardaInternetkeywordnota(List<THE_InternetkeywordnotaIpad> Internetkeywordnota)
        {
            List<THE_Internetkeywordnota> aux = null;
            ValidateUser();
            if (Internetkeywordnota != null)
            {
                aux = new List<THE_Internetkeywordnota>();
                foreach (THE_InternetkeywordnotaIpad ipad in Internetkeywordnota)
                    aux.Add(ipad.get());
            }
            return MngNegocioInternetkeywordnota.GuardarInternetkeywordnota(aux);
        }

        [WebMethod]
        public List<TDI_Fmtovideo> ObtenerFmtovideo()
        {
            IList<TDI_Fmtovideo> resultado;
            ValidateUser();
            resultado = MngNegocioFmtovideo.ObtenerFmtovideo();

            return resultado == null ? null : resultado.ToList<TDI_Fmtovideo>();
        }

        [WebMethod]
        public int InsertaVideoHistorico(string VDO_IDFILENANE)
        {
            ValidateUser();
            return MngNegocioVideosRecientes.InsertaHistorico(VDO_IDFILENANE);
        }

        #endregion

        #region PeticionInternet

        [WebMethod]
        public List<PeticionInternet.My_Models_CatAutores> obtenMy_Models_CatAutores()
        {
            ValidateUser();
            try
            {
                PeticionInternet PI = new PeticionInternet();
                return PI.obtenMy_Models_CatAutores();
            }
            catch (Exception ex)
            {
                THE_LogErrores oLog = new THE_LogErrores();
                TDI_EMPL oEmpl = new TDI_EMPL();
                oEmpl.EmpleadoLlavePrimaria = 408800;
                oLog.CveEmpleado = oEmpl;
                oLog.Pantalla = "VideosRecientes";
                oLog.Error = "Message: " + ex.Message + " Stacktrace: " + ex.StackTrace;
                MngNegocioLogErrores.GuardarLogErrores(oLog);
                return null;
            }

        }

        [WebMethod]
        public List<PeticionInternet.My_Models_Categorias> obtenMy_Models_Categorias()
        {
            ValidateUser();
            try
            {
                PeticionInternet PI = new PeticionInternet();
                return PI.obtenMy_Models_Categorias();
            }
            catch (Exception ex)
            {
                THE_LogErrores oLog = new THE_LogErrores();
                TDI_EMPL oEmpl = new TDI_EMPL();
                oEmpl.EmpleadoLlavePrimaria = 408800;
                oLog.CveEmpleado = oEmpl;
                oLog.Pantalla = "VideosRecientes";
                oLog.Error = "Message: " + ex.Message + " Stacktrace: " + ex.StackTrace;
                MngNegocioLogErrores.GuardarLogErrores(oLog);
                return null;
            }

        }
        [WebMethod]
        public List<PeticionInternet.My_Models_CatKeywords> obtenMy_Models_CatKeywords()
        {
            ValidateUser();
            try
            {
                PeticionInternet PI = new PeticionInternet();
                return PI.obtenMy_Models_CatKeywords();
            }
            catch (Exception ex)
            {
                THE_LogErrores oLog = new THE_LogErrores();
                TDI_EMPL oEmpl = new TDI_EMPL();
                oEmpl.EmpleadoLlavePrimaria = 408800;
                oLog.CveEmpleado = oEmpl;
                oLog.FechaCreacion = DateTime.Now;
                oLog.Pantalla = "VideosRecientes";
                oLog.Error = "Message: " + ex.Message + " Stacktrace: " + ex.StackTrace;
                MngNegocioLogErrores.GuardarLogErrores(oLog);
                return null;
            }
        }
        [WebMethod]
        public List<PeticionInternet.My_Models_Programas> obtenMy_Models_Programas()
        {
            ValidateUser();
            try
            {
                PeticionInternet PI = new PeticionInternet();
                return PI.obtenMy_Models_Programas();
            }
            catch (Exception ex)
            {
                THE_LogErrores oLog = new THE_LogErrores();
                TDI_EMPL oEmpl = new TDI_EMPL();
                oEmpl.EmpleadoLlavePrimaria = 408800;
                oLog.CveEmpleado = oEmpl;
                oLog.FechaCreacion = DateTime.Now;
                oLog.Pantalla = "VideosRecientes";
                oLog.Error = "Message: " + ex.Message + " Stacktrace: " + ex.StackTrace;
                MngNegocioLogErrores.GuardarLogErrores(oLog);
                return null;
            }
        }
        [WebMethod]
        public int guardaMyModels_CatKeywords(PeticionInternet.My_Models_CatKeywords catkeywords)
        {
            ValidateUser();
            return PeticionInternet.guardaMyModels_CatKeywords(catkeywords);
        }
        #endregion

        #region zoom video
        [WebMethod]
        public bool ActualizaBanneo(string vdoIdFN, int ban)
        {
            ValidateUser();
            return MngNegocioVideo.ActualizaBanneo(vdoIdFN, ban);
        }
        #endregion

        #region Actores
        [WebMethod]
        public List<ActorConnections> ObtenerActores()
        {
            IList<ActorConnections> resultado;
            ValidateUser();
            resultado = MngNegocioActores.ObtenerActores();

            return resultado == null ? null : resultado.ToList<ActorConnections>();

        }
        [WebMethod]
        public bool ActualizarActores(ActorConnections Actor)
        {
            ValidateUser();
            return MngNegocioActores.ActualizarActores(Actor);

        }
        #endregion

        #region Realizadores

        [WebMethod]
        public string ObtenerSinRealizador(string Fecha, int programa)
        {
            string resultjson = "";
            IList<THE_EQAI> aux;
            List<THE_EQAIIpad> resultado = null;
            ValidateUser();
            aux = MngNegocioSinRealizador.GetListSearchSinRealizador(Fecha, programa);
            if (aux != null)
            {
                resultado = new List<THE_EQAIIpad>();
                foreach (THE_EQAI valor in aux)
                    resultado.Add(new THE_EQAIIpad(valor));
            }

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(resultado);
            return resultjson;
        }

        #endregion


        #region Admin Produccion

        [WebMethod]

        public int InsertaProduccion(string nombre, string abr, string abr2)
        {
            ValidateUser();

            return TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.InsertaProduccion(nombre, abr, abr2);

        }

        [WebMethod]
        public List<TDI_Programa> ObtenerProgramaAbreviatura(string abreviatura)
        {
            ValidateUser();

            return (List<TDI_Programa>)TvAzteca.FiaTube.Bll_FIATube.Catalogos.MngNegocioPrograma.ObtenerProgramaAbreviatura(abreviatura);

        }

        #endregion

        #region TypeMail
        [WebMethod]
        public List<Tmu_Type_Mail_User> ObtenerConsultaUsuarios(int Id)
        {
            ValidateUser();
            return (List<Tmu_Type_Mail_User>)MngNegocioTypeMailUser.ConsultaUsuario(Id);
        }

        [WebMethod]
        public List<Tmu_Type_Mail_User> ObtenerTypeMailUsers()
        {
            ValidateUser();
            return (List<Tmu_Type_Mail_User>)MngNegocioTypeMailUser.ObtenerTypeMail();
        }
        [WebMethod]
        public bool Guardar(string Nombre, string Mail, string Celular)
        {
            ValidateUser();
            return MngNegocioTypeMailUser.GuardaUsuarioTypeaMail(Nombre, Mail, Celular);
        }
        [WebMethod]
        public Boolean GuardarTypeMailUsuario(Tmu_Type_Mail_User TmuUsuario)
        {
            ValidateUser();
            return MngNegocioTypeMailUser.Guardar(TmuUsuario);
        }
        [WebMethod]
        public Boolean BorrarTypeMailUsuario(Tmu_Type_Mail_User TmuUsuario)
        {
            ValidateUser();
            return MngNegocioTypeMailUser.Borrar(TmuUsuario);
        }
        [WebMethod]
        public List<Tym_Type_Mail> ObtenerTypeMail()
        {
            ValidateUser();
            return MngNegocioTypeMail.ObtenerTypeMail().ToList<Tym_Type_Mail>();

        }
        [WebMethod]
        public Boolean ActualizarTypeMail(Tym_Type_Mail TypeMail)
        {
            ValidateUser();
            return MngNegocioTypeMail.ActualizarTypeMail(TypeMail);

        }
        #endregion

        #region OpcionesBusqueda

        [WebMethod]
        public List<OpcionesBusqueda> ConsultaOpcionesBusqueda(int status)
        {
            ValidateUser();
            return MngNegocioOpcionesBusqueda.ConsultaOpcionesBusqueda(status);
        }
        [WebMethod]
        public Boolean ActualizaOpcionBusqueda(int status, string usuario)
        {
            ValidateUser();
            return MngNegocioOpcionesBusqueda.ActualizaOpcionBusqueda(status, usuario);
        }
        [WebMethod]
        public bool GuardarOpcionesBusquedaCoem(int NumeroEmpleado, int VTK, int Planeacion, int Guion)
        {
            ValidateUser();
            return MngNegocioCoem.GuardarOpcionesBusqueda(NumeroEmpleado, VTK, Planeacion, Guion);
        }

        #endregion OpcionesBusqueda

        #region aviso
        [WebMethod]

        public List<TDI_Aviso> ObtenerAviso()
        {
            ValidateUser();
            return (List<TDI_Aviso>)MngNegacioAviso.ObtenerAvisoPorId(0);
        }

        [WebMethod]
        public bool GuardarAviso(int NumEmpleado, int aviso)
        {
            ValidateUser();
            return MngNegocioCoem.GuardarAviso(NumEmpleado, aviso);
        }
        [WebMethod]
        public bool GuardarAvisos(string contenido)
        {
            ValidateUser();
            return MngNegacioAviso.GuardarAvisos(contenido);
        }

        #endregion aviso

        #region Funciones para Manejo de Errores

        [WebMethod]
        public List<TDI_CatErrores> ObtenerCatErrores()
        {
            ValidateUser();
            return (List<TDI_CatErrores>)MngNegocioCatError.ObtenerCatErrores();
        }

        [WebMethod]
        public bool GuardarError(TDI_Errores DatosErrores)
        {
            ValidateUser();
            return MngNegocioErrores.GuardarError(DatosErrores);
        }

        #endregion

        #region EspacioMediaGrid
        [WebMethod]
        public List<Admin_Secn_Tdi_Secc> ConsultaSeccionesProgramas()
        {
            ValidateUser();
            return (List<Admin_Secn_Tdi_Secc>)MngNegocioEspacioMediaGrid.ObtenerEspacioMediaGrid();
        }
        [WebMethod]
        public bool ActualizarSeccion(Admin_Secn_Tdi_Secc AdminseccProg)
        {
            ValidateUser();
            return MngNegocioEspacioMediaGrid.ActualizarSeccion(AdminseccProg);
        }
        [WebMethod]
        public bool ActualizarPrograma(Admin_Secn_Tdi_Secc AdminseccProg)
        {
            ValidateUser();
            return MngNegocioEspacioMediaGrid.ActualizarPrograma(AdminseccProg);
        }

        #endregion

        [WebMethod]
        public DatosPantallaVisualizacionError ObtenerDatosVisualizacionErrores()
        {
            ValidateUser();
            return MngNegocioErrores.ObtenerDatos();
        }

        [WebMethod]
        public List<TDI_Errores> filtrarDatos(DateTime? FechaIni, DateTime? FechaFinal, int empleado, int tipo)
        {
            ValidateUser();
            return (List<TDI_Errores>)MngNegocioErrores.filtrarDatos(FechaIni, FechaFinal, empleado, tipo);
        }

        #region Monitoreo Video Recuperacion
        [WebMethod]
        public List<Monitoreo_VideoRecuperacion> ObtenerMonitoreoRecuperaciones(DateTime FechaIni, DateTime FechaFin)
        {
            ValidateUser();
            return (List<Monitoreo_VideoRecuperacion>)MngNegocioMonitoreoVideoRecuperacion.ObtenerValidacionRecuperaciones(FechaIni, FechaIni);
        }
        [WebMethod]
        public List<Monitoreo_VideoRecuperacion> ObtenerRecuperaciones()
        {
            ValidateUser();
            return (List<Monitoreo_VideoRecuperacion>)MngNegocioMonitoreoVideoRecuperacion.ObtenerRecupercaion();
        }
        [WebMethod]
        public List<Monitoreo_VideoRecuperacion> ObtenerFechasRecuperacion(DateTime FechaIni, DateTime FechaFin)
        {
            ValidateUser();
            return (List<Monitoreo_VideoRecuperacion>)MngNegocioMonitoreoVideoRecuperacion.Obtenerfecha(FechaIni, FechaFin);
        }
        #endregion

        #region Métodos de control de acceso

        [WebMethod]
        public List<ControlAcceso> ObtenerAcceso(string ip, string desc, int sts)
        {
            ValidateUser();
            if (ip != "" && desc != "" && sts != -1)
            {

            }
            if (desc == "" && sts == -1)
            {
                return (List<ControlAcceso>)MngNegocioControlAcceso.ObtenerStatusPorIP(ip);
            }
            else if (sts != -1)
            {
                return (List<ControlAcceso>)MngNegocioControlAcceso.ObtenerPorStatus(sts);
            }
            else
            {
                return (List<ControlAcceso>)MngNegocioControlAcceso.ObtenerStatusPorDescripcion(desc);
            }
        }

        [WebMethod]
        public List<ControlAcceso> ObtenerTodosAccesos()
        {
            ValidateUser();
            return (List<ControlAcceso>)MngNegocioControlAcceso.ObtenerTodosAccesos();
        }

        [WebMethod]
        public Boolean ActualizarAcceso(ControlAcceso CAcceso)
        {
            ValidateUser();
            return MngNegocioControlAcceso.ActualizarAcceso(CAcceso);
        }

        [WebMethod]
        public Boolean GuardarAcceso(ControlAcceso CAcceso)
        {
            ValidateUser();
            return MngNegocioControlAcceso.GuardarAcceso(CAcceso);
        }

        [WebMethod]
        public Boolean BorrarAcceso(ControlAcceso CAcceso)
        {
            ValidateUser();
            return MngNegocioControlAcceso.BorrarAcceso(CAcceso);
        }

        #endregion

        #region Monto Empleados

        [WebMethod]
        public List<THE_MontosEmpleados> LstGuardarMontosEmpleados(List<THE_MontosEmpleados> MontosEmpleados)
        {
            ValidateUser();
            return (List<THE_MontosEmpleados>)MngNegocioMontosEmpleados.GuardarMontosEmpleados(MontosEmpleados);
        }

        [WebMethod]
        public Boolean LstActualizarMontosEmpleados(List<THE_MontosEmpleados> MontosEmpleados)
        {
            ValidateUser();
            return MngNegocioMontosEmpleados.ActualizarMontosEmpleados(MontosEmpleados);
        }

        [WebMethod]
        public Boolean GuardarMontosEmpleados(THE_MontosEmpleados MontosEmpleados)
        {
            ValidateUser();
            return MngNegocioMontosEmpleados.GuardarMontosEmpleados(MontosEmpleados);
        }

        [WebMethod]
        public Boolean ActualizarMontosEmpleados(THE_MontosEmpleados MontosEmpleados)
        {
            ValidateUser();
            return MngNegocioMontosEmpleados.ActualizarMontosEmpleados(MontosEmpleados);
        }

        [WebMethod]
        public Boolean BorrarMontosEmpleados(THE_MontosEmpleados MontosEmpleados)
        {
            ValidateUser();
            return MngNegocioMontosEmpleados.BorrarMontosEmpleados(MontosEmpleados);
        }

        //[WebMethod]
        //public List<THE_CandadoMontos> ObtenerCandadoMontos(DateTime FechaConsulta, TDI_Seccion Seccion, TDI_Puestos Puestos)
        //{
        //    ValidateUser();
        //    return (List<THE_CandadoMontos>)MngNegocioCandadoMontos.ObtenerCandadoMontos(FechaConsulta, Seccion, Puestos);
        //}

        [WebMethod]
        public Boolean GuardarCandadoMontos(THE_CandadoMontos CandadoMontos)
        {
            ValidateUser();
            return MngNegocioCandadoMontos.GuardarCandadoMontos(CandadoMontos);
        }

        [WebMethod]
        public List<THE_CandadoMontos> GuardarLstCandadoMontos(List<THE_CandadoMontos> CandadoMontos)
        {
            ValidateUser();
            return (List<THE_CandadoMontos>)MngNegocioCandadoMontos.GuardarCandadoMontos(CandadoMontos);
        }

        #endregion

        #region Actualizacion Tipo Reproduccion de Videos

        [WebMethod]
        public bool ActualizaReproduccionStream(int NumEmpleado, string NuevoStatus)
        {
            ValidateUser();
            return MngNegocioCoem.ActualizaReproduccionStream(NumEmpleado, NuevoStatus);
        }

        #endregion

        #region Datos para  orden ingestion

        [WebMethod]
        public bool DatosOrdenIngestionExport(string Titulo, string Datos)
        {
            ValidateUser();
            HttpContext.Current.Session["TITULOORDING"] = Titulo;
            HttpContext.Current.Session["DATOSORDING"] = Datos;

            return true;
        }

        #endregion

        #region NotasAztecaNoticias

        [WebMethod]
        public List<THE_NotasAN> ObtenerNotasPendientesAztecaNoticias(DateTime Fecha)
        {
            ValidateUser();
            List<THE_NotasAN> lstNotas = MngNegocioNotasAN.ObtenerNotasPendientesPorEvaluar(Fecha);
            return lstNotas;
        }

        [WebMethod]
        public bool CancelarNotaAztecaNoticias(int IdNota)
        {
            ValidateUser();
            bool blnBand = true;
            blnBand = MngNegocioNotasAN.CancelarNotaAztecaNoticias(IdNota);

            return blnBand;
        }

        [WebMethod]
        public List<THE_NotasAN> ObtenerNotasEvaluadasAztecaNoticias(DateTime Fecha)
        {
            ValidateUser();
            List<THE_NotasAN> lstNotas = MngNegocioNotasAN.ObtenerNotasEvaluadasAztecaNoticias(Fecha);
            return lstNotas;
        }

        [WebMethod]
        public bool InsertarEvaluacion(int IDLlavePR, List<int> Puestos, int IDPonderacion)
        {
            ValidateUser();
            return MngNegocioNotasAN.InsertarEvaluacion(IDLlavePR, Puestos, IDPonderacion);
        }

        [WebMethod]
        public bool ActualizaEvaluacion(int IDLlavePR, int IDPonderacion)
        {
            ValidateUser();
            return MngNegocioNotasAN.ActualizaEvaluacion(IDLlavePR, IDPonderacion);
        }

        [WebMethod]
        public bool ActualizaEvaluacionPuestos(List<int> Puestos, int IDLlavePR, int IDPonderacion)
        {
            ValidateUser();
            return MngNegocioNotasAN.ActualizaEvaluacionPuesto(Puestos, IDLlavePR, IDPonderacion);
        }

        [WebMethod]
        public bool InsertarEvaluador(int IDEmpleado, int IDLlavePR)
        {
            ValidateUser();
            return MngNegocioNotasAN.InsertarEvaluador(IDEmpleado, IDLlavePR);
        }

        [WebMethod]
        public bool ActualizaEvaluador(int IDEmpleado, int IDLlavePR)
        {
            ValidateUser();
            return MngNegocioNotasAN.ActualizaEvaluador(IDEmpleado, IDLlavePR);
        }

        [WebMethod]
        public string ObtenerComentarioAztecaNoticias(int IDLlavePR)
        {
            ValidateUser();
            return MngNegocioNotasAN.ObtenerComentario(IDLlavePR);
        }

        [WebMethod]
        public bool ActualizarComentarioAztecaNoticias(int IDLlavePR, string strComentario)
        {
            ValidateUser();
            return MngNegocioNotasAN.ActualizaComentario(IDLlavePR, strComentario);
        }

        #endregion

        #region Diccionario
        /// <summary>
        /// Obtiene los datos de inicio para mostrar en pantalla
        /// </summary>
        /// <returns>Lista sinonimos contenidos en un array de string's</returns>
        [WebMethod]
        public List<string[]> ObtenerDatosDiccionario()
        {
            ValidateUser();
            DictionaryHelper Dicc = new DictionaryHelper();

            List<string[]> Sinonimos = Dicc.TraerEntradas(string.Empty, 0, 0);
            return Sinonimos;
        }

        /// <summary>
        /// Agrega o Actualiza una entrada del diccionario
        /// </summary>
        /// <param name="llave">Campo clave</param>
        /// <param name="valoresOne">Sinonimos en una dirección</param>
        /// <param name="valoresTwo">Sinonimos en ambas direcciones</param>
        /// <returns>Lista sinonimos contenidos en un array de string's</returns>
        [WebMethod]
        public List<string[]> AgregaEntradaDiccionario(string llave, string[] valoresOne, string[] valoresTwo, string filtro)
        {
            ValidateUser();
            DictionaryHelper Dicc = new DictionaryHelper();
            Dicc.AgregaEntrada(llave, valoresOne, valoresTwo);

            List<string[]> Sinonimos = Dicc.TraerEntradas(filtro, 0, 0);
            return Sinonimos;
        }

        /// <summary>
        /// Borra una o varias entradas del diccionario
        /// </summary>
        /// <param name="llaves">Entradas a borrar</param>
        /// <returns>Lista sinonimos contenidos en un array de string's</returns>
        [WebMethod]
        public List<string[]> BorrarEntrada(string[] llaves, string filtro)
        {
            ValidateUser();
            DictionaryHelper Dicc = new DictionaryHelper();
            Dicc.BorrarEntrada(llaves);

            List<string[]> Sinonimos = Dicc.TraerEntradas(filtro, 0, 0);
            return Sinonimos;
        }

        [WebMethod]
        public List<string[]> AccionNext(string filtro)
        {
            DictionaryHelper Dicc = new DictionaryHelper();

            int offset = 0;
            try
            {
                int oldOffset = (int)HttpContext.Current.Session["Offset"];
                offset = oldOffset + Int32.Parse(ConfigurationManager.AppSettings["Hits"]);
            }
            catch (Exception) { offset = 0; }
            ValidateUser();
            List<string[]> Sinonimos = Dicc.TraerEntradas(filtro, offset, 0);
            return Sinonimos;
        }

        [WebMethod]
        public List<string[]> AccionPreview(string filtro)
        {
            DictionaryHelper Dicc = new DictionaryHelper();

            int offset = 0;
            try
            {
                int oldOffset = (int)HttpContext.Current.Session["Offset"];
                if (oldOffset > Int32.Parse(ConfigurationManager.AppSettings["Hits"]))
                    offset = oldOffset - Int32.Parse(ConfigurationManager.AppSettings["Hits"]);
            }
            catch (Exception) { offset = 0; }
            ValidateUser();
            List<string[]> Sinonimos = Dicc.TraerEntradas(filtro, offset, 0);
            return Sinonimos;
        }

        [WebMethod]
        public List<string[]> FiltrarEntradas(string filtro)
        {
            ValidateUser();
            DictionaryHelper Dicc = new DictionaryHelper();
            List<string[]> Sinonimos = Dicc.TraerEntradas(filtro, 0, 0);
            return Sinonimos;
        }

        [WebMethod]
        public bool PublicarEntradas()
        {
            ValidateUser();
            DictionaryHelper Dicc = new DictionaryHelper();
            Dicc.Publicar();
            return true;
        }

        #endregion

        #region Eventos Deportivos

        /// <summary>
        /// Metodo que retorna la fecha actual en el servidor para mostrar los dias del mes
        /// </summary>
        /// <returns></returns>
        [WebMethod]
        public DateTime ObtenerMesActual()
        {
            return DateTime.Now;
        }

        /// <summary>
        /// Obtiene todos los Eventos Deportivos Agendados en el rango de tiempo especificado
        /// </summary>
        /// <param name="sMes">Mes en formato "mm"</param>
        /// <param name="sAno">Año en formato "yyyy"</param>
        /// <returns>Listado de EVDT</returns>
        [WebMethod]
        public List<THE_EventoDeportivoIpad> ObtenerDatosMes(string sMes, string sAno)
        {
            ValidateUser();
            List<THE_EventoDeportivoIpad> lstIpad = new List<THE_EventoDeportivoIpad>();

            if (sMes == null || sMes.Length == 0)
            {
                foreach (THE_EventoDeportivo item in MngNegocioEventosDeportivos.ObtenerDatosMes(DateTime.Now.Month.ToString(), DateTime.Now.Year.ToString()))
                {
                    lstIpad.Add(new THE_EventoDeportivoIpad(item));
                }
            }
            else
            {
                foreach (THE_EventoDeportivo item in MngNegocioEventosDeportivos.ObtenerDatosMes(sMes, sAno))
                {
                    lstIpad.Add(new THE_EventoDeportivoIpad(item));
                }
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_EventoDeportivoIpad> CrearFechaMes(THE_EventoDeportivoIpad EVDT)
        {
            ValidateUser();
            List<THE_EventoDeportivoIpad> lstIpad = new List<THE_EventoDeportivoIpad>();
            foreach (THE_EventoDeportivo item in MngNegocioEventosDeportivos.CrearFechaMes(EVDT.get()))
            {
                lstIpad.Add(new THE_EventoDeportivoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_EventoDeportivoIpad> EditarFechaMes(THE_EventoDeportivoIpad EVDT, DateTime dtMesVisual)
        {
            ValidateUser();
            List<THE_EventoDeportivoIpad> lstIpad = new List<THE_EventoDeportivoIpad>();
            foreach (THE_EventoDeportivo item in MngNegocioEventosDeportivos.EditarFechaMes(EVDT.get(), dtMesVisual))
            {
                lstIpad.Add(new THE_EventoDeportivoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_EventoDeportivoIpad> EliminarFechaMes(THE_EventoDeportivoIpad EVDT, DateTime dtMesVisual)
        {
            ValidateUser();
            List<THE_EventoDeportivoIpad> lstIpad = new List<THE_EventoDeportivoIpad>();
            foreach (THE_EventoDeportivo item in MngNegocioEventosDeportivos.EliminarFechaMes(EVDT.get(), dtMesVisual))
            {
                lstIpad.Add(new THE_EventoDeportivoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public THE_EventoDeportivoIpad ObtenerEventoxID(int idEvento)
        {
            ValidateUser();
            return new THE_EventoDeportivoIpad(MngNegocioEventosDeportivos.ObtenerEventoxID(idEvento));
        }

        [WebMethod]
        public bool AsociarOT(int idEvento, string cveOT, string cveOrigen)
        {
            ValidateUser();
            return MngNegocioEventosDeportivos.AsociarOT(idEvento, cveOT, cveOrigen);
        }

        [WebMethod]
        public bool DesasociarOT(int idEvento, string cveOT)
        {
            ValidateUser();
            return MngNegocioEventosDeportivos.DesasociarOT(idEvento, cveOT);
        }

        [WebMethod]
        public bool CancelarOT(int idEvento, string cveOT)
        {
            ValidateUser();
            return MngNegocioEventosDeportivos.CancelarOT(idEvento, cveOT);
        }

        #region Observaciones

        [WebMethod]
        public List<THE_Observaciones_EVDTIpad> CrearObservacion(THE_Observaciones_EVDTIpad OBEV)
        {
            ValidateUser();
            List<THE_Observaciones_EVDTIpad> lstIpad = new List<THE_Observaciones_EVDTIpad>();
            foreach (THE_Observaciones_EVDT item in MngNegocioObservaciones_EVDT.CrearObservacion(OBEV.get()))
            {
                lstIpad.Add(new THE_Observaciones_EVDTIpad(item));
            }
            OBEV.dtFechaOB = DateTime.Now;
            return lstIpad;
        }

        [WebMethod]
        public List<THE_Observaciones_EVDTIpad> ModificarObservacion(THE_Observaciones_EVDTIpad OBEV)
        {
            ValidateUser();
            List<THE_Observaciones_EVDTIpad> lstIpad = new List<THE_Observaciones_EVDTIpad>();
            foreach (THE_Observaciones_EVDT item in MngNegocioObservaciones_EVDT.ModificarObservacion(OBEV.get()))
            {
                lstIpad.Add(new THE_Observaciones_EVDTIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_Observaciones_EVDTIpad> EliminarObservacion(THE_Observaciones_EVDTIpad OBEV)
        {
            ValidateUser();
            List<THE_Observaciones_EVDTIpad> lstIpad = new List<THE_Observaciones_EVDTIpad>();
            foreach (THE_Observaciones_EVDT item in MngNegocioObservaciones_EVDT.EliminarObservacion(OBEV.get()))
            {
                lstIpad.Add(new THE_Observaciones_EVDTIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_Observaciones_EVDTIpad> ObtenerObservaciones(int idEVDT)
        {
            ValidateUser();
            List<THE_Observaciones_EVDTIpad> lstIpad = new List<THE_Observaciones_EVDTIpad>();
            foreach (THE_Observaciones_EVDT item in MngNegocioObservaciones_EVDT.ObtenerObservaciones(idEVDT))
            {
                lstIpad.Add(new THE_Observaciones_EVDTIpad(item));
            }
            return lstIpad;
        }

        #endregion

        #region Equipo de Trabajo

        [WebMethod]
        public List<List<string>> ObtenerEmpleados()
        {
            ValidateUser();
            return MngNegocioEquipoTrabajo_EVDT.ObtenerEmpleados();
        }

        [WebMethod]
        public List<THE_EquipoTrabajo_EVDTIPad> ObtenerEmpleados_EVDT(int idEVDT)
        {
            ValidateUser();
            List<THE_EquipoTrabajo_EVDTIPad> lstIpad = new List<THE_EquipoTrabajo_EVDTIPad>();
            foreach (THE_EquipoTrabajo_EVDT item in MngNegocioEquipoTrabajo_EVDT.ObtenerEmpleados_EVDT(idEVDT))
            {
                lstIpad.Add(new THE_EquipoTrabajo_EVDTIPad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_EquipoTrabajo_EVDTIPad> EliminarEmpleado_EVDT(List<THE_EquipoTrabajo_EVDTIPad> listEQEV)
        {
            ValidateUser();
            List<THE_EquipoTrabajo_EVDT> lstEVDT = new List<THE_EquipoTrabajo_EVDT>();
            foreach (THE_EquipoTrabajo_EVDTIPad item in listEQEV)
            {
                lstEVDT.Add(item.get());
            }
            List<THE_EquipoTrabajo_EVDTIPad> lstIpad = new List<THE_EquipoTrabajo_EVDTIPad>();
            foreach (THE_EquipoTrabajo_EVDT itemIpad in MngNegocioEquipoTrabajo_EVDT.EliminarEmpleado_EVDT(lstEVDT))
            {
                lstIpad.Add(new THE_EquipoTrabajo_EVDTIPad(itemIpad));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_EquipoTrabajo_EVDTIPad> AgregarEmpleado_EVDT(THE_EquipoTrabajo_EVDTIPad EQEV)
        {
            ValidateUser();
            List<THE_EquipoTrabajo_EVDTIPad> lstIpad = new List<THE_EquipoTrabajo_EVDTIPad>();
            foreach (THE_EquipoTrabajo_EVDT itemIpad in MngNegocioEquipoTrabajo_EVDT.AgregarEmpleado_EVDT(EQEV.get()))
            {
                lstIpad.Add(new THE_EquipoTrabajo_EVDTIPad(itemIpad));
            }
            return lstIpad;
        }

        #endregion

        #region Graficos

        [WebMethod]
        public List<THE_GraficosIpad> CrearGraficos(THE_GraficosIpad GREV)
        {
            ValidateUser();
            GREV.dtFechaGR = DateTime.Now;
            List<THE_GraficosIpad> lstIpad = new List<THE_GraficosIpad>();
            foreach (THE_Graficos item in MngNegocioGraficos.CrearGraficos(GREV.get()))
            {
                lstIpad.Add(new THE_GraficosIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_GraficosIpad> ModificarGraficos(THE_GraficosIpad GREV)
        {
            ValidateUser();
            List<THE_GraficosIpad> lstIpad = new List<THE_GraficosIpad>();
            foreach (THE_Graficos item in MngNegocioGraficos.ModificarGraficos(GREV.get()))
            {
                lstIpad.Add(new THE_GraficosIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_GraficosIpad> EliminarGraficos(THE_GraficosIpad GREV)
        {
            ValidateUser();
            List<THE_GraficosIpad> lstIpad = new List<THE_GraficosIpad>();
            foreach (THE_Graficos item in MngNegocioGraficos.EliminarGraficos(GREV.get()))
            {
                lstIpad.Add(new THE_GraficosIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_GraficosIpad> ObtenerGraficos(string idEVDT)
        {
            ValidateUser();
            int IDEvdt = 0;
            int.TryParse(((idEVDT == string.Empty) ? "0" : idEVDT), out IDEvdt);
            List<THE_GraficosIpad> lstIpad = new List<THE_GraficosIpad>();
            foreach (THE_Graficos item in MngNegocioGraficos.ObtenerGraficos(IDEvdt))
            {
                lstIpad.Add(new THE_GraficosIpad(item));
            }
            return lstIpad;
        }

        #endregion

        #region Logistica

        [WebMethod]
        public List<THE_Logistica_EVDTIpad> ObtenerLogistica_EVDT(int idEVDT)
        {
            ValidateUser();
            List<THE_Logistica_EVDTIpad> lstIpad = new List<THE_Logistica_EVDTIpad>();
            foreach (THE_Logistica_EVDT itemIpad in MngNegocioLogistica_EVDT.ObtenerLogistica_EVDT(idEVDT))
            {
                lstIpad.Add(new THE_Logistica_EVDTIpad(itemIpad));
            }
            return lstIpad;
        }

        [WebMethod]
        public THE_Logistica_EVDTIpad ObtenerLogisticaxID_EVDT(int idLGEV)
        {
            ValidateUser();
            return new THE_Logistica_EVDTIpad(MngNegocioLogistica_EVDT.ObtenerLogisticaxID_EVDT(idLGEV));
        }

        [WebMethod]
        public List<THE_Logistica_EVDTIpad> CrearLogistica_EVDT(THE_Logistica_EVDTIpad LGEV)
        {
            ValidateUser();
            List<THE_Logistica_EVDTIpad> lstIpad = new List<THE_Logistica_EVDTIpad>();
            foreach (THE_Logistica_EVDT itemIpad in MngNegocioLogistica_EVDT.CrearLogistica_EVDT(LGEV.get()))
            {
                lstIpad.Add(new THE_Logistica_EVDTIpad(itemIpad));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_Logistica_EVDTIpad> ModificarLogistica_EVDT(THE_Logistica_EVDTIpad LGEV)
        {
            ValidateUser();
            List<THE_Logistica_EVDTIpad> lstIpad = new List<THE_Logistica_EVDTIpad>();
            foreach (THE_Logistica_EVDT itemIpad in MngNegocioLogistica_EVDT.ModificarLogistica_EVDT(LGEV.get()))
            {
                lstIpad.Add(new THE_Logistica_EVDTIpad(itemIpad));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_Logistica_EVDTIpad> EliminarLogistica_EVDT(THE_Logistica_EVDTIpad LGEV)
        {
            ValidateUser();
            List<THE_Logistica_EVDTIpad> lstIpad = new List<THE_Logistica_EVDTIpad>();
            foreach (THE_Logistica_EVDT itemIpad in MngNegocioLogistica_EVDT.EliminarLogistica_EVDT(LGEV.get()))
            {
                lstIpad.Add(new THE_Logistica_EVDTIpad(itemIpad));
            }
            return lstIpad;
        }

        #endregion

        #region Solicitud_OT

        [WebMethod]
        public List<THE_SolicitudFormatoIpad> ObtenerSolicitud_EVDT(int idEvento)
        {
            ValidateUser();
            List<THE_SolicitudFormatoIpad> lstIpad = new List<THE_SolicitudFormatoIpad>();
            foreach (THE_SolicitudFormato item in MngNegocioEventosDeportivos.ObtenerSolicitud_EVDT(idEvento))
            {
                lstIpad.Add(new THE_SolicitudFormatoIpad(item));
            }
            return lstIpad;
        }
        #endregion

        #endregion

        #region Adquisiciones

        [WebMethod]
        public List<TDI_VideoAdquisicion> ObtenerVideosSubMaster(DateTime DTFechaIni, DateTime DTFechaFin)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.ObtenerVideosSubMaster(DTFechaIni, DTFechaFin);
        }

        [WebMethod]
        public bool ActualizarSubMasterAdquisiciones(string IDNombreArchivo, int ValorSubmaster)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.ActualizarSubMasterAdquisiciones(IDNombreArchivo, ValorSubmaster);
        }

        [WebMethod]
        public bool EnviarCorreoAdquisiciones(int IDSolicitud, string IDGuid, int Tipo_correo)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.EnviarCorreoAdquisiciones(IDSolicitud, IDGuid, Tipo_correo);
        }

        [WebMethod]
        public List<TDI_VideoAdquisicion> ObtenerVideosAdquisicionesPorSolicitud(int IDSolicitud)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.ObtenerVideosAdquisicionesPorSolicitud(IDSolicitud);
        }

        [WebMethod]
        public bool InsertaAutorizacionAdquisiciones(int IDSolicitud, string IDGuid)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.InsertaAutorizacionAdquisiciones(IDSolicitud, IDGuid);
        }

        [WebMethod]
        public bool ActualizaAutorizacionAdquisiciones(int IDSolicitud, int IDEmpleado, string IDGuid, int IDStatus, string Comentario)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.ActualizaAutorizacionAdquisiciones(IDSolicitud, IDEmpleado, IDGuid, IDStatus, Comentario);
        }

        [WebMethod]
        public TDI_VideoAdquisicion RegresaEmpleadoProgramaSolicitud(int IDSolicitud, string IDGuid)
        {
            ValidateUser();
            return MngNegocioAdquisiciones.RegresaEmpleadoProgramaSolicitud(IDSolicitud, IDGuid);
        }

        #endregion

        #region Encuestas
        [WebMethod]
        public List<TDI_Encuestas> ObtenerEncuestas(string strEncuesta, string strFechainicial, string strfechaFinal, string strStatus, string strObligatorio)
        {
            ValidateUser();
            return MngNegocioEncuestas.ObtenerEncuestas(strEncuesta, strFechainicial, strfechaFinal, strStatus, strObligatorio);

        }
        [WebMethod]
        public Boolean ValidarStatusEncuestas(int CveUsuario)
        {
            ValidateUser();
            return MngNegocioEncuestas.ValidarStatusEncuestas(CveUsuario);
        }
        [WebMethod]
        public Boolean ValidarObligEncuestas(int CveUsuario)
        {
            ValidateUser();
            return MngNegocioEncuestas.ValidarObligEncuestas(CveUsuario);
        }
        [WebMethod]
        public Boolean GuardarEncuestas(TDI_Encuestas DatosEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestas.GuardarEncuestas(DatosEncuestas);
        }
        [WebMethod]
        public Boolean ActualizarEncuestas(TDI_Encuestas DatosEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestas.ActualizarEncuestas(DatosEncuestas);
        }
        [WebMethod]
        public Boolean BorrarEncuestas(TDI_Encuestas DatosEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestas.BorrarEncuestas(DatosEncuestas);
        }
        [WebMethod]
        public List<TDI_EncuestasPreg> ObtenerEncuestasPreg(string strPreg, string strStatus, string strType, long lngCveEncuesta)
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.ObtenerEncuestasPreg(strPreg, strStatus, strType, lngCveEncuesta);

        }
        [WebMethod]
        public List<TDI_EncuestasPreg> ObtenerEncuestaCnPreguntas()
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.ObtenerEncuestaCnPreguntas();
        }
        [WebMethod]
        public List<TDI_EncuestasPreg> ObtenerEncCnPregGraficas(long lngCveEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.ObtenerEncCnPregGraficas(lngCveEncuestas);
        }
        [WebMethod]
        public Boolean GuardarEncuestasPreg(TDI_EncuestasPreg DatosEncuestasPreg)
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.GuardarEncuestasPreg(DatosEncuestasPreg);
        }
        [WebMethod]
        public Boolean ActualizarEncuestasPreg(TDI_EncuestasPreg DatosEncuestasPreg)
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.ActualizarEncuestasPreg(DatosEncuestasPreg);
        }
        [WebMethod]
        public Boolean BorrarEncuestasPreg(TDI_EncuestasPreg DatosEncuestasPreg)
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.BorrarEncuestasPreg(DatosEncuestasPreg);
        }
        [WebMethod]
        public List<TDI_EncuestasResp> ObtenerEncuestasResp(string strRespuesta, string strStatus, long CveEncuestaPreg)
        {
            ValidateUser();
            return MngNegocioEncuestasResp.ObtenerEncuestasResp(strRespuesta, strStatus, CveEncuestaPreg);

        }
        [WebMethod]
        public Boolean ValidarExistRespEncuestas()
        {
            ValidateUser();
            return MngNegocioEncuestasResp.ValidarExistRespEncuestas();
        }
        [WebMethod]
        public List<TDI_EncuestasResp> ObtenerEncuestaCnRespuestas()
        {
            ValidateUser();
            return MngNegocioEncuestasResp.ObtenerEncuestaCnRespuestas();
        }
        [WebMethod]
        public Boolean GuardarEncuestasResp(TDI_EncuestasResp DatosEncuestasResp)
        {
            ValidateUser();
            return MngNegocioEncuestasResp.GuardarEncuestasResp(DatosEncuestasResp);
        }
        [WebMethod]
        public Boolean ActualizarEncuestasResp(TDI_EncuestasResp DatosEncuestasResp)
        {
            ValidateUser();
            return MngNegocioEncuestasResp.ActualizarEncuestasResp(DatosEncuestasResp);
        }
        [WebMethod]
        public Boolean BorrarEncuestasResp(TDI_EncuestasResp DatosEncuestasResp)
        {
            ValidateUser();
            return MngNegocioEncuestasResp.BorrarEncuestasResp(DatosEncuestasResp);
        }
        [WebMethod]
        public List<TDI_EncuestasCont> ObtenerEncuestasCont(int CveUsuario)
        {
            ValidateUser();
            return MngNegocioEncuestasCont.ObtenerEncuestasCont(CveUsuario);

        }
        [WebMethod]
        public List<TDI_EncuestasCont> ObtenerEncuestasContCvePreg(long CvePreg, long CveEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestasCont.ObtenerEncuestasContCvePreg(CvePreg, CveEncuestas);

        }
        [WebMethod]
        public Boolean ValidarExistEncuestas(int CveUsuario)
        {
            ValidateUser();
            return MngNegocioEncuestasCont.ValidarExistEncuestas(CveUsuario);
        }
        [WebMethod]
        public Boolean GuardarEncuestasCont(TDI_EncuestasCont DatosEncuestasCont)
        {
            ValidateUser();
            return MngNegocioEncuestasCont.GuardarEncuestasCont(DatosEncuestasCont);
        }
        [WebMethod]
        public Boolean ActualizarEncuestasCont(TDI_EncuestasCont DatosEncuestasCont)
        {
            ValidateUser();
            return MngNegocioEncuestasCont.ActualizarEncuestasCont(DatosEncuestasCont);
        }
        [WebMethod]
        public Boolean BorrarEncuestasCont(TDI_EncuestasCont DatosEncuestasCont)
        {
            ValidateUser();
            return MngNegocioEncuestasCont.BorrarEncuestasCont(DatosEncuestasCont);
        }
        [WebMethod]
        public List<TDI_EncuestasPreg> ObtenerEncuestaCnPreguntasIdEnc(long lngCveEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestasPreg.ObtenerEncuestaCnPreguntasIdEnc(lngCveEncuestas);
        }
        [WebMethod]
        public List<TDI_EncuestasResp> ObtenerEncuestaCnRespuestasCnCveEnc(long lngCveEncuestas)
        {
            ValidateUser();
            return MngNegocioEncuestasResp.ObtenerEncuestaCnRespuestasCnCveEnc(lngCveEncuestas);
        }
        #endregion

        #region Reporte tipo Material

        [WebMethod]
        public List<RptTipoMaterial> ObtenerTipoMaterial()
        {
            ValidateUser();
            return MngNegocioRptTipoMaterial.GetTipoMaterial();
        }

        [WebMethod]
        public string ObtenerTipoMaterialHtml5()
        {
            string resultjson = "";
            ValidateUser();
            List<RptTipoMaterial> dato = MngNegocioRptTipoMaterial.GetTipoMaterial();

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }
        #endregion

        #region Nuevos Eventos Deportivos

        #region Eventos deportivos

        [WebMethod]
        public THE_EventoDeportivoIpad ObtenerEventoxID_Fecha(int idEvento, string Dia, string Mes, string Anio)
        {
            ValidateUser();
            return new THE_EventoDeportivoIpad(MngNegocioEventosDeportivos.ObtenerEventoxID_Fecha(idEvento, Dia, Mes, Anio));
        }

        [WebMethod]
        public List<List<THE_SolicitudFormatoIpad>> ObtenerSolicitud_EVDTs(List<int> idsEventosIpad)
        {
            ValidateUser();
            List<List<THE_SolicitudFormatoIpad>> lstIpad = new List<List<THE_SolicitudFormatoIpad>>();
            foreach (List<THE_SolicitudFormato> item in MngNegocioEventosDeportivos.ObtenerSolicitud_EVDTs(idsEventosIpad))
            {
                List<THE_SolicitudFormatoIpad> lstForm = new List<THE_SolicitudFormatoIpad>();
                foreach (THE_SolicitudFormato oIpad in item)
                {
                    lstForm.Add(new THE_SolicitudFormatoIpad(oIpad));
                }
                lstIpad.Add(lstForm);
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_EquipoTrabajo_EVDTIPad> ObtenerEquipoTrabajo_EVDT(int idEvento)
        {
            ValidateUser();
            List<THE_EquipoTrabajo_EVDTIPad> lstIpad = new List<THE_EquipoTrabajo_EVDTIPad>();
            foreach (THE_EquipoTrabajo_EVDT item in MngNegocioEquipoTrabajo_EVDT.ObtenerEmpleados_EVDT(idEvento))
            {
                lstIpad.Add(new THE_EquipoTrabajo_EVDTIPad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<List<THE_EquipoTrabajo_EVDTIPad>> ObtenerEquiposTrabajo_EVDTs(List<int> idsEventos)
        {
            ValidateUser();
            List<List<THE_EquipoTrabajo_EVDTIPad>> lstIpad = new List<List<THE_EquipoTrabajo_EVDTIPad>>();
            foreach (List<THE_EquipoTrabajo_EVDT> item in MngNegocioEventosDeportivos.ObtenerEquiposTrabajo_EVDTs(idsEventos))
            {
                List<THE_EquipoTrabajo_EVDTIPad> lstEVDT = new List<THE_EquipoTrabajo_EVDTIPad>();
                foreach (THE_EquipoTrabajo_EVDT oIpad in item)
                {
                    lstEVDT.Add(new THE_EquipoTrabajo_EVDTIPad(oIpad));
                }
                lstIpad.Add(lstEVDT);
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_ParametrosEVDT_Valores_IPAD> ObtenerParametros_EVDT(int idEvento)
        {
            ValidateUser();
            List<THE_ParametrosEVDT_Valores_IPAD> lstIpad = new List<THE_ParametrosEVDT_Valores_IPAD>();
            foreach (THE_ParametrosEVDT_Valores item in MngNegocioParametrosEVDT_Valores.ObtenerParametrosValores(idEvento))
            {
                lstIpad.Add(new THE_ParametrosEVDT_Valores_IPAD(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<List<THE_ParametrosEVDT_Valores_IPAD>> ObtenerParametros_EVDTs(List<int> idsEventos)
        {
            ValidateUser();
            List<List<THE_ParametrosEVDT_Valores_IPAD>> lstIpad = new List<List<THE_ParametrosEVDT_Valores_IPAD>>();
            foreach (List<THE_ParametrosEVDT_Valores> item in MngNegocioEventosDeportivos.ObtenerParametros_EVDTs(idsEventos))
            {
                List<THE_ParametrosEVDT_Valores_IPAD> lstParEVDT = new List<THE_ParametrosEVDT_Valores_IPAD>();
                foreach (THE_ParametrosEVDT_Valores oIpad in item)
                {
                    lstParEVDT.Add(new THE_ParametrosEVDT_Valores_IPAD(oIpad));
                }
                lstIpad.Add(lstParEVDT);
            }
            return lstIpad;
        }

        [WebMethod]
        public List<List<THE_Logistica_EVDTIpad>> ObtenerLogisticas_EVDTs(List<int> idsEventos)
        {
            ValidateUser();
            List<List<THE_Logistica_EVDTIpad>> lstIpad = new List<List<THE_Logistica_EVDTIpad>>();
            foreach (List<THE_Logistica_EVDT> item in MngNegocioEventosDeportivos.ObtenerLogisticas_EVDTs(idsEventos))
            {
                List<THE_Logistica_EVDTIpad> lstLogis = new List<THE_Logistica_EVDTIpad>();
                foreach (THE_Logistica_EVDT oIpad in item)
                {
                    lstLogis.Add(new THE_Logistica_EVDTIpad(oIpad));
                }
                lstIpad.Add(lstLogis);
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_OrdenTrabajoIpad> ObtenerOTs_EVDT(int idEvento, int ESIN_LLAV_PR, string fecha)
        {
            ValidateUser();
            List<THE_OrdenTrabajoIpad> lstIpad = new List<THE_OrdenTrabajoIpad>();
            foreach (THE_OrdenTrabajo item in MngNegocioEventosDeportivos.ObtenerOTs_EVDT(idEvento, ESIN_LLAV_PR, fecha))
            {
                lstIpad.Add(new THE_OrdenTrabajoIpad(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<List<THE_OrdenTrabajoIpad>> ObtenerOTs_EVDTs(List<int> idsEventos, List<int> idsESINs, string fecha)
        {
            ValidateUser();
            List<List<THE_OrdenTrabajoIpad>> lstIpad = new List<List<THE_OrdenTrabajoIpad>>();
            foreach (List<THE_OrdenTrabajo> item in MngNegocioEventosDeportivos.ObtenerOTs_EVDTs(idsEventos, idsESINs, fecha))
            {
                List<THE_OrdenTrabajoIpad> lstOTra = new List<THE_OrdenTrabajoIpad>();
                foreach (THE_OrdenTrabajo oIpad in item)
                {
                    lstOTra.Add(new THE_OrdenTrabajoIpad(oIpad));
                }
                lstIpad.Add(lstOTra);
            }
            return lstIpad;
        }

        [WebMethod]
        public List<OTProg> ConsultaAgendaPrograma_EVDT(string Fecha, int ESIN_LLAV_PR)
        { ValidateUser(); return (List<OTProg>)MngNegocioEventosDeportivos.ConsultaAgendaPrograma_EVDT(Fecha, ESIN_LLAV_PR); }

        [WebMethod]
        public List<List<OTProg>> ConsultaAgendaPrograma_EVDTs(string Fecha, List<int> idsESINs)
        { ValidateUser(); return MngNegocioEventosDeportivos.ConsultaAgendaPrograma_EVDTs(Fecha, idsESINs); }

        [WebMethod]
        public int GuardarEVDT(THE_EventoDeportivoIpad EVDT)
        { ValidateUser(); return MngNegocioEventosDeportivos.GuardarEVDT(EVDT.get()); }

        [WebMethod]
        public bool ActualizarEVDT(THE_EventoDeportivoIpad EVDT)
        { ValidateUser(); return MngNegocioEventosDeportivos.ActualizarEVDT(EVDT.get()); }

        [WebMethod]
        public bool EliminarEVDT(THE_EventoDeportivoIpad EVDT)
        { ValidateUser(); return MngNegocioEventosDeportivos.EliminarEVDT(EVDT.get()); }

        #endregion Eventos deportivos

        #region Parámetros

        [WebMethod]
        public List<TDI_ParametrosEVDT> ObtenerParametros()
        { ValidateUser(); return MngNegocioParametrosEVDT.ObtenerParametros(); }

        [WebMethod]
        public TDI_ParametrosEVDT ObtenerParametro(int idParametro)
        { ValidateUser(); return MngNegocioParametrosEVDT.ObtenerParametro(idParametro); }

        [WebMethod]
        public List<TDI_ParametrosEVDT> ObtenerParametrosEvento(int idEvento)
        { ValidateUser(); return MngNegocioParametrosEVDT.ObtenerParametrosEvento(idEvento); }

        [WebMethod]
        public int InsertarParametro(TDI_ParametrosEVDT parametro)
        { ValidateUser(); return MngNegocioParametrosEVDT.InsertarParametro(parametro); }

        [WebMethod]
        public bool ActualizarParametro(TDI_ParametrosEVDT parametro)
        { ValidateUser(); return MngNegocioParametrosEVDT.ActualizarParametro(parametro); }

        [WebMethod]
        public int BorrarParametro(TDI_ParametrosEVDT parametro)
        { ValidateUser(); return MngNegocioParametrosEVDT.BorrarParametro(parametro); }

        #endregion Parámetros

        #region Parámetros Valor

        [WebMethod]
        public List<THE_ParametrosEVDT_Valores_IPAD> ObtenerParametrosValores(int idEvento)
        {
            ValidateUser();
            List<THE_ParametrosEVDT_Valores_IPAD> lstIpad = new List<THE_ParametrosEVDT_Valores_IPAD>();
            foreach (THE_ParametrosEVDT_Valores item in MngNegocioParametrosEVDT_Valores.ObtenerParametrosValores(idEvento))
            {
                lstIpad.Add(new THE_ParametrosEVDT_Valores_IPAD(item));
            }
            return lstIpad;
        }

        [WebMethod]
        public List<THE_ParametrosEVDT_Vals> ObtenerValoresParametro(int idParametro)
        { ValidateUser(); return MngNegocioParametrosEVDT_Valores.ObtenerValoresParametro(idParametro); }

        [WebMethod]
        public int InsertarParametroValor(THE_ParametrosEVDT_Valores_IPAD parametro)
        { ValidateUser(); return MngNegocioParametrosEVDT_Valores.InsertarParametroValor(parametro.getTHE_ParametrosEVDT_Valores()); }

        [WebMethod]
        public bool ActualizarParametroValor(THE_ParametrosEVDT_Valores_IPAD parametro)
        { ValidateUser(); return MngNegocioParametrosEVDT_Valores.ActualizarParametroValor(parametro.getTHE_ParametrosEVDT_Valores()); }

        [WebMethod]
        public bool ActualizarParametrosValores(List<THE_ParametrosEVDT_Valores_IPAD> parametros)
        {
            ValidateUser();
            List<THE_ParametrosEVDT_Valores> lstParEVDT = new List<THE_ParametrosEVDT_Valores>();
            foreach (THE_ParametrosEVDT_Valores_IPAD oIpad in parametros)
            {
                lstParEVDT.Add(oIpad.getTHE_ParametrosEVDT_Valores());
            }
            return MngNegocioParametrosEVDT_Valores.ActualizarParametrosValores(lstParEVDT);
        }

        [WebMethod]
        public bool BorrarParametroValor(THE_ParametrosEVDT_Valores_IPAD parametro)
        { ValidateUser(); return MngNegocioParametrosEVDT_Valores.BorrarParametroValor(parametro.getTHE_ParametrosEVDT_Valores()); }

        #endregion Parámetros Valor

        #endregion Nuevos Eventos Deportivos

        #region Adjuntos
        [WebMethod]
        public List<THE_Adjuntos> ObtenerAdjuntos(string strVdo_IdFileName)
        {
            ValidateUser();
            return MngNegocioAdjuntos.ObtenerAdjuntos(strVdo_IdFileName);

        }
        [WebMethod]
        public Boolean UpdateAdjuntos(THE_Adjuntos DatosAdjuntos)
        {
            ValidateUser();
            return MngNegocioAdjuntos.UpdateAdjuntos(DatosAdjuntos);
        }
        [WebMethod]
        public Boolean GuardarAdjuntos(THE_Adjuntos DatosAdjuntos)
        {
            ValidateUser();
            return MngNegocioAdjuntos.GuardarAdjuntos(DatosAdjuntos);
        }
        [WebMethod]
        public int indiceAdjuntos(string strVdo_IdFileName)
        {
            ValidateUser();
            return MngNegocioAdjuntos.indiceAdjuntos(strVdo_IdFileName);
        }
        [WebMethod]
        public int lvkIdVideo(string strVdo_IdFileName)
        {
            ValidateUser();
            return MngNegocioAdjuntos.lvkIdVideo(strVdo_IdFileName);
        }
        #endregion

        #region Consulta de Locales y relaciones de locales con empleados

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TDI_Local> ObtenerLocales()
        {
            #region Variables
            IList<TDI_Local> resultado = null;
            #endregion Variables

            #region Proceso
            ValidateUser();
            resultado = MngNegocioLocal.ObtenerLocales();
            if (resultado != null)
                return resultado.ToList<TDI_Local>();
            else
                return new List<TDI_Local>();
            #endregion Proceso
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = false, ResponseFormat = ResponseFormat.Json)]
        public List<TDI_LocalEmpleado> ObtenerLocalesEmpleado(int EMPL_LLAV_PR)
        {
            #region Variables

            #endregion Variables

            #region Proceso
            ValidateUser();
            return MngNegocioLocalEmpleado.ObtenerRelacionesLocalEmpleado_Empleado(EMPL_LLAV_PR);

            #endregion Proceso
        }

        [WebMethod]
        public bool GuardarSolMatLocal(THE_SolMatLocal Source)
        { ValidateUser(); return MngNegocioSolMatLocal.GuardarSolMatLocal(Source); }

        [WebMethod]
        public List<THE_SolMatLocal> ObtieneSolMatLocal(THE_SolMatLocal Source)
        {
            ValidateUser();
            List<THE_SolMatLocal> dato = MngNegocioSolMatLocal.ObtenerSolMatLocal(Source);
            return dato;
        }

        [WebMethod]
        public List<THE_StorageLocal> ObtenerStorageLocales(THE_StorageLocal Source)
        {
            ValidateUser();
            List<THE_StorageLocal> dato = MngNegocioStorageLocal.NEGOCIOObtenerStorageLocales(Source);
            return dato;
        }
        [WebMethod]
        public Boolean ActualizaSolMatPausado(int idMatsol)
        {
            ValidateUser();
            Boolean dato = MngNegocioSolMatLocal.NegocioActualizaEstadoPausado(idMatsol);
            return dato;
        }

        [WebMethod]
        public Boolean ActualizaSolMatReanudar(int idMatsol)
        {
            ValidateUser();
            Boolean dato = MngNegocioSolMatLocal.NegocioActualizaEstadoReanudar(idMatsol);
            return dato;
        }

        [WebMethod]
        public Boolean ActualizaSolMatPrioridad(int idMatsol, int idPrioridad)
        {
            ValidateUser();
            Boolean dato = MngNegocioSolMatLocal.NegocioActualizaPrioridad(idMatsol, idPrioridad);
            return dato;
        }

        [WebMethod]
        public Boolean ActualizaSolMatCancelado(int idMatsol)
        {
            ValidateUser();
            Boolean dato = MngNegocioSolMatLocal.NegocioActualizaEstadoCancelado(idMatsol);
            return dato;
        }


        [WebMethod]
        public Boolean ActualizaSolMatReenviado(int idMatsol)
        {
            ValidateUser();
            Boolean dato = MngNegocioSolMatLocal.NegocioActualizaEstadoReenviado(idMatsol);
            return dato;
        }


        //[WebMethod]
        //public List<THE_SolMatLocalPROGRAMADASyACTUALES> ObtenerSolMatLocalProgramadasyActuales(int loclOrig, int loclDest, int indicador, int estatus, string nombreMaterial, string fechaUno, string fechaDos)
        //{
        //    ValidateUser();
        //    List<THE_SolMatLocalPROGRAMADASyACTUALES> dato = MngNegocioSolMatLocal.ObtenerSolMatLocalProgramadasActuales(loclOrig, loclDest, indicador, estatus, nombreMaterial, fechaUno, fechaDos);
        //    return dato;
        //}

        [WebMethod]
        public string ObtenerSolMatLocalProgramadasyActuales(int loclOrig, int loclDest, int indicador, int estatus, string nombreMaterial, string fechaUno, string fechaDos)
        {
            string resultjson = "";
            ValidateUser();
            List<THE_SolMatLocalPROGRAMADASyACTUALES> dato = MngNegocioSolMatLocal.ObtenerSolMatLocalProgramadasActuales(loclOrig, loclDest, indicador, estatus, nombreMaterial, fechaUno, fechaDos);

            JavaScriptSerializer serializer = new JavaScriptSerializer();

            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
           
        }


        [WebMethod]
        public List<TDI_StatusMatLocal> ObtenerStatusMatLocal(TDI_StatusMatLocal Source)
        {
            ValidateUser();
            List<TDI_StatusMatLocal> dato = MngNegocioStatusMatLocal.ObtenerStatusMatLocal();
            return dato;
        }


        [WebMethod]
        public List<THE_SolMatLocal> ObtenerSolMatLocalParametro(int localId, int status, string NomMaterial, string FechaIni, string FechaFin)
        {
            ValidateUser();
            List<THE_SolMatLocal> dato = MngNegocioSolMatLocal.ObtenerSolMatLocalParametros(localId, status, NomMaterial, FechaIni, FechaFin);
            return dato;
        }

        [WebMethod]
        public List<THE_SolMatLocal> ObtenerSolMatLocalParametroMapa(int loclOrig, int loclDest, int estId, string FecInicio, string FecFin)
        {
            ValidateUser();
            List<THE_SolMatLocal> dato = MngNegocioSolMatLocal.ObtenerSolMatLocalParametrosMapa(loclOrig, loclDest, estId, FecInicio, FecFin);
            return dato;
        }

        [WebMethod]
        public string ObtenerSolMatLocalParametroMapa2(int loclOrig, int loclDest, int estId, string FecInicio, string FecFin)
        {
            string resultjson = "";
            ValidateUser();
            List<THE_SolMatLocal> dato = MngNegocioSolMatLocal.ObtenerSolMatLocalParametrosMapa(loclOrig, loclDest, estId, FecInicio, FecFin);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
           
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dato);
            return resultjson;
        }


        [WebMethod]
        public List<THE_StatusRed> ObtenerStatusRed(THE_StatusRed Source)
        {
            ValidateUser();
            List<THE_StatusRed> dato = MngNegocioStatusRed.NEGOCIOStatusRed(Source);
            return dato;
        }

        [WebMethod]
        public List<THE_MaterialLocal> ObtieneMaterialLocal(THE_MaterialLocal Source)
        {
            ValidateUser();
            List<THE_MaterialLocal> dato = MngNegocioMaterialLocal.ObtenerMaterialLocal(Source);
            return dato;
        }



        [WebMethod]
        public List<THE_MaterialLocal> ObtenerMaterialLocal(int CveOrdenTrabajo, string ClaveOrdenTrabajo)
        {
            ValidateUser();

            IList<THE_MaterialLocal> Resultado = null;
            Resultado = MngNegocioMaterialLocal.ObtenerMaterialLocal(CveOrdenTrabajo, ClaveOrdenTrabajo);

            if (Resultado != null)
            {
                return Resultado.ToList<THE_MaterialLocal>();
            }
            else
            {
                return new List<THE_MaterialLocal>();
            }
        }

        [WebMethod]
        public List<TDI_StatusMatLocal> obtenerEstatusTransferencia() {
            ValidateUser();
            IList<TDI_StatusMatLocal> result = null;

            result = MngNegocioSolMatLocal.getAllEstatus();
            if (result == null)
                return new List<TDI_StatusMatLocal>();

            return result.OrderBy(n=> n.Nombre).ToList<TDI_StatusMatLocal>();
        }

        [WebMethod]
        public bool GuardarSolMatLocalTrancode(THE_SolMatLocal oTHE_SolMatLocal, VideoRecuperacion oVideoRecuperacion, List<VideoRecuperacionArchivo> lstVideoRecuperacionArchivo, THE_LogTransacciones tHE_LogTransacciones, bool isUserGrant, bool isUserGrantAdquisi)
        {
            ValidateUser();

            return MngNegocioSolMatLocal.GuardarSolMatLocal(oTHE_SolMatLocal, oVideoRecuperacion, lstVideoRecuperacionArchivo, tHE_LogTransacciones, isUserGrant, isUserGrantAdquisi);

        }

        [WebMethod]
        public Play_Out_Shares ObtienePlayOutLocal()
        { ValidateUser(); return MngNegocioPlayOutShares.ObtenerPlayOutLocales(); }


        [WebMethod]
        public List<THE_MaterialLocal> ObtenerMaterialesOT(int cveOrdenTrabajo, string ClaveOrdenTrabajo)
        {
            ValidateUser();

            IList<THE_MaterialLocal> Resultado = null;
            Resultado = MngNegocioMaterialLocal.ObtenerMaterialesOT(cveOrdenTrabajo, ClaveOrdenTrabajo);

            if (Resultado != null)
            {
                return Resultado.ToList<THE_MaterialLocal>();
            }
            else
            {
                return new List<THE_MaterialLocal>();
            }


        }


        #endregion Consulta de Locales y relaciones de locales con empleados


        [WebMethod]
        public List<MenuEmpleado> GetMenuEmpleadoHTML5(string Empl_llav_pr)
        {
            ValidateUser();
            return (List<MenuEmpleado>)MgnTDI_Menus.ObtenerTodoMenuHTML5(Empl_llav_pr);
        }

        [WebMethod]
        public string MonitoreoMaterialDisponible(int idLocal, string fechaInicio, string fechaFinal, string textoBusqueda, bool isSinOT, Int32 rating)
        {
            string resultjson = "";
            ValidateUser();
           
            List<THE_MonitoreoMaterialDisponible> MatDisponible = MngNegocioMonitoreoMaterialDisponible.ObtenerMaterialDisponible( idLocal, fechaInicio,  fechaFinal,  textoBusqueda, isSinOT, rating);
            JavaScriptSerializer serializer = new JavaScriptSerializer();            
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(MatDisponible);
            //Thread.Sleep(4500);
            return resultjson;
        }
        #region Consulta Transferencias Interlocales
        [WebMethod]
        public List<THE_SolMatLocal> TransferInterlocales()
        {
            ValidateUser();
            return MngNegocioSolMatLocal.ObtieneTransferInterlocales();
        }
        [WebMethod]
        public string TransferInterlocalesHtml5(string locales, string fecha)
        {
            string resultjson = "";
            ValidateUser();

            List<THE_SolMatLocal> dataTransfer = MngNegocioSolMatLocal.ObtieneTransferInterlocalesHtml5(locales, fecha);
            JavaScriptSerializer serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = 2147483647;
            resultjson = serializer.Serialize(dataTransfer);
            return resultjson;

        }
        #endregion
        
        [WebMethod]
        public TDI_Seccion ObtieneSeccionUsuario(int idEmpleado)
        {
            ValidateUser();
            return MngNegocioSeccion.ObtieneSeccionUsuario(idEmpleado);
        }

        #region "Evaluacion"

        [WebMethod]
        public List<TDI_Programa> ObtieneProgramasPorLocal(int loclId)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.MngNegocioEvaluacion.ObtenerProgramasLocal(loclId);
        }

        [WebMethod]
        public List<THE_Evaluacion> obtenerNotasEvaluadas(int prgId, DateTime fecha)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.MngNegocioEvaluacion.getNotasEvaluadas(prgId, fecha);
        }

        [WebMethod]
        public List<THE_Evaluacion> getNotasPorEvaluar(int prgId, DateTime fecha)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.MngNegocioEvaluacion.getNotasPorEvaluar(prgId, fecha);
        }

        [WebMethod]
        public List<TDI_Formato> ObtieneFormatosEvaluacion(int empr, int fabr)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.MngNegocioEvaluacion.getFormatoxEmpFabr(empr, fabr);
        }
        
        #endregion

    }
}
