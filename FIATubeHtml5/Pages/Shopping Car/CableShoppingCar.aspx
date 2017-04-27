<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="CableShoppingCar.aspx.cs" Inherits="FIATubeHtml5.Pages.Shopping_Car.CableShoppingCar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Shopping Car/CableShoppingCar.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="otButtonsBckgrndWindows">
        <button type="button" id="btnGuardarCab" class="btnGuardarCable" title="Guardar" onclick="btnGuardarCab_click();"></button>
        <button type="button" id="btnCancelarCab" class="btnCancelarCable" title="Cancelar" onclick="btnCancelarCab_click();"></button>
    </div>
    <div class="divBodyCompraCable">
        <div class="divBodyCableSecc">    
            <label for="cmbProgramasCab" class="lblNuevoCable">Programa:</label>
            <select id="cmbProgramasCab" class="cmbProgramaCables"></select>
        </div>
        <div class="divBodyCableSecc">
            <label for="cmbFormatoCab" class="lblNuevoCable">Formato:</label>
            <select id="cmbFormatoCab" class="cmbFormatoCables"></select>
        </div>
        <div class="divBodyCableSecc">
            <label for="dtFechaCab" class="lblNuevoCable">Fecha:</label>
            <input type="text" id="dtFechaCab" class="txtFechas2" />
        </div>
    </div>
</asp:Content>
