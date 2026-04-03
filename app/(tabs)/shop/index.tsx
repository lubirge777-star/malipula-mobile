import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'suits', label: 'Suits' },
  { id: 'shirts', label: 'Shirts' },
  { id: 'trousers', label: 'Trousers' },
  { id: 'blazers', label: 'Blazers' },
  { id: 'kaftans', label: 'Kaftans' },
  { id: 'accessories', label: 'Accessories' },
];

const sortOptions = ['Featured', 'Price: Low', 'Price: High', 'Newest', 'Rating'];

const products = [
  { id: '1', name: 'The Executive 3-Piece', price: 1250000, originalPrice: 1500000, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', category: 'suits', rating: 4.8, reviews: 124, isBestseller: true },
  { id: '2', name: 'Navy Slim Fit Suit', price: 890000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', category: 'suits', rating: 4.6, reviews: 89 },
  { id: '3', name: 'Ivory Formal Shirt', price: 120000, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=400&fit=crop', category: 'shirts', rating: 4.5, reviews: 56 },
  { id: '4', name: 'The Diplomat Blazer', price: 650000, originalPrice: 780000, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&h=400&fit=crop', category: 'blazers', rating: 4.9, reviews: 201, isBestseller: true },
  { id: '5', name: 'Charcoal Wool Trousers', price: 280000, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop', category: 'trousers', rating: 4.4, reviews: 67 },
  { id: '6', name: 'Royal Kaftan', price: 450000, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=300&h=400&fit=crop', category: 'kaftans', rating: 4.7, reviews: 93 },
  { id: '7', name: 'Silk Pocket Square', price: 45000, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=300&h=400&fit=crop', category: 'accessories', rating: 4.3, reviews: 34 },
  { id: '8', name: 'Italian Linen Shirt', price: 185000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop', category: 'shirts', rating: 4.6, reviews: 72 },
];

export default function ShopScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortIndex, setSortIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  return (
    <View className="flex-1 bg-ivory">
      {/* Search Bar */}
      <View className="px-4 pt-3 pb-2 bg-ivory">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-white rounded-xl px-3.5 py-2.5 shadow-sm">
            <Ionicons name="search" size={18} color="#6B6361" />
            <TextInput
              className="flex-1 ml-2 text-sm text-navy font-body"
              placeholder="Search suits, shirts..."
              placeholderTextColor="#6B636180"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="#6B6361" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className="w-10 h-10 bg-navy rounded-xl items-center justify-center"
            onPress={() => setShowFilter(!showFilter)}
          >
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Filter Chips */}
      <View className="px-4 py-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          {categoryFilters.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className={`px-4 py-1.5 rounded-full ${
                activeCategory === cat.id ? 'bg-gold' : 'bg-white'
              }`}
              onPress={() => setActiveCategory(cat.id)}
              activeOpacity={0.7}
            >
              <Text
                className={`text-xs font-semibold ${
                  activeCategory === cat.id ? 'text-navy' : 'text-charcoal'
                }`}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort Bar */}
      <View className="flex-row items-center justify-between px-4 py-2">
        <Text className="text-charcoal text-sm">{filteredProducts.length} products</Text>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Ionicons name="swap-vertical" size={16} color={GOLD} />
          <Text className="text-gold text-sm font-medium">{sortOptions[sortIndex]}</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={GOLD} />}
        className="px-4"
      >
        <View className="flex-row flex-wrap gap-3 pb-24">
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              className="w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm"
              onPress={() => router.push(`/shop/${product.id}`)}
              activeOpacity={0.85}
            >
              <View className="relative h-52 bg-gray-50">
                <Image source={{ uri: product.image }} className="w-full h-full" resizeMode="cover" />
                {product.isBestseller && (
                  <View className="absolute top-2 left-2 bg-navy px-2.5 py-0.5 rounded-full">
                    <Text className="text-gold text-[10px] font-bold tracking-wide uppercase">Bestseller</Text>
                  </View>
                )}
                {product.originalPrice && (
                  <View className="absolute top-2 right-2 bg-red-500 px-2 py-0.5 rounded-full">
                    <Text className="text-white text-[10px] font-bold">SALE</Text>
                  </View>
                )}
                <TouchableOpacity className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 rounded-full items-center justify-center shadow-sm">
                  <Ionicons name="heart-outline" size={16} color={NAVY} />
                </TouchableOpacity>
              </View>
              <View className="p-3">
                <Text className="font-medium text-navy text-sm mb-1" numberOfLines={1}>{product.name}</Text>
                <View className="flex-row items-center gap-1 mb-1.5">
                  <Ionicons name="star" size={12} color={GOLD} />
                  <Text className="text-xs text-charcoal">{product.rating} ({product.reviews})</Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-gold font-semibold text-sm">{formatPrice(product.price)}</Text>
                  {product.originalPrice && (
                    <Text className="text-charcoal/50 text-xs line-through">{formatPrice(product.originalPrice)}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet (simplified) */}
      {showFilter && (
        <View className="absolute inset-0 bg-black/40" style={StyleSheet.absoluteFill}>
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 pb-8">
            <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-5" />
            <Text className="font-heading text-lg text-navy mb-4">Filters</Text>
            <View className="mb-4">
              <Text className="text-sm font-semibold text-navy mb-2">Price Range</Text>
              <View className="flex-row gap-2">
                {['All', '< 200K', '200K-500K', '500K-1M', '> 1M'].map((range) => (
                  <TouchableOpacity key={range} className="px-3 py-1.5 bg-ivory rounded-full">
                    <Text className="text-xs text-charcoal">{range}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="mb-4">
              <Text className="text-sm font-semibold text-navy mb-2">Size</Text>
              <View className="flex-row gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'].map((size) => (
                  <TouchableOpacity key={size} className="w-10 h-10 bg-ivory rounded-lg items-center justify-center">
                    <Text className="text-xs text-charcoal font-medium">{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity
              className="bg-gold rounded-xl py-3 items-center mt-2"
              onPress={() => setShowFilter(false)}
            >
              <Text className="text-navy font-semibold">Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
