import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  ShoppingCart, 
  Shield, 
  Truck, 
  RefreshCw,
  Share2,
  Minus,
  Plus
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - in real app, this would come from an API
  const product: Product = {
    id: id || '1',
    name: 'Elegant Table Lamp',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.pexels.com/photos/1154106/pexels-photo-1154106.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1210406/pexels-photo-1210406.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Lighting',
    rating: 4.8,
    reviews: 124,
    description: 'This elegant table lamp combines sophisticated design with functionality. Crafted from premium materials with a marble base and brass accents, it provides warm, ambient lighting perfect for any modern interior.',
    features: [
      'Handcrafted marble base',
      'Adjustable brass stem',
      'Premium fabric lampshade',
      'Dimmable LED compatible',
      'Easy assembly required',
      'Two-year warranty included'
    ],
    specifications: {
      'Material': 'Marble, Brass, Fabric',
      'Dimensions': '12" W x 18" H',
      'Weight': '4.5 lbs',
      'Bulb Type': 'E26/E27 LED (not included)',
      'Max Wattage': '60W',
      'Cord Length': '6 feet'
    },
    inStock: true,
    stockCount: 15
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category
      });
    }
  };

  const benefits = [
    { icon: Shield, text: 'Secure Payment' },
    { icon: Truck, text: 'Free Shipping' },
    { icon: RefreshCw, text: '30-Day Returns' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Store
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-lg"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-emerald-500'
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded text-sm font-medium">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="font-medium">In Stock ({product.stockCount} available)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="font-medium">Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Quantity:</span>
                <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold rounded-xl transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 border-2 rounded-xl transition-colors ${
                    isWishlisted
                      ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
                <button className="p-3 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 rounded-xl transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Benefits */}
              <div className="flex gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <benefit.icon size={16} className="text-emerald-600" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  Specifications
                </h3>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="text-slate-600 dark:text-slate-400">{key}:</dt>
                      <dd className="font-medium text-slate-900 dark:text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;