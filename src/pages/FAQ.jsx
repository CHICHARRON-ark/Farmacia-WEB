const faqs = [
  {
    q: '¿Qué tipo de medicamentos manejan?',
    a: 'Somos una farmacia de genéricos: manejamos medicamentos genéricos, de patente y naturistas, con especialidad en genéricos de calidad y precios accesibles. Todos cuentan con registro sanitario vigente.',
  },
  {
    q: '¿Necesito receta para comprar?',
    a: 'Los medicamentos de venta libre no requieren receta. Para medicamentos de control especial, consulta disponibilidad en nuestra farmacia.',
  },
];

export default function FAQ() {
  return (
    <div className="container page content-page">
      <h1>Preguntas frecuentes</h1>
      <dl className="faq-list">
        {faqs.map((item) => (
          <div key={item.q} className="faq-item">
            <dt>{item.q}</dt>
            <dd>{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
