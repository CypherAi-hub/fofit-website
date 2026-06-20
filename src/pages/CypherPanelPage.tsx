import { useEffect, useRef, useState } from "react";

import { useCypherChat } from "../features/cypher/useCypherChat";
import { PageMeta } from "../components/layout/PageMeta";
import "../features/cypher/cypher.css";

const STARTERS = [
  "What should I train today?",
  "How's my recent progress looking?",
  "Suggest a 40-minute upper-body session.",
  "My legs are sore — what should I do?",
];

export function CypherPanelPage() {
  const { messages, sending, error, send } = useCypherChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  function submit() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    void send(text);
  }

  return (
    <>
      <PageMeta title="Cypher | FoFit" description="Chat with Cypher, your FoFit AI coach." />
      <div className="cypher">
        <header className="cypher__head">
          <span className="bodylab__eyebrow">◆ Cypher</span>
          <h1 className="cypher__title">Your AI coach</h1>
          <p className="cypher__sub">
            Cypher knows your real training. Ask about your next session, progress, or what to adjust.
          </p>
        </header>

        <div className="cypher__thread" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="cypher-empty">
              <p>Ask Cypher anything about your training:</p>
              <div className="cypher-starters">
                {STARTERS.map((s) => (
                  <button key={s} type="button" className="cypher-starter" onClick={() => void send(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div key={i} className={`cypher-msg cypher-msg--${m.role}`}>
                {m.content}
              </div>
            ))
          )}
          {sending && (
            <div className="cypher-msg cypher-msg--assistant cypher-msg--typing">
              <span className="cypher-dot" />
              <span className="cypher-dot" />
              <span className="cypher-dot" />
            </div>
          )}
          {error && (
            <div className="cypher-error" role="alert">
              {error}
            </div>
          )}
        </div>

        <div className="cypher-composer">
          <textarea
            className="cypher-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            placeholder="Message Cypher…"
            rows={1}
            disabled={sending}
            aria-label="Message Cypher"
          />
          <button
            type="button"
            className="cypher-send"
            onClick={submit}
            disabled={!input.trim() || sending}
            aria-label="Send"
          >
            ↑
          </button>
        </div>
      </div>
    </>
  );
}
