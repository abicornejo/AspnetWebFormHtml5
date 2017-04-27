<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="BitacoraDiariaProgramas.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.BitacoraDiariaProgramas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/BitacoraDiariaProgramas.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
    <div class="otButtonsBckgrnd">
        <label for="cmbSecciones" class="title">Secci&oacute;n:</label>
        <select id="cmbSecciones" class="cmbSecciones" onchange="selectedValue_change();"></select>
        <label for="cmbProgramas" class="title">Programas:</label>
        <select id="cmbProgramas" class="cmbPrograma" onchange="selectedValue_change();"></select>
        <label for="dtFecha" class="title">Fecha:</label>
        <input type="text" id="dtFecha" class="txtFechas2" onchange="selectedValue_change();" placeholder="dd/MM/yyyy"/>

        <input type="hidden" id="hiddSecc" runat="server" />
        <input type="hidden" id="hiddFech" runat="server" />
        <input type="hidden" id="hiddLocl" runat="server" />
        <input type="hidden" id="hiddProd" runat="server" />
    </div>
    <asp:UpdatePanel runat="server" id="updPanel1" EnableViewState="false">
        <ContentTemplate>
            <asp:Button ID="btnActualizar" runat="server" class="btnActualizarAgendaSemanal" ToolTip="Actualizar" OnClick="btnActualizar_Click" OnClientClick="updateData();" EnableViewState="false"/>
            <br />
            <div id="divContentResult" class="divContentResultBitDiaProg" runat="server" enableviewstate="false"></div>
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
