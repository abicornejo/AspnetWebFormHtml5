<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="AgendaDiaria.aspx.cs" Inherits="FIATubeHtml5.Pages.Agendas.AgendaDiaria" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/AgendaDiaria.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
  <div id="Filtros">
    <div class="otButtonsBckgrnd">							
	    <label for="cmbLocales" class="title" id = "lbllocales">Locales:</label>
	    <select id="cmbLocales" class="cmbLocales" onchange = "cmbLocales_SelectionChanged();" ></select>
	    <label for="cmbSecciones" class="title" id = "lblSeccion">Secci&oacute;n:</label>
	    <select id="cmbSecciones" class="cmbSecciones" onchange = "cmbSecciones_SelectionChanged();" ></select>
	    <label for="cmbProduccion" class="title" id="lblProduccion">Producci&oacute;n:</label>
	    <select id="cmbProduccion" class="cmbProduccion"  onchange = "cmbProduccion_SelectionChanged();"></select>
	    <label class="title" for="dtFecha">Fecha:</label>
	    <input type="text" class="txtFechas2" id="dtFecha" onchange = "dtFecha_Changed();" placeholder="dd/MM/yyyy"/>
	    <label class="title" for="txtTexto">Texto:</label>
	    <input type="text" id="txtTexto" class="txtInputMaster varFloatLeft" onkeydown = "txtTexto_KeyDown();" />
	    <label class="title" for="txtOT" style="display:none;">OT:</label>
	    <input type="text" class="txtInputMaster" id="txtOT" style="display:none;" onkeydown = "txtOT_KeyDown();"/>	               
	    
    </div>
    <div class="divAgDiariaTitle">
        <label class="AgDiariaTitle" id="litDia2" onmouseup = "doSomething(event);" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></label>
        <button type="button" class="btnActualizarAgendaSemanal" id="btnActualizar" title="Actualizar" onclick= "btnActualizar_Click();" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"></button>
    </div>
 </div>     
    
    <asp:HiddenField ID="hiddLocl" runat="server" />
    <asp:HiddenField ID="hiddSecc" runat="server" />
    <asp:HiddenField ID="hiddFecA" runat="server" />
    <asp:HiddenField ID="hiddText" runat="server" />
    <asp:HiddenField ID="hiddLocv" runat="server" />

    <asp:UpdatePanel runat="server" id="updPanel1">
        <ContentTemplate>
            <asp:Button id="btnSearch" class="hideButton" runat="server" OnClick="btnActualizar_Click" OnClientClick="setFilters();" />
            <div id="divGridAgenda" class="divGridBitacoraDiaria" runat="server"></div>
        </ContentTemplate>  
    </asp:UpdatePanel>

    <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>
        </asp:updateprogress>
    </div>











      
     
      <div id="FlowCopiar"  title = "Opciones de Copiado">

      <div>
        <div>
        <label>No. OT</label>
                
        </div>
            <div>
        <input type="checkbox" id="chkCopyNoOT"/>
        </div>
      </div>
      <div>
        <div>
            <label>titulo</label>                
        </div>
        <div>
            <input type="checkbox" id="chkCopyTitulo" />
        </div>
      </div>
         


     </div>
    <div id="dialog-confirm" title="Eliminar"></div>
    <br />
    <%--<div id="loading" class="cntrElement">
        <img alt="Loading..." id="ImgLoader" runat="server" src="../../Images/image-loading.gif" />
    </div>--%>




</asp:Content>
