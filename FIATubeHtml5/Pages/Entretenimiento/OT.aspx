<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="OT.aspx.cs" Inherits="FIATubeHtml5.Pages.Entretenimiento.OT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Entretenimiento.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtNumOT">No. OT:</label>
    <input type="text" id="txtNumOT" />
    <label>Estatus:</label>
    <button type="button" id="btnGuardar" title="Guardar">
        <img alt="Guardar" src="<%=ResolveUrl("~/Images/iconos/ico-guardar.png") %>" />
    </button>
    <button type="button" id="btnImprimir" title="Imprimir">
        <img alt="Imprimir" src="<%=ResolveUrl("~/Images/iconos/ico-imprimir.png") %>" />
    </button>
    <br />
    <div>
        <label>T&iacute;tulo:</label>
        <input type="text" id="txtTitulo" />
        <label>Objetivo:</label>
        <input type="text" id="txtObjetivo"/>
        <input type="text" id="dtFecha" />
        <label>Secci&oacute;n:</label>
        <select id="cmbSeccion"></select>
        <label>Tipo Nota:</label>
        <select id="cmbTipoNota"></select>
    </div>
    <div>
        <label>Equipo de Trabajo:</label>
        <label>Reportero:</label>
        <input type="text" id="txtReportero" />
        <button type="button" id="btnAddReportero" title="Agregar">
            <img alt="Agregar" src="<%=ResolveUrl("~/Images/iconos/mas.png") %>" />
        </button>
        <button type="button" id="btnDelReportero" title="Eliminar">
            <img alt="Eliminar" src="<%=ResolveUrl("~/Images/iconos/menos.png") %>" />
        </button>
        <select id="lsbReportero" size="5"></select>
    </div>
    <div>
        <label>Donde se va a Transmitir:</label>
        <table id="tblProgTransmitir">
            <thead>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</asp:Content>
