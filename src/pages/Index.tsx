import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-6xl md:text-7xl font-black text-orange-500 uppercase tracking-tighter mb-4">
          TN Skill Analyzer
        </h1>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto leading-relaxed">
          Next-generation AI workforce development. Bridge the gap between talent and industry requirements with precision.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-10 rounded-3xl border border-orange-200 shadow-[0_8px_40px_-12px_rgba(249,115,22,0.15)] space-y-6"
        >
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 text-2xl font-black border border-orange-200">A</div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Administrators</h2>
          <p className="text-gray-500 leading-relaxed">
            Design skill benchmarks, track student cohorts, and unlock critical workforce insights.
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/admin/login')} className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-orange-500/30 transition-all">Login</button>
            <button onClick={() => navigate('/admin/signup')} className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-black uppercase tracking-widest transition-all">Join</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-10 rounded-3xl border border-amber-200 shadow-[0_8px_40px_-12px_rgba(245,158,11,0.12)] space-y-6"
        >
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 text-2xl font-black border border-amber-200">S</div>
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Students</h2>
          <p className="text-gray-500 leading-relaxed">
            Analyze your resume against precise role metrics and bridge your skill gaps via AI.
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/student/login')} className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber-500/30 transition-all">Login</button>
            <button onClick={() => navigate('/student/signup')} className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-black uppercase tracking-widest transition-all">Join</button>
          </div>
        </motion.div>
      </div>

      <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-16 relative z-10">
        Powered by TN State Skills Platform
      </p>
    </div>
  );
};

export default LandingPage;
