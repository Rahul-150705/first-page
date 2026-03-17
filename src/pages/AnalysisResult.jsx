import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AnalysisResult = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResult = useCallback(async () => {
    try {
      const response = await axios.get(`/analyze/result/${id}`);
      setResult(response.data);
    } catch {
      toast.error('Failed to load analysis results');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  const handleExport = async () => {
    try {
      const response = await axios.get(`/analyze/export/${id}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Analysis_Report_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch {
      toast.error('Failed to export PDF');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (!result) return null;

  const scoreColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 text-gray-900 p-6 md:p-12 pb-24"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tight text-orange-500 uppercase">{result.jobRoleTitle}</h1>
            <p className="text-gray-500 text-xl font-medium tracking-wide">Analysis Report for {result.studentName}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="px-8 py-4 bg-white hover:bg-orange-50 rounded-2xl flex items-center gap-3 transition-all border border-orange-200 font-bold group shadow-sm text-gray-700"
          >
            Export Comprehensive Report (PDF)
          </motion.button>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 bg-white p-12 rounded-3xl border border-orange-100 shadow-[0_4px_32px_-8px_rgba(249,115,22,0.1)]">
          <div className="flex flex-col items-center justify-center space-y-6 lg:border-r border-orange-100 pr-0 lg:pr-12">
            <div className="w-64 h-64 relative drop-shadow-[0_0_25px_rgba(249,115,22,0.2)]">
              <CircularProgressbar
                value={result.matchPercentage}
                text={`${Math.round(result.matchPercentage)}%`}
                styles={buildStyles({
                  pathColor: result.matchPercentage >= 70 ? '#10b981' : '#f59e0b',
                  textColor: '#111827',
                  trailColor: '#fed7aa',
                  textSize: '18px',
                  strokeLinecap: 'round'
                })}
              />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-wider text-center">Overall Match Score</h3>
          </div>

          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-2xl font-bold text-gray-500 flex items-center gap-3">
              AI Assessment Summary
            </h3>
            <p className="text-2xl leading-relaxed text-gray-700 font-medium italic opacity-95">
              "{result.recommendationSummary}"
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Technical Skills', score: result.scores.technicalSkills, color: 'emerald' },
                { label: 'Certifications', score: result.scores.certifications, color: 'blue' },
                { label: 'Creativity', score: result.scores.creativity, color: 'purple' },
                { label: 'Responsiveness', score: result.scores.responsiveness, color: 'amber' }
              ].map(stat => (
                <div key={stat.label} className="bg-gray-50 p-6 rounded-3xl border border-orange-100 hover:border-orange-300 transition-all group">
                  <p className="text-xs font-black uppercase text-gray-400 mb-4">{stat.label}</p>
                  <div className="text-3xl font-black mb-1 text-gray-900 group-hover:text-orange-500 transition-colors">{stat.score}/100</div>
                  <div className="w-full bg-orange-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.score}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full ${scoreColors[stat.color]}`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <section className="bg-white p-10 rounded-2xl border border-orange-100 shadow-sm space-y-8">
            <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tight flex items-center gap-3">
              Skill Analysis Breakdown
            </h3>

            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                  Matched Skills
                  <span className="text-emerald-500">{result.matchedSkills?.length || 0} found</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills?.map(s => (
                    <span key={s} className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-sm font-bold border border-emerald-200">{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                  Missing Skills
                  <span className="text-red-500">{result.missingSkills?.length || 0} gaps</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills?.map(s => (
                    <span key={s} className="bg-red-50 text-red-500 px-4 py-2 rounded-xl text-sm font-bold border border-red-200">{s}</span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                  Partial Matches
                  <span className="text-amber-500">{result.partialSkills?.length || 0} areas</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.partialSkills?.map(s => (
                    <span key={s} className="bg-amber-50 text-amber-600 px-4 py-2 rounded-xl text-sm font-bold border border-amber-200">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <h3 className="text-2xl font-black text-orange-500 uppercase tracking-tight flex items-center gap-3 px-4">
              Top 3 Upskilling Recommendations
            </h3>

            <div className="space-y-4">
              {result.recommendedCourses?.map((course, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                  className="bg-white p-8 rounded-2xl border border-orange-100 hover:border-orange-400 transition-all group flex items-start gap-6 shadow-sm"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg group-hover:scale-110 transition-all">
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em]">{course.platform}</span>
                      <div className="h-0.5 w-6 bg-orange-200"></div>
                    </div>
                    <h4 className="text-xl font-bold group-hover:text-orange-500 transition-colors leading-tight uppercase text-gray-800">{course.courseName}</h4>
                    <a
                      href={course.courseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-orange-600 font-bold text-sm bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all mt-4 border border-orange-200"
                    >
                      Explore Course
                    </a>
                  </div>
                </motion.div>
              )) || (
                  <p className="text-gray-400 text-center italic py-20 bg-white rounded-2xl border border-dashed border-orange-200">No specific courses found for these skills.</p>
                )}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
