export enum SocketMessagesType {
  CREATE = "create",
  JOIN = "join",
  CHAT = "chat",
}

export enum JOINING_STATUS {
  IDLE = "idle",
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
}

export interface NewMessage {
  type: SocketMessagesType.CHAT;
  payload: {
    roomId: string;
    username: string;
    message: string;
  };
}
