var BanderaComprar;
var BanderaGuardar;

var initParams;
var availableReps;
var actionType;
var secciones;
var Locales;
var numProp;
var Ob;
var Programas;
var SeccionCarrito;
var Formato;

window.onload = function () { initialize(); };

function initialize() {

    initParams = getUrlVars();
    BanderaComprar = 0;
    BanderaGuardar = 0;
    $("#EstatusCompara").css("display", "none");
    initializePage();
}

$(function () {
    $('#MainContent_txtFechaCarrito').datepicker();
    $('#MainContent_txtFechaCarrito').datepicker("setDate", new Date(), dateFormat = "dd M yy");
    $('#txtFechaAg').readOnly = true;

    $("#form1").submit(function () {
        return ejecutaAccion();
    });
});

function initializePage() {
    obtenerSecciones();
    ObtenerLocales();
    if ($('option:selected', '#cmbLocales').val() != 36) {
        $("#rowSeccion").hide();
        $("#rowTipoNota").hide();
    } else {
        $("#rowSeccion").show();
        $("#rowTipoNota").show();
    }
    numProp = getQuerystring('numProp');
    if (numProp != '') {
        $('#txtFechaAg').datepicker();
        $('#txtFechaAg').datepicker("setDate", new Date(), dateFormat = "dd M yy");
        ObtenerDatosPantallaPropuesta(numProp);
        $('#LblNoProp').append("");
        $('#LblNoProp').append(numProp);
        BanderaGuardar = 1;
    }
    else {
        $('#txtFechaAg').datepicker({ minDate: new Date() });
        $('#txtFechaAg').datepicker("setDate", new Date(), dateFormat = "dd M yy");
        $("#MainContent_cvePropuesta").val('0')
    }
    $("#MainContent_btnUpdateEquipo").click();
}

function setFilters() {
    $("#MainContent_hiddLocl").val($("#cmbLocales").val());
}

function ObtenerDatosPantallaPropuesta(numpro) {
    data = "{ 'NumeroOT':" + numpro + "}";
    executeSyncRequest(wsMtdObtieneDatProp, data, successObtenerDatosPantalla, myError);
}

function obtenerSecciones() {
    executeSyncRequest(wsMtdObtenerSecc, "{}", successSecciones, myError);
}

function loadNoteTypes(seccionId) {
    data = "{ 'idSeccion':" + seccionId + "}";
    executeSyncRequest(wsMtdObtTiposNotaBySecc, data, successTipoNota, myError);
}

function ObtenerLocales()
{
    getLocales(successLocales, myError);
}

var successSecciones = function (data, status) {
    secciones = data.d;
    $("#cmbSeccion").empty();
    $.each(secciones, function (index, seccion) {
        $("#cmbSeccion").append('<option value="' + seccion.CveSeccion + '">' + seccion.NombreSeccion + '</option>');
            
        if (index == 0)
            loadNoteTypes($("#cmbSeccion").val());
    });
}

var successTipoNota = function (data, status) {
    var tiposNota = data.d;
    $("#cmbTipoNota").empty();
    $("#cmbTipoNota").append('<option value="">== SELECCIONE ==</option>');
    $.each(tiposNota, function (index, nota) {
        $("#cmbTipoNota").append('<option value="' + nota.TinoLlPr + '">' + nota.TnoDesc + '</option>');
    });
}

var successGuardaProp = function (data, status) {
    var resultado = data.d;
    if (resultado.MensajeError == "") {
        $("#MainContent_cvePropuesta").val(resultado.oPropuesta.CvePropuesta);
        $('#LblNoProp').append("");
        $('#LblNoProp').append(resultado.oPropuesta.CvePropuesta);
       
        alertModal('La propuesta se guardo satisfactoriamente: ' + resultado.oPropuesta.CvePropuesta.toString());
    }
    else 
        alertModal('Ocurrio un problema al generar la propuesta: ' + resultado.MensajeError);
}

var successActualizaProp = function (data, status) {
    var resultado = data.d;
    if (resultado.MensajeError == "") {
        alertModal('La propuesta se actualizo satisfactoriamente ' );
    }
    else
        alertModal('Ocurrio un problema al actualizar la propuesta: ' + resultado.MensajeError);
}

var successLocales = function (data, status) {

    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    var localSeleccionar = getLocalSeleccionar();
    if (localSeleccionar != 36) {
        $("#rowSeccion").attr("style", "display:none");
        $("#rowTipoNota").hide();
    }
    $("#cmbLocales").val(localSeleccionar);
    loadNoteTypes(8);
}

var successObtenerDatosPantalla = function (data, status) {
    Ob = data.d;

    $("#MainContent_cvePropuesta").val(Ob.Propuestas[0]["CvePropuesta"]);
    $("#txtTitulo").val(Ob.Propuestas[0]["Titulo"]);
    $("#txtObjetivo").val(Ob.Propuestas[0]["Objetivo"]);
    $("#txtTema").val(Ob.Propuestas[0]["Tema"]);
    $('#txtFechaAg').datepicker("setDate", parseJSONToDate(Ob.Propuestas[0]["FechaAgenda"]));
    $("#txtReporteros").val(Ob.Propuestas[0]["CveEmpleado"].EmpleadoNombre);

    var numEmpleado;
    var LlavePrimariaEmpleado;
    numEmpleado = Ob.Propuestas[0]["CveEmpleado"].EmpleadoNumero
    LlavePrimariaEmpleado = Ob.Propuestas[0]["CveEmpleado"].EmpleadoLlavePrimaria;

    $("#txtReporteros").attr('data-val', LlavePrimariaEmpleado);
    $('#MainContent_txtReporterosID').val(LlavePrimariaEmpleado);
    $('#imgFotoRep').attr('src', imgDataUrl + numEmpleado + '.jpg');
    $("#cmbSeccion").val(Ob.Propuestas[0]["CveSeccion"].CveSeccion);
    loadNoteTypes($("#cmbSeccion").val());
    $("#cmbTipoNota").val(Ob.Propuestas[0]["CveTipoNota"].CveTipoNota);
    $("#cmbLocales").val(Ob.Propuestas[0]["Local"].LocalLlave);

    if ($('option:selected', '#cmbLocales').val() != 36) {
        $("#rowSeccion").hide();
        $("#rowTipoNota").hide();
    } else {
        $("#rowSeccion").show();
        $("#rowTipoNota").show();
    }
    BanderaGuardar = 1;
}

function myError(request, status, error) {
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Propuesta");
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + status.statusText);
}

function seccionChange() {
    loadNoteTypes($("#cmbSeccion").val());
}
function localChange() {
    if ($('option:selected', '#cmbLocales').val() != 36) {
        $("#rowSeccion").hide();
        $("#rowTipoNota").hide();
    } else {
        $("#rowSeccion").show();
        $("#rowTipoNota").show();
    }
    $("#MainContent_btnUpdateEquipo").click();
}

function cleanForm() {
    $("#MainContent_cvePropuesta").val(0);
    $("#txtTitulo").val('');
    $("#txtObjetivo").val('');
    $("#txtTema").val('');
    $('#txtFechaAg').datepicker("setDate", new Date());
    $("#LblNoProp").empty();
    this.obtenerSecciones();
    resetVal();
    $("#txtReporteros").val('');

    $('#txtFechaAg').datepicker("setDate", new Date(), dateFormat = "dd M yy");
    $('#imgFotoRep').attr('src', '.jpg');

     BanderaComprar=0;
     BanderaGuardar=0;
}

function resetVal() {
    $("#txtReporteros").attr('data-val', '');
 }

 function validarCamposPropuesta() {
    var mensaje = '';
    var resultado = true;

    if ($("#txtReporteros").val() == "")
        mensaje += '* Debe seleccionar un reportero.<BR />';
    if (jQuery.trim($("#txtTitulo").val()) == '')
        mensaje += '* El campo Título no puede ser nulo.<BR />';
    if (jQuery.trim($("#txtObjetivo").val()) == '')
        mensaje += '* El campo Objetivo no puede ser nulo.<BR />';
    if (jQuery.trim($("#txtReporteros").val()) != undefined && $("#txtReporteros").attr('data-val') == '')
        mensaje += '* El reportero seleccionado no es valido.<BR />';
    if ($("#cmbLocales").val() == 36 && $("#cmbTipoNota").val() <= 0)
        mensaje += '* Debe seleccionar un Tipo de Nota.<BR />';
    if (mensaje != '') {
        alertModal(mensaje);
        resultado = false;
    }

    return resultado;
}

function guardaPropuestaWS() {
    if (ValidaPermisosGuardaDuplica(sessionStorage.userPuestos) == false) {
        alertModal("No tiene permisos para realizar esta operación");
        return false;
    }


     var diasdif = compareDates($("#txtFechaAg").datepicker("getDate"), new Date());
     if (diasdif > 0) {
         alertModal("La Fecha de Agenda no puede ser menor al dia de hoy.")
         return false;
     }

     var claveEmpl = -1;
     /*Se crea el objeto que almacena la propuesta*/
     tipoNota = new TDI_TipoNota(1, 'Nota', 'abre', '');
     tipoFormato = new TDI_Formato(1);
     oPropuesta = new TDI_Propuesta();
     oAgendaSemanal = new THE_AgendaSemanal();
     oAgendaSemanal.Titulo = '';
     oAgendaSemanal.NumeroOTPropuesta = 0;
     oSeccion = new TDI_Seccion();
     oTipoNota = new TDI_TipoNota();
     if ($("#cmbLocales").val() == 36) {
         oSeccion.CveSeccion = $("#cmbSeccion").val();
         oSeccion.NombreSeccion = $('#cmbSeccion option:selected').html();
         oTipoNota.CveTipoNota = $("#cmbTipoNota").val();
         oTipoNota.DescripcionTipoNota = $('#cmbTipoNota option:selected').html();
     }
     else {
         oSeccion.CveSeccion = 114;
         oSeccion.NombreSeccion = 'NOTICIAS LOCALES';
         oTipoNota.CveTipoNota = 1;
         oTipoNota.DescripcionTipoNota = 'PRINCIPAL';
     }

     oReportero = new TDI_EMPL();
     oReportero.EmpleadoLlavePrimaria = $("#txtReporteros").attr('data-val');
     oReportero.EmpleadoNombre = $("#txtReporteros").val();

     oPropuesta.Titulo = $("#txtTitulo").val();
     oPropuesta.Objetivo = $("#txtObjetivo").val();
     oPropuesta.Descripcion = $("#txtObjetivo").val();
     oPropuesta.CveSeccion = oSeccion;
     

     oPuesto = new TDI_Puestos();
     oPuesto.PuestoLlavePrimaria = 1;
     oPropuesta.CvePuesto = oPuesto;

     oPropuesta.Tema = $("#txtTema").val();
     oPropuesta.CveSeccion = oSeccion;
     oPropuesta.CveTipoNota = oTipoNota;
     
     oPropuesta.Fecha = $("#txtFechaAg").datepicker("getDate");
     oPropuesta.CveEmpleado = oReportero;
     oPropuesta.Usuario = sessionStorage.userName;

     oLocal = new TDI_Local();
     oLocal.LocalLlave = $("#cmbLocales").val();
     oLocal.LocalDescripcion = $('#cmbLocales option:selected').html();

     oPropuesta.Local = oLocal;

     oEmpresa = new TDI_Empresa();
     if (oLocal.LocalLlave == 36) oEmpresa.CveEmpresa = 1; else oEmpresa.CveEmpresa = 5;

     oPropuesta.Empresa = oEmpresa;

     oAgendaSemanal.CveAgendaSemanal = 0;





     oAgendaSemanal.FechaInicio = $("#txtFechaAg").datepicker("getDate");
     
     oAgendaSemanal.Origen = 'P';
     
     oAgendaSemanal.FechaCreacion = new Date();
     
     oAgendaSemanal.CveSeccion = oSeccion;
     oAgendaSemanal.CveTipoNota = oTipoNota;
     oAgendaSemanal.Estatus = 'A';

     /*Se obtiene la clave del empleado asignado a la seccion*/
     for (x in secciones) 
         if (secciones[x].CveSeccion == $("#cmbSeccion").val())
             claveEmpl = secciones[x].EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;

     if (claveEmpl == -1) {
         alertModal('Ocurrio un problema al obtener la información del empleado asignado a la sección');
         return false;
     }

     numProp = $("#MainContent_cvePropuesta").val();     
     
     /*Se determina en base a numero de propuesta si es una actualizacion o nueva propuesta*/
     if (BanderaGuardar == 0) {
         BanderaGuardar = 1
         datos = new AlmacenaDatosPropuesta(claveEmpl, oPropuesta, oAgendaSemanal, true);
         executeSyncRequest(wsMtdAlmacenaDatProp, JSON.stringify(datos, null, 2), successGuardaProp, myError);
     } else { 
         if (numProp != '0') {
         oPropuesta.CvePropuesta = numProp;
         /* El valor false indica que no es una nueva propuesta por lo que la toma como una actualizacio */
         datos = new AlmacenaDatosPropuesta(claveEmpl, oPropuesta, oAgendaSemanal, false);
         executeSyncRequest(wsMtdAlmacenaDatProp, JSON.stringify(datos, null, 2), successActualizaProp, myError);
            }
            else return false;
     }
 }

 function setType(action) {
     this.actionType = action;
 }

 function ejecutaAccion() {
     if (actionType == 'guardar') {
         if ($('option:selected', '#cmbLocales').val() == 36) {
             if (ValidaMultiplesSecciones() == false) {

                 var valida = (sessionStorage.UserSeccion == $('option:selected', '#cmbSeccion').val());

                 if (!valida) {
                     alertModal("No tiene permisos para realizar esta operación. La propuesta pertenece a una sección en la cual no tiene privilegios");
                     return false;
                 }
             }
         }

         if (ValidaPermisosGuardaDuplica(sessionStorage.userPuestos) == false) {
             alertModal("No tiene permisos para realizar esta operación");
             return false;
         }

         if (this.validarCamposPropuesta() == true) {
             guardaPropuestaWS();
             return false;
         }
         else
             return false;
     }
     else if (actionType == 'comprar') {
     }
 }


 /*Obtiene la clave de la propuesta por querystring*/

 function getQuerystring(key, default_) {
     if (default_ == null) default_ = "";
     key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
     var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
     var qs = regex.exec(window.location.href);
     if (qs == null)
         return default_;
     else
         return qs[1];
 }

 //Carrito
 $.fx.speeds._default = 1000;
 $(function () {
     $('#Carrito').dialog({
         autoOpen: false,
         draggable: true,
         title: "Compra Propuesta",
         height: 350,
         width: 350,
         open: function (type, data) {
             $(this).parent().appendTo("form");
         }
     });
 });


 function ObtenerConsultaProgramaEmpleado() {
     data = "{ 'ESIN_LLAV_PR':0,'EMPL_LLAV_PR':" + sessionStorage.numUsuario + "}";
         executeSyncRequest(wsMtdoConsultaProgramaEmpleado, data, successObtenerConsultaProgramaEmpleado, myError);
 }

 var successObtenerConsultaProgramaEmpleado = function (data, status) {
     Programas = data.d;
     $("#MainContent_cmbPrograma").empty();
     $("#MainContent_cmbPrograma").append('<option value="">== SELECCIONE ==</option>');
     $.each(Programas, function (index, prog) {
         $("#MainContent_cmbPrograma").append('<option value="' + prog.CvePrograma + '">' + prog.NombrePrograma + '</option>');

     });
 }

 function ObtenerSeccionFormatoXIDEmpleado() {
     data = "{ 'cveEmpleado':" + $("#MainContent_txtReporterosID").val() + "}";
     executeSyncRequest(wsMtdoObtenerSeccionFormatoXIDEmpleado, data, successObtenerSeccionFormatoXIDEmpleado, myError);
 }

 var successObtenerSeccionFormatoXIDEmpleado = function (data, status) {
     SeccionCarrito = data.d;
     $("#MainContent_cmbFormato").empty();
     $("#MainContent_cmbFormato").append('<option value="">== SELECCIONE ==</option>');
     $.each(SeccionCarrito, function (index, SecCarrito) {
         $("#MainContent_cmbFormato").append('<option value="' + SecCarrito.CveFormato["CveFormato"] + '">' + SecCarrito.CveFormato["Descripcion"] + '</option>');
     });
 }

 function Prompra() 
 {
     if ($("#MainContent_cvePropuesta").val() <= 0) {
         alertModal('Necesita primero crear ó actualizar la Propuesta, para poder Comprar');
         return false;
     }
     /*Se manda a abrir el dialogo de la comprar de propuesta*/

     $("#txtProp").val($("#MainContent_cvePropuesta").val() + ' - ' + $("#txtTitulo").val());
     $("#Carrito").dialog("open");

     ObtenerSeccionFormatoXIDEmpleado();
     ObtenerConsultaProgramaEmpleado();
    return false;
}

function SeleccionFormato() {
    $("#MainContent_cmbFormatoHidden").val($("#MainContent_cmbFormato").val());
}

function SeleccionPrograma() {
    $("#MainContent_cmbProgramaHidden").val($("#MainContent_cmbPrograma").val());
}

function CompraExitosa(OT) {
    parent.openModal("OT/OT.aspx?numOT=" + OT, -1, -1, 'Actualizaci&oacute;n de OT:' + OT);
    parent.closeWindow(initParams['windowId']);
}

function Detonador() {    
    if (BanderaComprar == 0) {
        BanderaComprar = 1;
        $("#EstatusCompara").css("display","block");
        if ($("#MainContent_cmbPrograma").val() != "" && $("#MainContent_cmbFormato").val() != "")
            PageMethods.compraPropuesta($("#MainContent_cmbPrograma").val(), $("#MainContent_cmbFormato").val(), $("#MainContent_txtReporterosID").val(), $("#MainContent_cvePropuesta").val(), $("#MainContent_txtFechaCarrito").val(), GenerateTransac(), successCompra, Error);
        else
            alertModal("Todos los Campos son Requeridos.");
    }
}

function successCompra(result, userContext, myError) {
    if (result != "0") {
        var numOT;
        var strOT;
        numOT = result.toString().split("|")[0]
        strOT = result.toString().split("|")[1]
        parent.openModal("OT/OT.aspx?numOT=" + numOT, -1, -1, 'Actualizaci&oacute;n de OT:' +strOT.toString());
        parent.closeWindow(initParams['windowId']);
    }else   alertModal(result);
}

///////////////////Mascara para Fechas//////////////////////////////////////
var patron = new Array(2, 2, 4) ///fecha
function mascara(d, sep, pat, nums) {
    if (d.valant != d.value) {
        val = d.value
        largo = val.length
        val = val.split(sep)
        val2 = ''
        for (r = 0; r < val.length; r++) {
            val2 += val[r]
        }
        if (nums) {
            for (z = 0; z < val2.length; z++) {
                if (isNaN(val2.charAt(z))) {
                    letra = new RegExp(val2.charAt(z), "g")
                    val2 = val2.replace(letra, "")
                }
            }
        }
        val = ''
        val3 = new Array()
        for (s = 0; s < pat.length; s++) {
            val3[s] = val2.substring(0, pat[s])
            val2 = val2.substr(pat[s])

        }

        for (q = 0; q < val3.length; q++) {
            if (q == 0) {
                val = val3[q]
                
            }
            else {
                if (val3[q] != "") {
                    val += sep + val3[q]
                
                }
            }
        }

        if (val != "") {
            var dia = val.split("/")[0];
            var mes = "";
            var year = "";

            if (val.length > 2) mes = val.split("/")[1];
            if (val.length > 6) year = val.split("/")[2];

            

            if (dia.length == 2) {
                if (dia > 31 || dia < 1) {
                    alertModal("El dia es incorrecto.")
                    return false
                }
            }
            
                if (mes.length == 2) {
                    if (mes > 12 || mes < 1) {
                        alertModal("El mes es incorrecto.")
                        return false
                    }
                }
            
            
                if (year.length == 4) {
                    if (year < 1900 || year > 2100) {
                        alertModal("El Año es incorrecto.")
                        return false
                    }
                }
            
        }

        d.value = val
        d.valant = val
    }
}

function loadImgError(control) {
    control.src = '../../Images/msnOnline.png';
}

function applyEvents() {
//    $("#txtReporteros").val('');
//    $("#txtReporteros").attr('data-val', '-1');
//    $('#MainContent_txtReporterosID').val('');
//    $('#imgFotoRep').attr('src', '../../Images/msnOnline.png');

    $("#txtReporteros").autocomplete({
        minLength: 0,
        source: availableReps,
        focus: function( event, ui ) {
            $("#txtReporteros").val(ui.item.label);
            $("#txtReporteros").attr('data-val', ui.item.value);
			return false;
		},
        select: function (event, ui) {
            $("#txtReporteros").val(ui.item.label);
            $("#txtReporteros").attr('data-val', ui.item.value);

            $('#MainContent_txtReporterosID').val(ui.item.value);
            $('#imgFotoRep').attr('src', imgDataUrl + ui.item.icon + '.jpg');
            return false;
        }
    });
}
