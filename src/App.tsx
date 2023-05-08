import { TermSocketProvider } from "./contexts/term-socket";
import Terminal from "./components/terminal";
import ChatBot from "./components/chat-bot";
import "./App.module.scss";

function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "60%",
          padding: 10,
        }}
      >
        <TermSocketProvider>
          <Terminal ptyID="xtg1" />
          <Terminal ptyID="xtg2" />
        </TermSocketProvider>
      </div>
      <div style={{ width: "40%", margin: 10, overflow: "scroll" }}>
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
