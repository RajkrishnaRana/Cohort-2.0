import WebSocket, { WebSocketServer } from "ws";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
    console.log(new Date() + "Recieved request for " + request.url);
    request.end("hi there");
});

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(socket) {
    socket.on("error", console.error);

    let userConnect = 0;
    socket.on("message", function message(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    console.log("user connect", ++userConnect);

    socket.send("Hello!, Message from server");
});

server.listen(8080, function () {
    console.log(new Date() + "Server is listening on port 8080");
});
