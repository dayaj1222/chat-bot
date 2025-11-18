import type { Message } from "../types.ts";
import ReactMarkdown from "react-markdown";

type MessageBubbleType = {
  message?: Message;
};

export function MessageBubble({ message }: MessageBubbleType) {
  return (
    <div
      className={`text-[#cdd6f4] m-1 px-4 py-2 rounded-2xl max-w-[70%] ${
        message?.sender === "Ai"
          ? "mr-auto bg-[#45475a]"
          : "ml-auto bg-[#585b70]"
      }`}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ml-4 mb-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ml-4 mb-2">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,
        }}
      >
        {message?.message || ""}
      </ReactMarkdown>
    </div>
  );
}
