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

Azteca.vr.arrayMeses = new Array("Enero", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
Azteca.vr.FechaMostrar = new Date();
Azteca.vr.FechaInicio = new Date();
Azteca.vr.FechaFin = new Date();
Azteca.vr.otable = new Object();

$(document).ready(function () {
    Azteca.fn.startEvents();
    
});

Azteca.fn.asignarfechas=function(fecha, falso_verdadero) {
    var Mes = fecha.getMonth() + 1;
    var Anio = fecha.getFullYear();
    if (falso_verdadero) {
        $("#lblWeekOfYear").text(Anio);
        Azteca.vr.FechaInicio = new Date(Azteca.vr.FechaMostrar.getFullYear(), 1, 1);
        Azteca.vr.FechaFin = new Date(Azteca.vr.FechaMostrar.getFullYear(), 11, 31);
    } else {
        $("#lblWeekOfYear").text(Azteca.vr.arrayMeses[Mes] + " del " + Anio);
        Azteca.vr.FechaInicio = new Date(Azteca.vr.FechaMostrar.getFullYear(), Azteca.vr.FechaMostrar.getMonth(), 1);
        Azteca.vr.FechaFin = new Date(Azteca.vr.FechaMostrar.getFullYear(), Azteca.vr.FechaMostrar.getMonth() + 1, 0);
    }
    Azteca.fn.GetEvalXEmpleado();
}

Azteca.fn.startEvents = function () {
    $("button.btnSaveMontos").hide();
    $("button.btnCancel").hide();
    $(":text.txtEditMontos").die().live("blur", function () {
        var valor = $(this).val();
        var valorToCompare = $(this).attr("data");
        if (isNaN(valor)) {
            alert("El valor no es numerico ");
            $(this).val($(this).attr("data"));
            $(this).removeClass("txtToUpdate");
        } else {
            $(this).removeClass("txtToUpdate");
            if (valorToCompare.toString() != valor.toString()) {
                $(this).removeClass("txtToUpdate").addClass("txtToUpdate");
            }
        }
    });
    $("#cmbPuesto").die().live("change", function () {
       
        Azteca.fn.GetEvalXEmpleado();
    });
    $("#cmbSecciones").die().live("change", function () {
            
        Azteca.fn.GetEvalXEmpleado();
    });
    $("a.showGrafica").die().live("click", function () {
        var Valores = $(this).attr("data");
        var NoEmpl = Valores.split("|")[0];
        var PuestoEmpl = Valores.split("|")[1];
        var NomEmpl = Valores.split("|")[2];
        var NomSeccion = Valores.split("|")[3];
        var IdSeccion = Valores.split("|")[4];
        var Fecha = Valores.split("|")[5];
        var NotaSinEval = Valores.split("|")[6];
        var NotasEvaluadas = Valores.split("|")[7];

        parent.openModal("Graficadores/Graficas.aspx?NoEmpl=" + NoEmpl + "&PuestoEmpl=" + PuestoEmpl + "&NomEmpl=" + NomEmpl + "&NomSeccion=" + NomSeccion + "&IdSeccion=" + IdSeccion + "&Fecha=" + Fecha + "&NotaSinEval=" + NotaSinEval + "&NotaEval=" + NotasEvaluadas, -1, -1, 'Reportaje a Detalle por Empleado');
    });
    $("button").die().live("click", function () {
        var Elem = $(this);
        if (Elem.hasClass("btnAutorizar")) {

        } else if (Elem.hasClass("btnCancel")) {
            $("button.btnEditMontos").show();
            $("button.btnSaveMontos").hide();
            $("button.btnCancel").hide();
        } else if (Elem.hasClass("btnEditMontos")) {
            Azteca.vr.otable.fnSetColumnVis(13, true);
            $("button.btnEditMontos").hide();
            $("button.btnSaveMontos").show();
            $("button.btnCancel").show();
        } else if (Elem.hasClass("btnSaveMontos")) {
            try {
                $("button.btnEditMontos").show();
                $("button.btnSaveMontos").hide();
                $("button.btnCancel").hide();
                var listaMontos = new Array();
                $(":text.txtToUpdate").each(function (i, v) {
                    var ObjMontos = new THE_MontosEmpleados();
                    var getVals = $(v).attr("dataref");
                    var numEmpleado = getVals.split("|")[0];
                    var numSeccion = getVals.split("|")[4];
                    var numPuesto = getVals.split("|")[1];
                    var coberturas = getVals.split("|")[8];
                    var notas = getVals.split("|")[9];
                    var excelentes = getVals.split("|")[10];
                    var buenas = getVals.split("|")[11];
                    var malas = getVals.split("|")[12];
                    var sinEvaluar = getVals.split("|")[6];
                    var compensacion = getVals.split("|")[14];
                    var nuevaCompesacion = $(v).val();
                    ObjMontos.CveMontosEmpleados = 10;
                    ObjMontos.CveEmpleado = new TDI_EMPL();
                    ObjMontos.CveEmpleado.EmpleadoLlavePrimaria = parseInt(numEmpleado);

                    ObjMontos.CveSeccion = new TDI_Seccion();
                    ObjMontos.CveSeccion.CveSeccion = parseInt(numSeccion);

                    ObjMontos.CvePuestos = new TDI_Puestos();
                    ObjMontos.CvePuestos.PuestoLlavePrimaria = parseInt(numPuesto);

                    ObjMontos.Coberturas = parseInt(coberturas);
                    ObjMontos.Notas = parseInt(notas);
                    ObjMontos.Excelentes = parseInt(excelentes);
                    ObjMontos.Buenas = parseInt(buenas);
                    ObjMontos.Malas = parseInt(malas);
                    ObjMontos.SinEvaluar = parseInt(sinEvaluar);
                    ObjMontos.Compensacion = parseInt(compensacion);
                    ObjMontos.NuevaCompensacion = parseInt(nuevaCompesacion);
                    ObjMontos.MontAnio = parseInt(Azteca.vr.FechaMostrar.getFullYear().toString());
                    ObjMontos.MontMes = (Azteca.vr.FechaMostrar.getMonth() + 1).toString();

                    listaMontos.push(ObjMontos);

                    $(v).removeClass("txtToUpdate");
                });


                var params = "{'MontosEmpleados':" + JSON.stringify(listaMontos) + "}";
                executeSyncRequest(wsMtdLstGuardarMontosEmpleados, params,
                               function (data) {
                                   console.log(data.d);
                               },
                               function (request, status, error) {
                                   alert(request.responseText);
                               }
                );


            } catch (Error) {

            } finally {
                Azteca.vr.otable.fnSetColumnVis(13, false);
            }

        } else if (Elem.hasClass("btnCancel")) {
            Azteca.vr.otable.fnSetColumnVis(13, false);
        }


    });

    $("#btnback").die().live("click", function (e) {
        e.preventDefault();
        if ($(":checkbox#chkAnual").attr("checked")) {
            Azteca.vr.FechaMostrar = new Date(Azteca.vr.FechaMostrar.getFullYear() - 1, Azteca.vr.FechaMostrar.getMonth(), Azteca.vr.FechaMostrar.getDate());
            Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, true);
        } else {
            Azteca.vr.FechaMostrar = new Date(Azteca.vr.FechaMostrar.getFullYear(), Azteca.vr.FechaMostrar.getMonth() - 1, Azteca.vr.FechaMostrar.getDate());
            Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, false);
        }
        Azteca.fn.GetEvalXEmpleado();
    });
    $("#btnforward").die().live("click", function (e) {
        e.preventDefault();
        if ($(":checkbox#chkAnual").attr("checked")) {
            Azteca.vr.FechaMostrar = new Date(Azteca.vr.FechaMostrar.getFullYear() + 1, Azteca.vr.FechaMostrar.getMonth(), Azteca.vr.FechaMostrar.getDate());
            Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, true);
        } else {
            Azteca.vr.FechaMostrar = new Date(Azteca.vr.FechaMostrar.getFullYear(), Azteca.vr.FechaMostrar.getMonth() + 1, Azteca.vr.FechaMostrar.getDate());
            Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, false);
        }
        Azteca.fn.GetEvalXEmpleado();

    });
    $(":checkbox#chkAnual").die().live("click", function () {
        var isChekeado = $(this).attr("checked");
        Azteca.vr.FechaMostrar = new Date();
        if (isChekeado) {
            Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, true);
        } else {
            Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, false);
        }
        Azteca.fn.GetEvalXEmpleado();
    })


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
        Azteca.fn.GetEvalXEmpleado();
    });
    getLocalesAgendas(Azteca.fn.successGetLocales, Azteca.fn.errorGetLocales);
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
    Azteca.fn.getSecciones(true);
}

Azteca.fn.errorGetLocales = function (request, status, error) {
    $('div.modal2').hide();
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);

}

Azteca.fn.getSecciones = function (val) {
    var factory = '';
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeRequest(wsMtdgetSecciones, data, function (data) {
        var secciones = data.d;
        $("#cmbSecciones").empty();
        var list = '<option value="">==TODAS==</option>';
        if (secciones.length > 0) {
            $.each(secciones, function (index, seccion) {
                list += '<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>';
            });
            if (val) list += '<option value="114">NOTICIAS LOCALES</option>';
            $("#cmbSecciones").html(list);
        }
        else {
            $("#cmbSecciones").append('<option value="">==NO SE ENCONTRARON REGISTROS==</option>');
        }
        Azteca.fn.getPuestosReportes();
      
    }, Azteca.fn.errorSecciones);
}

Azteca.fn.getPuestosReportes = function () {
    var data= "{}";
    executeRequest(wsMtdGetPuestosReportes, data, Azteca.fn.successGetPuestosReportes, Azteca.fn.errorGetPuestosReportes);
}
Azteca.fn.successGetPuestosReportes = function (data) {
    var datos = data.d;
    $("#cmbPuesto").empty();
    $.each(datos, function (index, value) {
        $("#cmbPuesto").append('<option value="' + value["PuestoLlavePrimaria"] + '">' + value["PuestoDescripcion"] + '</option>');
    });

    Azteca.vr.FechaMostrar = new Date();
    Azteca.fn.asignarfechas(Azteca.vr.FechaMostrar, false);

}
Azteca.fn.errorGetPuestosReportes = function () {
    alertModal("Error al procesar solicitud");
}


Azteca.fn.GetEvalXEmpleado = function () {
    $('div.modal2').show();
    var local= $("#cmbLocales").val();
    var puesto = $("#cmbPuesto").val();
    var seccion = $("#cmbSecciones").val();
    var data = "{'Local':" + local + ", 'NumPuestos':'" + puesto + "', 'NumSecc':'" + seccion + "', 'FecIni':" + JSON.stringify(Azteca.fn.getFechaFormateada(Azteca.vr.FechaInicio)) + ", 'FecFin':" + JSON.stringify(Azteca.fn.getFechaFormateada(Azteca.vr.FechaFin)) + ", 'sort':''}";
    executeRequest(wsMtdGetEvalXEmpleado, data, Azteca.fn.successGetEvalXEmpleado, Azteca.fn.errorGetEvalXEmpleado);

}
Azteca.fn.successGetEvalXEmpleado = function (data) {
    try {
        var screenHgt = getMaxFloatableHeigth() - 320;
        var datos = jQuery.parseJSON(data.d);
        var Tabla = "";
        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbAcumuladaMen' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>No.</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>Detalle</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>#Empleado</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>Nombre</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>Seccion</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>#Coberturas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>#Notas</th>";

        Tabla += "<th class='divTitlesAcumuladoMensual'>#Exelentes</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>#Buenas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>#Malas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>Sin Eval.</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>Texto Sin Eval</th>";

//        Tabla += "<th class='divTitlesAcumuladoMensual'>Compensacion</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tfoot id='tfootAcuMensual' >";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesAcumuladoMensual'></th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'># Coberturas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'># Notas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'># Excelentes</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>% Excelentes</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'># Buenas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>% Buenas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'># Malas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>% Malas</th>";
        Tabla += "<th class='divTitlesAcumuladoMensual'>Sin Evaluar</th>";
//        Tabla += "<th class='divTitlesAcumuladoMensual'>Compensaci&oacute;n</th>";


        Tabla += "</tr>";
        Tabla += "</tfoot>";
        Tabla += "<tbody id='bodyAcumuladaMen'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("div#ContAcumuladoMens").html("").html(Tabla);
        var datosArray = new Array();
        var _NumBuenas = 0;
        var _NumCoberturas = 0;
        var _NumExcelentes = 0;
        var _NumMalas = 0;
        var _NumNotas = 0;
        var _SinEvaluar = 0;
        var _CompensacionPuesto = 0;
        $.each(datos, function (index, value) {
            console.log(value);
            var NotasEvaluadas = parseInt(value["NumNotas"]) + parseInt(value["NumExcelentes"]) + parseInt(value["NumBuenas"]);
            var valores = value["NumEmpleado"] + "|" + //0 NumEmpleado
                          value["Puesto"] + "|" + //1 Puesto
                          value["NombreEmpleado"] + "|" + //2 NombreEmpleado
                          value["NomSeccion"] + "|" + //3 NomSeccion
                          value["NumSeccion"] + "|" + //4 NumSeccion
                          Azteca.vr.FechaMostrar + "|" + //5 fecha
                          value["SinEvaluar"].toString() + "|" + //6 SinEvaluar
                          NotasEvaluadas.toString() + "|" + //7 notasEval
                          value["NumCoberturas"] + "|" + //8 NumCoberturas
                          value["NumNotas"] + "|" + //9 NumNotas
                          value["NumExcelentes"] + "|" + //10 NumExcelentes
                          value["NumBuenas"] + "|" + //11 NumBuenas
                          value["NumMalas"] + "|" + //12 NumMalas
                          value["SinEvaluar"];// + "|" + //13 SinEvaluar
//                          value["CompensacionPuesto"]; //14 CompensacionPuesto

            datosArray[index] = new Array(
                value["Num"],
                "<a href='#' class='showGrafica' data='" + valores + "'><img src='../../../Images/stats.png' width='50px' height='50px' /></a>",
                value["EmpleadoNumero"],
                value["NombreEmpleado"],
                value["NomSeccion"],
                value["NumCoberturas"],
                value["NumNotas"],
                value["NumExcelentes"],
                value["NumBuenas"],
                value["NumMalas"],
                value["SinEvaluar"], value["SinEvaluar"]
//                value["CompensacionPuesto"]
                );

            _NumBuenas += value["NumBuenas"];
            _NumCoberturas += value["NumCoberturas"];
            _NumExcelentes += value["NumExcelentes"];
            _NumMalas += value["NumMalas"];
            _NumNotas += value["NumNotas"];
            _SinEvaluar += value["SinEvaluar"];
            _CompensacionPuesto += value["CompensacionPuesto"];


        });

        var lblTotal = "TOTAL";
        var lblCobertura = _NumCoberturas.toString();
        var lblNotas = _NumNotas.toString();
        var lblExcelentes = _NumExcelentes.toString();
        var lblExcelentesPer = _NumCoberturas != 0 ? ((_NumExcelentes * 100) / _NumCoberturas).toString() : "0";
        var lblBuenas = _NumBuenas.toString();
        var lblBuenasPer = _NumCoberturas != 0 ? ((_NumBuenas * 100) / _NumCoberturas).toString() : "0";
        var lblMalas = _NumMalas.toString();
        var lblMalasPer = _NumCoberturas != 0 ? ((_NumMalas * 100) / _NumCoberturas).toString() : "0";
        var lblSinEvaluar = _SinEvaluar.toString();
        //var lblCompensacion = "$" + _CompensacionPuesto.toString();

        var CeldasTfoot = "<tr>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblTotal + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblCobertura + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblNotas + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblExcelentes + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblExcelentesPer + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblBuenas + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblBuenasPer + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblMalas + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblMalasPer + "</td>" +
            "<td align='center' class='divContentAcumuladoMensual'>" + lblSinEvaluar + "</td>" +
//            "<td align='center' class='divContentAcumuladoMensual'>" + lblCompensacion + "</td>" +
            
        "</tr>";
        $("#tfootAcuMensual").append(CeldasTfoot);
        Azteca.vr.otable = $('#tbAcumuladaMen').dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(1)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(2)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(3)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(4)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(5)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(6)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(7)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(8)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(9)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(10)', nRow).addClass('divContentAcumuladoMensual');
                    $('td:eq(11)', nRow).addClass('divContentAcumuladoMensual');
//                    $('td:eq(12)', nRow).addClass('divContentAcumuladoMensual');

                    return nRow;
                },
            "fnDrawCallback":
			function () {
			    this.css('width', '100%');
			},
            "sPaginationType": "full_numbers",
            "bAutoWidth": true,
            "sScrollY": screenHgt.toString() + "px",
            "iDisplayLength": 100,
            "aaData": datosArray,
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
            }, "sDom": 'C<"clear">Tlfrtip',
            "oTableTools": {"sSwfPath":         "../../../Styles/images/copy_cvs_xls_pdf.swf",
                "aButtons": [
                    {
                        "sExtends": "csv",
                        "fnClick": function (nButton, oConfig, flash) {
                            $("div.modal").show();
                            this.fnSetText(flash, this.fnGetTableData(oConfig));
                        },
                        "fnComplete": function (nButton, oConfig, oFlash, sFlash) {
                            $("div.modal").hide();
                        }
                    },
                    {
                        "sExtends": "xls",
                        "fnClick": function (nButton, oConfig, flash) {
                            $("div.modal").show();
                            setTimeout(this.fnSetText(flash, this.fnGetTableData(oConfig)), 1000);
                        },
                        "fnComplete": function (nButton, oConfig, oFlash, sFlash) {
                            $("div.modal").hide();
                        }
                    },
                    {
                        "sExtends": "copy",
                       "fnClick": function( nButton, oConfig, flash ) {
                            $("div.modal").show();
	                        this.fnSetText( flash, this.fnGetTableData(oConfig) );
                        },
                        "fnComplete": function(nButton, oConfig, flash, text) {
	                        var
		                        lines = text.split('\n').length,
		                        len = this.s.dt.nTFoot === null ? lines-1 : lines-2,
		                        plural = (len==1) ? "" : "s";
                                  $("div.modal").hide();
	                        alert( 'Copied '+len+' row'+plural+' to the clipboard' );
                        },
                    },
                    {
                    "sExtends": "pdf",
                       "fnClick": function( nButton, oConfig, flash ) {
                            $("div.modal").show();
                            this.fnSetText( flash, 
				                "title:"+ this.fnGetTitle(oConfig) +"\n"+
				                "message:"+ oConfig.sPdfMessage +"\n"+
				                "colWidth:"+ this.fnCalcColRatios(oConfig) +"\n"+
				                "orientation:"+ oConfig.sPdfOrientation +"\n"+
				                "size:"+ oConfig.sPdfSize +"\n"+
				                "--/TableToolsOpts--\n" +
				                this.fnGetTableData(oConfig)
			                );
		                },
                        "fnComplete": function (nButton, oConfig, oFlash, sFlash) {
                            $("div.modal").hide();
                        }
                    },
                    {
                        "sExtends": "print",
                        "sAction": "print",
                        "fnClick": function (nButton, oConfig, oFlash) {
                            $("div.modal").show();
                        },
                        "fnComplete": function (nButton, oConfig, oFlash, sFlash) {
                            $("div.modal").hide();
                        }
                    }
                ]
            }
        });
        //Azteca.vr.otable.fnSetColumnVis(13, false);
        // Azteca.vr.otable.fnAdjustColumnSizing();
    } catch (error) { } finally {
        $('div.modal2').hide();
    }

}
Azteca.fn.errorGetEvalXEmpleado = function () {
    alert("mal");
}

Azteca.fn.getFechaFormateada = function (fecha) {

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
