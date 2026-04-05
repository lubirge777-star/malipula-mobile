import React, { useState } from 'react';
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
import { useColorScheme } from 'react-native';
import { Colors, getThemeColors, Spacing, Typography, BorderRadius } from '../../src/theme';
import { Button, ProductCard, GlassView } from '../../src/components/ui';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Enhanced Mock Data aligned with Web App
const featuredCollections = [
  {
    id: 'winter-25',
    title: 'Winter Heritage',
    subtitle: 'Collection 2025',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    color: Colors.navy,
  },
];

const categories = [
  { id: 'suits', name: 'Suits', icon: 'business' as any, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { id: 'shirts', name: 'Shirts', icon: 'shirt' as any, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop' },
  { id: 'kaftans', name: 'Kaftans', icon: 'body-outline' as any, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=400&fit=crop' },
];

const newArrivals = [
  { 
    id: '1', 
    name: 'The Executive Navy Suit', 
    basePrice: 8500, 
    salePrice: 7200,
    rating: 4.8,
    reviewCount: 24,
    isNew: true,
    category: { name: 'Bespoke Suits' },
    images: [{ url: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&h=600&fit=crop', isPrimary: true }]
  },
  { 
    id: '2', 
    name: 'Ivory Custom Kaftan', 
    basePrice: 4500, 
    rating: 4.9,
    reviewCount: 15,
    isNew: true,
    category: { name: 'Traditional' },
    images: [{ url: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=600&fit=crop', isPrimary: true }]
  },
];

const quickActions = [
  { id: 'build', name: 'Build Suit', icon: 'cube-outline', color: '#C9A962', route: '/builder' },
  { id: 'measure', name: 'AI Measure', icon: 'scan-outline', color: '#1A2B44', route: '/measure/scan' },
  { id: 'stylist', name: 'Live Stylist', icon: 'chatbubbles-outline', color: '#2D2D2D', route: '/chat' },
  { id: 'orders', name: 'My Orders', icon: 'time-outline', color: '#A0874E', route: '/account/orders' },
];

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header - Premium Minimalist */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
          <View>
            <Text className="font-display text-2xl text-navy dark:text-gold uppercase tracking-[4px]">
              Malipula
            </Text>
            <View className="h-[1px] w-8 bg-gold mt-1" />
          </View>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="p-2 bg-app-surface rounded-full shadow-sm">
              <Ionicons name="search" size={20} color={theme.text} />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-app-surface rounded-full shadow-sm relative">
              <Ionicons name="cart-outline" size={20} color={theme.text} />
              <View className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold rounded-full border border-white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section - Luxury Narrative */}
        <View className="px-6 py-4">
          <TouchableOpacity 
            activeOpacity={0.95}
            className="h-96 rounded-[32px] overflow-hidden relative shadow-2xl"
          >
            <Image 
              source={{ uri: featuredCollections[0].image }}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />
            <View className="absolute inset-0 bg-black/30" />
            
            <View className="absolute bottom-10 left-8 right-8">
              <Text className="font-script text-gold text-3xl mb-2">Bespoke Elegance</Text>
              <Text className="font-display text-white text-4xl mb-4 leading-tight">
                Crafted for the{'\n'}Modern Gentleman
              </Text>
              <Button 
                title="Explore Collection" 
                onPress={() => router.push('/shop')}
                variant="luxury"
                style={{ width: '60%' }}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Actions - The "Service" Grid */}
        <View className="px-6 py-6 flex-row justify-between">
          {quickActions.map((action) => (
            <TouchableOpacity 
              key={action.id}
              className="items-center"
              onPress={() => router.push(action.route as any)}
            >
              <View 
                className="w-14 h-14 rounded-2xl items-center justify-center shadow-lg bg-white dark:bg-charcoal mb-2"
                style={{ shadowColor: action.color, shadowOpacity: 0.2, shadowRadius: 10 }}
              >
                <Ionicons name={action.icon as any} size={24} color={action.color} />
              </View>
              <Text className="text-[10px] font-medium text-app-text-secondary uppercase tracking-widest">{action.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity - Tracking Preview */}
        <View className="px-6 mb-8">
          <GlassView intensity={20} className="p-5 rounded-[24px] border border-gold/20 flex-row items-center justify-between overflow-hidden">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-gold/10 items-center justify-center">
                <Ionicons name="cut-outline" size={18} color="#C9A962" />
              </View>
              <View>
                <Text className="font-heading text-navy dark:text-ivory text-sm">Status: In Production</Text>
                <Text className="text-[11px] text-app-text-secondary">Midnight Wool Suit • Cutting Phase (Step 2/4)</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/account/orders/1')}>
              <Text className="text-gold font-bold text-xs">Track</Text>
            </TouchableOpacity>
          </GlassView>
        </View>

        {/* Categories Grid - Glassmorphism UI */}
        <View className="px-6 mb-8 mt-4">
          <View className="flex-row items-center justify-between mb-5">
            <Text className="font-heading text-xl text-navy dark:text-ivory">Our Collections</Text>
            <TouchableOpacity onPress={() => router.push('/shop')}>
              <Text className="text-gold font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row gap-4">
            {categories.map((cat) => (
              <TouchableOpacity 
                key={cat.id} 
                className="flex-1 rounded-[24px] overflow-hidden h-32 relative"
                onPress={() => router.push('/shop')}
              >
                <Image source={{ uri: cat.image }} className="absolute inset-0 w-full h-full" />
                <View className="absolute inset-0 bg-black/20" />
                <GlassView intensity={15} style={StyleSheet.absoluteFill} />
                <View className="flex-1 items-center justify-center">
                  <Ionicons name={cat.icon} size={24} color="#FFF" />
                  <Text className="text-white font-heading text-xs mt-2 uppercase tracking-widest">{cat.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* New Arrivals - Product Cards with Elevations */}
        <View className="pb-10">
          <View className="flex-row items-center justify-between px-6 mb-5">
            <Text className="font-heading text-xl text-navy dark:text-ivory">New Arrivals</Text>
            <Text className="font-script text-gold text-lg">Elite Selection</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={{ paddingLeft: 24, gap: 16 }}
          >
            {newArrivals.map((product) => (
              <ProductCard 
                key={product.id}
                product={product as any}
                onPress={() => router.push(`/shop/${product.id}`)}
                style={{ width: 220 }}
              />
            ))}
          </ScrollView>
        </View>

        {/* Bespoke Story Section - AI Augmented Reality */}
        <View className="mx-6 mb-10 bg-app-surface overflow-hidden rounded-[32px] border border-gold/10 relative">
          <Image 
            source={{ uri: 'C:/Users/HomePC/.gemini/antigravity/brain/5bbc9008-de68-4f19-8ab1-24562fabc33a/kaunda_suit_tailoring_ghost_1775417901864.png' }}
            className="w-full h-64"
            resizeMode="cover"
          />
          <View className="p-8">
            <Text className="font-script text-gold text-2xl text-center mb-1">Tailored for You</Text>
            <Text className="font-display text-navy dark:text-ivory text-2xl text-center mb-4">
              The Malipula Legacy
            </Text>
            <Text className="text-app-text-secondary text-center leading-6 font-sans mb-6">
              Combining centuries-old African craftsmanship with modern precision AI. Each "Kaunda" garment is a masterpiece of personal expression and architectural tailoring.
            </Text>
            <View className="items-center">
              <Button 
                  title="Begin Your Journey" 
                  onPress={() => router.push('/builder')}
                  variant="luxury"
                  size="md"
              />
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-28" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
