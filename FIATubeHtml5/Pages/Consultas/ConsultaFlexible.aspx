<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ConsultaFlexible.aspx.cs" Inherits="FIATubeHtml5.Pages.Consultas.ConsultaFlexible" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Consultas/ConsultaFlexible.js?Rand="+RandomCall) %>"></script>    
    <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" media="screen"/>
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
        </style>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div  class="modal"></div>
    <div id="HeadConFlexi">
        <div class="ConsFlexButtonsBckgrnd">
            <label class="title" for="txtOT" >OT:</label>
            <input class="txtInputMaster varFloatLeft varWidth9p" id="txtOT" type="text" />

            <label for="cmbLocales" class="title" id = "lbllocales">Locales:</label>
	        <select id="cmbLocales" class="cmbSmall" ></select>

            <label for="cmbSeccion" class="title">Seccion:</label>
            <select id="cmbSecciones" class="cmbSmall"></select>
          
            <label for="txtTexto" class="title">Titulo:</label>
            <input type="text" class="txtInputMaster varFloatLeft varWidth9p" id="txtTexto" name="txtTexto" runat="server"/>
           
            <label class="title" >Fecha Inicial:</label>
            <input type="text" id="dtFechaIni" class="txtFechas2" placeholder="dd/MM/yyyy" readonly="readonly" /><!--PasaValorFechaIni(this.value)-->

            <label class="title">Fecha Final:</label>
            <input id="dtFechaFin" type="text" class="txtFechas2" placeholder="dd/MM/yyyy" readonly="readonly" />       <!--onchange="PasaValorFechaFin(this.value)" -->
        
       
            <button type="button" id="btnBuscarflex" class="btnBuscarflex" title="Buscar"></button>
                    
        </div>
        <div id="contenidoFlex"></div>
    </div>
</asp:Content>
