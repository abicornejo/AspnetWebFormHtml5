
var EstadobyPais;
var CiudadbyEstado;



window.onload = function () { initFunction(); }

function initFunction() {
    $("#txtFechaIni").datepicker({ dateFormat: 'yy-mm-dd' });
    $('#txtFechaIni').datepicker({ minDate: 0 });
    $('#txtFechaIni').datepicker("setDate", new Date(), dateFormat = "yy-mm-dd");
    $('#txtFechaIni').readOnly = true;

    $("#txtFechaFin").datepicker({ dateFormat: 'yy-mm-dd' });
    $('#txtFechaFin').datepicker({ minDate: 0 });
    $('#txtFechaFin').datepicker("setDate", new Date(), dateFormat = "yy-mm-dd");
    $('#txtFechaFin').readOnly = true;

    //////Crea el El Tab en los div
    $("#TabBusquedaAvanzada").tabs();

    /////////////////Abre Dialogo de herramientas de busqueda avanzada ///////////////////////

    $("#TabBusquedaAvanzada").dialog({
        autoOpen: false,
        show: "blind",
        hide: "explode",
        height: 350,
        width: 850

    });

    $("#Avanzado").click(function () {
        $("#TabBusquedaAvanzada").dialog("open");
        return false;
    });

    //Abre Dialogo de Resultado de busqueda//
    $("#dialogBusqueda").dialog({
        autoOpen: false,
        show: "blind",
        hide: "explode",
        height: 'auto',
        width: 'auto'

    });

}

//$(function () {
//    $("#txtFechaIni").datepicker({ dateFormat: 'yy-mm-dd' });
//    $('#txtFechaIni').datepicker({ minDate: 0 });
//    $('#txtFechaIni').datepicker("setDate", new Date(), dateFormat = "yy-mm-dd");
//    $('#txtFechaIni').readOnly = true;

//    $("#txtFechaFin").datepicker({ dateFormat: 'yy-mm-dd' });
//    $('#txtFechaFin').datepicker({ minDate: 0 });
//    $('#txtFechaFin').datepicker("setDate", new Date(), dateFormat = "yy-mm-dd");
//    $('#txtFechaFin').readOnly = true;

//    
//    });

//////Crea el El Tab en los div
//$(function () {
//    $("#TabBusquedaAvanzada").tabs();
//});


/////////////////Abre Dialogo de herramientas de busqueda avanzada ///////////////////////
//$.fx.speeds._default = 1000;
//$(function () {
//    $("#TabBusquedaAvanzada").dialog({
//        autoOpen: false,
//        show: "blind",
//        hide: "explode",
//        height:350,
//        width:850
//       
//    });

//    $("#Avanzado").click(function () {
//        $("#TabBusquedaAvanzada").dialog("open");
//         return false;
//    });
//});



// $(function () {
//     $("#dialogBusqueda").dialog({
//         autoOpen: false,
//         show: "blind",
//         hide: "explode",
//         height: 'auto',
//         width: 'auto'

//     });
// });





function CierraBusqueda() {
    $("#TabBusquedaAvanzada").dialog("close");
    return false;

}

/////Error////////////////////////////////

 function myError(request, status, error) {
     alertModal('Ocurrio un problema al ejecutar la solicitud: ' + status.statusText);
 }



 /////Llena estado en base al pais seleccionado ///////////////////////////

 function PaisChange() {
     loadEstadosbyPais($("#MainContent_cmbPais").val());
 }

 function loadEstadosbyPais(cvePais) {
     data = "{ 'PaisLlave':" + cvePais + "}";
     executeRequest(wsMtdoObtenerObtenerEstadoByPais, data, successEstadobyPais, myError);
 }

 var successEstadobyPais = function (data, status) {
     EstadobyPais = data.d;
     $("#cmbEstado").empty();
     $.each(EstadobyPais, function (index, Estado) {
         $("#cmbEstado").append('<option value="' + Estado.cveEstado + '">' + Estado.nombreEstado + '</option>');
     });
 }


 /////Llena la ciudad en base al estado seleccionado de un pais ///////////////////////////



 function EstadoChange() {
     loadCiudadbyEstados($("#cmbEstado").val());
 }

 function loadCiudadbyEstados(cveEstado) {
     data = "{ 'cveEstado':" + cveEstado + "}";
     executeRequest(wsMtdoObtenerObtenerCiudadbyEstado, data, successCiudadbyEstado, myError);
 }

 var successCiudadbyEstado = function (data, status) {
     CiudadbyEstado = data.d;
     $("#cmbCiudad").empty();
     $.each(CiudadbyEstado, function (index, Ciudad) {
         $("#cmbCiudad").append('<option value="' + Ciudad.cveCiudad + '">' + Ciudad.nombreCiudad + '</option>');
     });
 }


 ///////////Mensaje de Error///////////////////////

 function cleanForm() {
     alertModal('Ocurrio un problema al ejecutar la solicitud: ' + status.statusText);
 }

 //////////Busqueda/////////////////////////////
 ////////variable de parametros
 var cveOT;
 var textofiltro;
 var cveEmpleado;
 var cvePrograma;
 var cveSeccion;
 var cvePais;
 var cveEstado;
 var cveCiudad;
 var FechaIni;
 var FechaFin;
 var esbusquedaAvanzada;
 var soloconvideo;
 var solonotaterminada;
 var solomaterialbruto;
 var nocinta;
 var cveAgencia;
 var NumOT;
 var vdoIdFilename;
 var posIni;
 var posFin;
 var Baneado;
 var url;

 var PerPage;
 var Offset;
 var Palabraclave;
 var OptBusqueda;
 var Usuario;
 var GuardaBusqueda;
 var FinalCut;
 var OpcVideoteca;
 var OpcPlaneacion;
 var OpcGuion;
 var CCaption;

////fast Adquisiciones
var TituloBusqueda;
var TituloCapituloOrig; 
var TituloCapituloTrad; 
var NumeroCapitulo;
var CveGenero;
var NombGenero; 
var PalCve;
var Sinopsis;
var Elenco;

 function FuncionBuscar() {

 //Parametros  fast
     cveOT = $("#txtOT").val();
     textofiltro = $("#txtTextoFiltro").val();
     cveEmpleado = $('#MainContent_cmbReportero').val();
     cvePrograma = $('#MainContent_cmbPrograma').val();
     cveSeccion = $('#MainContent_cmbSeccion').val();
     cvePais = $('#MainContent_cmbPais').val();
     cveEstado = $('#cmbEstado').val();
     cveCiudad = $('#cmbCiudad').val();
     FechaIni = $("#txtFechaIni").val();
     FechaFin = $("#txtFechaFin").val();
     esbusquedaAvanzada = "0";
     solonotaterminada = $("#ChkNotaTerminada").is("checked");
     solomaterialbruto = "1";
     nocinta = $("#txtNumeroCinta").val();
     cveAgencia = $('#MainContent_cmbAgencia').val();
     NumOT = $("#txtOT").val();
     vdoIdFilename="null"
     posIni = "null";
     posFin = "null";
     Baneado = "null";

     PerPage="35";
     Offset="null";
     Palabraclave = $("#txtPalabraClave").val();
     OptBusqueda = "null";   /*??*/
     Usuario = "null";  /*??*/
     GuardaBusqueda ="1";
     FinalCut = "null";  /*??*/
     OpcVideoteca = $("#ChkClasificacionVideoteca").is("checked");  /*??*/
     OpcPlaneacion = $("#ChkPlaneacion").is("checked");  /*??*/
     OpcGuion = $("#ChkGuion").is("checked");
     CCaption = $("#ChkCcaption").is("checked");

/////Fast Adquisisiones


     TituloBusqueda = "null";
     TituloCapituloOrig = $("#txtTitulo").val();
     TituloCapituloTrad = $("#txtCapitulo").val();
     NumeroCapitulo = $("#txtNumCapitulo").val();
     CveGenero = "null";
     NombGenero = "null";
     PalCve = $("#txtPalabraClave").val();
     Sinopsis = $("#txtSinopsis").val();
     Elenco = $("#txtElencoOPersonaje").val();

     url = "cveOT=" + cveOT + "&";
     url = url + "textofiltro=" + textofiltro + "&";
     url = url + "cveEmpleado=" + cveEmpleado + "&";
     url = url + "cvePrograma=" + cvePrograma + "&";
     url = url + "cveSeccion=" +  cveSeccion  + "&";
     url = url + "cvePais=" + cvePais + "&"; 
     url = url + "cveEstado=" + cveEstado + "&";
     url = url + "cveCiudad=" + cveCiudad + "&";
     url = url + "FechaIni=" + FechaIni + "&";
     url = url + "FechaFin=" + FechaFin + "&";
     url = url + "esbusquedaAvanzada=" + esbusquedaAvanzada + "&";
     url = url + "soloconvideo=" + soloconvideo + "&";
     url = url + "solonotaterminada=" + solonotaterminada + "&";
     url = url + "solomaterialbruto=" + solomaterialbruto + "&";
     url = url + "nocinta=" + nocinta + "&";
     url = url + "cveAgencia=" + cveAgencia + "&";
     url = url + "NumOT=" + NumOT + "&";
     url = url + "vdoIdFilename=" + vdoIdFilename + "&";
     url = url + "posIni=" + posIni + "&";
     url = url + "posFin=" +  posFin + "&";
     url = url + "Baneado=" + Baneado + "&";
     //

     url = url + "PerPage=" + PerPage + "&";
     url = url + "Offset=" + Offset + "&";
     url = url + "Palabraclave=" + Palabraclave + "&";
     url = url + "OptBusqueda=" + OptBusqueda + "&";
     url = url + "Usuario=" + Usuario + "&";
     url = url + "GuardaBusqueda=" + GuardaBusqueda + "&";
     url = url + "FinalCut= " + FinalCut + "&";
     url = url + "OpcVideoteca=" + OpcVideoteca + "&";
     url = url + "OpcPlaneacion=" + OpcPlaneacion + "&";
     url = url + "OpcGuion=" + OpcGuion + "&";
     url = url + "CCaption=" + CCaption + "&";
     
     ///
     url = url + "TituloBusqueda=" + TituloBusqueda + "&";
     url = url + "TituloCapituloOrig=" + TituloCapituloOrig + "&";
     url = url + "TituloCapituloTrad=" + TituloCapituloTrad + "&";
     url = url + "NumeroCapitulo=" + NumeroCapitulo + "&";
     url = url + "CveGenero=" + CveGenero + "&";
     url = url + "NombGenero=" + NombGenero + "&";
     url = url + "PalCve=" + PalCve + "&";
     url = url + "Sinopsis=" + Sinopsis + "&";
     url = url + "Elenco=" + Elenco 


 
 $("#iFrameBusqueda").attr('src', "Busqueda.aspx?" + url);
 $("#dialogBusqueda").dialog("open");

 CierraBusqueda();
 cleanForm();

 return false;

 }


 ////////////////Limpia controles de busqueda/////////////////////////////////

 function cleanForm() {
      $("#txtOT").val('');
      $("#txtTextoFiltro").val('');
     $('#MainContent_cmbReportero').val(0);
     $('#MainContent_cmbPrograma').val(0);
     $('#MainContent_cmbSeccion').val(0);
     $('#MainContent_cmbPais').val(0);
      $('#cmbEstado').val(0);
      $('#cmbCiudad').val(0);
      $("#txtFechaIni").datepicker("setDate", new Date());
      $("#txtFechaFin").datepicker("setDate", new Date());
     
     $("#MainContent_ChkNotaTerminada").val(false);
     $("#MainContent_ChkMaterialenBruto").val("false");
     $("#txtNumeroCinta").val('');
     $('#MainContent_cmbAgencia').val(0);
     $("#txtOT").val('');
     
     Palabraclave = $("#txtPalabraClave").val('');


     $('input[type=checkbox]').each(function () { this.checked = false; });
     $('input[type=Text]').each(function () { this.checked = false; });
 }
 
   function txtTextoFiltro_KeyDown() {

       if (event.keyCode == '13') {
           FuncionBuscar();
       }
   }
