export interface IUser {
  id: number;
  nickname: string;
  email: string;
  chatbotToken: number;
}

export interface ITerminal {
  id: string;
  name: string;
  ownerID: number;
  remark: string;
  size: string;
  templateID: number;
  totalDuration: number;
}

export interface ITerminalTemplate {
  id: number;
  name: string;
  imageName: string;
  size: string;
  description: string;
}
