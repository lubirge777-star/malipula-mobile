import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const settingsGroups = [
  {
    title: 'Appearance',
    items: [
      { id: 'darkMode', icon: 'moon-outline' as const, label: 'Dark Mode', type: 'toggle' as const },
      { id: 'language', icon: 'globe-outline' as const, label: 'Language', type: 'detail' as const, value: 'English' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { id: 'pushNotif', icon: 'notifications-outline' as const, label: 'Push Notifications', type: 'toggle' as const },
      { id: 'emailNotif', icon: 'mail-outline' as const, label: 'Email Notifications', type: 'toggle' as const },
      { id: 'promoNotif', icon: 'pricetag-outline' as const, label: 'Promotions & Offers', type: 'toggle' as const },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { id: 'biometric', icon: 'finger-print-outline' as const, label: 'Biometric Login', type: 'toggle' as const },
      { id: 'changePass', icon: 'lock-closed-outline' as const, label: 'Change Password', type: 'detail' as const },
      { id: 'twoFactor', icon: 'shield-checkmark-outline' as const, label: 'Two-Factor Auth', type: 'toggle' as const },
    ],
  },
  {
    title: 'Data',
    items: [
      { id: 'currency', icon: 'cash-outline' as const, label: 'Currency', type: 'detail' as const, value: 'TZS' },
      { id: 'clearCache', icon: 'trash-outline' as const, label: 'Clear Cache', type: 'detail' as const, value: '24.5 MB' },
      { id: 'exportData', icon: 'download-outline' as const, label: 'Export My Data', type: 'detail' as const },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    darkMode: false,
    pushNotif: true,
    emailNotif: true,
    promoNotif: false,
    biometric: true,
    twoFactor: false,
  });

  const toggleSetting = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">Settings</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-8">
        {settingsGroups.map((group) => (
          <View key={group.title} className="mb-5 mt-1">
            <Text className="text-charcoal/50 text-xs font-semibold uppercase tracking-wider mb-2 pl-1">
              {group.title}
            </Text>
            <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {group.items.map((item, index) => (
                <View
                  key={item.id}
                  className={`flex-row items-center px-4 py-3.5 ${
                    index < group.items.length - 1 ? 'border-b border-gray-50' : ''
                  }`}
                >
                  <View className="w-9 h-9 rounded-xl bg-ivory items-center justify-center mr-3">
                    <Ionicons name={item.icon} size={18} color={NAVY} />
                  </View>
                  <Text className="flex-1 text-navy text-sm font-medium">{item.label}</Text>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={toggles[item.id] || false}
                      onValueChange={() => toggleSetting(item.id)}
                      trackColor={{ false: '#E5E7EB', true: '#C9A962' }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#E5E7EB"
                    />
                  ) : (
                    <View className="flex-row items-center gap-1.5">
                      {item.value && (
                        <Text className="text-charcoal/50 text-xs mr-1">{item.value}</Text>
                      )}
                      <Ionicons name="chevron-forward" size={18} color="#6B636180" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Version Info */}
        <View className="mt-4 items-center">
          <Text className="text-charcoal/30 text-xs">Malipula Suits v1.0.0</Text>
          <Text className="text-charcoal/30 text-[10px] mt-0.5">Build 2025.01.15</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-center shadow-sm mt-4">
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text className="text-red-500 font-semibold text-sm ml-2">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
