# 🩸 Blood Donation Management Platform - Client

A life-saving web application that connects blood donors with recipients in need. Built with modern web technologies to facilitate quick and efficient blood donation coordination during emergencies.

## 🌐 Live Links

- **Live Application**: [https://pawmartclient321.firebaseapp.com](https://pawmartclient321.firebaseapp.com)
- **Client Repository**: [GitHub](https://github.com/mamun007molla/blood-Donation.git)
- **Server Repository**: [GitHub](https://github.com/mamun007molla/blood-donation-server.git)

## 📋 Project Overview

The Blood Donation Management Platform is a comprehensive web application designed to bridge the gap between blood donors and recipients. In critical situations where every second counts, our platform enables users to quickly find compatible donors, make urgent requests, and coordinate blood donations efficiently.

## 🛠️ Technologies Used

### Frontend Framework & Libraries
- **React.js** - Component-based UI library
- **React Router DOM** - Client-side routing and navigation
- **Vite** - Next-generation build tool for faster development

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Tailwind CSS component library for beautiful UI
- **React Icons** - Comprehensive icon library

### Authentication & Backend Integration
- **Firebase Authentication** - Secure user authentication
- **Firebase Hosting** - Fast and secure web hosting
- **Axios** - HTTP client for API requests

### State Management & Data
- **TanStack Query (React Query)** - Server state management
- **React Hook Form** - Efficient form handling
- **Context API** - Global state management

### Additional Tools
- **React Hot Toast** - Elegant toast notifications
- **SweetAlert2** - Beautiful modal alerts
- **date-fns** - Modern date utility library

## ✨ Core Features

### 🔐 User Management
- **Secure Registration & Login** - Firebase-powered authentication
- **User Profiles** - Complete donor information management
- **Role-Based Access** - Donor and Admin roles

### 🩸 Donation Features
- **Blood Request System** - Create and manage urgent blood requests
- **Donor Search** - Find donors by blood type, location, and availability
- **Advanced Filtering** - Filter by district, blood group, and status
- **Real-time Availability** - Live updates on donor availability

### 📊 Dashboard
- **Personal Dashboard** - View donation history and requests
- **Request Management** - Track and update blood requests
- **Profile Management** - Update personal and contact information

### 🚨 Emergency Features
- **Urgent Request Marking** - Flag critical cases
- **Quick Contact** - Direct messaging to donors
- **Location-Based Search** - Find nearby donors quickly

### 📱 User Experience
- **Responsive Design** - Works seamlessly on all devices
- **Intuitive Interface** - Easy navigation for all age groups
- **Fast Loading** - Optimized performance
- **Accessibility** - WCAG compliant design

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "firebase": "^10.x",
    "axios": "^1.x",
    "@tanstack/react-query": "^5.x",
    "react-hook-form": "^7.x",
    "react-hot-toast": "^2.x",
    "sweetalert2": "^11.x",
    "react-icons": "^5.x",
    "date-fns": "^3.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "tailwindcss": "^3.x",
    "daisyui": "^4.x",
    "@vitejs/plugin-react": "^4.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/mamun007molla/blood-Donation.git
   cd blood-Donation
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_server_api_url
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application

### Build for Production

```bash
npm run build
# or
yarn build
```

The production-ready build will be created in the `dist` folder.

### Deploy to Firebase

```bash
npm run build
firebase deploy
```

## 📁 Project Structure

```
blood-Donation/
├── public/              # Static assets
│   └── favicon.ico
├── src/
│   ├── assets/         # Images, icons, and media
│   ├── components/     # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── DonorCard.jsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Donors.jsx
│   │   ├── Requests.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Context API providers
│   ├── utils/          # Utility functions
│   ├── config/         # Configuration files
│   │   └── firebase.js
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── vite.config.js      # Vite configuration
└── firebase.json       # Firebase configuration
```

## 🔐 Environment Variables

Create a `.env.local` file with these variables:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎯 Key Pages

- **Home** - Landing page with call-to-action
- **Donors** - Browse and search available donors
- **Blood Requests** - View and create blood requests
- **Dashboard** - Personal dashboard for users
- **Profile** - User profile management
- **Login/Register** - Authentication pages

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Mamun Molla**
- GitHub: [@mamun007molla](https://github.com/mamun007molla)

## 🙏 Acknowledgments

- Thanks to all blood donors who save lives every day
- Inspired by the need for efficient emergency response systems
- Built with the goal of making blood donation more accessible

## ⚠️ Disclaimer

This platform is designed to facilitate blood donation coordination. Always consult with medical professionals and follow proper medical protocols. In case of medical emergencies, contact local emergency services immediately.

---

**💝 Every donation saves lives. Join us in making a difference!**
