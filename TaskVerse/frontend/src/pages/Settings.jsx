import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Settings = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="space-y-16 animate-slide-up pb-20">
            <header className="pt-4">
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 font-outfit text-gradient leading-none uppercase">
                    Control Center
                </h1>
                <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-bold tracking-tight">System configuration and operational settings.</p>
            </header>

            <div className="max-w-4xl mx-auto">
                {/* Theme Switcher */}
                <div className="glass-panel rounded-[4rem] p-16 flex flex-col items-center justify-center text-center gap-14 group bg-white/90 dark:bg-black/40 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-blue-500 to-indigo-500"></div>

                    <div className="w-36 h-36 rounded-[3rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 rotate-3 group-hover:rotate-0 transition-all duration-700 shadow-inner border border-white/20 dark:border-black/5">
                        {isDarkMode ? <Moon className="w-16 h-16 text-[#0A84FF] stroke-[2.5]" /> : <Sun className="w-16 h-16 text-[#FF9500] stroke-[2.5]" />}
                    </div>
                    <div>
                        <h3 className="text-4xl font-black mb-6 font-outfit text-black dark:text-white uppercase tracking-tighter">Theme Protocol</h3>
                        <p className="text-[#86868B] dark:text-[#A1A1A6] text-xl font-semibold leading-tight mb-14 max-w-md mx-auto">Switch between Cosmic Dark and Pure Light visual kernels to suit your environment.</p>

                        <button
                            onClick={toggleTheme}
                            className="w-full h-24 rounded-[2rem] bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.5em] text-xs transition-all active:scale-95 shadow-2xl border border-white/10 dark:border-black/5 scale-[1.02] hover:scale-[1.05] hover:shadow-blue-500/20"
                        >
                            Initiate {isDarkMode ? 'Light' : 'Dark'} Mode
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
