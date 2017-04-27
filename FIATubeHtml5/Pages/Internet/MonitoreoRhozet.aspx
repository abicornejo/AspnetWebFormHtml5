<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="MonitoreoRhozet.aspx.cs" Inherits="FIATubeHtml5.Pages.Internet.MonitoreoRhozet" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Internet.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="text" id="dtFechaIni" />
    <input type="text" id="dtFechaFin" />
    <label>Tiempo restante:</label>
    <label id="lblTiempo">00</label>
    <label>segundos</label>
    <button type="button" id="btnActualizar" title="Actualizar"></button>
    <table id="tblConsulta">
        <thead>
            <tr>
                <th>OT</th>
                <th>Clave Nota</th>
                <th>Fecha</th>
                <th>Video</th>
                <th>Hr Envio el XML</th>
                <th>Hr termino Transcodificar</th>
                <th>Hr termino enviar</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
