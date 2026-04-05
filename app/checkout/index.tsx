import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';
import { Colors, getThemeColors } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';

export default function CheckoutScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    // Simulate transaction delay
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]} className="items-center justify-center p-8">
        <View className="w-48 h-48 items-center justify-center mb-8">
            <LottieView
              source={{ uri: 'https://lottie.host/80e922f2-1b1e-4f1e-9e8c-8f4f3e4e9b8f/success-elite.json' }}
              autoPlay
              loop={false}
              style={{ width: 200, height: 200 }}
            />
        </View>
        <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-2">Order Confirmed</Text>
        <Text className="text-navy dark:text-ivory font-display text-3xl text-center">Your Masterpiece is in the Works</Text>
        <Text className="text-app-text-secondary text-center mt-4 mb-12 px-6 leading-5">
            Thank you for choosing Malipula. Our master tailors have been notified of your sartorial DNA.
        </Text>
        <Button 
            title="Track My Order" 
            variant="luxury" 
            onPress={() => router.push('/')} 
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View className="pt-16 px-6 pb-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text className="font-heading text-xl text-navy dark:text-ivory">Secure Checkout</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Order Summary */}
        <View className="mb-8">
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-4">Summary</Text>
            <GlassView intensity={5} className="p-5 rounded-[32px] border border-gold/10 flex-row items-center gap-4">
                <View className="w-20 h-20 bg-navy dark:bg-charcoal rounded-[20px] items-center justify-center">
                    <Ionicons name="shirt" size={32} color={Colors.gold} />
                </View>
                <View className="flex-1">
                    <Text className="text-navy dark:text-ivory font-heading text-lg">Bespoke Navy Wool Suit</Text>
                    <Text className="text-app-text-secondary text-xs mt-1">Slim Fit • Heritage Collection</Text>
                    <View className="flex-row items-center gap-2 mt-2">
                        <View className="bg-gold/10 px-2 py-1 rounded">
                            <Text className="text-gold font-bold text-[8px] uppercase">AI Measured</Text>
                        </View>
                        <Text className="text-gold font-bold text-sm">$1,250</Text>
                    </View>
                </View>
            </GlassView>
        </View>

        {/* Shipping */}
        <View className="mb-8">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-gold font-bold text-[10px] uppercase tracking-widest">Shipping Address</Text>
                <TouchableOpacity>
                    <Text className="text-gold font-bold text-[10px] uppercase">Edit</Text>
                </TouchableOpacity>
            </View>
            <View className="p-5 rounded-[28px] border border-gold/10 bg-app-surface">
                <Text className="text-navy dark:text-ivory font-medium">Bakhresa Towers, Floor 12</Text>
                <Text className="text-app-text-secondary text-xs mt-1">Dar es Salaam, Tanzania</Text>
                <Text className="text-app-text-secondary text-xs mt-1">+255 765 432 109</Text>
            </View>
        </View>

        {/* Payment */}
        <View className="mb-8">
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-4">Payment Method</Text>
            <View className="flex-row gap-3">
                {['card', 'apple-pay', 'm-pesa'].map((method) => (
                    <TouchableOpacity 
                        key={method}
                        onPress={() => setPaymentMethod(method)}
                        className={`flex-1 p-4 rounded-[24px] border items-center justify-center ${paymentMethod === method ? 'bg-gold/5 border-gold shadow-sm' : 'bg-app-surface border-gold/10'}`}
                    >
                        <Ionicons 
                            name={method === 'card' ? 'card-outline' : method === 'apple-pay' ? 'logo-apple' : 'phone-portrait-outline'} 
                            size={24} 
                            color={paymentMethod === method ? Colors.gold : theme.text} 
                        />
                        <Text className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${paymentMethod === method ? 'text-gold' : 'text-app-text-secondary'}`}>
                            {method.replace('-', ' ')}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* Pricing Detail */}
        <View className="mt-4 gap-3 bg-app-surface p-6 rounded-[32px] border border-gold/10">
            <View className="flex-row justify-between">
                <Text className="text-app-text-secondary text-xs">Subtotal</Text>
                <Text className="text-navy dark:text-ivory font-medium">$1,250.00</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-app-text-secondary text-xs">Craftsmanship Fee</Text>
                <Text className="text-navy dark:text-ivory font-medium">$150.00</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-app-text-secondary text-xs">Priority Shipping</Text>
                <Text className="text-navy dark:text-ivory font-medium">Free</Text>
            </View>
            <View className="h-[1px] bg-gold/10 my-2" />
            <View className="flex-row justify-between items-baseline">
                <Text className="text-navy dark:text-ivory font-bold">Total</Text>
                <Text className="text-gold font-display text-2xl">$1,400.00</Text>
            </View>
        </View>
      </ScrollView>

      {/* Place Order */}
      <View className="p-8 border-t border-gold/10 bg-app-background">
        <Button 
            title="Complete Payment" 
            variant="luxury" 
            onPress={handlePayment} 
        />
        <Text className="text-app-text-secondary text-center text-[10px] mt-4">
            Security guaranteed by Malipura Vault SSL. Payments processed via Selcom & Stripe.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
