// import React, { useState, useEffect } from "react";
// import Card from "../components/ui/smallCard";
// import Button from "../components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { Settings, Key, Upload, Clock, Activity, User, Mail, Phone, Sun, Moon } from "lucide-react";

// function Profile() {
//   const navigate = useNavigate();
//   const messages = ["Good morning, Admin", "How's your day today?"];
//   const [displayText, setDisplayText] = useState("");
//   const [messageIndex, setMessageIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [profileImage, setProfileImage] = useState(null);
//   const [lastLogin, setLastLogin] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000));
//   const [lastProfileUpdate, setLastProfileUpdate] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000));
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     if (charIndex < messages[messageIndex].length) {
//       const timeout = setTimeout(() => {
//         setDisplayText((prev) => prev + messages[messageIndex][charIndex]);
//         setCharIndex((prev) => prev + 1);
//       }, 100);
//       return () => clearTimeout(timeout);
//     } else {
//       setTimeout(() => {
//         setCharIndex(0);
//         setDisplayText("");
//         setMessageIndex((prev) => (prev + 1) % messages.length);
//       }, 2000);
//     }
//   }, [charIndex, messageIndex]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   const formatTimeAgo = (date) => {
//     const seconds = Math.floor((new Date() - date) / 1000);
//     let interval = seconds / 31536000;
//     if (interval > 1) {
//       return Math.floor(interval) + " years ago";
//     }
//     interval = seconds / 2592000;
//     if (interval > 1) {
//       return Math.floor(interval) + " months ago";
//     }
//     interval = seconds / 86400;
//     if (interval > 1) {
//       return Math.floor(interval) + " days ago";
//     }
//     interval = seconds / 3600;
//     if (interval > 1) {
//       return Math.floor(interval) + " hours ago";
//     }
//     interval = seconds / 60;
//     if (interval > 1) {
//       return Math.floor(interval) + " minutes ago";
//     }
//     return Math.floor(seconds) + " seconds ago";
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   return (
//     <div className={` mx-auto w-293 p-6 flex flex-col gap-6 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
//       <div className={`p-6 rounded-2xl shadow-md flex items-center justify-between relative ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600 text-white'}`}>
//         <div className="flex items-center gap-4">
//           <label htmlFor="upload-profile" className="cursor-pointer">
//             <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
//               {profileImage ? (
//                 <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-gray-700">
//                   <Upload size={24} />
//                 </div>
//               )}
//             </div>
//           </label>
//           <input type="file" id="upload-profile" className="hidden" onChange={handleImageUpload} />
//           <div>
//             <h2 className="text-2xl font-bold h-8">{displayText}</h2>
//             <p>Manage your profile settings here.</p>
//           </div>
//         </div>
//         <div className="flex gap-4 items-center">
//           {/* What's New Button */}
//           <Button
//             className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all border 
//       ${isDarkMode ? 'bg-gray-500 text-white hover:bg-gray-400 border-gray-400'
//                 : 'bg-gray-400 text-blue-600 hover:bg-gray-700 border-gray-400'}`}
//           >
//             What's New!
//           </Button>

//           {/* Dark Mode Toggle Button */}
//           <button
//             onClick={toggleDarkMode}
//             className="p-2 rounded-full bg-gray-600 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 transition-all shadow-md"
//           >
//             {isDarkMode ? <Sun size={24} className="text-yellow-300" /> : <Moon size={24} className="text-gray-100" />}
//           </button>
//         </div>



//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold flex items-center gap-2"><Settings size={20} />Account Settings</h3>
//             <p>Update your account details.</p>
//             <Button className="mt-4 flex items-center gap-2">
//               <Settings size={16} /> Open Settings
//             </Button>
//           </div>
//         </Card>

//         <Card>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold flex items-center gap-2">
//               <Key size={20} /> Change Password
//             </h3>
//             <p>Secure your account by updating your password.</p>
//             <Button
//               className="mt-4 flex items-center gap-2"
//               onClick={() => navigate("/settings")}
//             >
//               <Key size={16} /> Change Password
//             </Button>
//           </div>
//         </Card>

//         <Card>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold flex items-center gap-2"><User size={20} />Profile Information</h3>
//             <p>View and edit your personal details.</p>
//             <div className="mt-4 space-y-2">
//               <div className="flex items-center gap-2"><Mail size={16} /> Moksh@example.com</div>
//               <div className="flex items-center gap-2"><Phone size={16} /> +91 123-456-7890</div>
//             </div>
//           </div>
//         </Card>

//         <Card>
//           <div className="p-4 flex flex-col gap-4">
//             <div className="flex items-center gap-4">
//               <Clock size={24} />
//               <div>
//                 <h3 className="text-xl font-semibold">Recent Activity</h3>
//                 <p>Last login: {formatTimeAgo(lastLogin)}</p>
//                 <p>Last profile update: {formatTimeAgo(lastProfileUpdate)}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Activity size={24} />
//               <div>
//                 <h3 className="text-xl font-semibold">Activity Log</h3>
//                 <p>View all recent actions</p>
//                 <Button className="mt-2">View Log</Button>
//               </div>
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

// export default Profile;
import React, { useState, useEffect } from "react";
import Card from "../components/ui/smallCard";
import Button from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Key,
  Upload,
  Clock,
  Activity,
  User,
  Mail,
  Phone,
  Sun,
  Moon,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const messages = ["Good morning, Admin", "How's your day today?"];
  const [displayText, setDisplayText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [lastLogin, setLastLogin] = useState(
    new Date(Date.now() - 2 * 60 * 60 * 1000)
  );
  const [lastProfileUpdate, setLastProfileUpdate] = useState(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (charIndex < messages[messageIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + messages[messageIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const delay = setTimeout(() => {
        setCharIndex(0);
        setDisplayText("");
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
      return () => clearTimeout(delay);
    }
  }, [charIndex, messageIndex]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`mx-auto max-w-5xl p-8 flex flex-col gap-8 rounded-lg shadow-lg transition-colors duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-800 border border-gray-200"
      }`}
    >
      <header
        className={`flex items-center justify-between rounded-xl p-6 shadow-md ${
          isDarkMode ? "bg-gray-800" : "bg-blue-600 text-white"
        }`}
      >
        <div className="flex items-center gap-5">
          <label
            htmlFor="upload-profile"
            className="cursor-pointer rounded-full border-2 border-white overflow-hidden w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-700"
            title="Upload Profile Image"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <Upload size={28} className="text-gray-400" />
            )}
          </label>
          <input
            type="file"
            id="upload-profile"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <div>
            <h2 className="text-3xl font-semibold min-h-[2.5rem]">{displayText}</h2>
            <p className="text-sm opacity-80 mt-1">Manage your profile settings here.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className={`px-5 py-2 rounded-lg font-semibold shadow-md border transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-600 text-white hover:bg-gray-500 border-gray-500"
                : "bg-gray-300 text-blue-700 hover:bg-blue-700 hover:text-white border-gray-300"
            }`}
          >
            What's New!
          </Button>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-gray-600 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors shadow-md"
          >
            {isDarkMode ? (
              <Sun size={24} className="text-yellow-300" />
            ) : (
              <Moon size={24} className="text-gray-100" />
            )}
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-3 mb-2">
              <Settings size={22} /> Account Settings
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Update your account details.
            </p>
            <Button className="mt-5 flex items-center gap-2 px-4 py-2">
              <Settings size={18} /> Open Settings
            </Button>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-3 mb-2">
              <Key size={22} /> Change Password
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Secure your account by updating your password.
            </p>
            <Button
              className="mt-5 flex items-center gap-2 px-4 py-2"
              onClick={() => navigate("/settings")}
            >
              <Key size={18} /> Change Password
            </Button>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <h3 className="text-xl font-semibold flex items-center gap-3 mb-2">
              <User size={22} /> Profile Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              View and edit your personal details.
            </p>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Mail size={18} /> Moksh@example.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} /> +91 123-456-7890
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-6 flex flex-col gap-6">
            <div className="flex items-center gap-5">
              <Clock size={28} />
              <div>
                <h3 className="text-xl font-semibold mb-1">Recent Activity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Last login: {formatTimeAgo(lastLogin)}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Last profile update: {formatTimeAgo(lastProfileUpdate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <Activity size={28} />
              <div>
                <h3 className="text-xl font-semibold mb-1">Activity Log</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  View all recent actions
                </p>
                <Button className="mt-3 px-4 py-2">View Log</Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default Profile;
