import { termStore } from "@/stores/term";
import { ITerminalTemplate } from "@/stores/term/types";
import { userStore } from "@/stores/user";
import { IUser } from "@/stores/user/types";
import axios from "@/utils/interceptor.js";

/* 获取用户信息 */
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

/* 获取终端模版 */
interface GetTermTemplatesResp {
  templates: ITerminalTemplate[];
}

export const getTermTemplates = async () =>
  axios
    .get<null, GetTermTemplatesResp>("/terminal/getTemplates")
    .then(async (res) => {
      if (res) {
        const { templates } = res;
        const { updateTermTemplates } = termStore.getState();

        updateTermTemplates(templates);

        return true;
      } else return false;
    });
