import type { Command, Message } from "../types.ts";
import { invoke } from "@tauri-apps/api/core";

export async function runCommands(
    command: Command,
    setMessages: React.Dispatch<any>,
) {
    if (!command) return;

    console.log("Received command:", command);
    console.log("Command action:", command.action);

    switch (command.action) {
        case "clear":
            setMessages([]);
            break;
        case "task":
            try {
                await invoke("save_task", {
                    task: {
                        id: 0,
                        task: command.params.description,
                    },
                });
                console.log("Task saved successfully");
            } catch (error) {
                console.error("Failed to save task:", error);
            }
            break;
        case "get_tasks":
            console.log("GET_TASKS CASE HIT!");
            try {
                const tasks =
                    await invoke<Array<{ id: number; task: string }>>(
                        "view_tasks",
                    );
                console.log("Tasks fetched:", tasks);
                const taskList =
                    tasks.length > 0
                        ? tasks.map((t) => `${t.id}. ${t.task}`).join("\n")
                        : "No tasks found.";
                const message: Message = {
                    sender: "Ai",
                    message: taskList,
                    timestamp: new Date().getTime(),
                };
                console.log("received messages", message);
                setMessages((prev: Message[]) => [...prev, message]);
            } catch (error) {
                console.error("Failed to fetch tasks:", error);
            }
            break;
        default:
            console.log("Unknown command action:", command.action);
    }
}
