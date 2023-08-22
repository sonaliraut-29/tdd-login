import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleInputUsername = (e) => {
    if (e.target.value) {
      setEmail(e.target.value);
      const emailErrorTemp =
        "" !== e.target.value &&
        !e.target.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
          ? true
          : false;
      setEmailError(emailErrorTemp);
    } else {
      setEmail("");
      setEmailError(true);
    }
  };

  const handleInputPassword = (e) => {
    if (e.target.value) {
      setPassword(e.target.value);
      const passwordErrorTemp =
        "" !== e.target.value && e.target.value.length <= 6 ? true : false;
      setPasswordError(passwordErrorTemp);
    } else {
      setPassword("");
      setPasswordError(true);
    }
  };
  const handleSubmit = () => {};
  return (
    <div className="App" data-testid="app">
      <div className="form_logo">
        Lo<span>g</span>o
      </div>
      <div className="form_title">
        Log<span>I</span>n
      </div>
      <div className="input-container" data-testid="input-username">
        <input
          type="text"
          placeholder="Username"
          onChange={handleInputUsername}
          value={email}
          data-testid="input-email"
        />
        <i className="zmdi zmdi-account zmdi-hc-lg"></i>
        {emailError && (
          <p data-testid="email-error">Email is required or invalid</p>
        )}
      </div>

      <div className="input-container">
        <input
          type="password"
          placeholder="Password"
          data-testid="input-password"
          onChange={handleInputPassword}
          value={password}
        />
        <i className="zmdi zmdi-lock zmdi-hc-lg"></i>
        {passwordError && (
          <p data-testid="password-error">Password is required or wrong</p>
        )}
      </div>

      <button
        type="button"
        data-testid="login-button"
        onClick={handleSubmit}
        disabled={emailError || password ? true : false}
      >
        Log In
      </button>
    </div>
  );
}

export default App;
