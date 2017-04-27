<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AvancesMoniSoloLectura.aspx.cs" Inherits="FIATubeHtml5.Pages.AvancesMonitoreo.AvancesMoniSoloLectura" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%= ResolveUrl("~/Scripts/Modulos/AvancesMonitoreo/ReporteAvancesMonitoreo.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
	</asp:ScriptManager>

    <input type="button" id="btnNueva" title="Nueva" onclick="createNewOT();" />
    <br />
    <label>Monitoreo:</label>
    <label id="lblMonitoreo" runat="server"></label>
    <br />
    <label>T&iacute;tulo:</label>
    <label id="lblTitulo" runat="server"></label>
    <br />
    <label>Fecha de creaci&oacute;n:</label>
    <label id="lblFecha" runat="server"></label>
    <br />
    <label>Avance:</label>
    <br />
    <textarea readonly="readonly" id="txtAvance" runat="server"></textarea>
    <asp:HiddenField ID="hiddVal" runat="server"/>
</asp:Content>
