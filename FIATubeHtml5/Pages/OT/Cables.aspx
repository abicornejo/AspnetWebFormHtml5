<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Cables.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.Cables" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/Cables.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
    <div class="divHeaderCables">
        <label for="cmbSecciones" class="title">Secciones:</label>
        <select id="cmbSecciones" class="cmbSecciones" onchange="cmbSecciones_change();"></select>
        <label for="lblTiempo" class="title">Tiempo Mostrado:</label>
        <button type="button" id="btnResTiempo" class="btnResTiempo" title="Menos Tiempo" onclick="btnResTiempo_click();"></button>
        <label id="lblTiempo" class="lblTiempoCables"></label>
        <button type="button" id="btnSumTiempo" class="btnAgrTiempo" title="Más Tiempo" onclick="btnSumTiempo_click();"></button>
        <label class="title">hrs</label>
        <label for="cmbTiempoAct" class="title">Tiempo de Actualizaci&oacute;n:</label>
        <select id="cmbTiempoAct" class="cmbTiempoAct" onchange="cmbTiempoAct_changed();">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option selected="selected" value="5">5</option>
        </select>
        <label for="cmbTiempoAct" class="title">min.</label>
        <button type="button" id="btnNuevaOT" class="btnNuevaOT" title="Crear Nueva Orden de Trabajo" onclick="btnNuevaOT_click();"></button> 
        <button type="button" id="btnNuevaProp" class="btnNuevaPropuesta" title="Crear Nueva Propuesta" onclick="btnNuevaProp_click();"></button>
        <button type="button" id="btnNuevoCable" class="btnNuevoCable" title="Crear Nuevo Cable" onclick="btnNuevoCable_click();"></button>
        <input type="hidden" id="hiddHrs" runat="server"/>
        <input type="hidden" id="hiddSec" runat="server" />
    </div>
    <div id="divTitleCables" class="divTitleCables">
        <div class="divTitlesCables varMarginTop">T&iacute;tulo</div>
                <div class="divTitlesCables">
                    <div class="divTitlesCablesDisponible">Disponible</div>                
                    <div class="divTitlesCablesDisponibleB">Avance</div>
                    <div class="divTitlesCablesDisponibleC">MB</div>
                    <div class="divTitlesCablesDisponibleC">VO</div>
                    <div class="divTitlesCablesDisponibleC">SOT</div>
                    <div class="divTitlesCablesDisponibleC">FT</div>
                </div>        
        <div class="divTitlesCables varMarginTop">Alerta</div>
        <div class="divTitlesCables varMarginTop">Descripci&oacute;n</div>
        <div class="divTitlesCables varMarginTop"># OT</div>
        <%--<div class="divTitlesCables">Copiar</div>--%>
    </div>

    <asp:UpdatePanel runat="server" id="updPanel1" EnableViewState="false">
        <ContentTemplate>
            <asp:Button id="btnActualizar" class="btnActualizarCables" title="Actualizar" runat="server" Text="" OnClick="btnActualizar_Click" OnClientClick="updateData();"/>
            <div id="divGridCables" class="divGridCables" runat="server">
                
            </div>
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
