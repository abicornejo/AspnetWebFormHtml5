<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdminEspacioMediaGrid.aspx.cs" Inherits="FIATubeHtml5.Pages.Administracion.AdminEspacioMediaGrid" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Administraci&oacute;n de Espacio Media Grid</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <input type="button" id="btnActualizar" />
    <table id="tblEspacioMedia">
        <thead>
		<tr>
			<th></th>
			<th>ID</th>
			<th>Descripci&oacute;n</th>
            <th>Total</th>
            <th>Ruta</th>
		</tr>
	</thead>
	<tbody>
	</tbody>
    </table>
</asp:Content>
