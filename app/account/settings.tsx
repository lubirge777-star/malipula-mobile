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
import { useColorScheme } from 'react-native';
import { getThemeColors, Colors } from '../../src/theme';

type SettingItem = {
  id: string;
  icon: any;
  label: string;
  type: 'toggle' | 'detail';
  value?: string;
};

type SettingGroup = {
  title: string;
  items: SettingItem[];
};

const settingsGroups: SettingGroup[] = [
  {
    title: 'Appearance',
    items: [
      { id: 'darkMode', icon: 'moon-outline', label: 'Dark Mode', type: 'toggle' },
      { id: 'language', icon: 'globe-outline', label: 'Language', type: 'detail', value: 'English' },
    ],
  },
  {
    title: 'Notifications',
    items: [
      { id: 'pushNotif', icon: 'notifications-outline', label: 'Push Notifications', type: 'toggle' },
      { id: 'emailNotif', icon: 'mail-outline', label: 'Email Notifications', type: 'toggle' },
      { id: 'promoNotif', icon: 'pricetag-outline', label: 'Promotions & Offers', type: 'toggle' },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      { id: 'biometric', icon: 'finger-print-outline', label: 'Biometric Login', type: 'toggle' },
      { id: 'changePass', icon: 'lock-closed-outline', label: 'Change Password', type: 'detail' },
      { id: 'twoFactor', icon: 'shield-checkmark-outline', label: 'Two-Factor Auth', type: 'toggle' },
    ],
  },
  {
    title: 'Data',
    items: [
      { id: 'currency', icon: 'cash-outline', label: 'Currency', type: 'detail', value: 'TZS' },
      { id: 'clearCache', icon: 'trash-outline', label: 'Clear Cache', type: 'detail', value: '24.5 MB' },
      { id: 'exportData', icon: 'download-outline', label: 'Export My Data', type: 'detail' },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = getThemeColors(colorScheme === 'dark' ? 'dark' : 'light');
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
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl" style={{ color: theme.text }}>Settings</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-8">
        {settingsGroups.map((group) => (
          <View key={group.title} className="mb-5 mt-1">
            <Text className="text-xs font-semibold uppercase tracking-wider mb-2 pl-1" style={{ color: theme.textSecondary }}>
              {group.title}
            </Text>
            <View className="rounded-2xl shadow-sm overflow-hidden border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
              {group.items.map((item, index) => (
                <View
                  key={item.id}
                  className={`flex-row items-center px-4 py-3.5`}
                  style={{ borderBottomWidth: index < group.items.length - 1 ? 1 : 0, borderBottomColor: theme.border }}
                >
                  <View className="w-9 h-9 rounded-xl items-center justify-center mr-3" style={{ backgroundColor: theme.background }}>
                    <Ionicons name={item.icon} size={18} color={theme.text} />
                  </View>
                  <Text className="flex-1 text-sm font-medium" style={{ color: theme.text }}>{item.label}</Text>
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
                        <Text className="text-xs mr-1" style={{ color: theme.textSecondary }}>{item.value}</Text>
                      )}
                      <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Version Info */}
        <View className="mt-4 items-center">
          <Text className="text-xs" style={{ color: theme.textSecondary }}>Malipula Suits v1.0.0</Text>
          <Text className="text-[10px] mt-0.5" style={{ color: theme.textSecondary }}>Build 2025.01.15</Text>
        </View>

        {/* Logout */}
        <TouchableOpacity className="rounded-2xl p-4 flex-row items-center justify-center shadow-sm mt-4 border" style={{ backgroundColor: theme.surface, borderColor: theme.border }}>
          <Ionicons name="log-out-outline" size={18} color="#DC2626" />
          <Text className="text-red-500 font-semibold text-sm ml-2">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
