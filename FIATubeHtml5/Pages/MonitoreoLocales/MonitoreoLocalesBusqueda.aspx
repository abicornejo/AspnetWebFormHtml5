<%@ Page EnableEventValidation="false" Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" 
CodeBehind="MonitoreoLocalesBusqueda.aspx.cs" Inherits="FIATubeHtml5.Pages.MonitoreoLocalesBusqueda.MonitoreoLocalesBusqueda" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("../../Scripts/Config/jquery-1.6.3.min.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/MonitoreoLocales/MonitoreoLocalesBusqueda.js?Rand="+RandomCall) %>"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/FixedHeader.js??Rand="+RandomCall) %>" type="text/javascript"></script>
    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" media="screen" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" media="screen"/>
    <style type="text/css">
        input
      {
            -webkit-appearance: textfield !Important;
            padding: 1px !Important;
            background-color: white;
            border: 2px solid #282828;
            border-image: initial !Important;
            -webkit-rtl-ordering: logical !Important;
            -webkit-user-select: text !Important;
            cursor: auto !Important;
        }
        select
        {
            -webkit-appearance: menulist;
            box-sizing: border-box;
            -webkit-box-align: center;
            border: 2px solid #282828 !Important;
            border-image: initial;
            white-space: pre;
            -webkit-rtl-ordering: logical;
            color: black;
            background-color: white;
            cursor: default;
        }
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

<asp:Content  ID="Content3" ContentPlaceHolderID="MainContent" runat="server">      
    <div class="modal"></div>
  

    <div id="divFechas" class="divTblOpcionesBusqueda varMarginTop" style=" width:99%;">
        
        <label>Filtros de busqueda:</label>
        <table>
            <tr><td id="progressbar"></td></tr>
            <tr>
                <td>Local Origen:</td>
                <td><select id="cmbLoclOrig"></select></td>
                <td>Local Destino:</td>
                <td><select id="cmbLoclDest"></select></td>
                <td>Nombre de Material:</td>
                <td><input type="text" runat="server" ID="txtNomMaterial"/></td>
            </tr>
            <tr>
                <td>Estatus:</td>
                <td><select id="ddlStatus"></select></td>
                <td>Transferencias:</td>
                <td>
                    <select id="ddlTipoTransferencia">
                        <option value="0">Actuales</option>
                        <option value="1">Automaticas</option>
                    </select>
                </td>
                <td colspan="2">
                    <table>
                        <tr>
                            <td><label style="float:left;">Entre:</label>
                            <td><input type="text" class="txtFechas2" onchange="PasaValorFechaIni(this.value)" id="dtFechaIni" placeholder="dd/MM/yyyy"/></td>
                            <td><label style="float:left;">y</label></td>
                            <td><input type="text" class="txtFechas2" onchange="PasaValorFechaFin(this.value)" id="dtFechaFin" placeholder="dd/MM/yyyy"/></td></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div> 
 
    
    <div id="divResultados" class="divTblOpcionesBusqueda" style=" width:99%;">
        <asp:Button runat="server" class="btnLimpiar varMarginTop" ID="btnFiltrar"  Text="Filtrar" />
        <button type="button" class="btnLimpiar" id="btnLimpiar" onclick="Limpiar();">Limpiar</button>
        <div id="divTableResultados" class='divTblResultados' style=" width:100%;"></div>
    </div>
   
    <div id="divMenuOpciones"  title="Opciones" style="display:none;">
        <div class="divCambiarPrioridadTones">
            <button class="btnPausarBA moniBtnPausar" title="Pausar" onclick="Pausar();"></button>
            <button class="btnReanudarBA moniBtnReanudar" title="Reanudar" onclick="Reanudar();"></button>
            <button class="btnCancelarBA moniBtnCancelar" title="Cancelar" onclick='Cancelar();'></button>
            <button class="btnReenviarBA moniBtnReenviar" title="Reenviar" onclick='Reenviar();'></button>
        </div>
        <div class="divCambiarPrioridad">
            <label class="lblDivMenuOpciones" >Cambiar Prioridad:</label>
        </div>
        <div class="divCambiarPrioridadTones">
            <button class="btnPrioridadBA" title="Bajo" onclick='CambiarPrioridad(1);'>Bajo</button>
            <button class="btnPrioridadBA" title="Normal" onclick='CambiarPrioridad(2);'>Normal</button>
            <button class="btnPrioridadBA" title="Alto" onclick='CambiarPrioridad(3);'>Alto</button>
            <button class="btnPrioridadBA" title="Muy Alto" onclick='CambiarPrioridad(4);'>Muy Alto</button>
            <%--<label onclick=''>Asignar Horarios</label><br />--%>
        </div>
    </div>
</asp:Content>


