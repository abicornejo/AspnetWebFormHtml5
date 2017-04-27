var t;
var Contador;
var Idimg;
var fotos;
$(function () {
    $('#gallery').carouFredSel({
        width: screen.width - 200,
        height: 'auto',
        prev: '#prev2',
        next: '#next2',
        auto: false
    });
});

function ReAsignarCarrusel() {
    $(".divResultCarr").css('min-height', getMaxFloatableHeigth() - 300);
    //	Crea el Carrusel
    $('#gallery').carouFredSel({
        width: screen.width - 200,
        height: 'auto',
        prev: '#prev2',
        next: '#next2',
        auto: false
    });

    AsignarDragAndDropCarrusel();

    $("#ContenedorCarrusel").delegate(".divContResultados", "mouseover", function (e) {
        var itemBusqueda = eval('(' + $(this).attr('data-busq') + ')');
        $("#ImgC1").attr('src', itemBusqueda.Imagen);
        $("#ImgC2").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[2]);
        $("#ImgC3").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[3]);
        $("#ImgC4").attr('src', itemBusqueda.ConcatenadoFotos.split("|")[4]);


        //Determina la Posicion para mostrar el dialogo
        var mousex = e.pageX + 20; // Obtener coordenadas X
        var mousey = e.pageY + 20; // Obtener coordenadas Y
        var tipWidth = 350; //Obtener el ancho del tooltip
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
        $(this).attr('style', 'cursor: pointer;');
        $("#TooltipCarrusel").dialog("close");
        return false;
    });



    $("#ContenedorCarrusel").delegate(".divResultadoCarrusel", "mouseover", function (e) {
        var itemBusqueda = eval('(' + $(this).attr('data-Busqueda') + ')');
        fotos = itemBusqueda.ConcatenadoFotos;
        if (fotos != "") {
            Idimg = this.id;
            Contador = 1;
            setTimer();
        }
        return false;
    });

    $("#ContenedorCarrusel").delegate(".divResultadoCarrusel", "mouseout", function () {
        var itemBusqueda = eval('(' + $(this).attr('data-Busqueda') + ')');
        Idimg = this.id;
        $(document.getElementById(Idimg)).attr('src', itemBusqueda.Imagen);
        clearTimeout(t);
        return false;
    });
}

function setTimer() {
    if (t != undefined)
        clearTimeout(t);
    try {
        if (parent.isWindowClosed() != undefined) {
            t = setTimeout("updateImagen()", 2000);
        }
    }
    catch (ex) { }
}

function updateImagen() {
    
    switch (Contador) {
        case 1:
            $(document.getElementById(Idimg)).attr('src', fotos.split("|")[1]);
            break;    
        case 2:
            $(document.getElementById(Idimg)).attr('src', fotos.split("|")[2]);
            break;    
        case 3:
            $(document.getElementById(Idimg)).attr('src', fotos.split("|")[3]);
            break;
        case 4:
            $(document.getElementById(Idimg)).attr('src', fotos.split("|")[4]);
            Contador = 0;
            break;    
    }
    Contador = Contador + 1;
    setTimer();
}

function abreNavegacion(control) {
    if ($(control).attr('data-open') == 0) {
        $("#DivNavegador").css("display", "block");
        $(control).attr('data-open', 1);
    }
    else 
        OcultaNavegadores();
}

function OcultaNavegadores() {
    $("#BntMuestra").css("display", "block");
    $("#DivNavegador").css("display", "none");
    $("#BntMuestra").attr('data-open', 0);

}
function ImageError(imagen) {    
    imagen.src = '../Images/noimage.png';
}