import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const StudentDashboard = () => {
    const { adminCode } = useParams();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = useCallback(async () => {
        try {
            const response = await axios.get(`/roles/student/${adminCode}`);
            setRoles(response.data);
        } catch (_err) {
            toast.error('Failed to load roles for this Admin');
        } finally {
            setLoading(false);
        }
    }, [adminCode]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-50 text-gray-900 p-8"
        >
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold text-orange-500 uppercase">Available Roles</h1>
                        <p className="text-gray-400 mt-2 text-lg italic">Shared by Admin: <span className="text-orange-600 font-mono font-bold uppercase">{adminCode}</span></p>
                    </div>
                    <Link to="/student/enter-admin-id" className="text-gray-500 hover:text-orange-500 flex items-center gap-2 transition-colors border border-orange-200 px-4 py-2 rounded-lg bg-white">
                        Change Admin ID
                    </Link>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center py-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : roles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {roles.map((role, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={role.id}
                                className="bg-white rounded-3xl p-8 border border-orange-100 hover:border-orange-400 transition-all group shadow-[0_2px_16px_-4px_rgba(249,115,22,0.1)]"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 font-bold border border-orange-200">
                                        {idx + 1}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{role.title}</h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-4 h-[5rem] overflow-hidden">{role.description}</p>

                                <Link
                                    to={`/student/analyze/${role.id}`}
                                    className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest text-sm"
                                >
                                    Analyze Resume
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-orange-200">
                        <h3 className="text-xl font-bold text-gray-500 uppercase">No Roles Found</h3>
                        <p className="text-gray-400 max-w-sm mx-auto mt-2">Check the ID or ask your administrator for available roles.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default StudentDashboard;
