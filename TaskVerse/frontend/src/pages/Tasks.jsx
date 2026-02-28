import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { PlusIcon, XIcon, ShieldCheckIcon } from 'lucide-react';

const Tasks = () => {
    const { api, setUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        priority: 'Medium',
        category: 'Academics',
        totalDays: 1
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/tasks', newTask);
            setTasks([res.data, ...tasks]);
            setShowModal(false);
            setNewTask({ title: '', priority: 'Medium', category: 'Academics', totalDays: 1 });
        } catch (err) {
            console.error(err);
        }
    };

    const handleComplete = async (id) => {
        try {
            const res = await api.patch(`/tasks/${id}/complete`);
            setTasks(tasks.map(t => t._id === id ? res.data.task : t));
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(t => t._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdate = async (id, payload) => {
        try {
            const res = await api.patch(`/tasks/${id}`, payload);
            setTasks(tasks.map(t => t._id === id ? res.data : t));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDuplicate = async (taskToCopy) => {
        try {
            const res = await api.post('/tasks', {
                title: `${taskToCopy.title} (Copy)`,
                priority: taskToCopy.priority,
                category: taskToCopy.category,
                totalDays: taskToCopy.totalDays
            });
            setTasks([res.data, ...tasks]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-16 animate-slide-up pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-4">
                <div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight mb-4 font-outfit text-black dark:text-white text-gradient leading-none">
                        Quests
                    </h1>
                    <p className="text-[#86868B] dark:text-[#A1A1A6] text-2xl font-semibold tracking-tight">Orchestrate your path to inevitable success.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="h-16 px-10 rounded-[1.5rem] bg-black dark:bg-white text-white dark:text-black hover:scale-105 flex items-center gap-4 font-black uppercase tracking-widest text-sm transition-all shadow-2xl active:scale-95 group border-black/5 dark:border-white/10"
                >
                    <PlusIcon className="w-6 h-6 stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
                    <span>Initiate Quest</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                {tasks.map(task => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        onDuplicate={handleDuplicate}
                    />
                ))}

                {tasks.length === 0 && (
                    <div className="col-span-full py-48 text-center glass-panel rounded-[4rem] border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.01] shadow-xl">
                        <div className="w-32 h-32 bg-black/5 dark:bg-white/5 rounded-[3rem] flex items-center justify-center mx-auto mb-10 rotate-12 shadow-inner">
                            <ShieldCheckIcon className="w-16 h-16 text-[#86868B] dark:text-[#A1A1A6] stroke-[1.5]" />
                        </div>
                        <h3 className="text-4xl font-black text-black dark:text-white mb-4 font-outfit tracking-tighter uppercase">No Active Objectives</h3>
                        <p className="text-[#86868B] dark:text-[#A1A1A6] text-xl font-medium italic">"The best way to predict the future is to create it."</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-white/60 dark:bg-black/80 backdrop-blur-2xl flex items-center justify-center p-6 z-[100] animate-fade-in">
                    <div className="glass-panel w-full max-w-2xl rounded-[3.5rem] p-12 shadow-2xl animate-slide-up relative border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-[#1C1C1E]">
                        <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#0071E3]"></div>

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-10 right-10 p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white transition-colors border border-black/5 dark:border-white/5 active:scale-90 flex items-center justify-center shadow-sm"
                        >
                            <XIcon className="w-6 h-6 stroke-[3]" />
                        </button>

                        <h2 className="text-5xl font-black mb-12 font-outfit text-black dark:text-white tracking-tighter uppercase">Quest Blueprint</h2>

                        <form onSubmit={handleCreate} className="space-y-10">
                            <div className="space-y-4">
                                <label className="block text-xs font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.3em] ml-2">Objective Designation</label>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    value={newTask.title}
                                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full bg-black/5 dark:bg-black/40 border-2 border-transparent focus:border-[#0071E3]/30 dark:focus:border-[#0A84FF]/30 rounded-[1.5rem] px-8 py-6 text-black dark:text-white placeholder:text-[#86868B] dark:placeholder:text-[#424245] focus:outline-none focus:ring-8 focus:ring-blue-500/5 transition-all text-2xl font-bold font-outfit"
                                    placeholder="e.g. Architect the Future"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block text-xs font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.3em] ml-2">Priority Tier</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-black/40 border-2 border-transparent focus:border-[#0071E3]/30 dark:focus:border-[#0A84FF]/30 rounded-[1.5rem] px-8 py-6 text-black dark:text-white focus:outline-none focus:ring-8 focus:ring-blue-500/5 appearance-none font-bold text-lg cursor-pointer transition-all"
                                    >
                                        <option value="High">🔴 CRITICAL PRIORITY</option>
                                        <option value="Medium">🟠 ANALYTIC PRIORITY</option>
                                        <option value="Low">🟢 STANDARD PRIORITY</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-xs font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.3em] ml-2">Category Sector</label>
                                    <select
                                        value={newTask.category}
                                        onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                                        className="w-full bg-black/5 dark:bg-black/40 border-2 border-transparent focus:border-[#0071E3]/30 dark:focus:border-[#0A84FF]/30 rounded-[1.5rem] px-8 py-6 text-black dark:text-white focus:outline-none focus:ring-8 focus:ring-blue-500/5 appearance-none font-bold text-lg cursor-pointer transition-all"
                                    >
                                        <option>Academics</option>
                                        <option>Personal Growth</option>
                                        <option>Leisure</option>
                                        <option>Athletics</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-xs font-black text-[#86868B] dark:text-[#A1A1A6] uppercase tracking-[0.3em] ml-2">Temporal Duration (Days)</label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    value={newTask.totalDays}
                                    onChange={e => setNewTask({ ...newTask, totalDays: parseInt(e.target.value) || 1 })}
                                    className="w-full bg-black/5 dark:bg-black/40 border-2 border-transparent focus:border-[#0071E3]/30 dark:focus:border-[#0A84FF]/30 rounded-[1.5rem] px-8 py-6 text-black dark:text-white focus:outline-none focus:ring-8 focus:ring-blue-500/5 font-black text-2xl transition-all"
                                />
                            </div>

                            <div className="pt-6">
                                <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 py-6 rounded-[1.75rem] transition-all font-black text-2xl shadow-2xl active:scale-[0.98] uppercase tracking-[0.2em]">
                                    Log Objective
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
