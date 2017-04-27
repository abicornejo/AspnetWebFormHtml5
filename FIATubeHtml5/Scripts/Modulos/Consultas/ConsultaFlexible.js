/**
* OBJETO GLOBAL  AZTEZA.
*
* Se utilizara para llamadas a funciones o asignaciones de variables.
*/
var Azteca = new Object();


/**
* Inicializamos el objeto azteca.
*
*/
Azteca = {
    'fn': new Object(), //utilizado para crear una funcion
    'vr': new Object()//utilizado para crear alguna variable u objeto
}
/**
* VARABLES GLOBALES.
*
*/
var oTable;
$(document).ready(function () {
    
    Azteca.fn.inielements();
});
Azteca.fn.inielements = function () {
    
    $(".showOT").die().live("click", function (e) {

        var contenedor = $(this);
        if (contenedor.hasClass("byImg")) {
            parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=' + $(contenedor).attr('data-pro') + '&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Material Disponible', mainPlayer);
        } else if (contenedor.hasClass("byOT")) {
            parent.openModal('OT/OT.aspx?numOT=' + $(contenedor).attr('data-value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(contenedor).attr('data-oCve'));
        }
        e.preventDefault();
    });
    getLocalesAgendas(Azteca.fn.successGetLocales, Azteca.fn.errorGetLocales);
    Azteca.fn.getSecciones(true);
    $("#cmbLocales").die().live("change", function () {
        var valor = $(this).val();
        if (valor != 0) {
            var Desc = $(this).find("option:selected").text().toUpperCase();
            if (Desc != "AJUSCO") {
                $("#cmbSecciones").html('').html('<option value="114">NOTICIAS LOCALES</option>');
            } else {
                Azteca.fn.getSecciones(false);
            }
        } else {
            Azteca.fn.getSecciones(true);
        }

    });

    $("#btnBuscarflex").die().live("click", function () {
        var OT = $("#txtOT").val();
        var local = $("#cmbLocales").val();
        var seccion = $("#cmbSecciones").val();
        var titulo = $("#MainContent_txtTexto").val();
        var FechaIni = $("#dtFechaIni").val();
        var FechaFin = $("#dtFechaFin").val();

        var params = "{ 'OTRA_LLAV_PR':'" + OT + "',  'SECC_LLAV_PR':'" + seccion + "',  'OTRA_TITU':'" + titulo + "',  'OTRA_FECINI':'" + FechaIni + "',  'OTRA_FECFIN':'" + FechaFin + "',  'LOCL_LLAV_PR':'" + local + "'}";
        Azteca.fn.getConsultaFlex(params);
    });

    $("#tbConsultFlex").die().live("click", function (event) {
        $(oTable.fnSettings().aoData).each(function () {
            $(this.nTr).removeClass('row_selected');
        });
        $(event.target.parentNode).addClass('row_selected');
    });

}
Azteca.fn.getConsultaFlex = function (parametros) {
    $('div.modal').show();
    executeRequest(wsMtdgetgetConsultaFlexiblehtml5, parametros, Azteca.fn.sucessgetConsultaFlexiblehtml5, Azteca.fn.errorgetConsultaFlexiblehtml5);
}
Azteca.fn.sucessgetConsultaFlexiblehtml5 = function (data) {
    try {
        var datos = jQuery.parseJSON(data.d);
        var Tabla = "";
        var screenHgt = getMaxFloatableHeigth() - 210;
        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbConsultFlex' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class=''>OT</th>";
        Tabla += "<th class=''>Titulo</th>";
        Tabla += "<th class=''>Seccion</th>";
        Tabla += "<th class=' '>Etapa del Proceso</th>";
        Tabla += "<th class=''>Resumen</th>";
        Tabla += "<th class=''>Local</th>";
        Tabla += "<th class=''>Empresa</th>";
        Tabla += "<th class=''>Fabrica</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyConsultFlex'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#contenidoFlex").html("").html(Tabla);
        var Arreglo = new Array();
        $.each(datos, function (index, value) {
            value["Resumen"] = "<textarea readonly='readonly'>" + value["Resumen"] + "</textarea>";
            value["LLaveOTCvec"] = "<label class='showOT byOT' data-value='" + value['LLaveOT'] + "' data-ocve='" + value['LLaveOTCvec'] + "' style='cursor:pointer;'>" + value['LLaveOTCvec'] + "</label>";
            value["Local"] = value["Local"].toUpperCase();
            Arreglo[index] = new Array(
        value["LLaveOTCvec"],
            //value["LLaveOT"],
        value["Titulo"],
        value["Seccion"],
            // value["IdSeccion"],
        value["EtapaProceso"],
            // value["FechaCreacion"],
            // value["Origen"],
        value["Resumen"],
        value["Local"],
        value["EMPRDESC"],
        value["FABRDESC"]);

        });

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
                return nRow;
            }, "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
            //  "bScrollInfinite": true,
            // "bScrollCollapse": true,
            'bAutoWidth': true,
            "sScrollY": screenHgt.toString() + "px", 
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
            }//, "sDom": 'Tlfrtip'

        });


    } catch (Error) {

    } finally {
        $('div.modal').hide();
    }
}
Azteca.fn.errorgetConsultaFlexiblehtml5 = function () {
    alertModal("Error al procesar solicitud");
}
Azteca.fn.getSecciones = function (val) {
    var factory = '';
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeRequest(wsMtdgetSecciones, data, function (data) {
        secciones = data.d;
        $("#cmbSecciones").empty();
        var list = '<option value="0">Todas...</option>';
        if (secciones.length > 0) {
            $.each(secciones, function (index, seccion) {
                list += '<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>';
            });
            if (val) list += '<option value="114">NOTICIAS LOCALES</option>';
            $("#cmbSecciones").html(list);
        }
        else {
            $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');
        }
    }, Azteca.fn.errorSecciones);
}

Azteca.fn.errorSecciones = function () {

    alertModal("Error al procesar solicitud");
}
Azteca.fn.successGetLocales = function (data, status) {

    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local["LocalLlave"] == undefined)
            $("#cmbLocales").append('<option value="' + local["Local"]["LocalLlave"] + '">' + local["Local"]["LocalDescripcion"] + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local["LocalLlave"] + '">' + local["LocalDescripcion"] + '</option>');
    });
}
Azteca.fn.errorGetLocales = function (request, status, error) {
    $('div.modal').hide();
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);

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