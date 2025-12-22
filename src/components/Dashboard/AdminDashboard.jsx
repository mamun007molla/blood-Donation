import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaUsers, FaHandHoldingHeart, FaNotesMedical } from "react-icons/fa";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";


const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
 useEffect(() => {
    document.title = "Admin/Volunteer | BloodCare";
  }, []);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalFunding: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    axiosSecure
      .get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, [axiosSecure]);

  return (
    <div className="px-5 md:px-10 py-8">
      <section className="mb-10">
        <h1 className="text-3xl font-bold">
          Welcome Back, <span className="text-red-600">{user?.displayName}</span> 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage users, monitor blood request status, and track funding performance.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-5 hover:scale-[1.02] duration-200">
          <FaUsers className="text-5xl text-blue-600" />
          <div>
            <h2 className="text-3xl font-bold">{stats.totalDonors}</h2>
            <p className="text-gray-500 font-semibold">Total Donors</p>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-5 hover:scale-[1.02] duration-200">
          <FaHandHoldingHeart className="text-5xl text-green-600" />
          <div>
            <h2 className="text-3xl font-bold">${stats.totalFunding}</h2>
            <p className="text-gray-500 font-semibold">Total Funding</p>
          </div>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-xl flex items-center gap-5 hover:scale-[1.02] duration-200">
          <FaNotesMedical className="text-5xl text-red-600" />
          <div>
            <h2 className="text-3xl font-bold">{stats.totalRequests}</h2>
            <p className="text-gray-500 font-semibold">
              Total Blood Requests
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
