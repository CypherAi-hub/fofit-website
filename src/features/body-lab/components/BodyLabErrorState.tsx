export function BodyLabErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="bodylab-state">
      <div className="bodylab-state__title">Couldn&apos;t load your Body Lab</div>
      <p>{message}</p>
      <button type="button" className="bodylab-btn" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
