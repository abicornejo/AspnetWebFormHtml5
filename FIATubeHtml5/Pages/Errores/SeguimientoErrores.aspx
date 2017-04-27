<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="SeguimientoErrores.aspx.cs" Inherits="FIATubeHtml5.Pages.Errores.SeguimientoErrores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Alta de Seguimiento de Errores</label>
    <button type="button" id="btnGuardar" title="Guardar"></button>
    <label for="cmbTipoErrores">*Tipo de errores:</label>
    <select id="cmbTipoErrores"></select>
    <label for="txtDescripcion">*Descripci&oacute;n del error:</label>
    <textarea id="txtDescripcion"></textarea>
    <label for="txtSolucion">*Soluci&oacute;n del error:</label>
    <textarea="txtSolucion"></textarea>
    <label for="txtComentario">Comentarios:</label>
    <textarea id="txtComentario"></textarea>
</asp:Content>
