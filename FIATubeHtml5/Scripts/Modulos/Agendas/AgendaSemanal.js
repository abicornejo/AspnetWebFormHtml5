/************************************************************************************************************************************/
/************************************************** AGENDA SEMANAL ******************************************************************/
var tipoNota = 'T';
var fabrica = '';
var idSeccEmpl = -1;
var indexSeccEmpl = 0;
var idSeccion = '';
var diaIniAgenda;
var produccion = '';
var descripcionLocal = '';

var datLun = '';
var datMar = '';
var datMie = '';
var datJue = '';
var datVie = '';
var datSab = '';
var datDom = '';
var ListaOT;
var ListaProp;

$(function () {
    $("#divItemAgenda").click(function () {


        return false;
    });
    $("#divItemAgenda").delegate(".onchange", "change", function () {
     });
    initialize();
});

/*Funcion que define la forma como se abren los dialogs de la pagina de agenda semanal*/
$(function () {
    $("#MainContent_updPanel1").delegate(".openMdlAgDiaria", "click", function () {
        parent.openModal("Agendas/AgendaDiaria.aspx?isFromMenu=0&idfabrica=" + fabrica + "&IdSeccion=" + $(this).attr('data-secc') + "&cveOrdenTrabajo=" + $(this).attr('data-OT') + "&Contenido=" + $(this).attr('data-texto') + "&dtAgendaSemanal=" + $(this).attr('data-fecha') + "&idlocal=" + $(this).attr('data-locl'), -1, -1, 'Agenda Diaria');
        return false;
    });
    $("#MainContent_updPanel1").delegate(".openMdlAgDiaria", "mouseover", function () {
        $(this).attr('style', 'cursor: pointer;');
        return false;
    });
});

function FindIndexListSource(vOrig, vnumOTProp) {

    var valIndex = -1;

    if (vOrig == "O") {
        $.each(ListaOT, function (index, oitem) {

            if (oitem.CveOrdenTrabajo == vnumOTProp) {
                valIndex = index;
            }
        });
    }
    else {
        $.each(ListaProp, function (index, oitem) {
            if (oitem.CvePropuesta == vnumOTProp) {
                valIndex = index;
            }
        });
    }
    return valIndex;
}


function chkCarrito_changed(e) {
    var FechaAgenda;
    if (!ValidaPermisosCompra())
        return;

    if ($(e)[0].checked == false) {
        if ($(e).attr('data-AgseOrig') == "O") {
            if (ListaOT != undefined) {                
                ListaOT.splice(FindIndexListSource($(e).attr('data-AgseOrig'), $(e).attr('data-AgseNume')), 1);
                
            }
        } else {
            if ($(e).attr('data-AgseOrig') == "P") {
                if (ListaProp != undefined) {
                    ListaProp.splice(FindIndexListSource($(e).attr('data-AgseOrig'), $(e).attr('data-AgseNume')), 1);

                }

            }

        }


    } else {
        
        if ($(e).attr('data-AgseOrig') == "O") {
            var oOT = new THE_OrdenTrabajo()
            oOT.CveOrdenTrabajo = new Number($(e).attr('data-AgseNume'));
            oOT.ClaveOrdenTrabajo = $(e).attr('data-OtraCvec');
            oOT.Titulo = $(e).attr('data-AgseTitu');            
            
            if ($(e).attr('data-AgseFini') != '') {
                FechaAgenda = ConvertToFormatDatetoIng($(e).attr('data-AgseFini'));
            }
           
            oOT.FechaAgenda = new Date(Date.parse(FechaAgenda));

            var oSeccion = new TDI_Seccion();
            oSeccion.CveSeccion = new Number($(e).attr('data-SeccLlPr'));
            var vtipoNotaActualLst = new TDI_TipoNota();
            vtipoNotaActualLst.CveTipoNota = $(e).attr('data-TinoLlPr');
            oOT.CveSeccion = oSeccion;
            oOT.CveTipoNota = oTipoNota;
            if (ListaOT == undefined) {
                ListaOT = new Array();
            }
            var bfound = false;
            var vIndexOT;
            if (ListaOT.length > 0) {
                for (var i = 0; i < ListaOT.length; i++) {
                    if (Number(ListaOT[i].CveOrdenTrabajo) == Number(oOT.CveOrdenTrabajo)) {
                        bfound = true;
                        vIndexOT = i;
                    }
                }
                if (bfound == false) {
                    ListaOT.push(oOT);
                }
            } else {
                ListaOT.push(oOT);

            }
            if (bfound == false) {
                AddSessionCarritoOT(ListaOT);
                ListaOT.splice(vIndexOT, 1);
                if (sessionStorage.usserCarritoOpen == "false") {
                    sessionStorage.usserCarritoOpen = "true";
                    parent.openModal("Shopping Car/ShoppingCar.aspx?loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
                }


            } else {
                if (sessionStorage.usserCarritoOpen == "false") {
                    sessionStorage.usserCarritoOpen = "true";
                    parent.openModal("Shopping Car/ShoppingCar.aspx?loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
                }
            }

        } else {
            if ($(e).attr('data-AgseOrig') == "P") {
                var oProp = new TDI_Propuesta();
                oProp.CvePropuesta = new Number($(e).attr('data-AgseNume'));
                if ($(e).attr('data-AgseFini') != '') {
                    FechaAgenda = ConvertToFormatDatetoIng($(e).attr('data-AgseFini'));
                }
                oProp.FechaAgenda = new Date(Date.parse(FechaAgenda));
                var oSeccion = new TDI_Seccion();
                oSeccion.CveSeccion = new Number($(e).attr('data-SeccLlPr'));
                var oTipoNota = new TDI_TipoNota();
                oTipoNota.CveTipoNota = new Number($(e).attr('data-TinoLlPr'));

                oProp.CveSeccion = oSeccion;
                oProp.CveTipoNota = oTipoNota;
                oProp.Titulo = $(e).attr('data-AgseTitu');
                oProp.CveCable = new THE_Cable();
                oProp.CveCliente = new TDI_Cliente();
                oProp.CveEmpleado = new TDI_EMPL();
                oProp.CveEmpleado.EmpleadoLlavePrimaria = new Number(sessionStorage.numUsuario);
                oProp.CveFormato = new TDI_Formato();
                oProp.CvePuesto = new TDI_Puestos();
                if (ListaProp == undefined) {
                    ListaProp = new Array();
                }
                var bfoundProp = false
                var vListaProp;
                if (ListaProp.length > 0) {
                    for (var i = 0; i < ListaProp.length; i++) {
                        if (Number(ListaProp[i].CvePropuesta) == Number(oProp.CvePropuesta)) {
                            bfoundProp = true;
                            vListaProp = i;
                        }
                    }

                    if (bfoundProp == false) {
                        ListaProp.push(oProp);
                    }
                } else {
                    ListaProp.push(oProp);


                }
                if (bfoundProp == false) {
                    AddusserCarritoProp(ListaProp);
                    ListaProp.splice(vListaProp, 1);
                    if (sessionStorage.usserCarritoOpen == "false") {
                        sessionStorage.usserCarritoOpen = "true";
                        parent.openModal("Shopping Car/ShoppingCar.aspx?loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
                    }

                } else {
                    if (sessionStorage.usserCarritoOpen == "false") {
                        sessionStorage.usserCarritoOpen = "true";
                        parent.openModal("Shopping Car/ShoppingCar.aspx?loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
                    }
                }

            }
        }
    }

}

function setRating() {
    $('.star').rating({
        callback: function (value, link) {
            var theRaatingVal = 0;
            var cve = $($(this).parent()).attr('data-val');

            if (value != undefined) 
                theRaatingVal = value;

            if (cve != undefined)
                PageMethods.updateRating(cve, theRaatingVal, onRecuperacionesBusqComplete, Error);
        }
    });

    $(".rating-cancel").attr('style', '');
}

function onRecuperacionesBusqComplete(result, userContext, methodName) {
    if (result == false)
        alertModal("Ocurrio un problema al actualizar el rating del video.");
}

function initialize() {
    $("#MainContent_hiddSecc").val(idSeccion);
    getSeccionByEmpleado();
    cargaLocales();
    isMostrarSecciones();
    $("#dtFecha").datepicker({});
    $("#dtFecha").datepicker('setDate', new Date());
    diaIniAgenda = getFisrtDateOfWeek(new Date());
    this.setValueLabelWeek();
}

function cargaLocales() {    
    getLocalesAgendas(successLocales, myError);
}

function setValueLabelWeek() {
    $("#lblWeekOfYear").empty();    
    $("#lblWeekOfYear").append(getLabelOfWeek(diaIniAgenda));
 }

function getSeccionByEmpleado() {
    var data = "{ 'idEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdgetSeccionEmpl, data, successSeccEmpl, myError);
}

function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
}

function llenaProducciones() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdconsultaPrgEmpl, data, successLlenaProd, myError);
}

function bindSecciones(factory) {    
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeRequest(wsMtdgetSecciones, data, successSecciones, myError);
}

function cboSecciones_changed() {
    if ($("#cmbSecciones").val() != idSeccEmpl)
        $("#chkVerSeccion").attr('checked', false);
    else
        $("#chkVerSeccion").attr('checked', true);

    if ($("#cmbSecciones").val() != 0) 
        idSeccion = $("#cmbSecciones").val();
    else
        idSeccion = '';

    $("#MainContent_hiddSecc").val(idSeccion);
    this.actualizaDatos();
}

function cmbLocales_changed() {
    $("#cmbReportero").val(0);
    $("#MainContent_hiddUpEq").val(1);
    isMostrarSecciones();
    this.actualizaDatos();
}

function dtFecha_change() {
    diaIniAgenda = getFisrtDateOfWeek($("#dtFecha").datepicker('getDate'));
    this.setValueLabelWeek();
    actualizaDatos();
}

function isMostrarSecciones() {
    if ($("#MainContent_cmbLocales").val() == 36) {
        $("#cmbSecciones, #lblSeccion").show();
        descripcionLocal = '';
    }
    else {
        this.idSeccion = '';
        $("#cmbSecciones, #lblSeccion").hide();
        descripcionLocal = $("#MainContent_cmbLocales option:selected").text();
    }
}

function cboProduccion_changed(){
    produccion = '';
    if(idSeccEmpl == 8)
        produccion = "'" + $("#MainContent_cmbProduccion").val() + "'";
    this.actualizaDatos();
}

function btnAtras_click() {
    diaIniAgenda.setDate(diaIniAgenda.getDate() - 7);
    $("#dtFecha").datepicker('setDate', diaIniAgenda);
    this.setValueLabelWeek();
    this.actualizaDatos();
}

function btnAdelante_click() {
    diaIniAgenda.setDate(diaIniAgenda.getDate() + 7);
    $("#dtFecha").datepicker('setDate', diaIniAgenda);
    this.setValueLabelWeek();
    this.actualizaDatos();
}

function btnActualizar_click() {
    this.setFilterData();
}

$("#MainContent_txtTexto,#MainContent_txtOT").live("keypress", function (e) {
    if (e.keyCode == 13)
        actualizaDatos();
});

function chkVerSeccion_changed() {
    if ($("#chkVerSeccion").prop('checked') == false) {
        if (idSeccEmpl == $("#cmbSecciones").val()) {
            idSeccion = '';
            $("#cmbSecciones").prop('selectedIndex', (0));
        }
    }
    else {
        idSeccion = idSeccEmpl;
        $("#cmbSecciones").prop('selectedIndex', (indexSeccEmpl));
    }
    actualizaDatos();
}

function actualizaDatos() {
    $("#MainContent_btnActualizar").click();
}

function setFilterData() {
    var endDateAgenda = new Date(diaIniAgenda);
    endDateAgenda.setDate(endDateAgenda.getDate() + 6);

    $.each($("#divGridAgenda").children(), function (index, myDiv) {
        $(myDiv).empty();
    });

    $("#MainContent_hiddFecIni").val(diaIniAgenda.esMXFormat());
    $("#MainContent_hiddFecFin").val(endDateAgenda.esMXFormat());
    $("#MainContent_hiddTN").val(tipoNota);
    $("#MainContent_hiddFac").val(fabrica);
    $("#MainContent_hiddProd").val(produccion);
    $("#MainContent_hiddSecc").val(idSeccion);
    $("#MainContent_hiddLocal").val(descripcionLocal);
    $("#MainContent_hiddRepo").val($("#cmbReportero").val());
    if ($("#MainContent_cmbLocales").val() <= 0)
        $("#MainContent_hiddLocalCv").val('');
    else    
        $("#MainContent_hiddLocalCv").val($("#MainContent_cmbLocales").val());
}

var successLocales = function (data, status) {
    locales = data.d;
    $("#MainContent_cmbLocales").empty();
    $.each(locales, function (index, local) {
        if (local.LocalLlave == undefined)
            $("#MainContent_cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#MainContent_cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    $("#MainContent_cmbLocales").val(getLocalSeleccionar());
}

var successAgendaOTs = function (data, status) {
    var divsAgendas = getDivsVideosWeek(data.d, diaIniAgenda);

    $.each($("#divGridAgenda").children(), function (index, myDiv) {
        $.each(divsAgendas[index], function (index, val) {
            $(myDiv).append(val);
        }); 
    });
}

var successSeccEmpl = function (data, status) {
    if (data.d != undefined) {
        idSeccEmpl = data.d.CveSeccion;
        if (data.d.CveSeccion != 8) {
            /*Se oculta el combo de produccion*/
            $("#MainContent_cmbProduccion, #lblProduccion").hide();
            bindSecciones(fabrica);
        }
        else
            llenaProducciones();
    }
    else
        bindSecciones(fabrica);
}

var successLlenaProd = function (data, status) {
    programas = data.d;
    $("#MainContent_cmbProduccion").empty();
    $.each(programas, function (index, programa) {
        $("#MainContent_cmbProduccion").append('<option value="' + programa.CvePrograma.CvePrograma + '">' + programa.CvePrograma.NombrePrograma + '</option>');
    });
    bindSecciones(fabrica);
}

var successSecciones = function (data, status) {
    var cont = 0;
    secciones = data.d;
    $("#cmbSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {
            if (index == 0)
                $("#cmbSecciones").append('<option value="0">Todas...</option>');
            if (seccion.SeccLlPr == idSeccEmpl && cont == 0) {
                cont = index;
                indexSeccEmpl = cont + 1;
                idSeccion = seccion.SeccLlPr;
                $("#MainContent_hiddSecc").val(idSeccion);
            }
            $("#cmbSecciones").append('<option value="' + seccion.SeccLlPr + '">' + seccion.SeccDesc + '</option>');
        });
        $("#cmbSecciones").prop('selectedIndex', (indexSeccEmpl));
        $("#chkVerSeccion").attr('checked', true);

        actualizaDatos();
    }
    else
        $("#cmbSecciones").append('<option value="0">No hay Registros...</option>');
}

function imgVideo_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=' + $(contenedor).attr('data-pro') + '&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function showData_click(control) {
    if ($(control).attr('data-rot').toString().indexOf("OT") != -1) {
        parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-value'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
    }
    else if ($(control).attr('data-rot').toString().indexOf("Prop") != -1) {
        parent.openModal('Propuesta/CreaPropuesta.aspx?numProp=' + $(control).attr('data-value'), widthPropuesta, heigthPropuesta, 'Actualizaci&oacute;n de Propuesta: ' + $(control).attr('data-oCve'));
    }
}

function abrirAvance(control) {
    var title = 'Avances ';
    var theUri = "OT/AvancesOT.aspx?advanceType=" + $(control).attr('data-type') + "&numOT=" + $(control).attr('data-numDat');
        theUri += "&title=" + $(control).attr('data-titu') + "&oCve=" + $(control).attr('data-oCve');

        if ($(control).attr('data-type') == 'O')
            title += 'OT: ' + $(control).attr('data-oCve');
        else
            title += 'Prop: ' + $(control).attr('data-oCve');
    parent.openModalUpdatable(theUri, widthAvancesOT, heigthAvancesOT, title, this);
}

function updateForm() {
    actualizaDatos();
}

/************************************************************************************************************************************/
/************************************************** Solicitar Material***************************************************************/


function SolicitarMaterial() { 

}

/*Funcion que define la forma como se abren los dialogs de la pagina de agenda semanal*/
$(function () {
    $("#MainContent_updPanel1").delegate(".SolicitaMat", "click", function () {
        $("#MainContent_HDAgenda").val($(this).attr('data-agenda'));
        $("#MainContent_BntDetonador").click();
        return false;
    });

});

function AbrirObtenerMateriales() {
    parent.openModal('Agendas/ObtenerMaterialesOT.aspx', widthVisorVideo, heigthVidorVideo, 'Solicitud Materiales');
}

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}

function cboReportero_change() {
    actualizaDatos();
}