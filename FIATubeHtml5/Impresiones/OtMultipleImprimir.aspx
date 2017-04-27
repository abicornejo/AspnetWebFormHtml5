<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OtMultipleImprimir.aspx.cs" Inherits="FIATubeHtml5.Impresiones.OtMultipleImprimir" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <link href="http://tvawebmam/EyCNoticias/RadControls/Input/Skins/Windows/styles.css" rel="stylesheet" type="text/css" />
    <title></title>
    
    <script language="javascript" type="text/javascript">

        function Imprimir() {
            window.print();
            window.setTimeout("window.close();", 2000);
        }
    </script>
    
    <style type="text/css">

.tit_campos
{
    FONT-WEIGHT: bold;
    FONT-SIZE: 12px;
    COLOR: #000000;
    FONT-FAMILY: Arial, Helvetica, sans-serif
}

.Default_Windows
{
	width: 179px;
	font-family: Arial, Verdana, Tahoma, Sans-Serif;
	font-size: 12px;
	font-weight: normal;
	color: #424242;
}

A:link
{
	font-family: Tahoma,Verdana, Arial, Helvetica, sans-serif;
	color: #3A3A3A;
	font-size: 11;
	text-decoration: none;
}

.titlebar_Default
{
	font: bold 11px Arial, Verdana, Sans-serf;
	height: 20px !important;
	border-bottom: solid 1px #bbb !important;
	width: 100%;
	color: #666;
}

.TableLayout_Default
{
	width: 100%;
}

.DaysOfWeek_Default
{
	color: #666666;
	text-align: center;
	text-transform: uppercase;
	height: 17px;
	border-bottom: solid 1px #dfdfdf;
	background: url('http://tvawebmam/EyCNoticias/RadControls/Calendar/Skins/Default/Img/titlebarBg.gif');
        }

.TableLayout_Default td a
{
	text-align: center;
	height: 13px;
	padding: 1px;
	display: block;
	text-decoration: none;
	color: #000;
	cursor: default;
}

.radCalSelect_Default,
.radCalWeekendSelect_Default
{
	background: #909090 !important;
	color: white !important;
}

    </style>
</head>
<body>
    <form id="form1" runat="server">
    <input id="rdpFecha_dateInput_Value" name="rdpFecha:dateInput" type="hidden" 
        value="2010-4-18 0:0:0" />
    <input id="rdpFecha_dateInput" type="hidden" value="2010-4-18" />
    <input id="rdpFecha" name="rdpFecha" type="hidden" value="2010-04-18" />
    <input id="rdpFecha_calendar_AD" name="rdpFecha_calendar_AD" type="hidden" 
        value="[[1980,1,1],[2099,12,30],[2010,4,20]]" />
    <input id="rdpFecha_calendar_SD" name="rdpFecha_calendar_SD" type="hidden" 
        value="[[2010,4,18]]" />
    <div>
    
        <table style="width:100%;">
            <tr>
                <td>
                    <span id="Label1" class="tit_campos">Reporte de Asignación de Cámaras</span></td>
            </tr>
            <tr>
                <td>
                    <table width="100%">
                        <tr>
                            <td class="tit_campos">
                                <asp:Label ID="lblFecha" runat="server"></asp:Label>
                            </td>
                            <td align="right" style="HEIGHT: 28px">
                                <div id="divImprime">
                                    <asp:Button ID="btnImprimir" runat="server" Text="Imprimir" />
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:GridView ID="grdvOts" runat="server" AutoGenerateColumns="False" 
                        Width="100%">
                        <Columns>
                            <asp:TemplateField HeaderText="Reportero">
                                <ItemTemplate>
                                    <asp:Label ID="Label2" runat="server" 
                                        Text='<%# DataBinder.Eval (Container.DataItem, "REPORTERO") %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField HeaderText="OT" DataField="OTRA_CVEC" />
                            <asp:BoundField HeaderText="Titulo" DataField="OTRA_TITU" />
                            <asp:TemplateField HeaderText="Inicio">
                                <ItemTemplate>
                                    <asp:Label ID="Label2" runat="server" 
                                        Text='<%# CambiaFormatoFecha(DataBinder.Eval (Container.DataItem, "logi_fhev")) %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:TemplateField HeaderText="Fin">
                                <ItemTemplate>
                                    <asp:Label ID="Label2" runat="server" 
                                        Text='<%# CambiaFormatoFecha(DataBinder.Eval (Container.DataItem, "logi_ffin")) %>'></asp:Label>
                                </ItemTemplate>
                            </asp:TemplateField>
                            <asp:BoundField HeaderText="Lugar" DataField="LOGI_LUGA" />
                            <asp:BoundField HeaderText="Indicaciones" DataField="LOGI_OBJE" />
                        </Columns>
                    </asp:GridView>
                </td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
