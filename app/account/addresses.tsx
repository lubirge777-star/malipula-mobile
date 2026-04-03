import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const GOLD = '#C9A962';
const NAVY = '#1B2A4A';

const savedAddresses = [
  {
    id: '1',
    label: 'Home',
    fullName: 'Michael Kimaro',
    phone: '+255 712 345 678',
    street: 'Plot 45, Ohio Street',
    city: 'Dar es Salaam',
    region: 'Dar es Salaam',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Office',
    fullName: 'Michael Kimaro',
    phone: '+255 712 345 678',
    street: '15th Floor, CRDB Tower',
    city: 'Dar es Salaam',
    region: 'Dar es Salaam',
    isDefault: false,
  },
  {
    id: '3',
    label: 'Upcountry',
    fullName: 'Grace Kimaro',
    phone: '+255 756 789 012',
    street: 'Village Center, Sokoine Road',
    city: 'Arusha',
    region: 'Arusha',
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const router = useRouter();
  const [addresses, setAddresses] = useState(savedAddresses);

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id: string) => {
    Alert.alert('Delete Address', 'Are you sure you want to delete this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setAddresses((prev) => prev.filter((a) => a.id !== id)),
      },
    ]);
  };

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3 flex-row items-center gap-3">
        <TouchableOpacity className="p-1" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={NAVY} />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="font-heading text-xl text-navy">Saved Addresses</Text>
          <Text className="text-charcoal/60 text-xs">{addresses.length} addresses</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-8">
        <View className="gap-3 mt-2">
          {addresses.map((address) => (
            <View
              key={address.id}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                address.isDefault ? 'border-gold/40' : 'border-transparent'
              }`}
            >
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-row items-center gap-2">
                  <View className="w-9 h-9 rounded-xl bg-gold/10 items-center justify-center">
                    <Ionicons name="location" size={18} color={GOLD} />
                  </View>
                  <View>
                    <Text className="font-semibold text-navy text-sm">{address.label}</Text>
                    {address.isDefault && (
                      <Text className="text-gold text-[10px] font-semibold">Default</Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity onPress={() => deleteAddress(address.id)}>
                  <Ionicons name="trash-outline" size={16} color="#DC2626" />
                </TouchableOpacity>
              </View>

              <View className="pl-11 space-y-0.5 mb-3">
                <Text className="text-navy text-sm font-medium">{address.fullName}</Text>
                <Text className="text-charcoal/60 text-xs">{address.phone}</Text>
                <Text className="text-charcoal/60 text-xs">{address.street}</Text>
                <Text className="text-charcoal/60 text-xs">{address.city}, {address.region}</Text>
              </View>

              <View className="pl-11 flex-row gap-2">
                <TouchableOpacity
                  className="bg-ivory rounded-lg px-3 py-1.5"
                >
                  <Text className="text-navy text-xs font-medium">Edit</Text>
                </TouchableOpacity>
                {!address.isDefault && (
                  <TouchableOpacity
                    className="bg-gold/10 rounded-lg px-3 py-1.5"
                    onPress={() => setDefault(address.id)}
                  >
                    <Text className="text-gold text-xs font-medium">Set as Default</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Add New Address */}
        <TouchableOpacity
          className="mt-4 bg-white rounded-2xl p-4 flex-row items-center justify-center gap-2 shadow-sm border-2 border-dashed border-gold/40"
          activeOpacity={0.7}
        >
          <Ionicons name="add-circle-outline" size={20} color={GOLD} />
          <Text className="text-gold font-semibold text-sm">Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
