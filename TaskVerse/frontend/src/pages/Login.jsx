import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { RocketIcon, ShieldAlertIcon } from 'lucide-react';

const Login = () => {
    const { loginWithUsername } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (!username.trim()) return;

        const mode = isSignUp ? 'signup' : 'signin';
        console.log(`Sending Auth Request: mode=${mode}, user=${username}`);

        setIsLoading(true);
        const result = await loginWithUsername(username, mode);
        setIsLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setErrorMsg(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden transition-colors duration-1000 bg-white dark:bg-black">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#0071E3]/5 dark:bg-[#0A84FF]/10 rounded-full blur-[150px] pointer-events-none transition-all duration-1000"></div>

            <div className="w-full max-w-[520px] z-10 animate-slide-up">
                <div className="glass-panel p-16 rounded-[4.5rem] flex flex-col items-center border-black/5 dark:border-white/10 bg-white/90 dark:bg-black/40 shadow-2xl backdrop-blur-3xl relative overflow-hidden">

                    <h1 className="text-5xl font-black text-black dark:text-white mb-3 tracking-tighter text-center font-outfit uppercase">TaskVerse</h1>
                    <p className="text-[#86868B] dark:text-[#A1A1A6] mb-12 text-center text-xl font-bold tracking-tight">
                        {isSignUp ? 'Create a unique identity in the matrix.' : 'Login to your operational hub.'}
                    </p>

                    {errorMsg && (
                        <div className="w-full mb-8 p-6 rounded-[2rem] bg-red-500/10 border border-red-500/20 flex flex-col gap-2 animate-shake">
                            <div className="flex items-center gap-3">
                                <ShieldAlertIcon className="w-5 h-5 text-red-500 shrink-0" />
                                <p className="text-red-600 dark:text-red-400 font-black text-[10px] uppercase tracking-widest leading-tight">Protocol Error</p>
                            </div>
                            <p className="text-red-600/70 dark:text-red-400/70 font-bold text-xs ml-8">
                                {errorMsg === 'Identity not found in the matrix'
                                    ? "This name hasn't been recorded. Please use 'Create Account' toggle below."
                                    : errorMsg}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="w-full space-y-10">
                        <div className="space-y-4">
                            <label className="block text-[10px] font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.3em] ml-4 text-center">Designation</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-black/5 dark:bg-white/5 border-2 border-transparent focus:border-[#0071E3]/30 dark:focus:border-[#0A84FF]/30 rounded-[2rem] px-8 py-8 text-3xl font-black text-black dark:text-white focus:outline-none focus:ring-8 focus:ring-blue-500/5 transition-all text-center placeholder:text-[#86868B]/40 font-outfit uppercase tracking-tighter"
                                placeholder="USERNAME"
                            />
                        </div>

                        <div className="pt-4 space-y-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-24 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 font-black uppercase tracking-[0.4em] text-xs rounded-[2.5rem] transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50"
                            >
                                {isLoading ? 'Processing Protocol...' : isSignUp ? 'Create Identity' : 'Initiate Session'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setErrorMsg('');
                                }}
                                className="w-full text-[10px] font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.3em] hover:text-black dark:hover:text-white transition-colors py-2"
                            >
                                {isSignUp ? 'Already registered? Login here' : 'New User? Create Account'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[10px] text-[#86868B] dark:text-[#424245] font-black uppercase tracking-[0.5em]">Global Authentication Protocol 3.0</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
