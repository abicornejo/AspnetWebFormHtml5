<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="MultiplesOT.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.OT.MultiplesOT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Espectaculos.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtNumOT"># de OTs:</label>
    <input type="number" id="txtNumOT" />
    <label for="cmbProducciones">Producciones:</label>
    <select id="cmbProducciones"></select>
    <label for="dtFecha">Fecha:</label>
    <input type="text" id="dtFecha" />
    <button type="button" id="btnBuscar" title="Buscar">
        <img alt="Buscar" src="<%=ResolveUrl("~/Images/iconos/buscar_1.png") %>" />
    </button>
    <button type="button" id="btnActualizar" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <button type="button" id="btnGuardar" title="Guardar">
        <img alt="Guardar" src="<%=ResolveUrl("~/Images/iconos/ico-guardar.png") %>" />
    </button>
</asp:Content>
