import { fetchEvents } from "./fetcher.js";
import { renderTimeline } from "./renderer.js";
import { setupModal, showModal } from "./modal.js";
const timeline = document.getElementById("timeline");
const modal = document.getElementById("modal");
setupModal(modal);
fetchEvents("events.json")
    .then((events) => {
    renderTimeline(timeline, events, (event) => {
        showModal(modal, event);
    });
})
    .catch(err => console.error("Error loading events:", err));
