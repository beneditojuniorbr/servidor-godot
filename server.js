const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

console.log(`Servidor rodando na porta ${PORT}`);

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('Novo jogador conectado! Total:', clients.length);

    ws.on('message', (message) => {
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter((c) => c !== ws);
        console.log('Jogador desconectado. Restantes:', clients.length);
    });
});