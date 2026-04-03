import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValid =
    fullName.length >= 2 &&
    email.includes('@') &&
    phone.length >= 10 &&
    password.length >= 8 &&
    password === confirmPassword &&
    agreeTerms;

  const handleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { label: '', color: '', width: 0 };
    if (password.length < 6) return { label: 'Weak', color: '#DC2626', width: 33 };
    if (password.length < 8) return { label: 'Fair', color: '#D97706', width: 66 };
    return { label: 'Strong', color: '#059669', width: 100 };
  };

  const strength = getPasswordStrength();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-ivory"
    >
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header */}
        <View className="px-8 pt-14 pb-6">
          <TouchableOpacity className="mb-4" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={NAVY} />
          </TouchableOpacity>
          <View className="w-16 h-16 bg-gold/15 rounded-2xl items-center justify-center mb-6">
            <Ionicons name="person-add-outline" size={32} color={GOLD} />
          </View>
          <Text className="font-heading text-3xl text-navy">Create Account</Text>
          <Text className="text-charcoal/60 text-base mt-2 leading-relaxed">
            Join Malipula to explore our premium collection
          </Text>
        </View>

        {/* Form */}
        <View className="px-6">
          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-navy mb-1.5">Full Name</Text>
            <View className="bg-white rounded-xl px-4 py-3.5 flex-row items-center shadow-sm">
              <Ionicons name="person-outline" size={18} color="#6B6361" />
              <TextInput
                className="flex-1 ml-3 text-sm text-navy"
                placeholder="Enter your full name"
                placeholderTextColor="#6B636160"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          </View>

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

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-navy mb-1.5">Phone Number</Text>
            <View className="bg-white rounded-xl px-4 py-3.5 flex-row items-center shadow-sm">
              <Ionicons name="phone-portrait-outline" size={18} color="#6B6361" />
              <TextInput
                className="flex-1 ml-3 text-sm text-navy"
                placeholder="+255 xxx xxx xxx"
                placeholderTextColor="#6B636160"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password */}
          <View className="mb-1.5">
            <Text className="text-sm font-medium text-navy mb-1.5">Password</Text>
            <View className="bg-white rounded-xl px-4 py-3.5 flex-row items-center shadow-sm">
              <Ionicons name="lock-closed-outline" size={18} color="#6B6361" />
              <TextInput
                className="flex-1 ml-3 text-sm text-navy"
                placeholder="Min. 8 characters"
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

          {/* Password Strength */}
          {password.length > 0 && (
            <View className="flex-row items-center gap-2 mb-4 pl-1">
              <View className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full"
                  style={{ width: `${strength.width}%`, backgroundColor: strength.color }}
                />
              </View>
              <Text className="text-[11px] font-medium" style={{ color: strength.color }}>
                {strength.label}
              </Text>
            </View>
          )}

          {/* Confirm Password */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-navy mb-1.5">Confirm Password</Text>
            <View className="bg-white rounded-xl px-4 py-3.5 flex-row items-center shadow-sm">
              <Ionicons name="lock-closed-outline" size={18} color="#6B6361" />
              <TextInput
                className="flex-1 ml-3 text-sm text-navy"
                placeholder="Re-enter your password"
                placeholderTextColor="#6B636160"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPassword}
              />
              {confirmPassword.length > 0 && (
                <Ionicons
                  name={password === confirmPassword ? 'checkmark-circle' : 'close-circle'}
                  size={18}
                  color={password === confirmPassword ? '#059669' : '#DC2626'}
                />
              )}
            </View>
          </View>

          {/* Terms */}
          <TouchableOpacity
            className="flex-row items-center gap-2 mb-6"
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            <View className={`w-5 h-5 rounded border-2 items-center justify-center ${
              agreeTerms ? 'bg-gold border-gold' : 'border-gray-300'
            }`}>
              {agreeTerms && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
            </View>
            <Text className="text-charcoal/60 text-xs flex-1">
              I agree to the <Text className="text-gold font-medium">Terms of Service</Text> and{' '}
              <Text className="text-gold font-medium">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Sign Up Button */}
          <TouchableOpacity
            className={`py-3.5 rounded-xl items-center mb-6 ${
              isValid ? 'bg-gold' : 'bg-gray-200'
            }`}
            onPress={handleSignUp}
            disabled={!isValid || isLoading}
            activeOpacity={0.85}
          >
            <Text className={`font-bold text-base ${isValid ? 'text-navy' : 'text-charcoal/40'}`}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center gap-3 mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-charcoal/40 text-xs">OR CONTINUE WITH</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Sign Up */}
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

          {/* Sign In Link */}
          <View className="items-center pb-8">
            <Text className="text-charcoal/60 text-sm">Already have an account?{' '}</Text>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text className="text-gold font-semibold text-sm">Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
