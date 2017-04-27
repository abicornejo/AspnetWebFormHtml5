<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AdministradorEncuestas.aspx.cs" Inherits="FIATubeHtml5.Pages.Encuestas.AdministradorEncuestas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Encuestas.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>ALTA DE ENCUESTAS</label>
    <br />
    <label>Encuesta:</label>
    <input type="text" id="txtEncuesta" />
    <label for="dtFechaIni">Fecha Inicial:</label>
    <input type="text" id="dtFechaIni" />
    <label for="dtFechaFin">Fecha Final:</label>
    <input type="text" id="dtFechaFin" />
    <label for="cmbEstados">Estado:</label>
    <select id="cmbEstados"></select>
    <input type="checkbox" id="chkObligatorio" />
    <label for="chkObligatorio">Obligatorio</label>
    <input type="button" id="btnGuardar" title="Guardar" />
    <input type="button" id="btnCancelar" title="Cancelar" />
    <br />
    <table id="tblEncuesta">
        <thead>
                <tr>
                    <th>Encuesta</th>
                    <th>Fecha Creaci&oacute;n</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Final</th>
                    <th>Estado</th>
                    <th>Obligatorio</th>
                    <th>Operaci&oacute;n</th>
                </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <br />
    <label for="txtEncuestaG">Encuesta</label>
    <input type="text" id="txtEncuestaG" />
    <label for="dtFechaIniG">Fecha Inicial:</label>
    <input type="text" id="dtFechaIniG" />
    <label for="dtFechaFinG">Fecha Final:</label>
    <input type="text" id="dtFechaFinG" />
    <input type="checkbox" id="chkObligatorioG" />
    <label for="chkObligatorioG">Obligatorio</label>
    <label for="cmbEstadosG">Estado:</label>
    <select id="cmbEstadosG"></select>
</asp:Content>
