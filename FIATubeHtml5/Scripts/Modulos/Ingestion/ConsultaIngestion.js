
var theArray;
var oTable;
var tableHeigth = 0;
var tmpHideLocls = 1;
var requestIngestiones;

window.onload = function () { initialize(); }

function initialize() {

    if (tmpHideLocls != 1) {
        bindLocales();
        $("#lblLocal").show();
        $("#cmbLocal").show();
    }
    else {
        $("#lblLocal").hide();
        $("#cmbLocal").hide();
        bindSecciones(4);
    }

    tableHeigth = getMaxFloatableHeigth() - 185;
    bindTipoIngestion();
    updateData();
    /* Click event handler */
    $('#tbConsultFlex tbody tr').live('click', function () {
        sessionStorage.IngestData = JSON.stringify(theArray[$(this).attr('data-cvec')]);
        parent.openModal('Ingestion/NuevaIngestion.aspx?tipo=2', widthNuevaIngestion, heigthNuevaIngestion, 'Ingesti&oacute;n detalle');
    });
}

$(function () {
    /*Se agrega funcion para generar la funcionalidad de rango de fechas*/
    var dates = $("#dtFechaIni, #dtFechaFin").datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            var option = this.id == "dtFechaIni" ? "minDate" : "maxDate",
    					instance = $(this).data("datepicker"),
    					date = $.datepicker.parseDate(
    						instance.settings.dateFormat ||
    						$.datepicker._defaults.dateFormat,
    						selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });
    $("#dtFechaIni").datepicker("setDate", new Date());
    $("#dtFechaFin").datepicker("setDate", new Date());
});

function bindSecciones(factory) {
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeSyncRequest(wsMtdgetSecciones, data, successSecciones, Error);
}

var successSecciones = function (data, status) {
    var cont = 0;
    $("#cmbSeccion").empty();
    if (data.d.length > 0) {
        $.each(data.d, function (index, seccion) {
            if (index == 0)
                $("#cmbSeccion").append('<option value="0">== TODOS ==</option>');
            $("#cmbSeccion").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
        $("#cmbSeccion").prop('selectedIndex', 0);
    }
    else
        $("#cmbSeccion").append('<option value="-1">No hay Registros...</option>');
}

function bindTipoIngestion() {
    executeSyncRequest(wsMtdConsultaTipoIngestion, "{ }", successTipoIngestion, Error);
}

var successTipoIngestion = function (data, status) {
    $("#cmbTipoIngestion").empty();
    $("#cmbTipoIngestion").append("<option value='0'>== TODOS ==</option>");
    $.each(data.d, function (index, ingestion) {
        $("#cmbTipoIngestion").append('<option value="' + ingestion.CveTipoIngestion + '">' + ingestion.NombreTipoIngestion + '</option>');
    });
}

function bindLocales() {
    getLocales(successLocales, Error);
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLocal").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cmbLocal").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocal").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    $("#cmbLocal").val(getLocalSeleccionar());

    if ($("#cmbLocal").val() == 36 || $("#cmbLocal").val() == 0)
        bindSecciones(4);
    else {
        $("#cmbSeccion").empty();
        $("#cmbSeccion").append("<option value='114'>NOTICIAS LOCALES</option>");
    }

    if ($("#cmbLocal").val() == 0)
        $("#cmbSeccion").append("<option value='114'>NOTICIAS LOCALES</option>");
}

function local_changes() {
    if ($("#cmbLocal").val() == 36 || $("#cmbLocal").val() == 0)
        bindSecciones(4);
    else {
        $("#cmbSeccion").empty();
        $("#cmbSeccion").append("<option value='114'>NOTICIAS LOCALES</option>");
    }

    if ($("#cmbLocal").val() == 0)
        $("#cmbSeccion").append("<option value='114'>NOTICIAS LOCALES</option>");
}

function validateData() {
    if ($("#cmbSeccion").val() == undefined || $("#cmbSeccion").val() < 0) {
        alertModal('Debe seleccionar una secci&oacute;n');
        return false;
    }
    if ($("#cmbTipoIngestion").val() == undefined || $("#cmbTipoIngestion").val() < 0) {
        alertModal('Debe seleccionar un tipo de ingesti&oacute;n');
        return false;
    }
    if ($("#dtFechaIni").datepicker("getDate") == null || $("#dtFechaIni").datepicker("getDate") == undefined) {
        alertModal('Debe especificar una fecha inicial');
        return false;
    }
    if ($("#dtFechaFin").datepicker("getDate") == null || $("#dtFechaFin").datepicker("getDate") == undefined) {
        alertModal('Debe especificar una fecha final');
        return false;
    }
    if( $("#dtFechaIni").datepicker("getDate").getTime() > $("#dtFechaFin").datepicker("getDate").getTime()){
        alertModal('La fecha final no puede ser menor a la fecha inicial');
        return false;
    }

    return true;
}

function updateData() {
    try {
        if (validateData() == true) {
            requestIngestiones = new RequestConsultaIngestiones();
            requestIngestiones.loclId = (tmpHideLocls == 1) ? 36 : $("#cmbLocal").val();
            requestIngestiones.cveSeccion = $("#cmbSeccion").val();
            requestIngestiones.cveTipoIngestion = $("#cmbTipoIngestion").val();
            requestIngestiones.fechaInicial = $("#dtFechaIni").datepicker("getDate");
            requestIngestiones.fechaFinal = $("#dtFechaFin").datepicker("getDate");
            requestIngestiones.claveOT = $.trim($("#txtOT").val());

            $('div.modal').show();
            executeRequest(wsMtdGetIngestiones, JSON.stringify(requestIngestiones), successUpdateData, myError);
        }
    }
    catch (exception) {
        $('div.modal').hide();
    }
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + request.statusText);
    $('div.modal').hide();
}

var successUpdateData = function (data, status) {
    try {
        var Tabla = "";
        var Arreglo = new Array();
        theArray = new Array();
        var columnDefs;

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbConsultFlex' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th>OT</th>";
        Tabla += "<th>T&iacute;tulo</th>";
        Tabla += "<th>Fecha</th>";
        if (tmpHideLocls != 1)
            Tabla += "<th>Local</th>";
        Tabla += "<th>Secci&oacute;n</th>";
        Tabla += "<th>Estatus</th>";
        Tabla += "<th>Ingesti&oacute;n</th>";
        Tabla += "<th># Cinta</th>";
        Tabla += "<th>Recepci&oacute;n</th>";
        Tabla += "<th>Ingesti&oacute;n</th>";
        Tabla += "<th>Entrega</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divContent").html("").html(Tabla);

        if (tmpHideLocls != 1) {
            $.each(jQuery.parseJSON(data.d), function (index, value) {
                theArray[index] = value;
                Arreglo[index] = new Array(
                    value.ClaveOT,
                    value.TituloAgenda,
                    (value.FechaInicioAgenda) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaInicioAgenda).esMXFormat(),
                    value.LoclDesc,
                    value.NombreSeccion,
                    value.NombreEstatusIngesion,
                    value.NombreTipoIngestion,
                    value.ClaveCinta,
                    (value.FechaRecepcion) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaRecepcion).esMXFormat(),
                    (value.FechaIngestion) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaIngestion).esMXFormat(),
                    (value.FechaEntregaIngestion) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaEntregaIngestion).esMXFormat(), 
                    index
                );
            });

//            columnDefs = [
//                { "bVisible": true, "aTargets": [11] }
//            ];
        }
        else {
            $.each(jQuery.parseJSON(data.d), function (index, value) {
                theArray[index] = value;
                Arreglo[index] = new Array(
                    value.ClaveOT,
                    value.TituloAgenda,
                    (value.FechaInicioAgenda) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaInicioAgenda).esMXFormat(),
                    value.NombreSeccion,
                    value.NombreEstatusIngesion,
                    value.NombreTipoIngestion,
                    value.ClaveCinta,
                    (value.FechaRecepcion) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaRecepcion).esMXFormat(),
                    (value.FechaIngestion) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaIngestion).esMXFormat(),
                    (value.FechaEntregaIngestion) == '/Date(-62135575200000)/' ? '' : parseJSONToDate(value.FechaEntregaIngestion).esMXFormat(),
                    index
                );
            });

//            columnDefs = [
//                { "bVisible": true, "aTargets": [10] }
//            ];
        }

        oTable = $('#tbConsultFlex').dataTable({
            "fnRowCallback":
            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(0)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(1)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(2)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(3)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(4)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(5)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(6)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(7)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(8)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(9)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                if (tmpHideLocls != 1)
                    $('td:eq(10)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');

                $(nRow).attr('data-cvec', aData[10]);
                return nRow;
            }, "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
//            "aoColumnDefs": columnDefs,
            "sPaginationType": "full_numbers",
            "sScrollY": tableHeigth,
            "iDisplayLength": 100,
            "aaData": Arreglo,
            "oLanguage": { "sProcessing": "Procesando, por favor espere...",
                "sLengthMenu": "Mostrar <select><option value='5'>5</option><option value='10'>10</option><option value='25'>25</option><option value='50'>50</option><option value='100' selected='selected'>100</option></select> registros por p&aacute;gina",
                "sZeroRecords": "No se encontraron resultados",
                "sInfo": "&nbsp;&nbsp;Mostrando desde _START_ hasta _END_ de _TOTAL_ registros&nbsp;&nbsp;",
                "sInfoEmpty": "&nbsp;&nbsp;Mostrando desde 0 hasta 0 de 0 registros&nbsp;&nbsp;",
                "sInfoFiltered": "<br><em>( filtrado de _MAX_ registros en total )</em>",
                "sInfoPostFix": "",
                "sLoadingRecords": "Por favor aguarde - cargando...",
                "sSearch": "Buscar: ",
                "oPaginate": {
                    "sFirst": "",
                    "sPrevious": "",
                    "sNext": "",
                    "sLast": ""
                }
            }
        });
    }
    catch (exception) {
        alertModal('Ocurrio un problema al cargar la informacion del Grid.');
    }
    finally {
        $('div.modal').hide();
    }
}

function nuevaIngestion() {
    parent.openModal('Ingestion/NuevaIngestion.aspx?tipo=1',  widthNuevaIngestion, heigthNuevaIngestion, 'Ingesti&oacute;n detalle');
}