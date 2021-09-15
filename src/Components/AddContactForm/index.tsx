import React, { FormEvent, useCallback, useState } from "react";
import { ContactsState, NewContact } from "../../entities/contactsState";
import { extractInputChange } from "../../uiHelpers";
import { observer } from "mobx-react-lite";
import { button, form, input, label } from "./styles";

const checkInput = (input: Partial<NewContact>): input is NewContact => {
  const keys: Array<keyof NewContact> = ["name", "host"];
  return keys.every((key) => input[key] !== undefined);
};

type AddContactFormUiProps = {
  onSubmit: (contact: NewContact) => void;
};

export const AddContactFormUi = ({ onSubmit }: AddContactFormUiProps) => {
  const [state, setState] = useState<Partial<NewContact>>({});

  const onFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isFormFulfilled = checkInput(state);
      if (isFormFulfilled) {
        onSubmit(state);
      }
    },
    [state]
  );

  const onNameChange = useCallback(
    extractInputChange((name) => {
      setState({
        ...state,
        name,
      });
    }),
    [setState, state]
  );

  const onSocketChange = useCallback(
    extractInputChange((socket) => {
      setState({
        ...state,
        host: socket,
      });
    }),
    [setState, state]
  );
  return (
    <>
      <form onSubmit={onFormSubmit} className={form}>
        <label className={label} htmlFor="name">
          Name
        </label>
        <input
          className={input}
          type="text"
          id="name"
          onChange={onNameChange}
        />

        <label className={label} htmlFor="host">
          Host (without protocol)
        </label>
        <input
          className={input}
          type="text"
          id="host"
          onChange={onSocketChange}
          placeholder="e.g: 123.4.5.6:3001"
        />
      </form>

      <button className={button}>Add contact</button>
    </>
  );
};

export const AddContactForm = observer(
  ({ contactsState }: { contactsState: ContactsState }) => {
    return <AddContactFormUi onSubmit={contactsState.addContact} />;
  }
);
