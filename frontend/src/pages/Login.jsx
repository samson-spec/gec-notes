import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = ({setUser}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    // const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post("/api/users/login", formData);
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            setUser(res.data);

            toast.success("Login successfull");
            navigate('/');
        }catch(error){
            // setError(error.response?.data?.message || "Login failed!");
            toast.error(
                error.response?.data?.message || "Login failed!"
            );
        }
    }
    
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center text-secondary">
              Login
            </h1>

            {/* {error && (
                <div
                    key={error}
                    className="bg-error/10 border border-error text-error text-center rounded-lg px-4 py-3 mt-4 text-sm animate-shake"
                >
                    {error}
                </div>
            )} */}

            {/* {error && (
                <div className="mt-4 rounded-xl bg-error/15 border border-error/30 p-3">
                    <p className="text-error text-sm text-center font-medium">
                    {error}
                    </p>
                </div>
            )} */}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full focus:input-secondary"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:input-secondary"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary text-white w-full"
              >
                Login
              </button>
            </form>

            <div className="divider">OR</div>

            <p className="text-center text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="link link-secondary font-medium"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;