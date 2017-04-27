<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionProgramaShareAcumulado.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.EvaluacionProgramaShareAcumulado" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Programa:</label>
    <select id="cmbPrograma"></select>
    <button type="button" id="btnAtras" title="Año Anterior"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante" title="Año Siguiente"></button>
    <table id="tblTablas">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
