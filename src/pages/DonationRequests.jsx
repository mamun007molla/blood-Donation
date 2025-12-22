import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
    document.title = "Donation Requests | BloodCare";
  }, []);
  useEffect(() => {
    axios
      .get("https://mission11scic.vercel.app/requests/pending")
      .then((res) => setRequests(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-error scale-150"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 pt-24 pb-12">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10">
        Active Blood Requests ❤️
      </h1>

      {requests.length === 0 && (
        <p className="text-center text-gray-600 text-lg italic">
          No active donation requests found.
        </p>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white rounded-2xl shadow-md border border-white hover:shadow-red-200 hover:-translate-y-1 transition p-6"
          >
            <h2 className="text-xl font-bold mb-1 text-gray-800">
              {req.recipientName}
            </h2>

            <p className="text-gray-600 font-medium">
              📍 {req.recipientDistrict}, {req.recipientSubDistrict}
            </p>

            <p className="text-gray-800 font-semibold mt-3">
              ❤️ Blood Group:{" "}
              <span className="text-red-600">{req.bloodGroup}</span>
            </p>

            <p className="text-gray-700 font-medium mt-2">
              📅 {req.donationDate}
              <br />⏰ {req.donationTime}
            </p>

            <Link
              to={`/donationDetails/${req._id}`}
              className="btn btn-error text-white w-full mt-4"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
