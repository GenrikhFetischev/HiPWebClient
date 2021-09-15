import { css } from "@emotion/css";

export const conversation = css`
  min-width: 150px;
`;
export const sidebar = css`
  border-right: solid 1px #d1dbe4;
`;

export const avatarStub = css`
  width: 40px;
  height: 40px;
  background: ${"#" + (((1 << 24) * Math.random()) | 0).toString(16)};
  border-radius: 50%;
  overflow: hidden;
  font-size: ${Math.random() * 50}px;
`;
