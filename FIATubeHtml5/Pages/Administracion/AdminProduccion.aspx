<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminProduccion.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminProduccion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtPrograma">Nombre Programa:</label>
    <input type="text" id="txtPrograma" />
    <label for="txtAbreviatura">Abreviatura:</label>
    <input type="text" id="Abreviatura" />
    <input type="button" id="btnAgregar" />
    <input type="button" id="btnBuscar" />
    <br />
    <table id="tblProd">
        <thead>
            <tr>
                <th>Programas</th>
                <th>Abreviatura</th>
                <th>Abreviatura2</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
