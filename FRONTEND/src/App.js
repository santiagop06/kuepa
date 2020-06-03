import React, { useState, useEffect } from "react";
import Particles from "react-particles-js";
import "./App.css";
import "tachyons";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import Register from "./components/Register/Register";

import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  const [route, setRoute] = useState(localStorage.getItem("route") || "home");
  const [role, setRole] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  useEffect(() => {
    localStorage.setItem("route", route);
  }, [route]);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  return (
    <div className="App">
      <Particles
        className="particles"
        params={{
          fpslimit: 60,
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#001B44",
            },
            line_linked: {
              color: "#ccc",
            },
          },
        }}
      />

      {route === "home" ? (
        <Join
          setRoute={setRoute}
          setRole={setRole}
          setUsername={setUsername}
          username={username}
        />
      ) : route === "register" ? (
        <div>
          <a
            className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-gray left ml1"
            onClick={() => setRoute("home")}
          >
            atras
          </a>
          <Register setRoute={setRoute} />
        </div>
      ) : (
        <div>
          <a
            className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-gray left ml1"
            onClick={() => setRoute("home")}
          >
            atras
          </a>
          <Chat username={username} role={role} setRoute={setRoute} />
        </div>
      )}
    </div>
    // <Router>
    // <Route path="/" exact component={Join} />
    //<Route path="/chat" component={Chat} />
    //</Router>
  );
};

export default App;
