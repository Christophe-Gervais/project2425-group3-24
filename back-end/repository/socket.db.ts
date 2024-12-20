import WebSocket from "ws";

const webSockets: Map<string, Set<WebSocket>> = new Map();

const addSocketServer = async (gameCode: string) => {
    try {
        console.log(`WebSocket Server created on game code ${gameCode}`);
        webSockets.set(gameCode, new Set());
    } catch (error) {
        console.error(error);
        throw new Error('WebSocket Server error. See server log for details.');
    }
};

const getSocketsByGameCode = async (gameCode: string): Promise<Set<WebSocket> | undefined> => {
    try {
        return webSockets.get(gameCode);
    } catch (error) {
        console.error(error);
        throw new Error('WebSocket Server error. See server log for details.');
    }
};

const addSocketToSocketServer = async (gameCode: string, ws: WebSocket) => {
    try {
        ws.on("close", () => {
            console.log(`WebSocket client disconnected on game code ${gameCode}`);
            const clients = webSockets.get(gameCode);
            if (clients) {         
                clients.delete(ws);
                if (clients.size === 0) {
                    console.log(`Closed WebSocket Server on game code ${gameCode}`);
                    webSockets.delete(gameCode);
                }
            }
        });
        webSockets.get(gameCode)!.add(ws);
    } catch (error) {
        console.error(error);
        throw new Error('WebSocket Server error. See server log for details.');
    }
};

const sendUpdateSignalToSockets = async (gameCode: string) => {
    try {
        const clients = webSockets.get(gameCode);
        if (clients) {
            console.log(`Update to ${clients.size} clients`);
            clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("updateSignal");
                }
            });
        }
    } catch (error) {
        console.error(error);
        throw new Error('WebSocket Server error. See server log for details.');
    }
};

export default { 
    addSocketServer,
    getSocketsByGameCode,
    addSocketToSocketServer,
    sendUpdateSignalToSockets
};
