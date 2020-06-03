import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "./Chat.css";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import { Player } from "video-react";
import "./../../../node_modules/video-react/dist/video-react.css";

let socket;

export default function Chat({ username, role, setRoute }) {
  const [room, setRoom] = useState("kuepa");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(localStorage.getItem("chat") || [""]);

  const ENDPOINT = "https://safe-inlet-54157.herokuapp.com/";
  useEffect(() => {
    socket = io(ENDPOINT);

    setRoom(room);

    socket.emit("join", { username, room, role }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div>
        <div>
          <Player
            playsInline
            poster="/assets/poster.png"
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
          />
        </div>
        <div className="container">
          <InfoBar username={username} setRoute={setRoute} />
          <Messages
            messages={messages}
            name={username}
            chat={chat}
            setChat={setChat}
          />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
