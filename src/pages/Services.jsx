import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import logoLab from '../assets/LOGO lab 2.png';
import logoConsultaMed from '../assets/cons med logo.png';
import logoDental from '../assets/logo dental.png';

const services = [
  {
    id: 'laboratorio',
    title: 'Laboratorio',
    logo: logoLab,
    logoAlt: 'UME Laboratorios - Análisis clínicos, microbiológicos y especiales',
    logoClass: 'service-band__logo--lab',
    description:
      'Realizamos análisis clínicos para apoyar el diagnóstico y monitoreo de tu estado de salud. Trabajamos con protocolos de calidad para entregarte resultados confiables y oportunos.',
    specialties: [
      'Hematología',
      'Parasitología',
      'Inmunología',
      'Química clínica',
      'Estudios hormonales',
      'Drogas terapéuticas y de abuso',
      'Microbiología',
    ],
    packages: [
      {
        name: 'Check Up General',
        items: ['Examen General de Orina', 'SMAC', 'Biometría Hemática'],
      },
      {
        name: 'Check Up Mujer',
        items: [
          'Examen General de Orina',
          'SMAC',
          'Biometría Hemática',
          'Ca 125',
          'TSH u Hormona Estimulante de la Tiroides',
        ],
      },
      {
        name: 'Check Up Hombre',
        items: [
          'Examen General de Orina',
          'SMAC',
          'Biometría Hemática',
          'Antígeno Prostático Específico',
        ],
      },
      {
        name: 'Check Up Infantil',
        items: [
          'Biometría Hemática',
          'Examen General de Orina',
          'Coproparasitoscópico',
          'SMAC',
        ],
      },
    ],
  },
  {
    id: 'consultorio-medico',
    title: 'Consultorio médico',
    logo: logoConsultaMed,
    logoAlt: 'Consulta médica - Consultorio médico',
    description:
      'Atención médica general para el diagnóstico, control y seguimiento de padecimientos comunes. Un espacio confiable para cuidar tu salud y la de los tuyos con profesionales capacitados.',
    highlights: [
      'Consulta médica general',
      'Electrocardiograma',
      'Control prenatal',
      'Control paciente con diabetes',
      'Sutura y pequeñas cirugías',
      'Retiro de puntos',
      'Certificados médicos',
      'Control y atención infantil',
      'Consulta a domicilio',
    ],
  },
  {
    id: 'consultorio-dental',
    title: 'UME Clínica dental',
    logo: logoDental,
    logoAlt: 'UME Clínica dental',
    logoClass: 'service-band__logo--dental',
    bandClass: 'service-band--dental',
    description:
      'Cuidamos tu salud bucal con tratamientos de prevención, estética y restauración. Atención profesional para toda la familia con trato cercano y resultados confiables.',
    highlights: [
      'Limpieza ultrasónica',
      'Resina dental',
      'Extracción dental',
      'Blanqueamiento dental',
      'Brackets',
      'Endodoncia',
    ],
  },
];

export default function Services() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const seccion = searchParams.get('seccion');
    if (!seccion) return;

    const scrollToSection = () => {
      const el = document.getElementById(seccion);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const timer = window.setTimeout(scrollToSection, 50);
    return () => window.clearTimeout(timer);
  }, [searchParams]);

  return (
    <div className="services-page">
      <div className="container services-page__toolbar">
        <BackButton />
      </div>
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={[
            'service-band',
            service.bandClass || (index % 2 === 1 && 'service-band--alt'),
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <div className="container service-band__inner">
            {service.logo ? (
              <div className="service-band__logo-layout">
                <div className="service-band__logo-wrap">
                  <img
                    src={service.logo}
                    alt={service.logoAlt}
                    className={['service-band__logo', service.logoClass].filter(Boolean).join(' ')}
                  />
                </div>
                <div className="service-band__content">
                  {service.eyebrow && <p className="service-band__eyebrow">{service.eyebrow}</p>}
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  {service.specialties && (
                    <div className="service-band__subsection">
                      <h3>Áreas de estudio</h3>
                      <ul className="service-band__list">
                        {service.specialties.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.packages && (
                    <div className="service-band__subsection">
                      <h3>Paquetes</h3>
                      <div className="service-packages">
                        {service.packages.map((pkg) => (
                          <article key={pkg.name} className="service-package">
                            <h4>{pkg.name}</h4>
                            <ul>
                              {pkg.items.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                  {service.highlights && (
                    <ul className="service-band__list">
                      {service.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ) : (
              <div className="service-band__content">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                {service.highlights && (
                  <ul className="service-band__list">
                    {service.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
