<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaSemanal.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Agendas.AgendaSemanal" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnActualizar" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <label for="txtTitulo">T&iacute;tulo:</label>
    <input type="text" id="txtTitulo" />
    <label for="cmbProduccion">Producci&oacute;n:</label>
    <select id="cmbProduccion"></select>
    <button type="button" id="btnAtras" title="Semana Anterior">
        <img alt="Anterior" src="<%=ResolveUrl("~/Images/iconos/arrow_left.png") %>" />
    </button>
    <button type="button" id="btnAdelante" title="Semana Siguiente">
        <img alt="Siguiente" src="<%=ResolveUrl("~/Images/iconos/arrow_right.png") %>" />
    </button>
</asp:Content>
