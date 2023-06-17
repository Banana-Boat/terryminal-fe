import { createStore } from "zustand/vanilla";
import { useStore } from "zustand";
import { ITerminal, ITerminalTemplate } from "./types";

interface ITermStore {
  terms: ITerminal[];
  termTemplates: ITerminalTemplate[];
  updateTerms: (terms: ITerminal[]) => void;
  addTerm: (term: ITerminal) => void;
  deleteTermById: (id: string) => void;
  updateTermById: (id: string, term: ITerminal) => void;
  updateTermTemplates: (termTemplates: ITerminalTemplate[]) => void;
}

const termStore = createStore<ITermStore>((set) => ({
  terms: [],
  termTemplates: [],
  updateTerms: (terms) => set({ terms }),
  addTerm: (term) => set((state) => ({ terms: [...state.terms, term] })),
  deleteTermById: (id) =>
    set((state) => ({ terms: state.terms.filter((term) => term.id !== id) })),
  updateTermById: (id, newTerm) =>
    set((state) => ({
      terms: state.terms.map((term) => (term.id === id ? newTerm : term)),
    })),
  updateTermTemplates: (termTemplates) => set({ termTemplates }),
}));

const useTermStore = () => useStore(termStore);

export { termStore, useTermStore };
