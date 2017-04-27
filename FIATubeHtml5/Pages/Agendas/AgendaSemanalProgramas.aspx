<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaSemanalProgramas.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.AgendaSemanalProgramas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/AgendaSemanalProgramas.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
    <div class="otButtonsBckgrnd">
    <label id="lblSeccion" class="title" for="cmbSecciones">Secci&oacute;n:</label>
    <select id="cmbSecciones" class="cmbSecciones" onchange="value_change();"></select>
    <label id="lblProduccion" class="title" for="cmbProduccion">Producci&oacute;n:</label>
    <select id="cmbProduccion" class="cmbAgendaSemanalPrograma" onchange="value_change();"></select>
    <label class="title">Semana:</label>
    <input type="text" id="dtFecha" class="txtFechas2" onchange="dtFecha_change();" placeholder="dd/MM/yyyy" />
    </div>
    <br />
    <input type="button" id="btnAtras" class="btnAtrasASP" title="Semana Anterior" onclick="btnAtras_click();" />
    <label id="lblWeekOfYear" class="lblWeekOfYear" ></label>
    <input type="button" id="btnAdelante" class="btnAdelante" title="Semana Siguiente" onclick="btnAdelante_click();" />
    <input type="button" id="btnImprimir" style="display:none;" class="btnImprimirDerecha" title="Imprimir" />

    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <asp:Button id="btnActualizar" class="btnActualizarAgendaSemanal" title="Actualizar" runat="server" Text=""  OnClick="btnActualizar_Click" OnClientClick="btnActualizar_click();" />
            <div id="divGridAgenda" class="divGridAgenda" visible="true">
                <div id="divLunes"  class="divLunes" runat="server"></div>
                <div id="divMartes" class="divMartes" runat="server"></div>
                <div id="divMiercoles" class="divMiercoles" runat="server"></div>
                <div id="divJueves" class="divJueves" runat="server"></div>
                <div id="divViernes" class="divViernes" runat="server"></div>
                <div id="divSabado" class="divSabado" runat="server"></div>
                <div id="divDomingo" class="divDomingo" runat="server"></div>
            </div>
        </ContentTemplate>  
    </asp:UpdatePanel>
    <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>
        </asp:updateprogress>
    </div>
    <input type="hidden" id="hiddSecc" runat="server" />
    <input type="hidden" id="hiddProg" runat="server" />
    <input type="hidden" id="hiddFecIni" runat="server" />
    <input type="hidden" id="hiddFecFin" runat="server" />
</asp:Content>
