import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const StudentLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post('/auth/login', { email, password });
            if (data.role !== 'STUDENT') {
                toast.error('This account is not a Student. Use Admin Login.');
                return;
            }
            login(data);
            toast.success('Welcome! Ready to analyze your skills.');
            navigate('/student/enter-admin-id');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full space-y-10 bg-white p-12 rounded-3xl shadow-[0_8px_40px_-12px_rgba(249,115,22,0.15)] border border-orange-100"
            >
                <div className="text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 text-2xl font-black mx-auto mb-6 border border-amber-200">S</div>
                    <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Student Login</h2>
                    <p className="text-gray-400 mt-2">Access your personalized skill analysis.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email Address" value={email}
                        className="w-full bg-gray-50 border border-orange-200 p-4 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 text-gray-900 transition-all font-medium"
                        onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password}
                        className="w-full bg-gray-50 border border-orange-200 p-4 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 text-gray-900 transition-all font-medium"
                        onChange={(e) => setPassword(e.target.value)} required />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        type="submit" disabled={loading}
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-500/30 transition-all">
                        {loading ? 'Logging in...' : 'Login to Dashboard'}
                    </motion.button>
                </form>
                <p className="text-center text-gray-400 font-medium">
                    New here? <Link to="/student/signup" className="text-orange-500 font-black hover:underline uppercase tracking-widest text-xs">Join Student Pool</Link>
                </p>
                <div className="text-center">
                    <Link to="/" className="text-gray-400 hover:text-orange-500 text-xs font-black uppercase tracking-widest">← Back to Portal</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default StudentLogin;
