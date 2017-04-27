//Funcion general para crear la ventana modal.
function ShowModal(Pag, Title, Heigh, Width, Top) {
    CrearModalDatos(Pag, Title, Heigh, Width, Top);
    CrearModalFondo();
}

//Funcion que crea el DIV para ser mostrado con un Iframe para cargar la pagina
function CrearModalDatos(Pag, Title, Heigh, Width, Top) {
    if (document.getElementById('modalFront') == null) {
        modal = document.createElement('Div');
        modal.setAttribute('id', 'modalFront');
        modal.innerHTML = LoadPage(Pag, Title);
        modal.style.display = 'block';

        modal.style.width = Width + 'px';
        modal.style.height = Heigh + 'px';

        modal.style.top = Top + 'px';
        pos = (getViewportWidth() - Width) / 2;
        if (pos < 0)
            modal.style.left = 0 + 'px';
        else
            modal.style.left = pos + 'px';


        modal.className = 'backgroundModal1';
        document.body.appendChild(modal);

        changeOpac(0, 'ModalFront');
        opacity('ModalFront', 0, 100, 1500);
    }
    else {
        var mod = document.getElementById('modalFront');
        mod.innerHTML = LoadPage(Pag, Title);
        mod.style.width = Width + 'px';
        mod.style.height = Heigh + 'px';
        mod.style.left = ((getViewportWidth() - Width) / 2) + 'px';
        mod.style.display = 'block';
        changeOpac(0, 'ModalFront');
        opacity('ModalFront', 0, 100, 1500);
    }
}
//Crea el Div de fondo para que no se tenga acceso a otras partes de la pagina
function CrearModalFondo() {
    if (document.getElementById('modalBack') == null) {
        modal = document.createElement('Div');
        modal.setAttribute('id', 'modalBack');

        modal.style.top = 0 + 'px';
        modal.style.left = 0 + 'px';

        modal.style.width = getViewportWidth() + 'px';
        modal.style.height = getViewportHeight() + 'px';

        modal.className = 'backgroundBlack';
        modal.style.display = 'block';

        document.body.appendChild(modal);
        changeOpac(0, 'ModalBack');
        opacity('ModalBack', 0, 50, 1500);
    }
    else {
        var mod = document.getElementById('modalBack');
        mod.style.display = 'block';
        changeOpac(0, 'ModalBack');
        opacity('ModalBack', 0, 50, 1500);
    }
}

//Oculta los Div's para poder navegar en la pagina
function HideModal() {
    var modal1, modal2;

    modal1 = document.getElementById('modalFront');
    modal2 = document.getElementById('modalBack');

    modal1.style.display = 'none';
    modal2.style.display = 'none';

    modal1.innerHTML = "";
    modal2.innerHTML = "";

}

//Genera el codigo para cargar la pagina en el Iframe y agrega el boton para que se cierre la ventana modal
function LoadPage(Pag, Title) {
    var HTMLModal = "<table width='100%' cellpadding='0' cellspacing='0'><tr><td width='8px' align='right'><image src='images/PlecaIzq_Modal1.png'/></td><td style='background-image:url(\"images/PlecaCentro_Modal1.png\")' class='textoSecciones'>" + Title + " </td><td width='8px' style='background-image:url(\"images/PlecaCentro_Modal1.png\")'><image id='btnClose' src='images/iconCerrar_Modal1.png' style='cursor:hand;' onclick='HideModal()' /></td><td width='8px' align='right'><image src='images/PlecaDerecho_Modal1.png' /></td></tr></table>";
    //var HTMLModal = "<table width='100%'><tr class='textoSecciones'><td><image src='images/PlecaIzq_Modal1.png' /></td><td style='background-image:url(\"images/PlecaCentro_Modal1.png\")'>" + Title + "</td><td style='background-image:url(\"images/PlecaDerecho_Modal1.png\")' align='right'><image id='btnClose' onclick='HideModal()' src='images/iconCerrar_Modal1.png' style='cursor:hand;' /></td></tr></table>"    
    HTMLModal += "<iframe src='" + Pag + "' height='100%' width='100%' ></iframe>"

    return HTMLModal;
}

//Funcion para que cuando el usuario haga mas grande la ventana o mueva los scroll's del explorador
// se siga viendo el Div de fondo
function ResizeModal() {
    var modal = document.getElementById('modalBack');
    var modalData = document.getElementById('modalFront');
    var scLeft, scTop, pos;

    if (modal != null) {
        if (self.pageYOffset || self.pageXOffset) {
            scLeft = self.pageXOffset;
            scTop = self.pageYOffset;
        } else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
            scLeft = document.documentElement.scrollLeft;
            scTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scLeft = document.body.scrollLeft;
            scTop = document.body.scrollTop;
        }

        modal.style.width = getViewportWidth() + 'px';
        modal.style.height = getViewportHeight() + 'px';

        modal.style.top = scTop + "px";
        modal.style.left = scLeft + "px";

    }
}

//Funciones para obtener el tamaño maximo de la pagina
function getViewportHeight() {
    if (window.innerHeight != window.undefined) return window.innerHeight;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientHeight;
    if (document.body) return document.body.clientHeight;
    return window.undefined;
}

function getViewportWidth() {
    if (window.innerWidth != window.undefined) return window.innerWidth;
    if (document.compatMode == 'CSS1Compat') return document.documentElement.clientWidth;
    if (document.body) return document.body.clientWidth;
    return window.undefined;
}
//----------------------------------------------------------------------------------------
//Funciones para hacer el Fade In de las ventanas modales
function opacity(id, opacStart, opacEnd, millisec) {
    //speed for each frame 
    var speed = Math.round(millisec / 100);
    var timer = 0;

    //determine the direction for the blending, if start and end are the same nothing happens 
    if (opacStart > opacEnd) {
        for (i = opacStart; i >= opacEnd; i--) {
            setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed));
            timer++;
        }
    } else if (opacStart < opacEnd) {
        for (i = opacStart; i <= opacEnd; i++) {
            setTimeout("changeOpac(" + i + ",'" + id + "')", (timer * speed));
            timer++;
        }
    }
}

//change the opacity for different browsers 
function changeOpac(opacity, id) {
    var object = document.getElementById(id).style;
    object.opacity = (opacity / 100);
    object.MozOpacity = (opacity / 100);
    object.KhtmlOpacity = (opacity / 100);
    object.filter = "alpha(opacity=" + opacity + ")";
}
//Para cachar el evento del scroll del explorador
window.onscroll = ResizeModal;
