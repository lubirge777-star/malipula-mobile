import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const wishlistItems = [
  { id: '1', name: 'The Diplomat 3-Piece', price: 1450000, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&h=400&fit=crop', category: 'Suits' },
  { id: '2', name: 'Royal Kaftan Gold', price: 520000, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=300&h=400&fit=crop', category: 'Kaftans' },
  { id: '3', name: 'Italian Linen Shirt', price: 185000, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop', category: 'Shirts' },
  { id: '4', name: 'Double-Breasted Blazer', price: 780000, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop', category: 'Blazers' },
  { id: '5', name: 'Cashmere Tie Set', price: 85000, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=300&h=400&fit=crop', category: 'Accessories' },
  { id: '6', name: 'Charcoal Trousers', price: 280000, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop', category: 'Trousers' },
];

const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

export default function WishlistScreen() {
  const router = useRouter();
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">Wishlist</Text>
          <Text className="text-charcoal/60 text-xs">{items.length} saved items</Text>
        </View>
      </View>

      {items.length === 0 ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 bg-gold/10 rounded-full items-center justify-center mb-5">
            <Ionicons name="heart-outline" size={44} color={GOLD} />
          </View>
          <Text className="font-heading text-xl text-navy mb-2">Your wishlist is empty</Text>
          <Text className="text-charcoal/60 text-sm text-center mb-6">
            Save items you love and come back to them later
          </Text>
          <TouchableOpacity className="bg-gold px-8 py-3 rounded-xl" onPress={() => router.push('/shop')}>
            <Text className="text-navy font-semibold">Browse Collection</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-8">
          <View className="flex-row flex-wrap gap-3 mt-2">
            {items.map((item) => (
              <View key={item.id} className="w-[48%] bg-white rounded-2xl overflow-hidden shadow-sm">
                <TouchableOpacity
                  className="relative h-48 bg-gray-50"
                  onPress={() => router.push(`/shop/${item.id}`)}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                  <View className="absolute top-2 right-2">
                    <TouchableOpacity
                      className="w-8 h-8 bg-white/90 rounded-full items-center justify-center shadow-sm"
                      onPress={() => removeItem(item.id)}
                    >
                      <Ionicons name="heart" size={16} color="#DC2626" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
                <View className="p-3">
                  <Text className="text-charcoal/50 text-[10px] uppercase tracking-wider mb-0.5">{item.category}</Text>
                  <Text className="font-medium text-navy text-sm mb-1" numberOfLines={1}>{item.name}</Text>
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gold font-semibold text-sm">{formatPrice(item.price)}</Text>
                  </View>
                  <TouchableOpacity className="bg-gold rounded-lg py-2 items-center mt-2.5">
                    <Text className="text-navy text-xs font-semibold">Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
