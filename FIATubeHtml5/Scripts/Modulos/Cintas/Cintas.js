
var t;
var time = 100;
var ismoouseUp = false;

window.onload = function () {

    jwplayer("myVideo").setup({
        flashplayer: playerPath,
        height: 240,
        width: 320,
        allowscriptaccess: 'always',
        allowfullscreen: false,
        repeat: 'list',
        file: 'http://tvawebmam/aztecatube/VTK3/Videoteca15/videos/0022091001860000.mp4', //'../../AztecaTube.mp4',
        start: 0
    });
    jwplayer("myVideo").onPlay(
        function () {
            $("#lblVidTime").empty();
            $("#lblVidTime").append(numberToTimeFormat(jwplayer("myVideo").getDuration()));
            $("#vidSliderTime").slider({
                orientation: "horizontal",
                range: "min",
                max: Math.floor(jwplayer("myVideo").getDuration())
            });

            setTimer();
        }
    );

    jwplayer("myVideo").onIdle(
        function () {
            $("#vidSliderTime").slider("value", 0);
        }
    );
};

$(function () {
    $("#vidSliderTime").slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 0
    });

    $("#vidSliderTime").mouseup(function (b) {
        jwplayer("myVideo").seek($("#vidSliderTime").slider("value"));
        setTimer();
        ismoouseUp = false;
    });

    $("#vidSliderTime").mousedown(function (b) {
        ismoouseUp = true;
        if (t != undefined)
            clearTimeout(t);
    });
});

function playerPlay(){
    jwplayer("myVideo").pause();
}

function playerStop() {
    if (t != undefined)
        clearTimeout(t);
    ismoouseUp = false;
    jwplayer("myVideo").stop();
    $("#vidSliderTime").slider("value", 0);
    $("#lblCurrVidTime").empty();
    $("#lblCurrVidTime").append(numberToTimeFormat(0));
}

function seekBack(){
    jwplayer("myVideo").seek(jwplayer("myVideo").getPosition() - 10);
    $("#vidSliderTime").slider("value", jwplayer("myVideo").getPosition());
}

function seekForward(){
    jwplayer("myVideo").seek(jwplayer("myVideo").getPosition() + 10);
    $("#vidSliderTime").slider("value", jwplayer("myVideo").getPosition());
}

function setTimer() {
    if (t != undefined)
        clearTimeout(t);

    try {
        if (parent.isWindowClosed() != undefined)
            t = setTimeout("updateSlider()", time);
    }
    catch (ex) {}
}

function updateSlider() {
    if (ismoouseUp == false) {
        $("#vidSliderTime").slider("value", jwplayer("myVideo").getPosition());
        $("#lblCurrVidTime").empty();
        $("#lblCurrVidTime").append(numberToTimeFormat(jwplayer("myVideo").getPosition()));
        setTimer();
    }
}