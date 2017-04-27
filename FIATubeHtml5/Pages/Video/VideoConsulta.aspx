<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="VideoConsulta.aspx.cs" Inherits="FIATubeHtml5.Pages.Video.VideoConsulta" %>

<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
	<title>Video Consulta</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Video/VideoConsulta.js?Rand="+RandomCall) %>"></script>
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/General/frameMarks.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Video/PlayerControls.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3"  ContentPlaceHolderID="MainContent" runat="server">
	<asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
	</asp:ScriptManager>	
	<div class="divVideoConsulta">
		
		<div id="divPreviewFG" style="display:none; text-align:center;">
            <img alt="imagen" height="140" width="150" id="imgFGPreview" src="../../Images/noimage.png" />
            <br />
            <label id="lblTimePrev"></label>
        </div>
		<div id="divFotoGaleria" class="divDatosFotoGaleria2">
            <img alt='' class='imgFotoGalVideo' data-time="0" src='../../Images/noimage.png'/>
        </div>
		<div id='mediaspace' class="varFloatLeft" ></div> 
        
		<div id="playerToolbar" class="playerToolbar">
            <div class="divBotonera2">
                <label class="lblTiempoVideo" id="lblCurrVidTime">00:00:00</label>
                <div class="videoSliderTime2" id="vidSliderTime"></div>                
                <label class="lblDuracionVideo" title="Tiempo de duraci&oacute;n del Video" id="lblVidTime">00:00:00</label>                     

                <button type="button" class="btnRewind" onclick="seekBack();"></button>
                <button type="button" class="btnPlay" onclick="playerPlay();"></button>
                <button type="button" class="btnFastFoward" onclick="seekForward();"></button>
                <button type="button" class="btnStop" onclick="playerStop();"></button>
                <button type="button" class="btnFullScn" onclick="setFullScreen();" title="Ver pantalla Completa"></button>
                <button type="button" class="btnVolumen" id="btnShowPVolume"></button>
                <input type='checkbox' id="chkStream" style="display:none;" class="checkboxVC" onclick='setStreaming(this);' data-isActive='1' checked="checked" title='Desactivar Streaming' />
                <button type='button' class="btnMarkOut" onclick="createMark_click('OUT'); return false;" title='Crear marca de salida'></button>            
                <button type='button' id='btnMarkIn' class="btnMarkIn" onclick="createMark_click('IN'); return false;" title='Crear marca de entrada'></button> 
                <div id="divPlayerVol" style="display:none;" data-isOpen="0">
                <div class="videoSliderVolume" id="vidSliderVolume"></div>               
                </div>
                </div>
			<button type="button" id="btnActPlayLst" class="btnPlaylist" title="Activar PlayList" data-Pact="0" onclick="setPlayList();">
			</button>
			<button type="button" id="btnRecuperarMarcas" class="btnRecMarcasG" title="Recuperar Marcas Guardadas" onclick="openDialogRecuperaciones();">
			</button>
			<button type="button" id="btnRecuperaCompleto" class="btnRestVidCompleto" title="Recuperar video completo" onclick="RecuperaCompleto();">
			</button>
			<button type="button" id="btnRestaurar" class="btnRestaurar" title="Restaurar" onclick="btnRestaurarMrk_click();">
			</button>
			<button type="button" id="btnGuardarMarcas" class="btnGuardarCenterPlayList" title="Guardar Marcas" onclick="saveMarks();">
			</button>
			<button type="button" id="btnBorrarTodos" class="btnEliminarRight" title="Borrar todos" onclick="btnBorrarTodos_click();">
			</button>
			
			<label id="lblTotalTime" class="lblTimeTotal" data-ttime='0'>00:00:00</label>
            <label for="lblTotalTime" class="lblTime">Tiempo total:</label>
		</div>
		<div id="divMarcas" class="divMarcas" runat="server" enableviewstate="false"></div>
	</div>
    </div>
		<asp:HiddenField ID="hiddAcopS" runat="server"/>

		<div id="divVideoData" class="divVideoData">
			<ul id="ulTabs" runat="server">
				<li style="display:none;"><a href="#MainContent_divTabAcoplados">Acoplados</a></li>
				<li><a href="#MainContent_divFechaAct" id="lnkDivFecha"></a></li>
			</ul>
		   
			<div id="divTabAcoplados" runat="server" enableviewstate="false">
				<div class="DivTitulosAcomplado">
				<div class='DivVacio'></div>
				<div class="VCTitlesA">Nombre</div>
				<div class="VCTitlesB">Descripci&oacute;n</div>
				<div class="VCTitlesB">Palabras Clave</div>
				</div>
			</div>
			
			<div id="divFechaAct" runat="server" enableviewstate="false">
			
			</div>
		</div>
		<button type="button" class="btnRecBusquedasG" id="btnRecuperacionBusq" title="Recuperar b&uacute;squedas guardadas" onclick="openDialogRecuperacionesBusquedas(); return false;"></button>
		<button type="button" class="btnGuardarBusquedasG" id="btnGuardaBusq" title="Guardar b&uacute;squeda" onclick="openDialogSaveBusqueda(); return false;"></button>

		<asp:UpdatePanel runat="server" id="updPanel1">
			<ContentTemplate>
				 <asp:Button id="btnCargaInfoAcoplado" runat="server" OnClick="btnCargaInfoAcoplado_Click" CssClass="hideButton" />
				 <asp:HiddenField ID="hiddTabCon" runat="server" EnableViewState="false"/>
				 <asp:HiddenField ID="hiddTabI" runat="server" EnableViewState="false" />
				 <asp:Button id="btnLoadNewTab" runat="server" OnClick="btnCargaTabBusqueda_Click" CssClass="hideButton"/>
                 
			</ContentTemplate>  
		</asp:UpdatePanel>

	<div id="divPreview">
		<img alt="preview" id="imgPreview" width="300px" height="250px" src="" />
	</div>
	
	<div id="divRecuperacion" title="Recuperar Marcas Guardadas">
		<div class="otButtonsBckgrndWindows">
			<input type="text" class="txtInputMaster varFloatLeft" id="txtFiltroRec"/>
			<input type="text" class="txtFechas" id="dtIniRecuperacion"/>
			<input type="text" class="txtFechas" id="dtFinRecuperacion"/>
		</div>
		<div class="divContTitulosRecuperacion"> 
			<div class="divTitulosRecuperacionA">Borrar</div>
			<div class="divTitulosRecuperacionA">Cargar</div>
			<div class="divTitulosRecuperacionB">Nombre Recuperaci&oacute;n</div>
			<div class="divTitulosRecuperacionB">Fecha</div> 
		</div>
		<div id="divRecResult" class="divRecResult"></div>
	</div>

	<div id="divRecuperacionBusq" style="display:none;" title="Recuperar B&uacute;squedas Guardadas">
		<div class="otButtonsBckgrndWindows">
			<input type="text" class="txtInputMaster varFloatLeft" id="txtTextoBusq"/>
			<input type="text" class="txtFechas" id="dtFechaBusqIni"/>
			<input type="text" class="txtFechas" id="dtFechaBusqFin"/>
		</div>
		<div class="divContTitulosRecuperacion"> 
			<div class="divTitulosRecuperacionA">Borrar</div>
			<div class="divTitulosRecuperacionA">Cargar</div>
			<div class="divTitulosRecuperacionB">Nombre B&uacute;squeda</div>
			<div class="divTitulosRecuperacionB">Fecha</div> 
		</div>
		<div id="divBusqResult" class="divRecResult"></div>
	</div>

	<div id="divGuardaBusqueda" style="display:none;" title="Guardado B&uacute;squedas">
		<label>Escribe el nombre de la b&uacute;squeda:</label>
		<br />
		<input type="text" class="txtInputMaster varTxtWarning varFloatLeft varMarginTop varMarginLeft" id="txtNombreBusq" maxlength="255"/>
		<button type="button" class="btnAceptarMarcas" id="btnSaveBusq" title="Guardar" onclick="saveSearch(); return false;"></button>
		<button type="button" class="btnCancelarMarcas" id="btnCancelBusq" title="Cancelar" onclick="return cancelSaveSearch();"></button>
	</div>

	<div id="divSaveMarks" title="Guardar Marcas">
		<div class="otButtonsBckgrndWindowsGuardar">Escribe el nombre con el que deseas guardar las marcas (Max. 20 caracteres)</div>
		<div class="divBodyGuardar">
			<input id="txtSaveMark" class="txtInputMaster varTxtWarning varFloatLeft varMarginTop varMarginLeft" type="text" maxlength="20" />		
			<button type="button" class="btnAceptarMarcas" id="btnSaveMarkOk" onclick="saveMarksOK();"></button>
			<button type="button" class="btnCancelarMarcas" id="btnSaveMarkCancel" onclick="saveMarksCancel();"></button>
		</div>
	</div>
	
	<input type="hidden" id="hiddUrl" />
	<input type="hidden" id="hiddStream" />
	
	<div id="divDialogRestore" title="Restaurar">
		<div class="otButtonsBckgrndWindows">
			<button type="button" id="btnGuardar" class="btnGuardarRestaurar" title="Guardar" onclick="btnGuardar_click();"></button>
			<button type="button" id="btnCancelar" class="btnCancelarRestaurar" title="Cancelar" onclick="btnCancelar_click();"></button>
		</div>
		<div class="divBodyRestaurar">
			<div class="divBodyRestaurarSecc">
				<input type="checkbox" class="checkBoxAS2" id="chkNotificar" onclick="chkNotificar_click();"/>
				<label for="chkNotificar" class="checkBoxASLabel">Notificarme</label>                		    
			</div>
			<div class="divBodyRestaurarSecc">
				<label for="txtNombreArch" class="lblRestaurar">Escribe el nombre del archivo:</label>		
				<input type="text" id="txtNombreArch" class="txtInputMaster" maxlength="20"/>
				<label for="txtNombreArch">M&aacute;ximo 20 caracteres.</label>
			</div>            
			<div class="divBodyRestaurarSecc">    
				<label for="cmbTipoRec" class="lblRestaurar">Tipo de recuperaci&oacute;n:</label>
				<select id="cmbTipoRec" class="cmbVideoConsulta"></select>
			</div>
			<div class="divBodyRestaurarSecc">
				<label for="cmbEdicion" class="lblRestaurar">Edici&oacute;n:</label>			
				<select id="cmbEdicion" class="cmbVideoConsulta"></select>
			</div>
			<div class="divBodyRestaurarSecc">
				<label for="cmbProgramas" class="lblRestaurar">Producciones:</label>
				<select id="cmbProgramas" class="cmbVideoConsulta"></select>            
			</div>        
			<div class="divBodyRestaurarSecc">		  
				<label id="lblRestLocal" class="lblRestaurar">Destino:</label>  
				<select id="cmbLocales" onchange="cmbLocales_changed(); return false;" class="cmbVideoConsulta"></select>
			</div>
		</div>
		
		<label id="txtLeyenda">Se recuperar&aacute; el video completo</label>

		<div id="divCapCel">
			<label>Registre su Número de Celular (IUSA):</label>
			<br />
			<input type="phone" class="txtInputMaster varFloatLeft varMarginTop4" required="required" id="txtNumCel" onkeyup="txtNumCel_keyup();" />
			<button type="button" class="btnAceptarMarcas" id="btnAcceptCel" title="Guardar" onclick="btnAcceptCel_click();"></button>
			<button type="button" class="btnCancelarMarcas" id="btnCancelCel" title="Cancelar" onclick="btnCancelCel_click();"></button>
		</div>
	</div>
	<div class="cntrElement">
	<asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
		<progresstemplate>
			<img alt="Loading..." src="../../Images/image-loading.gif">
		</progresstemplate>
	</asp:updateprogress>
	</div>
</asp:Content>
