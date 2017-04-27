<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionProgramaMensual.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.EvaluacionProgramaMensual" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Reporte que muestra dia a dia las notas realizadas ya evaluadas en el mes seleccionado y por cada uno de los noticieros de FIA. Los resultados que arrojan incluyen todas las secciones.</label>
    <label>Programas:</label>
    <select id="cmbProgramas"></select>
    <button type="button" id="btnAtras"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante"></button>
    <table id="tblTablas">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
