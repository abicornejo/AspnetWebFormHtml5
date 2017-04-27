<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="VisualizacionErrores.aspx.cs" Inherits="FIATubeHtml5.Pages.Errores.VisualizacionErrores" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Visualizaci&oacute;n de Errores</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Errores.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="dtFechaIni">Fecha Inicio:</label>
    <input type="text" id="dtFechaIni" />
    <label for="dtFechaFin">Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <label for="cmbTipoError">Tipo Error:</label>
    <select id="cmbTipoError"></select>
    <label for="cmbUsuario">Usuario:</label>
    <select id="cmbUsuario"></select>
    <button type="button" id="btnBuscar" title="Buscar"></button>
    <button type="button" id="btnNuevo" title="Nuevo"></button>
    <button type="button" id="BtnActualizar" title="Actualizar"></button>
    <table id="tblVisualizacion">
        <thead>
            <tr>
                <th>Id Error</th>
                <th>Tipo Error</th>
                <th>Usuario</th>
                <th>Descripci&oacute;n</th>
                <th>Soluci&oacute;n</th>
                <th>Comentario</th>
                <th>Fecha de Alta</th>
                <th>Fecha de Modificaci&oacute;n</th>
                <th>Solucionado</th>
                <th>Editar</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
