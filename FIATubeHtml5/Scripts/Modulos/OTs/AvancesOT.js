var action = 'S';
var initParams;
var currentVals = new Array();
var currentValsU = new Array();

window.onload = function () { initialize(); }

function initialize() {

    $("#datosProp").hide();
    $("#datosProp2").hide();
    /*Se obtienen los parametros de inicio de la URL*/
    initParams = getUrlVars();
    if (initParams['pobsLlave'] == undefined)
        initParams['pobsLlave'] = ' ';
    cargarPagina(initParams['numOT']);
}

$(function () {
    $('#divEliminar').dialog({ resizable: false, autoOpen: false, modal: true, buttons: { "Yes": function () { $(this).dialog("close"); deleteAdvance(); }, "No": function () { $(this).dialog("close"); } } });
});

function cargarPagina(valOT) {
    try {
        $("#txtAvances").val('');
        $("#preTxtNumOT").empty();
        $("#lblTitulo").empty();
        $("#lblNumOT").empty();
        $("#lblTitulo").append(decodeURI(initParams['title']));
        $("#lblNumOT").append(initParams['oCve']);

        if (initParams['advanceType'] == 'O') {
            bindAvance(valOT);
            $("#preTxtNumOT").append("OT: ");
        }
        else if (initParams['advanceType'] == 'P') {
            $("#preTxtNumOT").append("Prop: ");
            bindAvance2(valOT, initParams['pobsLlave']);
        }
        else
            alertModal('No se ha especificado el tipo de avances a obtener');
    }
    catch (exception) { 
        alertModal('Ocurrio un problema al cargar los avances: ' + exception.Message);
    }
}

function bindAvance(valOT) {
    var data = "{ 'OTRA_LLAV_PR':" + valOT + "}";
    executeSyncRequest(wsMtdGetAdvanceOT, data, successAdvanceOT, Error);
}

function bindAvance2(valOT, pobsLlave) {
    var data = "{ 'PROP_LLAV_PR':'" + valOT + "', 'POBS_LLAV_PR':'" + pobsLlave + "'}";
    executeSyncRequest(wsMtdGetPropAdvances, data, successAdvanceOT, Error);
}

var successAdvanceOT = function (data, status) {
    if (data.d.length <= 0) {
        $("#divAvancesGuardados").hide();
        $("#hiddAvG").attr('data-AV', 0);
    }
    else {
        $("#divAvancesGuardados").show();
        loadAdvanceInfo(data.d);
    }
}

function loadAdvanceInfo(theAdvanceList) {
    var fecha;
    var usuaNomb;
    var avance;
    var dataOt;
    var dataAv;
    var contenido = "";
    $("#divAvancesGuardados").empty();
    if (theAdvanceList.length <= 0)
        $("#hiddAvG").attr('data-AV', 0);
    
    $.each(theAdvanceList, function (index, theAdvance) {
        if (initParams['advanceType'] == 'O') {
            fecha = new Date(new Number(theAdvance.ObseFecr.toString().replace('/Date(', '').replace(')/', '')));
            usuaNomb = theAdvance.UsuaNomb;
            avance = theAdvance.ObseDesc;
            dataOt = theAdvance.OtraLlPr;
            dataAv = theAdvance.ObseLlPr;
        }
        else if (initParams['advanceType'] == 'P') {
            fecha = new Date(new Number(theAdvance.AvanFecr.toString().replace('/Date(', '').replace(')/', '')));
            usuaNomb = theAdvance.UsuaNomb;
            avance = theAdvance.AvanText;
            dataOt = theAdvance.PropLlPr;
            dataAv = theAdvance.AvanCons;
        }

        if (index == 0)
            $("#hiddAvG").attr('data-AV', dataAv);

        /*Se genera el contenedor de los datos por avance*/
        contenido += "<div class='divDatosOTAvances'>"; //Contenedor de datos de avance
        contenido += "<div id='Btns' class='otButtonsBckgrndAvancesOT'><button type='button' title='Eliminar' class='btnEliminarOTAvances' data-OT='" + dataOt + "' data-AV='" + dataAv + "' onclick='btnEliminar_click(this);' ></button>" + "<button type='button' title='Editar' class='btnEditarOTAvances' data-advance='" + avance + "' data-OT='" + dataOt + "' data-AV='" + dataAv + "' onclick='btnEditar_click(this);'></button></div>";
        contenido += "<br />";
        contenido += "<label>Fecha de Creaci&oacute;n:</label>";
        contenido += "<label>" + $.datepicker.formatDate('dd/mm/yy ', fecha) + fecha.toLocaleTimeString() + "</label>";
        contenido += "<br />";
        contenido += "<label>Qui&eacute;n la cre&oacute;:</label>";
        contenido += "<label>" + usuaNomb + "</label>";
        contenido += "<br />";
        contenido += "<label>Avance:</label>";
        contenido += "<br />";
        contenido += "<textarea rows='4' class='txtAvances' readonly='readonly'>" + avance + "</textarea>";
        contenido += "<br />";
        contenido += "</div>"; //Fin de contenedor de datos de avance
    });
    $("#divAvancesGuardados").append(contenido);
}

function btnEliminar_click(control) {
    currentVals['data-OT'] = $(control).attr('data-OT');
    currentVals['data-AV'] = $(control).attr('data-AV');

    $("#divEliminar").dialog('open');
}

function deleteAdvance() {
    var data;
    
    if (initParams['advanceType'] == 'O') {
        data = "{ 'numeroOT':" + currentVals['data-OT'] + ", 'numeroAvance':" + currentVals['data-AV'] + " }";
        executeSyncRequest(wsMtdDeleteAdvanceOT, data, successDeleteAdvanceOT, Error);
    }
    else {
        data = "{ 'numeroProp':" + currentVals['data-OT'] + ", 'numeroAvance':" + currentVals['data-AV'] + " }";
        executeSyncRequest(wsMtdDeleteAdvanceProp, data, successDeleteAdvanceOT, Error);
    }

    currentVals['data-OT'] = undefined;
    currentVals['data-AV'] = undefined;
}

var successDeleteAdvanceOT = function (data, status) {
    cargarPagina(initParams['numOT']);
}

function btnEditar_click(control) {
    $("#txtAvances").val($(control).attr('data-advance'));
    currentValsU['data-OT'] = $(control).attr('data-OT');
    currentValsU['data-AV'] = $(control).attr('data-AV');
    $("#txtAvances").focus();
    $("#btnGuardar").attr('title', 'Actualizar');
    action = 'U';
}

function btnGuardar_Click() {
    var data;
    if ($.trim($("#txtAvances").val()) == '') {
        alertModal('No es posible guardar un avance vacío');
        return;
    }

    if (action == 'U') {
        if (initParams['advanceType'] == 'O') {
            data = "{ 'numeroOT':" + currentValsU['data-OT'] + ", 'numeroAvance':" + currentValsU['data-AV'] + ", 'textoAvance':'" + $("#txtAvances").val() + "', 'txbQuePaso':'" + $("#txtQue").val() + "', 'txbCuandoPaso':'" + $("#txtCuando").val() + "', 'txbQuienInvol':'" + $("#txtQuien").val() + "' }"
            executeSyncRequest(wsMtdActualizaAvanceOT, data, successActualizaAvanceOT, Error);
        }
        else {
            data = "{ 'numeroProp':" + currentValsU['data-OT'] + ", 'numeroAvance':" + currentValsU['data-AV'] + ", 'textoAvance':'" + $("#txtAvances").val() + "' }"
            executeSyncRequest(wsMtdActualizaAvanceProp, data, successActualizaAvanceOT, Error);
        }
    }
    else if (action == 'S') {
        if (initParams['advanceType'] == 'O') {
            var myObj = new THE_Observaciones();
            var otra = new THE_OrdenTrabajo();

            myObj.ObseCons = 'S';
            myObj.ObseDesc = $.trim($("#txtAvances").val());
            myObj.ObseFecr = new Date();
            myObj.ObseHora = $("#txtCuando").val();
            myObj.ObseLlPr = (new Number($("#hiddAvG").attr('data-AV')) + 1);
            myObj.ObsePers = $("#txtQuien").val();
            myObj.ObseTipo = '1';
            myObj.ObseTitu = $("#txtQue").val();

            otra.CveOrdenTrabajo = initParams['numOT'];
            myObj.Otra_LlPr = otra;
            myObj.UsuaLlPr = sessionStorage.userName;

            data = "{ 'Obse': " + JSON.stringify(myObj, null, 2) + "}";
            executeSyncRequest(wsMtdCreaAvanceOT, data, successActualizaAvanceOT, Error);
        }
        else {
            var myObj = new THE_PropuestaObservacionesIpad();

            myObj.PobsDesc = $.trim($("#txtAvances").val());
            myObj.PobsFecr = new Date();
            myObj.Prop_LlPr = new TDI_Propuesta();
            myObj.Prop_LlPr.CvePropuesta = initParams['numOT'];
            myObj.PobsUscr = sessionStorage.userName;
            myObj.PobsLlPr = (new Number($("#hiddAvG").attr('data-AV')) + 1);

            data = "{ 'Obse': " + JSON.stringify(myObj, null, 2) + "}";
            executeSyncRequest(wsMtdCreaAvancePro, data, successActualizaAvanceOT, Error);
        }
    }
}

var successActualizaAvanceOT = function (data, status) {
    action = 'S';
    $("#btnGuardar").attr('title', 'Guardar');
    cargarPagina(initParams['numOT']);
}




