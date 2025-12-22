import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import { Link } from "react-router";
import Swal from "sweetalert2";
const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      document.title = "Donor| BloodCare";
    }, []);
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(
        `https://mission11scic.vercel.app/requests/user/${user.email}?page=1&size=3`
      )
      .then((res) => {
        setRequests(res.data.result);
        setLoading(false);
      });
  }, [user]);

 
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Request?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://mission11scic.vercel.app/requests/${id}`)
          .then(() => {
            setRequests(requests.filter((r) => r._id !== id));
            Swal.fire("Deleted!", "Request removed.", "success");
          });
      }
    });
  };

 
  const handleStatus = (id, newStatus) => {
    axios
      .patch(`https://mission11scic.vercel.app/requests/update-status/${id}`, {
        donationStatus: newStatus,
      })
      .then(() => {
        setRequests((prev) =>
          prev.map((r) =>
            r._id === id ? { ...r, donationStatus: newStatus } : r
          )
        );
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner scale-150"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
     
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, <span className="text-red-600">{user.displayName}</span> 👋
      </h1>

     
      {requests.length > 0 ? (
        <div className="bg-white shadow-lg border rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-700">
            Recent Donation Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-gray-50">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>

                    <td>
                      <span
                        className={`badge ${
                          req.donationStatus === "pending"
                            ? "badge-warning"
                            : req.donationStatus === "inprogress"
                            ? "badge-info"
                            : req.donationStatus === "done"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {req.donationStatus}
                      </span>
                    </td>

                    <td className="flex gap-2">
                     
                      <Link
                        to={`/dashboard/request/${req._id}`}
                        className="btn btn-xs btn-info"
                      >
                        View
                      </Link>

                      <Link
                        to={`/dashboard/edit-request/${req._id}`}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </Link>

                     
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>

                      
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatus(req._id, "done")}
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>

                          <button
                            onClick={() => handleStatus(req._id, "canceled")}
                            className="btn btn-xs btn-error"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

       
          <div className="text-right mt-4">
            <Link
              to="/dashboard/my-donation-requests"
              className="btn btn-sm bg-red-600 text-white hover:bg-red-500"
            >
              View My All Requests →
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg">
          You have not created any donation requests yet.
        </p>
      )}
    </div>
  );
};

export default DonorDashboard;
