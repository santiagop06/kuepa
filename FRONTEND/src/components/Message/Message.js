import React, { useState } from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";

export default function Message({ name, message: { user, text, role } }) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  //

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return role && isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundModerate">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : role ? (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundModerate ">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  ) : isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox ">
        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
      </div>
      <p className="sentText pl-10">{user}</p>
    </div>
  );
}
