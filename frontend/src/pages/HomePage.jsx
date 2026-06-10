import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import RateLimitedUI from "../components/RateLimitedUI"

import api from "../lib/axios"
import toast from "react-hot-toast"
import NoteCard from "../components/NoteCard"
import NotesNotFound from "../components/NotesNotFound"

const HomePage = ({user, setUser, authLoading}) => {
    const [isRateLimited, setIsRateLimited] = useState(false)
    const [notes, setNotes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchNotes = async () => {
            try{
                const res = await api.get("/notes")
                // const data = await res.json();
                console.log(res.data)

                setNotes(res.data)
                setIsRateLimited(false)
            }catch(error){
                console.log("Error fetching notes:", error)
                console.log(error)
                if(error.response?.status === 429){
                    setIsRateLimited(true)
                }else{
                    toast.error("Failed to load notes!")
                }
            }finally {
                setLoading(false)
            }
        }

        fetchNotes();
    }, [])


    return (
        <div className="min-h-screen">

            <Navbar user={user} setUser={setUser} authLoading={authLoading}/>      
            {isRateLimited && <RateLimitedUI/>} 

             <div className="max-w-7xl mx-auto p-4 mt-6">

                {!authLoading && (user ? (
                    <div className="mb-6">
                        <div className="flex items-center gap-3 p-4 bg-base-100 rounded-xl shadow-sm border border-base-300">
                        
                        <div className="avatar placeholder">
                            <div className="bg-secondary text-white rounded-full w-12">
                            <span className="text-lg font-semibold">
                                {user.username.charAt(0).toUpperCase()}
                            </span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                            <h2 className="font-bold text-lg">
                                {user.username}
                            </h2>

                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
                            </span>
                            </div>

                            <p className="text-sm text-base-content/60">
                            {user.email}
                            </p>
                        </div>

                        <div className="badge badge-success badge-outline">
                            Online
                        </div>
                        </div>
                    </div>
                ) : (
                    <div className="mb-6">
                        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 p-6">
                        <h2 className="text-2xl font-bold text-secondary">
                            Welcome 👋
                        </h2>

                        <p className="mt-2 text-base-content/70">
                            Please login or create an account to access your notes and manage them securely.
                        </p>

                        <div className="mt-4 flex gap-3">
                            <a href="/login" className="btn btn-secondary text-white">
                            Login
                            </a>

                            <a href="/register" className="btn btn-outline hover:!text-white btn-secondary">
                            Register
                            </a>
                        </div>
                        </div>
                    </div>
                ))}

                {loading && <div className="text-center text-secondary py-10">Loading notes...</div>}

                {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound/>}

                {notes.length > 0 && !isRateLimited && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                        ))}
                    </div>
                )}
             </div>

        </div>
    )
}

export default HomePage