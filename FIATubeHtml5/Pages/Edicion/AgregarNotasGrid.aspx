<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgregarNotasGrid.aspx.cs" Inherits="FIATubeHtml5.Pages.Edicion.AgregarNotasGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnGuardar" title="Guardar" />
    <input type=button id="btnBuscar" title="Buscar" />
    <br />
    <label for="txtOT">OT:</label>
    <input type="text" id="txtOT" />
    <label for="dtFecha">Fecha:</label>
    <input type="text" id="dtFecha" />
    <label for="cmbPrograma">Programa:</label>
    <select id="cmbPrograma"></select>
</asp:Content>
