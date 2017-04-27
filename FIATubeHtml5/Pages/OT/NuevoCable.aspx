<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="NuevoCable.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.NuevoCable" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/NuevoCable.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="divTopCable">
        <button type="button" id="btnGuardar" class="btnGuardarCable" title="Guardar" onclick="btnGuardar_click();"></button>
        <button type="button" id="btnCancelar" class="btnCancelarCable" title="Cancelar" onclick="btnCancelar_click();"></button>
    </div>
    <div class="divBodyCable">
        <div class="divBodyCableSecc">
            <label for="txtTitulo" class="lblNuevoCable">T&iacute;tulo:</label>
            <input type="text" class="inputNuevoCable" id="txtTitulo" maxlength="100" runat="server"/>
        </div>
        <div class="divBodyCableSecc">
            <label for="txtDescripcion" class="lblNuevoCable">Descripci&oacute;n:</label>
            <textarea rows="5" class="inputNuevoCable" id="txtDescripcion" runat="server"></textarea>        
        </div>
        <div class="divBodyCableSecc">
            <label for="cmbSecciones" class="lblNuevoCable">Secci&oacute;n:</label>
            <label id="txtSeccion" class="inputNuevoCable sinOutline" runat="server"></label>
        </div>
        <div class="divBodyCableSecc">            
            <select id="cmbSecciones" class="inputNuevoCable" runat="server" onchange="cmbSeccion_changed();"></select>
        </div>
        <div class="divBodyCableSecc">
            <label for="cmbReporteros" class="lblNuevoCable">Reportero:</label>
            <select id="cmbReporteros" class="inputNuevoCable" runat="server"></select>
        </div>
        <div class="divBodyCableSecc">
            <label for="txtAvance" class="lblNuevoCable">Avance:</label>
            <textarea rows="5" id="txtAvance" class="inputNuevoCable" onkeypress="return imposeMaxLength(this, 3999);" runat="server"></textarea>
        </div>
            <input type="hidden" class="inputNuevoCable" id="hidSecc" runat="server"/>
       
    </div>
</asp:Content>
