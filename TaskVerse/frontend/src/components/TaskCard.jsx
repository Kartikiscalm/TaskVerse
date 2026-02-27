import React from 'react';
import { CalendarIcon, TagIcon, Trash2Icon, CheckIcon, Edit2Icon, CopyIcon } from 'lucide-react';

const TaskCard = ({ task, onComplete, onDelete, onUpdate, onDuplicate }) => {
    const handleEditDays = () => {
        const newDays = window.prompt("Edit duration (total days):", task.totalDays);
        if (newDays !== null) {
            const parsed = parseInt(newDays);
            if (!isNaN(parsed) && parsed > 0) {
                onUpdate(task._id, { totalDays: parsed });
            }
        }
    };
    // Modern Apple style colors
    const priorityStyles = {
        High: 'bg-red-500/10 text-red-500 border-red-500/20',
        Medium: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        Low: 'bg-green-500/10 text-green-500 border-green-500/20'
    };

    return (
        <div className={`glass-card p-5 md:p-6 rounded-[24px] relative group overflow-hidden ${task.completed ? 'opacity-50 grayscale hover:grayscale-0' : 'hover:-translate-y-1 hover:shadow-2xl hover:border-white/20 bg-apple-gray/60'
            }`}>


            <div className="flex justify-between items-start gap-4 mb-4">
                <h3 className={`font-medium text-lg leading-snug ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {task.title}
                </h3>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${priorityStyles[task.priority] || priorityStyles.Low}`}>
                    {task.priority} Priority
                </span>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1">
                    <TagIcon className="w-3 h-3" /> {task.category}
                </span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-md border border-white/5">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>{task.completedDays || 0} / {task.totalDays || 1} Days</span>
                    </div>
                    <button
                        onClick={handleEditDays}
                        className="text-gray-500 hover:text-white transition-colors"
                        title="Edit Duration"
                    >
                        <Edit2Icon className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onDuplicate(task)}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all shadow-md active:scale-95"
                        title="Duplicate Quest"
                    >
                        <CopyIcon className="w-4 h-4" />
                    </button>
                    {!task.completed && (
                        <button
                            onClick={() => onComplete(task._id)}
                            className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all shadow-md active:scale-95"
                            title="Complete Task"
                        >
                            <CheckIcon className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={() => onDelete(task._id)}
                        className="w-8 h-8 rounded-full bg-black/50 hover:bg-red-500/20 hover:text-red-500 border border-white/10 flex items-center justify-center text-gray-400 transition-all active:scale-95"
                        title="Delete Task"
                    >
                        <Trash2Icon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
