using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.Collections.Generic;
using System.Text;
using System.Web;
using TvAzteca.FiaTube.Bll_FIATube.Relacionales;
using TvAzteca.FiaTube.Entidades;
using Azteca.Utility.Security;

namespace FIATubeHtml5.ServicesAsmx
{
    /// <summary>
    /// Summary description for WebService_ManejadorErrores
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class WebService_ManejadorErrores : System.Web.Services.WebService
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
            catch
            {
                throw new System.Exception("Usuario no valido");
            }
        }
        #endregion ValidateUser

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

        [WebMethod]
        public void DoWork()
        {
            ValidateUser();
            // Agregue aquí la implementación de la operación
            return;
        }

        [WebMethod]
        public bool GuardarLogError(THE_LogErrores LogError)
        {
            ValidateUser();
            return MngNegocioLogErrores.GuardarLogErrores(LogError);
        }
    }
}
