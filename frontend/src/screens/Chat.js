import { useState } from "react";
import io from "socket.io-client";

/* const socket = io("https://localhost:4000"); */
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("message", (msg) => {
  console.log(msg);
});

socket.on("broadcast", (fromServer) => {
  console.log(fromServer);
});

const Chat = () => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", message, (fromServer) => {
      console.log(fromServer);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
};

export default Chat;
