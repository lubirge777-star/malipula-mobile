import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const deliveryMethods = [
  { id: 'pickup', icon: 'storefront-outline' as const, title: 'Store Pickup', desc: 'Pick up from our Kijitonyama boutique', price: 0, time: '3-5 days' },
  { id: 'dar', icon: 'bicycle-outline' as const, title: 'Dar es Salaam', desc: 'Same-day delivery within the city', price: 15000, time: 'Same day' },
  { id: 'national', icon: 'airplane-outline' as const, title: 'Nationwide', desc: 'Delivery across Tanzania', price: 35000, time: '3-7 days' },
];

const paymentMethods = [
  { id: 'mpesa', icon: 'phone-portrait-outline' as const, title: 'M-Pesa', desc: 'Mobile money payment', number: '255712345678' },
  { id: 'tigo', icon: 'phone-portrait-outline' as const, title: 'Tigo Pesa', desc: 'Mobile money payment', number: '255712345678' },
  { id: 'airtel', icon: 'phone-portrait-outline' as const, title: 'Airtel Money', desc: 'Mobile money payment', number: '255712345678' },
  { id: 'card', icon: 'card-outline' as const, title: 'Credit/Debit Card', desc: 'Visa, Mastercard', number: '****4532' },
];

const orderItems = [
  { name: 'The Executive 3-Piece', qty: 1, price: 1250000 },
  { name: 'Ivory Formal Shirt', qty: 2, price: 120000 },
  { name: 'Silk Pocket Square', qty: 1, price: 45000 },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedDelivery, setSelectedDelivery] = useState('dar');
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  const [fullName, setFullName] = useState('Michael Kimaro');
  const [phone, setPhone] = useState('+255 712 345 678');
  const [street, setStreet] = useState('Plot 45, Ohio Street');
  const [city, setCity] = useState('Dar es Salaam');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Math.round(subtotal * 0.1);
  const delivery = deliveryMethods.find((d) => d.id === selectedDelivery)?.price || 0;
  const total = subtotal - discount + delivery;

  const formatPrice = (price: number) => `TZS ${price.toLocaleString()}`;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/account/orders');
    }, 2000);
  };

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">Checkout</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-4 pb-36">
        {/* Delivery Address */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-semibold text-navy text-base">Delivery Address</Text>
            <TouchableOpacity>
              <Text className="text-gold text-xs font-medium">Change</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-2.5">
            <View>
              <Text className="text-xs text-charcoal/50 mb-1">Full Name</Text>
              <TextInput
                className="bg-ivory rounded-xl px-3.5 py-2.5 text-sm text-navy"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View>
              <Text className="text-xs text-charcoal/50 mb-1">Phone</Text>
              <TextInput
                className="bg-ivory rounded-xl px-3.5 py-2.5 text-sm text-navy"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View>
              <Text className="text-xs text-charcoal/50 mb-1">Address</Text>
              <TextInput
                className="bg-ivory rounded-xl px-3.5 py-2.5 text-sm text-navy"
                value={street}
                onChangeText={setStreet}
              />
            </View>
            <View>
              <Text className="text-xs text-charcoal/50 mb-1">City</Text>
              <TextInput
                className="bg-ivory rounded-xl px-3.5 py-2.5 text-sm text-navy"
                value={city}
                onChangeText={setCity}
              />
            </View>
          </View>
        </View>

        {/* Delivery Method */}
        <View className="mb-4">
          <Text className="font-semibold text-navy text-base mb-2.5">Delivery Method</Text>
          <View className="gap-2">
            {deliveryMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`bg-white rounded-2xl p-3.5 shadow-sm flex-row items-center gap-3 border-2 ${
                  selectedDelivery === method.id ? 'border-gold' : 'border-transparent'
                }`}
                onPress={() => setSelectedDelivery(method.id)}
                activeOpacity={0.85}
              >
                <View className={`w-11 h-11 rounded-xl items-center justify-center ${
                  selectedDelivery === method.id ? 'bg-gold/20' : 'bg-ivory'
                }`}>
                  <Ionicons name={method.icon} size={20} color={selectedDelivery === method.id ? GOLD : NAVY} />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-medium text-navy text-sm">{method.title}</Text>
                    <Text className="text-gold font-semibold text-sm">
                      {method.price === 0 ? 'Free' : formatPrice(method.price)}
                    </Text>
                  </View>
                  <Text className="text-charcoal/60 text-xs mt-0.5">{method.desc}</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <Ionicons name="time-outline" size={11} color="#6B6361" />
                    <Text className="text-charcoal/50 text-[11px]">{method.time}</Text>
                  </View>
                </View>
                {selectedDelivery === method.id && (
                  <View className="w-5 h-5 bg-gold rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Method */}
        <View className="mb-4">
          <Text className="font-semibold text-navy text-base mb-2.5">Payment Method</Text>
          <View className="gap-2">
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                className={`bg-white rounded-2xl p-3.5 shadow-sm flex-row items-center gap-3 border-2 ${
                  selectedPayment === method.id ? 'border-gold' : 'border-transparent'
                }`}
                onPress={() => setSelectedPayment(method.id)}
                activeOpacity={0.85}
              >
                <View className={`w-11 h-11 rounded-xl items-center justify-center ${
                  selectedPayment === method.id ? 'bg-gold/20' : 'bg-ivory'
                }`}>
                  <Ionicons name={method.icon} size={20} color={selectedPayment === method.id ? GOLD : NAVY} />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-navy text-sm">{method.title}</Text>
                  <Text className="text-charcoal/60 text-xs">{method.desc}</Text>
                </View>
                <Text className="text-charcoal/40 text-xs">{method.number}</Text>
                {selectedPayment === method.id && (
                  <View className="w-5 h-5 bg-gold rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Order Summary */}
        <View className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <Text className="font-semibold text-navy text-base mb-3">Order Summary</Text>
          {orderItems.map((item, index) => (
            <View key={index} className="flex-row justify-between py-1.5">
              <Text className="text-charcoal/70 text-sm flex-1" numberOfLines={1}>{item.name} x{item.qty}</Text>
              <Text className="text-navy text-sm font-medium ml-4">{formatPrice(item.price * item.qty)}</Text>
            </View>
          ))}
          <View className="h-px bg-gray-100 my-2" />
          <View className="flex-row justify-between py-1">
            <Text className="text-charcoal/60 text-sm">Subtotal</Text>
            <Text className="text-navy text-sm">{formatPrice(subtotal)}</Text>
          </View>
          <View className="flex-row justify-between py-1">
            <Text className="text-charcoal/60 text-sm">Discount (10%)</Text>
            <Text className="text-green-600 text-sm">-{formatPrice(discount)}</Text>
          </View>
          <View className="flex-row justify-between py-1">
            <Text className="text-charcoal/60 text-sm">Delivery</Text>
            <Text className="text-navy text-sm">{delivery === 0 ? 'Free' : formatPrice(delivery)}</Text>
          </View>
          <View className="h-px bg-gray-100 my-2" />
          <View className="flex-row justify-between">
            <Text className="font-bold text-navy">Total</Text>
            <Text className="font-bold text-gold text-lg">{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-4 pt-3 pb-8 shadow-lg" style={styles.stickyBar}>
        <TouchableOpacity
          className={`py-3.5 rounded-xl items-center ${isProcessing ? 'bg-gray-300' : 'bg-gold'}`}
          onPress={handlePlaceOrder}
          disabled={isProcessing}
          activeOpacity={0.85}
        >
          <Text className={`font-bold text-sm ${isProcessing ? 'text-charcoal/40' : 'text-navy'}`}>
            {isProcessing ? 'Processing...' : `Place Order — ${formatPrice(total)}`}
          </Text>
        </TouchableOpacity>
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
