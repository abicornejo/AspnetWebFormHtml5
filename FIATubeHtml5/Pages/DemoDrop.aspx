﻿<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/Templates/FIATube.Master"   CodeBehind="DemoDrop.aspx.cs" Inherits="FIATubeHtml5.Pages.DemoDrop" %>


<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/ToolTip.js")%>"></script>
    <style type="text/css">
        .BannerRojo
        {
            color: #FF0000;
        }
.icono
{
    z-index:200;
     float:left;
      padding-top:90px;
    }
        
    </style>
  </asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">

<div id="contenedor" class="contenedor">
				<div id="divResultadoBusqueda" runat="server"  >
                   <div class="divc ui-widget-content" runat="server" id="divc" style=" width:100px; height:100px;">
                    <div   class='divContador' onclick="imgVideo_click(this);"   data-Busqueda='{
  "IdFileName": "0029021205920000",
  "NombrePais": "MEXICO",
  "CvePais": 1,
  "CveEstado": 63,
  "NombreEstado": "D.F.",
  "CveCiudad": 160860,
  "NombreCiudad": "CIUDAD DE MEXICO",
  "OrdenTrabajo": 1824863,
  "Titulo": "Diputados Actividades (MP)",
  "NombreSeccion": "POLITICA Y GOBIERNO",
  "CveSeccion": 1,
  "Empleados": "Maxi Pel",
  "Programas": "",
  "CveOrdenTrabajo": "I24863",
  "Video": "http://tvawebmam/aztecatube/VTK4/Videoteca19//videos/0029021205920000.mp4",
  "Imagen": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg",
  "FechaVideo": "\/Date(1332914400000-0600)\/",
  "Personajes": "ALEJANDRO ENCINAS RODRIGUEZ, JAIME CARDENAS, EMILIO CHUAYFFET, GUADALUPE ACOSTA NARANJO.",
  "PalabrasClave": "DIPUTADOS ACTIVIDADES, CHACALEO ALEJANDRO ENCINAS RODRIGUEZ, DIPUTADO PRD, RECURSOS IFE, ELECCIONES 2012, EJECUTIVO FEDERAL GOZA DE PRESTACIONES MUY POR ENCIMA DE AL LEY, JAIME CARDENAS, DIPUTADO, PT, BONO DE IFE A EMPLEADOS, EMILIO CHUAYFFET, DIPUTADO PT, INJERENCIA EJECUTIVO EN PROCESO ELECTORAL, GUADALUPE ACOSTA NARANJO, PRESIDENTE MESA DIRECTIVA CAMARA DE DIPUTADOS, LLAMADO PARA RESPETAR VOTO DE CIUDADANIA, EVITAR POLARIZACION DE MEXICO.",
  "Objetivo": "Diputados Actividades (MP)",
  "ConcatenadoFotos": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920101.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920102.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920103.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920104.jpg",
  "FechaAgenda": "2012-02-28 00:00:00",
  "QueryBusqueda": null,
  "CveAgencia": 99,
  "CvePrograma": 0,
  "DetIdFilename": "0029021205920100",
  "NombrePrograma": "NO DATO",
  "NumRecuperaciones": 0,
  "Banned": 0,
  "NombreAgencia": "NOTICIAS TELEVISION AZTECA",
  "NoCinta": "508000281",
  "TipoMaterial": 1,
  "OrigenMaterial": 0,
  "vdoId": 2630707,
  "TituloComercial": "",
  "Titulotraducido": "",
  "CapituloOriginal": "",
  "CapituloTraducido": "",
  "NumeroCapitulo": 0,
  "NombreGenero": "",
  "CveGenero": 0,
  "Formato": "IMX30",
  "Definicion": "SD",
  "NombreSenal": "",
  "CveSenal": 0,
  "TituloOriginal": "Diputados Actividades (MP)",
  "Sinopsis": "",
  "DuracionconCred": "",
  "DuracionsinCred": "",
  "CloseCaption": 0,
  "HDSD": null,
  "Suceso": null,
  "Teaser": "Diputados Actividades (MP);Diputados Actividades (MP);POLITICA Y GOBIERNO;0;I24863;2012-02-28T00:00:00;0029021205920000;Maxi Pel;NO DATO;NO DATO;CIUDAD DE MEXICO;D.F.;MEXICO;508000281;DIPUTADOS ACTIVIDADES ;NOTICIAS TELEVISION AZTECA;2012-03-28T00:00:00;DIPUTADOS ACTIVIDADES CHACALEO ALEJANDRO"
}' > 1</div>
                    <div class='divHD'  onclick="imgVideo_click(this);"  data-Busqueda='{
  "IdFileName": "0029021205920000",
  "NombrePais": "MEXICO",
  "CvePais": 1,
  "CveEstado": 63,
  "NombreEstado": "D.F.",
  "CveCiudad": 160860,
  "NombreCiudad": "CIUDAD DE MEXICO",
  "OrdenTrabajo": 1824863,
  "Titulo": "Diputados Actividades (MP)",
  "NombreSeccion": "POLITICA Y GOBIERNO",
  "CveSeccion": 1,
  "Empleados": "Maxi Pel",
  "Programas": "",
  "CveOrdenTrabajo": "I24863",
  "Video": "http://tvawebmam/aztecatube/VTK4/Videoteca19//videos/0029021205920000.mp4",
  "Imagen": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg",
  "FechaVideo": "\/Date(1332914400000-0600)\/",
  "Personajes": "ALEJANDRO ENCINAS RODRIGUEZ, JAIME CARDENAS, EMILIO CHUAYFFET, GUADALUPE ACOSTA NARANJO.",
  "PalabrasClave": "DIPUTADOS ACTIVIDADES, CHACALEO ALEJANDRO ENCINAS RODRIGUEZ, DIPUTADO PRD, RECURSOS IFE, ELECCIONES 2012, EJECUTIVO FEDERAL GOZA DE PRESTACIONES MUY POR ENCIMA DE AL LEY, JAIME CARDENAS, DIPUTADO, PT, BONO DE IFE A EMPLEADOS, EMILIO CHUAYFFET, DIPUTADO PT, INJERENCIA EJECUTIVO EN PROCESO ELECTORAL, GUADALUPE ACOSTA NARANJO, PRESIDENTE MESA DIRECTIVA CAMARA DE DIPUTADOS, LLAMADO PARA RESPETAR VOTO DE CIUDADANIA, EVITAR POLARIZACION DE MEXICO.",
  "Objetivo": "Diputados Actividades (MP)",
  "ConcatenadoFotos": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920101.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920102.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920103.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920104.jpg",
  "FechaAgenda": "2012-02-28 00:00:00",
  "QueryBusqueda": null,
  "CveAgencia": 99,
  "CvePrograma": 0,
  "DetIdFilename": "0029021205920100",
  "NombrePrograma": "NO DATO",
  "NumRecuperaciones": 0,
  "Banned": 0,
  "NombreAgencia": "NOTICIAS TELEVISION AZTECA",
  "NoCinta": "508000281",
  "TipoMaterial": 1,
  "OrigenMaterial": 0,
  "vdoId": 2630707,
  "TituloComercial": "",
  "Titulotraducido": "",
  "CapituloOriginal": "",
  "CapituloTraducido": "",
  "NumeroCapitulo": 0,
  "NombreGenero": "",
  "CveGenero": 0,
  "Formato": "IMX30",
  "Definicion": "SD",
  "NombreSenal": "",
  "CveSenal": 0,
  "TituloOriginal": "Diputados Actividades (MP)",
  "Sinopsis": "",
  "DuracionconCred": "",
  "DuracionsinCred": "",
  "CloseCaption": 0,
  "HDSD": null,
  "Suceso": null,
  "Teaser": "Diputados Actividades (MP);Diputados Actividades (MP);POLITICA Y GOBIERNO;0;I24863;2012-02-28T00:00:00;0029021205920000;Maxi Pel;NO DATO;NO DATO;CIUDAD DE MEXICO;D.F.;MEXICO;508000281;DIPUTADOS ACTIVIDADES ;NOTICIAS TELEVISION AZTECA;2012-03-28T00:00:00;DIPUTADOS ACTIVIDADES CHACALEO ALEJANDRO"
}' >   </div> 
                    <img  class="divResultado"     alt="Sin Imagen" src=' http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg'  data-Busqueda='{
  "IdFileName": "0029021205920000",
  "NombrePais": "MEXICO",
  "CvePais": 1,
  "CveEstado": 63,
  "NombreEstado": "D.F.",
  "CveCiudad": 160860,
  "NombreCiudad": "CIUDAD DE MEXICO",
  "OrdenTrabajo": 1824863,
  "Titulo": "Diputados Actividades (MP)",
  "NombreSeccion": "POLITICA Y GOBIERNO",
  "CveSeccion": 1,
  "Empleados": "Maxi Pel",
  "Programas": "",
  "CveOrdenTrabajo": "I24863",
  "Video": "http://tvawebmam/aztecatube/VTK4/Videoteca19//videos/0029021205920000.mp4",
  "Imagen": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg",
  "FechaVideo": "\/Date(1332914400000-0600)\/",
  "Personajes": "ALEJANDRO ENCINAS RODRIGUEZ, JAIME CARDENAS, EMILIO CHUAYFFET, GUADALUPE ACOSTA NARANJO.",
  "PalabrasClave": "DIPUTADOS ACTIVIDADES, CHACALEO ALEJANDRO ENCINAS RODRIGUEZ, DIPUTADO PRD, RECURSOS IFE, ELECCIONES 2012, EJECUTIVO FEDERAL GOZA DE PRESTACIONES MUY POR ENCIMA DE AL LEY, JAIME CARDENAS, DIPUTADO, PT, BONO DE IFE A EMPLEADOS, EMILIO CHUAYFFET, DIPUTADO PT, INJERENCIA EJECUTIVO EN PROCESO ELECTORAL, GUADALUPE ACOSTA NARANJO, PRESIDENTE MESA DIRECTIVA CAMARA DE DIPUTADOS, LLAMADO PARA RESPETAR VOTO DE CIUDADANIA, EVITAR POLARIZACION DE MEXICO.",
  "Objetivo": "Diputados Actividades (MP)",
  "ConcatenadoFotos": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920101.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920102.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920103.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920104.jpg",
  "FechaAgenda": "2012-02-28 00:00:00",
  "QueryBusqueda": null,
  "CveAgencia": 99,
  "CvePrograma": 0,
  "DetIdFilename": "0029021205920100",
  "NombrePrograma": "NO DATO",
  "NumRecuperaciones": 0,
  "Banned": 0,
  "NombreAgencia": "NOTICIAS TELEVISION AZTECA",
  "NoCinta": "508000281",
  "TipoMaterial": 1,
  "OrigenMaterial": 0,
  "vdoId": 2630707,
  "TituloComercial": "",
  "Titulotraducido": "",
  "CapituloOriginal": "",
  "CapituloTraducido": "",
  "NumeroCapitulo": 0,
  "NombreGenero": "",
  "CveGenero": 0,
  "Formato": "IMX30",
  "Definicion": "SD",
  "NombreSenal": "",
  "CveSenal": 0,
  "TituloOriginal": "Diputados Actividades (MP)",
  "Sinopsis": "",
  "DuracionconCred": "",
  "DuracionsinCred": "",
  "CloseCaption": 0,
  "HDSD": null,
  "Suceso": null,
  "Teaser": "Diputados Actividades (MP);Diputados Actividades (MP);POLITICA Y GOBIERNO;0;I24863;2012-02-28T00:00:00;0029021205920000;Maxi Pel;NO DATO;NO DATO;CIUDAD DE MEXICO;D.F.;MEXICO;508000281;DIPUTADOS ACTIVIDADES ;NOTICIAS TELEVISION AZTECA;2012-03-28T00:00:00;DIPUTADOS ACTIVIDADES CHACALEO ALEJANDRO"
}'  onclick="imgVideo_click(this);" /> 
                    <div class="divMatType"   data-Busqueda='{
  "IdFileName": "0029021205920000",
  "NombrePais": "MEXICO",
  "CvePais": 1,
  "CveEstado": 63,
  "NombreEstado": "D.F.",
  "CveCiudad": 160860,
  "NombreCiudad": "CIUDAD DE MEXICO",
  "OrdenTrabajo": 1824863,
  "Titulo": "Diputados Actividades (MP)",
  "NombreSeccion": "POLITICA Y GOBIERNO",
  "CveSeccion": 1,
  "Empleados": "Maxi Pel",
  "Programas": "",
  "CveOrdenTrabajo": "I24863",
  "Video": "http://tvawebmam/aztecatube/VTK4/Videoteca19//videos/0029021205920000.mp4",
  "Imagen": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg",
  "FechaVideo": "\/Date(1332914400000-0600)\/",
  "Personajes": "ALEJANDRO ENCINAS RODRIGUEZ, JAIME CARDENAS, EMILIO CHUAYFFET, GUADALUPE ACOSTA NARANJO.",
  "PalabrasClave": "DIPUTADOS ACTIVIDADES, CHACALEO ALEJANDRO ENCINAS RODRIGUEZ, DIPUTADO PRD, RECURSOS IFE, ELECCIONES 2012, EJECUTIVO FEDERAL GOZA DE PRESTACIONES MUY POR ENCIMA DE AL LEY, JAIME CARDENAS, DIPUTADO, PT, BONO DE IFE A EMPLEADOS, EMILIO CHUAYFFET, DIPUTADO PT, INJERENCIA EJECUTIVO EN PROCESO ELECTORAL, GUADALUPE ACOSTA NARANJO, PRESIDENTE MESA DIRECTIVA CAMARA DE DIPUTADOS, LLAMADO PARA RESPETAR VOTO DE CIUDADANIA, EVITAR POLARIZACION DE MEXICO.",
  "Objetivo": "Diputados Actividades (MP)",
  "ConcatenadoFotos": "http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920000.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920101.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920102.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920103.jpg|http://tvawebmam/aztecatube/VTK4/Videoteca19//imagenes/0029021205920104.jpg",
  "FechaAgenda": "2012-02-28 00:00:00",
  "QueryBusqueda": null,
  "CveAgencia": 99,
  "CvePrograma": 0,
  "DetIdFilename": "0029021205920100",
  "NombrePrograma": "NO DATO",
  "NumRecuperaciones": 0,
  "Banned": 0,
  "NombreAgencia": "NOTICIAS TELEVISION AZTECA",
  "NoCinta": "508000281",
  "TipoMaterial": 1,
  "OrigenMaterial": 0,
  "vdoId": 2630707,
  "TituloComercial": "",
  "Titulotraducido": "",
  "CapituloOriginal": "",
  "CapituloTraducido": "",
  "NumeroCapitulo": 0,
  "NombreGenero": "",
  "CveGenero": 0,
  "Formato": "IMX30",
  "Definicion": "SD",
  "NombreSenal": "",
  "CveSenal": 0,
  "TituloOriginal": "Diputados Actividades (MP)",
  "Sinopsis": "",
  "DuracionconCred": "",
  "DuracionsinCred": "",
  "CloseCaption": 0,
  "HDSD": null,
  "Suceso": null,
  "Teaser": "Diputados Actividades (MP);Diputados Actividades (MP);POLITICA Y GOBIERNO;0;I24863;2012-02-28T00:00:00;0029021205920000;Maxi Pel;NO DATO;NO DATO;CIUDAD DE MEXICO;D.F.;MEXICO;508000281;DIPUTADOS ACTIVIDADES ;NOTICIAS TELEVISION AZTECA;2012-03-28T00:00:00;DIPUTADOS ACTIVIDADES CHACALEO ALEJANDRO"}'> MB</div>
                    </div>

                </div>
</div>

<div id="Compra"  runat="server" class="compra"></div>

 </asp:Content>