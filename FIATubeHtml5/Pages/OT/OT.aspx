<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="OT.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.OT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
<title>Creaci&oacute;n de OT</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs.js?Rand="+RandomCall) %>"></script>
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/OT.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
	<div class="otButtonsBckgrnd">
        <div class="TxtHidden">
            <input type="hidden" id="hiddSeccAsig" runat="server" />
	        <label for="txtNumOT" class="txtstatus"></label>
	        <label id="txtNumOT" class="txtstatus"></label>
	        <label for="txtStatus" class="txtstatus"></label>
	        <label id="txtStatus" class="txtstatus"></label>
        </div>	
        <div class="otButtons">
		    <button type="button" id="btnSenal" class="btnAgregarSenal" title="Señal" onclick = "btnSenal_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
		    <button type="button" id="btnNuevo" class="btnNuevoCenter" title="Nueva OT" onclick = "btnNuevo_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
		    <button type="button" id="btnGuardar" class="btnGuardarCenter" title="Guardar" onclick = "btnGuardar_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"> </button>
		    <button type="button" id="btnComprar" class="btnComprarCenter" title="Comprar" onclick = "btnComprar_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
		    <button type="button" id="btnDuplicar" class="btnDuplicarCenter" title="Duplicar" onclick = "btnDuplicar_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
		    <button type="button" id="btnEnviar" class="btniNewsCenter" title="Enviar a iNEWs" onclick = "btnEnviar_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
		    <button type="button" id="btnAvances" class="btnAgregarACenter" title="Agregar Avances" onclick = "btnAvances_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
		    <button type="button" id="btnImprimir" class="btnImprimirDerechaOT" title="Imprimir"  onclick= "btnImprimir_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	    </div>
    </div>
	<br/>
    
    <div class="divDatosOT">
        <div class="divLugar2">
	        <label for="dtFechaAg" class="left">Fecha Agenda:</label>
	        <input type="text" id="dtFechaAg" class="txtInputMaster txtFechas2" readonly = "readonly"/>
        </div>

        <div class="divLugar">
	        <label for="txtTitulo" class="title txtTituloOT">T&iacute;tulo:</label>
	        <input type="text" id="txtTitulo" class="txtInputMaster txtTituloOT"/>
        </div>
        <div class="divLugar">
	        <label for="txtObjetivo" class="title txtTituloOT">Objetivo:</label>
	        <textarea id="txtObjetivo" style="resize: none;" class="txtInputMaster txtTituloOT"></textarea>
        </div>
        
        <div class="divLugar">
	        <label for="dtFechaAg" class="title txtTituloOT">Teaser (Internet):</label>
	        <textarea id="txtTeaser" style="resize: none;" class="txtInputMaster txtTituloOT"></textarea>
        </div>

	    <div class="divLugar">
            <label for="cmbLocales" class="title txtTituloOT">Local:</label>
	        <select id="cmbLocales" class="cmbOT" onchange="cmbLocales_SelectionChanged();"></select>
        </div>
        <div class="divLugar">
            <label for="cmbSeccion" id ="lblSeccion" class="title txtTituloOT">Secci&oacute;n:</label>
	        <select id="cmbSeccion" class="cmbOT" runat="server"  onchange="cmbSeccion_selectionChanged();"></select>
	    </div>
        <div class="divLugar">
            <label id="lblTipoNota" for="cmbTipoNota" class="title txtTituloOT">Tipo Nota:</label>
	        <select id="cmbTipoNota" class="cmbOT" ></select>
	    </div>
        
        <%--<div id="divOcultar" runat="server">--%>
            <div class="divLugar">
		        <label for="cmbProduccion" class="title txtTituloOT" id="lblproduccion">Producci&oacute;n:</label>
		        <select id="cmbProduccion" class="txtInputMaster cmbOT" runat="server"></select>
		    </div>
            <div class="divLugar">
                <label for="cmbFormato" class="title txtTituloOT" id="lblformato">Formato:</label>
		        <select id="cmbFormato" class="txtInputMaster cmbOT" runat="server"></select>
	        </div>
        <%--</div>--%>	
    </div>
	
    <div class="divSelecVidRep">
        <label class="title lblTitleSelevVidRep">Selecciona el video a reproducir:</label>
	    <div id ="dgPLayList" >
	    <%--<div >
			    <div >Reproducir</div>
			    <div >OT</div>
			    <div >T&iacute;tulo</div>
			    <div >Secci&oacute;n</div>
			    <div >Suceso</div>
			    <div >Programa</div>
			    <div >Nota transmitida</div>
		    </div>--%>
	    </div>
     </div>
	
	<br/>
	<label class="stickLeft"><b>Equipo de trabajo:</b></label><b/>
	<div class="divEquipoDeTrabajo">
        <div class="divOtFields">
	        <label for="txtReportero" class="lblOtFields">Reportero:</label>
	        <input type="text" id="txtReportero"    class="txtReportero" onkeypress="keypress(event,'REP')"/>
            <%--<input type="text" id="Text1"    class="txtReportero" onkeypress="keypress(event)" onkeydown = "txtReportero_KeyDown();"/>--%>
	        <button type="button" id="btnAddReportero" class="btnAgregarLeft" title="Agregar" onclick = "btnAddReportero_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	        <button type="button" id="btnDelReportero" class="btnQuitarRight" title="Quitar" onclick = "btnDelReportero_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	        
            <select id="lsbReporteros" class="lsbReporteros" size="8" ></select>
	    </div>
	    <div class="divOtFields">
	        <label for="txtCamaro" class="lblOtFields">Camar&oacute;grafo:</label>
	        <input type="text" id="txtCamaro" class="txtReportero" onkeypress="keypress(event,'CAM')"/>
	        <button type="button" id="btnAddCamaro" class="btnAgregarLeft" title="Agregar" onclick = "btnAddCamaro_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	        <button type="button" id="btnDelCamaro" class="btnQuitarRight" title="Quitar" onclick = "btnDelCamaro_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	        
            <select id="lsbCamaro" class="lsbReporteros" size="8"></select>
	    </div>
	    <div class="divOtFields">
	        <label for="txtEditor" class="lblOtFields">Editor:</label>
	        <input type="text" id="txtEditor"  class="txtReportero" onkeypress="keypress(event,'EDI')"/>
	        <button type="button" id="btnAddEditor" class="btnAgregarLeft" title="Agregar" onclick = "btnAddEditor_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	        <button type="button" id="btnDelEditor" class="btnQuitarRight" title="Quitar" onclick = "btnDelEditor_click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
	        
            <select id="lsbEditor" class="lsbReporteros" size="8"></select>
	    </div>
	</div>
    <br/ >
	<label class="stickLeft"><b>Log&iacute;stica:</b></label>
	<br/>
    <div class="divLogistica">
        <div class="divLogisticaLlenar">
            <div class="divLogisticaFields">       
                <label for="txtLugar" class="stickLeft">Lugar:</label>
	            <input type="text" id="txtLugar" class="txtInputMaster " />
            </div>
            <div class="divLogisticaFields">
                <label for="txtObservaciones" class="title">Observaciones:</label>
	            <textarea id="txtObservaciones" class="txtInputMaster txtObservacionesOT"></textarea>
	        </div>
            <div class="divLogisticaFields">
                <label for="dtFechaIni" class="title">Fecha Inicial:</label>
	            <input type="text" id="dtFechaIni" class="txtInputMaster txtFechas" readonly = "readonly"/>
	        </div>
            <div class="divLogisticaFields">
                <label for="dtFechaFin" class="title">Fecha Final:</label>
	            <input type="text" id="dtFechaFin" class="txtInputMaster txtFechas" readonly = "readonly"/>
	        </div>
            <div class="divLogisticaFields">
                <label for="chkEsHorario" class="title">Es horario de llamado:</label>
	            <input type="checkbox" id="chkEsHorario" class="titxtInputMaster title"/>
	        </div>
            <button type="button" id="btnAddLogistica" class="btnAddLogistica" title="Agregar Logistica" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';" onclick = "btnAddLogistica_click();"></button>
	     </div>
        <div id="dgLogistica" class="dgLogistica" >
		    <div class="divLogisticaOTRenglonTitles">               
			    <div class="divLogisticaOTOpt2" >Borrar</div>
			    <div class="divLogisticaOTOpt2">Editar</div>
			    <div class="divLogisticaOT">Lugar</div>
			    <div class="divLogisticaOT">Observaciones</div>
			    <div class="divLogisticaOT">Inicio Cobertura</div>
			    <div class="divLogisticaOT">Fin Cobertura</div>
			    <div class="divLogisticaOT">Horario de llamado</div>                
		    </div>
	    </div>
   </div>
  <br/>
	<label class="stickLeft"><b>Donde se va a transmitir:</b></label>
	<div class="divGridProgTransmitir">
        <div id = "GridProgTransmitir" ></div> 
    </div>
	<div id="dialog-confirm" title=""></div>   
	<div id="loading" class="cntrElement">
	    <img alt="Loading..." id="ImgLoader" runat="server" src="../../Images/image-loading.gif" />
	</div>
</asp:Content>
