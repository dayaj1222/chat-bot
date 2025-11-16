import type { Message, Response } from "../types.ts";

export function parseResponse(response: string): Response {
    const index = response.indexOf("!@#$");
    if (index === -1) return { message: response };
    return {
        message: response.slice(0, index).trim(),
        command: response.slice(index + 4).trim(),
    };
}

export function createRequest(messages: Message[]): string {
    return messages
        .slice(-10)
        .map((message) =>
            message.sender === "Ai"
                ? `AI: ${message.message}`
                : `User: ${message.message}`,
        )
        .join("\n");
}
