declare global {
  namespace Iberbox {
    interface UserInfo {
      firstname: string;
      lastname: string;
      email: string;
    }

    type NodeHandle = string;

    interface Node {
      id: number;
      handle: NodeHandle;
      parentHandle: NodeHandle;
      name: string;
      contact: string;
      subject: string;
      message: string;
      ctime: number;
      size: number;
      external: number;
      type: number;
      replyTo: string;
    }

    type NodeList = Node[];
  }
  namespace IberboxMapped {
    interface UserType {
      id: null;
      handle: null;
      avatar: AvatarType;
      name: string;
      email: string;
    }

    interface ContactType extends UserType {
      id: number;
      handle: Iberbox.NodeHandle;
    }

    type ContactList = ContactType[];

    interface InboxType {
      id: number;
      handle: Iberbox.NodeHandle;
      ctime: number;
      name: string;
      description: string;
    }

    type InboxList = InboxType[];

    interface OutboxType {
      id: number;
      handle: Iberbox.NodeHandle;
      ctime: number;
      name: string;
      description: string;
      contact: ContactType;
    }

    type OutboxList = OutboxType[];

    interface FileType {
      id: number;
      handle: Iberbox.NodeHandle;
      ctime: number;
      name: string;
      format: string;
      size: number;
      fromContact: ContactType | UserType | null;
    }

    type FileList = FileType[] | [];

    interface TextType {
      id: number;
      handle: Iberbox.NodeHandle;
      ctime: number;
      content: string;
      fromContact: ContactType | UserType | null;
    }

    interface RecordType {
      type: "text" | "file";
      content: FileType | TextType;
    }

    type RecordList = RecordType[];

    interface ChatHeaderType {
      contact: ContactType | UserType | null;
      name: string | null;
      description: string | null;
    }

    interface ChatType {
      type: "inbox" | "outbox" | "contact";
      header: ChatHeaderType;
      body: RecordList | null;
    }
  }
}

export {};
