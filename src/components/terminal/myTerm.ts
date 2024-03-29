import { Terminal } from "xterm";
import { TermSocket } from "@/stores/term-socket/termSocket.js";
import {
  IRunCmdServerData,
  ITermSocketEventType,
} from "@/stores/term-socket/types.js";
import { message } from "antd";

export class MyTerm {
  term: Terminal; // xterm实例
  termSocket: TermSocket; // socket实例
  ptyID: string;
  curInput: string; // 当前输入缓冲区

  constructor(ptyID: string, socket: TermSocket, rows: number, cols: number) {
    this.term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#202B33",
        foreground: "#F5F8FA",
      },
      rows: rows,
      cols: cols
    });
    this.greet();

    this.ptyID = ptyID;
    this.termSocket = socket;
    this.curInput = "";

    this.init();
  }

  // 打印欢迎信息
  greet() {
    this.term.write("Hello from Terryminal!\r\n\r\n");
  }

  init() {
    // 监听键盘输入
    this.term.onKey(({ key, domEvent: e }) => {
      if (e.code === "Enter") {
        // 回车键入
        if (this.curInput.length > 0) {
          if (this.curInput === "exit") {
            message.warning('请通过底部停止按钮退出终端', 2)
            return;
          }
          this.termSocket.runCmd(this.ptyID, {
            cmd: this.curInput,
          });
        }
      } else if (e.code === "Backspace") {
        // 退格键入
        if (this.curInput.length > 0) {
          this.term.write("\b \b"); // 退格
          this.curInput = this.curInput.slice(0, -1); // 从缓冲区删除字符
        }
      } else if (e.code === "Tab") {
        // Tab键入，待实现
        e.preventDefault();
      } else {
        // 普通字符键入
        this.curInput += key;
        this.term.write(key);
      }
    });
  }

  // socket消息处理
  onMessage(event: ITermSocketEventType, data: any) {
    console.log(event, data);
    switch (event) {
      case "start":
        break;

      case "run-cmd":
        const { result, isError } = data as IRunCmdServerData;
        if (isError) break;

        // 由于键盘输入的命令会被后端返回值回显，所以需要先清空当前输入
        if (this.curInput.length > 0) {
          for (let i = 0; i < this.curInput.length; i++) {
            this.term.write("\b \b");
          }
          this.curInput = "";
        }

        this.term.write(result);

        break;

      case "end":
        break;
    }
  }

  // 启动pty，若启动失败，返回false
  start() {
    if (!this.termSocket.isConnected()) return false;

    this.termSocket.start(this.ptyID);
    return true;
  }

  // 退出pty
  quit() {
    this.termSocket.end(this.ptyID);
  }
}
