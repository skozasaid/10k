import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  RefreshCw, 
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const EndSituationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('support');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const tabs = [
    { id: 'support', label: 'Customer Support', icon: HelpCircle },
    { id: 'returns', label: 'Returns & Refunds', icon: RefreshCw },
    { id: 'account', label: 'Account Management', icon: FileText }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Available 24/7',
      action: 'Start Chat',
      status: 'online'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with a specialist',
      availability: 'Mon-Fri 9AM-6PM EST',
      action: 'Call Now',
      status: 'available'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your detailed inquiry',
      availability: 'Response within 24 hours',
      action: 'Send Email',
      status: 'always'
    }
  ];

  const faqData: FAQItem[] = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order by logging into your account and visiting the "My Orders" section. You\'ll find real-time tracking information and estimated delivery dates.',
      category: 'Orders'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day hassle-free return policy. Items must be in original condition with tags attached. Simply initiate a return through your account or contact customer service.',
      category: 'Returns'
    },
    {
      question: 'How do I change my shipping address?',
      answer: 'If your order hasn\'t shipped yet, you can modify the shipping address in your account under "My Orders". For shipped orders, please contact customer service immediately.',
      category: 'Shipping'
    },
    {
      question: 'Are your products covered by warranty?',
      answer: 'Yes, all our products come with a manufacturer warranty. The warranty period varies by product category, typically ranging from 1-3 years.',
      category: 'Warranty'
    },
    {
      question: 'How do I cancel my order?',
      answer: 'Orders can be cancelled within 1 hour of placing them through your account. After this window, please contact customer service for assistance.',
      category: 'Orders'
    }
  ];

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = faqData.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    (item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle support form submission
    console.log('Support form submitted:', supportForm);
    alert('Your support request has been submitted. We\'ll get back to you within 24 hours.');
    setSupportForm({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  const returnStatuses = [
    { icon: CheckCircle, status: 'Approved', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { icon: Clock, status: 'Processing', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { icon: XCircle, status: 'Rejected', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            End the Situation
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We're here to help resolve any issues, process returns, or manage your account. 
            Choose from the options below to get the assistance you need.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Support Tab */}
        {activeTab === 'support' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Support Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                      <channel.icon size={24} className="text-emerald-600" />
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      channel.status === 'online' ? 'bg-emerald-500' : 
                      channel.status === 'available' ? 'bg-yellow-500' : 'bg-slate-400'
                    }`}></div>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    {channel.description}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {channel.availability}
                  </p>
                  <button className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                    {channel.action}
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search FAQ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredFAQ.map((item, index) => (
                  <div key={index} className="p-6">
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-lg font-medium text-slate-900 dark:text-white">
                        {item.question}
                      </span>
                      {expandedFAQ === index ? (
                        <ChevronUp size={20} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={20} className="text-slate-400" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Still Need Help?
              </h3>
              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={supportForm.name}
                      onChange={(e) => setSupportForm({...supportForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={supportForm.email}
                      onChange={(e) => setSupportForm({...supportForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({...supportForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={supportForm.priority}
                    onChange={(e) => setSupportForm({...supportForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({...supportForm, message: e.target.value})}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    placeholder="Please describe your issue in detail..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Submit Support Request
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Returns & Refunds Tab */}
        {activeTab === 'returns' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Return & Refund Process
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-600">1</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Initiate Return</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Log into your account and select the items you want to return
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-600">2</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Ship Items</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Pack items securely and use our prepaid return label
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-emerald-600">3</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Get Refund</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Receive your refund within 3-5 business days after we receive your return
                  </p>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Return Policy Details</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• 30-day return window from delivery date</li>
                  <li>• Items must be in original condition with tags attached</li>
                  <li>• Free return shipping on defective or incorrect items</li>
                  <li>• Refunds processed to original payment method</li>
                  <li>• Custom or personalized items are final sale</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Account Management Tab */}
        {activeTab === 'account' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                Account Management Options
              </h3>
              
              <div className="space-y-6">
                <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="text-yellow-500" size={24} />
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Temporarily Disable Account
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Temporarily disable your account while keeping your data and purchase history intact.
                    You can reactivate anytime by signing in.
                  </p>
                  <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-lg transition-colors">
                    Disable Account
                  </button>
                </div>

                <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="text-red-500" size={24} />
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Permanently Delete Account
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                    Please ensure you've downloaded any important information.
                  </p>
                  <div className="bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                    <h5 className="font-medium text-red-800 dark:text-red-200 mb-2">
                      What will be deleted:
                    </h5>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      <li>• Personal information and profile data</li>
                      <li>• Order history and saved addresses</li>
                      <li>• Wishlist and preferences</li>
                      <li>• Loyalty points and rewards</li>
                    </ul>
                  </div>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                    Delete Account Permanently
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EndSituationPage;