import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    district: "",
    subDistrict: "",
    blood: "",
    photoURL: "",
  });

  // LOAD PROFILE DATA
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/users/role/${user.email}`)
      .then((res) => {
        const data = res.data;

        setFormData({
          name: data.name,
          email: data.email,
          district: data.district || "",
          subDistrict: data.subDistrict || "",
          blood: data.blood || "",
          photoURL: data.photoURL,
        });

        setLoading(false);
      });
  }, [user]);

  // SAVE CHANGES
  const handleSave = () => {
    axios
      .patch(`http://localhost:3000/users/update/${user.email}`, formData)
      .then(() => {
        alert("Profile Updated!");
        setEdit(false);
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner text-primary scale-150"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6 flex items-center justify-center">

      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border">

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          My Profile
        </h1>

        {/* PHOTO */}
        <div className="flex justify-center mb-6">
          <img
            src={formData.photoURL}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 shadow"
          />
        </div>

        {/* BUTTONS */}
        {!edit ? (
          <button
            onClick={() => setEdit(true)}
            className="block mx-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition mb-6"
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="block mx-auto px-5 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition mb-6"
          >
            Save Profile
          </button>
        )}

        {/* FORM */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              disabled={!edit}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              disabled
              type="email"
              value={formData.email}
              className="w-full mt-1 p-3 border rounded-lg bg-gray-100"
            />
          </div>

          {/* DISTRICT */}
          <div>
            <label className="text-sm text-gray-600">District</label>
            <input
              disabled={!edit}
              type="text"
              value={formData.district}
              onChange={(e) =>
                setFormData({ ...formData, district: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
            />
          </div>

          {/* UPAZILA */}
          <div>
            <label className="text-sm text-gray-600">Upazila</label>
            <input
              disabled={!edit}
              type="text"
              value={formData.subDistrict}
              onChange={(e) =>
                setFormData({ ...formData, subDistrict: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
            />
          </div>

          {/* BLOOD GROUP */}
          <div>
            <label className="text-sm text-gray-600">Blood Group</label>
            <input
              disabled={!edit}
              type="text"
              value={formData.blood}
              onChange={(e) =>
                setFormData({ ...formData, blood: e.target.value })
              }
              className="w-full mt-1 p-3 border rounded-lg bg-gray-50"
            />
          </div>

        </form>

      </div>
    </div>
  );
};

export default ProfilePage;
