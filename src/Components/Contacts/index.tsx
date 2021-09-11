import React from "react";
import { observer } from "mobx-react-lite";

import {
  Sidebar,
  Conversation,
  Avatar,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { Contact, ContactsState } from "../../entities/contactsState";

export type ContactsUiProps = {
  onContactClick: (contact: Contact) => void;
  activeChat?: Contact;
  contacts: Contact[];
};

const avatarStub =
  "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-10.jpg";

export const ContactsUi = ({
  contacts,
  onContactClick,
  activeChat,
}: ContactsUiProps) => {
  return (
    <div style={{ position: "relative", height: "500px" }}>
      <Sidebar position="left">
        {contacts.map((contact) => (
          <Conversation
            name={contact.name}
            key={contact.name}
            active={contact.socket === activeChat?.socket}
            onClick={() => {
              console.log("clicked");
              onContactClick(contact);
            }}
          >
            <Avatar src={avatarStub} name={contact.name} />
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
