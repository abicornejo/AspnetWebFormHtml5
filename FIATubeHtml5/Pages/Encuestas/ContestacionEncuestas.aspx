<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="ContestacionEncuestas.aspx.cs" Inherits="FIATubeHtml5.Pages.Encuestas.ContestacionEncuestas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    <img alt="Logo AztecaTube" src="<%=ResolveUrl("~/Images/Logos/aztecatube2.png") %>" />
    <label>AYUDANOS A MEJORAR</label>
    <p>
        Por favor, dedique unos minutos a completar esta pequeña encuesta.
        Sus respuestas serán tratadas de forma confidencial y servirán para mejorar la Aplicación. 
        Esta encuesta dura aproximadamente cinco minutos.
    </p>
    <p>
        Instrucciones de uso (Se realizarán || preguntas, algunas son de opción múltiple y otras de texto abierto, 
        procura ser breve, lee cuidadosamente cada pregunta, si te equivocas o no estas seguro puedes regresar...)  
    </p>
    <p>
        Advertencia (Procura realizar esta encuesta en una solo sesión ya que se guardara al terminarla.)
    </p>
</asp:Content>
