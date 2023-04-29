import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { MyTerm } from "./myTerm.js";
import "xterm/css/xterm.css";

import styles from "./index.module.scss";
import { TermSocketContext } from "../../contexts/term-socket/index.js";

interface IProps {
  ptyID: string;
}

function Terryminal({ ptyID }: IProps) {
  const { termSocket, addMsgListener, removeMsgListener } =
    useContext(TermSocketContext);

  const termDomRef = useRef<HTMLDivElement>(null); // 用于获取MyTerm绑定的dom元素
  const myTerm = useRef<MyTerm>(new MyTerm(ptyID, termSocket)).current; // 创建MyTerm实例

  // 注册该ptyID的消息监听器
  useEffect(() => {
    addMsgListener(ptyID, myTerm.onMessage.bind(myTerm));
    return () => removeMsgListener(ptyID, myTerm.onMessage.bind(myTerm));
  }, []);

  // 绑定MyTerm实例与dom
  useLayoutEffect(() => {
    myTerm.term.open(termDomRef.current!);
  }, []);

  return (
    <>
      <button onClick={() => myTerm.quit()}>退出</button>
      <button
        onClick={() => {
          if (!myTerm.start()) alert("终端启动失败，请稍后重试");
        }}
      >
        启动
      </button>
      <div ref={termDomRef} className={styles.terminal}></div>
    </>
  );
}

export default Terryminal;
