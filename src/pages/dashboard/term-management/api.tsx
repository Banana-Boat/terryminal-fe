import { termStore } from "@/stores/term";
import { ITerminal, ITerminalTemplate } from "@/stores/term/types";
import axios from "@/utils/interceptor.js";

/* 创建终端实例 */
interface CreateTermReq {
  templateId: number;
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

export const destroyTerm = async (terminalId: string) =>
  axios
    .delete<null, DestroyTermResp>("/terminal/destroy?" + terminalId)
    .then(async (res) => {
      if (res) {
        const { isOk } = res;
        if (isOk) {
          const { deleteTermById } = termStore.getState();
          deleteTermById(terminalId);
        }

        return isOk;
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

/* 获取用户终端模版 */
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

/* 创建终端实例 */
interface UpdateTermInfoReq {
  terminalId: string;
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

        updateTermById(params.terminalId, terminal);

        return true;
      } else return false;
    });
