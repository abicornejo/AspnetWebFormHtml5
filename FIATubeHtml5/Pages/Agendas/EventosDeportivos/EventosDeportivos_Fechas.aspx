<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="EventosDeportivos_Fechas.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.EventosDeportivos.EventosDeportivos_Fechas" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Evento Deportivo</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/EventosDeportivos/EventosDeportivos_Fechas.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePageMethods="true">
	</asp:ScriptManager>	

    <input type="button" style='display:none;' id="btnAgregarSubEvento" title="Agregar SubEvento" onclick="btnAgregarSubEvento_click();"/>
    <input type="button" style='display:none;' id="btnSolicitud" title="Crear Solicitud" onclick="openOption('S');"/>
    <input type="button" style='display:none;' id="btnGraficos" title="Solicitud de Gráficos" onclick="openOption('G');"/>
    <input type="button" style='display:none;' id="btnLogistica" title="Logistica" onclick="openOption('L');"/>
    <input type="button" style='display:none;' id="btnObservaciones" title="Observaciones" onclick="btnObs_click();"/>
    <input type="button" style='display:none;' id="btnEquipo" title="Equipo de Trabajo" onclick="openOption('E');"/>
    <input type="button" style='display:none;' id="btnIngestion" title="Crear Ingestión OT" onclick="openOption('I');"/>
    <input type="button" style='display:none;' id="btnMultiplesOT" title="Crear Multiples OT" onclick="openOption('MO');"/>
    <input type="button" style='display:none;' id="btnNuevaOT" title="Nueva OT" onclick="openOption('O');"/>
    <input type="button" style='display:none;' id="btnGuardar" title="Guardar"/>
    <input type="button" style='display:none;' id="btnEliminar" title="Eliminar" onclick="btnDelete_click();"/>
    <br />
    <div id="divEventTree" style="display:none;"></div>

    <div id="divEventData">
        <label id="lblFecha"></label>
        <br />
        <label>T&iacute;tulo:</label>
        <input type="text" id="txtTitulo" />
        <br />
        <label>Descripci&oacute;n:</label>
        <textarea id="txtDescripcion"></textarea>
        <br />
        <label for="txtLugar">Lugar:</label>
        <textarea id="txtLugar"></textarea>
        <br />
        <label>Fecha Inicio:</label>
        <input type="text" id="dtFechaInicio" placeholder="dd/MM/yyyy" readonly="readonly"/>
        <label>Hora Inicio:</label>
        <input type="text" id="txtHoraInicio" placeholder="HH:MM"/>
        <br />
        <label>Fecha Fin:</label>
        <input type="text" id="dtFechaFin" placeholder="dd/MM/yyyy"/>
        <label>Hora Fin:</label>
        <input type="text" id="txtHoraFin" placeholder="HH:MM"/>
        <br />
        <label>Programas:</label>
        <select id="cmbProgramas"></select>
        <br />
        <div id="acdAcordion">
            <h3><a href="#">Asignaciones</a></h3>
            <div>
                Contenido
            </div>
            <h3><a href="#">Señales</a></h3>
            <div>
                Contenido
            </div>
            <h3><a href="#">Agenda de programa</a></h3>
            <div>
                Contenido
            </div>
            <h3><a href="#">Log&iacute;stica</a></h3>
            <div>
                Contenido
            </div>
            <h3><a href="#">Equipo de trabajo</a></h3>
            <div id="divEqTrabContent"></div>
            <h3><a href="#">Solicitudes</a></h3>
            <div>
                <div>
                    <div><label>Solicitud</label></div>
                    <div><label>T&iacute;tulo</label></div>
                    <div><label>Programa</label></div>
                    <div><label>Fecha</label></div>
                </div>
                <div id="divSolContent"></div>
            </div>
            <h3><a href="#">Catalogaci&oacute;n</a></h3>
            <div>
                Contenido
            </div>
        </div>
    </div>
</asp:Content>
