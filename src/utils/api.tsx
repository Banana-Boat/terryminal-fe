import { userStore } from "@/stores/user";
import { IUser } from "@/stores/user/types";
import axios from "@/utils/interceptor.js";

interface GetUserInfoResp {
  user: IUser;
}

export const getUserInfo = async () =>
  axios.get<null, GetUserInfoResp>("/user/getUserInfo").then(async (res) => {
    if (res) {
      const { user } = res;
      const { updateUserInfo, toggleLoginState } = userStore.getState();

      toggleLoginState(true);
      updateUserInfo(user);

      return true;
    } else return false;
  });
