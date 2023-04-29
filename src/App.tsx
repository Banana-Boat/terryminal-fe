import { TermSocketContext, TermSocketProvider } from "./contexts/term-socket";
import Terryminal from "./components/terryminal";
import { useContext } from "react";

function App() {
  return (
    <TermSocketProvider>
      <Terryminal ptyID="xtg1" />
    </TermSocketProvider>
  );
}

export default App;
