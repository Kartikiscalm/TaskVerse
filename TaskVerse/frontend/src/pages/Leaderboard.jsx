import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { TrophyIcon, StarIcon } from 'lucide-react';

const Leaderboard = () => {
    const { api, user } = useAuth();
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/leaderboard');
                setLeaders(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchLeaderboard();
    }, [api]);

    return (
        <div className="max-w-5xl mx-auto space-y-16 animate-slide-up pb-20">
            <header className="text-center pt-8">
                <div className="inline-flex items-center justify-center p-8 rounded-[3rem] bg-yellow-400/10 mb-10 border border-yellow-400/20 shadow-2xl rotate-12 group hover:rotate-0 transition-transform duration-700">
                    <TrophyIcon className="w-20 h-20 text-[#FFCC00] stroke-[2.5]" />
                </div>
                <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-4 font-outfit uppercase leading-none">Hall of <span className="text-gradient">Legends</span></h1>
                <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-bold tracking-tight">Elite performers in the taskverse hierarchy.</p>
            </header>

            <div className="glass-panel overflow-hidden rounded-[4rem] border-black/5 dark:border-white/10 bg-white/90 dark:bg-black/60 shadow-2xl">
                <div className="px-12 py-10 border-b border-black/5 dark:border-white/10 grid grid-cols-12 text-[10px] font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.4em]">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-6">Achiever</div>
                    <div className="col-span-4 text-right">Potential</div>
                </div>

                <div className="divide-y divide-black/5 dark:divide-white/5">
                    {leaders.map((leader, index) => (
                        <div
                            key={leader._id}
                            className={`px-12 py-10 grid grid-cols-12 items-center transition-all duration-500 group ${user._id === leader._id
                                ? 'bg-[#0071E3]/5 dark:bg-[#0A84FF]/10'
                                : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                                }`}
                        >
                            <div className="col-span-2 text-center font-black text-4xl font-outfit tracking-tighter">
                                {index === 0 && <span className="text-[#FFCC00] scale-125 inline-block">01</span>}
                                {index === 1 && <span className="text-[#86868B] dark:text-[#A1A1A6]">02</span>}
                                {index === 2 && <span className="text-[#AC5E00]">03</span>}
                                {index > 2 && <span className="text-black/20 dark:text-white/20">{(index + 1).toString().padStart(2, '0')}</span>}
                            </div>

                            <div className="col-span-6 flex items-center gap-8">
                                <div className="w-20 h-20 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    🛸
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-black text-3xl text-black dark:text-white font-outfit uppercase tracking-tighter truncate leading-tight">
                                        {leader.name}
                                        {user._id === leader._id && (
                                            <span className="ml-4 text-[9px] bg-[#0071E3] dark:bg-[#0A84FF] text-white px-3 py-1.5 rounded-full uppercase tracking-widest align-middle font-black shadow-lg">You</span>
                                        )}
                                    </span>
                                    <span className="text-[10px] text-[#86868B] dark:text-[#A1A1A6] font-black flex items-center gap-3 mt-2 uppercase tracking-widest">
                                        <StarIcon className="w-4 h-4 text-[#FFCC00] fill-[#FFCC00]" /> Cycle Level {leader.level}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-4 text-right">
                                <span className={`inline-block px-10 py-5 rounded-[2rem] font-black font-outfit tracking-tighter text-3xl shadow-xl transition-all ${user._id === leader._id
                                        ? 'bg-[#0071E3] dark:bg-[#0A84FF] text-white scale-105'
                                        : 'bg-black/5 dark:bg-white/5 text-[#0071E3] dark:text-[#0A84FF] border border-black/5 dark:border-white/10'
                                    }`}>
                                    {leader.xp} <span className="text-sm tracking-widest uppercase ml-1">XP</span>
                                </span>
                            </div>
                        </div>
                    ))}

                    {leaders.length === 0 && (
                        <div className="py-48 text-center text-[#86868B] dark:text-[#424245] font-black uppercase tracking-[0.6em] text-sm animate-pulse">
                            Decrypting global matrix...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
