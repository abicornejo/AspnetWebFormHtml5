<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgregarProduccion.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AgregarProduccion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtProduccion">Producci&oacute;n:</label>
    <input type="text" id="txtProduccion" />
    <label for="txtAbreviatura">Abreviatura:</label>
    <input type="text" id="Abreviatura" />
    <label for="txtAbreviatura2">Abreviatura2:</label>
    <input type="text" id="txtAbreviatura2" />
    <input type="button" id="btnAgregar" title="Agregar Producción" />
    <br />
    <table id="tblProd">
        <thead>
            <tr>
                <th>Programas</th>
                <th>Abreviatura</th>
                <th>Abreviatura2</th>
            </tr>
        </thead>
    </table>
</asp:Content>
