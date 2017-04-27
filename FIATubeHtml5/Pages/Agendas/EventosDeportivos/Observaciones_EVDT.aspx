<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Observaciones_EVDT.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.Observaciones_EVDT" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Observaciones</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/EventosDeportivos/Observaciones_EVDT.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnNuevo" title="Nuevo Comentario" onclick="btnNuevaObs_click();"></button>
    <button type="button" id="btnGuardar" title="Guardar" onclick="btnSave_click();"></button>
    <br />
    <label>Observaci&oacute;n:</label>
    <textarea id="txtObservacion"></textarea>
    <br />
    <label>Observaci&oacute;nes:</label>
    <br />
    <div id="divObservaciones">
        
    </div>
</asp:Content>
