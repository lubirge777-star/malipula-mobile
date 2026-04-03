import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const cartItems = [
  {
    id: '1',
    name: 'The Executive 3-Piece',
    variant: 'Navy / Size 42',
    price: 1250000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    color: '#1B2A4A',
    size: '42',
  },
  {
    id: '2',
    name: 'Ivory Formal Shirt',
    variant: 'White / Size M',
    price: 120000,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=150&h=150&fit=crop',
    color: '#FFFFFF',
    size: 'M',
  },
  {
    id: '3',
    name: 'Silk Pocket Square',
    variant: 'Burgundy',
    price: 45000,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=150&h=150&fit=crop',
    color: '#7B2D26',
    size: 'One Size',
  },
];

export default function CartScreen() {
  const router = useRouter();
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item from your cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setItems((prev) => prev.filter((item) => item.id !== id)),
      },
    ]);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? 15000 : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + deliveryFee - discount;

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const handlePromo = () => {
    if (promoCode.toUpperCase() === 'MALIPULA10') {
      setPromoApplied(true);
    }
  };

  const isEmpty = items.length === 0;

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center justify-between">
        <View>
          <Text className="font-heading text-2xl text-navy">My Cart</Text>
          {!isEmpty && (
            <Text className="text-charcoal/60 text-sm mt-0.5">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </Text>
          )}
        </View>
        {!isEmpty && (
          <TouchableOpacity onPress={() => Alert.alert('Clear Cart', 'Remove all items from cart?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', style: 'destructive', onPress: () => setItems([]) },
          ])}>
            <Ionicons name="trash-outline" size={20} color="#DC2626" />
          </TouchableOpacity>
        )}
      </View>

      {isEmpty ? (
        <View className="flex-1 items-center justify-center px-8">
          <View className="w-24 h-24 bg-gold/10 rounded-full items-center justify-center mb-5">
            <Ionicons name="bag-outline" size={44} color={GOLD} />
          </View>
          <Text className="font-heading text-xl text-navy mb-2">Your cart is empty</Text>
          <Text className="text-charcoal/60 text-sm text-center mb-6">
            Discover our collection and add items to your cart
          </Text>
          <TouchableOpacity
            className="bg-gold px-8 py-3 rounded-xl"
            onPress={() => router.push('/shop')}
          >
            <Text className="text-navy font-semibold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-52">
            {/* Cart Items */}
            <View className="gap-3">
              {items.map((item) => (
                <View key={item.id} className="bg-white rounded-2xl p-3 shadow-sm flex-row gap-3">
                  <Image
                    source={{ uri: item.image }}
                    className="w-20 h-24 rounded-xl bg-gray-50"
                    resizeMode="cover"
                  />
                  <View className="flex-1 justify-between py-0.5">
                    <View>
                      <Text className="font-semibold text-navy text-sm mb-0.5" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="text-charcoal/60 text-xs">{item.variant}</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-gold font-semibold text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </Text>
                      <View className="flex-row items-center gap-0.5">
                        <TouchableOpacity
                          className="w-7 h-7 rounded-lg bg-ivory items-center justify-center"
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <Ionicons name="remove" size={14} color={NAVY} />
                        </TouchableOpacity>
                        <Text className="w-7 text-center text-sm font-semibold text-navy">
                          {item.quantity}
                        </Text>
                        <TouchableOpacity
                          className="w-7 h-7 rounded-lg bg-ivory items-center justify-center"
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <Ionicons name="add" size={14} color={NAVY} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="absolute top-3 right-3 p-1"
                    onPress={() => removeItem(item.id)}
                  >
                    <Ionicons name="close" size={16} color="#6B6361" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Promo Code */}
            <View className="mt-4">
              <Text className="text-sm font-semibold text-navy mb-2">Promo Code</Text>
              <View className="flex-row gap-2">
                <View className="flex-1 flex-row items-center bg-white rounded-xl px-3.5 py-2.5 shadow-sm">
                  <Ionicons name="ticket-outline" size={16} color={GOLD} />
                  <TextInput
                    className="flex-1 ml-2 text-sm text-navy font-body"
                    placeholder="Enter promo code"
                    placeholderTextColor="#6B636180"
                    value={promoCode}
                    onChangeText={setPromoCode}
                  />
                </View>
                <TouchableOpacity
                  className={`px-4 rounded-xl ${
                    promoApplied ? 'bg-green-100' : 'bg-gold'
                  }`}
                  onPress={handlePromo}
                >
                  <Text className="text-sm font-semibold text-navy">
                    {promoApplied ? 'Applied' : 'Apply'}
                  </Text>
                </TouchableOpacity>
              </View>
              {promoApplied && (
                <View className="flex-row items-center gap-1.5 mt-2">
                  <Ionicons name="checkmark-circle" size={14} color="#059669" />
                  <Text className="text-xs text-green-600 font-medium">
                    10% discount applied! You save {formatPrice(discount)}
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>

          {/* Sticky Order Summary */}
          <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-4 pt-4 pb-8 shadow-lg" style={styles.summaryBar}>
            <View className="w-10 h-1 bg-gray-200 rounded-full self-center mb-3" />
            <View className="space-y-1.5 mb-3">
              <View className="flex-row justify-between">
                <Text className="text-charcoal/60 text-sm">Subtotal</Text>
                <Text className="text-navy text-sm">{formatPrice(subtotal)}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-charcoal/60 text-sm">Delivery</Text>
                <Text className="text-navy text-sm">{formatPrice(deliveryFee)}</Text>
              </View>
              {promoApplied && (
                <View className="flex-row justify-between">
                  <Text className="text-green-600 text-sm">Discount</Text>
                  <Text className="text-green-600 text-sm">-{formatPrice(discount)}</Text>
                </View>
              )}
              <View className="h-px bg-gray-100 my-1" />
              <View className="flex-row justify-between">
                <Text className="font-semibold text-navy">Total</Text>
                <Text className="font-bold text-gold text-lg">{formatPrice(total)}</Text>
              </View>
            </View>
            <TouchableOpacity
              className="bg-gold rounded-xl py-3.5 items-center"
              onPress={() => router.push('/checkout')}
              activeOpacity={0.85}
            >
              <Text className="text-navy font-bold text-base">Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  summaryBar: {
    elevation: 10,
    shadowColor: 'rgba(27, 42, 74, 0.1)',
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    shadowOpacity: 1,
  },
});
