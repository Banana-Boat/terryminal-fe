import {
  IRunCmdClientData,
  ITermSocketMessage,
  MessageListener,
} from "./types.js";

export class TermSocket {
  socket: WebSocket;
  msgListeners: Record<string, MessageListener[]> = {};

  constructor() {
    const { VITE_BASE_HOST, VITE_BASE_PORT } = import.meta.env;
    this.socket = new WebSocket(
      `ws://${VITE_BASE_HOST}:${VITE_BASE_PORT}/terminal/ws`
    );

    // 解析消息，根据ptyID分发给对应的消息监听器
    this.socket.addEventListener("message", (msg) => {
      const { event, ptyID, data } = JSON.parse(msg.data) as ITermSocketMessage;
      const listeners = this.msgListeners[ptyID] ?? [];
      listeners.forEach((listener) => listener(event, data));
    });

    this.socket.addEventListener("close", (e) => console.log("onclose: ", e));
    this.socket.addEventListener("error", (e) => console.log("onerror: ", e));
    this.socket.addEventListener("open", () => console.log("onpen"));
  }

  // 添加某个pty的消息监听器
  addMsgListener(ptyID: string, listener: MessageListener) {
    this.msgListeners[ptyID] = [...(this.msgListeners[ptyID] ?? []), listener];
  }

  // 移除某个pty的消息监听器
  removeMsgListener(ptyID: string, listener: MessageListener) {
    this.msgListeners[ptyID] = (this.msgListeners[ptyID] ?? []).filter(
      (l) => l !== listener
    );
  }

  // 判断socket是否已经成功连接
  isConnected() {
    return this.socket.readyState === 1;
  }

  // 关闭socket连接
  close() {
    if (this.isConnected()) this.socket.close();
  }

  // 启动Pty
  start(ptyID: string) {
    if (this.isConnected())
      this.socket.send(
        JSON.stringify({
          ptyID: ptyID,
          event: "start",
        })
      );
  }

  // 结束Pty
  end(ptyID: string) {
    if (this.isConnected())
      this.socket.send(
        JSON.stringify({
          ptyID: ptyID,
          event: "end",
        })
      );
  }

  // 执行命令
  runCmd(ptyID: string, data: IRunCmdClientData) {
    if (this.isConnected())
      this.socket.send(
        JSON.stringify({
          ptyID: ptyID,
          event: "run-cmd",
          data: data,
        })
      );
  }
}
