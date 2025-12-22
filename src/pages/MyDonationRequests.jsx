import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const MyDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [editItem, setEditItem] = useState(null);

  const size = 10;
  const { user, role } = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:3000/requests/user/${user.email}?page=${page}&size=${size}&status=${filterValue}`
    );

    setRequests(res.data.result || []);
    setTotalPages(Math.ceil(res.data.total / size));
  }, [user.email, page, size, filterValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilter = (status) => {
    setFilterValue(status);
    setPage(1);
  };

  const deleteRequest = async (id) => {
    if (confirm("Are you sure you want to delete this request?")) {
      await axios.delete(`http://localhost:3000/requests/${id}`);
      fetchData();
    }
  };

  // ⭐ Only Admin can update status
  const updateStatus = async (id, newStatus) => {
    if (role !== "Admin") return alert("You are not allowed!");

    await axios.patch(
      `http://localhost:3000/requests/update-status/${id}`,
      { donationStatus: newStatus }
    );

    setRequests((prev) =>
      prev.map((req) =>
        req._id === id ? { ...req, donationStatus: newStatus } : req
      )
    );
  };

  // ⭐ Save edited data (status বাদে সব আপডেট)
  const saveEdit = async () => {
  const id = editItem._id;
  const updated = { ...editItem };

  delete updated._id;
  delete updated.donationStatus;

  try {
    const res = await axios.patch(
      `http://localhost:3000/requests/update/${id}`,
      updated
    );

    if (res.data.modifiedCount > 0) {
      alert("Updated successfully!");
      fetchData();   // refresh data
      setEditItem(null);
    } else {
      alert("Nothing updated!");
    }
  } catch (err) {
    console.log(err);
    alert("Update failed!");
  }
};


  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">My Donation Requests</h1>

      {/* FILTER BUTTON */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "inprogress", "done", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => handleFilter(status)}
            className={`px-4 py-2 rounded text-white ${
              filterValue === status ? "bg-red-600" : "bg-gray-500"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Recipient</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Blood</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50 border">
                <td className="p-2 border">{req.recipientName}</td>
                <td className="p-2 border">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td className="p-2 border">{req.donationDate}</td>
                <td className="p-2 border">{req.donationTime}</td>
                <td className="p-2 border">{req.bloodGroup}</td>

                <td className="p-2 border">
                  {role === "Admin" ? (
                    <select
                      value={req.donationStatus}
                      onChange={(e) => updateStatus(req._id, e.target.value)}
                      className="border p-1 rounded"
                    >
                      <option value="pending">pending</option>
                      <option value="inprogress">inprogress</option>
                      <option value="done">done</option>
                      <option value="canceled">canceled</option>
                    </select>
                  ) : (
                    <span className="font-medium">{req.donationStatus}</span>
                  )}
                </td>

                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => setEditItem(req)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteRequest(req._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-bold">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-96 space-y-3">

            <h2 className="text-xl font-bold">Edit Request</h2>

            <input
              type="text"
              defaultValue={editItem.recipientName}
              onChange={(e) =>
                setEditItem({ ...editItem, recipientName: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              defaultValue={editItem.recipientDistrict}
              onChange={(e) =>
                setEditItem({ ...editItem, recipientDistrict: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              defaultValue={editItem.recipientUpazila}
              onChange={(e) =>
                setEditItem({ ...editItem, recipientUpazila: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              defaultValue={editItem.donationDate}
              onChange={(e) =>
                setEditItem({ ...editItem, donationDate: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <input
              type="time"
              defaultValue={editItem.donationTime}
              onChange={(e) =>
                setEditItem({ ...editItem, donationTime: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <select
              defaultValue={editItem.bloodGroup}
              onChange={(e) =>
                setEditItem({ ...editItem, bloodGroup: e.target.value })
              }
              className="w-full border p-2 rounded"
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditItem(null)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default MyDonationRequests;
