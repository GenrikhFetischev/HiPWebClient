import { css } from "@emotion/css";

export const formContainer = css`
  background: lightgray;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 25px 25px;
  padding: 10px;
  border: 1px solid gray;
`;

export const submit = css`
  padding: 10px;
  grid-column-end: 3;
  grid-column-start: 1;
`;
export const root = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const header = css`
  position: absolute;
  left: 10px;
  top: 10px;
`;
