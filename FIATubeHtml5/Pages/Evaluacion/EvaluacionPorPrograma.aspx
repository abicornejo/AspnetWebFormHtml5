<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionPorPrograma.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.EvaluacionPorPrograma" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Producciones:</label>
    <section id="cmbProduccion"></section>
    <label>Fecha:</label>
    <input type="text" id="dtFecha" />
    <button type="button" id="btnBuscar" title="Actualizar"></button>
    <label>Notas por Evaluar</label>
    <table id="tblOtsEvaluar">
        <thead></thead>
        <tbody></tbody>
    </table>
    <label>Notas Evaluadas</label>
    <table id="tblOtsEvaluadas">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
