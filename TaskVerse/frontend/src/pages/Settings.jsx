import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, LogOutIcon, ShieldIcon, ZapIcon, UserIcon } from 'lucide-react';

const Settings = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();

    const stages = [
        { level: 0, name: 'Novice', icon: '🦠' },
        { level: 5, name: 'Apprentice', icon: '🧙‍♂️' },
        { level: 10, name: 'Knight', icon: '⚔️' },
        { level: 20, name: 'Lord', icon: '👑' },
        { level: 50, name: 'God', icon: '🌌' }
    ];

    let currentStage = stages[0];
    for (let s of stages) {
        if (user.level >= s.level) currentStage = s;
    }

    return (
        <div className="space-y-16 animate-slide-up pb-20 max-w-6xl mx-auto">
            <header className="pt-4">
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 font-outfit text-gradient leading-none uppercase">
                    Control Center
                </h1>
                <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-bold tracking-tight">System configuration and identity protocol.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Identity Profile */}
                <div className="lg:col-span-1 space-y-12">
                    <div className="glass-panel rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group bg-white/90 dark:bg-black/40 shadow-2xl border-black/5 dark:border-white/10">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <div className="w-40 h-40 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center text-[80px] shadow-xl mb-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            {currentStage.icon}
                        </div>
                        <h2 className="text-4xl font-black font-outfit mb-2 tracking-tighter text-black dark:text-white uppercase">{user.name}</h2>
                        <div className="inline-flex items-center bg-[#0071E3]/10 dark:bg-[#0A84FF]/10 border border-[#0071E3]/20 dark:border-[#0A84FF]/20 text-[#0071E3] dark:text-[#0A84FF] font-black tracking-[0.2em] uppercase text-[9px] px-6 py-2 rounded-full mb-10">
                            {currentStage.name} Tier
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between p-6 bg-black/[0.03] dark:bg-white/[0.03] rounded-[1.5rem] border border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <ZapIcon className="w-5 h-5 text-orange-400 stroke-[3]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#86868B]">Streak</span>
                                </div>
                                <span className="text-2xl font-black font-outfit text-black dark:text-white">{user.streak}</span>
                            </div>
                            <div className="flex items-center justify-between p-6 bg-black/[0.03] dark:bg-white/[0.03] rounded-[1.5rem] border border-black/5 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <UserIcon className="w-5 h-5 text-blue-400 stroke-[3]" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#86868B]">Level</span>
                                </div>
                                <span className="text-2xl font-black font-outfit text-black dark:text-white">{user.level}</span>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="w-full h-16 mt-10 flex items-center justify-center gap-4 text-[#FF453A] bg-[#FF453A]/5 hover:bg-[#FF453A]/10 border border-[#FF453A]/10 transition-all rounded-[1.5rem] font-black uppercase tracking-widest text-[9px] active:scale-95 shadow-lg"
                        >
                            <LogOutIcon className="w-5 h-5 stroke-[2.5]" /> Terminate Session
                        </button>
                    </div>
                </div>

                {/* Right Column: Settings & Evolution */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Theme Switcher */}
                    <div className="glass-panel rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center gap-10 group bg-white/90 dark:bg-black/40 shadow-2xl relative overflow-hidden border-black/5 dark:border-white/10">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-blue-500 to-indigo-500"></div>
                        <div className="flex items-center gap-14">
                            <div className="w-28 h-28 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-inner border border-white/20 dark:border-black/5">
                                {isDarkMode ? <Moon className="w-12 h-12 text-[#0A84FF] stroke-[2.5]" /> : <Sun className="w-12 h-12 text-[#FF9500] stroke-[2.5]" />}
                            </div>
                            <div className="text-left max-w-xs">
                                <h3 className="text-3xl font-black mb-3 font-outfit text-black dark:text-white uppercase tracking-tighter">Theme Protocol</h3>
                                <p className="text-[#86868B] dark:text-[#A1A1A6] text-lg font-semibold leading-tight mb-6">Atmospheric kernel toggle.</p>
                                <button
                                    onClick={toggleTheme}
                                    className="px-10 h-16 rounded-[1.25rem] bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.3em] text-[9px] transition-all active:scale-95 shadow-xl border border-white/10 dark:border-black/5"
                                >
                                    Activate {isDarkMode ? 'Light' : 'Dark'} Mode
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Evolution Stages */}
                    <div className="glass-panel p-12 rounded-[3.5rem] bg-white/90 dark:bg-black/60 shadow-2xl border-black/5 dark:border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full"></div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6] mb-12 flex items-center gap-6">
                            <ShieldIcon className="w-6 h-6 text-[#0071E3] dark:text-[#0A84FF] stroke-[2.5]" /> Evolution Track
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                            {stages.map(s => (
                                <div key={s.level} className={`flex flex-col items-center justify-center p-6 rounded-[2rem] border transition-all duration-700 ${user.level >= s.level
                                    ? 'bg-black/[0.03] dark:bg-white/[0.05] border-black/5 dark:border-white/10 shadow-lg scale-100'
                                    : 'bg-black/5 dark:bg-white/[0.02] border-transparent opacity-30 grayscale scale-95'
                                    }`}>
                                    <div className="text-3xl mb-4">{s.icon}</div>
                                    <span className={`font-black mb-2 font-outfit uppercase tracking-tighter text-xs text-center ${user.level >= s.level ? 'text-black dark:text-white' : 'text-[#86868B] dark:text-[#424245]'}`}>{s.name}</span>
                                    <div className={`text-[7px] font-black px-3 py-1 rounded-full border ${user.level >= s.level
                                        ? 'bg-[#0071E3]/10 dark:bg-[#0A84FF]/10 text-[#0071E3] dark:text-[#0A84FF] border-[#0071E3]/20 dark:border-[#0A84FF]/20'
                                        : 'bg-black/5 dark:bg-white/5 text-[#86868B] dark:text-[#424245] border-transparent'
                                        }`}>
                                        {user.level >= s.level ? 'ACTIVE' : `LVL ${s.level}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
