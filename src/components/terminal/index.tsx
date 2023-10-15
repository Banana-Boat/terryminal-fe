import { useEffect, useLayoutEffect, useRef } from "react";
import { MyTerm } from "./myTerm.js";
import "xterm/css/xterm.css";

import styles from "./index.module.scss";
import useTermSocketStore from "@/stores/term-socket";
import { Button } from "antd";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  ptyID: string;
}

function Terminal({ ptyID, ...restProps }: IProps) {
  const { termSocket, addMsgListener, removeMsgListener } =
    useTermSocketStore();

  const termDomRef = useRef<HTMLDivElement>(null); // 用于获取MyTerm绑定的dom元素
  const myTerm = useRef<MyTerm>(new MyTerm(ptyID, termSocket)).current; // 创建MyTerm实例

  // 注册该ptyID的消息监听器
  useEffect(() => {
    console.log("addMsgListener", ptyID);
    addMsgListener(ptyID, myTerm.onMessage.bind(myTerm));
    return () => removeMsgListener(ptyID, myTerm.onMessage.bind(myTerm));
  }, [ptyID, addMsgListener, removeMsgListener]);

  // 绑定MyTerm实例与dom
  useLayoutEffect(() => {
    myTerm.term.open(termDomRef.current!);
  }, []);

  return (
    <div {...restProps}>
      <div ref={termDomRef}></div>
    </div>
  );
}

export default Terminal;
