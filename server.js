import {WebSocketServer,WebSocket} from 'ws';
const wss= new WebSocketServer({port:8080});


//Connection event
//socket=individual connection to one client
//request=header ,cookies,ip address
wss.on('connection',(socket,request)=>{
    const ip=request.socket.remoteAddress;
    //extracting the raw data from the connection
    socket.on('message',(rawData)=>{
        const message=rawData.toString();
        console.log({rawData});
//0:Connecting
//1:OPEN(The only state where you can safely .send())
//2:CLOSING
//3:CLOSED
        wss.clients.forEach((client)=>{
            if (client.readyState===WebSocket.OPEN) client.send(`Server Broadcast:${message}`);
        })
    });
    socket.on('error',(err)=>{
        console.error(`Error: ${err.message}:${ip}`);
    });
    socket.on('close',()=>{
        console.log('Client disconnected');
    });
});
console.log("WebSocket Server started on ws://localhost:8080");