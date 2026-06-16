import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await params;

        const team = await Team.findById(id);

        return NextResponse.json(team);
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Failed to fetch team" },
            { status: 500 }
        );
    }
}