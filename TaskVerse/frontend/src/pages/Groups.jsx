import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { UsersIcon, PlusIcon, KeyIcon, LogOutIcon, CrownIcon, StarIcon, TrophyIcon, ShieldCheckIcon } from 'lucide-react';

const Groups = () => {
    const { api, user } = useAuth();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [inviteCode, setInviteCode] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const fetchGroup = async () => {
        try {
            setLoading(true);
            const res = await api.get('/groups/me');
            setGroup(res.data);
            setErrorMsg('');
        } catch (err) {
            setGroup(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroup();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/groups/create', { groupName });
            fetchGroup();
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Matrix failure during squad initialization.');
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            await api.post('/groups/join', { inviteCode });
            fetchGroup();
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Access denied. Invalid coordinate or squad full.');
        }
    };

    const handleLeave = async () => {
        if (!window.confirm("Confirm secession from this objective unit?")) return;
        try {
            await api.post('/groups/leave');
            setGroup(null);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-[#0071E3]/20 border-t-[#0071E3] rounded-full animate-spin"></div>
        </div>
    );

    if (!group) {
        return (
            <div className="max-w-6xl mx-auto space-y-16 animate-slide-up pb-20">
                <header className="pt-8 text-center">
                    <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-4 font-outfit uppercase leading-none text-gradient">The Squad</h1>
                    <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-bold tracking-tight">Form an elite unit or use a lite key to join one.</p>
                </header>

                {errorMsg && (
                    <div className="max-w-2xl mx-auto p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-black text-xs uppercase tracking-widest text-center animate-shake">
                        {errorMsg}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Create Section */}
                    <div className="glass-panel p-16 rounded-[4rem] flex flex-col items-center bg-white/90 dark:bg-black/60 shadow-2xl border-black/5 dark:border-white/10 group">
                        <div className="w-24 h-24 mb-10 rounded-[2.5rem] bg-[#0071E3]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <PlusIcon className="w-12 h-12 text-[#0071E3] stroke-[2.5]" />
                        </div>
                        <h2 className="text-4xl font-black mb-4 font-outfit uppercase tracking-tighter">Forge Unit</h2>
                        <p className="text-[#86868B] dark:text-[#A1A1A6] text-center font-bold mb-10 leading-tight">Initialize a new secure group (Max 5 members).</p>

                        <form onSubmit={handleCreate} className="w-full space-y-6">
                            <input
                                type="text"
                                required
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Unit Designation"
                                className="w-full bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-[#0071E3]/20 rounded-[2rem] px-8 py-6 text-xl font-black text-center text-black dark:text-white focus:outline-none transition-all placeholder:text-[#86868B]/40 font-outfit uppercase"
                            />
                            <button className="w-full h-20 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                                Establish Matrix
                            </button>
                        </form>
                    </div>

                    {/* Join Section */}
                    <div className="glass-panel p-16 rounded-[4rem] flex flex-col items-center bg-white/90 dark:bg-black/60 shadow-2xl border-black/5 dark:border-white/10 group">
                        <div className="w-24 h-24 mb-10 rounded-[2.5rem] bg-[#FF9500]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <KeyIcon className="w-12 h-12 text-[#FF9500] stroke-[2.5]" />
                        </div>
                        <h2 className="text-4xl font-black mb-4 font-outfit uppercase tracking-tighter">Lite Key</h2>
                        <p className="text-[#86868B] dark:text-[#A1A1A6] text-center font-bold mb-10 leading-tight">Enter access coordinate to merge with a squad.</p>

                        <form onSubmit={handleJoin} className="w-full space-y-6">
                            <input
                                type="text"
                                required
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                placeholder="Access Coordinate"
                                className="w-full bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-[#FF9500]/20 rounded-[2rem] px-8 py-6 text-xl font-black text-center text-black dark:text-white focus:outline-none transition-all placeholder:text-[#86868B]/40 font-outfit uppercase"
                            />
                            <button className="w-full h-20 bg-[#FF9500] text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                                Sync Connection
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const sortedMembers = [...group.members].sort((a, b) => b.xp - a.xp);

    return (
        <div className="max-w-6xl mx-auto space-y-16 animate-slide-up pb-20">
            <header className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-0.5 w-12 bg-[#0071E3]"></div>
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-[#0071E3]">Squad Protocol Active</span>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-4 font-outfit uppercase leading-none text-black dark:text-white">
                        {group.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="px-6 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl flex items-center gap-4 group cursor-pointer hover:bg-black/10 transition-all">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868B]">Access Coordinate:</span>
                            <span className="text-xl font-black font-outfit text-[#0071E3] tracking-wider select-all">{group.inviteCode}</span>
                        </div>
                        <div className="px-6 py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl flex items-center gap-3">
                            <UsersIcon className="w-4 h-4 text-[#86868B]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#86868B]">{group.members.length}/5 OCCUPANCY</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLeave}
                    className="h-16 px-8 rounded-[1.75rem] border border-red-500/10 text-red-500 bg-red-500/5 hover:bg-red-500/10 font-black uppercase tracking-widest text-[9px] transition-all flex items-center gap-3 active:scale-95"
                >
                    <LogOutIcon className="w-4 h-4" /> Leave Unit
                </button>
            </header>

            {/* Squad Leaderboard */}
            <div className="glass-panel overflow-hidden rounded-[4rem] border-black/5 dark:border-white/10 bg-white/90 dark:bg-black/80 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]">
                <div className="px-12 py-10 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-between">
                    <h2 className="text-2xl font-black uppercase tracking-[0.3em] text-[#86868B] flex items-center gap-6">
                        <TrophyIcon className="w-7 h-7 text-[#FFCC00] stroke-[2.5]" /> Internal Ranks
                    </h2>
                    <div className="h-px flex-1 mx-10 bg-black/5 dark:bg-white/5 hidden md:block"></div>
                    <span className="text-[10px] font-black text-[#86868B] uppercase tracking-[0.4em]">Battle for dominance</span>
                </div>

                <div className="divide-y divide-black/5 dark:divide-white/5">
                    {sortedMembers.map((member, index) => (
                        <div
                            key={member._id}
                            className={`px-12 py-12 grid grid-cols-12 items-center transition-all duration-700 relative group ${member._id === user._id ? 'bg-[#0071E3]/5 dark:bg-[#0A84FF]/10' : ''}`}
                        >
                            {/* Rank Indicator */}
                            <div className="col-span-2 flex flex-col items-center">
                                <span className={`text-5xl font-black font-outfit tracking-tighter ${index === 0 ? 'text-[#FFCC00] scale-125' :
                                    index === 1 ? 'text-[#86868B] dark:text-gray-400' :
                                        index === 2 ? 'text-[#AC5E00]' : 'text-gray-300 dark:text-gray-700'
                                    }`}>
                                    {(index + 1).toString().padStart(2, '0')}
                                </span>
                                {index === 0 && <CrownIcon className="w-5 h-5 text-[#FFCC00] mt-2 animate-bounce fill-[#FFCC00]" />}
                            </div>

                            {/* Member Identity */}
                            <div className="col-span-6 flex items-center gap-10">
                                <div className="w-24 h-24 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 select-none">
                                    {index === 0 ? '🏆' : index === 1 ? '🥇' : index === 2 ? '🥈' : '🎖️'}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <span className={`text-4xl font-black font-outfit tracking-tighter uppercase leading-none ${member._id === user._id ? 'text-[#0071E3] dark:text-[#0A84FF]' : 'text-black dark:text-white'}`}>
                                            {member.name}
                                        </span>
                                        {member._id === user._id && (
                                            <span className="text-[9px] bg-[#0071E3] text-white px-3 py-1.5 rounded-full font-black uppercase tracking-widest shadow-lg">YOU</span>
                                        )}
                                        {member._id === group.owner && (
                                            <ShieldCheckIcon className="w-5 h-5 text-indigo-500 fill-indigo-500/10" title="Squad Lead" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <StarIcon className="w-3.5 h-3.5 text-[#FFCC00] fill-[#FFCC00]" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#86868B]">Level {member.level}</span>
                                        </div>
                                        <div className="w-1 h-1 bg-black/10 dark:bg-white/10 rounded-full"></div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-[#FF453A] rounded-full animate-pulse shadow-[0_0_8px_rgba(255,69,58,0.5)]"></div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#86868B]">{member.streak}D STREAK</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Data */}
                            <div className="col-span-4 text-right pr-6">
                                <div className={`inline-flex flex-col items-end px-12 py-6 rounded-[2.5rem] transition-all duration-500 ${index === 0
                                    ? 'bg-[#FFCC00] text-black shadow-2xl scale-110 rotate-1'
                                    : 'bg-black/5 dark:bg-white/5 text-[#0071E3] dark:text-[#0A84FF] border border-black/5 dark:border-white/10'
                                    }`}>
                                    <span className="text-4xl font-black font-outfit tracking-tighter leading-none">{member.xp}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] mt-2 ${index === 0 ? 'text-black/60' : 'text-[#86868B]'}`}>Operational XP</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty Vacancies */}
                {group.members.length < 5 && Array(5 - group.members.length).fill(0).map((_, i) => (
                    <div key={`vacancy-${i}`} className="px-12 py-10 opacity-20 filter blur-[1px] grayscale flex items-center justify-between border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-10">
                            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-[2rem] border border-dashed border-black/20 dark:border-white/20"></div>
                            <span className="text-xl font-black font-outfit tracking-tighter uppercase text-gray-400">VACANCY DETECTED</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Wait for sync...</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Groups;
