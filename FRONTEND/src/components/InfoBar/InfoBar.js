import React from "react";
import "./InfoBar.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";

export default function InfoBar({ username, setRoute }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online image" />
        <h3>{username}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img
            src={closeIcon}
            alt="close image"
            onClick={() => setRoute("home")}
          ></img>
        </a>
      </div>
    </div>
  );
}
