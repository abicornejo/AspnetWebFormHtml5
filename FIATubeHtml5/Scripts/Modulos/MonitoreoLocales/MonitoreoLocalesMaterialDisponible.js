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
    'fn': new Object(),//utilizado para crear una funcion
    'vr': new Object()//utilizado para crear alguna variable u objeto
}
/**
* VARABLES GLOBALES.
*
*/

Azteca.vr.FechInicial=new Date();
Azteca.vr.FechFinal = new Date();
Azteca.vr.ArregloOt = new Array();
Azteca.vr.Success = new Array();
var screenHgt = 0;
var ratingFilter = 5;
var ratings;

window.onload = initialize;

//metodo que se ejecuta cuando carga el JS
function initialize() {
    screenHgt = getMaxFloatableHeigth() - 180;
    getStatusRatings();
    Azteca.fn.loadContenido();
   //document.getElementById("mimodal").style.display = "block";
};

function getStatusRatings(){
    executeSyncRequest(wsMtdGetRatings, "{ 'isIncludeDefault': false }", successGetRatings, Error);
}

var successGetRatings = function(data, status){
    var cadena = "";
    ratings = data.d;
    $("#divRating").empty();

    $.each(data.d, function(index, value){
        if(value.CveRating == 5)
            cadena += "<input type='radio' class='star2' value='" + value.CveRating + "' title='" + value.Descripcion + "' checked='checked'/>";
        else
            cadena += "<input type='radio' class='star2' value='" + value.CveRating + "' title='" + value.Descripcion + "'/>";
    });

    $("#divRating").append(cadena);

    $('.star2').rating({
        callback: function (value, link) {
            if(value == undefined)
                ratingFilter = 0;
            else
                ratingFilter = value;
        }
     });
}

Azteca.fn.loadContenido = function () {
   
    $("div.modal").ajaxStart(function () {
        $(this).show();
    }).ajaxStop(function () {
        $(this).hide();
    });
    $('div.modal').bind("ajaxSend", function () {
        $(this).show();
    }).bind("ajaxComplete", function () {
        $(this).hide();
    });

    $("button#btnBuscarJs").die().live("click", function (e) {
        Azteca.vr.idLocal = $("#cmbLocales").val();
        Azteca.vr.texto = $('#MainContent_txtTexto').val();
        var parametrosDestino = "{'idLocal': " + Azteca.vr.idLocal + ", 'fechaInicio':" + JSON.stringify(Azteca.fn.getFechaFormateada(Azteca.vr.FechInicial)) + ", 'fechaFinal':" + JSON.stringify(Azteca.fn.getFechaFormateada(Azteca.vr.FechFinal)) + ", 'textoBusqueda':'" + Azteca.vr.texto + "', 'isSinOT': " + ($("#chkViewSinOT").attr('checked') == 'checked' ? true  : false) + ", 'rating': " + ratingFilter + " }";

        Azteca.fn.get(parametrosDestino);
        e.preventDefault();
    });

    $(".showOT").die().live("click", function (e) {

        var contenedor = $(this);
        if (contenedor.hasClass("byImg")) {
            parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=' + $(contenedor).attr('data-pro') + '&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Material Disponible', mainPlayer);
        } else if (contenedor.hasClass("byOT")) {
            parent.openModal('OT/OT.aspx?numOT=' + $(contenedor).attr('data-value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(contenedor).attr('data-oCve'));
        }
        e.preventDefault();
    });

    $("button#btnTodownLoad").die().live("click", function () {

        var errorExits = false;
        var Destiny = $("#cmbLocalesEmpl").val();
        var currentTime = new Date();
        var FechaAct = Azteca.fn.getFechaFormateada(currentTime);
        if (Destiny == 0) {

            alertModal("Seleccione el local destino para efectuar la descarga"); return false;
        }
        if (Azteca.fn.ComparaOrigenLocal(Destiny)) {

            alertModal("El origen no puedes ser igual que el destino verifique los archivos que esta descargando");
            return false;
        }

        for (var r = 0; r < Azteca.vr.ArregloOt.length; r++) {

            var ObjSol = new THE_SolMatLocal();

            ObjSol.CveEmpleado = new TDI_EMPL();
            ObjSol.CveEmpleado.EmpleadoLlavePrimaria = sessionStorage.numUsuario; //TDI_EMPL EMPL_LLAV_PR

            ObjSol.CveDestino = new TDI_Local();
            ObjSol.CveDestino.LocalLlave = Destiny; //TDI_Local MATL_DESTINO

            ObjSol.CveEstatus = new TDI_StatusMatLocal();
            ObjSol.CveEstatus.CveStatusMatLocal = 6; //TDI_StatusMatLocal MATL_ESTATUS

            ObjSol.CveOrigen = new TDI_Local();
            ObjSol.CveOrigen.LocalLlave = Azteca.vr.ArregloOt[r]["Origen"]; //TDI_Local MATL_ORIGEN

            ObjSol.CvePrioridad = new TDI_PriorMatLocal();
            ObjSol.CvePrioridad.CvePriorMatLocal = 2; //TDI_PriorMatLocal MATL_PRIORIDAD

            ObjSol.TipoMaterialenLocal = new TDI_TipoMatLocal();
            ObjSol.TipoMaterialenLocal.TatlLlave = Azteca.vr.ArregloOt[r]["TatlLlave"]; // MATL_TIPO TDI_TipoMatLocal

            ObjSol.CveMaterialenLocal = Azteca.vr.ArregloOt[r]["CveMaterialenLocal"]; //secn_the_matlsol.MATL_PK=matl_llav_pr

            ObjSol.Nombre = Azteca.vr.ArregloOt[r]["Nombre"]; //secn_the_matlsol.MATL_NOMBRE=matloc_file

            ObjSol.Tamano = Azteca.vr.ArregloOt[r]["Tamano"]; //secn_the_matlsol.MATL_TAMANIO

            ObjSol.Ruta = Azteca.vr.ArregloOt[r]["Ruta"]; //secn_the_matlsol.MATL_RUTA

            ObjSol.PorcentajeEnvio = 0; //secn_the_matlsol.MATL_PORCENTAJE_ENVIO

            ObjSol.Duracion = Azteca.vr.ArregloOt[r]["Duracion"]; //secn_the_matlsol.MATL_DURACION

            ObjSol.FechaSolicitud = FechaAct;

            ObjSol.CheckOrigen = 0;

            ObjSol.CheckDestino = 0;

            var params = "{'Source':" + JSON.stringify(ObjSol) + "}";
            executeSyncRequest(wsMtdGuardarSolMatLocal,
                               params,
                               function (data) {
                                   if (data.d) {
                                       $(":checkbox#" + Azteca.vr.ArregloOt[r]["valor"]).attr("checked", false);
                                   } else {
                                       errorExits = true;
                                   }
                               },
                               Azteca.fn.GuardaMatSolError
           );
        }
        var Message = "";
        if (errorExits) {
            Message = "Hubo solicitudes que no se generaron correctamente";
        } else {
            Message = "Solicitudes Generadas Correctamente";
        }

        alertModal(Message);
        $("#ModalDescargas").dialog('close');
    });

    $("#btnDescargar").die().live("click", function (e) {

        e.preventDefault();

        if ($(":checkbox.descargable").length) {
            Azteca.vr.ArregloOt = new Array();
            var c = 0;
            $(":checkbox.descargable").each(function (ind, val) {
                var checkeado = $(this).attr("checked");
                if (checkeado) {

                    var Datos = $(this).attr("data");

                    Azteca.vr.ArregloOt[c] = {
                        LocalLlave: Datos.split("|")[0],
                        TatlLlave: Datos.split("|")[1],
                        CveMaterialenLocal: Datos.split("|")[2],
                        Nombre: Datos.split("|")[3],
                        Tamano: Datos.split("|")[4],
                        Ruta: Datos.split("|")[5],
                        Duracion: Datos.split("|")[6],
                        Origen: Datos.split("|")[0],
                        valor: $(this).attr("id"),
                        idLoc: $(this).attr("refLocal")
                    };
                    c++;
                }

            });
            if (Azteca.vr.ArregloOt.length >= 1) {
                $("#ModalDescargas").dialog("open");

            } else {

                alertModal("No hay algun registro seleccionado para descarga, verifique.");
            }

        } else {
            alertModal("No hay elementos que descargar");
        }
    });

    $("#ModalDescargas").dialog({
        modal: true,
        autoOpen: false,
        height: 250,
        minWidth: 650,
        resizable: false,
        width: 650,
        minHeight: 250,
        open: function (type, data) {
            $(this).parent().appendTo("form");
            var params = "{'EMPL_LLAV_PR':" + sessionStorage.numUsuario + "}";
            var params2 = "{'cvePrograma':" + 0 + ",'cveEmpleado':" + sessionStorage.numUsuario + "}";

            executeSyncRequest(wsMtdGetLocalesEmpl, params, Azteca.fn.SuccessEmplLocales, Azteca.fn.ErrorEmplLocales);
            executeSyncRequest(wsMtdconsultaPrgEmpl, params2, Azteca.fn.SuccessEmplProgram, Azteca.fn.ErrorEmplProgram);

        },
        show: "fold",
        hide: "scale"
    });



    $("#dtFecha").datepicker({});
    $("#dtFecha").datepicker('setDate', new Date());
    getLocalesAgendas(Azteca.fn.successLocales, Azteca.fn.myError);
    Azteca.vr.FechInicial = getFisrtDateOfWeek($("#dtFecha").datepicker('getDate'));
    Azteca.vr.FechFinal = new Date(Azteca.vr.FechInicial);
    Azteca.vr.FechFinal.setDate(Azteca.vr.FechFinal.getDate() + 6);
    $("#lblWeekOfYear").empty().append(getLabelOfWeek(Azteca.vr.FechInicial));
    Azteca.vr.idLocal = $("#cmbLocales").val();
    Azteca.vr.texto = $('#MainContent_txtTexto').val();
    var parametrosDestino = "{'idLocal': " + Azteca.vr.idLocal + ", 'fechaInicio':" + JSON.stringify(Azteca.fn.getFechaFormateada(Azteca.vr.FechInicial)) + ", 'fechaFinal':" + JSON.stringify(Azteca.fn.getFechaFormateada(Azteca.vr.FechFinal)) + ", 'textoBusqueda':'" + Azteca.vr.texto + "', 'isSinOT': " + ($("#chkViewSinOT").attr('checked') == 'checked' ? true  : false) + ", 'rating': " + ratingFilter + " }";
    $('div.modal').show();
    Azteca.fn.get(parametrosDestino);
}
Azteca.fn.ShowModal = function () {

    $('div.modal').show();

}
Azteca.fn.HideModal = function () {

    $('div.modal').hide();

}

Azteca.fn.GuardaMatSolSuccess = function (data) {

    alertModal(data.d);
}
Azteca.fn.GuardaMatSolError = function () {
  
    alertModal("Ocurrio un error verifique");
}
Azteca.fn.SuccessEmplProgram = function (data) {
    var programEmpl = data.d;
    $("#cmbProgramEmpl").empty();
    $.each(programEmpl, function (i, v) {
        if (v["CvePrograma"] != undefined)
            $("#cmbProgramEmpl").append('<option value="' + v["CvePrograma"]["CvePrograma"] + '">' + v["CvePrograma"]["NombrePrograma"] + '</option>');
    });
}
Azteca.fn.ErrorEmplProgram = function () {
   
    alertModal("Error al cargar datos");
}
var dtFecha_change = function () {
    Azteca.vr.FechInicial = getFisrtDateOfWeek($("#dtFecha").datepicker('getDate'));
    Azteca.vr.FechFinal = new Date(Azteca.vr.FechInicial);
    Azteca.vr.FechFinal.setDate(Azteca.vr.FechFinal.getDate() + 6);
    $("#lblWeekOfYear").empty().append(getLabelOfWeek(Azteca.vr.FechInicial));
}
Azteca.fn.ComparaOrigenLocal = function (Destino) {

    var Repetido = false;

    for (var a = 0; a < Azteca.vr.ArregloOt.length; a++) {

        if (Azteca.vr.ArregloOt[a]["Origen"] == Destino) {

            return true;
        }
    }
    return Repetido;

}
Azteca.fn.SuccessEmplLocales = function (data) {
    locales = data.d;
    $("#cmbLocalesEmpl").empty();
    $.each(locales, function (index, local) {
        if (local["LocalLlave"] == undefined)
            $("#cmbLocalesEmpl").append('<option value="' + local["Local"]["LocalLlave"] + '">' + local["Local"]["LocalDescripcion"] + '</option>');
        else
            $("#cmbLocalesEmpl").append('<option value="' + local["LocalLlave"] + '">' + local["LocalDescripcion"] + '</option>');
    });
}

Azteca.fn.ErrorEmplLocales = function () {
   
    alertModal("Error al cargar datosr");
}

Azteca.fn.get = function (parametrosDestino) {
  $('div.modal').show();
  executeRequest(wsMtMonitoreoObtieneMaterialDisponible, parametrosDestino, Azteca.fn.successGetMatDispo, Azteca.fn.errorGetMatDispo);
}

Azteca.fn.successGetMatDispo = function (data) {
    var cadena = "";
    Azteca.vr.Datos = "";
    Azteca.vr.contMaterial = "";
    Azteca.vr.Datos = jQuery.parseJSON(data.d);
    var Tabla = "";
    Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbMatDispo' width='100%'>";
    Tabla += "<thead>";
    Tabla += "<tr>";
    Tabla += "<th class='divTitlesMaterialDisponible'>IMAGEN</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>FECHA</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>OT</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>TITULO</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>OBJETIVO</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>LOCAL ORIGEN</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>CALIFICACI&Oacute;N</th>";
    Tabla += "<th class='divTitlesMaterialDisponible'>DESCARGAR</th>";
    Tabla += "</tr>";
    Tabla += "</thead>";
    Tabla += "<tbody id='bodyDataMatDispo'>";
    Tabla += "</tbody>";
    Tabla += "</table>";
    $("div.contentMaterialDisponible").html("").html(Tabla);
    var Arreglo = new Array();
    $.each(Azteca.vr.Datos, function (index, value) {

        var Img = ""; var Fe = ""; var ot = ""; var titu = ""; var Obje = ""; var LolEstado = ""; var desc = "";

        if (value["Vdo_Foto"] != "") {
            Img = "<a href='#' class='showOT byImg' data-numOT='" + value["Otra_LLave_PR"] + "'  data-pro='" + value["NumeroPrograma"] + "' data-file='" + value["Vdo_Id_Filename"] + "' data-img='" + value["Vdo_Foto"] + "' >";
            Img += "<img src='" + value["Vdo_Foto"] + "' title='" + value["Otra_Titulo"] + "' width='95' height='70' >";
        } else {
            Img = "<img alt='no-image' src='../../Images/materialDisponible.png' width='95' height='70' >";
        }

        var fechaCreacion = new Date(parseInt(value["Otra_Fecha_Creacion"].substr(6)));

        Fe = Azteca.fn.getFechaFormateada(fechaCreacion);

        ot = "<label class='showOT byOT' data-value='" + value["Otra_LLave_PR"] + "'  data-oCve='" + value["Otra_Cvec"] + "' style='cursor:pointer;' >" + value["Otra_Cvec"] + "</label>";

        titu = value["Otra_Titulo"];

        Obje = "<textarea readonly='readonly'>" + value["Otra_Objetivo"] + "</textarea>";

        LolEstado = "<label>" + value["Desc_Local"] + "</label>";

        cadena = "<div>";
        $.each(ratings, function(index2, value2){
            if(value.Rating == value2.CveRating)
                cadena += "<input type='radio' name='rating" + index + "' class='star' value='" + value2.CveRating + "' title='" + value2.Descripcion + "' checked='checked'/>";
            else
                cadena += "<input type='radio' name='rating" + index + "' class='star' value='" + value2.CveRating + "' title='" + value2.Descripcion + "'/>";
        });
        cadena += "</div>";

        var datosToinsert = value["Matloc_Matl_Origen"] + "|" +
                            value["Matloc_Tipo"] + "|" +
                            value["Matloc_Matl_Id"] + "|" +
                            value["Matloc_Nom_File"] + "|" +
                            value["Matloc_Tam_File"] + "|" +
                            value["Matloc_Ruta_File"] + "|" +
                            value["Matloc_Duracion_File"] + "|" +
                            value["Otra_ID_Local"];

        desc = "<input type='checkbox' data='" + datosToinsert + "' refLocal='" + value["Otra_ID_Local"] + "' class='descargable' value='" + value["Otra_LLave_PR"] + "' title='Seleccionar para descargar' id='" + index + "' >";
        desc += "<label for='" + index + "' >Descargar</label>";

        Arreglo[index] = new Array(Img, Fe, ot, titu, Obje, LolEstado, cadena, desc);

    });


    $('#tbMatDispo').dataTable({
        "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(1)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(2)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(3)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(4)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(5)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(6)', nRow).addClass('divContentMaterialDisponible');
                    $('td:eq(7)', nRow).addClass('divContentMaterialDisponible varTextAlignCenter');
                    $('td:eq(8)', nRow).addClass('divContentMaterialDisponible');

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
        "aaData": Arreglo,
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
        },
        "oTableTools": {
                "sSwfPath": "../../../Styles/images/swf/copy_csv_xls_pdf.swf",
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

//  $.each(Azteca.vr.Datos, function (index, value) {
       $('.star').rating();
       $('.star').rating('readOnly');
//  });
  $('div.modal').hide();

}

Azteca.fn.errorGetMatDispo = function () {
    $('div.modal').hide();
    alertModal("No hay elementos que descargar");
   
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

    return(Dia + "/" + Mes + "/" + Anio);
}

Azteca.fn.successLocales = function (data, status) {
   
    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {      
        if (local["LocalLlave"] == undefined)
            $("#cmbLocales").append('<option value="' + local["Local"]["LocalLlave"] + '">' + local["Local"]["LocalDescripcion"] + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local["LocalLlave"] + '">' + local["LocalDescripcion"] + '</option>');
    });
}
Azteca.fn.myError = function (request, status, error) {
    $('div.modal').hide();
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
    
}

Azteca.fn.doSomething = function (e) {
    var Boton = "images/iconos/bitacora.png";
//    var Valor = $('option:selected', '#cmbSecciones').val();
//    if (!e) var e = window.event;
//    vContenido = "Agendas/BitacoraDiaria.aspx?dtAgendaDiaria=" + gblFecha.esMXFormat() + "&oLocal=" + $("#cmbLocales").val() + "&oSeccion=" + Valor + "&cveOrdenTrabajo=" + $("#txtOT").val() + "&textoBusqueda=" + $("#txtTexto").val() + '&isFromMenu=0';
//    parent.openModal(vContenido, -1, -1, 'Bit&aacute;cora Diaria');

}

Azteca.fn.dtFecha_Changed = function () {
    if (jQuery.trim($("#dtFecha").val()) == '') {
        alertModal('El campo de Fecha no puede ir vacio');
       
        return false;
    }
//    else {
//        fecha = $("#dtFecha").datepicker("getDate");
//      
//        gblFecha = $("#dtFecha").datepicker("getDate");
//        $("#litDia2").empty();
//        $("#litDia2").append(getTituloDia(gblFecha));
//    }
}


function chkChange(){
    $("#btnBuscarJs").click();
}