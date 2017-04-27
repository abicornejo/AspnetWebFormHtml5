using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;

namespace FIATubeHtml5.Pages.Consultas
{
    public partial class ConsultaFlexible : BasePage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }
}