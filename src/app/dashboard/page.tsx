"use client";

import Navbar from "@/components/Navbar"
import TaskCard from "@/components/TaskCard";
import React,{ useState, useEffect } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  deadline?: string;
  completion: boolean;
  teamName?: string | null;
  status: string;
  todos: {
    text: string;
    completed: boolean;
  }[];
};


export default function Home(){

    const [tasks,setTasks] = useState<Task[]>([]);
    const todoTasks = tasks.filter(
    task => task.status === "To Do"
);

const inProgressTasks = tasks.filter(
    task => task.status === "In Progress"
);

const doneTasks = tasks.filter(
    task => task.status === "Done"
);

    async function fetchTasks() {

      const response = await fetch("/api/tasks");
      const data = await response.json();

if (Array.isArray(data)) {
    setTasks(data);
}
    }

    useEffect(() => {
      fetchTasks();
    }, []);


    return (
      <>
        <Navbar />
        <div className="grid grid-cols-3 gap-6 m-3">

  {/* TO DO */}
  <div>
    <h1 className="text-3xl font-bold mb-4">To Do</h1>

    <div className="flex flex-col gap-4">
      {todoTasks.map((task) => (
        <TaskCard
          id={task._id}
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          status={task.status}
          teamName={task.teamName}
          deadline={task.deadline}
          completion={task.completion}
          todos={task.todos}
        />
      ))}
    </div>
  </div>


  {/* IN PROGRESS */}
  <div>
    <h1 className="text-3xl font-bold mb-4">
      In Progress
    </h1>

    <div className="flex flex-col gap-4">
      {inProgressTasks.map((task) => (
        <TaskCard
          id={task._id}
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          status={task.status}
          teamName={task.teamName}
          deadline={task.deadline}
          completion={task.completion}
          todos={task.todos}
        />
      ))}
    </div>
  </div>


  {/* DONE */}
  <div>
    <h1 className="text-3xl font-bold mb-4">
      Done
    </h1>

    <div className="flex flex-col gap-4">
      {doneTasks.map((task) => (
        <TaskCard
          id={task._id}
          key={task._id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          status={task.status}
          teamName={task.teamName}
          deadline={task.deadline}
          completion={task.completion}
          todos={task.todos}
        />
      ))}
    </div>
  </div>

</div>
      </>
    );
}