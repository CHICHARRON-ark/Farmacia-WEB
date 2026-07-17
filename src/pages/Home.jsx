import { Link } from 'react-router-dom';
import { BRAND } from '../constants/brand';
import LocationMap from '../components/ui/LocationMap';
import ContactDetails from '../components/ui/ContactDetails';
import BusinessHours from '../components/ui/BusinessHours';
import welcomeBg from '../assets/fondo menu.jpg';

const services = [
  {
    title: 'Consulta médica',
    description: 'Atención profesional para el cuidado de tu salud y la de tu familia.',
    sectionId: 'consultorio-medico',
  },
  {
    title: 'UME Clínica dental',
    description: 'Limpieza, resinas, extracciones, blanqueamiento, brackets y más.',
    sectionId: 'consultorio-dental',
  },
  {
    title: 'UME Laboratorios',
    description: 'Estudios de laboratorio con resultados confiables y oportunos.',
    sectionId: 'laboratorio',
  },
  {
    title: 'Farmacia de genéricos',
    description:
      'Contamos con medicamentos de todas las presentaciones, con especialidad en genéricos de calidad y precios accesibles.',
  },
];

export default function Home() {
  return (
    <>
      <section className="hero hero--welcome">
        <div className="hero__media" aria-hidden="true">
          <img src={welcomeBg} alt="" className="hero__bg" />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="container hero__content hero__content--welcome">
          <div className="hero__copy">
            <p className="hero__eyebrow">{BRAND.subtitle}</p>
            <h1 className="hero__title hero__title--wide">{BRAND.name}</h1>
            <p className="hero__text">
              Somos una unidad médica y farmacia de genéricos comprometida con tu bienestar.{' '}
              {BRAND.tagline}: atención cercana, medicamentos accesibles y servicios de salud para
              toda la comunidad.
            </p>
            <div className="hero__actions">
              <Link to="/servicios" className="btn btn--primary btn--hero-cta">
                Servicios
              </Link>
              <Link to="/faq" className="btn btn--outline btn--hero-secondary">
                Preguntas frecuentes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section container">
        <h2 className="section__title">Nuestros servicios</h2>
        <div className="info-grid">
          {services.map((service) =>
            service.sectionId ? (
              <Link
                key={service.title}
                to={`/servicios?seccion=${service.sectionId}`}
                className="info-card info-card--link"
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ) : (
              <article key={service.title} className="info-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container info-highlight">
          <div>
            <h2>¿Por qué elegirnos?</h2>
            <p>
              En {BRAND.shortName} combinamos experiencia farmacéutica con un trato humano. Somos
              una farmacia de genéricos: manejamos medicamentos de todo tipo, con especialidad en
              genéricos de calidad, además de orientación en cuidado preventivo y productos de
              salud.
            </p>
          </div>
          <ul className="info-list">
            <li>Personal capacitado y atención personalizada</li>
            <li>Medicamentos genéricos y de patente, con enfoque en genéricos accesibles</li>
            <li>Horarios amplios para tu comodidad</li>
          </ul>
        </div>
      </section>

      <section className="section container home-contact-section">
        <BusinessHours />
        <div className="contact-block">
          <h2 className="section__title">Datos de contacto</h2>
          <ContactDetails />
          <LocationMap />
        </div>
      </section>
    </>
  );
}
