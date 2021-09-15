import { css } from "@emotion/css";

export const headerContainer = css`
  display: flex;
  align-content: center;
  align-items: center;
  height: 100px;
  padding: 0 10px;
  justify-content: space-between;
`;

export const button = css`
  padding: 10px;
`;

export const addContactFormContainer = css`
  position: absolute;
  right: 10px;
  top: 100px;
  z-index: 1;
  padding: 10px;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  background: lightgray;
`;
