
var EstadobyPais;
var CiudadbyEstado;

//////////Busqueda/////////////////////////////
////////variable de parametros
var cveOT;
var textofiltro;
var cveEmpleado;
var cvePrograma;
var cveSeccion;
var cvePais;
var cveEstado;
var cveCiudad;
var FechaIni;
var FechaFin;
var esbusquedaAvanzada;
var soloconvideo;
var solonotaterminada;
var solomaterialbruto;
var nocinta;
var cveAgencia;
var NumOT;
var vdoIdFilename;
var posIni;
var posFin;
var Baneado;
var url;

var PerPage;
var Offset;
var Palabraclave;
var OptBusqueda;
var Usuario;
var GuardaBusqueda;
var FinalCut;
var OpcVideoteca;
var OpcPlaneacion;
var OpcGuion;
var CCaption;

////fast Adquisiciones
var TituloBusqueda;
var TituloCapituloOrig;
var TituloCapituloTrad;
var NumeroCapitulo;
var CveGenero;
var NombGenero;
var PalCve;
var Sinopsis;
var Elenco;

var HDSD;
$(document).ready(function () {
    $.each($("#MainContent_divMenu").children(), function (index, MyDiv) {
        $.each($(MyDiv).children(), function (index2, MyDiv2) {
            $.each($(MyDiv2).children(), function (index3, MyDiv3) {
                $.each($(MyDiv3).children(), function (index4, MyDiv4) {
                    if ($(MyDiv4).children().length >= 1) {
//                        if ($($(MyDiv4).children()[0]).attr("class") != "") {

//                        }
                        if ($(MyDiv4).children()[0].id.toString().indexOf("conten") != -1) {
                            $($(MyDiv4).children()[0]).hide();
                        }
                    }
                });
            });
        });
    });
});
function SiguientesHijos(object) {
    $.each($(object).children(), function (index, MyDiv) {
        $.each($(MyDiv).children(), function (index2, MyDiv2) {
            $.each($(MyDiv2).children(), function (index3, MyDiv3) {
                if ($(MyDiv3).children().length > 0) {
                    if ($(MyDiv3).children()[0].id.toString().indexOf("conten") != -1) {
                        
                        if ($($(MyDiv3).children()[0]).attr("style") != "" && $($(MyDiv3).children()[0]).attr("style") != undefined && $($(MyDiv3).children()[0]).attr("style").toString().indexOf("display: none") != -1)  {
                            $($(MyDiv3).children()[0]).show();
                            SiguientesHijos(MyDiv3);

                        } else {
                            $($(MyDiv3).children()[0]).hide();
                        }
                    }
                }
            });
        });
    });
}
$(function () {
    $(".OpenMenu").click(function () {
        $.each($(this).parent(), function (index, MyDiv) {
            $.each($(MyDiv).children(), function (index2, MyDiv2) {
                if ($(MyDiv2).children().length > 0) {

                    if ($(MyDiv2).children()[0].id.toString().indexOf("conten") != -1) {
                        if ($($(MyDiv2).children()[0]).attr("style") != "" && $($(MyDiv2).children()[0]).attr("style") != undefined && $($(MyDiv2).children()[0]).attr("style").toString().indexOf("display: none") != -1) {
                            $($(MyDiv2).children()[0]).show();
                            SiguientesHijos(MyDiv2);
                        } else {
                            $($(MyDiv2).children()[0]).hide();
                        }
                    }
                }
            });
        });
    });

    $("#MainContent_divMenu").delegate(".pageItem", "click", function () {
        if ($(this).attr('data-title').toUpperCase() == "SIN REALIZADOR" || $(this).attr('data-title').toUpperCase() == "DURACIÓN" || $(this).attr('data-title').toUpperCase() == "MONITOR DE RECURSOS DE EDICIÓN") {
            PopupCenter($(this).attr('data-url'), $(this).attr('data-title'), screen.width, screen.height);
        }else{
            openModal($(this).attr('data-url'), $(this).attr('data-wdt'), $(this).attr('data-hgt'), $(this).attr('data-title'));
            $("#divLeftMenu").click();

        }
        return false;
    });

    //    $('#divDockMinimize').Fisheye({
    //        maxWidth: 60,
    //        items: 'a',
    //        itemsText: 'span',
    //        container: '.dock-container2',
    //        itemWidth: 40,
    //        proximity: 80,
    //        alignment: 'left',
    //        valign: 'bottom',
    //        halign: 'center'
    //    });

});

////////////funcio que ejecuta las funciones que se requieren solo al cargar la pagina/////////////////////////////
function PopupCenter(pageURL, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var targetWin = window.open(pageURL, title, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=0, copyhistory=no, width=" + w + ", height=" + h + ", top=" + top + ", left=" + left);
} 
function changeFilter() {
    sessionStorage.tipoFiltroBusq = $("#cmbOptBusqueda").val();
}

window.onload = function () { initFunction(); }

function initFunction() {
    $(".imgLogo").attr('title', 'Bienvenido: ' + sessionStorage.nomUsuario);

    $("#MainContent_divMenu").dialog({ resizable: false, autoOpen: false, show: "Drop", hide: "Drop", position: [15, 62], width: 'auto', height: 'auto', zIndex: 999999999 });
    setMinimizedContentPage(this);
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-MainContent_divMenu').parent()).remove();
    $("#MainContent_divMenu").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

    $("#ifrmContent").attr('width', (screen.width - 120));
    if (navigator.appName == 'Opera')
        $("#ifrmContent").attr('height', (screen.height - 545));
    else if (navigator.appName.indexOf('Explorer') != -1)
        $("#ifrmContent").attr('height', (screen.height - 90));
    else
        $("#ifrmContent").attr('height', (screen.height - 120));
  
    $("#txtFechaIni").datepicker({ dateFormat: 'yy-mm-dd' });
    $('#txtFechaIni').datepicker({ minDate: 0 });
    $('#txtFechaIni').datepicker("setDate", new Date(), dateFormat = "yy-mm-dd");
    $('#txtFechaIni').readOnly = true;

    $("#txtFechaFin").datepicker({ dateFormat: 'yy-mm-dd' });
    $('#txtFechaFin').datepicker({ minDate: 0 });
    $('#txtFechaFin').datepicker("setDate", new Date(), dateFormat = "yy-mm-dd");
    $('#txtFechaFin').readOnly = true;

    //////Crea el El Tab en los div
    $("#TabBusquedaAvanzada").tabs();

    if (sessionStorage.tipoBusqueda == undefined)
        sessionStorage.tipoBusqueda = $('#cmbOptBusqueda').val();
    else
        $('#cmbOptBusqueda').val(sessionStorage.tipoBusqueda);

    /////////////////Prepara Dialogo de herramientas de busqueda avanzada ///////////////////////

    $("#TabBusquedaAvanzada").dialog({
        autoOpen: false,
        height: 390,
        width: 980
    });


    var myId = openModalNotClosable("video/EstatusRecuperacionVideos.aspx", widthRecupVideo, heigthRecupVideo, "Solicitudes de Recuperaci&oacute;n");
    maximizeWindow(myId);
    $("#divFullScreen").dialog({ resizable: false, autoOpen: false, show: "blind", width: screen.width, height: screen.height, modal: true });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divFullScreen').parent()).remove();
    $("#divFullScreen").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
    $("#divModal").dialog({ modal: true, width: 'auto', height: 'auto' });
    $("#divModal").dialog("option", "position", [100, 100]);
    $("#divModal").dialog('close');
}

function ManejaRadio(r) {
    if (r == 1) {
        $("#RdIrBusqueda").val("false");
    }
    else {
        $("#RdIrBusqueda").val("false");
    }
}



/////////////////Abre Dialogo de herramientas de busqueda avanzada ///////////////////////

function AbreBusquedaAvanzada() {
    $("#TabBusquedaAvanzada").dialog("open");
}

function AbreMonitor() {
    openModal('video/EstatusRecuperacionVideos.aspx', widthRecupVideo, heigthRecupVideo, 'Recuperacion Video');
    //$("#ifrmContent").attr('src', "video/EstatusRecuperacionVideos.aspx");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CierraBusquedaAvanzada() {
    $("#TabBusquedaAvanzada").dialog("close");
    return false;
}

function EstadoChange() {
    loadCiudadbyEstados($("#cmbEstado").val());
}

function loadCiudadbyEstados(cveEstado) {
    data = "{ 'cveEstado':" + cveEstado + "}";
    executeRequest(wsMtdoObtenerObtenerCiudadbyEstado, data, successCiudadbyEstado, myError);
}

var successCiudadbyEstado = function (data, status) {
    CiudadbyEstado = data.d;
    $("#cmbCiudad").empty();
    $.each(CiudadbyEstado, function (index, Ciudad) {
        $("#cmbCiudad").append('<option value="' + Ciudad.cveCiudad + '">' + Ciudad.nombreCiudad + '</option>');
    });
}

////////////////Limpia controles de busqueda/////////////////////////////////

function cleanForm() {
    $("#txtOT").val('');
    $("#txtTextoFiltro").val('');
    $('#MainContent_cmbReportero').val(0);
    $('#MainContent_cmbPrograma').val(0);
    $('#MainContent_cmbSeccion').val(0);
    $('#MainContent_cmbPais').val(0);
    $('#cmbEstado').val(0);
    $('#cmbCiudad').val(0);
    $("#txtFechaIni").datepicker("setDate", new Date());
    $("#txtFechaFin").datepicker("setDate", new Date());

    $("#MainContent_ChkNotaTerminada").val(false);
    $("#MainContent_ChkMaterialenBruto").val("false");
    $("#txtNumeroCinta").val('');
    $('#MainContent_cmbAgencia').val(0);
    $("#txtOT").val('');

    Palabraclave = $("#txtPalabraClave").val('');

    //$('input[type=checkbox]').each(function () { this.checked = false; });
    $('input[type=Text]').each(function () { this.checked = false; });
}

function txtTextoFiltro_keypress() {
    if (event.keyCode == '13') {
       $("#btnBuscarAlone").click();
    }
}

function divLeftMenu_Click() {
    if ($("#MainContent_divMenu").attr('data-isOpen') == 0 || $("#MainContent_divMenu").attr('data-isOpen') == undefined) {
        $("#MainContent_divMenu").dialog('open');
        $("#MainContent_divMenu").attr('data-isOpen', 1);
        $('#imgMenu').attr('src', '../Images/left.png');
    }
    else {
        $("#MainContent_divMenu").dialog('close');
        $("#MainContent_divMenu").attr('data-isOpen', 0);
        $('#imgMenu').attr('src', '../Images/right.png');
    }
    return false;
}

////Ejecuta la busqueda ///
function FuncionBuscar(Tipo, Origen) {
    textofiltro = $("#txtTextoFiltro").val();

    if (textofiltro == "" && Origen=="Texto") {
        alertModal("El Campo de Búsqueda no puede ser nulo o Vacio. (Requiere de almenos 3 Letras.)");
    return false
    }

    //Parametros  fast
    cveOT = $("#txtOT").val();
    
    cveEmpleado = $('#MainContent_cmbReportero').val();
    cvePrograma = $('#MainContent_cmbPrograma').val();
    cveSeccion = $('#MainContent_cmbSeccion').val();
    cvePais = $('#MainContent_cmbPais').val();
    cveEstado = $('#cmbEstado').val();
    cveCiudad = $('#cmbCiudad').val();
    FechaIni = $("#txtFechaIni").val();
    FechaFin = $("#txtFechaFin").val();
    if(!validaFecha(FechaIni,FechaFin))
        return false;

    esbusquedaAvanzada = "0";
    if (Origen == "Avanzado")
        esbusquedaAvanzada = "1";
    

    solonotaterminada = false;    
    if($("#ChkNotaTerminada").attr("checked") == "checked")
        solonotaterminada = true;

    solomaterialbruto = false;
    if ($("#ChkMaterialenBruto").attr("checked") == "checked")
        solomaterialbruto = true;
    
    soloconvideo = $("#ChkSoloConvideo").is("checked");
    nocinta = $("#txtNumeroCinta").val();
    cveAgencia = $('#MainContent_cmbAgencia').val();
    NumOT = $("#txtOT").val();
    vdoIdFilename = "null"
    posIni = "null";
    posFin = "null";
    Baneado = "null";

    PerPage = "84";
    Offset = "null";
    Palabraclave = $("#txtPalabraClave").val();
    OptBusqueda = $('#cmbOptBusqueda').val();
    Usuario = "null";  /*??*/
    GuardaBusqueda = "1";
    FinalCut = "null";  /*??*/
    OpcVideoteca = $("#ChkClasificacionVideoteca").is("checked");  /*??*/
    OpcPlaneacion = $("#ChkPlaneacion").is("checked");  /*??*/
    OpcGuion = $("#ChkGuion").is("checked");
    CCaption = $("#ChkCcaption").is("checked");

    /////Fast Adquisisiones

    TituloBusqueda = $("#txtTitulo").val();
    TituloCapituloOrig = "";
    TituloCapituloTrad = $("#txtCapitulo").val();
    NumeroCapitulo = $("#txtNumCapitulo").val();
    CveGenero = "null";
    NombGenero = "null";
    PalCve = $('#txtPalabraClave').val();
    Sinopsis = $('#txtSinopsis').val();
    Elenco = $('#txtElencoOPersonaje').val();
    HDSD = $('#cmbHDSD').val();
    CveGenero = $('#MainContent_cmbTipoSenal').val();

    if (Tipo == "Adquisiciones")
        cvePrograma = $("#MainContent_cmbTipoPrograma").val();

    url = "cveOT=" + cveOT + "&";
    url = url + "textofiltro=" + textofiltro + "&";
    url = url + "cveEmpleado=" + cveEmpleado + "&";
    url = url + "cvePrograma=" + cvePrograma + "&";
    url = url + "cveSeccion=" + cveSeccion + "&";
    url = url + "cvePais=" + cvePais + "&";
    url = url + "cveEstado=" + cveEstado + "&";
    url = url + "cveCiudad=" + cveCiudad + "&";
    url = url + "FechaIni=" + FechaIni + "&";
    url = url + "FechaFin=" + FechaFin + "&";
    url = url + "esbusquedaAvanzada=" + esbusquedaAvanzada + "&";
    url = url + "soloconvideo=" + soloconvideo + "&";
    url = url + "solonotaterminada=" + solonotaterminada + "&";
    url = url + "solomaterialbruto=" + solomaterialbruto + "&";
    url = url + "nocinta=" + nocinta + "&";
    url = url + "cveAgencia=" + cveAgencia + "&";
    url = url + "NumOT=" + NumOT + "&";
    url = url + "vdoIdFilename=" + vdoIdFilename + "&";
    url = url + "posIni=" + posIni + "&";
    url = url + "posFin=" + posFin + "&";
    url = url + "Baneado=" + Baneado + "&";
    //

    url = url + "PerPage=" + getMaxVideosBusqueda() + "&";
    url = url + "Offset=" + Offset + "&";
    url = url + "Palabraclave=" + Palabraclave + "&";
    url = url + "OptBusqueda=" + OptBusqueda + "&";
    url = url + "Usuario=" + Usuario + "&";
    url = url + "GuardaBusqueda=" + GuardaBusqueda + "&";
    url = url + "FinalCut= " + FinalCut + "&";
    url = url + "OpcVideoteca=" + OpcVideoteca + "&";
    url = url + "OpcPlaneacion=" + OpcPlaneacion + "&";
    url = url + "OpcGuion=" + OpcGuion + "&";
    url = url + "CCaption=" + CCaption + "&";

    ///
    url = url + "TituloBusqueda=" + TituloBusqueda + "&";
    url = url + "TituloCapituloOrig=" + TituloCapituloOrig + "&";
    url = url + "TituloCapituloTrad=" + TituloCapituloTrad + "&";
    url = url + "NumeroCapitulo=" + NumeroCapitulo + "&";
    url = url + "CveGenero=" + CveGenero + "&";
    url = url + "NombGenero=" + NombGenero + "&";
    url = url + "PalCve=" + PalCve + "&";
    url = url + "Sinopsis=" + Sinopsis + "&";
    url = url + "Elenco=" + Elenco + "&";
    url = url + "Tipo=" + Tipo + "&";
    url = url + "HDSD=" + HDSD
    
    /*Se calcula el total de videos que puede mostar la busqueda por pagina*/
    openModal("Busqueda.aspx?" + url, widthBusquedaAv, heigthBusquedaAv, 'B&uacute;squeda Avanzada');

    CierraBusquedaAvanzada();
    cleanForm();
    return false;
}

function getMaxVideosBusqueda() {
    var width = 0;
    var heigth = 0;
    
    if (widthBusquedaAv <= 0) 
        width = getMaxFloatableWidth();
    else
        width = widthBusquedaAv;

    if(heigthBusquedaAv <= 0)
        heigth = getMaxFloatableHeigth();
    else
        heigth = heigthBusquedaAv;
    width = Math.floor((width - 25) / 88);
    heigth = Math.floor((heigth - 140) / 88);

    return (width * heigth);
}

function myError(request, status, error) {
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Busqueda");
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + status.statusText);
}


////////////////Limpia controles de busqueda/////////////////////////////////

function cleanForm() {
    $("#txtOT").val('');
    $("#txtTextoFiltro").val('');
    $('#MainContent_cmbReportero').val(0);
    $('#MainContent_cmbPrograma').val(0);
    $('#MainContent_cmbSeccion').val(0);
    $('#MainContent_cmbPais').val(0);    
    $("#cmbEstado").empty();
    $('#cmbCiudad').empty();
    $("#txtFechaIni").datepicker("setDate", new Date());
    $("#txtFechaFin").datepicker("setDate", new Date());

    $("#MainContent_ChkNotaTerminada").val(false);
    $("#MainContent_ChkMaterialenBruto").val("false");
    $("#txtNumeroCinta").val('');
    $('#MainContent_cmbAgencia').val(0);
    $("#txtOT").val('');

    Palabraclave = $("#txtPalabraClave").val('');


    $('input[type=checkbox]').each(function () { this.checked = false; });
    $('input[type=Text]').each(function () { this.checked = false; });
}


/////Llena estado en base al pais seleccionado ///////////////////////////

function PaisChange() {
    loadEstadosbyPais($("#MainContent_cmbPais").val());
}

function loadEstadosbyPais(cvePais) {
    data = "{ 'PaisLlave':" + cvePais + "}";
    executeRequest(wsMtdoObtenerObtenerEstadoByPais, data, successEstadobyPais, myError);
}

var successEstadobyPais = function (data, status) {
    EstadobyPais = data.d;
    $("#cmbEstado").empty();
    $.each(EstadobyPais, function (index, Estado) {
        $("#cmbEstado").append('<option value="' + Estado.cveEstado + '">' + Estado.nombreEstado + '</option>');
    });
}

/////Llena la ciudad en base al estado seleccionado de un pais ///////////////////////////

function EstadoChange() {
    loadCiudadbyEstados($("#cmbEstado").val());
}

function loadCiudadbyEstados(cveEstado) {
    data = "{ 'cveEstado':" + cveEstado + "}";
    executeRequest(wsMtdoObtenerObtenerCiudadbyEstado, data, successCiudadbyEstado, myError);
}

var successCiudadbyEstado = function (data, status) {
    CiudadbyEstado = data.d;
    $("#cmbCiudad").empty();
    $.each(CiudadbyEstado, function (index, Ciudad) {
        $("#cmbCiudad").append('<option value="' + Ciudad.cveCiudad + '">' + Ciudad.nombreCiudad + '</option>');
    });
}

function openModal(modalSource, width, height, title, identifier) {
    var windowsWidth = 0;
    var windowHeigth = 0;

    if (width <= 0)
        windowsWidth = screen.width - 55;
    else
        windowsWidth = width;

    if (height <= 0)
        windowHeigth = screen.height - 150;
    else
        windowHeigth = height;

    if (height <= 0 && navigator.appVersion.indexOf("Mac") != -1)
        windowHeigth = windowHeigth - 100;
    
    var idWindow = customFunctionCreateWindow(modalSource, windowsWidth, windowHeigth, 30, 50, title, false, identifier);    
    return idWindow;
}

function openModalNotClosable(modalSource, width, height, title, identifier) {
    var windowsWidth = 0;
    var windowHeigth = 0;

    if (width <= 0)
        windowsWidth = screen.width - 55;
    else
        windowsWidth = width;

    if (height <= 0)
        windowHeigth = screen.height - 150;
    else
        windowHeigth = height;

    if (height <= 0 && navigator.appVersion.indexOf("Mac") != -1)
        windowHeigth = windowHeigth - 100;

    return customFunctionCreateWindow(modalSource, windowsWidth, windowHeigth, 30, 50, title, true, identifier);
}

function openModalUpdatable(modalSource, width, height, title, divToUpdate, params, identifier) {
    var windowsWidth = 0;
    var windowHeigth = 0;
    if (width <= 0)
        windowsWidth = screen.width - 55;
    else
        windowsWidth = width;

    if (height <= 0)
        windowHeigth = screen.height - 150;
    else
        windowHeigth = height;

    if (height <= 0 && navigator.appVersion.indexOf("Mac") != -1)
        windowHeigth = windowHeigth - 100;

    return customFunctionCreateWindowUpdatable(modalSource, windowsWidth, windowHeigth, 30, 50, title, divToUpdate, params, identifier); 
}

function openModalUpdatable(modalSource, width, height, title, divToUpdate, params) {
    var windowsWidth = 0;
    var windowHeigth = 0;

    if (width <= 0)
        windowsWidth = screen.width - 55;
    else
        windowsWidth = width;

    if (height <= 0)
        windowHeigth = screen.height - 150;
    else
        windowHeigth = height;

    if (height <= 0 && navigator.appVersion.indexOf("Mac") != -1)
        windowHeigth = windowHeigth - 100;

    return customFunctionCreateWindowUpdatable(modalSource, windowsWidth, windowHeigth, 30, 50, title, divToUpdate, params); 
}
function  validaFecha(fini, ffin)
{
    if(new Date(ffin)  < new Date(fini)){
        alertModal("La Fecha Fin no puede ser mayor que la Fecha de Inicio");
        return false;
    }else
        return true;
}
function Limpiar()
{
    cleanForm();
}

function addMinimizedItem(windowId, title, key) {
    var icon;
    if (minimizedIcons[key] == undefined)
        icon = "../Images/icono.png";
    else
        icon = minimizedIcons[key];
    $("#listDockMinimize").append("<li><span>" + title + "</span><a href='#'><img onclick='removeFromDock(" + windowId + ", this)' src='" + icon + "'/></a></li>");
}

function removeFromDock(windowId, contenedor) {
    maximizeWindow(windowId);
    $(contenedor).remove();
}

function addPrevClass(e) {
    var target = e.target;
    if (target.getAttribute('src')) { // check if it is img
        var li = target.parentNode.parentNode;
        var prevLi = li.previousElementSibling;
        if (prevLi) {
            prevLi.className = 'prev';
        }

        target.addEventListener('mouseout', function () {
            prevLi.removeAttribute('class');
        }, false);
    }
}
if (window.addEventListener) {
    document.getElementById("dock").addEventListener('mouseover', addPrevClass, false);
}

// print user-agent string
//document.getElementById('ua-string').innerHTML = navigator.userAgent;

function Did(Texto, value) {
    //    alertModal(Texto);
    $("#cmbOptBusqueda").val(value);
    if (Texto != "") {
        $("#DidyouMean").css("display", "block");
        $("#LblDidYouMean").empty();
        $("#LblDidYouMean").append(Texto);
    }
    else {
        $("#DidyouMean").css("display", "none");
    }
}
function DetonaDid() {
    var texto = $("#LblDidYouMean").text();
    $("#txtTextoFiltro").val(texto);
    FuncionBuscar('Avanzado', 'Texto');
}



////autocompletador/////

	(function ($) {
	    $.widget("ui.combobox", {
	        _create: function () {
	            var self = this,
					select = this.element.hide(),
					selected = select.children(":selected"),
					value = selected.val() ? selected.text() : "";
	            var input = this.input = $("<input>")
					.insertAfter(select)
					.val(value)
					.autocomplete({
					    delay: 0,
					    minLength: 2,
					    source: function (request, response) {
					        var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
					        response(select.children("option").map(function () {
					            var text = $(this).text();
					            if (this.value && (!request.term || matcher.test(text)))
					                return {
					                    label: text.replace(
											new RegExp(
												"(?![^&;]+;)(?!<[^<>]*)(" +
												$.ui.autocomplete.escapeRegex(request.term) +
												")(?![^<>]*>)(?![^&;]+;)", "gi"
											), "<strong>$1</strong>"),
					                    value: text,
					                    option: this
					                };
					        }));
					    },
					    select: function (event, ui) {
					        ui.item.option.selected = true;
					        self._trigger("selected", event, {
					            item: ui.item.option
					        });
					    },
					    change: function (event, ui) {
					        if (!ui.item) {
					            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex($(this).val()) + "$", "i"),
									valid = false;
					            select.children("option").each(function () {
					                if ($(this).text().match(matcher)) {
					                    this.selected = valid = true;
					                    return false;
					                }
					            });
					            if (!valid) {
					                // remove invalid value, as it didn't match anything
					                $(this).val("");
					                select.val("");
					                input.data("autocomplete").term = "";
					                return false;
					            }
					        }
					    }
					}).addClass("cmbBusquedaAv");

	            input.data("autocomplete")._renderItem = function (ul, item) {
	                return $("<li></li>")
						.data("item.autocomplete", item)
						.append("<a>" + item.label + "</a>")
						.appendTo(ul);
	            };

	            this.button = $("<button type='button'>&nbsp;</button>")
					.attr("tabIndex", -1)
					.attr("title", "Mostrar Todo")
					.insertAfter(input)
					.button({
					    icons: {
					        primary: "ui-icon-triangle-1-s"
					    },
					    text: false
					})
					.removeClass("ui-corner-all")
					.addClass("ui-corner-right ui-button-icon")
					.click(function () {
					    // close if already visible
					    if (input.autocomplete("widget").is(":visible")) {
					        input.autocomplete("close");
					        return;
					    }

					    // work around a bug (likely same cause as #5265)
					    $(this).blur();

					    // pass empty string as value to search for, displaying all results
					    input.autocomplete("search", "   ");
					    input.focus();
					});
	        },

	        destroy: function () {
	            this.input.remove();
	            this.button.remove();
	            this.element.show();
	            $.Widget.prototype.destroy.call(this);
	        }
	    });
	})(jQuery);
	    $(function () {
            $("#MainContent_cmbReportero").combobox();
		    $("#MainContent_cmbPais").combobox();
		    $("#MainContent_cmbPrograma").combobox();
		    $("#MainContent_cmbEstado").combobox();
		    $("#MainContent_cmbSeccion").combobox();
		    $("#MainContent_cmbAgencia").combobox();
		});

		function ImageError(imagen) 
        {
            imagen.src = '../../Images/noimage.png';
        }

function openFullScreen(file, image, isStreaming, startPoint) {
    if (startPoint == undefined)
        startPoint = 0;    
    if (isStreaming) {
        jwplayer("divFullPlayer").setup({
            flashplayer: playerPath,
            height: screen.height - 90,
            width: screen.width,
            allowscriptaccess: 'always',
            allowfullscreen: true,
            file: getUrlFormatoStreaming(file),
            image: image,
            start: startPoint,
            streamer: streamerPath,
            controlbar: 'none',
            logo: { hide: true },
            icons: false,
            volume: 50
        });
    }
    else {
        jwplayer("divFullPlayer").setup({
            flashplayer: playerPath,
            height: screen.height - 90,
            width: screen.width,
            allowscriptaccess: 'always',
            allowfullscreen: true,
            file: file,
            image: image,
            start: startPoint,
            controlbar: 'none',
            logo: { hide: true },
            icons: false,
            volume: 50
        });
    }

    jwplayer("divFullPlayer").play();
    $("#divFullScreen").dialog('open');

}

function closeFullScreen(){
    $("#divFullScreen").dialog('close');
}

function logOutSession() {
    sessionStorage.clear();
    window.location = siteUrl;
}