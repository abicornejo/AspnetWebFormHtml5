<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="TendenciaAnualEmpleado.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.Reportes.TendenciaAnualEmpleado" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Secci&oacute;n:</label>
    <select id="cmbSeccion"></select>
    <label>Puesto:</label>
    <select id="cmbPuesto"></select>
    <button type="button" id="btnAtras" title="Año Anterior"></button>
    <label id="lblFecha"></label>
    <button type="button" id="btnAdelante" title="Año Siguiente"></button>
    <table id="tblTendencias">
        <thead>
            <tr>
                <th>NumRow</th>
                <th>Gr&aacute;fica</th>
                <th>Nombre</th>
                <th>Secci&oacute;n</th>
                <th>Enero</th>
                <th>Febrero</th>
                <th>Marzo</th>
                <th>Abril</th>
                <th>Mayo</th>
                <th>Junio</th>
                <th>Julio</th>
                <th>Agosto</th>
                <th>Septiembre</th>
                <th>Octubre</th>
                <th>Noviembre</th>
                <th>Diciembre</th>
                <th>Total Excelente</th>
                <th>Notas Totales</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
