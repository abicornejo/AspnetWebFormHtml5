var existeLoading;
var ObjOT;
var ObjTransmision;
var lstFormatoCompra;
var oCompraGuardada = new THE_FormatoCompra();
var oOrdenTrabajo;
var oAgendaSemanal;
var DatosOT;
var WaitCount = 0;
var cveOT = 0;
var ListaOTs = "";
var initVars;
var IdProgTrans;
var arrOTAgenda;
var arrOTEquipo;
var arrOTLogistica;
var arrOTOrdenTrab;
var arrEstaEliminada;
var arrProgramasTransmitir;
var gblpathPage = "";
//Este script recibe los parametros IdPrograma, CveOrdenTrabajo, NombrePrograma para cargar la información
window.onload = function () {
    initialize();
}
$(document).ready(function () {
    $("#loading").ajaxStart(function () {
        $(this).show();
    });
    $("#loading").ajaxStop(function () {
        $(this).hide();
    });
});
function initialize() {
    initVars = getUrlVars();
    lstFormatoCompra = new Array();
    $("#dgFormatos").delegate(".onchange", "change", function () {
        try {
            if ($(this)[0].checked == true) {
                var objSeccionFormato = ObtenFormato($(this).attr("data-idFormato"));
                var oFormatoCompra = new THE_FormatoCompra();
                oFormatoCompra.CveFormato = objSeccionFormato.CveFormato;
                oFormatoCompra.duracion = objSeccionFormato.CveFormato.Duracion;
                var oPrograma = new TDI_Programa();
                oPrograma.CvePrograma = ObjTransmision.IdPrograma;
                oPrograma.NombrePrograma = ObjTransmision.Programa;
                oFormatoCompra.CvePrograma = oPrograma;
                oFormatoCompra.CveOT = ObjOT;
                oFormatoCompra.FechaCreacion = new Date();
                if (ObjTransmision.FechaProgramada != null && ObjTransmision.FechaProgramada != undefined && ObjTransmision.FechaProgramada.toString().indexOf('/Date') >= 0) {
                    var vFechaProgramada = new Date(new Number(ObjTransmision.FechaProgramada.substr(6, 13)));
                    ObjTransmision.FechaProgramada = vFechaProgramada;
                }
                oFormatoCompra.FechaCompra = ObjTransmision.FechaProgramada;
                oFormatoCompra.UsuarioCreacion = sessionStorage.userDomain;
                lstFormatoCompra.push(oFormatoCompra);
            } else {
                lstFormatoCompra.splice(FindIndexListSource($(this).attr("data-idFormato")), 1);
            }
        }
        catch (ex) {
            ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
        }
    });

    if (arrProgramasTransmitir != undefined && arrProgramasTransmitir != null) {
        GetProgramasTransmitir();
    }

    gblpathPage = '/FiatubeHTML5/OT/Replicar.aspx';
}
function GetProgramasTransmitir() {
    IdProgTrans = initVars["IdPrograma"];
    if (arrProgramasTransmitir != undefined && arrProgramasTransmitir.length > 1) {
        for (var i = 0; i < arrProgramasTransmitir.length; i++) {
            if (arrProgramasTransmitir[i].IdPrograma == IdProgTrans) {
                ObjTransmision = arrProgramasTransmitir[i];
                break;
            }
        }
    }
    else {
        ObjTransmision = arrProgramasTransmitir[0];
    }
    fncConsultaDatosPantalla();
}
function FindIndexListSource(vIdFormato) {
    for (var i = 0; i < lstFormatoCompra.length; i++) {
        if (lstFormatoCompra[i].CveFormato.CveFormato == vIdFormato) {
            return i;
            break;
        }
    }
    return -1;
 }
 function myErrorTransmitir(request, status, error) {
     
    ManejadorErroresMsgStr(error, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
}
var successGetProgramasTransmitir = function (data, status) {
    IdProgTrans = initVars["IdPrograma"];
    
    if (data.d != undefined && data.d.length > 1) {
        for (var i = 0; i < data.d.length; i++) {
            if (data.d[i].IdPrograma == IdProgTrans) {
                ObjTransmision = data.d[i];
                break;
            }
        }
    }
    else {
        ObjTransmision = data.d[0];
    }
    fncConsultaDatosPantalla();
}
function fncConsultaDatosPantalla() {
    try {
        var oDatosOTPantalla = new Datos_PantallaOT();
        oDatosOTPantalla.OTAgenda = arrOTAgenda;
        oDatosOTPantalla.OTEquipo = arrOTEquipo;
        oDatosOTPantalla.OTOrdenTrab = arrOTOrdenTrab;
        oDatosOTPantalla.OTLogistica = arrOTLogistica;
        oDatosOTPantalla.EstaEliminada = arrEstaEliminada;
        DatosOT = oDatosOTPantalla;
        if (oDatosOTPantalla.OTOrdenTrab != undefined)
        {
            ObjOT = oDatosOTPantalla.OTOrdenTrab[0];
            if (ObjOT.FechaAgenda != null && ObjOT.FechaAgenda != undefined && ObjOT.FechaAgenda.toString().indexOf('/Date') >= 0) {
                var vFechaAgenda = new Date(new Number(ObjOT.FechaAgenda.substr(6, 13)));
                ObjOT.FechaAgenda = vFechaAgenda;
            }
            if (ObjOT.FechaEvento != null && ObjOT.FechaEvento != undefined && ObjOT.FechaEvento.toString().indexOf('/Date') >= 0) {
                var vFechaEvento = new Date(new Number(ObjOT.FechaEvento.substr(6, 13)));
                ObjOT.FechaEvento = vFechaEvento;
            }
            if (ObjOT.Programa != undefined) {
                if (ObjOT.Programa.FechaFin != null && ObjOT.Programa.FechaFin != undefined && ObjOT.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                    var vFechaFin = new Date(new Number(ObjOT.Programa.FechaFin.substr(6, 13)));
                    ObjOT.Programa.FechaFin = vFechaFin;
                }
                if (ObjOT.Programa.FechaInicio != null && ObjOT.Programa.FechaInicio != undefined && ObjOT.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                    var vFechaInicio = new Date(new Number(ObjOT.Programa.FechaInicio.substr(6, 13)));
                    ObjOT.Programa.FechaInicio = vFechaInicio;
                }
            }
            cveOT = initVars["CveOrdenTrabajo"];
            var lstFormatoCompra = new Array();
            FillPantalla();
        }
        if (DatosOT != undefined) {
            if (DatosOT.OTLogistica != null && DatosOT.OTLogistica != undefined && DatosOT.OTLogistica.length > 0) {
                if (DatosOT.OTLogistica[0].FechaEvento != undefined && DatosOT.OTLogistica[0].FechaEvento.toString().indexOf('/Date') >= 0) {
                    var vFechaEvento = new Date(new Number(DatosOT.OTLogistica[0].FechaEvento.substr(6, 13)));
                    DatosOT.OTLogistica[0].FechaEvento = vFechaEvento;
                }
                if (DatosOT.OTLogistica[0].FechaFin != null && DatosOT.OTLogistica[0].FechaFin != undefined && DatosOT.OTLogistica[0].FechaFin.toString().indexOf('/Date') >= 0) {
                    var vFechaFin = new Date(new Number(DatosOT.OTLogistica[0].FechaFin.substr(6, 13)));
                    DatosOT.OTLogistica[0].FechaFin = vFechaFin;
                }
                if (DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento != null && DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento != undefined && DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
                    var vFechaEvento = new Date(new Number(DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento.substr(6, 13)));
                    DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento = vFechaEvento;
                }
                if (DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento != null && DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento != undefined && DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento.toString().indexOf('/Date') >= 0) {
                    var vFechaEvento = new Date(new Number(DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento.substr(6, 13)));
                    DatosOT.OTLogistica[0].CveOrdenTrabajo.FechaEvento = vFechaEvento;
                }
                if (DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa != null && DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa != undefined) {
                    if (DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaInicio != null && DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaInicio != undefined && DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaInicio.toString().indexOf('/Date') >= 0) {
                        var vFechaInicio1 = new Date(new Number(DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaInicio.substr(6, 13)));
                        DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaInicio = vFechaInicio1;
                    }
                    if (DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaFin != null && DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaFin != undefined && DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaFin.toString().indexOf('/Date') >= 0) {
                        var vFechaFin1 = new Date(new Number(DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaFin.substr(6, 13)));
                        DatosOT.OTLogistica[0].CveOrdenTrabajo.Programa.FechaFin = vFechaFin1;
                    }
                }
            }
        }
    } catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function FillPantalla() {
    var myDiv = "";
    $.each($("#dgFormatos").children(), function (index, myDiv) {
        $(myDiv).remove();
    });
    $("#lblOT").empty();
    $('#lblNumOT').append(ObjOT.ClaveOrdenTrabajo);
    $("#lblNomPrograma").empty();
    if (ObjTransmision != null && ObjTransmision != undefined && ObjTransmision.Programa != undefined) {
        $('#lblNomPrograma').append(ObjTransmision.Programa);
    } else {
        $('#lblNomPrograma').append(initVars["NombrePrograma"]);
    }
    var vformatos = ObjTransmision.CboFormatos;
    for (var i = 0; i < ObjTransmision.CboFormatos.length; i++) {
        myDiv = "<div class='dgFormatosReplicar'>"; //RENGLON
        myDiv = myDiv + "<div class='dgPlaylistCheckbox'> <input type='checkbox' class='onchange' data-idFormato='" + ObjTransmision.CboFormatos[i].CveFormato.CveFormato + "'/></div>";
        myDiv = myDiv + "<div class='itemsDgPlaylistReplica'><label>" + ObjTransmision.CboFormatos[i].CveFormato.Descripcion + "</label></div>";
        myDiv = myDiv + "</div>";//
        $("#dgFormatos").append(myDiv);
    }
}
function ObtenFormato(vIdFormato) {
    for (var i = 0; i < ObjTransmision.CboFormatos.length; i++) {
        if (ObjTransmision.CboFormatos[i].CveFormato.CveFormato == vIdFormato) {
            return ObjTransmision.CboFormatos[i];
        }
    }
    return undefined;
}
function btnGuardar_Click() { 
try
    {
        if (lstFormatoCompra.length > 0) {
            ListaOTs = "";
            ComienzaDuplicadoOTPrincipal();
        }
        else
        {
            alertModal('Necesita seleccionar al menos un formato, para poder guardar');
        }
    }
    catch (ex)
    {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function ComienzaDuplicadoOTPrincipal() {
    oOrdenTrabajo = new THE_OrdenTrabajo();
    if (ObjOT.FabrLlave != undefined && ObjOT.FabrLlave.Programa != undefined)
    {
        ObjOT.FabrLlave.Programa = null;
    }
    oOrdenTrabajo = ObjOT;
    oOrdenTrabajo.ClaveOrdenTrabajo = "";
    oOrdenTrabajo.CveOrdenTrabajo = 0;
    oOrdenTrabajo.Replica = "1";
    oOrdenTrabajo.Origen = cveOT;
    var data = new GuardarOT(oOrdenTrabajo, GenerateTransac());
    executeRequest(wsMtdGuardarOT, JSON.stringify(data, null, 2), successGuardaOT, myErrorTransmitir);
 }
 var successGuardaOT = function (data, status) {
     try {
         if (data.d != undefined) {
             if (data.d > 0) {
                 oOrdenTrabajo.CveOrdenTrabajo = data.d;
                 var data = "{ 'NumeroOT':'" + oOrdenTrabajo.CveOrdenTrabajo + "' }";
                 executeRequest(wsMtdObtenerDatosPantallaOrdenTrabajo, data, successConsultaDatosPantallaAct, myErrorTransmitir);
             }
         }
     } catch (ex) {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
     }
 }
 var successConsultaDatosPantallaAct = function (data, status) {
     if (data.d != undefined) {
         var oDatosOTPantalla = new Datos_PantallaOT();
         oDatosOTPantalla = data.d;
         if (!oDatosOTPantalla.EstaEliminada) {
             oOrdenTrabajo.ClaveOrdenTrabajo = oDatosOTPantalla.OTOrdenTrab[0].ClaveOrdenTrabajo;
             oAgendaSemanal = DatosOT.OTAgenda[0];
             oAgendaSemanal.CveAgendaSemanal = 0;
             oAgendaSemanal.FechaInicio = oAgendaSemanal.FechaInicio;
             oAgendaSemanal.NumeroOTPropuesta = oOrdenTrabajo.CveOrdenTrabajo;
             if (oAgendaSemanal.FechaCreacion != undefined && oAgendaSemanal.FechaCreacion.toString().indexOf('/Date') >= 0) {
                 var vFechaCreacion= new Date(new Number(oAgendaSemanal.FechaCreacion.substr(6, 13)));
                 oAgendaSemanal.FechaCreacion = vFechaCreacion;
             }
             if (oAgendaSemanal.FechaInicio2 != undefined && oAgendaSemanal.FechaInicio2.toString().indexOf('/Date') >= 0) {
                 var vFechaInicio2 = new Date(new Number(oAgendaSemanal.FechaInicio2.substr(6, 13)));
                 oAgendaSemanal.FechaInicio2 = vFechaInicio2;
             }
             var data = new GuardarAgendaSemanal(oAgendaSemanal);
             executeRequest(wsMtdSaveAgenSem, JSON.stringify(data, null, 2), successGuardarAgendaSemanal, myErrorTransmitir);
         }
     }
 }
 var successGuardarAgendaSemanal = function (data, status) {
     if (data.d != undefined && data.d > 0) {
         oAgendaSemanal.CveAgendaSemanal = data.d;
         //Si Tiene Equipo de Trabajo lo manda a guardar si no comienza el replicado de la OT
         for (var i = 0; i < DatosOT.OTEquipo.length; i++) {
             WaitCount = WaitCount + 1;
         }
         if (WaitCount > 0) {
             for (var i = 0; i < DatosOT.OTEquipo.length; i++) {
                 DatosOT.OTEquipo[i].CveEquipoTrabajo = 0;
                 DatosOT.OTEquipo[i].CveOrdenTrabajo = oOrdenTrabajo;
                 if (DatosOT.OTEquipo[i].CvePrograma.FechaFin != undefined && DatosOT.OTEquipo[i].CvePrograma.FechaFin.toString().indexOf('/Date') >= 0) {
                     var vFechaFin = new Date(new Number(DatosOT.OTEquipo[i].CvePrograma.FechaFin.substr(6, 13)));
                     DatosOT.OTEquipo[i].CvePrograma.FechaFin = vFechaFin;
                 }
                 if (DatosOT.OTEquipo[i].CvePrograma.FechaInicio != undefined && DatosOT.OTEquipo[i].CvePrograma.FechaInicio.toString().indexOf('/Date') >= 0) {
                     var vFechaInicio = new Date(new Number(DatosOT.OTEquipo[i].CvePrograma.FechaInicio.substr(6, 13)));
                     DatosOT.OTEquipo[i].CvePrograma.FechaInicio = vFechaInicio;
                 }
                 var data = new GuardarEquipoTrabajo(DatosOT.OTEquipo[i]);
                 executeRequest(wsMtdGuardarEquipoTrabajo, JSON.stringify(data, null, 2), successGuardarEquipoTrabajo, myErrorTransmitir);
             }

         }
         else if (WaitCount == 0) {
             ActualizaOTRA_CVEC_OT();
         }
     }
 }
 function ActualizaOTRA_CVEC_OT()
 {
     var data = new ActualizaOT(oOrdenTrabajo);
     executeRequest(wsMtdActualizaOT, JSON.stringify(data, null, 2), successActualizaOT, myErrorTransmitir);
 }
 var successGuardarEquipoTrabajo = function (data, status) {
     try
    {
        if (WaitCount == 1)
        {
            WaitCount = 0;
            ActualizaOTRA_CVEC_OT();
        }
        else
        {
            WaitCount = WaitCount - 1;
        }
    }
    catch (ex)
    {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
var successActualizaOT = function (data, status) {
    try {
        if (data.d != undefined && data.d > 0)
        {
            ComienzaReplicadodeOT();
        }
    }
    catch (ex)
    {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
function ComienzaReplicadodeOT() { 
    for (var i = 0; i < lstFormatoCompra.length; i++)
    {
        var vCompraOTs = new Array();
        var Compra = new CompraOT();                
        Compra.CveOrdenTrabajo = oOrdenTrabajo;
        Compra.CveProgramaEmpleado = new TDI_ProgramaEmpleado();
        Compra.CveProgramaEmpleado.CvePrograma = lstFormatoCompra[i].CvePrograma;
        Compra.CveProgramaEmpleado.CveEmpleado = new TDI_EMPL();
        Compra.CveSeccionFormato = new TDI_SeccionFormato();
        Compra.CveSeccionFormato.CveFormato = lstFormatoCompra[i].CveFormato;
        Compra.CveSeccionFormato.CveSeccion = new TDI_Seccion();
        if (oOrdenTrabajo.CveSeccion.CveSeccion == 6 || oOrdenTrabajo.CveSeccion.CveSeccion == 8) //Quiere decir que hay redactor y es seccion Internacional ó de Programas
        {
            Compra.NombreRedactor = ObjTransmision.RedactorSelected.EmpleadoNombre;
            Compra.NumRedactor = ObjTransmision.RedactorSelected.EmpleadoLlavePrimaria;
        }
        else
        {
            Compra.NombreRedactor = "";
            Compra.NumRedactor = 0;
        }
        Compra.SeEnviaINEWS = true;
        Compra.FechaCompra = new Date(Date.parse(ConvertToFormatDatetoIng(ObjTransmision.FechaProgramada.esMXFormat())));
        vCompraOTs.push(Compra);
        var data = new CompraOTS(vCompraOTs, sessionStorage.userDomain, GenerateTransac());
        executeRequest(wsMtdCompraOT, JSON.stringify(data, null, 2), successCompraOT, myErrorTransmitir);
        oCompraGuardada = lstFormatoCompra[i];
        break;
    }
}
var successCompraOT = function (data, status) {
    try
    {
        ContinuaReplicado();
    }
    catch (ex)
    {
        ManejadorErrores(ex, sessionStorage.numUsuario, sessionStorage.userDomain, sessionStorage.userMachineName, sessionStorage.userIP, gblpathPage);
    }
}
var successFunction = function (data, status) {
    parent.closeWindow(initVars['windowId']);
}
function ContinuaReplicado()
{
    lstFormatoCompra.splice(FindIndexListSourceCompleted(oCompraGuardada), 1);
    ListaOTs = ListaOTs + " " + oOrdenTrabajo.ClaveOrdenTrabajo + ",";
    if (lstFormatoCompra.length > 0)
    {
        ComienzaDuplicadoOTPrincipal();
    }
    else
    {   
        ListaOTs = ListaOTs.substr(0, ListaOTs.length - 1);
        alertModalFunction('La OT se ha replicado correctamente con los siguientes Num. de OT: \r\n' + ListaOTs, successFunction);
        
    }
}
function FindIndexListSourceCompleted(vCompraGuardada) {
    for (var i = 0; i < lstFormatoCompra.length; i++) {
        if (lstFormatoCompra[i].CveFormato.CveFormato == vCompraGuardada.CveFormato.CveFormato
        && lstFormatoCompra[i].CveOT.CveOrdenTrabajo == vCompraGuardada.CveOT.CveOrdenTrabajo
        && lstFormatoCompra[i].CvePrograma.CvePrograma == vCompraGuardada.CvePrograma.CvePrograma) {
            return i;
            break;
        }
    }
    return -1;
}

