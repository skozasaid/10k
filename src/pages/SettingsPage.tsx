import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Eye,
  Save,
  LogOut,
  Upload,
  Mail,
  Phone,
  MapPin,
  Lock,
  Settings,
  Trash2
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user, login, logout, updateUser, isAuthenticated } = useUser();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    bio: ''
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    newsletter: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    dataSharing: false,
    analytics: true
  });

  const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      setProfileForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        bio: ''
      });
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: profileForm.name,
      email: profileForm.email
    });
    alert('Profile updated successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Sign In to Your Account
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Access your settings and preferences
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Don't have an account? 
                <button className="text-emerald-600 hover:text-emerald-500 font-medium ml-1">
                  Sign up
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Account Settings
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sticky top-8">
              <div className="space-y-2">
                {settingsSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeSection === section.id
                        ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <section.icon size={20} />
                    {section.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                  <LogOut size={20} />
                  Sign Out
                </button>
              </div>
            </nav>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Profile Information
                  </h2>
                  
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                        <User size={40} className="text-white" />
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                        <Upload size={16} className="text-slate-600 dark:text-slate-300" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                        Profile Picture
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          <Phone size={16} className="inline mr-2" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          <MapPin size={16} className="inline mr-2" />
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                          className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        <Save size={20} />
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Notification Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-white capitalize">
                            {key === 'sms' ? 'SMS' : key} Notifications
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {key === 'email' && 'Receive notifications via email'}
                            {key === 'push' && 'Browser push notifications'}
                            {key === 'sms' && 'SMS notifications for urgent updates'}
                            {key === 'newsletter' && 'Weekly newsletter and updates'}
                          </p>
                        </div>
                        <button
                          onClick={() => setNotifications({...notifications, [key]: !value})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            value ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        >
                          <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                            value ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Privacy & Security
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white mb-4">
                        Profile Visibility
                      </h3>
                      <div className="space-y-2">
                        {['public', 'friends', 'private'].map((option) => (
                          <label key={option} className="flex items-center">
                            <input
                              type="radio"
                              name="profileVisibility"
                              value={option}
                              checked={privacy.profileVisibility === option}
                              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span className="ml-3 text-slate-700 dark:text-slate-300 capitalize">
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-white">
                            Data Sharing
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Allow sharing of anonymized data for service improvement
                          </p>
                        </div>
                        <button
                          onClick={() => setPrivacy({...privacy, dataSharing: !privacy.dataSharing})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            privacy.dataSharing ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        >
                          <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                            privacy.dataSharing ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-slate-900 dark:text-white">
                            Analytics Tracking
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            Help us improve your experience with usage analytics
                          </p>
                        </div>
                        <button
                          onClick={() => setPrivacy({...privacy, analytics: !privacy.analytics})}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            privacy.analytics ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                          }`}
                        >
                          <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                            privacy.analytics ? 'translate-x-7' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-4">
                        Account Actions
                      </h3>
                      <div className="space-y-3">
                        <button className="w-full sm:w-auto px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors">
                          Change Password
                        </button>
                        <button className="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors ml-0 sm:ml-3">
                          <Trash2 size={16} className="inline mr-2" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Billing Section */}
              {activeSection === 'billing' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    Billing & Payment
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                      <p className="text-slate-600 dark:text-slate-300 text-center">
                        No payment methods on file. Add a payment method to make purchases easier.
                      </p>
                    </div>

                    <button className="w-full px-4 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-emerald-500 transition-colors">
                      <CreditCard size={24} className="mx-auto mb-2 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-300">Add Payment Method</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
                    General Preferences
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Theme Preference
                      </label>
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                        <option value="auto">Auto (System)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Language
                      </label>
                      <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white">
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">Greenwich Time (UTC+0)</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;