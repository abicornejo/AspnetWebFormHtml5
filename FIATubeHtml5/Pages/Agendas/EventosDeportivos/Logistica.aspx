<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Logistica.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.Logistica" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Log&iacute;stica</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/EventosDeportivos.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnNuevo" title="Adjuntar Archivo" />
    <input type="button" id="btnGuardar" title="Guardar" />
    <input type="button" id="btnEliminar" title="Eliminar" />
    <br />
    <label for="txtLugar">Lugar:</label>
    <textarea id="txtLugar"></textarea>
    <br />
    <label for="dtFechaInicio">Fecha:</label>
    <input type="text" id="dtFechaInicio" />
    <br />
    <label for="txtHora">Hora:</label>
    <input type="text" id="txtHoraInicio" />
    <br />
    <label for="txtObservacion">Observaci&oacute;n:</label>
    <textarea id="txtObservacion"></textarea>
    <br />
    <label for="tblArchivos">Archivos:</label>
    <br />
    <table id="tblArchivos">
        <thead>
        </thead>
        <tbody>
        </tbody>
    </table>
    <br />
    <label for="tblLogisticas">Log&iacute;sticas:</label>
    <br />
    <table id="tblLogisticas">
        <thead>
            <tr>
                <th>Lugar</th>
                <th>Fecha</th>
                <th>Hora</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
