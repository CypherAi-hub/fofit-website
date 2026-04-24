import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth-context";

function initialsFor(user: { email?: string | null; user_metadata?: Record<string, unknown> } | null) {
  const name =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.name as string | undefined) ||
    user?.email ||
    "";
  const clean = name.replace(/[^a-zA-Z ]/g, "").trim();
  if (!clean) return "F";
  const parts = clean.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]!.toUpperCase()).join("");
}

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function onSignOut() {
    setOpen(false);
    await signOut();
    navigate("/", { replace: true });
  }

  return (
    <div className="user-menu" ref={ref}>
      <button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="user-menu__trigger"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {initialsFor(user)}
      </button>
      {open ? (
        <div className="user-menu__panel" role="menu">
          <div className="user-menu__header">
            <span className="user-menu__label">Signed in as</span>
            <strong>{user?.email}</strong>
          </div>
          <Link
            className="user-menu__item"
            onClick={() => setOpen(false)}
            role="menuitem"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <button
            className="user-menu__item user-menu__item--danger"
            onClick={onSignOut}
            role="menuitem"
            type="button"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
