import axios from "@/utils/interceptor.js";

/* 获取验证码 */

interface SendCodeByEmailResp {
  isOk: boolean;
}

export const sendCodeByEmail = async (email: string) =>
  axios
    .get<null, SendCodeByEmailResp>("/user/sendCodeByEmail?email=" + email)
    .then(async (res) => {
      if (res) return res.isOk;
      else return false;
    });
