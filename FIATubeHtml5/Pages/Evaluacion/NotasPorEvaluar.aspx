<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="NotasPorEvaluar.aspx.cs" Inherits="FIATubeHtml5.Pages.Evaluacion.NotasPorEvaluar" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Evaluacion/NotasPorEvaluar.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" EnablePageMethods="true">
    </asp:ScriptManager>

    <div id="divFiltros" class="bckgrndWindowEvaluacion">
        <label class="varFloatLeft varMarginTop3">Local:</label>
        <select id="cmbLocales" class="cmbLocales" onchange="return changeLocal();"></select>

        <label class="varFloatLeft varMarginTop3">Programa:</label>
        <select id="cmbProgramas" class="cmbLocales">
            <option value="0">==SELECCIONE==</option>
        </select>

        <label class="varFloatLeft varMarginTop3">Fecha:</label>
        <input type="text" id="dtFecha"" class="txtFechas2" />

        <button type="button" id="btnBuscar" class="btnBuscarEvaluacion" title="Buscar" onclick="search();"></button>

        <div id='divComment'>
            <a href="#" class='divTblEvaluacionHeaderTitle' onclick="commentClose();">Enviar</a>
            <br />
            <textarea style="width:270px; height:200px" id="txtComment" rows="5"></textarea>
        </div>
        <asp:HiddenField runat="server" ID="hdfLocl" />
        <asp:HiddenField runat="server" ID="hdfPrgm" />
        <asp:HiddenField runat="server" ID="hdfDate" />
    </div>

    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <asp:Button runat="server" CssClass="hideButton" ID="btnBuscarHdd" OnClick="buscarEvaluacion_click" OnClientClick="return setFilters();" />
            <div class="divTblEvaluacionHeaderTitle"><label>NOTAS POR EVALUAR</label></div>
            <div id="divHeadersPorEvaluar">
                <div class="divTblEvaluacionHeader varEvaluacionCons"></div>
                <div class="divTblEvaluacionHeader varEvaluacionDel">Del</div>
                <div class="divTblEvaluacionHeader varEvaluacionRep">OT</div>
                <div class="divTblEvaluacionHeader varEvaluacionRep">Reportero</div>
                <div class="divTblEvaluacionHeader varEvaluacion">Formato</div>
                <div class="divTblEvaluacionHeader varEvaluacionRep">Evaluaci&oacute;n</div>
                <div class="divTblEvaluacionHeader varEvaluacion">Comentario</div>
                <div class="divTblEvaluacionHeader varEvaluacion">Calif. Preliminar</div>
            </div>
            <div id="divContentPorEval" runat="server"></div>
            <br />
            
            <div class="divTblEvaluacionHeaderTitle"><label>NOTAS EVALUADAS</label></div>
            <div id="divHeadersEvaluadas">
                <div class="divTblEvaluacionHeader2 varEvaluacionCons"></div>
                <div class="divTblEvaluacionHeader2 varEvaluacionDel">Del</div>
                <div class="divTblEvaluacionHeader2Lg">OT</div>
                <div class="divTblEvaluacionHeader2Sm">Reportero</div>
                <div class="divTblEvaluacionHeader2Sm">Formato</div>
                <div class="divTblEvaluacionHeader2Lg">Evaluaci&oacute;n</div>
                <div class="divTblEvaluacionHeader2Sm">Comentario</div>
                <div class="divTblEvaluacionHeader2Sm">Calif. Preliminar</div>
                <div class="divTblEvaluacionHeader2Sm">H. Transmisi&oacute;n</div>
                <div class="divTblEvaluacionHeader2Sm">Calific&oacute;</div>
                <div class="divTblEvaluacionHeader2Sm">Apelaci&oacute;n</div>
            </div>
            <div id="divContentEvaluadas" runat="server"></div>

        </ContentTemplate>  
    </asp:UpdatePanel>
    <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>

        </asp:updateprogress>
    </div>
</asp:Content>
