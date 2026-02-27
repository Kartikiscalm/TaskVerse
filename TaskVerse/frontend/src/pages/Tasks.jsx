import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TaskCard from '../components/TaskCard';
import { PlusIcon, XIcon } from 'lucide-react';

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
        <div className="space-y-8 animate-slide-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                <div>
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-2">Quests</h1>
                    <p className="text-gray-400 text-lg">Manage your roadmap to success.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-full flex items-center gap-2 font-semibold transition-all shadow-lg active:scale-95"
                >
                    <PlusIcon className="w-5 h-5" /> New Quest
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="col-span-full py-32 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PlusIcon className="w-8 h-8 text-gray-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No active quests</h3>
                        <p className="text-gray-400">Click 'New Quest' to add your first objective.</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex items-center justify-center p-4 z-[100] animate-fade-in">
                    <div className="glass-panel w-full max-w-lg rounded-[32px] p-8 shadow-2xl animate-slide-up relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                        <h2 className="text-3xl font-semibold mb-8">Plan Quest</h2>

                        <form onSubmit={handleCreate} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Objective Title</label>
                                <input
                                    type="text"
                                    autoFocus
                                    required
                                    value={newTask.title}
                                    onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-lg"
                                    placeholder="Master the React Documentation..."
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Priority Level</label>
                                    <select
                                        value={newTask.priority}
                                        onChange={e => setNewTask({ ...newTask, priority: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                                    >
                                        <option value="High">High Priority</option>
                                        <option value="Medium">Medium Priority</option>
                                        <option value="Low">Low Priority</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                    <select
                                        value={newTask.category}
                                        onChange={e => setNewTask({ ...newTask, category: e.target.value })}
                                        className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none"
                                    >
                                        <option>Academics</option>
                                        <option>Clubs</option>
                                        <option>Personal Growth</option>
                                        <option>Leisure</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Duration (Days)</label>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    value={newTask.totalDays}
                                    onChange={e => setNewTask({ ...newTask, totalDays: parseInt(e.target.value) || 1 })}
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-blue-500/50 appearance-none color-scheme-dark"
                                />
                            </div>



                            <div className="pt-6">
                                <button type="submit" className="w-full bg-white text-black hover:bg-gray-200 py-4 rounded-2xl transition-all font-semibold text-lg shadow-lg">
                                    Commit Quest
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
