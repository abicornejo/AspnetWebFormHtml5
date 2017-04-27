<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminMail.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminMail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <table id="tblMails">
        <thead>
            <tr>
                <th>ID</th>
                <th>Descripci&oacute;n</th>
                <th>Estatus</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <br />
    <input id="btnNuevo" type="button" />
    <input id="btnSalir" type="button" />
    <br />
    <table id="tblUsuarios">
        <thead>
            <tr>
                <th></th>
                <th>Nombre</th>
                <th>Mail</th>
                <th>Correo</th>
            </tr>
        </thead>
    </table>
</asp:Content>
