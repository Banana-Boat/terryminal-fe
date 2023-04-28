import { useContext } from "react";

import { TermSocketContext, TermSocketProvider } from "./contexts/term-socket";
import Terryminal from "./components/terryminal";

function App() {
  const { isConnected, termSocket, addMsgListener, removeMsgListener } =
    useContext(TermSocketContext);

  return (
    <TermSocketProvider>
      {isConnected ? (
        <Terryminal
          ptyID="xtg1"
          termSocket={termSocket}
          addMsgListener={addMsgListener}
          removeMsgListener={removeMsgListener}
        />
      ) : (
        <div>连接失败</div>
      )}
    </TermSocketProvider>
  );
}

export default App;
