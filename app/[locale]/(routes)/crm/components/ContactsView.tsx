"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { columns } from "../contacts/table-components/columns";
import { NewContactForm } from "../contacts/components/NewContactForm";
import { ContactsDataTable } from "../contacts/table-components/data-table";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const ContactsView = ({ data, crmData }: any) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const { users, accounts } = crmData;

  return (
    <>
      <Sheet open={open} onOpenChange={() => setOpen(false)}>
        <SheetContent className="min-w-[1000px] space-y-2">
          <SheetHeader>
            <SheetTitle>Create new Contact</SheetTitle>
          </SheetHeader>
          <div className="h-full overflow-y-auto">
            <NewContactForm
              users={users}
              accounts={accounts}
              onFinish={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>

      {!data || data.length === 0 ? (
        "No assigned contacts found"
      ) : (
        <ContactsDataTable
          data={data}
          columns={columns}
          users={users}
          accounts={accounts}
          onCreateClick={() => setOpen(true)}
        />
      )}
    </>
  );
};

export default ContactsView;
