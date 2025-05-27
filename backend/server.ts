import express, { type Express } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const app: Express = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get('/', (_, res) => {
    res.send('WebSocket server is running');
});

const PORT = import.meta.env.PORT || 3010;


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});