<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AsignacionOT.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Agendas.AsignacionOT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Espectaculos.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnGuardar" title="Guardar Asignacion">
        <img alt="Guardar" src="<%=ResolveUrl("~/Images/iconos/ico-guardar.png") %>" />
    </button>
    <button type="button" id="btnImprimir" title="Imprimir">
        <img alt="Imprimir" src="<%=ResolveUrl("~/Images/iconos/ico-imprimir.png") %>" />
    </button>
    <button type="button" id="btnActualizar" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <label>OT:</label>
    <label for="txtEvento">Evento:</label>
    <input type="text" id="txtEvento" />
    <label for="txtObservaciones">Observaciones:</label>
    <textarea id="txtObservaciones"></textarea>
    <label for="txtLugar">Lugar:</label>
    <textarea id="txtLugar"></textarea>
    <label for="dtFecha">Fecha:</label>
    <input type="text" id="dtFecha" />
    <label for="txtHoraIni">Hora Inicio:</label>
    <input type="text" id="txtHoraIni" />
    <label for="cmbReporteros">Reporteros:</label>
    <select id="cmbReporteros"></select>
    <label for="cmbRealizadores">Realizadores:</label>
    <select id="cmbRealizadores"></select>
    <table id="tblAsignaciones">
        <thead>
            <tr>
                <th>Eliminar</th>
                <th>Actualizar</th>
                <th>Reportero</th>
                <th>Realizador</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Programa</th>
                <th>T&iacute;tulo</th>
                <th>Objetivo</th>
                <th>Lugar</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
