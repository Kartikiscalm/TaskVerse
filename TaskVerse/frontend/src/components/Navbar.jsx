import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { RocketIcon, HomeIcon, ListIcon, TrophyIcon, UserIcon, UsersIcon, SettingsIcon, LogOutIcon, TrendingUp } from 'lucide-react';

const Navbar = () => {
    const { logout, user } = useAuth();

    const activeClass = "flex items-center space-x-1 text-[#0071E3] dark:text-[#0A84FF] bg-white/60 dark:bg-white/10 px-10 py-4 rounded-[1.75rem] transition-all duration-700 font-black scale-110 shadow-[0_25px_50px_-15px_rgba(0,113,227,0.3)] border border-white/60 dark:border-white/20 -translate-y-2 cursor-default z-10 backdrop-blur-md";
    const currClass = "flex items-center space-x-4 text-[#86868B] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white px-10 py-4 rounded-[1.75rem] transition-all duration-500 font-bold hover:-translate-y-2 hover:bg-white/30 dark:hover:bg-white/5 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] active:scale-90 scale-100";

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-start pt-8 px-4 pointer-events-none">
            <nav className="rounded-[4rem] px-24 py-10 pointer-events-auto flex items-center flex justify-between w-full max-w-[2000px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] border border-white/40 dark:border-white/10 bg-white/10 dark:bg-black/30 backdrop-blur-[60px] transition-all duration-1000 ease-in-out">
                <div className="flex items-center ml-4">
                    <span className="hidden lg:block text-6xl font-black font-outfit tracking-tighter text-gradient leading-none">TaskVerse</span>
                </div>

                <div className="flex items-center gap-0 p-2 rounded-[2.5rem]">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <HomeIcon className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Home</span>
                    </NavLink>
                    <NavLink to="/tasks" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <ListIcon className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Quests</span>
                    </NavLink>
                    <NavLink to="/leaderboard" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <TrophyIcon className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Ranks</span>
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <UserIcon className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Profile</span>
                    </NavLink>
                    <NavLink to="/groups" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <UsersIcon className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Squad</span>
                    </NavLink>
                    <NavLink to="/audit" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <TrendingUp className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Progress</span>
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => isActive ? activeClass : currClass}>
                        <SettingsIcon className="w-5 h-5 stroke-[2.5]" /> <span className="hidden md:block">Settings</span>
                    </NavLink>
                </div>

                <div className=" items-center space-x-6">
                    <div className="hidden lg:flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6] font-bold uppercase tracking-widest leading-none mb-1">Currency</span>
                            <span className="text-black dark:text-white font-black text-lg tracking-tighter leading-none">{user?.currency || 0}🪙</span>
                        </div>
                        <div className="w-px h-8 bg-black/10 dark:bg-white/10"></div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6] font-bold uppercase tracking-widest leading-none mb-1">Streak</span>
                            <span className="text-black dark:text-white font-black text-lg tracking-tighter leading-none">{user?.streak || 0}🔥</span>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-12 h-12 rounded-[1.25rem] flex items-center flex justify-center text-[#FF453A] hover:bg-red-500/10 transition-all active:scale-90"
                        title="Logout"
                    >
                        <LogOutIcon className="w-6 h-6 stroke-[2.5]" />
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
