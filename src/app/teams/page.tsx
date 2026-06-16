"use client";
import { toast } from "sonner";


import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

type Team = {
    _id: string;
    name: string;
    teamNumber: number;
    createdAt: string;
};

export default function TeamsPage() {
    const [name, setName] = useState("");
    const [teamNumber, setTeamNumber] = useState<number | "">("");
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchTeams() {
        try {
            const res = await fetch("/api/teams");
            const data = await res.json();
            if (Array.isArray(data)) {
                setTeams(data);
            }
        } catch (error) {
            console.error("Failed to fetch teams:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTeams();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || teamNumber === "") {
            toast.warning("Please fill in all fields.");
            return;
        }

        try {
            const res = await fetch("/api/teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: name.trim(), teamNumber: Number(teamNumber) }),
            });

            if (res.ok) {
                setName("");
                setTeamNumber("");
                fetchTeams();
                toast.success("Team created successfully!");
            } else {
                const err = await res.json();
                toast.error("Failed to create team.");
            }
        } catch (error) {
            console.error("Error creating team:", error);
            alert("An error occurred.");
        }
    }

    async function handleDelete(id: string) {
        

        try {
            const res = await fetch(`/api/teams?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                fetchTeams();
            } else {
                alert("Failed to delete team.");
            }
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    }

    return (
        <div className="min-h-screen pb-12">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 mt-8">
                <h1 className="text-5xl font-extrabold text-teal-200 text-outline-black mb-8 text-center md:text-left">
                    Manage Teams
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Create Team Form Card */}
                    <div className="md:col-span-1 bg-black text-teal-200 rounded-2xl border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-bold mb-4 border-b border-teal-200/20 pb-2">New Team</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-white">Team Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Alpha Shards"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="p-3 bg-white rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-teal-200 text-black text-sm"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-semibold text-white">Team Number</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 101"
                                    value={teamNumber}
                                    onChange={(e) => setTeamNumber(e.target.value === "" ? "" : Number(e.target.value))}
                                    className="p-3 bg-white rounded-xl border border-black focus:outline-none focus:ring-2 focus:ring-teal-200 text-black text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-2 p-3 bg-teal-200 text-black font-extrabold rounded-xl border-2 border-black hover:bg-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-0 active:translate-y-0.5"
                            >
                                Create Team
                            </button>
                        </form>
                    </div>

                    {/* Teams List Grid */}
                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-black mb-4 border-b border-black/10 pb-2">Teams List</h2>
                        {loading ? (
                            <p className="text-black/60 italic">Loading teams...</p>
                        ) : teams.length === 0 ? (
                            <div className="bg-white border-2 border-black p-6 rounded-2xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-black/60 font-medium italic">No teams created yet.</p>
                                <p className="text-xs text-black/40 mt-1">Create one using the form on the left.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {teams.map((team) => (
    <Link key={team._id} href={`/teams/${team._id}`}>
        <div
            className="bg-yellow-400 rounded-2xl border-2 border-black overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
        >
            <div className="bg-black p-3.5 flex justify-between items-center text-teal-200 font-bold border-b-2 border-black">
                <h3 className="truncate max-w-[120px]">{team.name}</h3>
                <span className="bg-teal-200 text-black text-xs px-2.5 py-0.5 rounded-full border border-black font-extrabold">
                    #{team.teamNumber}
                </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <div className="text-[11px] text-black/60 font-semibold">
                    Created: {new Date(team.createdAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
                </div>

                <button
                    onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete(team._id);
}}
                    className="w-full rounded-lg bg-black p-2 text-white hover:bg-red-500 font-semibold text-xs transition-colors cursor-pointer"
                >
                    Delete Team
                </button>
            </div>
        </div>
    </Link>  
))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
