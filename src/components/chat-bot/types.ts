export enum Role {
  ASSISTANT = "assistant",
  USER = "user",
}

export interface ChatMessage {
  role: Role;
  content: string;
}
