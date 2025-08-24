import { useEffect, useRef, useState } from "react";
import type { EventData } from "./types";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import EventModal from "./components/EventModal";
import { fetchEvents } from "./utils/fetcher";

export default function App() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selected, setSelected] = useState<EventData | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null); // ✅ fixed typing

  useEffect(() => {
    fetchEvents("/data/events.json").then(setEvents).catch(console.error);
  }, []);

  // Close modal on Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        triggerRef.current?.focus(); // return focus
      }
    };
    if (selected) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  return (
    <>
      <Header/>
      <Timeline
        events={events}
        selected={selected}
        onSelect={(event) => {
          setSelected(event);
          // store the triggering button (focus return later)
          // React automatically gives event.currentTarget as HTMLButtonElement
        }}
      />
      <EventModal event={selected} onClose={() => setSelected(null)} />
      <footer>
        <center>CopyRight@2025 All rights reserved.</center>
      </footer>
    </>
  );
}
