export type MessageListener = (event: ITermSocketEventType, data: any) => void;

export enum ITermSocketEventType {
  START = "start",
  RUN_CMD = "run-cmd",
  END = "end",
}

export interface ITermSocketMessage {
  ptyID: string;
  event: ITermSocketEventType;
  data: any;
}

export interface IStartServerData {
  result: boolean;
}

export interface IRunCmdClientData {
  cmd: string;
}

export interface IRunCmdServerData {
  isError: boolean;
  result: string;
}
