
var recuperacionesBusq;
var markCounter = 0;
var contadorTabs = 0;
var isInRobot= false;
var lclDef = getLocalSeleccionar();
var WaitCountSaveDiva = 0;
var numCel;
var nameOfJob;
var initParams;
var EsDeportes;
var tipodeRecuperacion;

var isUserGrant = false;
var isRecuperaCompleto = false;
var isUserGrantAdquisi = false;
var isActiveStreaming = true;

function imgPreview_mouseOver(control) {
	$("#imgPreview").attr('src', $(control).attr('src'));

    var position;
    try{
	    position = findPosition(control);//$(control).position();
        $("#divPreview").dialog("option", "position", [position[0] + 45, position[1] + 25]);
    }
    catch(ex){
        position = $(control).position();
        $("#divPreview").dialog("option", "position", [position.left + 45, position.top + 25]);
    }
	$("#divPreview").dialog('open');
}

function findPosition(oElement)
{
    var PosX;
    var PosY;

    if (!e) var e = window.event;
    if (e.pageX || e.pageY)
    {
       PosX = e.pageX;
       PosY = e.pageY;
    }
    else if (e.clientX || e.clientY)
    {
      PosX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      PosY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return [ oElement.x, oElement.y ];
}

function imgPreview_mouseOut(control) {
	$("#divPreview").dialog('close');
}

$(function () {
	$("#divCapCel").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", modal: true });
	$("#divPreview").dialog({ resizable: false, autoOpen: false, width: 'auto', heigth: 'auto' });
	$('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divPreview').parent()).remove();
	$("#divPreview").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
	$("#divDialogRestore").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", modal: true, width: '600', heigth: '250' });
    $("#divPreviewFG").dialog({ resizable: false, autoOpen: false, width: 'auto', height: 'auto', modal: false });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divPreviewFG').parent()).remove();
    $("#divPreviewFG").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
});

$(function () {
	initialize();
});

function initialize() {
    $("#btnRecuperaCompleto").attr('disabled', 'disabled');
    $("#btnRestaurar").attr('disabled', 'disabled');
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

	loadPlayer("mediaspace", false, noVideoPath, noVideoImagePath, 280, 320, 0);
	isUserGrantAdquisi = sessionStorage.UserSeccion == 112;
	executeSyncRequest(wsMtdGetPrivRec, "{ empl_llav_pr:'" + sessionStorage.numUsuario + "'}", function (data, status) { isUserGrant = data.d; }, myError);
	if(isUserGrant || isUserGrantAdquisi)
		$("#btnRecuperaCompleto").show();
	else
		$("#btnRecuperaCompleto").hide();

	/*Se obtiene parametros de URL*/
	initParams = getUrlVars();
	numCel = $.trim(sessionStorage.userCelular);
	cargaTiposRec();
	getProgEmplFiltro();
	getComboEdicion();
	cargaLocales();
}

$(function () {
	$("#divRecuperacion").dialog({
		resizable: false,
		autoOpen: false,
		show: "blind",
		hide: "blind",
		width: '550',
		height: '300'
	});
	$("#divRecuperacionBusq").dialog({
		resizable: false,
		autoOpen: false,
		show: "blind",
		hide: "blind",
		width: '550',
		height: '300'
	});
    $("#divGuardaBusqueda").dialog({
		resizable: false,
		autoOpen: false,
		show: "blind",
		hide: "blind"
	});
	$("#divSaveMarks").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind" });
});

$(function () {
	var $tabs = $("#divVideoData").tabs({
		tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Cerrar</span></li>",
	});

	$("#divVideoData").on("click", 'span.ui-icon-close', function () {
		var index = $("li", $tabs).index($(this).parent());
		$tabs.tabs("remove", index);
	});

	$("#lnkDivFecha").append(new Date().esMXFormat());

	var dates = $("#dtIniRecuperacion, #dtFinRecuperacion").datepicker({
		changeMonth: true,
		numberOfMonths: 1,
		onSelect: function (selectedDate) {
			var option = this.id == "dtIniRecuperacion" ? "minDate" : "maxDate",
						instance = $(this).data("datepicker"),
						date = $.datepicker.parseDate(
							instance.settings.dateFormat ||
							$.datepicker._defaults.dateFormat,
							selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
			executeRequestRecuperacion();
		}
	});

	var dates = $("#dtFechaBusqIni, #dtFechaBusqFin").datepicker({
		changeMonth: true,
		numberOfMonths: 1,
		onSelect: function (selectedDate) {
			var option = this.id == "dtFechaBusqIni" ? "minDate" : "maxDate",
						instance = $(this).data("datepicker"),
						date = $.datepicker.parseDate(
							instance.settings.dateFormat ||
							$.datepicker._defaults.dateFormat,
							selectedDate, instance.settings);
			dates.not(this).datepicker("option", option, date);
			executeRequestRecuperacionBusq();
		}
	});

	var fechaInicioSemana = getFisrtDateOfWeek(new Date());
	var fechaFinSemana = getFisrtDateOfWeek(new Date());
	fechaFinSemana.setDate(fechaFinSemana.getDate() + 6);
	$('#dtIniRecuperacion').datepicker("setDate", fechaInicioSemana);
	$('#dtFinRecuperacion').datepicker("setDate", fechaFinSemana);

	var fechaActual = new Date();
	var fechaAnterior = new Date();
	fechaAnterior.setMonth(fechaActual.getMonth() - 1);
	$('#dtFechaBusqFin').datepicker("setDate", fechaActual);
	$('#dtFechaBusqIni').datepicker("setDate", fechaAnterior);
});

$("#divRecuperacion").find("#txtFiltroRec").live("keypress", function (e) {
	if (e.keyCode == 13)
		executeRequestRecuperacion();
});

$("#divRecuperacionBusq").find("#txtTextoBusq").live("keypress", function (e) {
	if (e.keyCode == 13)
		executeRequestRecuperacionBusq();
});

$(".divVidContainer").live("click", function (e) {
	/*Valida si el video existe en el robot*/
    var vdoId = $(this).attr('data-file').substring($(this).attr('data-file').lastIndexOf('/') + 1, $(this).attr('data-file').lastIndexOf('.'));
    if(vdoId.lastIndexOf('\\') > 0)
        vdoId = vdoId.substring(vdoId.lastIndexOf('\\') + 1, vdoId.length);
	existInRobot(vdoId);
	if (isInRobot == true) {
		$("#MainContent_divMarcas").attr('data-file', $(this).attr('data-file'));
		$("#MainContent_divMarcas").attr('data-img', $(this).attr('data-img'));
		$("#MainContent_divMarcas").attr('data-matType', $(this).attr('data-matType'));
		$("#MainContent_divMarcas").attr('data-matOrig', $(this).attr('data-matOrig'));
		$("#MainContent_divMarcas").attr('data-fileId', $(this).attr('data-fileId'));
        try{ getTimeCodes($(this).attr('data-detFile'), $(this).attr('data-FileN'), $(this).attr('data-fileId')); }catch(e){}
        isActiveStreaming = true;
        $("#divBotonera2").removeAttr('disabled');
        $("#btnRecuperaCompleto").removeAttr('disabled');
        $("#btnRestaurar").removeAttr('disabled');
		loadPlayer("mediaspace", isActiveStreaming, $(this).attr('data-file'), $(this).attr('data-img'), 280, 320, 0);
		jwplayer("mediaspace").play();
	}
	else
		alertModal('El video no existe en el robot.');
});

function existInRobot(videoFileName) {
	executeSyncRequest(wsMtdExisteEnRbt, "{ 'VdoIdFilename':'" + videoFileName + "' }", function (data, status) { isInRobot = data.d; }, myError);
}

$(document).ready(function () {
	$(".tooltips").hover(
				function () { $(this).contents("span:last-child").css({ display: "block" }); },
				function () { $(this).contents("span:last-child").css({ display: "none" }); }
			);
});

/*Borra todas las marcas de entrada y salida que se han generado*/
function btnBorrarTodos_click() {
    $("#btnMarkIn").removeAttr('disabled');
	if ($("#MainContent_divMarcas div.markContainer").length == 0) {
		alertModal('No existen marcas para poder ser procesadas');
		return false;
	}

	jwplayer("mediaspace").stop();
	$("#MainContent_divMarcas").empty();
	$("#lblTotalTime").empty();
	$("#lblTotalTime").attr('data-ttime', 0)
	$("#lblTotalTime").append('00:00:00');
	return false;
}

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
			allowfullscreen: false,
			repeat: 'list',
			file: getUrlFormatoStreaming(file),
			image: image,
			start: startpoint,
            controlbar: 'none',
			streamer: streaming
		});
	}
	else {
		jwplayer(controlName).setup({
			flashplayer: playerPath,
			height: theHeight,
			width: theWidth,
			allowscriptaccess: 'always',
			allowfullscreen: false,
			repeat: 'list',
			file: file,
			image: image,
            controlbar: 'none',
			start: startpoint
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
            if(isActiveStreaming == true)
            {
                if (streaming != streamerPath2)
                    loadPlayer("mediaspace", isActiveStreaming, $("#MainContent_divMarcas").attr('data-file'), $("#MainContent_divMarcas").attr('data-img'), 280, 320, 0, true);
                else {
                    isActiveStreaming = false;
                    loadPlayer("mediaspace", isActiveStreaming, $("#MainContent_divMarcas").attr('data-file'), $("#MainContent_divMarcas").attr('data-img'), 280, 320, 0);
                }
            }
            else
                alertModal("Ocurrio un problema al cargar el video, favor de comunicarse con su administrador.");
        }
    );

    //jwplayer(thePlayerName).addModelListener('ERROR', 'errorMonitor'));

	$("#MainContent_divMarcas").attr('data-file', file);
	$("#MainContent_divMarcas").attr('data-img', image);
    $("#mediaspace_wrapper").css('float', 'left');
}

function loadMark(controlName, file, image, startpoint) {
	jwplayer(controlName).setup({
		flashplayer: playerPath,
		height: 60,
		width: 75,
		allowscriptaccess: 'always',
		allowfullscreen: false,
		repeat: 'list',
		file: getUrlFormatoStreaming(file),
		image: noVideoImagePath,
		start: startpoint,
		streamer: streamerPath,
		"controlbar.idlehide": true,
		icons: false,
		duration: 1
	});

	jwplayer(controlName).onPlay(function() { jwplayer(controlName).pause(); });
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

	loadPlayer("mediaspace", isActiveStreaming, $("#MainContent_divMarcas").attr('data-file'), $("#MainContent_divMarcas").attr('data-img'), 280, 320, 0);
	jwplayer("mediaspace").play();
	$("#btnActPlayLst").empty();
	$("#btnActPlayLst").append("<div class='btnPlaylist3'/>");
	$("#btnActPlayLst").attr('data-Pact', 0);
	$("#btnActPlayLst").attr('title', 'Activar PlayList');
}

/*Genera las marcas de entrada y salida*/
function createMark_click(markType, endUpdate) {
	var generateMark = true;
	var position = Math.floor(jwplayer("mediaspace").getPosition());
	if (markType == 'IN') 
	{
		if ($("#MainContent_divMarcas div.markContainer[data-edit=1]").length > 0) {
			var theContainer = $("#MainContent_divMarcas div.markContainer[data-edit=1]")[0];
			$(theContainer).attr('data-timeIn', position);
			$($(theContainer).find('.markTimeIn')[0]).empty();
			$($(theContainer).find('.markTimeIn')[0]).text(numberToTimeFormat(new Number($(theContainer).attr('data-timeIn'))));
		}
		else{
			/*Se valida si ya existe alguna entrada sin su correspondiente salida dentro del contenedor*/
			$.each($("#MainContent_divMarcas div.markContainer"), function (index, contenedor) {
				if ($(contenedor).attr('data-type') == 'IN') {
					alertModal('Es necesario generar una marca de salida para la marca de entrada actual');
					generateMark = false;
				}
			});

			/*Si no existen entradas pendientes se agrega la nueva entrada a la lista*/
			if (generateMark) {
				appendMark('IN');
                $("#btnMarkIn").attr('disabled', 'disabled');
			}
		}
	}
	else if (markType == 'OUT') {
		if ($("#MainContent_divMarcas div.markContainer[data-edit=1]").length > 0) {
			var theContainer = $("#MainContent_divMarcas div.markContainer[data-edit=1]")[0];
			/*Se valida que el tiempo de salida no sea menor al de entrada*/
			if (endUpdate == true)
				position = $(theContainer).attr('data-timeOut');
			if (new Number($(theContainer).attr('data-timeIn')) >= new Number(position)) {
				alert('La marca final no puede ser igual o menor a la marca inicial');
				return false;
			}

			if (endUpdate == false || endUpdate == undefined) {
				$(theContainer).attr('data-timeOut', position);
				$($(theContainer).find('.markTimeOut')[0]).empty();
				$($(theContainer).find('.markTimeOut')[0]).text(numberToTimeFormat(new Number($(theContainer).attr('data-timeOut'))));
			}
			/*Se actualiza el tiempo total*/
			var suma = 0;
			$("#lblTotalTime").empty();
			$.each($("#MainContent_divMarcas div.markContainer"), function (index, item) {
				suma = suma + (new Number($(item).attr('data-timeOut')) - new Number($(item).attr('data-timeIn')));
			});
			$($(theContainer).find('label')[2]).empty();
			$($(theContainer).find('label')[2]).text(numberToTimeFormat(new Number($(theContainer).attr('data-timeOut')) - new Number($(theContainer).attr('data-timeIn'))));
			$("#lblTotalTime").attr('data-ttime', suma);
			$("#lblTotalTime").append(numberToTimeFormat(new Number($("#lblTotalTime").attr('data-ttime'))));
			$(theContainer).attr('data-edit', 0);
			$($(theContainer).find('.btnEditandoAlone')[0]).attr("title", "Click para editar Marca");
			$($(theContainer).find('.btnEditandoAlone')[0]).attr("class", "btnEditarAlone");
		}
		else {
			/*Se valida si ya existe una marca de entrada*/
			if ($("#MainContent_divMarcas div.markContainer").length == 0 ||
						$($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-type') != 'IN') {
				alertModal('Es necesario generar primero una marca de entrada');
				return false;
			}
			else if ($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeIn') >= Math.floor(jwplayer("mediaspace").getPosition())) {
				alertModal('La marca final no puede ser igual o menor a la marca inicial');
				return false;
			}

			/*Si existe la marca de entrada se genera la marca de salida*/
			if (generateMark){
				appendMark('INOUT');
                $("#btnMarkIn").removeAttr('disabled');
            }
		}
	}

	/*Agrega las marcas dentro del contenedor*/
	function appendMark(markType) {
		var contenido = '';
		var position = Math.floor(jwplayer("mediaspace").getPosition());
		if (markType == 'IN') {
			contenido += "<div title='Click para reproducir' class='markContainer' data-matOrig='0' data-matType='" + $("#MainContent_divMarcas").attr('data-matType') + "' data-edit='0' data-file='" + $("#MainContent_divMarcas").attr('data-file') + "' data-type='" + markType + "' data-timeIn='" + position + "' data-timeOut='-1'>"; //Contenedor de par entrada salida
			contenido += "<div>"; 
			//Contenedor de la marca de entrada
			contenido += "<div class='contMarcaEntrada'><div id='inMark_" + markCounter + "'></div><div class='contMarcaEntrada' style='position:relative; top:-60px;left:-5px;;' title='Marca de entrada'></div></div>"; //imagen
			contenido += "<label class='markTimeIn'>" + numberToTimeFormat(position) + "</label>"; //tiempo de marca
			contenido += "</div>";
			contenido += "</div>";

			$("#MainContent_divMarcas").append(contenido);
			loadMark("inMark_" + markCounter, $("#MainContent_divMarcas").attr('data-file'), $("#MainContent_divMarcas").attr('data-img'), new Number(position) * 1);
			jwplayer("inMark_" + markCounter).play();
			markCounter++;
		}
		if (markType == 'INOUT') {
			$($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-type', markType);
			$($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeOut', position);

			contenido += "<div>"; //Contenedor de la marca de salida
			contenido += "<div class='contMarcaSalida'><div id='outMark_" + markCounter + "'></div><div class='contMarcaEntrada' style='position:relative; top:-60px;left:-5px;;' title='Marca de entrada' title='Marca de salida'></div></div>"; //imagen
			contenido += "<label class='markTimeOut'>" + numberToTimeFormat(position) + "</label>"; //tiempo de marca
			contenido += "</div>";

			/*Se agregan los controles para eliminar y editar la marca*/
			contenido += "<div class='divmarkContainerButtons'>";
			contenido += "<div><label class='markTimeTotal'>"; //Label de tiempo de marca
			contenido += numberToTimeFormat(new Number($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeOut')) - new Number($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeIn')));
			contenido += "</label>";
			contenido += "<button type='button' onclick='deleteSingleMark(this);' class='btnEliminarAlone' title='Click para eliminar marca'></button>";
			contenido += "<button type='button' onclick='editMark(this);' class='btnEditarAlone' title='Click para editar marca'></button>";
			contenido += "</div>";

			$($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).append(contenido);

			/*Se agrega el evento del contenedor del par marca entrada-salida para que al dar click se reproduzca sobre el player*/
			$($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).live('click', function () {
				if ($("#MainContent_divMarcas div.markContainer[data-edit=1]").length > 0) 
					return false;
				playMark(this);
			});

			/*Se actualiza el tiempo total dentro de la etiqueta de tiempo total*/
			var tiempoIn = new Number($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeIn'));
			var tiempoOut = new Number($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeOut'));

			$("#lblTotalTime").empty();
			$("#lblTotalTime").attr('data-ttime', (new Number($("#lblTotalTime").attr('data-ttime')) + tiempoOut - tiempoIn))
			$("#lblTotalTime").append(numberToTimeFormat(new Number($("#lblTotalTime").attr('data-ttime'))));

			loadMark("outMark_" + markCounter, $("#MainContent_divMarcas").attr('data-file'), $("#MainContent_divMarcas").attr('data-img'), new Number(position) * 1);
			jwplayer("outMark_" + markCounter).play();
			markCounter++;
		}
	}
}

/*Se edita el par de marcas entrada/salida*/
function editMark(contenedor) {
	var position = Math.floor(jwplayer("mediaspace").getPosition());
	var theContainer = $(contenedor).parent().parent().parent();
	if (new Number($(theContainer).attr('data-edit')) == 0) {
		$(theContainer).attr('data-edit', 1);
		$(contenedor).attr("class", "btnEditandoAlone");
		$(contenedor).attr("title", "Finalizar Edicion");
        isActiveStreaming = true;
		loadPlayer("mediaspace", isActiveStreaming, $(theContainer).attr('data-file'), $(theContainer).attr('data-img'), 280, 320, $(theContainer).attr('data-timeIn'));
		jwplayer("mediaspace").play();
	}
	else 
		createMark_click('OUT', true);
	return false;
}

/*Borra la marca especificada*/
function deleteSingleMark(contenedor) {
	var theContainer = $(contenedor).parent().parent().parent();
	var tiempoIn = new Number($(theContainer).attr('data-timeIn'));
	var tiempoOut = new Number($(theContainer).attr('data-timeOut'));

	$("#lblTotalTime").empty();
	$("#lblTotalTime").attr('data-ttime', (new Number($("#lblTotalTime").attr('data-ttime')) - (tiempoOut - tiempoIn)))
	$("#lblTotalTime").append(numberToTimeFormat(new Number($("#lblTotalTime").attr('data-ttime'))));

	$(theContainer).remove();

	/*Si ya no hay marcas se recarga el video y se vuelve a estado inicial boton de activar playlist*/
	if ($("#MainContent_divMarcas div.markContainer").length == 0 && $("#btnActPlayLst").attr('data-Pact') == 1) {
		jwplayer("mediaspace").load({ file: $("#MainContent_divMarcas").attr('data-file'), streamer: streamerPath });
		$("#btnActPlayLst").attr('data-Pact', 0);
		$("#btnActPlayLst").attr('title', 'Activar PlayList');
		$("#btnActPlayLst").empty();
		$("#btnActPlayLst").append("<div class='btnPlaylist3'/>");
	}
}

/*Se agrega el video dentro del player para su reproduccion*/
function playMark(contenedor) {
	if(isActiveStreaming)
		jwplayer("mediaspace").load({ file: getUrlFormatoStreaming($("#MainContent_divMarcas").attr('data-file')), streamer: streamerPath, start: $(contenedor).attr('data-timeIn'), duration: $(contenedor).attr('data-timeOut') });
	else
		jwplayer("mediaspace").load({ file: $("#MainContent_divMarcas").attr('data-file'), start: $(contenedor).attr('data-timeIn'), duration: $(contenedor).attr('data-timeOut') });
	jwplayer("mediaspace").play();
}

/*Asigna el playList de las marcas generadas y las reproduce dentro del player*/
function setPlayList() {
	if ($("#MainContent_divMarcas div.markContainer").length == 0) {
		alertModal('No existen videos para ser reproducidos.');
		return false;
	}

	if ($("#btnActPlayLst").attr('data-Pact') == 0) {
		var thePlayList = new Array();
		$("#btnActPlayLst").empty();
		$("#btnActPlayLst").append("<div class='btnPlaylist2'/>");
		/*Se genera el playList de la aplicacion*/
		/*Se recorren cada uno de los contenedores de marcas para generar el playlist a cargar dentro del player*/
		$.each($("#MainContent_divMarcas div.markContainer"), function (index, contenedor) {
			if(isActiveStreaming)
				thePlayList.push({ file: getUrlFormatoStreaming($(contenedor).attr('data-file')), streamer: streamerPath, start: $(contenedor).attr('data-timeIn'), duration: $(contenedor).attr('data-timeOut') });
			else
				thePlayList.push({ file: $(contenedor).attr('data-file'), start: $(contenedor).attr('data-timeIn'), duration: $(contenedor).attr('data-timeOut') });
		});

		jwplayer("mediaspace").stop();
		jwplayer("mediaspace").load(thePlayList);
		jwplayer("mediaspace").play();
		$("#btnActPlayLst").attr('data-Pact', 1);
		$("#btnActPlayLst").attr('title', 'Desactivar Playlist');
	}
	else if ($("#btnActPlayLst").attr('data-Pact') == 1) {
		$("#btnActPlayLst").empty();
		$("#btnActPlayLst").append("<div class='btnPlaylist3'/>");
		if(isActiveStreaming)
			jwplayer("mediaspace").load({ file: getUrlFormatoStreaming($("#MainContent_divMarcas").attr('data-file')), streamer: streamerPath });
		else
			jwplayer("mediaspace").load({ file: $("#MainContent_divMarcas").attr('data-file') });
		$("#btnActPlayLst").attr('data-Pact', 0);
		$("#btnActPlayLst").attr('title', 'Activar PlayList');
	}

	return false;
}

/*Valida que las marcas no se encuentren en edicion*/
function validateMarks() {
	if ($("#MainContent_divMarcas div.markContainer").length <= 0) {
		alertModal('No existe ninguna marca para poder ser procesada');
		return false;
	}

	if ($("#MainContent_divMarcas div.markContainer[data-edit=1]").length > 0) {
		alertModal('No se puede realizar la acción si se encuentra editando alguna marca');
		return false;
	}

	if ($("#MainContent_divMarcas div.markContainer[data-type=IN]").length > 0) {
		alertModal('Necesita realilzar un Mark Out para poder procesar los datos');
		return false;
	}

	if (new Number($("#lblTotalTime").attr('data-ttime')) > 600) {
		alertModal('Las marcas no pueden superar 10 minutos');
		return false;
	}

	return true;
}

function openDialogRecuperaciones() {
	try {
		$("#divRecResult").empty();
		$("#divRecuperacion").dialog("open");
		this.executeRequestRecuperacion();
	}
	catch (ex) {
		alertModal('Ocurrio un problema al recuperar las marcas: ' + ex.Message);
	 }
}

function openDialogRecuperacionesBusquedas() {
	try {
		$("#divBusqResult").empty();
		$("#divRecuperacionBusq").dialog("open");
		this.executeRequestRecuperacionBusq();
	}
	catch (ex) {
		alertModal('Ocurrio un problema al recuperar las b&uacute;squedas: ' + ex.Message);
	 }
}

function executeRequestRecuperacionBusq() {
	PageMethods.getRecuperacionesBusqueda(sessionStorage.userName, $("#dtFechaBusqIni").datepicker("getDate"), $("#dtFechaBusqFin").datepicker("getDate"), $("#txtTextoBusq").val(), onRecuperacionesBusqComplete, Error);
}

function onRecuperacionesBusqComplete(result, userContext, methodName) {
	var content = '';
	$("#divBusqResult").empty();
    recuperacionesBusq = new Array();

	$.each(result, function (index, value) {
        recuperacionesBusq[value.IdBusqueda] = value;
		content += "<div><button type='button' class='btnEliminarMarcas' title='Eliminar búsqueda' onclick='deleteRecuperacionBusq(this); return false;' data-name='" + value.Nombre + "' data-cveBusq='" + value.IdBusqueda + "'></button></div>";
		content += "<div><button type='button' class='btnRecuperarMarcas' title='Recuperar búsqueda' onclick='loadRecuperacionBusq(this); return false;' data-cveBusq='" + value.IdBusqueda + "'></button></div>";
		content += "<div class='divContentRecuperacionB'>" + value.Nombre + "</div>";
		content += "<div class='divContentRecuperacionB'>" + $.datepicker.formatDate('dd/mm/yy', value.Fecha) + "</div>";
		content += "</div>";
	});

	$("#divBusqResult").html(content);
}

function executeRequestRecuperacion() {
	PageMethods.getRecuperaciones(sessionStorage.numUsuario, $("#dtIniRecuperacion").datepicker("getDate"), $("#dtFinRecuperacion").datepicker("getDate"), $("#txtFiltroRec").val(), onRecuperacionesComplete, Error);
}

/*Metodo que se ejecuta en caso de ser correcta la respuesta de recopueracion de videos*/
function onRecuperacionesComplete(result, userContext, methodName) {
	var content = '';
	$("#divRecResult").empty();

	$.each(result, function (index, value) {
		content += "<div class='divCveVidRec' data-cveVidRec='" + value.CveVideoRecuperacion + "'>";
		content += "<div><button type='button' class='btnEliminarMarcas' data-cveVidRec='" + value.CveVideoRecuperacion + "' onclick='deleteRecuperacion(this); return false;'></button></div>";
		content += "<div><button type='button' class='btnRecuperarMarcas' data-cveVidRec='" + value.CveVideoRecuperacion + "' onclick='loadRecuperacion(this); return false;'></button></div>";
		content += "<div class='divContentRecuperacionB'>" + value.NombreVideoRecuperacion + "</div>";
		content += "<div class='divContentRecuperacionB'>" + $.datepicker.formatDate('dd/mm/yy', value.FechaVideoRecuperacion) + "</div>";
		content += "</div>";
	});

	$("#divRecResult").html(content);
}

/*Metodo de error en recuperaciones*/
function OnRequestError(error, userContext, methodName) {
	if (error != null) 
		alertModal(error.get_message());
}

function deleteRecuperacion(componente) {

	var respuesta = confirm("¿Realmente desea eliminar la recuperación?")
	if (respuesta) {
		executeRequest(wsMtdElimVidRec, "{ 'oVideoRecuperacion':{'CveVideoRecuperacion':" + $(componente).attr('data-cveVidRec') + "} }", function (data, status) { }, myError);
		this.executeRequestRecuperacion();
	}
}

function deleteRecuperacionBusq(componente) {

	var respuesta = confirm("¿Realmente desea eliminar la búsqueda: " + $(componente).attr('data-name') + "?")
	if (respuesta) {
		executeSyncRequest(wsMtdDeleteSearch, "{ 'oBusquedaToDelete':{'IdBusqueda':" + $(componente).attr('data-cveBusq') + "} }", function (data, status) {  }, myError);
		this.executeRequestRecuperacionBusq();
	}
}

function myError(request, status, error) {
	alertModal('Ocurrio un problema al ejecutar la solicitud: ' + status.statusText);
}

function loadRecuperacion(componente) {
	PageMethods.getVideoRecuperacionArchivos($(componente).attr('data-cveVidRec'), getVideoRecuperacionArchivosComplete, myError);
	$("#divRecuperacion").dialog('close');
}

function loadRecuperacionBusq(componente) {
    var respuesta = false;
	/*Si se encuentran abiertos tabs aparte del tab de acoplados*/
	if($('#divVideoData > ul > li').tabs().size() > 1)
		respuesta = confirm("Existen búsquedas con información que no ha sido guardada.\nPara Sobrescribir, Presione [OK]\nPara Agregar a la ya existente, Presione [Cancelar] ");
	
    creaTabBusqueda(componente, respuesta);
}

function getVideoRecuperacionArchivosComplete(result, userContext, myError){
	var recuperacion = result.pop();
	var recuperacionArchivos = result.pop();

	if(recuperacion.length > 0)
	{
		if ($("#MainContent_divMarcas div.markContainer").length > 0) {
			var respuesta = confirm("Existen elementos seleccionados. \nPara Sobreescribir; presione [OK]. \nPara agregar los datos; Presione [Cancelar].")
			cargaMarcasFromDetalle(recuperacionArchivos, recuperacion, respuesta);
		}
		else
			cargaMarcasFromDetalle(recuperacionArchivos, recuperacion, true);
	}
}

function cargaMarcasFromDetalle(contenido, recuperaciones, isReplace){
	var contenidoItem;
	if(isReplace){
		$("#MainContent_divMarcas").empty();
        $("#btnMarkIn").removeAttr('disabled');
    }
    else if ($("#MainContent_divMarcas div.markContainer[data-type='IN']").length > 0){
        alertModal('No se puede realizar la acción si se encuentra editando alguna marca');
		return false;
    }

	$.each(contenido, function (index, value) {
		$.each(recuperaciones, function (index2, value2) {

			if(value.IdNombreArchivo == value2.NombreVideoRecuperacion){
				contenidoItem = "";

				contenidoItem += "<div title='Click para reproducir' class='markContainer' data-matOrig='" + /*recuperaciones[index]*/value2.FlagSystem + "' data-matType='" + /*recuperaciones[index]*/value2.TipoMaterial + "' data-edit='0' data-file='" + value.RutaVideo + "' data-type='INOUT' data-timeIn='" + timeFormatToNumber(value.TiempoInicial) + "' data-timeOut='" + timeFormatToNumber(value.TiempoFinal) + "'>"; //Contenedor de par entrada salida

				//Contenedor de la marca de entrada
				contenidoItem += "<div>";
				contenidoItem += "<div class='contMarcaEntrada'><div id='inMark_" + markCounter + "'></div><div class='contMarcaEntrada' style='position:relative; top:-60px;left:-5px;;' title='Marca de entrada'></div></div>"; //imagen
				contenidoItem += "<label class='markTimeIn'>" + value.TiempoInicial + "</label>"; //tiempo de marca
				contenidoItem += "</div>";

				//Contenedor de la marca de salida
				contenidoItem += "<div>";
				contenidoItem += "<div class='contMarcaSalida'><div id='outMark_" + markCounter + "'></div><div class='contMarcaEntrada' style='position:relative; top:-60px;left:-5px;;' title='Marca de salida'></div></div>"; //imagen
				contenidoItem += "<label class='markTimeOut'>" + value.TiempoFinal + "</label>"; //tiempo de marca
				contenidoItem += "</div>";

				/*Teimpo total de marca y botones de eliminar y editar*/
				contenidoItem += "<div>";
				contenidoItem += "<div><label>"; //Label de tiempo de marca
				contenidoItem += numberToTimeFormat(timeFormatToNumber(value.TiempoFinal) - timeFormatToNumber(value.TiempoInicial));
				contenidoItem += "</label>";
				contenidoItem += "<button type='button' onclick='deleteSingleMark(this);' class='btnEliminarAlone' title='Click para eliminar marca'></button>";
				contenidoItem += "<button type='button' onclick='editMark(this);' class='btnEditarAlone' title='Click para editar marca'></button>";
				contenidoItem += "</div>";

				contenidoItem += "</div>";

				$("#MainContent_divMarcas").append(contenidoItem);

				/*Se actualiza el tiempo total dentro de la etiqueta de tiempo total*/
				var tiempoIn = new Number($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeIn'));
				var tiempoOut = new Number($($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).attr('data-timeOut'));

				/*Se agrega el evento del contenedor del par marca entrada-salida para que al dar click se reproduzca sobre el player*/
				$($("#MainContent_divMarcas div.markContainer")[$("#MainContent_divMarcas div.markContainer").length - 1]).live('click', function () {
					if ($("#MainContent_divMarcas div.markContainer[data-edit=1]").length > 0)
						return false;
					$("#MainContent_divMarcas").attr('data-file', $(this).attr('data-file'));
					playMark(this);
				});

				loadMark("inMark_" + markCounter, value.RutaVideo, noVideoImagePath, new Number(timeFormatToNumber(value.TiempoInicial))*1);
				jwplayer("inMark_" + markCounter).play();

				loadMark("outMark_" + markCounter, value.RutaVideo, noVideoImagePath, new Number(timeFormatToNumber(value.TiempoFinal))*1);
				jwplayer("outMark_" + markCounter).play();
				markCounter++;

				$("#lblTotalTime").empty();
				$("#lblTotalTime").attr('data-ttime', (new Number($("#lblTotalTime").attr('data-ttime')) + tiempoOut - tiempoIn))
				$("#lblTotalTime").append(numberToTimeFormat(new Number($("#lblTotalTime").attr('data-ttime'))));
			}
		});
	});
}

function saveMarks() {
	if (validateMarks()) {
		$("#txtSaveMark").val('');
		$("#divSaveMarks").dialog("open");
	}
}

function saveMarksOK() {
	if ($("#txtSaveMark").val() == '' || $("#txtSaveMark").val() == undefined) {
		alertModal('Por favor escriba un nombre valido para guardar las marcas maximo 20 caracteres');
		return false;
	}

	/*************************************Creacion de objetos para guardar marcas *****************************/
	/*Se genera el objeto empleado*/
	var oEmpl = new TDI_EMPL();
	oEmpl.EmpleadoUsr = sessionStorage.nomUsuario;
	oEmpl.EmpleadoLlavePrimaria = sessionStorage.numUsuario;

	/*Se genera el objeto de viodeorecuperacion*/
	var oVideoRecuperacion = new VideoRecuperacion();
	oVideoRecuperacion.CveEmpleado = oEmpl;
	oVideoRecuperacion.NombreVideoRecuperacion = $("#txtSaveMark").val();
	oVideoRecuperacion.TiempoTotal = $("#lblTotalTime").text();

	/*Se generan los archivos de videorecuperacion*/
	var idVideo;
	var oVideoRecuperacionArchivo;
	var lstVideoRecuperacionArchivo = new Array();
	$.each($("#MainContent_divMarcas div.markContainer"), function (index, contenedor) {
		oVideoRecuperacionArchivo = new VideoRecuperacionArchivo();
		idVideo = $(contenedor).attr('data-file').split('/');

		oVideoRecuperacionArchivo.IdNombreArchivo = idVideo[idVideo.length - 1].split('.')[0].replace('mp4:', '');
		oVideoRecuperacionArchivo.TiempoInicial = $($(contenedor).find('label')[0]).text();
		oVideoRecuperacionArchivo.TiempoFinal = $($(contenedor).find('label')[1]).text();
		lstVideoRecuperacionArchivo.push(oVideoRecuperacionArchivo);
	});

	/*Se genera la transaccion*/
	var transaccion = GenerateTransac();

	PageMethods.saveMarks(oVideoRecuperacion, lstVideoRecuperacionArchivo, transaccion, successSaveMarks, myError);
	$("#divSaveMarks").dialog('close');
}

function saveMarksCancel() {
	$("#divSaveMarks").dialog('close');
}

function successSaveMarks(result, userContext, methodName) {
	if (result.CveVideoRecuperacion > 0)
		alertModal('Se guardaron correctamente las Marcas');
	else
		alertModal('No se pudieron guardar las Marcas');
}

function btnRestaurarMrk_click() {
	if (PermisosGridZoomRecuperacion() == false) {
		alertModal('No cuenta con los permisos para realizar esta operación.');
		return false;
	}

	EsDeportes = false;
    if(!isRecuperaCompleto)
        if ($("#MainContent_divMarcas div.markContainer").length == 0) {
		    alertModal('No existe ninguna marca para poder ser procesada');
		    return false;
	    }

	if ($("#MainContent_divMarcas div.markContainer[data-edit=1]").length > 0) {
		alertModal('No se puede realizar la acción si se encuentra editando alguna marca');
		return false;
	}

	if ($("#MainContent_divMarcas div.markContainer[data-type=IN]").length > 0) {
		alertModal('Necesita realilzar un Mark Out para poder procesar los datos');
		return false;
	}

	if (!isUserGrant) 
		if (new Number($("#lblTotalTime").attr('data-ttime')) > 600) {
			alertModal('Las marcas no pueden superar 10 minutos');
			return false;
		}

		$.each($("#MainContent_divMarcas div.markContainer"), function (index, contenedor) {
			if ($(contenedor).attr('data-matOrig') == 2 || $(contenedor).attr('data-matType') == 2) 
				EsDeportes = true;
		});

		if (EsDeportes) /*Tipo de recuperacion deportes*/
			tipodeRecuperacion = 1;
		else { /*Tipo de recuperacion normal*/
			isRecuperaCompleto = false;
			tipodeRecuperacion = 2;
		}

		if (tipodeRecuperacion == 0)
			$("#txtLeyenda").show();
		else
			$("#txtLeyenda").hide();

		openDialogRestore();
}

function openDialogRestore() {
	$("#txtNombreArch").val('');
	$("#cmbTipoRec").val(0);
	$("#cmbEdicion").val(0);
	$("#cmbProgramas").val(0);
	$("#cmbLocales").val(lclDef);
	cmbLocales_changed();
	$("#chkNotificar").attr('checked', false);
	if (tipodeRecuperacion == 0)
		$("#txtLeyenda").show();
	else
		$("#txtLeyenda").hide();

	$("#divDialogRestore").dialog('open');
}

function cmbLocales_changed(){
	if($("#cmbLocales").val() == 36){
		$("#cmbEdicion").val(2);
		$("#cmbTipoRec").removeAttr('disabled');    
		$("#cmbEdicion").removeAttr('disabled');    
	}
	else{
		$("#cmbTipoRec").val(2);
		$("#cmbEdicion").val(7);
		$("#cmbTipoRec").attr('disabled', 'disabled');
		$("#cmbEdicion").attr('disabled', 'disabled');
	}
}

function cargaTiposRec() {
	executeRequest(wsMtdConsultaTipoRecVideo, "{ }", successTipoRec, myError);
}

var successTipoRec = function (data, status) {
	if (data.d.length > 0) {
		$.each(data.d, function (index, tipo) {
			$("#cmbTipoRec").append("<option value='" + tipo.CveTipoRecuperacion + "'>" + tipo.NombreTiporecuperacion + "</option>");
		});
	}
	else
		alertModal("No se encontraron los tipos de restauraciones");
}

function getProgEmplFiltro() {
	var data = "{ 'ESIN_LLAV_PR':'', 'EMPL_LLAV_PR':'" + sessionStorage.numUsuario + "' }";
	executeRequest(wsMtdGetProgEmplFiltro, data, successProgEmplFiltro, Error);
}

var successProgEmplFiltro = function (data, status) {
	$("#cmbProgramas").empty();
	if (data.d.length > 0) {
		$("#cmbProgramas").append('<option value="0">== SELECCIONE ==</option>');
		$.each(data.d, function (index, programa) {
			$("#cmbProgramas").append('<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>');
		});
	}
	else
		alertModal("No se encontraron producciones para el usuario");
}

function getComboEdicion() {
	executeRequest(wsMtdGetPlayOutSharesRec, "{ }", successComboEdiciones, Error);
}

var successComboEdiciones = function (data, status) {
	$("#cmbEdicion").empty();
	if (data.d.length > 0) {
		$.each(data.d, function (index, edicion) {
			$("#cmbEdicion").append("<option data-mapP='" + edicion.MapPath + "' value='" + edicion.CvePlayOutShares + "'>" + edicion.Descripcion + "</option>");
		});
	}
	else
		alertModal("No se encontraron destinos para las recuperaciones");
}

function btnCancelar_click() {
	$("#divDialogRestore").dialog('close');
}

function btnGuardar_click() {
    
    var salida = false;
    var puestos = sessionStorage.userPuestos.split(',');
    if (puestos.length > 0)
    {
        $.each(puestos, function(index, p){
            if (p == "9" || p == "76")
                salida = true;
        });
    }
    if(salida == false){
        alertModal('No cuenta con permisos para realizar la operaci&oacute;n.');
        return false;
    }

	if ($.trim($("#txtNombreArch").val()) == '') {
		alertModal("El nombre del archivo no puede ser vacio");
		return false;
	}

    if($("#cmbLocales").val() <= 0){
        alertModal("Debe seleccionar una Local");
        return false;
    }

	EsDeportes = false;
	if ($("#cmbProgramas").val() > 0) {
		executeRequest(wsMtdGetPrefixArchivo, "{ 'esin_llav_pr':" + $("#cmbProgramas").val() + " }", successGetPrefix, Error);
	}
	else
		alertModal("Debe seleccionar una producción");
}

var successGetPrefix = function (data, status) {
	if ($.trim(data.d) != '')
		nameOfJob = $.trim(data.d) + $.trim($("#txtNombreArch").val());
	else
		nameOfJob = $.trim($("#txtNombreArch").val());

	$("#divDialogRestore").dialog('close');
	if ($.trim(nameOfJob) == '')
		return false;

	/*Se calcula prioridad de video*/
	executeRequest(wsMtdConsultaPrioridadVideoRec, "{ 'CveProgVideo':0, 'AbrevProg':'" + nameOfJob.replace($("#txtNombreArch").val(), '') + "', 'FechaAConsultar':" + JSON.stringify(new Date()) + " }", successPrioridad, Error);
}

var successPrioridad = function (data, status) {
	var prioridad = 0;
	var cvePrograma = 0;
	var prioridad = 60;
	var oTipoRecuperacion = new TipoRecuperacion();

	if (data.d.length > 0) {
		if (data.d[0].Prioridad == true)
			prioridad = 75;
		else
			prioridad = 65;
	}

	oTipoRecuperacion.CveTipoRecuperacion = $("#cmbTipoRec").val();
	oTipoRecuperacion.NombreTiporecuperacion = $("#cmbTipoRec option:selected").text();
	cvePrograma = $("#cmbProgramas").val();

	//Valida que existan marcas y que no sea una recuperacion completa

	if ($("#MainContent_divMarcas div.markContainer").length > 0 && !isRecuperaCompleto == true)  // Es la recuperacion de las marcas selecionadas
		RecuperacionParcial(prioridad, cvePrograma, oTipoRecuperacion);
	else //Se trata de una recuperacion Completa
	{		
		RecuperacionCompleta(prioridad, cvePrograma, oTipoRecuperacion);
	}
}

function getFileNamefromURL(urlVideo) {
	var name = urlVideo;
	name = name.substr(name.lastIndexOf('/') + 1, name.lastIndexOf('.'));
	name = name.substr(0, name.lastIndexOf('.'));
	return name;
}

function RecuperacionParcial(prioridad, cvePrograma, oTipoRecuperacion) {
	var files = new Array();
	var timecodes = new Array();
	var oEmpl;
	var oVideoRecuperacion;
	var oVideoRecuperacionArchivo;
	var isNotificar = false;
	var lstVideoRecuperacionArchivo = new Array();

	$.each($("#MainContent_divMarcas div.markContainer"), function (index, contenedor) {
		oVideoRecuperacionArchivo = new VideoRecuperacionArchivo();
		oVideoRecuperacionArchivo.IdNombreArchivo = getFileNamefromURL($(contenedor).attr('data-file'));
		oVideoRecuperacionArchivo.TipoMaterial = $(contenedor).attr('data-matType');
		oVideoRecuperacionArchivo.TiempoInicial = numberToTimeFormat($(contenedor).attr('data-timeIn'));
		oVideoRecuperacionArchivo.TiempoFinal = numberToTimeFormat($(contenedor).attr('data-timeOut'));

		timecodes.push(oVideoRecuperacionArchivo.TiempoInicial + ':00');
		timecodes.push(oVideoRecuperacionArchivo.TiempoFinal + ':00');
		files.push($(contenedor).attr('data-file'));
		lstVideoRecuperacionArchivo.push(oVideoRecuperacionArchivo);
	});

	oVideoRecuperacion = new VideoRecuperacion();
	oEmpl = new TDI_EMPL();

	oEmpl.EmpleadoUsr = sessionStorage.userName;
	oEmpl.EmpleadoLlavePrimaria = sessionStorage.numUsuario;

	oVideoRecuperacion.CveEmpleado = oEmpl;
	oVideoRecuperacion.FechaVideoRecuperacion = new Date();
	oVideoRecuperacion.NombreVideoRecuperacion = nameOfJob;
	oVideoRecuperacion.oTipoRecuperacion = new TipoRecuperacion();
	oVideoRecuperacion.oTipoRecuperacion.CveTipoRecuperacion = oTipoRecuperacion.CveTipoRecuperacion;
	oVideoRecuperacion.oTipoRecuperacion.NombreTiporecuperacion = oTipoRecuperacion.NombreTiporecuperacion;
	oVideoRecuperacion.TiempoTotal = $("#lblTotalTime").text();
	oVideoRecuperacion.MensajeSistema = "";
	oVideoRecuperacion.ProgramaSolicita = cvePrograma;
	oVideoRecuperacion.Prioridad = prioridad;
	oVideoRecuperacion.EsParaPlayOUT = 0;
	oVideoRecuperacion.EsParaPlayOUT = $("#cmbEdicion").val();

	objPeticionVideoRecuperacion = oVideoRecuperacion;
	listaPeticionVideoRecuperacionArchivo = lstVideoRecuperacionArchivo;

	if ($("#chkNotificar").attr('checked') == 'checked')
		isNotificar = true;
	if (oVideoRecuperacion.oTipoRecuperacion.CveTipoRecuperacion == 1)
		PageMethods.saveRequestDiva(nameOfJob, files, timecodes, false, prioridad, sessionStorage.numUsuario, sessionStorage.userName, objPeticionVideoRecuperacion, listaPeticionVideoRecuperacionArchivo, isNotificar, GenerateTransac(), isUserGrant, isUserGrantAdquisi, isRecuperaCompleto, $("#cmbLocales").val(), $("#cmbEdicion option:selected").attr('data-mapP'), onDivaComplete, Error);
	else
		PageMethods.saveRequestDiva(nameOfJob, files, timecodes, true, prioridad, sessionStorage.numUsuario, sessionStorage.userName, objPeticionVideoRecuperacion, listaPeticionVideoRecuperacionArchivo, isNotificar, GenerateTransac(), isUserGrant, isUserGrantAdquisi, isRecuperaCompleto, $("#cmbLocales").val(), $("#cmbEdicion option:selected").attr('data-mapP'), onDivaComplete, Error);
}

function onDivaComplete(result, userContext, methodName) {
	alertModal(result);
	if (result.indexOf("correctamente") > 0) {
		btnBorrarTodos_click();
		parent.openModal('Video/EstatusRecuperacionVideos.aspx', widthRecupVideo, heigthRecupVideo, "Solicitudes de recuperación.");
	}
}

function RecuperaCompleto()
{
    isRecuperaCompleto = true;        
    if ($("#MainContent_divMarcas").attr('data-matType') == 7) {
		if (isUserGrant && isUserGrantAdquisi == false)
			//alertModalFunction("El video que desear recuperar es de Adquisisiones por lo que se enviara un correo de Autorizaci&oacute;n", btnRestaurarMrk_click);
            alertModal("El video que desear recuperar es de Adquisisiones por lo que se enviara un correo de Autorizaci&oacute;n");
	}
	else {
		if (isUserGrant == false && isUserGrantAdquisi) {
			alertModal("El video que desear recuperar no es de Adquisisiones por lo que no se puede recuperar completo");
			return;
		}
	}
    btnRestaurarMrk_click();
}

function RecuperacionCompleta(prioridad, cvePrograma, oTipoRecuperacion) {
	if ($("#MainContent_divMarcas").attr('data-matType') == 7) {
		if (isUserGrant && isUserGrantAdquisi == false)
			alertModal("El video que desear recuperar es de Adquisisiones por lo que se envio un correo de Autorizacion");
	}
	else {
		if (isUserGrant == false && isUserGrantAdquisi) {
			alertModal("El video que desear recuperar no es de Adquisisiones por lo que no se puede recuperar completo");
			return;
		}
	}

	var timesToSend = new Array();
	var files = new Array();
	var timecodes = new Array();
	var timesToSend = Array();

	files.push($("#MainContent_divMarcas").attr('data-file'));

	timecodes.push("-1:-1:-1");
	timesToSend.push("-1:-1:-1");

	isRecuperaCompleto = true;
	WaitCountSaveDiva = files.length;

	var filesSend = new Array();
	var TimeCodesSend = new Array();
	lstVideoRecuperacionArchivo = Array();
	
	oVideoRecuperacionArchivo = new VideoRecuperacionArchivo();
	oVideoRecuperacion = new VideoRecuperacion();
	oEmpl = new TDI_EMPL();

	filesSend.push(files[0]);
	TimeCodesSend.push(timesToSend[0] + ":00");
	TimeCodesSend.push(timesToSend[0] + ":00");

	oVideoRecuperacionArchivo.IdNombreArchivo = getFileNamefromURL($("#MainContent_divMarcas").attr('data-file'));
	oVideoRecuperacionArchivo.TiempoInicial = timesToSend[0];
	oVideoRecuperacionArchivo.TiempoFinal = timesToSend[0];
	oVideoRecuperacionArchivo.TipoMaterial = $("#MainContent_divMarcas").attr('data-matType');
	
	lstVideoRecuperacionArchivo.push(oVideoRecuperacionArchivo);

	if (timesToSend.length > 0) timesToSend.splice(0,1);

	oEmpl.EmpleadoUsr = sessionStorage.userName;
	oEmpl.EmpleadoLlavePrimaria = sessionStorage.numUsuario;

	oVideoRecuperacion.CveEmpleado = oEmpl;
	oVideoRecuperacion.FechaVideoRecuperacion = new Date();
	oVideoRecuperacion.NombreVideoRecuperacion = nameOfJob;
	oVideoRecuperacion.oTipoRecuperacion = new TipoRecuperacion();
	oVideoRecuperacion.oTipoRecuperacion.CveTipoRecuperacion = oTipoRecuperacion.CveTipoRecuperacion;
	oVideoRecuperacion.oTipoRecuperacion.NombreTiporecuperacion = oTipoRecuperacion.NombreTiporecuperacion;
	oVideoRecuperacion.ProgramaSolicita = cvePrograma;
	oVideoRecuperacion.Prioridad = prioridad;
	oVideoRecuperacion.MensajeSistema = "";
	oVideoRecuperacion.EsParaPlayOUT = $("#cmbEdicion").val();
	oVideoRecuperacion.TiempoTotal = "-1:-1:-1";

	objPeticionVideoRecuperacion = oVideoRecuperacion;
	listaPeticionVideoRecuperacionArchivo = lstVideoRecuperacionArchivo;

	var isNotificar = false;
	if ($("#chkNotificar").attr('checked') == 'checked')
		isNotificar = true;

	PageMethods.saveRequestDiva(nameOfJob, filesSend, TimeCodesSend, true, prioridad, sessionStorage.numUsuario, sessionStorage.userName, objPeticionVideoRecuperacion, listaPeticionVideoRecuperacionArchivo, isNotificar, GenerateTransac(), isUserGrant, isUserGrantAdquisi, isRecuperaCompleto, $("#cmbLocales").val(), $("#cmbEdicion option:selected").attr('data-mapP'), onDivaComplete, Error);
}

function txtNumCel_keyup() {
	if (window.event.keyCode == 13)
		$("#btnAcceptCel").click();
}

function btnAcceptCel_click() {
	if ($.trim($("#txtNumCel").val()) == '') {
		alertModal("El Número de Celular no puede ser nulo");
		return false;
	}

	numCel = $.trim($("#txtNumCel").val());
	$("#divCapCel").dialog('close');
	$("#chkNotificar").attr('checked', 'checked');
}

function btnCancelCel_click() {
	$("#divCapCel").dialog('close');
	$("#chkNotificar").attr('checked', undefined);
}

function chkNotificar_click() {
	if ($("#chkNotificar").attr('checked') == 'checked' && numCel.length < 3) {
		$("#divCapCel").dialog('open');
	}
}

function RecuperaCompleto_Click() {
	if (PermisosGridZoomRecuperacion() == false) {
		alertModal('No cuenta con los permisos para realizar esta operación.');
		return false;
	}

	if ($("#MainContent_divMarcas").attr('data-matOrig') != undefined) {
		if ($("#MainContent_divMarcas").attr('data-matType') == 4 || $("#MainContent_divMarcas").attr('data-matOrig') == 2)
			EsDeportes = true;
		
		isRecuperaCompleto = true;

		if (EsDeportes == true)
			if (EsDeportes)
				tipodeRecuperacion = 3;
			else
				tipodeRecuperacion = 0;
		openDialogRestore();
	}
	else
		alertModal('No ha seleccionado un video para recuperar');
}


function cargaLocales() {
    getLocales(sucessGetLocales, Error);
	//executeRequest(wsMtdGetLocales, "{ }", sucessGetLocales, Error);   
}

var sucessGetLocales = function (data, status) {
    $("#cmbLocales").empty();
    $.each(data.d, function (index, local) {
//        if (lclDef == 36 && (local.LocalLlave == 36 || local.Local.LocalLlave == 36));
//		else
//        {
            if (local.LocalLlave == undefined)
                $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
            else
                $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
//        }
    });

    $("#MainContent_cmbLocales").val(getLocalSeleccionar());
}

//var sucessGetLocales = function (data, status) {
//	$("#cmbLocales").empty();
//	$.each(data.d, function (indice, local) {
//		if (lclDef == 36 && local.LocalLlave == 6);
//		else
//			$("#cmbLocales").append("<option value='" + local.LocalLlave + "'>" + local.LocalDescripcion + "</option>");
//	});
//}

function selectTab(index) {
	$('#divVideoData').tabs({ selected: index });
}

function buscaAcopladoList(control) {
	$("#MainContent_hiddAcopS").val($(control).attr('data-acop'));
	$("#MainContent_btnCargaInfoAcoplado").click();
}

function addNewTab(tabName, tabDetail) {
	try {
		$("#loading").dialog('open');
		$('#divVideoData').append("<div id='divAcoplado_" + contadorTabs + "' >" + $("#MainContent_hiddTabCon").val() + "</div>");
		$("#MainContent_hiddTabCon").val("");
		$("#divVideoData").tabs("add", "#divAcoplado_" + contadorTabs, tabName);
        $($("#MainContent_ulTabs > li > a")[$("#MainContent_ulTabs > li > a").length - 1]).attr('id', 'tab_divAcoplado_' + contadorTabs);
        $('#tab_divAcoplado_' + contadorTabs).attr('data-detail', tabDetail);
		contadorTabs++;
	}
	catch (ex) {
		alertModal("Ocurrio un problema al cargar la informacion: " + ex.Message);
	}
}

function creaTabBusqueda(control, reemplazar) {
	$("#MainContent_hiddTabI").val(JSON.stringify(recuperacionesBusq[$(control).attr('data-cveBusq')]));
	if(reemplazar == true){
		while($('#divVideoData > ul > li').tabs().size() > 1)
                $("#divVideoData").tabs("remove",1);
	}
    $("#MainContent_btnLoadNewTab").click();
    $("#divRecuperacionBusq").dialog("close");
}

function openDialogSaveBusqueda(){
    if($('#divVideoData > ul > li').tabs().size() <= 1){
        alertModal("No tiene registros de b&uacute;squedas que guardar.");
        return false;
    }

    $("#txtNombreBusq").val('');
    $("#divGuardaBusqueda").dialog('open');
}

function cancelSaveSearch(){
    $("#divGuardaBusqueda").dialog('close');
    return false;
}

function saveSearch(){
    var nombreTab = '';
    /*Se valida el nombre de la busqueda*/
    if($("#txtNombreBusq").val() == undefined || $.trim($("#txtNombreBusq").val()) == ""){
        alertModal("Debe especificar un nombre v&aacute;lido para la b&uacute;squeda.");
        return false;
    }

    nombreTab = $($("#MainContent_ulTabs > li > a")[$("#divVideoData").tabs('option', 'selected')]).text();

    if(nombreTab != 'Acoplados'){
        /*Existen 2 formas de guardar las busquedas:
        *  - Provenientes de una Seleccion "Fecha en la Pestaña" (Se guarda el FQL con los numeros de VDO_IDFILENAMES que se seleccionaron)
        *  - Consulta desde VideoConsulta "Nombre de Busq en Pestaña" (Se guarda el FQL con el que se generó la Busqueda)
        */

        var oBusqueda = new TDI_BUSQUEDAS();
        oBusqueda.Nombre = $.trim($("#txtNombreBusq").val());
        oBusqueda.Fecha = null;
        oBusqueda.TabNombre = nombreTab;
        oBusqueda.Usuario = sessionStorage.userName;
        oBusqueda.DetalleBusqueda = $($("#MainContent_ulTabs > li > a")[$("#divVideoData").tabs('option', 'selected')]).attr('data-detail');

        PageMethods.saveSearch(oBusqueda, onSaveSearchComplete, Error);
    }

    $("#divGuardaBusqueda").dialog('close');
}

function onSaveSearchComplete(result, userContext, methodName) {
    if(result == true)
        alertModal("Las B&uacute;squedas se han guardado correctamente.");
    else
        alertModal("No fue posible guardar las b&uacute;squedas.");
}

function isDate(string)
{ //string estará en formato dd/mm/yyyy (dí­as < 31 y meses < 12)
   var regExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  if(!regExp.test(string)) 
    return false;
  else 
    return true;
}

function ErrorImage(control){
    control.src = '../../Images/noimage.png';
}

function setFullScreen(){
    var image;
    var video;

    image = initParams['uriImg'] = $("#MainContent_divMarcas").attr('data-img');
    video = $("#MainContent_divMarcas").attr('data-file');

    if (jwplayer("mediaspace").getState() != "PAUSED")
        jwplayer("mediaspace").pause();

    parent.openFullScreen(video, image, isActiveStreaming, jwplayer("mediaspace").getPosition());
}

function getTimeCodes(idDetail, idFileName, idFile) {
    $("#divFotoGaleria").empty();
    if (idFile != undefined) {
        var data = "{ 'OTRA_CVEC':'', 'VideoReferencia':'" + idFileName + "', 'DetIdFilename':'" + idDetail + "', 'vdo_id':'" + idFile + "' }";
        executeSyncRequest(wsMtgGetViodeoGaleria, data, successgetFotoGaleria, Error);
    }
    else {
        $("#divFotoGaleria").append("<img alt='' class='imgFotoGalVideo' src='../../Images/noimage.png'/>");
    }
}

var successgetFotoGaleria = function (data, status) {
    var dataCtrl = '';
    if (data.d.length > 0) {
        $.each(data.d, function (index, resultado) {
            dataCtrl += "<img alt='' class='imgFotoGalVideo' data-time='" + resultado.Tiempo + "' data-foto='" + resultado.Foto + "' src='" + resultado.Foto + "'/>";
        });
        $("#divFotoGaleria").append(dataCtrl);
    }
    else
        $("#divFotoGaleria").append("<img alt='' class='imgFotoGalVideo' data-time='0' data-foto='../../Images/noimage.png' src='../../Images/noimage.png'/>");
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
        loadPlayer("mediaspace", isActiveStreaming, $("#MainContent_divMarcas").attr('data-file'), $("#MainContent_divMarcas").attr('data-img'), 280, 320, $(this).attr('data-time'));
        jwplayer("mediaspace").play();
    });
});

function PermisosGridZoomRecuperacion()
{
    var salida = false;
    if(sessionStorage.userPuestos == '' || sessionStorage.userPuestos == undefined || sessionStorage.userPuestos == null)
        return false;
    var puestos = sessionStorage.userPuestos.split(',');
    
    if (puestos.length > 0)
    {
        $.each(puestos, function(index, p){
           //Administrador, VIDEOTECA ADMINISTRADOR, EDITOR DE SECCION, JEFE DE INFORMACION, REALIZADOR, ASISTENTE DE EDICION
            //ASISTENTE DE PRODUCCIÓN, REPORTERO, EDITOR EN CAMPO, VIDEOTECA GENERAL, SOPORTE
            if (p == "9" || p == "59" || p == "5" || p == "6" || p == "3" || p == "91" || p == "76" || p == "1" || p == "94" || p == "62" || p == "139")
                salida = true;
        });
    }

    return salida;
}