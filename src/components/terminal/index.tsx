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
    addMsgListener(ptyID, myTerm.onMessage.bind(myTerm));
    return () => removeMsgListener(ptyID, myTerm.onMessage.bind(myTerm));
  }, []);

  // 绑定MyTerm实例与dom
  useLayoutEffect(() => {
    myTerm.term.open(termDomRef.current!);
  }, []);

  return (
    <div {...restProps}>
      <div style={{ marginBottom: 10 }}>
        <Button
          onClick={() => {
            if (!myTerm.start()) alert("终端启动失败，请稍后重试");
          }}
          style={{ marginRight: 10 }}
        >
          启动
        </Button>
        <Button onClick={() => myTerm.quit()}>退出</Button>
      </div>
      <div ref={termDomRef}></div>
    </div>
  );
}

export default Terminal;
