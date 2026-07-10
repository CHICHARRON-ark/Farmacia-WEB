import { Link } from 'react-router-dom';
import { BRAND } from '../../constants/brand';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <p className="footer__brand">{BRAND.name}</p>
          <p className="footer__text">
            {BRAND.tagline}. Unidad médica dedicada al cuidado de la salud de nuestra comunidad.
          </p>
        </div>
        <div>
          <h3 className="footer__title">Contacto</h3>
          <ul className="footer__links footer__links--contact">
            <li>
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </li>
            <li>
              <a href={BRAND.phoneHref}>Tel: {BRAND.phone}</a>
            </li>
            <li>
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer">
                WhatsApp: {BRAND.whatsapp}
              </a>
            </li>
            <li>{BRAND.address}</li>
          </ul>
        </div>
        <div>
          <h3 className="footer__title">Información</h3>
          <ul className="footer__links">
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/faq">Preguntas frecuentes</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {new Date().getFullYear()} {BRAND.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
