import axios from "@/utils/interceptor.js";
import { userStore } from "@/stores/user/index.js";
import { IUser } from "@/stores/user/types.js";

interface LoginReq {
  email: string;
  password: string;
}

interface LoginResp {
  token: string;
  user: IUser;
}

export const login = async (params: LoginReq) =>
  axios.post<LoginReq, LoginResp>("/user/login", params).then(async (res) => {
    if (res) {
      const { token, user } = res;
      const { toggleLoginState, updateUserInfo } = userStore.getState();

      updateUserInfo(user);
      toggleLoginState(true);
      localStorage.setItem("token", token);

      return true;
    } else return false;
  });
