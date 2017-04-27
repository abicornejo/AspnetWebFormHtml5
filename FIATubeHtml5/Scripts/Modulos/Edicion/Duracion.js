
var lstStatus;
var tableHeigth = 0;
var excedentes = new Array();
var estandar = new Array();
var insuficientes = new Array();

window.onload = function () { initWindow(); };

function initWindow() {
    executeRequest(wsMtdconsultaPrgEmpl, "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}", successPrgEmpl, Error);
    executeRequest(wsMtdGetStatusEditor, "{ }", successGetStatus, Error);
    tableHeigth = (getMaxFloatableHeigth() - 230) / 3;

    createTable(new Array(), "divExcedentes", "Tiempos Excedentes");
    createTable(new Array(), "divEstandar", "Tiempos Estandard");
    createTable(new Array(), "divInsuficientes", "Tiempos Insuficientes");

    $("#divRealizadores").dialog({ width: "507px", height: 539, modal: true, resizable: false, autoOpen: false, show: "blind" });
}

var successGetStatus = function (data, status) {
    lstStatus = "";
    $("#cmbEstatus").empty();
    $("#cmbEstatus").append('<option value="-1">== TODOS ==</option>');
    lstStatus += '<option value="-1">== TODOS ==</option>';
    $.each(data.d, function (index, programa) {
        $("#cmbEstatus").append('<option value="' + programa.CveEstatusEd + '">' + programa.Descripcion + '</option>');
        lstStatus += '<option value="' + programa.CveEstatusEd + '">' + programa.Descripcion + '</option>';
    });
}

var successPrgEmpl = function (data, status) {
    $("#cmbProgramas").empty();
    $.each(data.d, function (index, programa) {
        $("#cmbProgramas").append('<option value="' + programa.CvePrograma.CvePrograma + '">' + programa.CvePrograma.NombrePrograma + '</option>');
    });
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

    $("#dtFechaIni").datepicker('setDate', new Date());
    $("#dtFechaFin").datepicker('setDate', new Date());
});

function btnBuscar_click() {
    try {
        $('div.modal').show();
        executeRequest(wsMtdGetRequestEditorDur, "{ 'CveOT': '" + $("#txtOT").val().toUpperCase() + "', 'CveProg': " + $("#cmbProgramas").val() + ", 'CveEstatusEd':" + $("#cmbEstatus").val() + ", 'FechaIni':" + JSON.stringify($("#dtFechaIni").datepicker('getDate')) + ", 'FechaFin':" + JSON.stringify($("#dtFechaFin").datepicker('getDate')) + " }", successGetRequestEditor, myError);
    }
    catch (exception) {
        $('div.modal').hide();
    }
}

var successGetRequestEditor = function (data, status) {
    try {
        $('div.modal').show();

        excedentes = new Array();
        estandar = new Array();
        insuficientes = new Array();

        $.each(data.d, function (index, value) {
            if (value.DuracionReal > 14400)
                excedentes.push(value);
            else if (value.DuracionReal < 300)
                insuficientes.push(value);
            else
                estandar.push(value);
        });

        createTable(excedentes, "divExcedentes", "Tiempos Excedentes");
        createTable(estandar, "divEstandar", "Tiempos Estandard");
        createTable(insuficientes, "divInsuficientes", "Tiempos Insuficientes");

        $(".tmpTimePick").timepicker({
            showSecond: true,
            timeFormat: 'hh:mm:ss',
            hourGrid: 4,
            minuteGrid: 10,
            secondGrid: 10
        });
    }
    catch (exception) {
        alertModal('Ocurrio un problema al cargar la informacion del Grid.');
    }
    finally {
        $('div.modal').hide();
    }
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + request.statusText);
    $('div.modal').hide();
}

function createTable(theArrarContent, theDivContainer, theTitle) {
    var Tabla = "";
    var cmbRealizador;
        var Arreglo = new Array();

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tb_" + theDivContainer + "' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th colspan='10'>" + theTitle + "</th>";
        Tabla += "</tr>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>OT</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Programa</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Fecha</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Estatus</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Formato</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>T&iacute;tulo</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Duraci&oacute;n Ante</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Duraci&oacute;n</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Modific&oacute;</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Realizador</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#" + theDivContainer).html("").html(Tabla);

        $.each(theArrarContent, function (index, value) {

            /*Modificacion de fechas*/
            value.CveOrdenTrabajo.FechaEvento = parseJSONToDate(value.CveOrdenTrabajo.FechaEvento);
            value.FechaInicio = parseJSONToDate(value.FechaInicio);
            value.FechaFin = parseJSONToDate(value.FechaFin);
            value.CvePrograma.FechaInicio = parseJSONToDate(value.CvePrograma.FechaInicio);
            value.CvePrograma.FechaFin = parseJSONToDate(value.CvePrograma.FechaFin);
            value.FechaCreacion = parseJSONToDate(value.FechaCreacion);
            value.FechaAire = parseJSONToDate(value.FechaAire);
            if (value.CveOrdenTrabajo.FabrLlave != null && value.CveOrdenTrabajo.FabrLlave != undefined)
                value.CveOrdenTrabajo.FabrLlave.Programa = null;

            $.each(value.LstEquipotrab, function (index2, equipo) {
                equipo.CvePrograma.FechaInicio = parseJSONToDate(equipo.CvePrograma.FechaInicio);
                equipo.CvePrograma.FechaFin = parseJSONToDate(equipo.CvePrograma.FechaFin);
                equipo.CveOrdenTrabajo.FechaEvento = parseJSONToDate(equipo.CveOrdenTrabajo.FechaEvento);
                if (equipo.CveOrdenTrabajo.FabrLlave != null && equipo.CveOrdenTrabajo.FabrLlave != undefined)
                    equipo.CveOrdenTrabajo.FabrLlave.Programa = null;
            });

            cmbRealizador = "<select class='cmbRealEditor' id='cmbReal" + theDivContainer + index + "'>";
            $.each(value.LstRealizadores, function (index2, realizador) {
                if (value.Indexrealizadores == index2)
                    cmbRealizador += "<option value='" + realizador.EmpleadoLlavePrimaria + "' selected='selected'>" + realizador.EmpleadoNombre + "</option>"
                else
                    cmbRealizador += "<option value='" + realizador.EmpleadoLlavePrimaria + "'>" + realizador.EmpleadoNombre + "</option>"
            });
            cmbRealizador += "</select> <button type='button' class='btnAgregarRealizador' onclick='btnRealizadores_click(" + value.CvePrograma.CvePrograma + ", " + value.CveOrdenTrabajo.CveOrdenTrabajo + ", " + value.CveEmpleado.EmpleadoLlavePrimaria + ", " + value.CveSolicitudEditor + "); return false;' />";

            Arreglo[index] = new Array(
                value.CveOrdenTrabajo.ClaveOrdenTrabajo,
                value.CvePrograma.NombrePrograma,
                value.FechaInicio.esMXFormat(),
                "<select id='cmb" + theDivContainer + index + "'>" + lstStatus + "</select>", //value.CveOrdenTrabajo.CveOrdenTrabajo,// estatus
                value.Formato,
                value.CveOrdenTrabajo.Titulo,
                value.DurMuestra,
                '<input id="txt' + theDivContainer + index + '" type="text" class="tmpTimePick" value="' + value.DurRealMuestra + '"/>',
                value.CveEmpleado.EmpleadoNombre,
                cmbRealizador
            );
        });


        oTable = $('#tb_' + theDivContainer).dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(1)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(2)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(3)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(4)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(5)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(6)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(7)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(8)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(9)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
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
            "bFilter": false,
            "bSort": false,
            "bDisplayLength": false,
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

        $.each(theArrarContent, function (index, value) {
            $("#cmb" + theDivContainer + index).val(value.IndexEstatus); 
        });

        $('#tb_' + theDivContainer + '_length').css("display", "none");
}


function btnRealizadores_click(prg, ot, empl, sol) {
    $("#ifrmRealizadores").attr("src", "EmpleadosMultiples.aspx?cPrg=" + prg + "&cvOT=" + ot + "&cEmpl=" + empl + "&cSol=" + sol);
    $("#divRealizadores").dialog('open');
}

function btnSalaAdmin_click() {
    var left = (screen.width / 2) - (widthSalaAdmin / 2);
    var top = (screen.height / 2) - (heightSalaAdmin / 2);
    window.open("MonitorRecursosEdicion.aspx?isFromMenu=0&fecI=" + $("#dtFechaIni").datepicker('getDate').defaultView() + "&fecF=" + $("#dtFechaFin").datepicker('getDate').defaultView(), "Sala Administraci&oacute;n", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=0, copyhistory=no, width=" + screen.width + ", height=" + heightSalaAdmin + ", top=" + top + ", left=" + left);
}

function btnGuardar_click() {
    var theDuration;
    var tmpObj;
    var empl;
    var theData = new Array();
    $('div.modal').show();

    try{
        if (excedentes.length > 0) {
            $.each(excedentes, function (index, value) {
                value.IndexEstatus = $("#cmbdivExcedentes" + index).val();
                value.CveEstatusEditor.CveEstatusEd = $("#cmbdivExcedentes" + index).val();

                if ($("#cmbRealdivExcedentes" + index).val() != -1)
                    value.CveEmpleado.EmpleadoLlavePrimaria = $("#cmbRealdivExcedentes" + index).val();
                else
                    value.CveEmpleado = null;

                theDuration = $("#txtdivExcedentes" + index).datetimepicker('getDate');
                value.DurRealMuestra = (theDuration.getHours() * 3600) + (theDuration.getMinutes() * 60) + theDuration.getSeconds();
                value.DuracionReal = value.DurRealMuestra;
            });

            $.each(excedentes, function (index, value) {

                empl = null;
                if (value.CveEmpleado != undefined && value.CveEmpleado != null)
                    empl = value.CveEmpleado.EmpleadoLlavePrimaria;
                tmpObj = new Array(value.CveSolicitudEditor, value.CvePrograma.CvePrograma, value.CveOrdenTrabajo.CveOrdenTrabajo, value.CveEstatusEditor.CveEstatusEd, value.DuracionReal, empl);

                theData.push(tmpObj);
            });

            PageMethods.uodateLstRequestEditor(theData, successSateLstExc, myError);
        }
        else
            guardaEstandar();
        
    }
    catch(ex){
        $('div.modal').hide();
    }
}

function successSateLstExc(result, userContext, methodName) {
    guardaEstandar();
}

function successSateLstEst(result, userContext, methodName) {
    guardaInsuficientes();
}

function successSateLstIns(result, userContext, methodName) {
    $('div.modal').hide();
    btnBuscar_click();
}


function guardaEstandar(){
    var theDuration;
    var tmpObj;
    var empl;
    var theData = new Array();
    try{
        if (estandar.length > 0) {
            $.each(estandar, function (index, value) {
                value.IndexEstatus = $("#cmbdivEstandar" + index).val();
                value.CveEstatusEditor.CveEstatusEd = $("#cmbdivEstandar" + index).val();

                if ($("#cmbRealdivEstandar" + index).val() != -1)
                    value.CveEmpleado.EmpleadoLlavePrimaria = $("#cmbRealdivEstandar" + index).val();
                else
                    value.CveEmpleado = null;

                theDuration = $("#txtdivEstandar" + index).datetimepicker('getDate');
                value.DurRealMuestra = (theDuration.getHours() * 3600) + (theDuration.getMinutes() * 60) + theDuration.getSeconds();
                value.DuracionReal = value.DurRealMuestra;
            });

            $.each(estandar, function (index, value) {

                empl = null;
                if (value.CveEmpleado != undefined && value.CveEmpleado != null)
                    empl = value.CveEmpleado.EmpleadoLlavePrimaria;
                tmpObj = new Array(value.CveSolicitudEditor, value.CvePrograma.CvePrograma, value.CveOrdenTrabajo.CveOrdenTrabajo, value.CveEstatusEditor.CveEstatusEd, value.DuracionReal, empl);

                theData.push(tmpObj);
            });

            PageMethods.uodateLstRequestEditor(theData, successSateLstEst, myError);
        }
        else
            guardaInsuficientes();
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

function guardaInsuficientes(){
    var theDuration;
    var tmpObj;
    var empl;
    var theData = new Array();
    try{
        if (insuficientes.length > 0) {
            $.each(insuficientes, function (index, value) {
                value.IndexEstatus = $("#cmbdivInsuficientes" + index).val();
                value.CveEstatusEditor.CveEstatusEd = $("#cmbdivInsuficientes" + index).val();

                if ($("#cmbRealdivInsuficientes" + index).val() != -1)
                    value.CveEmpleado.EmpleadoLlavePrimaria = $("#cmbRealdivInsuficientes" + index).val();
                else
                    value.CveEmpleado = null;

                theDuration = $("#txtdivInsuficientes" + index).datetimepicker('getDate');
                value.DurRealMuestra = (theDuration.getHours() * 3600) + (theDuration.getMinutes() * 60) + theDuration.getSeconds();
                value.DuracionReal = value.DurRealMuestra;
            });

            $.each(insuficientes, function (index, value) {
                
                empl = null;
                if (value.CveEmpleado != undefined && value.CveEmpleado != null)
                    empl = value.CveEmpleado.EmpleadoLlavePrimaria;
                tmpObj = new Array(value.CveSolicitudEditor, value.CvePrograma.CvePrograma, value.CveOrdenTrabajo.CveOrdenTrabajo, value.CveEstatusEditor.CveEstatusEd, value.DuracionReal, empl);

                theData.push(tmpObj);
            });

            PageMethods.uodateLstRequestEditor(theData, successSateLstIns, myError);
        }
        else {
            $('div.modal').hide();
            btnBuscar_click();
        }
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

function updateForm() {
    btnBuscar_click();
}