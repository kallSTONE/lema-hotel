import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, BedDouble, Bell, CalendarDays, Check, ChevronRight, Edit3,
  LayoutDashboard, MessageCircle, MoreHorizontal, Plus, Settings, Sparkles,
  Star, Trash2, Utensils, Users, X,
} from 'lucide-react';
import { useLang } from '@/context/LangContext';
import { t, tr, rooms } from '@/data/content';
import { BookingModal } from '@/components/Layout';
   
type AdminPage = 'overview' | 'bookings' | 'tables' | 'reviews' | 'announcements' | 'rooms' | 'settings';
      
type Booking = { id: number; guest: string; room: string; dates: string; status: 'Confirmed' | 'Pending' };
type TableRes = { id: number; name: string; size: number; time: string; status: 'Seated' | 'Waiting' | 'Reserved' };
type Review = { id: number; guest: string; rating: number; text: string; date: string };

const initialBookings: Booking[] = [
  { id: 1, guest: 'Dawit Alemu', room: 'Executive Suite', dates: 'Aug 21 – Aug 24', status: 'Confirmed' },
  { id: 2, guest: 'Hanna Belay', room: 'Deluxe King', dates: 'Aug 22 – Aug 25', status: 'Pending' },
  { id: 3, guest: 'Michael Chen', room: 'Classic Twin', dates: 'Aug 23 – Aug 27', status: 'Confirmed' },
  { id: 4, guest: 'Sara Mohammed', room: 'Family Room', dates: 'Aug 24 – Aug 28', status: 'Pending' },
  { id: 5, guest: 'Yonas Bekele', room: 'Presidential Suite', dates: 'Aug 25 – Aug 30', status: 'Confirmed' },
];

const initialTables: TableRes[] = [
  { id: 1, name: 'Table 5 · Window', size: 2, time: '7:00 PM', status: 'Seated' },
  { id: 2, name: 'Table 12 · Garden', size: 4, time: '7:30 PM', status: 'Reserved' },
  { id: 3, name: 'Table 3 · Patio', size: 6, time: '8:00 PM', status: 'Waiting' },
  { id: 4, name: 'Table 8 · Interior', size: 2, time: '8:15 PM', status: 'Reserved' },
  { id: 5, name: 'Table 1 · Window', size: 3, time: '8:30 PM', status: 'Seated' },
];

const initialReviews: Review[] = [
  { id: 1, guest: 'Nardos M.', rating: 5, text: 'Lema Hotel is the kind of place that makes you want to turn your phone off and stay one more night.', date: 'Aug 18, 2026' },
  { id: 2, guest: 'James K.', rating: 5, text: 'The coffee ceremony at sunrise was unforgettable. The staff treated us like family.', date: 'Aug 15, 2026' },
  { id: 3, guest: 'Selam T.', rating: 4, text: 'Beautiful rooms and incredible food. The doro wat is the best I\'ve had in Ethiopia.', date: 'Aug 12, 2026' },
];

export default function Admin() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [page, setPage] = useState<AdminPage>('overview');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [tables, setTables] = useState<TableRes[]>(initialTables);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [announcement, setAnnouncement] = useState('Sunday brunch is now served from 8:00 AM to 2:00 PM.');
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    setMobileSidebar(false);
  }, [page]);

  const navItems: { key: AdminPage; icon: typeof LayoutDashboard; label: string; badge?: number }[] = [
    { key: 'overview', icon: LayoutDashboard, label: tr(t.admin.overview, lang) },
    { key: 'bookings', icon: CalendarDays, label: tr(t.admin.bookings, lang), badge: bookings.length },
    { key: 'tables', icon: Utensils, label: tr(t.admin.tables, lang) },
    { key: 'reviews', icon: MessageCircle, label: tr(t.admin.reviews, lang), badge: reviews.length },
    { key: 'announcements', icon: Bell, label: tr(t.admin.announcements, lang) },
    { key: 'rooms', icon: BedDouble, label: tr(t.admin.rooms, lang) },
    { key: 'settings', icon: Settings, label: tr(t.admin.settings, lang) },
  ];

  const toggleBookingStatus = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: b.status === 'Confirmed' ? 'Pending' : 'Confirmed' } : b));
  };
  const deleteBooking = (id: number) => setBookings(prev => prev.filter(b => b.id !== id));
  const advanceTableStatus = (id: number) => {
    const flow: Record<string, TableRes['status']> = { Reserved: 'Waiting', Waiting: 'Seated', Seated: 'Reserved' };
    setTables(prev => prev.map(tb => tb.id === id ? { ...tb, status: flow[tb.status] } : tb));
  };
  const deleteReview = (id: number) => setReviews(prev => prev.filter(r => r.id !== id));

  return (
    <div className="admin-panel">
      <BookingModal open={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
      <div className="admin-top">
        <div className="admin-title">
          <button className="admin-menu-btn" onClick={() => setMobileSidebar(!mobileSidebar)}><LayoutDashboard size={19} /></button>
          <div className="admin-logo"><LayoutDashboard size={19} /></div>
          <span>Lema / <strong>{tr(t.admin.title, lang)}</strong></span>
        </div>
        <div className="admin-user">
          <Bell size={18} />
          <span className="user-dot" />
          <span>Admin</span>
          <Link to="/"><X size={19} /></Link>
        </div>
      </div>
      <div className="admin-body">
        <aside className={mobileSidebar ? 'mobile-visible' : ''}>
          <p className="side-label">{tr(t.admin.workspace, lang)}</p>
          {navItems.slice(0, 5).map(item => (
            <button key={item.key} className={page === item.key ? 'active' : ''} onClick={() => setPage(item.key)}>
              <item.icon size={17} /> {item.label}
              {item.badge ? <b>{item.badge}</b> : null}
            </button>
          ))}
          <p className="side-label second">{tr(t.admin.manage, lang)}</p>
          {navItems.slice(5).map(item => (
            <button key={item.key} className={page === item.key ? 'active' : ''} onClick={() => setPage(item.key)}>
              <item.icon size={17} /> {item.label}
            </button>
          ))}
          <div className="admin-help">
            <Sparkles size={18} />
            <strong>{tr(t.admin.needHelp, lang)}</strong>
            <span>{tr(t.admin.hereForYou, lang)}</span>
          </div>
        </aside>
        <div className="dashboard">
          {page === 'overview' && (
            <>
              <div className="dashboard-header">
                <div>
                  <p className="eyebrow">Thursday, 21 August 2026</p>
                  <h1>{tr(t.admin.goodMorning, lang)}</h1>
                </div>
                <button className="dark-button" onClick={() => setBookingModalOpen(true)}><Plus size={17} /> {tr(t.admin.newBooking, lang)}</button>
              </div>
              <div className="stat-grid">
                <div><span>{tr(t.admin.totalBookings, lang)}</span><strong>48</strong><small className="positive">↑ 12.5% <i>vs last month</i></small></div>
                <div><span>{tr(t.admin.occupancy, lang)}</span><strong>76%</strong><small className="positive">↑ 8.4% <i>vs last month</i></small></div>
                <div><span>{tr(t.admin.tableRes, lang)}</span><strong>24</strong><small className="neutral">Today</small></div>
                <div><span>{tr(t.admin.guestRating, lang)}</span><strong>4.9 <Star size={17} fill="currentColor" /></strong><small className="positive">↑ 0.2 <i>vs last month</i></small></div>
              </div>
              <div className="dashboard-grid">
                <div className="dashboard-card bookings-card">
                  <div className="card-title">
                    <div><p className="eyebrow">{tr(t.admin.latestActivity, lang)}</p><h2>{tr(t.admin.upcoming, lang)}</h2></div>
                    <button onClick={() => setPage('bookings')}>{tr(t.admin.viewAll, lang)} <ChevronRight size={16} /></button>
                  </div>
                  <div className="booking-table">
                    <div className="table-head"><span>{tr(t.admin.guest, lang)}</span><span>{tr(t.admin.room, lang)}</span><span>{tr(t.admin.dates, lang)}</span><span>{tr(t.admin.status, lang)}</span><span /></div>
                    {bookings.slice(0, 3).map(booking => (
                      <div className="table-row" key={booking.id}>
                        <span className="guest-name"><span className="guest-avatar">{booking.guest.charAt(0)}</span>{booking.guest}</span>
                        <span>{booking.room}</span>
                        <span>{booking.dates}</span>
                        <span className={booking.status === 'Confirmed' ? 'status confirmed' : 'status pending'}>{booking.status}</span>
                        <MoreHorizontal size={18} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="dashboard-card announcement-card">
                  <div className="card-title">
                    <div><p className="eyebrow">{tr(t.admin.guestComm, lang)}</p><h2>{tr(t.admin.announcements, lang)}</h2></div>
                    <Bell size={19} />
                  </div>
                  <p>{tr(t.admin.announcementDesc, lang)}</p>
                  <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)} placeholder="Write an announcement..." />
                  <button className="save-button" onClick={() => navigate('/')}><Check size={16} /> {tr(t.admin.publish, lang)}</button>
                </div>
              </div>
            </>
          )}
          {page === 'bookings' && (
            <>
              <div className="dashboard-header">
                <div><p className="eyebrow">{tr(t.admin.manage, lang)}</p><h1>{tr(t.admin.bookings, lang)}</h1></div>
                <button className="dark-button" onClick={() => setBookingModalOpen(true)}><Plus size={17} /> {tr(t.admin.newBooking, lang)}</button>
              </div>
              <div className="dashboard-card full-width-card">
                <div className="booking-table">
                  <div className="table-head"><span>{tr(t.admin.guest, lang)}</span><span>{tr(t.admin.room, lang)}</span><span>{tr(t.admin.dates, lang)}</span><span>{tr(t.admin.status, lang)}</span><span>Actions</span></div>
                  {bookings.map(booking => (
                    <div className="table-row" key={booking.id}>
                      <span className="guest-name"><span className="guest-avatar">{booking.guest.charAt(0)}</span>{booking.guest}</span>
                      <span>{booking.room}</span>
                      <span>{booking.dates}</span>
                      <span className={booking.status === 'Confirmed' ? 'status confirmed' : 'status pending'}>{booking.status}</span>
                      <span className="row-actions">
                        <button className="row-btn" onClick={() => toggleBookingStatus(booking.id)} title="Toggle status"><Check size={15} /></button>
                        <button className="row-btn danger" onClick={() => deleteBooking(booking.id)} title="Delete"><Trash2 size={15} /></button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {page === 'tables' && (
            <>
              <div className="dashboard-header"><div><p className="eyebrow">{tr(t.admin.manage, lang)}</p><h1>{tr(t.admin.tables, lang)}</h1></div></div>
              <div className="tables-grid">
                {tables.map(tb => (
                  <div className="table-res-card" key={tb.id}>
                    <div className="table-res-head">
                      <h3>{tb.name}</h3>
                      <span className={`table-status ${tb.status.toLowerCase()}`}>{tb.status}</span>
                    </div>
                    <div className="table-res-meta">
                      <span><Users size={15} /> {tb.size} guests</span>
                      <span><CalendarDays size={15} /> {tb.time}</span>
                    </div>
                    <button className="row-btn full" onClick={() => advanceTableStatus(tb.id)}>Advance status <ChevronRight size={14} /></button>
                  </div>
                ))}
              </div>
            </>
          )}
          {page === 'reviews' && (
            <>
              <div className="dashboard-header"><div><p className="eyebrow">{tr(t.admin.manage, lang)}</p><h1>{tr(t.admin.reviews, lang)}</h1></div></div>
              <div className="reviews-list">
                {reviews.map(rv => (
                  <div className="review-card" key={rv.id}>
                    <div className="review-head">
                      <span className="guest-name"><span className="guest-avatar">{rv.guest.charAt(0)}</span>{rv.guest}</span>
                      <div className="stars">{Array.from({ length: rv.rating }).map((_, i) => <Star key={i} size={13} fill="currentColor" />)}</div>
                    </div>
                    <p>"{rv.text}"</p>
                    <div className="review-foot"><small>{rv.date}</small><button className="row-btn danger" onClick={() => deleteReview(rv.id)}><Trash2 size={15} /></button></div>
                  </div>
                ))}
              </div>
            </>
          )}
          {page === 'announcements' && (
            <>
              <div className="dashboard-header"><div><p className="eyebrow">{tr(t.admin.guestComm, lang)}</p><h1>{tr(t.admin.announcements, lang)}</h1></div></div>
              <div className="dashboard-card announcement-card full">
                <p>{tr(t.admin.announcementDesc, lang)}</p>
                <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)} placeholder="Write an announcement..." />
                <button className="save-button" onClick={() => navigate('/')}><Check size={16} /> {tr(t.admin.publish, lang)}</button>
              </div>
            </>
          )}
          {page === 'rooms' && (
            <>
              <div className="dashboard-header"><div><p className="eyebrow">{tr(t.admin.manage, lang)}</p><h1>{tr(t.admin.rooms, lang)}</h1></div></div>
              <div className="admin-rooms-grid">
                {rooms.map(r => (
                  <div className="admin-room-card" key={r.id}>
                    <img src={r.image} alt={tr(r.name, lang)} />
                    <div className="admin-room-body">
                      <div className="admin-room-head">
                        <h3>{tr(r.name, lang)}</h3>
                        <span className={`room-badge ${r.available ? 'available' : 'taken'}`}>{r.available ? tr(t.rooms.available, lang) : tr(t.rooms.taken, lang)}</span>
                      </div>
                      <p>ETB {r.price.toLocaleString()} · {r.size} · {r.bed}</p>
                      <div className="row-actions">
                        <button className="row-btn"><Edit3 size={15} /></button>
                        <button className="row-btn"><Settings size={15} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {page === 'settings' && (
            <>
              <div className="dashboard-header"><div><p className="eyebrow">{tr(t.admin.manage, lang)}</p><h1>{tr(t.admin.settings, lang)}</h1></div></div>
              <div className="dashboard-card full">
                <div className="settings-row"><div><strong>Hotel name</strong><span>Lema Hotel</span></div><button className="row-btn"><Edit3 size={15} /></button></div>
                <div className="settings-row"><div><strong>Location</strong><span>Hossana, Ethiopia</span></div><button className="row-btn"><Edit3 size={15} /></button></div>
                <div className="settings-row"><div><strong>Currency</strong><span>ETB (Ethiopian Birr)</span></div><button className="row-btn"><Edit3 size={15} /></button></div>
                <div className="settings-row"><div><strong>Languages</strong><span>English, Amharic, Hadiyissa</span></div><button className="row-btn"><Edit3 size={15} /></button></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
