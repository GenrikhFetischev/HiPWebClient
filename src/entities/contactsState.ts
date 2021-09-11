import { makeAutoObservable } from "mobx";
import { getContacts } from "../api";

export type Contact = {
  created: string;
  ip: string;
  name: string;
  port: number;
  socket: string;
};

export class ContactsState {
  public contacts = new Map<string, Contact>();
  private jwt?: string;
  private host?: string;

  constructor() {
    makeAutoObservable(this);
  }

  public setJwtAndHost = (
    jwt: string,
    host: string,
    failAuthCallback?: () => void
  ) => {
    this.jwt = jwt;
    this.host = host;
  };

  public fetchContacts = async () => {
    const apiData = this.getApiData();
    if (!apiData) {
      return;
    }

    const contacts = await getContacts(apiData.jwt, apiData.host);

    contacts.forEach((contact) => {
      this.contacts.set(contact.socket, contact);
    });

    return this.contacts;
  };

  private getApiData = (): { jwt: string; host: string } | undefined => {
    const { jwt, host } = this;
    if (!jwt || !host) {
      console.warn("Provide jwt to ContactsStore before using api!");
      return;
    } else {
      return { jwt, host };
    }
  };
}

export const contactsState = new ContactsState();
