<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="PreguntasEncuestas.aspx.cs" Inherits="FIATubeHtml5.Pages.Encuestas.PreguntasEncuestas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label>ALTA DE PREGUNTAS</label>
    <label>Encuesta:</label>
    <br />
    <label for="txtPregunta">Pregunta:</label>
    <input type="text" id="txtPregunta" />
    <label for="cmbEstado">Estado:</label>
    <select id="cmbEstado"></select>
    <label for="cmbTipo">Tipo:</label>
    <select id="cmbTipo"></select>
    <input type="button" id="btnGuardar" title="Guardar" />
    <input type="button" id="btnCancelar" title="Cancelar" />
    <br />
    <table id="tblEncuestas">
        <thead>
            <tr>
                <th>Encuesta:</th>
                <th>Pregunta</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Operaci&oacute;n</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    <br />
    <label for="txtPreguntaG">Pregunta:</label>
    <input type="text" id="txtPreguntaG" />
    <label for="cmbEstadoG">Estado:</label>
    <select id="cmbEstadoG"></select>
    <label for="cmbTipoG">Tipo:</label>
    <select id="cmbTipoG"></select>
</asp:Content>
