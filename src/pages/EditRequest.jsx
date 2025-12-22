import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const EditDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 useEffect(() => {
    document.title = "Edit Request | BloodCare";
  }, []);
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get(`https://mission11scic.vercel.app/requests/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.patch(`https://mission11scic.vercel.app/requests/${id}`, data);

    alert("Request updated successfully!");

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleUpdate} className="p-5 max-w-lg mx-auto space-y-3">
      <input
        className="input input-bordered w-full"
        value={data.recipientName || ""}
        onChange={(e) => setData({ ...data, recipientName: e.target.value })}
      />

      <input
        className="input input-bordered w-full"
        value={data.recipientDistrict || ""}
        onChange={(e) =>
          setData({ ...data, recipientDistrict: e.target.value })
        }
      />

      <input
        className="input input-bordered w-full"
        value={data.recipientUpazila || ""}
        onChange={(e) => setData({ ...data, recipientUpazila: e.target.value })}
      />

      <button className="btn btn-primary w-full">Update</button>
    </form>
  );
};

export default EditDonationRequest;
