"use client";

import React, { useEffect, useState } from "react";

import ProjectModuleMenu from "./menu-items/Projects";
import SecondBrainModuleMenu from "./menu-items/SecondBrain";
import InvoicesModuleMenu from "./menu-items/Invoices";
import ReportsModuleMenu from "./menu-items/Reports";
import DocumentsModuleMenu from "./menu-items/Documents";
import ChatGPTModuleMenu from "./menu-items/ChatGPT";
import EmployeesModuleMenu from "./menu-items/Employees";
import DataboxModuleMenu from "./menu-items/Databoxes";
import CrmModuleMenu from "./menu-items/Crm";
import ContactsModuleMenu from "./menu-items/Contacts";

import AdministrationMenu from "./menu-items/Administration";
import DashboardMenu from "./menu-items/Dashboard";
import EmailsModuleMenu from "./menu-items/Emails";
import { cn } from "@/lib/utils";

type Props = {
  modules: any;
  dict: any;
  build: number;
};

const ModuleMenu = ({ modules, dict, build }: Props) => {
  const [open, setOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col bg-muted/50 dark:bg-zinc-900/50 h-screen">
      <div
        className={` ${
          open ? "w-64" : "w-16"
        } flex flex-col relative transition-all duration-300 h-full`}
      >
        <div className="flex items-center h-20 px-4">
          <div className="flex items-center gap-3">
            <div
              className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-lg hover:bg-accent transition-colors ${
                !open && "mx-auto"
              }`}
              onClick={() => setOpen(!open)}
            >
              <span className="font-semibold text-lg">N</span>
            </div>

            <h1
              className={`font-medium text-sm transition-all duration-200 ${
                !open && "w-0 overflow-hidden"
              }`}
            >
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          <DashboardMenu open={open} title={dict.ModuleMenu.dashboard} />
          {modules.find(
            (menuItem: any) => menuItem.name === "crm" && menuItem.enabled
          ) ? (
            <CrmModuleMenu open={open} localizations={dict.ModuleMenu.crm} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "crm" && menuItem.enabled
          ) ? (
            <ContactsModuleMenu open={open} title={dict.ModuleMenu.contacts || "Contacts"} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "projects" && menuItem.enabled
          ) ? (
            <ProjectModuleMenu open={open} title={dict.ModuleMenu.projects} />
          ) : null}
          {modules.find(
            (menuItem: any) =>
              menuItem.name === "secondBrain" && menuItem.enabled
          ) ? (
            <SecondBrainModuleMenu open={open} title={dict.ModuleMenu.secondBrain || "Second brain"} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "invoice" && menuItem.enabled
          ) ? (
            <InvoicesModuleMenu open={open} title={dict.ModuleMenu.invoices} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "reports" && menuItem.enabled
          ) ? (
            <ReportsModuleMenu open={open} title={dict.ModuleMenu.reports} />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "documents" && menuItem.enabled
          ) ? (
            <DocumentsModuleMenu
              open={open}
              title={dict.ModuleMenu.documents}
            />
          ) : null}
          {modules.find(
            (menuItem: any) => menuItem.name === "openai" && menuItem.enabled
          ) ? (
            <ChatGPTModuleMenu open={open} />
          ) : null}
          <AdministrationMenu open={open} title={dict.ModuleMenu.settings} />
        </div>
      </div>
      <div
        className={cn("flex justify-center items-center w-full", {
          hidden: !open,
        })}
      >
        <span className="text-xs text-gray-500 pb-2">
          build: 0.0.3-beta-{build}
        </span>
      </div>
    </div>
  );
};

export default ModuleMenu;
