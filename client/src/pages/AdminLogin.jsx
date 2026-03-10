import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../lib/api';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(apiUrl('/admin/login'), credentials);
            if (res.data.success) {
                localStorage.setItem('ys_admin_token', res.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 50%, #16213e 100%)' }}>
            <div className="w-full max-w-md mx-4">
                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src="/logo.png" alt="Youth Spark Logo" style={{ width: '80%', height: 'auto' }} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Youth Spark Admin</h1>
                    <p className="text-sm mt-1" style={{ color: '#888' }}>Restricted access — authorized personnel only</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <h2 className="text-xl font-semibold text-white mb-6">Sign In</h2>

                    {error && (
                        <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-1" style={{ color: '#aaa' }}>Username</label>
                            <input
                                type="text"
                                required
                                className="w-full rounded-lg px-4 py-3 text-white outline-none focus:ring-2"
                                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', '--tw-ring-color': '#FCD12A' }}
                                value={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                placeholder="admin"
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1" style={{ color: '#aaa' }}>Password</label>
                            <input
                                type="password"
                                required
                                className="w-full rounded-lg px-4 py-3 text-white outline-none focus:ring-2"
                                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', '--tw-ring-color': '#FCD12A' }}
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center mt-2">
                            <input type="checkbox" id="remember" className="mr-2 accent-[#FCD12A]" />
                            <label htmlFor="remember" className="text-sm" style={{ color: '#aaa' }}>Remember me</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg font-semibold mt-2 transition-all duration-200"
                            style={{
                                background: loading ? '#555' : '#FCD12A',
                                color: '#0A0A0A',
                                cursor: loading ? 'wait' : 'pointer',
                            }}
                        >
                            {loading ? 'Signing in…' : 'Sign In'}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs mt-6" style={{ color: '#555' }}>
                    © {new Date().getFullYear()} Youth Spark Nexus — Admin Portal
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
