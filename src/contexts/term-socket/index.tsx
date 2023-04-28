import React, { createContext, useCallback, useEffect, useState } from "react";
import { TermSocket } from "./termSocket.js";
import { MessageListener } from "./types.js";

interface ITermSocketContext {
  isConnected: boolean;
  termSocket?: TermSocket;
  addMsgListener: (ptyID: string, listener: MessageListener) => void;
  removeMsgListener: (ptyID: string, listener: MessageListener) => void;
}

const TermSocketContext = createContext<ITermSocketContext>({
  isConnected: false,
  addMsgListener: () => {},
  removeMsgListener: () => {},
});

interface IProps {
  children: React.ReactNode;
}

function TermSocketProvider({ children }: IProps) {
  const [termSocket, setTermSocket] = useState<TermSocket>();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new TermSocket();
    setTermSocket(socket);
    socket.init().then(() => setIsConnected(true));

    return () => socket.close();
  }, []);

  const addMsgListener = useCallback(
    (ptyID: string, listener: MessageListener) => {
      termSocket?.addMsgListener(ptyID, listener);
    },
    [termSocket]
  );

  const removeMsgListener = useCallback(
    (ptyID: string, listener: MessageListener) => {
      termSocket?.removeMsgListener(ptyID, listener);
    },
    [termSocket]
  );

  return (
    <TermSocketContext.Provider
      value={{ isConnected, termSocket, addMsgListener, removeMsgListener }}
    >
      {children}
    </TermSocketContext.Provider>
  );
}

export { TermSocketProvider, TermSocketContext };
