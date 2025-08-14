import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Lightbulb, 
  Palette, 
  Eye,
  Zap,
  Sparkles,
  Heart,
  Star,
  Coffee,
  Home,
  Sunset,
  Sunrise,
  CloudSun
} from 'lucide-react';

const LightSituationPage: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('themes');
  const [selectedMood, setSelectedMood] = useState('neutral');

  const tabs = [
    { id: 'themes', label: 'Theme Settings', icon: Palette },
    { id: 'lighting', label: 'Lighting Guide', icon: Lightbulb },
    { id: 'inspiration', label: 'Inspiration Hub', icon: Sparkles }
  ];

  const themeOptions = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: Sun,
      description: 'Clean, bright interface perfect for daytime use',
      colors: ['#ffffff', '#f8fafc', '#e2e8f0', '#64748b']
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: Moon,
      description: 'Easy on the eyes for nighttime browsing',
      colors: ['#0f172a', '#1e293b', '#334155', '#64748b']
    },
    {
      id: 'auto',
      name: 'Auto Mode',
      icon: Monitor,
      description: 'Automatically switches based on system preference',
      colors: ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef']
    }
  ];

  const lightingProducts = [
    {
      id: 1,
      name: 'Smart LED Strip',
      image: 'https://images.pexels.com/photos/1154106/pexels-photo-1154106.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 89,
      features: ['16M Colors', 'Voice Control', 'Music Sync'],
      mood: 'ambient'
    },
    {
      id: 2,
      name: 'Minimalist Desk Lamp',
      image: 'https://images.pexels.com/photos/1210406/pexels-photo-1210406.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 149,
      features: ['Touch Control', 'USB Charging', 'Eye Care'],
      mood: 'focus'
    },
    {
      id: 3,
      name: 'Smart Ceiling Light',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: 199,
      features: ['Circadian Rhythm', 'App Control', 'Energy Saving'],
      mood: 'wellness'
    }
  ];

  const moodScenarios = [
    {
      id: 'morning',
      name: 'Morning Energy',
      icon: Sunrise,
      color: 'from-yellow-400 to-orange-500',
      description: 'Bright, energizing light to start your day right',
      tips: ['Use cool white light (5000-6500K)', 'Gradually increase brightness', 'Position near workspace']
    },
    {
      id: 'focus',
      name: 'Focus Mode',
      icon: Zap,
      color: 'from-blue-400 to-indigo-600',
      description: 'Optimal lighting for productivity and concentration',
      tips: ['Use bright, even lighting', 'Minimize shadows', 'Add task lighting for detailed work']
    },
    {
      id: 'relax',
      name: 'Relaxation',
      icon: Heart,
      color: 'from-emerald-400 to-teal-600',
      description: 'Warm, soft lighting for unwinding and comfort',
      tips: ['Use warm white light (2700-3000K)', 'Dim overall brightness', 'Create multiple light sources']
    },
    {
      id: 'evening',
      name: 'Evening Wind Down',
      icon: Sunset,
      color: 'from-purple-400 to-pink-600',
      description: 'Gentle lighting to prepare for restful sleep',
      tips: ['Avoid blue light 2 hours before bed', 'Use amber or red tones', 'Keep lights low and warm']
    }
  ];

  const inspirationalQuotes = [
    {
      text: "Light tomorrow with today.",
      author: "Elizabeth Barrett Browning",
      category: "Motivation"
    },
    {
      text: "Every moment is a fresh beginning.",
      author: "T.S. Eliot",
      category: "Renewal"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
      category: "Action"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-700 dark:text-yellow-300 text-sm font-medium mb-6"
          >
            <Lightbulb size={16} className="mr-2" />
            Illuminate Your Experience
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Light Situation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          >
            Customize your visual experience, discover perfect lighting solutions, 
            and find inspiration to brighten your day.
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-xl p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Settings Tab */}
        {activeTab === 'themes' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themeOptions.map((option) => (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg cursor-pointer transition-all ${
                    theme === option.id
                      ? 'ring-4 ring-emerald-500 shadow-2xl'
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => setTheme(option.id as any)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      theme === option.id 
                        ? 'bg-gradient-to-br from-emerald-500 to-blue-500 text-white' 
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      <option.icon size={24} />
                    </div>
                    {theme === option.id && (
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {option.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {option.description}
                  </p>
                  
                  <div className="flex gap-2">
                    {option.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Accessibility Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">High Contrast Mode</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Increase contrast for better readability</p>
                  </div>
                  <button className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full p-1 transition-colors">
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Reduce Motion</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Minimize animations and transitions</p>
                  </div>
                  <button className="w-12 h-6 bg-slate-300 dark:bg-slate-600 rounded-full p-1 transition-colors">
                    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Lighting Guide Tab */}
        {activeTab === 'lighting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Mood Scenarios */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Lighting for Every Mood
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {moodScenarios.map((scenario) => (
                  <motion.div
                    key={scenario.id}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg cursor-pointer"
                    onClick={() => setSelectedMood(scenario.id)}
                  >
                    <div className={`h-32 bg-gradient-to-br ${scenario.color} flex items-center justify-center`}>
                      <scenario.icon size={40} className="text-white" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {scenario.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {scenario.description}
                      </p>
                    </div>
                    {selectedMood === scenario.id && (
                      <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Selected Mood Details */}
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
              >
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Tips for {moodScenarios.find(s => s.id === selectedMood)?.name}
                </h4>
                <ul className="space-y-2">
                  {moodScenarios.find(s => s.id === selectedMood)?.tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      {tip}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Featured Lighting Products */}
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Featured Lighting Solutions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lightingProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {product.name}
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-emerald-600">
                          ${product.price}
                        </span>
                        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Inspiration Hub Tab */}
        {activeTab === 'inspiration' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Quote of the Day */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl p-8 text-white">
                <Sparkles size={32} className="mx-auto mb-4 opacity-80" />
                <blockquote className="text-2xl lg:text-3xl font-semibold mb-4">
                  "{inspirationalQuotes[0].text}"
                </blockquote>
                <cite className="text-lg opacity-90">
                  — {inspirationalQuotes[0].author}
                </cite>
              </div>
            </div>

            {/* Inspirational Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Star, title: 'Daily Motivation', color: 'from-yellow-400 to-orange-500', count: '12 new' },
                { icon: Heart, title: 'Wellness Tips', color: 'from-pink-400 to-rose-500', count: '8 new' },
                { icon: Coffee, title: 'Productivity Hacks', color: 'from-blue-400 to-indigo-500', count: '15 new' }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg cursor-pointer overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-10 rounded-full -mr-8 -mt-8`}></div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    {category.count}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Success Stories */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Success Stories
              </h3>
              <div className="space-y-6">
                {[
                  {
                    name: 'Maria Rodriguez',
                    story: 'Transformed her home office lighting and increased productivity by 40%',
                    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
                  },
                  {
                    name: 'James Chen',
                    story: 'Created the perfect ambiance for his restaurant, boosting customer satisfaction',
                    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
                  }
                ].map((story, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {story.name}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        {story.story}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LightSituationPage;