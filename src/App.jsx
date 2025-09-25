import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center pt-10 font-mono">
      <h1 className="text-5xl font-bold text-cyan-400 mb-8">URL Shortener</h1>

      {/* สารบัญเว็บของเราจะอยู่ตรงนี้ */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats/:code" element={<StatsPage />} />
      </Routes>
    </div>
  );
}

export default App;