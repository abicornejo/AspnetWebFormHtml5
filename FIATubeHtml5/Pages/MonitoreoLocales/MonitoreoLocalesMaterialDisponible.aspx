<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="MonitoreoLocalesMaterialDisponible.aspx.cs" Inherits="FIATubeHtml5.Pages.MonitoreoLocales.MonitoreoLocalesMaterialDisponible" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
 
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <style type="text/css">
       
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
            clear:none !Important;
	        width: auto !Important;
	        height: 22px !Important;
	        line-height: 22px !Important;
	        margin-top:5px;
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
            .dataTables_wrapper {
                    position: relative !Important;
                    clear: both !Important;
                    zoom: 1 !Important;
                    background-color: #505050 !Important;
                    padding-bottom:1px;
                }
                 table.display thead th
                {
                    border-bottom: 0px solid black !Important;
                    font-weight: bold !Important;
                    cursor: pointer !Important;
                }
                table.display tfoot th
                {
                    padding: 0px 18px 0px 10px !Important;
                    border-top: 0px solid black !Important;
                    font-weight: bold !Important;
                }                                                              
                .dataTables_info
                {
                    margin-top:10px !Important;
                    clear:both !Important;
                }
                .dataTables_scroll
                {
                    clear: both;
                    margin-top: 16px;
                }
                .dataTables_length
                {
                    margin-top:10px;
                    float:left !Important;
                    width:20% !Important;
                }
                .dataTables_filter
                {
                    margin:10px 0px !important;
                    width: 20% !Important;
                    float: left !Important;
                    text-align: right !Important;
                }
                input[type="text"], select, textarea
                {
                    border:2px solid #282828 !Important;
                }
                .AgDiariaTitle
                {
	                font-size:1em;
	                margin-top:5px;
	                text-decoration:underline;
	                float:left;
                }
                .btnActualizar
                {
	                float:right;
	                height: 30px;
	                width:30px;
	                margin-top:-7px;
	                border:0px solid #1F1F1F;
                    border-left:1px solid #969696;
	                background-color:transparent;
	                background-repeat: no-repeat;
	                background-position: center;
	                background-image: url('../../Styles/images/icoRELOAD.png');
                }
                .btnActualizar:hover
                {
	                background-color:#1e1e1e;
                }
            
   /* .modal {
        display:    none;
        position:   fixed;
        z-index:    1000;
        top:        0;
        left:       0;
        height:     100%;
        width:      100%;
        background-color:#000;
        background-image: url('../../Images/image-loading.gif');
        background-position: 50% 50%;
        background-repeat: no-repeat;
        opacity: 0.80;
        -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity = 80);
        filter: alpha(opacity = 80);
       };
       */
        
</style>


 <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/MonitoreoLocales/MonitoreoLocalesMaterialDisponible.js?Rand="+RandomCall) %>"></script>    
 <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
 <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
 <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>
 <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/jquery.MetaData.js?Rand="+RandomCall) %>"></script>
 <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/jquery.rating.js?Rand="+RandomCall) %>"></script>

    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../Styles/jquery.rating.css" />
 
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">  
    <%--<div class="modal" id="mimodal" style="display:none;"></div> --%>
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true"></asp:ScriptManager>
    
    <div id="PrincipalMaterialAdispo">
        <div id="Filtros">
            <div class="divButtonsBckgrndMaterialDisponible">
                <label for="cmbLocales" class="title" id = "lbllocales">Locales:</label>
	            <select id="cmbLocales" class="cmbLocales" onchange = "cmbLocales_SelectionChanged();" ></select>

                <label class="title">Semana:</label>
                <input type="text" id="dtFecha" class="txtFechas2" onchange="dtFecha_change();" placeholder="dd/MM/yyyy" />

                <label for="txtTexto" class="title">Texto:</label>
                <input type="text" class="txtInputMaster varFloatLeft" id="txtTexto" name="txtTexto" runat="server"/>
                
                <label for="chkViewSinOT" class="title">Ver solo material distinto a notas.</label>
                <input type="checkbox" id="chkViewSinOT" class="varFloatLeft" onchange="chkChange(); return false;" />
       
                <label class="title">Rating:</label>
                <div id='divRating' class="varFloatLeft">
                </div>

                
                <label class="AgDiariaTitle" id="litDia2" onmouseup = "doSomething(event);" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></label>
                <button type="button" class="btnDownload" id="btnDescargar" title="Descargar Seleccionados"></button>
                <button type="button" id="btnBuscarJs" class="btnBuscarMonitoreo" title="Buscar"></button>
         
            </div>
        </div>
        <br />
    
        <br /><br />
        <div class="contentMaterialDisponible" style=" width:100%;">
        </div>
    <div id="ModalDescargas">
        <p>
            <label class="">Programa:</label>
            <span id="programaMatDispo">
                <select id="cmbProgramEmpl"></select>
            </span>
        </p>
        <p>
            <label class="">Destino:</label>
            <span id="destinoMatDispo">
                <select id="cmbLocalesEmpl"></select>
            </span>
        </p> 
        <p>
            <button type="button" id="btnTodownLoad">Aceptar</button>
            <button type="button" id="btnCancelDescarga">Cancelar</button>
        </p>   
    </div>
   </div>
</asp:Content>
