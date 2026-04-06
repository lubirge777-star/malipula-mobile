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

export default function SignUpScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
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
    if (password.length === 0) return { label: '', color: 'transparent', width: 0 };
    if (password.length < 6) return { label: 'WEAK', color: '#EF4444', width: 33 };
    if (password.length < 8) return { label: 'FAIR', color: '#F59E0B', width: 66 };
    return { label: 'STRONG', color: '#10B981', width: 100 };
  };

  const strength = getPasswordStrength();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Animated.View style={[StyleSheet.absoluteFill, animatedBackgroundStyle]}>
        <AnimatedLinearGradient
          colors={[isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.7)', isDark ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)']}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <StatusBar style={isDark ? "light" : "dark"} />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.duration(1000).delay(100).springify()}
          style={styles.header}
        >
          <TouchableOpacity 
            style={[styles.backButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.04)', borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.08)' }]} 
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={28} color={Colors.gold} />
          </TouchableOpacity>
          
          <View style={[styles.logoBadge, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.9)' : '#FFFFFF', borderColor: isDark ? 'rgba(201, 169, 98, 0.3)' : 'rgba(201, 169, 98, 0.3)' }]}>
            <Ionicons name="person-add-outline" size={38} color={Colors.gold} />
          </View>
          <Text style={[styles.heading, { color: theme.text }]}>Create Account</Text>
          <Text style={[styles.subheading, { color: theme.textSecondary }]}>
            Join the Malipula inner circle for exclusive access to bespoke refinements.
          </Text>
        </Animated.View>

        {/* Form Card */}
        <Animated.View 
          entering={FadeInUp.duration(1000).delay(300).springify()}
          style={[styles.formCard, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : 'rgba(255, 255, 255, 0.85)', borderColor: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255,255,255,1)' }]}
        >
          {/* Full Name */}
          <Input
            label="Full Name"
            placeholder="Your full name"
            value={fullName}
            onChangeText={setFullName}
            icon={<Ionicons name="person-outline" size={20} color={Colors.gold} />}
          />

          {/* Email */}
          <Input
            label="Email Address"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            icon={<Ionicons name="mail-outline" size={20} color={Colors.gold} />}
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            placeholder="+255 xxx xxx xxx"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon={<Ionicons name="phone-portrait-outline" size={20} color={Colors.gold} />}
          />

          {/* Password */}
          <View style={styles.passwordWrapper}>
            <Input
              label="Password"
              placeholder="Min. 8 characters"
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
            {/* Password Strength Meter */}
            {password.length > 0 && (
              <Animated.View entering={FadeInDown} style={styles.strengthRow}>
                <View style={[styles.strengthBarContainer, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                  <View 
                    style={[
                      styles.strengthBar, 
                      { width: `${strength.width}%`, backgroundColor: strength.color }
                    ]} 
                  />
                </View>
                <Text style={[styles.strengthLabel, { color: strength.color }]}>
                  {strength.label}
                </Text>
              </Animated.View>
            )}
          </View>

          {/* Confirm Password */}
          <View style={{ marginTop: 10 }}>
            <Input
              label="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
              icon={<Ionicons name="lock-closed-outline" size={20} color={Colors.gold} />}
              rightIcon={
                confirmPassword.length > 0 && (
                  <Ionicons
                    name={password === confirmPassword ? 'checkmark-circle' : 'close-circle'}
                    size={20}
                    color={password === confirmPassword ? '#10B981' : '#EF4444'}
                  />
                )
              }
            />
          </View>

          {/* Terms */}
          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.checkbox,
              agreeTerms && { backgroundColor: Colors.gold, borderColor: Colors.gold },
              (!agreeTerms && !isDark) && { borderColor: 'rgba(0,0,0,0.2)' }
            ]}>
              {agreeTerms && <Ionicons name="checkmark" size={14} color="#FFF" />}
            </View>
            <Text style={[styles.termsText, { color: theme.textSecondary }]}>
              I agree to the <Text style={styles.highlight}>Terms</Text> and{' '}
              <Text style={styles.highlight}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          {/* Create Account Button */}
          <View style={styles.actionSection}>
            <Button
              title="CREATE ACCOUNT"
              onPress={handleSignUp}
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={!isValid}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.06)' }]} />
            <Text style={[styles.dividerText, { color: theme.textSecondary }]}>OR SIGN UP WITH</Text>
            <View style={[styles.dividerLine, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.06)' }]} />
          </View>

          {/* Social Row */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFF', borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.08)' }]} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={20} color={isDark ? '#FFF' : '#EA4335'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#FFF', borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.08)' }]} activeOpacity={0.7}>
              <Ionicons name="logo-apple" size={20} color={isDark ? '#FFF' : '#1A1A1A'} />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          entering={FadeInUp.duration(1000).delay(500).springify()}
          style={styles.footer}
        >
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/sign-in')} activeOpacity={0.7}>
            <Text style={styles.signInLink}>Sign In</Text>
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
    paddingTop: 80,
    paddingBottom: 32,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 70,
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    marginTop: 20,
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
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 8,
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: 0,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -8, // Adjust based on Input margin
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  strengthBarContainer: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginRight: 10,
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    fontFamily: Fonts.interBold,
    fontSize: 10,
    letterSpacing: 1,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(201, 169, 98, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  termsText: {
    fontFamily: Fonts.interMedium,
    fontSize: 14,
    flex: 1,
  },
  highlight: {
    color: Colors.gold,
    fontFamily: Fonts.interBold,
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
  },
  dividerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    marginHorizontal: 16,
    letterSpacing: 2,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  socialButton: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
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
  },
  signInLink: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: Colors.gold,
  },
});
