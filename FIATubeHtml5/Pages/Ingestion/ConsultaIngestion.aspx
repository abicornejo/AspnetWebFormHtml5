<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ConsultaIngestion.aspx.cs" Inherits="FIATubeHtml5.Pages.Ingestion.ConsultaIngestion1" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Ingestion/ConsultaIngestion.js?Rand="+RandomCall) %>"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" media="screen"/>

    <style type="text/css">
        .Error
        {
            background-color:Red; 
            width:100%; 
            height:100%;
        }
         .paging_full_numbers
        {
            float:right !Important;
            clear:both !Important;
	        width: 380px !Important;
	        height: 22px !Important;
	        line-height: 22px !Important;
            margin-bottom:10px !Important;
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
	        background-color: rgba(30, 30, 30, 0.6) !Important;
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
        .dataTables_info
        {
            margin-top:10px !Important;
        }
        .dataTables_length
        {
            margin-top:10px;
            float:left !Important;
            width:20% !Important;
        }
        .dataTables_filter
        {
            margin-top:10px;
            width: 20% !Important;
            float: left !Important;
            text-align: right !Important;
        }
        div.DTTT_container
        {
            width: auto !Important;
            float: right !Important;
            padding: 5px 10px 5px 10px !Important;
            margin-bottom: 5px !Important;
            font-weight: bold !Important;
        }
            button.DTTT_button {
	            position: relative !Important;
	            float: left !Important;
	            height: 30px !Important;
	            margin-right: 3px !Important;
	            padding: 3px 30px 3px 3px !Important;
	            border: 0px solid #d0d0d0 !Important;
	            background-color: Transparent !Important;
	            color:#DCDCDC !Important;
	            cursor: pointer !Important;
	            *cursor: hand !Important;
            }            
                button.DTTT_button_copy
                {
	                padding-right: 30px !Important;
	                background: url('../../Styles/images/icoDUPLICARLg.png') no-repeat center right !Important;
                }

                button.DTTT_button_copy_hover {
	                padding-right: 30px !Important;
	                border: 0px solid #999999 !Important;
	                background: url('../../Styles/images/icoDUPLICARLghover.png') no-repeat center right !Important; 
                }
                button.DTTT_button_csv
                {
	                padding-right: 30px !Important;
	                background: url(../../Styles/images/icoCSVLg.png) no-repeat center right !Important;
                }

                button.DTTT_button_csv_hover
                {
	                padding-right: 30px !Important;
	                border: 0px solid #999 !Important;
	                background: url(../../Styles/images/icoCSVLgHover.png) no-repeat center right !Important;
                }
                button.DTTT_button_xls
                {
	                padding-right: 30px !Important;
	                background: url(../../Styles/images/icoXLSLg.png) no-repeat center right !Important;
                }

                button.DTTT_button_xls_hover
                {
	                padding-right: 30px !Important;
	                border: 0px solid #999 !Important;
	                background: url(../../Styles/images/icoXLSLgHover.png) no-repeat center right !Important;
                }
                button.DTTT_button_pdf
                {
	                padding-right: 30px !Important;
	                background: url(../../Styles/images/icoPDFLg.png) no-repeat center right !Important;
                }

                button.DTTT_button_pdf_hover
                {
	                padding-right: 30px !Important;
	                border: 0px solid #999 !Important;
	                background: url(../../Styles/images/icoPDFLgHover.png) no-repeat center right !Important;
                }

                button.DTTT_button_print
                {
	                padding-right: 30px !Important;
	                background: url('../../sTYLES/images/icoPRINTLg.png') no-repeat center right !Important;
                }

                button.DTTT_button_print_hover
                {
	                padding-right: 30px !Important;
	                border: 0px solid #999999 !Important;
	                background: url('../../Styles/images/icoPRINTLghover.png') no-repeat center right !Important;
                }
        .ui-dialog-title
        {
            width:90% !Important;
            overflow:hidden !Important;
        }
    </style>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <br />
    <div>
        <label>OT:</label>
        <input type="text" id="txtOT" />

        <label>Fecha:</label>
        <input type="text" id="dtFechaIni" />
        <label>A:</label>
        <input type="text" id="dtFechaFin" />

        <label id="lblLocal">Local:</label>
        <select id="cmbLocal" onchange="local_changes(); return false;"></select>

        <label>Secci&oacute;n:</label>
        <select id="cmbSeccion"></select>

        <label>Tipo:</label>
        <select id="cmbTipoIngestion"></select>

        <button type="button" id="btnNew" title="Nuevo" onclick="nuevaIngestion(); return false;"></button>
        <button type="button" id="btnUpdate" onclick="updateData(); return false;" title="Actualizar"></button>
    </div>

    <br />
    <div id="divContent">
    
    </div>
</asp:Content>
