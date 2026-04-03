import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const menuGroups = [
  {
    title: 'My Shopping',
    items: [
      { id: 'orders', icon: 'cube-outline' as const, label: 'My Orders', route: '/account/orders', badge: '2' },
      { id: 'measurements', icon: 'resize-outline' as const, label: 'My Measurements', route: '/account/measurements' },
      { id: 'wishlist', icon: 'heart-outline' as const, label: 'Wishlist', route: '/account/wishlist', badge: '5' },
      { id: 'addresses', icon: 'location-outline' as const, label: 'Saved Addresses', route: '/account/addresses' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: 'notifications', icon: 'notifications-outline' as const, label: 'Notifications', route: '' },
      { id: 'settings', icon: 'settings-outline' as const, label: 'App Settings', route: '/account/settings' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: 'help', icon: 'help-circle-outline' as const, label: 'Help & Support', route: '' },
      { id: 'about', icon: 'information-circle-outline' as const, label: 'About Malipula', route: '' },
    ],
  },
];

const quickStats = [
  { id: '1', label: 'Orders', value: '12', icon: 'cube' as const },
  { id: '2', label: 'Appointments', value: '8', icon: 'calendar' as const },
  { id: '3', label: 'Points', value: '2,450', icon: 'star' as const },
];

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-ivory">
      <ScrollView showsVerticalScrollIndicator={false} className="pb-8">
        {/* Profile Header */}
        <View className="bg-navy px-4 pt-12 pb-8 rounded-b-3xl">
          <View className="flex-row items-center gap-4">
            <View className="w-20 h-20 rounded-full bg-gold/20 items-center justify-center border-2 border-gold/40">
              <Ionicons name="person" size={36} color={GOLD} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-heading text-xl">Michael Kimaro</Text>
              <Text className="text-white/60 text-sm mt-0.5">michael.kimaro@email.com</Text>
              <View className="flex-row items-center gap-1.5 mt-2">
                <View className="bg-gold/20 px-2.5 py-0.5 rounded-full flex-row items-center gap-1">
                  <Ionicons name="diamond" size={10} color={GOLD} />
                  <Text className="text-gold text-[10px] font-bold tracking-wider uppercase">
                    Gold Member
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="p-2">
              <Ionicons name="create-outline" size={20} color="#FFFFFF80" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mx-4 -mt-6 bg-white rounded-2xl p-4 shadow-sm flex-row justify-around">
          {quickStats.map((stat) => (
            <TouchableOpacity key={stat.id} className="items-center gap-1.5" activeOpacity={0.7}>
              <View className="w-10 h-10 rounded-xl bg-gold/10 items-center justify-center">
                <Ionicons name={stat.icon} size={18} color={GOLD} />
              </View>
              <Text className="text-navy font-bold text-base">{stat.value}</Text>
              <Text className="text-charcoal/50 text-xs">{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Groups */}
        <View className="px-4 mt-5">
          {menuGroups.map((group) => (
            <View key={group.title} className="mb-5">
              <Text className="text-charcoal/50 text-xs font-semibold uppercase tracking-wider mb-2 pl-1">
                {group.title}
              </Text>
              <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {group.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    className={`flex-row items-center px-4 py-3.5 ${
                      index < group.items.length - 1 ? 'border-b border-gray-50' : ''
                    }`}
                    onPress={() => item.route ? router.push(item.route as any) : null}
                    activeOpacity={0.7}
                  >
                    <View className="w-9 h-9 rounded-xl bg-ivory items-center justify-center mr-3">
                      <Ionicons name={item.icon} size={18} color={NAVY} />
                    </View>
                    <Text className="flex-1 text-navy text-sm font-medium">{item.label}</Text>
                    {item.badge && (
                      <View className="bg-gold/15 px-2 py-0.5 rounded-full mr-2">
                        <Text className="text-gold text-[10px] font-bold">{item.badge}</Text>
                      </View>
                    )}
                    <Ionicons name="chevron-forward" size={18} color="#6B636180" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Sign Out */}
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center justify-center shadow-sm mb-4">
            <Ionicons name="log-out-outline" size={18} color="#DC2626" />
            <Text className="text-red-500 font-semibold text-sm ml-2">Sign Out</Text>
          </TouchableOpacity>

          {/* App Version */}
          <Text className="text-center text-charcoal/30 text-xs mb-4">Malipula Suits v1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileGradient: {
    backgroundColor: NAVY,
  },
});
