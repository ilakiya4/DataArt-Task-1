document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");

    modal.innerHTML = `
        <div class="content" style="position:relative; max-width:500px; width:90%;">
            <span id="close-modal" style="cursor:pointer; font-size:24px; position:absolute; top:10px; right:15px;">&times;</span>
            <div id="modal-details"></div>
        </div>
    `;

    const modalDetails = document.getElementById("modal-details");
    const closeModal = document.getElementById("close-modal");

    fetch("events.json")
        .then(res => res.json())
        .then(events => {
            timeline.innerHTML = "";
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

                card.querySelector(".view-details").addEventListener("click", () => {
                    modalDetails.innerHTML = `
                        <h2>${event.title}</h2>
                        <p><i>${event.description}</i></p>
                        <img src="${event.imageURL}" width="100" style="margin-top:10px;">
                        <p><b>Category:</b> ${event.category}</p>
                    `;
                    modal.classList.add("active");
                });

                timeline.appendChild(card);
            });
        })
        .catch(err => console.error("Error loading events:", err));

    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});
