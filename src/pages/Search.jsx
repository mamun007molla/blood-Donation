import { useEffect, useState } from "react";
import axios from "axios";

const SearchDonors = () => {
     useEffect(() => {
        document.title = "Search Donors | BloodCare";
      }, []);
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);

  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistrictData(res.data.districts);
    });

    axios.get("/sub.json").then((res) => {
      setUpazilaData(res.data.upazilas);
    });
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);

    const res = await axios.get(
      `https://mission11scic.vercel.app/donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
    );

    setDonors(res.data);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 bg-linear-to-br from-red-50 to-rose-100">
      {/* Header */}
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10">
        Find a Blood Donor ❤️
      </h1>

    
      <form
        onSubmit={handleSearch}
        className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
       
        <select
          className="select select-bordered w-full"
          onChange={(e) => setBloodGroup(e.target.value)}
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        
        <select
          className="select select-bordered w-full"
          onChange={(e) => setDistrict(e.target.value)}
        >
          <option value="">Select District</option>
          {districtData.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

       
        <select
          className="select select-bordered w-full"
          onChange={(e) => setUpazila(e.target.value)}
        >
          <option value="">Select Upazila</option>
          {upazilaData.map((d) => (
            <option key={d.id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>

        <button className="btn btn-error col-span-1 md:col-span-3 text-white text-lg mt-2">
          Search Donors
        </button>
      </form>

      
      {searched && (
        <div className="max-w-6xl mx-auto mt-14">
          {donors.length === 0 ? (
            <p className="text-center text-gray-600 text-lg italic">
              No donor found for this search.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6">
              {donors.map((d) => (
                <div
                  key={d._id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-white hover:shadow-red-200 transition hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={d.avatar || "https://i.ibb.co/4fV83K7/profile.png"}
                      alt="avatar"
                      className="w-16 h-16 rounded-full border-2 border-red-400"
                    />

                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {d.name}
                      </h2>
                      <p className="text-red-500 font-semibold">
                        {d.bloodGroup}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-gray-700">
                    <p className="font-medium">
                      📍 {d.district}, {d.upazila}
                    </p>
                    <p className="font-medium">📧 {d.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
