<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="FiaChat.aspx.cs" Inherits="FIATubeHtml5.Pages.Chat.FiaChat" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnOffLine" title="Envío de Mensajes Offline" />
    <br />
    <label for="lsbUsuarios">Usuarios Conectados</label>
    <br />
    <select id="lsbUsuarios" size="10"></select>
</asp:Content>
