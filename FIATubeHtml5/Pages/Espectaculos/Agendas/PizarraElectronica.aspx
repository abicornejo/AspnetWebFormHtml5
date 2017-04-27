<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="PizarraElectronica.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Agendas.PizarraElectronica" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnActualizar" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <label for="cmbPrograma">Programa:</label>
    <select id="cmbPrograma"></select>
    <label for="cmbReporteros">Reporteros:</label>
    <select id="cmbReporteros"></select>
    <table id="tblPizarraElect">
        <thead>
            <tr>
                <th>Horario</th>
                <th>Asignaci&oacute;n</th>
                <th>Programa</th>
                <th>Reportero</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
