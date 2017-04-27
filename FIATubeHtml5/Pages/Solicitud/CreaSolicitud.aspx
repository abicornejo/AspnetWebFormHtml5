<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CreaSolicitud.aspx.cs" Inherits="FIATubeHtml5.Pages.Solicitud.CreaSolicitud" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Solicitar</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Solicitudes/CreaSolicitud.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    
    <div class="otButtonsBckgrnd">
        <label for="lblNoSolicitud">No. Solicitud:</label>
        <label id="lblNoSolicitud"></label>
        <button type="button" class="btnNuevo" id="btnNuevo" title="Nueva Solicitud" onclick="btnNuevo_Click();"></button>
        <button type="button" class="btnGuardar" id="btnGuardar" title="Guardar" onclick="btnGuardar_Click();"></button>
    </div>
    <div class="divBodySolicitar"> 
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud">T&iacute;tulo:</label>
            <input class="inputSoli" type="text" id="txtTitulo"  maxlength="250"/>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud" for="txtObjetivo">Objetivo:</label>
            <textarea rows="5" class="inputSoli" id="txtObjetivo"  onkeypress="return imposeMaxLength(this, 1999);"></textarea>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud">Local:</label>
            <select  class="inputSoli" id="cmbLocales"  onchange="cmbLocales_changed();"></select>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud" for="cmbSecciones">Secci&oacute;n:</label>
            <select  class="inputSoli" id="cmbSecciones"  onchange="cmbSecciones_changed();"></select>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud" for="cmbFormato">Formato:</label>
            <select class="inputSoli" id="cmbFormato" ></select>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud" for="cmbPrograma">Programa:</label>
            <select class="inputSoli" id="cmbPrograma"  onchange="cmbPrograma_changed();"></select>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud" for="cmbCliente">Cliente:</label>
            <select class="inputSoli" id="cmbCliente" "></select>
        </div>
        <div class="divBodySolicitarSecc">
            <label class="lblSolicitud" for="dtFechaAgenda">Fecha de Agenda:</label>
            <input class="txtFechas2"  type="text" id="dtFechaAgenda" />
        </div>
    </div>
</asp:Content>
