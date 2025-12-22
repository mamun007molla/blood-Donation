import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import { CheckCircle, ArrowRight, Home } from "lucide-react";

const Success = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    if (session_id) {
      axios.post(`http://localhost:3000/payment-success?session_id=${session_id}`);
    }
  }, [session_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-green-200">

        {/* Check Icon */}
        <div className="flex justify-center mb-5">
          <CheckCircle className="text-green-600" size={90} />
        </div>

        <h1 className="text-4xl font-extrabold text-green-700">
          Payment Successful! 🎉
        </h1>

        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          Thank you for your generous contribution.  
          Your donation will help us save more lives ❤️
        </p>

        {/* Transaction Info */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mt-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Transaction ID:</span>
            <br />
            <span className="text-green-700 font-bold">
              {session_id || "N/A"}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">

          <Link
            to="/dashboard"
            className="btn bg-green-600 hover:bg-green-700 text-white shadow-lg text-lg px-6"
          >
            Go to Dashboard <ArrowRight size={20} className="ml-2" />
          </Link>

          <Link
            to="/"
            className="btn bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg px-6"
          >
            <Home size={18} className="mr-2" /> Home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Success;
