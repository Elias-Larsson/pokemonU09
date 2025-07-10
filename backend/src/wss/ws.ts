import { WebSocketServer, WebSocket } from "ws";
import type { Server } from "http";

export function setupWebSocket(server: Server) {
  const wss = new WebSocketServer({ server });

  type Room = {
    id: string;
    players: { ws: WebSocket; username: string }[];
  };

  function generateRoomId() {
    return Math.random().toString(36).substr(2, 8);
  }
  const rooms = new Map<string, Room>();
  const userMap = new Map<WebSocket, string>();

  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      try {
        const data = JSON.parse(message.toString());

        switch (data.type) {
          case "set-player": {
            const username = String(data.username).trim();
            if (username && !Array.from(userMap.values()).includes(username)) {
              userMap.set(ws, username);
              ws.send(
                JSON.stringify({ type: "player-confirmed", username: username })
              );
              console.log(`Username set: ${username}`);
            }
            break;
          }
          case "create-room": {
            const roomId = generateRoomId();
            rooms.set(roomId, {
              id: roomId,
              players: [{ ws, username: data.username }],
            });
            ws.send(JSON.stringify({ type: "room-created", roomId }));
            break;
          }
          case "join-room": {
            const room = rooms.get(data.roomId);
            if (room && room.players.length < 2) {
              room.players.push({ ws, username: data.username });
              room.players.forEach(({ ws }) =>
                ws.send(
                  JSON.stringify({
                    type: "player-joined",
                    roomId: room.id,
                    players: room.players.map((p) => p.username),
                  })
                )
              );
            } else {
              ws.send(
                JSON.stringify({
                  type: "join-failed",
                  reason: "Room full or not found",
                })
              );
            }
            break;
          }
          // case "message": {
          //   if (typeof data.message === "string") {
          //     const username = userMap.get(ws);
          //     if (!username) break;
          //     const payload = JSON.stringify({
          //       type: "message",
          //       from: username,
          //       message: data.message,
          //     });

          //     wss.clients.forEach((client) => {
          //       if (client.readyState === WebSocket.OPEN) {
          //         client.send(payload);
          //       }
          //     });
          //   }
          //   break;
          // }
          default:
            break;
        }
        const playerList = Array.from(userMap.values());
        console.log("Broadcasting playerlist:", playerList);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({ type: "playerlist", players: playerList })
            );
          }
        });
      } catch (err) {
        console.error("Invalid message received: ", err);
      }
    });
  });
}
