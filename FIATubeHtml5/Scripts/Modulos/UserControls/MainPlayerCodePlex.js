    
var isDivVideo = true;
var infoMetaData;
var cvePrograma = -1;
var ItemBloqVideo;
var isVideoLocked = false;
var itemSelected;
var initParams;
var currentidVideo;
var esSudafrica = false
var GuionOT;
var ListaGuionOT;
var isFromPlayList = false;

var isActiveStreaming = true;

var thePlayerName = "";

window.onload = function () { initFunction(); }

function initFunction() {
    if (sessionStorage.isActiveStreaming == 'undefined' || sessionStorage.isActiveStreaming == undefined || sessionStorage.isActiveStreaming == 'true')
        sessionStorage.isActiveStreaming = true;
    else
        sessionStorage.isActiveStreaming = false;

    isActiveStreaming = sessionStorage.isActiveStreaming;

    if (isActiveStreaming == 'true') {
        $("#chkStream").attr('title', 'Desactivar Streaming');
        $("#chkStream").attr('data-isActive', 1);
        isActiveStreaming = true;
    }
    else {
        $("#chkStream").removeAttr('checked');
        $("#chkStream").attr('title', 'Activar Streaming');
        $("#chkStream").attr('data-isActive', 0);
        isActiveStreaming = false;
    }

    /*Se obtienen las variables de entrada por URL*/
    hideSaveButton();
    if (isFromPlayList == false)
        initParams = getUrlVars();
    initialize();
    jwplayer().play();
}

$(function () {
    $("#divBloqueoVid").dialog({ resizable: false, autoOpen: false, show: "blind", width: 'auto', height: 'auto', modal: true });
    $("#divReporterosRecG").dialog({ resizable: false, autoOpen: false, show: "blind", width: 'auto', height: 'auto', modal: true });
    $("#divPreviewFG").dialog({ resizable: false, autoOpen: false, width: 'auto', height: 'auto', modal: false });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divPreviewFG').parent()).remove();
    $("#divPreviewFG").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
    $("#divVideoData2").hide();
    $("#divVideoData").hide();

    $("#divVidRel").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", width: 300, height: 200, modal: false, position: [0, 80] });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divVidRel').parent()).remove();
    $("#divVidRel").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
});

function initialize() {
    var image;
    var video;

    if (initParams['uriImg'] == undefined || initParams['uriImg'] == '') image = noVideoImagePath;
    else image = initParams['uriImg'];

    if (initParams['uriVideo'] == undefined || initParams['uriVideo'] == '') video = noVideoPath;
    else video = initParams['uriVideo'];
    
    /*Se carga el video*/
    loadPlayer("divMediaSpace", isActiveStreaming, video, image, 220, 300, 0);

    /*Se obtiene el id del video*/
    currentidVideo = (((initParams['uriVideo'].split('/'))[initParams['uriVideo'].split('/').length - 1]).split('.'))[0];

    /*Se obtiene play list de videos relacionados*/
    getPlayListVideos(initParams['numOT'], currentidVideo);

    if (initParams['isfromConsulta'] == "true") {
        infoMetaData = eval('(' + sessionStorage.vidata + ')');
        itemSelected = infoMetaData;
    }
    validaVideoBloqueadoNOSeleccion(currentidVideo);

    /*Cuando no se tiene la informacion de la metadata se consulta con el numero de la OT y Num de Prog*/
    if (initParams['numProg'] > 0) {
        getVideoMetadata();
        esSudafrica = itemSelected.OrigenMaterial == 2;
    }

    /*Se obtiene la videoGaleria*/
    getTimeCodes();

    /*Se genera la estructura del guion si existe*/
    parseGuion();
}

function hideSaveButton() {
    if ($("#btnEditarInfo").attr('data-isPress') == 0) {
        $("#btnGardar").hide();
        if (isDivVideo == true) {
            $("#lblPalCve").show();
            $("#lblPersonajes").show();
            $("#txtPalCve").hide();
            $("#txtPersonajes").hide();
        }
        else {
            $("#lblPalCve2").show();
            $("#lblPersonajes2").show();
            $("#txtPalCve2").hide();
            $("#txtPersonajes2").hide();
        }
    }
    else {
        $("#btnGardar").show();
        if (isDivVideo == true) {
            $("#lblPalCve").hide();
            $("#lblPersonajes").hide();
            $("#txtPalCve").val($("#lblPalCve").text());
            $("#txtPersonajes").val($("#lblPersonajes").text());
            $("#txtPalCve").show();
            $("#txtPersonajes").show();
        }
        else{
            $("#lblPalCve2").hide();
            $("#lblPersonajes2").hide();
            $("#txtPalCve2").val($("#lblPalCve2").text());
            $("#txtPersonajes2").val($("#lblPersonajes2").text());
            $("#txtPalCve2").show();
            $("#txtPersonajes2").show();
        }
    }
}

/*Carga el player dentro del control especificado*/
function loadPlayer(controlName, isStreaming, file, image, theHeight, theWidth, startpoint, goToSecondSrv) {
    var streaming = streamerPath;
    if (goToSecondSrv == true) 
        streaming = streamerPath2;
    
    if (isStreaming) {
        jwplayer(controlName).setup({
            flashplayer: playerPath,
            height: theHeight,
            width: theWidth,
            allowscriptaccess: 'always',
            allowfullscreen: true,
            repeat: 'list',
            file: getUrlFormatoStreaming(file),
            image: image,
            start: startpoint,
            streamer: streaming,
            controlbar: 'none',
            volume: 50
        });
    }
    else {
        jwplayer(controlName).setup({
            flashplayer: playerPath,
            height: theHeight,
            width: theWidth,
            allowscriptaccess: 'always',
            allowfullscreen: true,
            repeat: 'list',
            file: file,
            image: image,
            start: startpoint,
            controlbar: 'none',
            logo: { hide: true },
            icons: false,
            volume: 50
        });
    }

    thePlayerName = controlName;

    jwplayer(thePlayerName).onPlay(
        function () {
            $("#lblVidTime").empty();
            $("#lblVidTime").append(numberToTimeFormat(jwplayer(thePlayerName).getDuration()));
            $("#vidSliderTime").slider({
                orientation: "horizontal",
                range: "min",
                max: Math.floor(jwplayer(thePlayerName).getDuration())
            });

            setTimer();
        }
    );

    jwplayer(thePlayerName).onIdle(
        function () {
            $("#vidSliderTime").slider("value", 0);
        }
    );

        jwplayer(thePlayerName).onError(
        function () {
            if (isActiveStreaming == true) {
                if (streaming != streamerPath2)
                    loadPlayer("divMediaSpace", isActiveStreaming, initParams['uriVideo'], initParams['uriImg'], 220, 300, 0, true);
                else {
                    isActiveStreaming = false;
                    loadPlayer("divMediaSpace", isActiveStreaming, initParams['uriVideo'], initParams['uriImg'], 220, 300, 0);
                }
            }
            else
                alertModal("Ocurrio un problema al cargar el video, favor de comunicarse con su administrador.");
        }
    );
}

function btneditarinfo_click() {
    if (!validaBusquedaVideosBaneados()) {
        alertModal("No cuenta con los permisos para realizar esta operación");
        return false;
    }

    if ($("#btnEditarInfo").attr('data-isPress') == 0) {
        $("#btnEditarInfo").attr('data-isPress', 1);
        $("#btnEditarInfo").attr('title', 'Cancelar edición');
    }
    else {
        $("#btnEditarInfo").attr('data-isPress', 0);
        $("#btnEditarInfo").attr('title', 'Editar información');
        $("#txtPalCve").val('');
        $("#txtPersonajes").val('');
        $("#txtPalCve2").val('');
        $("#txtPersonajes2").val('');
    }
    hideSaveButton();
}

function getVideoMetadata() {
    var inputData = "{ 'cveOT':'', 'textoFiltro':'', 'cveEmpleado':0, 'cvePrograma':" + initParams['numProg'] + ", 'cveSeccion':0, 'cvePais':0, 'cveEstado':0, 'cveCiudad':0, 'fechaIni':'01/01/0001', 'fechaFin':'01/01/0001', " +
                    "  'esBusquedaAvanzada':false, 'soloConVideo':false, 'soloNotaTerminada':true, 'soloMaterialBruto':true, 'noCinta':'', 'cveAgencia':0, 'NumOT':'" + initParams['numOT'] + "', 'VdoIdFileName': '" + currentidVideo + "', " +
                    " 'PosIni':0, 'PosFin':0, 'Baneados':false }";
    executeSyncRequest(wsMtdGetBusquedaAvzConSinOT, inputData, successgetVideoMetadata, Error);
}

var successgetVideoMetadata = function (data, status) {
    if (data.d.length > 0) {
        $.each(data.d, function (index, resultado) {
            itemSelected = resultado;
            return;
        });
    }
}

function validaVideoBloqueadoNOSeleccion(idVideo) {
    var inputData = "{ 'VdoIdFileName': '" + idVideo + "', 'NumUsuario': " + sessionStorage.numUsuario + ", 'Producciones':'" + sessionStorage.userProducciones + "', 'Seccion': " + sessionStorage.UserSeccion + " }";
    executeSyncRequest(wsMtdgetBloqueoVidByVdoFileName, inputData, successvalidaVideoBloqueadoNOSeleccion, Error);
}

var successvalidaVideoBloqueadoNOSeleccion = function (data, status) {
    if (data.d.VdoIdFileName != '') {
        isVideoLocked = true;
        ItemBloqVideo = data.d;
    }
    else
        isVideoLocked = false;
    var inputData = "{ 'idFilename': '" + currentidVideo + "' }";
    executeSyncRequest(wsMtdgetIdProgramaByidFileName, inputData, successgetIdProgramaByidFileName, Error);
}

var successgetIdProgramaByidFileName = function (data, status) {
    
    if (data.d > 0) {
        cvePrograma = data.d;        
        if (initParams['numOT'] != 0)//Si con el numero de produccion y si tiene Numero de OT, trata de consultar el Guion
            consultaGuionOT(initParams['numOT'], cvePrograma);
        else {
            if (initParams['isfromConsulta'] == "true") {
                if (initParams['numOT'] != 0)
                    FillPlayListBorder(initParams['numOT'], currentidVideo);
                else
                    creaControlYMuestraCoverFlow();
            }
            else
                consultaMetadataVideo(currentidVideo);
        }
    }
    else {
        if (initParams['isfromConsulta'] == "true") {
            if (initParams['numOT'] != 0)
                FillPlayListBorder(initParams['numOT'], currentidVideo);
            else {
                if (infoMetaData == undefined && sessionStorage.vidata != undefined) {
                    infoMetaData = eval('(' + sessionStorage.vidata + ')');
                    itemSelected = infoMetaData;
                }
                creaControlYMuestraCoverFlow();
                sessionStorage.vidata = undefined;
            }
        }
        else
            consultaMetadataVideo(currentidVideo);
    }
}

function consultaMetadataVideo(idVideo) {
    var inputData = "{ 'cveOT':'', 'textoFiltro':'', 'cveEmpleado':0, 'cvePrograma':0, 'cveSeccion':0, 'cvePais':0, 'cveEstado':0, 'cveCiudad':0, 'fechaIni':'" + new Date().toDateString() + "', 'fechaFin':'" + new Date().toDateString() + "', " +
                    "  'esBusquedaAvanzada':false, 'soloConVideo':false, 'soloNotaTerminada':true, 'soloMaterialBruto':true, 'noCinta':'', 'cveAgencia':0, 'NumOT':'', 'VdoIdFileName': '" + currentidVideo + "', " +
                        " 'PosIni':0, 'PosFin':0, 'Baneados':" + validaBusquedaVideosBaneados() + " }";
    executeSyncRequest(wsMtdGetBusquedaAvzConSinOT, inputData, successConsultaMetadataVideo, Error);
}

var successConsultaMetadataVideo = function (data, status) {
    if (data.d.length > 0) {
        infoMetaData = data.d[data.d.length - 1];
        itemSelected = infoMetaData;
        //alert(itemSelected.FechaAgenda + "  " + itemSelected.FechaVideo);

    }
    if (initParams['numOT'] != 0)
        FillPlayListBorder(initParams['numOT'], infoMetaData.IdFileName);
    else {
        if (infoMetaData == undefined && sessionStorage.vidata != undefined)
            infoMetaData = eval('(' + sessionStorage.vidata + ')');
        creaControlYMuestraCoverFlow();
        sessionStorage.vidata = undefined;
    }
}

function validaBusquedaVideosBaneados() {
    var i = 0;
    var salida = false;
    var puestos = sessionStorage.userPuestos.split(',');

    if (puestos.length > 0)
    {
        for(i=0; i < puestos.length; i++)
            if (puestos[i] == "9" || puestos[i] == "59")
            {
                salida = true;
                break;
            }
    }
    return salida;
}

function FillPlayListBorder(numeroOT, idFileName) {
    if (infoMetaData == undefined)
        consultaMetadataVideo(currentidVideo);
    else {
        isDivVideo = true;

        infoMetaData.FechaVideo = infoMetaData.FechaVideo.toString().replace('/Date(', '').replace(')/', '');
        infoMetaData.FechaVideo = infoMetaData.FechaVideo.toString().substr(0, infoMetaData.FechaVideo.indexOf('-'));
        infoMetaData.FechaVideo = new Date(new Number(infoMetaData.FechaVideo));       

        $("#divVideoData").show();        
        $("#lblOT").text(infoMetaData.CveOrdenTrabajo);
        $("#lblTitulo").text(infoMetaData.Titulo);
        $("#lblObjetivo").text(infoMetaData.Objetivo);
        $("#lblReportero").text(infoMetaData.Empleados);
        $("#lblSeccion").text(infoMetaData.NombreSeccion);
        $("#lblProduccion").text(infoMetaData.NombrePrograma);
        if ("31/12/1969" == infoMetaData.FechaVideo.esMXFormat()) {
            $("#lblFecha").text(infoMetaData.FechaAgenda.substring(0,10));            
        } else {
            $("#lblFecha").text(infoMetaData.FechaVideo.esMXFormat());
        }
        $("#lblPalCve").text(infoMetaData.PalabrasClave);
        $("#lblPersonajes").text(infoMetaData.Personajes);
        $("#lblCinta").text(infoMetaData.NoCinta);
        $("#lblAgencia").text(infoMetaData.NombreAgencia);
        $("#lblPais").text(infoMetaData.NombrePais);
        $("#lblEstado").text(infoMetaData.NombreEstado);
        $("#lblCiudad").text(infoMetaData.NombreCiudad);
        $("#lblLocal").text(infoMetaData.local);
        $("#lblRegion").text(infoMetaData.region);
        $("#lblFormato").text(infoMetaData.formatoaire);
        $("#lblTipMat").text(infoMetaData.tipmat);
        
    }
}

function btnGardar_click() {
    try {
        var oLog = GenerateTransac();
        var oTran = new TDI_Transaccion();
        var imetaDataToUpdate = new VideoDetalle();

        imetaDataToUpdate.IdNombreArchivoDetalle = infoMetaData.DetIdFilename;
        imetaDataToUpdate.IdNombreArchivo = infoMetaData.IdFileName;
        if (isDivVideo == true) {
            if ($.trim($("#txtPalCve").val()) != '')
                imetaDataToUpdate.Keyword = $.trim($("#txtPalCve").val());
            else
                imetaDataToUpdate.Keyword = " ";

            if ($.trim($("#txtPersonajes").val()) != '')
                imetaDataToUpdate.Personajes = $.trim($("#txtPersonajes").val());
            else
                imetaDataToUpdate.Personajes = " ";
        }
        else {
            if ($.trim($("#txtPalCve2").val()) != '')
                imetaDataToUpdate.Keyword = $.trim($("#txtPalCve2").val());
            else
                imetaDataToUpdate.Keyword = " ";

            if ($.trim($("#txtPersonajes2").val()) != '')
                imetaDataToUpdate.Personajes = $.trim($("#txtPersonajes2").val());
            else
                imetaDataToUpdate.Personajes = " ";
        }
        oLog.CveLogTransaccion = 0;
        oTran.CveTransaccion = 11;
        oLog.CveTran = oTran;
        oLog.Descripcion = "Se Actualizó la Metadata. Palabras Clave: '" + infoMetaData.PalabrasClave + "' por '" + imetaDataToUpdate.Keyword + "' \n" + " Personaje: '" + infoMetaData.Personajes + "' por '" + imetaDataToUpdate.Personajes + "'";
        oLog.Usuario = sessionStorage.userName;
        var inputData = "{ oInformacion:" + JSON.stringify(imetaDataToUpdate, null, 2) + ", oLogTr: " + JSON.stringify(oLog, null, 2) + " }";
        executeSyncRequest(wsMtdActInfMetadata, inputData, successWsMtdActInfMetadata, Error);
    }
    catch (ex) {
        alertModal('Ocurrio un problema al guardar los datos: ' + ex.Message);
    }
}

var successWsMtdActInfMetadata = function (data, status) {
    if (data.d == true) {
        alertModal('La información se ha actualizado correctamente');
        if (isDivVideo == true) {
            $("#lblPalCve").empty();
            $("#lblPalCve").append($.trim($("#txtPalCve").val()));
            $("#lblPersonajes").empty();
            $("#lblPersonajes").append($("#txtPersonajes").val());
        }
        else {
            $("#lblPalCve2").empty();
            $("#lblPalCve2").append($.trim($("#txtPalCve2").val()));
            $("#lblPersonajes2").empty();
            $("#lblPersonajes2").append($("#txtPersonajes2").val());
        }
        infoMetaData.Personajes = $("#txtPersonajes").val();
        infoMetaData.PalabrasClave = $.trim($("#txtPalCve").val());
        btneditarinfo_click();
    }
}

function btnBloqueaVideo_click() {
    if (validaBloqueoVideo("Admin"))//Si es Admin puede Bloquear cualquier Video
    {
        $("#ifrmBloqueo").attr('src', 'DialogBloqueoVideo.aspx?isAdmin=true');
        $("#divBloqueoVid").dialog('open');
    }
    else {
        if (validaBloqueoVideo("JSecc") && ValidaVideoDeMiSeccion(itemSelected))//Si tiene Privilegios y les pertenece el Video como Seccion
        {
            $("#ifrmBloqueo").attr('src', 'DialogBloqueoVideo.aspx?isAdmin=false');
            $("#divBloqueoVid").dialog('open');
        }
        else if (validaBloqueoVideo("JInfo") && ValidaVideoDeMiProduccion(itemSelected)) //Si tiene Privilegios y les pertenece el Video como Produccion                                
        {
            $("#ifrmBloqueo").attr('src', 'DialogBloqueoVideo.aspx?isAdmin=false');
            $("#divBloqueoVid").dialog('open');
        }
        else
            alertModal('No tiene permisos para realizar esta operación');
    }
}

function ValidaVideoDeMiProduccion(ItemBA)
        {
            var producciones = sessionStorage.userProducciones.split(',');
            var salida = false;
            if (producciones.length > 0)
            {
                $.each(puestos, function (index, p) {
                    if (p == ItemBA.CvePrograma.toString())
                        salida = true;
                });
            }
            return salida;
        }

function ValidaVideoDeMiSeccion(ItemBA)
{
    var secciones = sessionStorage.userSeccion.split(',');
    var salida = false;
    if (secciones.length > 0)
    {
        $.each(puestos, function (index, p) {
            if (p == ItemBA.CveSeccion.toString())
                salida = true;
        });
    }
    return salida;
}

function validaBloqueoVideo(tipoValidacion)
{
    var puestos = sessionStorage.userPuestos.split(',');
    var salida = false;

    if (puestos.length > 0)
    {
        if (tipoValidacion == "General")
        {
            $.each(puestos, function (index, p) {
                if (p == "6" || p == "9" || p == "109")
                    salida = true;
            });
        }
        else if (tipoValidacion == "Admin")
        {
            $.each(puestos, function (index, p) {
                if (p == "9")
                    salida = true;
            });
        }
        else if (tipoValidacion == "JSecc")
        {
            $.each(puestos, function (index, p) {
               if (p == "109")
                    salida = true; 
            });
        }
        else if (tipoValidacion == "JInfo")
        {
            $.each(puestos, function (index, p) {
               if (p == "6")
                    salida = true;
            });
        }
    }
    return salida;
}


function consultaGuionOT(numeroOT, idPrograma) {
    var inputData = "{ 'otraLlavePr':" + numeroOT + ", 'esinLlavePr':" + idPrograma + ", 'realFechaTrans': '" + new Date().defaultView() + "' }"
    executeSyncRequest(wsMtdGetGuionNotaTrans, inputData, successConsultaGuionOT, Error);
}

var successConsultaGuionOT = function (data, status) {
    if (data.d.length > 0) {
        var LstT1 = new Array();
        var LstT2 = new Array();
        var LstT3 = new Array();

        $.each(data.d, function (index, guion) {
            if (guion.NumTabla == 1)
                LstT1.push(guion);
            else if (guion.NumTabla == 2)
                LstT2.push(guion);
            else if (guion.NumTabla == 3)
                LstT3.push(guion);
        });

        if (LstT1.length > 0) {
            ListaGuionOT = LstT1;
            GuionOT = LstT1[0];
        }
        else if (LstT2.length > 0) {
            ListaGuionOT = LstT2;
            GuionOT = LstT2[0];
        }
        else if (LstT3.length > 0) {
            ListaGuionOT = LstT3;
            GuionOT = LstT3[0];
        }
    }

    if (initParams['isfromConsulta'] == "true") {
        if (initParams['numOT'] != 0)
            FillPlayListBorder(initParams['numOT'], currentidVideo);
        else
            creaControlYMuestraCoverFlow();
    }
    else {
        consultaMetadataVideo(currentidVideo);
    }
}

function creaControlYMuestraCoverFlow() {
    $("#divVideoData2").css("width", '57.5%');
    $("#divVideoData2").show();
    isDivVideo = false;

    infoMetaData.FechaVideo = infoMetaData.FechaVideo.toString().replace('/Date(', '').replace(')/', '');
    infoMetaData.FechaVideo = infoMetaData.FechaVideo.toString().substr(0, infoMetaData.FechaVideo.indexOf('-'));
    infoMetaData.FechaVideo = new Date(new Number(infoMetaData.FechaVideo));

    $("#lblTitO2").text(infoMetaData.TituloOriginal);
    $("#lblTitTra2").text(infoMetaData.Titulotraducido);
    $("#lblTitCom2").text(infoMetaData.TituloComercial);
    $("#lblCapO2").text(infoMetaData.CapituloOriginal);
    $("#lblCapT2").text(infoMetaData.CapituloTraducido);
    $("#lblCap2").text(infoMetaData.NumeroCapitulo);
    $("#lblNoCinta2").text(infoMetaData.NoCinta);
    $("#lblGenero2").text(infoMetaData.NombreGenero);
    $("#lblFecha2").text(infoMetaData.FechaVideo);
    $("#lblDurC2").text(infoMetaData.DuracionconCred);
    $("#lblDurSC2").text(infoMetaData.DuracionsinCred);
    $("#lblPalCve2").text(infoMetaData.PalabrasClave);
    $("#lblPersonajes2").text(infoMetaData.Personajes);
    $("#lblSinopsis2").text(infoMetaData.Sinopsis);
    $("#lblAgencia2").text(infoMetaData.NombreAgencia);
    $("#lblPais2").text(infoMetaData.NombrePais);
}


function getTimeCodes() {
    if (infoMetaData.vdoId != undefined) {
        var data = "{ 'OTRA_CVEC':'', 'VideoReferencia':'" + currentidVideo + "', 'DetIdFilename':'" + infoMetaData.DetIdFilename + "', 'vdo_id':'" + infoMetaData.vdoId + "' }";
        executeSyncRequest(wsMtgGetViodeoGaleria, data, successgetFotoGaleria, Error);
    }
    else {
        $("#divFotoGaleria").empty();
        $("#divFotoGaleria").append("<label>Fotogaler&iacute;a</label><br /><img alt='' class='imgFotoGalVideo' src='../../Images/noimage.png'/>");
    }
}

var successgetFotoGaleria = function (data, status) {
    var dataCtrl = '<label>Fotogaler&iacute;a</label><br />';
    $("#divFotoGaleria").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, resultado) {
            dataCtrl += "<img alt='' class='imgFotoGalVideo' data-time='" + resultado.Tiempo + "' data-foto='" + resultado.Foto + "' src='" + resultado.Foto + "'/>";
        });
        $("#divFotoGaleria").append(dataCtrl);
    }
    else
        $("#divFotoGaleria").append("<label>Fotogaler&iacute;a</label><br /><img alt='' class='imgFotoGalVideo' data-time='0' data-foto='../../Images/noimage.png' src='../../Images/noimage.png'/>");
}

function imgPreview_mouseOver() {
    $(control).attr('style', 'cursor: pointer;');
    $("#imgFGPreview").attr('src', $(control).attr('data-foto'));
    $("#lblTimePrev").empty();
    $("#lblTimePrev").append(numberToTimeFormat(new Number($(control).attr('data-time'))));
    var position = $(control).position();
    $("#divPreviewFG").dialog('option', 'position', [window.event.clientX + 5, window.event.clientY - 600]);
    $("#divPreviewFG").dialog('open');
    return false;
}

$(function () {
    $("#divFotoGaleria").delegate(".imgFotoGalVideo", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
        $("#imgFGPreview").attr('src', $(this).attr('data-foto'));
        $("#lblTimePrev").empty();
        $("#lblTimePrev").append(numberToTimeFormat(new Number($(this).attr('data-time'))));
        var position = $(this).position();
        $("#divPreviewFG").dialog('open');
        $("#divPreviewFG").dialog('option', 'position', [window.event.clientX + 5, window.event.clientY - 20]);
        return false;
    });

    $("#divFotoGaleria").delegate(".imgFotoGalVideo", "mouseout", function () {
        $("#divPreviewFG").dialog('close');
    });

    $("#divFotoGaleria").delegate(".imgFotoGalVideo", "click", function () {
        loadPlayer("divMediaSpace", isActiveStreaming, initParams['uriVideo'], $(this).attr('data-foto'), 220, 300, $(this).attr('data-time'));
        jwplayer().play();
    });
});

function parseGuion() {
    var parser;
    var body = "";
    var aese = "";
    var aux;
    var xmlDoc;
    var xmlDocBody;

    if (GuionOT != undefined) {
        /*Se eliminan los id's mal formados que no permiten leer correctamente el xml*/
        body = GuionOT.NotrGuio.substring(0, GuionOT.NotrGuio.indexOf('</body>') + 7);
        while (body.indexOf('<a idref=') > 0) {
            aux = body.substring(body.indexOf('<a idref='));
            aux = aux.substring(0, aux.indexOf('>') + 1);
            body = body.replace(aux, '');
        }
        aese = GuionOT.NotrGuio.substring(GuionOT.NotrGuio.indexOf('</body>') + 7, GuionOT.NotrGuio.length);
        while (aese.indexOf('id=') > 0) {
            aux = aese.substring(aese.indexOf('id='));
            aux = aux.substring(0, aux.indexOf('>'));
            aese = aese.replace(aux, '');
        }

        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDocBody = parser.parseFromString(body, "text/xml");
            xmlDoc = parser.parseFromString(aese, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDocBody = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDocBody.loadXML(body);
            xmlDoc.loadXML(aese);
        }

        /*Se generan los divs a insertar dentro del div de guines*/
        /*Parte derecha*/
        var guionContent = "<div class='divGuionGralDerecho'>";
        for (i = 0; i < xmlDoc.getElementsByTagName("ae").length; i++) {
            if (xmlDoc.getElementsByTagName("ae")[i].getElementsByTagName("mc").length == 0)
                guionContent += "<div class='divGuionDerecho'>";
            else
                guionContent += "<div class='divGuionDerechoColor'>";

            for (j = 0; j < xmlDoc.getElementsByTagName("ae")[i].getElementsByTagName("ap").length; j++)
                if (j > 0) {
                    try { guionContent += xmlDoc.getElementsByTagName("ae")[i].getElementsByTagName("ap")[j].childNodes[0].nodeValue + "<BR />"; } catch (exception) { };
                }
            guionContent += "</div>";
        }
        guionContent += "</div>";

        /*Parte izquierda*/
        guionContent += "<div class='divGuionGralIzquierdo'>";
        for (i = 0; i < xmlDocBody.getElementsByTagName("p").length; i++) {
            if (xmlDocBody.getElementsByTagName("p")[i].childNodes[0] != null && $.trim(xmlDocBody.getElementsByTagName("p")[i].childNodes[0].nodeValue) != '')
                guionContent += $.trim(xmlDocBody.getElementsByTagName("p")[i].childNodes[0].nodeValue) + "<BR />";
        }
        for (i = 0; i < xmlDocBody.getElementsByTagName("cc").length; i++) {
            if (xmlDocBody.getElementsByTagName("cc")[i].childNodes[0] != null && $.trim(xmlDocBody.getElementsByTagName("cc")[i].childNodes[0].nodeValue) != '')
                guionContent += $.trim(xmlDocBody.getElementsByTagName("cc")[i].childNodes[0].nodeValue) + "<BR />";
        }

        guionContent += "</div>";

        $("#divGuion").empty();
        $("#divGuion").append(guionContent);
        parent.resizeWindow(initParams["windowId"], 945);
    }
    else {
        parent.resizeWindow(initParams["windowId"], 760);
        $("#divVideoData").css("width", '57.5%');
        $("#divGuion").css('display', 'none');
    }
}

/*Valida la activacion y desactivacion de streaming*/
function setStreaming(theCheck) {
    if ($(theCheck).attr('data-isActive') == 0) {
        $(theCheck).attr('title', 'Desactivar Streaming');
        isActiveStreaming = true;
        $(theCheck).attr('data-isActive', 1);
        sessionStorage.isActiveStreaming = isActiveStreaming;
    }
    else if ($(theCheck).attr('data-isActive') == 1) {
        $(theCheck).attr('title', 'Activar Streaming');
        $(theCheck).attr('data-isActive', 0);
        isActiveStreaming = false;
        sessionStorage.isActiveStreaming = isActiveStreaming;
    }

    var image;
    var video;

    if (initParams['uriImg'] == undefined || initParams['uriImg'] == '') image = noVideoImagePath;
    else image = initParams['uriImg'];

    if (initParams['uriVideo'] == undefined || initParams['uriVideo'] == '') video = noVideoPath;
    else video = initParams['uriVideo'];

    loadPlayer("divMediaSpace", isActiveStreaming, video, image, 220, 300, 0);
    jwplayer("divMediaSpace").play();
}

function setFullScreen(){
    var image;
    var video;

    if (initParams['uriImg'] == undefined || initParams['uriImg'] == '') image = noVideoImagePath;
    else image = initParams['uriImg'];

    if (initParams['uriVideo'] == undefined || initParams['uriVideo'] == '') video = noVideoPath;
    else video = initParams['uriVideo'];

    if (jwplayer("divMediaSpace").getState() != "PAUSED")
        jwplayer("divMediaSpace").pause();

    parent.openFullScreen(video, image, isActiveStreaming, jwplayer("divMediaSpace").getPosition());
}

function recuperarGuion_click() {
    if (itemSelected != undefined && itemSelected != null && itemSelected.CvePrograma > 0) {
        $("#cmbReporterosRecG").val('selectedIndex', 0);
        $("#divReporterosRecG").dialog('open');
    }
    else
        alertModal('No se puede recuperar este gui&oacute;n.');
}

function saveRecuperacionG_click() {
    if ($('option:selected', '#cmbReporterosRecG').attr('data-val') <= 0) {
        alertModal('Debe especificar un reportero.');
        return false;
    }

    if ($.trim(itemSelected.IdFileName) != '' && itemSelected.CveAgencia == 473) {
        if (ListaGuionOT == undefined || ListaGuionOT == null || ListaGuionOT.length <= 0)
            guardariNews();
        else
            guardaGuioniNews();   
    }
    else{
        alertModal('No se encontraron guiones para ser recuperados');
        return false;
    }
}

function guardariNews() {
    executeSyncRequest(wsMtdGetRecupGuion, "{ 'otraLlavePr': " + itemSelected.OrdenTrabajo + ", 'esinLlavePr': " + itemSelected.CvePrograma + ", 'realFechaTrans': " + JSON.stringify(new Date()) + " }", successGetRecupGuion, Error);
}

function guardaGuioniNews() {
    var tmp = new CompraOT();

    tmp.CveOrdenTrabajo = new THE_OrdenTrabajo();
    tmp.CveOrdenTrabajo.CveOrdenTrabajo = ListaGuionOT[0].OtraLlPr;
    tmp.CveProgramaEmpleado = new TDI_ProgramaEmpleado();
    tmp.CveProgramaEmpleado.CvePrograma = new TDI_Programa();
    tmp.CveProgramaEmpleado.CvePrograma.CvePrograma = ListaGuionOT[0].EsinLlPr;
    tmp.CveSeccionFormato = new TDI_SeccionFormato();
    tmp.CveSeccionFormato.CveFormato = null;
    tmp.FechaCompra = new Date();

    var repo = new TDI_EMPL();
    repo.EmpleadoLlavePrimaria = $('option:selected', '#cmbReporterosRecG').attr('data-val');
    repo.EmpleadoNombre = $('option:selected', '#cmbReporterosRecG').text();

    //alert(JSON.stringify(tmp, null, 2));
    executeSyncRequest(wsMtdEnvINewsRecGuion, "{ 'ListaOTCompradas': " + JSON.stringify(tmp) + ", 'Reportero': " + JSON.stringify(repo) + ", 'Guion': '" + ListaGuionOT[0].NotrGuio + "', 'LogTransacciones': " + JSON.stringify(GenerateTransac()) + " }", successEnvINewsRecGuion, Error);
}

var successEnvINewsRecGuion = function (data, status) {
    $("#divReporterosRecG").dialog('close');
    alertModal('Se recuperaron correctamente los guiones y se mandaron a iNews');
}

var successGetRecupGuion = function (data, status) {
    
}

function getPlayListVideos(numOT, videoId) {
    executeRequest(wsMtdConsultaPlayListOT, "{ 'numOT': '" + numOT + "', 'VdoIdFilename': '" + videoId + "' }", successGetPlayListVideos, Error);
}

var successGetPlayListVideos = function (data, status) {
    var content = '';
    $.each(data.d, function (index, dataVid) {
        content += "<div class='divVidRelDataContainer'>";
        content += "<div class='divVidRelDataImg'>";
        content += "<img data-img='" + dataVid.Foto + "' data-vid='" + dataVid.IdVideo + "' data-not='" + dataVid.OT + "' data-npr='0' height='50' width='70' src='" + dataVid.Foto + "' onerror='errorImg(this);' onclick='loadFromPlaylist(this);' onMouseOver='this.style.cursor=\"pointer\"'/>";
        content += "</div>";
        content += "<div class='divVidRelData'>";
        content += "<div class='varFloatLeft'>OT: </div><div class='varFloatLeft'>" + dataVid.OTCvec + " </div><br/>";
        content += "<div class='varFloatLeft'>T&iacute;tulo: </div><div class='varFloatLeft'>" + dataVid.Titulo + " </div><br/>";
        content += "<div class='varFloatLeft'>Programa: </div><div class='varFloatLeft'>" + dataVid.NombrePrograma + " </div><br/>";
        content += "<div class='varFloatLeft'>Secci&oacute;n: </div><div class='varFloatLeft'>" + dataVid.Seccion + " </div>";
        content += "</div>";
        content += "</div>";
    });
    $("#divRelData").empty();
    $("#divRelData").append(content);
}

function showPlayListRel() {
    if ($("#btnVidRel").attr("data-opn") == 0) {
        $("#divVidRel").dialog('open');
        $("#btnVidRel").attr("data-opn", 1);
    }
    else{
        $("#divVidRel").dialog('close');
        $("#btnVidRel").attr("data-opn", 0);
    }
}

function loadFromPlaylist(control) {
    initParams['uriImg'] = $(control).attr('data-img');
    initParams['uriVideo'] = $(control).attr('data-vid');
    initParams['numOT'] = $(control).attr('data-not');
    initParams['numProg'] = $(control).attr('data-npr');
    isFromPlayList = true;
    $("#divVidRel").dialog('close');
    $("#btnVidRel").attr("data-opn", 0);
    initFunction();
}

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}
