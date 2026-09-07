import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLang } from  '@/context/LangContext';
import { t, tr, menuItems, type MenuCategory } from '@/data/content';
import { PageHeader } from  '@/components/Layout';

const categories: MenuCategory[] = ['breakfast', 'lunch', 'dinner', 'drinks', 'desserts']; 

export default function Menu() {
  const { lang } = useLang();
  const [active, setActive] = useState<'all' | MenuCategory>('all');
  const [search, setSearch] = useState('');

  const filtered = menuItems.filter(item => {
    const matchCat = active === 'all' || item.category === active;
    const matchSearch = tr(item.name, lang).toLowerCase().includes(search.toLowerCase()) || tr(item.desc, lang).toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  
  return (
    <main>
      <PageHeader title={tr(t.menu.title, lang)} subtitle={tr(t.menu.subtitle, lang)} image="/assets/Images/LemHotelVenue.jpg" />
      <section className="menu-section section-pad">
        <div className="menu-controls">
          <div className="menu-search">
            <Search size={18} />
            <input type="text" placeholder={tr(t.menu.search, lang)} value={search} onChange={e => setSearch(e.target.value)} /> 
          </div>
          <div className="menu-tabs">
            <button className={active === 'all' ? 'active' : ''} onClick={() => setActive('all')}>{tr(t.menu.all, lang)}</button>
            {categories.map(cat => (
              <button key={cat} className={active === cat ? 'active' : ''} onClick={() => setActive(cat)}>{tr(t.menu[cat], lang)}</button>
            ))}
          </div>
        </div>
        <div className="menu-grid">
          {filtered.length === 0 ? (
            <p className="no-results">{tr(t.menu.noResults, lang)}</p>
          ) : (
            filtered.map(item => (
              <article key={item.id} className="menu-card">
                <div className="menu-card-image">
                  <img src={item.image} alt={tr(item.name, lang)} />
                  {item.tags.includes('signature') && <span className="menu-tag signature">Signature</span>}
                  {item.tags.includes('spicy') && <span className="menu-tag spicy">Spicy</span>}
                  {item.tags.includes('vegetarian') && <span className="menu-tag veg">Veg</span>}
                  {item.tags.includes('vegan') && <span className="menu-tag vegan">Vegan</span>}
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-head">
                    <h3>{tr(item.name, lang)}</h3>
                    <span className="menu-price">ETB {item.price}</span>
                  </div>
                  <p>{tr(item.desc, lang)}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
