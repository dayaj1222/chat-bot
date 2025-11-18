export type Sender = "Ai" | "User";

export type Command = {
    action: string;
    params: Record<string, unknown>;
};

export type Message = {
    sender: Sender;
    message: string;
    command?: Command;
    timestamp: number;
};

export type Response = {
    message: string;
    command?: Command;
};
