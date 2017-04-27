<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Administracion_Parametros_EVDT.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.Administracion_Parametros_EVDT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Catalogaci&oacute;n de Eventos Deportivos - Administraci&oacute;n</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtDescripcion">Descripci&oacute;n:</label>
    <input type="text" id="txtDescripcion" />
    <br />
    <div>
        <input type="radio" id="rbtVU" name="rbtTipoValor" value="1" checked="checked" /><label for="rbtVU">Valor &uacute;nico</label>
        <input type="radio" id="rbtCV" name="rbtTipoValor" value="2" /><label for="rbtCV">Colecci&oacute;n de valores</label>
    </div>
    <input type="button" id="btnAceptar" />
    <input type="button" id="btnCancelar" />
</asp:Content>
