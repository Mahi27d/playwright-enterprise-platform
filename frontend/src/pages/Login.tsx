import { useState } from "react";
import axios from "axios";

type Props = {
  onLogin: () => void;
};

export default function Login({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post("http://localhost:8000/auth/login", { username, password });
      const token = res.data.access_token;
      if (token) {
        localStorage.setItem("token", token);
        onLogin();
      } else {
        setError("No token returned");
      }
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <br />
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Password</label>
          <br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Login</button>
        </div>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
