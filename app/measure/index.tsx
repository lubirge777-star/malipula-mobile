import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, getThemeColors } from '../../src/theme';

export default function MeasureSelectionScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDark ? "light" : "dark"} />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={isDark ? ['#100f0d', '#000000'] : [theme.background, theme.surface]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(800).delay(100)}
        style={styles.header}
      >
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: theme.surface, borderColor: theme.border }]} 
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={28} color={Colors.gold} />
        </TouchableOpacity>
        
        <Text style={[styles.heading, { color: theme.text }]}>Your Measurements</Text>
        <Text style={[styles.subheading, { color: theme.textSecondary }]}>
          Choose how you would like to provide your measurements for a perfect bespoke fit.
        </Text>
      </Animated.View>

      {/* Selection Cards */}
      <View style={styles.content}>
        
        {/* Scan Option */}
        <Animated.View entering={FadeInUp.duration(800).delay(300)}>
          <TouchableOpacity 
            style={[styles.optionCard, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : 'rgba(255,255,255,0.85)', borderColor: theme.border }]}
            onPress={() => router.push('/measure/scan')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isDark ? ['rgba(201, 169, 98, 0.1)', 'rgba(0,0,0,0.4)'] : ['rgba(201, 169, 98, 0.05)', 'rgba(255,255,255,0.4)']}
              style={[StyleSheet.absoluteFill, { borderRadius: 32 }]}
            />
            <View style={styles.iconContainer}>
              <Ionicons name="scan-outline" size={32} color={Colors.gold} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>AI Body Scan</Text>
              <Text style={[styles.optionDescription, { color: theme.textSecondary }]}>
                Use your device's camera for a quick, precise 3D measurement scan.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Manual Option */}
        <Animated.View entering={FadeInUp.duration(800).delay(500)}>
          <TouchableOpacity 
            style={[styles.optionCard, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : 'rgba(255,255,255,0.85)', borderColor: theme.border }]}
            onPress={() => router.push('/measure/manual')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isDark ? ['rgba(255, 255, 255, 0.05)', 'rgba(0,0,0,0.4)'] : ['rgba(0,0,0,0.02)', 'rgba(255,255,255,0.4)']}
              style={[StyleSheet.absoluteFill, { borderRadius: 32 }]}
            />
            <View style={[styles.iconContainerManual, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.05)', borderColor: theme.border }]}>
              <Ionicons name="create-outline" size={32} color={theme.text} />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>Manual Entry</Text>
              <Text style={[styles.optionDescription, { color: theme.textSecondary }]}>
                Input your measurements step-by-step using a measuring tape.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 24,
  },
  heading: {
    fontFamily: Fonts.playfairBold,
    fontSize: 36,
    letterSpacing: 0.5,
  },
  subheading: {
    fontFamily: Fonts.interRegular,
    fontSize: 16,
    marginTop: 12,
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 20,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderRadius: 32,
    borderWidth: 1,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(201, 169, 98, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(201, 169, 98, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  iconContainerManual: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: Fonts.playfairBold,
    fontSize: 20,
    marginBottom: 6,
  },
  optionDescription: {
    fontFamily: Fonts.interRegular,
    fontSize: 13,
    lineHeight: 20,
  },
});
