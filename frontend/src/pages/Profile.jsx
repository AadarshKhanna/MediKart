
// import React, { useState, useEffect } from "react";
// import Card from "../components/ui/smallCard";
// import Button from "../components/ui/button";
// import { Settings, Key, Upload, Clock, Activity, User, Mail, Phone, Sun, Moon } from "lucide-react";

// function Profile() {
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
//     <div className={`max-w-5xl mx-auto p-6 flex flex-col gap-6 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
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
//           <Button className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-blue-600'}`}>What's New!</Button>
//           <button onClick={toggleDarkMode} className="p-2 rounded-full">
//             {isDarkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} className="text-gray-700" />}
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className={`${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-white'}`}>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold flex items-center gap-2"><Settings size={20} />Account Settings</h3>
//             <p>Update your account details.</p>
//             <Button className="mt-4 flex items-center gap-2">
//               <Settings size={16} /> Open Settings
//             </Button>
//           </div>
//         </Card>

//         <Card className={`${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-white'}`}>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold flex items-center gap-2"><Key size={20} />Change Password</h3>
//             <p>Secure your account by updating your password.</p>
//             <Button className="mt-4 flex items-center gap-2">
//               <Key size={16} /> Change Password
//             </Button>
//           </div>
//         </Card>

//         <Card className={`${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-white'}`}>
//           <div className="p-4">
//             <h3 className="text-xl font-semibold flex items-center gap-2"><User size={20} />Profile Information</h3>
//             <p>View and edit your personal details.</p>
//             <div className="mt-4 space-y-2">
//               <div className="flex items-center gap-2"><Mail size={16} /> admin@example.com</div>
//               <div className="flex items-center gap-2"><Phone size={16} /> +1 123-456-7890</div>
//             </div>
//           </div>
//         </Card>

//         <Card className={`${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-white'}`}>
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
// Profile.jsx
import React, { useState, useEffect } from "react";
import Card from "../components/ui/smallCard";
import Button from "../components/ui/button";
import { Settings, Key, Upload, Clock, Activity, User, Mail, Phone, Sun, Moon } from "lucide-react";

function Profile() {
  const messages = ["Good morning, Admin", "How's your day today?"];
  const [displayText, setDisplayText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [profileImage, setProfileImage] = useState(null);
  const [lastLogin, setLastLogin] = useState(new Date(Date.now() - 2 * 60 * 60 * 1000));
  const [lastProfileUpdate, setLastProfileUpdate] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (charIndex < messages[messageIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + messages[messageIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setCharIndex(0);
        setDisplayText("");
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2000);
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
    <div className={`max-w-5xl mx-auto p-6 flex flex-col gap-6 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className={`p-6 rounded-2xl shadow-md flex items-center justify-between relative ${isDarkMode ? 'bg-gray-800' : 'bg-blue-600 text-white'}`}>
        <div className="flex items-center gap-4">
          <label htmlFor="upload-profile" className="cursor-pointer">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700">
                  <Upload size={24} />
                </div>
              )}
            </div>
          </label>
          <input type="file" id="upload-profile" className="hidden" onChange={handleImageUpload} />
          <div>
            <h2 className="text-2xl font-bold h-8">{displayText}</h2>
            <p>Manage your profile settings here.</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Button className={`${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-blue-600'}`}>What's New!</Button>
          <button onClick={toggleDarkMode} className="p-2 rounded-full">
            {isDarkMode ? <Sun size={24} className="text-white" /> : <Moon size={24} className="text-gray-700" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Settings size={20} />Account Settings</h3>
            <p>Update your account details.</p>
            <Button className="mt-4 flex items-center gap-2">
              <Settings size={16} /> Open Settings
            </Button>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2"><Key size={20} />Change Password</h3>
            <p>Secure your account by updating your password.</p>
            <Button className="mt-4 flex items-center gap-2">
              <Key size={16} /> Change Password
            </Button>
          </div>
        </Card>

        <Card>
          <div className="p-4">
            <h3 className="text-xl font-semibold flex items-center gap-2"><User size={20} />Profile Information</h3>
            <p>View and edit your personal details.</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2"><Mail size={16} /> admin@example.com</div>
              <div className="flex items-center gap-2"><Phone size={16} /> +1 123-456-7890</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Clock size={24} />
              <div>
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <p>Last login: {formatTimeAgo(lastLogin)}</p>
                <p>Last profile update: {formatTimeAgo(lastProfileUpdate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Activity size={24} />
              <div>
                <h3 className="text-xl font-semibold">Activity Log</h3>
                <p>View all recent actions</p>
                <Button className="mt-2">View Log</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;