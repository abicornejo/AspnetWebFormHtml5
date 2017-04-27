var Sphere = function (radius, sides, numOfItems) {
    var z;
    var x;
    var y;
    var angle;
    var angleB;

    for (var j = sides; j >= 0; j--) {
        angleB = (j * Math.PI * 2) / sides;
        z = Math.cos(angleB) * radius;

        for (var i = numOfItems / sides; i >= 0; i--) {
            angle = (i * Math.PI * 2) / (numOfItems / sides);

            x = Math.sin(angle) * Math.sin(angleB) * radius;
            y = Math.cos(angle) * Math.sin(angleB) * radius;


            this.pointsArray.push(this.make3DPoint(x, y, z));
        }

    };
};

Sphere.prototype = new DisplayObject3D();
