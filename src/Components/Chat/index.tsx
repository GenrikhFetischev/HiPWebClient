import React from "react";

import {
  ChatContainer,
  MessageList,
  Message as UiMessage,
  MessageInput,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { Contact } from "../../entities/contactsState";
import { Message, MessageState } from "../../entities/messageState";
import { observer } from "mobx-react-lite";

export type ChatUiProps = {
  chatWith: Contact;
  onMessageSend: (content: string) => void;
  messages: Message[];
};

export const ChatUi = ({ chatWith, onMessageSend, messages }: ChatUiProps) => {
  return (
    <ChatContainer>
      <MessageList>
        {messages.map((message) => (
          <UiMessage
            key={message.messageId}
            model={{
              message: message.content.text,
              sender: message.from,
              direction: message.from === "me" ? "outgoing" : "incoming",
            }}
          />
        ))}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        onSend={onMessageSend}
        attachButton={false}
      />
    </ChatContainer>
  );
};

export type ChatProps = {
  chatWith: Contact;
  messageState: MessageState;
};

export const Chat = observer(({ messageState, chatWith }: ChatProps) => {
  const messages = messageState.chats.get(chatWith.host) ?? [];

  return (
    <ChatUi
      onMessageSend={(text) => {
        messageState.sendMessage({ text }, chatWith.host);
      }}
      chatWith={chatWith}
      messages={messages}
    />
  );
});
