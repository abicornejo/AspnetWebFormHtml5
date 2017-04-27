<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminEmergencias.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminEmergencias" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <table>
        <tr>
            <td>Estado Actual del Servicio:</td>
            <td><label id="lblEstadoDesc"/></td>
        </tr>
        <tr>
            <td>Status:</td>
            <td><label id="lblStatus"></label></td>
        </tr>
        <tr>
            <td>Activar Servicio de Emergencia:</td>
            <td><input type="button" id="btnActivar" /></td>
        </tr>
    </table>
</asp:Content>
