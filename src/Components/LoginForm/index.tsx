import React, { FormEvent, useCallback, useState } from "react";
// @ts-ignore
import { Loader } from "@chatscope/chat-ui-kit-react";
import { authenticate } from "../../api";
import { extractInputChange } from "../../uiHelpers";
import { formContainer, header, root, submit } from "./styles";
import { input } from "../AddContactForm/styles";

export type LoginFormProps = {
  onLogin: (jwt: string, host: string) => void;
};

const defaultHost = "localhost:5555";

export const LoginForm = (props: LoginFormProps) => {
  const [pass, setPass] = useState<string>();
  const [host, setHost] = useState<string>(defaultHost);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
      e.preventDefault();
      if (!pass || !host) {
        return;
      } else {
        setLoading(true);
        try {
          const jwt = await authenticate(pass, host);
          props.onLogin(jwt, host);
        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      }
    },
    [pass, host, props.onLogin]
  );

  const onHostChange = useCallback(extractInputChange(setHost), [setHost]);
  const onPassChange = useCallback(extractInputChange(setPass), [setPass]);

  return (
    <div className={root}>
      <h1 className={header}>HiP</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={formContainer} onSubmit={onSubmit}>
          <label htmlFor="Host">
            <span>Your private host</span>
          </label>
          <input
            className={input}
            placeholder="e.g: 123.4.5.6:3001"
            type="text"
            id="host"
            onChange={onHostChange}
            defaultValue={defaultHost}
          />
          <label htmlFor="Password">
            <span>Password</span>
          </label>
          <input
            className={input}
            type="password"
            id="password"
            onChange={onPassChange}
          />
          <button className={submit} onClick={onSubmit}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};
