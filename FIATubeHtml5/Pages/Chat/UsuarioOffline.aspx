<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="UsuarioOffline.aspx.cs" Inherits="FIATubeHtml5.Pages.Chat.UsuarioOffline" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtBusqueda">B&uacute;squeda:</label>
    <input type="text" id="txtBusqueda" />
    <input type="button" id="btnBuscar" title="Buscar" />
    <br />
    <label for="lsbUsuarios">Usuarios Desconectados</label>
    <br />
    <select id="lsbUsuarios" size="10"></select>
</asp:Content>
