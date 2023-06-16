import axios from "@/utils/interceptor.js";

interface RegisterReq {
  email: string;
  nickname: string;
  password: string;
}

interface RegisterResp {
  isSuccess: boolean;
}

export const register = async (params: RegisterReq) =>
  axios
    .post<RegisterReq, RegisterResp>("/user/register", params)
    .then(async (res) => {
      if (res) return res.isSuccess;
      else return false;
    });
