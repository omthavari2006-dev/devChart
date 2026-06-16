"use client";
import { toast } from "sonner";

import Navbar from '@/components/Navbar'
import React, { useState, useEffect } from "react";

const CreateTask = () => {

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [deadline,setDeadline] = useState("");
const [teamName, setTeamName] = useState("");
const [teams, setTeams] = useState<any[]>([]);




useEffect(() => {
    async function fetchTeams() {
        try {
            const res = await fetch("/api/teams");
            const data = await res.json();
            setTeams(data);
        } catch (error) {
            console.error("Failed to fetch teams:", error);
        }
    }

    fetchTeams();
}, []);
async function handleSubmit(event: React.FormEvent){
    event.preventDefault();

    if (!deadline) {
        toast.warning("Please select a deadline.");
        return;
    }

   
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    let calculatedPriority = "low";
    if (diffHours < 24) {
        calculatedPriority = "high";
    } else if (diffHours < 48) {
        calculatedPriority = "medium";
    }

    try{
        const response = await fetch("/api/tasks",{
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
    title,
    description,
    priority: calculatedPriority,
    deadline: deadlineDate.toISOString(),
    teamName
}),
        });

        const data = await response.json();
        console.log(data);

        setTitle("");
        setDescription("");
        setDeadline("");

        toast.success("Task created successfully!");
    } catch (error) {
        console.error("Error creating task:", error);
        toast.error("Failed to create task.");
    }
}

    return (
        <div>
            <Navbar />
            <h1 className="text-6xl font-bold m-3 p-3 text-teal-200 text-outline-black">Want to create a new task?</h1>

            <form onSubmit={handleSubmit} className="flex justify-center flex-col gap-4 m-4 p-3 text-black">

                <h3 className="text-2xl text-black font-semibold">Whats the task name?</h3>
                <input type="text" placeholder="Task name" value={title}  onChange={(event)=>{setTitle(event.target.value)}} className="w-full p-3 bg-white  rounded-xl focus:outline-none focus:ring-2 focus:ring-white appearance-none text-black" required />

                <h3 className="text-2xl text-black font-semibold">Describe it!!</h3>
                <textarea  placeholder="Task description" value={description} onChange={(event)=>{setDescription(event.target.value)}} className="w-full p-3 bg-white  rounded-xl  focus:outline-none focus:ring-2 focus:ring-white appearance-none text-black" required></textarea>

                <h3 className="text-2xl text-black font-semibold">When is the deadline?</h3>
                <input 
                    type="datetime-local" 
                    value={deadline} 
                    onChange={(event)=>{setDeadline(event.target.value)}} 
                    className="w-full p-3 bg-white  rounded-xl  focus:outline-none focus:ring-2 focus:ring-white appearance-none text-black"
                    required
                />
                <h3 className="text-2xl text-black font-semibold">
    Assign Team (Optional)
</h3>

<select
    value={teamName}
    onChange={(e) => setTeamName(e.target.value)}
    className="w-full p-3 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white appearance-none text-black"
>
    <option value="">None (Common Task)</option>

    {teams.map((team) => (
        <option key={team._id} value={team.name}>
            {team.name}
        </option>
    ))}
</select>

                <button type="submit"  className="w-full p-3 bg-teal-500 text-white font-bold rounded-xl hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-white appearance-none" >Create Task</button>

            </form>
        </div>
    )
}

export default CreateTask