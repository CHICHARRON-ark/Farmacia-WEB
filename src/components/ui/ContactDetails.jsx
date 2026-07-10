import { BRAND } from '../../constants/brand';
import { GmailIcon, MapsIcon, PhoneIcon, WhatsAppIcon } from './ContactIcons';

export default function ContactDetails() {
  return (
    <ul className="contact-block__list">
      <li className="contact-item">
        <span className="contact-item__icon contact-item__icon--gmail" aria-hidden="true">
          <GmailIcon />
        </span>
        <div className="contact-item__body">
          <span className="contact-item__label">Correo</span>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </div>
      </li>
      <li className="contact-item">
        <span className="contact-item__icon contact-item__icon--phone" aria-hidden="true">
          <PhoneIcon />
        </span>
        <div className="contact-item__body">
          <span className="contact-item__label">Teléfono</span>
          <a href={BRAND.phoneHref}>{BRAND.phone}</a>
        </div>
      </li>
      <li className="contact-item">
        <span className="contact-item__icon contact-item__icon--whatsapp" aria-hidden="true">
          <WhatsAppIcon />
        </span>
        <div className="contact-item__body">
          <span className="contact-item__label">WhatsApp</span>
          <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer">
            {BRAND.whatsapp}
          </a>
        </div>
      </li>
      <li className="contact-item">
        <span className="contact-item__icon contact-item__icon--maps" aria-hidden="true">
          <MapsIcon />
        </span>
        <div className="contact-item__body">
          <span className="contact-item__label">Dirección</span>
          <a href={BRAND.mapsUrl} target="_blank" rel="noopener noreferrer">
            {BRAND.address}
          </a>
        </div>
      </li>
    </ul>
  );
}
