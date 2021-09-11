import { useEffect, useState } from "react";
import { authenticate } from "../../api";

export const useAuth = (pass: string, host: string) => {
  const [jwt, setJwt] = useState<string>();

  useEffect(() => {
    authenticate(pass, host).then(setJwt);
  }, [pass]);

  return jwt;
};
