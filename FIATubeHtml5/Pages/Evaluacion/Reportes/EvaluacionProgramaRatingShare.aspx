<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionProgramaRatingShare.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.EvaluacionProgramaRatingShare" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Evaluacion.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Fecha Inicial:</label>
    <input type="text" id="dtFechaIni" />
    <label>Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <button type="button" id="btnUpdate" title="Actualizar"></button>
    <label>Evaluaci&oacute;n Share / por Programa</label>
    <table id="tblGrid">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
