<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Asignacion_Parametros_EVDT.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.Asignacion_Parametros_EVDT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Catalogaci&oacute;n de Eventos Deportivos - Asignaci&oacute;n</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtEvento">Evento:</label>
    <input type="text" id="txtEvento" />
    <br />
    <label for="txtBusqueda">B&uacute;squeda:</label>
    <input type="text" id="txtBusqueda" />
    <input type="button" id="btnBusqueda" />
    <input type="button" id="btnAddParametro" />
    <br />
    <table id="tblParametros">
        <thead>
            <tr>
                <th>Descripci&oacute;n</th>
                <th>Tipo</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <br />
    <input type="button" id="btnAsignarParametro" />
    <br />
    <label for="txtParametrosAsociados">Caracter&iacute;sticas asociadas:</label>
    <label for="">Valores:</label>
    <input type="button" id="btnQuitarValor" />
    <input type="button" id="btnAgregarValor" />
    <input type="button" id="btnBuscarValor" />
    <br />
    <select multiple="multiple" size="7" id="lsbParametrosAsociados"></select>
    <select multiple="multiple" size="7" id="lsbValores">
    </select>
    <br />
    <input type="button" id="btnAceptar" value="Aceptar" />
    <input type="button" id="btnCancelar" value="Cancelar" />
</asp:Content>
