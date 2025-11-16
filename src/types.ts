export type Sender = "Ai" | "User";

export type Message = {
    sender: Sender;
    message: string;
    command?: string;
    timestamp: number;
};

export type Response = {
    message: string;
    command?: string;
};
