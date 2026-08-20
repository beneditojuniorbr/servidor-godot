const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Novo jogador conectado!');

  ws.on('message', (message) => {
    // Retransmite para TODOS os outros jogadores conectados (exceto quem enviou)
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('Jogador desconectado');
  });
});

console.log(`Servidor rodando na porta ${PORT}`);