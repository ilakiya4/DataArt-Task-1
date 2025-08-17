import { EventData } from "./types.js";

export function setupModal(modal: HTMLElement) {
  modal.innerHTML = `
    <div class="content" style="position:relative; max-width:500px; width:90%;">
      <span id="close-modal" style="cursor:pointer; font-size:24px; position:absolute; top:10px; right:15px;">&times;</span>
      <div id="modal-details"></div>
    </div>
  `;

  const closeModal = modal.querySelector("#close-modal") as HTMLElement;
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

export function showModal(modal: HTMLElement, event: EventData) {
  const modalDetails = modal.querySelector("#modal-details") as HTMLElement;
  modalDetails.innerHTML = `
    <h2>${event.title}</h2>
    <p><i>${event.description}</i></p>
    <img src="${event.imageURL}" width="100" style="margin-top:10px;">
    <p><b>Category:</b> ${event.category}</p>
  `;
  modal.classList.add("active");
}
