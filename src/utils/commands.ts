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
        case "clear_tasks":
            console.log("CLEAR_TASK HIT");
            try {
                await invoke("clear_tasks");
            } catch (e) {
                console.log("Error", e);
            }
            break;
        case "get_weather":
            console.log("GET_WEATHER CASE HIT!");
            try {
                const weather = await invoke<{
                    temperature: number;
                    temperature_unit: string;
                    windspeed: number;
                    windspeed_unit: string;
                    winddirection: number;
                    is_day: boolean;
                    time: string;
                    city: string;
                    elevation: number;
                }>("fetch_weather", {
                    city: command.params.city || "Kathmandu",
                });
                console.log("Weather fetched:", weather);
                const weatherInfo = `**Weather in ${weather.city}:**

🌡 **Temperature:** ${weather.temperature}${weather.temperature_unit}  
💨 **Wind:** ${weather.windspeed} ${weather.windspeed_unit} from ${weather.winddirection}°  
${weather.is_day ? "☀ **Day**" : "🌙 **Night**"}  
⛰ **Elevation:** ${weather.elevation}m  
🕐 **Time:** ${weather.time}`;
                const message: Message = {
                    sender: "Ai",
                    message: weatherInfo,
                    timestamp: new Date().getTime(),
                };
                console.log("received messages", message);
                setMessages((prev: Message[]) => [...prev, message]);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
                const errorMessage: Message = {
                    sender: "Ai",
                    message: "Failed to fetch weather data.",
                    timestamp: new Date().getTime(),
                };
                setMessages((prev: Message[]) => [...prev, errorMessage]);
            }
            break;
        default:
            console.log("Unknown command action:", command.action);
    }
}
