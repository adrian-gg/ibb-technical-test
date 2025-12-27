"use client";

import {
  mapContacts,
  mapInboxes,
  mapOutboxes,
  mapRecords,
  mapUser,
} from "@/helpers/mapers";
import { create } from "zustand";
import {
  getChildren,
  getContacts,
  getInboxes,
  getNodeById,
  getReceivedRecords,
  getUserInfo,
} from "../app/sdk/sdk";

type useDataProps = {
  user: IberboxMapped.UserType | null;
  contacts: IberboxMapped.ContactList;
  inboxes: IberboxMapped.InboxList;
  outboxes: IberboxMapped.OutboxList;
  currentRecords: IberboxMapped.RecordList;
  currentChat?: IberboxMapped.ChatType | null;
  setUser: () => void;
  setContacts: () => void;
  setInboxes: () => void;
  setOutboxes: () => void;
  setCurrentChat: (
    type: "inbox" | "contact" | "outbox",
    handle: string
  ) => void;
};

const getRecords = (
  itemType: "contact" | "inbox" | "outbox",
  handle: string
) => {
  let records;
  if (itemType === "contact") {
    const inboxesRecords = getReceivedRecords().filter(
      (record) => record.contact === handle
    );
    const outboxesRecords = getChildren(handle as Iberbox.NodeHandle)
      .map((child) => {
        return getChildren(child.handle);
      })
      .flat();

    records = [...inboxesRecords, ...outboxesRecords];
  } else if (itemType === "inbox") {
    const inboxesRecords = getChildren(handle as Iberbox.NodeHandle);
    records = inboxesRecords;
  } else {
    const outboxesRecords = getChildren(handle as Iberbox.NodeHandle);
    records = outboxesRecords;
  }

  return records;
};

const defaultData = {
  user: null,
  contacts: [],
  inboxes: [],
  outboxes: [],
  currentRecords: [],
  currentChat: null,
};

const useData = create<useDataProps>()((set, get) => ({
  user: defaultData.user,
  contacts: defaultData.contacts,
  inboxes: defaultData.contacts,
  outboxes: defaultData.contacts,
  currentRecords: defaultData.currentRecords,
  currentChat: defaultData.currentChat,
  setUser: () => {
    const user = getUserInfo();
    const userMapped = mapUser(user);
    set({ user: userMapped });
  },
  setContacts: () => {
    const contacts = getContacts();
    const contactsMapped = mapContacts(contacts);
    set({ contacts: contactsMapped });
  },
  setInboxes: () => {
    const inboxes = getInboxes();
    const inboxesMapped = mapInboxes(inboxes);
    set({ inboxes: inboxesMapped });
  },
  setOutboxes: () => {
    const { contacts } = get();
    const outboxes = contacts
      .map((contact) =>
        getChildren(contact.handle).map((child) => ({
          ...child,
          contact: contact.handle,
        }))
      )
      .flat();
    const outboxesMapped = mapOutboxes(outboxes);
    set({ outboxes: outboxesMapped });
  },
  setCurrentChat: (
    type: "inbox" | "contact" | "outbox",
    handle: Iberbox.NodeHandle
  ) => {
    set({ currentChat: undefined });
    const { user, outboxes } = get();
    const itemSelected = getNodeById(handle);
    if (itemSelected === undefined) return set({ currentChat: null });

    //setBodyChat
    const records = getRecords(type, handle);
    const currentRecordsMapped = user ? mapRecords(type, records, user) : null;
    const sortedRecordsByTime = currentRecordsMapped
      ? (currentRecordsMapped.sort((a, b) => {
          return b.content.ctime - a.content.ctime;
        }) as IberboxMapped.RecordList)
      : null;

    const newChat: IberboxMapped.ChatType = {
      type: type,
      header: {
        contact: null,
        name: null,
        description: null,
      },
      body: sortedRecordsByTime,
    };

    //setHeaderChat
    if (type === "inbox") {
      newChat.header.name = itemSelected?.name as string;
      newChat.header.description = itemSelected?.subject as string;
    } else if (type === "contact") {
      newChat.header.contact = mapContacts([itemSelected as Iberbox.Node])[0];
    } else if (type === "outbox") {
      newChat.header.name = itemSelected?.name as string;
      newChat.header.description = itemSelected?.subject as string;
      newChat.header.contact = outboxes.find(
        (outbox) => outbox.handle === handle
      )?.contact as IberboxMapped.ContactType;
    }
    set({ currentChat: newChat });
  },
}));

export default useData;
