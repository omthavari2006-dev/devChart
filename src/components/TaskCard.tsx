"use client";

import { useState } from "react";   

type TaskCardProps = {
    id: string;
    title: string;
    description: string;
    priority: string;
    deadline?: string;
    completion: boolean;
    status: string;
    teamName?: string | null;
    todos: {
        text: string;
        completed: boolean;
    }[];
};

const TaskCard = ({ id, title, description, priority, status, teamName, deadline, completion, todos = [] }: TaskCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const [newTodo, setNewTodo] = useState("");
    const [localTodos, setLocalTodos] = useState(todos || []);

    const moveTask = async (newStatus: string) => {
    try {
        await fetch(`/api/tasks?id=${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: newStatus,
            }),
        });

        window.location.reload();
    } catch (error) {
        console.error("Failed to move task:", error);
    }
};
    const deleteTask = async () => {
        await fetch(`/api/tasks?id=${id}`, {
            method: "DELETE",
        });
        window.location.reload();
    };

    const toggleTodo = async (index: number) => {
        const updated = localTodos.map((todo, i) => 
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setLocalTodos(updated);

        try {
            await fetch(`/api/tasks?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ todos: updated }),
            });
        } catch (error) {
            console.error("Failed to update todo:", error);
        }
    };

    const addTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const updated = [...localTodos, { text: newTodo.trim(), completed: false }];
        setLocalTodos(updated);
        setNewTodo("");

        try {
            await fetch(`/api/tasks?id=${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ todos: updated }),
            });
        } catch (error) {
            console.error("Failed to add todo:", error);
        }
    };

    // Calculate priority dynamically from the deadline
    const calculatePriorityAndRemaining = () => {
        if (!deadline) {
            return { priorityValue: priority || "low", remainingText: "" };
        }

        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffMs = deadlineDate.getTime() - now.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        let priorityValue = "low";
        let remainingText = "";

        if (diffMs < 0) {
            priorityValue = "high"; // Overdue is critical priority
            remainingText = "Overdue!";
        } else {
            const days = Math.floor(diffHours / 24);
            const hours = Math.floor(diffHours % 24);
            const minutes = Math.floor((diffHours % 1) * 60);

            if (days > 0) {
                remainingText = `${days}d ${hours}h left`;
            } else if (hours > 0) {
                remainingText = `${hours}h ${minutes}m left`;
            } else {
                remainingText = `${minutes}m left`;
            }

            if (diffHours < 24) {
                priorityValue = "high";
            } else if (diffHours < 48) {
                priorityValue = "medium";
            }
        }

        return { priorityValue, remainingText };
    };

    const { priorityValue, remainingText } = calculatePriorityAndRemaining();

    const bgClass =
        priorityValue.toLowerCase() === "high"
            ? "bg-red-400"
            : priorityValue.toLowerCase() === "medium"
            ? "bg-yellow-400"
            : "bg-green-400";

    const remainingColorClass =
        priorityValue === "high"
            ? "text-red-900 font-extrabold"
            : priorityValue === "medium"
            ? "text-amber-900 font-extrabold"
            : "text-emerald-900 font-extrabold";

    return (
        <div className={`flex h-auto w-64 self-start flex-col rounded-2xl border-2 border-black overflow-hidden shrink-0 transition-all duration-300 ${bgClass}`}>
            <div 
                className="bg-black p-3 text-xl font-bold text-teal-200 flex justify-between items-center cursor-pointer select-none"
                onClick={() => setExpanded(!expanded)}
            >
                <h2>{title}</h2>
                <span className={`text-sm transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </div>

            <div className="p-3">
                <div className="rounded-xl border border-black bg-teal-200 p-3 text-sm wrap-break-words flex flex-col gap-2">
                    <p className="font-semibold text-black/80">{description}</p>
                    {teamName && (
    <div className="text-xs font-bold text-blue-900">
        Team: {teamName}
    </div>
)}
                    
                    {/* Deadline & Remaining Time Display */}
                    {deadline && (
                        <div className="mt-1 flex flex-col text-[11px] text-black/60 font-semibold border-t border-black/10 pt-2 gap-0.5">
                            <span>Deadline: {new Date(deadline).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
                            <span className={remainingColorClass}>
                                ⏰ {remainingText}
                            </span>
                        </div>
                    )}
                    
                    {/* Expandable To-Do List Checklist */}
                    {expanded && (
                        <div className="mt-3 pt-3 border-t border-black/20 flex flex-col">
                            <h4 className="font-bold text-xs text-black uppercase tracking-wider mb-2">Checklist</h4>
                            {localTodos.length === 0 ? (
                                <p className="text-xs text-black/60 italic mb-2">No sub-tasks yet.</p>
                            ) : (
                                <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1 mb-2">
                                    {localTodos.map((todo, index) => (
                                        <div key={index} className="flex items-center justify-between gap-2 p-1.5 rounded bg-black/5 hover:bg-black/10 transition-colors">
                                            <span className={`text-xs break-all select-none ${todo.completed ? 'line-through opacity-50' : 'text-black'}`}>
                                                {todo.text}
                                            </span>
                                            <button 
                                                type="button"
                                                onClick={() => toggleTodo(index)}
                                                className={`w-4 h-4 shrink-0 rounded border border-black flex items-center justify-center transition-all ${
                                                    todo.completed 
                                                        ? 'bg-black text-teal-200' 
                                                        : 'bg-white hover:bg-teal-100'
                                                }`}
                                            >
                                                {todo.completed && (
                                                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                                                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={addTodo} className="flex gap-1.5 mt-1">
                                <input 
                                    type="text" 
                                    placeholder="Add sub-task..." 
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    className="flex-1 px-2 py-1 text-xs bg-white border border-black rounded focus:outline-none focus:ring-1 focus:ring-black text-black"
                                />
                                <button 
                                    type="submit" 
                                    className="px-2.5 py-1 text-xs bg-black text-teal-200 font-bold border border-black rounded hover:bg-teal-200 hover:text-black transition-colors"
                                >
                                    +
                                </button>
                            </form>
                        </div>
                    )}

                    {status === "To Do" && (
    <button
        onClick={() => moveTask("In Progress")}
        className="mt-3 w-full rounded-lg bg-blue-500 p-2 text-white font-semibold"
    >
        Move to In Progress
    </button>
)}

{status === "In Progress" && (
    <button
        onClick={() => moveTask("Done")}
        className="mt-3 w-full rounded-lg bg-green-500 p-2 text-white font-semibold"
    >
        Move to Done
    </button>
)}

                    <button
                        onClick={deleteTask}
                        className="mt-3 w-full rounded-lg bg-black p-2 text-white hover:bg-red-500 transition-colors text-sm font-semibold"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
