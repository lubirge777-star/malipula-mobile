import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeInDown, 
  FadeInUp,
  Layout,
  SlideInDown,
  SlideOutDown
} from 'react-native-reanimated';
import { Colors, getThemeColors, Spacing, FontFamily, Shadows } from '../../../src/theme';
import { ProductCard, Button, GlassView } from '../../../src/components/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
    category: { id: 'suits', name: 'Bespoke Suits' },
    images: [{ url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop', isPrimary: true }]
  },
  { 
    id: '2', 
    name: 'Navy Slim Fit Suit', 
    basePrice: 8900, 
    rating: 4.6,
    reviewCount: 89,
    category: { id: 'suits', name: 'Suits' },
    images: [{ url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1200&fit=crop', isPrimary: true }]
  },
  { 
    id: '3', 
    name: 'Ivory Formal Kaftan', 
    basePrice: 4500, 
    rating: 4.9,
    reviewCount: 56,
    isNew: true,
    category: { id: 'kaftans', name: 'Traditional' },
    images: [{ url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1200&fit=crop', isPrimary: true }]
  },
  { 
    id: '4', 
    name: 'Silk Pocket Square', 
    basePrice: 450, 
    rating: 4.3,
    reviewCount: 34,
    category: { id: 'accessories', name: 'Accessories' },
    images: [{ url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800&h=1200&fit=crop', isPrimary: true }]
  },
];

export default function ShopScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortIndex, setSortIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || p.category.id === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Premium Search & Filter Header */}
      <View style={[styles.header, { backgroundColor: isDark ? 'rgba(15,15,18,0.8)' : 'rgba(255,255,255,0.8)' }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Collections</Text>
        <View style={styles.searchRow}>
          <View style={[styles.searchContainer, { backgroundColor: theme.surface, borderColor: isDark ? 'rgba(201,169,98,0.1)' : 'rgba(201,169,98,0.3)' }]}>
            <Ionicons name="search-outline" size={18} color={Colors.gold} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search masterpieces..."
              placeholderTextColor={isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color="rgba(255,255,255,0.3)" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={[styles.filterBtn, { backgroundColor: theme.surface, borderColor: 'rgba(201,169,98,0.3)' }]}
            onPress={() => setShowFilter(true)}
          >
            <Ionicons name="options-outline" size={20} color={Colors.gold} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categoryFilters.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryTab,
                { backgroundColor: theme.surface, borderColor: activeCategory === cat.id ? Colors.gold : theme.border },
                activeCategory === cat.id && styles.activeCategoryTab,
              ]}
              onPress={() => setActiveCategory(cat.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: theme.textSecondary },
                  activeCategory === cat.id && { color: Colors.gold }
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort & Results Summary */}
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryText, { color: theme.textSecondary }]}>
          {filteredProducts.length} DESIGNS AVAILABLE
        </Text>
        <TouchableOpacity style={styles.sortBtn}>
          <Ionicons name="swap-vertical" size={14} color={Colors.gold} />
          <Text style={styles.sortText}>{sortOptions[sortIndex]}</Text>
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
          />
        }
        contentContainerStyle={styles.gridPadding}
      >
        <View style={styles.grid}>
          {filteredProducts.map((product, index) => (
            <Animated.View 
              key={product.id}
              entering={FadeInDown.delay(index * 100).duration(600)}
              style={styles.gridItem}
            >
              <ProductCard
                product={product as any}
                onPress={() => router.push(`/shop/${product.id}` as any)}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* Filter Overlay / Bottom Sheet */}
      {showFilter && (
        <Animated.View 
          entering={FadeInDown}
          style={StyleSheet.absoluteFill}
        >
          <TouchableOpacity 
            style={styles.overlay} 
            activeOpacity={1} 
            onPress={() => setShowFilter(false)} 
          />
          <Animated.View 
            entering={SlideInDown.springify().damping(15)}
            exiting={SlideOutDown}
            style={styles.bottomSheetContainer}
          >
            <GlassView intensity={isDark ? 20 : 60} style={[styles.bottomSheet, { backgroundColor: isDark ? 'rgba(15,15,18,0.95)' : 'rgba(255,255,255,0.97)', borderColor: isDark ? 'rgba(201,169,98,0.2)' : 'rgba(201,169,98,0.3)' }]}>
              <View style={[styles.handle, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }]} />
              <Text style={[styles.filterTitle, { color: theme.text }]}>Refine Collection</Text>
              
              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Investment Range</Text>
                <View style={styles.filterOptions}>
                  {['All', '< 2K', '2K-5K', '5K-10K', '> 10K'].map((range) => (
                    <TouchableOpacity 
                      key={range} 
                      style={[styles.filterOption, { backgroundColor: theme.surface, borderColor: theme.border }]}
                    >
                      <Text style={[styles.filterOptionText, { color: theme.textSecondary }]}>{range}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterLabel}>Sort Sequence</Text>
                <View style={styles.filterOptions}>
                  {sortOptions.map((opt, idx) => (
                    <TouchableOpacity 
                      key={opt}
                      onPress={() => setSortIndex(idx)}
                      style={[
                        styles.filterOption,
                        { backgroundColor: theme.surface, borderColor: theme.border },
                        sortIndex === idx && styles.activeFilterOption
                      ]}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        { color: theme.textSecondary },
                        sortIndex === idx && { color: Colors.gold }
                      ]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Button
                title="Apply Refinement"
                onPress={() => setShowFilter(false)}
                variant="luxury"
                fullWidth
                style={styles.applyBtn}
              />
            </GlassView>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: FontFamily.display,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontFamily: FontFamily.medium,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    ...Shadows.md,
  },
  categoriesContainer: {
    paddingVertical: 12,
  },
  categoriesScroll: {
    paddingHorizontal: 24,
    gap: 10,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
  },
  activeCategoryTab: {
    backgroundColor: 'rgba(201, 169, 98, 0.15)',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  summaryText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sortText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '700',
  },
  gridPadding: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (SCREEN_WIDTH - 48) / 2,
    marginBottom: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheet: {
    padding: 32,
    paddingBottom: 48,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderWidth: 1,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  filterTitle: {
    fontFamily: FontFamily.display,
    fontSize: 26,
    marginBottom: 32,
    fontWeight: '700',
  },
  filterSection: {
    marginBottom: 32,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 16,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  activeFilterOption: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
  },
  filterOptionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  applyBtn: {
    marginTop: 16,
  },
});

