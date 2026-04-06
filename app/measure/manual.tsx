import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Fonts, getThemeColors } from '../../src/theme';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';

export default function ManualMeasurementScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = getThemeColors(isDark ? 'dark' : 'light');
  
  // State for a few example measurements
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    shoulders: '',
    sleeves: '',
  });

  const handleUpdate = (key: keyof typeof measurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save logic
    router.replace('/builder');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />
      <LinearGradient colors={isDark ? ['#100f0d', '#000000'] : [theme.background, theme.surface]} style={StyleSheet.absoluteFill} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(800).delay(100)} style={styles.header}>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color={Colors.gold} />
          </TouchableOpacity>
          <Text style={[styles.heading, { color: theme.text }]}>Manual Entry</Text>
          <Text style={[styles.subheading, { color: theme.textSecondary }]}>
            Grab a measuring tape and carefully input your dimensions in centimeters (cm).
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInUp.duration(800).delay(300)} style={[styles.formCard, { backgroundColor: isDark ? 'rgba(20, 20, 22, 0.85)' : 'rgba(255,255,255,0.85)', borderColor: theme.border }]}>
          <Text style={styles.sectionTitle}>UPPER BODY</Text>
          
          <Input 
            label="Chest Circumference" 
            placeholder="e.g. 102" 
            keyboardType="numeric"
            value={measurements.chest}
            onChangeText={(val) => handleUpdate('chest', val)}
            rightIcon={<Text style={[styles.unitText, { color: theme.textSecondary }]}>cm</Text>}
          />
          
          <Input 
            label="Waist Circumference" 
            placeholder="e.g. 86" 
            keyboardType="numeric"
            value={measurements.waist}
            onChangeText={(val) => handleUpdate('waist', val)}
            rightIcon={<Text style={[styles.unitText, { color: theme.textSecondary }]}>cm</Text>}
          />

          <Input 
            label="Shoulder Width" 
            placeholder="e.g. 48" 
            keyboardType="numeric"
            value={measurements.shoulders}
            onChangeText={(val) => handleUpdate('shoulders', val)}
            rightIcon={<Text style={[styles.unitText, { color: theme.textSecondary }]}>cm</Text>}
          />

          <Input 
            label="Sleeve Length" 
            placeholder="e.g. 64" 
            keyboardType="numeric"
            value={measurements.sleeves}
            onChangeText={(val) => handleUpdate('sleeves', val)}
            rightIcon={<Text style={[styles.unitText, { color: theme.textSecondary }]}>cm</Text>}
          />

          <View style={{ marginTop: 24 }}>
            <Button title="SAVE MEASUREMENTS" onPress={handleSave} size="lg" fullWidth />
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 24,
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
  formCard: {
    marginHorizontal: 16,
    borderRadius: 36,
    padding: 24,
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: Fonts.interBold,
    fontSize: 12,
    color: Colors.gold,
    letterSpacing: 2,
    marginBottom: 20,
    marginTop: 8,
  },
  unitText: {
    fontFamily: Fonts.interMedium,
    fontSize: 14,
  }
});
