import axios from "@/utils/interceptor.js";

/* 获取验证码 */
interface SendCodeByEmailReq {
  email: string;
}

interface SendCodeByEmailResp {
  isOk: boolean;
}

export const sendCodeByEmail = async (params: SendCodeByEmailReq) =>
  axios
    .get<SendCodeByEmailReq, SendCodeByEmailResp>(
      "/user/sendCodeByEmail?email=" + params.email
    )
    .then(async (res) => {
      if (res) return res.isOk;
      else return false;
    });
