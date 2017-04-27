<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ReporteEvaluacionSeccionFechas.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.ReporteEvaluacionSeccionFechas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Evaluacion.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Este reporte muestra la distribución en un rango de fechas seleccionado de las evaluaciones realizadas en cada una de las secciones.</label>
    <label>Fecha Inicial:</label>
    <input type="text" id="dtFechaIni" />
    <label>Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <button type="button" id="btnUpdate" title="Actualizar"></button>
    <table id="tblTablas">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
