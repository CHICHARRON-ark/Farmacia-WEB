const schedules = [
  {
    title: 'Farmacia',
    items: [
      { days: 'Lunes a Sábado', hours: '7:00 am – 10:00 pm' },
      { days: 'Domingo', hours: '9:00 am – 5:00 pm' },
    ],
  },
  {
    title: 'Consultorio',
    items: [
      { days: 'Lunes a Sábado', hours: '9:00 am – 9:00 pm' },
      { days: 'Domingo', hours: '10:00 am – 5:00 pm' },
    ],
  },
  {
    title: 'Laboratorios',
    items: [
      { days: 'Lunes a Sábado', hours: '7:00 am – 12:00 pm' },
      { days: 'Domingo', hours: 'Cerrado' },
    ],
  },
];

export default function BusinessHours() {
  return (
    <div className="hours-block">
      <h2 className="section__title">Horarios</h2>
      <div className="hours-grid">
        {schedules.map((schedule) => (
          <article key={schedule.title} className="hours-card">
            <h3>{schedule.title}</h3>
            <ul className="hours-list">
              {schedule.items.map((item) => (
                <li key={item.days}>
                  <span className="hours-list__days">{item.days}</span>
                  <span className="hours-list__time">{item.hours}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
