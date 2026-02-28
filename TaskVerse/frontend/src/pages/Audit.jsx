import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrendingUp } from 'lucide-react';

const Audit = () => {
    const { api } = useAuth();
    const [interval, setInterval] = useState(7);
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/analytics/report?days=${interval}`);
            setReport(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [interval]);

    return (
        <div className="space-y-16 animate-slide-up pb-20">
            <header className="pt-4">
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 font-outfit text-gradient leading-none uppercase">
                    Analytical Audit
                </h1>
                <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-bold tracking-tight">Your operational progress Dossier.</p>
            </header>

            <div className="glass-panel rounded-[4rem] p-16 border-black/5 dark:border-white/10 bg-white/90 dark:bg-black/60 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 rounded-[2rem] bg-green-500/10 flex items-center justify-center shadow-lg shadow-green-500/10">
                            <TrendingUp className="text-[#34C759] w-10 h-10 stroke-[3]" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-black font-outfit text-black dark:text-white uppercase tracking-tighter leading-none mb-2">Metrics Analysis</h3>
                            <p className="text-[#86868B] dark:text-[#A1A1A6] text-xl font-semibold tracking-tight">Select your temporal monitoring range.</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {[7, 14, 30, 90].map(days => (
                            <button
                                key={days}
                                onClick={() => setInterval(days)}
                                className={`px-12 py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] border-2 transition-all duration-500 scale-[1.02] active:scale-95 ${interval === days
                                    ? 'bg-[#0071E3] text-white border-[#0071E3] shadow-[0_20px_40px_-10px_rgba(0,113,227,0.4)]'
                                    : 'bg-black/5 dark:bg-white/5 border-transparent text-[#86868B] dark:text-[#A1A1A6] hover:border-blue-500/30'
                                    }`}
                            >
                                {days === 7 ? '1 Week' : days === 14 ? '2 Weeks' : days === 30 ? '1 Month' : 'Quarterly'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="min-h-[400px] flex items-center justify-center">
                    {loading ? (
                        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-[#0071E3] rounded-full animate-spin"></div>
                    ) : report.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-10 gap-8 w-full">
                            {report.map((item, idx) => (
                                <div key={idx} className="glass-card p-10 rounded-[3rem] flex flex-col items-center justify-center gap-6 group hover:scale-110 transition-all border-black/5 dark:border-white/10 shadow-xl bg-white dark:bg-white/5 hover:bg-[#0071E3]/5 dark:hover:bg-[#0A84FF]/10">
                                    <p className="text-xs font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-tighter">{item.date.split('-').slice(1).join('/')}</p>
                                    <div className="relative h-32 w-5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden shadow-inner border border-black/5 dark:border-white/5">
                                        <div
                                            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0071E3] to-[#5E5CE6] dark:from-[#0A84FF] dark:to-[#5E5CE6] rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(0,113,227,0.5)]"
                                            style={{ height: `${item.created > 0 ? (item.completed / item.created) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-black text-black dark:text-white font-outfit tracking-tighter leading-none mb-1">{item.completed}</p>
                                        <p className="text-[10px] font-bold text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.2em]">Tasks</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center space-y-4 opacity-40">
                            <p className="text-4xl font-black font-outfit text-[#86868B] dark:text-[#A1A1A6]">No Data Harvested</p>
                            <p className="text-xl font-bold text-[#86868B] dark:text-[#A1A1A6]">Complete quests to generate analytical feedback.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Audit;
