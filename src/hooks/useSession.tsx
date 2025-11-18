import React, { useState, createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import type { Message } from "../types.ts";

type SessionContextType = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

type Props = {
  children: ReactNode;
};

export function SessionProvider({ children }: Props) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load messages from localStorage on initial mount
    const stored = localStorage.getItem("messages");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(false);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  // Wrapper to automatically sort messages when they're updated
  const setSortedMessages: React.Dispatch<React.SetStateAction<Message[]>> = (
    action,
  ) => {
    setMessages((prev) => {
      const newMessages = typeof action === "function" ? action(prev) : action;
      return [...newMessages].sort((a, b) => a.timestamp - b.timestamp);
    });
  };

  return (
    <SessionContext.Provider
      value={{ messages, setMessages: setSortedMessages, loading, setLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
