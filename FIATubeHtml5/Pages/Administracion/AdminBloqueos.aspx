<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminBloqueos.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminBloqueos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Filtrar por:</label>
    <select id="cmbBloqueos"></select>
    <input type="button" id="btnDesbloqueo" />
    <br />
    <table>
        <thead>
            <tr>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Img. Referencia</th>
                <th>Responsable Bloqueo</th>
                <th>Tipo Bloqueo</th>
                <th>Detalle</th>
                <th>Fecha Bloqueo</th>
                <th>Desbloquear</th>
            </tr>
        </thead>
    </table>
</asp:Content>
