
var permisos = true;
var idEmpresa = '';
var idFabrica = '4';
var initParams;
var idSeccionEmpl;
var ListaOT;
var ListaProp;

window.onload = function () { initialize(); }

$(function () {
    $("#divSecciones").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", position: [$("#btnShowSecc").position().left + 115, $("#btnShowSecc").position().top + 30], width: 'auto', height: 'auto' });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divSecciones').parent()).remove();
    $("#divSecciones").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

    $("#divOpcCopy").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", width: 'auto', height: 'auto', position: [$("#btnMenuCopiar").position().left + 115, $("#btnMenuCopiar").position().top + 30] });
});

function initialize() {
    initParams = getUrlVars();
    $("#MainContent_hiddUpEq").val(1);

    /*Se carga combo locales*/
    getLocalesAgendas(successLocales, Error);

    /*Se verifica si la pantalla se carga desde menu o desde una pagina*/
    if (initParams["isFromMenu"] == 1) { //Se carga desde menu
        $("#dtFecha").datepicker('setDate', new Date());
    }
    else {
        $("#cmbLocales").val(initParams["oLocal"]);
        $("#dtFecha").val(initParams['dtAgendaDiaria']);
        $("#MainContent_txtOT").val(initParams['cveOrdenTrabajo']);
        $("#MainContent_txtTexto").val(initParams['textoBusqueda']);
    }

    isMostrarSecciones();
    /*Se cargan las secciones*/
    getSeccionByEmpleado();
    bindSecciones(idFabrica);
}

function cmbLocales_change() {
    $("#cmbReportero").val(0);
    $("#MainContent_hiddUpEq").val(1);
    isMostrarSecciones();
    bindList();
}

function isMostrarSecciones() {
    if ($("#cmbLocales").val() == 36) 
        $("#divFilSecc").show();
    else 
        $("#divFilSecc").hide();
}

$("#MainContent_txtTexto,#MainContent_txtOT").live("keypress", function (e) {
    if (e.keyCode == 13) {
        actualizaDatos();
        bindList();
    }
});

function muestraSecc() {
    if ($("#btnShowSecc").attr('data-isOpen') == 'false') {
        $("#divSecciones").dialog('open');
        $("#btnShowSecc").attr('data-isOpen', true);
        $("#btnShowSecc").attr('title', 'Ocultar Secciones');
    }
    else if ($("#btnShowSecc").attr('data-isOpen') == 'true') {
        $("#divSecciones").dialog('close');
        $("#btnShowSecc").attr('data-isOpen', false);
        $("#btnShowSecc").attr('title', 'Mostrar Secciones');
    }

    return false;
}

function getSeccionByEmpleado() {
    var data = "{ 'idEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdgetSeccionEmpl, data, successSeccEmpl, Error);
}

var successSeccEmpl = function (data, status) {
    if (data.d != undefined) {
        idSeccionEmpl = data.d.CveSeccion;
        if (idSeccionEmpl == 8) 
            consultaProgramaEmpleado();
        else 
            $("#divProduccion").hide();
    }
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
    
    if (initParams["isFromMenu"] == 1)
        $("#cmbLocales").val(getLocalSeleccionar());
}

function consultaProgramaEmpleado() {
    var data = "{ 'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeSyncRequest(wsMtdconsultaPrgEmpl, data, successLlenaProd, Error);
}

var successLlenaProd = function (data, status) {
    var programas = data.d;
    $("#cmbProduccion").empty();
    $.each(programas, function (index, programa) {
        $("#cmbProduccion").append('<option value="' + programa.CvePrograma.CvePrograma + '">' + programa.CvePrograma.NombrePrograma + '</option>');
    });
}

function bindSecciones(factory) {
    var data = "{ 'FABR_LLAV_PR':'" + factory + "', 'SECC_LLAV_PR':''}";
    executeSyncRequest(wsMtdgetSecciones, data, successSecciones, Error);
}

var successSecciones = function (data, status) {
    var contador = 0;
    var checked;
    secciones = data.d;
    $("#divSecciones").empty();
    if (secciones.length > 0) {
        $.each(secciones, function (index, seccion) {
            if (seccion.SeccLlPr != 5) {
                if (((idSeccionEmpl.toString() == seccion.SeccLlPr.toString()) && (initParams["isFromMenu"] == 1)) == true || ((initParams["isFromMenu"] == 0) && initParams['oSeccion'] == '0')
                 || ((initParams["isFromMenu"] == 0) && seccion.SeccLlPr.toString() == initParams['oSeccion'])) {
                    checked = " checked = 'checked' ";
                }
                else
                    checked = " ";

                $("#divSecciones").append("<input id='chkSeccion" + (++contador) + "' type='checkbox' data-cveSecc='" + seccion.SeccLlPr + "' " +
                checked + " class='chkSeccion' /><label for='chkSeccion" + contador + "'>" + seccion.SeccDesc + "</label><br/>");
            }
        });
    }
    else
        $("#divSecciones").append("<input id='chkSeccion0' type='checkbox' data-cveSecc='0' class='chkSeccion' /><label for='chkSeccion0'>No hay registros...   </label><br/>");

    bindList();
}

function actualizaDatos() {
    setFiltersData();
}

function bindList() {
    $("#MainContent_btnActualizar").click();
}

function setFiltersData() {
    var idProd = '';
    var idsSeccion = '';
    var localDescription = '';
    if ($("#cmbLocales").val() > 0) {
        if ($("#cmbLocales").val() == 36) {
            $.each($("#divSecciones .chkSeccion"), function (index, seccion) {
                if ($(seccion).attr('checked') == 'checked') {
                    if (idsSeccion == '')
                        idsSeccion += $(seccion).attr('data-cveSecc');
                    else
                        idsSeccion += ',' + $(seccion).attr('data-cveSecc');
                }
            });
        }
        else
            idsSeccion = '114';
    }
    else
        idsSeccion = '';

    if ($("#cmbLocales").val() > 0)
        localDescription = $("#cmbLocales").val();
    else
        localDescription = '';

    if ($("#cmbProduccion").val() > 0)
        idProd = $("#cmbProduccion").val();

    $("#MainContent_hiddEmpr").val(idEmpresa);
    $("#MainContent_hiddFabr").val(idFabrica);
    $("#MainContent_hiddSecc").val(idsSeccion);
    $("#MainContent_hiddFech").val($("#dtFecha").datepicker('getDate').esMXFormat());
    $("#MainContent_hiddPerm").val(permisos);
    $("#MainContent_hiddLocl").val(localDescription);
    $("#MainContent_hiddProd").val(idProd);
    $("#MainContent_hiddRepo").val($("#cmbReportero").val());
    ListaOT = new Array();
    ListaProp = new Array();
}

function btnshowOT_click(control) {
    if($(control).attr('data-orig') == "O")
        parent.openModal('OT/OT.aspx?numOT=' + $(control).attr('data-val'), -1, -1, 'Actualizaci&oacute;n de OT: ' + $(control).attr('data-oCve'));
    else if ($(control).attr('data-orig') == "P")
        parent.openModal('Propuesta/CreaPropuesta.aspx?numProp=' + $(control).attr('data-val'), widthPropuesta, heigthPropuesta, 'Actualizaci&oacute;n de Propuesta: ' + $(control).attr('data-oCve'));
}

function imgVideo_click(contenedor) {
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + $(contenedor).attr('data-numOT') + '&numProg=-1&uriVideo=' + $(contenedor).attr('data-file') + '&uriImg=' + $(contenedor).attr('data-img') + '&isfromConsulta=false&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function btnImprimir_click() {
    setFiltersData();
    var cadena = 'Titulo=' + $("#MainContent_txtTexto").val().trim() + "&CveOrdenTrabajo=" + $("#MainContent_txtOT").val().trim() + "&IdSecc=" + $("#MainContent_hiddSecc").val() + "&Fecha=" + $("#MainContent_hiddFech").val() + "&idFabrica=" + $("#cmbProduccion").val() + "&local=" + $("#MainContent_hiddLocl").val() + "&idRepo=" + $("#MainContent_hiddRepo").val();
    window.open('../../Impresiones/BitacoraDiariaImprimir.aspx?' + cadena, 'ventana1', 'width=120,height=300,scrollbars=NO');
}

function btnCopy_clik(control) {
    var cadena = "\r\n";

    if (control == undefined) {
        $.each($("#MainContent_divContentResult .divRegContent"), function (index, item) {
            if ($("#chkOT").attr('checked') == 'checked')
                cadena += " OT: " + $(item).attr('data-OT');
            if ($("#chkTit").attr('checked') == 'checked')
                cadena += "\t" + $(item).attr('data-Title');
            if ($("#chkRep").attr('checked') == 'checked')
                cadena += "\t" + $(item).attr('data-Rep') + '  ';
            if ($("#chkObj").attr('checked') == 'checked')
                cadena += "\r\n" + $(item).attr('data-Obj');
            if ($("#chkAva").attr('checked') == 'checked')
                cadena += "\r\n" + $(item).attr('data-Ava');

            cadena += "\r\n\r\n";
        });
    }
    else {
        var item = $($($(control).parent()).parent()).parent();
        if ($("#chkOT").attr('checked') == 'checked')
            cadena += " OT: " + $(item).attr('data-OT');
        if ($("#chkTit").attr('checked') == 'checked')
            cadena += "\t" + $(item).attr('data-Title');
        if ($("#chkRep").attr('checked') == 'checked')
            cadena += "\t" + $(item).attr('data-Rep') + '  ';
        if ($("#chkObj").attr('checked') == 'checked')
            cadena += "\r\n" + $(item).attr('data-Obj');
        if ($("#chkAva").attr('checked') == 'checked')
            cadena += "\r\n" + $(item).attr('data-Ava');

        cadena += "\r\n\r\n";
    }

    copyToClipboard(cadena);
    $("#divOpcCopy").dialog('close');
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
                var bfoundProp = false;
                var vIndexProp;
                if (ListaProp.length > 0) {
                    for (var i = 0; i < ListaProp.length; i++) {
                        if (Number(ListaProp[i].CvePropuesta) == Number(oProp.CvePropuesta)) {
                            bfoundProp = true;
                            vIndexProp = i;
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
                    ListaProp.splice(vIndexProp, 1);
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
function btnComprar_Click() {
    if (ValidaPermisosCompra() == false) {
        alertModal('No tiene permisos para realizar esta operación');
    } else {
        if ((ListaOT == undefined || ListaOT.length == 0) && (ListaProp == undefined || ListaProp.length == 0)) {
            alertModal('Necesita seleccionar al menos una casilla de compra');
        } else {

            ValidaElementosCarrito(ListaOT, ListaProp);

        }
    }
}
function ValidaElementosCarrito(vListaOT, vListaProp) {
    var data = new ValidaElementosCarritoParaAdd(vListaOT, vListaProp);
    executeRequest(wsMtdValidaElementosCarritoParaAdd, JSON.stringify(data, null, 2), successElementosCarrito, myError);
}
var successElementosCarrito = function (data, status) {
    var status = false;
    if (data.d != undefined) {
        if ((data.d.ListaOT.length > 0) && (data.d.ListaProp.length > 0) && (data.d.OTEliminada == true || data.d.PropComprada == true)) {
            alertModal(CreateMessage(data.d.OTEliminada, data.d.PropComprada));
            return false;

        } else {
            if (data.d.OTEliminada == true || data.d.PropComprada == true) {
                alertModal(CreateMessage(data.d.OTEliminada, data.d.PropComprada));
            }

        }
        if (sessionStorage.usserCarritoOpen == "false") {
            sessionStorage.usserCarritoOT = "";
            sessionStorage.usserCarritoProp = "";
        }
        AddSessionCarritoOT(ListaOT);
        AddusserCarritoProp(ListaProp);

        if (sessionStorage.usserCarritoOpen == "false") {
            sessionStorage.usserCarritoOpen = "true";
            parent.openModal("Shopping Car/ShoppingCar.aspx?loading=true", widthShoppingCar, heigthShoppingCar, 'Carrito de Compras');
        }

    }

}
function CreateMessage(vOTEliminada, vPropComprada) {

    var Message = '';
    var causa = '';
    Message = "Algunos Elementos de ";
    if (vOTEliminada == true) {
        Message = Message + " OTs ";
        causa = causa + " Algunas OTs han sido eliminadas. ";
    }
    if (vOTEliminada == true && vPropComprada == true) {
        Message = Message + " y ";
        causa = causa + " y ";
    }
    if (vPropComprada == true) {
        Message = Message + " Propuestas ";
        causa = causa + " Algunas Propuestas han sido Compradas. ";
    }

    Message = Message + " fueron eliminados debido a que " + causa + ". Por favor refresque la agenda";
    return Message;
}
function myError(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + error);
}

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}

function cboReportero_change() {
    actualizaDatos();
    bindList();
}

