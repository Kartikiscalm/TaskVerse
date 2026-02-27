import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RocketIcon } from 'lucide-react';

const Login = () => {
    const { loginWithUsername } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        setIsLoading(true);
        const success = await loginWithUsername(username);
        setIsLoading(false);
        if (success) {
            navigate('/dashboard');
        } else {
            alert('Login failed. Please make sure the backend server (npm run dev) is running!');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="w-full max-w-[400px] z-10 animate-slide-up">
                <div className="glass-panel p-10 rounded-[32px] flex flex-col items-center">
                    <div className="w-20 h-20 mb-8 rounded-[20px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
                        <RocketIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
                    </div>

                    <h1 className="text-3xl font-semibold text-white mb-2 tracking-tight text-center">TaskVerse.</h1>
                    <p className="text-gray-400 mb-8 text-center text-sm font-medium">Sign in to your productivity universe.</p>

                    <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                required
                                placeholder="Apple ID or Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-300 backdrop-blur-md"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-4 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-white/10 disabled:opacity-50 flex justify-center"
                        >
                            {isLoading ? 'Connecting...' : 'Continue'}
                        </button>
                    </form>
                </div>
                <div className="text-center mt-8 text-sm text-gray-500 font-medium">
                    Designed for Hackathon standard.
                </div>
            </div>
        </div>
    );
};

export default Login;
