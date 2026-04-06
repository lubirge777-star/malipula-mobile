import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import LottieView from 'lottie-react-native';
import { Colors, FontFamily, getThemeColors } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';
import { StatusBar } from 'expo-status-bar';

export default function CheckoutScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGateway, setShowGateway] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Step 1: Initialize Payment
    setTimeout(() => {
      setIsProcessing(false);
      setShowGateway(true);
    }, 2000);
  };

  const confirmGateway = () => {
    setShowGateway(false);
    setIsProcessing(true);
    
    // Step 2: Verification
    setTimeout(() => {
      setIsProcessing(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsSuccess(true);
    }, 2500);
  };

  if (isProcessing) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]} className="items-center justify-center">
        <StatusBar style={isDark ? "light" : "dark"} />
        <View className="w-64 h-64">
             <LottieView
              source={{ uri: 'https://lottie.host/9f5c4e9b-8f4f-4e1e-9e8c-80e922f2-1b1e.json' }} // Modern loader
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
            />
        </View>
        <Text className="text-gold font-bold text-[10px] uppercase tracking-widest animate-pulse">Encrypting Transaction...</Text>
        <Text style={{ color: theme.textSecondary }} className="text-sm mt-4 font-display opacity-50">Securely connecting to {paymentMethod.toUpperCase()} gateway</Text>
      </View>
    );
  }

  if (showGateway) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]} className="p-8 justify-center">
        <StatusBar style={isDark ? "light" : "dark"} />
        <GlassView intensity={isDark ? 40 : 80} className="p-8 rounded-[40px] border" style={{ borderColor: theme.border }}>
            <View className="items-center mb-8">
                <View className="w-16 h-16 bg-gold/10 rounded-full items-center justify-center mb-4">
                    <Ionicons name={paymentMethod === 'm-pesa' ? 'phone-portrait' : 'card'} size={32} color={Colors.gold} />
                </View>
                <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-2xl text-center">
                    {paymentMethod === 'm-pesa' ? 'Confirm M-Pesa Push' : 'Authenticate Card'}
                </Text>
                <Text style={{ color: theme.textSecondary }} className="text-xs text-center mt-2 font-regular">
                    {paymentMethod === 'm-pesa' 
                        ? 'A push request has been sent to +255 765 *** 109. Please enter your PIN on your handset.' 
                        : 'Secure 3D verification required for your luxury transaction.'}
                </Text>
            </View>

            <View className="p-4 rounded-2xl mb-8 border" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', borderColor: theme.border }}>
                <View className="flex-row justify-between mb-2">
                    <Text style={{ color: theme.textSecondary }} className="text-[10px] uppercase font-bold tracking-widest">Merchant</Text>
                    <Text style={{ color: theme.text }} className="text-[10px] font-bold tracking-widest">Malipula Bespoke Ltd</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text style={{ color: theme.textSecondary }} className="text-[10px] uppercase font-bold tracking-widest">Total Amount</Text>
                    <Text style={{ color: theme.text }} className="text-[10px] font-bold tracking-widest">$1,400.00</Text>
                </View>
            </View>

            <Button 
                title={paymentMethod === 'm-pesa' ? 'I Have Paid' : 'Verify & Pay'} 
                variant="luxury" 
                onPress={confirmGateway} 
            />
            <TouchableOpacity onPress={() => setShowGateway(false)} className="mt-4 p-2 items-center">
                <Text style={{ color: theme.textSecondary }} className="text-[10px] uppercase font-bold tracking-widest">Cancel Transaction</Text>
            </TouchableOpacity>
        </GlassView>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]} className="items-center justify-center p-8">
        <StatusBar style={isDark ? "light" : "dark"} />
        <View className="w-48 h-48 items-center justify-center mb-8">
            <LottieView
              source={{ uri: 'https://lottie.host/80e922f2-1b1e-4f1e-9e8c-8f4f3e4e9b8f/success-elite.json' }}
              autoPlay
              loop={false}
              style={{ width: 200, height: 200 }}
            />
        </View>
        <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-2">Order Confirmed</Text>
        <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-3xl text-center">Your Masterpiece is in the Works</Text>
        <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-center mt-4 mb-12 px-6 leading-5">
            Thank you for choosing Malipula. Our master tailors have been notified of your sartorial DNA.
        </Text>
        <Button 
            title="Track My Order" 
            variant="luxury" 
            onPress={() => router.replace('/(tabs)/account')} 
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      {/* Header */}
      <View className="pt-16 px-6 pb-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 w-10">
            <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-xl">Secure Checkout</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6">
        {/* Order Summary */}
        <View className="mb-8">
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-4">Summary</Text>
            <GlassView intensity={isDark ? 20 : 60} className="p-5 rounded-[32px] border flex-row items-center gap-4" style={{ borderColor: theme.border }}>
                <View className="w-20 h-20 rounded-[20px] items-center justify-center border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
                    <Ionicons name="shirt" size={32} color={Colors.gold} />
                </View>
                <View className="flex-1">
                    <Text style={{ fontFamily: FontFamily.display, color: theme.text }} className="text-lg">Bespoke Navy Wool Suit</Text>
                    <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-xs mt-1">Slim Fit • Heritage Collection</Text>
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
            <GlassView intensity={isDark ? 15 : 40} className="p-5 rounded-[28px] border" style={{ borderColor: theme.border }}>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-medium">Bakhresa Towers, Floor 12</Text>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-xs mt-1">Dar es Salaam, Tanzania</Text>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-xs mt-1">+255 765 432 109</Text>
            </GlassView>
        </View>

        {/* Payment */}
        <View className="mb-8">
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-4">Payment Method</Text>
            <View className="flex-row gap-3">
                {['card', 'apple-pay', 'm-pesa'].map((method) => (
                    <TouchableOpacity 
                        key={method}
                        onPress={() => setPaymentMethod(method)}
                        className="flex-1"
                    >
                        <GlassView intensity={paymentMethod === method ? (isDark ? 30 : 60) : (isDark ? 15 : 40)} className={`p-4 rounded-[24px] border items-center justify-center`} style={{ borderColor: paymentMethod === method ? Colors.gold : theme.border, backgroundColor: paymentMethod === method ? (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)') : 'transparent' }}>
                            <Ionicons 
                                name={method === 'card' ? 'card-outline' : method === 'apple-pay' ? 'logo-apple' : 'phone-portrait-outline'} 
                                size={24} 
                                color={paymentMethod === method ? Colors.gold : theme.text} 
                            />
                            <Text className={`text-[9px] font-bold uppercase tracking-widest mt-2`} style={{ color: paymentMethod === method ? Colors.gold : theme.textSecondary }}>
                                {method.replace('-', ' ')}
                            </Text>
                        </GlassView>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {/* Pricing Detail */}
        <GlassView intensity={isDark ? 10 : 30} className="mt-4 mb-8 gap-3 p-6 rounded-[32px] border" style={{ borderColor: theme.border }}>
            <View className="flex-row justify-between">
                <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-xs">Subtotal</Text>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-medium">$1,250.00</Text>
            </View>
            <View className="flex-row justify-between">
                <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-xs">Craftsmanship Fee</Text>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-medium">$150.00</Text>
            </View>
            <View className="flex-row justify-between">
                <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-xs">Priority Shipping</Text>
                <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-medium">Free</Text>
            </View>
            <View className="h-[1px] my-2" style={{ backgroundColor: theme.border }} />
            <View className="flex-row justify-between items-baseline">
                <Text style={{ fontFamily: FontFamily.regular, color: theme.text }} className="font-bold">Total</Text>
                <Text style={{ fontFamily: FontFamily.display }} className="text-gold text-2xl">$1,400.00</Text>
            </View>
        </GlassView>
      </ScrollView>

      {/* Place Order */}
      <GlassView intensity={isDark ? 20 : 60} className="p-8 border-t pt-6" style={{ borderColor: theme.border }}>
        <Button 
            title="Complete Payment" 
            variant="luxury" 
            onPress={handlePayment} 
        />
        <Text style={{ fontFamily: FontFamily.regular, color: theme.textSecondary }} className="text-center text-[10px] mt-4">
            Security guaranteed by Malipula Vault SSL. Payments processed via Selcom & Stripe.
        </Text>
      </GlassView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
