import { TermSocketProvider } from "./contexts/term-socket";
import Terryminal from "./components/terryminal";

function App() {
  return (
    <TermSocketProvider>
      <Terryminal ptyID="xtg1" />
      <Terryminal ptyID="xtg2" />
    </TermSocketProvider>
  );
}

export default App;
