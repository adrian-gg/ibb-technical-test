"use client";

import ItemList from "@/components/shared/item-list/ItemList";
import useData from "@/storages/useData";
import { Loader2 } from "lucide-react";
import ItemContact from "./_components/ItemContact";

type Props = React.PropsWithChildren<object>;

const ContactsLayout = ({ children }: Props) => {
  const { contacts } = useData();

  return (
    <>
      <ItemList title="Contacts">
        {contacts ? (
          contacts.length === 0 ? (
            <p className="w-full h-full flex justify-center items-center">
              No contacts fount.
            </p>
          ) : (
            contacts.map((contact) => (
              <ItemContact key={contact.id} item={contact} />
            ))
          )
        ) : (
          <Loader2 />
        )}{" "}
      </ItemList>
      {children}
    </>
  );
};

export default ContactsLayout;
