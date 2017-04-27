<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionSeccionPrograma.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.EvaluacionSeccionPrograma" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Evaluacion.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Secciones:</label>
    <select id="cmbSecciones"></select>
    <button type="button" id="btnChange"></button>
    <button type="button" id="btnAtras"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante"></button>
    <label>Fecha Inicio:</label>
    <input type="text" id="dtFechaIni" />
    <label>Fecha Fin:</label>
    <input type="text" id="dtFechaFin" />
    <table id="tblTablas">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
