import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type WaitlistContextValue = {
  isOpen: boolean;
  open: (options?: WaitlistOpenOptions) => void;
  close: () => void;
  initialRole: WaitlistRole | null;
  joinedEmail: string | null;
  setJoinedEmail: (email: string | null) => void;
};

export type WaitlistRole = "lifter" | "athlete" | "coach";

export type WaitlistOpenOptions = {
  initialRole?: WaitlistRole;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

const JOINED_KEY = "fofit-waitlist-joined-email";

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialRole, setInitialRole] = useState<WaitlistRole | null>(null);
  const [joinedEmail, setJoinedEmailState] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(JOINED_KEY);
    if (stored) {
      setJoinedEmailState(stored);
    }
  }, []);

  const setJoinedEmail = useCallback((email: string | null) => {
    setJoinedEmailState(email);
    if (email) {
      window.localStorage.setItem(JOINED_KEY, email);
      return;
    }
    window.localStorage.removeItem(JOINED_KEY);
  }, []);

  const open = useCallback((options?: WaitlistOpenOptions) => {
    setInitialRole(options?.initialRole ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      initialRole,
      joinedEmail,
      setJoinedEmail,
    }),
    [close, initialRole, isOpen, joinedEmail, open, setJoinedEmail],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useEarlyAccess() {
  const context = useContext(WaitlistContext);

  if (!context) {
    throw new Error("useEarlyAccess must be used inside WaitlistProvider");
  }

  return context;
}
