import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/")
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch(() => {
        setMessage("Backend not connected");
      });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Enterprise Playwright Automation Platform</h1>

      <h2>{message}</h2>
    </div>
  );
}

export default App;
