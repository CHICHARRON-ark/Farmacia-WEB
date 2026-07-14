import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { BRAND } from '../../constants/brand';
import logo from '../../assets/logo 2.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navClass = ({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link');

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo" onClick={handleLogoClick}>
          <img src={logo} alt={BRAND.name} className="header__logo-img" />
          <span className="header__logo-text">{BRAND.name}</span>
        </Link>

        <div className={`header__menu ${menuOpen ? 'header__menu--open' : ''}`}>
          <nav className="header__nav" aria-label="Principal">
            <NavLink to="/" className={navClass} end onClick={closeMenu}>
              Inicio
            </NavLink>
            <NavLink to="/servicios" className={navClass} onClick={closeMenu}>
              Servicios
            </NavLink>
            <NavLink to="/nosotros" className={navClass} onClick={closeMenu}>
              Nosotros
            </NavLink>
            <NavLink to="/faq" className={navClass} onClick={closeMenu}>
              FAQ
            </NavLink>
          </nav>
        </div>

        <div className="header__toolbar">
          <button
            type="button"
            className={`header__toggle ${menuOpen ? 'header__toggle--open' : ''}`}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="header__backdrop"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}
