<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ConsultaFlexible.aspx.cs" Inherits="FIATubeHtml5.Pages.Entretenimiento.ConsultaFlexible" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Entretenimiento.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="cmbSeccion">Secci&oacute;n</label>
    <select id="cmbSeccion"></select>
    <label for="dtFechaIni">Fecha Inicial:</label>
    <input type="text" id="dtFechaIni" />
    <label for="dtFechaFin">Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <button type="button" id="btnBuscar" title="buscar">
        <img alt="Buscar" src="<%=ResolveUrl("~/Images/iconos/buscar.png") %>" />
    </button>
    <br />
    <table id="tblConsulta">
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Secci&oacute;n</th>
                <th>Etapa del Proceso</th>
                <th>Res&uacute;men</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
