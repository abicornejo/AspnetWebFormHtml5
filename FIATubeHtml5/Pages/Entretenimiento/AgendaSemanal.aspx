<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaSemanal.aspx.cs" Inherits="FIATubeHtml5.Pages.Entretenimiento.AgendaSemanal" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnActualizar" title="Actualizar" >
        <img alt="Actualizar" src="<%=ResolveUrl("~/Images/iconos/refrescar.png") %>" />
    </button>
    <br />
    <label for="cmbSeccion">Secci&oacute;n:</label>
    <select id="cmbSeccion"></select>
    <br />
    <button type="button" id="btnAtras" title="Semana Anterior">
        <img alt="Semana Anterior" src="<%=ResolveUrl("~/Images/iconos/arrow_left.png") %>" />
    </button>
    <button type="button" id="btnAdelante" title="Semana Siguiente" >
        <img alt="Semana Siguente" src="<%=ResolveUrl("~/Images/iconos/arrow_right.png") %>" />
    </button>
</asp:Content>
