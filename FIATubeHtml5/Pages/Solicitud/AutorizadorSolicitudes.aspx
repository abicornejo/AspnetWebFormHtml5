<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AutorizadorSolicitudes.aspx.cs" Inherits="FIATubeHtml5.Pages.Solicitud.AutorizadorSolicitudes" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Solicitudes/AutorizadorSolicitudes.js?Rand="+RandomCall) %>"></script>

    <style type="text/css">
        .btnHidden
        {
            display:none;    
        }
    </style>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
    <div class="otButtonsBckgrnd">
        <label class="title">Local:</label>
        <select id="cmbLocales" class="cmbSecciones" onchange="cmbLocales_change();"></select>
        <label for="cmbSecciones" class="title">Secci&oacute;n:</label>
        <select id="cmbSecciones" class="cmbSecciones" onchange="value_change();"></select>
        <label for="cmbPrograma" class="title">Programa:</label>
        <select id="cmbPrograma" class="cmbPrograma" onchange="value_change();"></select>
        <label for="dtFechaIni" class="title">Fecha:</label>
        <input type="text" class="txtFechas2" id="dtFechaIni" />
        <label for="dtFechaFin" class="title">A:</label>
        <input type="text" class="txtFechas2" id="dtFechaFin" />
        <button type="button" id="btnUpdate" class="btnActualizarAutorizador" title="Actualizar" onclick="value_change();"></button>
        <input type="hidden" id="hiddSecc" runat="server" />
        <input type="hidden" id="hiddProg" runat="server" />
        <input type="hidden" id="hiddFecI" runat="server" />
        <input type="hidden" id="hiddFecF" runat="server" />
        <input type="hidden" id="hiddCveS" runat="server" />
        <input type="hidden" id="hiddLocl" runat="server" />
    </div>
    <asp:UpdatePanel runat="server" id="updPanel1" EnableViewState="false">
        <ContentTemplate>
            <asp:Button ID="btnActualizar" class="btnHidden" runat="server" ToolTip="Actualizar" OnClick="btnActualizar_Click" OnClientClick="actualizaDatos();" EnableViewState="false"/>
            <br />
            <div id="divTitulos" class="divTitulosAutorizador">
                <label class="divTitlesAutorizador paddingTop">Solicitud</label>
                <label class="divTitlesAutorizador paddingTop">OT</label>
                <label class="divTitlesAutorizador paddingTop">T&iacute;tulo</label>
                <label class="divTitlesAutorizador paddingTop">Descripci&oacute;n</label>
                <label class="divTitlesAutorizador paddingTop">Programa</label>
                <label class="divTitlesAutorizador paddingTop">Formato</label>
                <label class="divTitlesAutorizador paddingTop">Cliente</label>
                <label class="divTitlesAutorizador paddingTop">Local</label>
                <label class="divTitlesAutorizador">Fecha de <br /> Solicitud</label>
                <label class="divTitlesAutorizador">Fecha de <br /> Agenda</label>
                <label class="divTitlesAutorizador paddingTop">Estatus</label>
                <label class="divTitlesAutorizador paddingTop">Autorizar</label>
                <label class="divTitlesAutorizador paddingTop">Rechazar</label>
            </div>
            <div id="divContentResult" class="divContentResultAutorizador" runat="server" enableviewstate="false"></div>
        </ContentTemplate>  
    </asp:UpdatePanel>

    <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>
        </asp:updateprogress>
    </div>

</asp:Content>
