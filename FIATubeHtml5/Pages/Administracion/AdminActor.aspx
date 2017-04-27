<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminActor.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminActor" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title></title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <table border="1">
        <thead>
            <tr>
                <th>Status</th>
                <th>LabelConn</th>
                <th>Enabled</th>
                <th>JobsRunning</th>
                <th>ActorPath</th>
                <th>ActorSource</th>
                <th>ActorShare</th>
            </tr>
        </thead>
    </table>
</asp:Content>
