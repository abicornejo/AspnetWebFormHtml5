<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ComentariosMonitor.aspx.cs" Inherits="FIATubeHtml5.Pages.Edicion.ComentariosMonitor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnGuardar" title="Guardar" />
    <br />
    <label for="txtComentarios">Comentarios</label>
    <br />
    <textarea id="txtComentarios"></textarea>
</asp:Content>
