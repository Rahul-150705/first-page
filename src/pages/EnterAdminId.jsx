import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';

const EnterAdminId = () => {
    const [adminCode, setAdminCode] = useState('');
    const [validating, setValidating] = useState(false);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!adminCode.trim()) return;

        setValidating(true);
        try {
            const response = await axios.get(`/roles/student/${adminCode}`);
            if (response.data) {
                toast.success('Admin Verified!');
                navigate(`/student/dashboard/${adminCode}`);
            }
        } catch {
            toast.error('Invalid Admin ID. Please check and try again.');
        } finally {
            setValidating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-12 rounded-3xl border border-orange-100 shadow-[0_8px_40px_-12px_rgba(249,115,22,0.15)] space-y-10">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-500 text-4xl font-black mx-auto border border-orange-200">ID</div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Enter Admin ID</h1>
                    <p className="text-gray-400 text-lg">Input the unique code provided by your administrator to access roles.</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <input
                        type="text"
                        className="w-full bg-gray-50 border border-orange-200 p-6 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-400 text-center text-2xl font-mono font-bold tracking-widest uppercase transition-all text-gray-900"
                        placeholder="ADMIN-XXXX"
                        value={adminCode}
                        onChange={(e) => setAdminCode(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={validating}
                        className="w-full py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 text-white text-xl font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/30 uppercase tracking-widest"
                    >
                        {validating ? 'Verifying...' : 'Access Roles'}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                    TN State Skills Platform
                </p>
            </div>
        </div>
    );
};

export default EnterAdminId;
