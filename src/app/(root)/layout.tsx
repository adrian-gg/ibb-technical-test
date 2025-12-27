"use client";

import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";
import useData from "@/storages/useData";
import React, { useEffect } from "react";

type Props = React.PropsWithChildren<object>;

const HomeLayout = ({ children }: Props) => {
  const { contacts, inboxes, outboxes, setContacts, setInboxes, setOutboxes } =
    useData();

  useEffect(() => {
    if (contacts.length === 0) {
      setContacts();
    }
  }, [contacts, setContacts]);

  useEffect(() => {
    if (inboxes.length === 0) {
      setInboxes();
    }
  }, [inboxes, setInboxes]);

  useEffect(() => {
    if (contacts.length !== 0 && outboxes.length === 0) {
      setOutboxes();
    }
  }, [contacts, inboxes, outboxes, setInboxes, setOutboxes]);

  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default HomeLayout;
