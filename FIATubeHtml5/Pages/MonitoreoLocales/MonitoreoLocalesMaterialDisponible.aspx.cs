using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FIATubeHtml5.Pages.MonitoreoLocales
{
    public partial class MonitoreoLocalesMaterialDisponible :BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (!IsPostBack)
            string script = "document.getElementsByClassName('modal').style.display = 'block';";
            ScriptManager.RegisterStartupScript(this, GetType(),
                          "ServerControlScript", script, true);
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}