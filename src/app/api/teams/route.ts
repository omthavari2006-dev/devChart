import connectDB from "@/lib/mongodb";
import Team from "@/models/Team";

export async function GET() {
    try {
        await connectDB();
        const teams = await Team.find().sort({ createdAt: -1 });
        return Response.json(teams);
    } catch (error) {
        console.error("Error fetching teams:", error);
        return Response.json(
            { message: "Failed to fetch teams" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const { name, teamNumber } = body;

        if (!name || teamNumber === undefined) {
            return Response.json(
                { message: "Team name and number are required" },
                { status: 400 }
            );
        }

        const team = await Team.create({ name, teamNumber });
        return Response.json(team, { status: 201 });
    } catch (error) {
        console.error("Error creating team:", error);
        return Response.json(
            { message: "Failed to create team" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return Response.json(
                { message: "Team ID is required" },
                { status: 400 }
            );
        }

        await Team.findByIdAndDelete(id);
        return Response.json(
            { message: "Team deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting team:", error);
        return Response.json(
            { message: "Failed to delete team" },
            { status: 500 }
        );
    }
}
