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

          this.term.write(result);
          this.curInput = "";

          break;

        case "close":
          break;
      }
    });

    this.termSocket.start({
      containerName: "xtg",
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
      } else {
        this.curInput += key;
        this.term.write(key);
      }
    });
  }
}
