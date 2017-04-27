<%@ Page Title="" Language="C#" MasterPageFile="~/Templates/FIATube.Master" AutoEventWireup="true" CodeBehind="Graficas.aspx.cs" Inherits="FIATubeHtml5.Pages.Graficadores.Graficas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="title" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="head" runat="server">
<script type="text/javascript" src="<%=ResolveUrl("~/Scripts/Modulos/Graficadores/Graficas.js?Rand="+RandomCall) %>"></script>   
    <script src="<%=ResolveUrl("~/Scripts/Datatable/jquery.dataTables.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/TableTools.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Datatable/ZeroClipboard.js?Rand="+RandomCall) %>" type="text/javascript"></script>

    <script src="<%=ResolveUrl("~/Scripts/Graphics/financial-data.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.bar.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.bipolar.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.annotate.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.context.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.core.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.dynamic.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.effects.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.key.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.resizing.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.tooltips.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.common.zoom.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.cornergauge.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.fuel.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.funnel.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.gantt.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.gauge.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.hbar.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.hprogress.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.led.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.line.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.meter.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.modaldialog.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.odo.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.pie.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.radar.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.rose.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.rscatter.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.scatter.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.skeleton.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.thermometer.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.vprogress.js?Rand="+RandomCall) %>" type="text/javascript"></script>
    <script src="<%=ResolveUrl("~/Scripts/Graphics/RGraph.waterfall.js?Rand="+RandomCall) %>" type="text/javascript"></script>






    <link href="../../Styles/Datatable/demo_page.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Datatable/demo_table.css" rel="stylesheet" type="text/css" />
    <link href="../../Styles/Datatable/TableTools.css" rel="stylesheet" type="text/css" />
   <style type="text/css">
    .RGraph_contextmenu_item 
    {
        color:Black;
    }
    .RGraph_contextmenu_background
    {
       
      
    
    }
   
   </style>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
   <div class="modal"></div>
   <div class="nombreEmpl" style=" width:100%;"></div>
   <br />
   <div class="Graficas" style=" width:100%; float:left;">
       <div class="GraficaMensual" style=" width:25%; overflow:auto;float:left;text-align: center;">
            <canvas id="graMensual" height="300px" style=" width:auto;">[No canvas support]</canvas>  
           
            <div style="width:100%; float:left;" class="byEval"></div>   
            <div style="width:100%; float:left;" class="alreadyEval"></div>  
       </div>
       <div class="GraficaAnual" style=" width:50%; overflow:auto;float:left;text-align: center;">
            <canvas id="graAnual"  width="642px" height="300" >[No canvas support]</canvas>
       </div>
       <div class="GraficaOjiva" style=" width:25%; overflow:auto;text-align: center;">
           <canvas id="pie1" height="300"  style=" width: auto;">[No canvas support]</canvas> 
       </div>
   </div>
   <br />
 
   <br />
    <div class="Grids" style=" width:100%; float:left;">
        <div class="CoberturasIzq" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center; background-color:White; color: Black;float:left;"><b>COBERTURAS</b></div>              
            <div style=" width:100%; text-align:center;float:left;">
                <div class="coberturas" style=" width:100%;" ></div>
            </div>
        </div>
        <div class="CoberturasDer" style=" width:50%; float:left;height:200px;">
            <div class="ResultApelaciones"></div>
        </div>
        <br />
        <div class="Izq" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>NOTAS</b></div>
            <div style=" width:100%; text-align:center;float:left;">
                <div class="notas"></div> 
            </div>
        </div>
        <div class="Der" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>POR AUTORIZAR</b></div>
            <div style=" width:100%; text-align:center;float:left;">
                <div class="porAutorizar"></div>   
            </div>
        </div>
        <br />
        <div class="Izq" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>EXCELENTES</b></div>
            <div style=" width:100%; text-align:center;float:left;">
                <div class="excelentes"></div>
            </div>
        </div>
        <div class="Der" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>AUTORIZADAS</b></div>
            <div style=" width:100%; text-align:center;float:left;">
                <div class="autorizadas"></div> 
            </div>
        </div>
        <br />
        <div class="Izq" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>BUENAS</b></div>
            <div style=" width:100%; text-align:center;float:left;">
                <div class="buenas"></div> 
            </div>
        </div>
        <div class="Der" style=" width:50%; float:left; overflow:auto;height:200px;">
            <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>RECHAZADAS</b></div>
            <div style=" width:100%; text-align:center;float:left;">
                <div class="rechazadas"></div> 
            </div>
        </div>
        <br />
        <div class="Izq" style=" width:50%; float:left; overflow:auto; height:200px;">
           <div style=" width:100%; text-align:center;  background-color:White; color: Black;float:left;"><b>MALAS</b></div>            
           <div style=" width:100%; text-align:center;float:left;">
                <div class="malas"></div> 
            </div>
        </div>
    </div>
</asp:Content>
