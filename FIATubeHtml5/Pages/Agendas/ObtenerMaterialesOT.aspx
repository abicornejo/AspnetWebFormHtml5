<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ObtenerMaterialesOT.aspx.cs" MasterPageFile="~/Templates/FIATube.Master" Inherits="FIATubeHtml5.Pages.Agendas.ObtenerMaterialesOT" %>


<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Agendas/SolicitudMaterial.js?Rand="+RandomCall) %>"></script>
<style type="text/css">
        .Oculta
        {
            display:none;
        }
    </style>



</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>

    <div id="SolicitudMaterial" >        
        <div class="otButtonsBckgrndWindowsObtMat">                
            <input id="BtnGuardar" class="btnGuardar" type="button" onclick="ClickGuardar();"  />                    
            <asp:Button ID="BtnDetonador" runat="server" Text="Detonador"  onclick="BtnDetonador_Click" CssClass="Oculta"  />               
        </div>
        <div class="divBodyObtMat">
            <div class="divBodyObtMatSecc">
                <label class="lblObtMat">Local Origen:</label>
                <label id="lblLocal" runat="server" data-Agenda="0"></label>
            </div>   
            <div class="divBodyObtMatSecc">
                <label class="lblObtMat">Local destino:</label>
                <select id="cmbLocalDestino" class="cmbLocalDestino" runat="server" name="D2"></select>
            </div>            
            <div class="divBodyObtMatSecc">                
                <label class="lblObtMat">Programa Solicita:</label>                
                <select id="cmbPrograma" class="cmbProgramaObtMat" runat="server" name="D3"></select>
            </div>
            <div class="divBodyObtMatSecc">                    
                <asp:HiddenField ID="HDAgenda" runat="server" />               
                <asp:HiddenField ID="HDML" runat="server" />                
            </div>
        </div>    
    </div>
                    <asp:HiddenField ID="HDAgenda2" runat="server" />
                    <asp:HiddenField ID="HDML2" runat="server" />
 
   <div id="PreviaSolicitudMaterial" class="divPreviaSolicitudMaterial" runat="server">
   </div>
   
   <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
            <div id="Div1" runat="server">
           <asp:Button ID="BtnVideoConsulta" runat="server"  Text="VC" onclick="BtnVideoConsulta_Click" CssClass="Oculta"   />
      
                    </div>
    </ContentTemplate>
    </asp:UpdatePanel>

</asp:Content>
