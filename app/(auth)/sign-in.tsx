import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const isValid = email.length > 0 && password.length >= 6;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-ivory"
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="px-8 pt-16 pb-6">
          <View className="w-16 h-16 bg-gold/15 rounded-2xl items-center justify-center mb-6">
            <Ionicons name="shirt-outline" size={32} color={GOLD} />
          </View>
          <Text className="font-heading text-3xl text-navy">Welcome Back</Text>
          <Text className="text-charcoal/60 text-base mt-2 leading-relaxed">
            Sign in to your Malipula account to continue shopping
          </Text>
        </View>

        {/* Form */}
        <View className="px-6">
          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-navy mb-1.5">Email Address</Text>
            <View className="bg-white rounded-xl px-4 py-3.5 flex-row items-center shadow-sm">
              <Ionicons name="mail-outline" size={18} color="#6B6361" />
              <TextInput
                className="flex-1 ml-3 text-sm text-navy"
                placeholder="Enter your email"
                placeholderTextColor="#6B636160"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-4">
            <View className="flex-row items-center justify-between mb-1.5">
              <Text className="text-sm font-medium text-navy">Password</Text>
              <TouchableOpacity>
                <Text className="text-gold text-xs font-medium">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View className="bg-white rounded-xl px-4 py-3.5 flex-row items-center shadow-sm">
              <Ionicons name="lock-closed-outline" size={18} color="#6B6361" />
              <TextInput
                className="flex-1 ml-3 text-sm text-navy"
                placeholder="Enter your password"
                placeholderTextColor="#6B636160"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color="#6B6361"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me */}
          <TouchableOpacity
            className="flex-row items-center gap-2 mb-6"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View className={`w-5 h-5 rounded border-2 items-center justify-center ${
              rememberMe ? 'bg-gold border-gold' : 'border-gray-300'
            }`}>
              {rememberMe && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
            </View>
            <Text className="text-charcoal/60 text-sm">Remember me</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            className={`py-3.5 rounded-xl items-center mb-6 ${
              isValid ? 'bg-gold' : 'bg-gray-200'
            }`}
            onPress={handleSignIn}
            disabled={!isValid || isLoading}
            activeOpacity={0.85}
          >
            <Text className={`font-bold text-base ${isValid ? 'text-navy' : 'text-charcoal/40'}`}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3 mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-charcoal/40 text-xs">OR CONTINUE WITH</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login */}
          <View className="flex-row gap-3 mb-8">
            <TouchableOpacity className="flex-1 bg-white rounded-xl py-3.5 items-center shadow-sm flex-row justify-center gap-2">
              <Ionicons name="logo-google" size={18} color="#DB4437" />
              <Text className="text-charcoal text-sm font-medium">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white rounded-xl py-3.5 items-center shadow-sm flex-row justify-center gap-2">
              <Ionicons name="logo-apple" size={18} color="#000000" />
              <Text className="text-charcoal text-sm font-medium">Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="items-center pb-8">
            <Text className="text-charcoal/60 text-sm">Don't have an account?{' '}</Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text className="text-gold font-semibold text-sm">Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
