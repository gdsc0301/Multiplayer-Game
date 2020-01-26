var external_ip = 'localhost';

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

function update() {
    //const req = new XMLHttpRequest();
    //req.open("GET", 'http://'+ external_ip +':8080');
    //req.send('');
    const req = new WebSocket(`ws://` + external_ip + `:8082`);
    req.onmessage = function(msg) {
        req.close();

        //console.log(`data:`);console.log(msg.data);
        old = cubes;
        cubes = JSON.parse(msg.data);
        draw();
    }

    // req.onload = function(e){
    //     old = cubes;
    //     cubes = JSON.parse(e.target.response);
    //     draw();
    // };
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
    const req = new WebSocket(`ws://` + external_ip + `:8082/addCube`);
    req.onopen = function(e) {
        console.log(e);
        req.send(`Hi, this is from browser`);
    };
    
    req.onmessage = function(e) {
        console.log(`FROM SERVER:`);
        console.log(e.data);

        req.close();
    }
}

start();

