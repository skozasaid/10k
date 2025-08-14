import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, startOfWeek, isSameDay, isAfter, isBefore } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MessageSquare,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Video,
  Users,
  Star,
  Shield
} from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
  type: 'consultation' | 'follow-up' | 'workshop';
}

interface Booking {
  id: string;
  date: Date;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const BookingPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState('consultation');
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceDetails: ''
  });

  const services = [
    {
      id: 'consultation',
      name: 'Design Consultation',
      duration: '60 minutes',
      price: 150,
      description: 'One-on-one design consultation for your space',
      icon: User,
      features: ['Personalized advice', 'Space assessment', 'Style recommendations']
    },
    {
      id: 'follow-up',
      name: 'Follow-up Session',
      duration: '30 minutes',
      price: 75,
      description: 'Follow-up consultation for existing clients',
      icon: MessageSquare,
      features: ['Progress review', 'Additional guidance', 'Q&A session']
    },
    {
      id: 'workshop',
      name: 'Design Workshop',
      duration: '90 minutes',
      price: 200,
      description: 'Group workshop on design principles',
      icon: Users,
      features: ['Group learning', 'Hands-on activities', 'Take-home materials']
    }
  ];

  const timeSlots: TimeSlot[] = [
    { time: '09:00', available: true, type: 'consultation' },
    { time: '10:30', available: false, type: 'consultation' },
    { time: '12:00', available: true, type: 'follow-up' },
    { time: '13:30', available: true, type: 'consultation' },
    { time: '15:00', available: true, type: 'workshop' },
    { time: '16:30', available: false, type: 'consultation' }
  ];

  const upcomingBookings: Booking[] = [
    {
      id: '1',
      date: addDays(new Date(), 3),
      time: '10:00',
      service: 'Design Consultation',
      status: 'confirmed'
    },
    {
      id: '2',
      date: addDays(new Date(), 7),
      time: '14:00',
      service: 'Follow-up Session',
      status: 'pending'
    }
  ];

  const generateCalendarDays = () => {
    const start = startOfWeek(selectedDate);
    const days = [];
    for (let i = 0; i < 35; i++) {
      days.push(addDays(start, i));
    }
    return days;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    alert('Booking request submitted successfully! We\'ll confirm your appointment within 24 hours.');
    setCurrentStep(4); // Go to confirmation step
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6"
          >
            <Calendar size={16} className="mr-2" />
            Book Your Consultation
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4"
          >
            Schedule Your Appointment
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto"
          >
            Book a personalized consultation with our design experts. 
            Choose from our range of services and find the perfect time that works for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              {/* Progress Steps */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  {[
                    { step: 1, label: 'Service' },
                    { step: 2, label: 'Date & Time' },
                    { step: 3, label: 'Details' },
                    { step: 4, label: 'Confirmation' }
                  ].map((item, index) => (
                    <div key={item.step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= item.step
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-500'
                      }`}>
                        {currentStep > item.step ? (
                          <CheckCircle size={16} />
                        ) : (
                          item.step
                        )}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        currentStep >= item.step
                          ? 'text-slate-900 dark:text-white'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {item.label}
                      </span>
                      {index < 3 && (
                        <ArrowRight size={16} className="mx-4 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Service Selection */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Choose Your Service
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedService === service.id
                                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                                : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                selectedService === service.id
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                              }`}>
                                <service.icon size={24} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-slate-900 dark:text-white">
                                    {service.name}
                                  </h4>
                                  <span className="text-lg font-bold text-emerald-600">
                                    ${service.price}
                                  </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                                  {service.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-2">
                                  <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {service.duration}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {service.features.map((feature, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => setCurrentStep(2)}
                        disabled={!selectedService}
                        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors"
                      >
                        Continue to Date & Time
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time Selection */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Select Date & Time
                      </h3>

                      {/* Calendar */}
                      <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                          <div key={day} className="font-medium text-slate-500 dark:text-slate-400 py-2">
                            {day}
                          </div>
                        ))}
                        {generateCalendarDays().map((day, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedDate(day)}
                            disabled={isBefore(day, new Date())}
                            className={`h-10 rounded-lg text-sm font-medium transition-colors ${
                              isSameDay(day, selectedDate)
                                ? 'bg-emerald-500 text-white'
                                : isBefore(day, new Date())
                                ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            {format(day, 'd')}
                          </button>
                        ))}
                      </div>

                      {/* Time Slots */}
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white mb-3">
                          Available Times for {format(selectedDate, 'MMMM d, yyyy')}
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.time}
                              onClick={() => setSelectedTime(slot.time)}
                              disabled={!slot.available}
                              className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                                selectedTime === slot.time
                                  ? 'bg-emerald-500 text-white'
                                  : slot.available
                                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                  : 'bg-slate-50 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              {slot.time}
                              {!slot.available && (
                                <div className="text-xs text-red-500 mt-1">Booked</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setCurrentStep(1)}
                          className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => setCurrentStep(3)}
                          disabled={!selectedTime}
                          className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold rounded-lg transition-colors"
                        >
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        Your Details
                      </h3>

                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                              className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Message (Optional)
                          </label>
                          <textarea
                            value={bookingForm.message}
                            onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                            rows={4}
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                            placeholder="Tell us about your project or any specific requirements..."
                          />
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(2)}
                            className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                          >
                            Book Appointment
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* Step 4: Confirmation */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6"
                    >
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={32} className="text-emerald-600" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">
                          Booking Confirmed!
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          We've received your booking request and will confirm your appointment within 24 hours.
                        </p>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 text-left">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                          Booking Summary
                        </h4>
                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span>Service:</span>
                            <span>{selectedServiceData?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{format(selectedDate, 'MMMM d, yyyy')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{selectedTime}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-slate-900 dark:text-white">
                            <span>Total:</span>
                            <span>${selectedServiceData?.price}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentStep(1);
                          setSelectedTime('');
                          setBookingForm({ name: '', email: '', phone: '', message: '', serviceDetails: '' });
                        }}
                        className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        Book Another Appointment
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Summary */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Booking Summary
              </h3>
              
              {selectedServiceData && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <selectedServiceData.icon size={20} className="text-emerald-600" />
                    <span className="text-slate-700 dark:text-slate-300">
                      {selectedServiceData.name}
                    </span>
                  </div>
                  
                  {selectedDate && (
                    <div className="flex items-center gap-3">
                      <Calendar size={20} className="text-emerald-600" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {format(selectedDate, 'MMMM d, yyyy')}
                      </span>
                    </div>
                  )}
                  
                  {selectedTime && (
                    <div className="flex items-center gap-3">
                      <Clock size={20} className="text-emerald-600" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {selectedTime}
                      </span>
                    </div>
                  )}
                  
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedServiceData.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-600 dark:text-slate-400">Price:</span>
                      <span className="text-xl font-bold text-emerald-600">
                        ${selectedServiceData.price}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-300">
                    (555) 123-4567
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-300">
                    bookings@elegance.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-emerald-600" />
                  <span className="text-slate-700 dark:text-slate-300">
                    123 Design St, Suite 100
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Your Upcoming Bookings
                </h3>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-white text-sm">
                          {booking.service}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        {format(booking.date, 'MMM d, yyyy')} at {booking.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;