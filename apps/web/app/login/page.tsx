"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = ["Patient", "Receptionist", "Doctor", "Nurse", "Laboratory Technician", "Billing Officer", "Hospital Administrator"];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Patient");
  const [error, setError] = useState("");

  function enterDemo(e: React.FormEvent) {
    e.preventDefault();
    const clean = email.trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    const demoSession = { email: clean, role, displayName: clean.split("@")[0].replace(/[._-]/g, " "), createdAt: new Date().toISOString() };
    localStorage.setItem("medicore-demo-session", JSON.stringify(demoSession));
    router.replace("/");
  }

  return (
    <main className="login-shell">
      <section className="login-card">
        <div className="login-brand"><span className="brand-mark">✚</span><div><strong>MediCore</strong><small>Hospital operations demo</small></div></div>
        <div className="login-eyebrow">WELCOME BACK</div>
        <h1>Sign in to your workspace</h1>
        <p className="muted">Use a demo email to enter the interactive hospital dashboard.</p>
        <form onSubmit={enterDemo}>
          <label htmlFor="email">Email address</label>
          <input id="email" className="field" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          <label htmlFor="role">Workspace role</label>
          <select id="role" className="field" value={role} onChange={e => setRole(e.target.value)}>
            {roles.map(r => <option key={r}>{r}</option>)}
          </select>
          {error && <p className="login-error">{error}</p>}
          <button className="button login-button" type="submit">Enter MediCore →</button>
        </form>
        <div className="login-note"><strong>Free demo · no database needed</strong><p>This creates a local demo session in this browser. No password is collected, no account is verified, and this is not real authentication. Use synthetic data only.</p></div>
        <footer>Educational project · Not for real patient records</footer>
      </section>
    </main>
  );
}
