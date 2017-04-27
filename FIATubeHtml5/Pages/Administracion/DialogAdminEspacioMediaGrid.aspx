<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="DialogAdminEspacioMediaGrid.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.DialogAdminEspacioMediaGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="lblId">ID:</label>
    <label id="lblId"></label>
    <br />
    <label for="lblDescripcion">Descripci&oacute;n:</label>
    <label id="lblDescripcion"></label>
    <br />
    <label for="lblRuta">Ruta:</label>
    <label id="lblRuta"></label>
    <br />
    <label for="txtTotal">Total:</label>
    <input type="text" id="txtTotal" />
    <br />
    <input type="button" id="btnAceptar" title="Aceptar" />
    <input type="button" id="btnCancelar" title="Cancelar" />
</asp:Content>
