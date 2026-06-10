import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PageNotFound from "./components/PageNotFound";

const App = () => {

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // const [error, setError] = useState('');

  console.log(user);
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
            // setError("Failed to fetch user data!");
            localStorage.removeItem("token");
        }
      }

      setAuthLoading(false);

    };
    fetchUser();
  }, []);

  // Prevent the app from rendering until auth is checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10  h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} authLoading={authLoading}/>} />
        <Route path="/login" element={user ? <Navigate to="/" replace/> : <Login setUser={setUser}/>} />
        <Route path="/register" element={user ? <Navigate to="/" replace/> : <Register setUser={setUser}/>} />
        <Route path="/create" element={<CreatePage user={user} setUser={setUser} authLoading={authLoading}/>} />
        <Route path="/note/:id" element={<NoteDetailPage user={user} setUser={setUser} authLoading={authLoading}/>} />
        <Route path="*" element={<PageNotFound user={user} setUser={setUser} authLoading={authLoading}/>}/>
      </Routes>

    </div>
  )
}

export default App