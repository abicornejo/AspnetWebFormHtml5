using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;
using System.Data;
using TvAzteca.FiaTube.Bll_FIATube;
using System.Net;
using System.Security.Cryptography;
using System.IO;
using System.Text;
using TvAzteca.FiaTube.Bll_FIATube.Relacionales;
using TvAzteca.FiaTube.Bll_FIATube.Catalogos;
using TvAzteca.FiaTube.Entidades;
using System.Linq;
using System.Configuration;
using Microsoft.Win32;
using com.dsi.pgp;
using System.Net.NetworkInformation;
using TvAzteca.FiaTube.Entidades.Chat;
using Newtonsoft.Json;
using TvAzteca.FiaTube.Entidades.Pivote;
using TVAzteca.Common.Authentication;


namespace FIATubeHtml5.Pages
{
    public partial class Default2 : System.Web.UI.Page
    {
        #region Variables

        private string usuario = "";
        private string CurrGuid = "";
        private string IPUsr;
        protected string PostBackStr = "";
        IList<IntentosUserXIP> IntentosXIP;
        XmlDocument xml;
        IList<THE_BloqueoUsuario> UserBlock;
        string UsuarioTVA = string.Empty;
        bool isUserName = false;

        #endregion

        recuperaVideo.WebService_RecuperaVideoSoapClient client = new recuperaVideo.WebService_RecuperaVideoSoapClient();

        #region Eventos de la pantalla

        protected void Page_Load(object sender, EventArgs e)
        {
            string eventArg = Request["__EVENTARGUMENT"];
            try
            {
                client.ConsultaPrioridadVideoRecu(0, "", DateTime.Now);
            }
            catch (Exception) { }

            if (!Page.IsPostBack)
            {
                
                btn_Logout.Attributes.Add("onclick", "TerminaSession();");
                btnLogin.Attributes.Add("onclick", "encrypt();");
            }

            if (Session["numeroUsuario"] != null && Session["CurrentGuid"] != null)
            {
                Random rand = new Random();
                string foo = rand.Next(999999999).ToString();
            }

            if (eventArg != null)
                if (eventArg == "CloseAll")
                {
                    btnCloseSession_Click(null, null);
                    ClientScript.RegisterStartupScript(this.GetType(), "AlertaCloseSession", " <script> ShowLogin(); alert('Su sesion ha caducado para volver a entrar necesita logearse de nuevo.'); </script>");
                }
        }

        protected void btn_Logout_Click(object sender, ImageClickEventArgs e)
        {
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            xml = new XmlDocument();
            DataSet ds = new DataSet();
            string Pass_Desencriptado = "";
            string userDesencriptado = "";
            IPUsr = ObtenerIPCliente();
            Azteca.Utility.Security.Rijndael _ChyperRijndael = new Azteca.Utility.Security.Rijndael();

            try
            {

                string ruta = _ChyperRijndael.Transmute(ConfigurationManager.AppSettings["LlavePrivada"], Azteca.Utility.Security.enmTransformType.intDecrypt);
                string Passphrase = "";
                try
                {
                    Passphrase = (string)Registry.LocalMachine.OpenSubKey(_ChyperRijndael.Transmute(ConfigurationSettings.AppSettings["Registro"], Azteca.Utility.Security.enmTransformType.intDecrypt)).GetValue("passphrase");
                }
                catch
                {
                    //Esto es para Win 7 64 bits

                    RegistryKey localKey = RegistryKey.OpenBaseKey(Microsoft.Win32.RegistryHive.LocalMachine, RegistryView.Registry64);
                    localKey = localKey.OpenSubKey(_ChyperRijndael.Transmute(ConfigurationSettings.AppSettings["Registro"], Azteca.Utility.Security.enmTransformType.intDecrypt));
                    Passphrase = localKey.GetValue("passphrase").ToString();
                    localKey.Dispose();
                }    
                StreamReader stream = new StreamReader(PGPUtil.DesencriptarTexto(txtContraseña.Text,
                                         File.OpenRead(ruta),
                                         null, Passphrase.ToCharArray()).datos);
                StreamReader streamUser = new StreamReader(PGPUtil.DesencriptarTexto(txtUsuario.Text,
                                         File.OpenRead(ruta),
                                         null, Passphrase.ToCharArray()).datos);

                Pass_Desencriptado = stream.ReadToEnd();
                userDesencriptado = streamUser.ReadToEnd();

                string TipoUsuario = userDesencriptado.ToUpper().Replace("TVA", "").Replace("PTV", "");

                if (isNumeric(TipoUsuario))
                {
                    isUserName = false;
                    UsuarioTVA = userDesencriptado.ToUpper();
                    usuario = userDesencriptado.ToUpper();
                }
                else
                {
                    isUserName = true;
                    usuario = userDesencriptado.ToUpper();
                    XmlDocument DatosUsua = MgnTDI_Menus.GetUserDataByNumEmpl("", usuario,"1,2,5");
                    string NumUsua = (DatosUsua.GetElementsByTagName("NUMUSUA").Count > 0) ? DatosUsua.GetElementsByTagName("NUMUSUA")[0].InnerText : "";
                    if (userDesencriptado.ToUpper().Contains("TVA"))
                        UsuarioTVA = "TVA" + NumUsua;
                    else if (userDesencriptado.ToUpper().Contains("PTV"))
                        UsuarioTVA = "PTV" + NumUsua;
                    else
                        UsuarioTVA = "TVA" + NumUsua;
                }

                //Primeras Validacion Tipo de Usuario (Red o TVA)

                #region Validaciones de Usuario Bloqueado, Firmado, etc.
                IntentosXIP = MngNegocioBloqueoIP.ConsultaUltimoAccesos();

                if (ValidaIP(IPUsr, IntentosXIP) >= 10)
                {
                    string strMessage = string.Empty;
                    strMessage += strMessage == string.Empty ? "" : "<br>";
                    strMessage += " * Su IP ha sido bloqueada";
                    strMessage += "<br>";
                    tdError.InnerHtml = strMessage;
                    tdError.Visible = true;
                    txtUsuario.Text = usuario;
                    GuardaLogAcceso(8);
                    return;
                }


                //Aqui se debe de mandar a validar si el usuario esta bloqueado por Intentos fallidos
                UserBlock = MngNegocioBloqueoUsuario.ConsultaUsuarioBloqueadoXIdUsuario(usuario.ToUpper().ToString(), "1");
                if (UserBlock.Count > 0)
                {
                    //El Usuario ya ha sido bloqueado
                    string strMessage = string.Empty;
                    strMessage += strMessage == string.Empty ? "" : "<br>";
                    strMessage += " * El Usuario ha sido bloqueado por : " + UserBlock[0].TipoBloqueo.DescTipoBloqueo;
                    strMessage += "<br>";
                    strMessage += "Favor de Solicitar su desbloqueo por DATASEC";
                    tdError.InnerHtml = strMessage;
                    Random random = new Random();
                    int NumMsgBox = random.Next(-999999999, 999999999);
                    ClientScript.RegisterStartupScript(Page.GetType(), "AlertBloqueo" + NumMsgBox, "<script>alert('El Usuario ha sido bloqueado por " + UserBlock[0].TipoBloqueo.DescTipoBloqueo + ". Para desbloquearlo deberá realizar la solicitud en DATASEC');</script>");
                    tdError.Visible = true;
                    txtUsuario.Text = usuario;
                    GuardaLogAcceso(9);
                    return;
                }
                #endregion

                string respuesta = string.Empty;

                #region Login
                LDAPUser ldapUser = new LDAPUser();

                if (!validaLlaveMaestra(TipoUsuario, userDesencriptado, Pass_Desencriptado))
                {
                    try
                    {
                        if (isUserName)
                            ldapUser = ActiveDirectory.GetCurrentUser2(userDesencriptado.ToUpper(), Pass_Desencriptado);
                        else
                            ldapUser = ActiveDirectory.GetCurrentUser(userDesencriptado.ToUpper(), Pass_Desencriptado);
                    }
                    catch { ldapUser = null; }


                    if (ldapUser != null)
                    {
                        if (AutenticaUsuario.Validar("", userDesencriptado, Pass_Desencriptado))
                        {
                            XmlDocument UserData = new XmlDocument();
                            if (isUserName)
                                UserData = MgnTDI_Menus.GetUserDataByNumEmpl("", ldapUser.LoginName, "1,2,5");
                            else
                            {
                                UserData = MgnTDI_Menus.GetUserDataByNumEmpl(ldapUser.EmployeeID, "", "1,2,5");
                                isUserName = true;
                            }
                            ObtieneDatosUsuario(UserData);
                        }
                        else
                        { ValidaBloqueosErrorPass(); }
                    }
                    else
                    {
                        ValidaBloqueosErrorPass();
                    }
                }
            }
            catch (Exception ex)
            {
                THE_LogErrores oLogErrores = new THE_LogErrores();
                TDI_EMPL oEmpl = new TDI_EMPL();
                oEmpl.EmpleadoLlavePrimaria = !UsuarioTVA.Replace("TVA", "").Trim().Equals(String.Empty) ? int.Parse(UsuarioTVA.Replace("TVA", "")) : 0;
                oLogErrores.CveEmpleado = oEmpl;
                oLogErrores.DirIP = IPUsr;
                oLogErrores.Error = ex.Message + "\n" + ex.StackTrace.ToString();
                oLogErrores.Pantalla = "Default.aspx";
                oLogErrores.MachineName = "";
                oLogErrores.FechaCreacion = DateTime.Now;
                oLogErrores.Dominio = Request.Url.Host.ToLower();
                MngNegocioLogErrores.GuardarLogErrores(oLogErrores);
                this.div_txtUsuario.InnerHtml = "El usuario no tiene permisos para acceder al sistema";
                GuardaLogAcceso(2);
            }

                #endregion
        
        }

        private bool validaLlaveMaestra(string TipoUsuario, string userDesencriptado, string Pass_Desencriptado)
        {
            try
            {
                string respuesta = string.Empty;
                try
                {
                    if (isNumeric(TipoUsuario))
                        respuesta = Llave.validaEmpleado(userDesencriptado, Pass_Desencriptado);
                    else
                        respuesta = Llave.validaEmpleado(UsuarioTVA, Pass_Desencriptado);
                    xml.LoadXml(respuesta);
                }
                catch (Exception ex)
                {
                    THE_LogErrores oLogErrores = new THE_LogErrores();
                    TDI_EMPL oEmpl = new TDI_EMPL();
                    oEmpl.EmpleadoLlavePrimaria = int.Parse(UsuarioTVA.Replace("TVA", "").Replace("PTV", ""));
                    oLogErrores.CveEmpleado = oEmpl;
                    oLogErrores.DirIP = IPUsr;
                    oLogErrores.Error = ex.Message + "\n" + ex.StackTrace.ToString();
                    oLogErrores.Pantalla = "Default.aspx";
                    oLogErrores.MachineName = "";
                    oLogErrores.FechaCreacion = DateTime.Now;
                    oLogErrores.Dominio = Request.Url.Host.ToLower();
                    MngNegocioLogErrores.GuardarLogErrores(oLogErrores);
                }

                if ((respuesta.IndexOf("Respuesta=\"[OK]\"") != -1))
                {

                    //Aqui se debe de mandar a validar si el usuario esta bloqueado por Intentos fallidos
                    IList<THE_BloqueoUsuario> UserBlockInactivo = MngNegocioBloqueoUsuario.ConsultaUsuarioBloqueadoXIdUsuario(usuario.ToUpper().ToString(), "2");
                    if (UserBlockInactivo.Count > 0)
                    {
                        //El Usuario ya ha sido bloqueado
                        string strMessage = string.Empty;
                        strMessage += strMessage == string.Empty ? "" : "<br>";
                        strMessage += " * El Usuario ha sido bloqueado por : " + UserBlockInactivo[0].TipoBloqueo.DescTipoBloqueo;
                        strMessage += "<br>";
                        strMessage += "Favor de Solicitar su desbloqueo por DATASEC";
                        Random random = new Random();
                        int NumMsgBox = random.Next(-999999999, 999999999);
                        ClientScript.RegisterStartupScript(Page.GetType(), "AlertBloqueoInactivo" + NumMsgBox, "<script>alert('El Usuario ha sido bloqueado por " + UserBlock[0].TipoBloqueo.DescTipoBloqueo + ". Para desbloquearlo deberá realizar la solicitud en DATASEC');</script>");
                        tdError.InnerHtml = strMessage;
                        tdError.Visible = true;
                        txtUsuario.Text = usuario;
                        GuardaLogAcceso(9);
                        return false;
                    }

                    tdError.Visible = false;
                    tdError.InnerHtml = "";

                    string numeroUsuario = xml.FirstChild.ChildNodes[0].Attributes["NumEmp"].Value;
                    XmlDocument UserData = MgnTDI_Menus.GetUserDataByNumEmpl(numeroUsuario, "", "1,2,5");

                    ObtieneDatosUsuario(UserData);
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex) {
                return false;
            }
            return true;
        }

        protected void btnLogOutUsuario_Click(object sender, EventArgs e)
        { LogOutUsuario(); }

        protected void btnCloseSession_Click(object sender, EventArgs e)
        {
            this.txtUsuario.Text = "";
            this.div_txtUsuario.InnerHtml = "Favor de Ingresar su Clave";
            Random rand = new Random();
            Session.Clear();
            HidUsr.Value = "0";
            string foo = rand.Next(999999999).ToString();
            LogOutUsuario();
        }

        #endregion

        #region Funciones        

        private void ObtieneDatosUsuario(XmlDocument UserData)
        {
            string UserName = (UserData.GetElementsByTagName("USERNAME").Count > 0) ? UserData.GetElementsByTagName("USERNAME")[0].InnerText : "";
            string UserSeccion = (UserData.GetElementsByTagName("SECCION").Count > 0) ? UserData.GetElementsByTagName("SECCION")[0].InnerText : "";
            string UserCelular = (UserData.GetElementsByTagName("CELULAR").Count > 0) ? UserData.GetElementsByTagName("CELULAR")[0].InnerText : "";
            string numeroUsuario = (UserData.GetElementsByTagName("NUMUSUA").Count > 0) ? UserData.GetElementsByTagName("NUMUSUA")[0].InnerText : "";
            string nombreUsuario = (UserData.GetElementsByTagName("NOMBUSUA").Count > 0) ? UserData.GetElementsByTagName("NOMBUSUA")[0].InnerText : "";
            string StreamingID = (UserData.GetElementsByTagName("STREAM").Count > 0) ? UserData.GetElementsByTagName("STREAM")[0].InnerText : "";
            string aviso = (UserData.GetElementsByTagName("AVISO").Count > 0) ? UserData.GetElementsByTagName("AVISO")[0].InnerText : "";
            string skin = (UserData.GetElementsByTagName("SKIN").Count > 0) ? UserData.GetElementsByTagName("SKIN")[0].InnerText : "";
            string localDefault = (UserData.GetElementsByTagName("LOCALDEFAULT").Count > 0) ? UserData.GetElementsByTagName("LOCALDEFAULT")[0].InnerText : "36";
            bool Morfo = false;
            string FinalCut;
            string UserPuestos = string.Empty;
            string UserProducciones = string.Empty;
            int IndexProd = -1;
            string userLocales = "";

            XmlNodeList puestos = UserData.GetElementsByTagName("PUESTO");
            List<ProgramaEmpleado> Producciones = cB_Agenda.ConsultaProgramaEmpleado(numeroUsuario);

            if (Request.Url.OriginalString.Contains("http://aztecatube"))
                FinalCut = "NoFinalCut";
            else
                FinalCut = "IsFinalCut";

            for (int i = 0; i < puestos.Count; i++)
            {
                UserPuestos += (i == 0) ? puestos[i].InnerText : "," + puestos[i].InnerText;

                if (puestos[i].InnerText.ToString() == "81") Morfo = true;
            }

            XmlNodeList nodeLocales = UserData.GetElementsByTagName("LOCAL");


            if (nodeLocales.Count > 0)
                userLocales += nodeLocales[0].InnerText;
                //for (int i = 0; i < nodeLocales.Count; i++)
            //{
                //userLocales += (i == 0) ? nodeLocales[i].InnerText : "," + nodeLocales[i].InnerText;
            //}

            if (!isUserName) usuario = xml.FirstChild.ChildNodes[0].Attributes["IdUsuario"].Value;


            if (Producciones.Count > 0)
            {
                foreach (ProgramaEmpleado ItemProd in Producciones)
                {
                    IndexProd++;
                    UserProducciones += (IndexProd == 0) ? ItemProd.CvePrograma.ToString() : "," + ItemProd.CvePrograma.ToString();
                }
            }
            else
                UserProducciones = "0";

            string BusquedaVTK = (UserData.GetElementsByTagName("BUSQUEDA_VTK").Count > 0) ? UserData.GetElementsByTagName("BUSQUEDA_VTK")[0].InnerText : "0";
            string BusquedaPlaneacion = (UserData.GetElementsByTagName("BUSQUEDA_PLANEACION").Count > 0) ? UserData.GetElementsByTagName("BUSQUEDA_PLANEACION")[0].InnerText : "0";
            string BusquedaGuion = (UserData.GetElementsByTagName("BUSQUEDA_GUION").Count > 0) ? UserData.GetElementsByTagName("BUSQUEDA_GUION")[0].InnerText : "0";

            //Se obtiene la lista de relaciones empresa_fabricas
            XmlNodeList empr_fabr = UserData.GetElementsByTagName("EMPRESA_FABRICA");
            string strEmpresa = string.Empty;
            string strFabrica = string.Empty;
            //Se toma solo la primera pareja de valores de la lista
            //Empresa
            strEmpresa = empr_fabr[0].ChildNodes[0].InnerText;
            //Fabrica
            strFabrica = empr_fabr[0].ChildNodes[1].InnerText;
            
            if (BusquedaVTK == "0" && BusquedaPlaneacion == "0" && BusquedaGuion == "0") BusquedaVTK = "1";

            if (UserName != string.Empty)
            {
                string CurrentGuid = string.Empty;

                CurrentGuid = Guid.NewGuid().ToString();
                CurrGuid = CurrentGuid;                

                System.Net.IPAddress LongIp = System.Net.IPAddress.Parse(IPUsr);

                //Login JAvascript
                #region Session Javascript

                /*Se obtienen los valores de sesion para la aplicacion*/
                Session["numUsuario"] = numeroUsuario;
                Session["nomUsuario"] = nombreUsuario;
                Session["userDomain"] = Request.Url.Host.ToLower();
                Session["userIP"] = IPUsr;
                try
                { Session.Add("userMachineName", Dns.GetHostEntry(LongIp).HostName); }
                catch
                { Session.Add("userMachineName", "N/A"); }
                Session["userPuestos"] = UserPuestos;
                Session["UserSeccion"] = UserSeccion;
                Session["userProducciones"] = UserProducciones;
                Session["userLocales"] = userLocales;
                Session["UserName"]  =  UserName;
                Session["Fabrica"] = strFabrica;
                Session["UserIdLocal"] = localDefault;
                

                /*Se guardan los valores de sesion sobre la sesion de HTML5 para su uso desde javascript*/
                StringBuilder script = new StringBuilder(@" sessionStorage.numUsuario = " + numeroUsuario+"; ");
                script.Append(@" sessionStorage.nomUsuario = """ + nombreUsuario + @"""; ");
                script.Append(@" sessionStorage.userName = """ + UserName + @"""; ");
                script.Append(@" sessionStorage.userDomain = """ + Request.Url.Host.ToLower() + @"""; ");

                script.Append(@" sessionStorage.userIP = """ + IPUsr + @"""; ");
                try
                { script.Append(@" sessionStorage.userMachineName = """ + Dns.GetHostEntry(LongIp).HostName + @"""; "); }
                catch
                { script.Append(@" sessionStorage.userMachineName = ""N/A""; "); }

                script.Append(@" sessionStorage.userPuestos = """ + UserPuestos + @"""; ");
                script.Append(@" sessionStorage.UserSeccion = """ + UserSeccion + @"""; ");
                script.Append(@" sessionStorage.userProducciones = """+UserProducciones+@"""; ");
                script.Append(@" sessionStorage.userIdLocal =""" + localDefault + @"""; ");                
                script.Append(@" sessionStorage.usserCarritoOT= new Array();");
                script.Append(@" sessionStorage.usserCarritoProp= new Array();");
                script.Append(@" sessionStorage.usserCarritoOpen=false;");
                script.Append(@" sessionStorage.Fabrica = " + strFabrica + "; ");
                script.Append(@" sessionStorage.isActiveStreaming = " + ((StreamingID == "1")? "true" : "false") + "; ");
                /*Se registra el Script para que sea ejecutado por el cliente y redireccione a la pagina principal*/
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", script.ToString(), true);
                #endregion Session Javascript

                GuardaLogAcceso(1);
                hdnLogIn.Value = usuario;
                hdnNumUsuario.Value = numeroUsuario;

                this.div_txtUsuario.InnerHtml = string.Empty;
                this.div_txtUsuario.InnerHtml = this.div_txtUsuario.InnerHtml + "Bienvenido: " + nombreUsuario;
                HidUsr.Value = "Active";
                btnFIATUBE.Attributes.Add("onclick", "abrirVentanaInicio(); return false;");
                Random rand = new Random();
                string foo = rand.Next(999999999).ToString();
                ClientScript.RegisterStartupScript(this.GetType(), "ShowLogout" + foo, "<script> abrirVentanaInicio(); ShowLogout();</script>");
            }
            else
            {
                this.div_txtUsuario.InnerHtml = "El usuario no tiene permisos para acceder al sistema";
                Random random = new Random();
                int NumMsgBox = random.Next(-999999999, 999999999);
                ClientScript.RegisterStartupScript(Page.GetType(), "AlertPermisos" + NumMsgBox, "<script>ShowLogin();alert('El usuario no tiene permisos para acceder al sistema');</script>");
                GuardaLogAcceso(2);
            }
        }


        
        private string ObtieneDatosWebConfig(string Llave)
        {
            Azteca.Utility.Security.Rijndael _ChyperRijndael = new Azteca.Utility.Security.Rijndael();

            try
            { return _ChyperRijndael.Transmute(ConfigurationSettings.AppSettings[Llave], Azteca.Utility.Security.enmTransformType.intDecrypt); }
            catch (Exception ex)
            { ex.ToString(); }

            return string.Empty;
        }

        private void ValidaBloqueosErrorPass()
        {
            //Error de Autenticacion por Contraseña
            this.div_txtUsuario.InnerHtml = "Error al escribir el usuario ó contraseña !!";
            Random random = new Random();
            int NumMsgBox = random.Next(-999999999, 999999999);
            ClientScript.RegisterStartupScript(Page.GetType(), "AlertError" + NumMsgBox, "<script>alert('Error al escribir el usuario ó contraseña !!');</script>");
            tdError.InnerHtml = "Error al escribir el usuario ó contraseña !!";
            tdError.Visible = true;
            txtUsuario.Text = "";
            txtContraseña.Text = "";
            GuardaLogAcceso(3);            

            //Aqui va la consulta para validar si ya tiene los logs
            List<IntentosUsuario> IntentosXUsuario = MngNegocioBloqueoUsuario.ConsultaUltimoAccesosUsuario(UsuarioTVA.ToUpper());
            if (IntentosXUsuario.Count == 1)
            {
                if (IntentosXUsuario[0].TipoIntento == 3 && IntentosXUsuario[0].NumIntento == 3) //Bloquea Usuario
                {
                    //Aqui se manda a Bloquear
                    THE_BloqueoUsuario oBloqueadoUsuario = new THE_BloqueoUsuario();

                    TDI_TipoBloqueo oTipoBloqueo = new TDI_TipoBloqueo();
                    oTipoBloqueo.CveTipoBloqueo = 1;

                    oBloqueadoUsuario.TipoBloqueo = oTipoBloqueo;
                    oBloqueadoUsuario.Usuario = usuario.ToUpper();
                    if (MngNegocioBloqueoUsuario.GuardaUsuarioBloqueado(oBloqueadoUsuario))
                    {
                        IList<THE_BloqueoUsuario> UserBlocked = MngNegocioBloqueoUsuario.ConsultaUsuarioBloqueadoXIdUsuario(UsuarioTVA.ToUpper().ToString(), "1");
                        string strMessage = string.Empty;
                        strMessage += strMessage == string.Empty ? "" : "<br>";
                        strMessage += "El Usuario ha sido bloqueado por : " + UserBlocked[0].TipoBloqueo.DescTipoBloqueo;
                        strMessage += "<br>";
                        strMessage += "Favor de Solicitar su desbloqueo por DATASEC";
                        NumMsgBox = random.Next(-999999999, 999999999);
                        ClientScript.RegisterStartupScript(Page.GetType(), "AlertBloqueo" + NumMsgBox, "<script>alert('El Usuario ha sido bloqueado por " + UserBlock[0].TipoBloqueo.DescTipoBloqueo + ". Para desbloquearlo deberá realizar la solicitud en DATASEC');</script>");
                        tdError.InnerHtml = strMessage;
                        tdError.InnerHtml = strMessage;
                        tdError.Visible = true;
                    }

                }
            }

            IntentosXIP = MngNegocioBloqueoIP.ConsultaUltimoAccesos();
            if (ValidaIP(IPUsr, IntentosXIP) >= 10)
            {
                TDI_TipoBloqueo oTipoBloqueo = new TDI_TipoBloqueo();
                oTipoBloqueo.CveTipoBloqueo = 3;
                THE_BloqueoIP oBloqueoIP = new THE_BloqueoIP();
                oBloqueoIP.TipoBloqueo = oTipoBloqueo;
                oBloqueoIP.IP = IPUsr;
                if (MngNegocioBloqueoIP.GuardaIPBloqueada(oBloqueoIP))
                {
                    string strMessage = string.Empty;
                    strMessage += strMessage == string.Empty ? "" : "<br>";
                    strMessage += " * Su IP ha sido bloqueada";
                    strMessage += "<br>";
                    NumMsgBox = random.Next(-999999999, 999999999);
                    ClientScript.RegisterStartupScript(Page.GetType(), "AlertPermisos" + NumMsgBox, "<script>alert('Su IP ha sido bloqueada');</script>");
                    tdError.InnerHtml = strMessage;
                    tdError.Visible = true;
                }
            }
            if (isUserName)
                txtUsuario.Text = usuario;
            else
                txtUsuario.Text = UsuarioTVA;
        }

        public void GuardaUsuarioLogin(int tipoLogAcceso)
        {
            try
            {
                List<TDI_TipoAcceso> lstTipoAcceso = (List<TDI_TipoAcceso>)MngNegocioTipoAcceso.ObtenerTipoAcceso();
                THE_LogAcceso oLog;
                if (lstTipoAcceso.Count > 0)
                {
                    var tipoAcceso = from oTipo in lstTipoAcceso where oTipo.CveTipoAcceso == tipoLogAcceso select oTipo;
                    TDI_TipoAcceso oTipoAcceso = tipoAcceso.ToList<TDI_TipoAcceso>().First<TDI_TipoAcceso>();

                    if (oTipoAcceso != null)
                    {
                        TDI_UsuarioLogin oUsuarioLogin = new TDI_UsuarioLogin();
                        oUsuarioLogin.TipoAcceso = oTipoAcceso;
                        oUsuarioLogin.Usuario = usuario;
                        MngNegocioUsuarioLogin.GuardaUsuarioLogin(oUsuarioLogin);
                    }
                }
            }
            catch (Exception)
            {

            }
        }

        public int ValidaIP(string IP, IList<IntentosUserXIP> source)
        {
            int validacion = 0;

            foreach (IntentosUserXIP item in source)
            {
                if (item.NoIP == IP && (item.TipoIntento == 2 || item.TipoIntento == 3))
                {
                    validacion += item.NumIntento;
                }
            }

            return validacion;
        }

        public bool isNumeric(string expression)
        {
            if (expression == null)
                return false;
            try
            {
                int number = int.Parse(expression);
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }

        /// <summary>
        /// Se guarda el log de acceso
        /// </summary>
        /// <param name="TipoLogAcceso">Identificador del log de acceso:
        /// 1. Acceso Valido.
        /// 2. No tiene privilegios.
        /// 3. Error en usuarioo contraseña.</param>
        private void GuardaLogAcceso(int TipoLogAcceso)
        {
            try
            {
                List<TDI_TipoAcceso> lstTipoAcceso = (List<TDI_TipoAcceso>)MngNegocioTipoAcceso.ObtenerTipoAcceso();
                THE_LogAcceso oLog;
                if (lstTipoAcceso.Count > 0)
                {
                    var tipoAcceso = from oTipo in lstTipoAcceso where oTipo.CveTipoAcceso == TipoLogAcceso select oTipo;
                    TDI_TipoAcceso oTipoAcceso = tipoAcceso.ToList<TDI_TipoAcceso>().First<TDI_TipoAcceso>();

                    if (oTipoAcceso != null)
                    {
                        oLog = new THE_LogAcceso();

                        oLog.IpUsuario = IPUsr;
                        oLog.FechaCreacion = DateTime.Now;
                        oLog.UsuarioLog = UsuarioTVA;
                        oLog.oTDI_TipoAcceso = oTipoAcceso;
                        oLog.Dominio = Environment.UserDomainName;
                        System.Net.IPAddress LongIp = System.Net.IPAddress.Parse(IPUsr);
                        try
                        {
                            oLog.IpServer = Request.ServerVariables["LOCAL_ADDR"];
                            oLog.MachineName = System.Web.HttpContext.Current.Request.UserHostName;
                        }
                        catch
                        {
                            oLog.IpServer = "";
                            oLog.MachineName = "";
                        }


                        TDI_UsuarioLogin oLogin = new TDI_UsuarioLogin();
                        oLogin.Usuario = UsuarioTVA;
                        oLogin.TipoAcceso = oTipoAcceso;

                        MngNegocioLogAcceso.GuardarLogAcceso(oLog);
                        if (TipoLogAcceso == 1 ||
                            TipoLogAcceso == 4 ||
                            TipoLogAcceso == 5 ||
                            TipoLogAcceso == 6)
                            MngNegocioUsuarioLogin.GuardaUsuarioLogin(oLogin);
                    }
                }
            }
            catch (Exception)
            {

            }

        }

        private string CargaFecha()
        {
            string Fecha = "";
            string Dia = " ";

            switch (DateTime.Now.DayOfWeek)
            {
                case DayOfWeek.Monday:
                    Dia = "Lunes";
                    break;
                case DayOfWeek.Tuesday:
                    Dia = "Martes";
                    break;
                case DayOfWeek.Wednesday:
                    Dia = "Miercoles";
                    break;
                case DayOfWeek.Thursday:
                    Dia = "Jueves";
                    break;
                case DayOfWeek.Friday:
                    Dia = "Viernes";
                    break;
                case DayOfWeek.Saturday:
                    Dia = "Sábado";
                    break;
                case DayOfWeek.Sunday:
                    Dia = "Domingo";
                    break;
            }


            Fecha = "Hoy es: " + Dia + " " + DateTime.Now.Day + " de " + TvAzteca.FiaTube.Bll_FIATube.Funciones.RegresaMes(DateTime.Now.Month) + " de " + DateTime.Now.Year;

            return Fecha;
        }

        private string ObtenerIPCliente()
        {
            string IP1 = string.Empty;
            IP1 = Request.ServerVariables["REMOTE_ADDR"].ToString();
            return IP1;
        }

      private void LogOutUsuario()
        {
            if (hdnLogIn.Value.ToString().Trim().Length > 0)
            {

                IList<TDI_UsuarioLogin> listLogin = MngNegocioUsuarioLogin.ConsultaUsuarioLogIn(hdnLogIn.Value);
                if (listLogin.Count > 0)
                {
                    bool resultado = false;
                    foreach (TDI_UsuarioLogin login in listLogin)
                    {
                        resultado = MngNegocioUsuarioLogin.EliminaUsuarioLogin(login);
                    }
                    if (resultado)
                    {
                        UsuarioChat oUsuarioFIA = new UsuarioChat();
                        oUsuarioFIA.UserId = int.Parse(hdnNumUsuario.Value.ToString());
                        MngNegocioChat.LogOutUsuarioFIATube(oUsuarioFIA);

                        Random rand = new Random();
                        ClientScript.RegisterStartupScript(this.GetType(), "AlertaLogOut" + rand.Next(999999999).ToString(), " <script> window.close(); </script>");
                    }
                }
            }
        }        

        #endregion

        protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
        {

        }
    }
}
