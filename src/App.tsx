import { TermSocketProvider } from "./contexts/term-socket";
import Terminal from "./components/terminal";
import ChatBot from "./components/chat-bot";

function App() {
  return (
    <>
      <ChatBot />
      {/* <TermSocketProvider>
        <Terminal ptyID="xtg1" />
        <Terminal ptyID="xtg2" />
      </TermSocketProvider> */}
    </>
  );
}

export default App;
