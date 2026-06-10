import { Link } from "react-router";
import Navbar from "./Navbar";
import { HomeIcon } from "lucide-react";

const PageNotFound = ({ user, setUser, authLoading }) => {
  return (
    <div className="min-h-screen">
      <Navbar
        user={user}
        setUser={setUser}
        authLoading={authLoading}
      />

      <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-lg">
          <h1 className="text-8xl md:text-9xl font-extrabold text-secondary">
            404
          </h1>

          <h2 className="mt-4 text-3xl font-bold">
            Page Not Found
          </h2>

          <p className="mt-3 text-base-content/70">
            Sorry, the page you're looking for doesn't exist,
            has been moved, or the URL may be incorrect.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn btn-secondary text-white"
            >
              <HomeIcon className="size-5"/> Go Home
            </Link>

            {!user && (
              <Link
                to="/login"
                className="btn btn-outline btn-secondary hover:text-white"
              >
                Login
              </Link>
            )}
          </div>

          <div className="mt-10">
            <div className="text-7xl animate-bounce">
              📝
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;