import React, { useState } from 'react';
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

const upcomingAppointments = [
  {
    id: '1',
    type: 'In-Store Fitting',
    date: 'Mon, 15 Jan 2025',
    time: '10:00 AM',
    stylist: 'James Mwangi',
    stylistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'confirmed' as const,
    location: 'Malipula Boutique, Kijitonyama',
  },
  {
    id: '2',
    type: 'Style Consultation',
    date: 'Wed, 20 Jan 2025',
    time: '2:00 PM',
    stylist: 'Fatma Hassan',
    stylistImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    status: 'pending' as const,
    location: 'Virtual (Zoom)',
  },
];

const pastAppointments = [
  {
    id: '3',
    type: 'Measurement Session',
    date: 'Fri, 5 Jan 2025',
    time: '11:00 AM',
    stylist: 'James Mwangi',
    stylistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'completed' as const,
    location: 'Malipula Boutique, Kijitonyama',
  },
  {
    id: '4',
    type: 'Suit Fitting',
    date: 'Tue, 28 Dec 2024',
    time: '3:00 PM',
    stylist: 'Ahmed Mohamed',
    stylistImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'completed' as const,
    location: 'Malipula Boutique, Msasani',
  },
];

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  confirmed: { color: '#059669', bg: '#D1FAE5', label: 'Confirmed' },
  pending: { color: '#D97706', bg: '#FEF3C7', label: 'Pending' },
  completed: { color: '#6B6361', bg: '#F3F4F6', label: 'Completed' },
  cancelled: { color: '#DC2626', bg: '#FEE2E2', label: 'Cancelled' },
};

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;

  return (
    <View className="flex-1 bg-ivory">
      {/* Header */}
      <View className="px-4 pt-4 pb-3">
        <Text className="font-heading text-2xl text-navy">Appointments</Text>
        <Text className="text-charcoal/60 text-sm mt-0.5">Manage your fitting sessions</Text>
      </View>

      {/* Tab Switcher */}
      <View className="mx-4 mb-4 flex-row bg-white rounded-xl p-1 shadow-sm">
        <TouchableOpacity
          className={`flex-1 py-2.5 rounded-lg items-center ${
            activeTab === 'upcoming' ? 'bg-gold' : ''
          }`}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text className={`text-sm font-semibold ${activeTab === 'upcoming' ? 'text-navy' : 'text-charcoal'}`}>
            Upcoming ({upcomingAppointments.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2.5 rounded-lg items-center ${
            activeTab === 'past' ? 'bg-gold' : ''
          }`}
          onPress={() => setActiveTab('past')}
        >
          <Text className={`text-sm font-semibold ${activeTab === 'past' ? 'text-navy' : 'text-charcoal'}`}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Appointments List */}
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 pb-28">
        {appointments.length === 0 ? (
          <View className="items-center justify-center py-16">
            <View className="w-20 h-20 bg-gold/10 rounded-full items-center justify-center mb-4">
              <Ionicons name="calendar-outline" size={36} color={GOLD} />
            </View>
            <Text className="font-heading text-lg text-navy mb-1">No Appointments</Text>
            <Text className="text-charcoal/60 text-sm text-center max-w-[250px] mb-4">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming appointments. Book one now!"
                : "Your completed appointments will appear here."}
            </Text>
            {activeTab === 'upcoming' && (
              <TouchableOpacity
                className="bg-gold px-6 py-3 rounded-xl"
                onPress={() => router.push('/booking/wizard')}
              >
                <Text className="text-navy font-semibold">Book Appointment</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="gap-3">
            {appointments.map((apt) => {
              const status = statusConfig[apt.status];
              return (
                <TouchableOpacity
                  key={apt.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                  activeOpacity={0.85}
                >
                  <View className="flex-row items-start justify-between mb-3">
                    <View className="flex-1">
                      <Text className="font-semibold text-navy text-base">{apt.type}</Text>
                      <View className="flex-row items-center gap-1.5 mt-1">
                        <Ionicons name="location-outline" size={14} color="#6B6361" />
                        <Text className="text-charcoal/60 text-xs">{apt.location}</Text>
                      </View>
                    </View>
                    <View
                      className="px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: status.bg }}
                    >
                      <Text className="text-xs font-semibold" style={{ color: status.color }}>
                        {status.label}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-4 mb-3 pl-1">
                    <View className="flex-row items-center gap-1.5">
                      <Ionicons name="calendar-outline" size={14} color={GOLD} />
                      <Text className="text-sm text-navy">{apt.date}</Text>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <Ionicons name="time-outline" size={14} color={GOLD} />
                      <Text className="text-sm text-navy">{apt.time}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center justify-between pt-3 border-t border-gray-100">
                    <View className="flex-row items-center gap-2.5">
                      <Image
                        source={{ uri: apt.stylistImage }}
                        className="w-8 h-8 rounded-full"
                      />
                      <View>
                        <Text className="text-xs text-charcoal/50">Stylist</Text>
                        <Text className="text-sm text-navy font-medium">{apt.stylist}</Text>
                      </View>
                    </View>
                    {apt.status !== 'completed' && (
                      <TouchableOpacity className="flex-row items-center gap-1 bg-red-50 px-3 py-1.5 rounded-lg">
                        <Ionicons name="close-outline" size={14} color="#DC2626" />
                        <Text className="text-xs text-red-600 font-medium">Cancel</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Book Appointment FAB */}
      {activeTab === 'upcoming' && appointments.length > 0 && (
        <TouchableOpacity
          className="absolute bottom-24 right-4 bg-gold px-5 py-3.5 rounded-2xl shadow-lg flex-row items-center gap-2"
          style={styles.fab}
          onPress={() => router.push('/booking/wizard')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text className="text-navy font-semibold text-sm">Book Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    elevation: 6,
    shadowColor: 'rgba(201, 169, 98, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    shadowOpacity: 1,
  },
});
