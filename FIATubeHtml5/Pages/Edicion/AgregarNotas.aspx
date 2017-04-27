<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgregarNotas.aspx.cs" Inherits="FIATubeHtml5.Pages.Edicion.AgregarNotas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Edicion.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnGuardar" title="Guardar" />
    <br />
    <label for="txtNombre">Nombre de las OT's:</label>
    <input type="text" id="txtNombre" />
    <label>Para agregar más de una OT se deben separar por comas.</label>
    <br />
    <label for="cmbPrograma">Programa:</label>
    <select id="cmbPrograma"></select>
    <br />
    <label for="dtFecha">Fecha:</label>
    <input type="text" id="dtFecha" />
</asp:Content>
