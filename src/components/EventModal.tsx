import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { EventData } from "../types";

interface Props {
  event: EventData | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement>; // focus return
}

export default function EventModal({ event, onClose, triggerRef }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;

    const modal = modalRef.current;
    const focusableEls = modal?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls?.[0];
    const lastEl = focusableEls?.[focusableEls.length - 1];

    // Speech narration
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(`${event.title}. ${event.description}`);
      window.speechSynthesis.speak(utter);
    }

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef?.current?.focus();
      }
      if (e.key === "Tab" && focusableEls && focusableEls.length > 0) {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        triggerRef?.current?.focus(); // optional: focus prev marker
      }
    };

    document.addEventListener("keydown", handleKey);
    firstEl?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, [event, onClose, triggerRef]);

  if (!event) return null;

  return createPortal(
    <div
      id="modal"
      className="active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      onClick={onClose}
    >
      <div
        className="content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "500px", width: "90%" }}
      >
        <button
          aria-label="Close details"
          style={{
            cursor: "pointer",
            fontSize: "24px",
            position: "absolute",
            top: "10px",
            right: "15px",
          }}
          onClick={onClose}
        >
          ×
        </button>
        <div id="modal-details">
          <h2 id="modal-title">{event.title}</h2>
          <p id="modal-desc"><i>{event.description}</i></p>
          <img src={event.imageURL} alt={`Image representing ${event.title}`} width="100" style={{ marginTop: "10px" }} />
          <p><b>Category:</b> {event.category}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
