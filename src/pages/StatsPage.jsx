import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://url-shortener-backend-bchw.onrender.com';

function StatsPage() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  const { code } = useParams(); // ดึง "code" มาจาก URL เช่น /stats/jazz -> code = "jazz"

  useEffect(() => {
    // ฟังก์ชันนี้จะรันเมื่อ component โหลด หรือเมื่อ "code" ใน URL เปลี่ยน
    const fetchStats = async () => {
      if (!code) return;
      setLoading(true);
      setError('');
      setStats(null);
      try {
        const response = await axios.get(`${API_URL}/stats/${code}`);
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Could not fetch stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [code]); // Dependency array บอกให้รันใหม่เมื่อ code เปลี่ยน

  return (
    <div className="w-full max-w-2xl bg-slate-800 p-8 rounded-lg shadow-lg">
       <Link to="/" className="text-cyan-400 hover:underline mb-6 block">&larr; Create another link</Link>

      <h2 className="text-2xl font-bold mb-4">Link Statistics</h2>
      
      {loading && <p>Loading stats...</p>}
      {error && <div className="mt-4 bg-red-500/30 text-red-300 p-3 rounded">{error}</div>}
      {stats && (
          <div className="mt-4 bg-blue-500/30 text-blue-300 p-3 rounded space-y-2">
              <p><span className="font-bold">Short URL:</span> <a href={stats.shortUrl} target="_blank" rel="noopener noreferrer" className="underline">{stats.shortUrl}</a></p>
              <p><span className="font-bold">Original URL:</span> <span className="break-all">{stats.longUrl}</span></p>
              <p className="text-lg"><span className="font-bold">Total Clicks:</span> <span className="text-2xl font-bold text-lime-400">{stats.clicks}</span></p>
          </div>
      )}
    </div>
  );
}

export default StatsPage;