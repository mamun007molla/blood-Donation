import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import AdminDashboard from "./AdminDashboard";
import DonorDashboard from "./DonorDashboard";


const MainDashboard = () => {
    const {role}=useContext(AuthContext)
    console.log("Role",role);
    return (
    <div>
        {role!=='donor'?<AdminDashboard></AdminDashboard>:<DonorDashboard></DonorDashboard>}
    </div>
    )
}
export default MainDashboard;
