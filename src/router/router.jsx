import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import DashboardLayout from "../pages/DashboardLayout";
import MainDashboard from "../components/Dashboard/MainDashboard";

import AddRequest from "../components/AddRequest/AddRequest";
import AllUsers from "../components/allUsers/AllUsers";
import PrivateRoute from "../Provider/PrivateRoute";
import ProfilePage from "../pages/profile";
import MyDonationRequests from "../pages/MyDonationRequests";
import SearchDonors from "../pages/Search";
import DonationRequests from "../pages/DonationRequests";
import DonationRequestDetails from "../pages/DonationDetailsPage";
import EditRequest from "../pages/EditRequest";
import RequestDetails from "../pages/RequestDetails";
import EditDonationRequest from "../pages/EditRequest";
import AllBloodDonationRequests from "../pages/AllBloodDonationRequests";
import FundingPage from "../pages/FundingPage";
import Success from "../pages/Success";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/donation-success",
        element: (
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/searchDonor",
        Component: SearchDonors,
      },
      {
        path: "donationRequests",
        Component: DonationRequests,
      },
      {
        path: "/donationDetails/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <FundingPage />
          </PrivateRoute>
        ),
      },
      
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <MainDashboard />,
      },

      {
        path: "/dashboard/addRequest",
        element: <AddRequest />,
      },
      {
        path: "/dashboard/all-users",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/profile",
        element: <ProfilePage />,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "/dashboard/dontationDetails/:id",
        element: <DonationRequestDetails />,
      },
      {
        path: "/dashboard/request/:id",
        element: <RequestDetails />,
      },
      {
        path: "/dashboard/edit-request/:id",
        element: <EditDonationRequest />,
      },
      {
        path: "/dashboard/donationRequests",
        Component: AllBloodDonationRequests,
      },
    ],
  },
]);
