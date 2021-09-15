import React from "react";
import { observer } from "mobx-react-lite";

import {
  Sidebar,
  // @ts-ignore
} from "@chatscope/chat-ui-kit-react";
import { Contact, ContactsState } from "../../entities/contactsState";
import { sidebar } from "./styles";
import { ContactWidget } from "../Contact";

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
          <ContactWidget
            contact={contact}
            isActive={contact.host === activeChat?.host}
            onClick={onContactClick}
          />
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
