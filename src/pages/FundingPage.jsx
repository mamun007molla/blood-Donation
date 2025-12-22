import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { FaHandHoldingHeart } from "react-icons/fa";

const FundingPage = () => {
  const { user } = useContext(AuthContext);

  const handleIntent = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user.email;
    const donorName = user.displayName;

    if (!donateAmount || isNaN(donateAmount) || donateAmount < 1) {
      alert("Please enter a valid amount");
      return;
    }

    const formData = { donateAmount, donorEmail, donorName };

    axios
      .post("http://localhost:3000/create-payment-checkout", formData)
      .then((res) => {
        window.location.href = res.data.url;
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full border border-red-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <FaHandHoldingHeart className="mx-auto text-red-600 text-5xl mb-3" />
          <h1 className="text-3xl font-extrabold text-gray-800">
            Support Our Mission ❤️
          </h1>
          <p className="text-gray-500 mt-2 leading-6">
            Every donation helps save lives. Contribute to our blood support
            program and make a difference today.
          </p>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
          <p className="text-sm text-gray-600">
            Donating as:
          </p>
          <p className="font-semibold text-gray-800">
            {user?.displayName}
          </p>
          <p className="font-medium text-gray-500 text-sm">
            {user?.email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleIntent} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Donation Amount (USD)
            </label>
            <input
              name="donateAmount"
              type="number"
              min={1}
              className="w-full input input-bordered focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-300 transition-all"
              placeholder="Enter amount e.g. 10"
              required
            />
          </div>

          <button
            className="w-full btn bg-gradient-to-r from-red-600 to-rose-500 border-none text-white text-lg shadow-lg hover:scale-[1.02] transition transform"
          >
            Donate Now 💝
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-6">
          100% Secure Stripe Payment ✨
        </p>
      </div>
    </div>
  );
};

export default FundingPage;
