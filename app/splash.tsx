import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, Image, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors, FontFamily, getThemeColors } from '../src/theme';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <View style={styles.goldLeaf} />
        <View style={styles.logoCircle}>
          <Image 
            source={require('../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Animated.Text style={styles.brandName}>MALIPULA</Animated.Text>
        <Animated.Text style={[styles.tagline, { color: theme.textSecondary }]}>MASTERPIECE TAILORING</Animated.Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(201, 169, 98, 0.05)',
  },
  logo: {
    width: 80,
    height: 80,
    tintColor: Colors.gold,
  },
  goldLeaf: {
    position: 'absolute',
    top: -20,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 0.5,
    borderColor: 'rgba(201, 169, 98, 0.2)',
  },
  brandName: {
    color: Colors.gold,
    fontSize: 28,
    fontFamily: FontFamily.display,
    letterSpacing: 8,
    marginTop: 30,
    fontWeight: '700',
  },
  tagline: {
    fontSize: 10,
    letterSpacing: 4,
    marginTop: 10,
    fontWeight: '600',
  },
});
