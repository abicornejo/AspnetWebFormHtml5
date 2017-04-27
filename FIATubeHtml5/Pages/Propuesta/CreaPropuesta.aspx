<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CreaPropuesta.aspx.cs" Inherits="FIATubeHtml5.Pages.Propuesta.CreaPropuesta" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Propuesta/propuestas.js?Rand="+RandomCall) %>"></script>
    <style type="text/css">
       
        .style1
        {
            width: 209px;
        }
        #BntDetonador
        {
            text-align: right;
        }
        
  
    </style>
      
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true" EnablePartialRendering="true">
    </asp:ScriptManager>

    <asp:HiddenField id="hiddLocl" runat="server"/>
    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <asp:Button id="btnUpdateEquipo" CssClass="hideButton" runat="server" Text="" OnClientClick="setFilters();" OnClick="btnUpdateEquipo_Click" />
        </ContentTemplate>  
    </asp:UpdatePanel>
  
    <%--<label id="lblResult">&nbsp;</label>--%>
    <input id="myHidden" runat="server" visible="False"    />
    <input type="hidden"  runat="server" id="cvePropuesta" value="0" />

    <div class="otButtonsBckgrnd">
        <label>No. Prop.:</label>
        <asp:Label ID="LbloProp" runat="server"></asp:Label>
        <label id="LblNoProp" style=" width:100px;"></label>
        <button id="Compra" class="btnComprar" type="button" title="Comprar" onclick="Prompra();"></button>
        <button type="submit" class="btnGuardar" title="Guardar" onclick="setType('guardar');"></button>
        <button id="btnReset" class="btnNuevo" type="button" title="Nueva Propuesta" onclick="cleanForm();"></button> 
    </div>

    <div class="divBodyCreaPropuesta">
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">T&iacute;tulo:</label>            
            <input id="txtTitulo" type="text" class="inputCreaPropuesta" maxlength="1000"/></input>
        </div>
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Objetivo:</label>
            <textarea id="txtObjetivo" class="inputCreaPropuesta" rows="3" maxlength="2000"></textarea>
        </div>
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Tema:</label>
            <input id="txtTema" type="text"  class="inputCreaPropuesta" maxlength="1000"/>&nbsp;</input>
        </div>
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Fecha de Agenda:</label>
            <input id="txtFechaAg" class="txtFechas2" type="text"  onkeyup="mascara(this,'/',patron,true)" maxlength="10" required/></input>
        </div>
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Locales:</label>
            <select id="cmbLocales" class="inputCreaPropuesta" onchange="localChange();" name="D1"/></select>
        </div>
        <div id="rowSeccion" class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Secci&oacute;n:</label>
            <div>
                <select id="cmbSeccion" class="inputCreaPropuesta" onchange="seccionChange();">                </select>
            </div>
        </div>
        <div id="rowTipoNota" class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Tipo Nota:</label>
            <select id="cmbTipoNota" class="inputCreaPropuesta"></select>
        </div>        
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Reportero:</label>
            <input type="text" id="txtReporteros" value="" onkeypress="resetVal();"  class="inputCreaPropuesta reporterosAutocomplete"/></input>
            <input type="hidden" id="txtReporterosID" class="inputCreaPropuesta" runat="server" value="" /></input>
        </div>
        <div class="divBodyCreaPropuestaSecc">
            <label class="lblCreaPropuesta">Foto Reportero:</label>
            <img alt="img reportero ..." id="imgFotoRep" src="../../Images/msnOnline.png" onerror='loadImgError(this);' style="margin-left:10px" src="" width="95" height="130" />
        </div>
    </div>

<div id="Carrito">
    <div class="otButtonsBckgrndWindowsCompProp">        
        <button id="BntDetonador" class="btnComprarPropuesta" title="Comprar" onclick="Detonador();" type="button"></button>
        <button id="LimpiarCarrito" class="btnLimpiarPropuesta" title="Limpiar" onclick="cleanFormCarrito();" type="button"></button>
    </div>
  <div class="divBodyCompraPropuesta"> 
    <div class="divBodyCompraPropuestaSecc">
        <label class="lblCompraPropuesta">Programa:</label>        
        <select id="cmbPrograma" class="cmbProgramaCompProp" onchange="SeleccionPrograma();"  runat="server"></select>
        <input type="hidden"  runat="server" id="cmbProgramaHidden"  value="0" />
    </div>
    <div class="divBodyCompraPropuestaSecc">
        <label class="lblCompraPropuesta">Propuesta:</label>
        <input id="txtProp" class="txtInputMaster" type="text" required/>
    </div>
    <div class="divBodyCompraPropuestaSecc">
        <label class="lblCompraPropuesta">Fecha:</label>
        <input id="txtFechaCarrito" class="txtFechas" runat="server" type="text"/>
    </div>
    <div class="divBodyCompraPropuestaSecc">
        <label class="lblCompraPropuesta">Formato:</label>
        <select id="cmbFormato" class="cmbProgramaCompProp" onchange="SeleccionFormato();" runat="server" name="D2" ></select>
    </div>

    <div id="EstatusCompara" class="divEstatusCompara">
        <img alt="" src="../../Images/CompraProceso.gif" />
    </div>
  </div>
</div>
</asp:Content>
