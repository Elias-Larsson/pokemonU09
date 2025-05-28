import express, { type Express } from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from "cors";
import connectDB from './db';
import userRouter from './src/routes/routes';

connectDB();
const PORT = import.meta.env.PORT || 3010;
const app: Express = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use (express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL! || "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);	

app.get('/', (_, res) => {
    res.send('WebSocket server is running');
});

app.use(userRouter);
app.use("/users", userRouter);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


