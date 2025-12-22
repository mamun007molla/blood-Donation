import axios from "axios";
import { useContext, useEffect, useState } from "react";
// import { useAxiosSecure } from "../../hooks/useAxiosSecure";
import { Droplet, MapPin, Calendar, Clock, UserPlus, Hospital, FileText } from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useAxiosSecure } from "../../hooks/useAxiosSecure";

const AddRequest = () => {
   useEffect(() => {
      document.title = "Add Request | BloodCare";
    }, []);
  const [districtData, setDistrictData] = useState([]);
  const [upazilaData, setUpazilaData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext)

  useEffect(() => {
    axios.get("/district.json").then((res) => setDistrictData(res.data.districts));
    axios.get("/sub.json").then((res) => setUpazilaData(res.data.upazilas));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.status === "blocked") {
      return alert("⚠ You are blocked from creating requests.");
    }

    const form = e.target;

    const requestData = {
      requesterName: form.requesterName.value,
      requesterEmail: form.requesterEmail.value,
      recipientName: form.recipientName.value,
      recipientDistrict: selectedDistrict,
      recipientUpazila: selectedUpazila,
      hospitalName: form.hospitalName.value,
      address: form.address.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      bloodGroup: form.bloodGroup.value,
      requestMessage: form.requestMessage.value,
      donationStatus: "pending",
      createdAt: new Date(),
    };

    const res = await axiosSecure.post("/requests", requestData);

    if (res.data.insertedId) {
      alert("✔ Request Added Successfully!");
      form.reset();
      setSelectedDistrict("");
      setSelectedUpazila("");
    }
  };

  return (
    <div className="w-full flex justify-center py-12 px-4">
      <div className="w-full max-w-3xl rounded-xl bg-white shadow-lg border border-gray-100 p-8">

        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Create Donation Request
        </h2>

      
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold flex items-center gap-2">
                <UserPlus size={18} /> Requester Name
              </label>
              <input
                readOnly
                required
                name="requesterName"
                value={user?.displayName}
                className="input w-full bg-gray-200"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <UserPlus size={18} /> Requester Email
              </label>
              <input
                readOnly
                required
                name="requesterEmail"
                value={user?.email}
                className="input w-full bg-gray-200"
              />
            </div>
          </div>

         
          <div>
            <label className="font-semibold flex items-center gap-2">
              <UserPlus size={18} /> Recipient Name
            </label>
            <input
              required
              name="recipientName"
              placeholder="Enter patient name"
              className="input w-full"
            />
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold flex items-center gap-2">
                <MapPin size={18} /> District
              </label>
              <select
                required
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="select w-full"
              >
                <option value="">Select District</option>
                {districtData.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <MapPin size={18} /> Upazila
              </label>
              <select
                required
                onChange={(e) => setSelectedUpazila(e.target.value)}
                className="select w-full"
              >
                <option value="">Select Upazila</option>
                {upazilaData.map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

        
          <div>
            <label className="font-semibold flex items-center gap-2">
              <Hospital size={18} /> Hospital Name
            </label>
            <input
              required
              name="hospitalName"
              placeholder="Dhaka Medical College Hospital"
              className="input w-full"
            />
          </div>

         
          <div>
            <label className="font-semibold flex items-center gap-2">
              <MapPin size={18} /> Address
            </label>
            <input
              required
              name="address"
              placeholder="Zahir Raihan Rd, Dhaka"
              className="input w-full"
            />
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold flex items-center gap-2">
                <Calendar size={18} /> Donation Date
              </label>
              <input
                required
                type="date"
                name="donationDate"
                className="input w-full"
              />
            </div>

            <div>
              <label className="font-semibold flex items-center gap-2">
                <Clock size={18} /> Donation Time
              </label>
              <input
                required
                type="time"
                name="donationTime"
                className="input w-full"
              />
            </div>
          </div>

          
          <div>
            <label className="font-semibold flex items-center gap-2">
              <Droplet size={18} /> Blood Group
            </label>
            <select
              required
              name="bloodGroup"
              className="select w-full"
            >
              <option value="">Select Blood Group</option>
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="font-semibold flex items-center gap-2">
              <FileText size={18} /> Request Message
            </label>
            <textarea
              required
              name="requestMessage"
              placeholder="Explain why you need blood..."
              rows={4}
              className="textarea w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={user?.status === "blocked"}
            className={`btn bg-red-600 hover:bg-red-500 text-white text-lg mt-4 w-full
            ${user?.status === "blocked" && "opacity-50 cursor-not-allowed"}`}
          >
            Submit Request
          </button>
        </form>

        {user?.status === "blocked" && (
          <p className="text-red-600 font-semibold text-center mt-3">
            ⚠ You are blocked from creating requests.
          </p>
        )}
      </div>
    </div>
  );
};

export default AddRequest;
