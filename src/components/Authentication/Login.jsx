import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { Eye, EyeOff, LogIn } from "lucide-react";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { signInUser } = useContext(AuthContext);
 useEffect(() => {
    document.title = "Login | BloodCare";
  }, []);
  const handleSignin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(() => {
        navigate(location.state ? location.state : "/");
        form.reset();
      })
      .catch((error) => {
        const message =
          error.code === "auth/user-not-found"
            ? "No account found."
            : error.code === "auth/wrong-password"
            ? "Incorrect password."
            : "Login failed.";
        setError(message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-rose-200 p-4">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/60 rounded-3xl shadow-2xl p-8 border border-white/30">

       
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">
            Login to continue saving lives ❤️
          </p>
        </div>

       
        <form onSubmit={handleSignin} className="space-y-5">

          
          <div className="relative">
            <input
              name="email"
              type="email"
              placeholder=" "
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 transition peer bg-white/70"
            />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-sm peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-red-600 transition-all pointer-events-none">
              Email
            </label>
          </div>

        
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              placeholder=" "
              required
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-red-500 transition peer bg-white/70"
            />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 peer-focus:text-sm peer-focus:-top-2 peer-focus:bg-white peer-focus:px-1 peer-focus:text-red-600 transition-all pointer-events-none">
              Password
            </label>

            
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

         
          {error && (
            <p className="text-red-600 text-center font-semibold text-sm">
              {error}
            </p>
          )}

          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 text-lg font-semibold text-white rounded-xl bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-red-200 transition"
          >
            <LogIn size={20} /> Login
          </button>
        </form>

       
        <p className="text-center text-gray-700 mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 font-semibold hover:underline"
          >
            Register Now
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
