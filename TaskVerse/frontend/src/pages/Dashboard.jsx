import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircleIcon, TrendingUpIcon, ActivityIcon } from 'lucide-react';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
};

const Dashboard = () => {
    const { user, api } = useAuth();
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await api.get('/analytics/weekly');
                setAnalytics(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAnalytics();
    }, [api]);

    const levelProgress = user.xp % 100;

    return (
        <div className="space-y-16 animate-slide-up pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-4">
                <div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4 font-outfit text-black dark:text-white leading-none">
                        {getGreeting()}, <span className="text-gradient">{user.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-semibold tracking-tight">Your daily performance brief is ready.</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass-card px-6 py-4 rounded-[1.5rem] flex items-center gap-4 border-black/5 dark:border-white/10 shadow-lg">
                        <div className="w-3 h-3 rounded-full bg-[#34C759] shadow-[0_0_12px_rgba(52,199,89,0.5)] animate-pulse"></div>
                        <span className="text-xs font-black text-black/60 dark:text-white/60 uppercase tracking-[0.2em]">Live Connection</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 glass-panel rounded-[3rem] p-12 relative overflow-hidden group">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
                        <div className="relative">
                            <div className="w-48 h-48 bg-white/80 dark:bg-black/40 border border-black/5 dark:border-white/10 rounded-[3.5rem] flex items-center justify-center text-8xl shadow-2xl shadow-black/10 transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3">
                                🛸
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-[1.5rem] text-xl font-black shadow-2xl">
                                LVL {user.level}
                            </div>
                        </div>

                        <div className="flex-1 w-full text-center md:text-left">
                            <h2 className="text-4xl font-black mb-10 font-outfit tracking-tighter text-black dark:text-white uppercase">Operational Status</h2>

                            <div className="grid grid-cols-3 gap-6 mb-12">
                                <div className="bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-3 group/stat">
                                    <p className="text-[#86868B] dark:text-[#A1A1A6] text-[10px] font-black uppercase tracking-[0.3em]">Total XP</p>
                                    <p className="text-4xl font-black text-[#0071E3] dark:text-[#0A84FF] font-outfit tracking-tighter leading-none">{user.xp}</p>
                                    <div className="text-xl opacity-50 grayscale group-hover/stat:grayscale-0 group-hover/stat:opacity-100 transition-all duration-500">✨</div>
                                </div>
                                <div className="bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-3 group/stat">
                                    <p className="text-[#86868B] dark:text-[#A1A1A6] text-[10px] font-black uppercase tracking-[0.3em]">Streak</p>
                                    <p className="text-4xl font-black text-[#FF9500] font-outfit tracking-tighter leading-none">{user.streak}</p>
                                    <div className="text-2xl group-hover/stat:scale-125 transition-transform duration-500">🔥</div>
                                </div>
                                <div className="bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-3 group/stat">
                                    <p className="text-[#86868B] dark:text-[#A1A1A6] text-[10px] font-black uppercase tracking-[0.3em]">Assets</p>
                                    <p className="text-4xl font-black text-[#FFCC00] font-outfit tracking-tighter leading-none">{user.currency}</p>
                                    <div className="text-2xl group-hover/stat:scale-125 transition-transform duration-500">🪙</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[#86868B] dark:text-[#A1A1A6]">Rank Progression</span>
                                    <span className="text-lg font-black text-black dark:text-white font-outfit tracking-tighter">{levelProgress}%</span>
                                </div>
                                <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-5 p-1 border border-black/5 dark:border-white/10 overflow-hidden shadow-inner">
                                    <div
                                        className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] h-full rounded-full progress-bar-inner relative shadow-lg shadow-blue-500/20"
                                        style={{ width: `${levelProgress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-[3rem] p-10 flex flex-col justify-center items-center text-center gap-8 border-black/5 dark:border-white/10 group relative overflow-hidden bg-white/80 dark:bg-black/60">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-blue-500/10 flex items-center justify-center mb-2 rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-blue-500/5">
                        <TrendingUpIcon className="text-[#0071E3] dark:text-[#0A84FF] w-12 h-12 stroke-[2.5]" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black mb-3 font-outfit text-black dark:text-white uppercase tracking-tighter">Efficiency</h3>
                        <p className="text-[#86868B] dark:text-[#A1A1A6] text-lg font-semibold tracking-tight leading-tight">Output vs. Intent ratio is optimal.</p>
                    </div>
                    <div className="text-7xl font-black text-[#0071E3] dark:text-[#0A84FF] font-outfit tracking-[ -0.05em]">{analytics ? Math.round(analytics.priorityAlignmentScore) : 0}%</div>
                    <div className="text-xs font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6]">Performance Alpha</div>
                </div>
            </div>

            {/* Sub Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass-card p-10 rounded-[3rem] flex items-center gap-10 border-black/5 dark:border-white/10 group bg-white/80 dark:bg-black/60 shadow-xl">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-green-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-md shadow-green-500/5">
                        <CheckCircleIcon className="text-[#34C759] w-12 h-12 stroke-[2.5]" />
                    </div>
                    <div>
                        <p className="text-6xl font-black text-black dark:text-white mb-2 font-outfit tracking-tighter">{analytics?.totalCompleted || 0}</p>
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6]">Quests Sanitized</p>
                    </div>
                </div>

                <div className="glass-card p-10 rounded-[3rem] flex items-center gap-10 border-black/5 dark:border-white/10 group bg-white/80 dark:bg-black/60 shadow-xl">
                    <div className="w-24 h-24 rounded-[2.5rem] bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-md shadow-orange-500/5">
                        <ActivityIcon className="text-[#FF9500] w-12 h-12 stroke-[2.5]" />
                    </div>
                    <div>
                        <p className="text-6xl font-black text-black dark:text-white mb-2 font-outfit tracking-tighter">{analytics?.totalActive || 0}</p>
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-[#86868B] dark:text-[#A1A1A6]">Active Sequences</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
