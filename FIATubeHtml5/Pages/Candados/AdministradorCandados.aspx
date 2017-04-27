<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdministradorCandados.aspx.cs" Inherits="FIATubeHtml5.Pages.Candados.AdministradorCandados" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnGuardar" title="Guardar" />
    <br />
    <label for="cmbAnio">Año:</label>
    <select id="cmbAnio"></select>
    <label for="cmbMes">Mes:</label>
    <select id="cmbMes"></select>
    <br />
    <table id="tblCandados">
        <thead>
            <tr>
                <th>Eliminar</th>
                <th>¿Quien creo?</th>
                <th>Fecha Cierre</th>
            </tr>
        </thead>
    </table>
</asp:Content>
