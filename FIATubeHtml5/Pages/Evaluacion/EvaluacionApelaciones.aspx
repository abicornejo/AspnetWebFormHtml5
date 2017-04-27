<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionApelaciones.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.EvaluacionApelaciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Producci&oacute;n:</label>
    <select id="cmbProduccion"></select>
    <button type="button" id="btnExprot" title="Exportar"></button>
    <button type="button" id="btnPrint" title="Imprimir"></button>
    <button type="button" id="btnAtras"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante"></button>
    <table id="tblProgramas">
        <thead>
            <tr>
                <th>Programa</th>
                <th>Fecha al Aire</th>
                <th>OTs por evaluar</th>
                <th>OTs por apelar</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
