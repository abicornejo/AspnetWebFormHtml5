<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="DialogAdminMailUser.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.DialogAdminMailUser" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnAceptar" title="Guardar" />
    <input type="button" id="btnCancelar" title="Cancelar" />
    <br />
    <label for="txtNombreUsr">Escribe el Nombre del Usuario:</label>
    <input type="text" id="txtNombreUsr" />
    <br />
    <label for="txtMailUsr">Escribe el e-mail del Usuario:</label>
    <input type="text" id="txtMailUsr" />
    <br />
    <label for="txtCelUsr">Escribe el Numero de Celular del Usuario:</label>
    <input type="tel" id="txtCelUsr" />
</asp:Content>
