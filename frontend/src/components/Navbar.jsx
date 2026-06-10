import { Link } from "react-router"
import { HomeIcon, LogInIcon, PlusIcon, UserPlus } from "lucide-react"

const Navbar = () => {
  return (
    <header className="bg-base-100 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
             <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-secondary font-mono tracking-tight">GEC Notes</h1>
                <div className="flex items-center gap-4">
                    <Link to={"/"} className="btn btn-secondary text-white"> <HomeIcon className="size-5"/> <span>Home</span></Link>
                    <Link to={"/create"} className="btn btn-secondary text-white"> <PlusIcon className="size-5"/> <span>New Note</span></Link>
                    <Link to={"/register"} className="btn btn-secondary text-white"> <UserPlus className="size-5"/> <span>Register</span></Link>
                    <Link to={"/login"} className="btn btn-secondary text-white"> <LogInIcon className="size-5"/> <span>Login</span></Link>
                </div>
             </div>
        </div>
    </header>
  )
}

export default Navbar;