using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using FIATubeHtml5.wsFiatube;
using System.Text;

namespace FIATubeHtml5.Pages
{
    public partial class Principal : BasePage
    {
        RptBusquedaAvanzadaMainIpad ResultadoControles = null;
        WebService_FIATubeSoapClient client = new WebService_FIATubeSoapClient();
        private List<TableItem> unsortedList = new List<TableItem>();
        StringBuilder MyDiv = new StringBuilder();
        StringBuilder MyDivPrin = new StringBuilder();
        StringBuilder myDivIntNuevo;
        public int contadorHijo = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    ObtieneDatosBusquedaAvanzada();
                    LlenaMenu();

                }
                catch (Exception ex)
                {
                    logError(ex);
                }
            }
        }
        private void LlenaMenu()
        {
          MenuEmpleado[] Mnu = client.GetMenuEmpleadoHTML5(Session["numUsuario"].ToString());

          if (Mnu != null)
          {
              foreach (MenuEmpleado item in Mnu)
              {
                  TableItem genericItem;
                  genericItem = new TableItem(item.MenuDescription, item.MenuPrimaryKey, Convert.ToInt32(item.MenuDepe), item.MenuHtml5Path, item.MenuHtml5Width, item.MenuHtml5Height);

                  this.unsortedList.Add(genericItem);
              }
              var rootNodes = this.unsortedList.Where(x => x.ParentID == 0);

              // Foreach root node, get all its children and add the node to the HierarchicalDataSource.
              // see bellow how the FindChildren method works
              List <TableItem> tbl = new List<TableItem>();
              foreach (TableItem node in rootNodes)
              {
                  this.FindChildren(node);
                  tbl.Add(node);
                  //Vtbl.Add(node);
              }

              bool bnuevo = false;
              Int32 Contador = 0;
               
              foreach (TableItem node in tbl)
              {
                  
                  if (node.Children.Count > 0)
                  {
                      if (Contador == 0)
                      {
                          MyDivPrin.Append("<div class='divMenu'>");
                          MyDivPrin.Append("<ul class='topnav'> ");
                      
                      }
                      
                      MyDiv.Append("<li>");
                      MyDiv.Append("<a href = '#' class = 'OpenMenu'><span><b>" + node.NodeText + "</b></span></a>");
                      MyDiv.Append("<ul class= 'subnav'>");
                      MyDiv.Append("<div id='conten_" + Contador + "' class = 'OpenMenu'>");
                      bnuevo = true;
                      myDivIntNuevo = new StringBuilder();
                      fncLlenaGrid(node.Children, bnuevo);
                      MyDiv.Append(myDivIntNuevo);
                      MyDiv.Append("</div>");
                      MyDiv.Append("</ul> ");
                      
                      MyDiv.Append("</li>");
                      
                      
                  }
                  Contador++; 
              }
              MyDivPrin.Append(MyDiv);
              MyDivPrin.Append("</ul>");
              MyDivPrin.Append("</div>");
              divMenu.InnerHtml = MyDivPrin.ToString();
          }
        
        }
        private void fncLlenaGrid (List<TableItem> tb, bool Nv)
        {
             foreach (TableItem node in tb)
                {
                    if (node.Children.Count > 0)
                    {
                        myDivIntNuevo.Append("<li>");
                        myDivIntNuevo.Append("<a href = '#' class = 'OpenMenu'>" + node.NodeText + "</a>");
                        myDivIntNuevo.Append("<ul class= 'subnav'>");
                        myDivIntNuevo.Append("<div id='conten_" + contadorHijo + "_hijo' class = 'OpenMenu'>");
                        fncLlenaGrid(node.Children, true);
                        myDivIntNuevo.Append("</div>");
                        myDivIntNuevo.Append("</ul> ");
                        myDivIntNuevo.Append("</li> ");
                        contadorHijo++;
                    }
                    else
                    {

                        myDivIntNuevo.Append("<li> ");
                        var NodePath = "";
                        if (node.NodeLinkAssembly.Substring(node.NodeLinkAssembly.Length - 4) == "aspx")
                            NodePath = node.NodeLinkAssembly + "?Rand=" + new Random().Next(25000);
                        else
                        {
                            if (node.NodeLinkAssembly.Substring(node.NodeLinkAssembly.Length - 1) == "?")
                                NodePath = node.NodeLinkAssembly + "?Rand=" + new Random().Next(25000);
                            else
                                NodePath = node.NodeLinkAssembly + "&Rand=" + new Random().Next(25000);
                        }
                        myDivIntNuevo.Append("<a class='pageItem' data-title='" + node.NodeText + "' data-wdt='" + node.NodeWidth + "' data-hgt='" + node.NodeHeigth + "' data-url='" + NodePath + "' href='#'>" + node.NodeText + "</a>");
                        myDivIntNuevo.Append("</li> ");
                    }
                }

        }
        private void FindChildren(TableItem item)
        {
            // find all the children of the item
            var children = unsortedList.Where(x => x.ParentID == item.NodeID && x.NodeID != item.NodeID);

            // add the child to the item's children collection and call the FindChildren recursively, in case the child has children
            foreach (TableItem child in children)
            {
                item.Children.Add(child);
                FindChildren(child);
            }
        }
        /// <summary>
        /// Funcion que Llena los combos de las herramientas de busqueda avanzada
        /// </summary>
        private void ObtieneDatosBusquedaAvanzada()
        {
            try
            {
                string fabrica = "4";
                ResultadoControles = client.ObtenerDatosBusquedaAvanzada(fabrica, string.Empty);

                //int n = ResultadoControles.Agencia.Length;

                ListItem RowSeleccionar = new ListItem("==SELECCIONE==", "0");

                cmbAgencia.Items.Clear();
                foreach (Agencia ResultAgencia in ResultadoControles.Agencia)
                {
                    ListItem row = new ListItem(ResultAgencia.nombreAgencia, ResultAgencia.cveAgencia.ToString());
                    this.cmbAgencia.Items.Add(row);
                }
                this.cmbAgencia.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbAgencia.Items.Count - 1; r++)
                {
                    if (cmbAgencia.Items[r].Text == "==SELECCIONE==")
                        this.cmbAgencia.Items[r].Selected = true;
                }


                cmbPais.Items.Clear();
                foreach (Pais ResultPais in ResultadoControles.Pais)
                {
                    ListItem row = new ListItem(ResultPais.nombrePais, ResultPais.cvePais.ToString());
                    this.cmbPais.Items.Add(row);
                }
                this.cmbPais.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbPais.Items.Count - 1; r++)
                {
                    if (cmbPais.Items[r].Text == "==SELECCIONE==")
                        this.cmbPais.Items[r].Selected = true;
                }




                this.cmbPrograma.Items.Clear();
                foreach (TDI_Programa Result in ResultadoControles.Programa)
                {
                    ListItem row = new ListItem(Result.NombrePrograma, Result.CvePrograma.ToString());
                    this.cmbPrograma.Items.Add(row);
                }

                this.cmbPrograma.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbPrograma.Items.Count - 1; r++)
                {
                    if (cmbPrograma.Items[r].Text == "==SELECCIONE==")
                        this.cmbPrograma.Items[r].Selected = true;
                }

                this.cmbReportero.Items.Clear();
                foreach (TDI_EMPL Result in ResultadoControles.Reportero)
                {
                    ListItem row = new ListItem(Result.EmpleadoNombre, Result.EmpleadoLlavePrimaria.ToString());
                    this.cmbReportero.Items.Add(row);
                }
                this.cmbReportero.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbReportero.Items.Count - 1; r++)
                {
                    if (cmbReportero.Items[r].Text == "==SELECCIONE==")
                        this.cmbReportero.Items[r].Selected = true;
                }

                this.cmbSeccion.Items.Clear();
                foreach (Secciones Result in ResultadoControles.Secciones)
                {
                    ListItem row = new ListItem(Result.SeccDesc, Result.SeccLlPr.ToString());
                    this.cmbSeccion.Items.Add(row);
                }
                this.cmbSeccion.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbSeccion.Items.Count - 1; r++)
                {
                    if (cmbSeccion.Items[r].Text == "==SELECCIONE==")
                        this.cmbSeccion.Items[r].Selected = true;
                }

                this.cmbTipoPrograma.Items.Clear();
                foreach (Programa Result in ResultadoControles.Tprograma)
                {
                    ListItem row = new ListItem(Result.nombrePrograma, Result.cvePrograma.ToString());
                    this.cmbTipoPrograma.Items.Add(row);
                }
                this.cmbTipoPrograma.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbTipoPrograma.Items.Count - 1; r++)
                {
                    if (cmbTipoPrograma.Items[r].Text == "==SELECCIONE==")
                        this.cmbTipoPrograma.Items[r].Selected = true;
                }
                this.cmbTipoSenal.Items.Clear();
                foreach (Senal Result in ResultadoControles.Senal)
                {
                    ListItem row = new ListItem(Result.nombreSenal, Result.cveSenal.ToString());
                    this.cmbTipoSenal.Items.Add(row);
                }
                this.cmbTipoSenal.Items.Add(RowSeleccionar);
                for (int r = 0; r <= this.cmbTipoSenal.Items.Count - 1; r++)
                {
                    if (cmbTipoSenal.Items[r].Text == "==SELECCIONE==")
                        this.cmbTipoSenal.Items[r].Selected = true;
                }


            }

            catch (Exception ex)
            {
                logError(ex);
                
            }
        }

        protected override string getPath()
        {
            return this.GetType().FullName;
        }
    }

    public class TableItem
    {
        private string nodeText;
        private int nodeID;
        private System.Nullable<int> parentID;
        private List<TableItem> children;
        private string nodeLinkAssembly;
        private int nodeHeigth;
        private int nodeWidth;

        public TableItem(string nodeText, int nodeID, System.Nullable<int> parentID, string nodeLinkAssembly, int nodeWidth, int nodeHeigth)
        {
            this.nodeText = nodeText;
            this.nodeID = nodeID;
            this.parentID = parentID;

            this.children = new List<TableItem>();
            this.nodeLinkAssembly = nodeLinkAssembly;
            this.nodeHeigth = nodeHeigth;
            this.nodeWidth = nodeWidth;
        }


        public string NodeText
        {
            get
            {
                return this.nodeText;
            }
        }
        public System.Nullable<int> ParentID
        {
            get
            {
                return this.parentID;
            }
        }
        public int NodeID
        {
            get
            {
                return this.nodeID;
            }
        }
        public int NodeHeigth
        {
            get
            {
                return this.nodeHeigth;
            }
        }
        public int NodeWidth
        {
            get
            {
                return this.nodeWidth;
            }
        }
        public List<TableItem> Children
        {
            get
            {
                return this.children;
            }
        }

        public string NodeLinkAssembly
        {
            get
            {
                return this.nodeLinkAssembly;
            }
        }
    }
}
