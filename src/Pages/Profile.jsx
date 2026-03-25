import React, { useState, useRef } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import {
  FaUser, FaLock, FaCog, FaCamera, FaEdit, FaSave,
  FaTimes, FaEye, FaEyeSlash, FaIdCard, FaGraduationCap,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt,
} from "react-icons/fa";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [saveSuccess, setSaveSuccess] = useState("");
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: storedUser.name || "Prince Dammy",
    email: storedUser.email || "prince.dammy@student.edu",
    role: storedUser.role || "Student",
    initials: storedUser.initials || "PD",
    phone: "+234 801 234 5678",
    address: "12 Campus Road, University Town",
    dob: "2000-05-15",
    studentId: "STU/2021/0042",
    department: "Computer Science",
    level: "300",
    faculty: "Science & Technology",
    enrollmentYear: "2021",
  });

  const [draft, setDraft] = useState({ ...profile });

  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    resultAlerts: true,
    eventReminders: true,
    darkMode: false,
    twoFactor: false,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Update initials from name
    const initials = draft.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const updated = { ...draft, initials };
    setProfile(updated);
    localStorage.setItem("user", JSON.stringify({ ...storedUser, ...updated }));
    setEditMode(false);
    setSaveSuccess("Profile updated successfully!");
    setTimeout(() => setSaveSuccess(""), 3000);
  };

  const handleCancelEdit = () => {
    setDraft({ ...profile });
    setEditMode(false);
  };

  const handleChangePassword = () => {
    if (!passwords.current) return setSaveSuccess("❌ Please enter your current password.");
    if (passwords.new.length < 6) return setSaveSuccess("❌ New password must be at least 6 characters.");
    if (passwords.new !== passwords.confirm) return setSaveSuccess("❌ Passwords do not match.");
    setPasswords({ current: "", new: "", confirm: "" });
    setSaveSuccess("✅ Password changed successfully!");
    setTimeout(() => setSaveSuccess(""), 3000);
  };

  const tabs = [
    { key: "personal", label: "Personal Info", icon: <FaUser /> },
    { key: "password", label: "Change Password", icon: <FaLock /> },
    { key: "settings", label: "Account Settings", icon: <FaCog /> },
  ];

  const inputClass = (editable) =>
    `w-full p-3 border rounded-lg text-sm transition ${
      editable
        ? "bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        : "bg-gray-50 text-gray-700 cursor-default"
    }`;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500">Manage your personal information and account settings</p>
      </div>

      {/* Success Toast */}
      {saveSuccess && (
        <div className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
          saveSuccess.startsWith("❌") ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"
        }`}>
          {saveSuccess}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">

        {/* ── LEFT: Profile Card ── */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow p-6 text-center">

            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-[#000080] flex items-center justify-center text-white text-3xl font-bold mx-auto overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profile.initials
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-[#000080] text-white p-2 rounded-full hover:bg-[#000066] transition shadow"
              >
                <FaCamera className="text-xs" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            <h2 className="text-lg font-bold text-gray-800">{profile.name}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <span className="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">
              {profile.role}
            </span>

            {/* Student Details */}
            <div className="mt-5 space-y-3 text-left border-t pt-4">
              {[
                { icon: <FaIdCard />, label: "Student ID", value: profile.studentId },
                { icon: <FaGraduationCap />, label: "Department", value: profile.department },
                { icon: <FaCalendarAlt />, label: "Level", value: `${profile.level} Level` },
                { icon: <FaGraduationCap />, label: "Faculty", value: profile.faculty },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-[#000080] w-4">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="font-medium text-gray-700">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Tabs ── */}
        <div className="flex-1">
          {/* Tab Buttons */}
          <div className="flex gap-2 flex-wrap mb-5">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setEditMode(false); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition ${
                  activeTab === tab.key
                    ? "bg-[#000080] text-white shadow"
                    : "bg-white text-gray-600 hover:bg-gray-100 shadow-sm"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* ── PERSONAL INFO ── */}
          {activeTab === "personal" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-semibold text-gray-800">Personal Information</h2>
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 bg-[#000080] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#000066] transition"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancelEdit}
                      className="flex items-center gap-2 border text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition"
                    >
                      <FaSave /> Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Full Name", key: "name", icon: <FaUser /> },
                  { label: "Email Address", key: "email", icon: <FaEnvelope /> },
                  { label: "Phone Number", key: "phone", icon: <FaPhone /> },
                  { label: "Date of Birth", key: "dob", icon: <FaCalendarAlt />, type: "date" },
                  { label: "Address", key: "address", icon: <FaMapMarkerAlt />, full: true },
                ].map((field) => (
                  <div key={field.key} className={field.full ? "md:col-span-2" : ""}>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                      <span className="text-[#000080]">{field.icon}</span> {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      value={editMode ? draft[field.key] : profile[field.key]}
                      onChange={(e) => setDraft((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      readOnly={!editMode}
                      className={inputClass(editMode)}
                    />
                  </div>
                ))}

                {/* Academic Fields */}
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <span className="text-[#000080]"><FaIdCard /></span> Student ID
                  </label>
                  <input
                    type="text"
                    value={profile.studentId}
                    readOnly
                    className={inputClass(false)}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <span className="text-[#000080]"><FaGraduationCap /></span> Level
                  </label>
                  {editMode ? (
                    <select
                      value={draft.level}
                      onChange={(e) => setDraft((prev) => ({ ...prev, level: e.target.value }))}
                      className={inputClass(true)}
                    >
                      {["100", "200", "300", "400", "500"].map((l) => (
                        <option key={l} value={l}>{l} Level</option>
                      ))}
                    </select>
                  ) : (
                    <input type="text" value={`${profile.level} Level`} readOnly className={inputClass(false)} />
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <span className="text-[#000080]"><FaGraduationCap /></span> Department
                  </label>
                  <input
                    type="text"
                    value={editMode ? draft.department : profile.department}
                    onChange={(e) => setDraft((prev) => ({ ...prev, department: e.target.value }))}
                    readOnly={!editMode}
                    className={inputClass(editMode)}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <span className="text-[#000080]"><FaGraduationCap /></span> Enrollment Year
                  </label>
                  <input
                    type="text"
                    value={profile.enrollmentYear}
                    readOnly
                    className={inputClass(false)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── CHANGE PASSWORD ── */}
          {activeTab === "password" && (
            <div className="bg-white rounded-2xl shadow p-6 max-w-lg">
              <h2 className="font-semibold text-gray-800 mb-5">Change Password</h2>
              <div className="space-y-4">
                {[
                  { label: "Current Password", key: "current" },
                  { label: "New Password", key: "new" },
                  { label: "Confirm New Password", key: "confirm" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 block">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword[field.key] ? "text" : "password"}
                        value={passwords[field.key]}
                        onChange={(e) => setPasswords((prev) => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full p-3 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => ({ ...prev, [field.key]: !prev[field.key] }))}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword[field.key] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                ))}

                {/* Password strength hint */}
                {passwords.new && (
                  <div className="text-xs text-gray-500">
                    Strength:{" "}
                    <span className={`font-semibold ${
                      passwords.new.length >= 10 ? "text-green-600" :
                      passwords.new.length >= 6 ? "text-yellow-500" : "text-red-500"
                    }`}>
                      {passwords.new.length >= 10 ? "Strong" : passwords.new.length >= 6 ? "Medium" : "Weak"}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleChangePassword}
                  className="w-full bg-[#000080] text-white py-3 rounded-lg font-semibold hover:bg-[#000066] transition text-sm"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* ── ACCOUNT SETTINGS ── */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-semibold text-gray-800 mb-5">Account Settings</h2>
              <div className="space-y-4">
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "smsNotifications", label: "SMS Notifications", desc: "Receive updates via SMS" },
                  { key: "resultAlerts", label: "Result Alerts", desc: "Get notified when results are published" },
                  { key: "eventReminders", label: "Event Reminders", desc: "Reminders for upcoming events and deadlines" },
                  { key: "darkMode", label: "Dark Mode", desc: "Switch to dark theme (coming soon)" },
                  { key: "twoFactor", label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{setting.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>
                    </div>
                    <button
                      onClick={() => setSettings((prev) => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        settings[setting.key] ? "bg-[#000080]" : "bg-gray-300"
                      }`}
                    >
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                        settings[setting.key] ? "translate-x-7" : "translate-x-1"
                      }`} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t">
                <button className="text-red-500 text-sm font-medium hover:underline">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;