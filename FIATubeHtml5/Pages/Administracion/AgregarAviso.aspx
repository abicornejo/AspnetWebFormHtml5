<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgregarAviso.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AgregarAviso" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnNuevo" title="Nuevo" />
    <input type="button" id="btnGuardar" title="Guardar"/>
    <br />
    <label>Agregar:</label>
    <div>
        <input type="radio" name="rbtType" id="rbtTexto" value="Texto" checked="checked"/><label for="rbtTexto">Texto</label>
        <input type="radio" name="rbtType" id="rbtImagen" value="Imagen"/><label for="rbtImagen">Imagen</label>
        <input type="button" id="btnMas" />
    <input type="button" id="btnMenos" />
    </div>
    <select name="drop1" id="lsbAviso" size="10" multiple="multiple">
        
    </select>
</asp:Content>
