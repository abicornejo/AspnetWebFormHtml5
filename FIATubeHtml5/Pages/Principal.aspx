<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FiatubeNoScrolls.Master" AutoEventWireup="true" CodeBehind="Principal.aspx.cs" Inherits="FIATubeHtml5.Pages.Principal" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <script language="javascript" type="text/javascript">
        function txtFechaIni_onclick() {

        }
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" type="text/css" href="../Styles/floating-window.css"/>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/BusquedaAvanzada.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/floating-window.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
<asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <div id="Busqueda" class="divBusqueda">                                                                    
                <img alt="logo" class="imgLogo" src="../Images/LogAztecaTubeHTML5.png" />

                <div id='DidyouMean'class="lblDidYouMean" style=" display:none;" >
                 Quizás Quiso decir:   <label id="LblDidYouMean" class="divDidYouMean" onclick="DetonaDid();" ></label>   
                </div>

                <input type="text" id="txtTextoFiltro" class="txtTextoFiltro" onkeypress="txtTextoFiltro_keypress();" placeholder="Ingrese un texto" />
                <button id="BtnBuscar" class="btnBuscarAlone" title="Buscar" onclick="FuncionBuscar('Avanzado','Texto');"></button>                
                &nbsp;<select ID="cmbOptBusqueda" class="cmbOptBusqueda" onchange="changeFilter();">
                    <option value="string">Frase exacta</option>
                    <option value="and">Todas las Palabras (and)</option>
                    <option value="or">Cualquier Palabra (or)</option>
                </select>
                <button id="Avanzado" class="btnBusquedaAvanzada" title="Busqueda Avanzada" onclick="AbreBusquedaAvanzada();"></button>
                <%--<button id="BntMonitor" class="btnMonitor" title="Recuperación de Videos" onclick="AbreMonitor();"></button>--%>
                <button type="button" class="btnLogOut" id="btnLogOut" onclick="logOutSession(); return false;">Cerrar Sesion</button>
                </div>      
        </ContentTemplate>  
</asp:UpdatePanel>

        <div  id="TabBusquedaAvanzada" style="display:none;">
            <UL>
                <LI><a href="#Tab1">Noticias</a></LI>
                <LI><a href="#Tab2">Adquisiciones</a></LI>
            </UL>
                                                                                                                                                                                                                                                                                                                                                                                                                <div id="Tab1" >
            
            <table class="style1">
                <tr>
                    <td class="style12">
                        <input id="ChkClasificacionVideoteca" type="checkbox" value="true" 
                            checked="checked" /> Clasificación de Videoteca </td>
                    <td class="style7">
                        <input id="ChkPlaneacion" type="checkbox" /> Planeación(OT)</td>
                    <td class="style4">
                        <input id="ChkGuion" type="checkbox" />Guión</td>
                    <td class="style13">&nbsp;</td>
                    <td> 
                        <input id="txtFechaIni" class="txtTextoInput" onclick="return txtFechaIni_onclick()" /></td>
                    <td>
                        <input id="txtFechaFin" class="txtTextoInput" /></td>
                </tr>
                <tr>
                    <td class="style8" colspan="6">
                     <table style="width:100%;">
                              <tr>
                    <td class="style2">
                        OT<br />
                        <input id="txtOT" class="txtTextoAv" type="text"/></td>
                    <td class="style5">
                        Reportero<br />
                        <select id="cmbReportero" class="cmbBusquedaAv" runat="server" name="D1" >
                        </select> </td>
                    <td class="style9">
                        País<br />
                        <select id="cmbPais" class="cmbBusquedaAv" runat="server" name="D6" 
                            onchange="PaisChange();">
                        </select> </td>
                </tr>
                <tr>
                    <td class="style2">
                        &nbsp;Número de Cinta<br />
                        <input id="txtNumeroCinta" class="txtTextoAv" type="text"/></td>
                    <td class="style5">
                        Programa<br />
                        <select id="cmbPrograma" class="cmbBusquedaAv" runat="server" name="D2">
                        </select> </td>
                    <td class="style9">
                        Estado<br />
                        <select id="cmbEstado" class="cmbBusquedaAv" name="D7" 
                            onchange="EstadoChange();" >
                        </select> </td>
                </tr>
                <tr>
                    <td class="style10">
                        Sección<br />
                        <select id="cmbSeccion" class="cmbBusquedaAv" runat="server" name="D5" >
                        </select> </td>
                    <td class="style10">
                        Agencia<br />
                        <select id="cmbAgencia" class="cmbBusquedaAv" runat="server" name="D3" >
                        </select> </td>
                    <td class="style11">
                        Ciudad<br />
                        <select id="cmbCiudad" class="cmbBusquedaAv"  name="D8" >
                        </select> </td>
                </tr>
                <tr>
                    <td class="style10">
                        &nbsp;</td>
                    <td class="style10">
                        &nbsp;</td>
                    <td class="style11">
                        Formato de Video<br />
                        <select id="cmbHDSD"  class="cmbBusquedaAv" >
                             <option value="">==SELECCIONE==</option> 
                             <option value="SD">SD</option> 
                             <option value="HD">HD</option> 
                        </select>
                        
                        </td>
                </tr>
                     </table>
                     </td>
                </tr>
                <tr>
                    <td class="style12">
                        <input id="ChkMaterialenBruto" type="checkbox" />Material en Bruto</td>
                    <td class="style7">
                        <input id="ChkNotaTerminada" type="checkbox" />Nota Terminada</td>
                    <td class="style9" colspan="2">
                        <input id="ChkSoloConvideo" type="checkbox" value="on" />Solo con Video</td>
                    <td>
                        <input id="ChkCcaption" type="checkbox" />CCaption</td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td class="style12">
                        <input id="RdIrSeccion1" type="radio" />Ir a Seccion</td>
                    <td class="style7">
                        <input id="RdIrBusqueda" type="radio" />Ir a Búsqueda</td>
                    <td colspan="3">
                        <input id="ChkLimpiaBusqueda" type="checkbox" />Limpiar Busqueda en Aut</td>
                    <td class="style14">
                        <input id="BtLimpiar" type="button" class="btnLimpiar" value="Limpiar" onclick="Limpiar();" /><input id="BtBuscar" 
                            class="btnBuscar" type="button" value="Buscar" onclick="FuncionBuscar('Avanzado','Avanzado');" /></td>
                </tr>
             </table>
            
        </div>
                                                                                                                                                                                                                                                                                                                                                                                <div id="Tab2">
            <table class="style1b">
                <tr>
                    <td>
                        &nbsp;</td>
                    <td class="style6">
                        Titulo:</td>
                    <td style="text-align: left">
                        Capitulo:</td>
                    <td>
                        Número de Capitulo:</td>                    
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td>
                        &nbsp;</td>
                    <td style="text-align: left">
                        <input id="txtTitulo" class="txtTextoAv" type="text"  /></td>
                    <td style="text-align: left">
                        <input id="txtCapitulo" class="txtTextoAv" type="text" /></td>
                    <td>
                        <input id="txtNumCapitulo" class="txtTextoAv" type="text" /></td>                    
                    <td>
                        &nbsp;</td>
                </tr>
                 <tr>
                    <td>
                        &nbsp;</td>
                    <td class="style6">
                        Sinopsis:</td>
                    <td class="style6">
                        Palabras Clave:</td>
                    <td class="style6">
                        Elenco/Personajes</td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td>
                        &nbsp;</td>
                    <td class="style6">
                        <input id="txtSinopsis" type="text" class="txtTextoAv" /></td>
                    <td class="style6">
                        <input id="txtPalabraClave" type="text" class="txtTextoAv" /></td>
                    <td class="style6">
                        <input id="txtElencoOPersonaje" type="text" class="txtTextoAv" /></td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td>
                        &nbsp;</td>                    
                    <td class="style6">
                        Tipo de Programa</td>
                    <td class="style6">
                        Tipo de Señal</td>
                    <td class="style6">
                        &nbsp;</td>
                    <td>
                        &nbsp;</td>
                </tr>
                <tr>
                    <td>
                        &nbsp;</td>                    
                    <td class="style6">
                        <select id="cmbTipoPrograma" class="cmbBusquedaAv" runat="server" name="D9" >
                        </select></td>
                    <td class="style6">
                        <select id="cmbTipoSenal" class="cmbBusquedaAv" runat="server" name="D10" >
                        </select></td>
                    <td class="style6">
                        &nbsp;</td>
                    <td>
                        &nbsp;
                    </td>
                </tr>               
                <tr>
                    <td>
                        &nbsp;</td>
                    <td>
                        &nbsp;</td>
                    <td>
                        &nbsp;</td>
                    <td colspan="2" class="style6">
                        <input id="BtLimpiar0" type="button" class="btnLimpiar" value="Limpiar" />
                        <input id="BtnBuscarAdquisiciones" type="button" class="btnBuscar" onclick="FuncionBuscar('Adquisiciones','Avanzado');" value="Buscar" /></td>
                </tr>
            </table>
        </div>
            </div>

        <div id="divMenu" data-isOpen="0" runat = "server">
        
        </div>
    <br />
    
    <div id="divFullScreen" style="display:none">
        <div id="divFullPlayer"></div>
        <button type="button" id="btnCloseFullScn" class="btnCloseFullScn" onclick="closeFullScreen(); return false;"></button>    
    </div>

    <div title="Video" id="divModal" style="display:none;"></div>
    <div id="divLeftMenu" class="divLeftMenu" onclick="divLeftMenu_Click(); return false;">
        <img id="imgMenu" alt="" src="../Images/right.png" width="10"/>
    </div>
    	
	<div id="dock-container">
		<div id="dock">
		    <ul id="listDockMinimize"></ul>
		    <div class="base"></div>
		</div>
	</div>
        
    <%--<div id="divContenido" class="divContenido">
        <iframe id="ifrmContent" class="ifrmContent"></iframe>
    </div>--%>    
</asp:Content>
