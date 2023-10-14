import { termStore } from "@/stores/term";
import { ITerminal, ITerminalTemplate } from "@/stores/term/types";
import axios from "@/utils/interceptor.js";

/* 创建终端实例 */
interface CreateTermReq {
  templateID: number;
  remark: string;
}

interface CreateTermResp {
  terminal: ITerminal;
}

export const createTerm = async (params: CreateTermReq) =>
  axios
    .post<CreateTermReq, CreateTermResp>("/terminal/create", params)
    .then(async (res) => {
      if (res) {
        const { terminal } = res;
        const { addTerm } = termStore.getState();

        addTerm(terminal);

        return true;
      } else return false;
    });

/* 销毁终端实例 */
interface DestroyTermResp {
  isOk: boolean;
}

export const destroyTerm = async (terminalID: string) =>
  axios
    .delete<null, DestroyTermResp>("/terminal/destroy?terminalID=" + terminalID)
    .then(async (res) => {
      if (res) {
        const { isOk } = res;
        if (isOk) {
          const { deleteTermById } = termStore.getState();
          deleteTermById(terminalID);
        }

        return isOk;
      } else return false;
    });

/* 获取用户终端实例*/
interface GetUserTermsResp {
  terminals: ITerminal[];
}

export const getUserTerms = async () =>
  axios
    .get<null, GetUserTermsResp>("/terminal/getUserTerminlas")
    .then(async (res) => {
      if (res) {
        const { terminals } = res;
        const { updateTerms } = termStore.getState();

        updateTerms(terminals);

        return true;
      } else return false;
    });

/* 修改终端实例 */
interface UpdateTermInfoReq {
  terminalID: string;
  remark: string;
}

interface UpdateTermInfoResp {
  terminal: ITerminal;
}

export const updateTermInfo = async (params: UpdateTermInfoReq) =>
  axios
    .patch<UpdateTermInfoReq, UpdateTermInfoResp>(
      "/terminal/updateInfo",
      params
    )
    .then(async (res) => {
      if (res) {
        const { terminal } = res;
        const { updateTermById } = termStore.getState();

        updateTermById(params.terminalID, terminal);

        return true;
      } else return false;
    });
