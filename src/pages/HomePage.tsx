import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Shield, 
  Truck, 
  RefreshCw,
  Play,
  Users,
  Award,
  Zap
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure Shopping',
      description: 'End-to-end encryption and secure payment processing'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Express shipping and real-time order tracking'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free return policy'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Curated selection of high-quality products'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Interior Designer',
      content: 'The quality and elegance of products here is unmatched. Every purchase has exceeded my expectations.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Michael Chen',
      role: 'Architect',
      content: 'Exceptional customer service and beautiful products. The booking system makes consultations effortless.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Homeowner',
      content: 'From browsing to delivery, every step of the experience is thoughtfully designed and executed.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-8"
            >
              <Zap size={16} className="mr-2" />
              New Collections Available
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 leading-tight"
            >
              Elegant Living,
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {' '}Redefined
              </span>
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Discover our curated collection of premium products designed to elevate your lifestyle. 
              From elegant home décor to innovative solutions, we bring sophistication to every aspect of your life.
            </motion.p>
            
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/store"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Shop Collection
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/booking"
                className="group inline-flex items-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 hover:border-emerald-500 dark:hover:border-emerald-400 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold rounded-xl transition-all duration-300"
              >
                <Play size={16} className="mr-2" />
                Book Consultation
              </Link>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center">
                <Users size={16} className="mr-2 text-emerald-600" />
                <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-2 text-yellow-500" />
                <span>4.9/5 Average Rating</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Why Choose Elegance?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              We're committed to providing exceptional service and products that exceed your expectations.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-blue-50 dark:hover:from-slate-700 dark:hover:to-emerald-900 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Featured Collections
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8"
            >
              Discover our most popular and trending products, carefully selected for their exceptional quality and design.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                id: '1',
                name: 'Elegant Table Lamp',
                price: 299,
                image: 'https://images.pexels.com/photos/1154106/pexels-photo-1154106.jpeg?auto=compress&cs=tinysrgb&w=400',
                category: 'Lighting'
              },
              {
                id: '2',
                name: 'Modern Vase Collection',
                price: 199,
                image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400',
                category: 'Décor'
              },
              {
                id: '3',
                name: 'Luxury Throw Pillow',
                price: 89,
                image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=400',
                category: 'Textiles'
              }
            ].map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      ${product.price}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="text-center"
          >
            <Link
              to="/store"
              className="inline-flex items-center px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl"
            >
              View All Products
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              Don't just take our word for it. Here's what our valued customers have to say about their experience.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of satisfied customers who have elevated their lifestyle with our premium collections.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/store"
                className="inline-flex items-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start Shopping
                <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-emerald-600 transition-all"
              >
                Schedule Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;