import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GOLD = '#C9A962';
const NAVY = '#1B2A4A';
const IVORY = '#FAFAF5';

// Mock data
const stories = [
  { id: '1', name: 'New In', color: '#C9A962' },
  { id: '2', name: 'Suits', color: '#1B2A4A' },
  { id: '3', name: 'Shirts', color: '#2A3F6A' },
  { id: '4', name: 'Kaftans', color: '#4D3D1A' },
  { id: '5', name: 'Sale', color: '#A88A3E' },
  { id: '6', name: 'Trends', color: '#6B6361' },
  { id: '7', name: 'Custom', color: '#8A6F30' },
  { id: '8', name: 'VIP', color: '#E8D5A3' },
];

const categories = [
  { id: '1', name: 'Suits', icon: 'business' as const, color: NAVY },
  { id: '2', name: 'Shirts', icon: 'shirt' as const, color: '#2A3F6A' },
  { id: '3', name: 'Trousers', icon: 'resize' as const, color: '#3A5080' },
  { id: '4', name: 'Blazers', icon: 'briefcase' as const, color: '#4D3D1A' },
  { id: '5', name: 'Kaftans', icon: 'culture' as const, color: '#8A6F30' },
  { id: '6', name: 'Accessories', icon: 'watch' as const, color: '#A88A3E' },
];

const newArrivals = [
  { id: '1', name: 'The Executive', price: 850000, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', isNew: true },
  { id: '2', name: 'Navy Slim Fit', price: 720000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop', isNew: true },
  { id: '3', name: 'Ivory Kaftan', price: 450000, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=300&h=400&fit=crop', isNew: false },
  { id: '4', name: 'The Diplomat', price: 980000, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&h=400&fit=crop', isNew: true },
];

const whyChoose = [
  { id: '1', icon: 'diamond' as const, title: 'Premium Fabrics', desc: 'Italian & English wool blends' },
  { id: '2', icon: 'cut' as const, title: 'Master Tailoring', desc: '50+ years of craftsmanship' },
  { id: '3', icon: 'calendar' as const, title: 'Easy Bookings', desc: 'Schedule fittings online' },
  { id: '4', icon: 'truck' as const, title: 'Nationwide Delivery', desc: 'Across Tanzania' },
];

export default function HomeScreen() {
  const router = useRouter();
  const [activeStory, setActiveStory] = useState(0);

  const formatPrice = (price: number) => {
    return `TZS ${price.toLocaleString()}`;
  };

  return (
    <View className="flex-1 bg-ivory">
      <StatusBar barStyle="dark-content" backgroundColor={IVORY} />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-3 pb-2">
          <View>
            <Text className="font-heading text-xl text-navy tracking-wide">MALIPULA</Text>
            <Text className="font-body text-xs text-charcoal/60 tracking-widest uppercase">Suits & Style</Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="relative p-2">
              <Ionicons name="search-outline" size={22} color={NAVY} />
            </TouchableOpacity>
            <TouchableOpacity className="relative p-2">
              <Ionicons name="notifications-outline" size={22} color={NAVY} />
              <View className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stories Carousel */}
        <View className="pl-4 py-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-4">
            {stories.map((story, index) => (
              <TouchableOpacity key={story.id} className="items-center gap-1.5">
                <View
                  className={`w-16 h-16 rounded-full items-center justify-center ${
                    index === activeStory ? 'ring-2 ring-gold ring-offset-2 ring-offset-ivory' : ''
                  }`}
                  style={{ backgroundColor: story.color + '15' }}
                >
                  <Ionicons name="image-outline" size={20} color={story.color} />
                </View>
                <Text className="text-xs text-charcoal font-medium w-16 text-center">
                  {story.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Collection Hero Card */}
        <View className="px-4 pt-2 pb-4">
          <TouchableOpacity
            activeOpacity={0.9}
            className="rounded-2xl overflow-hidden relative h-48"
            onPress={() => router.push('/shop')}
          >
            <View className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
            <View className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <View className="absolute top-4 left-4">
              <View className="bg-gold/20 px-3 py-1 rounded-full mb-2">
                <Text className="text-gold text-xs font-semibold tracking-wide uppercase">New Collection</Text>
              </View>
              <Text className="font-heading text-white text-2xl leading-tight">Autumn/Winter</Text>
              <Text className="font-heading text-gold text-2xl leading-tight">2025</Text>
              <Text className="font-body text-white/70 text-sm mt-2">Premium Italian wool suits</Text>
            </View>
            <View className="absolute bottom-4 right-4 flex-row items-center gap-1.5 bg-gold px-4 py-2 rounded-full">
              <Text className="text-navy font-semibold text-sm">Explore</Text>
              <Ionicons name="arrow-forward" size={16} color={NAVY} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Shop by Category */}
        <View className="px-4 pb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-heading text-lg text-navy">Shop by Category</Text>
            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text className="text-gold text-sm font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <View className="grid grid-cols-3 gap-3">
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                className="bg-white rounded-2xl p-4 items-center gap-2.5 shadow-sm active:scale-95"
                style={styles.categoryCard}
                onPress={() => router.push('/shop')}
              >
                <View
                  className="w-12 h-12 rounded-xl items-center justify-center"
                  style={{ backgroundColor: cat.color + '12' }}
                >
                  <Ionicons name={cat.icon} size={22} color={cat.color} />
                </View>
                <Text className="text-sm text-navy font-medium">{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Arrivals */}
        <View className="pb-4">
          <View className="flex-row items-center justify-between px-4 mb-3">
            <Text className="font-heading text-lg text-navy">New Arrivals</Text>
            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text className="text-gold text-sm font-medium">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 gap-3">
            {newArrivals.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-40 bg-white rounded-2xl overflow-hidden shadow-sm"
                onPress={() => router.push(`/shop/${item.id}`)}
                activeOpacity={0.85}
              >
                <View className="relative h-48 bg-gray-100">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {item.isNew && (
                    <View className="absolute top-2 left-2 bg-gold px-2.5 py-0.5 rounded-full">
                      <Text className="text-navy text-[10px] font-bold tracking-wide uppercase">New</Text>
                    </View>
                  )}
                  <TouchableOpacity className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full items-center justify-center">
                    <Ionicons name="heart-outline" size={16} color={NAVY} />
                  </TouchableOpacity>
                </View>
                <View className="p-3">
                  <Text className="font-medium text-navy text-sm mb-1" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-gold font-semibold text-sm">{formatPrice(item.price)}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Why Choose Malipula */}
        <View className="px-4 pb-6">
          <Text className="font-heading text-lg text-navy mb-3">Why Choose Malipula</Text>
          <View className="grid grid-cols-2 gap-3">
            {whyChoose.map((item) => (
              <View key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="w-10 h-10 rounded-xl bg-gold/10 items-center justify-center mb-2.5">
                  <Ionicons name={item.icon} size={20} color={GOLD} />
                </View>
                <Text className="font-semibold text-navy text-sm mb-0.5">{item.title}</Text>
                <Text className="text-charcoal/60 text-xs leading-relaxed">{item.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-24" />
      </ScrollView>

      {/* Quick Book FAB */}
      <TouchableOpacity
        className="absolute bottom-24 right-4 w-14 h-14 rounded-full items-center justify-center shadow-lg"
        style={[styles.fabButton, styles.goldGradient]}
        onPress={() => router.push('/booking/wizard')}
        activeOpacity={0.85}
      >
        <Ionicons name="calendar" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    elevation: 2,
    shadowColor: 'rgba(27, 42, 74, 0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  fabButton: {
    elevation: 6,
    shadowColor: 'rgba(201, 169, 98, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 1,
  },
  goldGradient: {
    backgroundColor: GOLD,
  },
});
