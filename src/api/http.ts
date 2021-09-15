import { Contact, NewContact } from "../entities/contactsState";
import { Message } from "../entities/messageState";

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

export const createContact = async ({
  contact,
  jwt,
  host,
}: {
  contact: NewContact;
  jwt: string;
  host: string;
}) => {
  try {
    const response = await fetch(`http://${host}/contacts/create`, {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        token: jwt,
        "Content-Type": "application/json",
      },
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

export const fetchMessages = async ({
  host,
  jwt,
  chatId,
}: {
  jwt: string;
  host: string;
  chatId: string;
}): Promise<Message[]> => {
  try {
    const response = await fetch(`http://${host}/messages?chatId=${chatId}`, {
      method: "GET",
      headers: {
        token: jwt,
      },
    });
    if (response.status === 200) {
      return response.json();
    } else {
      throw response;
    }
  } catch (e) {
    throw e;
  }
};
