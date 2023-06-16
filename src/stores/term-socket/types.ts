export type MessageListener = (event: ITermSocketEventType, data: any) => void;

// socket消息事件类型枚举
export enum ITermSocketEventType {
  START = "start",
  RUN_CMD = "run-cmd",
  END = "end",
}

export interface ITermSocketMessage {
  ptyID: string;
  event: ITermSocketEventType; // socket消息事件类型
  data: any;
}

export interface IStartServerData {
  result: boolean; // Pty启动是否成功
}

export interface IRunCmdClientData {
  cmd: string; // 需要执行的命令
}

export interface IRunCmdServerData {
  isError: boolean; // 是否存在错误
  result: string; // 命令执行结果
}
