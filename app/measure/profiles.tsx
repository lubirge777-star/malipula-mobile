import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors, getThemeColors } from '../../src/theme';
import { Button, GlassView } from '../../src/components/ui';

const measurementCategories = [
  {
    title: 'Upper Body',
    icon: 'shirt-outline',
    metrics: [
      { label: 'Chest', value: '42.5', unit: 'cm' },
      { label: 'Shoulder Width', value: '18.2', unit: 'cm' },
      { label: 'Sleeve Length', value: '25.4', unit: 'cm' },
      { label: 'Neck', value: '15.5', unit: 'cm' },
    ]
  },
  {
    title: 'Lower Body',
    icon: 'body-outline',
    metrics: [
      { label: 'Waist', value: '34.0', unit: 'cm' },
      { label: 'Hip', value: '39.5', unit: 'cm' },
      { label: 'Inseam', value: '32.5', unit: 'cm' },
      { label: 'Outseam', value: '41.0', unit: 'cm' },
    ]
  }
];

export default function MeasurementProfilesScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View className="pt-16 px-6 pb-6 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text className="font-heading text-xl text-navy dark:text-ivory">AI Measurements</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
        {/* Info Card */}
        <GlassView intensity={10} className="p-6 rounded-[32px] border border-gold/10 mb-8 items-center bg-gold/5">
            <View className="w-12 h-12 bg-gold/20 rounded-full items-center justify-center mb-4">
                <Ionicons name="shield-checkmark" size={24} color={Colors.gold} />
            </View>
            <Text className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">Precision Verified</Text>
            <Text className="text-navy dark:text-ivory font-display text-2xl text-center">Your Sartorial DNA</Text>
            <Text className="text-app-text-secondary text-center text-xs mt-2 px-4">
                Measurements captured via AI Scan. These are used for your {new Date().getFullYear()} bespoke orders.
            </Text>
        </GlassView>

        {measurementCategories.map((cat, idx) => (
            <View key={idx} className="mb-8">
                <View className="flex-row items-center mb-4 gap-2">
                    <Ionicons name={cat.icon as any} size={20} color={Colors.gold} />
                    <Text className="text-gold font-bold text-[10px] uppercase tracking-widest">{cat.title}</Text>
                </View>

                <View className="flex-row flex-wrap gap-4">
                    {cat.metrics.map((m, mIdx) => (
                        <View 
                            key={mIdx} 
                            style={[styles.metricCard, { backgroundColor: theme.surface, borderColor: 'rgba(193, 163, 98, 0.1)' }]}
                            className="w-[47%] p-5 rounded-[24px] border"
                        >
                            <Text className="text-gray-400 text-[10px] uppercase tracking-tighter mb-1">{m.label}</Text>
                            <View className="flex-row items-baseline gap-1">
                                <Text className="font-display text-2xl text-navy dark:text-ivory">{m.value}</Text>
                                <Text className="text-app-text-secondary text-[10px]">{m.unit}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        ))}

        <View className="mt-4 p-6 bg-app-surface border border-gold/10 rounded-[28px] items-center">
            <Text className="text-app-text-secondary text-center text-[11px] leading-4">
                You can retake measurements at any time if your physique changes. Note that drastic changes might affect existing orders.
            </Text>
            <TouchableOpacity className="mt-4">
                <Text className="text-gold font-bold text-xs">Retake AI Scan</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View className="p-8 border-t border-gold/10 bg-app-background">
        <Button 
            title="Finalize & Proceed to Checkout" 
            variant="luxury" 
            onPress={() => router.push('/checkout')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  metricCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
});
