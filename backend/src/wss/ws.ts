import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");
      wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send("hey");
        }
      });
    });
  }
   