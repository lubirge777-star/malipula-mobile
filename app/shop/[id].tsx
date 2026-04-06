import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInDown, 
  interpolate, 
  useAnimatedScrollHandler, 
  useAnimatedStyle, 
  useSharedValue 
} from 'react-native-reanimated';
import { Colors, getThemeColors, FontFamily } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 500;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const scrollY = useSharedValue(0);

  const [selectedSize, setSelectedSize] = useState('42R');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const product = {
    id: id,
    name: 'The Executive 3-Piece',
    description: 'A masterpiece of sartorial elegance. Hand-tailored from super 150s Italian wool, this three-piece suit features a full canvas construction, peak lapels, and functional buttonholes. Designed for the discerning gentleman who demands perfection in every stitch.',
    basePrice: 12500,
    salePrice: 10500,
    rating: 4.8,
    reviewCount: 124,
    category: { name: 'Bespoke Suits' },
    images: [
      { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=1500&fit=crop' },
      { url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&h=1500&fit=crop' }
    ],
    features: [
      'Full Canvas Construction',
      'Hand-finished Buttonholes',
      'Premium Italian Silk Lining',
      'Bespoke Fit Experience'
    ]
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 100], [0, 1]);
    return {
      backgroundColor: isDark ? `rgba(15, 15, 18, ${opacity})` : `rgba(255, 255, 255, ${opacity})`,
      borderBottomWidth: opacity > 0.5 ? 1 : 0,
      borderBottomColor: `rgba(201, 169, 98, ${opacity * 0.2})`,
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollY.value, [-100, 0], [1.2, 1], 'clamp');
    const translateY = interpolate(scrollY.value, [0, IMAGE_HEIGHT], [0, -50]);
    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const formatPrice = (price: number) => `ZMW ${price.toLocaleString()}`;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      {/* Dynamic Header */}
      <Animated.View style={[styles.header, headerStyle]}>
        <TouchableOpacity 
          style={[styles.headerBtn, { backgroundColor: theme.surface, borderColor: theme.border }]} 
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[styles.headerBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => setIsWishlisted(!isWishlisted)}
          >
            <Ionicons 
              name={isWishlisted ? "heart" : "heart-outline"} 
              size={22} 
              color={isWishlisted ? Colors.error : theme.text} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.headerBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="share-outline" size={22} color={theme.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Immersive Image Gallery */}
        <Animated.View style={[styles.imageContainer, imageStyle]}>
          <Image 
            source={{ uri: product.images[0].url }} 
            style={styles.mainImage} 
          />
          <View style={[styles.imageOverlay, { backgroundColor: isDark ? 'rgba(15, 15, 18, 0.2)' : 'rgba(255, 255, 255, 0.05)' }]} />
        </Animated.View>

        <View style={[styles.content, { backgroundColor: theme.background }]}>
          {/* Header Info */}
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <View style={styles.categoryRow}>
              <Text style={styles.category}>{product.category.name}</Text>
              <View style={styles.ratingBox}>
                <Ionicons name="star" size={12} color={Colors.gold} />
                <Text style={styles.ratingText}>{product.rating} ({product.reviewCount})</Text>
              </View>
            </View>
            
            <Text style={[styles.productName, { color: theme.text }]}>{product.name}</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatPrice(product.salePrice || product.basePrice)}</Text>
              {product.salePrice && (
                <Text style={[styles.oldPrice, { color: theme.textSecondary }]}>{formatPrice(product.basePrice)}</Text>
              )}
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>The Narrative</Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>{product.description}</Text>
          </Animated.View>

          {/* Features */}
          <Animated.View entering={FadeInDown.delay(600).duration(800)} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Sartorial Details</Text>
            <View style={styles.featuresList}>
              {product.features.map((feature, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <View style={styles.featureDot} />
                  <Text style={[styles.featureText, { color: theme.textSecondary }]}>{feature}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Size Selection */}
          <Animated.View entering={FadeInDown.delay(800).duration(800)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Refine Fit</Text>
              <TouchableOpacity>
                <Text style={styles.sizeGuide}>Size Guide</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sizeList}>
              {['38R', '40R', '42R', '44R', '46R'].map((size) => (
                <TouchableOpacity
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeBox,
                    { backgroundColor: theme.surface, borderColor: theme.border },
                    selectedSize === size && styles.activeSizeBox
                  ]}
                >
                  <Text style={[
                    styles.sizeText,
                    { color: theme.textSecondary },
                    selectedSize === size && { color: Colors.gold }
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
          
          <View style={styles.footerSpacing} />
        </View>
      </Animated.ScrollView>

      {/* Floating Action Bar */}
      <GlassView intensity={isDark ? 25 : 80} style={[styles.actionBAR, { borderColor: theme.border }]}>
        <View style={styles.actionInner}>
          <TouchableOpacity style={[styles.cartBtn, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <Ionicons name="cart-outline" size={24} color={theme.text} />
          </TouchableOpacity>
          <Button
            title="Secure This Piece"
            onPress={() => {}}
            variant="luxury"
            fullWidth
            style={styles.buyNowBtn}
          />
        </View>
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 100 : 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    zIndex: 100,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#000',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    opacity: 0.9,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 24,
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  ratingText: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '700',
  },
  productName: {
    fontSize: 32,
    fontFamily: FontFamily.display,
    fontWeight: '700',
    lineHeight: 40,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 32,
  },
  price: {
    fontSize: 24,
    fontFamily: FontFamily.bold,
    color: Colors.gold,
    fontWeight: '800',
  },
  oldPrice: {
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    fontFamily: FontFamily.medium,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gold,
  },
  featureText: {
    fontSize: 14,
  },
  sizeGuide: {
    fontSize: 12,
    color: Colors.gold,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  sizeList: {
    gap: 12,
  },
  sizeBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSizeBox: {
    borderColor: Colors.gold,
    backgroundColor: 'rgba(201, 169, 98, 0.15)',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  footerSpacing: {
    height: 60,
  },
  actionBAR: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
  },
  actionInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cartBtn: {
    width: 56,
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowBtn: {
    flex: 1,
  },
});
