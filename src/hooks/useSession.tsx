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
  let [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const sortMessages = () => {
      messages = messages.sort((a, b) => a.timestamp - b.timestamp);
    };
    sortMessages();
  }, [messages]);

  return (
    <SessionContext.Provider
      value={{ messages, setMessages, loading, setLoading }}
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
