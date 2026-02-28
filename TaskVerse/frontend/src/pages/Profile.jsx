import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOutIcon, UserIcon, ShieldIcon, ZapIcon } from 'lucide-react';

const Profile = () => {
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
        <div className="max-w-4xl mx-auto space-y-16 animate-slide-up pb-20">
            <header className="pt-4">
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 font-outfit text-gradient uppercase leading-none">Identity</h1>
                <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-bold tracking-tight">Detailed operational metrics for your account.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1 glass-panel rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center relative overflow-hidden group bg-white/90 dark:bg-black/40 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0071E3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="w-48 h-48 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-3xl rounded-[4rem] flex items-center justify-center text-[100px] shadow-2xl relative mb-10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                        {currentStage.icon}
                    </div>

                    <h2 className="text-4xl font-black font-outfit mb-3 tracking-tighter text-black dark:text-white uppercase">{user.name}</h2>
                    <div className="inline-flex items-center bg-[#0071E3]/10 dark:bg-[#0A84FF]/10 border border-[#0071E3]/20 dark:border-[#0A84FF]/20 text-[#0071E3] dark:text-[#0A84FF] font-black tracking-[0.3em] uppercase text-[10px] px-8 py-2.5 rounded-full mb-12">
                        {currentStage.name} Tier
                    </div>

                    <button
                        onClick={logout}
                        className="w-full h-16 flex items-center justify-center gap-4 text-[#FF453A] bg-[#FF453A]/5 hover:bg-[#FF453A]/10 border border-[#FF453A]/10 transition-all rounded-[2rem] font-black uppercase tracking-widest text-xs active:scale-95 shadow-lg"
                    >
                        <LogOutIcon className="w-5 h-5 stroke-[2.5]" /> Terminate Session
                    </button>
                </div>

                <div className="lg:col-span-2 space-y-10">
                    <div className="glass-panel p-12 rounded-[3.5rem] bg-white/90 dark:bg-black/60 shadow-2xl border-black/5 dark:border-white/10">
                        <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6] mb-12 flex items-center gap-6">
                            <ShieldIcon className="w-6 h-6 text-[#0071E3] dark:text-[#0A84FF] stroke-[2.5]" /> Evolution stages
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                            {stages.map(s => (
                                <div key={s.level} className={`flex flex-col items-center justify-center p-8 rounded-[3rem] border transition-all duration-700 ${user.level >= s.level
                                    ? 'bg-black/[0.03] dark:bg-white/[0.05] border-black/5 dark:border-white/10 shadow-xl scale-100'
                                    : 'bg-black/5 dark:bg-white/[0.02] border-transparent opacity-30 grayscale scale-95'
                                    }`}>
                                    <div className="text-6xl mb-8">{s.icon}</div>
                                    <span className={`font-black mb-3 font-outfit uppercase tracking-tighter text-lg ${user.level >= s.level ? 'text-black dark:text-white' : 'text-[#86868B] dark:text-[#424245]'}`}>{s.name}</span>
                                    <div className={`text-[9px] font-black px-5 py-2 rounded-full border ${user.level >= s.level
                                        ? 'bg-[#0071E3]/10 dark:bg-[#0A84FF]/10 text-[#0071E3] dark:text-[#0A84FF] border-[#0071E3]/20 dark:border-[#0A84FF]/20'
                                        : 'bg-black/5 dark:bg-white/5 text-[#86868B] dark:text-[#424245] border-transparent'
                                        }`}>
                                        {user.level >= s.level ? 'UNLOCKED' : `REQ LVL ${s.level}`}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        <div className="glass-card p-12 rounded-[3.5rem] bg-white/90 dark:bg-black/40 shadow-2xl border-black/5 dark:border-white/10 group flex flex-col items-center text-center">
                            <ZapIcon className="w-12 h-12 text-[#FF9500] mb-8 group-hover:scale-110 transition-transform duration-500 stroke-[2.5]" />
                            <p className="text-6xl font-black text-black dark:text-white font-outfit mb-2 tracking-tighter">{user.streak}</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6]">Atomic Streak</p>
                        </div>
                        <div className="glass-card p-12 rounded-[3.5rem] bg-white/90 dark:bg-black/40 shadow-2xl border-black/5 dark:border-white/10 group flex flex-col items-center text-center">
                            <UserIcon className="w-12 h-12 text-[#0071E3] dark:text-[#0A84FF] mb-8 group-hover:scale-110 transition-transform duration-500 stroke-[2.5]" />
                            <p className="text-6xl font-black text-black dark:text-white font-outfit mb-2 tracking-tighter">{user.level}</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6]">Global Level</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
