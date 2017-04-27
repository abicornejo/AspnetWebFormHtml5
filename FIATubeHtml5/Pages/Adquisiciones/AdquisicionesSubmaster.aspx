<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdquisicionesSubmaster.aspx.cs" Inherits="FIATubeHtml5.Pages.Adquisiciones.AdquisicionesSubmaster" %>
<asp:Content ID="Content3" ContentPlaceHolderID="title" runat="server">
    <title>Submaster</title>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Adquisiciones.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <label for="dtFechaIni">Fecha Inicial:</label>
    <input type="text" id="dtFechaIni" />
    <label for="dtFechaFin">Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <input type="button" id="btnBuscar" value="B" data-tooltip="Buscar"/>
    <br />
    <div>Master/Submaster</div>
    <table id="tblAdquisiciones">
        <thead>
            <tr>
                <th>Video Master</th>
                <th>T&iacute;tulo</th>
                <th>Video SubMaster</th>
                <th>Sin SubMaster</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
