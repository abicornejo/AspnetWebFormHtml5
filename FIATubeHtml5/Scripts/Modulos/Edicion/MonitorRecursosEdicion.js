var fail = "";
var theIndex;
var lstStatus;
var initParams;
var tableHeigth = 0;
var salasReal;
var dataGrid2;
var contentCmbReal;
var saveSolEd;
var realizIDAnt;
var arrayAddNota;


window.onload = function () { initialize(); }

function initialize() {
    initParams = getUrlVars();
    $("#divRealizadores").dialog({ width: "507px", height: 539, modal: true, resizable: false, autoOpen: false, show: "blind" });
    $("#divComentarios").dialog({ width: "350px", height: 230, modal: true, resizable: false, autoOpen: false, show: "blind" });
    $("#divAddOT").dialog({ width: "auto", height: "500", modal: true, resizable: false, autoOpen: false, show: "blind" });
    $("#divAddNotas").dialog({ width: "auto", height: "auto", modal: true, resizable: false, autoOpen: false, show: "blind" });

    if (initParams['isFromMenu'] == 1) {
        initDates(new Date(), new Date());
        tableHeigth = (getMaxFloatableHeigth() - 220) / 2;
        $("#dtFechaPart2").datepicker();
        $("#dtFechaPart2").datepicker('setDate', new Date());
        $("#dtAddNota").datepicker({ 'readonly': true });
        $("#dtAddNota").datepicker('setDate', new Date());

        $("#dtFechaMulNot").datepicker({ 'readonly': true });
        $("#dtFechaMulNot").datepicker('setDate', new Date());
        
        $("#divPart2").show();
    }
    else {
        if (initParams["fecI"] != undefined && initParams["fecF"] != undefined)
            initDates(new Date(initParams["fecI"]), new Date(initParams["fecF"]));

        tableHeigth = getMaxFloatableHeigth() - 315;
        $("#divPart2").hide();
    }
    try {
        $('div.modal').show();
        executeRequest(wsMtdGetRealizadores, "{ }", successGetRealizadores, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetRealizadores = function (data, status) {
    var cmbRealizador = "";
    try {
        $("#cmbRealizador").empty();
        cmbRealizador += "<option value='-1'>== SELECCIONE ==</option>";
        $.each(data.d, function (index, realizador) {
            cmbRealizador += "<option value='" + realizador.EmpleadoLlavePrimaria + "'>" + realizador.EmpleadoNombre + "</option>";
        });
        $("#cmbRealizador").append(cmbRealizador);
        executeRequest(wsGetCentroEdicion, "{ }", successGetCentroEd, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetCentroEd = function (data, status) {
    var cmbRealizador = "";
    try {
        $("#cmbSala").empty();
        $("#cboSalaPart2").empty();
        
        cmbRealizador += "<option value='-1'>== SELECCIONE ==</option>";
        $.each(data.d, function (index, realizador) {
            cmbRealizador += "<option value='" + realizador.CveCentroEdicion + "'>" + realizador.Descripcion + "</option>";
        });
        $("#cmbSala").append(cmbRealizador);
        $("#cboSalaPart2").append(cmbRealizador);
        executeRequest(wsMtdconsultaPrgEmpl, "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}", successGetProgs, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetProgs = function (data, status) {
    var cmbRealizador = "";
    try {
        $("#cmbPrograma").empty();
        $("#cboProgramaPart2").empty();
        $("#cmbPrgAddNota").empty();
        $("#cmbProgramaMulNot").empty();

        cmbRealizador += "<option value='-1'>== SELECCIONE ==</option>";
        $.each(data.d, function (index, realizador) {
            cmbRealizador += "<option value='" + realizador.CvePrograma.CvePrograma + "'>" + realizador.CvePrograma.NombrePrograma + "</option>";
        });
        $("#cmbPrograma").append(cmbRealizador);
        $("#cboProgramaPart2").append(cmbRealizador);
        $("#cmbPrgAddNota").append(cmbRealizador);
        $("#cmbProgramaMulNot").append(cmbRealizador);

        if (initParams['isFromMenu'] == 1) {
            executeRequest(wsMtdObtenerSecc, "{ }", successGetSecc, myError);
            executeRequest(wsMtdGetStatusEditor, "{ }", successGetStatus, myError);
        }
        else
            getFirstGrid();
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetSecc = function (data, status) {
    var cmbData = "";
    $("#cboSeccion").empty();

    cmbData += "<option value='-1'>== SELECCIONE ==</option>";
    $.each(data.d, function (index, seccion) {
        cmbData += "<option value='" + seccion.CveSeccion + "'>" + seccion.NombreSeccion + "</option>";
    });

    $("#cboSeccion").append(cmbData);
}

var successGetStatus = function (data, status) {
    lstStatus = "";
    try {
        $("#cboEstatus").empty();
        lstStatus += '<option value="-1">== SELECCIONE ==</option>';
        $.each(data.d, function (index, programa) {
            lstStatus += '<option value="' + programa.CveEstatusEd + '">' + programa.Descripcion + '</option>';
        });

        $("#cboEstatus").append(lstStatus);
    }
    finally {
        $('div.modal').hide();
    }

    getFirstGrid();
    if (initParams['isFromMenu'] == 1)
        fillGrid2(true);
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + request.statusText);
    $('div.modal').hide();
}

function initDates(fechaInicio, fechaFin) {
    var startDateTextBox = $("#dtFechaIni");
    var endDateTextBox = $("#dtFechaFin");

    startDateTextBox.datetimepicker({
        onClose: function (dateText, inst) {
            if (endDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    endDateTextBox.datetimepicker('setDate', testStartDate);
            }
            else {
                endDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            endDateTextBox.datetimepicker('option', 'minDate', startDateTextBox.datetimepicker('getDate'));
        }
    });
    endDateTextBox.datetimepicker({
        onClose: function (dateText, inst) {
            if (startDateTextBox.val() != '') {
                var testStartDate = startDateTextBox.datetimepicker('getDate');
                var testEndDate = endDateTextBox.datetimepicker('getDate');
                if (testStartDate > testEndDate)
                    startDateTextBox.datetimepicker('setDate', testEndDate);
            }
            else {
                startDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            startDateTextBox.datetimepicker('option', 'maxDate', endDateTextBox.datetimepicker('getDate'));
        }
    });

    if (fechaInicio == undefined || fechaFin == undefined) {
        $("#dtFechaIni").datetimepicker('setDate', new Date());
        $("#dtFechaFin").datetimepicker('setDate', new Date());
    }
    else {
        $("#dtFechaIni").datetimepicker('setDate', fechaInicio);
        $("#dtFechaFin").datetimepicker('setDate', fechaFin);
    }
}

function getFirstGrid() {
    try{
        executeSyncRequest(wsMtdGetDatosRealizadores, "{ 'CveRealizador': " + $("#cmbRealizador").val() + ", 'CveCentroEdicion': " + $("#cmbSala").val() + ", 'CvePrograma': " + $("#cmbPrograma").val() + ", 'FechaIni': " + JSON.stringify($("#dtFechaIni").datetimepicker('getDate')) + "}", successGetDatosReal, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetDatosReal = function (data, status) {
    try {
        $('div.modal').show();
        var Tabla = "";
        var cmbRealizador;
        var Arreglo = new Array();

        salasReal = data.d;

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tb_divContenido' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Eliminar</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Sala</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Inicio</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Fin</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Programa</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Realizador</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divContenido").html("").html(Tabla);

        $.each(salasReal, function (index, value) {

            value.CveFechaInicio = parseJSONToDate(value.CveFechaInicio);
            value.FechaFin = parseJSONToDate(value.FechaFin);
            value.FechaCreacion = parseJSONToDate(value.FechaCreacion);
            if (value.CvePrograma != undefined && value.CvePrograma != null) {
                value.CvePrograma.FechaInicio = parseJSONToDate(value.CvePrograma.FechaInicio);
                value.CvePrograma.FechaFin = parseJSONToDate(value.CvePrograma.FechaFin);
            }
            value.CveCentroEdicion.INew = "";

            Arreglo[index] = new Array(
                "<button type='button' class='btnEliminarMonitorRecEdi' title='Eliminar' onclick='btnDelete_click(" + index + "); return false;'></button>",
                value.CveCentroEdicion.Descripcion,
                value.CveFechaInicio.esMXFormatLarge() + " hrs",
                value.FechaFin.esMXFormatLarge() + " hrs",
                value.CvePrograma.Abreviatura,
                value.CveEmpleado.EmpleadoNombre
            );
        });


        oTable = $('#tb_divContenido').dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(1)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(2)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(3)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(4)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(5)', nRow).addClass('divContentNMONITOREO');
                    return nRow;
                },
            "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
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

        $('#tb_divContenido_length').css("display", "none");
    }
    finally {
        $('div.modal').hide();
    }
}

function btnUpdate_click() {
    getFirstGrid();
}

function btnUpdate2_click() {
    if (initParams['isFromMenu'] == 1)
        fillGrid2(false);
}

function btnDelete_click(index) {
    executeRequest(wsMtdDelRegistroRealizador, "{ 'SalaRealizador': " + JSON.stringify(salasReal[index]) + " }", successDelReg, myError);
}

var successDelReg = function (data, status) {
    alertModalFunctionOK("El registro se elimin&oacute; correctamente.", btnUpdate_click);
}

function getRealizadores2() {
    $('div.modal').show();
    executeRequest(wsMtdGetRealPart2, "{ 'CvePrograma': " + $("#cboProgramaPart2").val() + ", 'CveCentroEd': " + $("#cboSalaPart2").val() + ", 'FechaIni': " + JSON.stringify($("#dtFechaPart2").datepicker('getDate')) + " }", successGetRealizadores2, myError);
}

var successGetRealizadores2 = function (data, status) {
    try {
        var cmbData = "";
        $("#cmbRealizadorPart2").empty();

        cmbData += "<option value='-1'>== SELECCIONE ==</option>";
        $.each(data.d, function (index, real) {
            cmbData += "<option value='" + real.EmpleadoLlavePrimaria + "'>" + real.EmpleadoNombre + "</option>";
        });

        $("#cmbRealizadorPart2").append(cmbData);
        contentCmbReal = cmbData;
        executeRequest(wsMtdGetDataSolEditor, "{ 'CveEmpleado': " + $("#cmbRealizadorPart2").val() + ", 'CveCentroEdicion': " + $("#cboSalaPart2").val() + ", 'CveEstatusEditor':" + $("#cboEstatus").val() + ", 'CvePrograma':" + $("#cboProgramaPart2").val() + ", 'CveSeccion':" + $("#cboSeccion").val() + ", 'FechaIni': " + JSON.stringify($("#dtFechaPart2").datepicker('getDate')) + " }", successGetDataSolEditor, Error);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

function fillGrid2(cargaReal) {
    if(cargaReal == true)
        getRealizadores2();
    else {
        $('div.modal').show();
        executeRequest(wsMtdGetDataSolEditor, "{ 'CveEmpleado': " + $("#cmbRealizadorPart2").val() + ", 'CveCentroEdicion': " + $("#cboSalaPart2").val() + ", 'CveEstatusEditor':" + $("#cboEstatus").val() + ", 'CvePrograma':" + $("#cboProgramaPart2").val() + ", 'CveSeccion':" + $("#cboSeccion").val() + ", 'FechaIni': " + JSON.stringify($("#dtFechaPart2").datepicker('getDate')) + " }", successGetDataSolEditor, Error);
    }
}

var successGetDataSolEditor = function (data, status) {
    try {
        $('div.modal').show();
        var Tabla = "";
        var cmbRealizador;
        var Arreglo = new Array();
        dataGrid2 = data.d;

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tb_divContenido2' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>E</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>iNews</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>OT</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>T&iacute;tulo</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Realizador</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Sala</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Estatus</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Programa</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Seccion</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Formato</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Fecha Aire</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Comentario</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divContenido2").html("").html(Tabla);

        $.each(dataGrid2, function (index, value) {

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
            value.CveCentroEdicion.INew = "";
            Arreglo[index] = new Array(
                "<input type='checkbox' data-val='" + index + "' />",
                "<input class='txtInputMaster' type='text' id='txtiNewsDiv2_" + index + "' value='" + value.iNews + "' />",
                "<label class='lblOTLnk' onMouseOver=this.style.cursor='pointer' onclick='lnkOT_click(" + value.CveOrdenTrabajo.CveOrdenTrabajo + ", \"" + value.CveOrdenTrabajo.ClaveOrdenTrabajo + "\"); return false;'>" + value.CveOrdenTrabajo.ClaveOrdenTrabajo + "</label>",
                value.CveOrdenTrabajo.Titulo,
                "<select class='cmbRealEditor txtInputMaster' id='cmbRealdivContenido2_" + index + "' onchange='cmbRealizadorPrt2_change(" + index + ");'>" + contentCmbReal + "</select><button type='button' class='btnAgregarRealizador' click='btnRealizadores_click(" + value.CvePrograma.CvePrograma + ", " + value.CveOrdenTrabajo.CveOrdenTrabajo + ", " + value.CveEmpleado.EmpleadoLlavePrimaria + ", " + value.CveSolicitudEditor + "); return false;' />",
                "<label id='lblCentro_" + index + "'>" + value.CveCentroEdicion.Descripcion + "</label>",
                "<select class='cmbRealEditor txtInputMaster' id='cmbdivContenido2" + index + "' " + (value.EnableEstatus == true ? "" : "disabled='disabled'") + ">" + lstStatus + "</select>",
                value.CvePrograma.Abreviatura,
                value.CveOrdenTrabajo.CveSeccion.NombreSeccion,
                value.Formato,
                value.FechaAire.esMXFormatLarge() + "hrs",
                "<button type='button' class='btnComentarioMonitorRecEdicion' onclick='opemMdlComm(" + index + "); return false;'></button>"
            );
        });


        oTable = $('#tb_divContenido2').dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(1)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(2)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(3)', nRow).addClass('divContentMonitorRecEdicion ');
                    $('td:eq(4)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(5)', nRow).addClass('divContentMonitorRecEdicion ');
                    $('td:eq(6)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(7)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(8)', nRow).addClass('divContentMonitorRecEdicion ');
                    $('td:eq(9)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(10)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(11)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    return nRow;
                },
            "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
            "sScrollY": tableHeigth,
            "iDisplayLength": 10000,
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
                "sLoadingRecords": "Por favor espere - cargando...",
                "sSearch": "Buscar: ",
                "oPaginate": {
                    "sFirst": "",
                    "sPrevious": "",
                    "sNext": "",
                    "sLast": ""
                }
            }
        });

        $.each(dataGrid2, function (index, value) {
            $("#cmbdivContenido2" + index).val(value.CveEstatusEditor.CveEstatusEd);
            
            $("#cmbRealdivContenido2_" + index).prop("selectedIndex", value.Indexrealizadores);
        });

        $('#tb_divContenido_length').css("display", "none");
        $('#tb_divContenido2_length').css("display", "none");
    }
    finally {
        $('div.modal').hide();
    }
}

function lnkOT_click(data, data2) {
    parent.openModal('OT/OT.aspx?numOT=' + data, -1, -1, 'Actualizaci&oacute;n de OT: ' + data2);
}

function btnRealizadores_click(prg, ot, empl, sol) {
    $("#ifrmRealizadores").attr("src", "EmpleadosMultiples.aspx?cPrg=" + prg + "&cvOT=" + ot + "&cEmpl=" + empl + "&cSol=" + sol);
    $("#divRealizadores").dialog('open');
}

function btnRechazar_click() {
    if (dataGrid2.length > 0) {
        try {
            $('div.modal').show();
            $.each(dataGrid2, function (index, value) {
                if (value.CveEmpleado.EmpleadoLlavePrimaria == -1 && value.CveCentroEdicion.CveCentroEdicion == 0 && value.CveEstatusEditor.CveEstatusEd == 1) {
                    value.CveEmpleado = null;
                    value.CveCentroEdicion = null;
                    executeSyncRequest(wsMtdDelSolEd, "{ 'SolicitudEditor':" + JSON.stringify(value) + " }", function (data, status) { }, myError);
                }
                else {
                    value.CveEmpleado = null;
                    value.CveCentroEdicion = null;
                    value.CveEstatusEditor.CveEstatusEd = 1;
                    value.iNews = "";
                    value.Comentario = "";
                    executeSyncRequest(wsMtdUpdateSolEditorObj, "{ 'SolicitudEditor':" + JSON.stringify(value) + " }", function (data, status) { }, myError);
                }
            });

            fillGrid2(true);
        }
        catch(ex) {
            $('div.modal').hide();
        }
    }
    else
        alertModal("No existen registros para ser rechazados.");
}

function opemMdlComm(index) {
    $("#btnSaveComment").attr('data-val', index);
    $("#txtCooments").val("");
    $("#divComentarios").dialog('open');
    if (dataGrid2[index].Comentario != undefined && dataGrid2[index].Comentario != null)
        $("#txtCooments").val(dataGrid2[index].Comentario);
}

function btnSaveComment_click() {
    if ($.trim($("#txtCooments").val()) == "") {
        alertModal("No se puede guardar un comentario vac&iacute;o.");
        return false;
    }

    var index = $("#btnSaveComment").attr('data-val');
    dataGrid2[index].Comentario = $("#txtCooments").val();
    if (dataGrid2[index].CveEmpleado != undefined && dataGrid2[index].CveEmpleado != null) {
        if (dataGrid2[index].CveEmpleado.EmpleadoLlavePrimaria < 0) {
            dataGrid2[index].CveEmpleado = null;
            dataGrid2[index].CveCentroEdicion = null;
        }
    }

    executeRequest(wsMtdUpdateSolEditorObj, "{ 'SolicitudEditor':" + JSON.stringify(dataGrid2[index]) + " }", successSaveComment, myError);
}

var successSaveComment = function (data, status) { 
    alertModal("Se guardaron correctamente los comentarios.");
}



function btnSaveAddOT_click() {
    $("#divContenido3").empty();
    $("#divAddOT").dialog('open');
}

function cmbRealizadorPrt2_change(index) {
    $('div.modal').show();
    theIndex = index;
    
    try {
        saveSolEd = dataGrid2[index];

        if (saveSolEd == undefined || saveSolEd == null)
            return;

        if (saveSolEd.CveEmpleado != undefined && saveSolEd.CveEmpleado != null)
            realizIDAnt = saveSolEd.CveEmpleado.EmpleadoLlavePrimaria;
        else {
            realizIDAnt = 0;
            saveSolEd.CveEmpleado = new TDI_EMPL();
        }
        
        saveSolEd.CveEmpleado.EmpleadoLlavePrimaria = $("#cmbRealdivContenido2_" + index).val();
        saveSolEd.Indexrealizadores = $("#cmbRealdivContenido2_" + index).prop("selectedIndex");

        executeSyncRequest(wsMtdGetDatosRealizadores, "{ 'CveRealizador': " + saveSolEd.CveEmpleado.EmpleadoLlavePrimaria + ", 'CveCentroEdicion': 0, 'CvePrograma': " + $("#cmbPrograma").val() + ", 'FechaIni': " + JSON.stringify($("#dtFechaIni").datetimepicker('getDate')) + "}", successSaveReal, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successSaveReal = function (data, status) {
    try {
        saveSolEd.CveCentroEdicion = data.d[0].CveCentroEdicion;
        saveSolEd.EnableEstatus = true;
        saveSolEd.CveEstatusEditor.CveEstatusEd = 2;
        $("#lblCentro_" + theIndex).empty();
        $("#lblCentro_" + theIndex).append(saveSolEd.CveCentroEdicion.Descripcion);

        if (saveSolEd.CveEmpleado.EmpleadoLlavePrimaria > 0) {
            executeSyncRequest(wsMtdUpdateSolEditorObj, "{ 'SolicitudEditor': " + JSON.stringify(saveSolEd) + " }", successUpdateSolEd, myError);
        }
        else {
            saveSolEd.CveCentroEdicion = null;
            saveSolEd.CveEstatusEditor.CveEstatusEd = 1;
            executeSyncRequest(wsMtdGetStatusEditor, "{ }", successGetStatusEq, myError);
        }
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successUpdateSolEd = function (data, status) {
    try {
        var indexEqui = obtenerIndice();

        if (indexEqui < 0) {
            var addEquip = new THE_EquipoTrabajo();
            addEquip.CveOrdenTrabajo = saveSolEd.CveOrdenTrabajo;
            addEquip.CvePrograma = saveSolEd.CvePrograma;
            addEquip.EmpleadoLlavePrimaria = saveSolEd.CveEmpleado;
            addEquip.PuestoLlavePrimaria = new TDI_Puestos();
            addEquip.PuestoLlavePrimaria.PuestoLlavePrimaria = 3;
            saveSolEd.LstEquipotrab.push(addEquip);
            executeSyncRequest(wsMtdUpdEqTrab, "{ 'oEquipoTrabajo': " + JSON.stringify(saveSolEd.LstEquipotrab[saveSolEd.LstEquipotrab.length - 1]) + " }", successUpdEqTrab, myError);
        }
        else {
            saveSolEd.LstEquipotrab[indexEqui].EmpleadoLlavePrimaria = saveSolEd.CveEmpleado;
            executeSyncRequest(wsMtdUpdEqTrab, "{ 'oEquipoTrabajo': " + JSON.stringify(saveSolEd.LstEquipotrab[indexEqui]) + " }", successUpdEqTrab, myError);
        }

        realizIDAnt = saveSolEd.CveEmpleado.EmpleadoLlavePrimaria;
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successUpdEqTrab = function (data, status) {
    try {
        var indice = obtenerIndice();
        saveSolEd.LstEquipotrab[indice == -1 ? 0 : indice].CveEquipoTrabajo = data.d;
        if (saveSolEd.CveEstatusEditor.CveEstatusEd == 2)
            executeRequest(wsMtdGetStatusEditor, "{ }", successGetStatusEq, myError);
        else
            $('div.modal').hide();
    } catch (ex) {
        $('div.modal').hide();
    }
}

function obtenerIndice() {
    for (var i; i < saveSolEd.LstEquipotrab.length; i++) 
        if (saveSolEd.LstEquipotrab[i].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria == realizIDAnt)
            return i;

    return -1;
}

var successGetStatusEq = function (data, status) {
    try {
        saveSolEd.LstEstatusEditor = new Array();
        saveSolEd.EnableEstatus = true;
        $("#cmbdivContenido2" + theIndex).attr("disabled", false);
        $("#cmbdivContenido2" + theIndex).empty();

        switch (saveSolEd.CveEstatusEditor.CveEstatusEd) {
            case 1: //Solicitado
                saveSolEd.EnableEstatus = false;
                saveSolEd.IndexEstatus = 0;
                saveSolEd.LstEstatusEditor.push(data.d[0]);
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[0].CveEstatusEd + '">' + data.d[0].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 0);
                $("#cmbdivContenido2" + theIndex).attr("disabled", true);
                break;
            case 2:
                saveSolEd.IndexEstatus = 0;
                saveSolEd.LstEstatusEditor.push(data.d[1]);
                saveSolEd.LstEstatusEditor.push(data.d[3]);
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[1].CveEstatusEd + '">' + data.d[1].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[3].CveEstatusEd + '">' + data.d[3].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 0);
                break;
            case 3:
                saveSolEd.EnableEstatus = false;
                saveSolEd.IndexEstatus = 2;
                saveSolEd.LstEstatusEditor.push(data.d[0]);
                $("#cmbdivContenido2" + theIndex).append(lstStatus);
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 2);
                break;
            case 4:
                saveSolEd.IndexEstatus = 1;
                saveSolEd.LstEstatusEditor.push(data.d[2]);
                saveSolEd.LstEstatusEditor.push(data.d[3]);
                saveSolEd.LstEstatusEditor.push(data.d[4]);
                saveSolEd.LstEstatusEditor.push(data.d[5]);
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[2].CveEstatusEd + '">' + data.d[2].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[3].CveEstatusEd + '">' + data.d[3].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[4].CveEstatusEd + '">' + data.d[4].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[5].CveEstatusEd + '">' + data.d[5].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 1);
                break;
            case 5:
                saveSolEd.IndexEstatus = 2;
                saveSolEd.LstEstatusEditor.push(data.d[2]);
                saveSolEd.LstEstatusEditor.push(data.d[3]);
                saveSolEd.LstEstatusEditor.push(data.d[4]);
                saveSolEd.LstEstatusEditor.push(data.d[5]);
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[2].CveEstatusEd + '">' + data.d[2].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[3].CveEstatusEd + '">' + data.d[3].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[4].CveEstatusEd + '">' + data.d[4].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[5].CveEstatusEd + '">' + data.d[5].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 2);
                break;
            case 6:
                saveSolEd.IndexEstatus = 1;
                saveSolEd.LstEstatusEditor.push(data.d[3]);
                saveSolEd.LstEstatusEditor.push(data.d[5]);
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[3].CveEstatusEd + '">' + data.d[3].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[5].CveEstatusEd + '">' + data.d[5].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 1);
                break;
            default:
                saveSolEd.IndexEstatus = 0;
                saveSolEd.LstEstatusEditor.push(data.d[1]);
                saveSolEd.LstEstatusEditor.push(data.d[2]);
                saveSolEd.LstEstatusEditor.push(data.d[3]);
                saveSolEd.LstEstatusEditor.push(data.d[4]);
                saveSolEd.LstEstatusEditor.push(data.d[5]);
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[2].CveEstatusEd + '">' + data.d[1].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[2].CveEstatusEd + '">' + data.d[2].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[3].CveEstatusEd + '">' + data.d[3].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[4].CveEstatusEd + '">' + data.d[4].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).append('<option value="' + data.d[5].CveEstatusEd + '">' + data.d[5].Descripcion + '</option>');
                $("#cmbdivContenido2" + theIndex).prop("selectedIndex", 0);
                $("#cmbdivContenido2" + theIndex).attr("disabled", true);
                break;
        }
    }
    finally {
        $('div.modal').hide();
    }
}

function validaGuardar() {
    if ($("#cmbRealizador").val() < 1) {
        alertModal("Falta seleccionar el realizador.");
        return false;
    }
    if ($("#cmbSala").val() < 1) {
        alertModal("Falta seleccionar la sala.");
        return false;
    }
    if ($("#dtFechaIni").datetimepicker("getDate") > $("#dtFechaFin").datetimepicker("getDate")) {
        alertModal("La fecha final no puede ser menor a la fecha inicial.");
        return false;
    }

    return true;
}

function btnSavePart1_click() {
    try {
        $('div.modal').show();
        if (validaGuardar()) {
            var saveSARE = new THE_SalaRealizador();

            saveSARE.CveCentroEdicion = new TDI_CentroEdicion($("#cmbSala").val(), " ", " ");

            saveSARE.CveEmpleado = new TDI_EMPL();
            saveSARE.CveEmpleado.EmpleadoLlavePrimaria = $("#cmbRealizador").val();

            saveSARE.CveFechaInicio = $("#dtFechaIni").datetimepicker("getDate");
            saveSARE.FechaFin = $("#dtFechaFin").datetimepicker("getDate");

            saveSARE.CvePrograma = new TDI_Programa();
            saveSARE.CvePrograma.CvePrograma = $("#cmbPrograma").val();
            saveSARE.FechaCreacion = new Date();
            saveSARE.Usuario = sessionStorage.userName;

            executeRequest(wsMtdSaveRegistroReal, "{ 'oSalaRealizador': " + JSON.stringify(saveSARE) + " }", successSaveSalaReal, myError);
        }
        else
            $('div.modal').hide();
    }
    catch (ex) { $('div.modal').hide(); }
}

var successSaveSalaReal = function (data, status) {
    $('div.modal').hide();
    alertModal("Se han guardado correctamente los datos.");
    btnUpdate_click();
}

function searchAddNota() {
    try {
        $('div.modal').show();
        arrayAddNota = undefined;
        executeRequest(wsMtdGetFmtoCompraEd, "{ 'CveOt': '" + $("#txtAddNota").val() + "', 'CveProg': " + $("#cmbPrgAddNota").val() + ", 'Fecha': " + JSON.stringify($("#dtAddNota").datetimepicker('getDate')) + " }", successGetFmtoCompraEd, myError);    
    }
    catch (ex) { $('div.modal').hide(); }
}

var successGetFmtoCompraEd = function (data, status) {
    try {
        $('div.modal').show();
        var Tabla = "";
        var Arreglo = new Array();
        arrayAddNota = data.d;

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tb_divContenido3' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'></th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>T&iacute;tulo</th>";
        Tabla += "<th class='divTitlesMonitorRecEdicion'>Formato</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divContenido3").html("").html(Tabla);

        $.each(data.d, function (index, value) {
            Arreglo[index] = new Array(
                "<input type='checkbox' data-val='" + index + "' />",
                value.CveOT.Titulo,
                value.CveFormato.Descripcion
            );
        });

        oTable = $('#tb_divContenido3').dataTable({
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentMonitorRecEdicion varTextAlignCenter');
                    $('td:eq(1)', nRow).addClass('divContentMonitorRecEdicion');
                    $('td:eq(2)', nRow).addClass('divContentMonitorRecEdicion');
                    return nRow;
                },
            "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
            "sScrollY": '270px',
            "iDisplayLength": 10000,
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
                "sLoadingRecords": "Por favor espere - cargando...",
                "sSearch": "Buscar: ",
                "oPaginate": {
                    "sFirst": "",
                    "sPrevious": "",
                    "sNext": "",
                    "sLast": ""
                }
            }
        });

        $('#tb_divContenido3_length').css("display", "none");
    }
    finally {
        $('div.modal').hide();
    }
}

//alert($(check).attr('data-val'));

function saveAddNota() {
    $('div.modal').show();

    try {
        if ($("#divContenido3 input:checkbox[checked=checked]").length > 0) {
            var listaCompraOT = new Array();
            var fmtoCompra;
            var tmpCompraOT;
            $.each($("#divContenido3 input:checkbox[checked=checked]"), function (index, check) {
                fmtoCompra = arrayAddNota[$(check).attr('data-val')];
                fmtoCompra.FechaCompra = parseJSONToDate(fmtoCompra.FechaCompra);
                fmtoCompra.FechaCreacion = parseJSONToDate(fmtoCompra.FechaCreacion);
                fmtoCompra.CveOT.FechaEvento = parseJSONToDate(fmtoCompra.CveOT.FechaEvento);
                //                fmtoCompra.CveOT.FechaAgenda = parseJSONToDate(fmtoCompra.CveOT.FechaAgenda);
                //fmtoCompra.CveOT.FechaEntregaEspectaculos = parseJSONToDate(fmtoCompra.CveOT.FechaEntregaEspectaculos);
                fmtoCompra.CvePrograma.FechaFin = parseJSONToDate(fmtoCompra.CvePrograma.FechaFin);
                fmtoCompra.CvePrograma.FechaInicio = parseJSONToDate(fmtoCompra.CvePrograma.FechaInicio);


                tmpCompraOT = new CompraOT();

                tmpCompraOT.CveOrdenTrabajo = fmtoCompra.CveOT;
                tmpCompraOT.CveOrdenTrabajo.CveSeccion = new TDI_Seccion();
                tmpCompraOT.CveOrdenTrabajo.CveSeccion = fmtoCompra.CveOT.CveSeccion;

                tmpCompraOT.CveProgramaEmpleado = new TDI_ProgramaEmpleado();
                tmpCompraOT.CveProgramaEmpleado.CveEmpleado = new TDI_EMPL();
                tmpCompraOT.CveProgramaEmpleado.CveEmpleado.EmpleadoLlavePrimaria = sessionStorage.numUsuario;
                tmpCompraOT.CveProgramaEmpleado.CvePrograma = new TDI_Programa();
                tmpCompraOT.CveProgramaEmpleado.CvePrograma.CvePrograma = $("#cboProgramaPart2").val();
                tmpCompraOT.CveSeccionFormato = new TDI_SeccionFormato();
                tmpCompraOT.CveSeccionFormato.CveFormato = fmtoCompra.CveFormato;
                tmpCompraOT.CveSeccionFormato.CveSeccion = new TDI_Seccion();
                tmpCompraOT.CveSeccionFormato.CveSeccion.CveSeccion = sessionStorage.UserSeccion;
                tmpCompraOT.fechaCompra = $("#dtFechaPart2").datepicker('getDate');
                tmpCompraOT.SeEnviaINEWS = true;

                listaCompraOT.push(tmpCompraOT);
                executeRequest(wsMtdCompraOT, "{ 'listCompra': " + JSON.stringify(listaCompraOT) + ", 'nombreUsuario': '" + sessionStorage.userName + "', 'Tran':" + JSON.stringify(GenerateTransac()) + " }", successCompraOT, myError);
            });
        }
        else {
            alertModal("Debe seleccionar al menos un registro.");
            $('div.modal').hide();
        }
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successCompraOT = function (data, status) {
    alertModal("La Compra de las OT's y su envio a iNEWs se ha realizado con éxito");
    $('div.modal').hide();
}

function addNotas_click() {
    $("#divAddNotas").dialog('open');
}

function ValidaCampos() {
    var resp = true;
    var msg = "";

    if ($("#txtNomOtsMulNot").val() == undefined || $.trim($("#txtNomOtsMulNot").val()) == "") {
        msg += "* Debe llenar el campo OT's. <BR />";
        resp = false;
    }
    if ($("#cmbProgramaMulNot").val() <= 0) {
        msg += "* Debe seleccionar un programa. <BR />";
        resp = false;
    }

    if ($.trim(msg) != "")
        alertModal(msg);

    return resp;
}

function btnSaveMulNot_click() {
    try {
        $('div.modal').show();
        if (ValidaCampos()) {
            var otsdata = "";
            var ots = ($("#txtNomOtsMulNot").val()).split(",");

            $.each(ots, function (index, value) {
                otsdata += ($.trim(value)).toUpperCase() + ",";
            });

            executeRequest(wsMtdGetOTCvec, "{ 'CvecOts': '" + otsdata + "' }", successGetOTCvec, myError);
        }
        else
            $('div.modal').hide();
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetOTCvec = function (data, status) {
    try {
        $('div.modal').show();
        var saves = new Array();
        fail = "";
        var ots = ($("#txtNomOtsMulNot").val()).split(",");
        var exist;
        var tmp;

        $.each(ots, function (index, value) {
            exist = false;
            $.each(data.d, function (index, ot) {
                if (($.trim(value)).toUpperCase() == ($.trim(ot.ClaveOrdenTrabajo)).toUpperCase()) {
                    exist = true;
                    tmp = new THE_SolicitudEditor();
                    tmp.CveCentroEdicion = null;
                    tmp.CveEmpleado = null;
                    tmp.CveEstatusEditor = new TDI_EstatusEditor();
                    tmp.CveEstatusEditor.CveEstatusEd = 1;
                    ot.FechaEvento = parseJSONToDate(ot.FechaEvento);
                    alertModal(JSON.stringify(ot, null, 2));
                    return;
                    tmp.CveOrdenTrabajo = ot;
                    tmp.CvePrograma = new TDI_Programa();
                    tmp.CvePrograma.CvePrograma = $("#cmbProgramaMulNot").val();
                    tmp.Duracion = "0";
                    tmp.DuracionReal = "0";
                    tmp.DurMuestra = "0";
                    tmp.FechaAire = $("#dtFechaMulNot").datepicker('getDate');
                    tmp.FechaCreacion = new Date();
                    tmp.FechaFin = $("#dtFechaMulNot").datepicker('getDate');
                    tmp.FechaInicio = $("#dtFechaMulNot").datepicker('getDate');
                    tmp.Usuario = sessionStorage.numUsuario;
                    saves.push(tmp);
                }
            });
            if (exist == false) {
                fail += ($.trim(value)).toUpperCase() + ",";
            }
        });

        alert(JSON.stringify(saves));
        executeRequest(wsMtdInsLstSolEd, "{ 'LstSolicitudEditor': " + JSON.stringify(saves) + " }", successInsLstSolEd, myError);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successInsLstSolEd = function (data, status) {
    if (fail != "")
        alert("Error al guardar estos registros: " + fail);
    else
        alertModal("Se guardaron correctamente las notas.");

    $('div.modal').hide();
}