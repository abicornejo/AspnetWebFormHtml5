<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CreaPropuestaMultiple.aspx.cs" Inherits="FIATubeHtml5.Pages.Propuesta.CreaPropuestaMultiple" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Propuesta/CreaPropuestaMultiple.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    
    <label># Propuestas a generar:</label>
    <input type="text" maxlength="2" id="txtNumProp" placeholder="__"/>

    <label>Secci&oacute;n:</label>
    <select id="cmbSeccion" onchange="reloadPropGrid(); return false;"></select>

    <label>Locales:</label>
    <select id="cmbLocales"></select>

    <button type="button" class="btnActualizarMultPropuesta" id="btnUpdate" title="Actualizar" onclick="reloadPropGrid(); return false;"></button>
    <button type="button" class="btnNuevaOTMultPropuestas" id="btnNewOT" title="Nueva OT" onclick="reloadPropGrid(); return false;"></button>
    <button type="button" class="btnGuardarMultPropuestas" id="btnSave" title="Guardar" onclick="btnSave_click(); return false;"></button>

    <div id="divProp" >
        <div id="divPropHeader" class="divMultPropuestasTitlesContainer">
            <div class="divNumberMultPropuestasTitle"></div>
            <div class="divMultPropuestasTitles">T&iacute;tulo</div>
            <div class="divMultPropuestasTitles">Objetivo</div>
            <div class="divMultPropuestasTitles">Fecha Agenda</div>
            <div class="divMultPropuestasTitles">Reportero</div>
            <div class="divMultPropuestasTitles">Tipo de Nota</div>
            <div class="divMultPropuestasTitles">No. Prop</div>
        </div>
        <div id="divPropContent" class="divGridMultiplesPropuestas"></div>
    </div>

</asp:Content>
