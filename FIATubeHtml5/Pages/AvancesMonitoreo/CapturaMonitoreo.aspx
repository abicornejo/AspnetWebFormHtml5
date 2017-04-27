<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CapturaMonitoreo.aspx.cs" Inherits="FIATubeHtml5.Pages.AvancesMonitoreo.CapturaMonitoreo" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/AvancesMonitoreo/CapturaMonitoreo.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" EnablePageMethods="true">
    </asp:ScriptManager>

    <div>
        <div>
            <div><label>F&aacute;brica:</label></div>
            <div><label>Tipo de Monitoreo:</label></div>
            <div><label>Fecha de Evento:</label></div>
        </div>
        <div>
            <div><label id="lblFabrica"></label></div>
            <div><select id="cmbTipoMon"></select></div>
            <div><input type="text" id="dtFEve" runat="server" onchange="loadMonitorsPerDay(); return false;"/></div>
        </div>
    </div>
    
    <input type="button" id="btnGuardar" title="Guardar" onclick="saveMonitor(); return false;"/>
    <br />
    
    <div id="divRegCapt">
        <div id="divRegCaptHeaders">
            <div>Hora</div>
            <div>Fuente/Agencia</div>
            <div>Tema</div>
            <div>T&iacute;tulo</div>
            <div>Observaciones</div>
            <div>Relevancia</div>
        </div>

        <div id="divRegCapContent"></div>
    </div>

    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <div>
                <div>
                    <div>Hora</div>
                    <div>Tipo de Monitoreo</div>
                    <div>Fuente/Agencia</div>
                    <div>Tema</div>
                    <div>T&iacute;tulo</div>
                    <div>Observaciones</div>
                    <div>Relevancia</div>
                    <div>Editar</div>
                    <div>Eliminar</div>
                </div>
                <asp:HiddenField ID="hiddVal" runat="server" />
                <div id="divMonitorContent" runat="server"></div>
            </div>

            <asp:Button id="btnUpdateData" runat="server" Text="" CssClass="hideButton" OnClick="btnUpdateData_Click" />
            <asp:Button id="btnSendEdit" runat="server" Text="" CssClass="hideButton" OnClick="btnSendEdit_Click" />
        </ContentTemplate> 
    </asp:UpdatePanel>

    <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
        <progresstemplate>
            <img alt="Loading..." src="../../Images/image-loading.gif">
        </progresstemplate>
    </asp:updateprogress>

</asp:Content>
