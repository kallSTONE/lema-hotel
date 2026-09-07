import { useEffect, useState } from 'react';
import { ArrowUpRight, MapPin, X } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { t, tr, nearbySites } from '@/data/content';
import { PageHeader } from '@/components/Layout';

const fallbackAttractionImage = '/assets/Images/attractions/ajoras.jpg';

export default function Nearby() {
  const { lang } = useLang();
  const [activeSite, setActiveSite] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const openGallery = (siteIndex: number) => {
    setActiveSite(siteIndex);
    setActiveImage(0);
  };

  const closeGallery = () => {
    setActiveSite(null);
    setActiveImage(0);
  };

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeGallery();
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  const selectedSite = activeSite !== null ? nearbySites[activeSite] : null;
  const siteImages = selectedSite?.Images ?? (selectedSite ? [selectedSite.image] : []);

  return (
    <main>
      <PageHeader title={tr(t.nearby.title, lang)} subtitle={tr(t.nearby.subtitle, lang)} image={nearbySites[0].image} />
      <section className="nearby-section section-pad">
        <div className="nearby-grid">
          {nearbySites.map((site, i) => (
            <article key={i} className={`nearby-card ${i % 2 === 1 ? 'reverse' : ''}`}>
              <div className="nearby-card-image">
                <img
                  src={site.image}
                  alt={tr(site.name, lang)}
                  onError={(event) => {
                    const image = event.currentTarget;
                    if (image.dataset.fallbackApplied === 'true') return;
                    image.dataset.fallbackApplied = 'true';
                    image.src = fallbackAttractionImage;
                  }}
                />
                <button className="nearby-image-trigger" onClick={() => openGallery(i)}>{tr(t.nearby.photos, lang)}</button>
              </div>
              <div className="nearby-card-body">
                <div className="nearby-distance">
                  <MapPin size={16} /> {site.distance} {tr(t.nearby.distance, lang)}
                </div>
                <h3>{tr(site.name, lang)}</h3>
                <p>{tr(site.desc, lang)}</p>
                <div className="nearby-actions">
                  <button className="text-link" onClick={() => openGallery(i)}>{tr(t.nearby.photos, lang)} <ArrowUpRight size={16} /></button>
                  <button className="text-link">{tr(t.nearby.visit, lang)} <ArrowUpRight size={16} /></button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="nearby-map-cta">
        <div>
          <p className="eyebrow light">{tr(t.hero.eyebrow, lang)}</p>
          <h2>{tr(t.nearby.title, lang)}</h2>
          <p>{tr(t.nearby.subtitle, lang)}</p>
        </div>
      </section>

      {selectedSite && (
        <div className="modal-backdrop" onClick={closeGallery}>
          <div className="nearby-modal" onClick={(event: any) => event.stopPropagation()}>
            <button className="close-modal" onClick={closeGallery} aria-label="Close attraction gallery"><X size={18} /></button>
            <p className="eyebrow">{tr(t.nav.gallery, lang)}</p>
            <h3>{tr(selectedSite.name, lang)}</h3>
            <p className="nearby-modal-subtitle">{tr(selectedSite.desc, lang)}</p>

            <div className="nearby-modal-main-image">
              <img
                src={siteImages[activeImage]}
                alt={tr(selectedSite.name, lang)}
                onError={(event) => {
                  const image = event.currentTarget;
                  if (image.dataset.fallbackApplied === 'true') return;
                  image.dataset.fallbackApplied = 'true';
                  image.src = fallbackAttractionImage;
                }}
              />
            </div>
  
            <div className="nearby-modal-thumbs">
              {siteImages.map((image, index) => (
                <button key={image} className={index === activeImage ? 'active' : ''} onClick={() => setActiveImage(index)}>
                  <img
                    src={image}
                    alt={`${tr(selectedSite.name, lang)} ${index + 1}`}
                    onError={(event) => {
                      const thumb = event.currentTarget;
                      if (thumb.dataset.fallbackApplied === 'true') return;
                      thumb.dataset.fallbackApplied = 'true';
                      thumb.src = fallbackAttractionImage;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
  