import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const { memberName } = await req.json();

    console.log("Team ID:", id);
    console.log("Member Name:", memberName);

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      {
        $push: {
          members: memberName,
        },
      },
      {
        returnDocument: "after",
      }
    );

    console.log("Updated Team:", updatedTeam);

    return NextResponse.json(updatedTeam);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}