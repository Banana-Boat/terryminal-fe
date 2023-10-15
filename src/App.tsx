import { useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./router";
import "./App.module.scss";
import { useEffect } from "react";
import { getTermTemplates, getUserInfo } from "./utils/api";

function App() {
  const router = useRoutes(routes);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserInfo().then((res) => {
        if (res) navigate("/dashboard");
      });
    }

    getTermTemplates();
  }, []);

  return <>{router}</>;
}

export default App;
