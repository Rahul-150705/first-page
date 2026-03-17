import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';

import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import AdminDashboard from './pages/AdminDashboard';
import JobRoleCreate from './pages/JobRoleCreate';
import RoleAnalyticsReport from './pages/RoleAnalyticsReport';
import EnterAdminId from './pages/EnterAdminId';
import StudentDashboard from './pages/StudentDashboard';
import RoleApply from './pages/RoleApply';
import AnalysisResult from './pages/AnalysisResult';
import LandingPage from './pages/Index';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function AppLayout({ children }) {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex">
      {user && <Navbar />}
      <div className={`flex-1 ${user ? 'ml-64' : ''}`}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute role="ADMIN"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/roles/create" element={<ProtectedRoute role="ADMIN"><JobRoleCreate /></ProtectedRoute>} />
            <Route path="/admin/analytics/role/:roleId" element={<ProtectedRoute role="ADMIN"><RoleAnalyticsReport /></ProtectedRoute>} />

            {/* Student Routes */}
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/signup" element={<StudentSignup />} />
            <Route path="/student/enter-admin-id" element={<ProtectedRoute role="STUDENT"><EnterAdminId /></ProtectedRoute>} />
            <Route path="/student/dashboard/:adminCode" element={<ProtectedRoute role="STUDENT"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/analyze/:roleId" element={<ProtectedRoute role="STUDENT"><RoleApply /></ProtectedRoute>} />
            <Route path="/student/analysis-result/:id" element={<ProtectedRoute role="STUDENT"><AnalysisResult /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
