<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ForoCintas.aspx.cs" Inherits="FIATubeHtml5.Pages.Espectaculos.Foro.ForoCintas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnExportarWord" title="Actualizar">
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/buscar_1.png") %>" />
    </button>
    <label for="txtTexto">Texto:</label>
    <input type="text" id="txtTexto" />
    <label for="cmbAgencia">Agencia:</label>
    <select id="cmbAgencia"></select>
    <table id="tblCintas">
        <thead>
            <tr>
                <th>#Cinta</th>
                <th>Descripci&oacute;n</th>
                <th>Personajes</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</asp:Content>
