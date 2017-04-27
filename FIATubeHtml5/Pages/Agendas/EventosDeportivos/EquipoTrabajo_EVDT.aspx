<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EquipoTrabajo_EVDT.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.EquipoTrabajo_EVDT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Equipo de Trabajo</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/EventosDeportivos/EquipoTrabajo_EVDT.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="text" id="txtPers"/>
    <input type="button" id="btnAddPers" onclick="addPersonal();"/>
    <input type="button" id="btnDelPers" onclick="deletePersonal();"/>
    <br />
    <select multiple="multiple" size="15" id="lsbPers"></select>
</asp:Content>
