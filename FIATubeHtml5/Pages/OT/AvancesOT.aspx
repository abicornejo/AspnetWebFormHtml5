<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AvancesOT.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.AvancesOT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Avances OT</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/AvancesOT.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
   <div class="otButtonsBckgrndAvancesOT">
    <button type="button" id="btnGuardar" class="btnGuardar" title="Guardar" onclick="btnGuardar_Click();"></button>
   </div>
    <br />
<div class="divDatosOTAvancesA">
   
       <div class="divOTTitulos">
        <label id="preTxtNumOT" for="lblNumOT"></label>
       </div>
    <div class="divOTResultado">
        <label id="lblNumOT"></label>
    </div>

    <div id="datosProp2">
        <label for="txtQue">¿Que Pas&oacute;?</label>
        <input type="text" id="txtQue" />
        <br />
  </div>

       <div class="divOTTitulos">
        <label for="lblTitulo">T&iacute;tulo:</label>
       </div>
       <div class="divOTResultado">
        <label id="lblTitulo"></label>
       </div>

    <div id="datosProp">
        <label for="txtCuando">¿Cuando Pas&oacute;?</label>
        <input type="text" id="txtCuando" />
        <br />
        <label for="txtQuien">¿Quien est&aacute; Involucrado?</label>
        <br />
        <input type="text" id="txtQuien" />
    </div>
    <br />
 <div class="divOTTitulos">
    <label for="txtAvances">Avances:</label>
 </div>
    <br />
  <div class="divOTResultadoTextArea">
    <textarea rows="4" id="txtAvances" class="txtAvances"></textarea>
  </div>
  
  </div>

    <input type="hidden" id="hiddAvG" data-AV="0" />
    <div id="divAvancesGuardados">
    </div>

    <div id="divEliminar">
        ¿Realmente desea borrar los Avances?
    </div>
</asp:Content>
