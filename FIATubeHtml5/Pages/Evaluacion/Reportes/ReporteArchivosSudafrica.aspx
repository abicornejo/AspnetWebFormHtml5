<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ReporteArchivosSudafrica.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.ReporteArchivosSudafrica" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Fecha Inicial:</label>
    <input type="text" id="dtFechaIni" />
    <label>Tipo Material:</label>
    <select id="cmbTipoMat"></select>
    <label>Clip Name:</label>
    <input type="text" id="txtClipName" />
    <button type="button" id="btnExport" title="Exportar"></button>
    <button type="button" id="btnActualizar" title="Actualizar"></button>
    <label>Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <label>Tipo Video:</label>
    <select id="cmbTipoVideo"></select>
    <label for="chkClodesCapt">Closed Caption:</label>
    <input type="checkbox" id="chkClodesCapt" />
    <table id="tblDatos">
        <thead>
            <tr>
                <th>Id Archivo</th>
                <th>Nombre Clip</th>
                <th>Fecha</th>
                <th>Tipo Material</th>
                <th>Programa</th>
                <th>Tipo Video</th>
                <th>Closed Caption</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
