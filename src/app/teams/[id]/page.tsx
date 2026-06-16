"use client";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";


export default function TeamPage() {
    const [memberName, setMemberName] = useState("");
    const [members, setMembers] = useState<string[]>([]);
    const params = useParams();
    useEffect(() => {
    async function fetchTeam() {
        try {
            const res = await fetch(`/api/teams/${params.id}`);
const data = await res.json();

if (data) {
    setMembers(data.members || []);
} else {
    setMembers([]);
}
        } catch (error) {
            console.error("Failed to fetch team:", error);
        }
    }

    fetchTeam();
}, [params.id]);
    async function addMember() {
    if (!memberName.trim()) return;

    try {
        const res = await fetch(
            `/api/teams/${params.id}/members`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    memberName,
                }),
            }
        );

        if (res.ok) {
    const updatedTeam = await res.json();

    setMembers(updatedTeam.members);

    toast.success("Member added!");
    setMemberName("");
} else {
            toast.error("Failed to add member.");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong.");
    }
}
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Team Details</h1>

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Members</h2>

                <ul className="mt-2">
    {members.length === 0 ? (
        <li>No members yet</li>
    ) : (
        members.map((member, index) => (
            <li key={index}>
                {member}
            </li>
        ))
    )}
</ul>

                <div className="mt-4">
                    <input
    type="text"
    placeholder="Enter member name"
    value={memberName}
    onChange={(e) => setMemberName(e.target.value)}
    className="border p-2 rounded"
/>

                    <button
    onClick={addMember}
    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
>
                        Add Member
                    </button>
                </div>
            </div>
        </div>
    );
}