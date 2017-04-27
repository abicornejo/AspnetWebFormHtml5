<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Diccionario.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.Diccionario" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Agregar sinonimos</label>
    <input type="button" id="btnPublicar" title="Publicar" />
    <br />
    <div>
        <label for="txtTerminoCve">Termino clave</label>
        <label for="txtSinonimos1">Sinonimos en una direcci&oacute;n</label>
        <label for="txtSinonimos2">Sinonimos en ambas direcciones</label>
        <br />
        <input type="text" id="txtTerminoCve"/>
        <textarea id="txtSinonimos1" title="Separar frases y términos con comas"></textarea>
        <textarea id="txtSinonimos2" title="Separar frases y términos con comas"></textarea>
        <input type="button" id="btnAgregar" />
        <input type="button" id="btnLimpiar" title="Cancelar"/>
    </div>
    <label>Total sinonimos:</label>
    <br />
    <label for="txtFiltro">Filtrar por:</label>
    <input type="text" id="txtFiltro"/>
    <input type="button" id="btnFiltrar" title="Filtrar" />
    <br />
    <table id="tblCtrlsDinamics">
        <thead>
            <tr>
                <th></th>
                <th>Termino clave</th>
                <th>Sinonimos en una direcci&oacute;n</th>
                <th>Sinonimos en ambas direcciones</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <br />
    <input type="button" id="btnEliminarSeleccion" title="Eliminar selección" />
    <input type="button" id="btnPreview" />
    <input type="button" id="btnNext" />
</asp:Content>
