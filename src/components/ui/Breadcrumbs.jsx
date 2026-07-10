import { Link } from 'react-router-dom';

/**
 * @param {{ label: string, path?: string }[]} items
 */
export default function Breadcrumbs({ items }) {
  if (!items?.length) return null;

  return (
    <nav className="breadcrumbs" aria-label="Ruta de navegación">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="breadcrumbs__item">
              {index > 0 && <span className="breadcrumbs__sep" aria-hidden="true">/</span>}
              {isLast || !item.path ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
