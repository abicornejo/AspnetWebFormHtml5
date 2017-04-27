<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Replicar.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.Replicar" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
<title>Replicar</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/Replicar.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
<div class="otButtonsBckgrnd">
<button type="button" id="btnGuardar" class="btnGuardar" title="Guardar" onclick = "btnGuardar_Click();"> </button>
</div>
<div>
    <div class="otButtonsBckgrndPrincipal">
        <div class="itemsDgPlaylist"> <label id="lblOT">OT:</label></div>
        <div class="itemsDgPlaylist"> <label id="lblNumOT">OT: </label></div>
    </div>
    <div class="otButtonsBckgrndPrincipal">
        <div class="itemsDgPlaylist"><label id="lblPrograma">Programa:</label> </div>
        <div class="itemsDgPlaylist"><label id="lblNomPrograma">Programa:</label></div>
    </div>
</div>
<div id="dgFormatos">

</div>
<div id="loading" class="cntrElement">
    <img alt="Loading..." id="ImgLoader" runat="server" src="../../Images/image-loading.gif" />
</div>
</asp:Content>
 