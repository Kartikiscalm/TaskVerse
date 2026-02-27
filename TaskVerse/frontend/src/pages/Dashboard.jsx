import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlertIcon, CheckCircleIcon, TrendingUpIcon, ActivityIcon } from 'lucide-react';

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
        <div className="space-y-8 animate-slide-up">
            <header className="mb-10">
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">Hello, {user.name.split(' ')[0]}</h1>
                <p className="text-gray-400 text-lg">Here's your productivity overview for today.</p>
            </header>

            {/* Hero Stats Bento Box */}
            <div className="glass-card rounded-[32px] p-8 md:p-10 relative overflow-hidden">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                    <div className="w-32 h-32 bg-black/50 border border-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-5xl shadow-2xl relative shrink-0">
                        🤖
                        <div className="absolute -bottom-2 -right-2 bg-white text-black px-3 py-1 rounded-full text-xs font-bold border-4 border-black">
                            Lv {user.level}
                        </div>
                    </div>

                    <div className="flex-1 w-full text-center md:text-left">
                        <h2 className="text-3xl font-semibold mb-6">Current Progress</h2>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
                                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Total XP</span>
                                <span className="text-2xl font-semibold text-blue-400">{user.xp}</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
                                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Streak</span>
                                <span className="text-2xl font-semibold text-orange-400">{user.streak} <span className="text-lg">🔥</span></span>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
                                <span className="text-gray-400 text-xs font-medium uppercase tracking-wider block mb-1">Balance</span>
                                <span className="text-2xl font-semibold text-yellow-400">{user.currency} <span className="text-lg">🪙</span></span>
                            </div>
                        </div>

                        <div className="w-full max-w-xl mx-auto md:mx-0">
                            <div className="flex justify-between text-sm mb-2 font-medium">
                                <span className="text-gray-300">Level {user.level}</span>
                                <span className="text-gray-400">{levelProgress} / 100 XP to Lv {user.level + 1}</span>
                            </div>
                            <div className="w-full bg-black/50 border border-white/5 rounded-full h-3 overflow-hidden shadow-inner">
                                <div
                                    className="bg-blue-500 h-full rounded-full progress-bar-inner relative overflow-hidden"
                                    style={{ width: `${levelProgress}%` }}
                                >
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analytics Grid */}
            <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><ActivityIcon className="text-blue-500" /> Weekly Insights</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-card p-6 rounded-[24px] flex flex-col justify-between hover:bg-white/[0.08]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                                <CheckCircleIcon className="text-green-500 w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold text-white mb-1">{analytics?.totalCompleted || 0}</p>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Tasks Completed</p>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-[24px] flex flex-col justify-between hover:bg-white/[0.08]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                <ActivityIcon className="text-orange-500 w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold text-white mb-1">{analytics?.totalActive || 0}</p>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Active Quests</p>
                        </div>
                    </div>

                    <div className="glass-card p-6 rounded-[24px] flex flex-col justify-between hover:bg-white/[0.08]">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <TrendingUpIcon className="text-blue-500 w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="text-4xl font-semibold text-white mb-1">{analytics ? Math.round(analytics.priorityAlignmentScore) : 0}%</p>
                            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Priority Alignment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
