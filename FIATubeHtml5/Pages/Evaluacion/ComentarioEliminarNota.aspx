<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ComentarioEliminarNota.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.ComentarioEliminarNota" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>¿Esta seguro que desea eliminar esta nota?</label>
    <div>
        <button type="button" id="btnAceptar"></button>
        <button type="button" id="btnCancelar"></button>
    </div>
</asp:Content>
