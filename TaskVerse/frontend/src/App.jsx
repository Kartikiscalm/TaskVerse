import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden pt-28 pb-10">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black -z-10 pointer-events-none"></div>
            <Navbar />
            <div className="container mx-auto px-4 md:px-8 max-w-5xl animate-fade-in pb-16">
                {children}
            </div>
            {/* Creators Footer */}
            <footer className="w-full text-center py-6 mt-auto border-t border-white/5 bg-black/50 backdrop-blur-sm fixed bottom-0 left-0">
                <p className="text-gray-500 text-xs font-medium tracking-widest uppercase">
                    Created by: <span className="text-gray-300">Kartik Jayant, Krish Prajapati, Eklavya Motghare, Rishi Yadav</span>
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
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            </Routes>
        </Router>
    );
}

export default App;
