<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaDiariaProgramas.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.AgendaDiariaProgramas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/AgendaDiariaProgramas.js?Rand="+RandomCall) %>"></script>
    <style type="text/css">
	    .mySortable { list-style-type: none; margin:0; padding: 0; width: 100%; }
	    .mySortable li { margin: 15px 3px 3px 3px; padding: 0.4em; padding-left: 1.0em; background-color:#222222; border-radius: 5px; -moz-border-radius: 5px; border:1px solid #1F1F1F; }
	    .mySortable li span { position: absolute; margin-left: -1.3em;}
	</style>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true" EnablePageMethods="true">
    </asp:ScriptManager>
    <%--<table class="dgPlaylistAgendaDiaria">
    <tr>
    <td width="88%">--%>
    <%--<label for="cmbLocales">Local:</label>
    <select id="cmbLocales" onchange="cmbLocal_changed();"></select>--%>
    <div class="otButtonsBckgrnd">
        <label id="lblSecciones" class="title" for="cmbSecciones">Secci&oacute;n:</label>
        <select id="cmbSecciones" class="cmbSecciones" onchange="bindList();" ></select>
        <label for="cmbProgramas" class="title ">Programa:</label>
        <select id="cmbProgramas" class="cmbPrograma " onchange="bindList();"></select>
    
        <label for="txtTitulo" class="title">T&iacute;tulo:</label>
        <input type="text" id="txtTitulo" class="txtInputMaster varFloatLeft" onchange="bindList();"/>
        <label for="dtFecha" class="title">Fecha:</label>
        <input type="text" id="dtFecha" class="txtFechas" onchange="bindList();"/>
        <input type="hidden" id="hiddSecc" runat="server" />
        <input type="hidden" id="hiddFech" runat="server" />
        <input type="hidden" id="hiddLocl" runat="server" />
        <input type="hidden" id="hiddProd" runat="server" />
        <input type="hidden" id="hiddTitl" runat="server" />

        <%--</td>
        <td>--%>
        <input type="button" id="btnGuardarOrdn" class="btnGuardarAgDiaProg" title="Guardar Orden" onclick="btnGuardarOrdn_Click();" />
        <input type="button" id="btniNewsAll" class="btniNewsAgendaDiariaPrograma agDiInput" title="Enviar todo iNews" onclick="btniNewsAll_Click();" />
    <%--</td>
    </tr>
    </table>--%>
    </div>
    
    
    <asp:UpdatePanel runat="server" id="updPanel1" EnableViewState="false">
        <ContentTemplate>
            <asp:Button ID="btnActualizar" class="btnActualizarAgendaSemanal" runat="server" ToolTip="Actualizar" OnClick="btnActualizar_Click" OnClientClick="updateData();" EnableViewState="false"/>
            <br />
            <div id="divContentResult" runat="server" enableviewstate="false"></div>
        </ContentTemplate>  
    </asp:UpdatePanel>

    <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>
        </asp:updateprogress>
    </div>

    <br />
</asp:Content>
