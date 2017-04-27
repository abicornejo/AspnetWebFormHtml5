<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="RealizadoresMultiples.aspx.cs" Inherits="FIATubeHtml5.Pages.Edicion.RealizadoresMultiples" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="BtnGuardar" title="Guardar" />
    <br />
    <label for="txtOT">OT:</label>
    <input type="text" id="txtOT" />
    <br />
    <label for="txtPrograma">Programa:</label>
    <input type="text" id="txtPrograma" />
    <br />
    <label for="txtTitulo">T&iacute;tulo:</label>
    <input type="text" id="txtTitulo" />
    <br />
    <label for="txtRealizador">Realizador:</label>
    <input type="text" id="txtRealizador" />
    <input type="button" id="btnAddRealizador" title="Agregar" />
    <input type="button" id="btnDelRealizador" title="Eliminar" />
    <br />
    <select id="lsbRealizadores" size="7"></select>
</asp:Content>
