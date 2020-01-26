var external_ip = '189.121.86.34';
//external_ip = `192.168.1.106`;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cubes = [];

var old = [];
var c = {
    width : 800,
    height: 600
};
var req;

const UPDATE = 1, NEW = 2;

function start() {
    req = new WebSocket(`ws://` + external_ip + `:8082`);
    req.onmessage = function(msg) {
        req.close();

        old = cubes;
        cubes = JSON.parse(msg.data);
        draw();
    }
    setInterval(update, 1000/30);
}

function update() {
    req.send(UPDATE);
}

function draw() {
    old.forEach((old) => {
        ctx.clearRect(old.x,old.y,old.w,old.h);
    });

    cubes.forEach((cube) => {
        ctx.fillStyle = cube.color;
        ctx.fillRect(cube.x,cube.y,cube.w,cube.h);
        ctx.fillStyle = "#000";
        ctx.fillText(cube.life + '%', cube.x, cube.y + 12);
    });
}

function newCube() {
    req.send(NEW);
}

start();

