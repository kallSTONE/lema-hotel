import { ArrowUpRight, Check, X } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { t, tr, rooms } from '@/data/content';
import { PageHeader } from '@/components/Layout';

export default function Rooms({ onBook }: { onBook: () => void }) {
  const { lang } = useLang();
  return (
    <main>
      <PageHeader title={tr(t.rooms.title, lang)} subtitle={tr(t.rooms.subtitle, lang)} image={rooms[0].image} />
      <section className="rooms-list section-pad">
        <div className="rooms-grid">   
          {rooms.map((room, i) => (
            <article key={room.id} className={room.available ? 'room-detail-card' : 'room-detail-card unavailable'}>
              <div className="room-detail-image">
                <img src={room.image} alt={tr(room.name, lang)} />
                <span className={`room-badge ${room.available ? 'available' : 'taken'}`}>
                  {room.available ? <><Check size={13} /> {tr(t.rooms.available, lang)}</> : <><X size={13} /> {tr(t.rooms.taken, lang)}</>}
                </span>
                <span className="room-number">0{i + 1}</span>
              </div>
              <div className="room-detail-body">
                <div className="room-detail-head">
                  <h3>{tr(room.name, lang)}</h3>
                  <div className="room-price-tag">
                    {tr(t.rooms.from, lang)} <strong>ETB {room.price.toLocaleString()}</strong>
                    <small>{tr(t.rooms.perNight, lang)}</small>
                  </div>
                </div>   
                <p className="room-detail-desc">{tr(room.desc, lang)}</p>
                <div className="room-detail-meta">
                  <span>{room.bed}</span>
                  <span>{tr(room.view, lang)}</span>
                  <span>{room.size}</span>
                </div>
                <div className="room-amenities">
                  <p className="eyebrow">{tr(t.rooms.amenities, lang)}</p>
                  <div className="amenity-chips">
                    {room.amenities.map(a => <span key={a}>{a}</span>)}
                  </div>
                </div>
                <button className={room.available ? 'primary-button full-width' : 'primary-button full-width disabled'} onClick={room.available ? onBook : undefined} disabled={!room.available}>
                  {room.available ? <>{tr(t.rooms.bookThis, lang)} <ArrowUpRight size={17} /></> : tr(t.rooms.taken, lang)}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
