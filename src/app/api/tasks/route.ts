import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";

export async function GET(){
    try{
        await connectDB();

        
        const now = new Date();
        await Task.deleteMany({ deadline: { $lt: now } });

        const tasks = await Task.find();

        return Response.json(tasks);

    }catch(error){

        console.log(error);

        return Response.json(
            {message:"Failed to fetch tasks"},
            {status: 500}
        );
    }
}

export async function POST(request: Request){
    try{
        await connectDB();

        const body = await request.json();

        const task = await Task.create(body);

        return Response.json(task,{status: 201});
    }catch(error){
        console.log(error);
        return Response.json(
            {message:"Failed to create task"},
            {status: 500}
        );
    }
}

export async function DELETE(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);

        const id = searchParams.get("id");

        await Task.findByIdAndDelete(id);

        return Response.json(
            { message: "Task deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);

        return Response.json(
            { message: "Failed to delete task" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const body = await request.json();

        const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

        if (!updatedTask) {
            return Response.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        return Response.json(updatedTask, { status: 200 });
    } catch (error) {
        console.log(error);

        return Response.json(
            { message: "Failed to update task" },
            { status: 500 }
        );
    }
}