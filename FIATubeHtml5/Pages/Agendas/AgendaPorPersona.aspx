<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaPorPersona.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.AgendaPorPersona" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="dtFecha">Agenda por fecha:</label>
    <input type="text" id="dtFecha" class="txtFecha"/>
    <input type="button" id="btnRefresh" class="btnActualizarAlone" title="Actualizar" />
    <br />
    <table id="tblAsignaciones">
        <thead>
            <tr>
                <th>Detalle</th>
                <th>OT</th>
                <th>T&iacute;tulo</th>
                <th>Fecha de Agenda</th>
                <th>Secci&oacute;n</th>
                <th>Gui&oacute;n</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
