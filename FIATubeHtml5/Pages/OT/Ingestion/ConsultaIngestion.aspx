<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ConsultaIngestion.aspx.cs" Inherits="FIATubeHtml5.Pages.Ingestion.ConsultaIngestion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Ingestiones.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>OT:</label>
    <input type="text" id="txtOT" />
    <label>Fecha:</label>
    <input type="text" id="dtFechaIni" />
    <label>A:</label>
    <input type="text" id="dtFechaFin" />
    <button type="button" id="btnNuevo" title="Nuevo"></button>
    <button type="button" id="btnActualiza" title="Actualizar"></button>
    <label>Secci&oacute;n:</label>
    <select id="cmbSeccion"></select>
    <label>Tipo:</label>
    <select id="cmbTipo"></select>
    <table id="tblIngestiones">
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Fecha</th>
                <th>Secci&oacute;n</th>
                <th>Estatus</th>
                <th>Ingesti&oacute;n</th>
                <th># Cinta</th>
                <th>Recepci&oacute;n</th>
                <th>Ingesti&oacute;n</th>
                <th>Entrega</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
