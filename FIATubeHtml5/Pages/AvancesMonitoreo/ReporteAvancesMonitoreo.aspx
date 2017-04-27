<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ReporteAvancesMonitoreo.aspx.cs" Inherits="FIATubeHtml5.Pages.AvancesMonitoreo.ReporteAvancesMonitoreo" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/AvancesMonitoreo/ReporteAvancesMonitoreo.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>

    <label for="dtFecha">Fecha:</label>
    <input type="text" id="dtFecha" onchange="updateData(); return false;" />
    <input type="button" id="btnRefresh" title="Actualizar" onclick="updateData();" />
    <br />

    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <asp:Button id="btnOpenAdvanc" runat="server" Text="" CssClass="hideButton" OnClick="btnOpenAdvance_Click" />
            <asp:HiddenField runat="server" ID="hiddCurV" />
            <asp:Button id="btnActualizar" runat="server" Text="" CssClass="hideButton" OnClick="btnActualizar_Click" OnClientClick="setFilters();" />
            <asp:HiddenField id="hiddDate" runat="server"/>
            <asp:HiddenField id="hiddFabr" runat="server"/>
            <div id="divAvances" visible="true">
                <div id="div1">
                    <div>Hora</div>
                    <div>T&iacute;tulo</div>
                    <div>Tipo de Monitoreo</div>
                </div>
                <div id="divContentResult" runat="server" enableviewstate="false"></div>
            </div>
        </ContentTemplate> 
    </asp:UpdatePanel>

    <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
        <progresstemplate>
            <img alt="Loading..." src="../../Images/image-loading.gif">
        </progresstemplate>

    </asp:updateprogress>

    





</asp:Content>
