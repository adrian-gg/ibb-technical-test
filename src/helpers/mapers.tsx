import { getChildren, getNodeById } from "@/app/sdk/sdk";
import getAvatar from "./generateAvatar";

export const mapUser = (user: Iberbox.UserInfo): IberboxMapped.UserType => {
  const fullName = `${user.firstname} ${user.lastname}`;
  return {
    id: null,
    handle: null,
    avatar: getAvatar(user.email),
    name: fullName,
    email: user.email,
  };
};

export const mapContacts = (
  contacts: Iberbox.NodeList
): IberboxMapped.ContactList => {
  return contacts.map((contact) => ({
    id: contact.id,
    handle: contact.handle,
    avatar: getAvatar(contact.handle),
    name: contact.name,
    email: contact.contact,
  }));
};

export const mapInboxes = (
  inboxes: Iberbox.NodeList
): IberboxMapped.InboxList => {
  return inboxes.map((inbox) => ({
    id: inbox.id,
    handle: inbox.handle,
    name: inbox.name,
    description: inbox.subject,
    ctime: inbox.ctime,
  }));
};

export const mapOutboxes = (
  outboxes: Iberbox.NodeList
): IberboxMapped.OutboxList => {
  return outboxes.map((outbox) => {
    const contact = getNodeById(outbox.contact);
    const mappedContact = contact
      ? mapContacts([contact as Iberbox.Node])[0]
      : null;

    return {
      id: outbox.id,
      handle: outbox.handle,
      name: outbox.name,
      description: outbox.subject,
      ctime: outbox.ctime,
      contact: mappedContact,
    } as IberboxMapped.OutboxType;
  });
};

export const mapFiles = (
  files: Iberbox.NodeList,
  user: IberboxMapped.UserType
): IberboxMapped.FileList => {
  return files.map((file) => {
    const parent = getNodeById(file.parentHandle) as Iberbox.Node;
    const mappedFiles = {
      id: file.id,
      handle: file.handle,
      ctime: file.ctime,
      name: file.name.split(".").slice(0, -1).join("."),
      format: file.name.split(".").pop(),
      size: file.size,
      fromContact: null,
    } as IberboxMapped.FileType;

    if (parent?.contact === "") {
      mappedFiles.fromContact = user;
    } else {
      mappedFiles.fromContact = mapContacts([
        getNodeById(parent.contact) as Iberbox.Node,
      ])[0];
    }

    return mappedFiles;
  }) as IberboxMapped.FileList;
};

export const mapRecords = (
  type: "contact" | "inbox" | "outbox",
  records: Iberbox.NodeList,
  user: IberboxMapped.UserType
): IberboxMapped.RecordList => {
  const files = records.map((record) => getChildren(record.handle)).flat();
  const filesMapped = mapFiles(files, user) as IberboxMapped.FileList;

  const recordsFiles = filesMapped.map((file) => {
    return {
      type: "file",
      content: { ...file },
    };
  });

  const textsMapped = records.map((record) => {
    const mappedRecord: IberboxMapped.TextType = {
      id: record.id,
      handle: record.handle,
      ctime: record.ctime,
      content: record.message,
      fromContact: null,
    };

    if (record.contact === "") {
      mappedRecord.fromContact = user;
    } else {
      mappedRecord.fromContact = mapContacts([
        getNodeById(record.contact) as Iberbox.Node,
      ])[0];
    }

    return mappedRecord;
  }) as IberboxMapped.TextType[];

  const recordsTexts = textsMapped.map((text) => {
    return {
      type: "text",
      content: { ...text },
    };
  });

  return [...recordsFiles, ...recordsTexts] as IberboxMapped.RecordList;
};
