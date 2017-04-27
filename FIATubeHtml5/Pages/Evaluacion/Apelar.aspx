<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Apelar.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Apelar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnGuardar" title="Guardar"></button>
    <label>Comentario:</label>
    <textarea id="txtComentarioCalificador"></textarea>
    <textarea id="txtComentario"></textarea>
    <label>Comentarios de Apelaci&oacute;n</label>
    <table id="tblVistaComentario">
        <thead></thead>
        <tbody></tbody>
    </table>
</asp:Content>
