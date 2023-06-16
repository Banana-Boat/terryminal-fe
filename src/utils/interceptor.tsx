import axios from 'axios';
import useUserStore from '../stores/user';
import { message } from 'antd';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    // 将token注入Authorization中
    const {token} = useUserStore();
    if (
      config.url !== '/user/login' &&
      config.url !== '/user/register' &&
      config.url !== '/user/sendCodeByEmail' &&
      config.url !== '/user/updatePassword' &&
      token !== ''
    )
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    const {flag, msg, data} = response.data;

    if (!flag) {
      message.error(msg, 2);
      return false;
    }

    return data;
  },
  error => {
    return Promise.reject(error);
  },
);

export default instance;
