import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = 'https://url-shortener-backend-bchw.onrender.com';

function HomePage() {
  const [longUrl, setLongUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Hook สำหรับเปลี่ยนหน้า

  const handleShortenSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/shorten`, {
        longUrl,
        customCode: customCode || undefined,
      });
      // ย่อสำเร็จ! พาไปหน้า stats ของลิงค์ใหม่
      navigate(`/stats/${response.data.urlCode}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-slate-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Create a Short Link</h2>
      <form onSubmit={handleShortenSubmit}>
        <input
          type="text"
          className="w-full p-3 bg-slate-700 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Enter a long URL to shorten..."
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <input
          type="text"
          className="w-full p-3 bg-slate-700 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          placeholder="Optional: Enter a custom name"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value)}
        />
        <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-bold transition-colors disabled:bg-slate-600" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten!'}
        </button>
      </form>
      {error && <div className="mt-4 bg-red-500/30 text-red-300 p-3 rounded">{error}</div>}
    </div>
  );
}

export default HomePage;