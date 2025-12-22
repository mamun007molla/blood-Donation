import React, { useEffect, useState } from "react";
import { UserCog, ShieldCheck, UserMinus, Mail, Ban, CheckCircle, UserCheck, UserPlus } from "lucide-react";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
 useEffect(() => {
    document.title = "All Users | BloodCare";
  }, []);
 
  const fetchData = async () => {
    const res = await axiosSecure.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const filteredUsers = users.filter((u) =>
    filterValue === "all" ? true : u.status === filterValue
  );

 
  const updateUserStatus = async (id, status) => {
    await axiosSecure.patch(`/users/update/${id}`, { status });
    fetchData();
  };

  
  const updateUserRole = async (id, role) => {
    await axiosSecure.patch(`/users/update/${id}`, { role });
    fetchData();
  };

  return (
    <div className="p-6">

     
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
        <span className="text-gray-500 font-medium">
          Total Users: {users.length}
        </span>
      </div>

    
      <div className="flex gap-3 mb-4">
        {["all", "active", "blocked"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterValue(status)}
            className={`px-4 py-2 rounded text-white ${
              filterValue === status ? "bg-blue-600" : "bg-gray-500"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

     
      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200 bg-white">
        <table className="table table-zebra-sm">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-50 transition-all">
                <td className="font-medium text-gray-600">{index + 1}</td>

               
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12 shadow-inner">
                        <img src={user.photoURL} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-xs opacity-60">
                        @{user.name?.split(" ")[0]?.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </td>

               
                <td className="text-gray-700">
                  <div className="flex items-center gap-1">
                    <Mail size={15} className="text-gray-400" />
                    {user.email}
                  </div>
                </td>

               
                <td>
                  <span
                    className={`badge ${
                      user.role === "Admin"
                        ? "badge-primary"
                        : user.role === "volunteer"
                        ? "badge-info"
                        : "badge-accent"
                    } badge-sm`}
                  >
                    {user.role}
                  </span>
                </td>

              
                <td>
                  <span
                    className={`badge ${
                      user.status === "active"
                        ? "badge-success"
                        : "badge-error"
                    } badge-sm`}
                  >
                    {user.status}
                  </span>
                </td>

               
                <td>
                  <div className="flex items-center gap-2 justify-center">

                    
                    {user.status === "active" && (
                      <button
                        onClick={() => updateUserStatus(user._id, "blocked")}
                        className="btn btn-error btn-xs flex items-center gap-1"
                      >
                        <Ban size={14} />
                        Block
                      </button>
                    )}

                  
                    {user.status === "blocked" && (
                      <button
                        onClick={() => updateUserStatus(user._id, "active")}
                        className="btn btn-success btn-xs flex items-center gap-1"
                      >
                        <CheckCircle size={14} />
                        Unblock
                      </button>
                    )}

                   
                    {user.role === "donor" && (
                      <button
                        onClick={() => updateUserRole(user._id, "volunteer")}
                        className="btn btn-warning btn-xs flex items-center gap-1"
                      >
                        <UserCheck size={14} />
                        Volunteer
                      </button>
                    )}

                   
                    {user.role !== "Admin" && (
                      <button
                        onClick={() => updateUserRole(user._id, "Admin")}
                        className="btn btn-primary btn-xs flex items-center gap-1"
                      >
                        <UserPlus size={14} />
                        Admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AllUsers;
