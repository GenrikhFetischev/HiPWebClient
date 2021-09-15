import React from "react";
import { observer } from "mobx-react-lite";

import {
  Sidebar,
  Conversation,
  Avatar,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { Contact, ContactsState } from "../../entities/contactsState";
import { avatarStub, conversation, sidebar } from "./styles";

export type ContactsUiProps = {
  onContactClick: (contact: Contact) => void;
  activeChat?: Contact;
  contacts: Contact[];
};

export const ContactsUi = ({
  contacts,
  onContactClick,
  activeChat,
}: ContactsUiProps) => {
  return (
    <div>
      <Sidebar position="left" scrollable className={sidebar}>
        {contacts.map((contact) => (
          <Conversation
            className={conversation}
            name={contact.name}
            key={contact.name}
            active={contact.host === activeChat?.host}
            onClick={() => {
              console.log("clicked");
              onContactClick(contact);
            }}
          >
            <Avatar
              children={<div className={avatarStub}>{contact.name}</div>}
              name={contact.name}
            />
          </Conversation>
        ))}
      </Sidebar>
    </div>
  );
};

export type ContactsProps = {
  onContactClick: (contact: Contact) => void;
  activeChat?: Contact;
  contactsState: ContactsState;
};

export const Contacts = observer(
  ({ contactsState, ...rest }: ContactsProps) => {
    const contacts = [...contactsState.contacts.values()];

    return <ContactsUi {...rest} contacts={contacts} />;
  }
);
