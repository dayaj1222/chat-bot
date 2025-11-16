export function runCommands(
    command: string | undefined,
    setMessages: React.Dispatch<any>,
) {
    if (!command) return;

    switch (command) {
        case "clear":
            setMessages([]);
            break;
    }
}
