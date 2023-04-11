import { useLayoutEffect, useRef } from "react";
import { MyTerm } from "./myTerm.js";
import "xterm/css/xterm.css";

import styles from "./index.module.scss";
import { TermSocket } from "./termSocket.js";

function Terryminal() {
  const myTerm = useRef(new MyTerm()).current; // 创建MyTerm实例，确保只有一个
  const termDomRef = useRef<HTMLDivElement>(null); // 用于获取MyTerm绑定的dom元素

  useLayoutEffect(() => {
    /* 避免重复初始化 */
    if (myTerm.term.element) return;

    myTerm.term.open(termDomRef.current!);
    const termSocket = new TermSocket();
    termSocket
      .init()
      .then(() => {
        myTerm.init(termSocket);
      })
      .catch(() => console.log("连接失败..."));
  }, []);

  return <div ref={termDomRef} className={styles.terminal}></div>;
}

export default Terryminal;
