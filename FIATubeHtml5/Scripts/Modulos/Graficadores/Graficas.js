var gblValoresIniciales;
var graficaMesual;
var graficaAnual;
var otableNotas = Object();

$(document).ready(function () {
    $(".showOt").die().live("click", function (e) {
        e.preventDefault();
        var contenedor = $(this);
        if (contenedor.hasClass("OT")) {
            parent.openModal('OT/OT.aspx?numOT=' + $(contenedor).attr('data_value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(contenedor).attr('data_oCve'));
        } else if (contenedor.hasClass("VIDEO")) {
            parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data_numOT') + '&numProg=' + $(contenedor).attr('data_prod') + '&uriVideo=' + $(contenedor).attr('data_urlVideo') + '&uriImg=' + $(contenedor).attr('data_urlFoto') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
        }
    });

    $(window).bind('resize', function () {
        otableNotas.fnAdjustColumnSizing();
    });
    $("#divTabs").tabs();
    gblValoresIniciales = getUrlVars();
    $('div.modal').show();
    var fecha = new Date(Date.parse(unescape(gblValoresIniciales["Fecha"])));
    var UltimoDiaMesActual = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
    var fechaAct = fecha.getMonth() + 1;
    if (fechaAct <= 9) fechaAct = "0" + fechaAct;
    var Encabezado = unescape(gblValoresIniciales["NomEmpl"]) + " - " + unescape(gblValoresIniciales["NomSeccion"]) + " - " + setMes(fechaAct).toString() + " del " + fecha.getFullYear().toString();
    $("div.nombreEmpl").html("").html("<h2 style=' color:white;font-family:Arial;'><center>" + Encabezado + "</center></h2>");

    var FechaIniGrids = "01/" + fechaAct + "/" + fecha.getFullYear(); //primer dia del mes que se selecciono
    var FechaFinGrids = UltimoDiaMesActual.getDate() + "/" + fechaAct + "/" + fecha.getFullYear(); //ultimo dia del mes que se selecciono
    var FechaIni = "01/01/" + fecha.getFullYear(); //01 de Enero del año que eligio
    var FechaFin = FechaFinGrids;

    var data = "{ 'NumPuestos':'" + gblValoresIniciales["PuestoEmpl"] + "',  'NumSecc':'" + gblValoresIniciales["IdSeccion"] + "',  'FecIni':" + JSON.stringify(FechaIni.toString()) + ",  'FecFin':" + JSON.stringify(FechaFin.toString()) + ",  'sort':'',  'NumEmpleado':'" + gblValoresIniciales["NoEmpl"] + "'}";
    var data2 = "{ 'NumEmpleado':'" + gblValoresIniciales["NoEmpl"] + "', 'NumPuesto':'" + gblValoresIniciales["PuestoEmpl"] + "', 'FecIni':" + JSON.stringify(FechaIni.toString()) + ", 'FecFin':" + JSON.stringify(FechaFin.toString()) + "}";
    var data3 = "{ 'NumEmpleado':'" + gblValoresIniciales["NoEmpl"] + "', 'NumPuesto':'" + gblValoresIniciales["PuestoEmpl"] + "', 'FecIni':" + JSON.stringify(FechaIniGrids.toString()) + ", 'FecFin':" + JSON.stringify(FechaFinGrids.toString()) + "}";
    var data4 = "{ 'idEmpleado':'" + gblValoresIniciales["NoEmpl"] + "', 'FecIni':" + JSON.stringify(FechaIniGrids.toString()) + ", 'FecFin':" + JSON.stringify(FechaFinGrids.toString()) + "}";

    executeRequest(wsMtdGetEvalXEmpleadoMesXMesAnual, data2, function (data) {
        try {
            var datos = jQuery.parseJSON(data.d);
            var valBarras = new Array();
            var descBarras = new Array();
            var titulo = "";
            var BarrasAnual = new Array();
            var MesesAnual = new Array();
            var BarraOjiva = new Array();
            var ColoresBarras = new Array();
            var tooltipMensual = new Array();
            var tooltipAnual = new Array();
            var tooltipOjiva = new Array();
            var SumBuenas = 0;
            var SumExcelentes = 0;
            var SumMalas = 0;
            $.each(datos, function (i, v) {

                var valo = v["Nivel"].split(" ")[0].toString().split("/")[1].toString();
                SumExcelentes += parseInt(v["NumExcelentes"]);
                SumBuenas += parseInt(v["NumBuenas"]);
                SumMalas += parseInt(v["NumMalas"]);
                BarrasAnual[i] = new Array(v["NumExcelentes"], v["NumBuenas"], v["NumMalas"]);
                tooltipAnual.push("Excelente, " + setMes(valo) + " del " + v["Nivel"].split(" ")[0].toString().split("/")[2].toString() + ", " + v["NumExcelentes"],
                "Bueno, " + setMes(valo) + " del " + v["Nivel"].split(" ")[0].toString().split("/")[2].toString() + ", " + v["NumBuenas"],
                "Malo, " + setMes(valo) + " del " + v["Nivel"].split(" ")[0].toString().split("/")[2].toString() + ", " + v["NumMalas"]);
                if (v["Nivel"].split(" ")[0].toString().split("/")[1].toString() == fechaAct.toString()) {
                    valBarras[0] = new Array(v["NumExcelentes"], v["NumBuenas"], v["NumMalas"]);
                    tooltipMensual.push("Excelente, " + setMes(valo) + " del " + v["Nivel"].split(" ")[0].toString().split("/")[2].toString() + ", " + v["NumExcelentes"],
                "Bueno, " + setMes(valo) + " del " + v["Nivel"].split(" ")[0].toString().split("/")[2].toString() + ", " + v["NumBuenas"],
                "Malo, " + setMes(valo) + " del " + v["Nivel"].split(" ")[0].toString().split("/")[2].toString() + ", " + v["NumMalas"]);
                    descBarras = new Array(setMes(valo) + " del " + fecha.getFullYear());
                }
                MesesAnual[i] = v["Nivel"].split(" ")[0].toString().split("/")[1].toString() + "-" + v["Nivel"].split(" ")[0].toString().split("/")[2].toString();

            });
            BarraOjiva.push(SumExcelentes, SumBuenas, SumMalas);
            var SumaTotal = SumExcelentes + SumBuenas + SumMalas;
            var porExce = SumExcelentes * 100 / SumaTotal;
            var porBuenas = SumBuenas * 100 / SumaTotal;
            var porMalas = SumMalas * 100 / SumaTotal;
            var fe = setMes(fechaAct);

            /*INICIA GRAFICA MENSUAL ASGINANDO PARAMETROS*/
            graficaMesual = new RGraph.Bar('graMensual', valBarras);
            graficaMesual.Set('chart.title', 'GRAFICA DE EVALUACION MENSUAL');
            graficaMesual.Set('chart.title.bold', true);
            graficaMesual.Set('chart.title.size', 8);
            graficaMesual.Set('chart.labels', descBarras);
            graficaMesual.Set('chart.colors', ['green', 'blue', 'red']);
            graficaMesual.Set('chart.title.color', 'white');
            graficaMesual.Set('chart.background.barcolor1', 'white');
            graficaMesual.Set('chart.background.barcolor2', 'white');
            graficaMesual.Set('chart.background.grid.color', 'gray');
            graficaMesual.Set('chart.tooltips', tooltipMensual);
            graficaMesual.Set('chart.key', ['Excelentes: ' + valBarras[0][0], 'Buenas: ' + valBarras[0][1], 'Malas: ' + valBarras[0][2]]);
            graficaMesual.Set('chart.key.background', 'white');
            graficaMesual.Set('chart.key.colors', ['green', 'blue', 'red']);
            graficaMesual.Set('chart.text.size', 8);
            graficaMesual.Set('chart.background.grid.vlines', false);
            graficaMesual.Set('chart.text.color', 'white');
            graficaMesual.Set('chart.zoom.background.color', '#464646');
            graficaMesual.Set('chart.contextmenu', [
                              ['Vista Previa', RGraph.Zoom]
                             ]);
            graficaMesual.Set('chart.hmargin.grouped', 1);
            graficaMesual.Set('chart.variant', '3d');
            graficaMesual.Set('chart.strokestyle', 'rgba(0,0,0,0.1)');
            graficaMesual.Draw();
            /*FINALIZA GRAFICA MENSUAL*/


            /*INICIA GRAFICA DE BARRAS ANUAL ASGINANDO PARAMETROS*/
            graficaAnual = new RGraph.Bar('graAnual', BarrasAnual);
            graficaAnual.Set('chart.title', 'GRAFICA DE EVALUACIÓN ANUAL');
            graficaAnual.Set('chart.title.bold', true);
            graficaAnual.Set('chart.title.size', 8);
            graficaAnual.Set('chart.labels', MesesAnual);
            graficaAnual.Set('chart.colors', ['green', 'blue', 'red']);
            graficaAnual.Set('chart.tooltips', tooltipAnual);
            graficaAnual.Set('chart.key', ["Excelentes: " + Math.round(porExce).toString() + "%", "Buenos: " + Math.round(porBuenas).toString() + "%", "Malos: " + Math.round(porMalas).toString() + "%"]);
            graficaAnual.Set('chart.key.background', 'white');
            graficaAnual.Set('chart.key.colors', ['green', 'blue', 'red']);
            graficaAnual.Set('chart.background.grid.vlines', false);
            graficaAnual.Set('chart.text.color', 'white');
            graficaAnual.Set('chart.background.barcolor1', 'white');
            graficaAnual.Set('chart.background.barcolor2', 'white');
            graficaAnual.Set('chart.background.grid.color', 'gray'); //#464646
            graficaAnual.Set('chart.title.color', 'white');
            graficaAnual.Set('chart.shadow', true);
            graficaAnual.Set('chart.shadow.blur', 15);
            graficaAnual.Set('chart.shadow.offsetx', 0);
            graficaAnual.Set('chart.shadow.offsety', 0);
            graficaAnual.Set('chart.shadow.color', '#aaa');
            graficaAnual.Set('chart.hmargin.grouped', 1);
            graficaAnual.Set('chart.text.size', 8);
            graficaAnual.Set('chart.variant', '3d');
            graficaAnual.Set('chart.strokestyle', 'rgba(0,0,0,0.1)');
            graficaAnual.Set('chart.text.angle', 15);
            graficaAnual.Set('chart.zoom.background.color', '#464646');
            graficaAnual.Set('chart.contextmenu', [
                              ['Vista Previa', RGraph.Zoom]
                             ]);

            graficaAnual.Draw();
            /*FINALIZA GRAFICA DE BARRAS ANUAL*/

            /*INICIA GRAFICA DE OJIVA ANUAL ASGINANDO PARAMETROS*/
            tooltipOjiva.push("Excelente, </br> " + "Ene-" + fe.toString().substring(3, 0) + " del " + fecha.getFullYear() + ", </br>" + SumExcelentes.toString(), "Bueno, </br> " + "Ene-" + setMes(fechaAct).toString().substring(3, 0) + " del " + fecha.getFullYear() + ", </br> " + SumBuenas.toString(), "Malo, </br> " + "Ene-" + setMes(fechaAct).toString().substring(3, 0) + " del " + fecha.getFullYear() + ", </br> " + SumMalas.toString());
            var pie1 = new RGraph.Pie('pie1', BarraOjiva);
            pie1.Set('chart.title', 'EVALUACIÓN ANUAL');
            pie1.Set('chart.title.size', 8);
            pie1.Set('chart.colors', ['green', 'blue', 'red']);
            pie1.Set('chart.tooltips', tooltipOjiva);
            pie1.Set('chart.labels', ["Excelente " + Math.round(porExce).toString() + "%, " + SumExcelentes.toString(), "Bueno " + Math.round(porBuenas).toString() + "%, " + SumBuenas.toString(), "Malo " + Math.round(porMalas).toString() + "%, " + SumMalas.toString()]);

            pie1.Set('chart.key', ["Excelentes: " + Math.round(porExce).toString() + "%", "Buenos: " + Math.round(porBuenas).toString() + "%", "Malos: " + Math.round(porMalas).toString() + "%"]);
            pie1.Set('chart.key.background', 'white');
            pie1.Set('chart.key.colors', ['green', 'blue', 'red']);
            pie1.Set('chart.text.color', 'white');
            pie1.Set('chart.title.color', 'white');

            pie1.Set('chart.strokestyle', 'white');
            pie1.Set('chart.shadow', true);
            pie1.Set('chart.shadow.offsetx', 0);
            pie1.Set('chart.shadow.offsety', 0);
            pie1.Set('chart.shadow.blur', 25);
            pie1.Set('chart.radius', 100);
            pie1.Set('chart.linewidth', 5);
            pie1.Set('chart.text.size', 8);
            pie1.Set('chart.labels.sticks', true);
            pie1.Set('chart.labels.sticks.length', 15);
            pie1.Set('chart.labels.ingraph', true);
            pie1.Set('chart.labels.ingraph.specific', ['fg', 'dfdfd', 'sadasd']);
            pie1.Set('chart.exploded', 10);
            pie1.Set('chart.key.position.y', 285);
            pie1.Set('chart.key.position', 'gutter');

            pie1.Set('chart.zoom.background.color', '#464646');
            pie1.Set('chart.contextmenu', [
                              ['Vista Previa', RGraph.Zoom]
                             ]);
            var explode = 20;

            if (RGraph.isOld()) {
                pie1.Set('chart.exploded', [explode, explode]);
                pie1.Draw();
            } else {
                RGraph.Effects.Pie.RoundRobin(pie1);

                setTimeout(function () { pie1.Explode(0, explode); }, 1750);
                setTimeout(function () { pie1.Explode(1, explode); }, 2000);
            }
            $("div.byEval").html("").html("<label>Notas por Evaluar: </label>" + "<label>" + gblValoresIniciales["NotaSinEval"] + "</label>");
            $("div.alreadyEval").html("").html("<label>Notas Evaluadas: </label>" + "<label>" + gblValoresIniciales["NotaEval"] + "</label>");

            /*
                INICIA SEGUNDA PETICION
            */

            executeRequest(wsMtdGetCoberturas, data3, function (data) {
                var Tabla = "";
                var arrayCoberturas = new Array();
                var datos = jQuery.parseJSON(data.d);

                Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbGrafica' width='100%'>" +
                "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>F.Asignacion</th></tr>"+
                "</thead><tbody id='bodyGrafica'></tbody></table>";

                $("div.coberturas").html("").html(Tabla);
                
                $.each(datos, function (i, val) {
                    var feAsig = new Date(parseInt(val["FechaAsignacion"].substr(6)));
                    feAsig = getFechaFormateada(feAsig);
                    arrayCoberturas[i] = new Array(i + 1, "<label class='showOt OT' data_value='" + val["NumOT"] + "'  data_oCve='" + val["ClaveOT"] + "' style='cursor:pointer;' >" + val["ClaveOT"] + "</label>", val["ClaveOT"], val["Titulo"], feAsig);

                });

                $('#tbGrafica').dataTable({
                    "fnRowCallback":
                        function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                            $('td:eq(0)', nRow).addClass('');
                            $('td:eq(1)', nRow).addClass('');
                            $('td:eq(2)', nRow).addClass('');
                            $('td:eq(3)', nRow).addClass('');
                            $('td:eq(4)', nRow).addClass('');

                            return nRow;
                        },
                    "fnDrawCallback":
			            function () {
			                this.css('width', '100%');
			            },
                    "aaData": arrayCoberturas,
                    "bPaginate": false,
                    "bFilter": false,
                    "bSearch": false,
                    "bInfo": false,
                    "oLanguage": { 
                        "sZeroRecords": "No se encontraron resultados"
                    }
                });
                /*
                INICIA TERCER PETICION
                */

                executeRequest(wsMtdGetNotasGral, data3, function (data) {
                    var Tabla = "";
                    var TablaExcelentes = "";
                    var TablaBuenas = "";
                    var TablaMalas = "";
                    var arrayNotas = new Array();
                    var arrayNotasExcelentes = new Array(); ce = 0;
                    var arrayNotasBuenas = new Array(); cb = 0;
                    var arrayNotasMalas = new Array(); cm = 0;
                    var datos = jQuery.parseJSON(data.d);
                    Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbNotas' width='100%'>" +
                    "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Programa</th><th>F.Transmisión</th><th>Video</th>" +
                    "</tr></thead><tbody id='bodyNotas'></tbody></table>";

                    TablaExcelentes += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbExcelentes' width='100%'>" +
                    "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Programa</th><th>F.Transmisión</th><th>Video</th>" +
                    "</tr></thead><tbody id='bodyExcelentes'></tbody></table>";

                    TablaBuenas += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbBuenas' width='100%'>" +
                    "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Programa</th><th>F.Transmisión</th><th>Video</th>" +
                    "</tr></thead><tbody id='bodyBuenas'></tbody></table>";

                    TablaMalas += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbMalas' width='100%'>" +
                    "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Programa</th><th>F.Transmisión</th><th>Video</th>" +
                    "</tr></thead><tbody id='bodyMalas'></tbody></table>";

                    $("div.notas").html("").html(Tabla);
                    $("div.excelentes").html("").html(TablaExcelentes);
                    $("div.buenas").html("").html(TablaBuenas);
                    $("div.malas").html("").html(TablaMalas);

                    $.each(datos, function (i, v) {

                        var feTrans = new Date(parseInt(v["FechaTransmision"].substr(6)));

                        feTrans = getFechaFormateada(feTrans);
                        if (parseInt(v["IdEvaluacion"]) == 1) { arrayNotasExcelentes[ce] = new Array(ce + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], v["NombrePrograma"], feTrans, "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "'  data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>"); ce++; }
                        else if (parseInt(v["IdEvaluacion"]) == 2) { arrayNotasBuenas[cb] = new Array(cb + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], v["NombrePrograma"], feTrans, "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "'  data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>"); cb++; }
                        else if (parseInt(v["IdEvaluacion"]) == 3) { arrayNotasMalas[cm] = new Array(cm + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], v["NombrePrograma"], feTrans, "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "'  data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>"); cm++; }
                        arrayNotas[i] = new Array(i + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], v["NombrePrograma"], feTrans, "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "' data_prod='" + v["IdPrograma"] + "' data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>");
                    });

                    otableNotas = $('#tbNotas').dataTable({
                        "fnRowCallback":
                            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                $('td:eq(0)', nRow).addClass('');
                                $('td:eq(1)', nRow).addClass('');
                                $('td:eq(2)', nRow).addClass('');
                                $('td:eq(3)', nRow).addClass('');
                                $('td:eq(4)', nRow).addClass('');
                                $('td:eq(5)', nRow).addClass('');
                                $('td:eq(6)', nRow).addClass('');

                                return nRow;
                            },
                        "fnDrawCallback":
			                function () {
			                    this.css('width', '100%');
			                },
                        "aaData": arrayNotas,
                        "bPaginate": false,
                        "bFilter": false,
                        "bSearch": false,
                        "bInfo": false,
                        "oLanguage": {
                            "sZeroRecords": "No se encontraron resultados"
                        }
                    });

                    $('#tbExcelentes').dataTable({
                        "fnRowCallback":
                            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                $('td:eq(0)', nRow).addClass('');
                                $('td:eq(1)', nRow).addClass('');
                                $('td:eq(2)', nRow).addClass('');
                                $('td:eq(3)', nRow).addClass('');
                                $('td:eq(4)', nRow).addClass('');
                                $('td:eq(5)', nRow).addClass('');
                                $('td:eq(6)', nRow).addClass('');

                                return nRow;
                            },
                        "fnDrawCallback":
			                function () {
			                    this.css('width', '100%');
			                },
                        "aaData": arrayNotasExcelentes,
                        "bPaginate": false,
                        "bFilter": false,
                        "bSearch": false,
                        "bInfo": false,
                        "oLanguage": {
                            "sZeroRecords": "No se encontraron resultados"
                        }
                    });

                    $('#tbBuenas').dataTable({
                        "fnRowCallback":
                            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                $('td:eq(0)', nRow).addClass('');
                                $('td:eq(1)', nRow).addClass('');
                                $('td:eq(2)', nRow).addClass('');
                                $('td:eq(3)', nRow).addClass('');
                                $('td:eq(4)', nRow).addClass('');
                                $('td:eq(5)', nRow).addClass('');
                                $('td:eq(6)', nRow).addClass('');

                                return nRow;
                            },
                        "fnDrawCallback":
			                function () {
			                    this.css('width', '100%');
			                },
                        "aaData": arrayNotasBuenas,
                        "bPaginate": false,
                        "bFilter": false,
                        "bSearch": false,
                        "bInfo": false,
                        "oLanguage": {
                            "sZeroRecords": "No se encontraron resultados"
                        }
                    });

                    $('#tbMalas').dataTable({
                        "fnRowCallback":
                            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                $('td:eq(0)', nRow).addClass('');
                                $('td:eq(1)', nRow).addClass('');
                                $('td:eq(2)', nRow).addClass('');
                                $('td:eq(3)', nRow).addClass('');
                                $('td:eq(4)', nRow).addClass('');
                                $('td:eq(5)', nRow).addClass('');
                                $('td:eq(6)', nRow).addClass('');

                                return nRow;
                            },
                        "fnDrawCallback":
			                function () {
			                    this.css('width', '100%');
			                },
                        "aaData": arrayNotasMalas,
                        "bPaginate": false,
                        "bFilter": false,
                        "bSearch": false,
                        "bInfo": false,
                        "oLanguage": {
                            "sZeroRecords": "No se encontraron resultados"
                        }
                    });
                    otableNotas.fnAdjustColumnSizing();
                    /*
                    INICIA CUARTA PETICION
                    */
                    executeRequest(wsMtdGetApelacionesByEmpleado, data4, function (dataape) {

                        var apelaciones = jQuery.parseJSON(dataape.d);
                        var xAutorizar = new Array(); var cxAu = 0;
                        var autorizadas = new Array(); var cAu = 0;
                        var rechazadas = new Array(); var cRe = 0;
                        var TotalApelaciones = 0;
                        var TablaXAutorizar = "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbXAutorizar' width='100%'>" +
                        "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Video</th><th>Apelacion</th>" +
                        "</tr></thead><tbody id='bodyXAutorizar'></tbody></table>";

                        var TablaAutorizadas = "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbAutorizadas' width='100%'>" +
                        "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Video</th><th>Apelacion</th><th>Comen.Final</th>" +
                        "</tr></thead><tbody id='bodyAutorizadas'></tbody></table>";

                        var TablaRechazadas = "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbRechazadas' width='100%'>" +
                        "<thead><tr><th>No.</th><th>Detalle</th><th>OT</th><th>Titulo</th><th>Video</th><th>Apelacion</th><th>Comen.Final</th>" +
                        "</tr></thead><tbody id='bodyRechazadas'></tbody></table>";


                        $("div.porAutorizar").html("").html(TablaXAutorizar);
                        $("div.autorizadas").html("").html(TablaAutorizadas);
                        $("div.rechazadas").html("").html(TablaRechazadas);


                        
                        $.each(apelaciones, function (index, v) {
                            TotalApelaciones++;
                            /* v["NumOT"]; v["Titulo"]; v["NombrePrograma"];  v["FechaTransmision"];  v["Tipo"]; v["DescEvaluacion"];  v["IdPrograma"];
                            v["ClaveOT"];  v["Canal"];  v["UrlVideo"];  v["UrlFoto"];
                            */

                            if (parseInt(v["Tipo"]) == 1) {
                                xAutorizar[cxAu] = new Array(cxAu + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "'  data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>");
                                cxAu++;
                            }
                            if (parseInt(v["Tipo"]) == 2) {
                                autorizadas[cAu] = new Array(cAu + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "'  data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", "Apelacion");
                                cAu++;
                            }
                            if (parseInt(v["Tipo"]) == 3) {
                                rechazadas[cRe] = new Array(cRe + 1, "<label class='showOt OT' data_value='" + v["NumOT"] + "'  data_oCve='" + v["ClaveOT"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", v["ClaveOT"], v["Titulo"], "<label class='showOt VIDEO' data_numOT='" + v["NumOT"] + "' data_urlFoto='" + v["UrlFoto"] + "'  data_urlVideo='" + v["UrlVideo"] + "' style='cursor:pointer;' >" + v["ClaveOT"] + "</label>", "Apelacion");
                                cRe++;
                            }


                        });

                        $("div.ResultApelaciones").html("").html("<label>Total Apelaciones: " + TotalApelaciones.toString() + "</label></br><label>Autorizadas: " + cAu.toString() + "</label></br><label>Rechazadas: " + cRe.toString() + "</label></br><label>Por Autorizar: " + cxAu.toString() + "</label></br>");


                        $('#tbXAutorizar').dataTable({
                            "fnRowCallback":
                                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    $('td:eq(0)', nRow).addClass('');
                                    $('td:eq(1)', nRow).addClass('');
                                    $('td:eq(2)', nRow).addClass('');
                                    $('td:eq(3)', nRow).addClass('');
                                    $('td:eq(4)', nRow).addClass('');

                                    return nRow;
                                },
                            "fnDrawCallback":
			                    function () {
			                        this.css('width', '100%');
			                    },
                            "aaData": xAutorizar,
                            "bPaginate": false,
                            "bFilter": false,
                            "bSearch": false,
                            "bInfo": false,
                            "oLanguage": {
                                "sZeroRecords": "No se encontraron resultados"
                            }
                        });


                        $('#tbAutorizadas').dataTable({
                            "fnRowCallback":
                                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    $('td:eq(0)', nRow).addClass('');
                                    $('td:eq(1)', nRow).addClass('');
                                    $('td:eq(2)', nRow).addClass('');
                                    $('td:eq(3)', nRow).addClass('');
                                    $('td:eq(4)', nRow).addClass('');
                                    $('td:eq(5)', nRow).addClass('');


                                    return nRow;
                                },
                            "fnDrawCallback":
			                    function () {
			                        this.css('width', '100%');
			                    },
                            "aaData": autorizadas,
                            "bPaginate": false,
                            "bFilter": false,
                            "bSearch": false,
                            "bInfo": false,
                            "oLanguage": {
                                "sZeroRecords": "No se encontraron resultados"
                            }
                        });


                        $('#tbRechazadas').dataTable({
                            "fnRowCallback":
                                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                                    $('td:eq(0)', nRow).addClass('');
                                    $('td:eq(1)', nRow).addClass('');
                                    $('td:eq(2)', nRow).addClass('');
                                    $('td:eq(3)', nRow).addClass('');
                                    $('td:eq(4)', nRow).addClass('');
                                    $('td:eq(5)', nRow).addClass('');


                                    return nRow;
                                },
                            "fnDrawCallback":
			                    function () {
			                        this.css('width', '100%');
			                    },
                            "aaData": rechazadas,
                            "bPaginate": false,
                            "bFilter": false,
                            "bSearch": false,
                            "bInfo": false,
                            "oLanguage": {
                                "sZeroRecords": "No se encontraron resultados"
                            }
                        });
                        $('div.modal').hide();

                    }, function () { $('div.modal').hide(); alert("Error"); });

                    $('div.modal').hide();
                    /*
                    FINALIZA CUARTA PETICION
                    */
                }, function () { $('div.modal').hide(); alert("Error"); });

                /*
                FINALIZA TERCER PETICION
                */


            }, function () { $('div.modal').hide(); alert("Error"); });

            /*
                FINALIZA SEGUNDA PETICION
            */
        } catch (Error) {
            $('div.modal').hide();
            alert("Ocurrio error al dibujar las graficas");
        }
    }, function () { $('div.modal').hide(); alert("Error"); });
});

function setMes(numero) {
    var mes = "";
    switch (numero.toString()) {
        case "12": mes = "Diciembre";
        break;
        case "11": mes = "Noviembre";
        break;
        case "10": mes = "Octubre";
        break;
        case "09": mes = "Septiembre";
        break;
        case "08": mes = "Agosto";
        break;
        case "07": mes = "Julio";
        break;
        case "06": mes = "Junio";
        break;
        case "05": mes = "Mayo";
        break;
        case "04": mes = "Abril";
        break;
        case "03": mes = "Marzo";
        break;
        case "02": mes = "Febrero";
        break;
        case "01": mes = "Enero";
        break;
    }
    return mes;
}

function getFechaFormateada(fecha) {

    var Dia = fecha.getDate();
    var Mes = fecha.getMonth() + 1;
    var Anio = fecha.getFullYear();
    var Hora = fecha.getHours();
    var Minutos = fecha.getMinutes();
    var Segundos = fecha.getSeconds();

    if (Dia <= 9) Dia = "0" + Dia;
    if (Mes <= 9) Mes = "0" + Mes;
    if (Hora <= 9) Hora = "0" + Hora;
    if (Minutos <= 9) Minutos = "0" + Minutos;
    if (Segundos <= 9) Segundos = "0" + Segundos;

    return (Dia + "/" + Mes + "/" + Anio);
}