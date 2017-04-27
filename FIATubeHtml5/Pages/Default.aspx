<%@ Page Language="C#" AutoEventWireup="true" EnableViewState="false" CodeBehind="Default.aspx.cs" Inherits="FIATubeHtml5.Pages.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server" method="post">
    <div>
        <label>Usuario:</label>
        <input type="text" id="txtUsuario" runat="server"/>
        <label>Contraseña:</label>
        <input type="text" id="txtContraseña" runat="server"/>
        <br />
        <asp:Button id="btnLogin" runat="server" Text="Iniciar Sesión" OnClick="btnLogin_Click" />
    </div>
    </form>
</body>
</html>
