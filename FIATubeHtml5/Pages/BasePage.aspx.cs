using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.recuperaVideo;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;

namespace FIATubeHtml5.Pages
{
    public abstract partial class BasePage : System.Web.UI.Page
    {
        public static string RandomCall = "";

        protected BasePage()
        {
            /*Codigo utilizado para evitar el cache de los javascripts*/
            Random rand = new Random();
            RandomCall = rand.Next(10000).ToString();
            
        }

        protected void saveScreenLog() {
            try
            {
                wsLogs.THE_LogAccesos log = new wsLogs.THE_LogAccesos();

                log.CveEmpleado = new wsLogs.TDI_EMPL();
                log.CveEmpleado.EmpleadoLlavePrimaria = Convert.ToInt32(Session["numUsuario"]);
                log.FechaCreacion = DateTime.Now;
                log.Modulo = this.GetType().BaseType.FullName;
                log.Dominio = Session["userDomain"].ToString();
                log.DirIP = Session["userIP"].ToString();
                log.MachineName = Session["userMachineName"].ToString();

                wsLogs.WebService_ManejadorLogsSoapClient client = new wsLogs.WebService_ManejadorLogsSoapClient();
                client.GuardarLogAccesos(log);
            }
            catch (Exception) { }
        }

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            Valida();
            if(!IsPostBack)
                saveScreenLog();
        }
        protected void Valida()
        {
            if (IsSessionTimedOut() == true)
            {
                string script = "";

                script = script + @"  alert('Su sesion ha caducado para volver a entrar necesita logearse de nuevo.'); isSessionActive = false; parent.isClosedWindow();";

                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", script.ToString(), true);
            }
        }

        protected void showErrorMessage(string message){
            try {
                ScriptManager.RegisterStartupScript(this, this.GetType(), "js", "alertModal('" + message + "');", true);
            }
            catch(Exception ex)
            {
                this.logError(ex);
            }
        }

        protected void logError(Exception ex) 
        {
            try
            {
                StringBuilder error = new StringBuilder();
                wsManejadorErrores.WebService_ManejadorErroresSoapClient client = new wsManejadorErrores.WebService_ManejadorErroresSoapClient();
                /*Se genera la entrada dentro del log de errores*/
                FIATubeHtml5.wsManejadorErrores.THE_LogErrores saveError = new wsManejadorErrores.THE_LogErrores();
                saveError.CveEmpleado = new FIATubeHtml5.wsManejadorErrores.TDI_EMPL();
                saveError.CveEmpleado.EmpleadoLlavePrimaria = int.Parse(Session["numUsuario"].ToString());
                saveError.FechaCreacion = DateTime.Now;
                saveError.Pantalla = getPath();
                saveError.Dominio = Session["userDomain"].ToString();
                saveError.DirIP = Session["userIP"].ToString();
                saveError.MachineName = Session["userMachineName"].ToString();
                error.Append(ex.Message).Append(" ").Append(ex.StackTrace);
                if ( error.ToString().Length >= 4000)
                    saveError.Error = error.ToString().Substring(0, 3999);
                else
                    saveError.Error = error.ToString();

                client.GuardarLogError(saveError);
            }
            catch (Exception) { }
            ScriptManager.RegisterClientScriptBlock(this, this.GetType(), "js", " alert ('" + "Ocurrio un problema al realizar la consulta: " + ex.Message + "') ", true);
        }

        /// <summary>
        /// Metodo que genera un objeto de tipo THE_LogTransacciones
        /// </summary>
        /// <returns>Objeto Transaccion</returns>
        protected THE_LogTransacciones GenerateTransac() 
        {
            THE_LogTransacciones trans = new THE_LogTransacciones();

            try
            {
                trans.DirIP = Session["userIP"].ToString();
                trans.Dominio = Session["userDomain"].ToString();
                trans.MachineName = Session["userMachineName"].ToString();
                trans.Usuario = Session["numUsuario"].ToString();
            }
            catch (Exception ex) {
                this.logError(ex);
            }
            return trans;
        }

        protected wsFiatube.THE_LogTransacciones GenerateTransacWsFiatube()
        {
            wsFiatube.THE_LogTransacciones trans = new wsFiatube.THE_LogTransacciones();

            try
            {
                trans.DirIP = Session["userIP"].ToString();
                trans.Dominio = Session["userDomain"].ToString();
                trans.MachineName = Session["userMachineName"].ToString();
                trans.Usuario = Session["numUsuario"].ToString();
            }
            catch (Exception ex)
            {
                this.logError(ex);
            }
            return trans;
        }

        /// <summary>
        /// Serializes the object into json.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <returns></returns>
        protected string SerializeObjectIntoJson(Object value) 
        {
            string jsonString = string.Empty;
            try
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(value.GetType(), null, int.MaxValue, true, null, false);
                using (MemoryStream ms = new MemoryStream())
                {
                    serializer.WriteObject(ms, value);
                    ms.Flush();
                    byte[] bytes = ms.GetBuffer();
                    jsonString = Encoding.UTF8.GetString(bytes, 0, bytes.Length).Trim('\0');
                }
            }
            catch (Exception ex){
                this.logError(ex);
            }

            return jsonString;
        }

        /// <summary>
        /// Validas the multi seccion.
        /// </summary>
        /// <returns></returns>
        protected bool ValidaMultiSeccion()
        {
            string[] array = Session["userPuestos"].ToString().Split(',');
            bool resp = false;
            foreach (string pto in array)
                if (pto == "63"){
                    resp = true;
                    break;
                }

            return resp;
        }


        /// <summary>
        /// Funcion que valida si el usuario tiene permisos para poder recuperar el video.
        /// </summary>
        /// <returns></returns>
        protected bool PermisosGridZoomRecuperacion()
        {
            if (Session["userPuestos"] == null)
                return false;

            string UserPuestos = Session["userPuestos"].ToString();
            string[] puestos = UserPuestos.Split(',');
            bool salida = false;
            if (puestos.Length > 0)
            {
                foreach (string p in puestos)
                {
                    //Administrador, VIDEOTECA ADMINISTRADOR, EDITOR DE SECCION, JEFE DE INFORMACION, REALIZADOR, ASISTENTE DE EDICION
                    //ASISTENTE DE PRODUCCIÓN, REPORTERO, EDITOR EN CAMPO, VIDEOTECA GENERAL, SOPORTE
                    if (p == "9" || p == "59" || p == "5" || p == "6" || p == "3" || p == "91" || p == "76" || p == "1" || p == "94" || p == "62" || p == "139")
                    {
                        salida = true;
                        break;
                    }
                }
            }
            return salida;
        }


        protected string NumberToTimeFormat(double numericValue)
        {
           double temp = numericValue / 3600;
           int horas = (int)Math.Floor(temp);
           numericValue = numericValue - (horas*3600);
           temp = numericValue / 60;
           int minutos = (int)Math.Floor(temp);
            numericValue = numericValue - (minutos * 60);
            int segundos = (int)Math.Floor((double)numericValue);

            return this.getTwoDigitsFormat(horas.ToString()) + ':' + this.getTwoDigitsFormat(minutos.ToString()) + ":" + this.getTwoDigitsFormat(segundos.ToString());
 
        }


        protected string getTwoDigitsFormat(string valNumber)
        {
            if (Convert.ToInt32(  valNumber) < 10) valNumber = "0" + valNumber;
            return valNumber;
        }

        protected bool IsSessionTimedOut()
        {
            HttpContext ctx = HttpContext.Current;
            if (ctx == null)
                throw new Exception("Este método sólo se puede usar en una aplicación Web");

            //Comprobamos que haya sesión en primer lugar 
            //(por ejemplo si por ejemplo EnableSessionState=false)
            if (ctx.Session == null)
                return true;
            if (Session["numUsuario"] == null)
                return true; 
            
           
            return false;
        }

        /// <summary>
        /// Validas the busqueda videos baneados.
        /// </summary>
        /// <returns></returns>
        protected bool ValidaBusquedaVideosBaneados()
        {
            string[] puestos = Session["userPuestos"].ToString().Split(',');
            bool salida = false;
            if (puestos.Length > 0)
            {
                foreach (string p in puestos)
                {
                    if (p == "9" || p == "59")
                    {
                        salida = true;
                        break;
                    }
                }
            }
            return salida;
        }

        protected virtual string getPath() {
            return string.Empty;
        }
    }
}
