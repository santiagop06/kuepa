import React from "react";
import "./Input.css";

export default function Input({ message, setMessage, sendMessage }) {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      ></input>
      <button className="sendButton" onClick={(e) => sendMessage(e)}>
        SEND
      </button>
    </form>
  );
}
