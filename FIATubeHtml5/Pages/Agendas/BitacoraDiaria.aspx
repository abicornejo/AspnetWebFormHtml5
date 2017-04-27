<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="BitacoraDiaria.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.BitacoraDiaria" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/BitacoraDiaria.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
    <table class="otButtonsBckgrnd" style="width:100%">
    <tr>
    <td>
    <label for="cmbLocales" class="title">Local:</label>
    <select id="cmbLocales" class="cmbLocales" onchange="cmbLocales_change();"></select>
    <div id="divFilSecc" class="itemMenuBitDi">
        <label for="cmbSecciones" class="title">Secci&oacute;n:</label>
        <button type="button" id="btnShowSecc" class="btnShowSecc" title="Mostrar Secciones" data-isopen="false" onclick="muestraSecc(); return false;"></button>
        <div id="divSecciones"></div>
    </div>
    <label class="title">Reportero:</label>
    <select id="cmbReportero" class="cmbLocales" onchange="cboReportero_change();">
        <option value="0">== SELECCIONE ==</option>
    </select>
    <label for="dtFecha" class="title">Fecha:</label>
    <input type="text" class="txtFechas" id="dtFecha" placeholder="dd/MM/yyyy" onchange="bindList(); return false;"/>
    <label for="txtTexto" class="title">Texto:</label>
    <input type="text" class="txtInputMaster" id="txtTexto" runat="server"/>
    <label for="txtOT" class="title" style="display:none;">OT:</label>
    <input type="text" class="agDiInput itemMenuBitDi" id="txtOT" style="display:none;" runat="server"/>

    <input type="hidden" id="hiddEmpr" runat="server"/>
    <input type="hidden" id="hiddFabr" runat="server"/>
    <input type="hidden" id="hiddSecc" runat="server"/>
    <input type="hidden" id="hiddFech" runat="server"/>
    <input type="hidden" id="hiddPerm" runat="server"/>
    <input type="hidden" id="hiddLocl" runat="server"/>
    <input type="hidden" id="hiddProd" runat="server"/>
    <input type="hidden" id="hiddRepo" runat="server"/>
    </td>
    <td style="width:10%; text-align:right;">
    
    <input type="button"  class="btnImprimirDerechaBitDiaria" id="btnImprimir" title="Imprimir" onclick="btnImprimir_click();" />
    <input type="button" id="btnMenuCopiar" style="display:none;" title="Copiar" onclick="$('#divOpcCopy').dialog('open')"/>
    </td>
    </tr>
    </table>

    <asp:UpdatePanel runat="server" id="updPanel1" EnableViewState="false">
        <ContentTemplate>
            <input type="hidden" id="hiddUpEq" runat="server"/>
            <asp:Button ID="btnActualizar" class="btnActualizarBitDi"  runat="server" ToolTip="Actualizar" OnClick="btnActualizar_Click" OnClientClick="actualizaDatos();" EnableViewState="false"/>
            <br />
            <div id="divContentResult" class="divGridBitacoraDiaria" runat="server" enableviewstate="false"></div>
        </ContentTemplate>  
    </asp:UpdatePanel>
    <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>
        </asp:updateprogress>
    </div>

    <div id="divOpcCopy" title="Opciones de copiado">
        <label for="chkOT">No. OT</label>
        <input type="checkbox" checked="checked" id="chkOT" />
        <br />
        <label for="chkTit">T&iacute;tulo</label>
        <input type="checkbox" checked="checked" id="chkTit"/>
        <br />
        <label for="chkRep">Reporteros</label>
        <input type="checkbox" checked="checked" id="chkRep"/>
        <br />
        <label for="chkAva">Avances</label>
        <input type="checkbox" checked="checked" id="chkAva"/>
        <br />
        <label for="chkObj">Objetivo</label>
        <input type="checkbox" checked="checked" id="chkObj"/>
        <br />
        <input type="button" id="btnOpcCopiar" title="Copiar" onclick="btnCopy_clik();"/>
    </div>
</asp:Content>
