
var tableHeigth = 0;

window.onload = function() { initialize(); }

function initialize(){
    getLocalesAgendas(successLocales, myError);

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
    tableHeigth = (getMaxFloatableHeigth() - 200);
    createTable(new Array(), "divContenido", "Reporte de Asignaci&oacute;n de Notas por Local");
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
}

function btnBuscar_click() {
    try {
        $('div.modal').show();
        executeRequest(wsMtdGetRptAsignacionNotas, "{ 'local': " + $("#cmbLocales").val() + ", 'fechaInicio': " + JSON.stringify($("#dtFechaIni").datepicker('getDate')) + ", 'fechaFin': " + JSON.stringify($("#dtFechaFin").datepicker('getDate')) + " }", successGetRptAsignacionNotas, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetRptAsignacionNotas = function (data, status) {
    createTable(data.d, "divContenido", "Reporte de Asignaci&oacute;n de Notas por Local");
    $('div.modal').hide();
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + request.statusText);
    $('div.modal').hide();
}

function createTable(theArrarContent, theDivContainer, theTitle) {
    try {
        $('div.modal').show();
        var Tabla = "";
        var cmbRealizador;
        var Arreglo = new Array();

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tb_" + theDivContainer + "' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th colspan='10'>" + theTitle + "</th>";
        Tabla += "</tr>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesMonitorRecEdicion' colspan='2'></th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion' colspan='3'>TOTAL DE NOTAS CON ASIGNACI&Oacute;N DE</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'></th>";
        Tabla += "</tr>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>LOCAL</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>TOTAL DE NOTAS GENERADAS</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>REPORTERO</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>CAMAR&Oacute;GRAFO</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>EDITOR</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>CON ASIGNACI&Oacute;N DE TEASER</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#" + theDivContainer).html("").html(Tabla);

        $.each(theArrarContent, function (index, value) {
            Arreglo[index] = new Array(
                value.LocalDesc,
                value.TotalNotas,
                value.TotReporterosAsig,
                value.TotCamarografosAsig,
                value.TotEditoresAsig,
                value.TotNotasConTeaser
            );
        });

        oTable = $('#tb_' + theDivContainer).dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentMonitorRecEdicion');
                    $('td:eq(1)', nRow).addClass('divContentMonitorRecEdicion');
                    $('td:eq(2)', nRow).addClass('divContentMonitorRecEdicion');
                    $('td:eq(3)', nRow).addClass('divContentMonitorRecEdicion');
                    $('td:eq(4)', nRow).addClass('divContentMonitorRecEdicion');
                    $('td:eq(5)', nRow).addClass('divContentMonitorRecEdicion');
                    return nRow;
                },
            "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
            "bPaginate": false,
            "sScrollY": tableHeigth,
            "iDisplayLength": 100,
            "aaData": Arreglo,
            "bScrollCollapse": true,
            "bFilter": false,
            "bSort": false,
            "oLanguage": { "sProcessing": "Procesando, por favor espere...",
                "sLengthMenu": "Mostrar <select><option value='5'>5</option><option value='10'>10</option><option value='25'>25</option><option value='50'>50</option><option value='100' selected='selected'>100</option></select> registros por p&aacute;gina",
                "sZeroRecords": "No se encontraron resultados",
                "sInfo": "&nbsp;&nbsp;Mostrando desde _START_ hasta _END_ de _TOTAL_ registros&nbsp;&nbsp;",
                "sInfoEmpty": "&nbsp;&nbsp;Mostrando desde 0 hasta 0 de 0 registros&nbsp;&nbsp;",
                "sInfoFiltered": "<br><em>( filtrado de _MAX_ registros en total )</em>",
                "sInfoPostFix": "",
                "sLoadingRecords": "Por favor aguarde - cargando...",
                "sProcessing": "Processando...",
                "sSearch": "Buscar: ",
                "oPaginate": {
                    "sFirst": "",
                    "sPrevious": "",
                    "sNext": "",
                    "sLast": ""
                }
            }, "sDom": 'Tlfrtip',
            "oTableTools": { "sSwfPath": "../../Styles/images/copy_cvs_xls_pdf.swf" }
        });
    }
    catch (ex) { }
    finally {
        $('div.modal').hide();
    }
}