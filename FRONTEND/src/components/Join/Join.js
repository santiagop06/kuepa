import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

export default function Join({ setRoute, setRole, username, setUsername }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [password, setPassword] = useState("");

  const onSubmit = () => {
    fetch("https://safe-inlet-54157.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          setRole(user.role);
          console.log(user.role);

          setRoute("chat");
        } else {
          alert("usuario incorrecto");
        }
      });
  };

  const onSubmitRegister = () => {
    setRoute("register");
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading"> SIGN IN</h1>
        <div>
          <input
            placeholder="username"
            className="joinInput"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="password"
            className="joinInput mt-20"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="button mt-20"
          onClick={async (e) => await onSubmit()}
          type="submit"
        >
          Sign In
        </button>
        <button
          className="button mt-20"
          onClick={async (e) => await onSubmitRegister()}
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}
