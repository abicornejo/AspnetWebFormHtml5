<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ApelacionesMensual.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.ApelacionesMensual" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="cmbProduccion">Produccion:</label>
    <select id="cmbProduccion"></select>
    <button type="button" id="btnAtras" title="Mes Anterior"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante" title="Mes Siguiente"></button>
    <label># Notas</label>
    <label># Apeladas</label>
    <label># Autorizadas</label>
    <label># Rechazadas</label>
    <label># en Atenci&oacute;n</label>

    <label id="lblNotas"></label>
    <label id="lblApeladas"></label>
    <label id="lblAutorizadas"></label>
    <label id="lblRechazadas"></label>
    <label id="lblAtencion"></label>

    <label>En Atenci&oacute;n</label>

    <table id="tblAtencion">
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Secci&oacute;n</th>
                <th>Programa</th>
                <th>Fecha al Aire</th>
                <th>Comentario Eval.</th>
                <th>Evaluaci&oacute;n Apelada</th>
                <th>Comentario Apelaci&oacute;n</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <label>Rechazadas</label>
    <table id="tblRechazadas">
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Secci&oacute;n</th>
                <th>Programa</th>
                <th>Fecha al Aire</th>
                <th>Comentario Eval.</th>
                <th>Evaluaci&oacute;n Apelada</th>
                <th>Comentario Apelaci&oacute;n</th>
                <th>Comentario Final</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <label>Autorizadas</label>
    <table id="tblAutorizadas">
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Secci&oacute;n</th>
                <th>Programa</th>
                <th>Fecha al Aire</th>
                <th>Comentario Eval.</th>
                <th>Evaluaci&oacute;n Apelada</th>
                <th>Comentario Apelaci&oacute;n</th>
                <th>Comentario Final</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
