import { useEffect, useRef } from "react";
import { useSession } from "../hooks/useSession";
import { MessageBubble } from "../components/messageBubble.tsx";
import type { Message } from "../types.ts";

function ChatWindow() {
  let { messages, loading } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-10/12 bg-[#313244] overflow-y-auto pb-4">
      <div className="flex flex-col p-2 h-full gap-3">
        {messages.map((message: Message) => {
          return <MessageBubble key={message.timestamp} message={message} />;
        })}
        <div ref={messagesEndRef} className="text-[#45475a]">
          {"."}{" "}
        </div>
      </div>
      <div className="flex justify-center items-center w-full ">
        {loading && <span className="p-2 text-[#cad3f5]">Thinking...</span>}
      </div>
    </div>
  );
}

export default ChatWindow;
