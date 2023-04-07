import styles from "./App.module.scss";

function App() {
  const { VITE_WS_HOST, VITE_WS_PORT } = import.meta.env;
  return (
    <div>
      {VITE_WS_HOST}:{VITE_WS_PORT}
    </div>
  );
}

export default App;
