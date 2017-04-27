<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FiatubeNoScrolls.Master" AutoEventWireup="true" CodeBehind="Busqueda.aspx.cs" Inherits="FIATubeHtml5.Pages.Busqueda" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/ToolTip.js?Rand="+RandomCall) %>"></script>
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/jquery.carouFredSel-5.5.0.js?Rand="+RandomCall) %>"></script>
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/CarruselBusqueda.js?Rand="+RandomCall) %>"></script>

<style type="text/css" media="all">
			html
			{
				padding: 0;
				margin: 0;
				height: 100%;
			}
			div
			{
				font-family: Arial, Helvetica, Verdana;
				color: #E6E6E6;
			}			
			h1 {
				font-size: 60px;
			}
			a, a:link, a:active, a:visited {
				color: white;
				text-decoration: underline;
			}
			a:hover {
				color: #9E1F63;
			}
			#intro {
				width: 580px;
				margin: 0 auto;
			}
			
		</style>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server" >
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
	</asp:ScriptManager>

	<asp:UpdatePanel runat="server" id="UP2" class="divUP2">
		<ContentTemplate>
				<div id="contenedor" class="contenedor">
					<div id="divResultadoBusqueda" runat="server"   >
					</div>
				</div>
				<div id="ContenedorCarrusel" class="contenedorCarrusel">
	               <div id="divCarrusel" runat="server" class="list_carousel" >
						 <ul id="gallery" class="gallery">
						  <li > </li>
						 </ul>                                                                        
					</div>
					<div id="divGridCarrusel" class="divGridCarrusel" runat="server" > </div>
				</div>										
				
				<div class="divContenedorControles">
                    <div id="Controles" class="divControles">
                        <%--Este boton solo es un detonador entre jquery y el CodeBehind  no puede ser oculta ya que no se detona su evento --%>
                        <asp:Button ID="btnDetonador" runat="server" OnClick="Button1_Click1" BorderStyle="None" CssClass ="Oculta" Font-Size="0.5pt" Text="."  />
                        <input id="btnRecuperar" type="button" class="btnRecuperar" title="Recuperar" onclick="ObtenerDatos();" />
                        <asp:Button ID="btnWall" class="btnWall" title="Video Wall" runat="server" onclick="btnWall_Click"  />
                        <asp:Button ID="btnCarrusel" class="btnCarrusel" title="Video Carrusel" runat="server" onclick="btnCarrusel_Click" />
                        <asp:Button ID="btnTeaser" class="btnTeaser" title="Video Teaser" runat="server" onclick="btnTeaser_Click" />
                        <input type="hidden"  runat="server" id="lblVista" value="Grid"   />
                        <input type="hidden"  runat="server" id="lblRecuperar" value="0"   />
                        &nbsp;<input id="BntMuestra" class="btnNavegadores" type="button" data-open='0' value="Filtros" onclick="abreNavegacion(this);"  />
                        <div id="Limpiar" class="divLimpiar"  >
                            <input id="bntLimpiar" class="btnEliminarAloneCarrito" type="button" title="Limpiar Busqueda" onclick="LimpiarRecuparacion();" />
                        </div>
                    </div>
					<div class="divPaginadorBusqueda">						
						<asp:Button ID="BntInicio" class="btnInicio" runat="server" title="Inicio" onclick="BntInicio_Click"  />
                        <asp:Button ID="BotonAtras" class="btnAnterior" runat="server" onclick="BotonAtras_Click"  />
						&nbsp;<asp:Label ID="LblResultado" runat="server" Text=""></asp:Label>
						<asp:Label ID="LblPaginado" runat="server" Text=""></asp:Label>
						&nbsp;<asp:Button ID="BtnSiguiente" class="btnSiguiente" runat="server" onclick="BtnSiguiente_Click"  />						
					    <asp:Button ID="BntFin" class="btnFin" runat="server" title="Fin" onclick="BntFin_Click"  />
					    &nbsp;<asp:TextBox ID="txtPaginaDestino" class="txtInputMaster" runat="server" Width="30px"></asp:TextBox><asp:RangeValidator
                            ID="RangeValidator1" runat="server" ControlToValidate="txtPaginaDestino"  MaximumValue="10000" MinimumValue="0"
                            Type="Integer"></asp:RangeValidator>
                        <asp:Button ID="BntGoTo" class="btnIrA" runat="server" onclick="BntGoTo_Click" />
					</div>

				</div
			
            <asp:HiddenField ID="HddPaginado" Value="60"  runat="server" />
			<asp:HiddenField ID="HiddenTipo" Value="" runat="server" />
			<asp:HiddenField ID="HDDTotalPaginas" Value="" runat="server" />
			<asp:HiddenField ID="HddPaginas" Value="1" runat="server" />
        </ContentTemplate>
	</asp:UpdatePanel>

    <%--<div id="Limpiar" class="divLimpiar">
        <input id="bntLimpiar" class="btnLimpiarBusqueda" type="button" title="Limpiar Compra" onclick="LimpiarRecuparacion();"; />
    </div>--%>
    <div id="Compra"  runat="server" class="compra" >
    </div>
    
    
    <asp:UpdatePanel id="Navegador" runat="server">
    <ContentTemplate>
    
    <div id="DivNavegador" class="divNavegador"  >
        <input id="BntOculta" type="button" class="btnNavegadoresOcult"  onclick ="OcultaNavegadores();" />
        
        <div id="DivFiltro" >
            <asp:TreeView ID="TreeViewFiltro" class="divTreeViewFiltro" runat="server"  onselectednodechanged="TreeViewFiltro_SelectedNodeChanged"  >
            </asp:TreeView>  
        </div>

        <div id="DivNavegadores">
            <asp:TreeView ID="TreeViewNavegador" class="divTreeViewNavegador" runat="server" onselectednodechanged="TreeView1_SelectedNodeChanged">
            </asp:TreeView>
        </div>
    </div>	
    </ContentTemplate>
    </asp:UpdatePanel>
  

	<div id="tooltip" runat="server">
		   
		   <table  style=" width:400px">
		
			<tr style="width:400px">
				<img id="Imagen1" onerror="ImageError(this);" alt="" src="" class="tooltipImages"/>
                <img id="Imagen2" onerror="ImageError(this);" alt="" src="" class="tooltipImages"/>
                <img id="Imagen3" onerror="ImageError(this);" alt="" src="" class="tooltipImages"/>
                <img id="Imagen4" onerror="ImageError(this);" alt="" src="" class="tooltipImages"/>
            </tr>
		
		<tr>
			<td class="style2" style="width:100"    >
				OT:</td>
			<td>
				<label id="LblOT"></label>

			</td>
		</tr>
		<tr>
			<td class="style2">
				No Cinta:</td>
			<td>
				
                <label id="LblNoCinta">
                </label>
            </td>
		</tr>
		<tr>
			<td class="style2">
				Titulo:</td>
			<td>
				<label id="LblTitulo"></label>
			</td>
		</tr>
		<tr>
			<td class="style2">
				Fecha:</td>
			<td>
				<label id="LblFecha"></label>

			</td>
		</tr>
		<tr>
			<td class="style2">
				Programa:</td>
			<td>
				<label id="LblPrograma"></label>

			 </td>
		</tr>
		<tr>
			<td class="style2">
				Palabra Clave:</td>
			<td>
				<label id="LblPClave"></label>
				
			</td>
		</tr>
		<tr>
			<td class="style2">
				Personaje:</td>
			<td>
				<label id="LblPersonaje"></label>

			</td>
		</tr>
		<tr>
			<td class="style2">
				No.Recuperaciones:</td>
			<td>
				<label id="LblNRecuperado"></label>
				
				</td>
		</tr>
		<tr>
			<td class="style2">
				Id:</td>
			<td>
				<label id="LblId"></label>

			</td>
		</tr>
		</table>
</div>
 
 <div id="TooltipCarrusel">
    <div class="divToolTipCarrusel">
        <div class="divImgToolTipCarrusel"><img id="ImgC1" onerror="ImageError(this);" alt="" src="" height="80" width="100" /></div>
        <div class="divImgToolTipCarrusel"><img id="ImgC2" onerror="ImageError(this);" alt="" src="" height="80" width="100" /></div>
        <div class="divImgToolTipCarrusel"><img id="ImgC3" alt="" onerror="ImageError(this);" src="" height="80" width="100" /></div>
        <div class="divImgToolTipCarrusel"><img id="ImgC4" alt="" onerror="ImageError(this);" src="" height="80" width="100" /></div>  
    </div>   
 </div>
 <div class="cntrElement">
    <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="UP2" dynamiclayout="true">
        <progresstemplate>
            <img alt="Loading..." src="../Images/image-loading.gif">
        </progresstemplate>

    </asp:updateprogress>
</div>
<div class="cntrElement">
    <asp:updateprogress id="UpdateProgress2" runat="server" associatedupdatepanelid="Navegador" dynamiclayout="true">
        <progresstemplate>
            <img alt="Loading..." src="../Images/image-loading.gif">
        </progresstemplate>

    </asp:updateprogress>
</div>
</asp:Content>


