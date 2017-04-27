<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EmpleadosMultiples.aspx.cs" Inherits="FIATubeHtml5.Pages.Edicion.EmpleadosMultiples" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Edicion/EmpleadosMultiples.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div class="divButtonsBckgrndRealizadores">
    <button type="button" id="btnGuardar" title="Guardar" class="btnGuardarDuracion" onclick="btnGuardar_click(); return false;"></button>
    </div>
    <div id="divRealizadores" ></div>
</asp:Content>
