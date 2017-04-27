
var t;
var rad = 4;
var theColors = {};
var theMarks = new Array();
var locales = [];
var locales2 = [];
var x1, y1;
var x2, y2;
var arrglMatSol = [];
var arrgStorageLoc = [];
var arrgStatusRed = [];
var arrgMatLoc = [];
var transferencias = [];
var currentCode;

window.onload = function () { initialize(); }

//metodo que se ejecuta cuando carga el JS
function initialize() {
    $("#dtFechaIni").datepicker('setDate', new Date());
    $("#dtFechaFin").datepicker('setDate', new Date());
    $("#divRightMenu").hide();
    EscondeObjetosAlIniciar();
    CargaMetodos();
    setTimer();
    refresh();
};

$(function () {

    $("#divTabs").tabs();
    $("#adsCarrusel").dialog({ resizable: false, autoOpen: false, modal: true, show: "Slide", hide: "Slide", width: '500px', height: 'auto', zIndex: 999999999 });
    $("#accordion1").accordion();
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

    $("button#btnBuscarJs").die().live("click", function () {
        getInfoMat();

    });

    $('#divMapDetail').click(function (e) {
        if ($(this).attr("data-isOpen") == 1 && ($(e.target).attr('id') == 'btnCloseDetail')) {
            $(this).css("width", "20px");
            $("#divRightMenu").hide();
            $("#divMap").css("width", "937px");
            $(this).attr("data-isOpen", 0);
        }
        else {
            $(this).css("width", "270px");
            $("#divRightMenu").show();
            $("#divMap").css("width", "687px");
            $(this).attr("data-isOpen", 1);
        }
    });

});

//funcion que oculta el div de: Carrusel,Panel derecho superior de informacion, y esconde boton de cerrado
function EscondeObjetosAlIniciar() {
    $("#carrousel").hide();
}

var getInfoMat = function () {

    var Origen = $("#ddlFiltroOrig").val();
    var Destino = -1;
    var Estatus = $("#cmbEstatus").val();
    var FecIni = $("#dtFechaIni").val();
    var FecFin = $("#dtFechaFin").val();

    var parametrosOrigen = "{'loclOrig': " + Origen + ", 'loclDest':" + Destino + ", 'estId':" + Estatus + ", 'FecInicio':'" + FecIni + "', 'FecFin':'" + FecFin + "'}";
    var parametrosDestino = "{'loclOrig': " + Destino + ", 'loclDest':" + Origen + ", 'estId':" + Estatus + ", 'FecInicio':'" + FecIni + "', 'FecFin':'" + FecFin + "'}";

    executeRequest(wsMtGetSolMatLocalParametroMapa2, parametrosOrigen, SuccessOrigen, ErrorOrigen);
    executeRequest(wsMtGetSolMatLocalParametroMapa2, parametrosDestino, SucessDestino, ErrorDestino);


}
var SuccessOrigen = function (msg) {
    $("div#tabs-1").empty();
    var Tabla = "";
    Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbInformacionMatlsol' width='100%' height='auto'>";
        Tabla += "<thead>";
            Tabla += "<tr>";
                Tabla += "<th class='divTitlesNMONITOREO'>MOVIMIENTO</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>NOMBRE ARCHIVO</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>FECHA INICIO</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>FECHA TERMINO</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>VISUALIZACION</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>ORIGEN</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>DESTINO</th>";
                Tabla += "<th class='divTitlesNMONITOREO'>ESTATUS</th>";
            Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='InformacionMatlsol'>";
        Tabla += "</tbody>";
    Tabla += "</table>";
    $("div#tabs-1").html("").html(Tabla);

    var c = eval(msg.d);
    var DatosBody = "";
    var Clase = ""; //" class='divTblResultadosHeader9' ";

    var contador = 0;
    $.each(c, function (index, value) {
        if (value['CveEstatus']['Nombre'] == "SPAUSADO" || value['CveEstatus']['Nombre'] == "PAUSADO") {
            if (value['CveEstatus']['Nombre'] == "SPAUSADO") {
                value['CveEstatus']['Nombre'] = "PAUSADO MANUAL";
            }
            // Clase = " class='divTblResultadosHeaderPausa'  ";
        }
        else if (value['CveEstatus']['Nombre'] == "TRANSFIRIENDO") {
            //  Clase = " class='divTblResultadosHeaderT'  ";
        } else if (value['CveEstatus']['Nombre'] == "CANCELADO" || value['CveEstatus']['Nombre'] == "ERROR") {
            // Clase = " class='divTblResultadosHeaderError'  ";
        }
        DatosBody += "<tr>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + (++contador) + "</td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + value['Nombre'] + "</td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + value['FechaSolicitud'] + "</td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + value['FechaSolicitudTerminada'] + "</td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + "><progress value='" + value['PorcentajeEnvio'] + "' max=\"100\"></progress><label style='width=60'><center>" + value['PorcentajeEnvio'] + "</center></label></td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + value['CveOrigen']['LocalDescripcion'] + "</td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + value['CveDestino']['LocalDescripcion'] + "</td>";
        DatosBody += "<td class='divContentNMONITOREO' " + Clase + ">" + value['CveEstatus']['Nombre'] + "</td>";
        DatosBody += "</tr>";
    });

    $("#InformacionMatlsol").html(DatosBody);

    $('#tbInformacionMatlsol').dataTable({
        "fnDrawCallback":
			function() {
				this.css('width','100%');
                this.css('height','1500px');
			},		
        "sPaginationType": "full_numbers",
        "iDisplayLength": 100,
        "oLanguage": { "sProcessing": "Procesando, por favor espere...",
            "sLengthMenu": "Mostrar <select><option value='5'>5</option><option value='10'>10</option><option value='25'>25</option><option value='50'>50</option><option value='100' selected='selected'>100</option></select> registros por p&aacute;gina",
            "sZeroRecords": "No se encontraron resultados",
            "sInfo": "&nbsp;&nbsp;Mostrando desde _START_ hasta _END_ de _TOTAL_ registros&nbsp;&nbsp;",
            "sInfoEmpty": "&nbsp;&nbsp;Mostrando desde 0 hasta 0 de 0 registros&nbsp;&nbsp;",
            "sInfoFiltered": "<br><em>( filtrado de _MAX_ registros en total )</em>",
            "sInfoPostFix": "",
            "sSearch": "Buscar: ",
            //"sUrl": "",
            "oPaginate": {
                "sFirst": "",
                "sPrevious": "",
                "sLast": "",
                "sNext": ""
            }
        }, //"sDom": 'Tiplfrtip'
    });

}
var ErrorOrigen = function () {
    alert("Error inesperado del sistema");
}

var SucessDestino = function (msg) {
    $("div#tabs-2").empty();
    var Table = "";
    Table += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbInformacionMatlsolDest' width='100%'>";
        Table += "<thead>";
            Table += "<tr>";
                Table += "<th class='divTitlesNMONITOREO'>MOVIMIENTO</th>";
                Table += "<th class='divTitlesNMONITOREO'>NOMBRE ARCHIVO</th>";
                Table += "<th class='divTitlesNMONITOREO'>FECHA INICIO</th>";
                Table += "<th class='divTitlesNMONITOREO'>FECHA TERMINO</th>";
                Table += "<th class='divTitlesNMONITOREO'>VISUALIZACION</th>";
                Table += "<th class='divTitlesNMONITOREO'>ORIGEN</th>";
                Table += "<th class='divTitlesNMONITOREO'>DESTINO</th>";
                Table += "<th class='divTitlesNMONITOREO'>ESTATUS</th>";
            Table += "</tr>";
        Table += "</thead>";
        Table += "<tbody id='InformacionMatlsolDest'>";
        Table += "</tbody>";
    Table += "</table>";
    $("div#tabs-2").html("").html(Table);

    var c = eval(msg.d);
    var DataBody = "";

    $.each(c, function (index, value) {
        DataBody += "<tr>";
        DataBody += "<td class='divContentNMONITOREO'>" + index + 1 + "</td>";
        DataBody += "<td class='divContentNMONITOREO'>" + value['Nombre'] + "</td>";
        DataBody += "<td class='divContentNMONITOREO'>" + value['FechaSolicitud'] + "</td>";
        DataBody += "<td class='divContentNMONITOREO'>" + value['FechaSolicitudTerminada'] + "</td>";
        DataBody += "<td class='divContentNMONITOREO'><progress value='" + value['PorcentajeEnvio'] + "' max=\"100\"></progress><label style='width=60'><center>" + value['PorcentajeEnvio'] + "</center></label></td>";
        DataBody += "<td class='divContentNMONITOREO'>" + value['CveOrigen']['LocalDescripcion'] + "</td>";
        DataBody += "<td class='divContentNMONITOREO'>" + value['CveDestino']['LocalDescripcion'] + "</td>";
        DataBody += "<td class='divContentNMONITOREO'>" + value['CveEstatus']['Nombre'] + "</td>";
        DataBody += "</tr>";
    });

    $("#InformacionMatlsolDest").html(DataBody);

    $('#tbInformacionMatlsolDest').dataTable({
        "fnDrawCallback":
			function () {
			    this.css('width', '100%');
			},
        "sPaginationType": "full_numbers",
        "iDisplayLength": 100,
        "oLanguage": { "sProcessing": "Procesando, por favor espere...",
            "sLengthMenu": "Mostrar <select><option value='5'>5</option><option value='10'>10</option><option value='25'>25</option><option value='50'>50</option><option value='100' selected='selected'>100</option></select> registros por p&aacute;gina",
            "sZeroRecords": "No se encontraron resultados",
            "sInfo": "&nbsp;&nbsp;Mostrando desde _START_ hasta _END_ de _TOTAL_ registros&nbsp;&nbsp;",
            "sInfoEmpty": "&nbsp;&nbsp;Mostrando desde 0 hasta 0 de 0 registros&nbsp;&nbsp;",
            "sInfoFiltered": "<br><em>( filtrado de _MAX_ registros en total )</em>",
            "sInfoPostFix": "",
            "sSearch": "Buscar: ",
            //"sUrl": "",
            "oPaginate": {
                "sFirst": "",
                "sPrevious": "",
                "sLast": "",
                "sNext": ""
            }
        }, //"sDom": 'Tiplfrtip'
    });
}

var ErrorDestino = function () {
    alert("Error inesperado del sistema");
}
function CargaMetodos() {    
   
    cargaEstatusTrans();
    cargaLocales();
    LlenadoFiltro();
    getMapData();
    $('#divMap').vectorMap({
        colors: theColors,
        markers: theMarks,
        hoverOpacity: 0.5,
        hoverColor: false,
        onMarkerClick: myMarkClick
    });
    
    cargaStorageLocal(); /*funcion que extre informacion de la tabla secn_the_stgloc y las guarda en el arreglo arrgStorageLoc */


}

function cargaEstatusTrans() {
    executeSyncRequest(wsMtdGetStatusCat, "{}", successGetEstatusCat, Error);
}

var successGetEstatusCat = function (data, status) {
    var content = "";
    $("#cmbEstatus").empty();
    content += "<option value='-1'>== TODOS ==</option>";
    $.each(data.d, function (index, estatus) {
        content += "<option value='" + estatus.CveStatusMatLocal + "'>" + estatus.Nombre + "</option>";
    });
    $("#cmbEstatus").append(content);
}

function cargaStorageLocal() {
    data = "{ Source:null }";
    executeSyncRequest(wsMtdGetStorageLocal, data, successStorage, Error);
};

function cargaStorageByLocal(locl) {
    var storage = new THE_StorageLocal();
    storage.CveLocal = locl;
    data = "{ 'Source':" + JSON.stringify(storage) + " }";
    executeSyncRequest(wsMtdGetStorageLocal, data, successStorage, Error);
};

var successStorage = function (data, status) {
    arrgStorageLoc = data.d;
}

function cargaStatusRed() {
    executeRequest(wsMtdGetStatusRed, "{Source:null }", successStatusRed, Error);
}

var successStatusRed = function (data, status) {
    arrgStatusRed = data.d;
}

function cargaLocales() {
    executeSyncRequest(wsMtdGetLocales, "{ }", successLocales, Error);
};

var successLocales = function (data, status) {
    locales = data.d;
}



//funcion que realiza la parte del Detalle de la Zona
//en el menu desplegable derecho.  
function DivDetalle(valor, onlyRefresh) {
    $("#ddlFiltroOrig").val(valor);

    cargaLocales();
    cargaStorageByLocal(valor);
    $("#cmbEstatus").val(-1);

    RemoveChild(document.getElementById("divRightMenu"));
    $("#divRightMenu").append("<button id='btnCloseDetail' class='btnCerrarMonitoreo' type='button' onclick='BorraTodo();' style='position:relative;top:0px;left:0px;'>");
    $("#divRightMenu").append("<label id='lblNameLocal' class='divRightMenuLocal'>" + $("#ddlFiltroOrig option[value='" + valor + "']").text() + "</label>");

    PintaDatosStorage(valor);
    PintaAnchoBanda(valor);
    PintaEnlace(valor);
    $("#adsCarrusel").attr('data-locl', valor);

    if(onlyRefresh != true)
        $("#MainContent_btnBuscar").click();
}

//funcion Generica que elimina a los hijos.
//el padre entra como parametro
function RemoveChild(padre) {
    if (padre.hasChildNodes()) {
        var numHijos = padre.childNodes.length;
        for (var i = 0; i < numHijos; i++) {
            padre.removeChild(padre.firstChild);
        }
    }
}

//funcion que se dispara al dar click en boton cerrar del desplegado de lado superior derecho
function BorraTodo() {
    $("#carrousel").hide();
    $('#divMapDetail').mouseout();
}

//funcion que indica que la conexion que marca en locales se encuentra prendida
function PintaEnlace(idLocal) {
    $.each(locales, function (index, locls) {
        if (locls.LocalLlave == idLocal) {
            if (locls.LoclConexion == 0 || locls.LoclConexion == null)
                $("#divRightMenu").append("<div class='varRightMenuTblContainer'><table style='width:99.5%;'><tr><td align='left'><label>ENLACE</label></td></tr><tr><td align='center'><img src='../../Images/EnlaceRojo.png' id='imgEnlace' /></td></tr></table></div>");
            else
                $("#divRightMenu").append("<div class='varRightMenuTblContainer'><table style='width:99.5%;'><tr><td align='left'><label>ENLACE</label></td></tr><tr><td align='center'><img src=\"../../Images/EnlaceVerde.png\" id=\"imgEnlace\" /></td></tr></table></div>");

            $("#divRightMenu").append("<div class='varRightMenuTblContainer'><label style='float:left; width:100%; height:20px;'>REPORTES</label><div class='divImgReporte'><img src='../../Images/iconReporte.png' id='imgReporte' onclick='openReports();' /></div></div>");
        }
    })
}

function openReports() {
    $("#adsCarrusel").dialog('open');
}

function PintaAnchoBanda(idLocal) {
    idOrigen = [];
    
    var indicadorEnviadas = 0;
    var indicadorRecibida = 0;
    $.each(arrglMatSol, function (index, argMat) {
        if (argMat.CveOrigen.LocalLlave == idLocal && argMat.CveEstatus.CveStatusMatLocal == 5) {
            indicadorEnviadas = indicadorEnviadas + 1;
        }
        if (argMat.CveDestino.LocalLlave == idLocal) {

            idOrigen[indicadorRecibida] = argMat.CveOrigen.LocalLlave;
            indicadorRecibida = indicadorRecibida + 1;
    
        }
    });

    if (indicadorEnviadas != 0) {       
        $.each(locales, function (index, local) {
            if (local.LocalLlave == idLocal) {

                var totalEnviadas = local.LoclBandWidth;
                var utilizadoEnviadas = local.loclWorkMax;
                var disponibleEnviadas = (totalEnviadas - utilizadoEnviadas) / indicadorEnviadas;
                var porcentajeEnviadas = (utilizadoEnviadas * 100) / totalEnviadas;

                var tablaAnchoBandaEnviado = "<div class='varRightMenuTblContainer'><div id='tblEnviados' class='divTblPrueba' style='display:none;'>";
                tablaAnchoBandaEnviado += "<div class='varWidth100 varTextAlignCenter'><label>ENVIADOS</label></div>";
                tablaAnchoBandaEnviado += "<div class='varWidth100'><div class='varWidth50'><label>TOTAL</label></div><div class='varWidth50'><label>" + totalEnviadas + "</label></div></div>";
                tablaAnchoBandaEnviado += "<div class='varWidth100'><div class='varWidth50'><label>DISPONIBLE</label></div><div class='varWidth50'><label>" + disponibleEnviadas + "</label></div></div>";
                tablaAnchoBandaEnviado += "<div class='varWidth100'><div class='varWidth50'><label>UTILIZADO</label></div><div class='varWidth50'><label>" + utilizadoEnviadas + "</label></div></div>";
                tablaAnchoBandaEnviado += "<div class='varWidth100 varTextAlignCenter'><progress value='" + porcentajeEnviadas.toFixed(3) + "' max='100'></progress></div>";
                tablaAnchoBandaEnviado += "</div></div>";

                $("#divRightMenu").append(tablaAnchoBandaEnviado);
            }
        });
    }
     
    if (indicadorRecibida != 0) {
        var totalRecibida = 0;
        var utilizadaRecibida = 0;

        $.each(idOrigen, function (index, idsOrigen) {
            $.each(locales, function (index, lcl) {
                if (idsOrigen == lcl.LocalLlave) {
                    totalRecibida += lcl.LoclBandWidth;
                    utilizadaRecibida += lcl.loclWorkMax;
                }
            });
        });

        var disponibleRecibida = totalRecibida - utilizadaRecibida;
        var porcentajeRecibida = (utilizadaRecibida * 100) / disponibleRecibida;

        var tablaAnchoBandaRecibido = "<div class='varRightMenuTblContainer'><div id='' class='divTblPrueba' style='display:none;'>";
        tablaAnchoBandaRecibido += "<div class='varWidth100 varTextAlignCenter'><label>RECIBIDOS</label></div>";
        tablaAnchoBandaRecibido += "<div class='varWidth100'><div class='varWidth50'><label>TOTAL</label></div><div class='varWidth50'><label>" + totalRecibida + "</label></div></div>";
        tablaAnchoBandaRecibido += "<div class='varWidth100'><div class='varWidth50'><label>DISPONIBLE</label></div><div class='varWidth50'><label>" + disponibleRecibida + "</label></div></div>";
        tablaAnchoBandaRecibido += "<div class='varWidth100'><div class='varWidth50'><label>UTILIZADO</label></div><div class='varWidth50'><label>" + utilizadaRecibida + "</label></div></div>";
        tablaAnchoBandaRecibido += "<div class='varWidth100 varTextAlignCenter'><progress value='" + porcentajeRecibida.toFixed(3) + "' max='100'></progress></div>";
        tablaAnchoBandaRecibido += "</div></div>";

        $("#divRightMenu").append(tablaAnchoBandaRecibido);
    }
}

//funcion que llena DropdownList de locales 
function LlenadoFiltro() {
    var Llenado = "<option selected='selected' value='0' id='0' >Todas...</option>";
    $.each(locales, function (index, locls) {
        if (index != 0) {
            Llenado += "<option runat='server' value='" + locls.LocalLlave + "' id='" + index + "'>" + locls.LocalDescripcion + "</option>";
        }
    });

    $("#ddlFiltroOrig").append(Llenado);
}

/*funcion de boton refrescar*/
function refresh() {
    getInfoMat();
}

function PintaDatosStorage(idLocl) {
    var indicador = 0;
    $.each(arrgStorageLoc, function (index, storage) {
        if (idLocl == storage.CveLocal) {

            var pruebaHtmlTable = "<div class='varRightMenuTblContainer'><div id='tblPrueba' class='divTblPrueba'>";
            pruebaHtmlTable += "<div>";
            pruebaHtmlTable += "<div id='divPila1' class='divPila1'>";
            pruebaHtmlTable += "<img class='imgMonitorPila' src='../../Images/Pila.png' id='imgEnlace'  />";
            pruebaHtmlTable += "<div id='divPinta1_" + storage.CveStgLocal + "' class='divPintaPila2'>&nbsp;</div>";
            pruebaHtmlTable += "<div id='divPinta2_" + storage.CveStgLocal + "' class='divPintaPila1'>&nbsp;</div>";
            pruebaHtmlTable += "</div></div>";
            pruebaHtmlTable += "<div class='varWidth80 varFloatLeft'><div><label class='title'>PATH:</label></div><div><label class='title'>" + storage.StgLclPath + "</label></div></div>";
            pruebaHtmlTable += "<div class='varWidth80 varFloatLeft'><div><label class='title'>PESO:</label></div><div><select onchange='PintaMedidasStorage(this.value ," + storage.CveStgLocal + ")'><option value='0'>Seleccione...</option><option value='1'>KB</option><option value='2'>MB</option><option ";
            pruebaHtmlTable += "value='3' selected='selected'>GB</option><option value='4'>TB</option></select></div></div>";
            pruebaHtmlTable += "<div class='varWidth80 varFloatLeft'><div><label class='title'>TOTAL:</label></div><div><label class='title' id='lblTotal_" + storage.CveStgLocal + "'></label></div></div>";
            pruebaHtmlTable += "<div class='varWidth80 varFloatLeft'><div><label class='title'>USADO:</label></div><div><label class='title' id='lblUsado_" + storage.CveStgLocal + "'></label></div></div>";
            pruebaHtmlTable += "<div class='varWidth80 varFloatLeft'><div class='title'><label>%:</label></div><div class='title' id='lblPorcent_" + storage.CveStgLocal + "'><label></label></div></div>";
            pruebaHtmlTable += "</div></div>";

            indicador += 1;
            $("#divRightMenu").append(pruebaHtmlTable);
            PintaMedidasStorage(3, storage.CveStgLocal);
        }
    })
}

function PintaMedidasStorage(indicadorMedida, storageId) {    
    $.each(arrgStorageLoc, function (index, stgLc) {
        if (stgLc.CveStgLocal == storageId) {
            var porcentajeUsado = (stgLc.StgLclUsado * 100) / stgLc.StgLclTotal;
            var totalMB = ((stgLc.StgLclTotal) * 1024);
            var totalGB = stgLc.StgLclTotal;
            var totalKB = (totalMB * 1024);
            var totalTB = (totalGB * 1) / 1024;
            var usadoMB = ((stgLc.StgLclUsado) * 1024);
            var usadoGB = stgLc.StgLclUsado;
            var usadoKB = (usadoMB * 1024);
            var usadoTB = (usadoGB * 1) / 1024;
            var heightusado = Math.round(76 * (porcentajeUsado / 100));
            var heightdisponible = Math.round(76 - heightusado);
            var colorPila = "";

            //KB
            if (indicadorMedida == 1) {
                $("#lblTotal_" + storageId).empty();
                $("#lblTotal_" + storageId).append(totalKB.toFixed(1));
                $("#lblUsado_" + storageId).empty();
                $("#lblUsado_" + storageId).append(usadoKB.toFixed(1));
                $("#lblPorcent_" + storageId).empty();
                $("#lblPorcent_" + storageId).append(porcentajeUsado.toFixed(1));
            }
            //MB
            else if (indicadorMedida == 2) {
                $("#lblTotal_" + storageId).empty();
                $("#lblTotal_" + storageId).append(totalMB.toFixed(1));
                $("#lblUsado_" + storageId).empty();
                $("#lblUsado_" + storageId).append(usadoMB.toFixed(1));
                $("#lblPorcent_" + storageId).empty();
                $("#lblPorcent_" + storageId).append(porcentajeUsado.toFixed(1));
            }
            //GB
            else if (indicadorMedida == 3) {
                $("#lblTotal_" + storageId).empty();
                $("#lblTotal_" + storageId).append(totalGB.toFixed(1));
                $("#lblUsado_" + storageId).empty();
                $("#lblUsado_" + storageId).append(usadoGB.toFixed(1));
                $("#lblPorcent_" + storageId).empty();
                $("#lblPorcent_" + storageId).append(porcentajeUsado.toFixed(1));
            }
            //TB
            else if (indicadorMedida == 4) {
                $("#lblTotal_" + storageId).empty();
                $("#lblTotal_" + storageId).append(totalTB.toFixed(1));
                $("#lblUsado_" + storageId).empty();
                $("#lblUsado_" + storageId).append(usadoTB.toFixed(1));
                $("#lblPorcent_" + storageId).empty();
                $("#lblPorcent_" + storageId).append(porcentajeUsado.toFixed(1));
            }
            else {
                $("#lblTotal_" + storageId).empty();
                $("#lblUsado_" + storageId).empty();
                $("#lblPorcent_" + storageId).empty();
            }


            if (porcentajeUsado <= 50)
                colorPila += "Green;";
            else if (porcentajeUsado <= 70)
                colorPila += "Yellow;";
            else if (porcentajeUsado <= 85)
                colorPila += "Orange;";
            else
                colorPila += "Red;";

            div1 = document.getElementById("divPinta1_" + storageId);
            div2 = document.getElementById("divPinta2_" + storageId);
            div1.style.height = heightdisponible + "px";
            div2.setAttribute("style", "background-color :" + colorPila + ";height :" + heightusado + "px");
        }
    })
}

//funcion que se activa al cerrar los reportes
function CerrarReportes() {
    $("#btnLeft").empty();
    $("#ul1").empty();
    $("#btnRight").empty();
    $("#btnCerrar2").empty();
    $("#carrousel").hide();
    $("#divBotones").show();
    $("#divMapContent").show();
    ValidacionDeTablas();
}

function setFilters() {
    $("#MainContent_hdfOrig").val($("#ddlFiltroOrig").val());
    $("#MainContent_hdfEst").val($("#cmbEstatus").val());
    $("#MainContent_hdfFecIni").val($("#dtFechaIni").val());
    $("#MainContent_hdfFecFin").val($("#dtFechaFin").val());
}

//function PintaReporteMatsolCompleto() {
//    var idLocal = $("#adsCarrusel").attr('data-locl');
//    var cadena = PintaTablaMatsol(idLocal);

//    if (cadena != "") 
//        appendReporte(cadena);
//    else
//        alertModal("No se encontro informacion para la local.");
//}

function PintaReporteMatLoc() {
    var idLocal = $("#adsCarrusel").attr('data-locl');
    var cadena = PintaMatLoc(idLocal);
    
    if (cadena != "") 
        appendReporte(cadena);
    else
        alertModal("No se encontro informacion para la local.");
}

function PintaReporteAnchoBanda() {
    var idLocal = $("#adsCarrusel").attr('data-locl');
    var cadena = PintaAnchoBandaReporte(idLocal);
    if (cadena != "") 
        appendReporte(cadena);
    else 
        alertModal("No se encontro informacion para la local.");
}

function appendReporte(cadena) {
    $("#divReportes").empty();
    $("#divReportes").append("<a href='#' onclick='closeReport();'>Regresar</a><br/>");
    $("#divReportes").append(cadena);
    $("#divReportes").show();
    $("#divPpal").hide();
    $("#adsCarrusel").dialog('close');
}

function closeReport() {
    $("#divReportes").empty();
    $("#divReportes").hide();
    $("#divPpal").show();
}

//function PintaTablaMatsol(idLocal) {
//    var indicadorExiste = 0;
//    var informacionHtml = "<table id='tblReporteMatsol' border='1'>";
//    informacionHtml += " <tr><th colspan='13' align='Left'>Reporte de Solicitudes</th></tr>";
//    informacionHtml += "<tr><td align='center'>MOVIMIENTO</td> ";
//    informacionHtml += "<td align='center'>NOMBRE</td><td align='center'>TAMANIO</td>";
//    informacionHtml += "<td align='center'>VISUALIZACION</td><td align='center'>DURACION</td>";
//    informacionHtml += "<td align='center'>FECHA DE SOLICITUD</td><td align='center'>PRIORIDAD</td>";
//    informacionHtml += "<td align='center'>ORIGEN</td><td align='center'>DESTINO</td>";
//    informacionHtml += "<td align='center'>ESTATUS</td><td align='center'>NOMBRE EMPLEADO</td>";
//    informacionHtml += "<td align='center'>ESTAUS ORIGEN</td><td align='center'>ESTAUS DESTINO</td></tr>";

//    $.each(arrglMatSol, function (index, MatSolLoc) {
//        if ((MatSolLoc.CveOrigen.LocalLlave == idLocal) || (MatSolLoc.CveDestino.LocalLlave == idLocal)) {
//            indicadorExiste += 1;
//            if (MatSolLoc.CveEstatus.CveStatusMatLocal == 4)
//                informacionHtml += "<tr BGCOLOR='#B40404'>";
//            else if (MatSolLoc.CveEstatus.CveStatusMatLocal == 5)
//                informacionHtml += " <tr BGCOLOR='#01DF01'>";
//            else
//                informacionHtml += "<tr>";
//            
//            informacionHtml += "<td align='center'>" + indicadorExiste + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.Nombre + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.Tamano + "</td>";
//            informacionHtml += "<td align='center'><progress value='" + MatSolLoc.PorcentajeEnvio + "' max='100'></progress><label style='width=60'><center>" + MatSolLoc.PorcentajeEnvio + "</center></label></td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.Duracion + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.FechaSolicitud + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.CvePrioridad.Descripcion + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.CveOrigen.LocalDescripcion + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.CveDestino.LocalDescripcion + "</td>";
//            informacionHtml += "<td align='center'>" + MatSolLoc.CveEstatus.Nombre + "</td>";
//            if (MatSolLoc.CveEmpleado != undefined)
//                informacionHtml += "<td align='center'>" + MatSolLoc.CveEmpleado.EmpleadoNombre + "</td>";
//            else
//                informacionHtml += "<td align='center'></td>";
//            informacionHtml += "<td align='center'>" + ((MatSolLoc.CheckOrigen == "0" || MatSolLoc.CheckOrigen == null) ? "ESPERANDO SERVICIO" : "OK") + "</td>";
//            informacionHtml += "<td align='center'>" + ((MatSolLoc.CheckDestino == "0" || MatSolLoc.CheckDestino == null) ? "ESPERANDO SERVICIO" : "OK") + "</td>";
//            informacionHtml += "</tr>";
//        }
//    });

//    informacionHtml += "</table>";

//    if (indicadorExiste != 0) 
//        return informacionHtml;
//    else 
//        return "";
//    
//}


function PintaMatLoc(idLocal) {
    var indicadorExiste = 0;
    var codigoHtml = "<table border='1' id='tblMatLocal'>";
    codigoHtml += "<tr><th colspan='11' align='Left'>Reporte de Material Disponible</th></tr>";
    codigoHtml += "<tr><td align='center'>Movimiento</td><td align='center'>Clave</td><td>Matl_Llav_Pr</td><td align='center'>Descripcion</td>";
    codigoHtml += "<td align='center'>Extension</td><td align='center'>Tamaño en GB</td><td align='center'>Tipo de material</td>";
    codigoHtml += "<td align='center'>Duracion (min)</td><td align='center'>En existencia</td><td align='center'>Fecha Recibido</td>";
    codigoHtml += "<td align='center'>Nombre Archivo</td></tr>";

    $.each(arrgMatLoc, function (index, matLoc) {
        if (matLoc.CveLocal.LocalLlave == idLocal) {
            indicadorExiste += 1;
            codigoHtml += "<tr>";
            codigoHtml += "<td align='center'>" + indicadorExiste + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.ClaveOrdenTrabajo + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.CveMaterialLocal + "</td>";
            codigoHtml += "<td align='center'>" + (matLoc.Descripcion == null ? "" : matLoc.Descripcion) + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.Extension + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.Tamano + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.TipoMaterialLocal.TatlNombre + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.Duracion + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.ExisteLocal + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.FechaCreacion + "</td>";
            codigoHtml += "<td align='center'>" + matLoc.NombreArchivo + "</td>";
            codigoHtml += "</tr>";
        }

    })
    codigoHtml += "</table>";
   if (indicadorExiste != 0) 
       return codigoHtml;
   else 
       return "";
}

function PintaAnchoBandaReporte(idLocal) {
    
    var indicadorExiste = 0;
    var codigoHtml = "<table id='tblReporteAnchoBanda' border='1'>";
    codigoHtml += "<tr><th colspan='6' align='Left'>Reporte de Storage</th></tr>";
    codigoHtml += "<tr><td align='center'>Movimiento</td><td align='center'>Storage Total</td>";
    codigoHtml += "<td align='center'>Storage Usado</td><td align='center'>Path</td><td align='center'>Ancho de Banda</td>";
    codigoHtml += "<td align='center'>Carga Maxima de Trabajo</td></tr>";
    
    $.each(arrgStorageLoc, function (index, stgLoc) {
        if (stgLoc.CveLocal == idLocal) {
            $.each(locales, function (index, locls) {
                if (locls.LocalLlave == stgLoc.CveLocal) {
                    indicadorExiste += 1;
                    codigoHtml += "<tr>";
                    codigoHtml += "<td align='center'>" + indicadorExiste+ "</td>";
                    codigoHtml += "<td align='center'>" + (stgLoc.StgLclTotal=0?"":  stgLoc.StgLclTotal )+ "</td>";
                    codigoHtml += "<td align='center'>" + (stgLoc.StgLclUsado=0?"":stgLoc.StgLclUsado)+ "</td>";
                    codigoHtml += "<td align='center'>" + stgLoc.StgLclPath+ "</td>";
                    codigoHtml += "<td align='center'>" + (locls.LoclBandWidth=0?"":locls.LoclBandWidth)+ "</td>";
                    codigoHtml += "<td align='center'>" + (locls.loclWorkMax = 0 ? "" : locls.loclWorkMax) + "</td>";
                    codigoHtml += "</tr>";
                }
            })
        }
    })
    codigoHtml += "</table>";

    if (indicadorExiste != 0) 
        return codigoHtml
     else 
    return "";
    
}

//function pintaInformacionEspecificaDeLocal(idLocal, FechaIni, FechaFin) {
//    var indicador = 0;

//    var codHTML = "<table id='divTblResultado' border='1' width='700'><tr>";
//    codHTML += "<td align='center' >MOVIMIENTO</div>";
//    codHTML += "<td align='center' >VISUALIZACION</div>";
//    codHTML += "<td align='center' >ORIGEN</div>";
//    codHTML += "<td align='center' >DESTINO</div>";
//    codHTML += "<td align='center' >ESTATUS</div>";
//    codHTML += "<td align='center' >VER UBICACION</div></tr>";

//    $.each(arrglMatSol, function (index, matSol) {

//        if (matSol.CveOrigen.LocalLlave == idLocal) {
//            indicador += 1;
//            if (matSol.CveEstatus.CveStatusMatLocal == 4)
//                codHTML += "<tr bgcolor='#FA0019'>";
//            else if (matSol.CveEstatus.CveStatusMatLocal == 5)
//                codHTML += "<tr bgcolor='#00FF00'>";
//            else
//                codHTML += "<tr>";

//            codHTML += "<td align='center' >" + indicador + "</td>";
//            codHTML += "<td align='center'> <progress value='" + matSol.PorcentajeEnvio + "' max='100'></progress><label style='width=60'><center>" + matSol.PorcentajeEnvio + "</center></label></td>";
//            codHTML += "<td align='center' >" + matSol.CveOrigen.LocalDescripcion + "</td>";
//            codHTML += "<td align='center' >" + matSol.CveDestino.LocalDescripcion + "</td>";
//            codHTML += "<td align='center' >" + matSol.CveEstatus.Nombre + "</td>";
//            codHTML += "<td align='center' ><button type=\"button\" onclick=\"PintaLinea(" + matSol.CveSolMatLocal + "," + matSol.CveOrigen.LocalLlave + "," + matSol.CveDestino.LocalLlave + ")\" >VER</button></td>";
//            codHTML += "</tr>";
//        }
//    });
//    codHTML += "</table>";

//    if (indicador != 0)    
//        return codHTML;
//    else 
//        return "";
//}

function setTimer() {
    if (t != undefined)
        clearTimeout(t);

    try {
        if (parent.isWindowClosed() != undefined) {
            var time = 60000 * new Number($("#cmbTiempoAct").val());
            t = setTimeout("updateData();", time);
        }
    }
    catch (ex) { }
}

function updateData() {
    /*Se actualiza la informacion del mapa*/
    updateMapa();
    $("#btnBuscarJs").click();

    /*Se actualiza el intervalo de actualizacion*/
    setTimer();
}

function cmbTiempoAct_changed() {
    updateData();
}

function updateMapa() {
    try{
        $("#divTabs").tabs();
        getMapData();
        cargaStorageLocal(); /*funcion que extre informacion de la tabla secn_the_stgloc y las guarda en el arreglo arrgStorageLoc */

        $.each($('#divMap svg circle'), function (index, theMark) {
            $(theMark).attr("fill", theMarks[$(theMark).attr('data-index')]["fill"]);
        });

        var local = theMarks[currentCode]["local"];
        clearColors();
        /*Se asigna el color al estado seleccionado como origen*/
        theColors[theMarks[currentCode]["value"]] = '#A4D886';
        getStatesOnCommunication(theMarks[currentCode]["local"]);
        $('#divMap').vectorMap('set', 'colors', theColors);

        $.each($("#divMap svg g line"), function (index, theLine) {
            $(theLine).css('display', 'none');
        });

        var valor;
        $.each(transferencias, function (index, compuesto) {
            valor = compuesto.split(',')[1];
            $.each($("#divMap svg g line"), function (index, theLine) {
                if (($(theLine).attr('data-locl') == local && $(theLine).attr('data-locl2') == valor || $(theLine).attr('data-locl') == valor && $(theLine).attr('data-locl2') == local))
                    $(theLine).css('display', '');
            });
        });
        DivDetalle(local, true);
    }
    catch(exception){}
}

function myMarkClick(event, code) {
    currentCode = code;
    var local = theMarks[code]["local"];
    clearColors();
    /*Se asigna el color al estado seleccionado como origen*/
    theColors[theMarks[code]["value"]] = '#A4D886';
    getStatesOnCommunication(theMarks[code]["local"]);
    $('#divMap').vectorMap('set', 'colors', theColors);
    DivDetalle(theMarks[code]["local"]);

    $.each($("#divMap svg g line"), function (index, theLine) {
        $(theLine).css('display', 'none');
    });

    var valor;
    $.each(transferencias, function (index, compuesto) {
        valor = compuesto.split(',')[1];
        $.each($("#divMap svg g line"), function (index, theLine) {
            if (($(theLine).attr('data-locl') == local && $(theLine).attr('data-locl2') == valor || $(theLine).attr('data-locl') == valor && $(theLine).attr('data-locl2') == local))
                $(theLine).css('display', '');
        });
    });
}

function clearColors() {
    $.each(theMarks, function (index, local) {
        theColors[local["value"]] = "white";
    });
}

function getStatesOnCommunication(local) {
    executeSyncRequest(wsMtdGetTransferStates, "{ 'local': " + local + "}", successGetStatesCom, Error);
}

function getMapData() {
    executeSyncRequest(wsMtdGetMapData, "{ }", successGetMapData, Error);
}

var successGetStatesCom = function (data, info) {
    transferencias = data.d;
    $.each(data.d, function (index, valor) {
        theColors[valor.split(',')[0]] = "#E7A029";
    });
}

var successGetMapData = function (data, info) {
    var valores = "[ ";
    $.each(data.d, function (index, local) {
        if (local.IsConnected == false)
            valores += "{ latLng: [" + local.CordX + ", " + local.CordY + "], name: '" + local.LoclName + "', r: " + rad + ", fill: 'red', value:'" + local.State + "', local:" + local.LoclId + " },";
        else if(local.Status == 4)
            valores += "{ latLng: [" + local.CordX + ", " + local.CordY + "], name: '" + local.LoclName + "', r: " + rad + ", fill: '#FFB13D', value:'" + local.State + "', local:" + local.LoclId + " },";
        else if (local.Status == 5 || local.Status == 7 || local.Status == 10)
            valores += "{ latLng: [" + local.CordX + ", " + local.CordY + "], name: '" + local.LoclName + "', r: " + rad + ", fill: '#129F00', value:'" + local.State + "', local:" + local.LoclId + " },";
        else
            valores += "{ latLng: [" + local.CordX + ", " + local.CordY + "], name: '" + local.LoclName + "', r: " + rad + ", fill: '#FAF100', value:'" + local.State + "', local:" + local.LoclId + " },";
    });

    valores = valores.substr(0, valores.length - 1);
    valores += " ]";
    theMarks = eval(valores);
}

function goToAdvanceSearch() {
    parent.openModal("MonitoreoLocales/MonitoreoLocalesBusqueda.aspx?local=" + $("#ddlFiltroOrig").val(), -1, -1, 'B&uacute;squeda Avanzada');
}