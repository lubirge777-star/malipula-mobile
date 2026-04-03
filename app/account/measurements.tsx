import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const profiles = [
  {
    id: '1',
    name: 'Business Suit - Regular',
    date: 'Updated Jan 10, 2025',
    measurements: {
      chest: 42,
      waist: 34,
      hips: 40,
      shoulders: 18,
      sleeveLength: 25,
      inseam: 32,
      neck: 16,
    },
  },
  {
    id: '2',
    name: 'Slim Fit - Formal',
    date: 'Updated Dec 20, 2024',
    measurements: {
      chest: 40,
      waist: 32,
      hips: 38,
      shoulders: 17.5,
      sleeveLength: 24.5,
      inseam: 31,
      neck: 15.5,
    },
  },
];

const measurementLabels: Record<string, string> = {
  chest: 'Chest',
  waist: 'Waist',
  hips: 'Hips',
  shoulders: 'Shoulders',
  sleeveLength: 'Sleeve Length',
  inseam: 'Inseam',
  neck: 'Neck',
};

const measurementUnits: Record<string, string> = {
  chest: 'inches',
  waist: 'inches',
  hips: 'inches',
  shoulders: 'inches',
  sleeveLength: 'inches',
  inseam: 'inches',
  neck: 'inches',
};

export default function MeasurementsScreen() {
  const router = useRouter();
  const [expandedProfile, setExpandedProfile] = useState<string | null>(profiles[0]?.id || null);

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">My Measurements</Text>
          <Text className="text-charcoal/60 text-xs">{profiles.length} saved profiles</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-8">
        {/* Profiles */}
        <View className="gap-3 mt-2">
          {profiles.map((profile) => (
            <View key={profile.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <TouchableOpacity
                className="p-4 flex-row items-center justify-between"
                onPress={() => setExpandedProfile(expandedProfile === profile.id ? null : profile.id)}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-11 h-11 rounded-xl bg-gold/10 items-center justify-center">
                    <Ionicons name="resize" size={20} color={GOLD} />
                  </View>
                  <View>
                    <Text className="font-semibold text-navy text-sm">{profile.name}</Text>
                    <Text className="text-charcoal/50 text-xs">{profile.date}</Text>
                  </View>
                </View>
                <Ionicons
                  name={expandedProfile === profile.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#6B636180"
                />
              </TouchableOpacity>

              {expandedProfile === profile.id && (
                <View className="px-4 pb-4">
                  <View className="h-px bg-gray-100 mb-3" />
                  <View className="grid grid-cols-2 gap-2.5">
                    {Object.entries(profile.measurements).map(([key, value]) => (
                      <View key={key} className="bg-ivory rounded-xl px-3 py-2.5">
                        <Text className="text-charcoal/50 text-[11px] uppercase tracking-wider">
                          {measurementLabels[key]}
                        </Text>
                        <Text className="text-navy font-bold text-lg mt-0.5">
                          {value}{' '}
                          <Text className="text-charcoal/40 text-xs font-normal">
                            {measurementUnits[key]}
                          </Text>
                        </Text>
                      </View>
                    ))}
                  </View>
                  <View className="flex-row gap-2 mt-3">
                    <TouchableOpacity className="flex-1 bg-gold rounded-xl py-2.5 items-center">
                      <Text className="text-navy text-sm font-semibold">Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-gold rounded-xl py-2.5 items-center">
                      <Text className="text-gold text-sm font-semibold">Duplicate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Add New Profile */}
        <TouchableOpacity
          className="mt-4 bg-white rounded-2xl p-4 flex-row items-center justify-center gap-2 shadow-sm border-2 border-dashed border-gold/40"
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={20} color={GOLD} />
          <Text className="text-gold font-semibold text-sm">Add New Measurement Profile</Text>
        </TouchableOpacity>

        {/* Tip */}
        <View className="bg-gold/5 rounded-2xl p-4 mt-4 flex-row gap-3">
          <Ionicons name="lightbulb-outline" size={20} color={GOLD} />
          <View className="flex-1">
            <Text className="text-navy text-sm font-medium mb-0.5">Pro Tip</Text>
            <Text className="text-charcoal/60 text-xs leading-relaxed">
              Book a measurement session with our expert tailors for the most accurate results. Your measurements are saved securely and used for all future orders.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
