
/*Funcion que obtiene la etiqueta del label para pantallas de agenda, formato: SEMANA DEL XX DE MES AL DIA, XX DE MES DE ANIO*/
function getLabelOfWeek(theInitDate) {
    var numDia = 0;
    var initDate = new Date(theInitDate);
    var endDate = new Date(theInitDate);

    if (initDate.getDay() == 0)
        numDia = 6;
    else
        numDia = initDate.getDay() - 1;
    numDia = (numDia * -1);

    initDate.setDate(initDate.getDate() + numDia);
    endDate.setDate(endDate.getDate() + numDia + 6);
    returnInitDate = initDate;
    return String('SEMANA DEL ' + $.datepicker.formatDate('DD, dd', initDate) + ' DE ' + $.datepicker.formatDate('MM', initDate) + ' DE ' + initDate.getFullYear()
                       + ' AL ' + $.datepicker.formatDate('DD, dd', endDate) + ' DE ' + $.datepicker.formatDate('MM', endDate) + ' DE ' + endDate.getFullYear()).toUpperCase();
}

function popupWindowCenter(url, title, w, h) {
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
} 
/*Devuelve la fecha del primer dia de la semana*/
function getFisrtDateOfWeek(initDate) {
    var numDia = 0;

    if (initDate.getDay() == 0)
        numDia = 6;
    else
        numDia = initDate.getDay() - 1;
    numDia = (numDia * -1);
    initDate.setDate(initDate.getDate() + numDia);
    return initDate;
 }

/*Devuelve el numero recibido en un formato de dos digitos*/
function getTwoDigitsFormat(valNumber) {
    if (valNumber < 10) valNumber = '0' + valNumber;
    return String(valNumber);
}

/*Guarda el acceso a la pagina dentro el log de acceso*/
function SaveLog(Modulo) {
    var Fecha = new Date();
    oSaveLog = new THE_LogAccesos();
    oEmpleado = new TDI_EMPL;
    oEmpleado.EmpleadoLlavePrimaria = sessionStorage.numUsuario;
    oSaveLog.CveEmpleado = oEmpleado;
    oSaveLog.FechaCreacion = Fecha;
    oSaveLog.Modulo = Modulo;
    oSaveLog.Dominio = sessionStorage.userDomain;
    oSaveLog.DirIP = sessionStorage.userIP;
    oSaveLog.MachineName = sessionStorage.userMachineName;

    var datos = new GuardarLogAccesos(oSaveLog);
    executeRequest(wsMtdSaveLog, JSON.stringify(datos, null, 2), successGuardaLog, myError);
}

var successGuardaLog = function (data, status) {

}

function myError(request, status, error) {
    alertModal('Error Save Log');
}

function getDivsVideosWeek(data, initDate) {
    var arrayOfWeek = new Array();
    var lunes = new Array();
    var martes = new Array();
    var miercoles = new Array();
    var jueves = new Array();
    var viernes = new Array();
    var sabado = new Array();
    var domingo = new Array();

    /*Se asignan los arrays de divs por dia al array de semana*/
    arrayOfWeek.push(lunes);
    arrayOfWeek.push(martes);
    arrayOfWeek.push(miercoles);
    arrayOfWeek.push(jueves);
    arrayOfWeek.push(viernes);
    arrayOfWeek.push(sabado);
    arrayOfWeek.push(domingo);

    var fechas = Array();
    /*Se obtienen las fechas correspondientes a cada dia*/
    var i = 0;
    var temp;
    for (i = 0; i < 7; i++) {
        temp = new Date(initDate);
        temp.setDate(temp.getDate() + i);
        fechas.push(temp.esMXFormat());
        arrayOfWeek[i].push(String("<div>" + $.datepicker.formatDate('DD d', temp) + "</div>").toUpperCase());
    }


    var myDiv;
    $.each(data, function (index, input) {
        mydiv = "";
        mydiv = "<div>" +
                "<div><label>" + input.AgendaRotulo + "</label><label>" + input.OtraCvec + "</label></div>" +
                "<div><a target=\"_parent\" href=\"../Propuesta/CreaPropuesta.aspx\">" + input.AgseTitu + "</a></div>" +
                "<div><a href='http://www.google.com'><img alt=\"Sin Imagen\" width=\"95\" height=\"70\" src=\"" + input.VideoImg + "\"/></a></div>" +
                "<div><a href='www.google.com'>Avances</a></div>" +
                "<label>" + input.TnoDesc + "</label>" +
                "<input type='checkbox'/>" +
                "</div>";
        switch (input.AgseFini) {
            case fechas[0]:
                lunes.push(mydiv);
                break;
            case fechas[1]:
                martes.push(mydiv);
                break;
            case fechas[2]:
                miercoles.push(mydiv);
                break;
            case fechas[3]:
                jueves.push(mydiv);
                break;
            case fechas[4]:
                viernes.push(mydiv);
                break;
            case fechas[5]:
                sabado.push(mydiv);
                break;
            case fechas[6]:
                domingo.push(mydiv);
                break;
        }
    });
    return arrayOfWeek;
}


function getTituloDia(FechaIni) {
    return $.datepicker.formatDate('DD d', FechaIni).toUpperCase();
}

/*Obtiene un array clave/valor de los parametros que han sido recibidos a traves de la URL*/
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function ConvertToFormatDatetoIng(vFecha) {
    var vResult = '';
    if (vFecha.length > 0) {
        var vResultSplit = vFecha.split('/');
        vResult = vResultSplit[1] + "/" + vResultSplit[0] + "/" + vResultSplit[2];
    }
    return vResult;
}

function getLocales(successEvent, errorEvent) {
    var data;
    var callName;
    try {
        if ($.inArray('153', sessionStorage.userPuestos.split(',')) >= 0) {
            data = "{ }";
            callName = wsMtdGetLocales;
        }
        else {
            data = "{ 'EMPL_LLAV_PR':" + sessionStorage.numUsuario + " }";
            callName = wsMtdGetLocalesEmpl;
        }
        executeSyncRequest(callName, data, successEvent, errorEvent);
    }
    catch (Exception) {
        alertModal('No fue posible determinar el tipo de puesto asociado al usuario');
    }
}

function getLocalesAgendas(successEvent, errorEvent) {
    var data;
    var callName;
    try {    
        data = "{ }";
        callName = wsMtdGetLocales;
        executeSyncRequest(callName, data, successEvent, errorEvent);
    }
    catch (Exception) {
        alertModal('Ocurrio un problema al cargar la información de locales para la agenda');
    }
}

function ValidaPermisosGuardaDuplica(idSeccion) {

    var puestos = idSeccion.split(',');

      for(var i=0; i< puestos.length; i++)
      {
          if (puestos[i] == "4" || puestos[i] == "5" || puestos[i] == "9" || puestos[i] == "6")
                {
                    return true;
                }

            }
            alertModal('No tiene permisos para realizar esta Operación');
   return false;
   
}

function GenerateTransac() {
    var tran = new THE_LogTransacciones();

    tran.DirIP = sessionStorage.userIP;
    tran.Dominio = sessionStorage.userDomain;
    tran.MachineName = sessionStorage.userMachineName;
    tran.Usuario = sessionStorage.numUsuario;

    return tran;
}

/*Convierte el valor numerico recibido a un formato de tiempo 00:00:00*/
function numberToTimeFormat(numericValue) {
    var final;
    var temp = numericValue / 3600;
    var horas = Math.floor(temp);
    numericValue = numericValue - (horas*3600);
    temp = numericValue / 60;
    var minutos = Math.floor(temp);
    numericValue = numericValue - (minutos * 60);
    var segundos = Math.floor(numericValue);

    final = this.getTwoDigitsFormat(horas) + ':' + this.getTwoDigitsFormat(minutos) + ":" + this.getTwoDigitsFormat(segundos);
    
    if (final == 'NaN:NaN:NaN')
        final = '00:00:00';

    return final;
}

function timeFormatToNumber(timeValue) {
    var values = timeValue.split(":");
    var segundos = (new Number(values[0]) * 3600) + (new Number(values[1]) * 60) + new Number(values[2]);
    return segundos;
}

function ManejadorErroresMsgStr(ex, numUsuario, userDomain, userMachineName, userIP, Pantalla) {
    var saveError = new THE_LogErrores();
    saveError.CveEmpleado = new TDI_EMPL();
    saveError.CveEmpleado.EmpleadoLlavePrimaria = numUsuario;
    saveError.FechaCreacion = new Date();
    saveError.Pantalla = Pantalla;
    saveError.Dominio = userDomain;
    saveError.DirIP = userIP;
    saveError.MachineName = userMachineName;
    saveError.Error = ex;


    var data = new GuardarLogError(saveError);

    executeRequest(wsMtdGuardarLogError, JSON.stringify(data, null, 2), successGuardarLogError, myErrorManejador);

}
function ManejadorErrores(ex, numUsuario, userDomain, userMachineName, userIP, Pantalla)
{
    var saveError = new THE_LogErrores();
    saveError.CveEmpleado = new TDI_EMPL();
    saveError.CveEmpleado.EmpleadoLlavePrimaria  = numUsuario;
    saveError.FechaCreacion = new Date();
    saveError.Pantalla = Pantalla;
    saveError.Dominio = userDomain;
    saveError.DirIP = userIP;
    saveError.MachineName =  userMachineName;
    saveError.Error = ex.description;


    var data = new GuardarLogError(saveError);

    executeRequest(wsMtdGuardarLogError, JSON.stringify(data, null, 2), successGuardarLogError, myErrorManejador);

}
var successGuardarLogError = function (data, status) {
}
function myErrorManejador(request, status, error) {

}

function ValidaPermisosCompra() {
    var puestos = sessionStorage.userPuestos.split(',');
    for (var i = 0; i < puestos.length; i++) {
        if (puestos[i] == "6" || puestos[i] == "9") {
            return true;
        }
    }
    alertModal('No tiene permisos para realizar esta operación');
    return false;
}

function getUrlFormatoStreaming(urlVideo) {
    var nuevoFmto = "";
    if (urlVideo == undefined || urlVideo == "") return "";
    if (urlVideo.indexOf("AztecaTube.mp4") != -1) return urlVideo;

    while (urlVideo.indexOf("//") != -1)
        urlVideo = urlVideo.replace("//", "/");

    var Datos = urlVideo.replace("//", "/").split('/');
    nuevoFmto += Datos[3].substr(0, Datos[3].length - 1) + Datos[3].substr(Datos[3].length - 1) + "/";
    nuevoFmto += Datos[3].substr(0, Datos[3].length - 1) + " " + Datos[3].substr(Datos[3].length - 1) + "/";
    nuevoFmto += Datos[4] + "/" + Datos[5] + "/" + urlVideo.substr(urlVideo.indexOf('.') + 1) + ":" + Datos[6];
    return nuevoFmto;
}

function ValidaPermisosGuardaDuplica()
{
    var puestos = sessionStorage.userPuestos.split(',');
    for (var i = 0; i < puestos.length; i++) {
        if (puestos[i] == "4" || puestos[i] == "5"|| puestos[i] == "9"|| puestos[i] == "6" || puestos[i] == "1") {
                return true;
            }
    }
    alertModal('No tiene permisos para realizar esta operación');
    return false;
}
function ValidaMultiplesSecciones() { 
  var puestos = sessionStorage.userPuestos.split(',');
    for (var i = 0; i < puestos.length; i++) {
        if (puestos[i] == "63" || puestos[i] == "9")
        {
            return true;
        }
    }
    return false;
}

function copyToClipboard(s)
{
	if( window.clipboardData && clipboardData.setData )
	{
		clipboardData.setData("Text", s);
	}
	else
	{
		// You have to sign the code to enable this or allow the action in about:config by changing
		user_pref("signed.applets.codebase_principal_support", true);
		netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

		var clip = Components.classes['@mozilla.org/widget/clipboard;[[[[1]]]]'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		// create a transferable
		var trans = Components.classes['@mozilla.org/widget/transferable;[[[[1]]]]'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;
		// specify the data we wish to handle. Plaintext in this case.
		trans.addDataFlavor('text/unicode');

		// To get the data from the transferable we need two new objects
		var str = new Object();
		var len = new Object();
		var str = Components.classes["@mozilla.org/supports-string;[[[[1]]]]"].createInstance(Components.interfaces.nsISupportsString);
		var copytext=meintext;
		str.data=copytext;
		trans.setTransferData("text/unicode",str,copytext.length*[[[[2]]]]);
		var clipid=Components.interfaces.nsIClipboard;
		if (!clip) return false;
		clip.setData(trans,null,clipid.kGlobalClipboard);	   
	}
}
function EliminaOTSession(vCveOrdentrabajo, vClaveOrdenTrabajo) {
    if (sessionStorage.usserCarritoOT.length > 0) {
        var vfound = false;

            vListOT = eval('(' + sessionStorage.usserCarritoOT + ')');
            var vindex =0;
            for (var i=0; i < vListOT.length; i++)
            {
               if (vListOT[i].CveOrdenTrabajo == Number(vCveOrdentrabajo) && vListOT[i].ClaveOrdenTrabajo == vClaveOrdenTrabajo) {
                   vfound = true;
                   vindex = i;
                   break; 
               }
            }
           if (vfound == true) {
                vListOT.splice(vindex, 1);
                sessionStorage.usserCarritoOT = JSON.stringify(vListOT, null, 2);
            }

        }

}
function EliminaPropSession(vCvePropuesta) {
    if (sessionStorage.usserCarritoProp.length > 0) {
        var vfound = false;

            vListProp = eval('(' + sessionStorage.usserCarritoProp + ')');
            var vindex = 0;
            for (var i = 0; i < vListProp.length; i++) {
                if (vListProp[i].CvePropuesta == vCvePropuesta) {
                    vfound = true;
                    vindex = i;
                    break;

                }
            }
            if (vfound == true) {
                vListProp.splice(vindex, 1);
                sessionStorage.usserCarritoProp = JSON.stringify(vListProp, null, 2);
            }
    }
}
function AddSessionCarritoOT(ListaOT) {
    
    if (ListaOT.length > 0) {
        var vlistOts = new Array();
        if (sessionStorage.usserCarritoOT != "undefined" && sessionStorage.usserCarritoOT.length > 0) {
            vlistOts = eval('(' + sessionStorage.usserCarritoOT + ')');
        } else {
            vlistOts = new Array();
        }
        for (var i = 0; i < ListaOT.length; i++) {
            if (gblfoundOT(ListaOT[i].CveOrdenTrabajo) == false) {
                vlistOts.push(ListaOT[i]);
            }

        }
        if (vlistOts != undefined && vlistOts.length > 0) {
            sessionStorage.usserCarritoOT = JSON.stringify(vlistOts, null, 2);
        }
    }

}
function AddusserCarritoProp(ListaProp) {
    
    if (ListaProp.length > 0) {
        var vlistProps = new Array();
        if (sessionStorage.usserCarritoProp != "undefined" && sessionStorage.usserCarritoProp.length > 0) {
            vlistProps = eval('(' + sessionStorage.usserCarritoProp + ')');
        } else {
            vlistProps = new Array();
        }
        
        for (var i = 0; i < ListaProp.length; i++) {
            
            if (gblfoundProp(ListaProp[i].CvePropuesta) == false) {
                vlistProps.push(ListaProp[i]);
                
            }

        }
        if (vlistProps != undefined && vlistProps.length > 0) {
            sessionStorage.usserCarritoProp = JSON.stringify(vlistProps, null, 2);
        }
    }
    
}
function gblfoundProp(vCvePropuesta) {
    if (sessionStorage.usserCarritoProp != "undefined" && sessionStorage.usserCarritoProp.length > 0) {
        var vlistProp;
        vlistProp = eval('(' + sessionStorage.usserCarritoProp + ')');
        if (vlistProp.length > 0) {
            for (var k = 0; k < vlistProp.length; k++) {
                if (vlistProp[k].CvePropuesta == vCvePropuesta) {
                    return true;
                }
            }
        }
    }
    return false;
}
function gblfoundOT(vCveOrdenTrabajo) {

    if (sessionStorage.usserCarritoOT != "undefined" && sessionStorage.usserCarritoOT.length > 0) {
        var vlistOT;
        vlistOT = eval('(' + sessionStorage.usserCarritoOT + ')');
        if (vlistOT.length > 0) {
            for (var k = 0; k < vlistOT.length; k++) {
                if (vlistOT[k].CveOrdenTrabajo == vCveOrdenTrabajo) {
                    return true;
                }
            }
        }
    }
    return false;
}

function padright(val, ch, num) {
    var re = new RegExp("^.{" + num + "}");
    var pad = "";
    if (!ch) ch = " ";
    do {
        pad += ch;
    } while (pad.length < num);
    return re.exec(val + pad)[0];
}

function getLocalSeleccionar() {
    if ($.trim(sessionStorage.userIdLocal) == '') {
        alertModal('No existe ninguna Local Default asignada, favor de corroborar con su administrador');
        return -1;
    }
    return sessionStorage.userIdLocal.split(',')[0];

}

function imposeMaxLength(Object, MaxLen) {
    return (Object.value.length < MaxLen);
}
function htmlentities(string, quote_style, charset, double_encode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
    var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
        symbol = '';
    string = string == null ? '' : string + '';

    if (!hash_map) {
        return false;
    }

    if (quote_style && quote_style === 'ENT_QUOTES') {
        hash_map["'"] = '&#039;';
    }

    if (!!double_encode || double_encode == null) {
        for (symbol in hash_map) {
            if (hash_map.hasOwnProperty(symbol)) {
                string = string.split(symbol).join(hash_map[symbol]);
            }
        }
    } else {
        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
            for (symbol in hash_map) {
                if (hash_map.hasOwnProperty(symbol)) {
                    text = text.split(symbol).join(hash_map[symbol]);
                }
            }

            return text + entity;
        });
    }

    return string;
}

function PermisosGridZoomRecuperacion() {
    if (sessionStorage.userPuestos == undefined || $.trim(sessionStorage.userPuestos) == '') 
        return false;
    
    var puestos = sessionStorage.userPuestos.split(',');
    var salida = false;
    if (puestos.length > 0)
    {
        $.each(puestos, function (index, p) {
            //Administrador, VIDEOTECA ADMINISTRADOR, EDITOR DE SECCION, JEFE DE INFORMACION, REALIZADOR, ASISTENTE DE EDICION
            //ASISTENTE DE PRODUCCIÓN, REPORTERO, EDITOR EN CAMPO, VIDEOTECA GENERAL, SOPORTE
            if (p == "9" || p == "59" || p == "5" || p == "6" || p == "3" || p == "91" || p == "76" || p == "1" || p == "94" || p == "62" || p == "139") {
                salida = true;
            }
        }); 
    }
    return salida;
}

/*Indica el ancho maximo que pueden tomar las ventanas*/
function getMaxFloatableWidth() {
    return screen.width - 65;
}

/*Indica el alto maximo que pueden tomar las ventanas*/
function getMaxFloatableHeigth() {
    if (navigator.appVersion.indexOf("Mac") != -1)
        return screen.height - 250;
            
    return screen.height - 150;
}

function compareDates(toCompareDate, theCurrentDate) {
    var days = 0;
    var difference = 0;
    difference = new Date(theCurrentDate.defaultView()) - new Date(toCompareDate.defaultView());
    days = Math.round(difference / (1000 * 60 * 60 * 24));
    return days;
}

function alertModal(Contenido) {
    $.each($("#Dialog-ConfirmGbl").children(), function (index, myDiv) {
        $(myDiv).remove();
    });
    $("#Dialog-ConfirmGbl").dialog({
        modal: true,
        width: 400,
        buttons: {
            Ok: function () {
                $(this).dialog("close");
            }
        }
    });
    var myDiv = "<div>";
    myDiv = myDiv + "<table width='400px'><tr><td><img runat='server' src='../../Images/icoEXCLAMACION.png' class='sizeImageMsgBox'/></td>";
    myDiv = myDiv + "<td><div class='divAlinearleft'>" + Contenido + "</div></td></tr>";
    myDiv = myDiv + "</table>";
    myDiv = myDiv + "</div>";
    $("#Dialog-ConfirmGbl").append(myDiv);

}

function alertModalFunction(Contenido, successFunction) {
    $.each($("#Dialog-ConfirmGbl").children(), function (index, myDiv) {
        $(myDiv).remove();
    });
    $("#Dialog-ConfirmGbl").dialog({
        width: 400,
        modal: true,
        closeOnEscape: false,
        close:function () {
                successFunction();
                $(this).dialog("close");
            },
        buttons: {
            Ok: function () {
                successFunction();
                $(this).dialog("close");
            }
        }

    });

    var myDiv = "<div>";
    myDiv = myDiv + "<table width='400px'><tr><td><img runat='server' src='../../Images/icoEXCLAMACION.png' class='sizeImageMsgBox'/></td>";
    myDiv = myDiv + "<td><div class='divAlinearleft'>" + Contenido + "</div></td></tr>";
    myDiv = myDiv + "</table>";
    myDiv = myDiv + "</div>";
    $("#Dialog-ConfirmGbl").append(myDiv);

}

function alertModalFunctionOK(Contenido, successFunction) {
    $.each($("#Dialog-ConfirmGbl").children(), function (index, myDiv) {
        $(myDiv).remove();
    });
    $("#Dialog-ConfirmGbl").dialog({
        width: 400,
        modal: true,
        closeOnEscape: true,
        close: function () {
            $(this).dialog("close");
        },
        buttons: {
            Ok: function () {
                successFunction();
                $(this).dialog("close");
            }
        }

    });

    var myDiv = "<div>";
    myDiv = myDiv + "<table width='400px'><tr><td><img runat='server' src='../../Images/icoEXCLAMACION.png' class='sizeImageMsgBox'/></td>";
    myDiv = myDiv + "<td><div class='divAlinearleft'>" + Contenido + "</div></td></tr>";
    myDiv = myDiv + "</table>";
    myDiv = myDiv + "</div>";
    $("#Dialog-ConfirmGbl").append(myDiv);

}

function alertModalFunctionOKCancel(Contenido, successFunction) {
    $.each($("#Dialog-ConfirmGbl").children(), function (index, myDiv) {
        $(myDiv).remove();
    });
    $("#Dialog-ConfirmGbl").dialog({
        width: 400,
        modal: true,
        closeOnEscape: true,
        open: function (type, data) {
            $(this).parent().appendTo("form");
        },
        buttons: {
            Ok: function () {
                successFunction();
                $(this).dialog("close");
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        }

    });

    var myDiv = "<div>";
    myDiv = myDiv + "<table width='400px'><tr><td><img runat='server' src='../../Images/icoEXCLAMACION.png' class='sizeImageMsgBox'/></td>";
    myDiv = myDiv + "<td><div class='divAlinearleft'>" + Contenido + "</div></td></tr>";
    myDiv = myDiv + "</table>";
    myDiv = myDiv + "</div>";
    $("#Dialog-ConfirmGbl").append(myDiv);
}

function alertModalFunctionOKCancelWithAttrib(Contenido, successFunction, cancelFunction, paramIn) {
    $.each($("#Dialog-ConfirmGbl").children(), function (index, myDiv) {
        $(myDiv).remove();
    });
    $("#Dialog-ConfirmGbl").dialog({
        width: 400,
        modal: true,
        closeOnEscape: true,
        buttons: {
            Ok: function () {
                successFunction(paramIn);
                $(this).dialog("close");
            },
            Cancel: function () {
                cancelFunction(paramIn);
                $(this).dialog("close");
            }
        }

    });

    var myDiv = "<div>";
    myDiv = myDiv + "<table width='400px'><tr><td><img runat='server' src='../../Images/icoEXCLAMACION.png' class='sizeImageMsgBox'/></td>";
    myDiv = myDiv + "<td><div class='divAlinearleft'>" + Contenido + "</div></td></tr>";
    myDiv = myDiv + "</table>";
    myDiv = myDiv + "</div>";
    $("#Dialog-ConfirmGbl").append(myDiv);
}


function ValidaPermisosLocales(idSeccion) {

    var puestos = idSeccion.split(',');

    for (var i = 0; i < puestos.length; i++) {
        if (puestos[i] == "153") {
            return true;
        }

    }
    return false;

}

function parseJSONToDate(value) {
    var theDate = value;

    if (theDate.indexOf("Date(") > 0) {
        theDate = theDate.toString().replace('/Date(', '').replace(')/', '');
        if (theDate.indexOf('-') >= 0)
            theDate = theDate.toString().substr(0, theDate.indexOf('-'));
        return new Date(new Number(theDate));
    }
    else {
        var theDate = ('' + theDate).replace(/-/g, "/").replace(/[TZ]/g, " ");
        return new Date(theDate);
    }
}
function ValidaUsuarioProgramas()
{
    var Secciones = sessionStorage.UserSeccion.split(',');
    var salida = false;
    if (Secciones != undefined && Secciones.length > 0)
    {
        for (var i = 0; i < Secciones.length; i++)
        {
            if (Secciones[i] == "8")
            {
                salida = true;
                break;
            }
        }
    }
    return salida;
}


