import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const RoleApply = () => {
    const { roleId } = useParams();
    const [role, setRole] = useState(null);
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const fetchRole = useCallback(async () => {
        try {
            const response = await axios.get(`/roles/${roleId}`);
            setRole(response.data);
        } catch {
            toast.error('Failed to load role details');
        }
    }, [roleId]);

    useEffect(() => {
        fetchRole();
    }, [fetchRole]);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === 'application/pdf') {
            setFile(selected);
        } else {
            toast.error('Please upload a PDF file');
            e.target.value = null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setIsAnalyzing(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobRoleId', roleId);

        try {
            const response = await axios.post('/analyze/resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Analysis Complete!');
            navigate(`/student/analysis-result/${response.data.id}`);
        } catch {
            toast.error('Analysis failed. Please try again.');
            setIsAnalyzing(false);
        }
    };

    if (!role) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6"
        >
            {isAnalyzing ? (
                <div className="text-center w-full max-w-xl p-12 bg-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(249,115,22,0.15)] border border-orange-200">
                    <div className="relative w-40 h-40 mx-auto mb-10">
                        <div className="absolute inset-0 rounded-full border-4 border-orange-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                        <div className="absolute inset-4 bg-orange-50 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-orange-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l.707.707m1.77 8.882l.059.058m-4.305 0l-.059-.058m2.152-4.305L12 12m0 0l-1.318 4.614A1 1 0 0011.64 18h.72a1 1 0 00.958-.686L14.636 12M12 12l1.318-4.614A1 1 0 0012.36 6h-.72a1 1 0 00-.958.686L9.364 12" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-orange-500 mb-4 animate-pulse uppercase">Analyzing Resume</h2>
                    <p className="text-gray-500 text-lg">Our AI is mapping your resume against <strong className="text-gray-800">{role.title}</strong> requirements. This takes 10-20 seconds.</p>
                </div>
            ) : (
                <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="space-y-8"
                    >
                        <h1 className="text-5xl font-black text-gray-900">{role.title}</h1>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-1">Basic Requirements</h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{role.basicRequirements}</p>
                            </div>
                            <div>
                                <h3 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-1">Role Description</h3>
                                <p className="text-gray-500 leading-relaxed">{role.description}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20 }}
                        animate={{ x: 0 }}
                        className="bg-white p-10 rounded-3xl shadow-[0_8px_40px_-12px_rgba(249,115,22,0.12)] border border-orange-100 flex flex-col justify-center"
                    >
                        <h2 className="text-3xl font-bold mb-8 text-gray-900">Upload Your Resume</h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <label
                                className={`w-full aspect-square md:aspect-video rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-orange-500 bg-orange-50' : 'border-orange-300 hover:border-orange-500'}`}
                            >
                                {!file ? (
                                    <span className="text-xl font-bold text-gray-400 text-center">Drop PDF or Click to Upload</span>
                                ) : (
                                    <span className="text-xl font-bold text-orange-500">{file.name}</span>
                                )}
                                <input type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                            </label>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={!file}
                                className="w-full py-5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-xl font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/20"
                            >
                                Start AI Analysis
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default RoleApply;
