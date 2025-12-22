import { Link} from "react-router";
import Navbar from "../components/Header/Navbar";

const Home = () => {
  return (
    <div>
      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <Navbar />
      </nav>

      {/* Banner Section */}
      <div className="hero min-h-[80vh] bg-linear-to-r from-red-500 to-rose-500 text-white">
        <div className="hero-content flex flex-col lg:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight">
              Save Lives, Donate Blood ❤️
            </h1>
            <p className="text-lg mt-4 text-red-100">
              Become a blood donor and help people in need. Together, we can
              make a difference.
            </p>

            <div className="flex gap-4 mt-8">
              {/* Join Donor button */}
              <Link
                to="/register"
                className="px-6 py-3 rounded-full bg-white text-red-600 font-semibold shadow-md hover:shadow-lg hover:-translate-y-1 transition"
              >
                Join as a Donor
              </Link>

              {/* Search Donors button */}
              <Link
                to="/searchDonor"
                className="px-6 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold transition"
              >
                Search Donors
              </Link>
            </div>
          </div>

          {/* Banner Image */}
          <img
            src="https://www.surjen.com/resources/assets/uploads/post/2025-10-071228336.jpg"
            alt=""
            className="w-[320px] lg:w-105 drop-shadow-2xl rounded-2xl"
          />
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-6xl mx-auto mt-20 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Featured Actions
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Explore opportunities to contribute
        </p>

        {/* Custom cards or content can go here */}
      </div>

      {/* Contact Section */}
      <div className="max-w-6xl mx-auto mt-20 px-6 pb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-8">
          Reach out for help or collaboration
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <form className="bg-white p-8 rounded-2xl shadow-lg">
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full mb-4"
            />
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full mb-4"
            />
            <textarea
              placeholder="Your message"
              className="textarea textarea-bordered w-full mb-4"
            />
            <button className="btn btn-error w-full text-white">
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-lg text-gray-700">
              📞 Contact: +880 123 456 789
            </p>
            <p className="text-lg text-gray-700 mt-2">
              📧 Email: support@bloodcare.com
            </p>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-800 text-gray-300 py-10 px-6">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">BloodCare</h3>
            <p>
              A trusted blood donation platform helping save millions of lives
              every year.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              Useful Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donation-requests" className="hover:text-white">
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/search-donors" className="hover:text-white">
                  Search Donors
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-white">Connect</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </div>
        </div>

        <p className="text-center mt-10 text-gray-400 text-sm">
          © {new Date().getFullYear()} BloodCare — All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
