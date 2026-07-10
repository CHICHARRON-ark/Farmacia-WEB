import { BRAND } from '../../constants/brand';
import { MapsIcon } from './ContactIcons';

export default function LocationMap() {
  return (
    <div className="location-map">
      <div className="location-map__header">
        <h3 className="location-map__title">
          <MapsIcon size={20} />
          Ubicación
        </h3>
        <p className="location-map__address">{BRAND.address}</p>
        <a
          href={BRAND.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="location-map__link"
        >
          <MapsIcon size={18} />
          Abrir en Google Maps
        </a>
      </div>
      <div className="location-map__frame">
        <iframe
          title={`Mapa de ${BRAND.name}`}
          src={BRAND.mapsEmbedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
