using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FIATubeHtml5.Templates
{
    public partial class FIATube : System.Web.UI.MasterPage
    {
        public static string RandomCall = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            /*Codigo utilizado para evitar el cache de los javascripts*/
            Random rand = new Random();
            RandomCall = rand.Next(10000).ToString();
        }
        
    }
}