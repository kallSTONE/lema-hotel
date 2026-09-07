import { useLang } from '@/context/LangContext';
import { t, tr, staff } from '@/data/content';
import { PageHeader } from '@/components/Layout';

export default function About() {
  const { lang } = useLang();
  return (
    <main> 
      <Page Header  title={tr(t.about.title, lang)} subtitle={tr(t.about.subtitle, lang)} image="/assets/Images/BuildingView.jpg" />
      <section className="about-history section-pad">
        <div className="about-history-grid">
          <div className="about-history-text">
            <p className="eyebrow">{tr(t.about.historyTitle, lang)}</p>
            <h2>{tr(t.about.title, lang)}</h2>
            <p>{tr(t.about.historyP1, lang)}</p>
            <p>{tr(t.about.historyP2, lang)}</p>
          </div>
          <div className="about-history-image">
            <img src="/assets/Images/Coridor.jpg" alt="Lem Hotel lobby" />
          </div>
        </div>
      </section>
      <section className="about-values">
        <div className="about-values-inner">
          <p className="eyebrow">{tr(t.about.valuesTitle, lang)}</p>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-num">01</span>
              <h3>{tr(t.about.value1, lang)}</h3>
              <p>{tr(t.about.value1Desc, lang)}</p>
            </div>
            <div className="value-card">
              <span className="value-num">02</span>
              <h3>{tr(t.about.value2, lang)}</h3>
              <p>{tr(t.about.value2Desc, lang)}</p>
            </div>
            <div className="value-card">
              <span className="value-num">03</span>
              <h3>{tr(t.about.value3, lang)}</h3>
              <p>{tr(t.about.value3Desc, lang)}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="about-team section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{tr(t.about.teamTitle, lang)}</p>
            <h2>{tr(t.about.teamTitle, lang)}</h2>
          </div>
          <p className="section-subtitle">{tr(t.about.teamSubtitle, lang)}</p>
        </div>
        <div className="team-grid">
          {staff.map((member, i) => (
            <article key={i} className="team-card">
              <div className="team-image">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span className="team-role">{tr(member.role, lang)}</span>
                <p>{tr(member.bio, lang)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
