'use strict';
var cubes = [{
    x       : 0,
    y       : 0,
    vel : {
        x   : 2,
        y   : 2
    },
    x_rev   : false,
    y_rev   : false,
    w       : 50,
    h       : 50,
    color   : '#febebf',
    life    : 100
}];

const max_x = 320, max_y = 600;

function update() {
    var count = 0;
    cubes.forEach((cube) => {
        cube.x_rev ? cube.x-=cube.vel.x : cube.x+=cube.vel.x;
        cube.y_rev ? cube.y-=cube.vel.y : cube.y+=cube.vel.y;

        if(cube.x >= max_x - cube.w  || cube.x <= 0) {
            cube.x_rev = !cube.x_rev;
            cube.life -= 1;
        }
        
        if(cube.y >= max_y - cube.h || cube.y <= 0) {
            cube.y_rev = !cube.y_rev;
            cube.life -= 1;
        }

        if(cube.life <= 0) {
            cubes.splice(count,1);
        }

        count++;
    });
}

setInterval(update, 1000/60);

const WebSocket = require(`ws`);
const ws = new WebSocket.Server({port: 8082})

ws.on(`connection`, (conn, req) => {
    if(req.url === `/addCube`) {
        const newCube = {
            x       : Math.floor(Math.random() * Math.floor(max_x - 52)),
            y       : Math.floor(Math.random() * Math.floor(max_y - 52)),
            vel : {
                x   : 2,
                y   : 2
            },
            x_rev   : false,
            y_rev   : false,
            w       : 50,
            h       : 50,
            color   : '#febebf',
            life    : 100
        };
        
        cubes.push(newCube);

        return;
    }

    conn.send(JSON.stringify(cubes));

    conn.on(`message`, (msg) => {
        conn.send(`Received:`);
        console.log(msg);
    })
    conn.close();
})

// var http = require("http");
// http.createServer(function(req, res) {
//     res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
//     if(req.url === '/addNew'){
//         
//     }

//     res.end(JSON.stringify(cubes));
// }).listen(8080);