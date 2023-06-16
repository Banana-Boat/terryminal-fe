import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#ff3670",
      },
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
