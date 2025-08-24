import { useState } from "react";

export default function Header() {
  const [dark, setDark] = useState(false);

  return (
    <header>
      <h1>Personal TimeLine</h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {/* Theme toggle checkbox */}
        <label className="theme-toggle-label" htmlFor="theme-toggle">
          Theme Toggle
        </label>
        <input
          type="checkbox"
          id="theme-toggle"
          checked={dark}
          onChange={() => setDark(!dark)}
          aria-pressed={dark}
        />
      </div>
    </header>
  );
}
