import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import axios from "axios";
import { UserPlus } from "lucide-react";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register | BloodCare";
  }, []);

  const { createUser } = useContext(AuthContext);

  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [dis, setDis] = useState("");
  const [subdis, setSubDis] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("/district.json").then((res) => setDistrict(res.data.districts));
    axios.get("/sub.json").then((res) => setSubDistrict(res.data.upazilas));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const blood = form.bloodGroup.value;
    const photoFile = form.photoURL.files[0];

    if (password.length < 6) {
      return Swal.fire("Error", "Password must be at least 6 characters!", "error");
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire("Error", "Must include at least 1 uppercase letter!", "error");
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire("Error", "Must include at least 1 lowercase letter!", "error");
    }
    if (password !== confirmPassword) {
      return Swal.fire("Error", "Passwords do not match!", "error");
    }

    const imgRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=e1854a721d79f842ea414ac99a5bd2aa`,
      { image: photoFile },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const photoURL = imgRes.data.data.display_url;

    createUser(email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });

        const formData = {
          name,
          email,
          photoURL,
          blood,
          district: dis,
          subDistrict: subdis,
        };

        axios.post("http://localhost:3000/users", formData);

        Swal.fire("Success!", "Account created successfully!", "success");
        navigate(location.state ? location.state : "/");
      })
      .catch((err) => {
        setError(err.message);
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-100 via-rose-50 to-red-200 p-6">

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 border border-white/40">
      

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-red-600 drop-shadow">
            Create Your Account
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            Join the BloodCare community ❤️
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div className="col-span-2">
            <label className="font-medium">Full Name</label>
            <input
              name="name"
              type="text"
              required
              className="input input-bordered w-full bg-white/60"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label className="font-medium">Email Address</label>
            <input
              name="email"
              type="email"
              required
              className="input input-bordered w-full bg-white/60"
              placeholder="you@example.com"
            />
          </div>

          {/* photoURL */}
          <div className="col-span-2">
            <label className="font-medium">Profile Photo</label>
            <input
              name="photoURL"
              type="file"
              className="file-input file-input-bordered w-full bg-white/60"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-medium">Blood Group</label>
            <select
              name="bloodGroup"
              required
              className="select select-bordered w-full bg-white/60"
            >
              <option value="">Select Blood Group</option>
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="font-medium">District</label>
            <select
              required
              onChange={(e) => setDis(e.target.value)}
              className="select select-bordered w-full bg-white/60"
            >
              <option value="">Select District</option>
              {district.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="col-span-2 md:col-span-1">
            <label className="font-medium">Upazila</label>
            <select
              required
              onChange={(e) => setSubDis(e.target.value)}
              className="select select-bordered w-full bg-white/60"
            >
              <option value="">Select Upazila</option>
              {subDistrict.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="col-span-2 md:col-span-1">
            <label className="font-medium">Password</label>
            <input
              name="password"
              type="password"
              required
              className="input input-bordered w-full bg-white/60"
              placeholder="At least 6 characters"
            />
          </div>

          {/* Confirm Password */}
          <div className="col-span-2 md:col-span-1">
            <label className="font-medium">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              required
              className="input input-bordered w-full bg-white/60"
              placeholder="Retype password"
            />
          </div>

          {error && (
            <p className="text-red-600 font-medium text-center col-span-2">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="col-span-2 btn bg-linear-to-r from-red-500 to-rose-500 text-white text-lg shadow-lg hover:shadow-rose-200 transition flex items-center justify-center gap-2 mt-4"
          >
            <UserPlus size={22} />
            Create Account
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
