<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="FIATubeHtml5.Pages.Default2" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>.: AztecaTube :.</title>
                  
    <script src="Scripts/Login/jquery-1.3.2.min.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/Login.js" type="text/javascript"></script>      
    <script language="Javascript" src="Scripts/Login/rsa.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/aes-enc.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/sha1.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/base64.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/PGpubkey.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/PGencode.js" type="text/javascript"></script>                
    <script language="Javascript" src="Scripts/Login/mouse.js" type="text/javascript"></script>
    <script language="Javascript" src="Scripts/Login/3DEngine.js" type="text/javascript"></script>                
    <script language="Javascript" src="Scripts/Login/Sphere.js" type="text/javascript"></script>
        
    <style type="text/css" media="screen">
			#item{
				width:10px;
				height:5px;
				margin:0 auto;
				top:300px;
				position: relative;
			}
			ul{
				list-style-type: none;
			}
			.divLogInContainer
			{
			    background-color:rgba(220, 220, 220, 0.5);
			    border-style:solid;
			    border-width:4px;
			    border-color:rgba(200, 200, 200, 0.5);
			    border-radius: 10px;
			    -moz-border-radius: 10px;
			    font-family:Arial Verdana Myriad Pro;
			    width:220px;
			    position:fixed;
			    top:20px;
			    left:20px;
			}
			.divLogInContainerSecc
			{
			    margin:0 0 3px 0;
			    height:30px;
			    text-align:center;
			    width:100%;
			}
			body
			{
			    background-color: #ffffff;
                background-repeat: no-repeat;
                background-position:top;
                background-image: url(Styles/images/32312.jpg);
			}
			.txtInputMasterLogIn
            {
                float:left;
                margin-left:5px;
                width:100px;
                border: 2px solid #dcdcdc;
            }
            .textogeneralnegrobold
            {
	            font-family:Arial !important;
	            font-size:.8em;
	            font-weight:bold;
	            float:left;
	            color:#0A0A0A;
            }
            .txtCerrarSesion
            {
                font-family:Arial !important;
	            font-size:.8em;
	            font-weight:bold;
	            float:right;
	            color:#0A0A0A;
            }
            .btnCerrarSesion
            {
                float:right;
                margin:3px 5px 0 5px;
            }
            
            label
            {
                text-align:right;
                margin-left:10px;
                width:80px;
            }
            .textoSecciones
            {
	            font-family:Arial !important;
	            font-size:.9em;
	            font-weight:bold;
	            color:#0A0A0A;
            }
            .txtAlignTitle
            {
                text-align:center;
                padding-top:7px;
            }            
            .btnAceptarLogin
            {
                height: 25px;
                width:80px;
                text-align:center;
                border:0px solid #1F1F1F;
                border-radius:3px;
                -moz-border-radius:3px;
                box-shadow: 0px 2px 0px #ffffff;
                background: #FFFFFF;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url(Styles/images/icoENTRAR.png), -moz-linear-gradient(center top, #DCDCDC, #C8C8C8 49%, #B4B4B4 50%, #787878) !Important; /* FF3.6 */
                background-image: url(Styles/images/icoENTRAR.png), -webkit-gradient(linear, center top, center bottom, from(#DCDCDC), color-stop(49%, #C8C8C8), color-stop(50%, #B4B4B4), to(#787878)) !Important; /*Safari, Chrome Linear gradients*/
            }
            .btnAceptarLogin:hover
            {
                background-image:url(Styles/images/icoENTRAR.png), -moz-linear-gradient(center top, #C8C8C8, #C8C8C8 49%, #C8C8C8 50%, #C8C8C8) !Important; /* FF3.6 */
                background-image:url(Styles/images/icoENTRAR.png), -webkit-gradient(linear, center top, center bottom, from(#C8C8C8), color-stop(49%, #C8C8C8), color-stop(50%, #C8C8C8), to(#C8C8C8)) !Important; /*Safari, Chrome Linear gradients*/                
            }
            .txtLoginLegals
            {
                background-color:rgba(200, 200, 200, 0.5);
                border-radius:0 0 5px 5px;
                -moz-border-radius:0 0 5px 5px;
                float:none;
                font-size:.6em;
                font-family:Arial !important;
                text-align:justify;
                margin-left:1%;
                margin-bottom:3px;
                padding:3px;
                width:96%;
            }
            .divLoginLegals
            {
                margin-bottom:7px;                
                width:100%;
            }
            .divErrorLogin
            {
                text-align:center;
                font-family: Arial !important;
                background-color:rgba(255, 0, 0, 0.3);
                width:100%;
            }

		</style>
</head>
<body>
<form id="form1" runat="server">
    <div id="dhtmltooltip"></div>        
    <div class="contenido">    
       <div id="item">
		</div>
        <script type="text/javascript">
		
	</script>    
        
        <div id="defaultLoginContainer" class="divLogInContainer" > 
            <div id="div_logout" style="display:none" runat="server">                                                        
                <div class="divLogInContainerSecc">                    
                    <asp:ImageButton ImageUrl="~/Images/ico_cerrar.gif" ID="btn_Logout" class="btnCerrarSesion" runat="server" />  
                    <texto class="txtCerrarSesion">Cerrar Sesión</texto>              
                </div>
                <div>                    
                    <div id="div_txtUsuario" class="textogeneralnegrobold" runat="server"></div>
                    <br />
                    <asp:ImageButton ImageUrl="~/Images/aztecatube2.png" alt="" Width="200" Height="80" runat="server" ID="btnFIATUBE" />                                                           
                </div>                    
            </div>
            <div id="div_login" runat="server">
                <asp:ImageButton ImageUrl="~/Images/aztecatube2.png" alt="" Width="200" Height="80" runat="server" ID="ImageButton1" />
                <div class="divLogInContainerSecc  txtAlignTitle">
                    <label class="textoSecciones">Llave Maestra</label>
                </div>
                <div class="divLogInContainerSecc">
                    <label class="textogeneralnegrobold">Usuario:</label>                    
                    <asp:TextBox ID="txtUsuario" runat="server" class="txtInputMasterLogIn" CausesValidation="true"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txtUsuario"
                            ErrorMessage="Ingresa tu Usuario" ValidationGroup="login">*</asp:RequiredFieldValidator>                    
                </div>
                <div class="divLogInContainerSecc">
                    <label class="textogeneralnegrobold">Contraseña:</label>
                    <asp:TextBox ID="txtContraseña" runat="server" class="txtInputMasterLogIn" TextMode="Password" CausesValidation="true"></asp:TextBox>
                </div>
                    <div class="divLogInContainerSecc">                               
                    <asp:Button ID="btnLogin" runat="server" class="btnAceptarLogin" ValidationGroup="login" OnClick="btnLogin_Click" />
                </div>
                    
                <div runat="server" id="tdError" visible="false" class="divErrorLogin ErrorValidator"></div>
                    <div class="DataSEC">
                        <div class="txtLoginLegals">
                            <div class="divLoginLegals">
                            El usuario y contraseña son los de Llave maestra 
                            </div>
                            <div class="divLoginLegals">
                            Si tienes duda sobre tu usuario y contraseña, comunícate a *5
                            </div>
                            <div class="divLoginLegals">
                            Recuerda que tu clave de usuario y contraseña son únicas e intransferibles
                            </div>
                            <div class="divLoginLegals">
                            Es importante que renueves tu contraseña cada 90 días
                            </div>
                            <div class="divLoginLegals">
                            Conoce las mejores prácticas de seguridad en la sección Seguridad de la Información
                            </div>
                            <div class="divLoginLegals">
                             Soporte T&eacute;cnico Ext: 39292
                            </div>
                        </div>
                    </div>
                </div> 
        </div>                                        
                                        
        
                                    
        <input type="hidden" runat="server" id="hdnE"/>
        <input type="hidden" runat="server" id="hdnN"/>
        <asp:HiddenField ID="hdnSkin" runat="server" />
        <asp:HiddenField ID="hdnLogIn" runat="server" Value="" />
        <asp:HiddenField ID="hdnNumUsuario" runat="server" Value="" />
        <asp:HiddenField ID="B" runat="server" Value="" />       
          
        <asp:Button runat="server" ID="btnLogOutUsuario" Text="Log" OnClick="btnLogOutUsuario_Click" Visible="true" style="display:none" />
        <asp:Button runat="server" ID="btnCloseSession" Text="CloseSession" OnClick="btnCloseSession_Click" Visible="true" style="display:none" />
        <input type="hidden" id="HidUsr" runat="server" value="0" />
    </div>       
    </form>
</body>