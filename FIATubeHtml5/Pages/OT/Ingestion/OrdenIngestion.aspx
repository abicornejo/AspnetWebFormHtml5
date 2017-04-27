<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="OrdenIngestion.aspx.cs" Inherits="FIATubeHtml5.Pages.Ingestion.OrdenIngestion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Ingestiones.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>OT:</label>
    <input type="text" id ="txtOT" />
    <label>T&iacute;tulo:</label>
    <input type="text" id="txtTitulo" />
    <label>Reportero:</label>
    <select id="cmbReportero"></select>
    <button type="button" id="btnNuevo" title="Nueva Ingestión"></button>
    <button type="button" id="btnExport" title="Exportar"></button>
    <button type="button" id="btnActualiza" title="Actualizar"></button>
    <label>Secci&oacute;n:</label>
    <select id="cmbSeccion"></select>
    <label>Fecha:</label>
    <input type="text" id="dtFechaIni" />
    <label>A:</label>
    <input type="text" id="dtFechaFin" />
    <label>Tipo:</label>
    <select id="cmbTipo"></select>
    <table id="tblOrdenIngestiones">
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Secci&oacute;n</th>
                <th>Tipo</th>
                <th>Estatus</th>
                <th>Detalle/No. Cinta</th>
                <th>Fecha Ingesti&oacute;n</th>
                <th>Fecha Creaci&oacute;n</th>
                <th>Duraci&oacute;n</th>
                <th>Reportero</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
