<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EstatusRecuperacionVideos.aspx.cs" Inherits="FIATubeHtml5.Pages.Video.EstatusRecuperacionVideos" MasterPageFile="~/Templates/FIATube.Master" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Solicitudes de recuperación.</title>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
	<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Video/EstatusRecuperacionVideos.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
    <ContentTemplate>
    <div class="otButtonsBckgrndWindowsB" id="BarraTiempo">
        Tiempo Restante:<label id="LblSegundosH"></label> &nbsp;segundos 
    </div>
     
    <div class="otButtonsBckgrndWindows" id="Filtros">
    <label class="title" >Estatus: </label>
        <select id="cmbEstatus" class="cmbEstatus" runat="server">
            <option value="0">TODOS</option>
            <option value="1">COMPLETADO</option>
            <option value="2">EN PROCESO</option>
            <option value="3">CANCELADO</option>
        </select>
        <label class="title">Fecha Inicial:</label> 
        <input id="txtFechaIni" class="txtFechas2" type="text" runat="server" />
        <label class="title">Fecha Final:</label>
        <input id="txtFechaFin" class="txtFechas2" type="text"  runat="server" />
        
    </div>
    <asp:HiddenField ID="HDSeg" runat="server" />
    <asp:Button ID="BntActualizar" class="btnActualizarRecuVideos" runat="server" Text="" onclick="BntActualizar_Click" />
        
    <div id="Resultado" class="divRecVidResultados" runat="server">
    
    </div>

   </ContentTemplate>
    </asp:UpdatePanel>

   
</asp:Content>
