import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/requests/${id}`)
      .then((res) => setRequest(res.data));
  }, [id]);

  if (!request) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <span className="loading loading-spinner scale-150"></span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-red-600"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Donation Request Details</h2>

      <div className="space-y-3">
        <p><strong>Recipient:</strong> {request.recipientName}</p>
        <p><strong>Location:</strong> {request.recipientDistrict}, {request.recipientUpazila}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Address:</strong> {request.address}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>Status:</strong> {request.donationStatus}</p>
      </div>
    </div>
  );
};

export default RequestDetails;
