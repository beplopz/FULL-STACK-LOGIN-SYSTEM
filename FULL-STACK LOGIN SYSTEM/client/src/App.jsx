import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialForm = {
  name: "",
  email: "",
  password: ""
};

export default function App() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  };

  const resetFeedback = () => {
    setMessage("");
    setError("");
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setForm(initialForm);
    setUser(null);
    resetFeedback();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetFeedback();
    setIsSubmitting(true);

    const endpoint =
      mode === "register" ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed.");
      }

      setMessage(data.message);
      setUser(data.user);

      if (mode === "register") {
        setForm(initialForm);
      } else {
        setForm((current) => ({
          ...current,
          password: ""
        }));
      }
    } catch (requestError) {
      setError(requestError.message || "Something went wrong.");
      setUser(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-shell">
      <section className="auth-card">
        <p className="eyebrow">React + Node + Express + MongoDB</p>
        <h1>Full-Stack Login System</h1>
        <p className="subtitle">
          Create an account, save user data in MongoDB, and authenticate through
          an Express API.
        </p>

        <div className="mode-toggle" role="tablist" aria-label="Auth mode">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => switchMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "register" ? "active" : ""}
            onClick={() => switchMode("register")}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "register" && (
            <label>
              Full Name
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </label>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting
              ? "Please wait..."
              : mode === "register"
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        {message && <p className="feedback success">{message}</p>}
        {error && <p className="feedback error">{error}</p>}

        {user && (
          <div className="user-panel">
            <h2>Authenticated User</h2>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
