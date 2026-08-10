import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import erd from "../../../assets/images/toolkit/roam-guru-erd.png";

// Things the 2023 diagram got right, and the one thing it got badly wrong.
// The second list matters more than the first: a schema you would not ship
// again is only worth showing if you can say why.
const HOLDS_UP = [
  "Trips and users join through `trip_has_user`, but a trip keeps a single `owner_id` — shared editing without ambiguous ownership.",
  "Gear items and activities both use an entity-attribute-value shape with a `*_attribute_unit` table, so a list can total weight in pounds or kilograms without new columns.",
  "Trip reports are typed (`trip_report_type`) rather than hard-coded to pre-trip and post-trip, which left room for user-defined report kinds.",
];

const WOULD_CHANGE = [
  "`payment_method` stores `card_number` and `security_code` directly. That is a PCI violation and simply the wrong instinct — card data belongs with a processor, and the column should be a Stripe token and the last four digits. This is the clearest thing the diagram gets wrong.",
  "Every table carries `created_at`/`updated_at` but nothing carries a soft-delete or audit trail; Roam Guru needed both once trips became collaborative.",
  "`VARCHAR(255)` everywhere is a default, not a decision — lengths should follow the data.",
];

// Renders `backticked` spans in the notes above as real <code> elements.
const withCode = (note) =>
  note
    .split("`")
    .map((part, i) =>
      i % 2 ? <code key={i}>{part}</code> : <React.Fragment key={i}>{part}</React.Fragment>
    );

function RoamGuruErd() {
  return (
    <div className="toolkit-card" data-testid="roam-guru-erd">
      <div className="toolkit-card-head">
        <h3>Roam Guru schema, first pass</h3>
        <span className="toolkit-tag">Data model &middot; 2023</span>
      </div>

      <p className="toolkit-card-blurb">
        Twenty tables sketched in MySQL Workbench before a line of Roam Guru was
        written. The sticky notes are the actual design questions I was arguing
        with myself about at the time — who can edit a trip, how gear attributes
        carry units, whether report types should be user-defined.
      </p>

      <a
        className="toolkit-erd-frame"
        href={erd.src}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the full-size Roam Guru entity relationship diagram"
      >
        <img
          src={erd.src}
          alt="Entity relationship diagram of the Roam Guru schema: twenty tables covering trips, users, friendships, gear lists, items with typed attributes and units, trip reports, and subscriptions."
          loading="lazy"
        />
        <span className="toolkit-erd-open">
          Full size <FaExternalLinkAlt aria-hidden="true" />
        </span>
      </a>

      <div className="toolkit-annotations">
        <div className="toolkit-annotation">
          <h4 className="toolkit-annotation-title is-good">What holds up</h4>
          <ul>
            {HOLDS_UP.map((note) => (
              <li key={note}>{withCode(note)}</li>
            ))}
          </ul>
        </div>

        <div className="toolkit-annotation">
          <h4 className="toolkit-annotation-title is-bad">
            What I would change now
          </h4>
          <ul>
            {WOULD_CHANGE.map((note) => (
              <li key={note}>{withCode(note)}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="toolkit-provenance">
        The shipped product diverged from this — Roam Guru runs on Firestore, not
        MySQL — but the entity boundaries drawn here are still the ones the API
        uses.
      </p>
    </div>
  );
}

export default RoamGuruErd;
