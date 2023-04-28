import { useEffect, useLayoutEffect, useRef } from "react";
import { MyTerm } from "./myTerm.js";
import "xterm/css/xterm.css";

import styles from "./index.module.scss";
import { MessageListener } from "../../contexts/term-socket/types.js";
import { TermSocket } from "../../contexts/term-socket/termSocket.js";

interface IProps {
  ptyID: string;
  termSocket?: TermSocket;
  addMsgListener: (ptyID: string, listener: MessageListener) => void;
  removeMsgListener: (ptyID: string, listener: MessageListener) => void;
}

function Terryminal({
  ptyID,
  termSocket,
  addMsgListener,
  removeMsgListener,
}: IProps) {
  const termDomRef = useRef<HTMLDivElement>(null); // 用于获取MyTerm绑定的dom元素
  const myTerm = useRef<MyTerm>(new MyTerm(ptyID, termSocket)).current;

  useEffect(() => {
    addMsgListener(ptyID, myTerm.onMessage);
    return () => removeMsgListener(ptyID, myTerm.onMessage);
  }, [addMsgListener, removeMsgListener]);

  useLayoutEffect(() => {
    myTerm.term.open(termDomRef.current!);
  }, []);

  return (
    <>
      <button onClick={() => myTerm.quit()}>退出</button>
      <button onClick={() => myTerm.restart()}>重新启动</button>
      <div ref={termDomRef} className={styles.terminal}></div>
    </>
  );
}

export default Terryminal;
