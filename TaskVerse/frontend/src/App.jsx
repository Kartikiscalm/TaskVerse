import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Groups from './pages/Groups';
import Audit from './pages/Audit';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white">
            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );
    if (!user) return <Navigate to="/login" />;
    return (
        <div className="min-h-screen overflow-x-hidden pt-56 pb-32 transition-colors duration-500">
            <div className="mesh-gradient"></div>
            <Navbar />
            <main className="container mx-auto px-6 md:px-12 max-w-[1400px]">
                {children}
            </main>
            {/* Creators Footer */}
            <footer className="w-full text-center py-6 border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-xl fixed bottom-0 left-0 z-40">
                <p className="text-[10px] md:text-xs text-gray-500 font-medium tracking-[0.2em] uppercase">
                    Created by: <span className="text-gray-950 dark:text-gray-300 font-semibold italic">Kartik Jayant, Krish Prajapati, Eklavya Motghare, Rishi Yadav</span>
                </p>
            </footer>
        </div>
    );
};

function App() {
    const { user, loading } = useAuth();

    if (loading) return null;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
                <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
                <Route path="/audit" element={<ProtectedRoute><Audit /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
