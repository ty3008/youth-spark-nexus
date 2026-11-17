import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { GatheringsProvider } from './lib/GatheringsContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage'));
const ProgramPage = lazy(() => import('./pages/ProgramPage'));
const Events = lazy(() => import('./pages/Events'));
const EventDetail = lazy(() => import('./pages/EventDetail'));
const PartnershipsPage = lazy(() => import('./pages/PartnershipsPage'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));

const Loading = () => <div className="wrap section text-muted">Loading…</div>;

// The admin screens have their own top bar, so the public header and footer are left out there.
const Shell = () => {
  const isAdmin = useLocation().pathname.startsWith('/admin');
  return (
    <div className="flex min-h-screen flex-col bg-ink text-fg">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/contact" element={<Contact />} />

            {/* Old marketing URLs redirect to the designed sections on About or Programs. */}
            <Route path="/pillars" element={<Navigate to="/about#pillars" replace />} />
            <Route path="/who-we-serve" element={<Navigate to="/about#who-we-serve" replace />} />
            <Route path="/impact" element={<Navigate to="/about#impact" replace />} />
            <Route path="/engagements" element={<Navigate to="/programs#engagements" replace />} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Helmet defaultTitle="Youth Spark Summit — Gatherings for young leaders in Nairobi">
        <html lang="en" />
      </Helmet>
      <GatheringsProvider>
        <Shell />
      </GatheringsProvider>
    </Router>
  );
}

export default App;
