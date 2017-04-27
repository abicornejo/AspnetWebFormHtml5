<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ReporteEvaluacionSeccion.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.ReporteEvaluacionSeccion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Reporte que muestra la cantidad y el porcentaje de notas evaluadas a lo largo del mes seleccionado, adicionalmente muestra el acumulado por cada uno de los noticieros de FIA en cada una de las secciones.  Los resultados que arrojan tienen en cuenta las notas ya evaluadas.</label>
    <label>Secciones:</label>
    <select id="cmbSecciones"></select>
    <label>Programas:</label>
    <select id="cmbProgramas"></select>
    <button type="button" id="btnChange"></button>
    <button type="button" id="btnAtras"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante"></button>
    <table id="tblTablas">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
