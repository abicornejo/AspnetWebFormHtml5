<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaSemanal.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.AgendaSemanal" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/AgendaSemanal.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/jquery.MetaData.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/jquery.rating.js?Rand="+RandomCall) %>"></script>
    
    <link rel="stylesheet" type="text/css" href="../../Styles/jquery.rating.css" />

<style type="text/css">
        .Oculta
        {
            display:none;
        }
    </style>
    

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" EnablePageMethods="true">
    </asp:ScriptManager>
    <div class="otButtonsBckgrnd">
        <label class="title">Local:</label>
        <select id="cmbLocales" runat="server" class="cmbLocales" onchange="cmbLocales_changed();"></select>
        <label id="lblSeccion" class="title" for="cmbSecciones">Secci&oacute;n:</label>
        <select id="cmbSecciones" class="cmbSecciones" onchange="cboSecciones_changed();"></select>
        <label class="title">Reportero:</label>
        <select id="cmbReportero" class="cmbLocales" onchange="cboReportero_change();">
            <option value="0">== SELECCIONE ==</option>
        </select>
        <label id="lblProduccion" class="title" style="display:none;" for="cmbProduccion">Producci&oacute;n:</label>
        <select id="cmbProduccion" class="cmbProduccion" runat="server" style="display:none;" onchange="cboProduccion_changed();"></select>
        <label for="txtTexto">Texto:</label>
        <input type="text" class="txtInputMaster" id="txtTexto" runat="server"/>
        <label for="txtOT" class="title" style="display:none;">OT:</label>
        <input type="text" id="txtOT" class="txtOT" style="display:none;" runat="server"/>
        <label class="title">Semana:</label>
        <input type="text" id="dtFecha" class="txtFechas2" onchange="dtFecha_change();" placeholder="dd/MM/yyyy" />
        <input type="checkbox" class="checkBoxASemanal" id="chkVerSeccion" onchange="chkVerSeccion_changed();" />
        <label for="chkVerSeccion" class="checkBoxAS checkBoxASLabel">Ver solo mi secci&oacute;n</label>
    </div>
    <br />
    <div >
        <input type="button" id="btnAtras" class="btnAtras" title="Semana Anterior" onclick="btnAtras_click();" />
        <label id="lblWeekOfYear" class="lblWeekOfYear" ></label>
        <input type="button" id="btnAdelante" class="btnAdelante" title="Semana Siguiente" onclick="btnAdelante_click();" />
        <input type="button" id="btnImprimir" class="btnImprimirDerecha" title="Imprimir"  style="display:none;" />
    </div>
    <input type="hidden" id="hiddSecc" runat="server" />
    <input type="hidden" id="hiddFecIni" runat="server" />
    <input type="hidden" id="hiddFecFin" runat="server" />
    <input type="hidden" id="hiddTN"  runat="server"/>
    <input type="hidden" id="hiddFac" runat="server" />
    <input type="hidden" id="hiddProd" runat="server" />
    <input type="hidden" id="hiddLocal" runat="server" />
    <input type="hidden" id="hiddLocalCv" runat="server" />
    <input type="hidden" id="hiddRepo" runat="server"/>
    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <input type="hidden" id="hiddUpEq" runat="server"/>
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
            
                    <asp:HiddenField ID="HDAgenda" runat="server" />
                    <asp:Button ID="BntDetonador" runat="server" Text="Detonador" 
                        onclick="BntDetonador_Click"  CssClass="Oculta" />


    

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

