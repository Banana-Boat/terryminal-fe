import React, { createContext, useContext, useEffect, useState } from "react";
import { TermSocket } from "./termSocket.js";
import { MessageListener } from "./types.js";

interface ITermSocketContext {
  isConnected: boolean;
  termSocket: TermSocket;
  addMsgListener: (ptyID: string, listener: MessageListener) => void;
  removeMsgListener: (ptyID: string, listener: MessageListener) => void;
}

const TermSocketContext = createContext<ITermSocketContext>({
  isConnected: false,
  termSocket: new TermSocket(),
  addMsgListener: () => {},
  removeMsgListener: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function TermSocketProvider({ children }: IProps) {
  const { termSocket } = useContext(TermSocketContext);

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    termSocket.init().then(() => setIsConnected(true));

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
      value={{ isConnected, termSocket, addMsgListener, removeMsgListener }}
    >
      {children}
    </TermSocketContext.Provider>
  );
}

export { TermSocketProvider, TermSocketContext };
