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
import { getThemeColors, BorderRadius, Spacing, Typography, Colors, Animation } from '../../theme';
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
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const scale = useSharedValue(1);

  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
  const hasDiscount = product.salePrice && product.salePrice < product.basePrice;
  const displayPrice = (hasDiscount ? product.salePrice : product.basePrice) ?? 0;

  const formatPrice = (price: number) => {
    return `ZMW ${price.toLocaleString()}`;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: interpolate(scale.value, [1, 1.05], [0.06, 0.15]),
  }));

  const onPressIn = () => {
    scale.value = withSpring(1.05, Animation.spring);
  };

  const onPressOut = () => {
    scale.value = withSpring(1, Animation.spring);
  };

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        { backgroundColor: theme.surface, shadowColor: colorScheme === 'dark' ? Colors.gold : '#000' },
        animatedStyle,
        style,
      ]}
      onPress={() => onPress(product)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.9}
    >
      {/* Image */}
      <View style={[styles.imageContainer, { borderRadius: BorderRadius.lg }]}>
        {primaryImage && (
          <Image
            source={{ uri: primaryImage.url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Badges */}
        <View style={styles.badgesRow}>
          {product.isNew && <Badge label="New" variant="info" size="sm" />}
          {hasDiscount && <Badge label="Sale" variant="error" size="sm" />}
        </View>

        {/* Wishlist Button */}
        {onToggleWishlist && (
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isWishlisted ? 'heart' : 'heart-outline'}
              size={20}
              color={isWishlisted ? Colors.error : colorScheme === 'dark' ? '#FFFFFF' : '#333333'}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text
          style={[styles.category, { color: theme.textSecondary }]}
          numberOfLines={1}
        >
          {product.category?.name}
        </Text>

        <Text
          style={[styles.name, { color: theme.text }]}
          numberOfLines={2}
        >
          {product.name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: theme.text }]}>
            {formatPrice(displayPrice)}
          </Text>
          {hasDiscount && (
            <Text style={[styles.originalPrice, { color: theme.textSecondary }]}>
              {formatPrice(product.basePrice)}
            </Text>
          )}
        </View>

        {/* Rating */}
        {product.rating > 0 && (
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={12} color={Colors.gold} />
            <Text style={[styles.rating, { color: theme.textSecondary }]}>
              {product.rating.toFixed(1)} ({product.reviewCount})
            </Text>
          </View>
        )}
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  imageContainer: {
    height: 220,
    position: 'relative',
    backgroundColor: '#E8E4DF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgesRow: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    padding: Spacing.md,
  },
  category: {
    fontSize: Typography.sizes.caption,
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: Typography.sizes.body,
    fontFamily: 'Inter-SemiBold',
    marginTop: Spacing.xs,
    lineHeight: 22,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  price: {
    fontSize: Typography.sizes.price,
    fontFamily: 'Inter-Bold',
  },
  originalPrice: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Spacing.xs,
  },
  rating: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
});
