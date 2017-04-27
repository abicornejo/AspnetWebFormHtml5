<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="OrdenIngestion.aspx.cs" Inherits="FIATubeHtml5.Pages.Ingestion.OrdenIngestion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Ingestion/OrdenIngestion.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="otButtons">
        <button type="button" id="btnNuevo" class="btnNuevoCenter" title="Nueva Ingestión" onclick = "btnNuevo_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"> </button>
    </div>
</asp:Content>
