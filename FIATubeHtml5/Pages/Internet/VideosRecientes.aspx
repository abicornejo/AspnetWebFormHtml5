<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="VideosRecientes.aspx.cs" Inherits="FIATubeHtml5.Pages.Internet.VideosRecientes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Intervalo de busqueda:</label>
    <select id="cmbHorasVideo"></select>
    <label>Buscar:</label>
    <input type="text" id="txtBusqueda" />
    <button type="button" id="btnGuardarVideo" title="Actualizar Video"></button>
    <button type="button" id="btnActualizaMetadata" title="Actualiza Metadata"></button>
    <button type="button" id="btnGuardar" title="Guardar"></button>
    <button type="button" id="btnActualizar" title="Actualizar"></button>
    <table id="tblTelDatos">
        <thead>
            <tr>
                <th>OT</th>
                <th>Imagen</th>
                <th>T&iacute;tulo</th>
                <th>Duraci&oacute;n</th>
                <th>Programa</th>
                <th>Fecha</th>
                <th>Historico</th>
                <th>Aprobada</th>
                <th></th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <div id="divAutorizador">
        <label>OT</label>
        <input type="text" id = "txtOT" />
        <label>Programa OT</label>
        <input type="text" id="txtPrograma" />
        <label>T&iacute;tulo:</label>
        <input type="text" id="txtTitulo" />
        <label>Teaser:</label>
        <input type="text" id="txtTeaser" />
        <input type="checkbox" id="chkMismo" />
        <label for="chkMismo">Mismo</label>
        <label>Categorias:</label>
        <select id="cmbCategorias"></select>
        <label>Prioridad:</label>
        <select id="cmbPrioridad"></select>
        <label>Programa:</label>
        <select id="cmbPrograma"></select>
        <label>Nota:</label>
        <textarea id="txtNota"></textarea>
        <button type="button" id="btnBorraGuion" title="Limpiar Guion">
            <img alt="Limpiar" src="<%=ResolveUrl("~/Images/iconos/clear.png") %>" />
        </button>
        <label>Keyword:</label>
        <input type="text" id="txtKeyword" />
        <button type="button" id="btnAddKeyWord" title="Agregar"></button>
        <button type="button" id="btnDelKeyWord" title="Eliminar"></button>
        <select id="lsbKeyword" size="3"></select>
        <label>Reporteros:</label>
        <select id="lsbReporteros" size="3"></select>
        <label>Gui&oacute;n:</label>
        <textarea id="txtGuion"></textarea>
        <label>Avances:</label>
        <textarea id="txtAvances"></textarea>
    </div>
</asp:Content>
