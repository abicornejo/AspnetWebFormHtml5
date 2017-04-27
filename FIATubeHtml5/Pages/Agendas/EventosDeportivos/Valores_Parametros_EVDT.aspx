<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Valores_Parametros_EVDT.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.Valores_Parametros_EVDT" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Valores de catalogaci&oacute;n</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="lsbValoresDisp">Valores Disponibles</label>
    <label for="lsbValoresAgrd">Valores agregados</label>
    <br />
    <select id="lsbValoresDisp"></select>
    <input type="button" id="btnTodos" title="Agregar Todos" />
    <input type="button" id="btnAgregar" title="Agregar Seleccionados" />
    <input type="button" id="btnQuitar" title="Quitar Seleccionados" />
    <input type="button" id="btnNinguno" title="Quitar Todos" />
    <select id="lsbValoresAgrd"></select>
    <br />
    <input type="button" id="btnAceptar" value="Aceptar" />
    <input type="button" id="btnCancelar" value="Cancelar" />
</asp:Content>
