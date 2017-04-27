
var t=null;
var myTime = 21;

$(document).ready(function () {

    $("#dtFechaIni").datepicker({});
    $("#dtFechaIni").datepicker('setDate', new Date());
    $("button#btnBusrTrans").die().live("click", function () {
        getTransferInterlocales();
    });
    getLocalesEmpl();

});

var getLocalesEmpl = function () {
    var data = "{'EMPL_LLAV_PR':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdGetLocalesEmpl, data, successGetLocalesEmpl, errorGetLocalesempl);
}

var successGetLocalesEmpl = function (data) {

    var lclEml = "";
    var Options = "<option value=''>==TODAS LAS LOCALES==</option>";
    $.each(data.d, function (index, value) {

        if (value["Local"]["LocalLlave"] != 0)
            lclEml += value["Local"]["LocalLlave"] + ",";

    });
    if (lclEml != "") lclEml = lclEml.substring(0, lclEml.length - 1);

    Options += "<option value='" + lclEml.toString() + "'>==  MIS LOCALES ==</option>";

    getLocalesAgendas(function (datosLocales) {
        $.each(datosLocales.d, function (index, local) {
            if (local["LocalLlave"] != undefined && local["LocalLlave"] != 0)
                Options += '<option value="' + local["LocalLlave"] + '">' + local["LocalDescripcion"] + '</option>';
        });

    }, function () { alert("Error al solicitar locales disponibles."); });
    $("#cmbLocales").html("").html(Options);
     getTransferInterlocales();
}
var errorGetLocalesempl = function () {
    alert("Error Al traer locales empleado");
}
var getTransferInterlocales = function () {
    $('div.modal').show();
    var data = "{'locales':'" + $('#cmbLocales').val() + "', 'fecha':" + JSON.stringify($("#dtFechaIni").val()) + "}";
    executeRequest(wsMtdgetTransferInterlocalesHtml5, data, successGetTransferInterlocales, errorGetTransferInterlocales);
  
}
var getTransferInterlocales2 = function () {
    $('div.modal').show();
    var data = "{'locales':'" + $('#cmbLocales').val() + "', 'fecha':" + JSON.stringify($("#dtFechaIni").val()) + "}";
    executeRequest(wsMtdgetTransferInterlocalesHtml5, data, successGetTransferInterlocales2, errorGetTransferInterlocales);
    
}
var successGetTransferInterlocales = function (data) {
    screenHgt = getMaxFloatableHeigth() - 250;
    try {
        var datos = jQuery.parseJSON(data.d);
        var Tabla = "";

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbTransferencias' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesTransferencias'>Nombre</th>";
        Tabla += "<th class='divTitlesTransferencias'>Estatus</th>";
        Tabla += "<th class='divTitlesTransferencias'>Avance</th>";
        Tabla += "<th class='divTitlesTransferencias'>Destino</th>";
        Tabla += "<th class='divTitlesTransferencias'>Origen</th>";
        Tabla += "<th class='divTitlesTransferencias'>Fecha</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyTransferencias'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divContenido2").html("").html(Tabla);
        var arrayTransferencia = new Array();
        $.each(datos, function (index, value) {

            arrayTransferencia[index] = new Array(
                    value["Nombre"],
                    value["NombreEstatus"],
                    "<progress value='" + value['PorcentajeEnvio'] + "' max=\"100\"></progress><label style='width=60'><center>" + value['PorcentajeEnvio'] + "</center></label>",
                    value["NombreDestino"],
                    value["NombreOrigen"],
                    value["FechaSolicitud"]);

        });
        $('#tbTransferencias').dataTable({
            "fnRowCallback":
            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(0)', nRow).addClass('divContentTransferencias');
                $('td:eq(1)', nRow).addClass('divContentTransferencias');
                $('td:eq(2)', nRow).addClass('divContentTransferencias');
                $('td:eq(3)', nRow).addClass('divContentTransferencias');
                $('td:eq(4)', nRow).addClass('divContentTransferencias');
                $('td:eq(5)', nRow).addClass('divContentTransferencias');
                return nRow;
            },
            "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
            "sScrollY": screenHgt.toString() + "px",
            "iDisplayLength": 100,
            "aaData": arrayTransferencia,
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

    } catch (Error) { } finally { $('div.modal').hide(); }

        clearTimeout(t);
        myTime = 21;    
        t = self.setInterval(function () { Temporizador() }, 1000);
  

}

function Temporizador() {
    if (myTime == 0) {
        myTime = 21;
        getTransferInterlocales();
       
    } else {
        myTime--;
    }
    $("#lblUpdateTime").text(myTime);

}
var errorGetTransferInterlocales = function () {
    $('div.modal').hide();
    alert("error del servidor");
}
window.onload = initialize;
var screenHgt = 0;
function initialize() {
    screenHgt = getMaxFloatableHeigth() - 200;

}
