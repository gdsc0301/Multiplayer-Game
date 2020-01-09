var external_ip = '189.121.86.34';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cubes = [];

var old = [];
var c = {
    width : 800,
    height: 600
};

function start() {
    setInterval(update, 1000/60);
}

var req;
function update() {
    req = new XMLHttpRequest();
    req.open("GET", 'http://'+ external_ip +':8080');
    req.send('');

    req.onload = function(e){
        old = cubes;
        cubes = JSON.parse(e.target.response);
        draw();
    };
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
    req = new XMLHttpRequest();
    req.open("GET", 'http://189.121.86.34:8080/addNew');
    req.send('');
}

start();

