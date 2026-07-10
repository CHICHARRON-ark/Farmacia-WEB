export default function PageLoader({ label = 'Cargando...' }) {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}
