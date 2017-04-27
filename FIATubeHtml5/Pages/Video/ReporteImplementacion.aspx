<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ReporteImplementacion.aspx.cs" Inherits="FIATubeHtml5.Pages.Video.ReporteImplementacion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script src="<%=ResolveUrl("~/Scripts/Modulos/Video/ReporteImplementacion.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" />
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
        
    </style>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="divReporteImplButtonsBckgrnd">
        <label class="title varFloatLeft">Local:</label>
        <select id="cmbLocales" name="cmbLocales" class="txtInputMaster varFloatLeft"></select>
        <label class="title varFloatLeft">Semana Inicial:</label>
        <select id="cbSemanaIni" class="txtInputMaster varFloatLeft"></select>
        <label class="title varFloatLeft">Semana Final:</label>
        <select id="cbSemanaFin" class="txtInputMaster varFloatLeft"></select>
        <button class="btnBuscarReporteImplementacion" id="btnBuscar"><a href="#"></a></button>
    </div>
    <div class="contImplementacion">
        
    </div>
</asp:Content>
