//Esta es la versión que hizo popoca
var existeLoading = false;
var lstOT;
var lstPropuesta;
var lstProgramaEmpleado;
var CveProgEmpl;
var initVars;
var lstOTadd;
var lstPropadd;
var ListaOTsCompradas;
var CompraOTsFin;
var CompraPropFin;
var myDivFormato;
var FillCombo;
var IdProgTrans;
var gblCveOrdentrabajo;
var enOperacion = false;
var listCompraOT;
var listCompraPropuesta;
var ListaINews;
var gblpathPage = "";
//Este script solo se vale de las variables de sesion sessionStorage.usserCarritoOT y sessionStorage.usserCarritoProp
//para cargar el contenido del carrito de compra
window.onload = function () {
    initialize();
}
function foundOT(vCveOrdenTrabajo) {
    if (lstOT.length > 0) {
        for (var k = 0; k < lstOT.length; k++) {
            if (lstOT[k].CveOrdenTrabajo == vCveOrdenTrabajo) {
                return true;
            }
        }
    }
    return false;
}
function foundProp(vCvePropuesta) {
    if (lstPropuesta.length > 0) {
        for (var k = 0; k < lstPropuesta.length; k++) {
            if (lstPropuesta[k].CvePropuesta == vCvePropuesta) {
                return true;
            }
        }
    }
    return false;
}
function ActualizaListOTyListProp() {
    var vOT;
    var vProp;
    var bActualizaGrid = false;
    if (sessionStorage.usserCarritoOpen == "true") {
        if (lstOT == undefined)
            lstOT = new Array();
        if (sessionStorage.usserCarritoOT != "undefined" && sessionStorage.usserCarritoOT.length > 0 && sessionStorage.usserCarritoOT != "[]") {
            var vlistOT = eval('(' + sessionStorage.usserCarritoOT + ')');
            if (lstOTadd == undefined) {
                lstOTadd = new Array();
            }
            if (vlistOT.length > lstOTadd.length) { //Cuando se agrega una OT al carrito
                for (var i = 0; i < vlistOT.length; i++) {
                    if (foundOT(vlistOT[i].CveOrdenTrabajo) == false) {
                        lstOT.push(vlistOT[i]);
                    }
                }
                if (lstOT.length > 0) {
                    bActualizaGrid = true;
                }
            } else if (vlistOT.length < lstOTadd.length) {//Cuando se elimina una OT al carrito
                if (vlistOT.length > 0) {
                    var vlistOTTemp = new Array();
                    for (var i = 0; i < vlistOT.length; i++) {
                        if (foundOT(vlistOT[i].CveOrdenTrabajo) == true) {
                            vlistOTTemp.push(vlistOT[i]);
                        }
                    }
                    if (vlistOTTemp.length > 0) {
                        lstOT = vlistOTTemp;
                        bActualizaGrid = true;
                    }
                } else {
                    lstOT = new Array();
                    lstOTadd = new Array();
                    bActualizaGrid = true;
                }
            }
        }
        if (lstPropuesta == undefined)
            lstPropuesta = new Array();
        if (sessionStorage.usserCarritoProp != "undefined" && sessionStorage.usserCarritoProp.length > 0 && sessionStorage.usserCarritoProp != "[]") {
            var vlistProp = eval('(' + sessionStorage.usserCarritoProp + ')');
            if (lstPropadd == undefined) {
                lstPropadd = new Array();
            }
            if (vlistProp.length > lstPropadd.length)  //Cuando se agrega una Propuesta al carrito
            {
                for (var i = 0; i < vlistProp.length; i++) {
                    if (foundProp(vlistProp[i].CvePropuesta) == false) {
                        lstPropuesta.push(vlistProp[i]);
                    }
                }
                if (lstPropuesta.length > 0) {
                    bActualizaGrid = true;
                }
            } else if (vlistProp.length < lstPropadd.length) {
                if (vlistProp.length > 0) {
                    var vlistPropTemp = new Array();
                    for (var i = 0; i < vlistProp.length; i++) {
                        if (foundProp(vlistProp[i].CvePropuesta) == true) {
                            vlistPropTemp.push(vlistProp[i]);
                        }
                    }
                    if (vlistPropTemp.length > 0) {
                        lstPropuesta = vlistPropTemp;
                        bActualizaGrid = true;
                    }
                } else {
                    lstPropuesta = new Array();
                    lstPropadd = new Array();
                    bActualizaGrid = true;
                }
            }
        }
        if (bActualizaGrid == true) {
            lstProgramaEmpleado = new Array();
            CveProgEmpl = 0;
            BindPrograma();
        }
        if (sessionStorage.usserCarritoProp == "[]" && sessionStorage.usserCarritoOT == "[]") {
            $.each($("#gridContenedor").children(), function (index, myDivC) {
                $(myDivC).remove();
            });
        }
    } else {
        clearInterval(gblInterval);
    }
}
function fncObtenIndexlstOT(vCveOT) {
    for (var i = 0; i < lstOT.length; i++) {
        if (lstOT[i].CveOrdenTrabajo == vCveOT) {
            return i;
        }
    }
    return 0;
}
function fncObtenIndexlstOTadd(vCveOT) {
    for (var i = 0; i < lstOTadd.length; i++) {
        if (lstOTadd[i].CveOrdenTrabajo == vCveOT) {
            return i;
        }
    }
    return 0;
}
function fncObtenIndexlstProp(vCveOT) {
    for (var i = 0; i < lstPropuesta.length; i++) {
        if (lstPropuesta[i].CvePropuesta == vCveOT) {
            return i;
        }
    }
    return 0;
}
function fncObtenIndexlstPropadd(vCveOT) {
    for (var i = 0; i < lstPropadd.length; i++) {
        if (lstPropadd[i].CvePropuesta == vCveOT) {
            return i;
        }
    }
    return 0;
}
function myErrorTransmitir(request, status, error) {
    alertModal('Error al Obtener el Programa a Transmitir');
}

function myErrorProgTransmitir(request, status, error) {
    alertModal('Error al Obtener el Programa a Transmitir.');
}
var successGetProgramasTransmitir = function (data, status) {
    if (data.d != undefined && data.d.length > 1) {
        for (var i = 0; i < data.d.length; i++) {
            if (data.d[i].IdPrograma == IdProgTrans) {
                oTransmisionPrograma = data.d[i];
                break;
            }
        }
    }
    else {
        oTransmisionPrograma = data.d[0];
    }
    var data = "{ 'NumeroOT':'" + gblCveOrdentrabajo + "' }";
    executeRequest(wsMtdObtenerDatosPantallaOrdenTrabajo, data, successConsultaDatosPantalla, myErrorProgTransmitir);
}
var successConsultaDatosPantalla = function (data, status) {
    if (data.d != undefined) {
    }
}
function btnGuardar_Click() {
    enOperacion = true;
    if (CveProgEmpl != 8) {
        var ValidaCheck = false;
        $.each($("#gridContenedor").children(), function (index, myDivC) {
            $.each($(myDivC).children(), function (index, myDivInt) {
                if ($($(myDivInt).children()[0])[0].type == "checkbox") {

                    if ($($(myDivInt).children()[0])[0].checked == true) {
                        ValidaCheck = true;
                    }
                }
            });
        });
        if (!ValidaCheck) {
            if (lstOT.length > 0 || lstPropuesta.length > 0)
                alertModal('Para poder comprarlo, Necesita seleccionar al menos un elemento');
            enOperacion = false;
            return;
        }
    }
    if (lstOT.length == 0 && lstPropuesta.length == 0) {
        alertModal('No existen elementos para ser comprados');
        enOperacion = false;
    }
    else
        if (CveProgEmpl != 8) {
            SaveShoppinCarNoPrograma();
        } else {
            SaveShoppinCarPrograma();
        }

}
function initialize() {
    try {

        $("#gridContenedor").delegate(".toDatePicker, .txtFechas, .txtFechas2", "focusin", function () {
            $(this).datepicker({ minDate: 0, onSelect: function (dateText, inst) {

            }
            });
        });
        $("#gridContenedor").delegate(".toDatePicker", "blur", function () {


        });

        $("#gridContenedor").delegate(".btnReplicarCarritoComp", "click", function () {
            var seccion = $(this).attr('data-seccion');
            var CveOrdenTrabajo = $(this).attr('data-id');
            var NombrePrograma = $(this).attr('data-NombrePrograma');
            gblCveOrdentrabajo = CveOrdenTrabajo;
            IdProgTrans = $(this).attr('data-CvePrograma');
            parent.openModal("OT/Replicar.aspx?CveOrdenTrabajo=" + CveOrdenTrabajo + "&IdSeccion=" + seccion + "&NombrePrograma=" + NombrePrograma + "&IdPrograma=" + IdProgTrans, widthReplica, heigthReplica, "Replicar");
        });
        $("#gridContenedor").delegate(".btnEliminarAloneCarrito", "click", function () {
            if ($(this).attr('data-typeOTorProp') == 'O') {
                EliminaOTSession($(this).attr('data-id'), $(this).attr('data-ClaveOrdenTrabajo'));
            } else if ($(this).attr('data-typeOTorProp') == 'P') {
                EliminaPropSession($(this).attr('data-id'));
            }
            if ((sessionStorage.usserCarritoOT == "[]" || sessionStorage.usserCarritoOT == "undefined" || sessionStorage.usserCarritoOT == "") && (sessionStorage.usserCarritoProp == "[]" || sessionStorage.usserCarritoProp == "undefined" || sessionStorage.usserCarritoProp == "")) {
                lstOT = new Array();
                lstOTadd = new Array();
                lstProgramaEmpleado = new Array();
                CveProgEmpl = 0;
                BindPrograma();
            } else if ((sessionStorage.usserCarritoOT == "[]") && (sessionStorage.usserCarritoProp != "[]" || sessionStorage.usserCarritoProp != "undefined" && sessionStorage.usserCarritoProp != "")) {
                lstOT = new Array();
                lstOTadd = new Array();
                $.each($("#gridContenedor").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenaGrid();
            } else if ((sessionStorage.usserCarritoProp == "[]") && (sessionStorage.usserCarritoOT != "[]" || sessionStorage.usserCarritoOT != "undefined" && sessionStorage.usserCarritoOT != "")) {
                lstPropuesta = new Array();
                lstPropadd = new Array();
                $.each($("#gridContenedor").children(), function (index, myDivC) {
                    $(myDivC).remove();
                });
                LlenaGrid();
            }
        });
        initVars = getUrlVars();
        parent.minimizeWindowCarrito(initVars["windowId"]);
        
        existeLoading = initVars["loading"];
        gblInterval = setInterval(function () {
            ActualizaListOTyListProp();
        }, 1000);
        gblpathPage = '/FiatubeHTML5/Shopping Car/ShoppingCar.aspx';
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
        $("#loading").hide();
    }
}
$(document).ready(function () {
    $("#loading").ajaxStart(function () {
        $(this).show();
    });
    $("#loading").ajaxStop(function () {
        $(this).hide();
    });
});
function BindPrograma() {
    var data = "{'cvePrograma':0, 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdconsultaPrgEmpl, data, successconsultaPrgEmpl, myError);
}
var successconsultaPrgEmpl = function (data, status) {
    try {
        if (data.d.length > 0) {
            lstProgramaEmpleado = new Array();
            {
                for (var i = 0; i < data.d.length; i++) {
                    var oNuevo = new TDI_ProgramaEmpleado();
                    var oNProg = new TDI_Programa();
                    var oNEmpleado = new TDI_EMPL();
                    var oNTipo = new TDI_TipoEmpleado();
                    oNEmpleado.EmpleadoLlavePrimaria = data.d[i].CveEmpleado.EmpleadoLlavePrimaria;
                    oNEmpleado.EmpleadoNombre = data.d[i].CveEmpleado.EmpleadoNombre;
                    oNEmpleado.EmpleadoStatus = data.d[i].CveEmpleado.EmpleadoStatus;
                    oNTipo.DescripcionTipoEmpleado = data.d[i].CveEmpleado.EmpleadoTipo.DescripcionTipoEmpleado;
                    oNTipo.EmpleadoTipo = data.d[i].CveEmpleado.EmpleadoTipo.EmpleadoTipo;
                    oNEmpleado.EmpleadoUsr = data.d[i].CveEmpleado.EmpleadoUsr;
                    oNEmpleado.EmpleadoTipo = oNTipo;
                    oNProg.Abreviatura = data.d[i].CvePrograma.Abreviatura;
                    oNProg.Abreviatura2 = data.d[i].CvePrograma.Abreviatura2;
                    oNProg.Canal = data.d[i].CvePrograma.Canal;
                    oNProg.CvePrograma = data.d[i].CvePrograma.CvePrograma;
                    oNProg.DiasTransmision = data.d[i].CvePrograma.DiasTransmision;
                    oNProg.EsFia = data.d[i].CvePrograma.EsFia;
                    oNProg.EsFiaNoticias = data.d[i].CvePrograma.EsFiaNoticias;
                    oNProg.EstatusPrograma = data.d[i].CvePrograma.EstatusPrograma;
                    oNProg.FechaFin = data.d[i].CvePrograma.FechaFin;
                    oNProg.FechaInicio = data.d[i].CvePrograma.FechaInicio;
                    oNProg.HoraTransmision = data.d[i].CvePrograma.HoraTransmision;
                    oNProg.IdCC = data.d[i].CvePrograma.IdCC;
                    oNProg.IdIBOP = data.d[i].CvePrograma.IdIBOP;
                    oNProg.NombreIBOP = data.d[i].CvePrograma.NombreIBOP;
                    oNProg.NombrePrograma = data.d[i].CvePrograma.NombrePrograma;
                    oNProg.EsAztecaAmerica = data.d[i].CvePrograma.EsAztecaAmerica;
                    oNProg.EsDeporteContacto = data.d[i].CvePrograma.EsDeporteContacto;
                    oNuevo.CveEmpleado = oNEmpleado;
                    oNuevo.CvePrograma = oNProg;
                    lstProgramaEmpleado.push(oNuevo);
                }
            }

        }
        GetSeccionUsuario();
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function myError(request, status, error) {
    alertModal('El servicio devolvio un error al consultar Programas');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function GetSeccionUsuario() {
    var data = "{'idEmpleado':" + sessionStorage.numUsuario + "}"
    executeRequest(wsMtdoObtieneSeccionByIdEmpleado, data, successGetSeccionUsuario, myErrorSeccion);
}
function myErrorSeccion(request, status, error) {
    alertModal('Error al cargar las secciones.');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
var successGetSeccionUsuario = function (data, status) {
    if (data.d != undefined) {
        CveProgEmpl = data.d.CveSeccion;
    }
    if (CveProgEmpl != 8) {
        $("#dvProgramas").hide();
        $("#cboProgramas").attr('disabled', 'disabled');
        BindFormatoNoProgramas();
    }
    else {
        if (lstProgramaEmpleado.length > 0) {
            if ($('#cboProgramas option').size() == 0) {
                $.each(lstProgramaEmpleado, function (index, prog) {
                    if (index == 0) {
                        $("#cboProgramas").append('<option value="' + prog.CvePrograma.CvePrograma + '" selected = "selected" data-CveEmpleado="' + prog.CveEmpleado.EmpleadoLlavePrimaria + '" data-NombreEmpleado="' + prog.CveEmpleado.EmpleadoNombre + '">' + prog.CvePrograma.NombrePrograma + '</option>');
                    } else {
                        $("#cboProgramas").append('<option value="' + prog.CvePrograma.CvePrograma + '" data-CveEmpleado="' + prog.CveEmpleado.EmpleadoLlavePrimaria + '" data-NombreEmpleado="' + prog.CveEmpleado.EmpleadoNombre + '">' + prog.CvePrograma.NombrePrograma + '</option>');
                    }
                });
            }
        }
        BindFormato();
    }
}
function BindFormato() {
    data = "{ 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdoObtenerSeccionFormatoXIDEmpleado, data, successObtenerSeccionFormatoXIDEmpleado, myErrorSeccionXIDEmpleado);
}
function BindFormatoNoProgramas() {
    data = "{ 'cveEmpleado':" + sessionStorage.numUsuario + "}";
    executeRequest(wsMtdoObtenerSeccionFormatoXIDEmpleado, data, successObtenerSeccionFormatoXIDEmpleado, myErrorSeccionXIDEmpleado);
}
var successObtenerSeccionFormatoXIDEmpleado = function (data, status) {
    var lstFormato;
    myDivFormato = "";
    if (data.d != undefined) {
        lstFormato = data.d;
        for (var j = 0; j < lstFormato.length; j++) {
            myDivFormato = myDivFormato + "<option value=" + lstFormato[j].CveFormato.CveFormato + " data-CveSeccion='" + lstFormato[j].CveSeccion.CveSeccion + "'>" + lstFormato[j].CveFormato.Descripcion + "</option>";
        }
    }
    var contador = 0;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $(myDivC).remove();
    });
    ConsultaOTCompradas();
}
function myErrorSeccionXIDEmpleado(request, status, error) {
    alertModal('El servicio devolvio un error al consultar Secciones');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
function ConsultaOTCompradas() {
    var numOTs = "";
    var numOtsTemp = "";
    for (var i = 0; i < lstOT.length; i++) {
        numOTs = numOTs + lstOT[i].CveOrdenTrabajo + ",";
    }
    if ((lstOT != undefined && lstOT.length > 0) || (lstPropuesta != undefined && lstPropuesta.length > 0)) {

        numOTs = numOTs.substr(0, numOTs.length - 1);
        data = "{ 'NumOT':'" + numOTs + "', 'numEmpleado':" + sessionStorage.numUsuario + "}";
        executeRequest(wsMtdGetProgramasTransmitirBiz, data, successGetProgramasTransmitirBiz, myErrorAlone);
    }
    if (lstPropuesta.length == 0) {
        if (CompraOTsFin && CompraPropFin) {
            CompraOTsFin = false;
            CompraPropFin = false;
        }
    }
}
function myErrorAlone(request, status, error) {
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
var successGetProgramasTransmitirBiz = function (data, status) {
    try {
        if (data.d != undefined && data.d.length > 0) {
            ListaOTsCompradas = new Array();
            for (var i = 0; i < data.d.length; i++) {
                var vListaOTsCompradas = new Array();
                vListaOTsCompradas.push(data.d[i].OT);
                vListaOTsCompradas.push(data.d[i].IdPrograma);
                vListaOTsCompradas.push(data.d[i].IdFormato);
                if (data.d[i].FechaProgramada != null && data.d[i].FechaProgramada.toString().indexOf('/Date') >= 0) {
                    var vFechaProgramada = new Date(new Number(data.d[i].FechaProgramada.substr(6, 13)));
                    vListaOTsCompradas.push(vFechaProgramada);
                }
                ListaOTsCompradas.push(vListaOTsCompradas);
            }
            LlenaGrid();
        } else {
            if ((lstPropuesta != undefined && lstPropuesta.length > 0) || (lstOT != undefined && lstOT.length > 0)) {
                LlenaGrid();
            }
        }
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function OcultarCheck() {
    if (CveProgEmpl == 8) {
        $.each($("#gridContenedor").children(), function (index, myDivC) {
            $.each($(myDivC).children(), function (index, myDivD) {
                if (myDivD.id.indexOf("check_") != -1) {
                    $(myDivD).hide();
                }
            });
        });
    }
}
function fncValExist(vId, vType) {
    var valor = false;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].type == "button" && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType && $($(myDivInt).children()[0])[0].id.indexOf("btnEliminar") != -1) {

                valor = true;

            }

        });
    });
    return valor;
}
function LlenaGrid() {
    if (CveProgEmpl == 0) {
        return;
    }
    lstOTadd = new Array();
    var cveOT;
    var cveProg;
    var NombreProg;
    var bloquear = false;
    var contador = 0;
    var disabled = "";
    var vFechaActual = new Date().esMXFormat();
    var fechaIng = new Date(Date.parse(vFechaActual.split('/')[1] + '/' + vFechaActual.split('/')[0] + '/' + vFechaActual.split('/')[2]));
    if (lstOT != undefined && lstOT.length > 0) {
        bloquear = false;
        disabled = "";
        for (var i = 0; i < lstOT.length; i++) {
            cveOT = lstOT[i].CveOrdenTrabajo;
            if (fncValExist(cveOT, "O") == false) {
                var myDiv = "";

                myDiv = myDiv + "<div class='divGridCarritoRowPrincipal'>"; //rENGLON               
                myDiv = myDiv + "<div class='divGridCarrito'><label>OT:</label></div>";
                myDiv = myDiv + "<div class='divGridCarritoOt'><label txbxOT_" + contador + ">" + lstOT[i].ClaveOrdenTrabajo + "</label></div>";
                myDiv = myDiv + "<div ><label class='txbxOTTituOT' id='txbxOTTitu_" + contador + "'> - " + lstOT[i].Titulo + "</label></div>";
                myDiv = myDiv + "<div class='divGridCarritoRight'><input type='button' class='btnEliminarAloneCarrito' id='btnEliminar_" + contador + "'   title = 'Eliminar' class='eliminar' data-typeOTorProp='O' data-id='" + cveOT + "' data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' /></div>";
                myDiv = myDiv + "</div>";
                if (CveProgEmpl != 8) {
                    for (var j = 0; j < lstProgramaEmpleado.length; j++) {
                        cveProg = lstProgramaEmpleado[j].CvePrograma.CvePrograma;
                        bloquear = InhabilitaControles(cveOT, cveProg);
                        myDiv = myDiv + "<div class='divGridCarritoRow'>";  //rENGLON
                        if (bloquear == true) {
                            disabled = "disabled='disabled'";
                        } else {
                            disabled = "";
                        }
                        myDiv = myDiv + "<div id='check_" + contador + "' class='divGridCarrito'><input type='checkbox' id= 'chkSelect_" + contador + "' data-cvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "' " + disabled + " data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' data-typeOTorProp='O' data-id='" + cveOT + "'/></div>"
                        var fechaAgendas;

                        if (lstOT[i].FechaAgenda != null && lstOT[i].FechaAgenda != undefined && lstOT[i].FechaAgenda.toString().indexOf('/Date') >= 0) {
                            fechaAgendas = new Date(new Number(lstOT[i].FechaAgenda.substr(6, 13)));
                        } else {
                            fechaAgendas = new Date(Date.parse(lstOT[i].FechaAgenda.substr(0, 10).replace(/-/i, "/").replace(/-/i, "/")));
                        }

                        if (Number(fechaAgendas) < Number(fechaIng)) {
                            if (bloquear == false) {
                                fechaAgendas = fechaIng;
                            } else {
                                fechaAgendas = FechaOTComprada(cveOT, cveProg);
                            }
                        }

                        myDiv = myDiv + "<div class='divGridCarritoTextFecha'><label>Fecha:</label></div>";
                        myDiv = myDiv + "<div ><input class='txtFechas' type='text' readonly='readonly' id='dtFecha_" + contador + "' value='" + fechaAgendas.esMXFormat() + "' " + disabled + " data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' data-typeOTorProp='O' data-id='" + cveOT + "' data-CvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "' data-Fecha ='" + fechaAgendas.esMXFormat() + "'/></div>";
                        myDiv = myDiv + "<div class='title'><label>Programa:</label></div>";
                        myDiv = myDiv + "<div class='divGridCarritoTextPrograma'><label class='title' id='txtprog_" + contador + "'>" + lstProgramaEmpleado[j].CvePrograma.NombrePrograma + "</label></div>";
                        myDiv = myDiv + "<div><label class='title'>Formato:</label></div>";
                        myDiv = myDiv + "<div class='divGridCarritoFormato'><select class='cmbFormatosCarritoCompras' id='cboForm_" + contador + "' " + disabled + " data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' data-typeOTorProp='O' data-id='" + cveOT + "' data-CvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "'>" + myDivFormato + " </select> </div>";
                        if (bloquear == true) {
                            myDiv = myDiv + "<div class='divGridCarrito'><button type='button' class='btnReplicarCarritoComp' id='btnReplica_" + contador + "' title='Replica' data-CvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "' data-seccion = '" + lstOT[i].CveSeccion.CveSeccion + "' data-id='" + cveOT + "'  data-NombrePrograma='" + lstProgramaEmpleado[j].CvePrograma.NombrePrograma + "' data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "'  data-typeOTorProp='O'/></div>";
                        }
                        myDiv = myDiv + "</div>";
                        contador = contador + 1;
                    }
                    lstOT[i].IndiceCompra = i;
                    lstOTadd.push(lstOT[i]);
                    $("#gridContenedor").append(myDiv);
                    OcultarCheck();
                } else {
                    cveProg = $('option:selected', '#cboProgramas').val();
                    NombreProg = $('option:selected', '#cboProgramas')[0].text;
                    bloquear = InhabilitaControles(cveOT, cveProg);
                    myDiv = myDiv + "<div class='divGridCarritoRow'>"; //rENGLON
                    if (bloquear == true) {
                        disabled = "disabled='disabled'";
                    } else {
                        disabled = "";
                    }
                    myDiv = myDiv + "<div id='check_" + contador + "' class='divGridCarrito'><input type='checkbox' id= 'chkSelect_" + contador + "' data-cvePrograma='" + cveProg + "' " + disabled + " data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' data-typeOTorProp='O' data-id='" + cveOT + "'/></div>"
                    myDiv = myDiv + "<div class='divGridCarritoTextFecha'><label>Fecha:</label></div>";
                    var fechaAgendas1;
                    if (lstOT[i].FechaAgenda != null &&
                    lstOT[i].FechaAgenda != undefined && lstOT[i].FechaAgenda.toString().indexOf('/Date') >= 0) {
                        fechaAgendas1 = new Date(new Number(lstOT[i].FechaAgenda.substr(6, 13)));
                    } else {
                        fechaAgendas1 = new Date(Date.parse(lstOT[i].FechaAgenda.substr(0, 10).replace(/-/i, "/").replace(/-/i, "/")));
                    }

                    if (Number(fechaAgendas1) < Number(fechaIng)) {
                        if (bloquear == false) {
                            fechaAgendas1 = fechaIng;
                        } else {
                            fechaAgendas1 = FechaOTComprada(cveOT, cveProg);

                        }
                    }

                    myDiv = myDiv + "<div class='divGridCarritoFecha'><input type='text' class='toDatePicker txtFechas2' id='dtFecha_" + contador + "' value='" + fechaAgendas1.esMXFormat() + "' " + disabled + " data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' data-typeOTorProp='O' data-id='" + cveOT + "' data-CvePrograma='" + cveProg + "' data-Fecha = '" + fechaAgendas1.esMXFormat() + "'/></div>";
                    myDiv = myDiv + "<div class='title'><label>Formato:</label></div>";
                    myDiv = myDiv + "<div class='divGridCarritoFormato'><select class='cmbFormatosCarritoCompras' id='cboForm_" + contador + "' " + disabled + " data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "' data-typeOTorProp='O' data-id='" + cveOT + "' data-CvePrograma='" + cveProg + "'>" + myDivFormato + " </select> </div>";
                    if (bloquear == true) {
                        myDiv = myDiv + "<div class='divGridCarrito'><button type='button' class='btnReplicarCarritoComp' id='btnReplica_" + contador + "' title='Replica' data-CvePrograma='" + cveProg + "' data-seccion = '" + lstOT[i].CveSeccion.CveSeccion + "' data-id='" + cveOT + "'  data-NombrePrograma='" + NombreProg + "' data-ClaveOrdenTrabajo='" + lstOT[i].ClaveOrdenTrabajo + "'  data-typeOTorProp='O'/></div>";
                    }
                    myDiv = myDiv + "</div>";
                    contador = contador + 1;
                    lstOT[i].IndiceCompra = i;
                    lstOTadd.push(lstOT[i]);
                    $("#gridContenedor").append(myDiv);
                    OcultarCheck();
                }
            }
        }
    }
    if (lstPropuesta != undefined && lstPropuesta.length > 0) {
        lstPropadd = new Array();
        for (var i = 0; i < lstPropuesta.length; i++) {
            if (fncValExist(lstPropuesta[i].CvePropuesta, "P") == false) {
                var myDivP = "";
                myDivP = myDivP + "<div class='divGridCarritoRowPrincipal'>"; //rENGLON
                myDivP = myDivP + "<div class='divGridCarrito'><input type='button' class='btnEliminarAloneCarrito' id='btnEliminar_" + contador + "'   title = 'Eliminar' class='eliminar' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "'/></div>";
                myDivP = myDivP + "<div class='title'><label>Prop:</label></div>";
                myDivP = myDivP + "<div class='title'><label id='txbxOT_" + contador + "'>" + lstPropuesta[i].CvePropuesta + "</label></div>";
                myDivP = myDivP + "<div ><label class='txbxOTTituPROP' id='txbxOTTitu_" + contador + "'> - " + lstPropuesta[i].Titulo + "</label></div>";
                myDivP = myDivP + "</div>";
                if (CveProgEmpl != 8) {
                    for (var j = 0; j < lstProgramaEmpleado.length; j++) {
                        myDivP = myDivP + "<div class='divGridCarritoRow'>"; //RENGLON
                        myDivP = myDivP + "<div id='check_" + contador + "' class='divGridCarrito'><input type='checkbox' id= 'chkSelect_" + contador + "' data-cvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "'/></div>"
                        myDivP = myDivP + "<div class='title'><label>Fecha:</label></div>";
                        var fechaAgendas2;
                        if (lstPropuesta[i].FechaAgenda != null && lstPropuesta[i].FechaAgenda != undefined && lstPropuesta[i].FechaAgenda.toString().indexOf('/Date') >= 0) {
                            fechaAgendas2 = new Date(new Number(lstPropuesta[i].FechaAgenda.substr(6, 13)));
                        } else {
                            fechaAgendas2 = new Date(Date.parse(lstPropuesta[i].FechaAgenda.substr(0, 10).replace(/-/i, "/").replace(/-/i, "/")));
                        }

                        if (Number(fechaAgendas2) < Number(fechaIng)) {
                            fechaAgendas2 = fechaIng;
                        }
                        myDivP = myDivP + "<div class='divGridCarritoFecha'><input type='text'  class='toDatePicker txtFechas2' id='dtFecha_" + contador + "' value='" + fechaAgendas2.esMXFormat() + "' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "' data-cvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "' data-Fecha='" + fechaAgendas2.esMXFormat() + "'/></div>";
                        myDivP = myDivP + "<div class='title'><label>Programa:</label></div>";
                        myDivP = myDivP + "<div class='divGridCarritoTextPrograma'><label class='title' id='txtprog_" + contador + "'>" + lstProgramaEmpleado[j].CvePrograma.NombrePrograma + "</label></div>";
                        myDivP = myDivP + "<div class='title'><label>Formato:</label></div>";
                        myDivP = myDivP + "<div class='divGridCarritoFormato'><select class='cmbFormatosCarritoCompras' id='cboForm_" + contador + "' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "' data-cvePrograma='" + lstProgramaEmpleado[j].CvePrograma.CvePrograma + "'>" + myDivFormato + "</select></div>";
                        myDivP = myDivP + "</div>";
                        contador = contador + 1;
                    }
                    lstPropuesta[i].IndiceCompra = i;
                    lstPropadd.push(lstPropuesta[i]);
                    $("#gridContenedor").append(myDivP);
                } else {
                    CveProg = $('option:selected', '#cboProgramas').val();
                    myDivP = myDivP + "<div  class='divGridCarritoRow'>";  //rENGLON
                    myDivP = myDivP + "<div id='check_" + contador + "' class='divGridCarrito'><input type='checkbox' id= 'chkSelect_" + contador + "' data-cvePrograma='" + CveProg + "' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "'/></div>"
                    myDivP = myDivP + "<div class='divGridCarritoTextFecha'><label>Fecha:</label></div>";
                    var fechaAgendas3;
                    if (lstPropuesta[i].FechaAgenda != null && lstPropuesta[i].FechaAgenda != undefined && lstPropuesta[i].FechaAgenda.toString().indexOf('/Date') >= 0) {
                        fechaAgendas3 = new Date(new Number(lstPropuesta[i].FechaAgenda.substr(6, 13)));
                    } else {
                        fechaAgendas3 = new Date(Date.parse(lstPropuesta[i].FechaAgenda.substr(0, 10).replace(/-/i, "/").replace(/-/i, "/")));
                    }

                    if (Number(fechaAgendas3) < Number(fechaIng)) {
                        fechaAgendas3 = fechaIng;
                    }

                    myDivP = myDivP + "<div class='divGridCarritoFecha'><input type='text' id='dtFecha_" + contador + "' class='toDatePicker txtFechas2' value='" + fechaAgendas3.esMXFormat() + "' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "' data-cvePrograma='" + CveProg + "' data-Fecha ='" + fechaAgendas3.esMXFormat() + "'/></div>";
                    myDivP = myDivP + "<div class='title'><label>Formato:</label></div>";
                    myDivP = myDivP + "<div class='divGridCarritoFormato'><select class='cmbFormatosCarritoCompras' id='cboForm_" + contador + "' data-typeOTorProp='P' data-id='" + lstPropuesta[i].CvePropuesta + "' data-cvePrograma='" + CveProg + "'>" + myDivFormato + "</select></div>";
                    myDivP = myDivP + "</div>";
                    contador = contador + 1;
                    lstPropuesta[i].IndiceCompra = i;
                    lstPropadd.push(lstPropuesta[i]);
                    $("#gridContenedor").append(myDivP);
                }
            }
            OcultarCheck();
        }
    }
}

function InhabilitaControles(NumOT, CveProg) {
    var Validacion = -1;
    if (ListaOTsCompradas != undefined) {
        for (var i = 0; i < ListaOTsCompradas.length; i++) {
            if (ListaOTsCompradas[i][0] == NumOT && ListaOTsCompradas[i][1] == CveProg) {
                return true;
            }
        }
    }
    return false;
}
function FechaOTComprada(NumOT, CveProg) {
    var Validacion = -1;
    if (ListaOTsCompradas != undefined) {
        for (var i = 0; i < ListaOTsCompradas.length; i++) {
            if (ListaOTsCompradas[i][0] == NumOT && ListaOTsCompradas[i][1] == CveProg) {
                return ListaOTsCompradas[i][3];
            }
        }
    }
    return new Date();
}
function btnLimpiar_Click() {
    sessionStorage.usserCarritoOT = "";
    sessionStorage.usserCarritoProp = "";
    lstOTadd = new Array();
    lstPropadd = new Array();
    lstOT = new Array();
    lstPropuesta = new Array();
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $(myDivC).remove();
    });
}
function cmbProgramas_selectionChanged() {
    if (FillCombo == true) return;
    try {
        ValidaCompras();
        $("#btnGuardar")._focus();
    }
    catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function ValidaCompras() {
    var OTCompradas = false;
    var CveProg;
    CveProg = $('option:selected', '#cboProgramas').val();
    if (lstOT.length > 0) {
        for (var i = 0; i < lstOT.length; i++) {
            $.each($("#gridContenedor").children(), function (index, myDivC) {
                var CveOrdenTrabajo;
                var ClaveOrdenTrabajo;
                if ($(myDivC).children().length > 3) {
                    $.each($(myDivC).children(), function (index, myDivInt) {
                        if ($($(myDivInt).children()[0]).attr("data-typeOTorProp") == "O") {
                            ClaveOrdenTrabajo = $($(myDivInt).children()[0]).attr("data-ClaveOrdenTrabajo");
                            CveOrdenTrabajo = $($(myDivInt).children()[0]).attr("data-id");
                            if (InhabilitaControles(CveOrdenTrabajo, CveProg) == true) {
                                if ($(myDivInt).children()[0].id.indexOf("btnReplica") == -1) {
                                    $($(myDivInt).children()[0]).attr("disabled", true);
                                } else {
                                    if ($(myDivInt).children()[0].id.indexOf("btnReplica") != -1) {
                                        $($(myDivInt).children()[0]).show();
                                    }
                                }
                            } else {

                                if ($(myDivInt).children()[0].id.indexOf("btnReplica") == -1) {
                                    $($(myDivInt).children()[0]).removeAttr("disabled");
                                } else {
                                    if ($(myDivInt).children()[0].id.indexOf("btnReplica") != -1) {
                                        $($(myDivInt).children()[0]).hide();
                                    }
                                }
                            }
                        }
                    });
                }
            });
        }
    }
    if (lstPropuesta.length > 0) {
        for (var i = 0; i < lstPropuesta.length; i++) {
            $.each($("#gridContenedor").children(), function (index, myDivC) {
                var CveOrdenTrabajo;
                var ClaveOrdenTrabajo;
                if ($(myDivC).children().length > 3) {
                    $.each($(myDivC).children(), function (index, myDivInt) {
                        if ($($(myDivInt).children()[0]).attr("data-typeOTorProp") == "P") {
                            $($(myDivInt).children()[0]).removeAttr("disabled");
                        }
                    });
                }
            });
        }
    }
}

function fncValcheck(vId, vType, vCveProg) {
    var valor = false;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].type == "checkbox" && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType && $($(myDivInt).children()[0]).attr("data-CvePrograma") == vCveProg) {
                if ($($(myDivInt).children()[0])[0].checked == true) {
                    valor = true;
                }
            }

        });
    });
    return valor;
}
function fncValcheckProg(vId, vType) {
    var valor = false;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].type == "checkbox" && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType) {
                if ($($(myDivInt).children()[0])[0].checked == true) {
                    valor = true;
                }
            }
        });
    });
    return valor;
}
function fncValcmb(vId, vType, vCveProg) {
    var valor = "0, 0";
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].type == "select-one" && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType && $($(myDivInt).children()[0]).attr("data-CvePrograma") == vCveProg) {

                valor = $('option:selected', $($(myDivInt).children()[0])[0]).val() + "," + $('option:selected', $($(myDivInt).children()[0])[0]).attr("data-CveSeccion");
            }
        });
    });
    return valor;
}
function fncValcmbProg(vId, vType) {
    var valor = "0, 0";
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].type == "select-one" && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType) {
                valor = $('option:selected', $($(myDivInt).children()[0])[0]).val() + "," + $('option:selected', $($(myDivInt).children()[0])[0]).attr("data-CveSeccion");
            }
        });
    });
    return valor;
}
function fncValFecha(vId, vType, vCveProg) {
    var valor = undefined;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].id.indexOf("dtFecha") != -1 && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType && $($(myDivInt).children()[0]).attr("data-CvePrograma") == vCveProg) {
                valor = new Date(Date.parse(ConvertToFormatDatetoIng($($(myDivInt).children()[0]).val())));
            }
        });
    });
    return valor;
}
function fncValFechaProg(vId, vType, vCveProg) {
    var valor = undefined;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].id.indexOf("dtFecha") != -1 && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType) {
                valor = new Date(Date.parse(ConvertToFormatDatetoIng($($(myDivInt).children()[0]).val())));
            }
        });
    });
    return valor;
}
function fncValFechaEnabled(vId, vType, vCveProg) {
    var valor = false;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].id.indexOf("dtFecha") != -1 && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType && $($(myDivInt).children()[0]).attr("data-CvePrograma") == vCveProg) {
                valor = $($(myDivInt).children()[0])[0].isDisabled;
                if (valor == undefined)
                    valor = false;
            }
        });
    });
    return valor;
}
function fncValFechaEnabledProg(vId, vType) {
    var valor = false;
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $.each($(myDivC).children(), function (index, myDivInt) {
            if ($($(myDivInt).children()[0])[0].id.indexOf("dtFecha") != -1 && $($(myDivInt).children()[0]).attr("data-id") == vId && $($(myDivInt).children()[0]).attr("data-typeOTorProp") == vType) {
                valor = $($(myDivInt).children()[0])[0].isDisabled;
                if (valor == undefined)
                    valor = false;
            }
        });
    });
    return valor;
}
function SaveShoppinCarNoPrograma() {
    var contador = 0;
    listCompraOT = new Array();
    listCompraPropuesta = new Array();
    var ValidaCheck = false;
    var Valcmb;
    var ValFecha;
    try {
        if (lstOT.length > 0) {
            for (var i = 0; i < lstOT.length; i++) {
                for (var j = 0; j < lstProgramaEmpleado.length; j++) {
                    ValidaCheck = fncValcheck(lstOT[i].CveOrdenTrabajo, "O", lstProgramaEmpleado[j].CvePrograma.CvePrograma);
                    if (ValidaCheck == true) {
                        Valcmb = fncValcmb(lstOT[i].CveOrdenTrabajo, "O", lstProgramaEmpleado[j].CvePrograma.CvePrograma);
                        ValFecha = fncValFecha(lstOT[i].CveOrdenTrabajo, "O", lstProgramaEmpleado[j].CvePrograma.CvePrograma);

                        ValEnabledFecha = fncValFechaEnabled(lstOT[i].CveOrdenTrabajo, "O", lstProgramaEmpleado[j].CvePrograma.CvePrograma);
                        if (ValEnabledFecha == false) {
                            oCompraOT = new CompraOT();
                            var vTDI_SeccionFormato = new TDI_SeccionFormato();
                            vTDI_Seccion = new TDI_Seccion();
                            vTDI_Seccion.CveSeccion = new Number(Valcmb.split(',')[1]);
                            vTDI_Formato = new TDI_Formato();
                            vTDI_Formato.CveFormato = new Number(Valcmb.split(',')[0]);
                            vTDI_SeccionFormato.CveSeccion = vTDI_Seccion;
                            vTDI_SeccionFormato.CveFormato = vTDI_Formato;
                            oCompraOT.CveSeccionFormato = vTDI_SeccionFormato;
                            if (lstProgramaEmpleado[j].CvePrograma.FechaFin != null && lstProgramaEmpleado[j].CvePrograma.FechaFin != undefined && lstProgramaEmpleado[j].CvePrograma.FechaFin.toString().indexOf('/Date') >= 0) {
                                var vFechaFin = new Date(new Number(lstProgramaEmpleado[j].CvePrograma.FechaFin.substr(6, 13)));
                                lstProgramaEmpleado[j].CvePrograma.FechaFin = vFechaFin;
                            }
                            if (lstProgramaEmpleado[j].CvePrograma.FechaInicio != null && lstProgramaEmpleado[j].CvePrograma.FechaInicio != undefined && lstProgramaEmpleado[j].CvePrograma.FechaInicio.toString().indexOf('/Date') >= 0) {
                                var vFechaInicio = new Date(new Number(lstProgramaEmpleado[j].CvePrograma.FechaInicio.substr(6, 13)));
                                lstProgramaEmpleado[j].CvePrograma.FechaInicio = vFechaInicio;
                            }
                            vTDI_ProgramaEmpleado = new TDI_ProgramaEmpleado()
                            vTDI_ProgramaEmpleado.CveEmpleado = lstProgramaEmpleado[j].CveEmpleado;
                            vTDI_ProgramaEmpleado.CvePrograma = lstProgramaEmpleado[j].CvePrograma;
                            oCompraOT.CveProgramaEmpleado = vTDI_ProgramaEmpleado;
                            oCompraOT.CveOrdenTrabajo = new THE_OrdenTrabajo();
                            oCompraOT.CveOrdenTrabajo.ClaveOrdenTrabajo = lstOT[i].ClaveOrdenTrabajo;
                            oCompraOT.CveOrdenTrabajo.CveCliente = lstOT[i].CveCliente;
                            oCompraOT.CveOrdenTrabajo.CveEmpleado = lstOT[i].cveEmpleado;
                            oCompraOT.CveOrdenTrabajo.CveEventoDeportivo = lstOT[i].CveEventoDeportivo;
                            oCompraOT.CveOrdenTrabajo.CveOrdenTrabajo = lstOT[i].CveOrdenTrabajo;
                            oCompraOT.CveOrdenTrabajo.CveOrigen = lstOT[i].CveOrigen;
                            oCompraOT.CveOrdenTrabajo.CveSeccion = lstOT[i].CveSeccion;
                            oCompraOT.CveOrdenTrabajo.CveTipoNota = lstOT[i].CveTipoNota;
                            oCompraOT.CveOrdenTrabajo.Estatus = lstOT[i].Estatus;
                            if (lstOT[i].FechaEvento != null && lstOT[i].FechaEvento != undefined && lstOT[i].FechaEvento.toString().indexOf('/Date') >= 0) {
                                var vFechaEven = new Date(new Number(lstOT[i].FechaEvento.substr(6, 13)));
                                lstOT[i].FechaEvento = vFechaEven;
                            }
                            if (lstOT[i].FechaEvento != undefined) {
                                oCompraOT.CveOrdenTrabajo.FechaEvento = lstOT[i].FechaEvento;
                            }
                            oCompraOT.CveOrdenTrabajo.HistoryLine = lstOT[i].HistoryLine;
                            oCompraOT.CveOrdenTrabajo.Objetivo = lstOT[i].Objetivo;
                            oCompraOT.CveOrdenTrabajo.Origen = lstOT[i].Origen;
                            oCompraOT.CveOrdenTrabajo.Orini = lstOT[i].Orini;
                            oCompraOT.CveOrdenTrabajo.Replica = lstOT[i].Replica;
                            oCompraOT.CveOrdenTrabajo.SolicitudPremisia = lstOT[i].SolicitudPremisia;
                            oCompraOT.CveOrdenTrabajo.Titulo = lstOT[i].Titulo;
                            oCompraOT.CveOrdenTrabajo.Usuario = lstOT[i].Usuario;
                            oCompraOT.CveOrdenTrabajo.UsuarioProductor = lstOT[i].UsuarioProductor;
                            oCompraOT.CveOrdenTrabajo.Version = lstOT[i].Version;
                            oCompraOT.FechaCompra = ValFecha;
                            oCompraOT.SeEnviaINEWS = true;
                            listCompraOT.push(oCompraOT);
                        }
                    }
                }
            }
            if (listCompraOT.length > 0) {
                CompraOTsFin = false;
                ListaINews = listCompraOT;
                var data = new CompraOTS(listCompraOT, sessionStorage.userDomain, GenerateTransac());
                executeRequest(wsMtdCompraOT, JSON.stringify(data, null, 2), successCompraOT, myErrorCompraOT);
            }
            else {
                enOperacion = false;
                CompraOTsFin = true;
            }
        }
        if (lstPropuesta.length > 0) {
            for (var i = 0; i < lstPropuesta.length; i++) {
                for (var j = 0; j < lstProgramaEmpleado.length; j++) {
                    oCompraPropuesta = new CompraPropuesta();
                    ValidaCheck = fncValcheck(lstPropuesta[i].CvePropuesta, "P", lstProgramaEmpleado[j].CvePrograma.CvePrograma);
                    if (ValidaCheck == true) {
                        Valcmb = fncValcmb(lstPropuesta[i].CvePropuesta, "P", lstProgramaEmpleado[j].CvePrograma.CvePrograma);
                        ValFecha = fncValFecha(lstPropuesta[i].CvePropuesta, "P", lstProgramaEmpleado[j].CvePrograma.CvePrograma);
                        var vTDI_SeccionFormato = new TDI_SeccionFormato();
                        vTDI_Seccion = new TDI_Seccion();
                        vTDI_Seccion.CveSeccion = new Number(Valcmb.split(',')[1]);
                        vTDI_Formato = new TDI_Formato();
                        vTDI_Formato.CveFormato = new Number(Valcmb.split(',')[0]);
                        vTDI_SeccionFormato.CveSeccion = vTDI_Seccion;
                        vTDI_SeccionFormato.CveFormato = vTDI_Formato;
                        oCompraPropuesta.CveSeccionFormato = vTDI_SeccionFormato;
                        vTDI_ProgramaEmpleado = new TDI_ProgramaEmpleado()
                        if (lstProgramaEmpleado[j].CvePrograma.FechaFin != null && lstProgramaEmpleado[j].CvePrograma.FechaFin != undefined && lstProgramaEmpleado[j].CvePrograma.FechaFin.toString().indexOf('/Date') >= 0) {
                            var vFechaFin = new Date(new Number(lstProgramaEmpleado[j].CvePrograma.FechaFin.substr(6, 13)));
                            lstProgramaEmpleado[j].CvePrograma.FechaFin = vFechaFin;
                        }
                        if (lstProgramaEmpleado[j].CvePrograma.FechaInicio != null && lstProgramaEmpleado[j].CvePrograma.FechaInicio != undefined && lstProgramaEmpleado[j].CvePrograma.FechaInicio.toString().indexOf('/Date') >= 0) {
                            var vFechaInicio = new Date(new Number(lstProgramaEmpleado[j].CvePrograma.FechaInicio.substr(6, 13)));
                            lstProgramaEmpleado[j].CvePrograma.FechaInicio = vFechaInicio;
                        }
                        vTDI_ProgramaEmpleado.CveEmpleado = lstProgramaEmpleado[j].CveEmpleado;
                        vTDI_ProgramaEmpleado.CvePrograma = lstProgramaEmpleado[j].CvePrograma;
                        oCompraPropuesta.CveProgramaEmpleado = vTDI_ProgramaEmpleado;
                        oCompraPropuesta.FechaCompra = ValFecha;
                        oCompraPropuesta.CvePropuesta = new TDI_Propuesta();
                        oCompraPropuesta.CvePropuesta.CveCable = new THE_Cable();
                        oCompraPropuesta.CvePropuesta.CveCable = lstPropuesta[i].CveCable;
                        oCompraPropuesta.CvePropuesta.CveCliente = new TDI_Cliente();
                        oCompraPropuesta.CvePropuesta.CveCliente.CveCliente = lstPropuesta[i].CveCliente.CveCliente;
                        oCompraPropuesta.CvePropuesta.CveCliente.EmpleadoLlavePrimaria = lstPropuesta[i].CveCliente.EmpleadoLlavePrimaria;
                        oCompraPropuesta.CvePropuesta.CveCliente.EstatusCliente = lstPropuesta[i].CveCliente.EstatusCliente;
                        oCompraPropuesta.CvePropuesta.CveCliente.NombreDescripcion = lstPropuesta[i].CveCliente.NombreDescripcion;
                        oCompraPropuesta.CvePropuesta.CveEmpleado = new TDI_EMPL();
                        oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoLlavePrimaria = lstPropuesta[i].CveEmpleado.EmpleadoLlavePrimaria;
                        oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoNombre = lstPropuesta[i].CveEmpleado.EmpleadoNombre;
                        oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoStatus = lstPropuesta[i].CveEmpleado.EmpleadoStatus;
                        oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoTipo = lstPropuesta[i].CveEmpleado.EmpleadoTipo;
                        oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoUsr = lstPropuesta[i].CveEmpleado.EmpleadoUsr;
                        oCompraPropuesta.CvePropuesta.CvePropuesta = lstPropuesta[i].CvePropuesta;
                        oCompraPropuesta.CvePropuesta.CvePuesto = new TDI_Puestos();
                        oCompraPropuesta.CvePropuesta.CvePuesto.PuestoDescripcion = lstPropuesta[i].CvePuesto.PuestoDescripcion;
                        oCompraPropuesta.CvePropuesta.CvePuesto.PuestoLlavePrimaria = lstPropuesta[i].CvePuesto.PuestoLlavePrimaria;
                        oCompraPropuesta.CvePropuesta.CvePuesto.PuestoStatus = lstPropuesta[i].CvePuesto.PuestoStatus;
                        oCompraPropuesta.CvePropuesta.CveSeccion = new TDI_Seccion();
                        oCompraPropuesta.CvePropuesta.CveSeccion.Cade = lstPropuesta[i].CveSeccion.Cade;
                        oCompraPropuesta.CvePropuesta.CveSeccion.ColorSeccion = lstPropuesta[i].CveSeccion.ColorSeccion;
                        oCompraPropuesta.CvePropuesta.CveSeccion.CveSeccion = lstPropuesta[i].CveSeccion.CveSeccion;
                        oCompraPropuesta.CvePropuesta.CveSeccion.EmpleadoLlavePrimaria = lstPropuesta[i].CveSeccion.EmpleadoLlavePrimaria;
                        oCompraPropuesta.CvePropuesta.CveSeccion.EstatusSeccion = lstPropuesta[i].CveSeccion.EstatusSeccion;
                        oCompraPropuesta.CvePropuesta.CveSeccion.ExtensionResponsable = lstPropuesta[i].CveSeccion.ExtensionResponsable;
                        oCompraPropuesta.CvePropuesta.CveSeccion.NombreSeccion = lstPropuesta[i].CveSeccion.NombreSeccion;
                        oCompraPropuesta.CvePropuesta.CveSeccion.ResponsableSeccion = lstPropuesta[i].CveSeccion.ResponsableSeccion;
                        oCompraPropuesta.CvePropuesta.CveSeccion.SeccionFIA = lstPropuesta[i].CveSeccion.SeccionFIA;
                        oCompraPropuesta.CvePropuesta.CveTipoNota = new TDI_TipoNota();
                        oCompraPropuesta.CvePropuesta.CveTipoNota.AbreviaturaTipoNota = lstPropuesta[i].CveTipoNota.AbreviaturaTipoNota;
                        oCompraPropuesta.CvePropuesta.CveTipoNota.CveTipoNota = lstPropuesta[i].CveTipoNota.CveTipoNota;
                        oCompraPropuesta.CvePropuesta.CveTipoNota.DescripcionTipoNota = lstPropuesta[i].CveTipoNota.DescripcionTipoNota;
                        oCompraPropuesta.CvePropuesta.CveTipoNota.EstatusTipoNota = lstPropuesta[i].CveTipoNota.EstatusTipoNota;
                        oCompraPropuesta.CvePropuesta.Descripcion = lstPropuesta[i].Descripcion;
                        if (lstPropuesta[i].Fecha != null && lstPropuesta[i].Fecha != undefined && lstPropuesta[i].Fecha.toString().indexOf('/Date') >= 0) {
                            var vFechas = new Date(new Number(lstPropuesta[i].Fecha.substr(6, 13)));
                            lstPropuesta[i].Fecha = vFechas;
                        }
                        if (lstPropuesta[i].Fecha != null && lstPropuesta[i].Fecha != undefined) {
                            oCompraPropuesta.CvePropuesta.Fecha = lstPropuesta[i].Fecha;
                        }
                        if (lstPropuesta[i].FechaCreacion != null && lstPropuesta[i].FechaCreacion != undefined && lstPropuesta[i].FechaCreacion.toString().indexOf('/Date') >= 0) {
                            var vFechaCreacion = new Date(new Number(lstPropuesta[i].FechaCreacion.substr(6, 13)));
                            lstPropuesta[i].FechaCreacion = vFechaCreacion;
                        }
                        if (lstPropuesta[i].FechaCreacion != null && lstPropuesta[i].FechaCreacion != undefined) {
                            oCompraPropuesta.CvePropuesta.FechaCreacion = lstPropuesta[i].FechaCreacion;
                        }
                        oCompraPropuesta.CvePropuesta.Objetivo = lstPropuesta[i].Objetivo;
                        oCompraPropuesta.CvePropuesta.Tema = lstPropuesta[i].Tema;
                        oCompraPropuesta.CvePropuesta.Titulo = lstPropuesta[i].Titulo;
                        oCompraPropuesta.CvePropuesta.Usuario = lstPropuesta[i].Usuario;
                        listCompraPropuesta.push(oCompraPropuesta);
                    }
                }
                contador++;
            }
            if (listCompraPropuesta.length > 0) {
                CompraPropFin = false;
                var data = new CompraPropuesta(listCompraPropuesta, sessionStorage.numUsuario, GenerateTransac());
                executeRequest(wsMtdCompraPropuesta, JSON.stringify(data, null, 2), successCompraPropuesta, myErrorCompraPropuesta);
            }
            else {
                enOperacion = false;
                CompraPropFin = true;
            }
        }
        if (lstOT.length == 0 && lstPropuesta.length == 0) {
            enOperacion = false;
            CompraPropFin = true;
        }
    }
    catch (ex) {
        enOperacion = false;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function SaveShoppinCarPrograma() {
    try {
        var contador = -1;
        listCompraOT = new Array();
        listCompraPropuesta = new Array();
        var Valcmb;
        var ValFecha;
        var oc = new CompraOT();
        var CveProg;
        var ValidaCheck = false;
        if (lstPropuesta.length == 0 && lstOT.length == 0) {
            enOperacion = false;
            CompraPropFin = true;
            return;
        }
        CveProg = $('option:selected', '#cboProgramas').val();
        if (lstOT.length > 0) {
            for (var i = 0; i < lstOT.length; i++) {
                var oCompraOT = new CompraOT();
                contador += 1;
                Valcmb = fncValcmbProg(lstOT[i].CveOrdenTrabajo, "O");
                ValFecha = fncValFechaProg(lstOT[i].CveOrdenTrabajo, "O");
                ValEnabledFecha = fncValFechaEnabledProg(lstOT[i].CveOrdenTrabajo, "O");
                ValidaCheck = fncValcheckProg(lstOT[i].CveOrdenTrabajo, "O");
                if (ValEnabledFecha == false) {
                    var vTDI_SeccionFormato = new TDI_SeccionFormato();
                    vTDI_Seccion = new TDI_Seccion();
                    vTDI_Seccion.CveSeccion = new Number(Valcmb.split(',')[1]);
                    vTDI_Formato = new TDI_Formato();
                    vTDI_Formato.CveFormato = new Number(Valcmb.split(',')[0]);
                    vTDI_SeccionFormato.CveSeccion = vTDI_Seccion;
                    vTDI_SeccionFormato.CveFormato = vTDI_Formato;
                    var vTDI_ProgramaEmpleado = new TDI_ProgramaEmpleado();
                    var vTDI_Programa = new TDI_Programa();
                    vTDI_Programa.CvePrograma = new Number(CveProg);
                    vTDI_Programa.NombrePrograma = $('option:selected', '#cboProgramas')[0].text;
                    var vTDI_EMPL = new TDI_EMPL();
                    vTDI_EMPL.EmpleadoLlavePrimaria = new Number($('option:selected', '#cboProgramas').attr("data-CveEmpleado"));
                    vTDI_EMPL.EmpleadoNombre = $('option:selected', '#cboProgramas').attr("data-NombreEmpleado");
                    vTDI_ProgramaEmpleado.CveEmpleado = vTDI_EMPL;
                    vTDI_ProgramaEmpleado.CvePrograma = vTDI_Programa;
                    oCompraOT.CveSeccionFormato = vTDI_SeccionFormato;
                    oCompraOT.CveProgramaEmpleado = vTDI_ProgramaEmpleado;
                    oCompraOT.CveOrdenTrabajo = new THE_OrdenTrabajo();
                    oCompraOT.CveOrdenTrabajo.ClaveOrdenTrabajo = lstOT[i].ClaveOrdenTrabajo;
                    oCompraOT.CveOrdenTrabajo.CveCliente = lstOT[i].CveCliente;
                    oCompraOT.CveOrdenTrabajo.CveEmpleado = lstOT[i].CveEmpleado;
                    oCompraOT.CveOrdenTrabajo.CveEventoDeportivo = lstOT[i].CveEventoDeportivo;
                    oCompraOT.CveOrdenTrabajo.CveOrdenTrabajo = lstOT[i].CveOrdenTrabajo;
                    oCompraOT.CveOrdenTrabajo.CveOrigen = lstOT[i].CveOrigen;
                    oCompraOT.CveOrdenTrabajo.CveSeccion = lstOT[i].CveSeccion;
                    oCompraOT.CveOrdenTrabajo.CveTipoNota = lstOT[i].CveTipoNota;
                    oCompraOT.CveOrdenTrabajo.Estatus = lstOT[i].Estatus;
                    if (lstOT[i].FechaEvento != null && lstOT[i].FechaEvento != undefined && lstOT[i].FechaEvento.toString().indexOf('/Date') >= 0) {
                        var vFechaEven = new Date(new Number(lstOT[i].FechaEvento.substr(6, 13)));
                        lstOT[i].FechaEvento = vFechaEven;
                    }
                    if (lstOT[i].FechaEvento != null && lstOT[i].FechaEvento != undefined) {
                        oCompraOT.CveOrdenTrabajo.FechaEvento = lstOT[i].FechaEvento;
                    }
                    oCompraOT.CveOrdenTrabajo.HistoryLine = lstOT[i].HistoryLine;
                    oCompraOT.CveOrdenTrabajo.Objetivo = lstOT[i].Objetivo;
                    oCompraOT.CveOrdenTrabajo.Origen = lstOT[i].Origen;
                    oCompraOT.CveOrdenTrabajo.Orini = lstOT[i].Orini;
                    oCompraOT.CveOrdenTrabajo.Replica = lstOT[i].Replica;
                    oCompraOT.CveOrdenTrabajo.SolicitudPremisia = lstOT[i].SolicitudPremisia;
                    oCompraOT.CveOrdenTrabajo.Titulo = lstOT[i].Titulo;
                    oCompraOT.CveOrdenTrabajo.Usuario = lstOT[i].Usuario;
                    oCompraOT.CveOrdenTrabajo.UsuarioProductor = lstOT[i].UsuarioProductor;
                    oCompraOT.CveOrdenTrabajo.Version = lstOT[i].Version;
                    oCompraOT.FechaCompra = ValFecha;
                    oCompraOT.SeEnviaINEWS = true;
                    oc = oCompraOT;
                    listCompraOT.push(oCompraOT);
                }
            }
            if (listCompraOT.length > 0) {
                CompraOTsFin = false;
                ListaINews = listCompraOT;
                var data = new CompraOTS(listCompraOT, sessionStorage.userDomain, GenerateTransac());
                executeRequest(wsMtdCompraOT, JSON.stringify(data, null, 2), successCompraOT, myErrorCompraOT);
            }
            else {
                enOperacion = false;
                CompraOTsFin = true;
            }
        }
        if (lstPropuesta.length > 0) {
            for (var i = 0; i < lstPropuesta.length; i++) {
                contador += 1;
                var oCompraPropuesta = new CompraPropuesta();
                Valcmb = fncValcmbProg(lstPropuesta[i].CvePropuesta, "P");
                ValFecha = fncValFechaProg(lstPropuesta[i].CvePropuesta, "P");
                ValEnabledFecha = fncValFechaEnabledProg(lstPropuesta[i].CvePropuesta, "P");
                ValidaCheck = fncValcheckProg(lstPropuesta[i].CvePropuesta, "P");
                if (ValEnabledFecha == false) {
                    var vTDI_SeccionFormato = new TDI_SeccionFormato();
                    vTDI_Seccion = new TDI_Seccion();
                    vTDI_Seccion.CveSeccion = new Number(Valcmb.split(',')[1]);
                    vTDI_Formato = new TDI_Formato();
                    vTDI_Formato.CveFormato = new Number(Valcmb.split(',')[0]);
                    vTDI_SeccionFormato.CveSeccion = vTDI_Seccion;
                    vTDI_SeccionFormato.CveFormato = vTDI_Formato;
                    var vTDI_ProgramaEmpleado = new TDI_ProgramaEmpleado();
                    var vTDI_Programa = new TDI_Programa();
                    vTDI_Programa.CvePrograma = new Number(CveProg);
                    vTDI_Programa.NombrePrograma = $('option:selected', '#cboProgramas')[0].text;
                    var vTDI_EMPL = new TDI_EMPL();
                    vTDI_EMPL.EmpleadoLlavePrimaria = new Number($('option:selected', '#cboProgramas').attr("data-CveEmpleado"));
                    vTDI_EMPL.EmpleadoNombre = $('option:selected', '#cboProgramas').attr("data-NombreEmpleado");
                    vTDI_ProgramaEmpleado.CveEmpleado = vTDI_EMPL;
                    vTDI_ProgramaEmpleado.CvePrograma = vTDI_Programa;
                    oCompraPropuesta.CveSeccionFormato = vTDI_SeccionFormato;
                    oCompraPropuesta.CveProgramaEmpleado = vTDI_ProgramaEmpleado;
                    oCompraPropuesta.FechaCompra = ValFecha;
                    oCompraPropuesta.CvePropuesta = new TDI_Propuesta();
                    oCompraPropuesta.CvePropuesta.CveCable = new THE_Cable();
                    oCompraPropuesta.CvePropuesta.CveCable = lstPropuesta[i].CveCable;
                    oCompraPropuesta.CvePropuesta.CveCliente = new TDI_Cliente();
                    oCompraPropuesta.CvePropuesta.CveCliente.CveCliente = lstPropuesta[i].CveCliente.CveCliente;
                    oCompraPropuesta.CvePropuesta.CveCliente.EmpleadoLlavePrimaria = lstPropuesta[i].CveCliente.EmpleadoLlavePrimaria;
                    oCompraPropuesta.CvePropuesta.CveCliente.EstatusCliente = lstPropuesta[i].CveCliente.EstatusCliente;
                    oCompraPropuesta.CvePropuesta.CveCliente.NombreDescripcion = lstPropuesta[i].CveCliente.NombreDescripcion;
                    oCompraPropuesta.CvePropuesta.CveEmpleado = new TDI_EMPL();
                    oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoLlavePrimaria = lstPropuesta[i].CveEmpleado.EmpleadoLlavePrimaria;
                    oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoNombre = lstPropuesta[i].CveEmpleado.EmpleadoNombre;
                    oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoStatus = lstPropuesta[i].CveEmpleado.EmpleadoStatus;
                    oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoTipo = lstPropuesta[i].CveEmpleado.EmpleadoTipo;
                    oCompraPropuesta.CvePropuesta.CveEmpleado.EmpleadoUsr = lstPropuesta[i].CveEmpleado.EmpleadoUsr;
                    oCompraPropuesta.CvePropuesta.CvePropuesta = lstPropuesta[i].CvePropuesta;
                    oCompraPropuesta.CvePropuesta.CvePuesto = new TDI_Puestos();
                    oCompraPropuesta.CvePropuesta.CvePuesto.PuestoDescripcion = lstPropuesta[i].CvePuesto.PuestoDescripcion;
                    oCompraPropuesta.CvePropuesta.CvePuesto.PuestoLlavePrimaria = lstPropuesta[i].CvePuesto.PuestoLlavePrimaria;
                    oCompraPropuesta.CvePropuesta.CvePuesto.PuestoStatus = lstPropuesta[i].CvePuesto.PuestoStatus;
                    oCompraPropuesta.CvePropuesta.CveSeccion = new TDI_Seccion();
                    oCompraPropuesta.CvePropuesta.CveSeccion.Cade = lstPropuesta[i].CveSeccion.Cade;
                    oCompraPropuesta.CvePropuesta.CveSeccion.ColorSeccion = lstPropuesta[i].CveSeccion.ColorSeccion;
                    oCompraPropuesta.CvePropuesta.CveSeccion.CveSeccion = lstPropuesta[i].CveSeccion.CveSeccion;
                    oCompraPropuesta.CvePropuesta.CveSeccion.EmpleadoLlavePrimaria = lstPropuesta[i].CveSeccion.EmpleadoLlavePrimaria;
                    oCompraPropuesta.CvePropuesta.CveSeccion.EstatusSeccion = lstPropuesta[i].CveSeccion.EstatusSeccion;
                    oCompraPropuesta.CvePropuesta.CveSeccion.ExtensionResponsable = lstPropuesta[i].CveSeccion.ExtensionResponsable;
                    oCompraPropuesta.CvePropuesta.CveSeccion.NombreSeccion = lstPropuesta[i].CveSeccion.NombreSeccion;
                    oCompraPropuesta.CvePropuesta.CveSeccion.ResponsableSeccion = lstPropuesta[i].CveSeccion.ResponsableSeccion;
                    oCompraPropuesta.CvePropuesta.CveSeccion.SeccionFIA = lstPropuesta[i].CveSeccion.SeccionFIA;
                    oCompraPropuesta.CvePropuesta.CveTipoNota = new TDI_TipoNota();
                    oCompraPropuesta.CvePropuesta.CveTipoNota.AbreviaturaTipoNota = lstPropuesta[i].CveTipoNota.AbreviaturaTipoNota;
                    oCompraPropuesta.CvePropuesta.CveTipoNota.CveTipoNota = lstPropuesta[i].CveTipoNota.CveTipoNota;
                    oCompraPropuesta.CvePropuesta.CveTipoNota.DescripcionTipoNota = lstPropuesta[i].CveTipoNota.DescripcionTipoNota;
                    oCompraPropuesta.CvePropuesta.CveTipoNota.EstatusTipoNota = lstPropuesta[i].CveTipoNota.EstatusTipoNota;
                    oCompraPropuesta.CvePropuesta.Descripcion = lstPropuesta[i].Descripcion;
                    if (lstPropuesta[i].Fecha != null && lstPropuesta[i].Fecha != undefined && lstPropuesta[i].Fecha.toString().indexOf('/Date') >= 0) {
                        var vFechas = new Date(new Number(lstPropuesta[i].Fecha.substr(6, 13)));
                        lstPropuesta[i].Fecha = vFechas;
                    }
                    if (lstPropuesta[i].Fecha != null && lstPropuesta[i].Fecha != undefined) {
                        oCompraPropuesta.CvePropuesta.Fecha = lstPropuesta[i].Fecha;
                    }
                    if (lstPropuesta[i].FechaCreacion != null && lstPropuesta[i].FechaCreacion != undefined && lstPropuesta[i].FechaCreacion.toString().indexOf('/Date') >= 0) {
                        var vFechaCreacion = new Date(new Number(lstPropuesta[i].FechaCreacion.substr(6, 13)));
                        lstPropuesta[i].FechaCreacion = vFechaCreacion;
                    }
                    if (lstPropuesta[i].FechaCreacion != null && lstPropuesta[i].FechaCreacion != undefined) {
                        oCompraPropuesta.CvePropuesta.FechaCreacion = lstPropuesta[i].FechaCreacion;
                    }
                    oCompraPropuesta.CvePropuesta.Objetivo = lstPropuesta[i].Objetivo;
                    oCompraPropuesta.CvePropuesta.Tema = lstPropuesta[i].Tema;
                    oCompraPropuesta.CvePropuesta.Titulo = lstPropuesta[i].Titulo;
                    oCompraPropuesta.CvePropuesta.Usuario = lstPropuesta[i].Usuario;
                    oCompraPropuesta.CvePropuesta.Empresa = new TDI_Empresa();
                    if (lstPropuesta[i].Empresa != undefined)
                    { oCompraPropuesta.CvePropuesta.Empresa.CveEmpresa = lstPropuesta[i].Empresa.CveEmpresa; }

                    oCompraPropuesta.CvePropuesta.Local = new TDI_Local();
                    oCompraPropuesta.CvePropuesta.Local = lstPropuesta[i].Local;
                    listCompraPropuesta.push(oCompraPropuesta);
                }
            }
            if (listCompraPropuesta.length > 0) {
                CompraPropFin = false;
                var data = new CompraPropuesta(listCompraPropuesta, sessionStorage.numUsuario, GenerateTransac());
                executeRequest(wsMtdCompraPropuesta, JSON.stringify(data, null, 2), successCompraPropuesta, myErrorCompraOT);
            }
            else {
                enOperacion = false;
                CompraPropFin = true;
            }
        }
    }
    catch (ex) {
        enOperacion = false;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
var successFunction = function (data, status) {
    ResetShoppinCar();
    Comprado = true;
    enOperacion = false;
    if (listCompraOT.length > 0 && listCompraPropuesta.length == 0) {
        sessionStorage.usserCarritoOT = "";
        sessionStorage.usserCarritoProp = "";
        parent.closeWindow(initVars['windowId']);
    }
}
var successFunctionProp = function (data, status) {
    ResetShoppinCar();
    if (listCompraOT.length >= 0 && listCompraPropuesta.length > 0) {
        sessionStorage.usserCarritoOT = "";
        sessionStorage.usserCarritoProp = "";
        parent.closeWindow(initVars['windowId']);
    }
}
var successCompraOT = function (data, status) {
    try {
        CompraOTsFin = true;
        
        if (data.d != undefined) {
            if (data.d == true) {
                alertModalFunction("La Compra de las OT's se ha realizado con éxito", successFunction);
               
            } else {
                alertModal("Ocurrio un Problema al Compara las OT's");
            }
        }
    }
    catch (ex) {
        enOperacion = false;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function myErrorCompraOT(request, status, error) {
    CompraOTsFin = true;
    alertModal('Error al comprar la orden de trabajo.');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    enOperacion = false;
}
function ResetShoppinCar() {
    lstPropuesta = new Array();
    lstOT = new Array();
    lstOTadd = new Array();
    lstPropadd = new Array();
    $.each($("#gridContenedor").children(), function (index, myDivC) {
        $(myDivC).remove();
    });
    ConsultaOTCompradas();
}
var successCompraPropuesta = function (data, status) {
    try {
        CompraPropFin = true;
        if (data.d != undefined) {
            if (data.d == true) {
                alertModalFunction("La Compra de las OT's se han enviado al iNEWs con éxito", successFunctionProp); 
            }
            else {
                alertModal("Ocurrio un Problema al Intentar enviar al iNEWs");
            }
        }
        Comprado = true;
        enOperacion = false;
    }
    catch (ex) {
        enOperacion = false;
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }

}
function myErrorCompraPropuesta(request, status, error) {
    CompraPropFin = true;
    alertModal('Error al comprar la propuesta.');
    ManejadorErrores(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    enOperacion = false;
}
