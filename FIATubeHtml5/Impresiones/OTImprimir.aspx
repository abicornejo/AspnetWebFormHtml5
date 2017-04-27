<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OTImprimir.aspx.cs" Inherits="FIATubeHtml5.Impresiones.OTImprimir" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script language="javascript" type="text/javascript">

        function Imprimir() 
        {
            window.print();
            window.setTimeout("window.close();", 2000);
        }
    </script>
</head>
<body bgcolor="#ffffff" >
    <form id="Form1" name="Form1" method="post" runat="server">
    <table id="Table1" cellspacing="3" cellpadding="3" width="100%" border="0">
        <tbody>
            <tr valign="top">
                <td>
                    <table id="Tabla_01" cellspacing="0" cellpadding="0" width="100%" border="0">
                        <tr>
                            <td style="width:5">
                                <%--<img height="5" alt="" src="../images/Tabla/border_01.jpg" width="5"/>--%>
                            </td>
                            <td colspan="4">
                            </td>
                            <td style="width:5">
                                <%--<img height="5" alt="" src="../images/Tabla/border_03.jpg" width="5"/>--%>
                            </td>
                        </tr>
                        <tr valign="top">
                            <td rowspan="2">
                            </td>
                            <td style="width: 15px; background-repeat: no-repeat; height: 24px" width="17" height="24">
                            </td>
                            <td style="width: 15px; background-repeat: no-repeat; height: 24px" valign="middle" width="15" height="24">
                                <%--<img height="9" src="../images/Titulo/dots.gif" width="5">--%>
                                <%--<asp:Image ID="Image1" runat="server" ImageUrl="../images/Tabla/dots.gif"></asp:Image>--%>
                            </td>
                            <td style="width: 220px; background-repeat: no-repeat; height: 24px" valign="middle" width="220" height="24">
                                    <asp:Literal ID="litTitulo" runat="server" Text="ORDENES DE TRABAJO" />
                            </td>
                            <td style="background-repeat: no-repeat; height: 24px" valign="middle" >
                                <table id="Table5" style="height:25" cellspacing="1" cellpadding="1" width="100%" border="0">
                                    <tr>
                                        <td style="width: 168px" >
                                            <asp:Label ID="Label17" runat="server" Width="56px" Text="No. OT:"></asp:Label>
                                            <asp:Literal ID="lblIdOT" runat="server"></asp:Literal>
                                        </td>
                                        <td>
                                            <asp:Label ID="Label18" runat="server" Width="56px" Text="Status:"></asp:Label>
                                            <asp:Literal ID="LitStatus" runat="server"></asp:Literal>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td  rowspan="2">
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" height="274">
                                <table id="Table2" cellspacing="1" cellpadding="3" width="100%" border="0">
                                    <tr>
                                        <td style="width: 3px; height: 24px">
                                            <asp:Label ID="Label2" runat="server" Text="Titulo:"></asp:Label>
                                        </td>
                                        <td  style="height: 24px">
                                            <asp:Literal ID="LitTit" runat="server"></asp:Literal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 3px" bgcolor="#f3f1f2">
                                            <asp:Label ID="Label1" runat="server" Text="Tema:"></asp:Label>
                                        </td>
                                        <td  style="height: 23px" bgcolor="#f3f1f2">
                                            <asp:Literal ID="LitTema" runat="server"></asp:Literal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 3px; height: 69px" valign="top">
                                            <asp:Label ID="Label3" runat="server" Text="Objetivo:"></asp:Label>
                                        </td>
                                        <td  style="height: 69px" valign="top">
                                            <asp:Literal ID="LitCuento" runat="server"></asp:Literal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 3px" valign="top" bgcolor="#f3f1f2">
                                            <asp:Label ID="Label4" runat="server" Width="112px" Text="Fecha de Agenda:"></asp:Label>
                                        </td>
                                        <td  valign="top" bgcolor="#f3f1f2">
                                            <asp:Literal ID="litFechaAgse" runat="server"></asp:Literal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 3px">
                                            <asp:Label ID="Label5" runat="server" Text="Sección:"></asp:Label>
                                        </td>
                                        <td >
                                            <asp:Literal ID="litSeccion" runat="server"></asp:Literal>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" bgcolor="#f3f1f2" colspan="2">
                                            <table id="Table3" cellspacing="0" cellpadding="0" width="100%" border="0">
                                                <tr>
                                                    <td>
                                                        <br/>
                                                        <asp:Label ID="Label6" runat="server" Text="Ingestión:"></asp:Label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top">
                                                        <div style="overflow: auto; width: 99.99%" align="left">
                                                            <asp:DataGrid ID="dgIngestion" runat="server" Width="100%" BorderStyle="Ridge" BorderWidth="1px"
                                                                AutoGenerateColumns="False" BorderColor="White" CellPadding="1" BackColor="White"
                                                                Font-Size="X-Small" Font-Names="Arial">
                                                                <SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="Gray"></SelectedItemStyle>
                                                                <ItemStyle HorizontalAlign="Left" ForeColor="Black" BackColor="#E9E4E7"></ItemStyle>
                                                                <HeaderStyle Font-Size="XX-Small" Font-Bold="True" HorizontalAlign="Center" ForeColor="White"
                                                                    BackColor="#002984"></HeaderStyle>
                                                                <FooterStyle ForeColor="Black" BackColor="Gray"></FooterStyle>
                                                                <Columns>
                                                                    <asp:BoundColumn DataField="TING_DESC" HeaderText="TIPO DE INGESTION">
                                                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                                    </asp:BoundColumn>
                                                                    <asp:BoundColumn DataField="SSIN_DESC" HeaderText="ESTATUS">
                                                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                                    </asp:BoundColumn>
                                                                </Columns>
                                                            </asp:DataGrid></div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" colspan="2">
                                            <table cellspacing="0" cellpadding="0" width="100%" border="0">
                                                <tr>
                                                    <td>
                                                        <asp:Label ID="Label7" runat="server" Text="Equipo de Trabajo:"></asp:Label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div style="overflow: auto; width: 99.99%; height: 104px" align="left">
                                                            <asp:DataGrid ID="dgEquipoPlaneado" runat="server" Width="100%" BorderStyle="Ridge"
                                                                BorderWidth="1px" AutoGenerateColumns="False" BorderColor="White" CellPadding="1"
                                                                BackColor="White" Font-Size="X-Small" Font-Names="Arial">
                                                                <SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="Gray"></SelectedItemStyle>
                                                                <ItemStyle HorizontalAlign="Left" ForeColor="Black" BackColor="#E9E4E7"></ItemStyle>
                                                                <HeaderStyle Font-Size="XX-Small" Font-Bold="True" HorizontalAlign="Center" ForeColor="White"
                                                                    BackColor="#002984"></HeaderStyle>
                                                                <FooterStyle ForeColor="Black" BackColor="Gray"></FooterStyle>
                                                                <Columns>
                                                                    <asp:BoundColumn DataField="PTOS_DESC" HeaderText="PUESTO"></asp:BoundColumn>
                                                                    <asp:BoundColumn DataField="EMPL_NOMB" HeaderText="NOMBRE"></asp:BoundColumn>
                                                                    <asp:BoundColumn DataField="ESIN_DESC" HeaderText="PROGRAMA"></asp:BoundColumn>
                                                                </Columns>
                                                            </asp:DataGrid></div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" bgcolor="#f3f1f2" colspan="2">
                                            <asp:Label ID="Label19" runat="server" Text="Logística:"></asp:Label><br/>
                                            <br/>
                                            <asp:DataGrid ID="dgLogistica" runat="server" Width="100%" BorderStyle="Ridge" BorderWidth="1px"
                                                AutoGenerateColumns="False" BorderColor="White" CellPadding="1" BackColor="White"
                                                Font-Size="X-Small" Font-Names="Arial">
                                                <SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="Gray"></SelectedItemStyle>
                                                <ItemStyle HorizontalAlign="Left" ForeColor="Black" BackColor="#E9E4E7"></ItemStyle>
                                                <HeaderStyle Font-Size="XX-Small" Font-Bold="True" HorizontalAlign="Center" ForeColor="White"
                                                    BackColor="#002984"></HeaderStyle>
                                                <FooterStyle ForeColor="Black" BackColor="Gray"></FooterStyle>
                                                <Columns>
                                                    <asp:BoundColumn DataField="LOGI_FHEV" HeaderText="Fecha Inicial"></asp:BoundColumn>
                                                    <asp:BoundColumn DataField="LOGI_LUGA" HeaderText="Lugar"></asp:BoundColumn>
                                                    <asp:BoundColumn DataField="LOGI_OBJE" HeaderText="Observaciones"></asp:BoundColumn>
                                                </Columns>
                                            </asp:DataGrid>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width: 3px; height: 24px" valign="top">
                                            &nbsp;
                                        </td>
                                        <td style="height: 24px" valign="top">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" bgcolor="#f3f1f2" colspan="2">
                                            <asp:Label ID="Label8" runat="server" Text="Donde y Cuando se va a Transmitir:"></asp:Label><br>
                                            <br>
                                            <asp:DataGrid ID="dgProgramas" runat="server" Width="100%" BorderStyle="Ridge" BorderWidth="1px"
                                                AutoGenerateColumns="False" BorderColor="White" CellPadding="1" BackColor="White"
                                                Font-Size="X-Small" Font-Names="Arial">
                                                <SelectedItemStyle Font-Bold="True" ForeColor="White" BackColor="Gray"></SelectedItemStyle>
                                                <ItemStyle HorizontalAlign="Left" ForeColor="Black" BackColor="#E9E4E7"></ItemStyle>
                                                <HeaderStyle Font-Size="XX-Small" Font-Bold="True" HorizontalAlign="Center" ForeColor="White"
                                                    BackColor="#002984"></HeaderStyle>
                                                <FooterStyle ForeColor="Black" BackColor="Gray"></FooterStyle>
                                                <Columns>
                                                    <asp:BoundColumn DataField="ESIN_DESC" HeaderText="Programa">
                                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                    </asp:BoundColumn>
                                                    <asp:BoundColumn DataField="FOEP_FAIP" HeaderText="Fecha de Transmisi&#243;n">
                                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                    </asp:BoundColumn>
                                                    <asp:BoundColumn DataField="FMTO_DESC" HeaderText="Formato">
                                                        <ItemStyle HorizontalAlign="Center"></ItemStyle>
                                                    </asp:BoundColumn>
                                                </Columns>
                                            </asp:DataGrid>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" colspan="2">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <%--<img height="5" alt="" src="../images/Tabla/border_08.jpg" width="5"/>--%>
                            </td>
                            <td colspan="4">
                            </td>
                            <td>
                                <%--<img height="5" alt="" src="../images/Tabla/border_10.jpg" width="5"/>--%>
                            </td>
                        </tr>
                    </table>
                    <!-- End ImageReady Slices -->
                </td>
            </tr>
        </tbody>
    </table>
    <input id="hdnAccion" type="hidden" name="hdnAccion" runat="server"/>
    </form>
</body>
</html>
