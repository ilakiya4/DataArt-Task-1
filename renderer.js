export function renderTimeline(container, events, onViewDetails) {
    container.innerHTML = "";
    events.forEach(event => {
        var _a;
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
        (_a = card.querySelector(".view-details")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            onViewDetails(event);
        });
        container.appendChild(card);
    });
}
