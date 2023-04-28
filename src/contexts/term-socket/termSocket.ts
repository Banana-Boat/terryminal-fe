import {
  IRunCmdClientData,
  ITermSocketMessage,
  MessageListener,
} from "./types.js";

export class TermSocket {
  socket: WebSocket;
  msgListeners: Record<string, MessageListener[]> = {};

  constructor() {
    const { VITE_WS_HOST, VITE_WS_PORT } = import.meta.env;
    this.socket = new WebSocket(`ws://${VITE_WS_HOST}:${VITE_WS_PORT}`);

    this.socket.onmessage = (msg) => {
      const { event, ptyID, data } = JSON.parse(msg.data) as ITermSocketMessage;
      const listeners = this.msgListeners[ptyID] ?? [];
      listeners.forEach((listener) => listener(event, data));
    };

    this.socket.addEventListener("close", (e) => console.log("onclose: ", e));
    this.socket.addEventListener("error", (e) => console.log("onerror: ", e));
  }

  init() {
    return new Promise((resolve) => {
      this.socket.addEventListener("open", () => {
        console.log("onpen");
        resolve(true);
      });
    });
  }

  addMsgListener(ptyID: string, listener: MessageListener) {
    this.msgListeners[ptyID] = [...(this.msgListeners[ptyID] ?? []), listener];
  }

  removeMsgListener(ptyID: string, listener: MessageListener) {
    this.msgListeners[ptyID] = (this.msgListeners[ptyID] ?? []).filter(
      (l) => l !== listener
    );
  }

  close() {
    this.socket.close();
  }

  start(ptyID: string) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          ptyID: ptyID,
          event: "start",
        })
      );
  }

  end(ptyID: string) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          ptyID: ptyID,
          event: "end",
        })
      );
  }

  runCmd(ptyID: string, data: IRunCmdClientData) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          ptyID: ptyID,
          event: "run-cmd",
          data: data,
        })
      );
  }
}
