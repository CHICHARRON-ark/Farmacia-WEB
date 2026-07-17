import { Link } from 'react-router-dom';

export default function BackButton({ to = '/', label = 'Volver' }) {
  return (
    <Link to={to} className="services-back">
      <span className="services-back__arrow" aria-hidden="true">
        ←
      </span>
      {label}
    </Link>
  );
}
