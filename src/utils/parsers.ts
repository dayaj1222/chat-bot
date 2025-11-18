import type { Message, Response } from "../types.ts";

export function parseResponse(response: string): Response {
    const startTag = "<COMMAND>";
    const endTag = "</COMMAND>";

    const startIndex = response.indexOf(startTag);
    const endIndex = response.indexOf(endTag);

    if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        return { message: response.trim(), command: undefined };
    }

    const commandStr = response
        .slice(startIndex + startTag.length, endIndex)
        .trim();

    let commandObj: Response["command"];
    try {
        commandObj = JSON.parse(commandStr);
    } catch {
        commandObj = undefined;
    }

    return {
        message: response.slice(0, startIndex).trim(),
        command: commandObj,
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
