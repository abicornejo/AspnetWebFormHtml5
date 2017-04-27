<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgregarPrevPrograma.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.AgregarPrevPrograma" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Convertir en Solicitud</label>
    <input type="button" id="btnEliminar" title="Eliminar"/>
    <input type="button" id="btnCreaSolicitud" title="Guardar Solicitud"/>
    <br />
    <label for="txtDescripcion">Descripci&oacute;n:</label>
    <input type="text" id="txtDescripcion" />
    <br />
    <label for="dtAgenda">Fecha de Agenda:</label>
    <input type="text" id="dtAgenda" />
    <br />
    <label id="lblUsuario"></label>
    <br />
    <label for="cmbFormato">Formato:</label>
    <select type="text" id="cmbFormato"></select>
    <br />
    <label for="cmbCliente">Cliente:</label>
    <select id="cmbCliente"></select>
    <br />
    <label for="txtObjetivo">Objetivo:</label>
    <textarea id="txtObjetivo"></textarea>
    <br />
    <input type="button" id="btnCancel" title="Cancelar" />
    <input type="button" id="btnAceptar" title="Aceptar" />
</asp:Content>
