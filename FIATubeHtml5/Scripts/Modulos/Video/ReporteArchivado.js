$(document).ready(function () {
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
    var params = "{}";
    executeRequest(wsMtdObtenerTipoMaterialHtml5, params, successGetMat, errorGetMat);

    $("button#btnActualizar").die().live("click", function (e) {

        e.preventDefault();
        getArchivado();
    });

    $(".showOT").die().live("click", function (e) {

        var contenedor = $(this);
        if (contenedor.hasClass("byImg")) {
            parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data_numOT') + '&numProg=' + $(contenedor).attr('data_prod') + '&uriVideo=' + $(contenedor).attr('data_urlVideo') + '&uriImg=' + $(contenedor).attr('data_urlFoto') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
        }
        e.preventDefault();
    });
});

function successGetMat(data) {
    var datos = jQuery.parseJSON(data.d);
    var Options = "<option value='0'>==TODOS==</option>";
    $.each(datos, function (ind, val) {
        Options += "<option value=" + val["FabricaLlavePrimaria"] + ">" + val["TipoMaterial"] + "</option>";
    });
    if (datos.length > 0)
        $("#cmbVideo").html("").html(Options);
    else
        $("#cmbVideo").html("").html("<option value='0'>No se encontraron resultados</option>");

    
    getArchivado();

}
function getArchivado(){
 var activo = $(":checkbox#chkCaption").attr("checked");
    var r = false;
    if (activo)
        r = true;
   
    var params = "{ 'FechaInicial':" + JSON.stringify($("#dtFechaIni").val()) + ",  'FechaFinal':" + JSON.stringify($("#dtFechaFin").val()) + ",  'ClipName':'" + $(":text#txtClip").val() + "',  'TipoMat':'" + $("#cmbMaterial").val() + "',  'TipoVideo':'" + $("#cmbVideo").val() + "',  'esClosedCaption':" + r + "}";
    $("div.modal").show();
    executeRequest(wsMtdObtenerArchivadoSudafricaFiltroTipoVidHtml5, params, successArchivado, errorArchivado);
}
function successArchivado(data) {
    var datos = jQuery.parseJSON(data.d);
     var screenHgt = getMaxFloatableHeigth() - 230;
    var Tabla = "";
    Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbArchivado' width='100%'>";
    Tabla += "<thead><tr><th class=''>Reproducir</th><th class=''>Id Archivo</th><th class=''>Nombre Clip</th><th class=''>Fecha</th>";
    Tabla += "<th class=''>Tipo Material</th><th class=''>Programa</th><th class=''>Tipo Video</th><th class=''>Closed Caption</th></tr>";
    Tabla += "</thead><tbody id='bodyArchivado'></tbody></table>";
    $("div.contDatatable").html("").html(Tabla);
   
    var arrayArchivos = new Array();
    $.each(datos, function (i, v) {
        console.log(v["Programa"]);
        var fechaToJson=new Date(parseInt(v["Fecha"].substr(6)));
        arrayArchivos[i] = new Array("<a href='#' class='showOT byImg' data_numOT='" + v["LLav_PR"] + "' data_urlFoto='" + v["Uri_Imagen"] + "' data_prod='" + v["Num_Programa"] + "' data_urlVideo='" + v["Uri_video"] + "' style='cursor:pointer;' ><img src='"+v["Uri_Imagen"]+"' widht='20px'  height='20px' /></a>", v["VDO_IDFILENAME"], v["VDO_CLIPNAME"], getFechaFormateada(fechaToJson), v["AGE_DESCAGENCIA"], v["Programa"], v["TipoVideo"], v["ConCC"]);

    });

    $('#tbArchivado').dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                    $('td:eq(1)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                    $('td:eq(2)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                    $('td:eq(3)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                    $('td:eq(4)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                    $('td:eq(5)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                    $('td:eq(6)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');
                     $('td:eq(7)', nRow).addClass('divContentReporteArchivado varTextAlignCenter');                   

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
            "aaData": arrayArchivos,
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
            }, "sDom": 'Tlfrtip',
           "oTableTools": {"sSwfPath":         "../../Styles/images/copy_cvs_xls_pdf.swf",
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

    if($("#dtFechaIni").val().toString()==  $("#dtFechaFin").val().toString()){
        $("div.descFechas").html("").html("Existen " + datos.length + " registros de videos archivados para la fecha " + $("#dtFechaIni").val().toString());
    }else{
         $("div.descFechas").html("").html("Existen " + datos.length + " registros de videos archivados para el rango de fechas " + $("#dtFechaIni").val().toString() +"-" +$("#dtFechaFin").val().toString());
    }

       
}

function errorArchivado() {
    $("div.modal").hide();
    alert("Error Fatal");
}

function errorGetMat() {
    alert("Error al enviar la solicitud");
}

function getFechaFormateada (fecha) {

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

    return(Dia + "/" + Mes + "/" + Anio);
}