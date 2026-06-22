import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { HomeIcon, LogInIcon, LogOutIcon, PlusIcon, UserPlus, MenuIcon, XIcon } from "lucide-react"
import toast from "react-hot-toast";

const Navbar = ({user, setUser, authLoading}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
    setMenuOpen(false);

    toast.success("Logged out successfully!");
  }

  const handleNavClick = () => {
    setMenuOpen(false);
  }

  const navBtnClass = (path) => {
    const isActive = location.pathname === path;
    return isActive
      ? "btn btn-secondary text-white"
      : "btn btn-outline btn-secondary hover:!text-white";
  }

  return (
    <header className="bg-base-100 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
             <div className="flex items-center justify-between">
                <h1 className="text-2xl sm:text-3xl font-bold text-secondary font-mono tracking-tight">Ember Notes</h1>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-4">
                    {!authLoading && (user ? (
                      <>
                        <Link to={"/"} className={navBtnClass("/")}> <HomeIcon className="size-5"/> <span>Home</span></Link>
                        <Link to={"/create"} className={navBtnClass("/create")}> <PlusIcon className="size-5"/> <span>New Note</span></Link>
                        <button className="btn btn-outline btn-secondary hover:!text-white" onClick={handleLogout}><LogOutIcon className="size-5"/> Logout</button>
                      </>
                    ): (
                      <>
                        <Link to={"/"} className={navBtnClass("/")}> <HomeIcon className="size-5"/> <span>Home</span></Link>
                        <Link to={"/register"} className={navBtnClass("/register")}> <UserPlus className="size-5"/> <span>Register</span></Link>
                        <Link to={"/login"} className={navBtnClass("/login")}> <LogInIcon className="size-5"/> <span>Login</span></Link>
                      </>
                    ))}
                </div>

                {/* Mobile hamburger button */}
                <button
                  className="md:hidden btn btn-ghost btn-square"
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <XIcon className="size-6"/> : <MenuIcon className="size-6"/>}
                </button>
             </div>

             {/* Mobile dropdown menu */}
             {menuOpen && (
               <div className="md:hidden flex flex-col gap-2 mt-4 pb-2">
                  {!authLoading && (user ? (
                    <>
                      <Link to={"/"} onClick={handleNavClick} className={`${navBtnClass("/")} justify-start`}> <HomeIcon className="size-5"/> <span>Home</span></Link>
                      <Link to={"/create"} onClick={handleNavClick} className={`${navBtnClass("/create")} justify-start`}> <PlusIcon className="size-5"/> <span>New Note</span></Link>
                      <button className="btn btn-outline btn-secondary hover:!text-white justify-start" onClick={handleLogout}><LogOutIcon className="size-5"/> Logout</button>
                    </>
                  ): (
                    <>
                      <Link to={"/"} onClick={handleNavClick} className={`${navBtnClass("/")} justify-start`}> <HomeIcon className="size-5"/> <span>Home</span></Link>
                      <Link to={"/register"} onClick={handleNavClick} className={`${navBtnClass("/register")} justify-start`}> <UserPlus className="size-5"/> <span>Register</span></Link>
                      <Link to={"/login"} onClick={handleNavClick} className={`${navBtnClass("/login")} justify-start`}> <LogInIcon className="size-5"/> <span>Login</span></Link>
                    </>
                  ))}
               </div>
             )}
        </div>
    </header>
  )
}

export default Navbar;
