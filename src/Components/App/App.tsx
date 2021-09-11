import React, { useCallback, useEffect, useState } from "react";

import { RootContainer } from "../RootContainer";
import { LoginForm } from "../LoginForm";
import { contactsState } from "../../entities/contactsState";
import { messageState } from "../../entities/messageState";
import {
  getPersistedValue,
  persistValue,
  removePersistedValue,
} from "../../clientPersistence";

export const App = () => {
  const [isLoggedIn, setLogin] = useState(false);

  useEffect(() => {
    const savedJwt = getPersistedValue("jwt");
    const savedHost = getPersistedValue("host");

    if (savedHost && savedJwt) {
      contactsState.setJwtAndHost(savedJwt, savedHost);
      messageState.setJwtAndHost(savedJwt, savedHost);

      messageState
        .initializeChat()
        .then(contactsState.fetchContacts)
        .then(() => setLogin(true))
        .catch((e) => {
          console.error(e);
          removePersistedValue("jwt");
          removePersistedValue("host");
        });
    }
  }, []);

  const onLogin = useCallback(
    async (jwt: string, host: string) => {
      contactsState.setJwtAndHost(jwt, host);
      messageState.setJwtAndHost(jwt, host);

      await messageState.initializeChat();
      await contactsState.fetchContacts();

      persistValue("jwt", jwt);
      persistValue("host", host);

      setLogin(true);
    },
    [contactsState, messageState]
  );

  return (
    <div>
      {isLoggedIn ? <RootContainer /> : <LoginForm onLogin={onLogin} />}
    </div>
  );
};
