import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RocketIcon, HomeIcon, ListIcon, TrophyIcon, UserIcon, LogOutIcon } from 'lucide-react';

const Navbar = () => {
    const { logout, user } = useAuth();

    const activeClass = "flex items-center space-x-2 text-white bg-white/10 px-4 py-2 rounded-full transition-all duration-300 ease-out shadow-sm font-medium";
    const currClass = "flex items-center space-x-2 text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all duration-300 ease-out font-medium";

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
            <nav className="glass-panel rounded-full px-6 py-3 pointer-events-auto flex items-center justify-between w-full max-w-5xl">
                <div className="flex items-center space-x-2 text-white font-bold text-lg tracking-tight">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <RocketIcon className="text-white w-4 h-4" />
                    </div>
                    <span className="hidden sm:block">TaskVerse</span>
                </div>

                <div className="flex space-x-1 md:space-x-2">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <HomeIcon className="w-4 h-4" /> <span className="hidden md:block">Home</span>
                    </NavLink>
                    <NavLink to="/tasks" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <ListIcon className="w-4 h-4" /> <span className="hidden md:block">Tasks</span>
                    </NavLink>
                    <NavLink to="/leaderboard" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <TrophyIcon className="w-4 h-4" /> <span className="hidden md:block">Ranks</span>
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <UserIcon className="w-4 h-4" /> <span className="hidden md:block">Profile</span>
                    </NavLink>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="text-yellow-500 font-medium text-sm">{user?.currency || 0}</span>
                            <span className="text-xs text-gray-400">Coins</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="text-orange-500 font-medium text-sm">{user?.streak || 0}🔥</span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all duration-300"
                        title="Logout"
                    >
                        <LogOutIcon className="w-4 h-4" />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
