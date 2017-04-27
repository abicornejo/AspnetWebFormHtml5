<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EditarMonitoreo.aspx.cs" Inherits="FIATubeHtml5.Pages.AvancesMonitoreo.EditarMonitoreo" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/AvancesMonitoreo/EditarMonitoreo.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/jquery.meio.mask.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" EnablePageMethods="true">
    </asp:ScriptManager>

    <input type="button" id="btnGuardar" title="Guardar" onclick="updateData(); return false;"/>
    <br />
    <label>Hora:</label>
    <input type="text" id="txtHora" placeholder="HH:MM" maxlength="5" readonly="readonly"/>
    <br />
    <label>Fuente/Agencia:</label>
    <input type="text" id="txtFuenteAg" />
    <br />
    <label>Tema:</label>
    <input type="text" id="txtTema" />
    <br />
    <label>T&iacute;tulo:</label>
    <input type="text" id="txtTitulo" />
    <br />
    <label>Observaciones:</label>
    <textarea id="txtObservaciones"></textarea>
    <br />
    <label for="chkRelevancia">Relevante:</label>
    <input type="checkbox" id="chkRelevancia" />
</asp:Content>
