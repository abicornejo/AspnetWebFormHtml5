<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminAvisos.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminAvisos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>Aviso:</label>
    <label id="lblIdAviso"></label>
    <label>Fecha:</label>
    <label id="lblFecha"></label>
    <br />
    <textarea id="txtContenido"></textarea>
    <br />
    <input type="checkbox" id="chkMostrar">No volver a mostrar este Aviso</input>
    <input type="button" id="btnAnterior" />
    <label id="lblCurrent"></label>
    <label id="lblDe">de</label>
    <label id="totAvisos"></label>
    <input type="button" id="btnSiguiente" />
</asp:Content>
