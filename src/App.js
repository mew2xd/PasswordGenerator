import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [lengthstr, setLengthstr] = useState(17);
  const [num, setNum] = useState(false);
  const [spchar, setSpchar] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  function passwordGenerator() {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) {
      str += "1234567890";
    }
    if (spchar) {
      str += "!@#$%^&*`~";
    }

    let pass = "";
    for (let i = 0; i < parseInt(lengthstr); i++) {
      const rand = Math.floor(Math.random() * str.length);
      pass += str.charAt(rand);
    }
    setPassword(pass);
  }

  useEffect(passwordGenerator, [lengthstr, num, spchar]);

  function deflength(event) {
    setLengthstr(event.target.value);
  }

  function copyToClipboard() {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(passwordRef.current.value);
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div>
        <input
          type="text"
          value={password}
          placeholder="Password"
          id="length"
          ref={passwordRef}
          onChange={handlePasswordChange}
          className="password-input"
        />
        <button onClick={copyToClipboard} className="copy-button">
          Copy
        </button>
      </div>
      <div className="range-input">
        <input
          type="range"
          onChange={deflength}
          min={4}
          max={17}
          value={lengthstr}
        />
        <label>Length: {lengthstr}</label>
      </div>
      <div className="checkbox-label">
        <input
          type="checkbox"
          onChange={() => setNum((prev) => !prev)}
        />
        <label>Include Number</label>
      </div>
      <div className="checkbox-label">
        <input
          type="checkbox"
          onChange={() => setSpchar((prev) => !prev)}
        />
        <label>Include Special Characters</label>
      </div>
      <div>
        <button onClick={passwordGenerator} className="generate-button">
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
