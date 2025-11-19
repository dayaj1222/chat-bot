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
            <strong className="text-[#89b4fa]">Description:</strong> An AI chat
            assistant with task management and weather features.
          </p>{" "}
          <p className="text-sm">
            <strong className="text-[#89b4fa]">Available Commands:</strong>
          </p>
          <ul className="text-sm list-disc list-inside ml-2 space-y-1">
            <li>
              <code className="text-[#f9e2af]">/clear</code> - Clear message
              history.
            </li>
            <li>
              <code className="text-[#f9e2af]">/concise</code> - Explain the
              last message in short.
            </li>
            <li>
              <code className="text-[#f9e2af]">/Explain</code> - Explain the
              last message in details.
            </li>

            <li>
              <code className="text-[#f9e2af]">/task &lt;description&gt;</code>{" "}
              - Add a new task
            </li>
            <li>
              <code className="text-[#f9e2af]">/get-tasks</code> - View all
              tasks
            </li>
            <li>
              <code className="text-[#f9e2af]">/clear-task</code> - Delete all
              tasks
            </li>
            <li>
              <code className="text-[#f9e2af]">/weather &lt;city&gt;</code> -
              Get weather for a city
            </li>
          </ul>
          <p className="text-sm text-[#a6adc8] pt-2">
            Built with Tauri, React & Rust
          </p>
        </div>
      </div>
    </div>
  );
}
