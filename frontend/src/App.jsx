import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const App = () => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token){

        try{
          const res = await axios.get('/api/users/me', {
            headers: {Authorization: `Bearer ${token}`}
          });
          setUser(res.data);
        }catch(error){
            console.log("Failed to fetch user data: ", error)
            setError("Failed to fetch user data!");
            localStorage.removeItem("token");
        }
      }

    }
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10  h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/create" element={<CreatePage/>} />
        <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>

    </div>
  )
}

export default App