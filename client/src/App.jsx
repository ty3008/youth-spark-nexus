import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './pages/Home';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import PillarsPage from './pages/PillarsPage';
import ImpactPage from './pages/ImpactPage';
import ProgramsPage from './pages/ProgramsPage';
import YouthSparkSummit from './pages/programs/YouthSparkSummit';
import YouthSparkNexus from './pages/programs/YouthSparkNexus';
import NxtAfricaForum from './pages/programs/NxtAfricaForum';
import ReconstructiveLeadership from './pages/programs/ReconstructiveLeadership';
import EngagementsPage from './pages/EngagementsPage';
import AudiencePage from './pages/AudiencePage';
import PartnershipsPage from './pages/PartnershipsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Helmet>
        <title>Youth Spark Nexus</title>
        <meta name="description" content="Empowering Kingdom-minded youth in Africa through leadership and faith." />
      </Helmet>
      <div className="bg-[#0A0A0A] text-[#BFBFBF] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pillars" element={<PillarsPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/youth-spark-summit" element={<YouthSparkSummit />} />
            <Route path="/programs/youth-spark-nexus" element={<YouthSparkNexus />} />
            <Route path="/programs/nxt-africa-forum" element={<NxtAfricaForum />} />
            <Route path="/programs/reconstructive-leadership" element={<ReconstructiveLeadership />} />
            <Route path="/engagements" element={<EngagementsPage />} />
            <Route path="/who-we-serve" element={<AudiencePage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
