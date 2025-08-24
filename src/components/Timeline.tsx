import { useRef, useEffect } from "react";
import type { EventData } from "../types";
import EventMarker from "./EventMarker";

interface Props {
  events: EventData[];
  onSelect: (event: EventData) => void;
  selected?: EventData | null;
}

export default function Timeline({ events, onSelect, selected }: Props) {
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
  let newIndex = index;

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    newIndex = (index + 1) % events.length;
    markerRefs.current[newIndex]?.focus();
  }

  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    newIndex = (index - 1 + events.length) % events.length;
    markerRefs.current[newIndex]?.focus();
  }

  // Announce the selected event
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(events[newIndex].title);
    window.speechSynthesis.cancel(); // stop previous speech
    window.speechSynthesis.speak(utter);
  }

  if (e.key === "Home") {
    e.preventDefault();
    markerRefs.current[0]?.focus();
  }
  if (e.key === "End") {
    e.preventDefault();
    markerRefs.current[events.length - 1]?.focus();
  }
};


  // Announce selected event for screen readers
  useEffect(() => {
    if (selected) {
      const el = document.getElementById(selected.title);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <main id="timeline" role="list" aria-label="Timeline of events">
      {events.map((ev, idx) => (
        <EventMarker
          key={idx}
          event={ev}
          onSelect={onSelect}
          isActive={selected?.title === ev.title}
          markerRef={(el) => (markerRefs.current[idx] = el)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
      <div aria-live="polite" className="sr-only">
        {selected ? `Selected: ${selected.title}, ${selected.year}` : 'No event selected'}
      </div>
    </main>
  );
}
