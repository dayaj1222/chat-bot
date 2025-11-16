import type { Message } from "../types.ts";

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
      {message?.message}
    </div>
  );
}
