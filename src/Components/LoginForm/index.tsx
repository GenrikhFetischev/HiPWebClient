import React, { useCallback, useState } from "react";
// @ts-ignore
import { Loader } from "@chatscope/chat-ui-kit-react";
import { authenticate } from "../../api";
import { extractInputChange } from "../../uiHelpers";
import { formContainer, submit } from "./styles";

export type LoginFormProps = {
  onLogin: (jwt: string, host: string) => void;
};

const defaultHost = "localhost:5555";

export const LoginForm = (props: LoginFormProps) => {
  const [pass, setPass] = useState<string>();
  const [host, setHost] = useState<string>(defaultHost);
  const [isLoading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async () => {
    if (!pass || !host) {
      return;
    } else {
      setLoading(true);
      const jwt = await authenticate(pass, host);
      props.onLogin(jwt, host);
    }
  }, [pass, host, props.onLogin]);

  const onHostChange = useCallback(extractInputChange(setHost), [setHost]);
  const onPassChange = useCallback(extractInputChange(setPass), [setPass]);

  return (
    <div className={formContainer}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <label htmlFor="Host">
            <span>host</span>
          </label>
          <input
            type="text"
            id="host"
            onChange={onHostChange}
            defaultValue={defaultHost}
          />
          <label htmlFor="Password">
            <span>password</span>
          </label>
          <input type="password" id="password" onChange={onPassChange} />
          <button className={submit} onClick={onSubmit}>
            Login
          </button>
        </>
      )}
    </div>
  );
};
