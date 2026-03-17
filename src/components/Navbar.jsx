import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Home, PlusCircle, UserCircle, Search } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="w-64 bg-white border-r border-orange-100 h-screen flex flex-col p-6 fixed left-0 top-0 z-50 shadow-[4px_0_24px_-6px_rgba(249,115,22,0.08)]">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white bg-orange-500 shadow-lg shadow-orange-500/30">
          TN
        </div>
        <div>
          <h1 className="text-gray-900 font-bold text-sm tracking-tight leading-none uppercase">Skill Analyzer</h1>
          <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">v2.0</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {user.role === 'ADMIN' ? (
          <>
            <Link to="/admin/dashboard" className="flex items-center gap-4 text-gray-500 hover:text-orange-600 p-3 rounded-xl hover:bg-orange-50 transition-all font-bold text-sm tracking-wide group">
              <Home size={20} className="group-hover:text-orange-500 transition-colors" /> Command Center
            </Link>
            <Link to="/admin/roles/create" className="flex items-center gap-4 text-gray-500 hover:text-orange-600 p-3 rounded-xl hover:bg-orange-50 transition-all font-bold text-sm tracking-wide group">
              <PlusCircle size={20} className="group-hover:text-orange-500 transition-colors" /> Post New Role
            </Link>
          </>
        ) : (
          <>
            <Link to="/student/enter-admin-id" className="flex items-center gap-4 text-gray-500 hover:text-orange-600 p-3 rounded-xl hover:bg-orange-50 transition-all font-bold text-sm tracking-wide group">
              <Search size={20} className="group-hover:text-orange-500 transition-colors" /> Browse Roles
            </Link>
          </>
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-orange-100">
        <div className="flex items-center gap-4 mb-6 px-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold bg-orange-50 border border-orange-200 text-orange-500">
            <UserCircle size={20} />
          </div>
          <div className="overflow-hidden">
            <p className="text-gray-900 font-bold text-sm truncate uppercase tracking-tighter">{user.name}</p>
            <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest">{user.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-4 text-red-500 hover:text-white w-full p-3 hover:bg-red-500 rounded-xl transition-all font-bold text-sm tracking-wide group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" /> Sign Out
        </button>
      </div>
    </div>
  );
}
