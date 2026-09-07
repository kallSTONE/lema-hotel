import { useState } from 'react';
import { X } from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { t, tr, galleryImages } from '@/data/content';
import { PageHeader } from '@/components/Layout';
  
type Filter = 'all' | 'rooms' | 'dining' | 'amenities';
    
export default function Gallery() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<Filter>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter(img => img.category === filter);
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: tr(t.menu.all, lang) },
    { key: 'rooms', label: tr(t.gallery.rooms, lang) },
    { key: 'dining', label: tr(t.gallery.dining, lang) },
    { key: 'amenities', label: tr(t.gallery.amenities, lang) },
  ];
 
  return (
    <main>
      <PageHeader title={tr(t.gallery.title, lang)} subtitle={tr(t.gallery.subtitle, lang)} image={galleryImages[0].url} />
      <section className="gallery-page section-pad">
        <div className="gallery-filters">
          {filters.map(f => (
            <button key={f.key} className={filter === f.key ? 'active' : ''} onClick={() => setFilter(f.key)}>{f.label}</button>
          ))}   
        </div>
        <div className="gallery-masonry">
          {filtered.map((img, i) => (
            <div key={i} className="gallery-masonry-item" onClick={() => setLightbox(img.url)}>
              <img src={img.url} alt={tr(img.caption, lang)} loading="lazy" />
              <div className="gallery-caption">{tr(img.caption, lang)}</div>
            </div>
          ))}
        </div>
      </section>
      {lightbox && ( 
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close"><X /></button>
          <img src={lightbox} alt="Gallery" />
        </div>
      )} 
    </main>
  );
}
