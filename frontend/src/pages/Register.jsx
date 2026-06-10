import Navbar from "../components/Navbar";

const Register = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center text-secondary">
              Create Account
            </h1>

            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="input input-bordered w-full focus:input-secondary
                  required"
                />
              </div>

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