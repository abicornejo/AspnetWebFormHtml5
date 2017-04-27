<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BitacoraDiariaImprimir.aspx.cs" Inherits="FIATubeHtml5.Impresiones.BitacoraDiariaImprimir" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script language="javascript" type="text/javascript">

        function Imprimir() {
            window.print();
            window.setTimeout("window.close();", 2000);
        }
    </script>
</head>
<body leftmargin="0" topmargin="0">
    <form id="Form1" method="post" runat="server">
    <input id="hdnPagina" style="width: 24px; height: 22px" type="hidden" size="1" value="../Agendas/BitacoraDiaria.aspx" name="hdnPagina" runat="server"/>
    <table id="TableContenido" cellspacing="2" cellpadding="2" width="100%" border="0">
        <tbody>
            <tr valign="top">
                <td>
                </td>
                <td>
                    <table id="Tabla_01" cellspacing="0" cellpadding="0" width="100%" border="0">
                        <tbody>
                            <tr>
                                <td width="5">
                                </td>
                                <td colspan="4">
                                </td>
                                <td width="5">
                                </td>
                            </tr>
                            <tr valign="top">
                                <td style="height: 492px" rowspan="2">
                                </td>
                                <td style="width: 15px; height: 27px">
                                </td>
                                <td style="width: 15px; background-repeat: no-repeat; height: 27px" valign="middle" >
                                </td>
                                <td style="width: 700px; background-repeat: no-repeat; height: 27px" valign="middle" >
                                        <asp:Literal ID="litTitulo" runat="server" Text="BITACORA DIARIA"></asp:Literal>
                                </td>
                                <td style="height: 27px" valign="middle" >
                                </td>
                                <td style="height: 492px" rowspan="2">
                                </td>
                            </tr>
                            <tr>
                                <td valign="top" colspan="4" height="464">
                                    <!-- CONTENIDO -->
                                    <table id="Table1" style="height: 176px" cellspacing="1" cellpadding="1" width="100%"
                                        border="0">
                                        <tbody>
                                            <tr>
                                                <td style="height: 2px">
                                                    &nbsp;<asp:Literal ID="litMensaje" runat="server"></asp:Literal>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height: 98px" valign="top">
                                                    <asp:Literal ID="litReporte" runat="server" EnableViewState="False"></asp:Literal>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- FIN CONTENIDO AGENDA-->
                                    <asp:Label ID="lblBanSelFechaIni" runat="server" Visible="False"></asp:Label><asp:Label
                                        ID="lblBanSelFechaFin" runat="server" Visible="False"></asp:Label><asp:Label ID="lblIdEmpresa"
                                            runat="server" Visible="False"></asp:Label><asp:Label ID="lblIdFabrica" runat="server"
                                                Visible="False"></asp:Label><asp:Label ID="lblIdSeccion" runat="server" Width="51px"
                                                    Visible="False"></asp:Label><asp:Label ID="litPermisos" runat="server" Width="51px"
                                                        Visible="False"></asp:Label>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    &nbsp;
                                </td>
                                <td colspan="4">
                                </td>
                                <td>
                                    &nbsp;
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <asp:Label ID="Label4" runat="server" Visible="False"></asp:Label>
                    <!-- End ImageReady Slices -->
                    &nbsp;
                </td>
            </tr>
        </tbody>
    </table>
    </form>
</body>
</html>
