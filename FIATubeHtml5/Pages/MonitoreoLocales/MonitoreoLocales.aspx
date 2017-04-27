<%@ Page EnableEventValidation="false" Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" 
CodeBehind="MonitoreoLocales.aspx.cs" Inherits="FIATubeHtml5.Pages.MonitoreoLocales.MonitoreoLocales" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <style>
        .ui-widget-content 
        {
            background-color: rgba(20, 20, 20, 0.85) !Important;
        }
        .ui-dialog .ui-dialog-titlebar
        {
            background-color: rgba(100, 100, 100, 0.2) !Important;
        }
        .paging_full_numbers
        {
            float:right !Important;
            clear:both !Important;
	        width: 280px !Important;
	        height: 22px !Important;
	        line-height: 22px !Important;
        }
        .paging_full_numbers a.paginate_button,
 	    .paging_full_numbers a.paginate_active
 	    {
 	        float:left;
	        border: 0px solid #aaaaaa !Important;
	        -webkit-border-radius: 0px !Important;
	        -moz-border-radius: 0px !Important;
	        padding: 2px 5px !Important;
	        margin: 0 3px !Important;
	        cursor: pointer !Important;
	        *cursor: hand !Important;
	        color: #FFFFFF !important;
            font-weight:bold;
        }
        .paging_full_numbers a.paginate_button {
	        background-color: Transparent !Important;
        }

        .paging_full_numbers a.paginate_button:hover {
	        background-color: rgba(30, 30, 30, 0.2) !Important;
	        text-decoration: none !Important;
        }    
        .paging_full_numbers a.paginate_active {
	        background-color: rgba(30, 30, 30, 0.5) !Important;
        }
            
            .next 
            { 
                float: left !Important;
                height: 20px !Important;
                width: 20px !Important;
                border: 0px solid #1F1F1F !Important;
                background-color:transparent !Important;
                background-repeat: no-repeat !Important;
                background-position: center !Important;
                background-image: url('../../Styles/images/icoSIGUIENTE.png')!Important;
            }
            .last 
            { 
                float: left !Important;
                height: 20px !Important;
                width: 20px !Important;
                border: 0px solid #1F1F1F !Important;
                background-color:transparent !Important;
                background-repeat: no-repeat !Important;
                background-position: center !Important;
                background-image: url('../../Styles/images/icoGONEXT.png')!Important;
            }
            .first 
            { 
                float: left !Important;
                height: 20px !Important;
                width: 20px !Important;
                border: 0px solid #1F1F1F !Important;
                background-color:transparent !Important;
                background-repeat: no-repeat !Important;
                background-position: center !Important;
                background-image: url('../../Styles/images/icoGOBACK.png')!Important;
            }
            .previous 
            { 
                float: left !Important;
                height: 20px !Important;
                width: 20px !Important;
                border: 0px solid #1F1F1F !Important;
                background-color:transparent !Important;
                background-repeat: no-repeat !Important;
                background-position: center !Important;
                background-image: url('../../Styles/images/icoANTERIOR.png')!Important;
            }
            


    </style>
    
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("../../Scripts/Config/jquery-1.6.3.min.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/MonitoreoLocales/MonitoreoLocales.js?Rand="+RandomCall) %>"></script>    
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Maps/jquery-jvectormap.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Maps/world-en.js?Rand="+RandomCall) %>"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>

    <link rel="Stylesheet" type="text/css" media="screen" href="../../Styles/Maps/jquery-jvectormap.css"/>
    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" media="screen"/>
</asp:Content>

<asp:Content  ID="Content3" ContentPlaceHolderID="MainContent" runat="server">   
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>             
        
    <div id="divPpal">
		<div id="divMapContent" style="float:left">
            <div id="divMap" style="width: 937px; height: 400px; position: relative; overflow: hidden; background-color: #262626;"></div>
        </div>
        <div id="divMapDetail" class="divMapDetail">
            <div id="divRightMenu" class="divRightMenu">
                <button id='btnCloseDetail' class='btnCerrarMonitoreo' type='button' onclick='BorraTodo();' style='position:relative;top:0px;left:0px;'/>
            </div>
        </div>
                    
        <div id="carrousel" class="carrousel" data-pos="0" style="display:none;"> 
            <div id="adsCarrusel" class="carrousel_inner">
                <div style="width:500px;">
                    <div class="divReporteImagen"><img class="varFloatReporte" src="../../Images/iconReporte.png" onmouseover='this.style.background="#A4A4A4"' onmouseout='this.style.background=""' title="B&uacute;squeda Avanzada" onclick='goToAdvanceSearch();'/><label class="varFloatReporteLabel">B&uacute;squeda</label><br/></div>
                    <div class="divReporteImagen"><img class="varFloatReporte" src="../../Images/iconReporte.png" onmouseover='this.style.background="#A4A4A4"' onmouseout='this.style.background=""' title="Reporte de Material" onclick='PintaReporteMatLoc();'/><label class="varFloatReporteLabel">Material</label><br/></div>
                    <div class="divReporteImagen"><img class="varFloatReporte" src="../../Images/iconReporte.png" onmouseover='this.style.background="#A4A4A4"' onmouseout='this.style.background=""' title="Reporte de Storage" onclick='PintaReporteAnchoBanda();' ><label class="varFloatReporteLabel">Storage</label><br/></div>
                </div>
            </div>
        </div>
        
        <div id="divBotones" class="divBotonesMonitoreo">
            <div class="divSeccMonitoreo">
                <label class="varFloatLeft">Origen</label>
                <select id="ddlFiltroOrig" class='cmbMonitoreo' onchange='PasaValor(this.value)'></select>
            </div>
            <div class="divSeccMonitoreo">
            <asp:HiddenField runat="server" ID="hdfValor" />
            <asp:HiddenField  runat="server" ID="hdfOrig"/>      
            <asp:HiddenField  runat="server" ID="hdfDest"/> 
            <asp:HiddenField  runat="server" ID="hdfEst"/>      
            <asp:HiddenField  runat="server" ID="hdfFecIni"/>      
            <asp:HiddenField  runat="server" ID="hdfFecFin"/>  
            </div>
            <div class="divSeccMonitoreo">
                <label class="varFloatLeft">Estatus:</label>
                <select id="cmbEstatus" class="cmbMonitoreo"></select>
            </div>
            <div class="divSeccMonitoreo">
                <label class="varFloatLeft" >Fecha Inicial:</label>
	            <input type="text"  class="txtFechas" id="dtFechaIni" placeholder="dd/MM/yyyy"/>
            </div>
            <div class="divSeccMonitoreo">
                <label class="varFloatLeft" >Fecha Final:</label>
	            <input type="text"  class="txtFechas" id="dtFechaFin" placeholder="dd/MM/yyyy"/>
            </div>
            <label class="varMarginTop4">Tiempo de Actualizaci&oacute;n:</label>
            <select class="varMarginTop4" id="cmbTiempoAct" onchange="cmbTiempoAct_changed();">
                <option value="0.25">15 seg</option>
                <option value="0.5">30 seg</option>
                <option value="1" selected="selected">1 min</option>
                <option value="2">2 min</option>
                <option value="3">3 min</option>
                <option value="4">4 min</option>
                <option value="5">5 min</option>
            </select>
            <button type="button" id="btnBuscarJs" class="btnBuscarMonitoreo" title="Buscar"></button>
            <button type="button" id="btnRefrescarJs" class="btnActualizarMonitoreo" title="Actualizar" onclick="refresh();"></button>
            
            <asp:UpdatePanel runat="server" ID="udtPaneInformacionMatlsol" class="divInformacionMatlsol">
            <ContentTemplate>
                <asp:Button  ID="btnBuscar" CssClass="hideButton" OnClick="Buscar_Click" OnClientClick="setFilters();" runat="server" ></asp:Button>
              
            <div id="divContentInfo" style="float:left">
                <div id="divTabs" style="width:950px; height:auto; overflow:auto;">
	            <ul>
		            <li><a href="#tabs-1">Enviadas</a></li>
		            <li><a href="#tabs-2">Recibidas</a></li>
	            </ul>
	            <div id="tabs-1" class="divTabs1">
                   
                
		           <%-- <div class="divInformacionMatlsolTabla">
                        <div class="divTblResultadosHeaderTitle9">MOVIMIENTO</div>
                        <div class="divTblResultadosHeaderTitle9">NOMBRE ARCHIVO</div>
                        <div class="divTblResultadosHeaderTitle9">FECHA INICIO</div>
                        <div class="divTblResultadosHeaderTitle9">FECHA TERMINO</div>
                        <div class="divTblResultadosHeaderTitle9">VISUALIZACION</div>
                        <div class="divTblResultadosHeaderTitle9">ORIGEN</div>
                        <div class="divTblResultadosHeaderTitle9">DESTINO</div>
                        <div class="divTblResultadosHeaderTitle9">ESTATUS</div>--%>
                        <%--<div class="divTblResultadosHeaderTitle9">VER UBICACION</div> ya estaba --%>
                    <%--</div>
                    <div runat="server" visible="true" id ="DivInformacionMatlsol" class="divInformacionMatlsol"></div>--%>
	            </div>
	            <div id="tabs-2" class="divTabs2">
		            <%--<div class="divInformacionMatlsolTabla">
                        <div class="divTblResultadosHeaderTitle9">MOVIMIENTO</div>
                        <div class="divTblResultadosHeaderTitle9">NOMBRE ARCHIVO</div>
                        <div class="divTblResultadosHeaderTitle9">FECHA INICIO</div>
                        <div class="divTblResultadosHeaderTitle9">FECHA TERMINO</div>
                        <div class="divTblResultadosHeaderTitle9">VISUALIZACION</div>
                        <div class="divTblResultadosHeaderTitle9">ORIGEN</div>
                        <div class="divTblResultadosHeaderTitle9">DESTINO</div>
                        <div class="divTblResultadosHeaderTitle9">ESTATUS</div>--%>
                        <%--<div class="divTblResultadosHeaderTitle9">VER UBICACION</div>ya estaba--%>
                   <%-- </div>
                    <div runat="server" visible="true" id ="DivInformacionMatlsolDest" class="divInformacionMatlsol"></div>--%>
                  
	            </div>
            </div>
            </div>  
        </ContentTemplate>
    </asp:UpdatePanel>  
    </div>
    </div>
    <div id="divReportes"></div>
</asp:Content>





