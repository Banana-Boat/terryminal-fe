import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { io } from "socket.io-client";

import styles from "./index.module.scss";

function Terryminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const { VITE_WS_HOST, VITE_WS_PORT } = import.meta.env;

  useEffect(() => {
    const term = new Terminal();
    term.open(terminalRef.current!);
  }, []);

  useEffect(() => {
    const socket = io(`ws://${VITE_WS_HOST}:${VITE_WS_PORT}`);
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div ref={terminalRef}></div>
    </div>
  );
}

export default Terryminal;
