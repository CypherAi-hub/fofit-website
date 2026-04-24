import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type AuthState = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};

type AuthActions = {
  signInWithGoogle: (redirectTo?: string) => Promise<{ error: string | null }>;
  signInWithMagicLink: (
    email: string,
    redirectTo?: string,
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | null>(null);

function buildRedirectUrl(path: string) {
  if (typeof window === "undefined") {
    return path;
  }
  return new URL(path, window.location.origin).toString();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
        setLoading(false);
      },
    );

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback<AuthActions["signInWithGoogle"]>(
    async (redirectTo = "/welcome") => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: buildRedirectUrl(redirectTo),
        },
      });
      return { error: error?.message ?? null };
    },
    [],
  );

  const signInWithMagicLink = useCallback<AuthActions["signInWithMagicLink"]>(
    async (email, redirectTo = "/welcome") => {
      const trimmed = email.trim().toLowerCase();
      const { error } = await supabase.auth.signInWithOtp({
        email: trimmed,
        options: {
          emailRedirectTo: buildRedirectUrl(redirectTo),
          shouldCreateUser: true,
        },
      });
      return { error: error?.message ?? null };
    },
    [],
  );

  const signOut = useCallback<AuthActions["signOut"]>(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      signInWithGoogle,
      signInWithMagicLink,
      signOut,
    }),
    [session, loading, signInWithGoogle, signInWithMagicLink, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
