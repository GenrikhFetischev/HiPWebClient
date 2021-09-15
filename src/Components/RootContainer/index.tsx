import React, { useCallback, useState } from "react";
import {
  MainContainer,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { Contacts } from "../Contacts";
import { Chat } from "../Chat";
import { Contact, contactsState } from "../../entities/contactsState";
import { messageState } from "../../entities/messageState";
import { chatZone, rootContainer } from "./styles";
import { Header } from "../Header";

export const RootContainer = () => {
  const [chatWith, openChatWith] = useState<Contact>();

  const onContactClick = useCallback(
    (contact: Contact) => {
      openChatWith(contact);
    },
    [openChatWith]
  );

  return (
    <div className={rootContainer}>
      <Header contactsState={contactsState} />
      <div className={chatZone}>
        <MainContainer>
          <Contacts
            onContactClick={onContactClick}
            activeChat={chatWith}
            contactsState={contactsState}
          />
          {chatWith !== undefined && (
            <Chat messageState={messageState} chatWith={chatWith} />
          )}
        </MainContainer>
      </div>

    </div>
  );
};
