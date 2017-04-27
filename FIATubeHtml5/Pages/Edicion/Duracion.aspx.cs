using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using TvAzteca.FiaTube.Bll_FIATube.Relacionales;
using TvAzteca.FiaTube.Entidades;
using System.Collections;

namespace FIATubeHtml5.Pages.Edicion
{
    public partial class Duracion : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static bool uodateLstRequestEditor(IList lista) 
        {
            return MngNegocioSolicitudEditor.ActualizaListaSolicitudEditorHtml5(lista);
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}