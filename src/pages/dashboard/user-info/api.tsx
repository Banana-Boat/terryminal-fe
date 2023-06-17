import axios from "@/utils/interceptor.js";
import { userStore } from "@/stores/user/index.js";
import { IUser } from "@/stores/user/types.js";

interface UpdateUserInfoReq {
  nickname: string;
  password: string;
}

interface UpdateUserInfoResp {
  user: IUser;
}

export const updateUserInfo = async (params: UpdateUserInfoReq) =>
  axios
    .patch<UpdateUserInfoReq, UpdateUserInfoResp>("/user/updateInfo", params)
    .then(async (res) => {
      if (res) {
        const { user } = res;
        const { updateUserInfo } = userStore.getState();

        updateUserInfo(user);

        return true;
      } else return false;
    });
