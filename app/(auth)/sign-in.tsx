import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  interpolateColor
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, getThemeColors } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function SignInScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
  const isDark = colorScheme === 'dark';

  // Background Animation Loop
  const bgAnim = useSharedValue(0);

  useEffect(() => {
    bgAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 8000 }),
        withTiming(0, { duration: 8000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    const lightColors1 = ['#fcfbfa', '#f7f4ee'];
    const lightColors2 = ['#f7f4ee', '#f0ede6'];
    const darkColors1 = ['#0a0a0c', '#121215'];
    const darkColors2 = ['#121215', '#1a1a1f'];
    
    const color1 = interpolateColor(bgAnim.value, [0, 1], isDark ? darkColors1 : lightColors1);
    const color2 = interpolateColor(bgAnim.value, [0, 1], isDark ? darkColors2 : lightColors2);
    return {
      backgroundColor: color1,
    };
  });

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
      style={{ flex: 1 }}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedBackgroundStyle]}>
        <AnimatedLinearGradient
          colors={[isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)', isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          entering={FadeInDown.duration(1000).delay(100).springify()}
          style={styles.header}
        >
          <View style={[styles.logoBadge, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(201, 169, 98, 0.3)' }]}>
            <Ionicons name="shirt-outline" size={38} color={Colors.gold} />
          </View>
          <Text style={[styles.heading, { color: theme.text }]}>Welcome Back</Text>
          <Text style={[styles.subheading, { color: theme.textSecondary }]}>
            Sign in to your Malipula account to continue your bespoke journey.
          </Text>
        </Animated.View>

        {/* Form Card */}
        <Animated.View 
          entering={FadeInUp.duration(1000).delay(300).springify()}
          style={[styles.formCard, { backgroundColor: isDark ? 'rgba(30, 30, 35, 0.85)' : 'rgba(255, 255, 255, 0.85)', borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,1)' }]}
        >
          {/* Email */}
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={<Ionicons name="mail-outline" size={20} color={Colors.gold} />}
          />

          {/* Password */}
          <View style={styles.passwordWrapper}>
            <View style={styles.labelRow}>
              <Text style={styles.forgotTextLabel}></Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.forgotTouch}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              icon={<Ionicons name="lock-closed-outline" size={20} color={Colors.gold} />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} hitSlop={10}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.gold}
                  />
                </TouchableOpacity>
              }
            />
          </View>

          {/* Remember Me */}
          <TouchableOpacity
            style={styles.rememberRow}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              rememberMe && { backgroundColor: Colors.gold, borderColor: Colors.gold },
              (!rememberMe && isDark) && { borderColor: 'rgba(255,255,255,0.3)' }
            ]}>
              {rememberMe && <Ionicons name="checkmark" size={14} color="#FFF" />}
            </View>
            <Text style={[styles.rememberText, { color: theme.text }]}>Remember me</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <View style={styles.actionSection}>
            <Button
              title="SIGN IN"
              onPress={handleSignIn}
              variant="luxury"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!isValid}
            />
          </View>

          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }]} />
            <Text style={[styles.dividerText, { color: theme.textSecondary }]}>SECURE LOGIN</Text>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }]} />
          </View>

          {/* Social Login */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }]} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={20} color={isDark ? '#FFF' : '#EA4335'} />
              <Text style={[styles.socialButtonText, { color: theme.text }]}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' }]} activeOpacity={0.7}>
              <Ionicons name="logo-apple" size={20} color={isDark ? '#FFF' : '#1A1A1A'} />
              <Text style={[styles.socialButtonText, { color: theme.text }]}>Apple</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          entering={FadeInUp.duration(1000).delay(500).springify()}
          style={styles.footer}
        >
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/sign-up')} activeOpacity={0.7}>
             <Text style={[styles.signUpLink, { color: Colors.gold }]}>Create Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 100,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoBadge: {
    width: 88,
    height: 88,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },
  heading: {
    fontFamily: Fonts.playfairBold,
    fontSize: 42,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subheading: {
    fontFamily: Fonts.interRegular,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 26,
    paddingHorizontal: 20,
  },
  formCard: {
    marginHorizontal: 22,
    borderRadius: 36,
    paddingHorizontal: 28,
    paddingVertical: 36,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  passwordWrapper: {
    position: 'relative',
    marginTop: 10,
  },
  labelRow: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  forgotTextLabel: {},
  forgotTouch: {
    padding: 2,
  },
  forgotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.gold,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  rememberText: {
    fontFamily: Fonts.interMedium,
    fontSize: 14,
    color: '#444',
  },
  actionSection: {
    marginBottom: 8,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.06)',
  },
  dividerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: '#AAA',
    marginHorizontal: 16,
    letterSpacing: 2,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: 56,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
  },
  socialButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#1A1A1A',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  footerText: {
    fontFamily: Fonts.interMedium,
    fontSize: 15,
    color: '#666',
  },
  signUpLink: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: Colors.goldDark,
  },
});

