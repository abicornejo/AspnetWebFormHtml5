<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="DialogBloqueoVideo.aspx.cs" Inherits="FIATubeHtml5.Pages.UserControls.DialogBloqueoVideo" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Bloqueo de Video</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/UserControls/DialogBloqueoVideo.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnAceptar" title="Aceptar"></button>
    <button type="button" id="btnCancelar" title="Cancelar"></button>
    <div id="divTipoBloqueo">
        <label>Selecciona el tipo de bloqueo:</label>
        <div id="divOpcBloqueo">
            <input type="radio" id="" checked="checked" /><label for=""></label>
        </div>    
    </div>
    <div id="divProducciones">
        <label>Producciones:</label>
        <select id="lsbProducciones"></select>
    </div>
    <div id="divSecciones">
        <label>Secciones:</label>
        <select id="lsbSecciones"></select>
    </div>
    
</asp:Content>
