<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AgendaDiariaImprimir.aspx.cs"
    Inherits="FIATubeHtml5.Impresiones.AgendaDiariaImprimir" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script language="javascript" type="text/javascript">

        function Imprimir() {
            
            window.print();
            window.setTimeout("window.close();", 2000);
        }
    </script>
</head>
<body topmargin="0" leftmargin="0">
    <form id="Form1" method="post" runat="server">
    <input id="NavegaSemana" style="width: 24px" type="hidden" size="1" name="NavegaSemana"
        runat="server" />
    <input id="hdnLunes" style="width: 24px; height: 22px" type="hidden" size="1" name="hdnLunes"
        runat="server" />
    <input id="hdnMartes" style="width: 24px; height: 22px" type="hidden" size="1" name="hdnMartes"
        runat="server" />
    <input id="hdnMiercoles" style="width: 24px; height: 22px" type="hidden" size="1"
        name="hdnMiercoles" runat="server"/>
    <input id="hdnJueves" style="width: 24px; height: 22px" type="hidden" size="1" name="hdnJueves"
        runat="server" />
    <input id="hdnViernes" style="width: 24px; height: 22px" type="hidden" size="1" name="hdnViernes"
        runat="server" />
    <input id="hdnSabado" style="width: 24px; height: 22px" type="hidden" size="1" name="hdnSabado"
        runat="server" />
    <input id="hdnDomingo" style="width: 24px; height: 22px" type="hidden" size="1" name="hdnDomingo"
        runat="server" />
    <input id="hdnPagina" style="width: 24px; height: 22px" type="hidden" size="1" value="../Pages/Agendas/AgendaDiaria.aspx"
        name="hdnPagina" runat="server" />
    <table id="TableContenido" cellspacing="3" cellpadding="3" width="100%" border="0">
        <tr valign="top">
            <td> 
                <table id="Tabla_01" cellspacing="0" cellpadding="0" width="100%" border="0">
                    <tr>
                        <td width="5">
                        </td>
                        <td colspan="2">
                        </td>
                        <td width="5">
                        </td>
                        
                    </tr>
                    <tr valign="top">
                        <td rowspan="2">
                        </td>
                        <td style="width: 700px; background-repeat: no-repeat; height: 27px" valign="middle">
                            <p style="background-repeat: no-repeat">
                        
                                <asp:Literal ID="litTitulo" runat="server" Text="AGENDA DIARIA"></asp:Literal></p>
                        </td>
                        <td style="background-repeat: no-repeat; height: 27px" valign="middle">
                        </td>
                        <td rowspan="2">
                        </td>
                    </tr>
                    <tr>
                        <td valign="top" colspan="2" height="274">
                            <!-- CONTENIDO -->
                            <table id="Table1" cellpadding="0" width="100%" border="0" cellspacing="0">
                                <tr>
                                    <td valign="top">
                                        <asp:Literal ID="litMensaje" runat="server"></asp:Literal>
                                    </td>
                                </tr>
                                <tr style="height: 20">
                                    <td class="txtNegCent" align="center" width="100%" height="18">
                                        <table id="Table9" cellspacing="0" cellpadding="0" width="100%" border="0">
                                            <tr>
                                                <td width="7" background="day_01.jpg">
                                                </td>
                                                <td class="txtNegCent" nowrap width="100%" height="33">
                                                    <span class="letraPeqB"><span class="letraPeqB">
                                                        <asp:HyperLink ID="hypLunes" runat="server"></asp:HyperLink></span></span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <!-- CONTENIDO X DIA -->
                                <tr valign="top">
                                    <td id="Lunes" valign="top" height="36">
                                        <asp:DataList ID="dltLunes" runat="server" Width="100%" EnableViewState="False" AlternatingItemStyle-BackColor="#FFFFFF"
                                            BackColor="#F2F7FF" AlternatingItemStyle-Width="10%">
                                            <ItemTemplate>
                                                <%#getFormatoFecha(DataBinder.Eval(Container.DataItem, "AGSE_FINI"),DataBinder.Eval(Container.DataItem, "AGSE_NUME"),DataBinder.Eval(Container.DataItem, "AGSE_ORIG"),DataBinder.Eval(Container.DataItem, "OTRA_CVEC"),DataBinder.Eval(Container.DataItem,"SECC_LLAV_PR"))%>
                                                <font face="Arial" size="2" color="<%# DataBinder.Eval(Container.DataItem, "SECC_COLR") %>">
                                                    <b>
                                                        <nobr>
																	<%# getSeccionDesc(DataBinder.Eval(Container.DataItem, "SECC_DESC")) %>
																	</nobr>
                                                    </b></font></TD>
                                                <td align="center" width="8%" <%# getFondo() %>>
                                                    <%#getTipoNota(DataBinder.Eval(Container.DataItem, "TNO_DESC"),DataBinder.Eval(Container.DataItem, "TINO_ABRE"), DataBinder.Eval(Container.DataItem, "TINO_LLAV_PR"), DataBinder.Eval(Container.DataItem, "AGSE_NUME"), DataBinder.Eval(Container.DataItem, "AGSE_ORIG"), DataBinder.Eval(Container.DataItem, "SECC_LLAV_PR"))%>
                                                </td>
                                                <%#getLinkEliminar(DataBinder.Eval(Container.DataItem, "AGSE_ORIG"),DataBinder.Eval(Container.DataItem, "AGSE_NUME"),DataBinder.Eval(Container.DataItem,"SECC_LLAV_PR"), DataBinder.Eval(Container.DataItem,"OTRA_CVEC"))%>
                                                <td align="center" width="10%" <%# getFondo() %>>
                                                    <font size="1" color="black" face="Arial">
                                                        <nobr>	
																	<%#getTitulo(DataBinder.Eval(Container.DataItem, "OTRA_CVEC"),DataBinder.Eval(Container.DataItem, "AGSE_ORIG"), DataBinder.Eval(Container, "DataItem.EVDT_LLAV_PR")) %>
																	</nobr>
                                                    </font>
                                                </td>
                                                <td width="45%" <%# getFondo() %>>
                                                    <a href="javascript:<%#getLinkOT("1",DataBinder.Eval(Container.DataItem, "AGSE_ORIG"),DataBinder.Eval(Container.DataItem, "AGSE_NUME"))%>">
                                                        <font face="Arial" size="2" style="text-decoration: underline; cursor: hand;">
                                                            <nobr><b><%#DataBinder.Eval(Container.DataItem, "AGSE_TITU") %></b></nobr>
                                                        </font></a>
                                                    <%#obtenEditaEventoDeportivo(DataBinder.Eval(Container, "DataItem.AGSE_ORIG"), DataBinder.Eval(Container, "DataItem.AGSE_NUME")) %>
                                                </td>
                                                <td align="center" width="5%" <%# getFondo() %>>
                                                    <%#getNombreTipoIngestion(DataBinder.Eval(Container, "DataItem.AGSE_ORIG"),DataBinder.Eval(Container, "DataItem.AGSE_NUME"))%>
                                                </td>
                                                <td align="center" width="10%" <%# getFondo() %>>
                                                    <font face="Arial" size="2" style="text-decoration: underline; cursor: hand;"><b>
                                                        <%#getLinkAvanceOT(DataBinder.Eval(Container.DataItem, "AGSE_ORIG"),DataBinder.Eval(Container.DataItem, "AGSE_NUME"),DataBinder.Eval(Container.DataItem,"TIENE_AVANCE"))%>
                                                    </b></font>
                                            </ItemTemplate>
                                        </asp:DataList>
                                    </td>
                                </tr>
                                <!-- CONTENIDO X DIA -->
                                <tr>
                                    <td valign="top" bgcolor="#eaf7fb">
                                        &nbsp;
                                    </td>
                                </tr>
                            </table>
                            <!-- FIN CONTENIDO AGENDA-->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </form>
</body>
</html>
