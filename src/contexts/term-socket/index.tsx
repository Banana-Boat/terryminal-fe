import React, { createContext, useContext, useEffect, useState } from "react";
import { TermSocket } from "./termSocket.js";
import { MessageListener } from "./types.js";

interface ITermSocketContext {
  termSocket: TermSocket; // socket实例对象
  addMsgListener: (ptyID: string, listener: MessageListener) => void; // 添加某个pty的消息监听器
  removeMsgListener: (ptyID: string, listener: MessageListener) => void; // 移除某个pty的消息监听器
}

const TermSocketContext = createContext<ITermSocketContext>({
  termSocket: new TermSocket(),
  addMsgListener: () => {},
  removeMsgListener: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function TermSocketProvider({ children }: IProps) {
  const { termSocket } = useContext(TermSocketContext); // 获取socket实例对象

  // 组件销毁时关闭socket连接
  useEffect(() => {
    return () => termSocket.close();
  }, []);

  const addMsgListener = (ptyID: string, listener: MessageListener) => {
    termSocket.addMsgListener(ptyID, listener);
  };

  const removeMsgListener = (ptyID: string, listener: MessageListener) => {
    termSocket.removeMsgListener(ptyID, listener);
  };

  return (
    <TermSocketContext.Provider
      value={{ termSocket, addMsgListener, removeMsgListener }}
    >
      {children}
    </TermSocketContext.Provider>
  );
}

export { TermSocketProvider, TermSocketContext };
