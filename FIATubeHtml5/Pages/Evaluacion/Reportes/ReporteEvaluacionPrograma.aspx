<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ReporteEvaluacionPrograma.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.ReporteEvaluacionPrograma" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Programas:</label>
    <select id="cmbPrograma"></select>
    <button type="button" id="btnAtras" title="Mes Anterior"></button>
    <label id="lblMes"></label>
    <button type="button" id="btnAdelante" title="Mes Siguiente"></button>
    <table id="tblContainer">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
