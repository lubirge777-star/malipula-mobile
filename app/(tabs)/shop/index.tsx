import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, getThemeColors, Spacing, Typography, BorderRadius } from '../../../src/theme';
import { ProductCard, Button, GlassView } from '../../../src/components/ui';

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'suits', label: 'Suits' },
  { id: 'shirts', label: 'Shirts' },
  { id: 'kaftans', label: 'Kaftans' },
  { id: 'accessories', label: 'Accessories' },
];

const sortOptions = ['Featured', 'Price: Low', 'Price: High', 'Newest'];

const products = [
  { 
    id: '1', 
    name: 'The Executive 3-Piece', 
    basePrice: 12500, 
    salePrice: 10500,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    category: { name: 'Bespoke Suits' },
    images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', isPrimary: true }]
  },
  { 
    id: '2', 
    name: 'Navy Slim Fit Suit', 
    basePrice: 8900, 
    rating: 4.6,
    reviewCount: 89,
    category: { name: 'Suits' },
    images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=600&fit=crop', isPrimary: true }]
  },
  { 
    id: '3', 
    name: 'Ivory Formal Kaftan', 
    basePrice: 4500, 
    rating: 4.9,
    reviewCount: 56,
    isNew: true,
    category: { name: 'Traditional' },
    images: [{ url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=600&fit=crop', isPrimary: true }]
  },
  { 
    id: '4', 
    name: 'Silk Pocket Square', 
    basePrice: 450, 
    rating: 4.3,
    reviewCount: 34,
    category: { name: 'Accessories' },
    images: [{ url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=400&h=600&fit=crop', isPrimary: true }]
  },
];

export default function ShopScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortIndex, setSortIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category.name.toLowerCase().includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Search Header */}
      <View style={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 8 }}>
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-app-surface rounded-[20px] px-4 py-3 shadow-sm border border-gold/5">
            <Ionicons name="search" size={18} color={theme.textSecondary} />
            <TextInput
              className="flex-1 ml-2 text-sm text-app-text font-sans"
              placeholder="Search collections..."
              placeholderTextColor={theme.textSecondary + '80'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            className="w-12 h-12 bg-navy rounded-[20px] items-center justify-center border border-gold/20 shadow-lg"
            onPress={() => setShowFilter(!showFilter)}
          >
            <Ionicons name="options-outline" size={20} color={Colors.gold} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={{ paddingHorizontal: 24, paddingVertical: 12 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {categoryFilters.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              className={`px-6 py-2.5 rounded-full border ${
                activeCategory === cat.id 
                  ? 'bg-gold border-gold' 
                  : 'bg-app-surface border-app-border'
              }`}
              onPress={() => setActiveCategory(cat.id)}
              activeOpacity={0.7}
            >
              <Text
                className={`text-xs font-heading ${
                  activeCategory === cat.id ? 'text-charcoal' : 'text-app-text'
                }`}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort & Results Summary */}
      <View className="flex-row items-center justify-between px-6 py-2">
        <Text className="text-app-text-secondary text-[12px] font-sans uppercase tracking-wider">
          {filteredProducts.length} Items Found
        </Text>
        <TouchableOpacity className="flex-row items-center gap-1">
          <Ionicons name="swap-vertical" size={14} color={Colors.gold} />
          <Text className="text-gold text-xs font-semibold">{sortOptions[sortIndex]}</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh} 
            tintColor={Colors.gold} 
            colors={[Colors.gold]}
          />
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap justify-between gap-y-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product as any}
              onPress={() => router.push(`/shop/${product.id}`)}
              style={{ width: '47%' }}
            />
          ))}
        </View>
      </ScrollView>

      {/* Filter Bottom Sheet */}
      {showFilter && (
        <View style={StyleSheet.absoluteFill}>
          <TouchableOpacity 
            style={styles.overlay} 
            activeOpacity={1} 
            onPress={() => setShowFilter(false)} 
          />
          <View style={[styles.bottomSheet, { backgroundColor: theme.background }]}>
            <View className="w-12 h-1.5 bg-gold/20 rounded-full self-center mb-6" />
            <Text className="font-display text-2xl text-app-text mb-6">Filter Collections</Text>
            
            <View className="mb-6">
              <Text className="text-xs font-heading text-gold uppercase tracking-widest mb-3">Price Range</Text>
              <View className="flex-row flex-wrap gap-2">
                {['All', '< 2K', '2K-5K', '5K-10K', '> 10K'].map((range) => (
                  <TouchableOpacity 
                    key={range} 
                    className="px-4 py-2 bg-app-surface rounded-xl border border-app-border"
                  >
                    <Text className="text-xs text-app-text font-sans">{range}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mb-8">
              <Text className="text-xs font-heading text-gold uppercase tracking-widest mb-3">Sort By</Text>
              <View className="flex-row flex-wrap gap-2">
                {sortOptions.map((opt, idx) => (
                  <TouchableOpacity 
                    key={opt}
                    onPress={() => setSortIndex(idx)}
                    className={`px-4 py-2 rounded-xl border ${
                      sortIndex === idx ? 'bg-gold/10 border-gold' : 'bg-app-surface border-app-border'
                    }`}
                  >
                    <Text className={`text-xs ${sortIndex === idx ? 'text-gold font-semibold' : 'text-app-text'}`}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title="Apply Selection"
              onPress={() => setShowFilter(false)}
              variant="luxury"
              fullWidth
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
});
