import Header from "./components/header.tsx";
import ChatWindow from "./components/chat.window.tsx";
import InputBox from "./components/input.tsx";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Header />
      <ChatWindow />
      <InputBox />
    </div>
  );
}
