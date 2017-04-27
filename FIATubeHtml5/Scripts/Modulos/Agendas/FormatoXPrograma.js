
var isActiveStreaming = true;
var tableHeigth = 0;

window.onload = initialize;


function initialize() {
    resizeContent();
    tableHeigth = getMaxFloatableHeigth() - 185;
    $("#divGuion").css('height', getMaxFloatableHeigth() - 360);
    $(".divContVideoGuionFormatoXProg").css('height', getMaxFloatableHeigth() - 55);
    $(".divContTablaFormatoXProgCont").css('height', getMaxFloatableHeigth() - 55);
    $(".divContTablaFormatoXProg").css('height', getMaxFloatableHeigth() - 90);

    $("#dtFecha").datepicker({ });
    $("#dtFecha").datepicker('setDate', new Date());

    getLocales(successLocales, myError);

    if (sessionStorage.isActiveStreaming == 'undefined' || sessionStorage.isActiveStreaming == undefined || sessionStorage.isActiveStreaming == 'true') {
        sessionStorage.isActiveStreaming = true;
        isActiveStreaming = true;
    } else {
        sessionStorage.isActiveStreaming = false;
        isActiveStreaming = false;
    }

    loadPlayer("divVideo", isActiveStreaming, noVideoPath, noVideoImagePath, 220, 280, 0);
}

var successLocales = function (data, status) {

    locales = data.d;
    $("#cmbLocales").empty();
    $.each(locales, function (index, local) {

        if (local.LocalLlave == undefined)
            $("#cmbLocales").append('<option value="' + local.Local.LocalLlave + '">' + local.Local.LocalDescripcion + '</option>');
        else
            $("#cmbLocales").append('<option value="' + local.LocalLlave + '">' + local.LocalDescripcion + '</option>');
    });

    getPrograms(0);
}

function updateData() {
    try {
        setFilters();
        $('div.modal').show();
        executeRequest(wsMtdGetFmtosGuion, "{ 'local': " + $("#cmbLocales").val() + ", 'CvePrograma': " + $("#hiddPrg").val() + ", 'FechaCreacion': " + JSON.stringify($("#dtFecha").datepicker('getDate')) + ", 'Tran': " + JSON.stringify(GenerateTransac()) + " }", successGetFmtosGuion, Error);
    }
    catch (ex) {
        $('div.modal').hide();
    }
}

var successGetFmtosGuion = function (data, status) {
    try {
        var Tabla = "";
        var imagen = "";
        var clase = "";
        var imagen = "";
        var agenda;
        var btSolicitudMaterial = "";
        var Arreglo = new Array();

        Tabla += "<table cellpadding='0' cellspacing='0' border='0' class='display' id='tbConsultFlex' width='100%'>";
        Tabla += "<thead>";
        Tabla += "<tr>";
        Tabla += "<th>Fila</th>";
        Tabla += "<th>Video</th>";
        Tabla += "<th>T&iacute;tulo</th>";
        Tabla += "<th>Video ID</th>";
        Tabla += "<th>Tiempo Audio</th>";
        Tabla += "<th>Formato</th>";
        Tabla += "<th>Hora Trans.</th>";
        Tabla += "</tr>";
        Tabla += "</thead>";
        Tabla += "<tbody id='bodyContent'>";
        Tabla += "</tbody>";
        Tabla += "</table>";
        $("#divGridContent").html("").html(Tabla);

        $.each(jQuery.parseJSON(data.d), function (index, value) {
            if (value.VideoID != null && $.trim(value.VideoID) != '' && value.NumOT != 0) {
                btSolicitudMaterial = "";
                if (value.MuestraSolicitud == true) {
                    agenda = new AgendaOT();
                    agenda.CveLocal = value.CveLocal;
                    agenda.AgseNume = value.NumOT;
                    agenda.OtraCvec = value.CveOT;

                    btSolicitudMaterial = "<input id='btnSolicitar' type='button' class='SolicitaMat' onclick='solMat_click(this);' data-agenda='" + JSON.stringify(agenda) + "' />";
                }
                clase = (value.MuestraSolicitud == true) ? "divContentFormatoXProg2" : "divContentFormatoXProg";
                imagen = $.trim(value.VideoData.Imagen) == '' ? "../../Images/noimage.png" : value.VideoData.Imagen.toUpperCase().indexOf("DISPONIBLE") != -1 ? "../../Images/materialDisponible.png" : $.trim(value.VideoData.Imagen);

                imagen = "<div class='" + clase + "'><img class='imgFormatoXProg' data-idx='" + index + "' data-vid='" + value.VideoData.IdFileName + "' data-nOT='" + value.NumOT + "' src='" + imagen + "' onclick='videoImage_click(this);' onError='errorImg(this);' title='Ver video' />" + btSolicitudMaterial + "</div><div id='divHiddGuion_" + index + "' style='display:none;'>" + parseGuion(value.Guion) + "</div>";

                Arreglo[index] = new Array(
                    index,
                    imagen,
                    value.Titulo,
                    value.VideoID,
                    value.TiempoAudio,
                    value.Formato,
                    value.HoraTrans
                );
            }
            else {
                Arreglo[index] = new Array(
                    index,
                    "",
                    "",
                    value.Titulo,
                    "",
                    "",
                    ""
                );
            }
        });

        oTable = $('#tbConsultFlex').dataTable({
            "fnRowCallback":
            function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                $('td:eq(0)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(1)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(2)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(3)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(4)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                $('td:eq(5)', nRow).addClass('divContentNMONITOREO varTextAlignCenter');
                return nRow;
            }, "fnDrawCallback": function (oSettings) {
                this.css('width', '100%');
            },
            "sPaginationType": "full_numbers",
            "sScrollY": tableHeigth,
            "iDisplayLength": 3000,
            "aaData": Arreglo,
            "aoColumns": [
              { "bSortable": true, "bVisible": false },
              { "bSortable": false },
              { "bSortable": false },
              { "bSortable": false },
              { "bSortable": false },
              { "bSortable": false },
              { "bSortable": false }
            ],
            "oLanguage": { "sProcessing": "Procesando, por favor espere...",
                "sLengthMenu": "Mostrar <select><option value='5'>5</option><option value='10'>10</option><option value='25'>25</option><option value='50'>50</option><option value='100' selected='selected'>100</option></select> registros por p&aacute;gina",
                "sZeroRecords": "No se encontraron resultados",
                "sInfo": "&nbsp;&nbsp;Mostrando desde _START_ hasta _END_ de _TOTAL_ registros&nbsp;&nbsp;",
                "sInfoEmpty": "&nbsp;&nbsp;Mostrando desde 0 hasta 0 de 0 registros&nbsp;&nbsp;",
                "sInfoFiltered": "<br><em>( filtrado de _MAX_ registros en total )</em>",
                "sInfoPostFix": "",
                "sLoadingRecords": "Por favor aguarde - cargando...",
                "sSearch": "Buscar: ",
                "oPaginate": {
                    "sFirst": "",
                    "sPrevious": "",
                    "sNext": "",
                    "sLast": ""
                }
            }
        });


    }
    catch (exception) {
        alertModal('Ocurrio un problema al cargar la informacion sobre el grid.');
    }
    finally {
        $('div.modal').hide();
    }
}

function getPrograms(local) {
    executeSyncRequest(wsMtdGetProgFormatoXProg, "{ 'local':" + local + " }", successGetPrograms, Error);
}

var successGetPrograms = function (data, status) {
    var content = "";
    $("#cmbProgramas").empty();

    content += '<option value="0">== SELECCIONE ==</option>';
    $.each(data.d, function (index, programa) {
        content += '<option value="' + programa.CvePrograma + '">' + programa.NombrePrograma + '</option>';
    });
    $("#cmbProgramas").append(content);
}

function setFilters() {
    $("#hiddPrg").val($("#cmbProgramas").val());
    $("#hiddFec").val($("#dtFecha").val());
}

function videoImage_click(control) {
    $("#divGuion").empty();
    $("#divGuion").append($("#divHiddGuion_" + $(control).attr('data-idx')).html());
    loadPlayer("divVideo", isActiveStreaming, noVideoPath, noVideoImagePath, 220, 285, 0);
    if ($.trim($(control).attr('data-vid')) != '')
        executeSyncRequest(wsMtdConsultaPlayListOTFXP, "{ 'numOT': '" + $(control).attr('data-nOT') + "', 'VdoIdFilename': '" + $(control).attr('data-vid') + "' }", successConsultaPlayListOT, Error);
}

var successConsultaPlayListOT = function (data, status) {
    var thePlayList = new Array();
    $.each(data.d, function (index, contenedor) {
        if (index == 0) {
            image = $("#divVideo").attr('data-img', contenedor.Foto);
            image = $("#divVideo").attr('data-vid', contenedor.IdVideo);
        }
        if (isActiveStreaming)
            thePlayList.push({ image: contenedor.Foto, file: getUrlFormatoStreaming(contenedor.IdVideo), streamer: streamerPath, start: 0 });
        else
            thePlayList.push({ image: contenedor.Foto, file: contenedor.IdVideo, start: 0 });
    });

    jwplayer("divVideo").stop();
    jwplayer("divVideo").load(thePlayList);

    if(data.d.length > 0)
        jwplayer("divVideo").play();
}

function errorImg(control) {
    control.src = '../../Images/noimage.png';
}

function loadPlayer(controlName, isStreaming, file, image, theHeight, theWidth, startpoint) {
    if (isStreaming) {
        jwplayer(controlName).setup({
            flashplayer: playerPath,
            height: theHeight,
            width: theWidth,
            allowscriptaccess: 'always',
            allowfullscreen: true,
            repeat: 'list',
            file: getUrlFormatoStreaming(file),
            image: image,
            start: startpoint,
            streamer: streamerPath,
            controlbar: 'none',
            logo: { hide: true },
            icons: false,
            volume: 50
        });
    }
    else {
        jwplayer(controlName).setup({
            flashplayer: playerPath,
            height: theHeight,
            width: theWidth,
            allowscriptaccess: 'always',
            allowfullscreen: true,
            repeat: 'list',
            file: file,
            image: image,
            start: startpoint,
            controlbar: 'none',
            logo: { hide: true },
            icons: false,
            volume: 50
        });
    }

    thePlayerName = controlName;

    jwplayer(thePlayerName).onPlay(
        function () {
            $("#lblVidTime").empty();
            $("#lblVidTime").append(numberToTimeFormat(jwplayer(thePlayerName).getDuration()));
            $("#vidSliderTime").slider({
                orientation: "horizontal",
                range: "min",
                max: Math.floor(jwplayer(thePlayerName).getDuration())
            });

            setTimer();
        }
    );

    jwplayer(thePlayerName).onIdle(
        function () {
            $("#vidSliderTime").slider("value", 0);
        }
    );

        jwplayer(thePlayerName).onError(
        function () {
            if (isActiveStreaming == true) {
                isActiveStreaming = false;
                loadPlayer("divVideo", isActiveStreaming, noVideoPath, noVideoImagePath, 220, 280, 0);
            }
            else
                alertModal("Ocurrio un problema al cargar el video, favor de comunicarse con su administrador.");
        }
    );
}

function setFullScreen() {
    var image;
    var video;

    image = $("#divVideo").attr('data-img');
    video = $("#divVideo").attr('data-vid');

    if (jwplayer("divVideo").getState() != "PAUSED")
        jwplayer("divVideo").pause();

    parent.openFullScreen(video, image, isActiveStreaming, jwplayer("divVideo").getPosition());
}

function resizeContent() {
    $(".divContTablaFormatoXProgCont").css('height', getMaxFloatableHeigth() - 55);
    $(".divContTablaFormatoXProg").css('height', getMaxFloatableHeigth() - 90);
}

function solMat_click(control) {
    $("#MainContent_HDAgenda").val($(control).attr('data-agenda'));
    $("#MainContent_BntDetonador").click();
    return false;
}

function AbrirObtenerMateriales() {
    parent.openModal('Agendas/ObtenerMaterialesOT.aspx', widthVisorVideo, heigthVidorVideo, 'Solicitud Materiales');
}

function parseGuion(gionData) {
    var parser;
    var body = "";
    var aese = "";
    var aux;
    var xmlDoc;
    var xmlDocBody;

    if (gionData != undefined) {
        /*Se eliminan los id's mal formados que no permiten leer correctamente el xml*/
        body = gionData.substring(0, gionData.indexOf('</body>') + 7);
        while (body.indexOf('<a idref=') > 0) {
            aux = body.substring(body.indexOf('<a idref='));
            aux = aux.substring(0, aux.indexOf('>') + 1);
            body = body.replace(aux, '');
        }
        aese = gionData.substring(gionData.indexOf('</body>') + 7, gionData.length);
        while (aese.indexOf('id=') > 0) {
            aux = aese.substring(aese.indexOf('id='));
            aux = aux.substring(0, aux.indexOf('>'));
            aese = aese.replace(aux, '');
        }

        if (window.DOMParser) {
            parser = new DOMParser();
            xmlDocBody = parser.parseFromString(body, "text/xml");
            xmlDoc = parser.parseFromString(aese, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDocBody = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDocBody.loadXML(body);
            xmlDoc.loadXML(aese);
        }

        /*Se generan los divs a insertar dentro del div de guines*/
        /*Parte derecha*/
        var guionContent = "<div class='divGuionGralDerecho'>";
        for (i = 0; i < xmlDoc.getElementsByTagName("ae").length; i++) {
            if (xmlDoc.getElementsByTagName("ae")[i].getElementsByTagName("mc").length == 0)
                guionContent += "<div class='divGuionDerecho'>";
            else
                guionContent += "<div class='divGuionDerechoColor'>";

            for (j = 0; j < xmlDoc.getElementsByTagName("ae")[i].getElementsByTagName("ap").length; j++)
                if (j > 0) {
                    try { guionContent += xmlDoc.getElementsByTagName("ae")[i].getElementsByTagName("ap")[j].childNodes[0].nodeValue + "<BR />"; } catch (exception) { };
                }
            guionContent += "</div>";
        }
        guionContent += "</div>";

        /*Parte izquierda*/
        guionContent += "<div class='divGuionGralIzquierdo'>";
        for (i = 0; i < xmlDocBody.getElementsByTagName("p").length; i++) {
            if (xmlDocBody.getElementsByTagName("p")[i].childNodes[0] != null && $.trim(xmlDocBody.getElementsByTagName("p")[i].childNodes[0].nodeValue) != '')
                guionContent += $.trim(xmlDocBody.getElementsByTagName("p")[i].childNodes[0].nodeValue) + "<BR />";
        }   
        for (i = 0; i < xmlDocBody.getElementsByTagName("cc").length; i++) {
            if (xmlDocBody.getElementsByTagName("cc")[i].childNodes[0] != null && $.trim(xmlDocBody.getElementsByTagName("cc")[i].childNodes[0].nodeValue) != '')
                guionContent += $.trim(xmlDocBody.getElementsByTagName("cc")[i].childNodes[0].nodeValue) + "<BR />";
        }

        guionContent += "</div>";

        return guionContent;
    }
}

function cmbLocales_change() {
    getPrograms($("#cmbLocales").val());
}