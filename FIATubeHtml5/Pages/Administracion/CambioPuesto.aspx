<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CambioPuesto.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.CambioPuesto" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="cmbPuestos">Puesto:</label>
    <select id="cmbPuestos">
    
    </select>
    <br />
    <input type="button" id="btnRegresar" title="Regresar a valores predeterminados"/>
    <input type="button" id="btnAplicar" title="Aplicar cambios"/>
</asp:Content>
