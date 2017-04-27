<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Apelaciones.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Apelaciones" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Secci&oacute;n:</label>
    <select id="cmbSeccion"></select>
    <label>Producci&oacute;n:</label>
    <select id="cmbProduccion"></select>
    <button type="button" id="btnActualizar" title="Actualizar"></button>
    <button type="button" id="btnGuardar" title="Guardar"></button>
    <button type="button" id="btnAtras" title="Mes Atras"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante" title="Mes Siguiente"></button>
    <table id="tblApelaciones">
        <thead>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
