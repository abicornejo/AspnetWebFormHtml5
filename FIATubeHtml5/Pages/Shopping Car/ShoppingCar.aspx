<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ShoppingCar.aspx.cs" Inherits="FIATubeHtml5.Pages.Shopping_Car.ShoppingCar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
<title>Carrito de Compras</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Shopping Car/ShoppingCar.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
<div class="otButtonsBckgrnd">
    <div class="CarritoButtons">
        <button type="button" id="btnLimpiar" title="Limpiar"   class="btnNuevoCenter" onclick = "btnLimpiar_Click();"> </button>
        <button type="button" id="btnGuardar" title="Comprar" class="btnComprarCenter" onclick = "btnGuardar_Click();"> </button> 
    </div>

    <div id = "dvProgramas" >
         <label  for="cboProgramas" class="title">Programas:</label>
          <select id="cboProgramas" class="cmbProgramaCarritoCompras" onchange="cmbProgramas_selectionChanged();"></select>
    </div>
</div>
<div id="gridContenedor" class="gridContenedorCarritoRow">
</div>
<div id="Div1">

</div>
<div id="loading" class="cntrElement">
    <img alt="Loading..." id="ImgLoader" runat="server" src="../../Images/image-loading.gif" />
</div>

</asp:Content>
