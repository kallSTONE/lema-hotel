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

    const onScroll = () => {
      if (window.scrollY > 24) {
        // Once revealed, keep it visible.
        setChromeVisible(true);
   
        // We don't need to track scrolling anymore.
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
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
