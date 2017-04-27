<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaMensual.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Agendas.AgendaMensual" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnImprimir" title="Imprimir">
        <img alt="Imprimir" src="<%=ResolveUrl("~/Images/iconos/ico-imprimir.png") %>" />
    </button>
    <button type="button" id="btnActualizar" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <label for="cmbProducciones">Producciones:</label>
    <select id="cmbProducciones"></select>
    <button type="button" id="btnAtras" title="Atras">
        <img alt="Atras" src="<%=ResolveUrl("~/Images/iconos/arrow_left.png") %>" />
    </button>
    <label id="lblTextoPaginado">TextoPaginado</label>
    <button type="button" id="btnAdelante" title="Adelante">
        <img alt="Adelante" src="<%=ResolveUrl("~/Images/iconos/arrow_right.png") %>" />
    </button>
</asp:Content>
