<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Graficos.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.Graficos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Solicitudes de Gr&aacute;ficos</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/Graficos.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    
    <input type="button" id="btnNuevo" title="Nuevo Comentario" onclick="btnNuevoGrap_click();"/>
    <input type="button" id="btnGuardar" title="Guardar" onclick="btnSave_click();"/>
    <br />
    <label for="txtObservacion">Gr&aacute;ficos:</label>
    <input type="text" id="txtObservacion" />
    <br />
    <label for="lsbGraficos">Gr&aacute;ficos:</label>
    <br />
    <div id="divGraficos">
    </div>

</asp:Content>
