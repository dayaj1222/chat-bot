import { useState } from "react";
import { Send } from "lucide-react";
import { useSession } from "../hooks/useSession";
import OpenAI from "openai";
import { parseResponse, createRequest } from "../utils/parsers.ts";
import { runCommands } from "../utils/commands.ts";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

import type { Message, Response } from "../types.ts";

function InputBox() {
  const [input, setInput] = useState<string>("");
  const { messages, setMessages, setLoading } = useSession();

  const prePrompt: string = `
You are an agent performing tasks using the last 10 messages as context. Only call a command when explicitly instructed by the user. Commands are most explicit when the user types "/" before a word. Maintain a normal conversation otherwise.

To call a command, append it after this sequence: !@#$ <Command> at the end of your response.

Available commands:
1. clear: Clears all message history stored in this app.
`;

  async function reply(message: string): Promise<Response> {
    const prompt = prePrompt + message;
    const client: OpenAI = new OpenAI({
      apiKey: GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
      dangerouslyAllowBrowser: true,
    });

    const response = await client.responses.create({
      model: "openai/gpt-oss-20b",
      input: prompt,
    });

    return parseResponse(response.output_text);
  }

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;
    const messageObj: Message = {
      sender: "User",
      message,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, messageObj]);
    setInput("");
    try {
      setLoading(true);
      const request = createRequest(messages);
      const response = await reply(request);
      const replyObj: Message = {
        sender: "Ai",
        message: response.message,
        command: response.command || "",
        timestamp: Date.now(),
      };
      if (response.command) runCommands(response.command, setMessages);
      setMessages((prev) => [...prev, replyObj]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 h-1/12 bg-[#1e1e2e]">
      <input
        className="border w-full h-full bg-[#45475a] rounded-4xl pl-4 
             focus:outline-none focus:ring-2 focus:ring-[#b4befe] text-[#cdd6f4] text-lg"
        placeholder="Enter Message to Send or / to give special commands."
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(input);
            setInput("");
          }
        }}
      />
      <button
        className="
    p-2 
    bg-[#313244] 
    text-[#b4befe] 
    rounded 
    transition-colors duration-200
    hover:bg-[#45475a] hover:text-[#f5e0dc]
    active:outline-none active:ring-2 active:ring-[#b4befe]
    active:scale-95
  "
        onClick={() => sendMessage(input)}
      >
        <Send size={30} />
      </button>
    </div>
  );
}

export default InputBox;
