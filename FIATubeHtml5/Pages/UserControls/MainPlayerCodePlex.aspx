<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="MainPlayerCodePlex.aspx.cs" Inherits="FIATubeHtml5.Pages.UserControls.VideoPlayerCodePlex" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Video</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/UserControls/MainPlayerCodePlex.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Video/PlayerControls.js?Rand="+RandomCall) %>"></script>
    <style>
        .ui-dialog { background:rgba(50, 50, 50, 0.7) !Important; color: #ffffff !Important;}
    </style>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div id="divToolbar" class="otButtonsBckgrndVideo">  
        <div class="divContBotones">
            <button id="btnEditarInfo" type="button" class="btnEditarInfo" title="Editar información" data-isPress='0' onclick="btneditarinfo_click();"></button>
            <button id="btnGardar" type="button" class="btnGuardarCambios" title="Guardar cambios" onclick="btnGardar_click();"></button>
            <button id="btnRecupera" type="button" class="btnRecupera" title="Recuperar gui&oacute;n" onclick="recuperarGuion_click();" ></button>
            <button id="btnBloqueaVideo" type="button" class="btnBloqueaVideo" title="Bloquear video" onclick="btnBloqueaVideo_click();" style="display:none;"></button>
            <button id="btnAdjuntos" type="button" class="btnAdjuntos" title="Mostrar adjuntos" style="display:none;"></button>
        </div>
    </div>
    <div id="divReporterosRecG" style="display:none;">
        <div class="otButtonsBckgrnd varMarginTop4">
            <button type="button" id="btnSaveRecG" class="btnGuardar" onclick="saveRecuperacionG_click();"></button>
            <select id="cmbReporterosRecG" class="cmb90"></select>
        </div>
    </div>

    <div id="divPlayer" class="divPlayer">
        
    </div>
        <div class="divMediaSpace_wrapper"> 
            <button type="button" id="btnVidRel" class="btnVidRel" data-opn="0" onclick="showPlayListRel(); return false;"></button>
            <div id="divVidRel">                                      
                    <div id="divRelData"></div>
                    <%--<button type="button" id="btnRelBack" title="Anterior">B</button>
                    <button type="button" id="btnRelNext" title="Siguiente">N</button>--%>                  
            </div>           
            <div id="divMediaSpace"></div>
        </div>
                 
        <div id="divVideoData" class="divDatosVideo">

          <div class="divBodyVideoSecc">
            
            <label class= "lblVideo" for="lblOT">OT:</label>
            
            <label class= "lblVideo2" id="lblOT"></label>
            
        </div>

        <div class="divBodyVideoSecc">
            
            <label  class= "lblVideo" for="lblTitulo">T&iacute;tulo:</label>
           
            
            <label  class="lblVideo2" id="lblTitulo"></label>
            
        </div>
            
        <div class="divBodyVideoSecc">
            
            <label class="lblVideo" for="lblObjetivo">Objetivo:</label>           
            
            <label class="lblVideo2" id="lblObjetivo"></label>
             
        </div>
            
        <div class="divBodyVideoSecc">
            
            <label class= "lblVideo" for="lblReportero">Reportero:</label>
            
            
            <label class= "lblVideo2" id="lblReportero"></label>
            
        </div>
            
          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblSeccion">Secci&oacute;n:</label>
           
          
            <label class= "lblVideo2" id="lblSeccion"></label>
            </div>
           
            <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblProduccion">Producci&oacute;n:</label>
            <label class= "lblVideo2" id="lblProduccion"></label>
            </div>
          
          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblFecha">Fecha:</label>
            <label class= "lblVideo2" id="lblFecha"></label>
          </div>

          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblPalCve">Palabras clave:</label>
            <label class= "lblVideo2" id="lblPalCve"></label>
            <input class= "lblVideo2" type="text" id="txtPalCve" />
          </div>

          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblPersonajes">Personajes:</label>
            <label class= "lblVideo2" id="lblPersonajes"></label>
            <input class= "lblVideo2" type="text" id="txtPersonajes" />
          </div>

          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblCinta">No. Cinta:</label>
            <label class= "lblVideo2" id="lblCinta"></label>
          </div>

          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblAgencia">Agencia:</label>
            <label class= "lblVideo2" id="lblAgencia"></label>
          </div>

          <div class="divBodyVideoSecc">
            <label class= "lblVideo" for="lblPais">Pa&iacute;s:</label>
            <label class= "lblVideo2" id="lblPais"></label>
          </div>

          <div class="divBodyVideoSecc">
            <label  class= "lblVideo" for="lblEstado">Estado:</label>
            <label class= "lblVideo2" id="lblEstado"></label>
          </div>

         <div class="divBodyVideoSecc">
            <label  class= "lblVideo" for="lblCiudad">Ciudad:</label>
            <label  class= "lblVideo2" id="lblCiudad"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label  class= "lblVideo" for="lblLocal">Local:</label>
            <label  class= "lblVideo2" id="lblLocal"></label>
         </div>
         <div class="divBodyVideoSecc">
            <label  class= "lblVideo" for="lblRegion">Region:</label>
            <label  class= "lblVideo2" id="lblRegion"></label>
         </div>
         <div class="divBodyVideoSecc">
            <label  class= "lblVideo" for="lblFormato">Formato:</label>
            <label  class= "lblVideo2" id="lblFormato"></label>
         </div>
         <div class="divBodyVideoSecc">
            <label  class= "lblVideo" for="lblTipMat">Tipo de Material:</label>
            <label  class= "lblVideo2" id="lblTipMat"></label>
         </div>

         

         </div>

        <div id="divVideoData2" class="divDatosVideo">

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">T&iacute;tulo Original:</label>
            <label class= "lblVideo2" id="lblTitO2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">T&iacute;tulo traducido:</label>
            <label class= "lblVideo2" id="lblTitTra2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">T&iacute;tulo Comercial:</label>
            <label class= "lblVideo2" id="lblTitCom2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Cap. Original:</label>
            <label class= "lblVideo2" id="lblCapO2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Cap. Traducido:</label>
            <label class= "lblVideo2" id="lblCapT2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">No. C&aacute;pitulo:</label>
            <label class= "lblVideo2" id="lblCap2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">No. Cinta:</label>
            <label class= "lblVideo2" id="lblNoCinta2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Genero:</label>
            <label class= "lblVideo2" id="lblGenero2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Fecha:</label>
            <label class= "lblVideo2" id="lblFecha2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Durac&iacute;on Cred:</label>
            <label class= "lblVideo2" id="lblDurC2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Durac&iacute;on SinCred:</label>
            <label class= "lblVideo2" id="lblDurSC2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Palabras Clave:</label>
            <label class= "lblVideo2" id="lblPalCve2"></label>
            <input class= "lblVideo2" type="text" id="txtPalCve2" style="display:none;"/>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Personajes:</label>
            <label class= "lblVideo2" id="lblPersonajes2"></label>
            <input class= "lblVideo2" type="text" id="txtPersonajes2" style="display:none;" />
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Sinopsis:</label>
            <label class= "lblVideo2" id="lblSinopsis2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Agencia:</label>
            <label class= "lblVideo2" id="lblAgencia2"></label>
         </div>

         <div class="divBodyVideoSecc">
            <label class= "lblVideo">Pa&iacute;s:</label>
            <label class= "lblVideo2" id="lblPais2"></label>
         </div>

        </div>
        <div id="divGuion" class="divGuion"></div>
        <div class="divBotonera">
            <label class="lblTiempoVideo" id="lblCurrVidTime">00:00:00</label>
            <div class="videoSliderTime" id="vidSliderTime"></div>                      
            <label class="lblDuracionVideo" title="Tiempo de duraci&oacute;n del Video" id="lblVidTime">00:00:00</label>

            <button type="button" class="btnRewind" onclick="seekBack();"></button>
            <button type="button" class="btnPlay" onclick="playerPlay();"></button>
            <button type="button" class="btnFastFoward" onclick="seekForward();"></button>
            <button type="button" class="btnStop" onclick="playerStop();"></button>
            <button type="button" class="btnFullScn" onclick="setFullScreen();" title="Ver pantalla Completa"></button>
            <button type="button" class="btnVolumen" id="btnShowPVolume"></button>
            <input id="chkStream" type='checkbox' style="display:none;" class="checkboxVC" onclick='setStreaming(this);' data-isActive='1' checked="checked" title='Desactivar Streaming' />
            <div id="divPlayerVol" style="display:none;" data-isOpen="0">
            <div class="videoSliderVolume" id="vidSliderVolume"></div>
        </div>        
        <div id="divFotoGaleria" class="divDatosFotoGaleria">
            <label>Fotogaler&iacute;a</label>
            <br />
        </div>
    </div>
     
    <div id="divBloqueoVid">
        <iframe id="ifrmBloqueo"></iframe>
    </div>
    <div id="divPreviewFG" style="display:none; text-align:center;">
        <img alt="imagen" height="140" width="150" id="imgFGPreview" src="" />
        <br />
        <label id="lblTimePrev"></label>
    </div>
</asp:Content>
