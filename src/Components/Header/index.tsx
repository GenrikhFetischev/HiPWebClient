import React, { useState } from "react";
import { ContactsState } from "../../entities/contactsState";
import { addContactFormContainer, button, headerContainer } from "./styles";
import { AddContactForm } from "../AddContactForm";

type Props = {
  contactsState: ContactsState;
};

export const Header = ({ contactsState }: Props) => {
  const [addContactShown, toggleAddContactMenu] = useState(false);

  return (
    <header className={headerContainer}>
      <h1>HiP</h1>
      <button
        className={button}
        onClick={() => toggleAddContactMenu(!addContactShown)}
      >
        {addContactShown ? "Hide add contact form" : "Add contact"}
      </button>

      {addContactShown && (
        <div className={addContactFormContainer}>
          <AddContactForm
            contactsState={contactsState}
            onClose={() => toggleAddContactMenu(false)}
          />
        </div>
      )}
    </header>
  );
};
