import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const orders = [
  {
    id: 'MLP-2025-0012',
    date: 'Jan 12, 2025',
    status: 'tailoring' as const,
    statusLabel: 'In Tailoring',
    total: 1250000,
    items: [
      { name: 'The Executive 3-Piece', qty: 1, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ],
    estimatedDelivery: 'Jan 28, 2025',
  },
  {
    id: 'MLP-2025-0008',
    date: 'Jan 5, 2025',
    status: 'shipped' as const,
    statusLabel: 'Shipped',
    total: 285000,
    items: [
      { name: 'Ivory Formal Shirt', qty: 2, image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=100&h=100&fit=crop' },
      { name: 'Silk Pocket Square', qty: 1, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=100&h=100&fit=crop' },
    ],
    estimatedDelivery: 'Jan 18, 2025',
    trackingNumber: 'TRK-78945612',
  },
  {
    id: 'MLP-2024-0198',
    date: 'Dec 15, 2024',
    status: 'delivered' as const,
    statusLabel: 'Delivered',
    total: 890000,
    items: [
      { name: 'Navy Slim Fit Suit', qty: 1, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&h=100&fit=crop' },
    ],
    estimatedDelivery: 'Dec 22, 2024',
  },
  {
    id: 'MLP-2024-0185',
    date: 'Nov 30, 2024',
    status: 'delivered' as const,
    statusLabel: 'Delivered',
    total: 450000,
    items: [
      { name: 'Royal Kaftan', qty: 1, image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=100&h=100&fit=crop' },
    ],
    estimatedDelivery: 'Dec 8, 2024',
  },
];

const statusConfig: Record<string, { color: string; bg: string; icon: string }> = {
  processing: { color: '#D97706', bg: '#FEF3C7', icon: 'clock-outline' },
  confirmed: { color: '#2563EB', bg: '#DBEAFE', icon: 'checkmark-circle-outline' },
  tailoring: { color: '#7C3AED', bg: '#EDE9FE', icon: 'cut-outline' },
  ready: { color: '#059669', bg: '#D1FAE5', icon: 'checkmark-done-outline' },
  shipped: { color: '#2563EB', bg: '#DBEAFE', icon: 'airplane-outline' },
  delivered: { color: '#059669', bg: '#D1FAE5', icon: 'checkmark-circle' },
};

const statusSteps = ['Processing', 'Confirmed', 'Tailoring', 'Ready', 'Shipped', 'Delivered'];
const statusIndexMap: Record<string, number> = {
  processing: 0, confirmed: 1, tailoring: 2, ready: 3, shipped: 4, delivered: 5,
};

const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

export default function OrdersScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'delivered', label: 'Delivered' },
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeFilter === 'active') return o.status !== 'delivered';
    if (activeFilter === 'delivered') return o.status === 'delivered';
    return true;
  });

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">My Orders</Text>
          <Text className="text-charcoal/60 text-xs">{orders.length} total orders</Text>
        </View>
      </View>

      {/* Filters */}
      <View className="px-4 py-2">
        <View className="flex-row bg-white rounded-xl p-1 shadow-sm">
          {filters.map((f) => (
            <TouchableOpacity
              key={f.id}
              className={`flex-1 py-2 rounded-lg items-center ${activeFilter === f.id ? 'bg-gold' : ''}`}
              onPress={() => setActiveFilter(f.id)}
            >
              <Text className={`text-sm font-semibold ${activeFilter === f.id ? 'text-navy' : 'text-charcoal'}`}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Orders List */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-8">
        <View className="gap-3 mt-1">
          {filteredOrders.map((order) => {
            const config = statusConfig[order.status];
            const currentStep = statusIndexMap[order.status];

            return (
              <TouchableOpacity
                key={order.id}
                className="bg-white rounded-2xl p-4 shadow-sm"
                activeOpacity={0.85}
              >
                {/* Order Header */}
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text className="font-semibold text-navy text-sm">{order.id}</Text>
                    <Text className="text-charcoal/50 text-xs mt-0.5">{order.date}</Text>
                  </View>
                  <View className="px-2.5 py-1 rounded-full flex-row items-center gap-1" style={{ backgroundColor: config.bg }}>
                    <Ionicons name={config.icon as any} size={12} color={config.color} />
                    <Text className="text-xs font-semibold" style={{ color: config.color }}>
                      {order.statusLabel}
                    </Text>
                  </View>
                </View>

                {/* Items */}
                <View className="flex-row gap-2 mb-3">
                  {order.items.map((item, index) => (
                    <View key={index} className="flex-row items-center gap-2">
                      <Image source={{ uri: item.image }} className="w-12 h-12 rounded-lg bg-gray-50" />
                      <View className="flex-1">
                        <Text className="text-navy text-xs font-medium" numberOfLines={1}>{item.name}</Text>
                        <Text className="text-charcoal/50 text-[11px]">Qty: {item.qty}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Status Progress */}
                {order.status !== 'delivered' && (
                  <View className="mb-3">
                    <View className="flex-row items-center justify-between mb-1">
                      {statusSteps.map((step, i) => (
                        <View key={step} className="items-center">
                          <View className={`w-2.5 h-2.5 rounded-full ${
                            i <= currentStep ? 'bg-gold' : 'bg-gray-200'
                          }`} />
                        </View>
                      ))}
                    </View>
                    <View className="h-0.5 bg-gray-200 rounded-full relative -mt-[6px] mx-1.5">
                      <View
                        className="h-full bg-gold rounded-full absolute left-0"
                        style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                      />
                    </View>
                    <View className="flex-row justify-between mt-1.5 px-0.5">
                      {statusSteps.filter((_, i) => i % 2 === 0).map((step) => (
                        <Text key={step} className="text-[9px] text-charcoal/40">{step}</Text>
                      ))}
                    </View>
                  </View>
                )}

                {/* Footer */}
                <View className="flex-row items-center justify-between pt-3 border-t border-gray-50">
                  <View>
                    <Text className="text-charcoal/50 text-[11px]">
                      {order.trackingNumber ? `Tracking: ${order.trackingNumber}` : `Est. ${order.estimatedDelivery}`}
                    </Text>
                    <Text className="text-gold font-bold text-sm mt-0.5">{formatPrice(order.total)}</Text>
                  </View>
                  <TouchableOpacity className="bg-gold/10 px-3 py-1.5 rounded-lg">
                    <Text className="text-gold text-xs font-semibold">
                      {order.status === 'delivered' ? 'Reorder' : 'Track'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
