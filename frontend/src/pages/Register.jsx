import Navbar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = ({setUser}) => {

    const [formData, setFormData] = useState({
        username: "",
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
            const res = await axios.post("/api/users/register", formData);
            localStorage.setItem("token", res.data.token);
            console.log(res.data);
            setUser(res.data);

            toast.success("Registration successfull");
            navigate('/');
        }catch(error){
            // setError(error.response?.data?.message || "Registration failed!");
            toast.error(
                error.response?.data?.message || "Registration failed!"
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
              Create Account
            </h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="input input-bordered w-full focus:input-secondary"
                  required
                />
              </div>

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
                  placeholder="Create a password"
                  className="input input-bordered w-full focus:input-secondary
                  required"
                />
              </div>

              <button
                type="submit"
                className="btn btn-secondary text-white w-full"
              >
                Register
              </button>
            </form>

            <div className="divider">OR</div>

            <p className="text-center text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="link link-secondary font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;