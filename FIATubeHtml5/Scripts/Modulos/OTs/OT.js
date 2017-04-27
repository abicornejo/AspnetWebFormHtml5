
var arrSecciones = new Array();
var arrReporteros;
var arrCamarografos;
var arrReporterosFIA;
var arrCamarografosFIA;
var arrEditoresFIA;
var arrEditores;
var arrEstatus;
var initVars;
var oOrdenTrabajo = new THE_OrdenTrabajo();
var oAgendaSemanal = new THE_AgendaSemanal();
var oEquipoTrabajo = new THE_EquipoTrabajo();
var oLogistica;
var EVDT;
var Guardar = true;
var lstRptEqui = new Array();
var lstCamEqui;
var lstEdiEqui;
var lstTempLogistica;
var LstTransProg = new Array();
var addLogistica = false;
var editLogistica = false;
var FillFormAct = false;
var Duplicar = false;
var bActualiza = false;
var PROCESOSWS = 0;
var inOperation = false;
var gblSecciones;
var fabrica = '';
var NumOTOriginal = 0;
var gblTiposNota;
var _Empresa = 1;
var _numOT;
var ArrayEstatus;
var gblCveLogistica;
var gblsource;
var oTransProgramaReplica;
var gblnumColums;
var DatosToSendReplicar;
var gblRowActual;
var CountWaitEnvioCompletoINEWS;
var gblPantalla = false;
var ArrayReporteros;
var ArrayCamarografo;
var ArrEditores;
var gblContinuar = false;
var gblIndice;
var gblValores;
var gblIndexPlayList;
var gblInterval;
var oItemImage;
var arrOTAgenda;
var arrOTEquipo;
var arrOTLogistica;
var arrOTOrdenTrab;
var arrEstaEliminada;
var gblpathPage;
var gblCveseccionActualiza;
var gblCveSeccionEmpl;
var oDDReportero;
var oDDCamaro;
var oDDEditor;
var gblTempLogistica;
//Esta pantalla solo recibe un parametro numOT, si viene lleno carga el contenido de la pagina con el numero de la ot de lo
//contrario la carga para crear una OT nueva
window.onload = function () { initFunction(); }
function initFunction() {
    initialize();
    
}
$(document).ready(function () {
    $("#loading").ajaxStart(function () {
        $(this).show();
    });
    $("#loading").ajaxStop(function () {
        $(this).hide();
    });
    LlenaReporteros("#txtReportero");
    LlenaCamarografos("#txtCamaro");        

});
$(document).ready(function (e) {
    try {

        $("#lsbReporteros").msDropDown({ showIcon: true });
        $("#lsbCamaro").msDropDown({ showIcon: true });
        $("#lsbEditor").msDropDown({ showIcon: true });        
    } catch (e) {        
        alertModal(e.message);
    }
});
/*Se agrega la funcionalidad de autocomplete para el textbox de reporteros*/


function LlenaReporteros(control) {
    if ($("#cmbLocales").val() != 36) {
        $(control).autocomplete({ source: arrReporteros });
    } else {        
        $(control).autocomplete({ source: arrReporterosFIA });
    }
    
    if (control != "#txtReportero")
        return;
    $(control).each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';

        $(this).attr('id', formElementName + '_label');

        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        
        $(this).autocomplete({ source: arrReporteros,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
}


/*Se agrega la funcionalidad de autocomplete para el textbox de camarografos*/
function LlenaCamarografos(control) {

    if ($("#cmbLocales").val() != 36) {
        $(control).autocomplete({ source: arrCamarografos });
    } else {
        $(control).autocomplete({ source: arrCamarografosFIA });
    }
    if (control != "#txtCamaro")
        return;
    
    $(control).each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        $(this).attr('id', formElementName + '_label');
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrCamarografos,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
}

/*Se agrega la funcionalidad de autocomplete para el textbox de camarografos*/
function LlenaEditores(control) {

    if ($("#cmbLocales").val() != 36) {
        $(control).autocomplete({ source: arrEditores });
    } else {
        $(control).autocomplete({ source: arrEditoresFIA });
    }
    if (control != "#txtEditor")
        return;

    $(control).each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        $(this).attr('id', formElementName + '_label');
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrEditores,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
}



/*Se agrega la funcionalidad de autocomplete para el textbox de editores*/
$(function () {
    $("#txtEditor").autocomplete({ source: arrEditores });
    $("#txtEditor").each(function () {
        var autoCompelteElement = this;
        var formElementName = $(this).attr('id');
        var hiddenElementID = formElementName + '_hidden';
        $(this).attr('id', formElementName + '_label');
        $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
        $(this).autocomplete({ source: arrEditores,
            select: function (event, ui) {
                var selectedObj = ui.item;
                $(autoCompelteElement).val(selectedObj.label);
                $('#' + hiddenElementID).val(selectedObj.value);
                $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
                return false;
            }
        });
    });
});

$(function () {
    $("#GridProgTransmitir").delegate(".btnDuplicarAlone", "mouseout", function () {
        $(this).attr('style', 'cursor: default;');
    });
    $("#GridProgTransmitir").delegate(".btnDuplicarAlone", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
    });
    $("#GridProgTransmitir").delegate(".btnDuplicarAlone", "click", function () {
        try {
            var RowAct = 0;
            var vIdPrograma = $(this).attr('data-IdPrograma');
            var vPrograma = $(this).attr('data-Programa');
            var oTransmisionProg = gblsource[$(this).attr('data-indexSource')];
            for (var i = 0; i < LstTransProg.length; i++) {
                RowAct = i;
                if (i == this.id.split('_')[1]) {
                    oTransmisionProg = LstTransProg[i];
                    break;
                }
            }
            oTransProgramaReplica = oTransmisionProg;
            if (gblnumColums == 6) {
                var valorSelected = $('option:selected', '#cboRedactor_' + RowAct + '_1')[0].text;
                if (valorSelected != undefined) {
                    if (valorSelected.indexOf('SELECCIONE') == -1) {
                        AbreVentanaReplicar(vIdPrograma, vPrograma);
                    } else {
                        alertModal('No se puede Replicar una OT que no tiene asignado un redactor');
                    }
                }

            } else {

                AbreVentanaReplicar(vIdPrograma, vPrograma);
            }
        }
        catch (ex) {
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
        }
    });
    $("#GridProgTransmitir").delegate(".btniNewsAlone", "mouseout", function () {
        $(this).attr('style', 'cursor: default;');
    });
    $("#GridProgTransmitir").delegate(".btniNewsAlone", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
    });

    $("#GridProgTransmitir").delegate(".btniNewsAlone", "click", function () {

//        if (!inOperation) {
//            inOperation = true;
        try 
        {
//            PROCESOSWS++;
            //Codigo para Guardar Redactor
            var row = new Number(this.id.split('_')[1]);
            gblRowActual = row;
            GuardaOActualizaFOEPByiNEWs(row);
        }
        catch (ex) {
//            PROCESOSWS--;
//            inOperation = false;
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
        }
//        }
    });
    $("#GridProgTransmitir").delegate(".toDatePicker", "focusin", function () {
        $(this).datepicker({ minDate: 0, onSelect: function (dateText, inst) {

        }
        });
    });
    $("#GridProgTransmitir").delegate(".toDatePicker", "blur", function () {
        var vFechaActual = new Date();
        var vFechaActualIng = vFechaActual.esMXFormat();
        vFechaActualIng = new Date(Date.parse(vFechaActualIng.split('/')[1] + '/' + vFechaActualIng.split('/')[0] + '/' + vFechaActualIng.split('/')[2]));

        if ($(this).datepicker("getDate") < vFechaActualIng) {
            alertModal('No se puede seleccionar una fecha menor a la Actual');
            var fechaIng = new Date(Date.parse($(this).attr('data-Fecha').split('/')[1] + '/' + $(this).attr('data-Fecha').split('/')[0] + '/' + $(this).attr('data-Fecha').split('/')[2]));
            $(this).datepicker("setDate", fechaIng);
        }

    });
    $("#dgLogistica").delegate(".btnEliminarAlone", "click", function () {
        try {

            var vLogistica = new THE_Logistica();
            vLogistica.Lugar = $(this).attr('data-lugarDel');
            vLogistica.Objetivo = $(this).attr('data-Objetivo');
            vLogistica.FechaEvento = new Date(new Number($(this).attr('data-FechaEvento')));
            vLogistica.FechaFin = new Date(new Number($(this).attr('data-FechaFin')));
            vLogistica.Llamado = $(this).attr('data-llamado');
            if ($(this).attr('data-cveLogistica') != "") {
                vLogistica.CveLogistica = Number($(this).attr('data-cveLogistica'));
            }
            vLogistica.CveOrdenTrabajo = new THE_OrdenTrabajo();
            if ($(this).attr('data-CveOrdentrabajo') != "") {
                vLogistica.CveOrdenTrabajo.CveOrdenTrabajo = Number($(this).attr('data-CveOrdentrabajo'));
            }
            if ($(this).attr('data-ClaveOrdentrabajo') != "") {
                vLogistica.CveOrdenTrabajo.ClaveOrdentrabajo = $(this).attr('data-ClaveOrdentrabajo');
            }
            if ($(this).attr('data-cveLogistica') != "") {
                gblCveLogistica = Number($(this).attr('data-cveLogistica'));
            }

            var data = new BorraLogistica(vLogistica);
            executeRequest(wsMtdBorraLogistica, JSON.stringify(data, null, 2), successBorraLogistica, myErrorBorraLogistica);
        }
        catch (ex) {
            PROCESOSWS--;
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
        }
    });
    $("#dgLogistica").delegate(".btnEditarAlone", "click", function () {
        try {

            editLogistica = true;
            oLogistica = new THE_Logistica();
            oLogistica.Lugar = $(this).attr('data-lugarEd');
            oLogistica.Objetivo = $(this).attr('data-ObjetivoEd');
            oLogistica.FechaEvento = new Date(new Number($(this).attr('data-FechaEventoEd')));
            oLogistica.FechaFin = new Date(new Number($(this).attr('data-FechaFinEd')));
            oLogistica.Llamado = $(this).attr('data-llamadoEd');
            oLogistica.CveLogistica = $(this).attr('data-cveLogisticaEd');
            oLogistica.CveOrdenTrabajo = new THE_OrdenTrabajo();
            oLogistica.CveOrdenTrabajo.CveOrdenTrabajo = $(this).attr('data-CveOrdentrabajoEd');
            oLogistica.CveOrdenTrabajo.ClaveOrdentrabajo = $(this).attr('data-ClaveOrdentrabajoEd');
            $('#txtLugar').val(oLogistica.Lugar);
            $('#txtObservaciones').val(oLogistica.Objetivo);
            $('#dtFechaIni').datepicker("setDate", oLogistica.FechaEvento);
            $('#dtFechaFin').datepicker("setDate", oLogistica.FechaFin);

        }
        catch (ex) {
            PROCESOSWS--;
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
        }
    });
    $("#dgLogistica").delegate(".onchange", "change", function () {
        if ($(this).attr('data-CveOrdentrabajoCmb') != "0") {
            var vLogistica = new THE_Logistica();
            vLogistica.Lugar = $(this).attr('data-lugarCmb');
            vLogistica.Objetivo = $(this).attr('data-ObjetivoCmb');
            vLogistica.FechaEvento = new Date(new Number($(this).attr('data-FechaEventoCmb')));
            vLogistica.FechaFin = new Date(new Number($(this).attr('data-FechaFinCmb')));
            vLogistica.Llamado = $(this).attr('data-llamadoCmb');
            vLogistica.CveLogistica = $(this).attr('data-cveLogisticaCmb');
            vLogistica.CveOrdenTrabajo = new THE_OrdenTrabajo();
            vLogistica.CveOrdenTrabajo.CveOrdenTrabajo = $(this).attr('data-CveOrdentrabajoCmb');
            vLogistica.CveOrdenTrabajo.ClaveOrdentrabajo = $(this).attr('data-ClaveOrdentrabajoCmb');

            if (this.checked == true) {

                fncActualizaLogistica(vLogistica, 1);
            } else {
                fncActualizaLogistica(vLogistica, 0);
            }
        }
    });
    $("#dgPLayList").delegate(".onReprodVideo", "click", function () {
        try {
            if ($(this).attr('data-idvideo') != undefined && jQuery.trim($(this).attr('data-idvideo')).length > 0) {
                parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(this).attr('data-OT') + '&numProg=-1&uriVideo=' + $(this).attr('data-idvideo') + '&uriImg=' + $(this).attr('src') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
            }
        }
        catch (ex) {
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "MonitorRecursosIngestion");
        }
    });
    $("#dgPLayList").delegate(".onReprodVideo", "mouseout", function () {
        $(this).attr('style', 'cursor: default;');
        gblContinuar = false;
        clearInterval(gblInterval);
        gblIndice = 0;
    });
    $("#dgPLayList").delegate(".onReprodVideo", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
        gblContinuar = true;
        gblValores = $(this).attr('data-value').split('|');
        gblIndexPlayList = $(this).attr('data-index');
        gblIndice = 0;
        gblInterval = setInterval(function () {
            functionName()
        }, 1000);
    });
    function functionName(valor) {
        if (gblContinuar == true) {
            if (gblValores.length > 0) {
                //Obtiene el div contenedor de la cabacera y del que contiene toda la información, unicamente dos div
                $.each($("#dgPLayList").children(), function (index, myDiv) {
                    //Obtiene los divs del Contenido de la cabecera y de cada uno de los divs de cada registro
                    //Solo recorre el contenido la cabecera la ignora
                    if (index > 0) {
                        $.each($(myDiv).children(), function (indexCon, myDivCon) {
                            //Se situa en el registro 
                            if (indexCon == gblIndexPlayList) {
                                //Se verifica que contenga divs
                                if (myDivCon.children.length > 0) {
                                    //Se verifica que el primer div del registro exista
                                    if (myDivCon.children[0].children.length > 0) {
                                        myDivCon.children[0].children[0].src = gblValores[gblIndice];
                                        gblIndice = gblIndice + 1;
                                    }
                                }
                            }
                        });
                    }
                });
                if (gblIndice == gblValores.length) {
                    gblIndice = 0;
                }
            }
        }
    }
    $("#dialog-confirm").dialog({
        autoOpen: false,
        resizable: false,
        height: 140,
        modal: true,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            }
        }
    });
});
function fncActualizaLogistica(Logistica, val) {

    Logistica.Llamado = val;
    gblTempLogistica = Logistica;
    var data = new ActualizaLogistica(Logistica);
    executeRequest(wsMtdActualizaLogistica, JSON.stringify(data, null, 2), successActualizaLogistica, myErrorManejadorErrores);
}
function ActualizaInfoGrid(CveLogistica) {
    for (var i = 0; i < lstTempLogistica.length; i++) {
        if (lstTempLogistica[i].CveLogistica == CveLogistica) {
            lstTempLogistica[i].Lugar = $('#txtLugar').val();
            lstTempLogistica[i].Objetivo = $('#txtObservaciones').val();
            lstTempLogistica[i].FechaEvento = $("#dtFechaIni").datepicker("getDate");
            lstTempLogistica[i].FechaFin = $("#dtFechaFin").datepicker("getDate");
            break;
        }
    }
    $.each($("#dgLogistica").children(), function (index, myDivC) {
        $(myDivC).remove();
    });
    LlenadgLogistica();
}
function fncActualizaLogisticaTemp() {
    for (var i = 0; i < lstTempLogistica.length; i++) {
        if (lstTempLogistica[i].CveLogistica == gblTempLogistica.CveLogistica) {
            lstTempLogistica[i].Lugar = gblTempLogistica.Lugar;
            lstTempLogistica[i].Objetivo = gblTempLogistica.Objetivo;
            lstTempLogistica[i].FechaEvento = gblTempLogistica.FechaEvento;
            lstTempLogistica[i].FechaFin = gblTempLogistica.FechaFin;
            lstTempLogistica[i].Llamado = gblTempLogistica.Llamado;
            break;
        }
    }

}
var successActualizaLogistica = function (data, status) {
    try {
        if (data.d > 0) {
            fncActualizaLogisticaTemp();
            editLogistica = false;
            LimpiaCamposLogistica();
        }
        else {
            alertModal('Ocurrio un error al actualizar el campo');
        }
    }
    catch (ex) {
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function initialize() {
    initVars = getUrlVars();
    if (jQuery.trim(initVars["numOT"]).length > 0)
        bActualiza = true;
    $('#txtNumOT').append("No. OT: ");
    $('#txtStatus').append("Estado: ");
    gblpathPage = '/FiatubeHTML5/OT/OT.aspx';
    /*Se obtiene la informacion recibida mediante la URL de solicitud*/
    initVars = getUrlVars();
    if (jQuery.trim(initVars["numOT"]).length > 0)
        this.cargaLocales(true);
    else
        this.cargaLocales(false);
    _numOT = initVars["numOT"];
    $("#dtFechaAg").datepicker({ minDate: 0 });
    $('#dtFechaAg').datepicker("setDate", new Date());
    $('#dtFechaIni').datepicker("setDate", new Date());
    $('#dtFechaFin').datepicker("setDate", new Date());
    this.cmbSeccion_selectionChanged();
    $('#btnSenal').hide();
    if (jQuery.trim(_numOT).length > 0) {
        $("#cmbLocales").attr('disabled', 'disabled');
        Guardar = false;
        bActualiza = true;
        $('#btnAddLogistica').show();
    } else {
        bActualiza = false;
        fncEncdgPlayList();
        $('#btnAddLogistica').hide();
    }
    if (bActualiza) {
        numOTActualiza = _numOT;
        cmbLocales_SelectionChanged();
    } else {        
        bActualiza = false;
    }
    lstRptEqui = new Array();;
    lstCamEqui = new Array();
    lstEdiEqui = new Array();
    lstTempLogistica = new Array();
    oOrdenTrabajo = new THE_OrdenTrabajo();
    LoadReporteros();
    LoadCamarografos();
    LoadEditores();
    if (EVDT != undefined)
    { oOrdenTrabajo.CveEventoDeportivo = EVDT; }
    getSeccionByEmpleado();
    LoadEstatus();
    
    if (arrSecciones != undefined && arrReporteros != undefined && arrCamarografos != undefined && arrEditores != undefined && arrEstatus != undefined) {
        if (arrSecciones.length > 0 && arrReporteros.length > 0 && arrCamarografos.length > 0 && arrEditores.length > 0 && arrEstatus.length > 0) {
            gblPantalla = true;
            DatosToSendReplicar = new Datos_PantallaOT();
        }
    }
    $('#btnAddLogistica').show();
}
function LoadEstatus() {
    if (arrEstatus != undefined) {
        ArrayEstatus = new Array(arrEstatus.length);
        for (var j = 0; j < ArrayEstatus.length; j++) {
            ArrayEstatus[j] = new Array(2);
        }
        for (var i = 0; i < arrEstatus.length; i++) {
            ArrayEstatus[i][0] = arrEstatus[i].CveEstatus;
            ArrayEstatus[i][1] = arrEstatus[i].NombreEstatus;
        }
    }
}
function LoadReporteros() {
    if (arrReporteros != undefined) {
        ArrayReporteros = new Array(arrReporteros.length);
        for (var j = 0; j < ArrayReporteros.length; j++) {
            ArrayReporteros[j] = new Array(2);
        }
        for (var i = 0; i < arrReporteros.length; i++) {
            ArrayReporteros[i][0] = arrReporteros[i].value;
            ArrayReporteros[i][1] = arrReporteros[i].label;
        }
    }
}
function LoadCamarografos()
{
    if (arrCamarografos != undefined) {
        ArrayCamarografos = new Array(arrCamarografos.length);
        for (var j = 0; j < ArrayCamarografos.length; j++) {
            ArrayCamarografos[j] = new Array(2);
        }
        for (var i = 0; i < arrCamarografos.length; i++) {
            ArrayCamarografos[i][0] = arrCamarografos[i].value;
            ArrayCamarografos[i][1] = arrCamarografos[i].label;
        }
    }
}
function LoadEditores()
{
    if (arrEditores != undefined) {
        ArrayEditores = new Array(arrEditores.length);
        for (var j = 0; j < ArrayEditores.length; j++) {
            ArrayEditores[j] = new Array(2);
        }
        for (var i = 0; i < arrEditores.length; i++) {
            ArrayEditores[i][0] = arrEditores[i].value;
            ArrayEditores[i][1] = arrEditores[i].label;
        }
    }
}
function cargaLocales(isUpdate) {
    if (isUpdate == true)
        executeSyncRequest(wsMtdGetLocales, "{ }", successLocales, myError);
    else
        getLocales(successLocales, myError);
    
}
function fncdivOcultarCon() {
    if (($("#MainContent_cmbSeccion").val() == 8 || $("#MainContent_cmbSeccion").val() == 5) == true && $("#cmbLocales").val() == 36) {
        $("#MainContent_divOcultar").show();
        ShowCompraOT(true);
    }
    else {

        ShowCompraOT(true);
        $("#MainContent_divOcultar").hide();
    }

}
function cmbSeccion_selectionChanged() {
    try {
        /*Si es creacion de OT*/
        if (!bActualiza == true) {
            fncdivOcultarCon();
        }
        if (!FillFormAct) {
            this.getTipoNotaBySecc();
        }
    }
    catch (ex) {
        alertModal('Ocurrio un problema al cargar la informacion relacionada a la seccion seleccionada.' + ex.Description);
    }
}
function getTipoNotaBySecc() {
    var data = "{ 'idSeccion':" + $("#MainContent_cmbSeccion").val() + " }";
    executeRequest(wsMtdObtTiposNotaBySecc, data, successTipoNota, myError);
}
function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
}
function myErrorTransmitir(request, status, error) {   
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorGuardaOT(request, status, error) {
    
    alertModal('Ocurrio un problema al Guardar la OT: ' + error);
    inOperation = false;
    PROCESOSWS--;
}
var successTipoNota = function (data, status) {
    var tiposNota = data.d;
    gblTiposNota = tiposNota;
    $("#cmbTipoNota").empty();
    if (tiposNota.length > 0) {
        $("#cmbTipoNota").append('<option value="0">== SELECCIONE ==</option>');
        $.each(tiposNota, function (index, nota) {
            $("#cmbTipoNota").append('<option value="' + nota.TinoLlPr + '">' + nota.TnoDesc + '</option>');
        });
    }
    else {
        $("#cmbTipoNota").append('<option value="0">No hay registros...</option>');
    }
    if (gblPantalla == true && arrOTOrdenTrab != undefined && arrOTOrdenTrab.length > 0 && jQuery.trim(_numOT).length > 0) {
        FillFormaActualizar2();
    }
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
    if ($('#cmbLocales option').size() > 0) 
    {
        var localSeleccionar = getLocalSeleccionar();
        if (localSeleccionar) {
            $("#MainContent_cmbSeccion, #lblSeccion").hide();
        }
        $('#cmbLocales').val(localSeleccionar);
        fncBloqOrDesCmbporLocal();
        cmbLocales_SelectionChanged();
    }
}
function btnNuevo_Click() {
    this.cargaLocales(false);
    alertModalFunctionOKCancel("Se creará una nueva OT y se perderan los datos que no hayan sido guardados. ¿Desea continuar?", Nueva_OT);

}
var Nueva_OT = function () {
    try {
        oOrdenTrabajo = new THE_OrdenTrabajo();
        oAgendaSemanal = new THE_AgendaSemanal();
        oEquipoTrabajo = new THE_EquipoTrabajo();
        oLogistica = new THE_Logistica();
        arrOTAgenda = new Array();
        arrOTEquipo = new Array();
        arrOTOrdenTrab = new Array();
        arrOTLogistica = new Array()
        arrEstaEliminada = undefined;
        if (EVDT != undefined)
            oOrdenTrabajo.CveEventoDeportivo = EVDT;
        Guardar = true;
        $.each($("#dgPLayList").children(), function (index, myDiv) {
            $(myDiv).remove();
        });
        fncEncdgPlayList();
        $("#cmbLocales").attr('disabled', false);
        $("#txtTitulo").val("");
        $("#txtObjetivo").val("");
        $("#txtTeaser").val("");
        $("#dtFechaAg").datepicker({ minDate: 0 });
        $('#dtFechaAg').datepicker("setDate", new Date());
        $("#cmbSeccion").attr('disabled', "''");
        lstRptEqui = new Array();
        lstCamEqui = new Array();
        lstEdiEqui = new Array();
        lstTempLogistica = new Array();


        $("#cmbTipoNota").prop('selectedIndex', 0);
        $("#txtNumOT").empty();
        $("#txtNumOT").append('No. OT: ');
        $("#txtStatus").empty();
        $("#txtStatus").append('Estado: ');
        $("#txtReportero").val("");
        $('#txtReportero_label').val("");
        $("#txtCamaro").val("");
        $("#txtCamaro_label").val("");
        $("#txtEditor").val("");
        $("#txtEditor_label").val("");

        if ($('#lsbReporteros option').size() > 0) {
            var sizeInd = $('#lsbReporteros option').size();
            for (var i = 0; i < sizeInd; i++) {
                var oHandler = $('#lsbReporteros').msDropDown().data("dd");
                oHandler.remove(0);
            }
        }
        if ($('#lsbCamaro option').size() > 0) {
            var sizeInd = $('#lsbCamaro option').size();
            for (var i = 0; i < sizeInd; i++) {
                var oHandler = $('#lsbCamaro').msDropDown().data("dd");
                oHandler.remove(0);
            }
        }
        if ($('#lsbEditor option').size() > 0) {
            var sizeInd = $('#lsbEditor option').size();
            for (var i = 0; i < sizeInd; i++) {
                var oHandler = $('#lsbEditor').msDropDown().data("dd");
                oHandler.remove(0);
            }
        }

        oDDReportero = undefined;
        oDDCamaro = undefined;
        oDDEditor = undefined;
        $.each($("#dgLogistica").children(), function (index, myDiv) {
            $(myDiv).remove();

        });
        $("#dtFechaFin").datepicker({ minDate: 0 });
        $('#dtFechaFin').datepicker("setDate", new Date());
        $('#dtFechaIni').datepicker("setDate", new Date());
        $('#txtLugar').val("");
        $('#txtObservaciones').val("");
        LstTransProg = new Array();
        $.each($("#GridProgTransmitir").children(), function (index, myDiv) {

            $(myDiv).remove();
        });
        $.each($("#dgLogistica").children(), function (index, myDivC) {
            $(myDivC).remove();
        });

        fncEncabezadodgLogistica();
        addLogistica = false;
        editLogistica = false;
        bActualiza = false;
        FillFormAct = false;
        Duplicar = false;
        var UsuarioSeccion = sessionStorage.UserSeccion;
        var oSecc = new TDI_Seccion();
        if (gblSecciones.CveSeccion == UsuarioSeccion) {
            oSecc = gblSecciones;
        }
        $('#MainContent_cmbSeccion').val(oSecc.CveSeccion);
        if (oSecc.CveSeccion == 8 && $("#cmbLocales").val() == 36) {
            $("#MainContent_divOcultar").show();
        }
        if (ValidaMultiplesSecciones() == true) {
            $("#MainContent_cmbSeccion").removeAttr("disabled");

        } else {
            $("#MainContent_cmbSeccion").attr("disabled", "disabled");
        }

        //La Local se desbloquea cuando es nuevo de lo contrario se bloquea
        $("#cmbLocales").removeAttr("disabled");
        //La no ta siempre permanece activa
        $("#cmbTipoNota").removeAttr("disabled");
        //La producción solo se bloquea cuando es una actualización de OT
        $("#MainContent_cmbProduccion").removeAttr("disabled");
        $("#MainContent_cmbFormato").removeAttr("disabled");
        $('#MainContent_cmbProduccion').val(0);
        parent.RenameWindow(initVars["windowId"], "Crear");
        cmbLocales_SelectionChanged();
    }
    catch (Exception) {
        alertModal('Error al crear la nueva OT');
    }
};

function btnSenal_Click() {
    var vContenido = "";
    if (oOrdenTrabajo.CveOrdenTrabajo > 0) {
        vContenido = "Ingestion/NuevaIngestion.aspx?IdOrdenTrabajo=" + OrdenTrabajo.CveOrdenTrabajo;
        parent.openModal(vContenido, widthNuevaIngestion, heigthNuevaIngestion, 'Ingesti&oacute;n');
    }
}
function btnGuardar_Click()
{
    try {
       
     
            inOperation = true;
            var CveLocales = $('option:selected', '#cmbLocales').val();            
            if (CveLocales == 36)
            {
                if (!ValidaMultiplesSecciones() && !(sessionStorage.UserSeccion == $('option:selected', '#MainContent_cmbSeccion').val()))
                {
                    alertModal("No tiene permisos para realizar esta operación. La OT pertenece a una sección en la cual no tiene privilegios");
                    return false;
                }  
            }         
            if (ValidaPermisosGuardaDuplica(sessionStorage.userPuestos)==false) {
                alertModal("No tiene permisos para realizar esta operación");
                return false;
            }
            if (ValidaCampos() == true) {
                
                CreaObjetoOT();
             } else {
                    
                inOperation = false;
                PROCESOSWS = PROCESOSWS - 1;
            }
   
    } catch (Exception) { 
        alertModal("Error al Guardar la información...")
    }
}

function ValidaCampos() {
    var CveSeccion = $('option:selected', '#MainContent_cmbSeccion').val();
    var CveLocales = $('option:selected', '#cmbLocales').val();
   
    if (CveLocales == 36) {
        if (CveSeccion == 8 || CveSeccion == 5) 
            return ValidacionProducciones();  
        else 
            return ValidacionBasica();
    } 
    else 
        return validacionNoAjusco();
}
function getCveEmpleadoSecc() {
    var valor = 0;

    var vIdSeccion = $('option:selected', '#MainContent_cmbSeccion').val(); 
    for (var i = 0; i < arrSecciones.length; i++) {
        if (arrSecciones[i].Clave == vIdSeccion) {
            valor = arrSecciones[i].Empleado;
    
            return valor;

        }
    }
 
    return valor;
}
function CreaObjetoOT() {
    try {
        PROCESOSWS++;
        if (ValidaCampos() == true) {
            if (Guardar == true) {
                
                oOrdenTrabajo = new THE_OrdenTrabajo();
                if (EVDT != undefined) {
                    oOrdenTrabajo.CveEventoDeportivo = EVDT;
                } else {
                    oOrdenTrabajo.CveEventoDeportivo = null;
                }
            }
           
            var cveEmpl = getCveEmpleadoSecc();

            var oSeccion = new TDI_Seccion();
            var oEmpleado = new TDI_EMPL();
            var oCliente = new TDI_Cliente();
            if (oOrdenTrabajo == undefined) {
                oOrdenTrabajo = new THE_OrdenTrabajo();
            }
            oOrdenTrabajo.Titulo = jQuery.trim($("#txtTitulo").val());
            oOrdenTrabajo.Objetivo = jQuery.trim($("#txtObjetivo").val());
            oOrdenTrabajo.Teaser = jQuery.trim($("#txtTeaser").val());
            oOrdenTrabajo.HistoryLine = jQuery.trim($("#txtObjetivo").val());

            if (Duplicar) {
                oOrdenTrabajo.Origen = new Number(NumOTOriginal);
            }
            oOrdenTrabajo.Usuario = sessionStorage.userName;

            if ($('option:selected', '#cmbLocales').val() == 36) {
                oOrdenTrabajo.CveOrigen = new TDI_Origen(1);
                oSeccion.CveSeccion = Number($('option:selected', '#MainContent_cmbSeccion').val());
                oOrdenTrabajo.Empresa = new TDI_Empresa();
                oOrdenTrabajo.Empresa.CveEmpresa = _Empresa;
                oOrdenTrabajo.FabrLlave = new TDI_Fabrica(4);               

            } else {
                oSeccion.CveSeccion = 114;
                oOrdenTrabajo.CveOrigen = new TDI_Origen(6);
                if (gblCveSeccionEmpl != undefined && bActualiza== true) {
                    cveEmpl = gblCveSeccionEmpl;
                }

            }
            
            var vEmplSecc = new TDI_EMPL;
            vEmplSecc.EmpleadoLlavePrimaria = cveEmpl;
            oSeccion.EmpleadoLlavePrimaria = vEmplSecc;
            oOrdenTrabajo.CveSeccion = oSeccion;
            oEmpleado.EmpleadoLlavePrimaria = cveEmpl;
            oOrdenTrabajo.CveEmpleado = oEmpleado;
            var oTempTipoNota = new TipoNota();
            var oTipoNota = new TDI_TipoNota();
            var vIdTipoNota = $('option:selected', '#cmbTipoNota').val();
            $.each(gblTiposNota, function (index, nota) {
                if (nota.TinoLlPr == vIdTipoNota) {
                    oTipoNota.CveTipoNota = nota.TinoLlPr;
                    oTipoNota.DescripcionTipoNota = nota.TnoDesc;
                    oTipoNota.AbreviaturaTipoNota = nota.TinoAbre;
                }
            });
            
            oOrdenTrabajo.CveTipoNota = oTipoNota;
            oOrdenTrabajo.FechaEvento = new Date($("#dtFechaAg").datepicker("getDate"));
//            var oCveOrigen = new TDI_Origen();
//            oCveOrigen.CveOrigen = 1;
//            oOrdenTrabajo.CveOrigen = oCveOrigen;
            if (Guardar == true) {
                oAgendaSemanal = new THE_AgendaSemanal();
            } else {
                if (bActualiza == true) {
                    oAgendaSemanal.FechaInicio2 = new Date($("#dtFechaAg").datepicker("getDate"));
                }
            
            }
            oAgendaSemanal.FechaInicio = $("#dtFechaAg").datepicker("getDate").esMXFormat();            
            oAgendaSemanal.Origen = "O";
            oAgendaSemanal.Estatus = "A";
            oAgendaSemanal.CveSeccion = oOrdenTrabajo.CveSeccion;
            oAgendaSemanal.CveTipoNota = oOrdenTrabajo.CveTipoNota;
            oAgendaSemanal.Titulo = oOrdenTrabajo.Titulo;
            oAgendaSemanal.FechaCreacion = new Date();
            if (oAgendaSemanal.FechaInicio2 != null && oAgendaSemanal.FechaInicio2 != undefined && oAgendaSemanal.FechaInicio2.toString().indexOf('/Date') >= 0) {
                var vFechaInicio2 = new Date(new Number(oAgendaSemanal.FechaInicio2.substr(6, 13)));
                oAgendaSemanal.FechaInicio2 = vFechaInicio2;
            }
            
            oEquipoTrabajo = new THE_EquipoTrabajo();
            var oPuestosRpt = new TDI_Puestos();
            var oPuestosCam = new TDI_Puestos();
            var oPuestosEdi = new TDI_Puestos();
            var lstEquipo = Array();
            var fooPrograma = new TDI_Programa();
            fooPrograma.CvePrograma = 0;
            oPuestosRpt.PuestoLlavePrimaria = 1;
            var bTieneReportCamaro = false;
            if ($('#lsbReporteros option').size() > 0) {
                $("#lsbReporteros option").each(function () {
                    var emp = new TDI_EMPL();
                    emp.EmpleadoLlavePrimaria = this.value;
                    oEquipoTrabajo = new THE_EquipoTrabajo();
                    oEquipoTrabajo.EmpleadoLlavePrimaria = emp;
                    oEquipoTrabajo.CveEquipoTrabajo = 0;
                    oEquipoTrabajo.PuestoLlavePrimaria = oPuestosRpt;
                    oEquipoTrabajo.CvePrograma = fooPrograma;
                    lstEquipo.push(oEquipoTrabajo);
                    bTieneReportCamaro = true;
                });

            }
            oPuestosCam.PuestoLlavePrimaria = 2;
            if ($('#lsbCamaro option').size() > 0) {
                $("#lsbCamaro option").each(function () {
                    var emp = new TDI_EMPL();
                    emp.EmpleadoLlavePrimaria = this.value;
                    oEquipoTrabajo = new THE_EquipoTrabajo();
                    oEquipoTrabajo.EmpleadoLlavePrimaria = emp;
                    oEquipoTrabajo.CveEquipoTrabajo = 0;
                    oEquipoTrabajo.PuestoLlavePrimaria = oPuestosCam;
                    oEquipoTrabajo.CvePrograma = fooPrograma;
                    lstEquipo.push(oEquipoTrabajo);
                    bTieneReportCamaro = true;
                });
            }
            if (bTieneReportCamaro == true) {
                oOrdenTrabajo.Estatus = "2";
            } else {
                oOrdenTrabajo.Estatus = "1";
            }
            oPuestosEdi.PuestoLlavePrimaria = 94;
            if ($('#lsbEditor option').size() > 0) {
                $("#lsbEditor option").each(function () {
                    var emp = new TDI_EMPL();
                    emp.EmpleadoLlavePrimaria = this.value;
                    oEquipoTrabajo = new THE_EquipoTrabajo();
                    oEquipoTrabajo.EmpleadoLlavePrimaria = emp;
                    oEquipoTrabajo.CveEquipoTrabajo = 0;
                    oEquipoTrabajo.PuestoLlavePrimaria = oPuestosEdi;
                    oEquipoTrabajo.CvePrograma = fooPrograma;
                    lstEquipo.push(oEquipoTrabajo);
                });
            }
            
            //Se agrega el empleado que crea la OT
            oOrdenTrabajo.EmplCrea = new TDI_EMPL();
            oOrdenTrabajo.EmplCrea.EmpleadoLlavePrimaria = sessionStorage.numUsuario;
            //Se agrega la local 
            var vLocal = new TDI_Local();
            vLocal.LocalLlave = $('option:selected', '#cmbLocales').val();
            vLocal.LocalDescripcion = $('option:selected', '#cmbLocales')[0].text;
            oOrdenTrabajo.Local = vLocal;
            //Se asigna la empresa
            if (oOrdenTrabajo.Local.LocalLlave == 36)
            //Pertenece a Ajusco
            {
                oOrdenTrabajo.Empresa = new TDI_Empresa();
                oOrdenTrabajo.Empresa.CveEmpresa = _Empresa;                
                oOrdenTrabajo.FabrLlave = new TDI_Fabrica(4);
            } //Noticias
            //Pertenece a locales
            else {
                oOrdenTrabajo.Empresa = new TDI_Empresa();
                oOrdenTrabajo.Empresa.CveEmpresa = 5;
                oOrdenTrabajo.FabrLlave = new TDI_Fabrica(4);
            } //Locales
            if (oOrdenTrabajo.FechaAgenda != null && oOrdenTrabajo.FechaAgenda != undefined) {
                if (oOrdenTrabajo.FechaAgenda.toString().indexOf('/Date') >= 0) {
                    var vFechaAgenda1 = new Date(new Number(oOrdenTrabajo.FechaAgenda.substr(6, 13)));
                    oOrdenTrabajo.FechaAgenda = vFechaAgenda1;
                }
            }
            if (oOrdenTrabajo.Programa != null && oOrdenTrabajo.Programa != undefined) {
                if (oOrdenTrabajo.Programa.FechaFin != undefined && oOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                    var vFechaFin1 = new Date(new Number(oOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                    oOrdenTrabajo.Programa.FechaFin = vFechaFin1;
                }
                if (oOrdenTrabajo.Programa.FechaInicio != undefined && oOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                    var vFechaInicio1 = new Date(new Number(oOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                    oOrdenTrabajo.Programa.FechaInicio = vFechaInicio1;
                }
            }
            if (oOrdenTrabajo.CveEventoDeportivo != null && oOrdenTrabajo.CveEventoDeportivo != undefined)
            {
                if (oOrdenTrabajo.CveEventoDeportivo.dtFechaFin != undefined && oOrdenTrabajo.CveEventoDeportivo.dtFechaFin.toString().indexOf('/Date') >= 0) {
                    var vdtFechaFin1 = new Date(new Number(oOrdenTrabajo.CveEventoDeportivo.dtFechaFin.substr(6, 13)));
                    oOrdenTrabajo.CveEventoDeportivo.dtFechaFin = vdtFechaFin1;
                }
                if (oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio != undefined && oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio.toString().indexOf('/Date') >= 0) {
                    var vdtFechaInicio1 = new Date(new Number(oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio.substr(6, 13)));
                    oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio = vdtFechaInicio1;
                }
            }
            
            if (oOrdenTrabajo.FabrLlave != null && oOrdenTrabajo.FabrLlave != undefined && oOrdenTrabajo.FabrLlave.Programa != undefined) {
                oOrdenTrabajo.FabrLlave.Programa = undefined;
            }
            if (oOrdenTrabajo.FechaEntregaEspectaculos !=null && oOrdenTrabajo.FechaEntregaEspectaculos != undefined && oOrdenTrabajo.FechaEntregaEspectaculos.toString().indexOf('/Date') >= 0) {
                var vFechaEntrega = new Date(new Number(oOrdenTrabajo.FechaEntregaEspectaculos.substr(6, 13)));
                oOrdenTrabajo.FechaEntregaEspectaculos = vFechaEntrega;
            }

            if ((oOrdenTrabajo.CveSeccion.CveSeccion == 8) || (oOrdenTrabajo.CveSeccion.CveSeccion == 5) || oOrdenTrabajo.Local.LocalLlave != 36)//Cuando es seccion Programas
            //La sección es 8 ó 5
            {
                //Se agrega el programa
                if (Guardar == true) {
                    oOrdenTrabajo.Programa = new TDI_Programa();
                    oOrdenTrabajo.Programa.CvePrograma = $('option:selected', '#MainContent_cmbProduccion').val();
                }
                //Se valida si se actualiza o si se realiza la compra
                if (bActualiza == true)
                //Se actualiza
                {   
                    var data = new AlmacenaDatosOrdenTrabajo(cveEmpl, LlenaLogistica(), oOrdenTrabajo, oAgendaSemanal, lstEquipo, Guardar, GenerateTransac());
                    executeRequest(wsMtdAlmacenaDatosOrdenTrabajo, JSON.stringify(data, null, 2), successAlmacenaDatosOrdenTrabajo, myErrorGuardaOT);
                }
                else
                //Se realiza la compra
                {
                    var data = new AlmacenaDatosOrdenTrabajoCompra(cveEmpl, sessionStorage.userName, LlenaComprasOT(), LlenaLogistica(), oOrdenTrabajo, oAgendaSemanal, lstEquipo, Guardar, GenerateTransac());
                    executeRequest(wsMtdAlmacenaDatosOrdenTrabajoCompra, JSON.stringify(data, null, 2), successAlmacenaDatosOrdenTrabajoCompra, myErrorGuardaOT);
                }
            }
            else
            //La sección es diferente de 8 ó 5
            {
              
                //Se inicializa el programa
                if (bActualiza == false) {
                    var data = new AlmacenaDatosOrdenTrabajo(cveEmpl, LlenaLogistica(), oOrdenTrabajo, oAgendaSemanal, lstEquipo, Guardar, GenerateTransac());
                    executeRequest(wsMtdAlmacenaDatosOrdenTrabajo, JSON.stringify(data, null, 2), successAlmacenaDatosOrdenTrabajo, myErrorGuardaOT);
                } else {
                    var data = new AlmacenaDatosOrdenTrabajo(cveEmpl, LlenaLogistica(), oOrdenTrabajo, oAgendaSemanal, lstEquipo, Guardar, GenerateTransac());
                    executeRequest(wsMtdAlmacenaDatosOrdenTrabajo, JSON.stringify(data, null, 2), successAlmacenaDatosOrdenTrabajo, myErrorGuardaOT);
                }
            }
        }
        else {
            inOperation = false;
            PROCESOSWS--;
        }
    } catch (Exception) {
    alertModal(Exception);
        inOperation = false;
        PROCESOSWS--;        
    }
}
var successAlmacenaDatosOrdenTrabajo = function (data, status) {
    try {

        if (data.d != undefined) {
            oOrdenTrabajo = data.d.oOrdenTrabajo;
            if (oOrdenTrabajo.FechaAgenda == undefined && data.d.oAgendaSemanal != undefined) {
                if (data.d.oAgendaSemanal.FechaInicio != null && data.d.oAgendaSemanal.FechaInicio != undefined && data.d.oAgendaSemanal.FechaInicio.toString().indexOf('/Date') >= 0) {
                    var vFechaAgenda1 = new Date(new Number(data.d.oAgendaSemanal.FechaInicio.substr(6, 13)));
                    oOrdenTrabajo.FechaAgenda = vFechaAgenda1;
                }
            } else {
                if (data.d.oAgendaSemanal.FechaInicio != null && data.d.oAgendaSemanal.FechaInicio != undefined) {
                    oOrdenTrabajo.FechaAgenda = new Date(Date.parse(ConvertToFormatDatetoIng(data.d.oAgendaSemanal.FechaInicio)));
                }
            }
            if (oOrdenTrabajo.FechaEvento != null && oOrdenTrabajo.FechaEvento != undefined && oOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
                var vFechaAge;
                vFechaAge = new Date(new Number(oOrdenTrabajo.FechaEvento.substr(6, 13)));
                oOrdenTrabajo.FechaEvento = vFechaAge;
            }

            if (oOrdenTrabajo.Programa != null && oOrdenTrabajo.Programa != undefined) {
                if (oOrdenTrabajo.Programa.FechaFin != null && oOrdenTrabajo.Programa.FechaFin != undefined && oOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                    var vFechaFin = new Date(new Number(oOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                    oOrdenTrabajo.Programa.FechaFin = vFechaFin;
                }
                if (oOrdenTrabajo.Programa.FechaInicio != null && oOrdenTrabajo.Programa.FechaInicio != undefined && oOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                    var vFechaInicio = new Date(new Number(oOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                    oOrdenTrabajo.Programa.FechaInicio = vFechaInicio;
                }

            }
            if (oOrdenTrabajo.CveEventoDeportivo != null && oOrdenTrabajo.CveEventoDeportivo != undefined) {
                var vdtFechaFin;
                var vdtFechaInicio;
                if (oOrdenTrabajo.CveEventoDeportivo.dtFechaFin != null && oOrdenTrabajo.CveEventoDeportivo.dtFechaFin != undefined && oOrdenTrabajo.CveEventoDeportivo.dtFechaFin.toString().indexOf('/Date') >= 0) {
                    vdtFechaFin = new Date(new Number(oOrdenTrabajo.CveEventoDeportivo.dtFechaFin.substr(6, 13)));
                    oOrdenTrabajo.CveEventoDeportivo.dtFechaFin = vdtFechaFin;
                }
                if (oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio != null && oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio != undefined && oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio.toString().indexOf('/Date') >= 0) {
                    vdtFechaInicio = new Date(new Number(oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio.substr(6, 13)));
                    oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio = vdtFechaInicio;
                }

            }
            oAgendaSemanal = data.d.oAgendaSemanal;
            numOTActualiza = oOrdenTrabajo.CveOrdenTrabajo;
            if (!Guardar) //Si es Actualizar la OT
            {
                ConsultaProgramasTransmitir();
                alertModal('La orden de trabajo ha sido actualizada.');
            }
            if (Guardar) {
                inOperation = false;

                switch (oOrdenTrabajo.IndiceValidacionInsercion) {
                    case 0:
                        break;
                    case 1:
                        alertModal('No se guardo la Orden de trabajo, por favor vuelva a intentar guardar.');
                        break;
                    case 2:
                        alertModal('No se puede generar una clave para la orden de trabajo creada.');
                        break;
                    case 3:
                        alertModal('No se agendo la orden de trabajo.');
                        break;
                    case 4:
                        alertModal('No se actualizo la orden de trabajo.');
                        break;
                    case 5:
                        alertModal('No se actualizo la agenda.');
                        break;
                    case 6:
                        alertModal('No se puede eliminar el equipo de trabajo.');
                        break;
                    case 7:
                        alertModal('No se guardo el equipo de trabajo.');
                        break;
                    default:                        
                        break;
                }
            }
            else {                
                inOperation = false;
            }

        } else {
            inOperation = false;
        }


        parent.RenameWindow(initVars["windowId"], 'Actualización de OT: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
        $("#txtNumOT").empty();
        $('#txtNumOT').append("No. OT: " + oOrdenTrabajo.ClaveOrdenTrabajo);
        $('#txtStatus').empty();
        $('#txtStatus').append("Estado: " + GetEstatusByIdEstatus(oOrdenTrabajo.Estatus));
        if (data.d.Logistica != null) {

            if (data.d.Logistica.CveLogistica > 0) {
                var bExist = false;
                for (var i = 0; i < lstTempLogistica.length; i++) {

                    if (data.d.Logistica.CveLogistica == lstTempLogistica[i].CveLogistica) {
                        oAgendaSemanal = data.d.oAgendaSemanal;
                        numOTActualiza = oOrdenTrabajo.CveOrdenTrabajo;
                        oLogistica = null;
                        if (!Guardar) //Si es Actualizar la OT
                        {
                            ConsultaProgramasTransmitir();
                        }

                        lstTempLogistica[i].Lugar = data.d.Logistica.Lugar;
                        lstTempLogistica[i].Objetivo = data.d.Logistica.Objetivo;
                        lstTempLogistica[i].FechaEvento = data.d.Logistica.FechaEvento;
                        lstTempLogistica[i].FechaFin = data.d.Logistica.FechaFin;
                        bExist = true;
                        break;
                    }
                }
                if (bExist == false) {
                    lstTempLogistica.push(data.d.Logistica);
                }
                LimpiaCamposLogistica();

                $.each($("#dgLogistica").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenadgLogistica();
            }
        }
        $('#btnAddLogistica').show();
        if (Guardar) {
            alertModal('La orden de trabajo fue guardada con el número: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
        }

        addLogistica = false;
        Guardar = false;
        inOperation = false;
        bActualiza = true;

        PROCESOSWS--;
    }
    catch (e) {        
        ManejadorErrores(e, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);

    }
}
function fncEncabezadodgLogistica()
{
    var Enc = "<div class='divLogisticaOTRenglonTitles'>" +
            "<div class='divLogisticaOTOpt2'>Borrar</div>" +
            "<div class='divLogisticaOTOpt2'>Editar</div>" +
            "<div class='divLogisticaOT'>Lugar</div>" +
            "<div class='divLogisticaOT'>Observaciones</div>" +
            "<div class='divLogisticaOT'>Inicio Cobertura</div>" +
            "<div class='divLogisticaOT'>Fin Cobertura</div>" +
            "<div class='divLogisticaOT'>Horario de llamado</div></div>";
    $("#dgLogistica").append(Enc);
}
function LlenadgLogistica() {
    var Datos = "";
    var vCveOrdenTrabajo = "";
    var vClaveOrdenTrabajo = "";
    fncEncabezadodgLogistica();
    var vFechaEvento;
    var vFechaFin
    var vFechaEventoNum;
    var vFechaFinNum;
    for (var i = 0; i < lstTempLogistica.length; i++) {
        if (lstTempLogistica[i].CveOrdenTrabajo != null && lstTempLogistica[i].CveOrdenTrabajo != undefined) {
            vCveOrdenTrabajo = lstTempLogistica[i].CveOrdenTrabajo.CveOrdenTrabajo;
            vClaveOrdenTrabajo = lstTempLogistica[i].CveOrdenTrabajo.ClaveOrdenTrabajo;
        }
        Datos = "<div  class='divLogisticaOTRenglon'>";
        if (lstTempLogistica[i].FechaEvento != null && lstTempLogistica[i].FechaEvento != undefined && lstTempLogistica[i].FechaEvento.toString().indexOf('/Date') >= 0) {
            vFechaEvento = new Date(new Number(lstTempLogistica[i].FechaEvento.substr(6, 13)));
            vFechaEventoNum = lstTempLogistica[i].FechaEvento.substr(6, 13);
        } else {
            vFechaEvento = lstTempLogistica[i].FechaEvento;
            vFechaEventoNum = new Number(lstTempLogistica[i].FechaEvento).toString();
        }
        if (lstTempLogistica[i].FechaFin != null && lstTempLogistica[i].FechaFin != undefined && lstTempLogistica[i].FechaFin.toString().indexOf('/Date') >= 0) {
            vFechaFin = new Date(new Number(lstTempLogistica[i].FechaFin.substr(6, 13)));
            vFechaFinNum = lstTempLogistica[i].FechaFin.substr(6, 13);
        } else {
            vFechaFin = lstTempLogistica[i].FechaFin;
            vFechaFinNum = new Number(lstTempLogistica[i].FechaFin).toString();
        }
        Datos = Datos + "<div class='divLogisticaOTOpt2'><input type='button' id='btnDeleteLogistica' class = 'btnEliminarAlone'  title = 'Eliminar' data-lugarDel='" + lstTempLogistica[i].Lugar + "' data-Objetivo='" + lstTempLogistica[i].Objetivo + "' data-FechaEvento= '" + vFechaEventoNum + "' data-FechaFin='" + vFechaFinNum + "' data-llamado = '" + lstTempLogistica[i].Llamado + "' data-cveLogistica = '" + lstTempLogistica[i].CveLogistica + "' data-CveOrdentrabajo = '" + vCveOrdenTrabajo + "' data-ClaveOrdentrabajo = '" + vClaveOrdenTrabajo + "'/></div>";
        Datos = Datos + "<div class='divLogisticaOTOpt2'><input type='button' id = 'btnEdit' class = 'btnEditarAlone' title = 'Editar'  data-lugarEd='" + lstTempLogistica[i].Lugar + "' data-ObjetivoEd='" + lstTempLogistica[i].Objetivo + "' data-FechaEventoEd= '" + vFechaEventoNum + "' data-FechaFinEd='" + vFechaFinNum + "' data-llamadoEd = '" + lstTempLogistica[i].Llamado + "' data-cveLogisticaEd = '" + lstTempLogistica[i].CveLogistica + "' data-CveOrdentrabajoEd = '" + vCveOrdenTrabajo + "' data-ClaveOrdentrabajoEd = '" + vClaveOrdenTrabajo + "'/></div>";
        Datos = Datos + "<div class='divLogisticaOT'>" + lstTempLogistica[i].Lugar + "</div>";
        Datos = Datos + "<div class='divLogisticaOT'>" + lstTempLogistica[i].Objetivo + "</div>";
        Datos = Datos + "<div class='divLogisticaOT'>" + vFechaEvento.esMXFormatLarge() + "</div>";
        Datos = Datos + "<div class='divLogisticaOT'>" + vFechaFin.esMXFormatLarge() + "</div>";
 
        if (lstTempLogistica[i].Llamado == 0) {
            Datos = Datos + "<div class='divLogisticaOT'> <input type='checkbox' id='chkLlamado' class='onchange' data-lugarCmb='" + lstTempLogistica[i].Lugar + "' data-ObjetivoCmb='" + lstTempLogistica[i].Objetivo + "' data-FechaEventoCmb= '" + vFechaEventoNum + "' data-FechaFinCmb='" + vFechaFinNum + "' data-llamadoCmb = " + lstTempLogistica[i].Llamado + " data-cveLogisticaCmb = " + lstTempLogistica[i].CveLogistica + " data-CveOrdentrabajoCmb = '" + vCveOrdenTrabajo + "' data-ClaveOrdentrabajoCmb = '" + vClaveOrdenTrabajo + "'/></div>";        
        } else {
            Datos = Datos + "<div class='divLogisticaOT'> <input type='checkbox' id='chkLlamado' checked = 'true' class = 'onchange' data-lugarCmb='" + lstTempLogistica[i].Lugar + "' data-ObjetivoCmb='" + lstTempLogistica[i].Objetivo + "' data-FechaEventoCmb= '" + vFechaEventoNum + "' data-FechaFinCmb='" + vFechaFinNum + "' data-llamadoCmb = '" + lstTempLogistica[i].Llamado + "' data-cveLogisticaCmb = '" + lstTempLogistica[i].CveLogistica + "' data-CveOrdentrabajoCmb = '" + vCveOrdenTrabajo + "' data-ClaveOrdentrabajoCmb = '" + vClaveOrdenTrabajo + "'/></div>";
        }
        Datos = Datos + "</div>";
        $("#dgLogistica").append(Datos);
    }
}
function AgregaLogisticaGridAntesDeGuardar() 
{
    
    Datos = "<div class='divLogisticaOTRenglon'>";
    Datos = Datos + "<div class='divLogisticaOTOpt'><input type='button' id='btnDeleteLogistica' onclick='EliminaLogisticaSinGuardar(this);' class = 'btnEliminarAlone'  title = 'Eliminar' data-lugarDel='" + oLogistica.Lugar + "' data-Objetivo='" + oLogistica.Objetivo + "' data-FechaEvento= '" + Number(oLogistica.FechaEvento) + "' data-FechaFin='" + Number(oLogistica.FechaFin) + "' data-llamado = '" + oLogistica.Llamado + "' data-cveLogistica ='0' data-CveOrdentrabajo ='0' data-ClaveOrdentrabajo = '' /></div>";
    Datos = Datos + "<div class='divLogisticaOTOpt'><input type='button' id = 'btnEdit' class = 'btnEditarAlone' title = 'Editar'  data-lugarEd='" + oLogistica.Lugar + "' data-ObjetivoEd='" + oLogistica.Objetivo + "' data-FechaEventoEd= '" + Number(oLogistica.FechaEvento) + "' data-FechaFinEd='" + Number(oLogistica.FechaFin) + "' data-llamadoEd = '" + oLogistica.Llamado + "' data-cveLogisticaEd ='0' data-CveOrdentrabajoEd ='0'  data-ClaveOrdentrabajoEd = ''/></div>";
    Datos = Datos + "<div class='divLogisticaOT'>" + oLogistica.Lugar + "</div>";
    Datos = Datos + "<div class='divLogisticaOT'>" + oLogistica.Objetivo + "</div>";
    Datos = Datos + "<div class='divLogisticaOT'>" + oLogistica.FechaEvento.esMXFormatLarge() + "</div>";
    Datos = Datos + "<div class='divLogisticaOT'>" + oLogistica.FechaFin.esMXFormatLarge() + "</div>";
    if (oLogistica.Llamado == 0) {

        Datos = Datos + "<div class='divLogisticaOT'> <input type='checkbox' id='chkLlamado' class='onchange' data-lugarCmb='" + oLogistica.Lugar + "' data-ObjetivoCmb='" + oLogistica.Objetivo + "' data-FechaEventoCmb= '" + Number(oLogistica.FechaEvento) + "' data-FechaFinCmb='" + Number(oLogistica.FechaFin) + "' data-llamadoCmb = '" + oLogistica.Llamado + "' data-cveLogisticaCmb ='0' data-CveOrdentrabajoCmb ='0' data-ClaveOrdentrabajoCmb = ''/></div>";
    } else {
        Datos = Datos + "<div class='divLogisticaOT'> <input type='checkbox' id='chkLlamado' checked = 'true' class = 'onchange' data-lugarCmb='" + oLogistica.Lugar + "' data-ObjetivoCmb='" + oLogistica.Objetivo + "' data-FechaEventoCmb= '" + Number(oLogistica.FechaEvento) + "' data-FechaFinCmb='" + Number(oLogistica.FechaFin) + "' data-llamadoCmb = '" + oLogistica.Llamado + "' data-cveLogisticaCmb ='0'  data-CveOrdentrabajoCmb ='0' data-ClaveOrdentrabajoCmb = ''/></div>";
    }
    Datos = Datos + "</div>";
    $("#dgLogistica").append(Datos);
    LimpiaCamposLogistica();
}
function EliminaLogisticaSinGuardar(objDiv) {
    oLogistica = new THE_Logistica();
    $($(objDiv).parent()).parent().remove();
}
function  LimpiaCamposLogistica()
{
    $('#txtLugar').val("");
    $('#txtObservaciones').val("");
    $('#dtFechaIni').datepicker("setDate", new Date());
    $('#dtFechaFin').datepicker("setDate", new Date());
    addLogistica = false;
    editLogistica = false;
}
function GetEstatusByIdEstatus(idEstatus) { 
    var DescEstatus = "";
            for (var i = 0; i < ArrayEstatus.length; i++)
            {
                if (ArrayEstatus[i][0] == idEstatus)
                {
                    DescEstatus = ArrayEstatus[i][1];
                    return DescEstatus;
                }
            }
            return DescEstatus;
}
function ConsultaProgramasTransmitir() {
    PROCESOSWS++;
    var data = "{ 'NumOT':" + numOTActualiza + ", 'numEmpleado':" + sessionStorage.numUsuario + ", 'NumSeccOT':"+oOrdenTrabajo.CveSeccion.CveSeccion+"}";
    executeRequest(wsMtdGetProgramasTransmitir, data, successGetProgramasTransmitir, myErrorTransmitir);


}
var successGetProgramasTransmitir = function (data, status) {
    PROCESOSWS--;
    try {
        if (data.d != undefined) {
            var oConsultaTransProg = new Array();
            oConsultaTransProg = data.d;
            LstTransProg = oConsultaTransProg;
            CreaGridProgramaTransmitir(oConsultaTransProg);
            FillPlayList("");
        }
    }
    catch (ex) {        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function FillPlayList(vVdoIdFileName) {
    PROCESOSWS++;
    var data = "{'numOT':'" + numOTActualiza + "', 'VdoIdFilename':'"+vVdoIdFileName+"'}";
    executeRequest(wsMtdConsultaPlayListOT, data, successConsultaPlayListOT, myErrorConsultaPlayListOT);
}
function fncEncdgPlayList() {
    var Enc = "<div class='divTitlesSelecVidRep'> " +
            "<div class='divTitleSVRitems '>Reproducir</div>" +
//            "<div class='divTitleSVRitems '>OT</div>" +
//            "<div class='divTitleSVRitems '>T&iacute;tulo</div>" +
            "<div class='divTitleSVRitems '>Secci&oacute;n</div>" +
            "<div class='divTitleSVRitems '>Suceso</div>" +
            "<div class='divTitleSVRitems '>Programa</div>" +
            "<div class='divTitleSVRitems'>Nota transmitida</div>" +
        "</div>";
    $("#dgPLayList").append(Enc);
}
var successConsultaPlayListOT = function (data, status) {
    PROCESOSWS--;
    try {
        if (data.d != undefined) {
            if (data.d.length > 0) {
                $.each($("#dgPLayList").children(), function (index, myDiv) {
                    $(myDiv).remove();
                });
                fncEncdgPlayList();
                var myDiv = "";
                myDiv = myDiv + "<div class='divContainerResultsISVR'>"
                for (var i = 0; i < data.d.length; i++) {
                    var fotosConcat = data.d[i].FotosConcatenadas;
                    var arrayFotos = fotosConcat.split('|');
                    fotosConcat = "";
                    for (var j = 0; j < arrayFotos.length; j++) {
                        fotosConcat = fotosConcat + arrayFotos[j].split('@')[0] + "|";
                    }
                    fotosConcat = fotosConcat.substr(0, fotosConcat.length - 1);
                    data.d[i].FotosConcatenadas = data.d[i].Foto + "|" + fotosConcat;
                    myDiv = myDiv + "<div class='divContainerISVR'>"

                    myDiv = myDiv + "<div class='divItemsSelecVidRep'><img src='" + data.d[i].Foto + "' id = 'btnReprodVideo_" + i + "' class='onReprodVideo' width = 45 heigth = 45 data-value='" + data.d[i].FotosConcatenadas + "' data-index='" + i + "' data-idvideo='" + data.d[i].IdVideo + "' data-OT='" + data.d[i].OT + "'></img></div> ";
//                    myDiv = myDiv + "<div class='divItemsSelecVidRep'>" + data.d[i].OTCvec + "</div>"
//                    myDiv = myDiv + "<div class='divItemsSelecVidRep'>" + data.d[i].Titulo + "</div> ";
                    myDiv = myDiv + "<div class='divItemsSelecVidRep'>" + data.d[i].Seccion + "</div> ";
                    myDiv = myDiv + "<div class='divItemsSelecVidRep'>" + data.d[i].NombreVideo + "</div> ";
                    myDiv = myDiv + "<div class='divItemsSelecVidRep'>" + data.d[i].NombrePrograma + "</div> ";
                    
                    if (data.d[i].NotaTransmitida != null) {
                        myDiv = myDiv + "<div class='divItemsSelecVidRep'>" + data.d[i].NotaTransmitida + "</div> ";
                    } else {
                        myDiv = myDiv + "<div class='divItemsSelecVidRep'></div>";
                    }
                    myDiv = myDiv + "</div>";
                }
                myDiv = myDiv + "</div>";
                if (myDiv.length > 0) {
                    $("#dgPLayList").append(myDiv);
                }
            }
        }
    }
    catch (ex) {
    }
}
function myErrorConsultaPlayListOT(request, status, error) {
    PROCESOSWS--;
}
function CreaTitulosHeader(num, columnRedactor) {
    var div = "<div >";
    switch (num) {
        case 0:
            div = div + "<label class='divTransmitirTitles2' id ='hdrPrograma'>Programa</label>";
            break;
        case 1:
            if (columnRedactor == 1) {
                div = div + "<label class='divTransmitirTitles2' id = 'hdrRedactores'>Redactor</label>";
            } else {
                div = div + "<label class='divTransmitirTitles' id = 'hdrFormato'>Formato</label>";
            }
            break;
        case 2:
            if (columnRedactor == 1) {
                div = div + "<label class='divTransmitirTitles2' id = 'hdrFormato'>Formato</label>";
            } else {
                div = div + "<label class='divTransmitirTitles' id = 'hdrFecha'>Fecha Programada</label>";
            }
            break;
        case 3:
            if (columnRedactor == 1) {
                div = div + "<label class='divTransmitirTitles2' id = 'hdrFecha'>Fecha Programada</label>";
            } else {
                div = div + "<label class='divTransmitirTitles' id = 'hdrReplicar'>Replicar</label>";
            }
            break;
        case 4:
            if (columnRedactor == 1) {
                div = div + "<label class='divTransmitirTitles2' id = 'hdrReplicar'>Replicar</label>";
            } else {
                div = div + "<label class='divTransmitirTitles' id = 'hdriNews'>iNews</label>";
            }
            break;
        case 5:
            if (columnRedactor == 1) {
                div = div + "<label class='divTransmitirTitles2' id = 'hdriNews'>iNews</label>";
            } 
            break;
        default:
            break;
    }
    div = div + "</div>";
    return div;
}
function ObtenOpcionesRed(RedactorEmpl, Nombre) {
    var opciones = "";
    var seleccionado = false;
    opciones = "<option value= -1>== SELECCIONE ==</option>";
    $.each(RedactorEmpl, function (index, myValor) {
        if (myValor.EmpleadoNombre == Nombre && seleccionado == false) {

            opciones = opciones + "<option value=" + myValor.EmpleadoLlavePrimaria + " selected = 'selected'>" + myValor.EmpleadoNombre + "</option>";
            seleccionado = true;
        }
        else {
            opciones = opciones + "<option value=" + myValor.EmpleadoLlavePrimaria + ">" + myValor.EmpleadoNombre + "</option>";
        }

    });
    return opciones;
}
function ObtenOpciones(SeccionFormato, FormatoValue)
{
    var opciones = "";
    var seleccionado = false;
        $.each(SeccionFormato, function (index, myValor) {
            if (myValor.CveFormato.Descripcion == FormatoValue && seleccionado == false)
                {
                    opciones = opciones + "<option value=" + myValor.CveFormato.CveFormato + " selected = 'selected' data-duracion = '" + myValor.CveFormato.Duracion + "'>" + myValor.CveFormato.Descripcion + "</option>";
                    seleccionado = true;
                }
            else{
                opciones = opciones + "<option value=" + myValor.CveFormato.CveFormato + " data-duracion = '" + myValor.CveFormato.Duracion + "'>" + myValor.CveFormato.Descripcion + "</option>";
               }
            });
    return opciones;
}
function CreaGridProgramaTransmitir(source) {
    var myDivRowIni = "";
    var myDivRowFin = "";
    var myDiv = "";
    var myDivEnc = "";
    var myDivStyleRow = "<div >";
    gblsource = source;
    var numColums = 0;
    gblnumColums = 5;
    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 || oOrdenTrabajo.CveSeccion.CveSeccion == 8)
    {
        numColums = 1;
        gblnumColums = gblnumColums + 1;
    }
    try {
              $.each($("#GridProgTransmitir").children(), function (index, myDivC) {
                $(myDivC).remove();
            });
                for (var i = 0; i < source.length; i++)
                {
                    myDivRowIni = "<div>";

                    myDiv = myDivStyleRow;
                    myDivEnc = "";
                        for (var j = 0; j < 5 + numColums; j++)
                        {
                            if (i==0)
                            {
                            //Aqui se construye el encabezado
                                myDivEnc = myDivEnc + CreaTitulosHeader(j, numColums);
                            }
                            if (i >= 0 && j >= 0)
                            {
                                //Aqui se va agregando la información
                                switch (j)
                                {
                                case 0:
                                    myDiv = myDiv + "<div class='labelBase2' ><label id ='lblPrograma_" + i + "_" + j + "'>" + source[i].Programa + "</label></div>";
                                    break;
                                case 1:
                                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 ||
                                            oOrdenTrabajo.CveSeccion.CveSeccion == 8) {
                                        myDiv = myDiv + "<div class='labelBase2'><select class='cbosProgramasTransmitirOT' id ='cboRedactor_" + i + "_" + j + "' >" + ObtenOpcionesRed(source[i].CboRedactor, source[i].RedactorSelected.EmpleadoNombre) + "</select></div>";
                                    } else {
                                        myDiv = myDiv + "<div class='labelBase' ><select class='cbosProgramasTransmitirOT' id ='cboFormato_" + i + "_" + j + "'>" + ObtenOpciones(source[i].CboFormatos, source[i].Formato) + "</select></div>";
                                    }
                                    break;
                                case 2:
                                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 ||
                                            oOrdenTrabajo.CveSeccion.CveSeccion == 8) {
                                        myDiv = myDiv + "<div class='labelBase2'><select class='cbosProgramasTransmitirOT' id ='cboFormato_" + i + "_" + j + "'>" + ObtenOpciones(source[i].CboFormatos, source[i].Formato) + "</select></div>";
                                    } else {
                                        var vFecha = new Date(new Number(source[i].FechaProgramada.substr(6, 13)));
                                        myDiv = myDiv + "<div class='labelBase'><input type='text' id='dpFechaAgenda_" + i + "_" + j + "' value = '" + vFecha.esMXFormat() + "' class='toDatePicker txtFechas2' readonly='readonly' data-Fecha='" + vFecha.esMXFormat() + "'/></div>"
                                    }
                                    break;
                                case 3:
                                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 ||
                                            oOrdenTrabajo.CveSeccion.CveSeccion == 8) {
                                        var vFecha = new Date(new Number(source[i].FechaProgramada.substr(6, 13)));
                                        myDiv = myDiv + "<div class='labelBase2'><input type='text' id='dpFechaAgenda_" + i + "_" + j + "' value = '" + vFecha.esMXFormat() + "' class='toDatePicker txtFechas2' readonly='readonly' data-Fecha='" + vFecha.esMXFormat() + "'/></div>"
                                    } else {
                                        myDiv = myDiv + "<div class='labelBase'><button type='button' id='btnReplicar_" + i + "_" + j + "' class = 'btnDuplicarAlone' data-indexSource = '" + i + "' data-IdPrograma='" + source[i].IdPrograma + "' data-Programa='" + source[i].Programa + "'/></div>";

                                    }
                                    break;
                                case 4:
                                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 ||
                                            oOrdenTrabajo.CveSeccion.CveSeccion == 8) {
                                        myDiv = myDiv + "<div class='labelBase2'><button type='button' class = 'btnDuplicarAlone' id='btnReplicar_" + i + "_" + j + "' data-indexSource = '" + i + "' data-IdPrograma='" + source[i].IdPrograma + "' data-Programa='" + source[i].Programa + "'/></div>";
                                    } else {
                                        myDiv = myDiv + "<div class='labelBase'><button type='button' class = 'btniNewsAlone' id='btniNews_" + i + "_" + j + "' /></div>";
                                    }
                                    break;
                                case 5:
                                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 ||
                                        oOrdenTrabajo.CveSeccion.CveSeccion == 8) {
                                        myDiv = myDiv + "<div class='labelBase2'><button type='button' class = 'btniNewsAlone' id='btniNews_" + i + "_" + j + "'/></div>";
                                    } 
                                    break;
                                default:
                                    myDiv = myDiv +"";
                                    break;
                                }
                            }
                        }
                    myDivRowFin =  myDivStyleRow + myDivEnc + "</div>" + myDiv + "</div>";
                    $("#GridProgTransmitir").append(myDivRowFin);

                    $.each($(".toDatePicker"), function (index, theDate) {
                        $(theDate).datepicker({ });
                    });
                } 
    }
    catch (ex) {
        inOperation = false;
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
var successAlmacenaDatosOrdenTrabajoCompra = function (data, status) {
    try {
        inOperation = false;
        switch (data.d.oTipo) {
            case tipoErroresOT.noError:
                break;
            case tipoErroresOT.ordenTrabajo:
                alertModal('No se guardo la Orden de trabajo, por favor vuelva a intentar guardar.');
                break;
            case tipoErroresOT.clave:
                alertModal('No se puede generar una clave para la orden de trabajo creada.');
                break;
            case tipoErroresOT.agenda:
                alertModal('No se agendo la orden de trabajo.');
                break;
            case tipoErroresOT.equipoTrabajo:
                alertModal('No se guardo el equipo de trabajo.');
                break;
            default:
                break;
        }
        numOTActualiza = data.d.oOrdenTrabajo.CveOrdenTrabajo;
        oOrdenTrabajo = data.d.oOrdenTrabajo;
        if (oOrdenTrabajo.FechaAgenda == undefined && data.d.oAgendaSemanal != undefined) {

            if (data.d.oAgendaSemanal.FechaInicio != undefined && data.d.oAgendaSemanal.FechaInicio.toString().indexOf('/Date') >= 0) {
                var vFechaAgenda1 = new Date(new Number(data.d.oAgendaSemanal.FechaInicio.substr(6, 13)));
                oOrdenTrabajo.FechaAgenda = vFechaAgenda1;
            } else {
                oOrdenTrabajo.FechaAgenda = new Date(Date.parse(ConvertToFormatDatetoIng(data.d.oAgendaSemanal.FechaInicio)));
            }
        }
        var vFechaAge;
        if (oOrdenTrabajo.FechaEvento != null && oOrdenTrabajo.FechaEvento != undefined && oOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
            vFechaAge = new Date(new Number(oOrdenTrabajo.FechaEvento.substr(6, 13)));
        }
        if (oOrdenTrabajo.Programa != null && oOrdenTrabajo.Programa != undefined) {
            var vFechaFin;
            var vFechaInicio;
            if (oOrdenTrabajo.Programa.FechaFin != null && oOrdenTrabajo.Programa.FechaFin != undefined && oOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                vFechaFin = new Date(new Number(oOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                oOrdenTrabajo.Programa.FechaFin = vFechaFin;
            }
            if (oOrdenTrabajo.Programa.FechaInicio != null && oOrdenTrabajo.Programa.FechaInicio != undefined && oOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                vFechaInicio = new Date(new Number(oOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                oOrdenTrabajo.Programa.FechaInicio = vFechaInicio;
            }
        }
        if (oOrdenTrabajo.CveEventoDeportivo != null && oOrdenTrabajo.CveEventoDeportivo != undefined) {
            var vdtFechaFin;
            var vdtFechaInicio;
            if (oOrdenTrabajo.CveEventoDeportivo.dtFechaFin != null && oOrdenTrabajo.CveEventoDeportivo.dtFechaFin != undefined && oOrdenTrabajo.CveEventoDeportivo.dtFechaFin.toString().indexOf('/Date') >= 0) {
                vdtFechaFin = new Date(new Number(oOrdenTrabajo.CveEventoDeportivo.dtFechaFin.substr(6, 13)));
                oOrdenTrabajo.CveEventoDeportivo.dtFechaFin = vdtFechaFin;
            }
            if (oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio != null && oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio != undefined && oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio.toString().indexOf('/Date') >= 0) {
                vdtFechaInicio = new Date(new Number(oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio.substr(6, 13)));
                oOrdenTrabajo.CveEventoDeportivo.dtFechaInicio = vdtFechaInicio;
            }
        }
        if (vFechaAge != undefined) {
            oOrdenTrabajo.FechaEvento = vFechaAge;
        }
        oAgendaSemanal = data.d.oAgendaSemanal;
        var vFechaCreacion;
        if (oAgendaSemanal.FechaCreacion != null && oAgendaSemanal.FechaCreacion != undefined && oAgendaSemanal.FechaCreacion.toString().indexOf('/Date') >= 0) {
            vFechaCreacion = new Date(new Number(oAgendaSemanal.FechaCreacion.substr(6, 13)));
            oAgendaSemanal.FechaCreacion = vFechaCreacion;
        }
        numOTActualiza = oOrdenTrabajo.CveOrdenTrabajo;
        ConsultaProgramasTransmitir();

        parent.RenameWindow(initVars["windowId"], 'Actualización de OT: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
        $("#txtNumOT").empty();
        $('#txtNumOT').append("No. OT: " + oOrdenTrabajo.ClaveOrdenTrabajo);
        $('#txtStatus').empty();
        $('#txtStatus').append("Estado: " + GetEstatusByIdEstatus(oOrdenTrabajo.Estatus));
        if (data.d.Logistica != null) {
            if (data.d.Logistica.CveLogistica > 0) {
                var bExist = false;
                for (var i = 0; i < lstTempLogistica.length; i++) {
                    if (data.d.Logistica.CveLogistica == lstTempLogistica[i].CveLogistica) {
                        lstTempLogistica[i].Lugar = data.d.Logistica.Lugar;
                        lstTempLogistica[i].Objetivo = data.d.Logistica.Objetivo;
                        lstTempLogistica[i].FechaEvento = data.d.Logistica.FechaEvento;
                        lstTempLogistica[i].FechaFin = data.d.Logistica.FechaFin;
                        bExist = true;
                        break;
                    }
                }
                if (bExist == false) {
                    lstTempLogistica.push(data.d.Logistica);
                }
                LimpiaCamposLogistica();
                $.each($("#dgLogistica").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenadgLogistica();
            }
        }
        $('#btnAddLogistica').show();
        if (Guardar) {
            alertModal('La orden de trabajo fue guardada con el número: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
        }
        /*Comienza parte de Actualizacion*/
        addLogistica = false;
        Guardar = false;
        inOperation = false;
        bActualiza = true;
        PROCESOSWS--;
    }
    catch (e) {        
        ManejadorErrores(e, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}

function LlenaLogistica() {

    if (oLogistica != undefined && oLogistica.Lugar != undefined && oLogistica.Objetivo != undefined) {
        if (Guardar == true) {
            return oLogistica;
        } else {
            
            if (oLogistica.CveLogistica != undefined && oLogistica.CveLogistica != "") {
                if (jQuery.trim($("#txtLugar").val()) != "" || jQuery.trim($("#txtObservaciones").val()) != "") {
                    oLogistica.Lugar = $("#txtLugar").val();
                    oLogistica.Objetivo = $("#txtObservaciones").val();
                    oLogistica.FechaEvento = new Date($("#dtFechaIni").datepicker("getDate"));
                    oLogistica.FechaFin = new Date($("#dtFechaFin").datepicker("getDate"));
                    return oLogistica;
                }
            } else {
                if ((oLogistica.CveLogistica == undefined || oLogistica.CveLogistica != "") && (oLogistica.Lugar != "" || oLogistica.Objetivo != "")) {
                    return oLogistica;
                } else {
                    return null;
                }
            }
        }
    } else {
        return null;
    }
}
function  LlenaComprasOT()
{
    var oc = new Array ();
    var oCompraOT = new CompraOT();
    oCompraOT.CveOrdenTrabajo = oOrdenTrabajo;
    var vFormato = new TDI_Formato();
    vFormato.CveFormato = Number($('option:selected', '#MainContent_cmbFormato').val());
    vFormato.Descripcion = $('option:selected', '#MainContent_cmbFormato')[0].text;
    var vFormatoFin = new TDI_SeccionFormato();
    vFormatoFin.CveFormato = vFormato;
    oCompraOT.CveSeccionFormato = vFormatoFin;
    var vPrograma = new TDI_Programa();
    vPrograma.CvePrograma = Number($('option:selected', '#MainContent_cmbProduccion').val());
    vPrograma.NombrePrograma = $('option:selected', '#MainContent_cmbProduccion')[0].text;
    var vProgramaEmpleado = new TDI_ProgramaEmpleado();
    vProgramaEmpleado.CvePrograma = vPrograma;
    oCompraOT.CveProgramaEmpleado = vProgramaEmpleado;
    oCompraOT.FechaCompra = new Date($("#dtFechaAg").datepicker("getDate"));
    oCompraOT.SeEnviaINEWS = true;
    oc.push(oCompraOT);
    return oc;
}
function ValidacionProducciones() {
    var oFechaEvento = new Date($("#dtFechaIni").datepicker("getDate"));
    var oFechaFin = new Date($("#dtFechaFin").datepicker("getDate"));
    var bValida = true;
    if (jQuery.trim($("#txtTitulo").val())=='')
    {
        alertModal("El titulo no puede ser nulo");
        bValida = false;
    }
    else if (jQuery.trim($("#txtTitulo").val()).length > 200) {
        alertModal("La longitud del Titulo no puede ser mayor a doscientos caracteres");
        bValida = false;
    }
    else if (jQuery.trim($("#txtObjetivo").val())=='')
    {
        alertModal("El Objetivo no puede ser nulo");
        bValida = false;
    }
    else if (jQuery.trim($("#txtObjetivo").val()).length > 4000) {
        alertModal("La longitud del Objetivo no puede ser mayor a 4000 caracteres");
        bValida = false;
    }
    else if (jQuery.trim($("#txtTeaser").val()).length > 2000) {
        alertModal("La longitud del Teaser no puede ser mayor a 2000 caracteres");
        bValida = false;
    }
    else if ($("#dtFechaAg").datepicker("getDate")== undefined)
    {
        alertModal("Necesita seleccionar una fecha de agenda");
        bValida = false;
    }
    else if ($('option:selected', '#MainContent_cmbSeccion').index() == 0)
    {
        alertModal("Necesita selecionar una seccion");
        bValida = false;
    }
    else if ($('option:selected', '#cmbTipoNota').index() == 0)
    {
        alertModal("Necesita selecionar un tipo de nota");
        bValida = false;
    }
    else if ($('option:selected', '#MainContent_cmbProduccion').index() <= 0)
    {
        bValida = false;
        alertModal("Necesita seleccionar una Producción para la compra de la OT");
    }
    else if ($('option:selected', '#MainContent_cmbFormato').index() < 0)
    {
        bValida = false;
        alertModal("Necesita seleccionar un Formato para la compra de OT");
    }
    else if 
    ((($("#dtFechaIni").datepicker("getDate") > $("#dtFechaFin").datepicker("getDate")) && (Number($("#dtFechaIni").datepicker("getDate")) > Number($("#dtFechaFin").datepicker("getDate"))))
      && ($("#dtFechaIni").datepicker("getDate").esMXFormatLarge() != $("#dtFechaFin").datepicker("getDate").esMXFormatLarge())
      && (jQuery.trim($("#txtLugar").val()) != '' || jQuery.trim($("#txtObservaciones").val()) != ''))
      {
        alertModal("La fecha y hora inicial de cobertura no pueden ser inferiores a la de fin")
        bValida = false;
        
    } else if (($('#cmbLocales option').size() > 0 && $('option:selected', '#cmbLocales').index() == 0) || ($('option:selected', '#cmbLocales').val() == 0)) {
        bValida = false;
        alertModal("Necesita seleccionar una local");

    }
    return bValida;
}
function validacionNoAjusco() {
    var bValida = true;
    var oFechaEvento = new Date($("#dtFechaIni").datepicker("getDate"));
    var oFechaFin = new Date($("#dtFechaFin").datepicker("getDate"));
    if (jQuery.trim($("#txtTitulo").val()) == '') {
        alertModal("El titulo no puede ser nulo");
        bValida = false;
    }
    else if (jQuery.trim($("#txtTitulo").val()).length > 200) {
        alertModal("La longitud del Titulo no puede ser mayor a doscientos caracteres");
        bValida = false;
    }
    else if (jQuery.trim($("#txtObjetivo").val()) == '') {
        alertModal("El Objetivo no puede ser nulo");
        bValida = false;
    }
    else if (jQuery.trim($("#txtObjetivo").val()).length > 4000) {
        alertModal("La longitud del Objetivo no puede ser mayor a 4000 caracteres");
        bValida = false;
    }
    else if (jQuery.trim($("#txtTeaser").val()).length > 2000) {
        alertModal("La longitud del Teaser no puede ser mayor a 2000 caracteres");
        bValida = false;
    }
    else if ($("#dtFechaAg").datepicker("getDate") == undefined) {
        alertModal("Necesita seleccionar una fecha de agenda");
        bValida = false;
    }
    else if ((($("#dtFechaIni").datepicker("getDate") > $("#dtFechaFin").datepicker("getDate")) && (Number($("#dtFechaIni").datepicker("getDate")) > Number($("#dtFechaFin").datepicker("getDate")))) && ($("#dtFechaIni").datepicker("getDate").esMXFormatLarge() != $("#dtFechaFin").datepicker("getDate").esMXFormatLarge())
        &&(jQuery.trim($("#txtLugar").val()) != '' || jQuery.trim($("#txtObservaciones").val()) != '')) {
        
            alertModal("La fecha y hora inicial de cobertura no pueden ser inferiores a la de fin")
            bValida = false;
    }
    else if
     (($('#cmbLocales option').size() > 0 && $('option:selected', '#cmbLocales').index() == 0) || ($('option:selected', '#cmbLocales').val() == 0)) {
        alertModal("Necesita seleccionar una local");
        bValida = false;
    }

    else if(oOrdenTrabajo.CveOrdenTrabajo == undefined || $.trim(oOrdenTrabajo.CveOrdenTrabajo) == ''){
        if ($('option:selected', '#MainContent_cmbProduccion').index() <= 0) {
            bValida = false;
            alertModal("Necesita seleccionar una Producción para la compra de la OT");
        }
        else if ($('option:selected', '#MainContent_cmbFormato').index() < 0) {
            bValida = false;
            alertModal("Necesita seleccionar un Formato para la compra de OT");
        }
    }

    return bValida;
}
function ValidacionBasica() {
    var bValida = true;
    var oFechaEvento = new Date($("#dtFechaIni").datepicker("getDate"));
    var oFechaFin = new Date($("#dtFechaFin").datepicker("getDate"));
    if (jQuery.trim($("#txtTitulo").val()) == '') {
          alertModal("El titulo no puede ser nulo");
        bValida = false;
    }
    else if (jQuery.trim($("#txtTitulo").val()).length >200) {

       alertModal("La longitud del Titulo no puede ser mayor a doscientos caracteres");
        bValida = false;
    }
    else if (jQuery.trim($("#txtObjetivo").val()) == '') {
        alertModal("El Objetivo no puede ser nulo");
        bValida = false;
    } else if (jQuery.trim($("#txtObjetivo").val()).length >4000) {
        alertModal("La longitud del Objetivo no puede ser mayor a 4000 caracteres");
        bValida = false;
    }
    else if (jQuery.trim($("#txtTeaser").val()).length > 2000) {
        alertModal("La longitud del Teaser no puede ser mayor a 2000 caracteres");
        bValida = false;
    }
    else if ($("#dtFechaAg").datepicker("getDate") == undefined) {
        alertModal("Necesita seleccionar una fecha de agenda");
        bValida = false;
    }
    else if ($('option:selected', '#MainContent_cmbSeccion').index() == 0) {
        alertModal("Necesita selecionar una seccion");
        bValida = false;
    }
    else if ($('option:selected', '#cmbTipoNota').index() == 0) {
        alertModal("Necesita selecionar un tipo de nota");
        bValida = false;
    }
    else if 
    ((($("#dtFechaIni").datepicker("getDate") > $("#dtFechaFin").datepicker("getDate")) && (Number($("#dtFechaIni").datepicker("getDate")) > Number($("#dtFechaFin").datepicker("getDate"))))
        && ($("#dtFechaIni").datepicker("getDate").esMXFormatLarge() != $("#dtFechaFin").datepicker("getDate").esMXFormatLarge())
        && (jQuery.trim($("#txtLugar").val()) != '' || jQuery.trim($("#txtObservaciones").val()) != '')) 
        {
            alertModal("La fecha y hora inicial de cobertura no pueden ser inferiores a la de fin")
            bValida = false;
    }
    else if
     ( ($('#cmbLocales option').size() > 0 && $('option:selected', '#cmbLocales').index() == 0) || ($('option:selected', '#cmbLocales').val() == 0)){
        bValida = false;
        alertModal("Necesita seleccionar una local");
    }

    return bValida;
}

function getSeccionByEmpleado() {
    var data = "{ 'idEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdgetSeccionEmpl, data, successSeccEmpl, myError);
}
var successSeccEmpl = function (data, status) {
    if (data.d != undefined) {
        gblSecciones = data.d;
    }
}
function validaArrayReportero() {
    for (var i = 0; i < arrReporteros.length; i++) {
        if ($("#txtReportero_label").val().toUpperCase() == arrReporteros[i].label.toUpperCase()) {
            return true;
        }
    }
    return false;
}
function btnAddReportero_click() {
    if (jQuery.trim($("#txtReportero_hidden").val()) != '' && $("#txtReportero_hidden").val() != undefined) {
        var bfound = false;
        if (validaArrayReportero() == true) {
            $("#lsbReporteros option").each(function () {
                if ($("#txtReportero_hidden").val() == this.value && $("#txtReportero_label").val() == this.text) 
                    bfound = true;
            });
            if (bfound == false) {
                if (oDDReportero == undefined) {
                    $("#lsbReporteros").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                    oDDReportero = $('#lsbReporteros').msDropDown().data("dd");
                }
                var imgURL = imgDataUrl + $("#txtReportero_hidden").attr("data-numEmpl") + '.jpg';
                
                //imgURL = ImgLoad(imgDataUrl + $("#txtReportero_hidden").attr("data-numEmpl") + '.jpg');
                oDDReportero.add({ text: $("#txtReportero_label").val(), value: $("#txtReportero_hidden").val(), title: imgURL }); //will add icon too. 
                SizeImageReportero();
                $("#lsbReporteros").val($("#txtReportero_hidden").val());
                $("#txtReportero").val("");
                $('#txtReportero_label').val("");           
            }
        }
    }
    $('#txtReportero_label').val("");

}

function SizeImageReportero() {

    try {
        if (lsbReporteros_child.children.length > 0) {
            for (var i = 0; i < lsbReporteros_child.children.length; i++) {
                if (lsbReporteros_child.children[i].children.length > 0) {
                    lsbReporteros_child.children[i].children[0].width = 40;
                    lsbReporteros_child.children[i].children[0].Height = 45;
                }
            }
        }
    } 
    catch (error) 
    {

    }
    
    
}
function btnDelReportero_click() {
    if ($('#lsbReporteros option').size() > 0) {
        var selectedindex = $('option:selected', '#lsbReporteros').index();
        if (oDDReportero != undefined) {
            oDDReportero.remove(selectedindex);
        } else {
            if (oDDReportero == undefined) {
                $("#lsbReporteros").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                oDDReportero = $('#lsbReporteros').msDropDown().data("dd");
                oDDReportero.remove(selectedindex);
            }
        }
        SizeImageReportero();
    }
}
function validaArrayCamaro() {
    for (var i = 0; i < arrCamarografos.length; i++) {
        if ($("#txtCamaro_label").val().toUpperCase() == arrCamarografos[i].label.toUpperCase()) {
            return true;
        }
    }
    return false;
}
function btnAddCamaro_click() {
    if (jQuery.trim($("#txtCamaro_hidden").val()) != '' && $("#txtCamaro_hidden").val() != undefined) {
        var bfound = false;
        if (validaArrayCamaro() == true) {
            $("#lsbCamaro option").each(function () {
                if ($("#txtCamaro_hidden").val() == this.value && $("#txtCamaro_label").val() == this.text) {
                    bfound = true;
                }
            });
            if (bfound == false) {
                if (oDDCamaro == undefined) {
                    $("#lsbCamaro").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                    oDDCamaro = $('#lsbCamaro').msDropDown().data("dd");
                }
                oDDCamaro.add({ text: $("#txtCamaro_label").val(), value: $("#txtCamaro_hidden").val(), title: imgDataUrl + $("#txtCamaro_hidden").attr("data-numEmpl") + '.jpg' }); //will add icon too. 
                SizeImageCamaro();
                $("#lsbCamaro").val($("#txtCamaro_hidden").val());
                $("#txtCamaro").val("");
                $("#txtCamaro_label").val("");
              
            }
        }
    }
    $("#txtCamaro_label").val("");
}
function SizeImageCamaro() {
    try {
        if (lsbCamaro_child.children.length > 0) {
            for (var i = 0; i < lsbCamaro_child.children.length; i++) {
                if (lsbCamaro_child.children[i].children.length > 0) {
                    lsbCamaro_child.children[i].children[0].width = 40;
                    lsbCamaro_child.children[i].children[0].Height = 45;
                }
            }
        }
    } catch (error) { 
    
    }
}
function btnDelCamaro_click() {
    if ($('#lsbCamaro option').size() > 0) {
        var selectedindex = $('option:selected', '#lsbCamaro').index();
        if (oDDCamaro != undefined) {
            oDDCamaro.remove(selectedindex);
        } else {
            if (oDDCamaro == undefined) {
                $("#lsbCamaro").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                oDDCamaro = $('#lsbCamaro').msDropDown().data("dd");
                oDDCamaro.remove(selectedindex);
            }
        }
        SizeImageCamaro();
    }
}
function validaArrayEditor() {
    for (var i = 0; i < arrEditores.length; i++) {
        if ($("#txtEditor_label").val().toUpperCase() == arrEditores[i].label.toUpperCase()) {
            return true;
        }
    }
    return false;
}
function btnAddEditor_click() {
    if (jQuery.trim($("#txtEditor_hidden").val()) != '' && $("#txtEditor_hidden").val() != undefined) {
        var bfound = false;
        if (validaArrayEditor() == true) {
            $("#lsbEditor option").each(function () {
                if ($("#txtEditor_hidden").val() == this.value && $("#txtEditor_label").val() == this.text) {
                    bfound = true;
                }
            });
            if (bfound == false) {
                if (oDDEditor == undefined) {
                    $("#lsbEditor").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                    oDDEditor = $('#lsbEditor').msDropDown().data("dd");
                }
                oDDEditor.add({ text: $("#txtEditor_label").val(), value: $("#txtEditor_hidden").val(), title: imgDataUrl + $("#txtEditor_hidden").attr("data-numEmpl") + '.jpg' }); //will add icon too. 
                SizeImageEditor();
                $("#lsbEditor").val($("#txtEditor_hidden").val());
                $("#txtEditor").val("");
                $("#txtEditor_label").val("");
            }
        }
    }
    $("#txtEditor_label").val("");
}
function SizeImageEditor() {
    try {
        if (lsbEditor_child.children.length > 0) {
            for (var i = 0; i < lsbEditor_child.children.length; i++) {
                if (lsbEditor_child.children[i].children.length > 0) {
                    lsbEditor_child.children[i].children[0].width = 40;
                    lsbEditor_child.children[i].children[0].Height = 45;
                }
            }
        }
    } catch (error) { }
}
function btnDelEditor_click() {
    if ($('#lsbEditor option').size() > 0) {
        var selectedindex = $('option:selected', '#lsbEditor').index();
        if (oDDEditor != undefined) {
            oDDEditor.remove(selectedindex);
        } else {
            if (oDDEditor == undefined) {
                $("#lsbEditor").msDropDown({ showIcon: true, rowHeight: 10, style: 'background-color:#333, font-size:24px, background-size:10%' });
                oDDEditor = $('#lsbEditor').msDropDown().data("dd");
                oDDEditor.remove(selectedindex);
            }
        }
        SizeImageEditor();
    }
}
var successBorraLogistica = function (data, status) {
    try {
        if (data.d != undefined) {
            if (data.d == true || data.d == false) {
                lstTempLogistica.splice(GetIndexdgLogistica(), 1);
                $.each($("#dgLogistica").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenadgLogistica();
                if (lstTempLogistica.length == 0) {
                    oLogistica = new THE_Logistica();
                }
            }

        } else {
            alertModal('Ocurrio un error al eliminar el campo');
        }
    }
    catch (ex) {
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function GetIndexdgLogistica() {
    var valor = 0;
    for (var i = 0; i < lstTempLogistica.length; i++) {
        if (lstTempLogistica[i].CveLogistica == gblCveLogistica) {
            valor = i;
            return i;
        }
    }
    return valor;
}
function myErrorBorraLogistica(request, status, error) {
    PROCESOSWS--;
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorManejadorErrores(request, status, error) {
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorManejadorErroresProcces(request, status, error) {
    PROCESOSWS--;
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function AbreVentanaReplicar(vlIdPrograma, vlPrograma)
{
    if (DatosToSendReplicar != undefined && DatosToSendReplicar.OTOrdenTrab != undefined) {
       
        parent.openModal("OT/Replicar.aspx?CveOrdenTrabajo=" + DatosToSendReplicar.OTOrdenTrab[0].CveOrdenTrabajo + "&IdSeccion=" + DatosToSendReplicar.OTOrdenTrab[0].CveSeccion.CveSeccion + "&NombrePrograma=" + vlPrograma + "&IdPrograma=" + vlIdPrograma, widthReplica, heigthReplica, "Replicar");
        }
        else {
            fncConsultaDatosPantalla(); 
        }
    }
function fncConsultaDatosPantalla() {
    var data = "{ 'NumeroOT':'" + oOrdenTrabajo.CveOrdenTrabajo + "' }";
    executeRequest(wsMtdObtenerDatosPantallaOrdenTrabajo, data, successConsultaDatosPantalla, myErrorManejadorErroresProcces);
}
var successConsultaDatosPantalla = function (data, status) {
    if (data.d != undefined) {
        DatosToSendReplicar = data.d;
        AbreVentanaReplicar();
    }
}
function validaFechaAgenda(numCol) {
    try {
        if ($('#dpFechaAgenda_' + gblRowActual + '_' + numCol).datepicker("getDate") != undefined)
        {
            return true;
        }
    }
    catch (ex) {
        return false;
    }
}
function GuardaOActualizaFOEPByiNEWs(theRow) {
    var Indice = 0;
    var oTransmisionProg = new TransmisionPrograma();
    for (var i=0; i<LstTransProg.length; i++) {
        if (i==theRow)
        {
              oTransmisionProg = LstTransProg[i];
              break;
        }
    }
      var oFormatoCompra = new THE_FormatoCompra();

      if (gblnumColums == 6) {
          var vFormato = new TDI_Formato;
          vFormato.CveFormato = new Number($('option:selected', '#cboFormato_' + theRow + '_2').val());
          vFormato.Descripcion = $('option:selected', '#cboFormato_' + theRow + '_2')[0].text;
          oFormatoCompra.CveFormato = vFormato;
      } else {
          var vFormato2 = new TDI_Formato;
          vFormato2.CveFormato = new Number($('option:selected', '#cboFormato_' + theRow + '_1').val());
          vFormato2.Descripcion = $('option:selected', '#cboFormato_' + theRow + '_1')[0].text;
          oFormatoCompra.CveFormato = vFormato2;
      }

      if (oOrdenTrabajo.FechaAgenda != undefined && oOrdenTrabajo.FechaAgenda != null) {
          if (oOrdenTrabajo.FechaAgenda.toString().indexOf('/Date') >= 0) {
              var vFechaAgenda1 = parseJSONToDate(oOrdenTrabajo.FechaAgenda);
              oOrdenTrabajo.FechaAgenda = vFechaAgenda1;
        }
      }

      if (oOrdenTrabajo.FechaEvento != undefined && oOrdenTrabajo.FechaEvento != null) {
          if (oOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
              var vFechaEvento1= new Date(new Number(oOrdenTrabajo.FechaEvento.substr(6, 13)));
              oOrdenTrabajo.FechaEvento = vFechaEvento1;
          }
      }
      if (oOrdenTrabajo.Programa != undefined && oOrdenTrabajo.Programa != null) {
          if (oOrdenTrabajo.Programa.FechaInicio != undefined && oOrdenTrabajo.Programa.FechaInicio != null) {
              if (oOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                  var vFechaInicio1 = new Date(new Number(oOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                  oOrdenTrabajo.Programa.FechaInicio = vFechaInicio1;
              }
          }
          if (oOrdenTrabajo.Programa.FechaFin != undefined && oOrdenTrabajo.Programa.FechaFin != null) {
              if (oOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                  var vFechaFin1 = new Date(new Number(oOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                  oOrdenTrabajo.Programa.FechaFin = vFechaFin1;
              }
          }
      }

    oFormatoCompra.CveOT = oOrdenTrabajo;
    var oPrograma = new TDI_Programa();
    oPrograma.CvePrograma = oTransmisionProg.IdPrograma;
    oPrograma.NombrePrograma = oTransmisionProg.Programa;
    oFormatoCompra.CvePrograma = oPrograma;
    if (gblnumColums == 6) {
        oFormatoCompra.Duracion = new Number($('option:selected', '#cboFormato_' + theRow + '_2').attr("data-duracion"));
        if (jQuery.trim($('#dpFechaAgenda_' + theRow + '_3').val()).length > 0 && validaFechaAgenda(3) == false) {
            var ms = Date.parse($('#dpFechaAgenda_' + theRow + '_3').val().split('/')[1] + '/' + $('#dpFechaAgenda_' + theRow + '_3').val().split('/')[0] + '/' + $('#dpFechaAgenda_' + theRow + '_3').val().split('/')[2]);
            var vFecha = new Date(ms);
        }
        if (validaFechaAgenda(3) == false) {
            oFormatoCompra.FechaCompra = new Date(vFecha);
        } else {
            oFormatoCompra.FechaCompra = new Date($('#dpFechaAgenda_' + theRow + '_3').datepicker("getDate"));
        }
    } else {
        oFormatoCompra.Duracion = new Number($('option:selected', '#cboFormato_' + theRow + '_1').attr("data-duracion"));
        if (jQuery.trim($('#dpFechaAgenda_' + theRow + '_2').val()).length > 0 && validaFechaAgenda(2) == false) {
            var ms = Date.parse($('#dpFechaAgenda_' + theRow + '_2').val().split('/')[1] + '/' + $('#dpFechaAgenda_' + theRow + '_2').val().split('/')[0] + '/' + $('#dpFechaAgenda_' + theRow + '_2').val().split('/')[2]);
            var vFecha2 = new Date(ms);
        }
        if (validaFechaAgenda(3) == false) {
            oFormatoCompra.FechaCompra = new (vFecha2);
        } else {
            oFormatoCompra.FechaCompra = new Date($("#dpFechaAgenda_" + theRow + "_2").datepicker("getDate"));
        }
    }

    //var data = new ActualizaReplicaFormatoCompra(oFormatoCompra);
    oOrdenTrabajo.FabrLlave.Programa = null;

    executeSyncRequest(wsMtdActualizaReplicaFormatoCompra, "{ 'oFormatoCompra': " + JSON.stringify(oFormatoCompra, null, 2) + " }", successActualizaReplicaFormatoCompra, myErrorManejadorProcces2);
}
var successActualizaReplicaFormatoCompra = function (data, status) {

    if (data.d != undefined) {
        if (data.d == true) {
            if (gblnumColums == 6) {
                GuardaRedactor();
            } else {
                ActualizaProgramasTransmitir();
            }
        } else {
            alertModal('No se Actualizarón los Datos de la Compra');
        }
    }
}
function myErrorManejadorProcces2(request, status, error) {
 
    inOperation = false;
    PROCESOSWS--;
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function GuardaRedactor() {
    if ($('option:selected', '#cboRedactor_' + gblRowActual + '_1').index() > 0) {
        var redactorSave = new THE_EquipoTrabajo();
        redactorSave.CveOrdenTrabajo = new THE_OrdenTrabajo();
        redactorSave.CveOrdenTrabajo.CveOrdenTrabajo = new Number(numOTActualiza);
        redactorSave.EmpleadoLlavePrimaria = new TDI_EMPL();
        if (gblnumColums == 6) {
            redactorSave.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria = new Number($('option:selected', '#cboRedactor_' + gblRowActual + '_1').val());
            redactorSave.EmpleadoLlavePrimaria.EmpleadoNombre = $('option:selected', '#cboRedactor_' + gblRowActual + '_1')[0].text;
        }
        redactorSave.PuestoLlavePrimaria = new TDI_Puestos();
        redactorSave.PuestoLlavePrimaria.PuestoLlavePrimaria = 20;
        redactorSave.CvePrograma = new TDI_Programa();
        redactorSave.CvePrograma.CvePrograma = new Number(LstTransProg[gblRowActual].IdPrograma);
        redactorSave.ClavePrograma = new Number(LstTransProg[gblRowActual].IdPrograma);
        var data = new GuardarEquipoTrabajoRedactor(redactorSave);
        executeSyncRequest(wsMtdGuardarEquipoTrabajoRedactor, JSON.stringify(data, null, 2), successGuardarEquipoTrabajoRedactor, myErrorManejadorProcces2);

    } else {
        alertModal('Se han guardado los datos de la compra; Pero para Enviar la OT a iNEWs, necesita seleccionar un Redactor');
        inOperation = false;
        PROCESOSWS--;
    }
}

var successGuardarEquipoTrabajoRedactor = function (data, status) {
    try {
        var result = data.d.split('_');
        if (result[0] != "-1") {
            if (gblnumColums != 6) {
                alertModal('Se envío el redactor ' + result[1] + ' para iNews.');
            }
            ActualizaProgramasTransmitir();
        }
        else {
            inOperation = false;
            PROCESOSWS--;
            alertModal('No se pudo enviar el redactor ' + result[1] + ' para iNews.');
        }
    }
    catch (ex) {
        inOperation = false;
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function ActualizaProgramasTransmitir() {
    PROCESOSWS++;
    var data = "{ 'NumOT':" + numOTActualiza + ", 'numEmpleado':" + sessionStorage.numUsuario + ", 'NumSeccOT':" + oOrdenTrabajo.CveSeccion.CveSeccion + "}";
    executeRequest(wsMtdGetProgramasTransmitir, data, successProgramasTransmitirRefresh, myErrorManejadorOperation);
}
var successProgramasTransmitirRefresh = function (data, status) {
    try
    {
        var oConsultaTransProg = new Array(); 
        oConsultaTransProg = data.d;
        LstTransProg = oConsultaTransProg;
        Enviar_iNEWs();
    }
    catch (ex)
    {
        inOperation = false;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function myErrorManejadorOperation(request, status, error) {
    inOperation = false;
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function Enviar_iNEWs() { 
    var oItemINews = LstTransProg[gblRowActual];
    var col = gblnumColums;
    var OTsCompradas = new Array();
    var ItemOT = new CompraOT();
    ItemOT.CveOrdenTrabajo = new THE_OrdenTrabajo();
    ItemOT.CveOrdenTrabajo.CveOrdenTrabajo = oOrdenTrabajo.CveOrdenTrabajo;
    ItemOT.CveOrdenTrabajo.CveSeccion = new TDI_Seccion();
    ItemOT.CveOrdenTrabajo.CveSeccion = oOrdenTrabajo.CveSeccion;
    ItemOT.CveOrdenTrabajo.Estatus = oOrdenTrabajo.Estatus;
    ItemOT.CveOrdenTrabajo.Local = new TDI_Local();
    ItemOT.CveOrdenTrabajo.Local.LocalLlave = $('option:selected', '#cmbLocales').val();
    ItemOT.CveProgramaEmpleado = new TDI_ProgramaEmpleado();
    ItemOT.CveProgramaEmpleado.CvePrograma = new TDI_Programa();
    ItemOT.CveProgramaEmpleado.CvePrograma.CvePrograma = oItemINews.IdPrograma;
    ItemOT.CveProgramaEmpleado.CvePrograma.NombrePrograma = oItemINews.Programa;
    ItemOT.CveSeccionFormato = new TDI_SeccionFormato();
    ItemOT.CveSeccionFormato.CveFormato = new TDI_Formato();
    ItemOT.CveSeccionFormato.CveFormato.CveFormato = oItemINews.IdFormato;
    ItemOT.CveSeccionFormato.CveFormato.Descripcion = oItemINews.Formato;
    ItemOT.SeEnviaINEWS = true;
    OTsCompradas.push(ItemOT);
    if (OTsCompradas.length > 0)
    {
        if (col == 6) //Quiere decir que hay redactor y es seccion Internacional ó de Programas
        {
            OTsCompradas[0].NombreRedactor = $('option:selected', '#cboRedactor_' + gblRowActual + '_1')[0].text;
            OTsCompradas[0].NumRedactor = $('option:selected', '#cboRedactor_' + gblRowActual + '_1').val();  
        }
        PROCESOSWS++;
        var data = new EnviaINEWS(OTsCompradas, GenerateTransac());
        executeRequest(wsMtdEnviaINEWS, JSON.stringify(data, null, 2), successEnviaINEWS, myErrorManejadorOperation2);
    }
}
function myErrorManejadorOperation2(request, status, error) {
    alert("error" + error + " request " + request + "status " + status);
    inOperation = false;
    
}
var successEnviaINEWS = function (data, status) {
    try {
        if (data.d == true) {
            alertModal('La OT se envió correctamente a iNEWs.');
        }
        else {
            alertModal('Ocurrio un error al enviar la OT a iNEWs.');
        }
        inOperation = false;
    }
    catch (ex) {
        inOperation = false;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function btnComprar_Click() { 
 try
    {
        if (!ValidaPermisosCompra())
            return;
        if (oOrdenTrabajo.CveOrdenTrabajo > 0)
        {
            var lstOT = new Array();
            lstOT.push(oOrdenTrabajo);
            if (lstOT[0].FechaAgenda == null) {
                lstOT[0].FechaAgenda = lstOT[0].FechaEvento;
            }
            AddSessionCarritoOT(lstOT);
            lstOT = new Array();
            if (sessionStorage.usserCarritoOpen == "false") {
                sessionStorage.usserCarritoOpen = "true";
                parent.openModal("Shopping Car/ShoppingCar.aspx?Rand=" + Math.floor(Math.random() * 9999)+"&loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
            }
        }
        else
        {
            alertModal('Necesita primero crear ó actualizar una OT, para poder Comprar');
            PROCESOSWS--;
        }
    }
    catch (ex)
    {
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function fncBloqOrDesCmbporLocal() {
    if ($("#cmbLocales").val() == 36) {
        $("#MainContent_cmbSeccion, #lblSeccion").show();
        $("#cmbTipoNota, #lblTipoNota").show();
        $("#MainContent_cmbProduccion, #lblproduccion").show();
        $("#MainContent_cmbFormato, #lblformato").show();
        if (bActualiza == false) {

            if ($("#MainContent_cmbSeccion").val() == 8 || $("#MainContent_cmbSeccion").val() == 5) {
                ShowCompraOT(true);
            }
        }
    }
    else {
        this.idSeccion = '';
        $("#MainContent_cmbSeccion, #lblSeccion").hide();
        $("#cmbTipoNota, #lblTipoNota").hide();
        if (bActualiza == true) {
            $("#MainContent_cmbProduccion, #lblproduccion").hide();
            $("#MainContent_cmbFormato, #lblformato").hide();
        }
    }
}


function cmbLocales_SelectionChanged() {

    fncBloqOrDesCmbporLocal();
    //obtiene reporteros por local
    if ($("#cmbLocales").val() != 36 || bActualiza == true) {
        if (bActualiza == true && (arrOTOrdenTrab != undefined && arrOTOrdenTrab[0].Local.LocalLlave != 36))
            executeSyncRequest(wsMtdObtieneDatosEquiporlocal, "{'idlocal':" + arrOTOrdenTrab[0].Local.LocalLlave + "}", successObtieneEquipoTrabajoLocal, myErrorManejadorOperation2);
        else if (bActualiza == true) {
            LlenaReporteros("#txtReportero_label");
            LlenaCamarografos("#txtCamaro_label");
            LlenaEditores("#txtEditor_label");
        }
        else
            executeSyncRequest(wsMtdObtieneDatosEquiporlocal, "{'idlocal':" + $("#cmbLocales").val() + "}", successObtieneEquipoTrabajoLocal, myErrorManejadorOperation2);

    } else {
        LlenaReporteros("#txtReportero_label");
        LlenaCamarografos("#txtCamaro_label");
        LlenaEditores("#txtEditor_label");
    }


}
var successObtieneEquipoTrabajoLocal = function (data, status) {
    try {
        arrReporteros = eval(GetArrayEquipoTrabajo(data.d.listaReporteros, "arrReporteros"));
        LlenaReporteros("#txtReportero_label");
        arrCamarografos = eval(GetArrayEquipoTrabajo(data.d.listaCamarografos, "arrCamarografos"));
        LlenaCamarografos("#txtCamaro_label");
        arrEditores = eval(GetArrayEquipoTrabajo(data.d.listaEditores, "arrEditores"));
        LlenaEditores("#txtEditor_label");        
    }
    catch (ex) {        
        inOperation = false;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function GetArrayEquipoTrabajo(lstEquipo, nombreArreglo) 
{ 
    var JsonEquipo = " [ ";
    for( var i in lstEquipo){
        JsonEquipo += "{label:'" + lstEquipo[i].EmpleadoNombre.toUpperCase() + "', value:'" + lstEquipo[i].EmpleadoLlavePrimaria + "', NumEmpl:'" + lstEquipo[i].EmpleadoNumero + "'},";

    }
    JsonEquipo = JsonEquipo.substring(1, JsonEquipo.length - 1);
    JsonEquipo += "]";
    return JsonEquipo;
}


function btnDuplicar_Click() { 
    try
    {
        if (!ValidaPermisosGuardaDuplica())
        {
            return;
        }
        if (($("#MainContent_cmbSeccion").val() == 8 || $("#MainContent_cmbSeccion").val() == 5) == true && $("#cmbLocales").val() == 36) {
            alertModal('Las ordenes de trabajo de programas o espectaculos no se pueden duplicar');
            return;
        }
        if (oOrdenTrabajo.CveOrdenTrabajo > 0) {
            NumOTOriginal = oOrdenTrabajo.CveOrdenTrabajo;
            oOrdenTrabajo = new THE_OrdenTrabajo();
            oAgendaSemanal = new THE_AgendaSemanal();
            oEquipoTrabajo = new THE_EquipoTrabajo();
            Guardar = true;
            addLogistica = false;
            editLogistica = false;
            bActualiza = false;
            FillFormAct = false;
            Duplicar = true;
            if (EVDT != undefined || EVDT != null) {
                oOrdenTrabajo.CveEventoDeportivo = EVDT;
            }
            btnGuardar_Click();
        }
        else
        {
            alertModal('Necesita primero crear ó actualizar una OT, para poder duplicarla');
            PROCESOSWS--;
        }
    }
    catch (ex)
    {
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userName, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function btnEnviar_click() { 
 try
    {
        if (oOrdenTrabajo.CveOrdenTrabajo > 0)
        {
            CountWaitEnvioCompletoINEWS = 0;
            if (LstTransProg.length > 0)
            {
                var OTsCompradas = new Array();
                for (var i = 0; i < LstTransProg.length; i++) {
                    var ItemOT = new CompraOT();
                    ItemOT.CveOrdenTrabajo = new THE_OrdenTrabajo();
                    ItemOT.CveOrdenTrabajo.CveOrdenTrabajo = oOrdenTrabajo.CveOrdenTrabajo;
                    ItemOT.CveOrdenTrabajo.CveSeccion = new TDI_Seccion();
                    ItemOT.CveOrdenTrabajo.CveSeccion = oOrdenTrabajo.CveSeccion;
                    ItemOT.CveOrdenTrabajo.Local = new TDI_Local();
                    ItemOT.CveOrdenTrabajo.Local.LocalLlave = $('option:selected', '#cmbLocales').val();
                    ItemOT.CveProgramaEmpleado = new TDI_ProgramaEmpleado();
                    ItemOT.CveProgramaEmpleado.CvePrograma = new TDI_Programa();
                    ItemOT.CveProgramaEmpleado.CvePrograma.CvePrograma = LstTransProg[i].IdPrograma;
                    ItemOT.CveProgramaEmpleado.CvePrograma.NombrePrograma = LstTransProg[i].Programa;
                    ItemOT.CveSeccionFormato = new TDI_SeccionFormato();
                    ItemOT.CveSeccionFormato.CveFormato = new TDI_Formato();
                    ItemOT.CveSeccionFormato.CveFormato.CveFormato = LstTransProg[i].IdFormato;
                    ItemOT.CveSeccionFormato.CveFormato.Descripcion = LstTransProg[i].Formato;
                    ItemOT.SeEnviaINEWS = true;
                    OTsCompradas.push(ItemOT);
                    CountWaitEnvioCompletoINEWS++;
                }
                if (OTsCompradas.length > 0)
                {
                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 || oOrdenTrabajo.CveSeccion.CveSeccion == 8)
                    {
                        var NumRow = 1;
                        for (var i = 0; i < OTsCompradas.length; i++) {
                            OTsCompradas[i].NombreRedactor = $('option:selected', '#cboRedactor_' + i + '_1')[0].text;
                            OTsCompradas[i].NumRedactor = $('option:selected', '#cboRedactor_' + i + '_1').val();
                        }
                    }
                    var data = new EnviaINEWS(OTsCompradas, GenerateTransac());
                    executeRequest(wsMtdEnviaINEWS, JSON.stringify(data, null, 2), successEnviaINEWS, myErrorManejadorOperation2);
                }
            }
            else
            {
                alertModal('Necesita primero comprar una OT, para poder enviarla a iNEWs');
                PROCESOSWS--;
            }
        }
        else
        {
            alertModal('Necesita primero crear ó actualizar una OT, para poder enviarla a iNEWs');
            PROCESOSWS--;
        }
    }
    catch (ex)
    {
        PROCESOSWS--;        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userName, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function btnAvances_Click()
{
    try {
        if (oOrdenTrabajo != null && oOrdenTrabajo != undefined && oOrdenTrabajo.CveOrdenTrabajo > 0)
        {
            parent.openModal("OT/AvancesOT.aspx?advanceType=O&numOT=" + oOrdenTrabajo.CveOrdenTrabajo + "&title=" + oOrdenTrabajo.Titulo + "&oCve=" + oOrdenTrabajo.ClaveOrdenTrabajo, widthAvancesOT, heigthAvancesOT, "Avances de OT: " + oOrdenTrabajo.ClaveOrdenTrabajo);
   
        }
        else
        {
            alertModal('Creación de Órdenes de Trabajo');
            PROCESOSWS--;
        }
    }
    catch (ex)
    {
        PROCESOSWS--;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userName, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}

function btnImprimir_Click() {
    try {
        if (oOrdenTrabajo != undefined && oOrdenTrabajo.CveOrdenTrabajo > 0) {
            window.open('../../Impresiones/OTImprimir.aspx?NumOT=' + oOrdenTrabajo.CveOrdenTrabajo, 'ventana1', 'width=120,height=300,scrollbars=NO');
        }
        else {
            alertModal('Necesita primero crear ó actualizar una OT, para poder Imprimirla');
            PROCESOSWS--;
        }
    }
    catch (ex) {
        PROCESOSWS--;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userName, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function FillFormaActualizar(numOTActualiza) {
    FillFormAct = true;
    PROCESOSWS++;
    var data = "{ 'NumeroOT':'" + numOTActualiza + "' }";
    executeRequest(wsMtdObtenerDatosPantallaOrdenTrabajo, data, successConsultaDatosPantallaAct, myErrorManejadorErrores);
}
function FillFormaActualizar2() {
    try {
        var oDatosOTPantalla = new Datos_PantallaOT();
        oDatosOTPantalla.OTAgenda = arrOTAgenda;
        oDatosOTPantalla.OTEquipo = arrOTEquipo;
        oDatosOTPantalla.OTOrdenTrab = arrOTOrdenTrab;
        oDatosOTPantalla.OTLogistica = arrOTLogistica;
        oDatosOTPantalla.EstaEliminada = arrEstaEliminada;
        if (!oDatosOTPantalla.EstaEliminada) {
            DatosToSendReplicar = oDatosOTPantalla;
            oAgendaSemanal = oDatosOTPantalla.OTAgenda[0];
            oOrdenTrabajo = oDatosOTPantalla.OTOrdenTrab[0];
            if (oOrdenTrabajo.CveEventoDeportivo != null && oOrdenTrabajo.CveEventoDeportivo != undefined && oOrdenTrabajo.CveEventoDeportivo.logistica == null && oOrdenTrabajo.CveEventoDeportivo.CvePrograma == 0 && oOrdenTrabajo.CveEventoDeportivo.OrdenTrabajo == null) {
                oOrdenTrabajo.CveEventoDeportivo = null;
            }
            $("#txtNumOT").empty();
            $('#txtNumOT').append("No. OT: " + oDatosOTPantalla.OTOrdenTrab[0].ClaveOrdenTrabajo);
            $('#txtStatus').empty();
            $('#txtStatus').append("Estado: " + GetEstatusByIdEstatus(oDatosOTPantalla.OTOrdenTrab[0].Estatus));
            $("#txtTitulo").val(oDatosOTPantalla.OTOrdenTrab[0].Titulo);
            $("#txtObjetivo").val(oDatosOTPantalla.OTOrdenTrab[0].Objetivo);
            $("#txtTeaser").val(oDatosOTPantalla.OTOrdenTrab[0].Teaser);
            $('#dtFechaAg').val(oDatosOTPantalla.OTAgenda[0].FechaInicio);
            $('#dtFechaAg').datepicker({ mindate: 0 });
            $('#MainContent_cmbSeccion').val(oDatosOTPantalla.OTOrdenTrab[0].CveSeccion.CveSeccion);
            $('#MainContent_cmbSeccion').attr('disabled', 'disabled');
            if (oDatosOTPantalla.OTOrdenTrab[0].CveSeccion.CveSeccion != 36) {
                gblCveSeccionEmpl = oDatosOTPantalla.OTOrdenTrab[0].CveSeccion.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
            }

            $('#cmbLocales').val(oDatosOTPantalla.OTOrdenTrab[0].Local.LocalLlave);
            fncBloqOrDesCmbporLocal();
            if (oDatosOTPantalla.OTOrdenTrab[0].Programa != undefined && $('#MainContent_cmbProduccion').size() > 0) {
                $('#MainContent_cmbProduccion').val(oDatosOTPantalla.OTOrdenTrab[0].Programa.CvePrograma);
            }
            $("#cmbTipoNota").val(oDatosOTPantalla.OTOrdenTrab[0].CveTipoNota.CveTipoNota);

            if (oDatosOTPantalla.OTOrdenTrab[0].CveSeccion.CveSeccion == 8) {
                $("#MainContent_cmbProduccion").attr('disabled', 'disabled');
                $("#MainContent_cmbFormato").attr('disabled', 'disabled');

            }

            if (oDatosOTPantalla.OTEquipo != null) {
                var tot = oDatosOTPantalla.OTEquipo.length;
                for (var i = 0; i < tot; i++) {
                    if (oDatosOTPantalla.OTEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 1) {
                        var oReporteroTemp = new TDI_EMPL();
                        oReporteroTemp.EmpleadoLlavePrimaria = oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                        oReporteroTemp.EmpleadoNombre = GetEstatusByIdReportero(oReporteroTemp.EmpleadoLlavePrimaria);
                        oReporteroTemp.EmpleadoStatus = "http://tvawebap1/fotos/" + oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoNumero + ".jpg";
                        lstRptEqui.push(oReporteroTemp);
                    }
                    if (oDatosOTPantalla.OTEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 2) {
                        var oCamaraTemp = new TDI_EMPL();
                        oCamaraTemp.EmpleadoLlavePrimaria = oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                        oCamaraTemp.EmpleadoNombre = GetEstatusByIdCamarografo(oCamaraTemp.EmpleadoLlavePrimaria);
                        oCamaraTemp.EmpleadoStatus = "http://tvawebap1/fotos/" + oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoNumero + ".jpg";
                        lstCamEqui.push(oCamaraTemp);
                    }
                    if (oDatosOTPantalla.OTEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 94) {
                        var oEditorTemp = new TDI_EMPL();
                        oEditorTemp.EmpleadoLlavePrimaria = oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                        oEditorTemp.EmpleadoNombre = GetEstatusByIdEditor(oEditorTemp.EmpleadoLlavePrimaria);
                        oEditorTemp.EmpleadoStatus = "http://tvawebap1/fotos/" + oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoNumero + ".jpg";
                        lstEdiEqui.push(oEditorTemp);
                    }
                }
                fncLlenalsbReporteros(lstRptEqui);                           
                fncLlenalsbCamaro(lstCamEqui);
                fncLlenalsbEditor(lstEdiEqui);
            }
            
            if (oDatosOTPantalla.OTLogistica != null && oDatosOTPantalla.OTLogistica != undefined) {
                lstTempLogistica = new Array();
                           
                for (var i = 0; i < oDatosOTPantalla.OTLogistica.length; i++) {                    
                    lstTempLogistica.push(oDatosOTPantalla.OTLogistica[i]);
                }
                $.each($("#dgLogistica").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenadgLogistica();
            }
            $('#btnAddLogistica').show();
            oLogistica = new THE_Logistica();
            $('#dtFechaIni').datepicker("setDate", new Date());
            $('#dtFechaFin').datepicker("setDate", new Date());
            $('#txtLugar').val("");
            $('#txtObservaciones').val("");
            SeleccionarLocal();
            ConsultaProgramasTransmitir();
        } else {
            alertModal('Esta OT ha sido Cancelada.');
        }
    }
    catch (ex) {        
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }

}
var successConsultaDatosPantallaAct = function (data, status) {
    try {
        var oDatosOTPantalla = new Datos_PantallaOT();
        oDatosOTPantalla = data.d;
        if (!oDatosOTPantalla.EstaEliminada) {
            DatosToSendReplicar = data.d;
            oAgendaSemanal = oDatosOTPantalla.OTAgenda[0];
            oOrdenTrabajo = oDatosOTPantalla.OTOrdenTrab[0];
            if (oOrdenTrabajo.CveEventoDeportivo != null && oOrdenTrabajo.CveEventoDeportivo != undefined && oOrdenTrabajo.CveEventoDeportivo.logistica == null && oOrdenTrabajo.CveEventoDeportivo.CvePrograma == 0 && oOrdenTrabajo.CveEventoDeportivo.OrdenTrabajo == null) {
                oOrdenTrabajo.CveEventoDeportivo = null;
            }
            $("#txtNumOT").empty();
            $('#txtNumOT').append("No. OT: " + oDatosOTPantalla.OTOrdenTrab[0].ClaveOrdenTrabajo);
            $('#txtStatus').empty();
            $('#txtStatus').append("Estado: " + GetEstatusByIdEstatus(oDatosOTPantalla.OTOrdenTrab[0].Estatus));
            $("#txtTitulo").val(oDatosOTPantalla.OTOrdenTrab[0].Titulo);
            $("#txtObjetivo").val(oDatosOTPantalla.OTOrdenTrab[0].Objetivo);
            $("#txtTeaser").val(oDatosOTPantalla.OTOrdenTrab[0].Teaser);
            $('#dtFechaAg').datepicker("setDate", new Date(SeleccionaFechaAgenda(oDatosOTPantalla.OTAgenda[0].FechaInicio)));
            $('#MainContent_cmbSeccion').val(oDatosOTPantalla.OTOrdenTrab[0].CveSeccion.CveSeccion);
            $('#cmbLocales').val(oDatosOTPantalla.OTOrdenTrab[0].Local.LocalLlave);
            if (oDatosOTPantalla.OTOrdenTrab[0].Programa != undefined && $('#MainContent_cmbProduccion').size() > 0) {
                $('#MainContent_cmbProduccion').val(oDatosOTPantalla.OTOrdenTrab[0].Programa.CvePrograma);
            }
            $("#cmbTipoNota").val(oDatosOTPantalla.OTOrdenTrab[0].CveTipoNota.CveTipoNota);
            if (oDatosOTPantalla.OTEquipo != null) {
                var tot = oDatosOTPantalla.OTEquipo.length;
                for (var i = 0; i < tot; i++) {
                    if (oDatosOTPantalla.OTEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 1) {
                        var oReporteroTemp = new TDI_EMPL();
                        oReporteroTemp.EmpleadoLlavePrimaria = oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                        oReporteroTemp.EmpleadoNombre = GetEstatusByIdReportero(oReporteroTemp.EmpleadoLlavePrimaria);
                        oReporteroTemp.EmpleadoStatus = "http://tvawebap1/fotos/" + oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoNumero + ".jpg";
                        lstRptEqui.push(oReporteroTemp);
                    }
                    if (oDatosOTPantalla.OTEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 2) {
                        var oCamaraTemp = new TDI_EMPL();
                        oCamaraTemp.EmpleadoLlavePrimaria = oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                        oCamaraTemp.EmpleadoNombre = GetEstatusByIdCamarografo(oCamaraTemp.EmpleadoLlavePrimaria);
                        oCamaraTemp.EmpleadoStatus = "http://tvawebap1/fotos/" + oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoNumero + ".jpg";
                        lstCamEqui.push(oCamaraTemp);
                    }
                    if (oDatosOTPantalla.OTEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 94) {
                        var oEditorTemp = new TDI_EMPL();
                        oEditorTemp.EmpleadoLlavePrimaria = oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                        oEditorTemp.EmpleadoNombre = GetEstatusByIdEditor(oEditorTemp.EmpleadoLlavePrimaria);
                        oEditorTemp.EmpleadoStatus = "http://tvawebap1/fotos/" + oDatosOTPantalla.OTEquipo[i].EmpleadoLlavePrimaria.EmpleadoNumero + ".jpg";
                        lstEdiEqui.push(oEditorTemp);
                    }
                }
                fncLlenalsbReporteros(lstRptEqui);
                fncLlenalsbCamaro(lstCamEqui);
                fncLlenalsbEditor(lstEdiEqui);
            }
            if (oDatosOTPantalla.OTLogistica != null && oDatosOTPantalla.OTLogistica != undefined) {
                lstTempLogistica = new Array();
              
                for (var i = 0; i < oDatosOTPantalla.OTLogistica.length; i++) {
                    lstTempLogistica.push(oDatosOTPantalla.OTLogistica[i]);
                }
                $.each($("#dgLogistica").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenadgLogistica();
            }
            $('#btnAddLogistica').show();
            oLogistica = new THE_Logistica();
            $('#dtFechaIni').datepicker("setDate", new Date());
            $('#dtFechaFin').datepicker("setDate", new Date());
            $('#txtLugar').val("");
            $('#txtObservaciones').val("");
            SeleccionarLocal();
            ConsultaProgramasTransmitir();
        } else {
            alertModal('Esta OT ha sido Cancelada.');
        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function SeleccionaFechaAgenda(FechaAgen)
{
    try
    {
        var Fecha = FechaAgen;
        var FechaHoy = new Date();
        if (Fecha <= FechaHoy)
        {
            $("#dtFechaAg").datepicker({ minDate: 0 });      
        }else{
            $("#dtFechaAg").datepicker({ minDate: -1 });
        }
    }
    catch(ex)
    {
    
    }
    return Fecha;
}

function GetEstatusByIdReportero(idReportero) { 
var DescReportero = "";
    for (var i = 0; i < ArrayReporteros.length; i++)
    {
        if (ArrayReporteros[i][0] == idReportero)
        {
            DescReportero = ArrayReporteros[i][1];
            return DescReportero;
        }
    }
    return DescReportero;
}
function GetEstatusByIdCamarografo(idCamarografo)
{
var DescCamarografo = "";
    for (var i = 0; i < ArrayCamarografos.length; i++)
    {
        if (ArrayCamarografos[i][0] == idCamarografo)
        {
            DescCamarografo = ArrayCamarografos[i][1];
            return DescCamarografo;
        }
    }
    return DescCamarografo;
}

function GetEstatusByIdEditor(idEditor)
{
    var DescEditor = "";
    for (var i = 0; i < ArrayEditores.length; i++)
    {
        if (ArrayEditores[i][0] == idEditor)
        {
            DescEditor = ArrayEditores[i][1];
            return DescEditor;
        }
    }
    return DescEditor;
}
function SeleccionarLocal()
{
    //Se selecciona una local
    if (oOrdenTrabajo.Local != null && oOrdenTrabajo.Local != undefined)
    {
        if ($('#cmbLocales option').size() > 0) {
            $("#cmbLocales").val(oOrdenTrabajo.Local.LocalLlave);
            cmbLocales_SelectionChanged();
        }
    }
}
function obtenNumReportero(vLlaveprimaria) {
    if (arrReporteros != undefined) {
        for (var i = 0; i < arrReporteros.length; i++) {
            if (arrReporteros[i].value == vLlaveprimaria) {
                return arrReporteros[i].NumEmpl;
            }
        }
    }
    return 0;
}
function fncLlenalsbReporteros(vlstReporteros) {
    if (vlstReporteros != undefined && vlstReporteros.length > 0) {        
        for (var i = 0; i < vlstReporteros.length; i++) {
            var oDD = $('#lsbReporteros').msDropDown().data("dd");            
            oDD.add({ text: vlstReporteros[i].EmpleadoNombre, value: vlstReporteros[i].EmpleadoLlavePrimaria, title: imgDataUrl + obtenNumReportero(vlstReporteros[i].EmpleadoLlavePrimaria) + '.jpg' }); //will add icon too. 
            SizeImageReportero();
            $("#lsbReporteros").val(vlstReporteros[i].EmpleadoLlavePrimaria);
        }
    }
}
function obtenNumCamaro(vLlaveprimaria) {
    if (arrCamarografos != undefined) {
        for (var i = 0; i < arrCamarografos.length; i++) {
            if (arrCamarografos[i].value == vLlaveprimaria) {
                return arrCamarografos[i].NumEmpl;
            }
        }
    }
    return 0;
}
function fncLlenalsbCamaro(vlstCamaro) {
    if (vlstCamaro != undefined && vlstCamaro.length > 0) {
        for (var i = 0; i < vlstCamaro.length; i++) {

            var oDD = $('#lsbCamaro').msDropDown().data("dd");
            oDD.add({ text: vlstCamaro[i].EmpleadoNombre, value: vlstCamaro[i].EmpleadoLlavePrimaria, title: imgDataUrl + obtenNumCamaro(vlstCamaro[i].EmpleadoLlavePrimaria) + '.jpg' }); //will add icon too. 
            SizeImageCamaro();
            $("#lsbCamaro").val(vlstCamaro[i].EmpleadoLlavePrimaria);
        }
    }
}
function obtenNumEditores(vLlaveprimaria) {
    if (arrEditores != undefined) {
        for (var i = 0; i < arrEditores.length; i++) {
            if (arrEditores[i].value == vLlaveprimaria) {
                return arrEditores[i].NumEmpl;
            }
        }
    }
    return 0;
}
function fncLlenalsbEditor(vlstEditor) {
    if (vlstEditor != undefined && vlstEditor.length > 0) {
        for (var i = 0; i < vlstEditor.length; i++) {

            var oDD = $('#lsbEditor').msDropDown().data("dd");
            oDD.add({ text: vlstEditor[i].EmpleadoNombre, value: vlstEditor[i].EmpleadoLlavePrimaria, title: imgDataUrl + obtenNumEditores(vlstEditor[i].EmpleadoLlavePrimaria) + '.jpg' }); //will add icon too. 
            SizeImageEditor();
            $("#lsbEditor").val(vlstEditor[i].EmpleadoLlavePrimaria);
        }
    }
}
function btnAddLogistica_click() {
     try {
      
         if ((bActualiza == false && $("#dgLogistica").children().length < 2) || (bActualiza == true)) {

             if (!editLogistica)
             { oLogistica = new THE_Logistica(); }

             if (ValidaAgregaLogistica()) {
                 oLogistica = new THE_Logistica();
                 oLogistica.CveOrdenTrabajo = oOrdenTrabajo;
                 oLogistica.Lugar = $("#txtLugar").val();
                 oLogistica.Objetivo = $("#txtObservaciones").val();
                 oLogistica.FechaEvento = $("#dtFechaIni").datepicker("getDate");
                 oLogistica.FechaFin = $("#dtFechaFin").datepicker("getDate");

                 if ($("#chkEsHorario").prop('checked') == true) {
                     oLogistica.Llamado = 1;
                 } else {
                     oLogistica.Llamado = 0;
                 }
                 addLogistica = true;
                 if (oLogistica.CveOrdenTrabajo.FechaAgenda != undefined && oLogistica.CveOrdenTrabajo.FechaAgenda != null) {
                     if (oLogistica.CveOrdenTrabajo.FechaAgenda.toString().indexOf('/Date') >= 0) {
                         var vFechaAgenda1 = new Date(new Number(oLogistica.CveOrdenTrabajo.FechaAgenda.substr(6, 13)));
                         oLogistica.CveOrdenTrabajo.FechaAgenda = vFechaAgenda1;
                     }
                 }
                 if (oLogistica.CveOrdenTrabajo.FechaEvento != undefined && oLogistica.CveOrdenTrabajo.FechaEvento != null) {
                     if (oLogistica.CveOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
                         var vFechaEvento = new Date(new Number(oLogistica.CveOrdenTrabajo.FechaEvento.substr(6, 13)));
                         oLogistica.CveOrdenTrabajo.FechaEvento = vFechaEvento;
                     }
                 }

                 if (oLogistica.CveOrdenTrabajo.Programa != undefined && oLogistica.CveOrdenTrabajo.Programa != null) {
                     if (oLogistica.CveOrdenTrabajo.Programa.FechaFin != undefined && oLogistica.CveOrdenTrabajo.Programa.FechaFin != null && oLogistica.CveOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                         var vFechaFin = new Date(new Number(oLogistica.CveOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                         oLogistica.CveOrdenTrabajo.Programa.FechaFin = vFechaFin;
                     }
                     if (oLogistica.CveOrdenTrabajo.Programa.FechaInicio != undefined && oLogistica.CveOrdenTrabajo.Programa.FechaInicio != null && oLogistica.CveOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                         var vFechaInicio = new Date(new Number(oLogistica.CveOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                         oLogistica.CveOrdenTrabajo.Programa.FechaInicio = vFechaInicio;
                     }
                 }
    
                 if (bActualiza == false) {
                     AgregaLogisticaGridAntesDeGuardar();
                 } else {
                     //Se agrega la Logistica al momento cuando se actualiza
                    var data = new GuardarLogistica(oLogistica);
                     executeRequest(wsMtdGuardarLogistica, JSON.stringify(data, null, 2), successGuardaLogistica, myErrorManejadorProcces2);       
                 }
             }
         } else {
             if (bActualiza == false && $("#dgLogistica").children().length == 2) {
                 alertModal('Solo se puede agregar una Logistica cuando se crea la Orden de Trabajo');
                 LimpiaCamposLogistica();
             }
         }
    }
    catch (ex)
    {
        PROCESOSWS--;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function  ValidaAgregaLogistica()
{
    var bValida = true;
    
    if (jQuery.trim($("#txtLugar").val()) == '') {
        alertModal('El campo Lugar no puede ser nulo');
        bValida = false;
    }else if(jQuery.trim($("#txtLugar").val()).length >2000)
    {
        alertModal('La longitud del Lugar no puede ser mayor a 2000 caracteres');
        bValida = false;
    }
    else if (jQuery.trim($("#txtObservaciones").val()) == '')
    {
        alertModal('El campo Observaciones no puede ser nulo');
        bValida = false;
    } else if (jQuery.trim($("#txtObservaciones").val()).length > 2000)
    {
        alertModal('La longitud de la observación no puede ser mayor a 2000 caracteres');
        bValida = false;
    }
    else if ($("#dtFechaIni").datepicker("getDate") == undefined)
    {
        alertModal('Necesita seleccionar una fecha de inicio de cobertura');
        bValida = false;
    }
    else if ($("#dtFechaFin").datepicker("getDate") == undefined)
    {
        alertModal('Necesita seleccionar una fecha final de cobertura');
        bValida = false;
    }
    return bValida;
}
function ShowCompraOT(vValor)
{
    if (vValor == true) {
        $("#MainContent_divOcultar").show();
    }else{
        $("#MainContent_divOcultar").hide();
    }
}
var successGuardaLogistica = function (data, status) {
    try {
        //CUANDO SE GUARDA LA OT POR PRIMERA VEZ, SE AGREGA AL GRID Y SE HACEN VISIBLE LOS BOTONES DE ADD Y DEL
        /*Termina de Guardar la Logistica*/
        $("btnAddLogistica").show();
        if (data.d <= 0) {
            if (!addLogistica) {
                var data = new ActualizaOT(oOrdenTrabajo);
                executeRequest(wsMtdActualizaOT, JSON.stringify(data, null, 2), successActualizaOT, myErrorManejadorErrores);
            }

            numOTActualiza = oOrdenTrabajo.CveOrdenTrabajo;
            bActualiza = true;
            LimpiaCamposLogistica();
            ShowCompraOT(false);
            oLogistica = new THE_Logistica();
        }
        else if (data.d > 0) {
            oLogistica.CveLogistica = data.d;
            if (lstTempLogistica == undefined) {
                lstTempLogistica = new Array;
            }
            
            lstTempLogistica.push(oLogistica);
            $.each($("#dgLogistica").children(), function (index, myDivC) {
                $(myDivC).remove();
            });
            LlenadgLogistica();

            if (!addLogistica) {
                var data = new ActualizaOT(oOrdenTrabajo);
                executeRequest(wsMtdActualizaOT, JSON.stringify(data, null, 2), successActualizaOT, myErrorManejadorErrores);
            }
            numOTActualiza = oOrdenTrabajo.CveOrdenTrabajo;
            bActualiza = true;
            LimpiaCamposLogistica();
            ShowCompraOT(false);
            oLogistica = new THE_Logistica();
        }
        else {
            inOperation = false;
            PROCESOSWS--;
        }
    }
    catch (ex) {
        inOperation = false;
        PROCESOSWS--;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
var successActualizaOT = function (data, status) {
    try {
        if (!Duplicar) {
            $("#txtNumOT").empty();
            $("#txtNumOT").append('No. OT: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
            $("#txtStatus").empty();
            $("#txtStatus").append('Estado: ' + GetEstatusByIdEstatus(oOrdenTrabajo.Estatus));
            $('#btnAddLogistica').show();
            if (Guardar) {
                alertModal('La orden de trabajo fue guardada con el número: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
            }
            /*Comienza parte de Actualizacion*/
            addLogistica = false;
            Guardar = false;
            inOperation = false;
        }
        else {
            $("#txtNumOT").empty();
            $("#txtNumOT").append('No. OT: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
            $("#txtStatus").empty();
            $("#txtStatus").append('Estado: ' + GetEstatusByIdEstatus(oOrdenTrabajo.Estatus));
            $("btnAddLogistica").show();
            //                    //Aqui tiene que Abrir la nueva OT y mandar a Actualizar la Original para hacer un reload
            AbreOTDuplicada(oOrdenTrabajo.CveOrdenTrabajo, oOrdenTrabajo.ClaveOrdenTrabajo);
            btnNuevo_Click();
            bActualiza = true;
            FillFormaActualizar2();
            alertModal('La orden de trabajo fue Duplicada con el número: ' + oOrdenTrabajo.ClaveOrdenTrabajo);
            Duplicar = false;
            Guardar = false;
            inOperation = false;
        }
        PROCESOSWS--;
    }
    catch (ex) {
        inOperation = false;
        PROCESOSWS--;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function AbreOTDuplicada(NumOT, Clave)
{
    var vContenido = "";
    vContenido = "OT/OT.aspx?numOT=" + NumOT;
    parent.openModal(vContenido, -1, -1, 'Orden de Trabajo');
}

function keypress(e, acc)
{
    if ({ 13: 1}[e.which || e.keyCode])
        if(acc == "REP")
            btnAddReportero_click();
        else if(acc == "CAM")
            btnAddCamaro_click();
        else if(acc == "EDI")
            btnAddEditor_click();
}
function txtReportero_KeyDown(e) 
{
    if ({ 13: 1}[e.which || e.keyCode])
        btnAddReportero_click();
    
}
function txtCamaro_KeyDown() {
    if (event.keyCode == '13') {
        btnAddCamaro_click();
    }
}
function txtEditor_KeyDown() {
    if (event.keyCode == '13') {
        btnAddEditor_click();
    }
}
function ErrorImg(control)
{
    control.src = "../../images/fotoEquipo.png";

}
