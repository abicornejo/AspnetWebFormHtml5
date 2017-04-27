<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Cintas.aspx.cs" Inherits="FIATubeHtml5.Pages.Cintas.Cintas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Cintas/Cintas.js?Rand="+RandomCall) %>"></script>
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Config/jquery-1.8.16.ui.min.js?Rand="+RandomCall) %>"></script>
    <style type="text/css">
	
	#vidSliderTime {
		clear: left;
		width: 250px;
	}
	
	#vidSliderTime .ui-slider-range { background: #729fcf; }
	#vidSliderTime .ui-slider-handle { border-color: #729fcf; }
	</style>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <label for="txtNumCinta">No. de Cinta:</label>
    <input type="text" id="txtNumCinta" />
    <input type="button" id="btnGuardar" title="Guardar" />
    <br />

    <table id="tblCintas">
        <thead>
            <tr>
                <th>No. de Cinta</th>
                <th>Estatus</th>
                <th>Editar</th>
                <th>Borrar</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    
    <div id="myVideo"></div>
    <%--<video id="myVideo" width="320" height="240" controls="controls">
        <source src="../../AztecaTube.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>--%>
    <br />

    <div>
        <label style="float:left;" id="lblCurrVidTime">00:00:00</label>
        <div id="vidSliderTime"></div>
        <label title="Tiempo de duraci&oacute;n del Video" id="lblVidTime">00:00:00</label>
        <button type="button" onclick="seekBack();"><<</button>
        <button type="button" onclick="playerPlay();">Play</button>
        <button type="button" onclick="seekForward();">>></button>
        <button type="button" onclick="playerStop();">Stop</button>
    </div>

    
</asp:Content>
