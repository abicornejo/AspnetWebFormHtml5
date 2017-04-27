<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ComentarioAdquisicionesSubmaster.aspx.cs" Inherits="FIATubeHtml5.Pages.Adquisiciones.ComentarioAdquisicionesSubmaster" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <textarea id="txtAdvertencia"></textarea>
    <br />
    <input type="button" id="btnAceptar" />
    <input type="button" id="btnCancelar" />
</asp:Content>
