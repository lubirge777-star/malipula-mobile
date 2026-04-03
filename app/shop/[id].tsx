import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const productImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&h=800&fit=crop',
];

const colors = [
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'Burgundy', hex: '#7B2D26' },
  { name: 'Ivory', hex: '#FAFAF5' },
];

const sizes = ['38', '39', '40', '41', '42', '43', '44', '45', 'Custom'];

const reviews = [
  { id: '1', name: 'James M.', rating: 5, date: 'Jan 10, 2025', comment: 'Exceptional quality. The fit is perfect and the fabric feels premium. Worth every shilling!' },
  { id: '2', name: 'Ahmed H.', rating: 4, date: 'Jan 5, 2025', comment: 'Great suit, excellent craftsmanship. Delivery was on time.' },
  { id: '3', name: 'David K.', rating: 5, date: 'Dec 28, 2024', comment: 'My third purchase from Malipula. Consistently outstanding quality.' },
];

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [isFavorite, setIsFavorite] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out The Executive 3-Piece from Malipula Suits!',
      });
    } catch {}
  };

  return (
    <View className="flex-1 bg-ivory">
      {/* Image Gallery */}
      <View className="relative">
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const offset = e.nativeEvent.contentOffset.x;
            setActiveImage(Math.round(offset / SCREEN_WIDTH));
          }}
        >
          {productImages.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              className="w-full h-96 bg-gray-100"
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-1.5">
          {productImages.map((_, index) => (
            <View
              key={index}
              className={`h-1.5 rounded-full ${index === activeImage ? 'w-6 bg-gold' : 'w-1.5 bg-white/60'}`}
            />
          ))}
        </View>

        {/* Top Buttons */}
        <View className="absolute top-12 left-0 right-0 px-4 flex-row justify-between">
          <TouchableOpacity
            className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color={NAVY} />
          </TouchableOpacity>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm"
              onPress={handleShare}
            >
              <Ionicons name="share-outline" size={20} color={NAVY} />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-10 h-10 bg-white/90 rounded-full items-center justify-center shadow-sm"
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={20} color={isFavorite ? '#DC2626' : NAVY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-52">
        {/* Product Info */}
        <View className="px-4 pt-5">
          <View className="flex-row items-start justify-between mb-1">
            <View className="flex-1">
              <View className="flex-row items-center gap-2 mb-1">
                <View className="bg-gold/15 px-2.5 py-0.5 rounded-full">
                  <Text className="text-gold text-[10px] font-bold tracking-wide uppercase">3-Piece Suit</Text>
                </View>
                <View className="flex-row items-center gap-0.5">
                  <Ionicons name="star" size={14} color={GOLD} />
                  <Text className="text-sm text-navy font-medium">4.8</Text>
                  <Text className="text-xs text-charcoal/50">(124)</Text>
                </View>
              </View>
              <Text className="font-heading text-2xl text-navy">The Executive</Text>
            </View>
          </View>

          <View className="flex-row items-baseline gap-3 mb-4">
            <Text className="text-gold font-bold text-2xl">{formatPrice(1250000)}</Text>
            <Text className="text-charcoal/40 text-base line-through">{formatPrice(1500000)}</Text>
            <View className="bg-red-50 px-2 py-0.5 rounded-full">
              <Text className="text-red-500 text-xs font-bold">-17%</Text>
            </View>
          </View>

          {/* Color Selector */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-navy mb-2.5">
              Color: <Text className="text-charcoal font-normal">{colors[selectedColor].name}</Text>
            </Text>
            <View className="flex-row gap-2.5">
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={color.name}
                  className={`w-9 h-9 rounded-full items-center justify-center ${
                    selectedColor === index ? 'ring-2 ring-gold ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onPress={() => setSelectedColor(index)}
                  activeOpacity={0.7}
                >
                  {selectedColor === index && (
                    <Ionicons name="checkmark" size={16} color={color.name === 'Ivory' ? NAVY : '#FFFFFF'} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Size Selector */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-2.5">
              <Text className="text-sm font-semibold text-navy">
                Size: <Text className="text-charcoal font-normal">{sizes[selectedSize]}</Text>
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Ionicons name="resize-outline" size={14} color={GOLD} />
                <Text className="text-gold text-xs font-medium">Size Guide</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
              {sizes.map((size, index) => (
                <TouchableOpacity
                  key={size}
                  className={`w-14 h-10 rounded-xl items-center justify-center ${
                    selectedSize === index
                      ? 'bg-gold border border-gold'
                      : 'bg-white border border-gray-200'
                  }`}
                  onPress={() => setSelectedSize(index)}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedSize === index ? 'text-navy' : 'text-charcoal'
                    }`}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Quantity */}
          <View className="mb-5">
            <Text className="text-sm font-semibold text-navy mb-2.5">Quantity</Text>
            <View className="flex-row items-center gap-4">
              <TouchableOpacity
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 items-center justify-center"
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={18} color={NAVY} />
              </TouchableOpacity>
              <Text className="text-lg font-bold text-navy w-8 text-center">{quantity}</Text>
              <TouchableOpacity
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 items-center justify-center"
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={18} color={NAVY} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Description / Reviews Tabs */}
        <View className="px-4">
          <View className="flex-row bg-white rounded-xl p-1 mb-4 shadow-sm">
            <TouchableOpacity
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'description' ? 'bg-gold' : ''}`}
              onPress={() => setActiveTab('description')}
            >
              <Text className={`text-sm font-semibold ${activeTab === 'description' ? 'text-navy' : 'text-charcoal'}`}>
                Description
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-2 rounded-lg items-center ${activeTab === 'reviews' ? 'bg-gold' : ''}`}
              onPress={() => setActiveTab('reviews')}
            >
              <Text className={`text-sm font-semibold ${activeTab === 'reviews' ? 'text-navy' : 'text-charcoal'}`}>
                Reviews (124)
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'description' ? (
            <View className="mb-6">
              <Text className="text-navy/80 text-sm leading-relaxed mb-3">
                The Executive is our flagship 3-piece suit, crafted from premium Italian wool blend fabric.
                Featuring a half-canvas construction for superior drape and longevity, this suit embodies
                timeless elegance with modern sensibility.
              </Text>
              <Text className="text-navy/80 text-sm leading-relaxed mb-3">
                Each suit is meticulously tailored by our master craftsmen with over 50 years of combined
                experience. The jacket features a notch lapel, dual vents, and working button cuffs.
              </Text>
              <View className="space-y-2 mt-4">
                <Text className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">Details</Text>
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="checkmark-circle" size={14} color="#059669" />
                  <Text className="text-sm text-navy/70">100% Italian Wool Blend</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="checkmark-circle" size={14} color="#059669" />
                  <Text className="text-sm text-navy/70">Half-Canvas Construction</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="checkmark-circle" size={14} color="#059669" />
                  <Text className="text-sm text-navy/70">Free Alterations Included</Text>
                </View>
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="checkmark-circle" size={14} color="#059669" />
                  <Text className="text-sm text-navy/70">Dry Clean Only</Text>
                </View>
              </View>
            </View>
          ) : (
            <View className="gap-3 mb-6">
              {reviews.map((review) => (
                <View key={review.id} className="bg-white rounded-xl p-3.5">
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-2.5">
                      <View className="w-8 h-8 bg-navy/10 rounded-full items-center justify-center">
                        <Text className="text-navy text-xs font-bold">{review.name[0]}</Text>
                      </View>
                      <View>
                        <Text className="text-sm font-semibold text-navy">{review.name}</Text>
                        <Text className="text-xs text-charcoal/50">{review.date}</Text>
                      </View>
                    </View>
                    <View className="flex-row gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={12}
                          color={i < review.rating ? GOLD : '#E5E7EB'}
                        />
                      ))}
                    </View>
                  </View>
                  <Text className="text-navy/70 text-sm leading-relaxed">{review.comment}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-8 shadow-lg" style={styles.stickyBar}>
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 py-3.5 rounded-xl border-2 border-gold items-center"
            onPress={() => router.push('/booking/wizard')}
            activeOpacity={0.85}
          >
            <Text className="text-gold font-semibold text-sm">Book Fitting</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-[2] py-3.5 rounded-xl items-center"
            style={{ backgroundColor: GOLD }}
            activeOpacity={0.85}
          >
            <Text className="text-navy font-bold text-sm">Add to Cart — {formatPrice(1250000 * quantity)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stickyBar: {
    elevation: 10,
    shadowColor: 'rgba(27, 42, 74, 0.1)',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    shadowOpacity: 1,
  },
});
