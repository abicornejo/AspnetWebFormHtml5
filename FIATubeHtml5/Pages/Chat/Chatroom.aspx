<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Chatroom.aspx.cs" Inherits="FIATubeHtml5.Pages.Chat.Chatroom" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <textarea id="txtMessages" readonly="readonly"></textarea>
    <br />
    <textarea id="txtMessage"></textarea>
    <select id="cmbFontColor"></select>
    <input type="button" id="btnSend" value="Enviar" />
</asp:Content>
