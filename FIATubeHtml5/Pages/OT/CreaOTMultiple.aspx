<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CreaOTMultiple.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.CreaOTMultiple" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
<title>Crear Multiples OT's</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/CreaOTMultiple.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>

<div id="Filtros">
    <div class="otButtonsBckgrnd">
        <label for="txtNumOT" class="title" id = "lblOTGenerar"># de OTs:</label>
        <input type="text" id="txtNumOT" class="txtInputMaster varFloatLeft"/>
        <label for="cboLocales" class="title" id = "lblLocal">Local:</label>
        <select id="cboLocales" class="cmbLocales" onchange = "cboLocales_SelectionChanged();" ></select>
        <label for="cboSecciones" class="title" id = "lblOTSeccion">Secci&oacute;n:</label>
        <select id="cboSecciones" class="cmbSecciones" onchange = "cboSecciones_SelectionChanged();"></select>
        <label for="dpFechaBusq" class="title" id = "lblFechaBusq">Fecha:</label>
        <input type="text" class="txtFechas2" id="dpFechaBusq" placeholder="dd/MM/yyyy" runat ="server"  />
    
    <div class="otButtons2">
        <button type="button" id="btnAceptaNumOT" class="btnActualizarAgendaSemanal" title="Actualizar" onclick = "btnActualizarOT_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
        <button type="button" id="btnNuevo" class="btnNuevoCenter" title="Nueva OT" onclick = "btnLimpiaOTs_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
        <button type="button" id="btnGuardar" class="btnGuardarCenter" title="Guardar" onclick = "btnGuardar_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
        
        <%--<asp:Button type="button" id="btnBuscar" class="btnBuscarMultipleOT" title="Buscar" onclick = "btnBuscar_Click" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';" runat = "server"/>--%>
        <button type="button" id="btnImprimir" class="btnImprimirDerechaOT" title="Imprimir" onclick = "btnImprimir_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
    </div>
    </div>
    
    <input type="hidden" id="hiddSecc" runat="server" />
    <input type="hidden" id="HiddtxtNumOT" runat="server" />
    <input type="hidden" id="HiddcboLocales" runat="server" />
    
    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <asp:Button id="btnUpdateEquipo" CssClass="hideButton" runat="server" Text=""  OnClick="btnUpdateEquipo_Click" />
        </ContentTemplate>  
    </asp:UpdatePanel>

     <div id="GridHeader" class="divGridBitacoraDiaria"></div>
         <div id="loading" class="cntrElement">
        <img alt="Loading..." id="ImgLoader" runat="server" src="../../Images/image-loading.gif" />
    </div>
</div>
</asp:Content>
