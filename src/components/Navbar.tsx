
import Link from "next/link"

export default function Navbar(){
    return (
        <>
            <div className = "flex justify-between items-center h-auto font-bold bg-black text-teal-200 p-4">
                <div className="flex items-center gap-6">
                    <Link href="/">
                        <h1 className = "text-2xl hover:text-white transition-colors"> devChart </h1>
                    </Link>
                    <Link href="/">
                        <button className = "rounded-lg py-1.5 px-3 bg-teal-200 text-black hover:bg-white transition-colors text-sm cursor-pointer"> Home </button>
                    </Link>
                </div>
                <div className = "flex  gap-4  ">
                    <Link href="/dashboard">
                        <button className = "rounded-lg py-1.5 px-3  bg-teal-200 text-black hover:bg-white transition-colors cursor-pointer"> DashBoard </button>
                    </Link>
                    <Link href="/teams">
                        <button className = "rounded-lg py-1.5 px-3  bg-teal-200 text-black hover:bg-white transition-colors cursor-pointer"> Teams </button>
                    </Link>
                    <Link href="/create-task">
                        <button className = "rounded-lg py-1.5 px-3  bg-teal-200 text-black hover:bg-white transition-colors cursor-pointer"> Create Task </button>
                    </Link>
                </div>
            </div>
        </>
    );
}