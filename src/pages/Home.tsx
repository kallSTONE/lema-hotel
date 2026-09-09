import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Coffee, Play, Sparkles, Star, Utensils, X, Bed, UtensilsCrossed, Building2, Wifi } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { t, tr, rooms } from '@/data/content';
   
const photos = {
  heroMobile: '/assets/Images/welcome-Phone.webp',
  hero: '/assets/Images/welcome.webp',
  heroAlternate: '/assets/Images/NightView.webp',
  heroAlternateMobile: '/assets/Images/NightView.webp',
  heroThird: '/assets/Images/building.webp',
  heroThirdMobile: '/assets/Images/Buildingshot.webp',
  heroFourth: '/assets/Images/LemHotelVenue.webp',
  heroFourthMobile: '/assets/Images/LemHotelVenue.webp',
  heroFifth: '/assets/Images/Stage.webp',
  heroFifthMobile: '/assets/Images/Stage.webp',
  room: '/assets/Images/room1.webp', 
  roomTwo: '/assets/Images/room2.webp', 
  dining: '/assets/Images/menu/dorowat.webp', 
  pool: '/assets/Images/NightView.webp', 
  spa: '/assets/Images/Stage.webp', 
}; 

const culturalTours = [
  {
    image: '/assets/Images/tour/tour11.webp',
    title: 'The Hadiya "Yahudie" annual festival',
    description:
      'Dr. Abiy Ahmed, the Prime Minister of Ethiopia, attended the Hadiya "Yahudie" annual festival in Hossana City, showcasing the cultural richness and diversity of the region.',
  },
  {
    image: '/assets/Images/tour/tour2.webp',
    title: 'Cultural richness & diversity',
    description:
      'Experience the rich cultural traditions, heritage, and diversity of the Hadiya people.',
  },
  {
    image: '/assets/Images/tour/tour5.webp',
    title: 'Dr Abiy Ahmed at HOSSANA CITY',
    description:
      'Discover memorable moments and important cultural events taking place in Hossana City.',
  },
  {
    image: '/assets/Images/tour/tour4.webp',
    title: 'The Hadiya "Yahudie" annual festival',
    description:
      'The Hadiya "Yahudie" annual festival is noted as a unique cultural feature, promoting unity, compassion, and forgiveness.',
  },
];


const heroImages = [
  { desktop: photos.heroAlternate, mobile: photos.heroAlternateMobile },
  { desktop: photos.hero, mobile: photos.heroMobile },
  { desktop: photos.heroThird, mobile: photos.heroThirdMobile },  
  { desktop: photos.heroAlternate, mobile: photos.heroAlternateMobile },
  { desktop: photos.heroFourth, mobile: photos.heroFourthMobile },
  { desktop: photos.heroFifth, mobile: photos.heroFifthMobile },
];

const services = [
  {
    id: 'rooms',
    name: { en: 'Rooms', am: 'ክፍሎች', had: 'Rooms' },
    icon: Bed,
    image: '/assets/Images/room1.webp',
  },
  {
    id: 'restaurant',
    name: { en: 'Restaurant', am: 'ምግብ-ቤት', had: 'Restaurant' },
    icon: UtensilsCrossed,
    image: '/assets/Images/restaurant.webp',
  },
  {
    id: 'venue',
    name: { en: 'Venue', am: 'ቦታ', had: 'Venue' },
    icon: Building2,
    image: '/assets/Images/LemHotelVenue.webp',
  },
  {
    id: 'wifi',
    name: { en: 'Free-WiFi', am: 'ነጻ-ዋይፋይ', had: 'Free_WiFi' },
    icon: Wifi,
    image: '/assets/Images/Coridor.webp',
  },
];    
     
export default function Home({ onBook }: { onBook: () => void }) {
  const { lang } = useLang();
  const [heroIndex, setHeroIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
    
  useEffect(() => {
    setHeroIndex(0);
  }, [lang]);   
  
 
  useEffect(() => {
    const cycle = window.setInterval(() => {
      setHeroIndex((current: number) => (current === 0 ? 1 : 0));
    }, 4200);

      
    return () => window.clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (!isVideoOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  const heroLines = [
    tr(t.hero.title1, lang), 
    tr(t.hero.welcome, lang)
  ];

  return (
    <main>
      <section
        className="hero"
      >
        <div className="hero-image-layers" aria-hidden="true">
          {heroImages.map((image, index) => (
            <div
              className="hero-image-layer"
              key={image.desktop}
              style={{
                '--hero-image-desktop': `url(${activeService ? services.find(s => s.id === activeService)?.image : image.desktop})`,
                '--hero-image-mobile': `url(${activeService ? services.find(s => s.id === activeService)?.image : image.mobile})`,
                '--hero-image-delay': `${index * -6}s`,
              } as CSSProperties}
            />
          ))}
        </div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow light">{tr(t.hero.eyebrow, lang)}</p>
          <h1 className="hero-title" aria-live="polite">
            <span className="hero-title-rotator">
              {heroLines.map((line, index) => (
                <span
                  key={`${line}-${lang}`}
                  className={
                    index === heroIndex
                      ? 'hero-title-layer active'
                      : 'hero-title-layer' 
                  }
                >
                  {line}

                  {index === 0 && (
                    <span className="hero-title-secondary">
                      <em>{tr(t.hero.title2, lang)}</em>
                    </span>
                  )}
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-copy">{tr(t.hero.copy, lang)}</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onBook}>{tr(t.hero.cta1, lang)} <ArrowUpRight size={18} /></button>
            <button className="play-button" type="button" onClick={() => setIsVideoOpen(true)}><span><Play size={14} fill="currentColor" /></span> {tr(t.hero.cta2, lang)}</button>
          </div>
        </div>
      </section>

      <div className="home-content">
        <div className="services-circles">
        {services.map((service) => {
          const IconComponent = service.icon;
          return (
            <button
              key={service.id}
              className={`service-circle ${activeService === service.id ? 'active' : ''}`}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              type="button"
              aria-label={tr(service.name, lang)}
            >
              <div className="service-circle-image" style={{ backgroundImage: `url(${service.image})` }} />
              <div className="service-circle-icon">
                <IconComponent size={18} />
              </div>
              <div className="service-circle-content">
                <h4>{tr(service.name, lang)}</h4>
              </div>
            </button>


          );
        })}
      </div>

      <section className="booking-bar">
        <div className="booking-field"><span className="field-icon">📅</span><label>{tr(t.booking.checkin, lang)} <strong>21 Aug 2026</strong></label></div>
        <div className="booking-field"><span className="field-icon">📅</span><label>{tr(t.booking.checkout, lang)} <strong>24 Aug 2026</strong></label></div>
        <div className="booking-field"><span className="field-icon">👥</span><label>{tr(t.booking.guests, lang)} <strong>2 adults, 1 room</strong></label></div>
        <button onClick={onBook}>{tr(t.booking.check, lang)}</button>
      </section>

      <section className="intro section-pad">
        <div className="intro-mark">L</div>
        <div>
          <p className="eyebrow">{tr(t.sections.stayEyebrow, lang)}</p>
          <h2>{tr(t.sections.stayTitle1, lang)}<br /><em>{tr(t.sections.stayTitle2, lang)}</em></h2>
        </div>
        <div className="intro-copy">
          <p>{tr(t.hero.copy, lang)}</p>
          <Link className="text-link" to="/rooms">{tr(t.sections.viewAll, lang)} <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="feature-section section-pad" id="stay">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{tr(t.sections.stayEyebrow, lang)}</p>
            <h2>{tr(t.sections.stayTitle1, lang)}<br /><em>{tr(t.sections.stayTitle2, lang)}</em></h2>
          </div>
          <Link className="text-link" to="/rooms">{tr(t.sections.viewAll, lang)} <ArrowUpRight size={16} /></Link>
        </div>
        <div className="room-grid">
          <article className="room-card featured-room">
            <img src={photos.room} alt={tr(rooms[0].name, lang)} />
            <div className="room-info">
              <div>
                <p className="eyebrow">01 / 03</p>
                <h3>{tr(rooms[0].name, lang)}</h3>
                <span>{rooms[0].bed} · {tr(rooms[0].view, lang)} · {rooms[0].size}</span>
              </div>
              <div className="price">{tr(t.rooms.from, lang)} <strong>ETB {rooms[0].price.toLocaleString()}</strong> <ArrowUpRight size={17} /></div>
            </div>
          </article>
          <article className="room-card">
            <img src={photos.roomTwo} alt={tr(rooms[1].name, lang)} />
            <div className="room-info">
              <div>
                <p className="eyebrow">02 / 03</p>
                <h3>{tr(rooms[1].name, lang)}</h3>
                <span>{rooms[1].bed} · {tr(rooms[1].view, lang)} · {rooms[1].size}</span>
              </div>
              <div className="price">{tr(t.rooms.from, lang)} <strong>ETB {rooms[1].price.toLocaleString()}</strong> <ArrowUpRight size={17} /></div>
            </div>
          </article>
        </div>
      </section>

      <section className="experience-grid">
        <div className="experience-image" style={{ backgroundImage: `url(${photos.pool})` }}>
          <div className="image-label">{tr(t.sections.expTitle1, lang)}<br /><span>{tr(t.sections.expTitle2, lang)}</span></div>
        </div>
        <div className="experience-copy">
          <p className="eyebrow">{tr(t.sections.expEyebrow, lang)}</p>
          <h2>{tr(t.sections.expTitle1, lang)}<br /><em>{tr(t.sections.expTitle2, lang)}</em></h2>
          <p>{tr(t.hero.copy, lang)}</p>
          <div className="amenity-list">
            <div><Coffee size={21} /><span>{tr(t.about.value1, lang)}<small>{tr(t.about.value1Desc, lang)}</small></span></div>
            <div><Utensils size={21} /><span>{tr(t.sections.diningTitle1, lang)}<small>{tr(t.sections.diningTitle2, lang)}</small></span></div>
            <div><Sparkles size={21} /><span>{tr(t.about.value3, lang)}<small>{tr(t.about.value3Desc, lang)}</small></span></div>
          </div>
          <Link className="text-link" to="/menu">{tr(t.sections.diningTitle1, lang)} <ArrowUpRight size={16} /></Link>
        </div>
      </section>

      <section className="dining-section section-pad">
        <div className="dining-copy">
          <p className="eyebrow">{tr(t.sections.diningEyebrow, lang)}</p>
          <h2>{tr(t.sections.diningTitle1, lang)}<br /><em>{tr(t.sections.diningTitle2, lang)}</em></h2>
          <p>{tr(t.menu.subtitle, lang)}</p>
          <Link className="text-link" to="/menu">{tr(t.nav.menu, lang)} <ArrowUpRight size={16} /></Link>
        </div>
        <div className="dining-image" style={{ backgroundImage: `url(${photos.dining})` }}>
          <span>{tr(t.menu.breakfast, lang)} · {tr(t.menu.lunch, lang)} · {tr(t.menu.dinner, lang)}</span>
        </div>
      </section>

      <section className="quote-section">
        <div className="quote-mark">"</div>
        <blockquote>{tr(t.hero.copy, lang)}</blockquote>
        <div className="quote-author">
          <span className="avatar">N</span>
          <span><strong>Nardos M.</strong><small>Guest since 2024</small></span>
          <div className="stars"><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /><Star size={13} fill="currentColor" /></div>
        </div>
      </section>

      {/* CULTURAL TOUR SECTION */}
      <section className="cultural-section">
        <div className="cultural-grid">
          {culturalTours.map((tour, index) => (
            <article className="cultural-card" key={tour.image}>
              <img
                src={tour.image}
                alt={tour.title}
                className="cultural-card-image"
              />

              <div className="cultural-card-overlay" />

              <div className="cultural-card-content">
                <p className="cultural-card-text">
                  {tour.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>


      <section className="gallery-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{tr(t.sections.galleryEyebrow, lang)}</p>
            <h2>{tr(t.sections.galleryTitle1, lang)}<br /><em>{tr(t.sections.galleryTitle2, lang)}</em></h2>
          </div>
          <Link className="text-link" to="/gallery">{tr(t.nav.gallery, lang)} <ArrowUpRight size={16} /></Link>
        </div>
        <div className="gallery-grid">
          <img className="gallery-large" src={photos.spa} alt="Spa" />
          <img src={photos.pool} alt="Pool" />
          <img src={rooms[1].image} alt="Room" />
        </div>
      </section>

      {isVideoOpen && (
        <div className="modal-backdrop" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Hotel video player">
            <button className="close-modal video-modal-close" type="button" onClick={() => setIsVideoOpen(false)} aria-label="Close video">
              <X size={20} />
            </button>
            <p className="eyebrow">Featured video</p>
            <h2>Experience Lem Hotel</h2>
            <div className="video-modal-frame">
              <iframe
                src="https://www.youtube.com/embed/y--2fNZ0sV8?autoplay=1&rel=0&modestbranding=1"
                title="Lem Hotel video"
                allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </main>
  );
}
