import { X } from "lucide-react";
import type React from "react";
type Prop = {
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function InfoPage({ setShowInfo }: Prop) {
  return (
    <div className="fixed inset-0 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-[#1e1e2e] rounded-2xl p-6 max-w-md w-full mx-4 border border-[#585b70] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#b4befe] text-2xl font-semibold">
            About This App
          </h2>
          <X
            className="text-[#cdd6f4] hover:text-[#b4befe] cursor-pointer transition duration-300"
            onClick={() => setShowInfo(false)}
          />
        </div>
        <div className="text-[#cdd6f4] space-y-3">
          <p className="text-sm">
            <strong className="text-[#89b4fa]">Version:</strong> 1.0.0
          </p>
          <p className="text-sm">
            <strong className="text-[#89b4fa]">Description:</strong> An
            intelligent AI chat assistant powered by advanced language models.
          </p>
          <p className="text-sm">
            <strong className="text-[#89b4fa]">Features:</strong>
          </p>
          <ul className="text-sm list-disc list-inside ml-2 space-y-1">
            <li>Real-time conversational AI</li>
            <li>Beautiful Catppuccin Mocha theme</li>
            <li>Context-aware conversations (remembers last 10 messages)</li>
            <li>Command execution support</li>
            <li>Message history management</li>
            <li>Smooth animations & auto-scroll</li>
          </ul>
          <p className="text-sm">
            <strong className="text-[#89b4fa]">Available Commands:</strong>
          </p>
          <ul className="text-sm list-disc list-inside ml-2 space-y-1">
            <li>
              <code className="text-[#f9e2af]">/clear</code> - Clear all
              messages
            </li>
            <li>
              <code className="text-[#f9e2af]">/summarize</code> - Summarize the
              conversation so far
            </li>
            <li>
              <code className="text-[#f9e2af]">/eli5</code> - Explain the last
              response like I'm 5
            </li>
            <li>
              <code className="text-[#f9e2af]">/detailed</code> - Get a more
              detailed response
            </li>
            <li>
              <code className="text-[#f9e2af]">/tldr</code> - Get an ultra-short
              response
            </li>
          </ul>
          <p className="text-sm text-[#a6adc8] pt-2">
            Made with ❤ using React and TypeScript
          </p>
        </div>
      </div>
    </div>
  );
}
