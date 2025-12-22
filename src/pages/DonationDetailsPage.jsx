import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Hospital,
  UserRound,
  ArrowLeft,
  FileText,
} from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:3000/requests/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setDataLoading(false);
      });
  }, [loading, user, id, navigate]);

  // Confirm donation → update status
  const handleDonate = async () => {
    await axios.patch(`http://localhost:3000/requests/update-status/${id}`, {
      donationStatus: "inprogress",
      donorName: user.displayName,
      donorEmail: user.email,
    });

    alert("Donation confirmed. Request is now IN PROGRESS!");
    navigate("/donationRequests");
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner text-error scale-150"></span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center text-xl font-bold text-red-600">
        ❌ No data found
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-12 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl border border-gray-100 rounded-2xl p-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/donationRequests')}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 hover:gap-3 transition-all font-medium mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Page Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Donation Request Details
        </h2>

        {/* Data Display */}
        <div className="space-y-5 text-gray-700 text-lg">

          <p className="flex items-center gap-2">
            <UserRound size={22} className="text-red-500" />
            <span className="font-semibold">Recipient:</span> {data.recipientName}
          </p>

          <p className="flex items-center gap-2">
            <Droplet size={22} className="text-red-500" />
            <span className="font-semibold">Blood Group:</span> {data.bloodGroup}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={22} className="text-red-500" />
            <span className="font-semibold">Location:</span>
            {data.recipientDistrict}, {data.recipientUpazila}
          </p>

          <p className="flex items-center gap-2">
            <Hospital size={22} className="text-red-500" />
            <span className="font-semibold">Hospital:</span> {data.hospitalName}
          </p>

          <p className="flex items-center gap-2">
            <Calendar size={22} className="text-red-500" />
            <span className="font-semibold">Date:</span> {data.donationDate}
          </p>

          <p className="flex items-center gap-2">
            <Clock size={22} className="text-red-500" />
            <span className="font-semibold">Time:</span> {data.donationTime}
          </p>

          <p className="pt-2 text-gray-800 flex gap-2 items-start">
            <FileText size={22} className="text-red-500 mt-1" />
            <span>
              <span className="font-semibold">Message:</span><br />
              <span className="text-gray-600">{data.requestMessage}</span>
            </span>
          </p>
        </div>

        {/* DONATE BUTTON */}
        {data.donationStatus === "pending" && (
          <button
            onClick={() => setOpenModal(true)}
            className="btn btn-error w-full mt-8 text-white"
          >
            Donate Blood ❤️
          </button>
        )}

        {/* MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
              
              <h3 className="text-xl font-bold text-gray-700">
                Confirm Donation
              </h3>

              <input
                className="input input-bordered w-full"
                value={user.displayName}
                readOnly
              />

              <input
                className="input input-bordered w-full"
                value={user.email}
                readOnly
              />

              <div className="flex gap-3">
                <button
                  className="btn btn-error text-white w-1/2"
                  onClick={handleDonate}
                >
                  Confirm
                </button>

                <button
                  className="btn btn-outline w-1/2"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DonationRequestDetails;
