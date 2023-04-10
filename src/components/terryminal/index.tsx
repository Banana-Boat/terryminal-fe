import { useEffect, useLayoutEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";

import styles from "./index.module.scss";

// 创建xterm
const term = new Terminal();

function Terryminal() {
  const terminalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    term.open(terminalRef.current!);
    term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
    term.onData((data) => {
      term.write(data);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div ref={terminalRef}></div>
    </div>
  );
}

export default Terryminal;
