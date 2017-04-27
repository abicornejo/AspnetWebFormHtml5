<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaDiaria.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Agendas.AgendaDiaria" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Espectaculos.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnActualizar" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <label for="cmbReportero">Reportero:</label>
    <select id="cmbReportero"></select>
    <label for="cmbPrograma">Programa:</label>
    <select id="cmbPrograma"></select>
    <label for="dtFecha">Fecha:</label>
    <input type="text" id="dtFecha" />
    <label for="txtOT">OT:</label>
    <input type="text" id="txtOT" />
    <label id="lbltVideo">VIDEO</label>
    <label id="lbltOT">OT</label>
    <label id="lbltTitulo">TITULO</label>
    <select size="2" id="lsbAgenda"></select>
</asp:Content>
