var initVars;
var Modal;
window.onload = function () { initialize(); }
window.oncontextmenu = function () { return false; }

var locales = [];
var arrglMatSol = [];

//funcion que carga tablas de locales y matsol.
function initialize() {
    cargaLocales();
    initVars = getUrlVars();
    cargaEstatusTrans();
    if (initVars["local"] != undefined) {
        $("#cmbLoclOrig").val(initVars["local"]);
        $("#cmbLoclDest").val(initVars["local"]);
        $("#dtFechaIni").datepicker('setDate', new Date());
        $("#dtFechaFin").datepicker('setDate', new Date());             
    }
};

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
};



function Limpiar() {
    $("#cmbLoclOrig").val(0);
    $("#cmbLoclDest").val(0);
    $("#ddlStatus").val(-1);
    $("#ddlTipoTransferencia").val(1);
    $("#dtFechaIni").val("");
    $("#dtFechaFin").val("");
    $("#txtNomMaterial").val("");
    $("#MainContent_divTableResultados").empty();

}

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


    $("#divMenuOpciones").dialog({
        autoOpen: false,
        show: "blind",
        open: function (type, data) {
            $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA, button.moniBtnReenviar").removeAttr('disabled');

            switch ($("#divMenuOpciones").attr("data-status")) {
                case "CANCELADO":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "COMPLETADO":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "CANCELAR":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "COMPLETAR":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "CPRIORIDAD":
                    $("button.moniBtnReanudar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                case "ERROR":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "PAUSADO":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "PAUSAR":
                    $("button.moniBtnPausar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                case "PENDIENTE":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                case "REENVIAR":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar,  button.moniBtnReenviar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "RESTAURANDO":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar,  button.moniBtnReenviar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "SPAUSADO":
                    $("button.moniBtnPausar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                case "SPAUSAR":
                    $("button.moniBtnPausar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                case "TRANSCODIFICANDO":
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar,  button.moniBtnReenviar, button.btnPrioridadBA").attr("disabled", "true");
                    break;
                case "TRANSFERIR":
                    $("button.moniBtnReanudar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                case "TRANSFIRIENDO":
                    $("button.moniBtnReanudar, button.moniBtnReenviar").attr("disabled", "true");
                    break;
                default:
                    $("button.moniBtnPausar, button.moniBtnReanudar, button.moniBtnCancelar, button.btnPrioridadBA, button.moniBtnReenviar").removeAttr('disabled');
                    break;

            }

        }
    });

    $("#MainContent_btnFiltrar").die().live("click", function (e) {

        var params = "{'loclOrig':" + $("#cmbLoclOrig").val() + ", 'loclDest':" + $("#cmbLoclDest").val() + ", 'indicador':" + $("#ddlTipoTransferencia").val() + ", 'estatus':" + $("#ddlStatus").val() + ", 'nombreMaterial':'" + $("#MainContent_txtNomMaterial").val() + "', 'fechaUno':" + JSON.stringify($("#dtFechaIni").val()) + ", 'fechaDos':" + JSON.stringify($("#dtFechaFin").val()) + "}";
        getMatLocalProgramadasyActuales(params);
        e.preventDefault();

    });

    $("#btnOpciones").die().live("click", function () {

        var fila = $(this);
        $("#divMenuOpciones").dialog('close');
        var lastClass = "";

        $("#divMenuOpciones").dialog('close');
        $("#divMenuOpciones").attr("data-currentId", $(fila).attr('data-rowMatsolId'));
        $("#divMenuOpciones").attr("data-status", $(fila).attr('data-status'));
        $("#divMenuOpciones").attr("data-lastclass", lastClass);
        $("#divMenuOpciones").dialog('open');
        $("#ui-dialog-title-divMenuOpciones").html($(fila).attr('data-SolName'));

    });

   

});
function testtimeout() {
    Modal = setTimeout("ShowModal()", 1000);
}
function ShowModal() {
    $('div.modal').show();
}
var getMatLocalProgramadasyActuales = function (parametros) {
    Modal = setTimeout("ShowModal()", 0000);
    executeRequest(wsMtdObtenerSolMatLocalProgramadasyActuales, parametros, succesGetMatLocalProgramadasyActuales, errorGetMatLocalProgramadasyActuales);
}
var succesGetMatLocalProgramadasyActuales = function (data) {
   
    try {
        var Puestos = sessionStorage.userPuestos;
        var Tabla = "";
        var screenHgt = getMaxFloatableHeigth() - 310;
        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbMatloclProAct' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>NombreArchivo</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>Origen</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>Destino</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>F.Inicial</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>F.Final</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>H.Inicial</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>H.Final</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>Tipo Material</th>";

        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>% de Envio</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>Estatus</th>";
        Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>Progreso</th>";
        if (Puestos.indexOf("9") != -1 || Puestos.indexOf("139"))
            Tabla += "<th class='divTitlesNMONITOREOw varFontBoldLarge'>Opciones</th>";

        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyLocalBus'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divTableResultados").html("").html(Tabla);
        var ArrayBusquedas = new Array();
        var datos = jQuery.parseJSON(data.d);

        var Arreglo = new Array();
        var btnTemp;
        $.each(datos, function (ind, val) {
            btnTemp = '';

            if (val["Status"] == "SPAUSADO")
                val["Status"] = "PAUSA MANUAL";

            if (Puestos.indexOf("9") != -1 || Puestos.indexOf("139"))
                btnTemp = "<input id='btnOpciones' type='button' class='btnOpcionesBA' title='Recuperar'  id='divSol" + val["MatsolId"] + "' data-rowMatsolId='" + val["MatsolId"] + "' data-status='" + val["Status"] + "' data-SolName='" + val["Nombre"] + "' />"
            Arreglo[ind] = new Array(val["Nombre"], val["Origen"]
            , val["Destino"]
            , val["FInicial"]
            , val["FFinal"]
            , val["Hinicial"]
            , val["HFinal"]
            , val["TipoMaterial"]
            , val["PorcentajeEnviado"]
            , val["Status"]
            , "<progress class='divTblResultadosProgress' value=\"" + val["PorcentajeEnviado"] + "\" max=\"100\"></progress>"
            , btnTemp);



        });
       var otableBus=$('#tbMatloclProAct').dataTable({
            "fnRowCallback":
            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(0)', nRow).addClass('divContentNMONITOREO');
                $('td:eq(1)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(2)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(3)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(4)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(5)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(6)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(7)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(8)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(9)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(10)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(11)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                 $(nRow).addClass('');
                return nRow;
            },
            "bScrollCollapse": true,
            "fnDrawCallback":
			function () {
			    this.css('width', '100%');
			},
            "sPaginationType": "full_numbers",
            "iDisplayLength": 100,
            "aaData": Arreglo,
           "sScrollY": screenHgt.toString() + "px",
           "bScrollAutoCss": true,
           "bAutoWidth": true,
           "bScrollCollapse": true,
            "bDeferRender": true,
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

      //  new FixedHeader( otableBus );
     //   new FixedHeader( otableBus, { "bottom": true } );

    } catch (err) {

    } finally {

        clearTimeout(Modal);
        $('div.modal').hide();
    }

}
var errorGetMatLocalProgramadasyActuales = function () {
    alertModal("Error al procesar solicitud");
    $('div.modal').hide();
}
function doSomething(fila) {
   
    if (window.event.which == 3 || window.event.button == 2) {
        var lastClass = "";
        $.each($(fila).children(), function (idx, val) {
            lastClass = $(val).attr("class");
            $(val).attr("class", "divTblResultadosHeaderSelected");

        });
        $("#divMenuOpciones").dialog('close');
        $("#divMenuOpciones").attr("data-currentId", $(fila).attr('data-rowMatsolId'));
        $("#divMenuOpciones").attr("data-status", $(fila).attr('data-status'));
        $("#divMenuOpciones").attr("data-lastclass", lastClass);                
        $("#divMenuOpciones").dialog('open');
        $("#ui-dialog-title-divMenuOpciones").html($(fila).attr('data-SolName'));


//        $.each($(fila).children(), function (idx, val) {
//            $(val).attr("class", "divTblResultadosHeaderSelected");
//        });

       // divSol
    }
    else{        
        $("#divMenuOpciones").dialog('close');
    }
    return false;
}


function doSomethingFromButton(fila) {
  
    $("#divMenuOpciones").dialog('close');
    var lastClass = "";
//    $.each($(fila).children(), function (idx, val) {
//        lastClass = $(val).attr("class");
//        $(val).attr("class", "divTblResultadosHeaderSelected");

//    });
    $("#divMenuOpciones").dialog('close');
    $("#divMenuOpciones").attr("data-currentId", $(fila).attr('data-rowMatsolId'));
    $("#divMenuOpciones").attr("data-status", $(fila).attr('data-status'));
    $("#divMenuOpciones").attr("data-lastclass", lastClass);
    $("#divMenuOpciones").dialog('open');
    $("#ui-dialog-title-divMenuOpciones").html($(fila).attr('data-SolName'));


//    $.each($(fila).children(), function (idx, val) {
//        $(val).attr("class", "divTblResultadosHeaderSelected");
//    });

  //  divSol
}


function Pausar() {
    if ($("#divMenuOpciones").attr("data-status") != "TRANSFIRIENDO") {
        alertModal("No puede pausar un envío que no este transfiriendose.");
        return;
    }

    data = "{ idMatsol:" + $("#divMenuOpciones").attr("data-currentId") + " }";
    executeRequest(wsMtdUpdateMatSolPausado, data, successActualizaSolMat, myError);
}
function Reanudar() {
    if ($("#divMenuOpciones").attr("data-status") != "PAUSA MANUAL") {
        alertModal("No puede reanudar un envío que no este pausado.");
        return;
    }

    data = "{ idMatsol:" + $("#divMenuOpciones").attr("data-currentId") + " }";
    executeRequest(wsMtdUpdateMatSolReanudar, data, successActualizaSolMat, myError);
}

var successActualizaSolMat = function (data, status) {
    alertModal("Se ha realizado el cambio de estado con exito. Los cambios tardaran unos segundos en reflejarse.");

}


function Cancelar() {
    data = "{ idMatsol:" + $("#divMenuOpciones").attr("data-currentId") + " }";
    executeRequest(wsMtdUpdateMatSolCancelado, data, successActualizaSolMat, myError);
}

function Reenviar() {
    data = "{ idMatsol:" + $("#divMenuOpciones").attr("data-currentId") + " }";
    executeRequest(wsMtdUpdateMatSolReenviado, data, successActualizaSolMat, myError);
}

function CambiarPrioridad(idPrioridad) {
    if ($("#divMenuOpciones").attr("data-status") != "TRANSFIRIENDO") {
        alert("No puede cambiar la prioridad de un envío que no este transfiriendose.");
        return;
    }
    data = "{ idMatsol:" + $("#divMenuOpciones").attr("data-currentId") + ", idPrioridad:" + idPrioridad + " }";
    executeRequest(wsMtdUpdateMatSolPrioridad, data, successActualizaSolMat, myError);
}


function cargaEstatusTrans() {
    executeSyncRequest(wsMtdGetStatusCat, "{}", successGetEstatusCat, Error);
}

var successGetEstatusCat = function (data, status) {
    var content = "";
    $("#ddlStatus").empty();
    content += "<option value='-1'>== TODOS ==</option>";
    $.each(data.d, function (index, estatus) {
        content += "<option value='" + estatus.CveStatusMatLocal + "'>" + estatus.Nombre + "</option>";
    });
    $("#ddlStatus").append(content);
    $("#MainContent_btnFiltrar").click();
}

function cargaLocales() {
    getLocalesAgendas(successLocales, myError);
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#cmbLoclOrig").empty();
    $("#cmbLoclDest").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined) {
            $("#cmbLoclOrig").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
            $("#cmbLoclDest").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        }
        else {
            $("#cmbLoclOrig").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
            $("#cmbLoclDest").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
        }
    });
}