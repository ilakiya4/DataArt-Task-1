import type { EventData } from "../types";

interface Props {
  event: EventData;
  onSelect: (event: EventData) => void;
  isActive: boolean;
  markerRef?: React.Ref<HTMLButtonElement | null> | ((el: HTMLButtonElement | null) => void);
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function EventMarker({ event, onSelect, isActive, markerRef, onKeyDown }: Props) {
  return (
    <section role="listitem" id={event.title}>
      <h2>{event.year}</h2>
      <article>
        <p><b>{event.title}</b></p>
        <figure>
          <img
            src={event.imageURL}
            alt={`Image representing ${event.title}`}
            width="50"
            height="50"
            tabIndex={0}
          />
        </figure>
        <button
          ref={markerRef}
          className="view-details"
          onClick={() => onSelect(event)}
          onKeyDown={onKeyDown}
          aria-current={isActive ? "true" : undefined}
          aria-label={`View details for ${event.title} (${event.year})`}
        >
          View Details
        </button>
      </article>
    </section>
  );
}
