using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;
using Newtonsoft.Json;
using FIATubeHtml5.recuperaVideo;

namespace FIATubeHtml5.Pages
{
    public partial class DemoDrop : System.Web.UI.Page
    {
        #region "Variables"
        private bool existeLoading;


        WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
        WebService_RecuperaVideoSoapClient prioridad = new WebService_RecuperaVideoSoapClient();

        private bool isUserGrant;
        private bool isUserGrantAdquisi;
        private BusquedaAvanzada oBusquedaAvan;
        private Play_Out_Shares playOutShare;
        private AgendaOT oAgendaOT;
        #endregion

        protected void Page_Load(object sender, EventArgs e)
        {
            string ruta = Request.ApplicationPath;
           
                
        }

        //protected void Button1_Click(object sender, EventArgs e)
        //{
        //    TDI_LocalEmpleado[] LocalesEmpreado = client.ObtenerLocalesEmpleado(Convert.ToInt32(Session["numUsuario"]));
        //    //THE_MaterialLocal[] MaterialSol = client.ObtenerMaterialLocal(0, oAgendaOT.OtraCvec);
        //    TDI_ProgramaEmpleado[] ProgramaEmple = client.ConsultaProgramaEmpleado(0, Convert.ToInt32(Session["numUsuario"])); //

        //    if (LocalesEmpreado.Length > 0)
        //    {
        //        //this.DDLLocalesDestino.DataSource = LocalesEmpreado;
        //        //DDLLocalesDestino.DataTextField = "Local.LocalDescripcion";
        //        //DDLLocalesDestino.DataValueField = "Local.LocalLlave"; 
        //        //DDLLocalesDestino.DataBind();
        //        foreach (TDI_LocalEmpleado r in LocalesEmpreado)
        //        {
        //            ListItem row = new ListItem(r.Local.LocalDescripcion, r.Local.LocalLlave.ToString());
        //            cmbLocalDestino.Items.Add(row);

        //            this.DDLLocalesDestino.Items.Add(row);

        //        }
        //        cmbLocalDestino.DataBind();
        //    }
        //    else
        //    {
        //        throw new Exception("No se logro obtener las locales asosiadas a tu usuario");
        //    }

        //    //if (MaterialSol.Length > 0)
        //    //{
        //    //    foreach (THE_MaterialLocal r in MaterialSol)
        //    //    {
        //    //        ListItem row = new ListItem(r.CveLocal.ToString(), r.Descripcion);

        //    //        cmbLocalOrigen.Items.Add(row);
        //    //    }
        //    //}
        //    //else
        //    //{
        //    //    throw new Exception("No se encontro el origen del material");

        //    //}

        //    if (ProgramaEmple.Length > 0)
        //    {
        //        StringBuilder RegistrosT = new StringBuilder();
        //        foreach (TDI_ProgramaEmpleado r in ProgramaEmple)
        //        {
        //            ListItem row = new ListItem(r.CvePrograma.NombrePrograma, r.CvePrograma.CvePrograma.ToString());
        //            row.Attributes.Add("data-Abrev2", r.CvePrograma.Abreviatura2);
        //            cmbPrograma.Items.Add(row);
             
        //            //StringBuilder Registro = new StringBuilder();
        //            //Registro.Append(@"<option  value=""").Append(r.CvePrograma.CvePrograma.ToString())

        //            //    .Append(@""" >")
        //            //    .Append(r.CvePrograma.NombrePrograma.ToString())
        //            //    .Append("</option>");


        //            //RegistrosT.Append(Registro);
        //        }
        //     //  this.cmbPrograma.InnerHtml = RegistrosT.ToString();
        //    }
        //    else
        //    {
        //        throw new Exception("No se logro obtener los programas asociados a tu usuario.");
        //    }
        //}
    }
}