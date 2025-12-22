import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
  UserRoundCheck,
  House,
} from "lucide-react";
import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const AdminAside = () => {
  const { role, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
 useEffect(() => {
    document.title = "Dashboard | BloodCare";
  }, []);
  const handleSignout = () => {
    signOutUser();
    navigate("/"); 
  };

  if (!role) {
    return (
      <aside className="h-screen w-64 bg-slate-900 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </aside>
    );
  }

 
  const homeMenu = { name: "Home", icon: House, path: "/" };

  const menu = [
    homeMenu,
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Profile", icon: Package, path: "/dashboard/profile" },
    {
      name: "All Donation Requests",
      icon: Package,
      path: "/dashboard/donationRequests",
    },
    { name: "All Users", icon: Users, path: "/dashboard/all-users" },
  ];

  const menu1 = [
    homeMenu,
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Profile", icon: Package, path: "/dashboard/profile" },
    {
      name: "My Donation Requests",
      icon: Package,
      path: "/dashboard/my-donation-requests",
    },
    { name: "Add Requests", icon: Package, path: "/dashboard/addRequest" },
  ];

  const menu2 = [
    homeMenu,
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Profile", icon: Package, path: "/dashboard/profile" },
    {
      name: "All Donation Requests",
      icon: Package,
      path: "/dashboard/donationRequests",
    },
  ];

  const menus = {
    Admin: menu,
    donor: menu1,
    Volunteer: menu2,
  };

  const activeMenu = menus[role] || menu2;

  return (
    <aside className="h-screen w-64 bg-linear-to-b from-slate-900 to-slate-800 text-white flex flex-col shadow-2xl border-r border-slate-700">

      <div className="px-6 py-5 border-b border-slate-700 backdrop-blur-md">
        <h1 className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">
          BloodCare Panel
        </h1>

        <p className="flex items-center gap-2 text-sm mt-2 text-slate-300">
          <UserRoundCheck size={16} /> Role: 
          <span className="font-bold text-rose-400 capitalize">{role}</span>
        </p>
      </div>

      <nav className="flex-1 mt-4 flex flex-col gap-1 px-4">
        {activeMenu.map(({ name, icon, path }) => {
          const Icon = icon;
          return (
            <NavLink
              key={name}
              to={path}
              end={path === "/dashboard" || path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-[15px]
                transition-all duration-300 border border-transparent
                ${
                  isActive
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-500/30 border-rose-500"
                    : "text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                }`
              }
            >
              <Icon size={20} />
              {name}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-slate-700 backdrop-blur-md">
        <button
          onClick={handleSignout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
          bg-linear-to-r from-red-600 to-rose-600 text-white font-medium shadow-lg
          hover:from-red-500 hover:to-rose-500 transition-all duration-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default AdminAside;
