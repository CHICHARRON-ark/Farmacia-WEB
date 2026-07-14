import { BRAND } from '../constants/brand';

export default function About() {
  return (
    <div className="container page content-page">
      <h1>Nosotros</h1>
      <p>
        <strong>{BRAND.name}</strong> es una unidad médica y farmacia de genéricos comprometida con
        el bienestar de nuestra comunidad. Manejamos medicamentos de todo tipo, con especialidad en
        genéricos de calidad, además de vitaminas y productos de cuidado personal con asesoría
        profesional y precios accesibles.
      </p>
      <p>
        Nuestro lema — <em>{BRAND.tagline}</em> — refleja el compromiso diario con cada cliente que
        confía en nosotros para cuidar su salud y la de su familia.
      </p>
      <h2>Nuestros valores</h2>
      <ul>
        <li>Medicamentos genéricos y de patente de laboratorios autorizados</li>
        <li>Atención farmacéutica responsable y orientación al paciente</li>
        <li>Precios justos y promociones para el bienestar de todos</li>
      </ul>
    </div>
  );
}
