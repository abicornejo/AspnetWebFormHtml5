
var scaleFactor = 0.25;
var snapshots = [];
/**
* Captures a image frame from the provided video element.
*
* @param {Video} video HTML5 video element from where the image frame will be captured.
* @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
*
* @return {Canvas}
*/
function capture(video, scaleFactor) {
    if (scaleFactor == null) 
        scaleFactor = 1;
    var canvas = document.createElement("canvas");
    canvas.width = 75;
    canvas.height = 60;
    var ctx = canvas.getContext("2d");
    try {
        //ctx.drawImage(video, 0, 0, 75, 60);
        var img = new Image();
        img.src = '../../Images/aztecatube2.png';
        ctx.drawImage(img, 50, 70);
        //ctx.drawWindow(window, 0, 0, 100, 200, "rgb(255,255,255)");  
//            ctx.beginPath();
//            ctx.moveTo(30, 96);
//            ctx.lineTo(70, 66);
//            ctx.lineTo(103, 76);
//            ctx.lineTo(170, 15);
//            ctx.stroke();
        
    }
    catch (ex) { alert('Su navegador no es compatible con el elemento Canvas.'); }
    $(canvas).css({ background: "#A4A4A4", opacity: 0.5 })
    return canvas;
}
/**
* Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
*/
function shoot(videoId, theOutputName) {
    var video = document.getElementById(videoId);
    var output = document.getElementById(theOutputName);
    var canvas = capture(video, scaleFactor);
//    canvas.onclick = function () {
//        window.open(this.toDataURL());
//    };
    snapshots.unshift(canvas);
    output.innerHTML = '';
    output.appendChild(canvas);
}
