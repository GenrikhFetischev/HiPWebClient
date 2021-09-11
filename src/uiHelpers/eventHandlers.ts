import { ChangeEvent } from "react";

export const extractInputChange =
  (callback: (text: string) => void) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    callback(text);
  };
