import { v4 as uuidv4 } from "uuid";
import { makeAutoObservable } from "mobx";
import { fetchMessages, openSocket } from "../api";

export enum EventTypes {
  ReceiveConfirmation,
  FailSendNotification,
  Message,
}
export type ReceiveConfirmation = {
  type: EventTypes.ReceiveConfirmation;
  messageId: string;
  chatId: string;
};

export type FailSendNotification = {
  type: EventTypes.FailSendNotification;
  messageId: string;
  chatId: string;
};

export type MessageContent = {
  text: string;
};

export enum MessageStatus {
  Sent,
  Received,
  FailedToSend,
}

export type Message = {
  type: EventTypes.Message;
  from: string;
  to: string;
  messageId: string;
  timestamp: number;
  content: MessageContent;
  status: MessageStatus;
};

export type IncomingMessage =
  | Message
  | ReceiveConfirmation
  | FailSendNotification;

const createOutgoingMessage = (
  content: MessageContent,
  to: string
): Message => {
  return {
    from: "me",
    to,
    messageId: uuidv4(),
    timestamp: Date.now(),
    status: MessageStatus.Sent,
    content,
    type: EventTypes.Message,
  };
};

export class MessageState {
  private socket?: WebSocket;
  private jwt?: string;
  private host?: string;
  public chats: { [key: string]: Message[] | undefined } = {};

  constructor() {
    makeAutoObservable(this);
  }
  public sendMessage = async (content: MessageContent, to: string) => {
    await this.reInitSocket();
    const message = createOutgoingMessage(content, to);
    this.addMessage(message);
    this.socket?.send(JSON.stringify(message));
  };

  public initializeChat = async () => {
    const apiData = this.getApiData();
    if (!apiData) {
      return;
    }
    this.socket = await openSocket(apiData.jwt, apiData.host);
    this.socket.addEventListener("message", this.handleIncomingMessage);
  };

  public setJwtAndHost = (
    jwt: string,
    host: string,
    failAuthCallback?: () => void
  ) => {
    this.jwt = jwt;
    this.host = host;
  };

  private getApiData = (): { jwt: string; host: string } | undefined => {
    const { jwt, host } = this;
    if (!jwt || !host) {
      console.warn("Provide jwt to ContactsStore before using api!");
      return;
    } else {
      return { jwt, host };
    }
  };

  private reInitSocket = async () => {
    if (this.isSocketOpen()) {
      return;
    }

    await this.initializeChat();
  };

  private isSocketOpen = () =>
    this.socket?.readyState !== WebSocket.CLOSING &&
    this.socket?.readyState !== WebSocket.CLOSED;

  private handleIncomingMessage = (message: MessageEvent) => {
    try {
      const parsed = JSON.parse(message.data) as IncomingMessage;
      switch (parsed.type) {
        case EventTypes.Message:
          this.addMessage(parsed);
          break;
        case EventTypes.ReceiveConfirmation:
          this.setMessageStatus({
            messageId: parsed.messageId,
            status: MessageStatus.Received,
            chatId: parsed.chatId,
          });
          break;
        case EventTypes.FailSendNotification:
          this.setMessageStatus({
            messageId: parsed.messageId,
            status: MessageStatus.FailedToSend,
            chatId: parsed.chatId,
          });
          break;
      }
    } catch (e) {
      console.error("Can't parse websocket response as JSON!");
    }
  };

  private setMessageStatus = ({
    chatId,
    messageId,
    status,
  }: {
    messageId: string;
    chatId: string;
    status: MessageStatus;
  }) => {
    const chat = this.getChat(chatId);

    for (let message of chat) {
      if (message.messageId !== messageId) {
        continue;
      }

      message.status = status;
      return;
    }
  };

  public fetchMessages = async (chatId: string) => {
    const apiData = this.getApiData();
    if (!apiData) {
      return;
    }

    const messages = await fetchMessages({
      jwt: apiData.jwt,
      host: apiData.host,
      chatId: chatId,
    });

    const chat = this.getChat(chatId);

    this.chats[chatId] = [...chat, ...messages];
  };

  public getChat = (chatId: string): Message[] => {
    const chat = this.chats[chatId];

    if (!chat) {
      this.chats[chatId] = [];
      this.fetchMessages(chatId);
    }

    return this.chats[chatId] as Message[];
  };

  private addMessage = (message: Message) => {
    const chatId = message.from === "me" ? message.to : message.from;

    const chat = this.getChat(chatId);

    this.chats[chatId] = [...chat, message];
  };
}

export const messageState = new MessageState();
