<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="TeasersyBumpers.aspx.cs" Inherits="FIATubeHtml5.Pages.OT.TeasersyBumpers" %>
<%@ Register Assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" Namespace="System.Web.UI" TagPrefix="asp" %>

<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
    <title>Teasers y Bumpers</title>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
    <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/OTs/TeasersyBumpers.js?Rand="+RandomCall) %>"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" EnablePartialRendering="true">
    </asp:ScriptManager>
    <div class="otButtonsBckgrndWindowsTeasersYBumpers">
        <button type="button" id="btnGuardar" class="btnGuardarTeasersYBumpers" onclick="btnActualizar_click(); return false;"></button>
    </div>
    <div>
        <div id="divContadores" class="divBodyTeasersYBumpers">
        <div class="divTeasersYBumpersOpts">
            <div class="divBodyTeasersYBumpersSecc"> 
                <label class="lblTeasersYBumpers">Programa:</label>
                <select id="cmbProgramas" class="cmbProgramaTeasYBump"></select>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Fecha:</label>
                <input type="text" class="txtFechas2" id="dtFecha" />
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Teasers:</label>
                <asp:TextBox ID="txtTeasers" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Bumpers:</label>
                <asp:TextBox ID="txtBumpers" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Pistas:</label>
                <asp:TextBox ID="txtPistas" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Enlace Helic&oacute;ptero:</label>
                <asp:TextBox ID="txtEnlaceH" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Enlace Helic&oacute;ptero Truco:</label>
                <asp:TextBox ID="txtEnlaceHT" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Enlace Moto:</label>
                <asp:TextBox ID="txtEnlaceMoto" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Enlace Moto Truco:</label>
                <asp:TextBox ID="txtEnlaceMotoT" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Cortinillas:</label>
                <asp:TextBox ID="txtCortinillas" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Promos:</label>
                <asp:TextBox ID="txtPromos" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Rompecortes:</label>
                <asp:TextBox ID="txtRompecortes" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
            <div class="divBodyTeasersYBumpersSecc">
                <label class="lblTeasersYBumpers">Fotoportada:</label>
                <asp:TextBox ID="txtFotoportada" class="txtInputMaster varFourCharacters" runat="server" MaxLength="4" placeholder="____"></asp:TextBox>
            </div>
        </div>
        
        <asp:UpdatePanel runat="server" id="updPanel1">
            <ContentTemplate>
                <asp:Button id="btnActualizar" title="Actualizar" CssClass="hideButton" runat="server" Text=""  OnClick="btnActualizar_Click" />
                <div class="divTeasersYBumpersOTs" >
                    <div id="divTitulos" class="divTitulosTeasersYBumpers">
                        <div class="divOTTYB">OT</div>
                        <div class="divTITULOTYB">T&Iacute;TULO</div>
                    </div>
                    <div runat="server" id="divResultados" class="divResultados"></div>
                </div>
            </ContentTemplate>  
        </asp:UpdatePanel>
        </div>
        <div class="cntrElement">
        <asp:updateprogress id="UpdateProgress1" runat="server" associatedupdatepanelid="updPanel1" dynamiclayout="true">
            <progresstemplate>
                <img alt="Loading..." src="../../Images/image-loading.gif">
            </progresstemplate>
        </asp:updateprogress>
        </div>
        <asp:HiddenField ID="hiddPrg" runat="server" />
        <asp:HiddenField ID="hiddFec" runat="server" />
    </div>
</asp:Content>
