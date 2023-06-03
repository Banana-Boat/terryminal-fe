import { useRoutes } from "react-router-dom";
import { routes } from "./router";
import "./App.module.scss";

function App() {
  const router = useRoutes(routes);

  return <>{router}</>;
}

export default App;
