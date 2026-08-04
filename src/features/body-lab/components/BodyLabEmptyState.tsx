const TIPS = [
  "Same lighting, same spot — consistency is what makes the comparison real.",
  "Same distance + pose each time (front, side, back). The pose filter then tracks one angle.",
  "Morning, before eating, is the most consistent baseline.",
  "Log your weight or measurements with the photo to see the trend, not just the picture.",
];

export function BodyLabEmptyState() {
  return (
    <div className="bodylab-state bodylab-empty">
      <div className="bodylab-state__title">No check-ins yet</div>
      <p>
        Add a private progress or pump photo to start your timeline. Your media stays private —
        only you can see it.
      </p>
      <ul className="bodylab-empty__tips" aria-label="Tips for useful progress photos">
        {TIPS.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
