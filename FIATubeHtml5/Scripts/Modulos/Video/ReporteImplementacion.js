var screenHgt = 0;
var FechaInicio;
var FechaFin;
var fecha;
var Meses = new Array();
Meses["01"] = "ENE"; Meses["02"] = "FEB"; Meses["03"] = "MAR"; Meses["04"] = "ABR"; Meses["05"] = "MAY"; Meses["06"] = "JUN"; Meses["07"] = "JUL"; Meses["08"] = "AGO";
Meses["09"] = "SEP"; Meses["10"] = "OCT"; Meses["11"] = "NOV"; Meses["12"] = "DIC";

$(document).ready(function () {
    getLocalesAgendas(successGetLocales, errorGetLocales);

    screenHgt = getMaxFloatableHeigth() - 180;
    fecha = new Date();
    var mesActual = fecha.getMonth() + 1;
    var AnoActual = fecha.getFullYear();
    var DiaActual = fecha.getDate();

    FechaInicio = new Date(AnoActual, 0, 1);
    var fechaTest = new Date(AnoActual, 0, 1);
    FechaInicio = getFisrtDateOfWeek(FechaInicio);
    FechaFin = new Date(FechaInicio.getFullYear(), FechaInicio.getMonth(), FechaInicio.getDate() + 6);
    var optionFinicio = "";
    var optionFFin = "";
    var sem = 1;
    var fin = fecha.getTime() - fechaTest.getTime();
    var dias = Math.floor(fin / (1000 * 60 * 60 * 24))
    for (c = 0; c < parseInt(dias); c++) {
       
        optionFinicio += "<option value='" + getFechaFormateada(FechaInicio) + "' semana='" + sem + "' d='" + FechaInicio.getDate() + "' m='" + FechaInicio.getMonth() + "' y='" + FechaInicio.getFullYear() + "' class=" + c + ">" +
					getFechaFormateada2(FechaInicio) +" - Semana "+ sem.toString() +  "</option>";
       

        optionFFin += "<option  value='" + getFechaFormateada(FechaFin) + "' semana='" + sem + "'  d='" + FechaFin.getDate() + "' m='" + FechaFin.getMonth() + "' y='" + FechaFin.getFullYear() + "' class=" + c + ">" +
					getFechaFormateada2(FechaFin) + " - Semana " + sem.toString() + "</option>";

        FechaInicio = new Date(FechaInicio.getFullYear(), FechaInicio.getMonth(), FechaInicio.getDate() + 7);
        FechaFin = new Date(FechaInicio.getFullYear(), FechaInicio.getMonth(), FechaInicio.getDate() + 6);
        sem++;
        if (FechaFin >= fecha) break;
    }

    $("#cbSemanaIni").html("").html(optionFinicio);
    $("#cbSemanaFin").html("").html(optionFFin);

    $('#cbSemanaIni').die().live("change", function () {
        var num = parseInt($('#cbSemanaIni option:selected').attr("class"));

        $('#cbSemanaFin option').each(function () {
            var clase = parseInt($(this).attr("class"));
            $(this).show();
            if (clase == num) $(this).attr("selected", "selected");
            if (clase < num) {
                $(this).hide();
            }
        });
    });

    $("#btnBuscar").die().live("click", function (e) {
        e.preventDefault();

        var ini = parseInt($('#cbSemanaIni option:selected').attr("class"));

        var fin = parseInt($('#cbSemanaFin option:selected').attr("class"));

        var flag = 0; var band = 1;
        var partA = ""; partA = " CASE ";
        var partB = ""; partB = " CASE ";
        var partC = ""; partC = " CASE ";
        $('#cbSemanaIni option').each(function () {

            var valorI = $(this).val();
            var valorF = $("#cbSemanaFin option").eq(flag).val();

            partA += " WHEN agse_fini BETWEEN \'" + valorI + " \' AND \'" + valorF + "\' THEN " + band;
            partB += " WHEN agse_fini BETWEEN \'" + valorI + " \' AND \'" + valorF + "\' THEN \'" + valorI + "'";
            partC += " WHEN agse_fini BETWEEN \'" + valorI + " \' AND \'" + valorF + "\' THEN \'" + valorF + "'";
            band++;
            flag++;
        });
        partA += " END semana, ";
        partB += " END fec_ini, ";
        partC += " END fec_fin ";
        var Query = partA + partB + partC;
        var todayIs = new Date();
        var ini_fin = "\' 26/06/2012 \'" + " AND " + "\'" + getFechaFormateada(todayIs) + "\'";
        var semana = " between " + $('#cbSemanaIni option:selected').attr("semana") + " AND " + $('#cbSemanaFin option:selected').attr("semana");
        var params = "{'local_LLav_pr':" + $("#cmbLocales").val() + ", 'queryString':" + JSON.stringify(Query) + ", 'ini_fin':" + JSON.stringify(ini_fin) + ", 'semana':'" + semana + "'}";

        $("div.modal").show();

        executeRequest(wsMtdObtenerRptImplementacion, params, successImpl, errorImpl);
    });

});
function successImpl(data) {
    try {
        var datos = jQuery.parseJSON(data.d);
        var screenHgt = getMaxFloatableHeigth() - 230;
        var Tabla = "";
        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='divTblReporteImpl display' id='tbImplementacion' width='100%'>";
        Tabla += "<thead><tr><th class='divTitlesReporteImplementacion'>Local</th><th class='divTitlesReporteImplementacion'>OT</th><th class='divTitlesReporteImplementacion'>Sem.</th><th class='divTitlesReporteImplementacion'>F.Inicio</th><th class='divTitlesReporteImplementacion'>F.Final</th>";
        Tabla += "<th class='divTitlesReporteImplementacion'>OT´s Planeadas</th><th class='divTitlesReporteImplementacion'>OT´s Compradas</th><th class='divTitlesReporteImplementacion'>Propuestas</th><th class='divTitlesReporteImplementacion'>Propuestas Compradas</th><th class='divTitlesReporteImplementacion'>Notas</th>" +
    "<th class='divTitlesReporteImplementacion'>Notas Eval.</th><th class='divTitlesReporteImplementacion'>Notas no Eval.</th><th class='divTitlesReporteImplementacion'>NT. Envios</th><th class='divTitlesReporteImplementacion'>MB. Envios</th><th class='divTitlesReporteImplementacion'>Sol. Transf.</th><th class='divTitlesReporteImplementacion'>Sol. Tranf. NT</th><th class='divTitlesReporteImplementacion'>Archivados</th> </tr>";
        Tabla += "</thead><tbody id='bodyImplementacion'></tbody></table>";
        $("div.contImplementacion").html("").html(Tabla);


        var arrayImpl = new Array();
        $.each(datos, function (i, v) {
            //console.log(v["Semana"]);
            var fechaFinToJson = new Date(parseInt(v["FeFin"].substr(6)));
            var fechaIniToJson = new Date(parseInt(v["FeInicio"].substr(6)));

            arrayImpl[i] = new Array(
            v["Desc_Local"],
            v["OT"],
            v["Semana"],
            getFechaFormateada(fechaIniToJson),
            getFechaFormateada(fechaFinToJson),           
            v["OTS_Planeadas"],
            v["OTS_Compradas"],
            v["Propuestas"],
            v["Propuestas_Compradas"],
            v["Notas"],
            v["Notas_Eval"],
            v["Notas_No_Eval"],
            v["Nt_Envios"],
            v["Mb_Envios"],
            v["Sol_Transfe"],
            v["Sol_Transfe_Nt"],
            v["Achivados"]);

        });

        var oTable=$('#tbImplementacion').dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentReporteImplementacion');
                    $('td:eq(1)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(2)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(3)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(4)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(5)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(6)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(7)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(8)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(9)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(10)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(11)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(12)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(13)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(14)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(15)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                    $('td:eq(16)', nRow).addClass('divContentReporteImplementacion varTextAlignCenter');
                  
                    return nRow;
                },
            "fnDrawCallback":
			function () {
			    this.css('width', '100%');
			    $("div.modal").hide();
			},
           
            "sPaginationType": "full_numbers",
            "bAutoWidth": true,
            "sScrollY": screenHgt.toString() + "px", 
            "iDisplayLength": 100,
            "aaData": arrayImpl,
            "bScrollCollapse": true,
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
            },"sDom": 'Tlfrtip',
                      "oTableTools": {"sSwfPath":         "../../Styles/images/copy_cvs_xls_pdf.swf"}
        });
        oTable.fnSort([[2,'asc']]);
    } catch (Error) { } finally { $("div.modal").hide(); }

}
function clickPage(e)
{
 alert("click event detected!");
}
function errorImpl() {
    $("div.modal").hide();
    alert("Error");
}
function printViewClosed() {
	
	$(window).unbind('keyup', closePrintView);
}

var closePrintView = function(e) {
    alert("cerrando");
	if(e.which == 27) {
         $("div.modal").hide();
		printViewClosed();	
	}
    if(e.cancel){
         $("div.modal").hide();
		printViewClosed();	
    }
};

function getFechaFormateada(fechaToFormat) {

    var Dia = fechaToFormat.getDate();
    var Mes = fechaToFormat.getMonth() + 1;
    var Anio = fechaToFormat.getFullYear();
    var Hora = fechaToFormat.getHours();
    var Minutos = fechaToFormat.getMinutes();
    var Segundos = fechaToFormat.getSeconds();

    if (Dia <= 9) Dia = "0" + Dia;
    if (Mes <= 9) Mes = "0" + Mes;
    if (Hora <= 9) Hora = "0" + Hora;
    if (Minutos <= 9) Minutos = "0" + Minutos;
    if (Segundos <= 9) Segundos = "0" + Segundos;

    return (Dia + "/" + Mes + "/" + Anio);
}
function getFechaFormateada2(fechaToFormat) {

    var Dia = fechaToFormat.getDate();
    var Mes = fechaToFormat.getMonth() + 1;
    var Anio = fechaToFormat.getFullYear();
    var Hora = fechaToFormat.getHours();
    var Minutos = fechaToFormat.getMinutes();
    var Segundos = fechaToFormat.getSeconds();

    if (Dia <= 9) Dia = "0" + Dia;
    if (Mes <= 9) Mes = "0" + Mes;
    if (Hora <= 9) Hora = "0" + Hora;
    if (Minutos <= 9) Minutos = "0" + Minutos;
    if (Segundos <= 9) Segundos = "0" + Segundos;

    return (Dia + "/" +Meses[Mes] + "/" + Anio);
}
var successGetLocales = function (data, status) {

    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local["LocalLlave"] == undefined)
            $("#cmbLocales").append('<option value="' + local["Local"]["LocalLlave"] + '">' + local["Local"]["LocalDescripcion"] + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local["LocalLlave"] + '">' + local["LocalDescripcion"] + '</option>');
    });
}
var errorGetLocales = function (request, status, error) {
    $('div.modal').hide();
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);

}

