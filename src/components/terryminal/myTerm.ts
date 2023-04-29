import { Terminal } from "xterm";
import { TermSocket } from "../../contexts/term-socket/termSocket.js";
import {
  IRunCmdServerData,
  ITermSocketEventType,
} from "../../contexts/term-socket/types.js";

export class MyTerm {
  term: Terminal;
  termSocket: TermSocket;
  curInput: string;
  ptyID: string;

  constructor(ptyID: string, socket: TermSocket) {
    this.term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#202B33",
        foreground: "#F5F8FA",
      },
    });
    this.greet();

    this.ptyID = ptyID;
    this.termSocket = socket;
    this.curInput = "";

    this.init();
    this.termSocket.start(this.ptyID);
  }

  greet() {
    this.term.write("Hello from Terryminal!\r\n\r\n");
  }

  init() {
    this.term.onKey(({ key, domEvent: e }) => {
      if (e.code === "Enter") {
        console.log(this.curInput);

        if (this.curInput.length > 0) {
          this.termSocket.runCmd(this.ptyID, {
            cmd: this.curInput,
          });
        }
      } else if (e.code === "Backspace") {
        if (this.curInput.length > 0) {
          this.term.write("\b \b");
          this.curInput = this.curInput.slice(0, -1);
        }
      } else if (e.code === "Tab") {
        e.preventDefault();
      } else {
        this.curInput += key;
        this.term.write(key);
      }
    });
  }

  onMessage(event: ITermSocketEventType, data: any) {
    console.log(event, data);
    switch (event) {
      case "start":
        break;

      case "run-cmd":
        const { result, isError } = data as IRunCmdServerData;
        if (isError) break;

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

  restart() {
    this.termSocket.start(this.ptyID);
  }

  quit() {
    this.termSocket.end(this.ptyID);
  }
}
