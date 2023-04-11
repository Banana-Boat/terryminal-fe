import { IRunCmdClientData, IStartClientData } from "./types.js";

export class TermSocket {
  socket: WebSocket;

  constructor() {
    const { VITE_WS_HOST, VITE_WS_PORT } = import.meta.env;
    this.socket = new WebSocket(`ws://${VITE_WS_HOST}:${VITE_WS_PORT}`);
  }

  init() {
    return new Promise((resolve, reject) => {
      this.socket.addEventListener("open", () => {
        console.log("onpen");
        resolve(true);
      });

      this.socket.addEventListener("close", (e) => {
        console.log("onclose: ", e);
      });

      this.socket.addEventListener("error", (e) => {
        console.log("onerror: ", e);
        reject(false);
      });
    });
  }

  close() {
    this.socket.close();
  }

  start(data: IStartClientData) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: "start",
          data: data,
        })
      );
  }

  end() {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: "end",
        })
      );
  }

  runCmd(data: IRunCmdClientData) {
    if (this.socket.readyState === 1)
      this.socket.send(
        JSON.stringify({
          event: "run-cmd",
          data: data,
        })
      );
  }
}
