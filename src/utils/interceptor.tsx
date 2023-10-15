import axios from "axios";
import { message } from "antd";

const instance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // 将token注入Authorization中
    const token = localStorage.getItem("token");

    if (
      config.url !== "/user/login" &&
      config.url !== "/user/register" &&
      config.url !== "/user/sendCodeByEmail" &&
      config.url !== "/user/updatePassword" &&
      config.url !== "/terminal/getTemplates" &&
      token
    )
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    /* 处理status code为200的情况 */
    const { flag, msg, data } = response.data;
    if (!flag) message.error(msg, 2);
    return data;
  },
  (error) => {
    /* 处理status code不为200的情况 */
    const { data } = error.response;
    if (data) {
      const { msg } = data;
      if (!msg) message.error(msg, 2);
    }
  }
);

export default instance;
