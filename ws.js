`use strict`;
const WebSocket = require(`ws`);

const ws = new WebSocket.Server({port: 8082})

ws.on(`connection`, (conn, req) => {
    if()
    conn.on(`message`, (msg) => {
        console.log(msg);

        conn.send(`Received`);
    })
})