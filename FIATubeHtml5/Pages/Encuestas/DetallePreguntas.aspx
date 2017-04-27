<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="DetallePreguntas.aspx.cs" Inherits="FIATubeHtml5.Pages.Encuestas.DetallePreguntas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Respuestas</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <table id="tblRespuestas">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Respuesta</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</asp:Content>
