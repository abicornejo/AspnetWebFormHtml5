
var initParams;
var nvoFormato;

window.onload = function () { initialize(); }

$(function () {
    $("#MainContent_updPanel1").delegate(".mySortable", "mouseover", function () {
        $(this).sortable();
        return false;
    });
});

function initialize() {
    initParams = getUrlVars();
    $("#dtFecha").datepicker("setDate", new Date());
    
    /*Se obtienen las secciones*/
    getSecciones();

    if (initParams['isFromMenu'] == 0) {
        $("#cmbSecciones").val(initParams['idSeccion']);
        $("#cmbProgramas").val(initParams['idProg']);
        $("#dtFecha").val(initParams['dtFecha']);
    }

    bindList();
}

function isMostrarSecciones() {
    if ($("#cmbLocales").val() == 36)
        $("#cmbSecciones, #lblSecciones").show();
    else
        $("#cmbSecciones, #lblSecciones").hide();
}

function cargaLocales() {
    getLocalesAgendas(successLocales, myError);
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
    $("#cmbLocales").val(getLocalSeleccionar());
}

function getSecciones() {
    var data = "{ 'FABR_LLAV_PR':'4', 'SECC_LLAV_PR':'' }";
    executeSyncRequest(wsMtdgetSecciones, data, successSecciones, Error);
}

var successSecciones = function (data, status) {
    $("#cmbSecciones").empty();
    if (data.d.length > 0) {
        $("#cmbSecciones").append('<option value="0">== TODOS ==</option>');
        $.each(data.d, function (index, seccion) {
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
    }
    else
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');

    getProgEmplFiltro();
}

function getProgEmplFiltro() {
    var data = "{ 'ESIN_LLAV_PR':'0', 'EMPL_LLAV_PR':'" + sessionStorage.numUsuario + "' }";
    executeSyncRequest(wsMtdGetProgEmplFiltro, data, successProgEmplFiltro, Error);
}

var successProgEmplFiltro = function (data, status) {
    $("#cmbProgramas").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, programa) {
            $("#cmbProgramas").append('<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>');
        });
    }
}

function updateData() {
    setFiltersData();
}

function bindList() {
    $("#MainContent_btnActualizar").click();
}

function cmbLocal_changed() {
    if ($("#cmbLocales").val() == 36 || $("#cmbLocales").val() == 0) {
        $("#cmbSecciones").show();
        $("#lblSecciones").show();
    }
    else {
        $("#cmbSecciones").hide();
        $("#lblSecciones").hide();
    }
    bindList();
}

function setFiltersData() {
    var idProd = 0;
    var idsSeccion = '';
    var localDescription = '';

    localDescription = '';
    if ($("#cmbProgramas").val() > 0)
        idProd = $("#cmbProgramas").val();

    idsSeccion = $("#cmbSecciones").val();

    $("#MainContent_hiddSecc").val(idsSeccion);
    $("#MainContent_hiddFech").val($("#dtFecha").datepicker('getDate').esMXFormat());
    $("#MainContent_hiddLocl").val(localDescription);
    $("#MainContent_hiddProd").val(idProd);
    $("#MainContent_hiddTitl").val($("#txtTitulo").val());
}

function selectedValue_change() {
    bindList();
}

function imgVideo_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=-1&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function abrirAvance(control) {
    var title = 'Avances de ';
    var theUri = "OT/AvancesOT.aspx?advanceType=" + $(control).attr('data-type') + "&numOT=" + $(control).attr('data-numDat');
    theUri += "&title=" + $(control).attr('data-titu') + "&oCve=" + $(control).attr('data-oCve');
    if ($(control).attr('data-type') == 'O')
        title += 'OT: ';
    else
        title += 'Propuesta: ';
    title += $(control).attr('data-oCve');

    parent.openModalUpdatable(theUri, widthAvancesOT, heigthAvancesOT, title, this);
}

function updateForm() {
    bindList();
}

function showData_click(control) {
    parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
}

function tipoNota_changed(control) {
    PageMethods.actualizaReplicaFormatoCompra($(control).attr('data-cveOT'), $(control).attr('data-cvePr'), $("#dtFecha").datepicker("getDate"), $(control).val(), actualizaFmtoCompraOTComplete, Error);
}

function actualizaFmtoCompraOTComplete(result, userContext, myError) {
    if (result == 'False' || result == 'false')
        alertModal('No se encontrarón Cambiar Formato');
}

function sendiNewsRep(control) {
    var oFormatoCompra = new THE_FormatoCompra();

    oFormatoCompra.CveFormato = new TDI_Formato();
    oFormatoCompra.CveFormato.CveFormato = $($(control).parent().children()[4]).val();
    oFormatoCompra.CveFormato.Descripcion = $($(control).parent().children()[4]).children().filter(":selected").text();

    oFormatoCompra.CveOT = new THE_OrdenTrabajo();
    oFormatoCompra.CveOT.ClaveOrdenTrabajo = $(control).attr('data-clvOt');
    oFormatoCompra.CveOT.CveOrdenTrabajo = $(control).attr('data-cveOt');

    oFormatoCompra.CvePrograma = new TDI_Programa();
    oFormatoCompra.CvePrograma.CvePrograma = $(control).attr('data-cvePrg');
    oFormatoCompra.CvePrograma.NombrePrograma = $(control).attr('data-nomPrg');

    oFormatoCompra.Duracion = $(control).attr('data-dur');

    var from = $(control).attr('data-fecha').split("/");
    var f = new Date(from[2], from[1] - 1, from[0]);
    oFormatoCompra.FechaCompra = f;

    executeSyncRequest(wsMtdActualizaReplicaFormatoCompra, "{ 'oFormatoCompra':" + JSON.stringify(oFormatoCompra, null, 2) + " }", successUpdateiNewsRep, Error);
}

var successUpdateiNewsRep = function (data, status) {
    if (data.d == false)
        alertModal('No se encontrarón Cambiar Formato');
}

function INEWSPreform_Click(control) {
    var itemToEnviar = eval('(' + $(control).attr('data-Obj') + ')');
    itemToEnviar.CveFormato = $($(control).parent().children()[4]).val();
    itemToEnviar.NombreFormato = $($(control).parent().children()[4]).children().filter(":selected").text();

    itemToEnviar.FechaCreacion = itemToEnviar.FechaCreacion.toString().replace('/Date(', '').replace(')/', '');
    itemToEnviar.FechaCreacion = itemToEnviar.FechaCreacion.toString().substr(0, itemToEnviar.FechaCreacion.indexOf('-'));

    itemToEnviar.FechaCompra = itemToEnviar.FechaCompra.toString().replace('/Date(', '').replace(')/', '');
    itemToEnviar.FechaCompra = itemToEnviar.FechaCompra.toString().substr(0, itemToEnviar.FechaCompra.indexOf('-'));

    itemToEnviar.FechaCreacion = new Date(new Number(itemToEnviar.FechaCreacion));
    itemToEnviar.FechaCompra = new Date(new Number(itemToEnviar.FechaCompra));

    executeSyncRequest(wsMtdEnvioINewsPref, "{ 'Source':" + JSON.stringify(itemToEnviar, null, 2) + " }", successwsMtdEnvioINewsPref, Error);
}

var successwsMtdEnvioINewsPref = function (data, status) {
    if (data.d == true)
        alertModal("El envio de la nota al iNews preformato se realizo correctamente");
    else
        alertModal("No fue posible realizar el envio de la nota al iNews preformato");
}

function btniNewsAll_Click() {
    var lstItems = new Array();
    var itemToEnviar;

    if ($("#MainContent_divContentResult .divRegContent").length <= 0) {
        alertModal('No hay datos disponibles para enviar al iNews');
        return false;
    }

    $.each($("#MainContent_divContentResult .divRegContent"), function (index, item) {
        itemToEnviar = eval('(' + $(item).attr('data-item') + ')');

        itemToEnviar.CveFormato = $($(item).children()[4]).val();
        itemToEnviar.NombreFormato = $($(item).children()[4]).children().filter(":selected").text();

        itemToEnviar.FechaCreacion = itemToEnviar.FechaCreacion.toString().replace('/Date(', '').replace(')/', '');
        itemToEnviar.FechaCreacion = itemToEnviar.FechaCreacion.toString().substr(0, itemToEnviar.FechaCreacion.indexOf('-'));

        itemToEnviar.FechaCompra = itemToEnviar.FechaCompra.toString().replace('/Date(', '').replace(')/', '');
        itemToEnviar.FechaCompra = itemToEnviar.FechaCompra.toString().substr(0, itemToEnviar.FechaCompra.indexOf('-'));

        itemToEnviar.FechaCreacion = new Date(new Number(itemToEnviar.FechaCreacion));
        itemToEnviar.FechaCompra = new Date(new Number(itemToEnviar.FechaCompra));

        lstItems.push(itemToEnviar);
    });

    executeSyncRequest(wsMtdEnvioINewsDiaProgOrdn, "{ 'LstAgendaOTPrograma':" + JSON.stringify(lstItems, null, 2) + " }", successEnvioINewsDiaProgOrdn, Error);
}

var successEnvioINewsDiaProgOrdn = function(data, status){
    if(data.d == true)
        alertModal('Se enviaron al iNews y el orden de las compras se guardo correctamente');
    else
        alertModal('El envio al iNews y el orden de las compras no se logro guardar correctamente');
}

function btnGuardarOrdn_Click() {
    var lstFormatoCompra = new Array();
    var itemToEnviar;
    var temp;

    if ($("#MainContent_divContentResult .divRegContent").length <= 0) {
        alertModal('No hay datos disponibles para Guardar Orden');
        return false;
    }

    $.each($("#MainContent_divContentResult .divRegContent"), function (index, item) {
        temp = new THE_FormatoCompra();
        temp.CveOT = new THE_OrdenTrabajo();
        temp.CvePrograma = new TDI_Programa();

        itemToEnviar = eval('(' + $(item).attr('data-item') + ')');

        temp.CveOT.cveOrdenTrabajo = itemToEnviar.CveOrdenTrabajo;
        temp.CvePrograma.CvePrograma = itemToEnviar.CvePrograma;
        temp.FechaCompra = itemToEnviar.FechaCompra.toString().replace('/Date(', '').replace(')/', '');
        temp.FechaCompra = new Date(new Number(temp.FechaCompra.toString().substr(0, temp.FechaCompra.indexOf('-'))));
        temp.OrdenAgenda = index;

        lstFormatoCompra.push(temp);
    });

    executeSyncRequest(wsMtdSaveOrdenFmtoCompra, "{ 'LstFormatoCompraIpad':" + JSON.stringify(lstFormatoCompra, null, 2) + " }", successGuardaOrdn, Error);
}

var successGuardaOrdn = function (data, status) {
    if (data.d == true)
        alertModal('El orden de las compras se guardo correctamente');
    else
        alertModal('El orden de las compras no se logro guardar');
}
function btnReplicar_click(e) {
    var seccion = $(e).attr('data-seccion');
    var CveOrdenTrabajo = $(e).attr('data-id');
    gblCveOrdentrabajo = CveOrdenTrabajo;

    parent.openModal("OT/Replicar.aspx?CveOrdenTrabajo=" + CveOrdenTrabajo + "&IdSeccion=" + seccion, widthReplica, heigthReplica, "Replicar");
}

$(function () {
    $("#MainContent_updPanel1").delegate(".openMdlAgDiaria", "click", function () {
        parent.openModal("Agendas/BitacoraDiariaProgramas.aspx?isFromMenu=0&idSeccion=" + $(this).attr('data-secc') + "&dtFecha=" + $(this).attr('data-fecha') + "&idProg=" + $(this).attr('data-prog'), -1, -1, 'Bit&aacute;cora Diaria por Programa');
        return false;
    });
    $("#MainContent_updPanel1").delegate(".openMdlAgDiaria", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
        return false;
    });
});

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}