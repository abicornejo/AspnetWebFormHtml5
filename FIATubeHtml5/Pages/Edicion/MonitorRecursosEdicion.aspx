<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="MonitorRecursosEdicion.aspx.cs" Inherits="FIATubeHtml5.Pages.Edicion.MonitorRecursosEdicion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Edicion/MonitorRecursosEdicion.js?Rand="+RandomCall) %>"></script>
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
            margin-bottom:5px !Important;
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
            margin-top:4px !Important;
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
    <div class="divButtonsBckgrndMonitorRecEdicion">   
        <div class="divButtonUno">
            <label class="title">Realizador:</label>
            <select id="cmbRealizador" class="txtInputMaster varFloatLeft"></select>
            <label class="title">Sala:</label>
            <select id="cmbSala" class="txtInputMaster varFloatLeft"></select>
            <label class="title">Programa:</label>
            <select id="cmbPrograma" class="txtInputMaster varFloatLeft"></select>
        
            <input type="button" id="btnBuscarPart1" title="Actualizar" class="btnActualizarMonitorRecEdicion" onclick="btnUpdate_click(); return false;"/>
            <input type="button" id="btnSavePart1" title="Guardar" class="btnGuardarMonitorRecEdicion" onclick="btnSavePart1_click(); return false;"/>
            
        </div>
        <div class="divButtonDos">
            <label class="title">Fecha Inicio:</label>
            <input type="text" id="dtFechaIni" class="txtFechas"/>
            <label class="title">Fecha Fin:</label>
            <input type="text" id="dtFechaFin" class="txtFechas"/>
        </div>
    </div>
    <br />
    <div id="divContenido"></div>
    <br />

    <div id="divPart2">
        <br />
        <div class="divButtonsBckgrndMonitorRecEdicion">
            <div class="divButtonUno">
                <label class="title">Realizador:</label>
                <select id="cmbRealizadorPart2" class="txtInputMaster varFloatLeft" onchange="fillGrid2(false); return false;"></select>
                <label class="title">Sala:</label>
                <select id="cboSalaPart2" class="txtInputMaster varFloatLeft" onchange="fillGrid2(true); return false;"></select>
                <label class="title">Estatus:</label>
                <select id="cboEstatus" class="txtInputMaster varFloatLeft" onchange="fillGrid2(true); return false;"></select>

                <%--<button type="button" id="btnBuscar" title="Buscar" ></button>--%>
                <button type="button" id="btnRefrescarPart2" title="Actualizar" class="btnActualizarMonitorRecEdicion" onclick="btnUpdate2_click(); return false;"></button>
                <button type="button" id="btnAgregarNotas" title="Agregar Notas" class="btnAgregarNotas" onclick="addNotas_click(); return false;"></button>
                <button type="button" id="btnNota" title="Agregar Nota" class="btnAgregarNota" onclick="btnSaveAddOT_click(); return false;"></button>
                <button type="button" id="btnRechazar" title="Rechazar" class="btnRechazarMonitorRecEdicion" onclick="btnRechazar_click(); return false;" ></button>
                <button type="button" id="btnBuscarPart2" title="Guardar Cambios" class="btnGuardarMonitorRecEdicion"></button>
                
            </div>
            <div class="divButtonDos">
                <label class="title">Programa:</label>
                <select id="cboProgramaPart2" class="txtInputMaster varFloatLeft" onchange="fillGrid2(true); return false;"></select>
                <label class="title">Fecha de Transmisi&oacute;n:</label>
                <input type="text" id="dtFechaPart2" class="txtFechas2" onchange="fillGrid2(true); return false;" />
                <label class="title">Secci&oacute;n:</label>
                <select id="cboSeccion" class="txtInputMaster varFloatLeft" onchange="fillGrid2(true); return false;"></select>
                </div>
        </div>
        <br />
        <div id="divContenido2" ></div>
    </div>

    <div id="divRealizadores" title="Realizadores" style="display:none;">
        <iframe width="500px" height="500px" id="ifrmRealizadores"></iframe>
    </div>
    <div id="divComentarios" title="Comentarios Monitor" style="display:none;">
        <button type="button" id="btnSaveComment" title="Guardar" onclick="btnSaveComment_click(); return false;"></button>
        <br />
        <textarea rows="8" style="width:250px;" id="txtCooments"></textarea>
    </div>

    <div id="divAddOT" title="Agregar nota" style="display:none;">
        <div class="modal" id="mimodal1" style="display:none;"></div>
        <br />
        <button type="button" id="btnSaveAddNota" title="Guardar" onclick="saveAddNota(); return false;"></button>
        <button type="button" id="btnSearchAddNota" title="Buscar" onclick="searchAddNota(); return false;"></button>
        <br />
        <label>OT:</label>
        <input type="text" id="txtAddNota" />

        <label>Fecha:</label>
        <input type="text" id="dtAddNota" readonly="readonly"/>

        <label>Programa:</label>
        <select id="cmbPrgAddNota"></select>
        <br />
        <br />
        <div id="divContenido3" ></div>
    </div>

    <div id="divAddNotas" title="Agregar M&uacute;ltiples Ediciones" style="display:none;">
        <div class="modal" id="mimodal2" style="display:none;"></div>
        <button type="button" id="btnSaveMulNot" title="Guardar" onclick="btnSaveMulNot_click(); return false;"></button>
        <br />
        <label>Nombre de las OT's:</label>
        <input type="text" id="txtNomOtsMulNot"/>
        <br />
        <label>Para agregar m&aacute;s de una OT se deben separar por comas.</label>
        <br />
        <label>Prgrama:</label>
        <select id="cmbProgramaMulNot"></select>
        <br />
        <label>Fecha:</label>
        <input type="text" id="dtFechaMulNot" />
    </div>
</asp:Content>
