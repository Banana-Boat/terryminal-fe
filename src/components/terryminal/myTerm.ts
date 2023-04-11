import { Terminal } from "xterm";
import { TermSocket } from "./termSocket.js";
import { IRunCmdServerData } from "./types.js";

export class MyTerm {
  term: Terminal;
  termSocket?: TermSocket;
  curInput: string;

  constructor() {
    this.term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#202B33",
        foreground: "#F5F8FA",
      },
    });

    this.curInput = "";

    this.greet();
  }

  greet() {
    this.term.write("Hello from Terryminal!\r\n\r\n");
  }

  init(socket: TermSocket) {
    this.termSocket = socket;
    this.termSocket.socket.addEventListener("message", (msg) => {
      console.log("onmessage: ", msg.data);

      const { data, event } = JSON.parse(msg.data);

      switch (event) {
        case "start":
          break;

        case "run-cmd":
          const { result } = data as IRunCmdServerData;
          if (this.curInput.length > 0) {
            for (let i = 0; i < this.curInput.length; i++) {
              this.term.write("\b \b");
            }
            this.curInput = "";
          }

          this.term.write(result);

          break;

        case "close":
          break;
      }
    });

    this.termSocket.start({
      containerName: new Date().getTime().toString(),
    });

    this.term.onKey(({ key, domEvent: e }) => {
      if (e.code === "Enter") {
        if (this.curInput.length > 0) {
          this.termSocket?.runCmd({
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
}
