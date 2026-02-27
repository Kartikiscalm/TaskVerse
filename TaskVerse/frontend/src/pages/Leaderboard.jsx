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
        <div className="max-w-4xl mx-auto space-y-8 animate-slide-up">
            <div className="text-center py-10 mb-6">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-yellow-500/10 mb-6 border border-yellow-500/20 shadow-[0_0_50px_rgba(234,179,8,0.2)]">
                    <TrophyIcon className="w-12 h-12 text-yellow-500" />
                </div>
                <h1 className="text-5xl font-semibold tracking-tight mb-4">Hall of Fame</h1>
                <p className="text-gray-400 text-xl font-medium">Global rankings based on lifetime XP earned.</p>
            </div>

            <div className="glass-panel overflow-hidden rounded-[32px]">
                <div className="p-6 border-b border-white/5 grid grid-cols-12 text-sm font-semibold text-gray-400 uppercase tracking-widest">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-6">Achiever</div>
                    <div className="col-span-4 text-right">Experience</div>
                </div>

                <div className="divide-y divide-white/5">
                    {leaders.map((leader, index) => (
                        <div
                            key={leader._id}
                            className={`p-6 grid grid-cols-12 items-center transition-all ${user._id === leader._id ? 'bg-blue-600/10' : 'hover:bg-white/[0.02]'}`}
                        >
                            <div className="col-span-2 text-center font-semibold text-2xl font-sans">
                                {index === 0 && <span className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">1</span>}
                                {index === 1 && <span className="text-gray-300">2</span>}
                                {index === 2 && <span className="text-amber-600">3</span>}
                                {index > 2 && <span className="text-gray-600">{index + 1}</span>}
                            </div>

                            <div className="col-span-6 flex items-center gap-4">
                                <div className="w-12 h-12 bg-black/50 border border-white/10 rounded-full flex items-center justify-center text-xl shadow-inner shrink-0">
                                    🤖
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-lg text-white truncate break-all">
                                        {leader.name}
                                        {user._id === leader._id && <span className="ml-2 text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider align-middle">You</span>}
                                    </span>
                                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                                        <StarIcon className="w-3 h-3 text-yellow-500" /> Level {leader.level}
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-4 text-right">
                                <span className="inline-block bg-white/5 border border-white/10 px-4 py-2 rounded-full font-semibold text-blue-400 font-mono tracking-tight text-lg">
                                    {leader.xp} XP
                                </span>
                            </div>
                        </div>
                    ))}

                    {leaders.length === 0 && (
                        <div className="py-20 text-center text-gray-500 font-medium text-lg">
                            Synchronizing global ranks...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
