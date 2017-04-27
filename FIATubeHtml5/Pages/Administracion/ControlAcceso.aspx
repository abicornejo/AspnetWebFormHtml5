<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ControlAcceso.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.ControlAcceso" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Direcci&oacute;n IP:</label>
    <input type="text" id="txtOcteto1" />
    <label for="txtOcteto1">.</label>
    <input type="text" id="txtOcteto2" />
    <label for="txtOcteto2">.</label>
    <input type="text" id="txtOcteto3" />
    <label for="txtOcteto3">.</label>
    <input type="text" id="txtOcteto4" />
    <br />
    <label for="txtDescripcion">Descripci&oacute;n:</label>
    <input type="text" id="txtDescripcion" />
    <label for="cmbStatus">Estatus:</label>
    <select id="cmbStatus">
    
    </select>
    <br />
    <input type="button" id="btnBuscar" title="Busca los Registros Solicitados" />
    <input type="button" id="btnNuevoCtlAcc" title="Guardar Registro" />
    <input type="button" id="btnCancelar" title="Cancelar" />
    <br />
    <table id="tblControlAcceso">
        <thead>
            <tr>
                <th>Direcci&oacute;n IP</th>
                <th>Estatus</th>
                <th>Descripci&oacute;n</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
    </table>
    <br />
    <input type="button" id="btnMostrarTodo" title="Actuaiza y Muestra Todos Los Registros" />
</asp:Content>
