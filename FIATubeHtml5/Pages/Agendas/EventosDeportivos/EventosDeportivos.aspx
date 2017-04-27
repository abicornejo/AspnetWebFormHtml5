<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EventosDeportivos.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.EventosDeportivos" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Eventos Deportivos</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/EventosDeportivos/EventosDeportivos.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>

    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <div id="divNavigator">
                <input type="button" id="btnAtras" title="Mes Anterior" onclick="btnGetNewDate(-1); return false;"/>
                <label id="lblMesActual" runat="server"></label>
                <asp:HiddenField ID="hiddDate" runat="server" />
                <input type="button" id="btnAdelante" title="Siguiente Mes" onclick="btnGetNewDate(1); return false;"/>
            </div>
            <br />
            <asp:Button id="btnActualizar" class="hideButton" runat="server" Text=""  OnClick="btnActualizar_Click" />

            <div id="divGridHeaders">
                <div class="divDomingo">Domingo</div>
                <div class="divLunes">Lunes</div>
                <div class="divMartes">Martes</div>
                <div class="divMiercoles">Miercoles</div>
                <div class="divJueves">Jueves</div>
                <div class="divViernes">Viernes</div>
                <div class="divSabado">S&aacute;bado</div>
            </div>

            <div id="divGridAgenda" class="divGridAgenda" runat="server" visible="true"></div>
            
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
