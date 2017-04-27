var otableRealizador = new Object();
var autocomplete;
var rowToDel = new Object();
$(document).ready(function () {
    $("#dtFecha").datepicker({});
    $("#dtFecha").datepicker('setDate', new Date());

    var paramsPrograms = "{'EsFiaNoticias':" + 1 + "}";

    executeRequest(wsMtdconsultaPrgEmpl, "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}", successObtenerProgramas, errorObtenerProgramas);
    //executeRequest(wsMtdConsultaProgramasEsFiaNoticias, paramsPrograms, successObtenerProgramas, errorObtenerProgramas);

    $("#btnconsultar").die().live("click", function () {
        ObtenerSinRealizador();
    });
    $("select.cboRealizador").die().live("change", function () {

        var value = $(this).val();
        var datos = $(this).attr("data");

        $(this).removeClass("saving");

        if (parseInt(value) != -1) {
            $(this).addClass("saving");
        }

    });
    $("#btnSaveRealizadores").die().live("click", function () {
        var datos = $(this).attr("data");
        var LstSinReali = new Array();
        var existenOption = $("#cbRealizadores option");

        if (existenOption == undefined) { return false; }
        $("#cbRealizadores option").each(function () {
            var oSinrealizador = new THE_EQAI();
            var numEmpl = $(this).val();
            var NombreEmpl = $(this).text();

            oSinrealizador.Esin_llav_pr = new TDI_Programa();
            oSinrealizador.Esin_llav_pr.CvePrograma = datos.split("|")[0];

            oSinrealizador.Fmto_llav_pr = new TDI_Formato();
            oSinrealizador.Fmto_llav_pr.CveFormato = datos.split("|")[1];

            oSinrealizador.Otra_llav_pr = new THE_OrdenTrabajo();
            oSinrealizador.Otra_llav_pr.CveOrdenTrabajo = datos.split("|")[2];
            oSinrealizador.Otra_llav_pr.ClaveOrdenTrabajo = datos.split("|")[3];

            oSinrealizador.Reai_fhtr = parseJSONToDate(datos.split("|")[4]);

            oSinrealizador.Secc_llav_pr = new TDI_Seccion();
            oSinrealizador.Secc_llav_pr.CveSeccion = datos.split("|")[5];

            oSinrealizador.Empl_llav_pr = new TDI_EMPL();
            oSinrealizador.Empl_llav_pr.EmpleadoLlavePrimaria = numEmpl;
            oSinrealizador.Empl_llav_pr.EmpleadoNombre = NombreEmpl;

            oSinrealizador.Ptos_llav_pr = new TDI_Puestos();
            oSinrealizador.Ptos_llav_pr.PuestoLlavePrimaria = 3;

            LstSinReali.push(oSinrealizador);

        });
        if (LstSinReali.length > 0) {
            var Params = "{'oSinRealizador':" + JSON.stringify(LstSinReali) + " }";

            executeRequest(wsMtdGuardarSinrealizador, Params, function (data) {
                if (data.d) {
                    alertModal("Se guardaron los registros correctamente");
                    $("#modalRealizadores").dialog('close');
                    otableRealizador.fnDeleteRow(rowToDel);
                } else {
                    alertModal("Error, intente guardar los registros nuevamente");
                    $("#modalRealizadores").dialog('close');
                }
            }, function () {
                alertModal("Error, intente guardar los registros nuevamente");
                $("#modalRealizadores").dialog('close');
            });
        } else {
            alertModal("No existen realizadores en la lista para ser guardados");
        }
    });
    $("#btnguardar").die().live("click", function (e) {
        $('div.modal').show();
        e.preventDefault();
        LstSinReali = new Array();
        var rowsToDelete = new Array();
        var LstSinReali = new Array();
        if ($("select.saving").length == 0) {
            alertModal("Debes seleccionar al menos un realizador.");
            $('div.modal').hide();
            return false;
        }
        $("select.saving").each(function () {
            rowsToDelete.push($(this).closest("tr").get(0));
            var datos = $(this).attr("data");
            var oSinrealizador = new THE_EQAI();
            var numEmpl = $(this).val();
            var NombreEmpl = $(this).find("option:selected").text();

            oSinrealizador.Esin_llav_pr = new TDI_Programa();
            oSinrealizador.Esin_llav_pr.CvePrograma = datos.split("|")[0];

            oSinrealizador.Fmto_llav_pr = new TDI_Formato();
            oSinrealizador.Fmto_llav_pr.CveFormato = datos.split("|")[1];

            oSinrealizador.Otra_llav_pr = new THE_OrdenTrabajo();
            oSinrealizador.Otra_llav_pr.CveOrdenTrabajo = datos.split("|")[2];
            oSinrealizador.Otra_llav_pr.ClaveOrdenTrabajo = datos.split("|")[3];

            oSinrealizador.Reai_fhtr = parseJSONToDate(datos.split("|")[4]);

            oSinrealizador.Secc_llav_pr = new TDI_Seccion();
            oSinrealizador.Secc_llav_pr.CveSeccion = datos.split("|")[5];

            oSinrealizador.Empl_llav_pr = new TDI_EMPL();
            oSinrealizador.Empl_llav_pr.EmpleadoLlavePrimaria = numEmpl;
            oSinrealizador.Empl_llav_pr.EmpleadoNombre = NombreEmpl;

            oSinrealizador.Ptos_llav_pr = new TDI_Puestos();
            oSinrealizador.Ptos_llav_pr.PuestoLlavePrimaria = 3;

            LstSinReali.push(oSinrealizador);

        });

        var Params = "{'oSinRealizador':" + JSON.stringify(LstSinReali) + " }";
        
        executeRequest(wsMtdGuardarSinrealizador, Params, function (data) {
            if (data.d) {
                for (var j = 0; j < rowsToDelete.length; j++) {
                    otableRealizador.fnDeleteRow(rowsToDelete[j]);
                }
                alertModal("Se guardaron los registros correctamente");
            } else {
                alertModal("Error, intente guardar los registros nuevamente");
                borrarSelects();
            }
            $('div.modal').hide();
        }, function () {
            alertModal("Error, intente guardar los registros nuevamente");
            borrarSelects();
            $('div.modal').hide();
        });

    });

    $("#modalRealizadores").dialog({
        modal: true,
        autoOpen: false,
        height: 250,
        minWidth: 650,
        resizable: false,
        width: 650,
        minHeight: 250,
        open: function (type, data) {
            $("input[type=text][name=txtRealizador]").autocomplete({
                source: autocomplete,
                minLength: 1, /* le decimos que espere hasta que haya 2 caracteres escritos */
                select: productoSeleccionado, /* esta es la rutina que extrae la informacion del producto seleccionado */
                focus: productoFoco /* esta es la rutina que muestra del producto marcado */
            });
        },
        show: "fold",
        hide: "scale"
    });

    $("a.N").die().live("click", function (e) {
        e.preventDefault();
        var data = $(this).attr("data");
        rowToDel = new Object();
        rowToDel = $(this).closest("tr").get(0);
        var elements = "<span style=\" float:right;\"><button id=\"btnSaveRealizadores\" data='" + data + "' class='btnGuardarSinRealizador'></button></span>" +
        "<label>OT:</label><input type=\"text\" name=\"txtOT\" readonly='readonly' id=\"txtOT\" value='" + data.split("|")[2] + "'/><br />" +
        "<label>PROGRAMA:</label><input type=\"text\" name=\"txtProgram\" readonly='readonly' id=\"txtProgram\" value='" + data.split("|")[9] + "' /><br />" +
        "<label>TITULO:</label><input type=\"text\" name=\"txtTitu\" id=\"txtTitu\" readonly='readonly' value='" + data.split("|")[8] + "' /><br />" +
        "<label class='title varFloatLeft'>REALIZADOR:</label><input class='txtInputMaster varFloatLeft' type=\"text\" name=\"txtRealizador\" placeholder='Nombre realizador' id=\"txtRealizador\"/><button class='btnAgregarSinRealizador'></button> <button class='btnQuitarSinRealizador'></button><br />" +
        "<select id=\"cbRealizadores\" size=\"6\" style='width:600px;'></select>";
        $("#modalRealizadores").html("").html(elements);
        $("#modalRealizadores").dialog("open");
    });

    $(".btnAgregarSinRealizador").die().live("click", function () {
        var desc = $.trim($("input[type=text][name=txtRealizador]").val());
        var val = $("input[type=text][name=txtRealizador]").attr("property");
        var find = false; var find2 = false;
        if (desc == "") return false;
        for (var i = 0; i < autocomplete.length; i++) {

            if (desc.toString() == autocomplete[i].label.toString()) {
                find = true;
                break;
            }

        }
        if (find) {
            $("#cbRealizadores option").each(function () {
                if ($(this).val() == val.toString()) {
                    find2 = true;
                    return;
                }
            });
            if (!find2) {
                $("#cbRealizadores").append("<option value=" + val + ">" + desc + "</option>");
            }
        } else {
            alertModal("El nombre que desea agregar no existe en la lista de realizadores.");
        }
        $("input[type=text][name=txtRealizador]").val("");
        $("input[type=text][name=txtRealizador]").removeAttr("property");
    });
    $(".btnQuitarSinRealizador").die().live("click", function () {
        var elemtToDelete = $('#cbRealizadores option:selected');

        if (elemtToDelete != undefined) {
            elemtToDelete.remove();
        }
    });

});

// ocurre cada vez que se marca un elemento de la lista
function productoFoco(event, ui) {
   
    $("input[type=text][name=txtRealizador]").val(ui.item.label);
    event.preventDefault();
}

function productoSeleccionado(event, ui) {
    $("input[type=text][name=txtRealizador]").val(ui.item.label);
    $("input[type=text][name=txtRealizador]").attr("property", ui.item.value);
    event.preventDefault();
}
function borrarSelects() {
    $("select.cboRealizador").each(function () {
        $(this).removeClass("saving");
        $(this).find("option:first").attr("selected", true);
    });
}
function ObtenerSinRealizador() {
    var fecha = $("#dtFecha").val();
    var programa = $("#cmbPrograma").val();
    var paramsSinRealizador = "{'Fecha':" + JSON.stringify(fecha.toString()) + ", 'programa':" + programa + "}";
    $("div.modal").show();
    executeRequest(wsMtdObtenerSinRealizador, paramsSinRealizador, successObtenerSinRealizador, errorObtenerSinRealizador);
}

function successObtenerSinRealizador(data) {
    try {
        var screenHgt = getMaxFloatableHeigth() - 40;
        var datos = jQuery.parseJSON(data.d);
        var Tabla = "";
        var option = "";
        var Select = "";
        var dataSelect = "";
        var dataToSave;
        var fechaToJson;

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbRealizador' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th class='divTitlesSinRealizador'>OT</th>";
        Tabla += "<th class='divTitlesSinRealizador'>Prog</th>";
        Tabla += "<th class='divTitlesSinRealizador'>Fecha</th>";
        Tabla += "<th class='divTitlesSinRealizador'>T&iacute;tulo</th>";
        Tabla += "<th class='divTitlesSinRealizador'>Secci&oacute;n</th>";
        Tabla += "<th class='divTitlesSinRealizador'>Formato</th>";
        Tabla += "<th class='divTitlesSinRealizador'>Realizador</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyRealizador'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("div.contentSinRealizador").html("").html(Tabla);
        try {
            if (datos[0]["Lista_Realizadores"] != null) {
                autocomplete = new Array();
                $.each(datos[0]["Lista_Realizadores"], function (a, b) {
                    autocomplete[a] = { label: b["EmpleadoNombre"], value: b["EmpleadoLlavePrimaria"] };
                });
            }
        } catch (Error) { }
        var arrayRealiza = new Array();
        $.each(datos, function (i, v) {

            fechaToJson = new Date(parseInt(v["Reai_fhtr"].substr(6)));
            dataToSave = v["Esin_llav_pr"]["CvePrograma"] + "|" + //0
                             v["Fmto_llav_pr"]["CveFormato"] + "|" + //1
                             v["Otra_llav_pr"]["CveOrdenTrabajo"] + "|" + //2
                             v["Otra_llav_pr"]["ClaveOrdenTrabajo"] + "|" + //3
                             v["Reai_fhtr"] + "|" + //4
                             v["Secc_llav_pr"]["CveSeccion"] + "|" + //5
                             v["Empl_llav_pr"]["EmpleadoLlavePrimaria"] + "|" + //6
                             v["Empl_llav_pr"]["EmpleadoNombre"] + "|" + //7
                             v["Otra_llav_pr"]["Titulo"] + "|" + //8
                             v["Esin_llav_pr"]["NombrePrograma"]; //9
            dataSelect = (v["Lista_Realizadores"]);
            Select = "<select class='cboRealizador' data='" + dataToSave + "' id='" + i + "'>"; 

            if (i == 0) {
                $.each(dataSelect, function (ind, val) {
                    option += "<option  value='" + val["EmpleadoLlavePrimaria"] + "' >" + val["EmpleadoNombre"] + "</option>";
                });
            }
            Select += option + "</select><a class='N' data='" + dataToSave + "' style='cursor:pointer;' obj='" + v["Lista_Realizadores"] + "'>N</a>";

            arrayRealiza[i] = new Array(v["Otra_llav_pr"]["ClaveOrdenTrabajo"], v["Esin_llav_pr"]["NombrePrograma"], getFechaFormateada(fechaToJson), v["Otra_llav_pr"]["Titulo"], v["Secc_llav_pr"]["NombreSeccion"], v["Fmto_llav_pr"]["Descripcion"], Select);


        });

        otableRealizador=$('#tbRealizador').dataTable({
            "sScrollY": screenHgt.toString() + "px", 
            "fnRowCallback":
                function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                    $('td:eq(0)', nRow).addClass('divContentSinRealizador');
                    $('td:eq(1)', nRow).addClass('divContentSinRealizador');
                    $('td:eq(2)', nRow).addClass('divContentSinRealizador');
                    $('td:eq(3)', nRow).addClass('divContentSinRealizador');
                    $('td:eq(4)', nRow).addClass('divContentSinRealizador');
                    $('td:eq(5)', nRow).addClass('divContentSinRealizador');
                    $('td:eq(6)', nRow).addClass('divContentSinRealizador');

                    return nRow;
                },
            "fnDrawCallback":
			    function () {
			        this.css('width', '100%');
			    },
		    "aaData": arrayRealiza,
            "bPaginate": false,
            "bFilter": false,
            "bSearch": false,
            "bInfo": false,
            "oLanguage": {
                "sZeroRecords": "No se encontraron resultados"
            }
        });
    } catch (Error) { } finally { $("div.modal").hide(); }
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
function errorObtenerSinRealizador() {
    $("div.modal").hide();
    alertModal("Error");
}

function successObtenerProgramas(data) {
     
    var options="<option value='0'>==SELECCIONE==</option>";
    $.each(data.d, function (i, v) {
        options += "<option value='" + v.CvePrograma.CvePrograma + "'>" + v.CvePrograma.NombrePrograma + "</option>";
    });
    $("#cmbPrograma").html("").html(options);
    ObtenerSinRealizador();
}
function errorObtenerProgramas() {
    alertModal("Error al procesar solicitud");
}
