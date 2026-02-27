import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOutIcon } from 'lucide-react';

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
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">Account Details</h1>

            <div className="glass-panel rounded-[32px] p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-40 h-40 bg-black/50 rounded-full flex items-center justify-center text-[80px] border border-white/10 shadow-2xl relative shrink-0">
                    {currentStage.icon}
                </div>

                <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
                    <h2 className="text-4xl font-semibold tracking-tight mb-2 truncate block w-full">{user.name}</h2>
                    <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold tracking-widest uppercase text-xs px-4 py-1.5 rounded-full mb-8">
                        {currentStage.name} Tier
                    </div>

                    <button
                        onClick={logout}
                        className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 transition-colors px-6 py-3 rounded-full font-semibold shadow-lg shadow-red-500/20"
                    >
                        <LogOutIcon className="w-5 h-5" /> Sign Out Device
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-[32px] p-8 md:p-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">Tier Progression</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {stages.map(s => (
                        <div key={s.level} className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all ${user.level >= s.level ? 'bg-white/5 border-white/20 shadow-lg' : 'bg-black/30 border-white/5 opacity-50 grayscale'}`}>
                            <div className="text-4xl mb-3">{s.icon}</div>
                            <span className="font-semibold text-white mb-1">{s.name}</span>
                            <div className={`text-xs font-semibold px-3 py-1 rounded-full ${user.level >= s.level ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                                {user.level >= s.level ? 'UNLOCKED' : `Lv ${s.level} REQ`}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
