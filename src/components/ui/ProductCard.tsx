// ============================================
// Malipula Suits - ProductCard Component
// ============================================

import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { getThemeColors, BorderRadius, Spacing, Typography, Colors, Animation, FontFamily, Shadows } from '../../theme';
import { Badge } from './Badge';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  style?: any;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function ProductCard({
  product,
  onPress,
  onToggleWishlist,
  isWishlisted = false,
  style,
}: ProductCardProps) {
  const theme = getThemeColors('dark');
  const scale = useSharedValue(1);

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const displayPrice = (hasDiscount ? product.salePrice : product.basePrice) ?? 0;

  const formatPrice = (price: number) => {
    return `ZMW ${price.toLocaleString()}`;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: interpolate(scale.value, [1, 1.05], [0.1, 0.2]),
  }));

  const onPressIn = () => {
    scale.value = withSpring(1.02, Animation.spring);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, Animation.spring);
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        { backgroundColor: '#1A1A1F', shadowColor: Colors.gold },
        animatedStyle,
        style,
      ]}
      onPress={() => onPress(product)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.9}
    >
      {/* Visual Container */}
      <View style={styles.imageContainer}>
        {primaryImage && (
          <Image
            source={{ uri: primaryImage.url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Status Overlay */}
        <View style={styles.badgesCol}>
          {product.isNew && <Badge label="ESTATE" variant="info" size="sm" />}
          {hasDiscount && <Badge label="OFFER" variant="error" size="sm" />}
        </View>

        {/* Wishlist Interaction */}
        {onToggleWishlist && (
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={18}
              color={isWishlisted ? Colors.error : Colors.white}
            />
          </TouchableOpacity>
        )}
        
        <View style={styles.priceTag}>
          <Text style={styles.priceTagText}>{formatPrice(displayPrice)}</Text>
        </View>
      </View>

      {/* Narrative Section */}
      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.category?.name}
        </Text>

        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={10} color={Colors.gold} />
            <Text style={styles.rating}>
              {product.rating.toFixed(1)}
            </Text>
          </View>
          {hasDiscount && (
             <Text style={styles.originalPrice}>
               {formatPrice(product.basePrice)}
             </Text>
          )}
        </View>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.15)',
    ...Shadows.md,
  },
  imageContainer: {
    height: 190,
    position: 'relative',
    backgroundColor: '#151518',
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.85,
  },
  badgesCol: {
    position: 'absolute',
    top: 12,
    left: 12,
    gap: 6,
  },
  wishlistButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: 'rgba(15, 15, 18, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  priceTag: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(201, 169, 98, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopLeftRadius: 16,
  },
  priceTagText: {
    color: '#0F0F12',
    fontFamily: FontFamily.bold,
    fontSize: 12,
    fontWeight: '900',
  },
  info: {
    padding: 16,
  },
  category: {
    fontSize: 10,
    fontFamily: FontFamily.medium,
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontFamily: FontFamily.display,
    color: Colors.white,
    fontWeight: '700',
    lineHeight: 20,
    height: 40,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(201, 169, 98, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rating: {
    fontSize: 10,
    color: Colors.gold,
    fontWeight: '800',
  },
  originalPrice: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.3)',
    textDecorationLine: 'line-through',
    fontWeight: '600',
  },
});

