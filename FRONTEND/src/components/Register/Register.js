import React, { useState } from "react";

export default function Register({ setRoute }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);

  const onSubmit = () => {
    fetch("https://safe-inlet-54157.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        role: role,
      }),
    })
      .then((response) => response.json())
      .then((usr) => {
        if (usr.id) {
          setRoute("home");
        } else {
          alert("usuario existente");
        }
      });
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer ">
        <h1 className="heading "> REGISTER</h1>
        <div>
          <input
            placeholder="username"
            className="joinInput"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            placeholder="name"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setName(e.target.value)}
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
        <div>
          <select
            onChange={(e) => {
              setRole(e.target.value);
            }}
            className="joinInput mt-20" /* onChange={(e) => setValue(e.target.value)} */
          >
            <option value={false}>Estudiante</option>
            <option value={true}>Moderador</option>
          </select>
        </div>

        <button className="button mt-20" onClick={onSubmit}>
          Registrate
        </button>
      </div>
    </div>
  );
}
