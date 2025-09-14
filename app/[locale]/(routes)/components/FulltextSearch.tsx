"use client";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FileText,
  Users,
  FileCode,
  Mail,
  FolderOpen,
  BarChart,
  Settings
} from "lucide-react";

const FulltextSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      runCommand(() => {
        router.push(`/fulltext-search?q=${search}`);
        setSearch("");
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full max-w-md flex items-center justify-between h-9 rounded-full border border-input dark:border-zinc-700 bg-secondary/30 dark:bg-zinc-800/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-transparent transition-all duration-200 hover:bg-secondary/50 dark:hover:bg-zinc-800/70"
      >
        <div className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Search...</span>
        </div>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-muted-foreground/30 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search or jump to..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>
            {search ? (
              <div className="flex flex-col items-center gap-2">
                <p>No results found for "{search}"</p>
                <button
                  onClick={handleSearch}
                  className="text-sm text-primary hover:underline"
                >
                  Search globally →
                </button>
              </div>
            ) : (
              "No results found."
            )}
          </CommandEmpty>

          {search && (
            <CommandGroup heading="Actions">
              <CommandItem onSelect={handleSearch}>
                <SearchIcon className="mr-2 h-4 w-4" />
                <span>Search for "{search}"</span>
              </CommandItem>
            </CommandGroup>
          )}

          <CommandGroup heading="Quick Links">
            <CommandItem onSelect={() => runCommand(() => router.push("/crm"))}>
              <Users className="mr-2 h-4 w-4" />
              <span>CRM</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/projects"))}>
              <FolderOpen className="mr-2 h-4 w-4" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/documents"))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Documents</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/emails"))}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Emails</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/invoice"))}>
              <FileCode className="mr-2 h-4 w-4" />
              <span>Invoices</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/reports"))}>
              <BarChart className="mr-2 h-4 w-4" />
              <span>Reports</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/admin"))}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Administration</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default FulltextSearch;