using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FIATubeHtml5.Pages.Shopping_Car
{
    public partial class ShoppingCar : BasePage
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