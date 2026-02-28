import React from 'react';
import { TagIcon, Trash2Icon, CheckIcon, Edit2Icon, CopyIcon } from 'lucide-react';

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

    const priorityStyles = {
        High: 'bg-red-500/10 text-[#FF453A] border-[#FF453A]/20 shadow-lg shadow-red-500/5',
        Medium: 'bg-orange-500/10 text-[#FF9500] border-[#FF9500]/20 shadow-lg shadow-orange-500/5',
        Low: 'bg-green-500/10 text-[#34C759] border-[#34C759]/20 shadow-lg shadow-green-500/5'
    };

    const progress = Math.min(((task.completedDays || 0) / (task.totalDays || 1)) * 100, 100);

    return (
        <div className={`glass-card p-8 rounded-[3rem] relative group border-black/5 dark:border-white/10 ${task.completed ? 'opacity-50 grayscale-[0.3] scale-[0.98]' : 'hover:scale-[1.02] active:scale-[0.98] shadow-2xl'
            } transition-all duration-500 bg-white/90 dark:bg-black/40`}>
            {/* Header */}
            <div className="flex justify-between items-start gap-6 mb-8">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${priorityStyles[task.priority] || priorityStyles.Low}`}>
                            {task.priority} PROTOCOL
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-[#86868B] dark:text-[#A1A1A6] flex items-center gap-2">
                            <TagIcon className="w-3 h-3 stroke-[3]" /> {task.category}
                        </span>
                    </div>
                    <h3 className={`font-outfit font-black text-3xl leading-tight tracking-tighter ${task.completed ? 'line-through text-[#86868B]' : 'text-black dark:text-white'}`}>
                        {task.title}
                    </h3>
                </div>
            </div>

            {/* Progress Visualization */}
            <div className="mb-10 space-y-4">
                <div className="flex justify-between items-end text-xs font-black uppercase tracking-[0.2em]">
                    <span className="text-[#86868B]">Completion Status</span>
                    <span className={`${task.completed ? 'text-[#34C759]' : 'text-[#0071E3] dark:text-[#0A84FF]'} font-bold`}>
                        {task.completedDays || 0}/{task.totalDays || 1} CYCLES
                    </span>
                </div>
                <div className="w-full bg-black/5 dark:bg-white/5 rounded-full h-4 p-1 border border-black/5 dark:border-white/10 overflow-hidden shadow-inner">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${task.completed ? 'bg-[#34C759] shadow-lg shadow-green-500/40' : 'bg-[#0071E3] dark:bg-[#0A84FF] shadow-lg shadow-blue-500/40'
                            }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleEditDays}
                        className="w-12 h-12 rounded-[1.25rem] bg-black/5 dark:bg-white/5 text-[#86868B] hover:text-black dark:hover:text-white hover:bg-black/10 transition-all active:scale-90 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-sm"
                        title="Edit Duration"
                    >
                        <Edit2Icon className="w-5 h-5 stroke-[2.5]" />
                    </button>
                    <button
                        onClick={() => onDuplicate(task)}
                        className="w-12 h-12 rounded-[1.25rem] bg-black/5 dark:bg-white/5 text-[#86868B] hover:text-black dark:hover:text-white hover:bg-black/10 transition-all active:scale-90 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-sm"
                        title="Duplicate"
                    >
                        <CopyIcon className="w-5 h-5 stroke-[2.5]" />
                    </button>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => onDelete(task._id)}
                        className="w-14 h-14 rounded-[1.5rem] bg-[#FF453A]/5 text-[#FF453A]/40 hover:text-[#FF453A] hover:bg-[#FF453A]/10 border border-transparent transition-all active:scale-90 flex items-center justify-center"
                        title="Purge"
                    >
                        <Trash2Icon className="w-6 h-6 stroke-[2.5]" />
                    </button>
                    {!task.completed && (
                        <button
                            onClick={() => onComplete(task._id)}
                            className="w-14 h-14 rounded-[1.5rem] bg-[#0071E3] dark:bg-[#0A84FF] text-white shadow-xl shadow-blue-500/20 hover:scale-105 transition-all active:scale-90 flex items-center justify-center"
                        >
                            <CheckIcon className="w-7 h-7 stroke-[4]" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
