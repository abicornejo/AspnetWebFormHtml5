using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Xml;
using System.Data;
using System.Configuration;
using Microsoft.Win32;
using System.IO;

namespace FIATubeHtml5.Pages
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        #region "private string ObtenerIPCliente()"
        /// <summary>
        /// Gets the client IP.
        /// </summary>
        /// <returns></returns>
        private string ObtenerIPCliente()
        {
            string IP1 = string.Empty;
            IP1 = Request.ServerVariables["REMOTE_ADDR"].ToString();
            return IP1;
        }
        #endregion

        //protected void btnLogin_Click(object sender, ImageClickEventArgs e)
        //{

        //    XmlDocument xml = new XmlDocument();
        //    DataSet ds = new DataSet();
        //    string Pass_Desencriptado = "";
        //    string userDesencriptado = "";
        //    string IPUsr = ObtenerIPCliente();
        //    Azteca.Utility.Security.Rijndael _ChyperRijndael = new Azteca.Utility.Security.Rijndael();

        //    try
        //    {

        //        string ruta = _ChyperRijndael.Transmute(ConfigurationSettings.AppSettings["LlavePrivada"], Azteca.Utility.Security.enmTransformType.intDecrypt);
        //        string Passphrase = (string)Registry.LocalMachine.OpenSubKey(_ChyperRijndael.Transmute(ConfigurationSettings.AppSettings["Registro"], Azteca.Utility.Security.enmTransformType.intDecrypt)).GetValue("passphrase");
        //        StreamReader stream = new StreamReader(PGPUtil.DesencriptarTexto(txtContraseña.Value,
        //                                 File.OpenRead(ruta),
        //                                 null, Passphrase.ToCharArray()).datos);
        //        StreamReader streamUser = new StreamReader(PGPUtil.DesencriptarTexto(txtUsuario.Value,
        //                                 File.OpenRead(ruta),
        //                                 null, Passphrase.ToCharArray()).datos);

        //        Pass_Desencriptado = stream.ReadToEnd();
        //        userDesencriptado = streamUser.ReadToEnd();

        //        string TipoUsuario = userDesencriptado.ToUpper().Replace("TVA", "").Replace("PTV", "");

        //        if (isNumeric(TipoUsuario))
        //        {
        //            isUserName = false;
        //            UsuarioTVA = userDesencriptado.ToUpper();
        //            usuario = userDesencriptado.ToUpper();
        //        }
        //        else
        //        {
        //            isUserName = true;
        //            usuario = userDesencriptado.ToUpper();
        //            XmlDocument DatosUsua = MgnTDI_Menus.GetUserDataByNumEmpl("", usuario);
        //            string NumUsua = (DatosUsua.GetElementsByTagName("NUMUSUA").Count > 0) ? DatosUsua.GetElementsByTagName("NUMUSUA")[0].InnerText : "";
        //            if (userDesencriptado.ToUpper().Contains("TVA"))
        //                UsuarioTVA = "TVA" + NumUsua;
        //            else if (userDesencriptado.ToUpper().Contains("PTV"))
        //                UsuarioTVA = "PTV" + NumUsua;
        //            else
        //                UsuarioTVA = "TVA" + NumUsua;
        //        }

        //        //Primeras Validacion Tipo de Usuario (Red o TVA)

        //        #region Validaciones de Usuario Bloqueado, Firmado, etc.
        //        IntentosXIP = MngNegocioBloqueoIP.ConsultaUltimoAccesos();

        //        if (ValidaIP(IPUsr, IntentosXIP) >= 10)
        //        {
        //            string strMessage = string.Empty;
        //            strMessage += strMessage == string.Empty ? "" : "<br>";
        //            strMessage += " * Su IP ha sido bloqueada";
        //            strMessage += "<br>";
        //            tdError.InnerHtml = strMessage;
        //            tdError.Visible = true;
        //            txtUsuario.Text = usuario;
        //            GuardaLogAcceso(8);
        //            return;
        //        }


        //        //Aqui se debe de mandar a validar si el usuario esta bloqueado por Intentos fallidos
        //        UserBlock = MngNegocioBloqueoUsuario.ConsultaUsuarioBloqueadoXIdUsuario(usuario.ToUpper().ToString(), "1");
        //        if (UserBlock.Count > 0)
        //        {
        //            //El Usuario ya ha sido bloqueado
        //            string strMessage = string.Empty;
        //            strMessage += strMessage == string.Empty ? "" : "<br>";
        //            strMessage += " * El Usuario ha sido bloqueado por : " + UserBlock[0].TipoBloqueo.DescTipoBloqueo;
        //            strMessage += "<br>";
        //            strMessage += "Favor de Solicitar su desbloqueo por DATASEC";
        //            tdError.InnerHtml = strMessage;
        //            Random random = new Random();
        //            int NumMsgBox = random.Next(-999999999, 999999999);
        //            ClientScript.RegisterStartupScript(Page.GetType(), "AlertBloqueo" + NumMsgBox, "<script>alert('El Usuario ha sido bloqueado por " + UserBlock[0].TipoBloqueo.DescTipoBloqueo + ". Para desbloquearlo deberá realizar la solicitud en DATASEC');</script>");
        //            tdError.Visible = true;
        //            txtUsuario.Text = usuario;
        //            GuardaLogAcceso(9);
        //            return;
        //        }
        //        #endregion

        //        string respuesta = string.Empty;

        //        #region Login
        //        LDAPUser ldapUser = new LDAPUser();

        //        try
        //        {
        //            if (isUserName)
        //                ldapUser = ActiveDirectory.GetCurrentUser2(userDesencriptado.ToUpper(), Pass_Desencriptado);
        //            else
        //            {
        //                ldapUser = ActiveDirectory.GetCurrentUser(userDesencriptado.ToUpper(), Pass_Desencriptado);
        //            }
        //        }
        //        catch { ldapUser = null; }


        //        if (ldapUser != null)
        //        {
        //            if (AutenticaUsuario.Validar("", userDesencriptado, Pass_Desencriptado))
        //            {
        //                XmlDocument UserData = new XmlDocument();
        //                if (isUserName)
        //                    UserData = MgnTDI_Menus.GetUserDataByNumEmpl("", ldapUser.LoginName);
        //                else
        //                {
        //                    UserData = MgnTDI_Menus.GetUserDataByNumEmpl(ldapUser.EmployeeID, "");
        //                    isUserName = true;
        //                }
        //                ObtieneDatosUsuario(UserData);
        //            }
        //            else
        //            { ValidaBloqueosErrorPass(); }
        //        }
        //        else
        //        {

        //            try
        //            {
        //                if (isNumeric(TipoUsuario))
        //                    respuesta = Llave.validaEmpleado(userDesencriptado, Pass_Desencriptado);
        //                else
        //                    respuesta = Llave.validaEmpleado(UsuarioTVA, Pass_Desencriptado);
        //                xml.LoadXml(respuesta);
        //            }
        //            catch (Exception ex)
        //            {
        //                THE_LogErrores oLogErrores = new THE_LogErrores();
        //                TDI_EMPL oEmpl = new TDI_EMPL();
        //                oEmpl.EmpleadoLlavePrimaria = int.Parse(UsuarioTVA.Replace("TVA", "").Replace("PTV", ""));
        //                oLogErrores.CveEmpleado = oEmpl;
        //                oLogErrores.DirIP = IPUsr;
        //                oLogErrores.Error = ex.Message + "\n" + ex.StackTrace.ToString();
        //                oLogErrores.Pantalla = "Default.aspx";
        //                oLogErrores.MachineName = "";
        //                oLogErrores.FechaCreacion = DateTime.Now;
        //                oLogErrores.Dominio = Request.Url.Host.ToLower();
        //                MngNegocioLogErrores.GuardarLogErrores(oLogErrores);
        //            }

        //            if ((respuesta.IndexOf("Respuesta=\"[OK]\"") != -1) || respuesta.IndexOf("0 - [") != -1)
        //            {

        //                //Aqui se debe de mandar a validar si el usuario esta bloqueado por Intentos fallidos
        //                IList<THE_BloqueoUsuario> UserBlockInactivo = MngNegocioBloqueoUsuario.ConsultaUsuarioBloqueadoXIdUsuario(usuario.ToUpper().ToString(), "2");
        //                if (UserBlockInactivo.Count > 0)
        //                {
        //                    //El Usuario ya ha sido bloqueado
        //                    string strMessage = string.Empty;
        //                    strMessage += strMessage == string.Empty ? "" : "<br>";
        //                    strMessage += " * El Usuario ha sido bloqueado por : " + UserBlockInactivo[0].TipoBloqueo.DescTipoBloqueo;
        //                    strMessage += "<br>";
        //                    strMessage += "Favor de Solicitar su desbloqueo por DATASEC";
        //                    Random random = new Random();
        //                    int NumMsgBox = random.Next(-999999999, 999999999);
        //                    ClientScript.RegisterStartupScript(Page.GetType(), "AlertBloqueoInactivo" + NumMsgBox, "<script>alert('El Usuario ha sido bloqueado por " + UserBlock[0].TipoBloqueo.DescTipoBloqueo + ". Para desbloquearlo deberá realizar la solicitud en DATASEC');</script>");
        //                    tdError.InnerHtml = strMessage;
        //                    tdError.Visible = true;
        //                    txtUsuario.Text = usuario;
        //                    GuardaLogAcceso(9);
        //                    return;
        //                }

        //                tdError.Visible = false;
        //                tdError.InnerHtml = "";

        //                string numeroUsuario = xml.FirstChild.ChildNodes[0].Attributes["NumEmp"].Value;
        //                XmlDocument UserData = MgnTDI_Menus.GetUserDataByNumEmpl(numeroUsuario, "");

        //                ObtieneDatosUsuario(UserData);
        //            }
        //            else
        //            {
        //                ValidaBloqueosErrorPass();
        //            }
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        THE_LogErrores oLogErrores = new THE_LogErrores();
        //        TDI_EMPL oEmpl = new TDI_EMPL();
        //        oEmpl.EmpleadoLlavePrimaria = int.Parse(UsuarioTVA.Replace("TVA", ""));
        //        oLogErrores.CveEmpleado = oEmpl;
        //        oLogErrores.DirIP = IPUsr;
        //        oLogErrores.Error = ex.Message + "\n" + ex.StackTrace.ToString();
        //        oLogErrores.Pantalla = "Default.aspx";
        //        oLogErrores.MachineName = "";
        //        oLogErrores.FechaCreacion = DateTime.Now;
        //        oLogErrores.Dominio = Request.Url.Host.ToLower();
        //        MngNegocioLogErrores.GuardarLogErrores(oLogErrores);
        //        this.div_txtUsuario.InnerHtml = "El usuario no tiene permisos para acceder al sistema";
        //        GuardaLogAcceso(2);
        //    }

        //        #endregion

        //}

        public void btnLogin_Click(Object sender, EventArgs e)
        {
            /*Se obtienen los valores de sesion para la aplicacion*/
            Session["numEmpleado"] = 30805;
            //Para desa11
            //Session["numUsuario"] = 345;
            //Para QA
            Session["numUsuario"] = 2966;
            Session["nomUsuario"] = "MIGUEL ANGEL SUSANO GILES";
            Session["userName"] = "MSUSANO";
            Session["userDomain"] = "localhost";
            Session["userIP"] = "127.0.0.1";
            Session["userMachineName"] = "2215Q_LAP";
            Session["userPuestos"] = "153,9"; //se quito 153 para pruebas.
            Session["UserSeccion"] = "8";
            Session["userProducciones"] = "1";

            /*Se guardan los valores de sesion sobre la sesion de HTML5 para su uso desde javascript*/
            //Para Desa11
            //StringBuilder script = new StringBuilder(@" sessionStorage.numUsuario = 345; ");
            //Para QA
            StringBuilder script = new StringBuilder(@" sessionStorage.numUsuario = 2966; ");
            script.Append(@" sessionStorage.nomUsuario = ""MIGUEL ANGEL SUSANO GILES""; ");
            script.Append(@" sessionStorage.userDomain = ""localhost""; ");
            script.Append(@" sessionStorage.userName = ""MSUSANO""; ");
            script.Append(@" sessionStorage.userIP = ""169.254.211.2""; ");
            script.Append(@" sessionStorage.userCelular = ""5536777277""; ");
            script.Append(@" sessionStorage.userMachineName = ""2215Q_LAP""; ");
            script.Append(@" sessionStorage.userPuestos = ""153,9""; "); //se quito 153 para pruebas.
            script.Append(@" sessionStorage.UserSeccion = ""8""; ");
            script.Append(@" sessionStorage.userProducciones = ""1""; ");
            script.Append(@" sessionStorage.userIdLocal = 2; ");
            script.Append(@" sessionStorage.usserCarritoOT= new Array();");
            script.Append(@" sessionStorage.usserCarritoProp= new Array();");
            script.Append(@" sessionStorage.usserCarritoOpen= false;");
            script.Append(@" window.open (""Principal.aspx"", 'mywindow','top=0,left=0,location=0, scrollbars=no,menubar=0,toolbar=0,status=0,width=' + screen.width + ',height=' + screen.height); ");
            script.Append(@" self.close(); ");
            /*Se registra el Script para que sea ejecutado por el cliente y redireccione a la pagina principal*/
            ScriptManager.RegisterStartupScript(this, this.GetType(), "js", script.ToString(), true);
        }
    }
}
