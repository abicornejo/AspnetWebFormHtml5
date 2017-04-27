var seccionLocl;
var initVars;
var secciones;
var idSeccion = '';
var vieneOtherPage = false;
var programas;
var lstProgramaEmpleado;
var locales;
var gblpathPage;
var oLstTipoNota;
var lstFormato;
var oLstReporteros;
var oLstCamara; 
var strListaOTValidas = "";
var GuardadoMasivo = false;
var oLstEditor;
var fabrica = '';
var arrReporteros;
var arrCamarografos;
var arrEditores;
var ContadorOT = 0;
var EVDT;
var gblMensaje = "";
var oAgendaSemanal;
var gblEmpresa = 1;
var rowActual;
var ActualizaOT = false;
var gblUltimaOT = 0;
var strListaCveOTValidas = "";
var arrOTS = new Array();
window.onload = function () { initFunction(); }
function initFunction() {
    initialize();
}
function initialize() {
    
    initVars = getUrlVars();
    gblpathPage = '/FiatubeHTML5/OT/CreaOTMultiple.aspx';

    $("#MainContent_dpFechaBusq").datepicker({ minDate: 0 });
    $('#MainContent_dpFechaBusq').datepicker("setDate", new Date());

    $("#btnAceptaNumOT").mouseover(function () {

    });
    $("#btnAceptaNumOT").mouseout(function () {

    });
    if (initVars["isFromMenu"] == 0) {
        vieneOtherPage = true;
    }

    $("#GridHeader").css('height', getMaxFloatableHeigth() - 90);

    $("#GridHeader").delegate(".btnNuevaOTNoBorder, .btnGuardarNoBorder", "mouseout", function () {
        $(this).attr('style', 'cursor: default;');
    });
    $("#GridHeader").delegate(".btnNuevaOTNoBorder, .btnGuardarNoBorder", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
    });
    $("#GridHeader").delegate(".btnNuevaOTNoBorder, .btnGuardarNoBorder", "click", function () {
        GuardadoMasivo = false;
        strListaOTValidas = "";
        gblMensaje = "";
        var sMensajePrin = "El proceso de guardado fue cancelado debido a que falta un dato requerido: \n";
        if (!ValidaCamposOT(Number(this.id.split('_')[1]))) {
            if (gblMensaje != "") {
                alertModal(sMensajePrin + gblMensaje);
            } else {
                alertModal(sMensajePrin);
            }

        } else {

            GuardaMasivo(Number(this.id.split('_')[1]));

        }
    });
    $(".btnGuardarNoBorder").click(function () {
        var hola = "";
    });
    if (arrOTS.length == 0) {
        $("#txtNumOT").val(10);
        $("#MainContent_HiddtxtNumOT").val(10);
    } else {
        $("#txtNumOT").val($("#MainContent_HiddtxtNumOT").val());
    }
    $("#txtNumOT").keydown(function (event) {
        if ((event.keyCode == 13 || event.keyCode == 9) || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode == 127) || (event.keyCode == 8) || (event.keyCode == 35) || (event.keyCode == 36)) {
            if (event.keyCode == 13 || event.keyCode == 9) {

                var NumOts = Number($("#txtNumOT").val());
                if (NumOts >= 2 && NumOts <= 99) {
                    arrOTS = new Array();
                    fncCreaHeaderGRID();
                } else {
                    alert("El número de OTs a crear no puede ser menor a 2 o mayor a 99");
                }
                if (event.keyCode == 13) {
                    return false;
                }
            }
            $("#MainContent_HiddtxtNumOT").val($("#txtNumOT").val());
            return true;
        } else {

            return false;
        }
        return false;
    });
    
    ConsultaProgramaEmpleado();
    btnLimpiaOTs_Click();
}
$(document).ready(function () {
    $("#loading").ajaxStart(function () {
        $(this).show();
    });
    $("#loading").ajaxStop(function () {
        $(this).hide();
    });
});


$(function () {
    $("#MainContent_dpFechaBusq").datepicker({ minDate: 0 });
    $('#MainContent_dpFechaBusq').datepicker("setDate", new Date());
});

//$(function () {

//    $("#GridHeader").delegate(".autoCompleteRe", "keyup", function () {
//        if (event.keyCode != 13) {
//            $(this).autocomplete({ source: arrReporteros });
//            $(this).each(function () {
//                var autoCompelteElement = this;
//                var formElementName = $(this).attr('id');
//                var hiddenElementID = formElementName + '_hidden';

//                $(this).attr('id', formElementName + '_label');

//                $(this).after("<input type=\"hidden\" name=\"" + formElementName + "\" id=\"" + hiddenElementID + "\" />");
//                $(this).autocomplete({ source: arrReporteros,
//                    select: function (event, ui) {
//                        var selectedObj = ui.item;
//                        $(autoCompelteElement).val(selectedObj.label);
//                        $('#' + hiddenElementID).val(selectedObj.value);
//                        $('#' + hiddenElementID).attr("data-numempl", selectedObj.NumEmpl);
//                        return false;
//                    }
//                });
//            });
//        } else {
//            if (jQuery.trim($(this).val()) != '') {
//                var bvalida = false;
//                for (var i = 0; i < arrReporteros.length; i++) {
//                    if ($(this).val().toUpperCase() == arrReporteros[i].label.toUpperCase()) {
//                        bvalida = true;
//                    }
//                }
//                if (bvalida == false) {
//                    $(this).val("");
//                }
//            }
//        }
//    });
//    $("#GridHeader").delegate(".autoCompleteRe", "onfocusin", function () {
//        if (jQuery.trim($(this).val()) != '') {
//            var bvalida = false;
//            for (var i = 0; i < arrReporteros.length; i++) {
//                if ($(this).val().toUpperCase() == arrReporteros[i].label.toUpperCase()) {
//                    bvalida = true;
//                }
//            }
//            if (bvalida == false) {
//                $(this).val("");
//            }
//        }
//    });

//});
function validaArrayReportero() {
    for (var i = 0; i < arrReporteros.length; i++) {
        if ($("#txtReportero_label").val().toUpperCase() == arrReporteros[i].label.toUpperCase()) {
            return true;
        }
    }
    return false;
}
function cboSecciones_SelectionChanged() {
    try {
        if ($('option:selected', '#cboSecciones').index() > 0) {
            if ($('#MainContent_hiddSecc').val() != "" && $('#MainContent_hiddSecc').val() != undefined) {
                if (Number($('#MainContent_hiddSecc').val()) != Number($('option:selected', '#cboSecciones').val())) {
                    arrOTS = new Array();
                }
            }
            getTipoNotaBySecc();
            $('#MainContent_hiddSecc').val($('option:selected', '#cboSecciones').val());

        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }

}
function btnLimpiaOTs_Click() {
    try {
        arrOTS = new Array();
        strListaOTValidas = "";
        strListaCveOTValidas = "";

        if ($("#cboLocales").val() != 36) {
            $("#lblOTSeccion").hide();
            $("#cboSecciones").hide();
        }
        else {
            $("#lblOTSeccion").show();
            $("#cboSecciones").show();
        }
        CreaHeaderGRID();
        $("#MainContent_btnUpdateEquipo").click();
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function ValidaCamposXFila(Fila) {
    var bValida = true;
    var Numfila = Fila;
    var bValidaTitulo = false;
    var bValidaDescripcion = false;
    var bValidaReportero = false;
    $.each($("#GridHeader").children(), function (index, myDiv) {
        if (index != 0) {
            $.each($(myDiv).children(), function (indexP, myDivP) {
                if (Numfila == (indexP + 1)) {
                    $.each($(myDivP).children(), function (indexC, myDivC) {
                        if (indexC != 0) {
                            if ((myDivC.children[0].id.indexOf("txtTitulo" + "_" + Numfila) == 0) && (jQuery.trim($(myDivC.children[0]).val()) == '')) {
                                bValidaTitulo = true;
                            }
                            if ((myDivC.children[0].id.indexOf("txtDescripcion" + "_" + Numfila) == 0) && (jQuery.trim($(myDivC.children[0]).val()) == '')) {
                                bValidaDescripcion = true;
                            }
                            if ((myDivC.children[0].id.indexOf("txtReportero" + "_" + Numfila) == 0) && (jQuery.trim($(myDivC.children[0]).val()) == '')) {
                                bValidaReportero = true;
                            }
                            if ((myDivC.children[0].id.indexOf("dpFechaAgenda" + "_" + Numfila) == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                var fechaIng = new Date(Date.parse($(myDivC.children[0]).val().toString().split('/')[1] + '/' + $(myDivC.children[0]).val().toString().split('/')[0] + '/' + $(myDivC.children[0]).val().toString().split('/')[2]));
                                $(myDivC.children[0]).datepicker({
                                    minDate: 0
                                });
                                $(myDivC.children[0]).datepicker("setDate", fechaIng);

                            }
                        }
                    });
                }
            });
        }
    });
    if (bValidaTitulo == true && bValidaDescripcion == true && bValidaReportero == true) {
        bValida = false;
    }
    return bValida;
}
function ValidaLogistica(Fila) {
    var sMensaje = "";
    var TimeIni;
    var TimeFin;
    var bValidaLugar = false;
    var bValidaObjetivo = false;
    var bValidaTimeIni = false;
    var bValidaTimeFin = false;
    if ($("#GridHeader").children() != undefined && $("#GridHeader").children().length > 0) {
        for (var index = 0; index < $("#GridHeader").children().length; index++) {
            if (index != 0) {
                for (var indexP = 0; indexP < $($("#GridHeader").children()[index]).children().length; indexP++) {
                    if (Fila == indexP) {

                        for (var indexC = 0; indexC < $($($("#GridHeader").children()[index]).children()[indexP]).children().length; indexC++) {
                            if (indexC != 0) {
                                if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtLugar") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                    sMensaje = sMensaje + "Debe escribir un lugar, \n";
                                } else {
                                    if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtLugar") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {
                                        bValidaLugar = true;
                                    }
                                }
                                if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtIndicaciones") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                    sMensaje = sMensaje + "Debe escribir una indicación, \n";
                                } else {
                                    if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtIndicaciones") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {
                                        bValidaObjetivo = true;
                                    }
                                }
                                if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("hdrHoraIni") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                    sMensaje = sMensaje + "Debe seleccionar una Hora de inicio, \n";
                                } else {
                                    if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("hdrHoraIni") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {

                                        TimeIni = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    }
                                }
                                if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("hdrHoraFin") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                    sMensaje = sMensaje + "Debe seleccionar una Hora de termino, \n";
                                } else {
                                    if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("hdrHoraFin") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {
                                        TimeFin = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    }
                                }
                            }
                        }
                        if (bValidaLugar == false && bValidaObjetivo == false) {
                            sMensaje = "";
                        } else {
                            if (TimeIni != "" && TimeFin != "") {
                                var dtP1 = new Date();
                                dtP1.setHours(Number(TimeIni.split(':')[0]), Number(TimeIni.split(':')[1]), Number(TimeIni.split(':')[2]));
                                var dtP2 = new Date();
                                dtP2.setHours(Number(TimeFin.split(':')[0]), Number(TimeFin.split(':')[1]), Number(TimeFin.split(':')[2]));
                                if (dtP1 > dtP2) {
                                    sMensaje = sMensaje + " La Hora de inicio no puede ser mayor a la hora de final, \n";
                                }
                            }
                        }

                        break;
                    }
                }

            }
        }
    }
    return sMensaje;
}
function ValidaCamposOT(vFila) {
    var bValida = true;
    var strMesajeOtros = "";
    var strMessage = "";
    var bValidaLugar;
    var bValidaIndicaciones;
    var sMensajeLog;
    gblMensaje = "";
    if ($("#GridHeader").children() != undefined && $("#GridHeader").children().length > 0) {
        for (var index = 0; index < $("#GridHeader").children().length; index++) {
            if (index != 0) {
                for (var indexP = 0; indexP < $($("#GridHeader").children()[index]).children().length; indexP++) {
                    if (vFila == -1 || vFila == (indexP + 1)) {
                        if (ValidaCamposXFila($($($("#GridHeader").children()[index]).children()[indexP]).children()[0].innerHTML) == true) {
                            strMessage = "";
                            strMesajeOtros = "";
                            if (vFila == -1) {
                                strListaOTValidas = strListaOTValidas + (indexP + 1).toString() + "|";
                            }
                            gblUltimaOT = index;
                            sMensajeLog = "";
                            bValidaLugar = false;
                            bValidaIndicaciones = false;
                            if (bValida == true) {
                                for (var indexC = 0; indexC < $($($("#GridHeader").children()[index]).children()[indexP]).children().length; indexC++) {
                                    if (indexC != 0) {
                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtTitulo") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                            strMesajeOtros = strMesajeOtros + "El Titulo de la OT no puede ser nulo, \n";
                                            bValida = false;

                                        }
                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtDescripcion") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                            strMesajeOtros = strMesajeOtros + "La Descripción de la OT no puede ser nulo, \n";
                                            bValida = false;

                                        }
                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("dpFechaAgenda") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                            strMesajeOtros = strMesajeOtros + "Necesita seleccionar una fecha de agenda, \n";
                                            bValida = false;

                                        }
                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtReportero") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {

                                            strMesajeOtros = strMesajeOtros + "Necesita seleccionar un Reportero, \n";
                                            bValida = false;

                                        } else {
                                            if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtReportero") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {

                                                var bvalidaTem = false;
                                                for (var i = 0; i < arrReporteros.length; i++) {
                                                    if ($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val().toUpperCase() == arrReporteros[i].label.toUpperCase()) {
                                                        bvalidaTem = true;
                                                    }
                                                }
                                                if (bvalidaTem == false) {
                                                    bValida = false;
                                                    strMessage = strMessage + " reportero, ";
                                                }
                                            }
                                        }

                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("cboTipoNota") == 0) && ($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).size() > 0) && ($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).index() < 0)) {
                                            alertModal("Necesita seleccionar una tipo de Nota, ");
                                            bValida = false;

                                        }

                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtCamarografo") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {

                                            var bvalidaTem = false;
                                            for (var i = 0; i < arrCamarografos.length; i++) {
                                                if ($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val().toUpperCase() == arrCamarografos[i].label.toUpperCase()) {
                                                    bvalidaTem = true;
                                                }
                                            }
                                            if (bvalidaTem == false) {
                                                bValida = false;
                                                strMessage = strMessage + " camarografo, ";
                                            }
                                        }

                                        if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtEditor") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {

                                            var bvalidaTem = false;
                                            for (var i = 0; i < arrEditores.length; i++) {
                                                if ($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val().toUpperCase() == arrEditores[i].label.toUpperCase()) {
                                                    bvalidaTem = true;
                                                }
                                            }
                                            if (bvalidaTem == false) {
                                                bValida = false;
                                                strMessage = strMessage + " editor, ";
                                            }
                                        }
                                        if (Number($('option:selected', '#cboSecciones').val()) == 9) {

                                            if (sMensajeLog == "") {
                                                if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtLugar") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                                    sMensajeLog = ValidaLogistica(indexP);
                                                    if (sMensajeLog != "") {
                                                        strMesajeOtros = strMesajeOtros + sMensajeLog;
                                                        bValida = false;
                                                    }
                                                } else {
                                                    if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtLugar") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {
                                                        bValidaLugar = true; ;
                                                    }
                                                }

                                                if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtIndicaciones") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) == '')) {
                                                    sMensajeLog = ValidaLogistica(indexP);
                                                    if (sMensajeLog != "") {
                                                        strMesajeOtros = strMesajeOtros + sMensajeLog;
                                                        bValida = false;
                                                    }
                                                } else {
                                                    if (($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtIndicaciones") == 0) && (jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != '')) {
                                                        bValidaIndicaciones = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                        if (bValidaLugar == true && bValidaIndicaciones == true && sMensajeLog == "") {
                                            sMensajeLog = ValidaLogistica(indexP);
                                            if (sMensajeLog != "") {
                                                strMesajeOtros = strMesajeOtros + sMensajeLog;
                                                bValida = false;
                                            }
                                        }
                                    }
                                    if (strMessage != "") {
                                        var sMensaje = "El usuario que ingreso en " + strMessage;
                                        if ((strMessage.length - strMessage.replace(",", "").length) > 1) {
                                            sMensaje = sMensaje + " no son validos.";
                                        } else {
                                            sMensaje = sMensaje + " no es valido.";
                                        }

                                        strMessage = sMensaje;
                                    }

                                    if (bValida == false) {
                                        if (strMessage != "") {
                                            gblMensaje = strMesajeOtros + sMensaje;
                                        } else {
                                            if (strMesajeOtros != "" && strMesajeOtros.substr(strMesajeOtros.length - 3, strMesajeOtros.length) == ", \n") {
                                                gblMensaje = strMesajeOtros.substr(0, strMesajeOtros.length - 3) + ".";
                                            } else {
                                                if (strMesajeOtros != "") {
                                                    gblMensaje = strMesajeOtros;
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }

                            } else {
                                break;
                            }

                            if (vFila == (indexP + 1)) {
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    return bValida;
}
function GuardaMasivo(vFilas) {
    lstEquipo = new Array();
    rowActual = 0;
    $.each($("#GridHeader").children(), function (index, myDiv) {
        if (index != 0) {
            $.each($(myDiv).children(), function (indexP, myDivP) {
                if (vFilas == -1 || (indexP + 1) == vFilas) {
                    if (ValidaCamposXFila($(myDivP).children()[0].innerHTML) == true) {
                        oOrdenTrabajo = new THE_OrdenTrabajo();
                        var oEmpleado = new TDI_EMPL();
                        oAgendaSemanal = new THE_AgendaSemanal();
                        var oPuestosRpt = new TDI_Puestos();
                        var oPuestosCam = new TDI_Puestos();
                        var oPuestosEdit = new TDI_Puestos();
                        var lstEquipo = new Array();
                        var bValidaRpt = false;
                        var bValidaCam = false;
                        var bValidaEdit = false;
                        var oEquipoTrabajoRpt;
                        var oEquipoTrabajoCam;
                        var oEquipoTrabajoEdit;
                        var Guardar = true;
                        var cveEmpl;
                        //Se agrega el empleado que crea la OT
                        oOrdenTrabajo.EmplCrea = new TDI_EMPL()
                        oOrdenTrabajo.EmplCrea.EmpleadoLlavePrimaria = Number(sessionStorage.numUsuario);
                        //Se agrega la local 
                        var vlocal = new TDI_Local();
                        vlocal.LocalLlave = Number($('option:selected', '#cboLocales').val());
                        vlocal.LocalDescripcion = $('option:selected', '#cboLocales')[0].text;
                        oOrdenTrabajo.Local = vlocal;
                        //Se asigna la empresa
                        if (oOrdenTrabajo.Local.LocalLlave == 36)
                        //Pertenece a Ajusco
                        {
                            oOrdenTrabajo.Empresa = new TDI_Empresa();
                            oOrdenTrabajo.Empresa.CveEmpresa = gblEmpresa;
                        }
                        else
                        //Pertenece a locales
                        {
                            oOrdenTrabajo.Empresa = new TDI_Empresa();
                            oOrdenTrabajo.Empresa.CveEmpresa = 5;
                        }
                        //Fabrica
                        oOrdenTrabajo.FabrLlave = new TDI_Fabrica()
                        oOrdenTrabajo.FabrLlave.FabricaLlavePrimaria = Number(sessionStorage.Fabrica);
                        oOrdenTrabajo.Usuario = sessionStorage.userName;
                        oEmpleado.EmpleadoLlavePrimaria = Number(sessionStorage.numUsuario);
                        oOrdenTrabajo.CveEmpleado = oEmpleado;

                        if (oOrdenTrabajo.CveSeccion == undefined || oOrdenTrabajo.CveSeccion == null) {
                            oOrdenTrabajo.CveSeccion = new TDI_Seccion();
                            oOrdenTrabajo.CveSeccion.CveSeccion = Number($('option:selected', '#cboSecciones').val());
                            var vEmpl = new TDI_EMPL();
                            if ($("#cboLocales").val() != 36)
                                vEmpl.EmpleadoLlavePrimaria = Number(seccionLocl.EmplLlPr);
                            else
                                vEmpl.EmpleadoLlavePrimaria = Number($('option:selected', '#cboSecciones').attr("data-Empl"));
                            oOrdenTrabajo.CveSeccion.EmpleadoLlavePrimaria = vEmpl;
                        }

                        if ($("#cboLocales").val() != 36) 
                            cveEmpl = Number(seccionLocl.EmplLlPr);
                        else
                            cveEmpl = Number($('option:selected', '#cboSecciones').attr("data-Empl"));

                        oOrdenTrabajo.EmplCrea = new TDI_EMPL();
                        oOrdenTrabajo.EmplCrea.EmpleadoLlavePrimaria = Number(sessionStorage.numUsuario);

                        $.each($(myDivP).children(), function (indexC, myDivC) {
                            if (indexC != 0) {

                                var strMessage = "";

                                if ((myDivC.children[0].id.indexOf("txtTitulo") == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                    oOrdenTrabajo.Titulo = jQuery.trim($(myDivC.children[0]).val());
                                    oAgendaSemanal.Titulo = oOrdenTrabajo.Titulo;
                                }
                                if ((myDivC.children[0].id.indexOf("txtDescripcion") == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                    oOrdenTrabajo.Objetivo = jQuery.trim($(myDivC.children[0]).val());
                                    oOrdenTrabajo.HistoryLine = oOrdenTrabajo.Objetivo;
                                }
                                if (EVDT != null) {
                                    oOrdenTrabajo.CveEventoDeportivo = EVDT;
                                }
                                if ((myDivC.children[0].id.indexOf("txtReportero") == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                    oOrdenTrabajo.Estatus = "2";
                                    /*Puestos para Reporteros 1*/
                                    oPuestosRpt.PuestoLlavePrimaria = 1;
                                    var oEmpleadoRpt = new TDI_EMPL();

                                    if ($(myDivC.children[1]).val() != undefined) {
                                        oEmpleadoRpt.EmpleadoLlavePrimaria = Number($(myDivC.children[0]).attr("data-val"));
                                    } else {
                                        if ($(myDivC.children[0]).attr("data-OtOrAct") == "ACT") {

                                            oEmpleadoRpt.EmpleadoLlavePrimaria = Number($(myDivC.children[0]).attr("data-val"));
                                        }
                                    }
                                    oEmpleadoRpt.EmpleadoLlavePrimaria = $(myDivC.children[0]).attr('data-val');
                                    oEmpleadoRpt.EmpleadoNombre = $(myDivC.children[0]).val();
                                    oEquipoTrabajoRpt = new THE_EquipoTrabajo();
                                    oEquipoTrabajoRpt.EmpleadoLlavePrimaria = oEmpleadoRpt;
                                    oEquipoTrabajoRpt.ClavePrograma = 0;
                                    if ($(myDivC.children[0]).attr("data-OtOrAct") == "ACT") {
                                        if ($(myDivC.children[0]).attr("data-CveEqui").toString() != "") {
                                            oEquipoTrabajoRpt.CveEquipoTrabajo = Number($(myDivC.children[0]).attr("data-CveEqui"));
                                        } else {
                                            oEquipoTrabajoRpt.CveEquipoTrabajo = 0;
                                        }
                                        Guardar = false;
                                        ActualizaOT = true;
                                    } else {
                                        ActualizaOT = false;
                                        oEquipoTrabajoRpt.CveEquipoTrabajo = 0;
                                    }
                                    oEquipoTrabajoRpt.PuestoLlavePrimaria = oPuestosRpt;
                                    bValidaRpt = true;

                                } else {
                                    if ((myDivC.children[0].id.indexOf("txtReportero") == 0) && (jQuery.trim($(myDivC.children[0]).val()) == '')) {
                                        oOrdenTrabajo.Estatus = "1";
                                    }
                                }

                                if (myDivC.children[0].id.indexOf("lblOT") == 0) {
                                    if (myDivC.children[1].id.indexOf("btnActualizarOT") == 0 && $(myDivC.children[1]).attr("data-OtOrAct") == 'ACT') {
                                        oOrdenTrabajo.CveOrdenTrabajo = Number($(myDivC.children[1]).attr("data-Ot"));
                                        oOrdenTrabajo.ClaveOrdenTrabajo = $(myDivC.children[1]).attr("data-OtraCvec");
                                        oAgendaSemanal.CveAgendaSemanal = Number($(myDivC.children[1]).attr("data-CveAgenda"));
                                        Guardar = false;
                                    }

                                }

                                if (oOrdenTrabajo.CveSeccion != undefined) {
                                    oAgendaSemanal.CveSeccion = oOrdenTrabajo.CveSeccion;
                                }
                                if (myDivC.children[0].id.indexOf("cboTipoNota") == 0 && $('option', $(myDivC.children[0])).size() > 0) {
                                    oOrdenTrabajo.CveTipoNota = new TDI_TipoNota();
                                    oOrdenTrabajo.CveTipoNota.CveTipoNota = Number($('option:selected', $(myDivC.children[0])).val());
                                    oAgendaSemanal.CveTipoNota = oOrdenTrabajo.CveTipoNota;
                                }

                                if (myDivC.children[0].id.indexOf("dpFechaAgenda") == 0 && $(myDivC.children[0]).val() != '') {
                                    oOrdenTrabajo.FechaEvento = $(myDivC.children[0]).datepicker("getDate");
                                    oAgendaSemanal.FechaInicio = $(myDivC.children[0]).datepicker("getDate");
                                    oAgendaSemanal.Origen = "O";
                                    oAgendaSemanal.Estatus = "A";
                                    oAgendaSemanal.FechaCreacion = new Date();
                                }
                                if (myDivC.children[0].id.indexOf("cboPrograma") == 0 && $('option', $(myDivC.children[0])).size() > 0) {
                                    //Validación de la sección en la orden de trabajo
                                    if (oOrdenTrabajo.CveSeccion.CveSeccion == 8 || oOrdenTrabajo.CveSeccion.CveSeccion == 5 && $("#cboLocales").val() != 36) {
                                        var vPrograma = new TDI_Programa();
                                        vPrograma.CvePrograma = Number($('option:selected', $(myDivC.children[0])).val());
                                        vPrograma.NombrePrograma = $('option:selected', $(myDivC.children[0]))[0].text;
                                        oOrdenTrabajo.Programa = vPrograma;
                                    }
                                }

                                if (oOrdenTrabajo.CveOrigen == undefined || oOrdenTrabajo.CveOrigen == null) {
                                    if (oOrdenTrabajo.Local.LocalLlave == 36)
                                        oOrdenTrabajo.CveOrigen = new TDI_Origen(1);
                                    else {
                                        oOrdenTrabajo.CveOrigen = new TDI_Origen(6);
                                        oOrdenTrabajo.FabrLlave = new TDI_Fabrica(4);
                                        oOrdenTrabajo.CveSeccion.CveSeccion = 114;
                                        oOrdenTrabajo.CveTipoNota = new TDI_TipoNota();
                                        oOrdenTrabajo.CveTipoNota.CveTipoNota = 1;
                                    }
                                }

                                var oEmpleadoCam = new TDI_EMPL();
                                if ((myDivC.children[0].id.indexOf("txtCamarografo") == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                    oPuestosCam.PuestoLlavePrimaria = 2;
                                    if ($(myDivC.children[1]).val() != undefined) {
                                        oEmpleadoCam.EmpleadoLlavePrimaria = Number($(myDivC.children[1]).val());
                                    } else {
                                        if ($(myDivC.children[0]).attr("data-OtOrAct") == "ACT") {

                                            oEmpleadoCam.EmpleadoLlavePrimaria = Number($(myDivC.children[0]).attr("data-val"));
                                        }
                                    }

                                    oEmpleadoCam.EmpleadoLlavePrimaria = $(myDivC.children[0]).attr('data-val');
                                    oEmpleadoCam.EmpleadoNombre = $(myDivC.children[0]).val();
                                    oEquipoTrabajoCam = new THE_EquipoTrabajo();
                                    oEquipoTrabajoCam.EmpleadoLlavePrimaria = oEmpleadoCam;
                                    oEquipoTrabajoCam.ClavePrograma = 0;
                                    if ($(myDivC.children[0]).attr("data-OtOrAct") == "ACT") {
                                        if ($(myDivC.children[0]).attr("data-CveEqui").toString() != "") {
                                            oEquipoTrabajoCam.CveEquipoTrabajo = Number($(myDivC.children[0]).attr("data-CveEqui"));
                                        } else {
                                            oEquipoTrabajoCam.CveEquipoTrabajo = 0;
                                        }
                                        Guardar = false;

                                    } else {

                                        oEquipoTrabajoCam.CveEquipoTrabajo = 0;
                                    }
                                    oEquipoTrabajoCam.PuestoLlavePrimaria = oPuestosCam;
                                    bValidaCam = true;
                                } else {
                                    if ((myDivC.children[0].id.indexOf("txtCamarografo") == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                        oEmpleadoCam.EmpleadoLlavePrimaria = 0;
                                    }
                                }

                                var oEmpleadoEdit = new TDI_EMPL();
                                if ((myDivC.children[0].id.indexOf("txtEditor") == 0) && (jQuery.trim($(myDivC.children[0]).val()) != '')) {
                                    oPuestosEdit.PuestoLlavePrimaria = 94;
                                    if ($(myDivC.children[1]).val() != undefined) {
                                        oEmpleadoEdit.EmpleadoLlavePrimaria = Number($(myDivC.children[1]).val());
                                    } else {
                                        if ($(myDivC.children[0]).attr("data-OtOrAct") == "ACT") {

                                            oEmpleadoEdit.EmpleadoLlavePrimaria = Number($(myDivC.children[0]).attr("data-val"));
                                        }

                                    }

                                    oEmpleadoEdit.EmpleadoLlavePrimaria = $(myDivC.children[0]).attr('data-val');
                                    oEmpleadoEdit.EmpleadoNombre = $(myDivC.children[0]).val();
                                    oEquipoTrabajoEdit = new THE_EquipoTrabajo();
                                    oEquipoTrabajoEdit.EmpleadoLlavePrimaria = oEmpleadoEdit;
                                    oEquipoTrabajoEdit.ClavePrograma = 0;
                                    if ($(myDivC.children[0]).attr("data-OtOrAct") == "ACT") {
                                        if ($(myDivC.children[0]).attr("data-CveEqui").toString() != "") {
                                            oEquipoTrabajoEdit.CveEquipoTrabajo = Number($(myDivC.children[0]).attr("data-CveEqui"));
                                        } else {
                                            oEquipoTrabajoEdit.CveEquipoTrabajo = 0;

                                        }

                                        Guardar = false;
                                    } else {

                                        oEquipoTrabajoEdit.CveEquipoTrabajo = 0;
                                    }
                                    oEquipoTrabajoEdit.PuestoLlavePrimaria = oPuestosEdit;
                                    bValidaEdit = true;
                                } else {
                                    if ((myDivC.children[0].id.indexOf("txtEditor") == 0) && (jQuery.trim($(myDivC.children[0]).val()) == '')) {
                                        oEmpleadoEdit.EmpleadoLlavePrimaria = 0;
                                    }
                                }
                            }

                        });
                        if (bValidaRpt == true && oEquipoTrabajoRpt != undefined) {
                            oEquipoTrabajoRpt.CveOrdenTrabajo = oOrdenTrabajo;
                            lstEquipo.push(oEquipoTrabajoRpt);
                        }
                        if (bValidaCam == true && oEquipoTrabajoCam != undefined) {
                            oEquipoTrabajoCam.CveOrdenTrabajo = oOrdenTrabajo;
                            lstEquipo.push(oEquipoTrabajoCam);
                        }
                        if (bValidaEdit == true && oEquipoTrabajoEdit != undefined) {
                            oEquipoTrabajoEdit.CveOrdenTrabajo = oOrdenTrabajo;
                            lstEquipo.push(oEquipoTrabajoEdit);
                        }
                        rowActual = index;
                        var data = new AlmacenaDatosOrdenTrabajoRegreso(cveEmpl, oOrdenTrabajo, oAgendaSemanal, lstEquipo, Guardar, GenerateTransac());
                        executeSyncRequest(wsMtdAlmacenaDatosOrdenTrabajoRegreso, JSON.stringify(data, null, 2), successAlmacenaDatosOrdenTrabajoRegreso, myErrorGuardaOTMasivo);

                    }
                }
            });
        }
    });
}
var successAlmacenaDatosOrdenTrabajoRegreso = function (data, status) {
    try {
        if (data.d != undefined) {
            if (data.d.oTipo == 0) {

                if ($("#GridHeader").children() != undefined && $("#GridHeader").children().length > 0) {
                    for (var index = 0; index < $("#GridHeader").children().length; index++) {
                        if (index != 0) {
                            if (strListaOTValidas != "" && strListaOTValidas.split('|').length > 0) {
                                rowActual = Number(strListaOTValidas.split('|')[0]);
                            }
                            var bValidaNext = true;

                            for (var indexP = 0; indexP < $($("#GridHeader").children()[index]).children().length; indexP++) {

                                if ((indexP + 1) == rowActual || rowActual < (indexP + 1)) { //Para el control de mensaje final
                                    //Si no ha sido creada o si se trata de una actualización se verifica que refresque correctamente la fila
                                    if ($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[1]).children()[0]).attr("data-Ot") == data.d.oOrdenTrabajo.CveOrdenTrabajo || ($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[1]).children()[0]).attr("data-Ot") == undefined && jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[1]).children()[0]).val()) != "")) {

                                        if (Number($('option:selected', '#cboSecciones').val()) == 8 || Number($('option:selected', '#cboSecciones').val()) == 5 || $("#cboLocales").val() != 36) {
                                            if ((indexP + 1) == rowActual) {
                                                ComprarOrdenTrabajo(data.d.oOrdenTrabajo, rowActual);
                                            } else {
                                                ComprarOrdenTrabajo(data.d.oOrdenTrabajo, (indexP + 1));
                                            }
                                        }
                                        for (var indexC = 0; indexC < $($($("#GridHeader").children()[index]).children()[indexP]).children().length; indexC++) {
                                            bValidaNext = false;
                                            if (indexC != 0) {

                                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtTitulo") == 0) {

                                                    $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-Ot", data.d.oOrdenTrabajo.CveOrdenTrabajo);
                                                }
                                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("dpFechaAgenda") == 0) {
                                                    $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveAgenda", data.d.oAgendaSemanal.CveAgendaSemanal);
                                                }

                                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtReportero") == 0) {
                                                    var reportero = ObtenerEquipoReportero(data.d.LstEquipo);
                                                    if (reportero != undefined) {
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveEqui", reportero.CveEquipoTrabajo);
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-OtOrAct", "ACT");

                                                    }
                                                }
                                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtCamarografo") == 0) {
                                                    var camarografo = ObtenerEquipoCamarografo(data.d.LstEquipo);
                                                    if (camarografo != undefined) {
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveEqui", camarografo.CveEquipoTrabajo);
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-OtOrAct", "ACT");
                                                    }
                                                }
                                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtEditor") == 0) {
                                                    var editor = ObtenerEquipoEditor(data.d.LstEquipo);
                                                    if (editor != undefined) {
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveEqui", editor.CveEquipoTrabajo);
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-OtOrAct", "ACT");
                                                    }
                                                }

                                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("lblOT") == 0) {
                                                    $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).empty();
                                                    $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).append(data.d.oOrdenTrabajo.ClaveOrdenTrabajo.toString());
                                                    if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1].id.indexOf("btnActualizarOT") == 0) {
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).attr("data-OtOrAct", "ACT");
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).attr("data-Ot", data.d.oOrdenTrabajo.CveOrdenTrabajo);
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).attr("data-OtraCvec", data.d.oOrdenTrabajo.ClaveOrdenTrabajo);
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).attr("data-CveAgenda", data.d.oAgendaSemanal.CveAgendaSemanal);
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).val("");
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).hide();

                                                    }
                                                    if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2].id.indexOf("dvActualizar") == 0) {
                                                        $($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2]).children()[0]).attr("data-OtOrAct", "ACT");
                                                        $($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2]).children()[0]).attr("data-Ot", data.d.oOrdenTrabajo.CveOrdenTrabajo);
                                                        $($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2]).children()[0]).attr("data-OtraCvec", data.d.oOrdenTrabajo.ClaveOrdenTrabajo);
                                                        $($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2]).children()[0]).attr("data-CveAgenda", data.d.oAgendaSemanal.CveAgendaSemanal);
                                                        $($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2]).children()[0]).show();
                                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[2]).attr("style", "visibility:visible");
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    if (bValidaNext == false)

                                        if ((strListaOTValidas.split('|').length > 0)) {
                                            if (jQuery.trim((strListaOTValidas.toString().split('|'))[0].toString()).length > 0) {
                                                if (ActualizaOT == false) {
                                                    if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                                        if ((indexP + 1) == rowActual) {
                                                            insertaLogistica(rowActual, data.d.oOrdenTrabajo.CveOrdenTrabajo, false);
                                                        } else {
                                                            insertaLogistica((indexP + 1), data.d.oOrdenTrabajo.CveOrdenTrabajo, false);
                                                        }
                                                    }
                                                } else {
                                                    if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                                        if ((indexP + 1) == rowActual) {
                                                            insertaLogistica(rowActual, data.d.oOrdenTrabajo.CveOrdenTrabajo, true);
                                                        } else {
                                                            insertaLogistica((indexP + 1), data.d.oOrdenTrabajo.CveOrdenTrabajo, true);
                                                        }
                                                    }
                                                }

                                                if (rowActual != (indexP + 1)) {
                                                    var VstrlistaOTValidas = "";
                                                    for (var x = 0; x < strListaOTValidas.split('|').length; x++) {
                                                        if (strListaOTValidas.split('|')[x] != "" && Number(strListaOTValidas.split('|')[x]) != (indexP + 1)) {
                                                            VstrlistaOTValidas = VstrlistaOTValidas + strListaOTValidas.split('|')[x] + "|";
                                                        }
                                                    }
                                                    if (VstrlistaOTValidas != "") {
                                                        strListaOTValidas = VstrlistaOTValidas;
                                                    }
                                                }
                                                else {
                                                    if (strListaOTValidas.indexOf((strListaOTValidas.split('|'))[ContadorOT].toString() + "|") == 0) {
                                                        strListaOTValidas = strListaOTValidas.substr(((strListaOTValidas.split('|'))[ContadorOT].toString() + "|").length);
                                                    }
                                                }

                                                if (strListaOTValidas == "") {
                                                    if (ActualizaOT == true) {
                                                        alertModal("Las Ordenes de Trabajo, han sido actualizadas correctamente");
                                                    } else {
                                                        alertModal("Las Ordenes de Trabajo, han sido guardadas correctamente");
                                                    }
                                                }
                                            }
                                            else {
                                                if (GuardadoMasivo == true) {
                                                    if (ActualizaOT == true) {
                                                        if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                                            if ((indexP + 1) == rowActual) {
                                                                insertaLogistica(rowActual, data.d.oOrdenTrabajo.CveOrdenTrabajo, true);
                                                            } else {
                                                                insertaLogistica((indexP + 1), data.d.oOrdenTrabajo.CveOrdenTrabajo, true);
                                                            }
                                                        }
                                                        alertModal("Las Ordenes de Trabajo, han sido actualizadas correctamente");
                                                    } else {
                                                        if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                                            if ((indexP + 1) == rowActual) {
                                                                insertaLogistica(rowActual, data.d.oOrdenTrabajo.CveOrdenTrabajo, false);
                                                            } else {
                                                                insertaLogistica((indexP + 1), data.d.oOrdenTrabajo.CveOrdenTrabajo, false);
                                                            }
                                                        }
                                                        alertModal("Las Órdenes de Trabajo, han sido guardadas correctamente");
                                                    }
                                                } else {
                                                    if (ActualizaOT == true) {
                                                        if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                                            if ((indexP + 1) == rowActual) {
                                                                insertaLogistica(rowActual, data.d.oOrdenTrabajo.CveOrdenTrabajo, true);
                                                            } else {
                                                                insertaLogistica((indexP + 1), data.d.oOrdenTrabajo.CveOrdenTrabajo, true);
                                                            }
                                                        }
                                                        alertModal("La Orden de Trabajo, ha sido actualizada correctamente");
                                                    }
                                                    else {
                                                        if (Number($('option:selected', '#cboSecciones').val()) == 9) {
                                                            if ((indexP + 1) == rowActual) {
                                                                insertaLogistica(rowActual, data.d.oOrdenTrabajo.CveOrdenTrabajo, false);
                                                            } else {
                                                                insertaLogistica((indexP + 1), data.d.oOrdenTrabajo.CveOrdenTrabajo, false);
                                                            }
                                                            alertModal("La Orden de Trabajo, ha sido guardada correctamente");
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                }
                                if (bValidaNext == false) {
                                    break;
                                }
                            }

                        }
                    }
                }
            }

            else {
                if ((strListaOTValidas.split('|').length > 0)) {
                    if (jQuery.trim((strListaOTValidas.toString().split('|'))[0].toString()).length > 0) {

                        if (strListaOTValidas.indexOf((strListaOTValidas.split('|'))[ContadorOT].toString() + "|") == 0) {
                            strListaOTValidas = strListaOTValidas.substr(((strListaOTValidas.split('|'))[ContadorOT].toString() + "|").length);
                        }
                    }
                }
            }
        }
    } catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function ComprarOrdenTrabajo(voOrdenTrabajo, fila) {
    var vNumRedactor;
    var vNombreRedactor;
    if ($("#GridHeader").children() != undefined && $("#GridHeader").children().length > 0) {
        for (var index = 0; index < $("#GridHeader").children().length; index++) {
            if (index != 0) {
                for (var indexP = 0; indexP < $($("#GridHeader").children()[index]).children().length; indexP++) {

                    if ((indexP + 1) == fila) {
                        var oc = new Array();
                        var oCompraOT = new CompraOT();
                        var bValida = false;
                        oCompraOT.CveOrdenTrabajo = voOrdenTrabajo;

                        for (var indexC = 0; indexC < $($($("#GridHeader").children()[index]).children()[indexP]).children().length; indexC++) {
                            if (indexC != 0) {
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("dpFechaAgenda") == 0) {
                                    oCompraOT.FechaCompra = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).datepicker("getDate");
                                }
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("cboPrograma") == 0) {
                                    var vTDI_EMPL = new TDI_EMPL();
                                    var vTDI_Programa = new TDI_Programa();
                                    vTDI_EMPL.EmpleadoLlavePrimaria = Number($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).attr("data-CveEmpl"));
                                    vTDI_Programa.CvePrograma = Number($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).val());
                                    vTDI_Programa.EsAztecaAmerica = Number($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).attr("data-AztecaAmerica"));
                                    vTDI_Programa.EsDeporteContacto = Number($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).attr("data-DeporteContacto"));
                                    vTDI_Programa.NombrePrograma = $('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]))[0].text;
                                    var vTDI_ProgramaEmpleado = new TDI_ProgramaEmpleado();
                                    vTDI_ProgramaEmpleado.CveEmpleado = vTDI_EMPL;
                                    vTDI_ProgramaEmpleado.CvePrograma = vTDI_Programa;
                                    oCompraOT.CveProgramaEmpleado = vTDI_ProgramaEmpleado;
                                }
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("cboFormato") == 0) {
                                    var vTDI_Seccion = new TDI_Seccion();
                                    vTDI_Seccion.CveSeccion = Number($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).attr("data-CveSeccion"));
                                    var vTDI_Formato = new TDI_Formato();
                                    vTDI_Formato.CveFormato = Number($('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0])).val());
                                    vTDI_Formato.Descripcion = $('option:selected', $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]))[0].text;
                                    var vTDI_SeccionFormato = new TDI_SeccionFormato();
                                    vTDI_SeccionFormato.CveSeccion = vTDI_Seccion;
                                    vTDI_SeccionFormato.CveFormato = vTDI_Formato;
                                    oCompraOT.CveSeccionFormato = vTDI_SeccionFormato;
                                }
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtReportero") == 0) {
                                    if (bValida == true) {
                                        vNumRedactor = Number($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[1]).val());
                                        vNombreRedactor = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    }
                                }
                            }
                        }
                        if (oCompraOT.CveOrdenTrabajo.CveSeccion.CveSeccion == 8 || oCompraOT.CveOrdenTrabajo.CveSeccion.CveSeccion == 5 || $("#cboLocales").val() != 36) {
                            if (oCompraOT.CveProgramaEmpleado.CvePrograma.EsAztecaAmerica == 1 || oCompraOT.CveProgramaEmpleado.CvePrograma.EsDeporteContacto == 1) {
                                oCompraOT.SeEnviaINEWS = true;
                            }
                            else {
                                oCompraOT.SeEnviaINEWS = true;
                                bValida = true;
                                oCompraOT.NumRedactor = vNumRedactor;
                                oCompraOT.NombreRedactor = vNombreRedactor;
                            }
                        }
                        else {
                            oCompraOT.SeEnviaINEWS = true;
                        }

                        if (oCompraOT != undefined) {

                            if (oCompraOT.CveOrdenTrabajo != undefined && oCompraOT.CveOrdenTrabajo != null) {
                                if (oCompraOT.CveOrdenTrabajo.FechaEvento != null && oCompraOT.CveOrdenTrabajo.FechaEvento != undefined && oCompraOT.CveOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
                                    var vFechaEvento = new Date(new Number(oCompraOT.CveOrdenTrabajo.FechaEvento.substr(6, 13)));
                                    oCompraOT.CveOrdenTrabajo.FechaEvento = vFechaEvento;
                                }
                                if (oCompraOT.CveOrdenTrabajo.Programa != undefined && oCompraOT.CveOrdenTrabajo.Programa.FechaFin != null && oCompraOT.CveOrdenTrabajo.Programa.FechaFin != undefined && oCompraOT.CveOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                                    var vFechaFin = new Date(new Number(oCompraOT.CveOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                                    oCompraOT.CveOrdenTrabajo.Programa.FechaFin = vFechaFin;
                                }
                                if (oCompraOT.CveOrdenTrabajo.Programa != undefined && oCompraOT.CveOrdenTrabajo.Programa.FechaInicio != null && oCompraOT.CveOrdenTrabajo.Programa.FechaInicio != undefined && oCompraOT.CveOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                                    var vFechaInicio = new Date(new Number(oCompraOT.CveOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                                    oCompraOT.CveOrdenTrabajo.Programa.FechaInicio = vFechaInicio;
                                }
                            }
                            oc.push(oCompraOT);
                            var data = new CompraOTS(oc, sessionStorage.userDomain, GenerateTransac());
                            executeSyncRequest(wsMtdCompraOT, JSON.stringify(data, null, 2), successCompraOT, myErrorCompraOT);
                        }
                        break;
                    }
                }
            }
        }
    }
}
var successCompraOT = function (data, status) {

    if (data.d != undefined) {
        if (data.d == true) {
            alertModal("La Compra de la OT y su envio a iNEWs se ha realizado con éxito.");
        } else {
            alertModal("Ocurrio un Error al Comprar la OT");
        }
    }
}

function insertaLogistica(NumRow, NumOT, vActualizaOT) {
    var oLogistica = new THE_Logistica();
    if ($("#GridHeader").children() != undefined && $("#GridHeader").children().length > 0) {
        for (var index = 0; index < $("#GridHeader").children().length; index++) {
            if (index != 0) {
                for (var indexP = 0; indexP < $($("#GridHeader").children()[index]).children().length; indexP++) {
                    if ((indexP + 1) == NumRow) {
                        var bValidaLugar = false;
                        var bValidaindicaciones = false;
                        oLogistica.CveOrdenTrabajo = new THE_OrdenTrabajo()
                        oLogistica.CveOrdenTrabajo.CveOrdenTrabajo = NumOT;

                        var TimeIni = "";
                        var TimeFin = "";
                        for (var indexC = 0; indexC < $($($("#GridHeader").children()[index]).children()[indexP]).children().length; indexC++) {
                            if (indexC != 0) {
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("hdrHoraIni") == 0 && jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != "") {
                                    TimeIni = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    var dtP1 = new Date();
                                    dtP1.setHours(Number(TimeIni.split(':')[0]), Number(TimeIni.split(':')[1]), Number(TimeIni.split(':')[2]));
                                    oLogistica.FechaEvento = dtP1;
                                }
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("hdrHoraFin") == 0 && jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != "") {
                                    TimeFin = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    var dtP2 = new Date();
                                    dtP2.setHours(Number(TimeFin.split(':')[0]), Number(TimeFin.split(':')[1]), Number(TimeFin.split(':')[2]));
                                    oLogistica.FechaFin = dtP2;
                                }
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtLugar") == 0 && jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != "") {
                                    oLogistica.Lugar = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    if (vActualizaOT == true && $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveLogistica") != undefined) {
                                        oLogistica.CveLogistica = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveLogistica");
                                    } else {
                                        if (vActualizaOT == true && $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveLogistica") == undefined) {
                                            vActualizaOT = false;
                                        }
                                    }
                                    bValidaLugar = true;
                                }
                                if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtIndicaciones") == 0 && jQuery.trim($($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val()) != "") {
                                    oLogistica.Objetivo = $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).val();
                                    bValidaindicaciones = true;
                                }
                            }
                        }
                        if (bValidaLugar == true && bValidaindicaciones == true) {
                            if (!vActualizaOT) {
                                strListaCveOTValidas = strListaCveOTValidas + NumRow.toString() + "|";
                                var data = new GuardarLogistica(oLogistica);
                                executeSyncRequest(wsMtdGuardarLogistica, JSON.stringify(data, null, 2), successGuardaLogistica, myErrorGuardaLogistica);
                            } else {
                                var data = new ActualizaLogistica(oLogistica);
                                executeSyncRequest(wsMtdActualizaLogistica, JSON.stringify(data, null, 2), successActualizaLogistica, myErrorActualizaLogistica);
                            }
                        }

                        break;
                    }
                }
            }
        }
    }
}
var successGuardaLogistica = function (data, status) {

    if (data.d != undefined && data.d != -1) {
        if ($("#GridHeader").children() != undefined && $("#GridHeader").children().length > 0) {
            for (var index = 0; index < $("#GridHeader").children().length; index++) {
                if (index != 0) {
                    for (var indexP = 0; indexP < $($("#GridHeader").children()[index]).children().length; indexP++) {
                        if ((indexP + 1) == Number(strListaCveOTValidas.split('|')[0])) {

                            for (var indexC = 0; indexC < $($($("#GridHeader").children()[index]).children()[indexP]).children().length; indexC++) {
                                if (indexC != 0) {
                                    if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtLugar") == 0) {
                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveLogistica", data.d);
                                    }
                                    if ($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0].id.indexOf("txtIndicaciones") == 0) {
                                        $($($($($("#GridHeader").children()[index]).children()[indexP]).children()[indexC]).children()[0]).attr("data-CveLogistica", data.d);
                                    }
                                }
                            }
                            if ((strListaCveOTValidas.split('|').length > 0)) {
                                if (jQuery.trim((strListaCveOTValidas.toString().split('|'))[0].toString()).length > 0) {

                                    if (strListaCveOTValidas.indexOf((strListaCveOTValidas.split('|'))[ContadorOT].toString() + "|") == 0) {
                                        strListaCveOTValidas = strListaCveOTValidas.substr(((strListaCveOTValidas.split('|'))[ContadorOT].toString() + "|").length);
                                    }
                                }
                            }

                            break;
                        }
                    }
                }
            }
        }
    }
}
var successActualizaLogistica = function (data, status) {

}
function ObtenerEquipoReportero(lstEquipo) {
    for (var i = 0; i < lstEquipo.length; i++) {
        if (lstEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 1) {
            return lstEquipo[i];
        }
    }
    return undefined;
}
function ObtenerEquipoCamarografo(lstEquipo) {
    for (var i = 0; i < lstEquipo.length; i++) {
        if (lstEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 2) {
            return lstEquipo[i];
        }
    }
    return undefined;
}
function ObtenerEquipoEditor(lstEquipo) {
    for (var i = 0; i < lstEquipo.length; i++) {
        if (lstEquipo[i].PuestoLlavePrimaria.PuestoLlavePrimaria == 94) {
            return lstEquipo[i];
        }
    }
    return undefined;
}
function btnGuardar_Click() {
    arrOTS = new Array();
    try {

        if (!ValidaPermisosGuardaDuplica(sessionStorage.userPuestos))
            return;

        if ($("#cboLocales").val() == 36 && $('option:selected', '#cboSecciones').index() <= 0) {
            alertModal("Se debe de seleccionar una sección primero para poder guardar las OT's");
            return;
        }
        if ($('option:selected', '#cboLocales').index() <= 0) {
            alertModal("Necesita seleccionar una local");
            return;
        }
        var ValidaDatosMasivos = true;
        GuardadoMasivo = true;

        strListaOTValidas = "";
        gblMensaje = "";
        var sMensajePrin = "El proceso de guardado fue cancelado debido a que falta un dato requerido: \n";
        if (!ValidaCamposOT(-1)) {
            if (gblMensaje != "") {
                alertModal(sMensajePrin + gblMensaje);
            } else {
                alertModal(sMensajePrin);
            }

        } else {

            GuardaMasivo(-1);
        }

    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}

var successOdenTrabajoMultiple = function (data, status) {
    if (data.d != undefined && data.d.lenght > 0) {
        CreaHeaderGRIDFound(data.d)
    }
}
function CreaHeaderGRIDFound(vDatos) {
    var NumOts = 0;
    NumOts = Number($("#MainContent_HiddtxtNumOT").val());

    if (NumOts >= 2 && NumOts <= 99) {
        fncCreaHeaderGRIDFound(vDatos);
    }
    else
        alertModal("El número de OTs a crear no puede ser menor a 2 o mayor a 99");
}

function btnBuscarClient_Click() {
    if (Number($('#MainContent_hiddSecc').val()) != 9) {
        return;
    }
    var data = "{ 'idSeccion':" + $('#MainContent_hiddSecc').val() + " }";
    executeSyncRequest(wsMtdObtTiposNotaBySecc, data, successTipoNotafound, myErrorManejador);
}
var successTipoNotafound = function (data, status) {

    try {
        if (data.d.length > 0) {
            oLstTipoNota = data.d;
            CreaHeaderGRIDFound(arrOTS);
        }
        else {
            alertModal("No se cargaron adecuadamente los tipos de nota.");

        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");

    }
}

function CreaRowGridfound(index, Seccion, Numfila, vDatos) {
    var MyDiv = "";
    var vFechaActual = new Date();
    var vNumfila = (Numfila + 1);

    if (index < 8) {
        switch (index) {
            case 0: //Numero de Fila
                MyDiv = MyDiv + "<div style='width:25px' class='varFloatLeft varClearLeft'>" + vNumfila + "</div>";
                break;
            case 1: //Titulo
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtTitulo_" + vNumfila + "' value = '" + vDatos.OrdenTrabajo.Titulo + "'/></div>";
                break;
            case 2:
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtDescripcion_" + vNumfila + "' value = '" + vDatos.OrdenTrabajo.Objetivo + "'/></div>";
                break;
            case 3:
                var vfechaAgen = new Date(Date.parse($("#MainContent_dpFechaBusq").val().toString().split('/')[1] + '/' + $("#MainContent_dpFechaBusq").val().toString().split('/')[0] + '/' + $("#MainContent_dpFechaBusq").val().toString().split('/')[2]));
                $("#MainContent_dpFechaBusq").datepicker({
                    minDate: 0
                });
                $('#MainContent_dpFechaBusq').datepicker("setDate", vfechaAgen);

                MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input type='text'  readonly='readonly' id= 'dpFechaAgenda_" + vNumfila + "' class='toDatePicker txtFechas2 varMarginLeft20p' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "' value='" + $("#MainContent_dpFechaBusq").datepicker("getDate").esMXFormat() + "'/></div>";
                break;
            case 4:
                if (vDatos.Reportero.EmpleadoLlavePrimaria != 0) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input type='text' id = 'txtReportero_" + vNumfila + "' class = 'autoCompleteRe cmb90' data-OtOrAct = 'ACT' data-CveEqui ='' value ='" + vDatos.Reportero.EmpleadoNombre + "' data-CveEmpl = '" + vDatos.Reportero.EmpleadoLlavePrimaria + "'/></div>";
                } else {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input type='text' id = 'txtReportero_" + vNumfila + "' class = 'autoCompleteRe cmb90' data-OtOrAct = 'ACT' data-CveEqui =''/></div>";
                }
                break;
            case 5:
                if (vDatos.Camarografo.EmpleadoLlavePrimaria != 0) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input type='text' id = 'txtCamarografo_" + vNumfila + "' class='autoCompleteCamara cmb90' data-OtOrAct = 'ACT' data-CveEqui ='' value ='" + vDatos.Camarografo.EmpleadoNombre + "' data-CveEmpl = '" + vDatos.Camarografo.EmpleadoLlavePrimaria + "'/></div>";
                } else {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input type='text' id = 'txtCamarografo_" + vNumfila + "' class='autoCompleteCamara cmb90' data-OtOrAct = 'ACT' data-CveEqui =''/></div>";
                }
                break;
            case 6:
                if (vDatos.Editor.EmpleadoLlavePrimaria != 0) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input type='text' id = 'txtEditor_" + vNumfila + "' class='autoCompleteEditor cmb90' data-OtOrAct = 'ACT' data-CveEqui ='' value ='" + vDatos.Editor.EmpleadoNombre + "' data-CveEmpl = '" + vDatos.Editor.EmpleadoLlavePrimaria + "'/></div>";
                } else {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input type='text' id = 'txtEditor_" + vNumfila + "' class='autoCompleteEditor cmb90' data-OtOrAct = 'ACT' data-CveEqui =''/></div>";
                }
                break;
            case 7:
                var myOptions;
                $.each(oLstTipoNota, function (indexSelect, Opt) {
                    if (vDatos.OrdenTrabajo.CveTipoNota != undefined && vDatos.OrdenTrabajo.CveTipoNota != null) {
                        if (Opt.TinoLlPr == vDatos.OrdenTrabajo.CveTipoNota.CveTipoNota) {
                            myOptions = myOptions + "<option value='" + Opt.TinoLlPr + "' selected = 'selected'>" + Opt.TinoAbre + "</option>";
                        } else {
                            myOptions = myOptions + "<option value='" + Opt.TinoLlPr + "' >" + Opt.TinoAbre + "</option>";
                        }
                    } else {
                        myOptions = myOptions + "<option value='" + Opt.TinoLlPr + "' >" + Opt.TinoAbre + "</option>";
                    }

                });

                MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><select class='cmb90' id ='cboTipoNota_" + vNumfila + "' >" + myOptions + "</select></div>";
                break;

        }
        return MyDiv;

    } else {
        switch (Seccion) {
            case 9:

                if (index == 8) {
                    if (vDatos.Logistica != undefined && vDatos.Logistica != null && vDatos.Logistica.CveLogistica != undefined && vDatos.Logistica.CveLogistica != null && vDatos.Logistica.CveLogistica != 0) {
                        var vIniHours = "00:00:00";
                        if (vDatos.Logistica.FechaEvento != null && vDatos.Logistica.FechaEvento != undefined && vDatos.Logistica.FechaEvento.toString().indexOf('/Date') >= 0) {
                            var vFechaEvento = new Date(new Number(vDatos.Logistica.FechaEvento.substr(6, 13)));
                            vDatos.Logistica.FechaEvento = vFechaEvento;
                            var vhora;
                            var vminutos;
                            var vsegundos;
                            if (vFechaEvento.getHours().toString().length == 1) {
                                vhora = "0" + vFechaEvento.getHours().toString();
                            } else {
                                vhora = vFechaEvento.getHours().toString();
                            }
                            if (vFechaEvento.getMinutes().toString().length == 1) {
                                vminutos = "0" + vFechaEvento.getMinutes().toString();
                            } else {
                                vminutos = vFechaEvento.getMinutes().toString();
                            }
                            if (vFechaEvento.getSeconds().toString().length == 1) {
                                vsegundos = "0" + vFechaEvento.getSeconds().toString();
                            } else {
                                vsegundos = vFechaEvento.getSeconds().toString();
                            }
                            vIniHours = vhora + ":" + vminutos + ":" + vsegundos;
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input class='txtFechas2 timePicker varMarginLeft20p' type='text' id= 'hdrHoraIni_" + vNumfila + "' readonly='readonly' value ='" + vIniHours + "'/></div>";
                        } else {
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input class='txtFechas2 timePicker varMarginLeft20p' type='text' id= 'hdrHoraIni_" + vNumfila + "'  readonly='readonly' value ='00:00:00'/></div>";
                        }

                    } else {
                        MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input class='txtFechas2 timePicker varMarginLeft20p' type='text' id= 'hdrHoraIni_" + vNumfila + "' readonly='readonly' value ='00:00:00'/></div>";
                    }
                }
                if (index == 9) {
                    if (vDatos.Logistica != undefined && vDatos.Logistica != null && vDatos.Logistica.CveLogistica != undefined && vDatos.Logistica.CveLogistica != null && vDatos.Logistica.CveLogistica != 0) {
                        var vFinHours = "00:00:00";
                        if (vDatos.Logistica.FechaFin != null && vDatos.Logistica.FechaFin != undefined && vDatos.Logistica.FechaFin.toString().indexOf('/Date') >= 0) {
                            var vFechaFin = new Date(new Number(vDatos.Logistica.FechaFin.substr(6, 13)));
                            vDatos.Logistica.FechaFin = vFechaFin;
                            var vhora;
                            var vminutos;
                            var vsegundos;
                            if (vFechaFin.getHours().toString().length == 1) {
                                vhora = "0" + vFechaFin.getHours().toString();
                            } else {
                                vhora = vFechaFin.getHours().toString();
                            }
                            if (vFechaFin.getMinutes().toString().length == 1) {
                                vminutos = "0" + vFechaFin.getMinutes().toString();
                            } else {
                                vminutos = vFechaFin.getMinutes().toString();
                            }
                            if (vFechaFin.getSeconds().toString().length == 1) {
                                vsegundos = "0" + vFechaFin.getSeconds().toString();
                            } else {
                                vsegundos = vFechaFin.getSeconds().toString();
                            }
                            vFinHours = vhora + ":" + vminutos + ":" + vsegundos;

                            MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input class='txtFechas2 timePicker varMarginLeft20p' type='text' id= 'hdrHoraFin_" + vNumfila + "' readonly='readonly' value ='" + vFinHours + "'/></div>";
                        } else {
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input class='txtFechas2 timePicker varMarginLeft20p' type='text' id= 'hdrHoraFin_" + vNumfila + "' readonly='readonly' value ='00:00:00'/></div>";
                        }
                    } else {
                        MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><input class='txtFechas2 timePicker varMarginLeft20p' type='text' id= 'hdrHoraFin_" + vNumfila + "' readonly='readonly' value ='00:00:00'/></div>";
                    }
                }
                if (index == 10) {
                    if (vDatos.Logistica != undefined && vDatos.Logistica != null && vDatos.Logistica.CveLogistica != undefined && vDatos.Logistica.CveLogistica != null && vDatos.Logistica.CveLogistica != 0) {
                        if (vDatos.Logistica.Lugar != undefined && vDatos.Logistica.Lugar != null) {
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtLugar_" + vNumfila + "' value ='" + vDatos.Logistica.Lugar + "' data-CveLogistica ='" + vDatos.Logistica.CveLogistica + "'/></div>";
                        } else {
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtLugar_" + vNumfila + "' data-CveLogistica ='" + vDatos.Logistica.CveLogistica + "'/></div>";
                        }
                    } else {
                        MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtLugar_" + vNumfila + "'/></div>";
                    }
                }
                if (index == 11) {
                    if (vDatos.Logistica != undefined && vDatos.Logistica != null && vDatos.Logistica.CveLogistica != undefined && vDatos.Logistica.CveLogistica != null && vDatos.Logistica.CveLogistica != 0) {
                        if (vDatos.Logistica.Objetivo != undefined && vDatos.Logistica.Objetivo != null) {
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtIndicaciones_" + vNumfila + "' value = '" + vDatos.Logistica.Objetivo + "' data-CveLogistica ='" + vDatos.Logistica.CveLogistica + "'/></div>";
                        } else {
                            MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtIndicaciones_" + vNumfila + "' data-CveLogistica ='" + vDatos.Logistica.CveLogistica + "'/></div>";
                        }
                    } else {
                        MyDiv = MyDiv + "<div class='divSeccMultipleOTLG2'><input class='cmb90' type='text' id= 'txtIndicaciones_" + vNumfila + "'/></div>";
                    }
                }
                if (index == 12) {
                    var vCveAgendaSemanal;

                    MyDiv = MyDiv + "<div class='varWidth103 varFloatLeft'><label class='title' id='lblOT_" + vNumfila + "' >" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "</label><input class='varFloatLeft varClearRight' type='button' id='btnActualizarOT_" + vNumfila + "'  data-OtOrAct='ACT' data-Ot='" + vDatos.OrdenTrabajo.CveOrdenTrabajo + "' data-OtraCvec='" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "'  style = 'visibility:hidden' /><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:visible;'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder varFloatLeft'  data-OtOrAct='ACT' data-Ot='" + vDatos.OrdenTrabajo.CveOrdenTrabajo + "' data-OtraCvec='" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "'/></div></div>";
                }

                break;
            case 5, 8:
                if (index == 8) {
                    var myOptions;
                    $.each(lstProgramaEmpleado, function (indexSelect, Opt) {
                        if (vDatos.OrdenTrabajo.Programa != null && vDatos.OrdenTrabajo.Programa != undefined && vDatos.OrdenTrabajo.Programa.CvePrograma == Opt.CvePrograma.CvePrograma) {
                            myOptions = myOptions + "<option value='" + Opt.CvePrograma.CvePrograma + "' data-CveEmpl = '" + Opt.CveEmpleado.EmpleadoLlavePrimaria + "' data-AztecaAmerica = '" + Opt.CvePrograma.EsAztecaAmerica + "' data-DeporteContacto = '" + Opt.CvePrograma.EsDeporteContacto + "' selected = 'selected'>" + Opt.CvePrograma.NombrePrograma + "</option>";
                        } else {
                            myOptions = myOptions + "<option value='" + Opt.CvePrograma.CvePrograma + "' data-CveEmpl = '" + Opt.CveEmpleado.EmpleadoLlavePrimaria + "' data-AztecaAmerica = '" + Opt.CvePrograma.EsAztecaAmerica + "' data-DeporteContacto = '" + Opt.CvePrograma.EsDeporteContacto + "'>" + Opt.CvePrograma.NombrePrograma + "</option>";
                        }


                    });
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><select class='cmb90' id ='cboPrograma_" + vNumfila + "' >" + myOptions + "</select></div>";
                }
                if (index == 9) {
                    var myOptions;
                    $.each(lstFormato, function (indexSelect, Opt) {

                        myOptions = myOptions + "<option value='" + Opt.CveFormato.CveFormato + "' data-CveSeccion = '" + Opt.CveSeccion.CveSeccion + "'>" + Opt.CveFormato.Descripcion + "</option>";

                    });
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><select class='cmb90' id ='cboFormato_" + vNumfila + "' >" + myOptions + "</select></div>";

                }
                if (index == 10) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><label class='title' id='lblOT_" + vNumfila + "' >" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "</label><input type='button' id='btnActualizarOT_" + vNumfila + "' class = 'btnNuevaOTNoBorder' data-OtOrAct='ACT' data-Ot='" + vDatos.OrdenTrabajo.CveOrdenTrabajo + "' data-OtraCvec='" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "' style = 'visibility:hidden'/><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:visible'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder'  data-OtOrAct='ACT' data-Ot='" + vDatos.OrdenTrabajo.CveOrdenTrabajo + "' data-OtraCvec='" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "'/></div></div>";
                }
                break;
            default:
                if (index == 8) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><label class='title' id='lblOT_" + vNumfila + "' >" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "</label><input type='button' id='btnActualizarOT_" + vNumfila + "' class = 'btnNuevaOTNoBorder' data-OtOrAct='ACT' data-Ot='" + vDatos.OrdenTrabajo.CveOrdenTrabajo + "' data-OtraCvec='" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "' style = 'visibility:hidden'/><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:visible'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder'  data-OtOrAct='ACT' data-Ot='" + vDatos.OrdenTrabajo.CveOrdenTrabajo + "' data-OtraCvec='" + vDatos.OrdenTrabajo.ClaveOrdenTrabajo + "' data-CveAgenda = '" + vDatos.Agenda.CveAgendaSemanal + "'/></div></div>";
                }

                break;
        }
        return MyDiv;
    }

}
function fncCreaHeaderGRIDFound(source) {
    try {
      
        var NumOts = 0;
        NumOts = Number($("#MainContent_HiddtxtNumOT").val());
        /*Creacion de la Estructura Inicial del Grid*/
        $("#GridHeader").children().remove();
        var MyDiv = "";

        switch (Number($('#MainContent_hiddSecc').val())) {
            case 9:     //Deportes - 13 Columnas
                MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                for (var j = 0; j < 13; j++) {
                    MyDiv = MyDiv + CreaTitulosHeader(j, 9);

                }
                MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                $("#GridHeader").append(MyDiv);

                break;
            case 8:    //Programas - 11 Columnas
                MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                for (var j = 0; j < 11; j++) {
                    MyDiv = MyDiv + CreaTitulosHeader(j, 8);

                }
                MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                $("#GridHeader").append(MyDiv);

                break;
            default: //9 Columnas
                MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                for (var j = 0; j < 9; j++) {
                    MyDiv = MyDiv + CreaTitulosHeader(j, -1);

                }
                MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                $("#GridHeader").append(MyDiv);
                break;
        }

        MyDiv = "";
        for (var h = 0; h < source.length; h++) {
            MyDiv = MyDiv + "<Div>"; // Crea el renglon

            switch (Number($('#MainContent_hiddSecc').val())) {
                case 9:     //Deportes - 13 Columnas
                    for (var j = 0; j < 13; j++) {

                        MyDiv = MyDiv + CreaRowGridfound(j, 9, h, source[h]);

                    }
                    break;
                case 8:    //Programas - 11 Columnas

                    for (var j = 0; j < 11; j++) {
                        MyDiv = MyDiv + CreaRowGridfound(j, 8, h, source[h]);

                    }
                    break;

                case 5:    //Programas - 11 Columnas

                    for (var j = 0; j < 11; j++) {
                        MyDiv = MyDiv + CreaRowGridfound(j, 8, h, source[h]);

                    }
                    break;
                default: //9 Columnas
                    //                    MyDiv = "<div>" //Inicio el renglon del encabezado
                    for (var j = 0; j < 9; j++) {
                        MyDiv = MyDiv + CreaRowGridfound(j, -1, h, source[h]);
                    }
                    break;
            }

            MyDiv = MyDiv + "</Div>"; //Cierra el renglon
        }
        $("#GridHeader").append("<Div class='divMultipleOTContainer'>" + MyDiv + "</Div>");
        $(".divMultipleOTContainer").css('height', getMaxFloatableHeigth() - 140);
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function btnImprimir_Click() {
    arrOTS = new Array();
    try {
        var cadena = "";
        var fecha = $('#MainContent_dpFechaBusq').datepicker("getDate");
        var cveEmpl = Number(sessionStorage.numUsuario);
        var cveSecc = Number($('option:selected', '#cboSecciones').val());

        if (cadena != "")
            cadena = cadena + "&cveEmpl=" + cveEmpl.toString();
        else
            cadena = "cveEmpl=" + cveEmpl.toString();

        if (cadena != "")
            cadena = cadena + "&Fecha=" + fecha.esMXFormat();
        else
            cadena = "Fecha=" + fecha.esMXFormat();

        if (cadena != "")
            cadena = cadena + "&IdSecc=" + cveSecc.toString();
        else
            cadena = "IdSecc=" + cveSecc.toString();
        window.open('../../Impresiones/OtMultipleImprimir.aspx?' + cadena, 'ventana1', 'width=120,height=300,scrollbars=NO');
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }

}
function getTipoNotaBySecc() {
    var data = "{ 'idSeccion':" + $('option:selected', '#cboSecciones').val() + " }";
    executeSyncRequest(wsMtdObtTiposNotaBySecc, data, successTipoNota, myErrorTipoNota);
}
var successTipoNota = function (data, status) {

    try {
        if (data.d.length > 0) {

            oLstTipoNota = data.d;
            if (arrOTS.length == 0) {
                CreaHeaderGRID();
                $("#MainContent_btnUpdateEquipo").click();
            }
        }
        else {
            alertModal("No se cargaron adecuadamente los tipos de nota.");
        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function CreaTitulosHeader(index, Seccion) {
    var MyDiv = "";
    if (index < 8) {
        switch (index) {
            case 0:
                MyDiv = MyDiv + "<div style='width:15px; height:25px' class='varFloatLeft'></div>";
                break;
            case 1:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Titulo</div>";
                break;
            case 2:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Descripcion</div>";
                break;
            case 3:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>Fecha Agenda</div>";
                break;
            case 4:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Reportero</div>";
                break;
            case 5:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Camarografo</div>";
                break;
            case 6:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Editor de Campo</div>";
                if ($("#cboLocales").val() != 36) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Programa</div>";
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Formato</div>";
                }
                break;
            case 7:
                MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>Tipo de Nota</div>";
                break;

        }
        return MyDiv;

    } else {
        switch (Seccion) {
            case 9:
                if (index == 8) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>Hora Inicio</div>";
                }
                if (index == 9) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>Hora Fin</div>";
                }
                if (index == 10) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Lugar</div>";
                }
                if (index == 11) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Indicaciones</div>";
                }
                if (index == 12) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>No. OT</div>";
                }

                break;
            case 8:
                if (index == 8) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Programa</div>";
                }
                if (index == 9) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTLG'>Formato</div>";
                }
                if (index == 10) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>No. OT</div>";
                }
                break;
            default:
                if (index == 8) {
                    MyDiv = MyDiv + "<div class='divTitlesMultipleOTsm'>No. OT</div>";
                }

                break;
        }
        return MyDiv;
    }
}
function CreaRowGrid(index, Seccion, Numfila) {
    var MyDiv = "";
    var vFechaActual = new Date();
    var vNumfila = (Numfila + 1);
    if (index < 8) {
        switch (index) {
            case 0: //Numero de Fila
                MyDiv = MyDiv + "<div style='width:15px' class='varFloatLeft varClearLeft'>" + vNumfila + "</div>";
                break;
            case 1: //Titulo
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class='divInputMultipleOT' type='text' id= 'txtTitulo_" + vNumfila + "'/></div>";
                break;
            case 2:
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class='divInputMultipleOT' type='text' id= 'txtDescripcion_" + vNumfila + "'/></div>";
                break;
            case 3:
                MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><input class='txtFechas2 toDatePicker varMarginLeft20p' type='text'  readonly='readonly' id= 'dpFechaAgenda_" + vNumfila + "' data-CveAgenda = '' value='" + vFechaActual.esMXFormat() + "'/></div>";
                break;
            case 4:
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class='divInputMultipleOT autoCompleteRe' type='text' id = 'txtReportero_" + vNumfila + "' data-OtOrAct = 'OT' data-CveEqui =''/></div>";
                break;
            case 5:
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class='divInputMultipleOT autoCompleteCamara' type='text' id = 'txtCamarografo_" + vNumfila + "' data-OtOrAct = 'OT' data-CveEqui =''/></div>";
                break;
            case 6:
                MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class='divInputMultipleOT autoCompleteEditor' type='text' id = 'txtEditor_" + vNumfila + "' data-OtOrAct = 'OT' data-CveEqui =''/></div>";

                if ($("#cboLocales").val() != 36) {
                    var myOptions;
                    $.each(lstProgramaEmpleado, function (indexSelect, Opt) {
                        myOptions = myOptions + "<option value='" + Opt.CvePrograma.CvePrograma + "' data-CveEmpl = '" + Opt.CveEmpleado.EmpleadoLlavePrimaria + "' data-AztecaAmerica = '" + Opt.CvePrograma.EsAztecaAmerica + "' data-DeporteContacto = '" + Opt.CvePrograma.EsDeporteContacto + "'>" + Opt.CvePrograma.NombrePrograma + "</option>";
                    });
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm2'><select class='cmb90' id ='cboPrograma_" + vNumfila + "' >" + myOptions + "</select></div>";

                    myOptions = '';
                    $.each(lstFormato, function (indexSelect, Opt) {
                        myOptions = myOptions + "<option value='" + Opt.CveFormato.CveFormato + "' data-CveSeccion = '" + Opt.CveSeccion.CveSeccion + "'>" + Opt.CveFormato.Descripcion + "</option>";
                    });
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG' ><select class='cmb90' id ='cboFormato_" + vNumfila + "' >" + myOptions + "</select></div>";

                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><label class='title' id='lblOT_" + vNumfila + "' ></label><input type='button' id='btnActualizarOT_" + vNumfila + "' class = 'btnNuevaOTNoBorder' data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = '' value ='OT'/><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:hidden'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder'  data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = ''/></div></div>";
                }
                break;
            case 7:
                var myOptions;
                $.each(oLstTipoNota, function (indexSelect, Opt) {

                    myOptions = myOptions + "<option value='" + Opt.TinoLlPr + "'>" + Opt.TinoAbre + "</option>";

                });

                MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><select class='cmb90' id ='cboTipoNota_" + vNumfila + "' >" + myOptions + "</select></div>";
                break;
        }

        return MyDiv;

    } else {
        switch (Seccion) {
            case 9:

                if (index == 8) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><input type='text' id= 'hdrHoraIni_" + vNumfila + "' class ='txtFechas2 timePicker varMarginLeft20p' readonly='readonly' value ='00:00:00'/></div>";
                }
                if (index == 9) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><input type='text' id= 'hdrHoraFin_" + vNumfila + "' class ='txtFechas2 timePicker varMarginLeft20p' readonly='readonly' value ='00:00:00'/></div>";
                    //                    MyDiv = MyDiv + "<div class='divSeccMultipleOT'><input type='text' id= 'hdrHoraFin_" + vNumfila + "' class ='txtFechas2 timePicker varMarginLeft20p' readonly='readonly' value ='00:00:00'/></div>";
                }
                if (index == 10) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class ='divInputMultipleOT' type='text' id= 'txtLugar_" + vNumfila + "'/></div>";
                }
                if (index == 11) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><input class ='divInputMultipleOT' type='text' id= 'txtIndicaciones_" + vNumfila + "'/></div>";
                }
                if (index == 12) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><label class='title' id='lblOT_" + vNumfila + "' ></label><input type='button' id='btnActualizarOT_" + vNumfila + "' class = 'btnNuevaOTNoBorder'  data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = '' value ='OT'/><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:hidden'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder'  data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = ''/></div></div>";
                }
                break;
            case 5, 8:
                if (index == 8) {
                    var myOptions;
                    $.each(lstProgramaEmpleado, function (indexSelect, Opt) {

                        myOptions = myOptions + "<option value='" + Opt.CvePrograma.CvePrograma + "' data-CveEmpl = '" + Opt.CveEmpleado.EmpleadoLlavePrimaria + "' data-AztecaAmerica = '" + Opt.CvePrograma.EsAztecaAmerica + "' data-DeporteContacto = '" + Opt.CvePrograma.EsDeporteContacto + "'>" + Opt.CvePrograma.NombrePrograma + "</option>";

                    });
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG'><select class='cmb90' id ='cboPrograma_" + vNumfila + "' >" + myOptions + "</select></div>";
                }
                if (index == 9) {
                    var myOptions;
                    $.each(lstFormato, function (indexSelect, Opt) {

                        myOptions = myOptions + "<option value='" + Opt.CveFormato.CveFormato + "' data-CveSeccion = '" + Opt.CveSeccion.CveSeccion + "'>" + Opt.CveFormato.Descripcion + "</option>";

                    });
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTLG' ><select class='cmb90' id ='cboFormato_" + vNumfila + "' >" + myOptions + "</select></div>";

                }
                if (index == 10) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><label class='title' id='lblOT_" + vNumfila + "' ></label><input type='button' id='btnActualizarOT_" + vNumfila + "' class = 'btnNuevaOTNoBorder' data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = '' value ='OT'/><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:hidden'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder'  data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = ''/></div></div>";
                }
                break;
            default:
                if (index == 8) {
                    MyDiv = MyDiv + "<div class='divSeccMultipleOTsm'><label class='title' id='lblOT_" + vNumfila + "' ></label><input type='button' id='btnActualizarOT_" + vNumfila + "' class = 'btnNuevaOTNoBorder' data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = '' value ='OT'/><div id ='dvActualizar_" + vNumfila + "' style = 'visibility:hidden'><input type='button' id='btnActualizarOT2_" + vNumfila + "' class = 'btnGuardarNoBorder'  data-OtOrAct='OT' data-Ot='' data-OtraCvec='' data-CveAgenda = ''/></div></div>";
                }

                break;
        }
        return MyDiv;
    }

}
function fncCreaHeaderGRID() {
    try {
        var NumOts = 0;
        
        NumOts = Number($("#txtNumOT").val());
        /*Creacion de la Estructura Inicial del Grid*/
        $("#GridHeader").children().remove();
        var MyDiv = "";

        if ($("#cboLocales").val() == 36) {
            switch (Number($('option:selected', '#cboSecciones').val())) {
                case 9:     //Deportes - 13 Columnas
                    MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                    for (var j = 0; j < 13; j++) {
                        MyDiv = MyDiv + CreaTitulosHeader(j, 9);

                    }
                    MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                    $("#GridHeader").append(MyDiv);

                    break;
                case 8:    //Programas - 11 Columnas
                    MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                    for (var j = 0; j < 11; j++) {
                        MyDiv = MyDiv + CreaTitulosHeader(j, 8);

                    }
                    MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                    $("#GridHeader").append(MyDiv);

                    break;
                case 5:    //Espectaculos - 11 Columnas
                    MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                    for (var j = 0; j < 11; j++) {
                        MyDiv = MyDiv + CreaTitulosHeader(j, 8);

                    }
                    MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                    $("#GridHeader").append(MyDiv);

                    break;
                default: //9 Columnas
                    MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
                    for (var j = 0; j < 9; j++) {
                        MyDiv = MyDiv + CreaTitulosHeader(j, -1);

                    }
                    MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
                    $("#GridHeader").append(MyDiv);
                    break;
            }
        }
        else { 
            MyDiv = "<div class='divTitlesMultipleOTContainer'>" //Inicio el renglon del encabezado
            for (var j = 0; j < 7; j++) 
                MyDiv = MyDiv + CreaTitulosHeader(j, -1);
            MyDiv = MyDiv + "</div>"; //cierra el renglon de los encabezados
            $("#GridHeader").append(MyDiv);
        }
            

        MyDiv = "";
        for (var h = 0; h < NumOts; h++) {
            MyDiv = MyDiv + "<Div>"; // Crea el renglon

            if ($("#cboLocales").val() == 36) {
                switch (Number($('option:selected', '#cboSecciones').val())) {
                    case 9:     //Deportes - 13 Columnas
                        for (var j = 0; j < 13; j++) {
                            MyDiv = MyDiv + CreaRowGrid(j, 9, h);

                        }
                        break;
                    case 8:    //Programas - 11 Columnas

                        for (var j = 0; j < 11; j++) {
                            MyDiv = MyDiv + CreaRowGrid(j, 8, h);

                        }
                        break;

                    case 5:    //Espectaculos - 11 Columnas

                        for (var j = 0; j < 11; j++) {
                            MyDiv = MyDiv + CreaRowGrid(j, 8, h);

                        }
                        break;
                    default: //9 Columnas
                        // MyDiv = "<div>" //Inicio el renglon del encabezado
                        for (var j = 0; j < 9; j++) {
                            MyDiv = MyDiv + CreaRowGrid(j, -1, h);

                        }
                        break;
                }
            }
            else {
                for (var j = 0; j < 7; j++)
                    MyDiv = MyDiv + CreaRowGrid(j, -1, h);
            }
            MyDiv = MyDiv + "</Div>"; //Cierra el renglon
        }
        $("#GridHeader").append("<Div class='divMultipleOTContainer'>" + MyDiv + "</Div>");
        $(".divMultipleOTContainer").css('height', getMaxFloatableHeigth() - 140);
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function CreaHeaderGRID() {
    var NumOts = 0;
    NumOts = Number($("#txtNumOT").val());
    if (NumOts >= 2 && NumOts <= 99) {
        fncCreaHeaderGRID();
    } else {
        alertModal("El número de OTs a crear no puede ser menor a 2 o mayor a 99");
    }
}
function BindFormato() {
    data = "{ 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdoObtenerSeccionFormatoXIDEmpleado, data, successObtenerSeccionFormatoXIDEmpleado, myErrorSeccionXIEmpl);
}
var successObtenerSeccionFormatoXIDEmpleado = function (data, status) {
    lstFormato = new Array();
    var oNSeccionFormato;
    var oNSeccion;
    var oNFormato;
    var oNEmpleado;

    try {

        if (data.d.length > 0) {
            for (var i = 0; i < data.d.length; i++) {
                oNSeccionFormato = new TDI_SeccionFormato();
                oNSeccion = new TDI_Seccion();
                oNFormato = new TDI_Formato();
                oNEmpleado = new TDI_EMPL();

                oNSeccion.Cade = data.d[i].CveSeccion.Cade;
                oNSeccion.ColorSeccion = data.d[i].CveSeccion.ColorSeccion;
                oNSeccion.CveSeccion = data.d[i].CveSeccion.CveSeccion;
                oNEmpleado.EmpleadoLlavePrimaria = data.d[i].CveSeccion.EmpleadoLlavePrimaria.EmpleadoLlavePrimaria;
                oNEmpleado.EmpleadoNombre = data.d[i].CveSeccion.EmpleadoLlavePrimaria.EmpleadoNombre;
                oNEmpleado.EmpleadoStatus = data.d[i].CveSeccion.EmpleadoLlavePrimaria.EmpleadoStatus;
                oNEmpleado.EmpleadoTipo = data.d[i].CveSeccion.EmpleadoLlavePrimaria.EmpleadoTipo;
                oNEmpleado.EmpleadoUsr = data.d[i].CveSeccion.EmpleadoLlavePrimaria.EmpleadoUsr;
                oNSeccion.EmpleadoLlavePrimaria = oNEmpleado;
                oNSeccion.EstatusSeccion = data.d[i].CveSeccion.EstatusSeccion;
                oNSeccion.ExtensionResponsable = data.d[i].CveSeccion.ExtensionResponsable;
                oNSeccion.NombreSeccion = data.d[i].CveSeccion.NombreSeccion;
                oNSeccion.ResponsableSeccion = data.d[i].CveSeccion.ResponsableSeccion;
                oNSeccion.SeccionFIA = data.d[i].CveSeccion.SeccionFIA;
                oNFormato.CveFormato = data.d[i].CveFormato.CveFormato;
                oNFormato.Descripcion = data.d[i].CveFormato.Descripcion;
                oNFormato.Abreviatura = data.d[i].CveFormato.Abreviatura;
                oNFormato.Aplica = data.d[i].CveFormato.Aplica;
                oNFormato.Duracion = data.d[i].CveFormato.Duracion;
                oNFormato.INews = data.d[i].CveFormato.INews;

                oNSeccionFormato.CveFormato = oNFormato;
                oNSeccionFormato.CveSeccion = oNSeccion;

                lstFormato.push(oNSeccionFormato);
            }


        }
    }
    catch (ex) {

        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }

    oNSeccionFormato = null;
    oNSeccion = null;
    oNFormato = null;
    oNEmpleado = null;

}
function ConsultaProgramaEmpleado() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdconsultaPrgEmpl, data, successConsultaProgramaEmpleado, myError);
}
var successConsultaProgramaEmpleado = function (data, status) {
    programas = data.d;

    lstProgramaEmpleado = new Array();

    var oNuevo = new TDI_ProgramaEmpleado();
    var oNProg = new TDI_Programa();
    var oNEmpleado = new TDI_EMPL();
    var oNTipo = new TDI_TipoEmpleado();

    try {
        if (programas.length > 0) {
            for (var i = 0; i < programas.length; i++) {
                oNuevo = new TDI_ProgramaEmpleado();
                oNProg = new TDI_Programa();

                oNEmpleado = new TDI_EMPL();
                oNTipo = new TDI_TipoEmpleado();
                oNEmpleado.EmpleadoLlavePrimaria = programas[i].CveEmpleado.EmpleadoLlavePrimaria;
                oNEmpleado.EmpleadoNombre = programas[i].CveEmpleado.EmpleadoNombre;
                oNEmpleado.EmpleadoStatus = programas[i].CveEmpleado.EmpleadoStatus;
                oNTipo.DescripcionTipoEmpleado = programas[i].CveEmpleado.EmpleadoTipo.DescripcionTipoEmpleado;
                oNTipo.EmpleadoTipo = programas[i].CveEmpleado.EmpleadoTipo.EmpleadoTipo;
                oNEmpleado.EmpleadoUsr = programas[i].CveEmpleado.EmpleadoUsr;
                oNEmpleado.EmpleadoTipo = oNTipo;

                oNProg.Abreviatura = programas[i].CvePrograma.Abreviatura;
                oNProg.Abreviatura2 = programas[i].CvePrograma.Abreviatura2;
                oNProg.Canal = programas[i].CvePrograma.Canal;
                oNProg.CvePrograma = programas[i].CvePrograma.CvePrograma;
                oNProg.DiasTransmision = programas[i].CvePrograma.DiasTransmision;
                oNProg.EsFia = programas[i].CvePrograma.EsFia;
                oNProg.EsFiaNoticias = programas[i].CvePrograma.EsFiaNoticias;
                oNProg.EstatusPrograma = programas[i].CvePrograma.EstatusPrograma;
                oNProg.FechaFin = programas[i].CvePrograma.FechaFin;
                oNProg.FechaInicio = programas[i].CvePrograma.FechaInicio;
                oNProg.HoraTransmision = programas[i].CvePrograma.HoraTransmision;
                oNProg.IdCC = programas[i].CvePrograma.IdCC;
                oNProg.IdIBOP = programas[i].CvePrograma.IdIBOP;
                oNProg.NombreIBOP = programas[i].CvePrograma.NombreIBOP;
                oNProg.NombrePrograma = programas[i].CvePrograma.NombrePrograma;
                oNProg.EsAztecaAmerica = programas[i].CvePrograma.EsAztecaAmerica;
                oNProg.EsDeporteContacto = programas[i].CvePrograma.EsDeporteContacto;

                oNuevo.CveEmpleado = oNEmpleado;
                oNuevo.CvePrograma = oNProg;

                lstProgramaEmpleado.push(oNuevo);

            }
            BindFormato();
        }

    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }

    oNuevo = null;
    oNProg = null;
    oNEmpleado = null;
    oNTipo = null;
    if (ValidaPermisosLocales(sessionStorage.userPuestos) == true) {
        getLocales(successLocales, myError);
    } else {

        getLocales(successLocales, myError);
    }

    BindFormato();
}

var successReporteros = function (data, status) {
    try {
        if (data.d.length > 0) {
            oLstReporteros = data.d;
            arrReporteros = new Array();

            for (var i = 0; i < oLstReporteros.length; i++) {
                var temparrReporteros = new Array();
                temparrReporteros["label"] = oLstReporteros[i].EmpleadoNombre;
                temparrReporteros["NumEmpl"] = oLstReporteros[i].EmpleadoNumero;
                temparrReporteros["value"] = oLstReporteros[i].EmpleadoLlavePrimaria;
                arrReporteros.push(temparrReporteros);
            }
            ObtenerCamarografos();
        }
        else {
            alertModal("No se encontrarón reporteros disponibles.");

        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }

}
function ObtenerCamarografos() {
    executeSyncRequest(wsMtdGetCamarografosList, "{}", successCamarografos, MyErrorCamarografos);
}
var successCamarografos = function (data, status) {
    try {
        if (data.d.length > 0) {
            oLstCamara = data.d;
            arrCamarografos = new Array();

            for (var i = 0; i < oLstCamara.length; i++) {
                var temparrCamarografos = new Array();
                temparrCamarografos["label"] = oLstCamara[i].EmpleadoNombre;
                temparrCamarografos["NumEmpl"] = oLstCamara[i].EmpleadoNumero;
                temparrCamarografos["value"] = oLstCamara[i].EmpleadoLlavePrimaria;
                arrCamarografos.push(temparrCamarografos);
            }
            ObtenerEditores();
        }
        else {
            alertModal("No se encontrarón camarografos disponibles.");

        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function ObtenerEditores() {

    executeSyncRequest(wsMtdGetEditoresList, "{}", successEditores, MyErrorEditores);
}
var successEditores = function (data, status) {
    try {
        if (data.d.length > 0) {
            oLstEditor = data.d;
            arrEditores = new Array();

            for (var i = 0; i < oLstEditor.length; i++) {
                var temparrEditores = new Array();
                temparrEditores["label"] = oLstEditor[i].EmpleadoNombre;
                temparrEditores["NumEmpl"] = oLstEditor[i].EmpleadoNumero;
                temparrEditores["value"] = oLstEditor[i].EmpleadoLlavePrimaria;
                arrEditores.push(temparrEditores);
            }
            if (arrOTS.length == 0) {
                CreaHeaderGRID();
            }
        }
        else {
            alertModal("No se encontrarón editores disponibles.");

        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}

function getSeccionByEmpleado() {
    var data = "{ 'idEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdgetSeccionEmpl, data, successSeccEmpl, myErrorSeccionEmpl);
}
var successSeccEmpl = function (data, status) {

    if (data.d.CveSeccion != 9) {
        $("#btnImprimir").hide();
        $("#btnBuscar").hide();
        $("#MainContent_dpFechaBusq, #lblFechaBusq").hide();
    }
    if (ValidaMultiplesSecciones() == true) {
        $("#cboSecciones").removeAttr("disabled");

    } else {
        $("#cboSecciones").attr("disabled", "disabled");
    }
    if (arrOTS.length == 0) {
        $("#cboSecciones").val(data.d.CveSeccion);
        $('#MainContent_hiddSecc').val(data.d.CveSeccion);
    } else {
        $("#cboSecciones").val($('#MainContent_hiddSecc').val());
    }
    
    cboSecciones_SelectionChanged();
}

function myError(request, status, error) {

    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
}
function ErrorSecciones(request, status, error) {

    alertModal('Error al cargar las secciones: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorTipoNota(request, status, error) {
    alertModal('Error al obtener los tipos de nota: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorSeccionEmpl(request, status, error) {
    alertModal('Error al obtener la sección a la que pertenece el empleado: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorSeccionXIEmpl(request, status, error) {
    alertModal('El servicio devolvio un error al consultar Secciones: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function MyErrorReporteros(request, status, error) {
    alertModal('Error al cargar los reporteros: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function MyErrorCamarografos(request, status, error) {
    alertModal('Error al cargar los camarógrafos: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function MyErrorEditores(request, status, error) {
    alertModal('Error al cargar los editores: ' + error);
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorGuardaOTMasivo(request, status, error) {
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    if (GuardadoMasivo == true && strListaOTValidas != "") {
        if ((strListaOTValidas.split('|').length > 0)) {
            if (jQuery.trim((strListaOTValidas.toString().split('|'))[0].toString()).length > 0) {

                if (strListaOTValidas.indexOf((strListaOTValidas.split('|'))[ContadorOT].toString() + "|") == 0) {
                    strListaOTValidas = strListaOTValidas.substr(((strListaOTValidas.split('|'))[ContadorOT].toString() + "|").length);
                }
            }
        }
    }
}
function myErrorCompraOT(request, status, error) {

    alertModal('Error al comprar la orden de trabajo.');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorGuardaLogistica(request, status, error) {

    alertModal('Error al Guardar la Logistica');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorActualizaLogistica(request, status, error) {

    alertModal('Error al Actualizar la Logistica');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function myErrorManejador(request, status, error) {
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
var successLocales = function (data, status) {
    locales = data.d;
    $("#cboLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#cboLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cboLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });
    var localSeleccionar = getLocalSeleccionar();
    if (localSeleccionar) {

    }
    if (arrOTS.length == 0) {
        $('#cboLocales').val(localSeleccionar);
        $('#MainContent_HiddcboLocales').val(localSeleccionar);
    } else {
        $('#cboLocales').val($('#MainContent_HiddcboLocales').val());
    }
    
    bindSecciones(fabrica);
}

function bindSecciones(factory) {
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeSyncRequest(wsMtdgetSecciones, data, successSecciones, myError);

    /*Se obtiene la seccion para locales*/
    executeSyncRequest(wsMtdGetSeccionLocl, data, successSeccionesLocal, myError);
}

var successSeccionesLocal = function (data, status) {
    $.each(data.d, function (index, secc) {
        seccionLocl = secc;
    });
}

var successSecciones = function (data, status) {
    var cont = 0;
    secciones = data.d;
    $("#cboSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {

            if (index == 0)
                $("#cboSecciones").append('<option value="-1">== TODAS ==</option>');
            $("#cboSecciones").append('<option value="' + seccion.SeccLlPr + '" data-Empl="' + seccion.EmplLlPr + '">' + seccion.SeccDesc + '</option>');

        });

        if (vieneOtherPage == true) {

            if (gblIdSeccionSem != undefined) {
                idSeccion = gblIdSeccionSem;
                $("#cboSecciones").val(gblIdSeccionSem);
                $("#MainContent_hiddSecc").val(gblIdSeccionSem);
            }
            else {
                idSeccion = '';
                $("#cboSecciones").prop('selectedIndex', 0);
            }
            vieneAgendaSemanal = false;
        } else {
            if (idSeccion != undefined && idSeccion != '') {
                $("#cboSecciones").val(idSeccion);
                $("#MainContent_hiddSecc").val(idSeccion);
            }
        }
    }
    else {
        $("#cboSecciones").append('<option value="0">No hay Registros...</option>');
    }

    getSeccionByEmpleado();
}
function btnActualizarOT_Click() {
    try {
        arrOTS = new Array();
        if (jQuery.trim($("#txtNumOT").val()) == '')
            alertModal("El campo: número de OT's no puede estar vacio");
        else {
            CreaHeaderGRID();
            $("#MainContent_btnUpdateEquipo").click();
        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, "Crea multiples ordenes de trabajo");
    }
}
function cboLocales_SelectionChanged() {
    $('#MainContent_HiddcboLocales').val($('option:selected', '#cboLocales').val());
    btnLimpiaOTs_Click();
}

function updateEquiposLocal() {
    $("#GridHeader .toDatePicker").datepicker({ minDate: 0 });
    
    $("#GridHeader .timePicker").timepicker({
        ampm: false,
        showSecond: true,
        timeFormat: 'hh:mm:ss'
    });

    $.each($("#GridHeader .autoCompleteRe"), function (index, theElement) {
        $(theElement).val('');
        $(theElement).attr('data-val', -1);
        $(theElement).autocomplete({ source: arrReporteros,
            focus: function (event, ui) {
                $(theElement).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $(theElement).val(ui.item.label);
                $(theElement).attr('data-val', ui.item.value);
                return false;
            }
        });
    });

    $.each($("#GridHeader .autoCompleteCamara"), function (index, theElement) {
        $(theElement).val('');
        $(theElement).attr('data-val', -1);
        $(theElement).autocomplete({ source: arrCamarografos,
            focus: function (event, ui) {
                $(theElement).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $(theElement).val(ui.item.label);
                $(theElement).attr('data-val', ui.item.value);
                return false;
            }
        });
    });

    $.each($("#GridHeader .autoCompleteEditor"), function (index, theElement) {
        $(theElement).val('');
        $(theElement).attr('data-val', -1);
        $(theElement).autocomplete({ source: arrEditores,
            focus: function (event, ui) {
                $(theElement).val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $(theElement).val(ui.item.label);
                $(theElement).attr('data-val', ui.item.value);
                return false;
            }
        });
    });
}