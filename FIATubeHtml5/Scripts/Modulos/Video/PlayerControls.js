
var t;
var time = 100;
var ismoouseUp = false;
var thePlayerName = '';

window.onclick = function (e) {
    if (e.target.id == 'btnShowPVolume') {
        if ($("#divPlayerVol").attr('data-isOpen') == 0) {
            $("#divPlayerVol").dialog('open');
            $("#divPlayerVol").attr('data-isOpen', 1);
        }
        else {
            $("#divPlayerVol").dialog('close');
            $("#divPlayerVol").attr('data-isOpen', 0);
        }
    }
    else if ($("#divPlayerVol").attr('data-isOpen') == 1) {
        $("#divPlayerVol").dialog('close');
        $("#divPlayerVol").attr('data-isOpen', 0);
    }
}

$(function () {
    $("#vidSliderTime").slider({ orientation: "horizontal", range: "min", max: 255, value: 0 });
    $("#vidSliderVolume").slider({ orientation: "vertical", range: "min", max: 100, value: 50 });


    $("#divPlayerVol").dialog({ resizable: false, autoOpen: false, show: "blind", hide: "blind", width: '18px', heigth: '50px', position: [$("#btnShowPVolume").position().left, $("#btnShowPVolume").position().top - 80] });
    $('a.ui-dialog-titlebar-close', $('#ui-dialog-title-divPlayerVol').parent()).remove();
    $("#divPlayerVol").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();

    $("#vidSliderTime").mouseup(function (b) {
        jwplayer(thePlayerName).seek($("#vidSliderTime").slider("value"));
        setTimer();
        ismoouseUp = false;
    });

    $("#vidSliderTime").mousedown(function (b) {
        ismoouseUp = true;
        if (t != undefined)
            clearTimeout(t);
    });

    $("#vidSliderVolume").slider({
        slide: function (event, ui) {
            jwplayer(thePlayerName).setVolume($("#vidSliderVolume").slider("value"));
        }
    });
});

function playerPlay() {
    jwplayer(thePlayerName).pause();
}

function playerStop() {
    if (t != undefined)
        clearTimeout(t);
    ismoouseUp = false;
    jwplayer(thePlayerName).stop();
    $("#vidSliderTime").slider("value", 0);
    $("#lblCurrVidTime").empty();
    $("#lblCurrVidTime").append(numberToTimeFormat(0));
}

function seekBack() {
    jwplayer(thePlayerName).seek(jwplayer(thePlayerName).getPosition() - 10);
    $("#vidSliderTime").slider("value", jwplayer(thePlayerName).getPosition());
}

function seekForward() {
    jwplayer(thePlayerName).seek(jwplayer(thePlayerName).getPosition() + 10);
    $("#vidSliderTime").slider("value", jwplayer(thePlayerName).getPosition());
}

function setTimer() {
    if (t != undefined)
        clearTimeout(t);

    try {
        if (parent.isWindowClosed() != undefined)
            t = setTimeout("updateSlider()", time);
    }
    catch (ex) { }
}

function updateSlider() {
    if (ismoouseUp == false) {
        $("#vidSliderTime").slider("value", jwplayer(thePlayerName).getPosition());
        $("#lblCurrVidTime").empty();
        $("#lblCurrVidTime").append(numberToTimeFormat(jwplayer(thePlayerName).getPosition()));
        setTimer();
    }
}

function playerFullScreen() {
    var isFullScreen = jwplayer(thePlayerName).getFullscreen();
    if (isFullScreen == true)
        isFullScreen = false;
    else
        isFullScreen = true;

    jwplayer(thePlayerName).setFullscreen(isFullScreen);
}
