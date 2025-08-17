import { EventData } from "./types.js";

export function renderTimeline(container: HTMLElement, events: EventData[], onViewDetails: (event: EventData) => void) {
  container.innerHTML = "";
  events.forEach(event => {
    const card = document.createElement("section");
    card.innerHTML = `
      <h2>${event.year}</h2>
      <article>
        <p><b>${event.title}</b></p>
        <figure>
          <img src="${event.imageURL}" width="50" height="50" style="border-radius:50%;">
        </figure>
        <button class="view-details">View Details</button>
      </article>
    `;

    card.querySelector(".view-details")?.addEventListener("click", () => {
      onViewDetails(event);
    });

    container.appendChild(card);
  });
}
