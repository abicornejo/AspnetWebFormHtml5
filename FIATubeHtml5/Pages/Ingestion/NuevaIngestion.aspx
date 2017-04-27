<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="NuevaIngestion.aspx.cs" Inherits="FIATubeHtml5.Pages.Ingestion.NuevaIngestion" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
 <script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Ingestion/NuevaIngestion.js?Rand="+RandomCall) %>"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <div>
        <button type="button" id="btnGuardar" title="Guardar" onclick = "btnGuardar_Click(true);" onmouseout= "this.style.cursor='default';" onmouseover = "this.style.cursor='pointer';"> </button>
    </div>
    <br />
    <div id ="controles">
        <div>
	        <label id="lblTitOT"></label>
	        <label id="txbNumOT"></label>
        </div>
        <div>
            <label>Titulo:</label>
            <input type="text" id="txtTitu" />	               
        </div>
        <div>
             <label>Secci&oacuten:</label>
             <label id="lblSeccion"></label>
             <input type="text" id="txbSeccion" />	               
        </div>

         <div id="divPrg">
             <label id="lblprograma">Programa:</label>
             <select id="cboProg" class="cmbProduccion" ></select>               
        </div>
        <div >
            <label>Tipo Señal:</label>
             <select id="cmbTipoIngestion" onchange="tipoIng_changed(); return false;"></select>               
        </div>
        <div style="display:none;">
            <label>Local:</label>
             <select id="cmbLocales"></select>               
        </div>
        <div id="divCinta">
             <label>No. Cinta:</label>
             <input type="text" id="txtNoCinta" />	               
        </div>
        <div id="divFeed">
            <div id="divAgenFeed">
                <label>Agencia:</label>
                <select id="cmbAgenciaFeed"></select>
            </div>
            <div id="divNombreFeed">
                <label>Nombre del Feed:</label>
                <input type="text" id="txtNombreFeed" />
            </div>
            <div id="divFechaFeed">
                <label>Fecha de env&iacute;o:</label>
                <input type="text" id="dtFechaFeed" placeholder="dd/MM/yyyy"/>
            </div>
            <div id="divHoraFeed">
                <label>Hora de env&iacute;o:</label>
                <input type="text" id="hrHoraFeed" placeholder="HH:MM" readonly="readonly"/>
            </div>
            <div id="divDuracionFeed">
                <label>Duraci&oacute;n estimada:</label>
                <input type="text" id="hrDuracionFeed" placeholder="HH:MM" readonly="readonly"/>
            </div>
            <div>
                <label>Replicar d&iacute;as:</label>
                <select id="cmbReplicaFeed">
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                </select>
            </div>
            <div id="divDescFeed">
                <label>Descripci&oacute;n:</label>
                <textarea id="txtDescFeed"></textarea>
            </div>
        </div>
        <div id="divSenal">
            <div id="divOrigenSenal">
                <label>Origen:</label>
                <input type="text" id="txtOrigSenal" />
            </div>
            <div id="divFechaSenal">
                <label>Fecha de enlace:</label>
                <input type="text" id="dtFechaSenal" placeholder="dd/MM/yyyy"/>
            </div>
            <div id="divHoraSenal">
                <label>Hora de enlace:</label>
                <input type="text" id="hrHoraSenal" placeholder="HH:MM" readonly="readonly"/>
            </div>
            <div id="divDuracionSenal">
                <label>Duraci&oacute;n estimada:</label>
                <input type="text" id="hrDurSenal" placeholder="HH:MM" readonly="readonly"/>
            </div>
            <div id="divCorresponsalSenal">
                <label>Corresponsal:</label>
                <select id="cmbCorresponsalSenal"></select>
            </div>
            <div id="divMedioSenal">
                <label>Medio de Transmisi&oacute;n:</label>
                <select id="cmbMedioSenal"></select>
            </div>
            <div>
                <label>Replicar d&iacute;as:</label>
                <select id="cmbReplicaSenal">
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                </select>
            </div>
            <div id="divDescSenal">
                <label>Descripci&oacute;n:</label>
                <textarea id="txtDescSenal"></textarea>
            </div>
        </div>
        <div id="divArchivar">
            <label for="ckbArchivar">Archivar:</label>
            <input type="checkbox" id="ckbArchivar"/>
        </div>
    </div>
</asp:Content>
