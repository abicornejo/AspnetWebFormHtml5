var vieneAgendaSemanal = false;
var producciones = '';
var fecha = new Date();
var _dtAgendaSemanal;
var fabrica = '';
var idSeccion='';
var unsNota;
var unsNotaGen;
var Produccion;
var lstAGDI = new Array();
var ListaOT;
var ListaProp;
var tipoNota = '';
var idFabrica = '';
var secciones;
var oSeccionAsignada;
var _oSeccion = new Secciones();
var bIsLoad = false;
var gblTipoNotas = new Array();
var gblIndex = 0;
var gblIndexCancel = 0;
var gblAgendaOT = new Array();
var ListaDisplay = new Array();
var gblValoresInciales;
var gblFecha = new Date();
var gblIdSeccionSem;
var gblidfabricaSem;
var gblidlocales;
var gbllstAgendaOT;
var videoActivo;
var PROCESOSWS;
var gblpathPage;

//En este script si la variable isFromMenu = 0  se entiende que se abrio la pagina de agenda
//diaria desde la agenda semanal, en caso de que asi sea se piden las demás variables
//cveOrdenTrabajo, Contenido, IdSeccion, idfabrica, idlocal, dtAgendaSemanal de lo contrario
//se carga la pagina tomando en cuenta la configuración de acceso del usuario
window.onload = function () { initialize(); }

function updateForm() {
    getAgendalocales();
}

function cambiaFechaOTPropuesta(vAgseNume, vFecha, vAgseOrig) {
    PROCESOSWS++;
    if (vAgseOrig == "O") //Para cuando es una OT
    {
        var data = new CambiaFechaOT(vAgseNume, vFecha, GenerateTransac());
        executeSyncRequest(wsMtdCambiaFechaOT, JSON.stringify(data, null, 2), successCambiaFechaOT, myErrorPro);
    }
    else //Para cuando es una Propuesta
    {
        var data = new CambiaFechaProp(vAgseNume, vFecha);
        executeSyncRequest(wsMtdCambiaFechaProp, JSON.stringify(data, null, 2), successCambiaFechaProp, myErrorPro);  
    }
}

var successCambiaFechaOT = function (data, status) {
    if (data.d != undefined)
        getAgendalocales();
}

var successCambiaFechaProp = function (data, status) {
    if (data.d != undefined) 
        getAgendalocales();
}

function myErrorPro(request, status, error) {
    PROCESOSWS--;
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}

$(function () {
    $("#FlowCopiar").dialog({ autoOpen: false, show: "blind", hide: "explode" });

    $("#btnCopiar").click(function () {
        $("#FlowCopiar").dialog("open");
        return false;
    });

    $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: 200,
        modal: true,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
                CancelaOTPropuesta($(this).attr('data-OT'), $(this).attr('data-type'));
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }
    });
});

function openMyModalAvances(theUri, title) {
    parent.openModalUpdatable(theUri, widthAvancesOT, heigthAvancesOT, title, this);   
}

var successCambiaTipoNotaOT = function (data, status) {
    if (data.d != undefined) 
        getAgendalocales();
}

var successCambiaTipoProp = function (data, status) {
    if (data.d != undefined) 
        getAgendalocales();
}

function CancelaOTPropuesta(vAgseNum, vAgseOrig) {
    if (vAgseOrig == "O") {
        var data = new CambiaEstatusOT(vAgseNum, '16', GenerateTransac());
        executeSyncRequest(wsMtdCambiaEstatusOT, JSON.stringify(data, null, 2), successCambiaEstatusOT, myError);
        
    } else {
        var data = "{'PropLlavPr':'" + vAgseNum + "'}"
        executeSyncRequest(wsMtdEliminarPropuesta, data, successEliminarPropuesta, myError);
    }
}

var successEliminarPropuesta = function (data, status) {
    if (data.d != undefined) {

        if (data.d.length > 0) {
            alertModal('La Propuesta: ' + data.d + ' se ha eliminado correctamente.');
            getAgendalocales();
          
        }
        else {
            alertModal('Hubo un error al eliminar la Propuesta');
        }
    }
}

var successCambiaEstatusOT = function (data, status) {
    if (data.d != undefined) {
        if (data.d.length > 0) {
            alertModal('La OT: ' + data.d + ' se ha eliminado correctamente.');
            getAgendalocales();
        }
        else {
            alertModal('Hubo un error al eliminar la OT');
        }
    }
}

function initialize() {
    try { 
     if ($("#chkCopyNoOT").prop('checked') == false) {
         $("#chkCopyNoOT").attr('checked', true);
     }
     if ($("#chkCopyTitulo").prop('checked') == false) {
         $("#chkCopyTitulo").attr('checked', true);
     }
     $("#cmbProduccion, #lblproduccion").hide();
     gblpathPage = '/FiatubeHTML5/Agendas/AgendaDiaria.aspx';
        Produccion = '';
        gblValoresInciales = getUrlVars();
        getLocalesAgendas(successLocales, myError);
        $("#cmbProduccion").hide();
        $("#lblProduccion").hide();
     
        if (gblValoresInciales["isFromMenu"] == 0) {
            vieneAgendaSemanal = true;
            $('#txtOT').val(gblValoresInciales["cveOrdenTrabajo"]);
            $('#txtTexto').val(gblValoresInciales["Contenido"]);
            gblIdSeccionSem = gblValoresInciales["IdSeccion"];
            gblidfabricaSem = gblValoresInciales["idfabrica"];
            gblidlocales = gblValoresInciales["idlocal"];
            var vFecha = gblValoresInciales["dtAgendaSemanal"].toString().replace(/-/i, "/").replace(/-/i, "/");
            var fechaIng = new Date(Date.parse(vFecha.split('/')[1] + '/' + vFecha.split('/')[0] + '/' + vFecha.split('/')[2]));
            $('#dtFecha').datepicker("setDate", fechaIng);
            _dtAgendaSemanal = $("#dtFecha").datepicker("getDate");
            fecha = _dtAgendaSemanal;
            $("#cmbLocales").val(gblidlocales);
            fncOcultaSecciones();
        } else {
            vieneAgendaSemanal = false;
           
        }
        loaded();
    }
    catch (Exception) {
        alertModal("Ocurrió un error al ejecutar la consulta");
    }
    $("#MainContent_btnSearch").click();
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });
    var localSeleccionar = getLocalSeleccionar();
    if (localSeleccionar) {
        $("#cmbSecciones").hide();
        $("#lblSeccion").hide();
    }

    $('#cmbLocales').val(localSeleccionar);
    fncOcultaSecciones();
}

function loaded() {
    if (vieneAgendaSemanal== true)
    {
        fecha = _dtAgendaSemanal;
        $('#dtFecha').datepicker("setDate", _dtAgendaSemanal);
    }
    else 
    {
        if ((jQuery.trim($("#dtFecha").val()) == '') || ($("#dtFecha").val() == undefined)) 
        {
            $('#dtFecha').datepicker("setDate", new Date());
            fecha = new Date();
        }
        else
            fecha = $("#dtFecha").datepicker("getDate");
    }
    $("#litDia2").empty();
    fecha = $("#dtFecha").datepicker("getDate");
    $("#litDia2").append(getTituloDia(fecha));
    gblFecha = fecha;
    getSeccionByEmpleado();
}

function getSeccionByEmpleado() {
    var data = "{ 'idEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdgetSeccionEmpl, data, successSeccEmpl, myError);
}
function BindTipoNotas(Secc_llav_pr) {
    var data = "{'idSeccion':'" + Secc_llav_pr + "'}";
    executeSyncRequest(wsMtdObtTiposNotaBySecc, data, successLlenaNotas, myError);
}

function getAgendalocales() {
    var selectedIndex = $('option:selected', '#cmbLocales').index();
    var selectedText = $('option:selected', '#cmbLocales').val();
}
var successLlenaNotas = function (data, status) {
    if (data.d != undefined) {
        unsNota = data.d;
    }
    getAgendalocales();

}
var successLlenaNotasGen = function (data, status) {
    if (data.d != undefined) {
        unsNotaGen = data.d;
    }
}

function llenaStkContent()
{

}

function FindIndexSourceNota(tnota, aNotaSource) {
    var vindex = -1;
    $.each(aNotaSource, function (index, buscaNota) {
        if (tnota.TinoLlPr == buscaNota.TinoLlPr) {
            vindex = index;
        }
    });  
    return vindex;
}

var successSeccEmpl = function (data, status) {
    if (data.d != undefined) {
        idSeccEmpl = data.d.CveSeccion;
        idSeccion = data.d.CveSeccion;
        oSeccionAsignada = data.d;
        if (data.d.CveSeccion != 8) {

            bindSecciones(fabrica);
        }
        else
            llenaProducciones();
    }
    else {
        bindSecciones(fabrica);
    }
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
}

function bindSecciones(factory) {
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeSyncRequest(wsMtdgetSecciones, data, successSecciones, myError);
}
function llenaProducciones() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdconsultaPrgEmpl, data, successLlenaProd, myError);
}

var successSecciones = function (data, status) {
    var cont = 0;
    secciones = data.d;
    $("#cmbSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {
            if (index == 0)
                $("#cmbSecciones").append('<option value="0">Todas...</option>');
            if (seccion.SeccLlPr == idSeccEmpl) {
                cont = index;
                idSeccion = seccion.SeccLlPr;
            }
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });

        if (vieneAgendaSemanal == true) {
            if (gblIdSeccionSem != undefined) {
                idSeccion = gblIdSeccionSem;
                $("#cmbSecciones").val(gblIdSeccionSem);
            }
            else {
                idSeccion = '';
                $("#cmbSecciones").prop('selectedIndex', 0);
            }
            vieneAgendaSemanal = false;
        } else {
            if (idSeccion != undefined) {
                $("#cmbSecciones").val(idSeccion);
            }
        }
    }
    else {
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');
    }
    if (idSeccion == '' || idSeccion == undefined)
        idSeccion = idSeccEmpl;
    else
        BindTipoNotas(idSeccion);
    getAgendalocales();
}

function FindIndexSourceSeccion(voSeccion, vlstseccion) { 
    var vindex = -1;
    $.each(vlstseccion, function (index, seccion) {
        if (voSeccion.SeccLlPr == seccion.SeccLlPr) {
            vindex = index;
        }
    });
    return vindex;
}

var successLlenaProd = function (data, status) {
    programas = data.d;
    $("#cmbProduccion").empty();
    $.each(programas, function (index, programa) {
        $("#cmbProduccion").append('<option value="' + programa.CvePrograma.CvePrograma + '">' + programa.CvePrograma.NombrePrograma + '</option>');
    });
    bindSecciones(fabrica);
}

function dtFecha_Changed() {
    if (jQuery.trim($("#dtFecha").val()) == '') {
        alertModal('El campo de Fecha no puede ir vacio');
        return false;
    } 
    else {
        fecha = $("#dtFecha").datepicker("getDate");
        btnActualizar_Click();
        gblFecha = $("#dtFecha").datepicker("getDate");
        $("#litDia2").empty();
        $("#litDia2").append(getTituloDia(gblFecha));
    }
}

function btnOTDetalle_Click() {

}

function btnDelete_Click() {

}

function btnImgeVideo_Click() {

}

function Permisos(vSeccion) { 
    var puestos = sessionStorage.userPuestos.split(",");
    var s =  sessionStorage.UserSeccion;
    var vResult = false;
    for (i=0; i<puestos.length; i++)
    {
        if (puestos[i] == "9")
            vResult = true;
        else{
            if (puestos[i] == "4" || puestos[i] == "5" || puestos[i] == "6")
                if (vSeccion == s)
                    vResult = true;
        }
    }
    return vResult;
}

function txtOT_KeyDown() {
    if (event.keyCode == '13') {
        btnActualizar_Click();
    }
}

function txtTexto_KeyDown() {
    if (event.keyCode == '13') {
        btnActualizar_Click();
    }
}

function btnMenuCopiar_Click() {
    $('#FlowCopiar').css("display", "block"); 
}

function btnComprar_Click() {    
    if (ValidaPermisosCompra() == false) {
        alertModal('No tiene permisos para realizar esta operación');
    } else {
        if ((ListaOT == undefined || ListaOT.length == 0) && (ListaProp == undefined || ListaProp.length == 0)) {
            alertModal('Necesita seleccionar al menos una casilla de compra');
        } else {            
            ValidaElementosCarrito(ListaOT, ListaProp);
        }
    }
}

function ValidaElementosCarrito(vListaOT, vListaProp) {
    var data = new ValidaElementosCarritoParaAdd(vListaOT, vListaProp);
    executeSyncRequest(wsMtdValidaElementosCarritoParaAdd, JSON.stringify(data, null, 2), successElementosCarrito, myError);
}

function foundOT(vCveOrdenTrabajo) {
    if (sessionStorage.usserCarritoOT != "undefined" && sessionStorage.usserCarritoOT.length > 0) {
        var vlistOT;
        vlistOT = eval('(' + sessionStorage.usserCarritoOT + ')');
        if (vlistOT.length > 0) {
            for (var k = 0; k < vlistOT.length; k++) {
                if (vlistOT[k].CveOrdenTrabajo == vCveOrdenTrabajo) {
                    return true;
                }
            }
        }
    }
    return false;
}

function foundProp(vCvePropuesta) {
    if (sessionStorage.usserCarritoProp != "undefined" && sessionStorage.usserCarritoProp.length > 0) {
        var vlistProp;
        vlistProp = eval('(' + sessionStorage.usserCarritoProp + ')');
        if (vlistProp.length > 0) {
            for (var k = 0; k < vlistProp.length; k++) {
                if (vlistProp[k].CvePropuesta == vCvePropuesta) {
                    return true;
                }
            }
        }
    }
    return false;
}

var successElementosCarrito = function (data, status) {    
    var status = false;
    if (data.d != undefined) {
        if ((data.d.ListaOT.length > 0) && (data.d.ListaProp.length > 0) && (data.d.OTEliminada == true || data.d.PropComprada == true)) {
            alertModal(CreateMessage(data.d.OTEliminada, data.d.PropComprada));
            return false;
        } else {
            if (data.d.OTEliminada == true || data.d.PropComprada == true) {
                alertModal(CreateMessage(data.d.OTEliminada, data.d.PropComprada));
            }
        }
        if (sessionStorage.usserCarritoOpen == "false") {
            sessionStorage.usserCarritoOT = "";
            sessionStorage.usserCarritoProp = "";
        }
        AddSessionCarritoOT(ListaOT);
        AddusserCarritoProp(ListaProp);
        if (sessionStorage.usserCarritoOpen == "false") {
            sessionStorage.usserCarritoOpen = "true";
            parent.openModal("Shopping Car/ShoppingCar.aspx?loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
        }
    }
}

function CreateMessage(vOTEliminada, vPropComprada) { 
    var Message = '';
    var causa = '';
    Message = "Algunos Elementos de ";
    if (vOTEliminada == true)
    {
        Message = Message + " OTs ";
        causa = causa + " Algunas OTs han sido eliminadas. ";
    }
    if (vOTEliminada == true && vPropComprada == true)
    {
        Message = Message  + " y ";
        causa = causa + " y ";
    }
    if (vPropComprada == true)
    {
        Message = Message + " Propuestas ";
        causa = causa + " Algunas Propuestas han sido Compradas. ";
    }
    Message = Message + " fueron eliminados debido a que " + causa + ". Por favor refresque la agenda";
    return Message;
}

function btnActualizar_Click() {
    $("#MainContent_btnSearch").click();
}

function cmbSecciones_SelectionChanged() {
    var selectedIndex = $('option:selected', '#cmbSecciones').index();
    
    if (selectedIndex != 0) 
        idSeccion = $('option:selected', '#cmbSecciones').val();
    else {
        if (oSeccionAsignada.CveSeccion == 8) 
            idSeccion = "1,2,3,4,6,7";
        else 
            idSeccion = "1,2,3,4,6,7,9";
    }
    if ((jQuery.trim($("#dtFecha").val()) == '') || ($("#dtFecha").val() == undefined)) {
        $('#dtFecha').datepicker("setDate", new Date());
        fecha = new Date();
    }
    else 
        fecha = $("#dtFecha").datepicker("getDate");

    ActualizaDatos();
}

function ActualizaDatos()
{
    BindTipoNotas(idSeccion);
    LlenaTituloAgendaDias(fecha);
}

function LlenaTituloAgendaDias(vfecha)
{
    $("#litDia2").empty();
    $("#litDia2").append(getTituloDia(vfecha));
}

function cmbProduccion_SelectionChanged() {
    Produccion = '';
    if (oSeccionAsignada.CveSeccion == 8) {
        Produccion = $("#cmbProduccion").val();
    }
    ActualizaDatos();
}

function FindIndexListSource(vOrig, vnumOTProp)
{
    var valIndex = -1;
    if (vOrig == "O")
    {
        $.each(ListaOT, function (index, oitem) {              
            if (oitem.CveOrdenTrabajo == vnumOTProp)
                valIndex = index;
        });
    }
    else
    {
        $.each(ListaProp, function (index, oitem) {
            if (oitem.CvePropuesta == vnumOTProp)
                valIndex = index;
        });
    }
    return valIndex;
}

function btnImprimir_Click() {
    var cadena = '';
    var selectedIndexSecc = $('option:selected', '#cmbSecciones').index();
    var selectedIndexProd = $('option:selected', '#cmbProduccion').index();
    if (jQuery.trim($("#txtTexto").val()) != '') {
        if (cadena != '') 
            cadena = cadena + "&Titulo=" + jQuery.trim($("#txtTexto").val());
        else 
            cadena = cadena + "Titulo=" + jQuery.trim($("#txtTexto").val());
    }
    if (jQuery.trim($("#txtTexto").val()) != '') {
        if (cadena != '') 
            cadena = cadena + "&Cvec=" + jQuery.trim($("#txtTexto").val());
        else 
            cadena = cadena + "Cvec=" + jQuery.trim($("#txtTexto").val());
    }
    if (selectedIndexSecc > 0) {
        if (cadena != '') 
            cadena = cadena + "&IdSecc=" +  $("#cmbSecciones").val();
        else 
            cadena = cadena + "IdSecc=" +  $("#cmbSecciones").val();
    }
    if (cadena != '') 
        cadena = cadena + "&Fecha=" + $("#dtFecha").val();
    else 
        cadena = cadena + "Fecha=" + $("#dtFecha").val();
    window.open('../../Impresiones/AgendaDiariaImprimir.aspx?' + cadena, 'ventana1', 'width=120,height=300,scrollbars=NO');
}

function litDia2_onmouseout(e) {
    this.style.cursor = 'default';
}

function litDia2_onmouseover(e) {
    this.style.cursor = 'pointer';
}

function doSomething(e) {
    var Boton = "images/iconos/bitacora.png";
    var Valor = $('option:selected', '#cmbSecciones').val();
    if (!e) var e = window.event;
    vContenido = "Agendas/BitacoraDiaria.aspx?dtAgendaDiaria=" + gblFecha.esMXFormat() + "&oLocal=" + $("#cmbLocales").val() + "&oSeccion=" + Valor + "&cveOrdenTrabajo=" + $("#txtOT").val() + "&textoBusqueda=" + $("#txtTexto").val() + '&isFromMenu=0';
    parent.openModal(vContenido, -1, -1, 'Bit&aacute;cora Diaria');

}

function fncOcultaSecciones() {
    if ($("#cmbLocales").val() != 36) {
        this.idSeccion = '';
        $("#cmbSecciones, #lblSeccion").hide();
        BindTipoNotas(114);
    } else {
        $("#cmbSecciones, #lblSeccion").show();
        if ($("#cmbSecciones").val() != undefined || $("#cmbSecciones").val() != null)
        BindTipoNotas($("#cmbSecciones").val());
    }
}

function cmbLocales_SelectionChanged() 
{
    fncOcultaSecciones();
    getAgendalocales();    
    btnActualizar_Click();
}

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}

function setFilters() 
{
    $("#MainContent_hiddLocv").val($('#cmbLocales').val());
    $("#MainContent_hiddLocl").val($('option:selected', '#cmbLocales').val());
    $("#MainContent_hiddSecc").val($("#cmbSecciones").val());
    $("#MainContent_hiddFecA").val($("#dtFecha").val());
    $("#MainContent_hiddText").val($("#txtTexto").val());
}

function applyEvents() {
    $("#MainContent_divGridAgenda").delegate(".linkAvance, .btnOTADiaria, .elemVerOT, .btnDuplicarAlone, .btnEliminarAloneCarrito, .tablegPlaylistAgendaDiariatTITLE, .ImgSizeAgendaDiaria", "mouseover", function () {
        this.style.cursor = 'pointer';
    });

    $("#MainContent_divGridAgenda").delegate(".btnOTADiaria, .elemVerOT, .tablegPlaylistAgendaDiariatTITLE", "click", function () {
        var vContenido = '';
        if ($("#divParent" + $(this).attr("data-index")).attr("data-type") == "O") {
            vContenido = "OT/OT.aspx?numOT=" + $("#divParent" + $(this).attr("data-index")).attr("data-OT");
            parent.openModal(vContenido, -1, -1, 'Actualizaci&oacute;n de OT: ' + $("#divParent" + $(this).attr("data-index")).attr("data-cveOT"));
        }
        else {
            vContenido = "Propuesta/CreaPropuesta.aspx?numProp=" + $("#divParent" + $(this).attr("data-index")).attr('data-OT');
            parent.openModal(vContenido, widthPropuesta, heigthPropuesta, 'Actualizaci&oacute;n de Propuesta: ' + $("#divParent" + $(this).attr("data-index")).attr("data-cveOT"));
        }
    });

    $("#MainContent_divGridAgenda").delegate(".ImgSizeAgendaDiaria", "click", function () {
        try {
            if (jQuery.trim($(this).attr("data-videoref")).length > 0) {
                videoActivo = $(this).attr("data-videoref");
                parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(this).attr('data-OT') + '&numProg=-1&uriVideo=' + $(this).attr("data-videoref") + '&uriImg=' + $(this).attr("data-Image") + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
            }
        }
        catch (ex) {
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "MonitorRecursosIngestion");
        }
    });

    $("#MainContent_divGridAgenda").delegate(".linkAvance", "click", function () {
        var title;
        var theUri = "OT/AvancesOT.aspx?advanceType=" + $(this).attr('data-type') + "&numOT=" + $(this).attr('data-numDat');
        theUri += "&title=" + $(this).attr('data-titu') + "&oCve=" + $(this).attr('data-oCve');

        if ($(this).attr('data-type') == 'O')
            title = 'Avances de OT: ' + $(this).attr('data-oCve');
        else
            'Avances de Propuesta: ' + $(this).attr('data-oCve');

        openMyModalAvances(theUri, title);
    });

    $(".toDatePicker").datepicker({ minDate: 0 });

    $("#MainContent_divGridAgenda").delegate(".toDatePicker", "change", function () {
        var vFechaActual = new Date();
        var vFechaActualIng = vFechaActual.esMXFormat();
        var fechaIng = new Date(Date.parse($(this).attr('data-Fecha').split('/')[1] + '/' + $(this).attr('data-Fecha').split('/')[0] + '/' + $(this).attr('data-Fecha').split('/')[2]));
        vFechaActualIng = new Date(Date.parse(vFechaActualIng.split('/')[1] + '/' + vFechaActualIng.split('/')[0] + '/' + vFechaActualIng.split('/')[2]));
        var vFechaGetDataPicker = $(this).datepicker("getDate").esMXFormat();
        vFechaGetDataPicker = new Date(Date.parse(vFechaGetDataPicker.split('/')[1] + '/' + vFechaGetDataPicker.split('/')[0] + '/' + vFechaGetDataPicker.split('/')[2]));
        var vFechaGetDataPickerControl = $('#dtFecha').datepicker("getDate").esMXFormat();
        vFechaGetDataPickerControl = new Date(Date.parse(vFechaGetDataPickerControl.split('/')[1] + '/' + vFechaGetDataPickerControl.split('/')[0] + '/' + vFechaGetDataPickerControl.split('/')[2]));

        if (Number(vFechaGetDataPicker) < Number(vFechaActualIng)) {
            alertModal('No se puede seleccionar una fecha menor a la Actual');
            return;
        } 
        else {
            if ((Number(vFechaGetDataPicker) > Number(vFechaActualIng)) && (Number(vFechaGetDataPickerControl) == Number(fechaIng))) {
                if (Permisos($(this).attr('data-CveSeccion')) == false) {
                    alertModal('No se puede reagendar la OT, debido a que no cuenta con los permisos necesarios, o no tiene acceso a esa sección');
                    return;
                } 
                else {
                    if (Number(vFechaGetDataPicker) > Number(vFechaActualIng)) {
                        cambiaFechaOTPropuesta($(this).attr('data-AgseNume'), $(this).datepicker("getDate"), $(this).attr('data-AgseOrig'));
                        return;
                    }
                }
            }

            if ((Number(vFechaGetDataPicker) == Number(vFechaActualIng)) && (Number(vFechaGetDataPickerControl) == Number(fechaIng)) && (Number(vFechaGetDataPickerControl) > Number(vFechaActualIng))) {
                if (Permisos($(this).attr('data-CveSeccion')) == false) {
                    alertModal('No se puede reagendar la OT, debido a que no cuenta con los permisos necesarios, o no tiene acceso a esa sección');
                } 
                else {
                    cambiaFechaOTPropuesta($(this).attr('data-AgseNume'), $(this).datepicker("getDate"), $(this).attr('data-AgseOrig'));
                    return;
                }
            }

            if ((Number(vFechaGetDataPicker) >= Number(vFechaActualIng)) && (Number(vFechaGetDataPickerControl) < Number(vFechaActualIng))) {
                if (Permisos($(this).attr('data-CveSeccion')) == false) {
                    alertModal('No se puede reagendar la OT, debido a que no cuenta con los permisos necesarios, o no tiene acceso a esa sección');
                    return;
                } 
                else {
                    if (Number(vFechaGetDataPicker) >= Number(vFechaActualIng)) {
                        cambiaFechaOTPropuesta($(this).attr('data-AgseNume'), $(this).datepicker("getDate"), $(this).attr('data-AgseOrig'));
                        return;
                    }
                }
            }
        }
    });

    $("#MainContent_divGridAgenda").delegate(".btnDuplicarAlone", "click", function () {
        var fooList = new Array();
        
        if (gblAgendaOT.length > 0) 
            fooList[0] = gblAgendaOT[$(this).attr("data-index")];
        else if (ListaDisplay.length > 0) 
            fooList = ListaDisplay;
        else 
            return false;

        var vCopy = "";
        for (i = 0; i < fooList.length; i++) {
            if ($("#chkCopyNoOT").prop('checked') == true && jQuery.trim(gblAgendaOT[$(this).attr("data-index")].OtraCvec) != '') 
                vCopy = vCopy + "\r\nOT: " + gblAgendaOT[$(this).attr("data-index")].OtraCvec;
            if ($("#chkCopyTitulo").prop('checked') == true && jQuery.trim(gblAgendaOT[$(this).attr("data-index")].AgseTitu) != '') 
                vCopy = vCopy + "\r\n" + gblAgendaOT[$(this).attr("data-index")].AgseTitu;
            if (window.clipboardData) 
                window.clipboardData.setData("Text", vCopy);// Internet Explorer
        }
    });

    $("#MainContent_divGridAgenda").delegate(".btnEliminarAloneCarrito", "click", function () {
        if (Permisos($("#divParent" + $(this).attr("data-index")).attr('data-secc')) == false)
            alertModal('No se puede borrar la OT, debido a que no cuenta con los permisos necesarios, o no tiene acceso a esa sección');
        else {
            gblIndexCancel = $(this).attr("data-index");
            $.each($("#dialog-confirm").children(), function (index, myDiv) {
                $(myDiv).empty();
            });
            var vConten = "";
            if ($("#divParent" + $(this).attr("data-index")).attr('data-type') == "P")
                vConten = "<div>¿Realmente desea eliminar la Propuesta: " + $("#divParent" + $(this).attr("data-index")).attr('data-cveOT') + "?</div>";
            else if ($("#divParent" + $(this).attr("data-index")).attr('data-type') == "O")
                vConten = "<div>¿Realmente desea eliminar la Orden de Trabajo: " + $("#divParent" + $(this).attr("data-index")).attr('data-cveOT') + "?</div>";

            $("#dialog-confirm").attr('data-OT', $("#divParent" + $(this).attr("data-index")).attr('data-OT'));
            $("#dialog-confirm").attr('data-type', $("#divParent" + $(this).attr("data-index")).attr('data-type'));
            $("#dialog-confirm").append(vConten);
            $("#dialog-confirm").dialog("open");
        }
    });

    $("#MainContent_divGridAgenda").delegate(".onchange", "change", function () {
        ListaOT = new Array();
        ListaProp = new Array();
        var valores = $(this).val().split(',');

        if ($(this)[0].checked == false) {
            var FechaAgenda = new Date();
            if (valores[0] == "O") {

                if (ListaOT != undefined) {
                    ListaOT.splice(FindIndexListSource(valores[0], valores[1]), 1);
                }
            } else {
                if (valores[0] == "P") {
                    if (ListaProp != undefined) {
                        ListaProp.splice(FindIndexListSource(valores[0], valores[1]), 1);

                    }
                }

            }
        }
        if (valores[0] == "O") {

            var oOT = new THE_OrdenTrabajo()
            oOT.CveOrdenTrabajo = new Number(valores[1]);
            oOT.ClaveOrdenTrabajo = valores[2];
            oOT.Titulo = valores[3];
            if (valores[valores.length - 3] != '') {
                FechaAgenda = ConvertToFormatDatetoIng(valores[valores.length - 3]);
            }

            oOT.FechaAgenda = new Date(Date.parse(FechaAgenda));

            var oSeccion = new TDI_Seccion();
            oSeccion.CveSeccion = new Number(valores[valores.length - 2]);
            var oTipoNota = new TDI_TipoNota();
            oTipoNota.CveTipoNota = new Number(valores[valores.length - 1]);
            oOT.CveSeccion = oSeccion;
            oOT.CveTipoNota = oTipoNota;
            if ($(this)[0].checked == true) {
                if (ListaOT == undefined) {
                    ListaOT = new Array();
                }
                if (ListaProp == undefined) {
                    ListaProp = new Array();
                }
                var bfound = false;

                if (ListaOT.length > 0) {
                    for (var i = 0; i < ListaOT.length; i++) {
                        if (Number(ListaOT[i].CveOrdenTrabajo) == Number(oOT.CveOrdenTrabajo)) {
                            bfound = true;
                        }
                    }
                    if (bfound == false) {
                        ListaOT.push(oOT);
                    }
                } else {
                    ListaOT.push(oOT);
                }
                if (bfound == false) {
                    btnComprar_Click();
                } else {
                    if (sessionStorage.usserCarritoOpen == "false") {
                        btnComprar_Click();
                    }
                }
            } else {
                //            Aqui va condigo que elimina del carrito de compras
            }
        } else {
            if (valores[0] == "P") {
                var oProp = new TDI_Propuesta();
                oProp.CvePropuesta = new Number(valores[1]);
                if (valores[4] != '') {
                    FechaAgenda = ConvertToFormatDatetoIng(valores[4]);
                }
                oProp.FechaAgenda = new Date(Date.parse(FechaAgenda));
                var oSeccion = new TDI_Seccion();
                oSeccion.CveSeccion = new Number(valores[5]);
                var oTipoNota = new TDI_TipoNota();
                oTipoNota.CveTipoNota = new Number(valores[6]);

                oProp.CveSeccion = oSeccion;
                oProp.CveTipoNota = oTipoNota;
                oProp.Titulo = valores[3];
                oProp.CveCable = new THE_Cable();
                oProp.CveCliente = new TDI_Cliente();
                oProp.CveEmpleado = new TDI_EMPL();
                oProp.CveEmpleado.EmpleadoLlavePrimaria = new Number(sessionStorage.numUsuario);
                oProp.CveFormato = new TDI_Formato();
                oProp.CvePuesto = new TDI_Puestos();
                if ($(this)[0].checked == true) {
                    if (ListaProp == undefined) {
                        ListaProp = new Array();
                    }
                    if (ListaOT == undefined) {
                        ListaOT = new Array();
                    }
                    var bfoundProp = false;
                    if (ListaProp.length > 0) {
                        for (var i = 0; i < ListaProp.length; i++) {
                            if (Number(ListaProp[i].CvePropuesta) == Number(oProp.CvePropuesta)) {
                                bfoundProp = true;
                            }
                        }

                        if (bfoundProp == false) {
                            ListaProp.push(oProp);
                        }
                    } else {
                        ListaProp.push(oProp);
                    }
                    if (bfoundProp == false) {
                        btnComprar_Click();
                    } else {
                        if (sessionStorage.usserCarritoOpen == "false") {
                            btnComprar_Click();
                        }
                    }
                } else {
                    //Aqui va elimina del condigo que involucra al carrito 
                }
            }
        }
    });

    var myOptions;
    $.each($("#MainContent_divGridAgenda .selectChange"), function (index, control) {
        myOptions = '';
        $.each(unsNota, function (index, Opt) {
            if ($(control).attr('data-tino') == Opt.TinoLlPr)
                myOptions = myOptions + "<option value='" + Opt.TinoLlPr + "' selected = 'selected'>" + Opt.TinoAbre + "</option>";
            else
                myOptions = myOptions + "<option value='" + Opt.TinoLlPr + "'>" + Opt.TinoAbre + "</option>";
        });

        $(this).append(myOptions);
    });

    $("#MainContent_divGridAgenda").delegate(".selectChange", "change", function () {

        //var selectedIndex = $('option:selected', $(this)).index();

        //var valores = $(this).val().split(',');
        //var vTipoNotas = gblTipoNotas[valores[1]];

        //        var tipoNotaActualLst = new Array();
        
        //        for (i = 0; i < gblTipoNotas[valores[1]].length; i++) {
        //            var vtipoNotaActualLst = new TDI_TipoNota();
        //            vtipoNotaActualLst.AbreviaturaTipoNota = vTipoNotas[i].TinoAbre;
        //            vtipoNotaActualLst.CveTipoNota = vTipoNotas[i].TinoLlPr;
        //            vtipoNotaActualLst.DescripcionTipoNota = vTipoNotas[i].TnoDesc;
        //            vtipoNotaActualLst.EstatusTipoNota = "A";
        //            tipoNotaActualLst[i] = vtipoNotaActualLst;
        //        }
        //        NewItemTdiSelected = tipoNotaActualLst[selectedIndex];


        //alert($("#divParent" + $(this).attr("data-index")).attr('data-type'));

        var NewItemTdiSelected = new TDI_TipoNota();
        NewItemTdiSelected.CveTipoNota = $(this).val();
        if ($("#divParent" + $(this).attr("data-index")).attr('data-type') == "O") {

            var data = new CambiaTipoNotaOT($("#divParent" + $(this).attr("data-index")).attr('data-OT'), NewItemTdiSelected, GenerateTransac());
            executeSyncRequest(wsMtdCambiaTipoNotaOT, JSON.stringify(data, null, 2), successCambiaTipoNotaOT, myError);
        }
        else if ($("#divParent" + $(this).attr("data-index")).attr('data-type') == "P") {
                NewTinoProp.CveTipoNota = NewItemTdiSelected.CveTipoNota;
                var data = new CambiaTinoProp($("#divParent" + $(this).attr("data-index")).attr('data-OT'), NewItemTdiSelected);
                executeSyncRequest(wsMtdCambiaTinoProp, JSON.stringify(data, null, 2), successCambiaTipoProp, myError);
            }
    });
}