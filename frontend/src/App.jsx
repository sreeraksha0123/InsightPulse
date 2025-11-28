import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { login, seedDemo } from "./services/api.js";

const DEMO_EMAIL = "demo@insightpulse.com";
const DEMO_PASSWORD = "password123";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const doLogin = async () => {
      try {
        const stored = localStorage.getItem("insightpulse_auth");
        if (stored) {
          const parsed = JSON.parse(stored);
          setToken(parsed.token);
          setUser(parsed.user);
          setLoadingAuth(false);
          return;
        }
        const data = await login(DEMO_EMAIL, DEMO_PASSWORD);
        const authObj = { token: data.access_token, user: data.user };
        localStorage.setItem("insightpulse_auth", JSON.stringify(authObj));
        setToken(authObj.token);
        setUser(authObj.user);
      } catch (err) {
        console.error("Auto login failed:", err);
      } finally {
        setLoadingAuth(false);
      }
    };
    doLogin();
  }, []);

  const handleSeedDemo = async () => {
    try {
      await seedDemo();
      window.location.reload();
    } catch (err) {
      console.error("Failed to seed demo data", err);
      alert("Failed to seed demo data");
    }
  };

  if (loadingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Connecting to InsightPulse...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-semibold text-slate-800">
          InsightPulse — Demo Login Failed
        </h1>
        <p className="text-slate-600">
          Please ensure the backend is running on <code>http://localhost:8000</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onSeedDemo={handleSeedDemo} />
      <main className="flex-1 p-4 md:p-8">
        <Dashboard token={token} />
      </main>
    </div>
  );
}
