import React, { useCallback, useMemo } from "react";

import {
  Conversation,
  Avatar,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";

import { Contact } from "../../entities/contactsState";
import { avatarStub, conversation } from "./styles";

type Props = {
  contact: Contact;
  isActive: boolean;
  onClick: (contact: Contact) => void;
};
export const ContactWidget = ({ contact, isActive, onClick }: Props) => {
  const onContactClick = useCallback(() => {
    onClick(contact);
  }, [contact, onClick]);

  const avatarStyles = useMemo(() => {
    return {
      background: `${"#" + (((1 << 24) * Math.random()) | 0).toString(16)}`,
      fontSize: `${Math.random() * 50}px`,
    };
  }, [contact.host]);

  return (
    <Conversation
      className={conversation}
      name={contact.name}
      key={contact.name}
      active={isActive}
      onClick={onContactClick}
    >
      <Avatar
        children={
          <div className={avatarStub} style={avatarStyles}>
            {contact.name}
          </div>
        }
        name={contact.name}
      />
    </Conversation>
  );
};
