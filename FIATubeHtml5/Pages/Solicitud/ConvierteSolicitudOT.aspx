<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ConvierteSolicitudOT.aspx.cs" Inherits="FIATubeHtml5.Pages.Solicitud.ConvierteSolicitudOT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Crear OT</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Solicitudes/ConvierteSolicitudOT.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="otButtonsBckgrnd">
        <button type="button" class="btnGuardar" id="btnGuardar" title="Guardar" onclick="btnGuardar_Click();"></button>
    </div>
    <div class="divBodyCrearOT">
        <div class="divBodyCreaOTSecc">
            <label class="title" for="txtTitulo">T&iacute;tulo:</label>
            <input class="txtInputMaster varFloatLeft varWidth200" type="text" id="txtTitulo" maxlength="200"/>
            <label class="title" for="dtFechaAgenda">Agenda:</label>
            <input class="txtFechas2" type="text" id="dtFechaAgenda" placeholder="dd/MM/yyyy"/>
        </div>
        <div class="divBodyCreaOTSecc">
            <label class="title" for="txtObjetivo">Objetivo:</label>
            <textarea class="txtInputMaster varFloatLeft" id="txtObjetivo" onkeypress="return imposeMaxLength(this, 3999);"></textarea>
            <label class="title" for="lblLocal">Local:</label>
            <label class="title" id="lblLocal"></label>
        </div>
        <div class="divBodyCreaOTSecc">
            <label class="title" for="cmbPrograma">Programa:</label>
            <select class="cmbCreaOT" id="cmbPrograma"></select>
            <label class="title" for="cmbFormato">Formato:</label>
            <select class="cmbCreaOT" id="cmbFormato"></select>
        </div>
        <div class="divBodyCreaOTSecc">
            <label class="title">Equipo de Trabajo:</label>
        </div>        
        <div class="divBodyCreaOT3Secc">
            <label class="title" for="txtReportero">Reportero:</label>
            <input class="txtInputMaster varFloatLeft" type="text" id="txtReportero" />
            <button class="btnAgregarCreaOT" type="button" id="btnAddRep" onclick="btnAddReportero_click();"></button>
            <button class="btnResCreaOT" type="button" id="btnDelRep" onclick="btnDelReportero_click();"></button>
            <br />
            <select class="divInputCreaOT" id="lsbReporteros" size="8"></select>
        </div>
        <div class="divBodyCreaOT3Secc">
            <label class="title" for="txtCamaro">Camar&oacute;grafo:</label>
            <input class="txtInputMaster varFloatLeft" type="text" id="txtCamaro" />
            <button class="btnAgregarCreaOT" type="button" id="btnAddCam" onclick="btnAddCamaro_click();"></button>
            <button class="btnResCreaOT" type="button" id="btnDelCam" onclick="btnDelCamaro_click();"></button>
            <br />
            <select class="divInputCreaOT" id="lsbCamaro" size="8"></select>
        </div>
        <div class="divBodyCreaOT3Secc">
        <label class="title" for="txtEditor">Editor:</label>
            <input class="txtInputMaster varFloatLeft" type="text" id="txtEditor" />
            <button class="btnAgregarCreaOT" type="button" id="btnAddEdi" onclick="btnAddEditor_click();"></button>
            <button class="btnResCreaOT" type="button" id="btnDelEdi" onclick="btnDelEditor_click();"></button>
            <br />
            <select class="divInputCreaOT" id="lsbEditor" size="8"></select>
        </div>

    </div>
</asp:Content>
