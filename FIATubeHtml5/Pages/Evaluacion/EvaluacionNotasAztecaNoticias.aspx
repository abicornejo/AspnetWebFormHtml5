<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EvaluacionNotasAztecaNoticias.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.EvaluacionNotasAztecaNoticias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Evaluacion.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Fecha:</label>
    <input type="text" id="dtFecha" />
    <button type="button" id="BtnBuscar" title="Buscar"></button>
    <label>Notas por evaluar</label>
    <table id="tblNotasPendientes">
        <thead>
            <tr>
                <th>T&iacute;tulo</th>
                <th>Evaluaci&oacute;n</th>
                <th>Cancelar</th>
                <th>URL</th>
                <th>Hora</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <label>Notas Evaluadas</label>
    <table id="tblNotasEvaluada">
        <thead>
            <tr>
                <th>T&iacute;tulo</th>
                <th>Evaluaci&oacute;n</th>
                <th>Cancelar</th>
                <th>URL</th>
                <th>Hora</th>
                <th>Nombre Evaluador</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
