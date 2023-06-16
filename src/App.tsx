import { useNavigate, useRoutes } from "react-router-dom";
import { routes } from "./router";
import "./App.module.scss";
import { useEffect } from "react";
import { getUserInfo } from "./utils/api";

function App() {
  const router = useRoutes(routes);

  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        if (res) navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>{router}</>;
}

export default App;
