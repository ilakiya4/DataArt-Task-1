import { fetchEvents } from "./fetcher.js";
import { renderTimeline } from "./renderer.js";
import { setupModal, showModal } from "./modal.js";
import { EventData } from "./types.js";

const timeline = document.getElementById("timeline") as HTMLElement;
const modal = document.getElementById("modal") as HTMLElement;

setupModal(modal);

fetchEvents("events.json")
  .then((events: EventData[]) => {
    renderTimeline(timeline, events, (event) => {
      showModal(modal, event);
    });
  })
  .catch(err => console.error("Error loading events:", err));
