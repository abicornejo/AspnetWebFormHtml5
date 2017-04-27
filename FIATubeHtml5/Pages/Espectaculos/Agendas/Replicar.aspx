<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Replicar.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Agendas.Replicar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Replicar</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label id="LblOT"></label>
    <input type="text" id="txtReplicar" />
    <button type="button" id="btnAceptar" title="Aceptar">Aceptar</button>
</asp:Content>
