import '../styles/Aurora.css';

/**
 * Aurora — Drifting mesh background.
 * Three slow-moving radial gradient blobs + noise overlay.
 * Purely decorative, hidden from assistive tech.
 */
function Aurora() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <div className="aurora-blob" />
        <div className="aurora-blob" />
        <div className="aurora-blob" />
      </div>
      <div className="aurora-noise" aria-hidden="true" />
    </>
  );
}

export default Aurora;
