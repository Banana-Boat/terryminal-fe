import { TermSocket } from "./termSocket.js";
import { MessageListener } from "./types.js";
import { create } from "zustand";

interface ITermSocketStore {
  termSocket: TermSocket; // socket实例对象
  addMsgListener: (ptyID: string, listener: MessageListener) => void; // 添加某个pty的消息监听器
  removeMsgListener: (ptyID: string, listener: MessageListener) => void; // 移除某个pty的消息监听器
}

const useTermSocketStore = create<ITermSocketStore>((set, get) => ({
  termSocket: new TermSocket(),
  addMsgListener: (ptyID: string, listener: MessageListener) => {
    get().termSocket.addMsgListener(ptyID, listener);
  },
  removeMsgListener: (ptyID: string, listener: MessageListener) =>
    get().termSocket.removeMsgListener(ptyID, listener),
}));

export default useTermSocketStore;
