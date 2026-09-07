import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LangProvider } from '@/context/LangContext';
import { Navbar, Footer, FloatingBookButton, BookingModal } from '@/components/Layout';
import Home from '@/pages/Home';
import Rooms from '@/pages/Rooms';
import Menu from '@/pages/Menu';
import Gallery from '@/pages/Gallery';
import About from '@/pages/About';
import Nearby from '@/pages/Nearby';
import Admin from '@/pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
  return null;
}
  

function SiteLayout() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [chromeVisible, setChromeVisible] = useState(true);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isHome = location.pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setChromeVisible(true);
      return;
    }

    // Hide header when first arriving at home.
    setChromeVisible(false);

    // Watch the hero section — reveal the header only once the hero has
    // scrolled almost entirely off-screen (i.e. the next section is about
    // to reach the top of the viewport).
    const hero = document.querySelector('.hero') as HTMLElement | null;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting is false when the hero is no longer visible.
        setChromeVisible(!entry.isIntersecting);
      },
      {
        // Fire when less than 5% of the hero is still on screen, meaning
        // it has almost fully scrolled past the top.
        threshold: 0.05,
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar
        onBook={() => setBookingOpen(true)}
        chromeVisible={chromeVisible || !isHome}
      />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home onBook={() => setBookingOpen(true)} />} />
        <Route path="/rooms" element={<Rooms onBook={() => setBookingOpen(true)} />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/nearby" element={<Nearby />} />
      </Routes>

      <Footer />

      <FloatingBookButton
        onBook={() => setBookingOpen(true)}
        visible={chromeVisible || !isHome}
      />

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}


function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <SiteLayout />
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
