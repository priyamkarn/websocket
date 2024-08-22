const express=require('express');
const { WebSocketServer,WebSocket } = require('ws');
const app=express();
const httpserver=app.listen(8080);
const wss=new WebSocketServer({server:httpserver});
wss.on('connection',function connection(ws)
{
    ws.on('error',console.error);
    ws.on('message',function message(data,isBinary)
{
    wss.clients.forEach(function each(client)
{
    if(client.readyState==WebSocket.OPEN)
    {
        client.send(data, { binary: isBinary });
    }
})
})
ws.send('Welcome to the WebSocket server!');
})