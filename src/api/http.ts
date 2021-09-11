import { Contact } from "../entities/contactsState";

export const authenticate = async (
  password: string,
  host: string
): Promise<string> => {
  try {
    const response = await fetch(`http://${host}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (response.status === 200) {
      return response.text();
    } else {
      throw response;
    }
  } catch (e) {
    throw e;
  }
};

export const getContacts = async (
  jwt: string,
  host: string
): Promise<Contact[]> => {
  const contacts = fetch(`http://${host}/contacts`, {
    headers: {
      token: jwt,
    },
  }).then((r) => r.json());

  return contacts;
};
