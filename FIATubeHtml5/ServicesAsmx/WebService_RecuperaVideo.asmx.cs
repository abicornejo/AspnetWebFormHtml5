using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using CommunicationLib;
using System.Diagnostics;
using System.IO;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Text;
using System.Xml;
using TvAzteca.FiaTube.Entidades;
using TvAzteca.FiaTube.Entidades.Acoplados;
using TvAzteca.FiaTube.Bll_FIATube;
using TvAzteca.FiaTube.Bll_FIATube.Relacionales;
using TvAzteca.FiaTube.Bll_FIATube.Acoplados;
using System.Runtime.Serialization.Formatters.Binary;
using TvAzteca.FiaTube.Entidades.Vidi;
using TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi;
using Azteca.Utility.Security;

namespace FIATubeHtml5.ServicesAsmx
{
    /// <summary>
    /// Summary description for WebService_RecuperaVideo
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class WebService_RecuperaVideo : System.Web.Services.WebService
    {
        private object padlockSrvRestore = new object();

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
            catch
            {
                throw new System.Exception("Usuario no valido");
            }
        }

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

        public static void ValidateUserStatic()
        {
            bool IsAuthenticated = false;
            try
            {
                string strAuth = HttpContext.Current.Session["IsAuthenticated"].ToString();
                IsAuthenticated = bool.Parse(strAuth);
                if (!IsAuthenticated)
                    throw new System.Exception("Usuario no valido");
            }
            catch
            {
                throw new System.Exception("Usuario no valido");
            }
        }
        #endregion ValidateUser

        #region Servicios para diva
        [WebMethod]
        public Guid GetRestoreFromDiva(string guid, string[] filenames, string[] timecodes, bool stickFiles, PriorityOptions prioridad)
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
                    string tempFilename = file.Substring(file.LastIndexOf("/") + 1);
                    int ext = 0;
                    ext = tempFilename.LastIndexOf('.');

                    if (ext > -1)
                        tempFilename = tempFilename.Substring(0, ext);

                    filesDv.Add(tempFilename + ".dv");
                }

                media.OTSets = filesDv.ToArray();
                media.TimeCodes = timecodes;

                taskOpc.Priority = prioridad;

                try
                {

                    MemoryStream memoryStream = new MemoryStream();
                    BinaryFormatter binaryFormatter = new BinaryFormatter();
                    binaryFormatter.Serialize(memoryStream, media);
                    string strMedia = System.Convert.ToBase64String(memoryStream.ToArray());

                    MemoryStream memoryStream2 = new MemoryStream();
                    BinaryFormatter binaryFormatter2 = new BinaryFormatter();
                    binaryFormatter.Serialize(memoryStream2, taskOpc);
                    string strOpc = System.Convert.ToBase64String(memoryStream2.ToArray());

                    cB_DivaUtilities.SaveSerializeObject(guid, strMedia, strOpc);

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
        public SalidaSaveRequestDiva SaveRequestDiva(string jobName, string[] files, string[] timecodes, string guid, string usrId, string usrName, bool stickFiles, int prioridad)
        {
            SalidaSaveRequestDiva objSalida = new SalidaSaveRequestDiva();

            ValidateUser();
            PriorityOptions pr;

            if (files.ToList<string>().Count == 1) //Cuando se manda solo una recuperacion se fija automaticamente que es Recuperacion por Archivos Separados
                stickFiles = false;

            switch (prioridad)
            {
                case 75: pr = PriorityOptions.Alta; break;
                case 65: pr = PriorityOptions.Media; break;
                case 60: pr = PriorityOptions.Baja; break;
                default: pr = PriorityOptions.Baja; break;
            }

            objSalida.SaveRequestDiva = cB_DivaUtilities.SaveRequestDiva(jobName, files, timecodes, guid, usrId, " ", usrName);
            objSalida.SaveSerializeObject = cB_DivaUtilities.SaveSerializeObject(guid, files, timecodes, stickFiles, pr);
            objSalida.PreviousRequests = cB_DivaUtilities.GetPreviousRequests();

            return objSalida;
        }

        [WebMethod]
        public void HabilitaSession()
        {
            try
            {
                if (HttpContext.Current.Session["IsAuthenticated"] == null)
                    HttpContext.Current.Session.Add("IsAuthenticated", true);
            }
            catch (Exception ex)
            {
                HttpContext.Current.Session.Add("IsAuthenticated", true);
            }

        }

        [WebMethod]
        public int SaveRequestDivaEscaleta(string jobName, string[] files, string[] timecodes, string guid, string usrId, string usrName, bool stickFiles, int prioridad, bool sendPlayOut)
        {

            SalidaSaveRequestDiva objSalida = SaveRequestDiva(jobName, files, timecodes, guid, usrId, usrName, stickFiles, prioridad);
            int res = objSalida.PreviousRequests;
            CommunicationLib.StatusQuerys.UpdateSharePLayOut(guid);

            return res;
        }

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
        public VideoRecuperacion InsertarVideoRecuperacionyArchivos(VideoRecuperacion oVideoRecuperacion, List<VideoRecuperacionArchivo> lstVideoRecuperacionArchivo, bool esNotificame, THE_LogTransacciones LogTransacciones, bool isUserGrant, bool isUserGrantAdquisi)
        {
            ValidateUser();
            return MngNegocioVideoRecuperacion.InsertaVideoRecuperacionyArchivos(oVideoRecuperacion, lstVideoRecuperacionArchivo, esNotificame, LogTransacciones, isUserGrant, isUserGrantAdquisi);
        }

        [WebMethod]
        public VideoRecuperacion InsertarMarcasVideoRecuperacionyArchivos(VideoRecuperacion oVideoRecuperacion, List<VideoRecuperacionArchivo> lstVideoRecuperacionArchivo, bool esNotificarme, THE_LogTransacciones LogTransacciones)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.InsertarMarcasVideoRecuperacionyArchivos(oVideoRecuperacion, lstVideoRecuperacionArchivo, esNotificarme, LogTransacciones);
        }

        [WebMethod]
        public string GetPrefixArchivo(string esin_llav_pr)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.cB_DivaUtilities.GetPrefixArchivo(esin_llav_pr);
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

        #region Recuperación Marcas
        [WebMethod]
        public List<VideoRecuperacion> ObtenerRecuperacionesXNumEmpleado(string NumEmpleado, DateTime FechaIni, DateTime FechaFin, string Filtro)
        {
            ValidateUser();
            return (List<VideoRecuperacion>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ObtenerVideoRecuperacion(NumEmpleado, "XEmpleado", FechaIni, FechaFin, Filtro);
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
        public List<TDI_BUSQUEDAS> getBusquedasByUsuarioFilters(string Username, DateTime fechaInicial, DateTime FechaFinal, string filtro)
        {
            ValidateUser();
            return MngNegocioBusquedas.getBusquedasByUsuario(Username, fechaInicial, FechaFinal, filtro);
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

        [WebMethod]
        public bool EliminaVideoRecuperacion(VideoRecuperacion oVideoRecuperacion)
        {
            ValidateUser();
            return TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ActualizaStatusBorrar(oVideoRecuperacion);
        }

        [WebMethod]
        public List<PrioridadRecuperacion> ConsultaPrioridadVideoRecu(int CveProgVideo, string AbrevProg, DateTime FechaAConsultar)
        {
            ValidateUser();
            if (CveProgVideo.ToString() == string.Empty) CveProgVideo = 0; 
            if (FechaAConsultar == null) FechaAConsultar = Convert.ToDateTime( DateTime.Now.ToString("yyyy-MM-dd"));

            return (List<PrioridadRecuperacion>)TvAzteca.FiaTube.Bll_FIATube.ClasesNegocioVidi.MngNegocioVideoRecuperacion.ConsultaPrioridadRecuperacion(CveProgVideo, AbrevProg, FechaAConsultar);
        }

        #endregion

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
            ValidateUser();
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
            ValidateUserStatic();
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

        #region Acoplados
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
        public List<AcopladoIpad> GetListaAcopladosImg()
        {
            ValidateUser();
            List<AcopladoIpad> lstIpad = new List<AcopladoIpad>();
            foreach (Acoplado item in MngNegocioAcoplados.GetListaAcopladosImg())
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

        #region ConsultaImagenes
        [WebMethod]
        public List<ImagenesOT> ConsultaImagenes(string OTRA_CVEC)
        {
            ValidateUser();
            return (List<ImagenesOT>)TvAzteca.FiaTube.Bll_FIATube.cB_VideotecaDigital.ConsultaImagenesOT(OTRA_CVEC);
        }

        [WebMethod]
        public List<ImagenesVideoReferencia> ConsultaImagenesOTByVideoReferencia(string OTRA_CVEC, string VideoReferencia, string DetIdFilename, string vdo_id)
        {
            ValidateUser();
            return cB_VideotecaDigital.ConsultaImagenesOTByVideoReferencia(OTRA_CVEC, VideoReferencia, DetIdFilename, vdo_id);
        }

        [WebMethod]
        public List<ImagenesVideoReferencia> ConsultaImagenesOTByVideoReferenciaExtraDetalle(string OTRA_CVEC, string VideoReferencia, string DetIdFilename, string vdo_id)
        {
            ValidateUser();
            return cB_VideotecaDigital.ConsultaImagenesOTByVideoReferencia(OTRA_CVEC, VideoReferencia, DetIdFilename, vdo_id);
        }

        [WebMethod]
        public List<PlayListOT> ConsultaPlayListOT(string numOT, string VdoIdFilename)
        {
            ValidateUser();
            return cB_VideotecaDigital.ConsultaPlayListOT(numOT, VdoIdFilename);
        }
        #endregion

        public static int ExecuteCommand(string Command, int Timeout)
        {
            ValidateUserStatic();
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
            catch (Exception)
            {
                CommunicationLib.BasicClient.PathToConfigFile = HttpContext.Current.Request.PhysicalApplicationPath + "bin";
                return -1;
            }
        }
    }
}
