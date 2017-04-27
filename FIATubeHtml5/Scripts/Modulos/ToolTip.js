
window.onload = initialize;
var EnableTooltip = true;

function initialize() {
    $("#MainContent_UP2").css('min-height', getMaxFloatableHeigth() - 130);
    $("#DivNavegador").css('height', getMaxFloatableHeigth() - 155);
    $("#DivNavegador").css('top', getMaxFloatableHeigth() *-1 + 'px');
}

/////////Evento click para Abrir Video en Busqueda//////////////////////
function imgVideo_click(contenedor) {
    var Resultado;
    Resultado = eval('(' + contenedor.getAttribute("data-Busqueda") + ')');
    sessionStorage.vidata = JSON.stringify(Resultado);
    $("#MainContent_tooltip").dialog("close");
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + Resultado.OrdenTrabajo + '&numProg=-1&uriVideo=' + Resultado.Video + '&uriImg=' + Resultado.Imagen + '&isfromConsulta=true&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

function imgVideoGridCarrusel_click(contenedor) {
    sessionStorage.vidata = contenedor.getAttribute("data-busq");
    parent.openModal('UserControls/MainPlayerCodePlex.aspx?numOT=' + contenedor.getAttribute("data-OT") + '&numProg=-1&uriVideo=' + contenedor.getAttribute("data-Video") + '&uriImg=' + contenedor.getAttribute("data-Imagen") + '&isfromConsulta=true&isFromSeleccion=false', widthVisorVideo, heigthVidorVideo, 'Video', mainPlayer);
}

//Prepara el Div para ser un Dialogo
$(function () {

    $('#MainContent_tooltip').dialog({
        autoOpen: false,
        draggable: true,
        height: 'auto',
        width: '400px'
    });
    $("#MainContent_tooltip").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

    /////////////Imagenes del Carrusel//////////////
    $('#TooltipCarrusel').dialog({
        autoOpen: false,
        draggable: true,
        height: 'auto',
        width: '400px'
    });
    $("#TooltipCarrusel").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
});


//Prepara el div para ser un dialogo y asigna  la posicion en la cual se mostrara.
function AbreDialogo(mousex, mousey) {
    $('#MainContent_tooltip').dialog({
        autoOpen: false,
        draggable: true,
        height: 'auto',
        width: '400px',
        position: [mousex, mousey]
    });

    $("MaintContent_tooltip").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
}


//Prepara el div de las fotos del carrusel para ser un dialogo y asigna  la posicion en la cual se mostrara.

function AbreDialogoCarrusel(mousex, mousey) {
    $('#TooltipCarrusel').dialog({
        autoOpen: false,
        draggable: true,
        height: 'auto',
        width: '400px',
        position: [mousex, mousey]
    });

    $("TooltipCarrusel").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
}

function sleepTooltip() {
    var naptime = 900;
    var sleeping = true;
    var now = new Date();
    var alarm;
    var startingMSeconds = now.getTime();
    while (sleeping) {
        alarm = new Date();
        alarmMSeconds = alarm.getTime();
        if (alarmMSeconds - startingMSeconds > naptime) { sleeping = false; }
    }
}

var banderaInicio = 0;

$(function () {
    $("#ContenedorCarrusel").delegate(".divContResultados", "mouseover", function (e) {
        if (!EnableTooltip)
            return;
        var itemBusqueda = eval('(' + $(this).attr('data-busq') + ')');

        $("#ImgC1").attr('src', itemBusqueda.Imagen);
        $("#ImgC2").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[2]);
        $("#ImgC3").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[3]);
        $("#ImgC4").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[4]);


        //Determina la Posicion para mostrar el dialogo
        var mousex = e.pageX + 20; // Obtener coordenadas X
        var mousey = e.pageY + 20; // Obtener coordenadas Y
        var tipWidth = 400; //Obtener el ancho del tooltip
        var tipHeight = 350; //Obtener el alto del tooltip

        //Distancia del elemento desde el borde derecho
        var tipVisX = $(window).width() - (mousex + tipWidth);
        //Distancia del elemento desde el borde de abajo
        var tipVisY = $(window).height() - (mousey + tipHeight);

        if (tipVisX < 80) { //Si el tooltip se excede horizontalmente
            mousex = e.pageX - tipWidth - 50;
        } if (tipVisY < 80) { //Si el tooltip se excede verticalmente
            mousey = e.pageY - tipHeight - 50;
        }
        AbreDialogoCarrusel(mousex, mousey);
        $("#TooltipCarrusel").dialog("open");
        return false;
    });



    //Cierr el Dialog cuando se  sale de la imagen el mouse
    $("#ContenedorCarrusel").delegate(".divContResultados", "mouseout", function () {
        var evt = e ? e : window.event;
        if (evt.stopPropagation) evt.stopPropagation();
        if (evt.cancelBubble != null) evt.cancelBubble = true;

        $(this).attr('style', 'cursor: pointer;');
        $("#TooltipCarrusel").dialog("close");
        return false;
    });

    $("#contenedor").delegate(".divResultado", "mouseover", function (e) {
        //Asigna Valores  que provienen de atributos personalizados de la imagen.
        if (!EnableTooltip)
            return;
        var itemBusqueda = eval('(' + $(this).attr('data-Busqueda') + ')');

        if (itemBusqueda.ConcatenadoFotos == "") {
            $("#Imagen2").css("display", "none");
            $("#Imagen3").css("display", "none");
            $("#Imagen4").css("display", "none");
        }
        else {
            $("#Imagen2").css("display", "block");
            $("#Imagen3").css("display", "block");
            $("#Imagen4").css("display", "block");

            $("#Imagen2").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[2]);
            $("#Imagen3").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[3]);
            $("#Imagen4").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[4]);
        }

        $("#Imagen1").attr('src', itemBusqueda.Imagen);


        $("#LblOT").text(itemBusqueda.CveOrdenTrabajo);
        $("#LblNoCinta").text(itemBusqueda.NoCinta);

        $("#LblTitulo").text(itemBusqueda.Titulo);
        $("#LblFecha").text(itemBusqueda.FechaAgenda);
        $("#LblPrograma").text(itemBusqueda.NombrePrograma);
        $("#LblPClave").text(itemBusqueda.PalabrasClave);
        $("#LblPersonaje").text(itemBusqueda.Personajes);

        $("#LblNRecuperado").text(itemBusqueda.NumRecuperaciones);
        $("#LblId").text(itemBusqueda.IdFileName);

        //Determina la Posicion para mostrar el dialogo
        var mousex = e.pageX + 20; // Obtener coordenadas X
        var mousey = e.pageY + 20; // Obtener coordenadas Y
        var tipWidth = 400; //Obtener el ancho del tooltip
        var tipHeight = 350; //Obtener el alto del tooltip

        //Distancia del elemento desde el borde derecho
        var tipVisX = $(window).width() - (mousex + tipWidth);
        //Distancia del elemento desde el borde de abajo
        var tipVisY = $(window).height() - (mousey + tipHeight);

        if (tipVisX < 80) { //Si el tooltip se excede horizontalmente
            mousex = e.pageX - tipWidth - 50;
        } if (tipVisY < 80) { //Si el tooltip se excede verticalmente
            mousey = e.pageY - tipHeight - 50;
        }

        //sleepTooltip();
        AbreDialogo(mousex, mousey);
        $("#MainContent_tooltip").dialog("open");
        return false;
    });

    //Cierr el Dialog cuando se  sale de la imagen el mouse
    $("#contenedor").delegate(".divResultado", "mouseout", function () {
        $(this).attr('style', 'cursor: pointer;');
        $("#MainContent_tooltip").dialog("close");
        return false;
    });

    //////drag and drop////////////////////////////////////////////////

    if (banderaInicio == 0) {
        var $gallery = $("#MainContent_divResultadoBusqueda"),
		$Compra = $("#MainContent_Compra");

        $("div", $gallery).draggable({
            cancel: "a.ui-icon",
            revert: "invalid",
            containment: $("#demo-frame").length ? "#demo-frame" : "document", // stick to demo-frame if present
            helper: "clone",
            cursor: "move",
            start: function () {
                $("#MainContent_tooltip").dialog("close");
                EnableTooltip = false;
            },
            stop: function () {
                EnableTooltip = true;
            }
        });

        $Compra.droppable({
            accept: "#MainContent_divResultadoBusqueda > div",
            activeClass: "ui-state-highlight",
            drop: function (event, ui) {
                deleteImage(ui.draggable);
            }
        });

        $gallery.droppable({
            accept: "#MainContent_Compra > div",
            activeClass: "custom-state-active",
            drop: function (event, ui) {
                recycleImage(ui.draggable);
            }
        });

        //        var resultado_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Regresar a resultado' class='ui-icon ui-icon-refresh'>Regresar a resultado</a>";
        var resultado_icon = "<div class='icono'> <a href='link/to/recycle/script/when/we/have/js/off' title='Regresar a resultado' class='ui-icon ui-icon-refresh'>Regresar a resultado</a> </div>";

        function deleteImage($item) {
            $item.fadeOut(function () {
                var $list = $("ul", $Compra).length ?
					$("ul", $Compra) :
					$("<ul class='gallery ui-helper-reset'/>").appendTo($Compra);
                $item.find("a.ui-icon-video").remove();
                $item.append(resultado_icon).appendTo($list).fadeIn(function () {
                    $item
                    .animate({ width: widhDivRecuperacion + "px" })
                    .find("img")
                    .animate({ height: heigthDivRecuperacion + "px" });
                    $("#MainContent_tooltip").dialog("close");
                });
            });
        }

        var Regresar_ico = "<a href='link/to/trash/script/when/we/have/js/off' title='Reservar' class='ui-icon ui-icon-video'>Reservar</a>";
        function recycleImage($item) {
            $item.fadeOut(function () {
                $item
					.find("a.ui-icon-refresh")
						.remove()
					.end()
					.css("width", widhDivRecuperacion + "px")
					.append(Regresar_ico)
					.find("img")
						.css("height", heigthDivRecuperacion + "px")
					.end()
					.appendTo($gallery)
					.fadeIn();
            });
        }

        function viewLargerImage($link) {
            var src = $link.attr("href"),
				title = $link.siblings("img").attr("alt"),
				$modal = $("img[src$='" + src + "']");

            if ($modal.length) {
                $modal.dialog("open");
            } else {
                var img = $("<img alt='" + title + "' width='" + widhDivRecuperacion + "' height='" + heigthDivRecuperacion + "' style='display: none; padding: 8px;' />")
					.attr("src", src).appendTo("body");
                setTimeout(function () {
                    img.dialog({
                        title: title,
                        width: 400,
                        modal: true
                    });
                }, 1);
            }
        }

        $("#MainContent_divResultadoBusqueda > div").click(function (event) {
            var $item = $(this),
				$target = $(event.target);

            if ($target.is("a.ui-icon-video")) {
                deleteImage($item);
            } else if ($target.is("a.ui-icon-zoomin")) {
                viewLargerImage($target);
            } else if ($target.is("a.ui-icon-refresh")) {
                recycleImage($item);
            }

            return false;
        });

    }
    else if (banderaInicio == 1) {
        ////Drag and Drop carrucel//////
        AsignarDragAndDropCarrusel();
    }
    else if (banderaInicio == 2) {
        AsignarDragAndDropTeaser();

    }

    $("#DivNavegador").dialog("open");
    //    parent.Did(Texto);

});                // cierra funcion de inicio

/////////////////////////////////////////Reasignar eventos //////////////////////////////////////////////////////////////////

function ReAsignar(Resultados, Texto, tipoBusq) {
    if (Resultados <= 0) {
        alertModal("No se encontraron resultados.");
    }

    $("#contenedor").delegate(".divResultado", "mouseover", function (e) {
        if (!EnableTooltip)
            return;
        //Asigna Valores  que provienen de atributos personalizados de la imagen.
        var itemBusqueda = eval('(' + $(this).attr('data-Busqueda') + ')');

        if (itemBusqueda.ConcatenadoFotos == "") {
            $("#Imagen2").css("display", "none");
            $("#Imagen3").css("display", "none");
            $("#Imagen4").css("display", "none");
        }
        else {
            $("#Imagen2").css("display", "block");
            $("#Imagen3").css("display", "block");
            $("#Imagen4").css("display", "block");

            $("#Imagen2").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[2]);
            $("#Imagen3").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[3]);
            $("#Imagen4").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[4]);
        }



        $("#Imagen1").attr('src', itemBusqueda.Imagen);
        $("#LblOT").text(itemBusqueda.CveOrdenTrabajo);
        $("#LblNoCinta").text(itemBusqueda.NoCinta);

        $("#LblTitulo").text(itemBusqueda.Titulo);
        $("#LblFecha").text(itemBusqueda.FechaAgenda);
        $("#LblPrograma").text(itemBusqueda.NombrePrograma);
        $("#LblPClave").text(itemBusqueda.PalabrasClave);
        $("#LblPersonaje").text(itemBusqueda.Personajes);
        $("#LblTxtNRecuperado").text(itemBusqueda.NumRecuperaciones);
        $("#LblId").text(itemBusqueda.IdFileName);


        //Determina la Posicion para mostrar el dialogo
        var mousex = e.pageX + 20; // Obtener coordenadas X
        var mousey = e.pageY + 20; // Obtener coordenadas Y
        var tipWidth = 400; //Obtener el ancho del tooltip
        var tipHeight = 350; //Obtener el alto del tooltip

        //Distancia del elemento desde el borde derecho
        var tipVisX = $(window).width() - (mousex + tipWidth);
        //Distancia del elemento desde el borde de abajo
        var tipVisY = $(window).height() - (mousey + tipHeight);

        if (tipVisX < 80) { //Si el tooltip se excede horizontalmente
            mousex = e.pageX - tipWidth - 50;
        } if (tipVisY < 80) { //Si el tooltip se excede verticalmente
            mousey = e.pageY - tipHeight - 50;
        }
        //sleepTooltip();
        AbreDialogo(mousex, mousey);
        $("#MainContent_tooltip").dialog("open");
        return false;
    });

    //Cierra el Dialog cuando se  sale de la imagen el mouse
    $("#contenedor").delegate(".divResultado", "mouseout", function () {
        $(this).attr('style', 'cursor: pointer;');
        $("#MainContent_tooltip").dialog("close");
        return false;
    });

    //////////////////////////////////////////////////////

    var $gallery = $("#MainContent_divResultadoBusqueda"),
		$Compra = $("#MainContent_Compra");

    $("div", $gallery).draggable({
        cancel: "a.ui-icon", 
        revert: "invalid", 
        containment: $("#demo-frame").length ? "#demo-frame" : "document", // stick to demo-frame if present
        helper: "clone",
        cursor: "move"
    });

    $Compra.droppable({
        accept: "#MainContent_divResultadoBusqueda > div",
        activeClass: "ui-state-highlight",
        drop: function (event, ui) {
        deleteImage(ui.draggable);
        }
    });

    $gallery.droppable({
        accept: "#MainContent_Compra > div",
        activeClass: "custom-state-active",
        drop: function (event, ui) {
        recycleImage(ui.draggable);
        }
    });

    var resultado_icon = "<div class='icono'> <a href='link/to/recycle/script/when/we/have/js/off' title='Regresar a resultado' class='ui-icon ui-icon-refresh'>Regresar a resultado</a> </div>";
    function deleteImage($item) {
        $item.fadeOut(function () {
            var $list = $("ul", $Compra).length ?
					$("ul", $Compra) :
					$("<ul class='gallery ui-helper-reset'/>").appendTo($Compra);
                    $item.find("a.ui-icon-video").remove();
                    $item.append(resultado_icon).appendTo($list).fadeIn(function () {
                    $item
                    .animate({ width: widhDivRecuperacion + "px"})
                    .find("img")
                    .animate({ height: heigthDivRecuperacion + "px" });
                $("#MainContent_tooltip").dialog("close");
            });
        });
    }

    var Regresar_ico = "<a href='link/to/trash/script/when/we/have/js/off' title='Reservar' class='ui-icon ui-icon-video'>Reservar</a>";
    function recycleImage($item) {
        $item.fadeOut(function () {
            $item
					.find("a.ui-icon-refresh")
						.remove()
					.end()
					.css("width", widhDivRecuperacion + "px")
					.append(Regresar_ico)
					.find("img")
						.css("height", heigthDivRecuperacion + "px")
					.end()
					.appendTo($gallery)
					.fadeIn();
        });
    }

    function viewLargerImage($link) {
        var src = $link.attr("href"),
				title = $link.siblings("img").attr("alt"),
				$modal = $("img[src$='" + src + "']");

        if ($modal.length) {
            $modal.dialog("open");
        } else {
            var img = $("<img alt='" + title + "' width='" + widhDivRecuperacion + "' height='" + heigthDivRecuperacion + "' style='display: none; padding: 8px;' />")
					.attr("src", src).appendTo("body");
            setTimeout(function () {
                img.dialog({
                    title: title,
                    width: 400,
                    modal: true
                });
            }, 1);
        }
    }

    // Evento que se detona cuando se preciona el boton  de la imagina para regresarla o para agregarla...
    $("#MainContent_divResultadoBusqueda > div").click(function (event) {
        var $item = $(this),
		$target = $(event.target);
        if ($target.is("a.ui-icon-video")) {
            deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
            viewLargerImage($target);
        } else if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
        }
        return false;
    });

    $("#DivNavegador").dialog("open");

    parent.Did(Texto, tipoBusq);

} // cierra funcion de reasignar

function ObtenerDatos() {
    var ResultadoF = "";
    $.each($("#MainContent_Compra").children(), function (index, val) {
        $.each(val.getElementsByTagName('img'), function (index, Img) {
            var Resultado;
            Resultado = Img.getAttribute("data-Busqueda");
            Resultado = Resultado + '%sFtb_sRic';
            ResultadoF = ResultadoF + Resultado;
        })

        $("#MainContent_lblRecuperar").attr('value', ResultadoF.replace(/</g, '').replace(/>/g, ''));
        $("#MainContent_btnDetonador").click();
    });

}

function LimpiarRecuparacion() {
    $("#MainContent_Compra").empty();
}

//////////////////DragAndDrop Carrusel///////////////////////////////////////////////////////
function AsignarDragAndDropCarrusel() {
    var $gallery = $("#gallery"),
			$trash = $("#MainContent_Compra");
    $("li", $gallery).draggable({
        cancel: "a.ui-icon", 
        revert: "invalid",
        containment: $("#demo-frame").length ? "#demo-frame" : "document", // stick to demo-frame if present
        helper: "clone",
        cursor: "move"
    });

    $trash.droppable({
        accept: "#gallery > li",
        activeClass: "ui-state-highlight",
        drop: function (event, ui) {
        deleteImage(ui.draggable);
        }
    });

    $gallery.droppable({
        accept: "#MainContent_Compra li",
        activeClass: "custom-state-active",
        drop: function (event, ui) {
            recycleImage(ui.draggable);
        }
    });

    var recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off' title='Regresar a Resultado' class='ui-icon ui-icon-refresh'>Regresar a Resultado</a>";
    //var recycle_icon = "<div class='icono'> <a href='link/to/recycle/script/when/we/have/js/off' title='Regresar a resultado' class='ui-icon ui-icon-refresh'>Regresar a resultado</a> </div>";

    function deleteImage($item) {
        $item.fadeOut(function () {
                var $list = $("ul", $trash).length ?
                $("ul", $trash) :
                $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);

                $item.find("a.ui-icon-trash").remove();
                $item.append(recycle_icon).appendTo($list).fadeIn(function () {
                $item
                .animate({ width: widhDivRecuperacion + "px" })
                .find("img")
                .animate({ height: heigthDivRecuperacion + "px" });
            });
        });
    }

    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='' class='ui-icon ui-icon-trash'>Delete image</a>";
    function recycleImage($item) {
        $item.fadeOut(function () {
            $item
					.find("a.ui-icon-refresh")
						.remove()
					.end()
					.css("width",  widhDivRecuperacion + "px" )
					.append(trash_icon)
					.find("img")
						.css("height", heigthDivRecuperacion + "px")
					.end()
					.appendTo($gallery)
					.fadeIn();
        });
    }

    function viewLargerImage($link) {
        var src = $link.attr("href"),
				title = $link.siblings("img").attr("alt"),
				$modal = $("img[src$='" + src + "']");
        if ($modal.length) {
            $modal.dialog("open");
        } else {
            var img = $("<img alt='" + title + "' width='" + widhDivRecuperacion + "' height='" + heigthDivRecuperacion + "' style='display: none; padding: 8px;' />")
					.attr("src", src).appendTo("body");
            setTimeout(function () {
                img.dialog({
                    title: title,
                    width: 400,
                    modal: true
                });
            }, 1);
        }
    }

    $("#gallery > li").click(function (event) {
        var $item = $(this),
				$target = $(event.target);
        window.location.href($item[0].id);
        if ($target.is("a.ui-icon-trash")) {
            deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
            viewLargerImage($target);
        } else if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
        }
        
        return false;
    });
}



//////////////////DragAndDrop Teaser///////////////////////////////////////////////////////
function AsignarDragAndDropTeaser() {
    $("#DivPrincipal").css('min-height', getMaxFloatableHeigth() - 230);
    var $gallery = $("#DivPrincipal"),
		$Compra = $("#MainContent_Compra");

    $("#DivContenedor", $gallery).draggable({
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: $("#demo-frame").length ? "#demo-frame" : "document", // stick to demo-frame if present
        helper: "clone",
        cursor: "move"
    });

    $Compra.droppable({
        accept: "#DivPrincipal > #DivContenedor",
        activeClass: "ui-state-highlight",
        drop: function (event, ui) {
            deleteImage(ui.draggable);
        }
    });

    $gallery.droppable({
        accept: "#MainContent_Compra > div",
        activeClass: "custom-state-active",
        drop: function (event, ui) {
            recycleImage(ui.draggable);
        }
    });


    var resultado_icon = "<div class='icono'> <a href='link/to/recycle/script/when/we/have/js/off' title='Regresar a resultado' class='ui-icon ui-icon-refresh'>Regresar a resultado</a> </div>";
    function deleteImage($item) {
        $($item[0].children[1]).hide();
        $item.fadeOut(function () {
            var $list = $("ul", $Compra).length ?
					$("ul", $Compra) :
					$("<ul class='gallery ui-helper-reset'/>").appendTo($Compra);

            
            $item.find("a.ui-icon-video").remove();
            $item.append(resultado_icon).appendTo($list).fadeIn(function () {
                $item
                .animate({ width: widhDivCompraTeaser + "px" })
                .animate({ height: heigthDivCompraTeaser + "px" })
                .find("DivContenedor")
                .animate({ height: heigthDivCompraTeaser + "px" });
            });
        });
    }

    var Regresar_ico = "<a href='link/to/trash/script/when/we/have/js/off' title='Reservar' class='ui-icon ui-icon-video'>Reservar</a>";
    function recycleImage($item) {
        $($item[0].children[1]).show();

        $item.fadeOut(function () {

            $item
					.find("a.ui-icon-refresh")
						.remove()
					.end()
					.css("width", widhDivRecuperacionTeaser + "px")
					.append(Regresar_ico)
					.find("img")
						.css("height", heigthDivRecuperacionTeaser + "px")
					.end()
					.appendTo($gallery)
					.fadeIn();
        });
    }

    function viewLargerImage($link) {
        var src = $link.attr("href"),
				title = $link.siblings("img").attr("alt"),
				$modal = $("img[src$='" + src + "']");

        if ($modal.length) {
            $modal.dialog("open");
        } else {
            var img = $("<img alt='" + title + "' width='" + widhDivRecuperacion + "' height='" + heigthDivRecuperacion + "' style='display: none; padding: 8px;' />")
					.attr("src", src).appendTo("body");
            setTimeout(function () {
                img.dialog({
                    title: title,
                    width: 400,
                    modal: true
                });
            }, 1);
        }
    }

    // Evento que se detona cuando se preciona el boton  de la imagina para regresarla o para agregarla...
    $("#DivPrincipal > #DivContenedor" ).click(function (event) {
        var $item = $(this),
				$target = $(event.target);

        if ($target.is("a.ui-icon-video")) {
            deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
            viewLargerImage($target);
        } else if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
        }
        return false;
    });
}

/////////////////////////////////Navegador//////////////////////////////////////////

function abreNavegacion ()
{
    $("#BntMuestra").css("display", "none");
    $("#DivNavegador").css("display","block");
}

function OcultaNavegadores() {
    $("#BntMuestra").css("display", "block");
    $("#DivNavegador").css("display", "none");
}
