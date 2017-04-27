<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="DialogRestore.aspx.cs" Inherits="FIATubeHtml5.Pages.Video.DialogRestore" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Video/DialogRestore.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <button type="button" id="btnGuardar" title="Guardar" onclick="btnGuardar_click();"></button>
    <button type="button" id="btnCancelar" title="Calcelar" onclick="btnCancelar_click();"></button>
    <br />
    <label for="txtNombreArch">Escribe el nombre del archivo:</label>
    <br />
    <input type="text" id="txtNombreArch" maxlength="20"/>
    <input type="checkbox" id="chkNotificar" onclick="chkNotificar_click();"/>
    <label for="chkNotificar">Notificarme</label>
    <br />
    <label for="txtNombreArch">M&aacute;ximo 20 caracteres.</label>
    <br />
    <label for="cmbTipoRec">Tipo de recuperaci&oacute;n:</label>
    <label for="cmbEdicion">Edici&oacute;n:</label>
    <br />
    <select id="cmbTipoRec"></select>
    <select id="cmbEdicion"></select>
    <br />
    <label for="cmbProgramas">Producciones:</label>
    <br />
    <select id="cmbProgramas"></select>
    <label id="txtLeyenda">Se recuperar&aacute; el video completo</label>

    <div id="divCapCel">
        <label>Registre su Número de Celular (IUSA):</label>
        <br />
        <input type="phone" required="required" id="txtNumCel" onkeyup="txtNumCel_keyup();" />
        <button type="button" id="btnAcceptCel" title="Guardar" onclick="btnAcceptCel_click();"></button>
        <button type="button" id="btnCancelCel" title="Cancelar" onclick="btnCancelCel_click();"></button>
    </div>
</asp:Content>
