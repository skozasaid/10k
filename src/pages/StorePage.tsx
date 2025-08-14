import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { 
  Filter, 
  Search, 
  Star, 
  ShoppingCart, 
  Heart,
  Grid3X3,
  List,
  SlidersHorizontal
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  featured: boolean;
}

const StorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const categories = ['All', 'Lighting', 'Furniture', 'Décor', 'Textiles', 'Art'];

  const products: Product[] = [
    {
      id: '1',
      name: 'Elegant Table Lamp',
      price: 299,
      originalPrice: 399,
      image: 'https://images.pexels.com/photos/1154106/pexels-photo-1154106.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Lighting',
      rating: 4.8,
      reviews: 124,
      description: 'Beautiful handcrafted table lamp with marble base',
      featured: true
    },
    {
      id: '2',
      name: 'Modern Vase Collection',
      price: 199,
      image: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Décor',
      rating: 4.9,
      reviews: 89,
      description: 'Set of three ceramic vases in different sizes',
      featured: true
    },
    {
      id: '3',
      name: 'Luxury Throw Pillow',
      price: 89,
      image: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Textiles',
      rating: 4.7,
      reviews: 203,
      description: 'Soft velvet throw pillow with gold accents',
      featured: false
    },
    {
      id: '4',
      name: 'Minimalist Floor Lamp',
      price: 449,
      image: 'https://images.pexels.com/photos/1210406/pexels-photo-1210406.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Lighting',
      rating: 4.6,
      reviews: 156,
      description: 'Sleek floor lamp with adjustable brightness',
      featured: true
    },
    {
      id: '5',
      name: 'Wooden Coffee Table',
      price: 799,
      originalPrice: 999,
      image: 'https://images.pexels.com/photos/1571465/pexels-photo-1571465.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Furniture',
      rating: 4.9,
      reviews: 67,
      description: 'Handcrafted oak coffee table with live edge',
      featured: true
    },
    {
      id: '6',
      name: 'Abstract Wall Art',
      price: 349,
      image: 'https://images.pexels.com/photos/1045297/pexels-photo-1045297.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Art',
      rating: 4.8,
      reviews: 91,
      description: 'Contemporary abstract painting on canvas',
      featured: false
    },
    {
      id: '7',
      name: 'Designer Armchair',
      price: 1299,
      image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Furniture',
      rating: 4.9,
      reviews: 43,
      description: 'Ergonomic armchair with premium leather upholstery',
      featured: true
    },
    {
      id: '8',
      name: 'Ceramic Planter Set',
      price: 159,
      image: 'https://images.pexels.com/photos/1358912/pexels-photo-1358912.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Décor',
      rating: 4.7,
      reviews: 78,
      description: 'Set of three geometric planters with drainage',
      featured: false
    }
  ];

  const filteredProducts = products
    .filter(product => 
      (selectedCategory === 'All' || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return b.featured ? 1 : -1;
      }
    });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Our Store
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover our curated collection of premium home essentials
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                {viewMode === 'grid' ? <List size={20} /> : <Grid3X3 size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`group bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105 ${
                viewMode === 'list' ? 'flex items-center' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.featured && (
                  <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Sale
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors opacity-0 group-hover:opacity-100">
                  <Heart size={16} className="text-slate-600 hover:text-red-500 transition-colors" />
                </button>
              </div>

              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                  {product.category}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-emerald-600">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      <ShoppingCart size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
              No products found
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorePage;