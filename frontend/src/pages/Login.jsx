import { useState } from "react";
import Navbar from "../components/Navbar";

const Login = () => {

    const [error, setError] = useState("");
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center text-secondary">
              Login
            </h1>

            {error && <p className="text-red-500 my-4 text-sm text-center"> {error} </p>}

            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full focus:input-secondary
                  required"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full focus:input-secondary
                  required"
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