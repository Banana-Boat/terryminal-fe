import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { ITerminal, ITerminalTemplate } from "./types";

interface ITermStore {
  terms: ITerminal[]; // 终端实例列表
  updateTerms: (terms: ITerminal[]) => void; // 更新整个 terms
  addTerm: (term: ITerminal) => void; // 添加一个 term
  deleteTermById: (id: string) => void; // 删除一个 term
  updateTermById: (id: string, term: ITerminal) => void; // 更新一个 term 的信息
  termTemplates: ITerminalTemplate[]; // 终端模板列表
  updateTermTemplates: (termTemplates: ITerminalTemplate[]) => void; // 更新整个 termTemplates
  launchedTerms: string[]; // 已经启动的终端实例列表
  updateLaunchedTerms: (launchedTerms: string[]) => void; // 更新整个 launchedTerms
}

const termStore = createStore<ITermStore>((set) => ({
  terms: [],
  updateTerms: (terms) => set({ terms }),
  addTerm: (term) => set((state) => ({ terms: [...state.terms, term] })),
  deleteTermById: (id) =>
    set((state) => ({ terms: state.terms.filter((term) => term.id !== id) })),
  updateTermById: (id, newTerm) =>
    set((state) => ({
      terms: state.terms.map((term) => (term.id === id ? newTerm : term)),
    })),
  termTemplates: [],
  updateTermTemplates: (termTemplates) => set({ termTemplates }),
  launchedTerms: [],
  updateLaunchedTerms: (launchedTerms) => set({ launchedTerms }),
}));

const useTermStore = () => useStore(termStore);

export { termStore, useTermStore };
