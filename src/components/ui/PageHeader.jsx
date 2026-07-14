export default function PageHeader({ title, subtitle, meta }) {
  return (
    <header className="page__header">
      <h1>{title}</h1>
      {subtitle && <p className="page__subtitle">{subtitle}</p>}
      {meta && <p className="page__meta">{meta}</p>}
    </header>
  );
}
